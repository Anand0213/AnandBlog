import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Plus, Users, BarChart3, Calendar, Settings, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useChallenge } from '../contexts/ChallengeContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { addNewChallenge, getAllChallenges, getSubmissions } = useChallenge();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [newChallenge, setNewChallenge] = useState({
    date: '',
    question: '',
    sampleAnswer: '',
    difficulty: 'Medium' as 'Easy' | 'Medium' | 'Hard',
    type: 'coding' as 'coding' | 'conceptual'
  });

  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loadingChallenges, setLoadingChallenges] = useState(true);
  const [challengesError, setChallengesError] = useState<string | null>(null);
  const [submissionCounts, setSubmissionCounts] = useState<{ [id: string]: number }>({});

  useEffect(() => {
    setLoadingChallenges(true);
    getAllChallenges()
      .then((data) => {
        setChallenges(Array.isArray(data) ? data : []);
        setChallengesError(null);
      })
      .catch((err) => {
        setChallenges([]);
        setChallengesError('Failed to load challenges');
      })
      .finally(() => setLoadingChallenges(false));
  }, [getAllChallenges]);

  useEffect(() => {
    async function fetchCounts() {
      const counts: { [id: string]: number } = {};
      for (const challenge of challenges) {
        try {
          const subs = await getSubmissions(challenge.id);
          counts[challenge.id] = subs.length;
        } catch {
          counts[challenge.id] = 0;
        }
      }
      setSubmissionCounts(counts);
    }
    if (challenges.length) fetchCounts();
  }, [challenges, getSubmissions]);

  if (!user || !user.isAdmin) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            You don't have admin privileges to access this page.
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChallenge.date || !newChallenge.question || !newChallenge.sampleAnswer) {
      alert('Please fill in all fields');
      return;
    }

    addNewChallenge(newChallenge);
    setNewChallenge({
      date: '',
      question: '',
      sampleAnswer: '',
      difficulty: 'Medium',
      type: 'coding'
    });
    alert('Challenge added successfully!');
  };

  const totalUsers = JSON.parse(localStorage.getItem('users') || '[]').length;
  const totalSubmissions = JSON.parse(localStorage.getItem('challengeSubmissions') || '[]').length;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'challenges', label: 'Challenges', icon: Calendar },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Site</span>
            </button>
            <div className="h-6 w-px bg-slate-300 dark:bg-slate-600"></div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-slate-600 dark:text-slate-400">Manage challenges and monitor platform activity</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-4 py-2 rounded-full">
            <Shield className="h-5 w-5" />
            <span className="font-medium">Admin Access</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-slate-200 dark:border-slate-700 mb-8">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Total Challenges</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{challenges.length}</p>
                  </div>
                  <Calendar className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Total Users</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalUsers}</p>
                  </div>
                  <Users className="h-12 w-12 text-emerald-500" />
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Total Submissions</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalSubmissions}</p>
                  </div>
                  <BarChart3 className="h-12 w-12 text-purple-500" />
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Avg. Participation</p>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">
                      {totalUsers > 0 ? Math.round((totalSubmissions / totalUsers) * 100) : 0}%
                    </p>
                  </div>
                  <BarChart3 className="h-12 w-12 text-orange-500" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Recent Challenges</h2>
              <div className="space-y-4">
                {challenges.slice(-5).reverse().map(challenge => (
                  <div key={challenge.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">
                        {challenge.question.substring(0, 60)}...
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {new Date(challenge.date).toLocaleDateString()} • {challenge.difficulty} • {challenge.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {submissionCounts[challenge.id] || 0} submissions
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-8">
            {/* Add New Challenge */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                <Plus className="h-6 w-6 mr-2" />
                Add New Challenge
              </h2>
              
              <form onSubmit={handleAddChallenge} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newChallenge.date}
                      onChange={(e) => setNewChallenge(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={newChallenge.difficulty}
                      onChange={(e) => setNewChallenge(prev => ({ ...prev, difficulty: e.target.value as any }))}
                      className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Type
                    </label>
                    <select
                      value={newChallenge.type}
                      onChange={(e) => setNewChallenge(prev => ({ ...prev, type: e.target.value as any }))}
                      className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="coding">Coding</option>
                      <option value="conceptual">Conceptual</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Question
                  </label>
                  <textarea
                    value={newChallenge.question}
                    onChange={(e) => setNewChallenge(prev => ({ ...prev, question: e.target.value }))}
                    className="w-full h-32 p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="Enter the challenge question..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Sample Answer
                  </label>
                  <textarea
                    value={newChallenge.sampleAnswer}
                    onChange={(e) => setNewChallenge(prev => ({ ...prev, sampleAnswer: e.target.value }))}
                    className="w-full h-32 p-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                    placeholder="Enter the sample answer..."
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Add Challenge
                </button>
              </form>
            </div>

            {/* Existing Challenges */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">All Challenges</h2>
              <div className="space-y-4">
                {loadingChallenges ? (
                  <div>Loading challenges...</div>
                ) : challengesError ? (
                  <div className="text-red-500">{challengesError}</div>
                ) : (
                  challenges.map(challenge => (
                    <div key={challenge.id} className="p-4 border border-slate-200 dark:border-slate-600 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                            challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {challenge.difficulty}
                          </span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                            {challenge.type}
                          </span>
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {new Date(challenge.date).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                        {challenge.question}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {submissionCounts[challenge.id] ?? '...'} submissions
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">User Management</h2>
            <div className="space-y-4">
              {JSON.parse(localStorage.getItem('users') || '[]').map((user: any) => (
                <div key={user.id} className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-600 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{user.name}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Streak: {user.streakCount || 0} days
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Total: {user.totalChallenges || 0} challenges
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Platform Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Challenge Window</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Challenges are currently available daily from 5:00 AM to 7:00 AM.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Note:</strong> Challenge timing is currently hardcoded. 
                    In a production environment, this would be configurable through this interface.
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Data Management</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  All data is currently stored in browser localStorage for demo purposes.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
                      localStorage.clear();
                      window.location.reload();
                    }
                  }}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Clear All Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;