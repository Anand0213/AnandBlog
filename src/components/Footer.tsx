import React from 'react';
import { Github, Linkedin, Mail, Heart, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Anand Kumar Gedala
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Full-stack developer passionate about building scalable web applications and sharing knowledge
              through technical writing. Join the daily Wakeup Challenge to sharpen your coding skills!!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Anand0213?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/g-anand-kumar-3aa213222/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:anandkumarmasters@gmail.com"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="tel:+14055035943"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex items-center"
              >
                <Phone className="h-5 w-5 mr-1" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/blog" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Tech Blog
                </a>
              </li>
              <li>
                <a href="/wakeup-challenge" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Wakeup Challenge
                </a>
              </li>
              <li>
                <a href="/login" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Login
                </a>
              </li>
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Technologies
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/blog/react" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  React.js
                </a>
              </li>
              <li>
                <a href="/blog/nodejs" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Node.js
                </a>
              </li>
              <li>
                <a href="/blog" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Firebase
                </a>
              </li>
              {/* <li>
                <a href="/blog/mongodb" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  MongoDB
                </a>
              </li>
              <li>
                <a href="/blog/aws" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  AWS
                </a>
              </li> */}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 dark:border-slate-700 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              © {new Date().getFullYear()} Anand Kumar Gedala. All rights reserved.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-sm flex items-center mt-2 md:mt-0">
              Built with <Heart className="h-4 w-4 text-red-500 mx-1" /> and React
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;