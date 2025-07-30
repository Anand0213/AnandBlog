import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Tag, Calendar, User } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const BlogPost: React.FC = () => {
  const { skill } = useParams<{ skill: string }>();
  const post = skill ? blogPosts[skill] : null;

  if (!post) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Article Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to all articles</span>
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
            <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime}
            </div>
            <div className="flex items-center text-slate-600 dark:text-slate-400 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(post.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-sm"
              >
                <Tag className="h-3 w-3" />
                <span>{tag}</span>
              </span>
            ))}
          </div>

          {/* Author */}
          <div className="flex items-center space-x-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-white">
                Anand Kumar Gedala
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Full-Stack Developer & Tech Educator
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed">
            {post.content.split('\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <h3 key={index} className="text-lg font-semibold text-slate-900 dark:text-white mt-8 mb-4">
                    {paragraph.replace(/\*\*/g, '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <li key={index} className="mb-2">
                    {paragraph.replace('- ', '')}
                  </li>
                );
              }
              if (paragraph.trim() === '') {
                return <br key={index} />;
              }
              if (paragraph.startsWith('```')) {
                return null; // Handle code blocks separately if needed
              }
              return (
                <p key={index} className="mb-6 text-slate-700 dark:text-slate-300">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </article>

        {/* Call to Action */}
        <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 rounded-xl">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to put this knowledge into practice?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Join the daily Wakeup Challenge to sharpen your skills with hands-on coding problems 
            and conceptual questions. Start your day with focused learning!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/wakeup-challenge"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
            >
              Join Wakeup Challenge
            </Link>
            <Link
              to="/blog"
              className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors text-center"
            >
              Read More Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;