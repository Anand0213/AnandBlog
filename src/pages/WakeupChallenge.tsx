import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Trophy, Zap, Star, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { useChallenge } from '../contexts/ChallengeContext';
import { useAuth } from '../contexts/AuthContext';

const WakeupChallenge: React.FC = () => {
  const { 
    currentChallenge, 
    isInChallengeWindow, 
    timeUntilNextChallenge, 
    timeUntilWindowClose,
    submitAnswer,
    hasSubmittedToday,
    getUserSubmission,
    addNewChallenge
  } = useChallenge();
  
  const { user, updateUserProgress } = useAuth();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [showSampleAnswer, setShowSampleAnswer] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [userSubmission, setUserSubmission] = useState<string>('');

  useEffect(() => {
    if (hasSubmittedToday && getUserSubmission) {
      Promise.resolve(getUserSubmission()).then(setUserSubmission);
    }
  }, [hasSubmittedToday, getUserSubmission]);

  const handleSubmit = async () => {
    if (!answer.trim()) {
      setSubmissionStatus('error');
      return;
    }

    const success = await submitAnswer(answer);
    if (success) {
      setSubmissionStatus('success');
      updateUserProgress(true);
      setAnswer('');
    } else {
      setSubmissionStatus('error');
    }
  };

  const handleAddChallenge = async () => {
    await addNewChallenge({
      date: '2025-07-30',
      question: 'What is a closure in JavaScript?',
      sampleAnswer: 'A closure is a function that remembers its outer variables...',
      difficulty: 'Easy',
      type: 'conceptual',
    });
    alert('Challenge added!');
  };

  if (!user) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
          <Lock className="h-16 w-16 text-slate-400 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Login Required
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            You need to be logged in to participate in the Wakeup Challenge.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Login to Join Challenge
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full mb-6">
            <Clock className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Daily Wakeup Challenge
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Start your day with focused learning. Solve coding challenges and answer conceptual questions 
            every morning from 5:00 AM to 7:00 AM.
          </p>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{user.streakCount}</div>
            <div className="text-slate-600 dark:text-slate-400">Day Streak</div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full mb-4">
              <Trophy className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{user.totalChallenges}</div>
            <div className="text-slate-600 dark:text-slate-400">Total Challenges</div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
              <Star className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{user.badges.length}</div>
            <div className="text-slate-600 dark:text-slate-400">Badges Earned</div>
          </div>
        </div>

        {/* Badges */}
        {user.badges.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Your Badges</h2>
            <div className="flex flex-wrap gap-4">
              {user.badges.map((badge, index) => (
                <div key={index} className="flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-4 py-2 rounded-full">
                  <Star className="h-4 w-4" />
                  <span className="font-medium">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenge Status */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 mb-8">
          {isInChallengeWindow ? (
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full mb-4">
                <CheckCircle className="h-5 w-5" />
                <span className="font-semibold">Challenge Window is OPEN!</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Time remaining: <span className="font-semibold text-slate-900 dark:text-white">{timeUntilWindowClose}</span>
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-4 py-2 rounded-full mb-4">
                <Clock className="h-5 w-5" />
                <span className="font-semibold">Challenge Window Closed</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Next challenge opens in: <span className="font-semibold text-slate-900 dark:text-white">{timeUntilNextChallenge}</span>
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500">
                Challenges are available daily from 5:00 AM to 7:00 AM
              </p>
            </div>
          )}
        </div>

        {/* Today's Challenge */}
        {currentChallenge && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Today's Challenge</h2>
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  currentChallenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  currentChallenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {currentChallenge.difficulty}
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium capitalize">
                  {currentChallenge.type}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-lg mb-6">
              <p className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed">
                {currentChallenge.question}
              </p>
            </div>

            {hasSubmittedToday ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold">You've already submitted today!</span>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Your Submission:</h4>
                  <pre className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                    {userSubmission}
                  </pre>
                </div>

                <button
                  onClick={() => setShowSampleAnswer(!showSampleAnswer)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  {showSampleAnswer ? 'Hide' : 'Show'} Sample Answer
                </button>

                {showSampleAnswer && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Sample Answer:</h4>
                    <pre className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                      {currentChallenge.sampleAnswer}
                    </pre>
                  </div>
                )}
              </div>
            ) : isInChallengeWindow ? (
              <div className="space-y-4">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter your solution here..."
                  className="w-full h-40 p-4 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white resize-vertical"
                />
                
                {submissionStatus === 'error' && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                    <AlertCircle className="h-5 w-5" />
                    <span>Please enter your answer before submitting.</span>
                  </div>
                )}

                {submissionStatus === 'success' && (
                  <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                    <CheckCircle className="h-5 w-5" />
                    <span>Answer submitted successfully! Great job completing today's challenge.</span>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!answer.trim() || submissionStatus === 'success'}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                  Submit Answer
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Lock className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 dark:text-slate-400">
                  Challenge submissions are only available during the daily window (5:00 AM - 7:00 AM).
                </p>
              </div>
            )}
          </div>
        )}

        {/* How It Works */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            How the Wakeup Challenge Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Daily Challenge</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                A new coding or conceptual challenge appears every day at 5:00 AM
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-600 text-white rounded-full mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Limited Window</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                You have exactly 2 hours (5:00-7:00 AM) to submit your solution
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-600 text-white rounded-full mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Build Streaks</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Maintain daily participation to build streaks and earn achievement badges
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WakeupChallenge;