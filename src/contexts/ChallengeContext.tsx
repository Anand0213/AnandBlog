import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase'; // Your firebase config and initialization
import { useAuth } from './AuthContext'; // Your Auth context

// Types
interface Challenge {
  id: string;
  date: string; // YYYY-MM-DD
  question: string;
  sampleAnswer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'coding' | 'conceptual';
}

interface ChallengeSubmission {
  challengeId: string;
  userId: string;
  answer: string;
  submittedAt: Timestamp;
}

interface ChallengeContextType {
  currentChallenge: Challenge | null;
  isInChallengeWindow: boolean;
  timeUntilNextChallenge: string;
  timeUntilWindowClose: string;
  submitAnswer: (answer: string) => Promise<boolean>;
  hasSubmittedToday: boolean;
  addNewChallenge: (challenge: Omit<Challenge, 'id'>) => Promise<void>;
  getAllChallenges: () => Promise<Challenge[]>;
  getSubmissions: (challengeId: string) => Promise<ChallengeSubmission[]>;
  getUserSubmission: () => Promise<string>; // <-- Add this line
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export const useChallenge = () => {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }
  return context;
};

export const ChallengeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [isInChallengeWindow, setIsInChallengeWindow] = useState(false);
  const [timeUntilNextChallenge, setTimeUntilNextChallenge] = useState('');
  const [timeUntilWindowClose, setTimeUntilWindowClose] = useState('');
  const [hasSubmittedToday, setHasSubmittedToday] = useState(false);

  // Fetch today's challenge and submission status
  useEffect(() => {
    if (!user) {
      setCurrentChallenge(null);
      setHasSubmittedToday(false);
      return;
    }

    const fetchChallengeAndSubmission = async () => {
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0];

      // Fetch today's challenge
      const challengesCol = collection(db, 'challenges');
      const challengeQuery = query(challengesCol, where('date', '==', todayStr));
      const challengeSnapshot = await getDocs(challengeQuery);

      if (!challengeSnapshot.empty) {
        const challengeDoc = challengeSnapshot.docs[0];
        const challengeData = challengeDoc.data() as Omit<Challenge, 'id'>;
        setCurrentChallenge({ ...challengeData, id: challengeDoc.id });

        // Check if user submitted today
        const submissionsCol = collection(db, 'submissions');
        const submissionQuery = query(
          submissionsCol,
          where('challengeId', '==', challengeDoc.id),
          where('userId', '==', user.id)
        );
        const submissionSnapshot = await getDocs(submissionQuery);

        // Filter submissions with today date
        const submissionsToday = submissionSnapshot.docs.filter((doc) => {
          const sub = doc.data() as ChallengeSubmission;
          const submittedAtDate = sub.submittedAt.toDate();
          return submittedAtDate.toISOString().startsWith(todayStr);
        });

        setHasSubmittedToday(submissionsToday.length > 0);
      } else {
        setCurrentChallenge(null);
        setHasSubmittedToday(false);
      }
    };

    fetchChallengeAndSubmission();

    // Timer to check challenge window and countdown
    const updateTimer = () => {
      const now = new Date();
      const hour = now.getHours();

      const inWindow = hour >= 5 && hour < 7;
      // setIsInChallengeWindow(true);
      setIsInChallengeWindow(inWindow);

      if (inWindow) {
        const endTime = new Date(now);
        endTime.setHours(7, 0, 0, 0);
        const diffMs = endTime.getTime() - now.getTime();

        const h = Math.floor(diffMs / (1000 * 60 * 60));
        const m = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diffMs % (1000 * 60)) / 1000);

        setTimeUntilWindowClose(`${h}h ${m}m ${s}s`);
        setTimeUntilNextChallenge('');
      } else {
        const nextChallenge = new Date(now);
        if (hour >= 7) nextChallenge.setDate(nextChallenge.getDate() + 1);
        nextChallenge.setHours(5, 0, 0, 0);

        const diffMs = nextChallenge.getTime() - now.getTime();

        const h = Math.floor(diffMs / (1000 * 60 * 60));
        const m = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diffMs % (1000 * 60)) / 1000);

        setTimeUntilNextChallenge(`${h}h ${m}m ${s}s`);
        setTimeUntilWindowClose('');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [user]);

  const submitAnswer = async (answer: string): Promise<boolean> => {
    if (!user || !currentChallenge || hasSubmittedToday || !isInChallengeWindow) return false;

    try {
      const submissionsCol = collection(db, 'submissions');
      await addDoc(submissionsCol, {
        challengeId: currentChallenge.id,
        userId: user.id,
        answer,
        submittedAt: Timestamp.fromDate(new Date()),
      });
      setHasSubmittedToday(true);
      return true;
    } catch (err) {
      console.error('Failed to submit answer:', err);
      return false;
    }
  };

  const addNewChallenge = async (challenge: Omit<Challenge, 'id'>) => {
    const challengesCol = collection(db, 'challenges');
    await addDoc(challengesCol, challenge);
  };

  const getAllChallenges = async (): Promise<Challenge[]> => {
    try {
      const challengesCol = collection(db, 'challenges');
      const snapshot = await getDocs(challengesCol);
      return snapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as Omit<Challenge, 'id'>) }));
    } catch (err) {
      console.error('Failed to get challenges:', err);
      return [];
    }
  };

  const getSubmissions = async (challengeId: string): Promise<ChallengeSubmission[]> => {
    try {
      const submissionsCol = collection(db, 'submissions');
      const q = query(submissionsCol, where('challengeId', '==', challengeId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => doc.data() as ChallengeSubmission);
    } catch (err) {
      console.error('Failed to get submissions:', err);
      return [];
    }
  };

  const getUserSubmission = async (): Promise<string> => {
    if (!user || !currentChallenge) return '';
    try {
      const submissionsCol = collection(db, 'submissions');
      const q = query(
        submissionsCol,
        where('challengeId', '==', currentChallenge.id),
        where('userId', '==', user.id)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const data = snapshot.docs[0].data() as ChallengeSubmission;
        return data.answer;
      }
      return '';
    } catch (err) {
      console.error('Failed to get user submission:', err);
      return '';
    }
  };

  return (
    <ChallengeContext.Provider
      value={{
        currentChallenge,
        isInChallengeWindow,
        timeUntilNextChallenge,
        timeUntilWindowClose,
        submitAnswer,
        hasSubmittedToday,
        addNewChallenge,
        getAllChallenges,
        getSubmissions,
        getUserSubmission, // <-- Add here
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};
