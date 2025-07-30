import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, Menu, X, Clock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useChallenge } from '../contexts/ChallengeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isInChallengeWindow, timeUntilNextChallenge } = useChallenge();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Code2 className="h-8 w-8 text-blue-600 group-hover:text-blue-700 transition-colors" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              Anand Kumar Gedala
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Home
            </Link>
            <Link
              to="/blog"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/blog') || location.pathname.startsWith('/blog/')
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              Tech Blog
            </Link>
            <Link
              to="/wakeup-challenge"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                isActive('/wakeup-challenge') 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>Wakeup Challenge</span>
              {isInChallengeWindow && (
                <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                  LIVE
                </span>
              )}
            </Link>

            {/* Challenge Timer */}
            {!isInChallengeWindow && (
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Next challenge: {timeUntilNextChallenge}
              </div>
            )}

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{user.name}</span>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full"
                    >
                      Admin
                    </Link>
                  )}
                </div>
                <button
                  onClick={logout}
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/') ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-slate-700 dark:text-slate-300'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/blog"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/blog') || location.pathname.startsWith('/blog/')
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                    : 'text-slate-700 dark:text-slate-300'
                }`}
                onClick={() => setIsOpen(false)}
              >
                Tech Blog
              </Link>
              <Link
                to="/wakeup-challenge"
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 ${
                  isActive('/wakeup-challenge') 
                    ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                    : 'text-slate-700 dark:text-slate-300'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Clock className="h-4 w-4" />
                <span>Wakeup Challenge</span>
                {isInChallengeWindow && (
                  <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    LIVE
                  </span>
                )}
              </Link>
              
              {user ? (
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="px-3 py-2 text-sm text-slate-700 dark:text-slate-300">
                    Welcome, {user.name || 'User'}!
                  </div>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="px-3 py-2 rounded-md text-sm font-medium text-purple-600"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;