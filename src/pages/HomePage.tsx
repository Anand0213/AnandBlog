import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Trophy, Star, Code2, BookOpen, Zap } from 'lucide-react';
import { useChallenge } from '../contexts/ChallengeContext';
import { useAuth } from '../contexts/AuthContext';

const HomePage: React.FC = () => {
  const { isInChallengeWindow, timeUntilNextChallenge, currentChallenge } = useChallenge();
  const { user } = useAuth();

  const featuredPosts = [
    {
      title: 'React.js: Build Animated, Interactive Frontends',
      excerpt: 'React\'s component-driven design and virtual DOM enable ultra-responsive, interactive UIs for the web.',
      slug: 'react',
      category: 'Frontend',
      readTime: '8 min read'
    },
    {
      title: 'MongoDB: The Flexible NoSQL Database for Modern Apps',
      excerpt: 'MongoDB is a powerful NoSQL document database designed for high scalability, performance, and developer agility.',
      slug: 'mongodb',
      category: 'Database',
      readTime: '6 min read'
    },
    {
      title: 'AWS: Cloud Foundation for Scalable Apps',
      excerpt: 'AWS enables production-scale deployments, serverless computing, and managed databases in all my major apps.',
      slug: 'aws',
      category: 'Cloud',
      readTime: '10 min read'
    }
  ];

  const stats = [
    { label: 'Blog Posts', value: '15+', icon: BookOpen },
    { label: 'Technologies', value: '12', icon: Code2 },
    { label: 'Daily Challenges', value: '100+', icon: Zap },
    { label: 'Community Members', value: '500+', icon: Trophy }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Full-Stack Developer &
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                {' '}Tech Educator
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              Welcome to my developer blog where I share insights on modern web technologies, 
              best practices, and real-world experiences building scalable applications.
            </p>
            
            {/* Challenge Status */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              {isInChallengeWindow ? (
                <Link
                  to="/wakeup-challenge"
                  className="group bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
                >
                  <Clock className="h-5 w-5" />
                  <span>Challenge is LIVE!</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Next challenge in: {timeUntilNextChallenge}</span>
                </div>
              )}
              
              <Link
                to="/blog"
                className="group bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-lg font-semibold border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg flex items-center space-x-2"
              >
                <BookOpen className="h-5 w-5" />
                <span>Explore Tech Blog</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* User Stats */}
            {user && (
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  Welcome back, {user.name}!
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{user.streakCount}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Day Streak</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-600">{user.totalChallenges}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Challenges</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">{user.badges.length}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Badges</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Featured Tech Articles
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Deep dives into the technologies I use daily to build modern, scalable applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <Link
                key={index}
                to={`/blog/${post.slug}`}
                className="group bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                  Read more
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              <span>View All Articles</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Wakeup Challenge CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Clock className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Join the Daily Wakeup Challenge
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Every day at 5:00 AM, solve a coding challenge or answer a conceptual question. 
            Build your streak, earn badges, and start your day with focused learning.
          </p>
          
          {currentChallenge && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-white mb-2">Today's Challenge Preview:</h3>
              <p className="text-blue-100 text-sm">
                {currentChallenge.question.substring(0, 100)}...
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/wakeup-challenge"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              {isInChallengeWindow ? 'Take Challenge Now' : 'Learn More'}
            </Link>
            {!user && (
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Sign Up to Participate
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;