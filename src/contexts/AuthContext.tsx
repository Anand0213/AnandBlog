// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, db, googleProvider } from '../firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  streakCount: number;
  badges: string[];
  totalChallenges: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  updateUserProgress: (challengeCompleted: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const hydrateUser = async (firebaseUser: FirebaseUser) => {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userSnap = await getDoc(userRef);
    const data = userSnap.data();
    if (!data) return null;

    const profile: User = {
      id: firebaseUser.uid,
      name: data.name,
      email: firebaseUser.email || '',
      isAdmin: !!data.isAdmin,
      streakCount: data.streakCount || 0,
      badges: data.badges || [],
      totalChallenges: data.totalChallenges || 0
    };
    setUser(profile);
    localStorage.setItem('currentUser', JSON.stringify(profile));
    return profile;
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) hydrateUser(firebaseUser);
      else {
        setUser(null);
        localStorage.removeItem('currentUser');
      }
    });
    return () => unsub();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);

      // Ensure user document exists in Firestore
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || '',
          email: firebaseUser.email || '',
          isAdmin: false,
          streakCount: 0,
          badges: [],
          totalChallenges: 0
        });
      }

      await hydrateUser(firebaseUser);
      return true;
    } catch (err: any) {
      // Optional: handle specific error codes for better UX
      // Example: err.code === 'auth/wrong-password'
      setUser(null);
      localStorage.removeItem('currentUser');
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const { user: firebaseUser } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(firebaseUser, { displayName: name });

      const newUser = {
        id: firebaseUser.uid,
        name,
        email,
        isAdmin: false,
        streakCount: 0,
        badges: [],
        totalChallenges: 0
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), newUser);
      await hydrateUser(firebaseUser);
      return true;
    } catch (err: any) {
      // Optionally: log err.code for more specific error handling
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userRef = doc(db, 'users', result.user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          id: result.user.uid,
          name: result.user.displayName || 'Google User',
          email: result.user.email,
          isAdmin: false,
          streakCount: 0,
          badges: [],
          totalChallenges: 0
        });
      }
      await hydrateUser(result.user);
      return true;
    } catch (err: any) {
      // Optionally: log err.code for more specific error handling
      return false;
    }
  };

  const logout = () => {
    signOut(auth);
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUserProgress = async (challengeCompleted: boolean) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      totalChallenges: user.totalChallenges + 1,
      streakCount: challengeCompleted ? user.streakCount + 1 : 0
    };

    const newBadges = [...user.badges];
    if (updatedUser.streakCount === 7 && !newBadges.includes('Week Warrior')) {
      newBadges.push('Week Warrior');
    }
    if (updatedUser.streakCount === 30 && !newBadges.includes('Month Master')) {
      newBadges.push('Month Master');
    }

    // Update Firestore
    await updateDoc(doc(db, 'users', user.id), {
      streakCount: updatedUser.streakCount,
      totalChallenges: updatedUser.totalChallenges,
      badges: newBadges
    });

    // Update local state and storage
    const finalUser = { ...updatedUser, badges: newBadges };
    setUser(finalUser);
    localStorage.setItem('currentUser', JSON.stringify(finalUser));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, loginWithGoogle, logout, updateUserProgress }}
    >
      {children}
    </AuthContext.Provider>
  );
};
