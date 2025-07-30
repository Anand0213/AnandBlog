import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ChallengeProvider } from './contexts/ChallengeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BlogHub from './pages/BlogHub';
import BlogPost from './pages/BlogPost';
import WakeupChallenge from './pages/WakeupChallenge';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <ChallengeProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
            <Navbar />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog" element={<BlogHub />} />
                <Route path="/blog/:skill" element={<BlogPost />} />
                <Route path="/wakeup-challenge" element={<WakeupChallenge />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<AdminDashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ChallengeProvider>
    </AuthProvider>
  );
}

export default App;