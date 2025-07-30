import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, Clock, Star } from 'lucide-react';

const BlogHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const blogPosts = [
    {
      slug: 'mongodb',
      title: 'MongoDB: The Flexible NoSQL Database for Modern Apps',
      category: 'Database',
      excerpt: 'MongoDB is a powerful NoSQL document database designed for high scalability, performance, and developer agility.',
      readTime: '6 min read',
      tags: ['NoSQL', 'Database', 'Scalability'],
      featured: true
    },
    {
      slug: 'express',
      title: 'Express.js: Lightweight, Unopinionated Server Powerhouse',
      category: 'Backend',
      excerpt: 'Express.js is my go-to Node.js backend framework for APIs and web services.',
      readTime: '5 min read',
      tags: ['Node.js', 'API', 'Backend'],
      featured: true
    },
    {
      slug: 'react',
      title: 'React.js: Build Animated, Interactive Frontends',
      category: 'Frontend',
      excerpt: 'React\'s component-driven design and virtual DOM enable ultra-responsive, interactive UIs.',
      readTime: '8 min read',
      tags: ['React', 'Frontend', 'UI'],
      featured: true
    },
    {
      slug: 'nodejs',
      title: 'Node.js: Blazing-Fast, Asynchronous Backend',
      category: 'Backend',
      excerpt: 'Node.js powers asynchronous, high-throughput APIs across my apps.',
      readTime: '7 min read',
      tags: ['Node.js', 'JavaScript', 'Backend'],
      featured: false
    },
    {
      slug: 'javascript',
      title: 'JavaScript (ES6+): The Universal Language',
      category: 'Language',
      excerpt: 'Modern JavaScript provides the agility and features to write both client and server code.',
      readTime: '9 min read',
      tags: ['JavaScript', 'ES6', 'Programming'],
      featured: false
    },
    {
      slug: 'html-css',
      title: 'HTML5 & CSS3: Structure and Style for Modern Web',
      category: 'Frontend',
      excerpt: 'HTML5 introduces semantic tags; CSS3 delivers expressive animations and responsive layouts.',
      readTime: '6 min read',
      tags: ['HTML', 'CSS', 'Web Standards'],
      featured: false
    },
    {
      slug: 'git',
      title: 'Git: Collaboration and Control',
      category: 'Tools',
      excerpt: 'Git supports safe, collaborative development at all scales.',
      readTime: '4 min read',
      tags: ['Git', 'Version Control', 'Collaboration'],
      featured: false
    },
    {
      slug: 'docker',
      title: 'Docker: "Works on My Machine" No More',
      category: 'DevOps',
      excerpt: 'Docker containerizes apps, ensuring deployment consistency from laptop to cloud.',
      readTime: '8 min read',
      tags: ['Docker', 'Containers', 'DevOps'],
      featured: false
    },
    {
      slug: 'aws',
      title: 'AWS: Cloud Foundation for Scalable Apps',
      category: 'Cloud',
      excerpt: 'AWS enables production-scale deployments, serverless computing, and managed databases.',
      readTime: '10 min read',
      tags: ['AWS', 'Cloud', 'Infrastructure'],
      featured: true
    },
    {
      slug: 'java-spring',
      title: 'Java & Spring Boot: Secure, Scalable Backends',
      category: 'Backend',
      excerpt: 'Java with Spring Boot provides enterprise-grade, type-safe REST APIs and microservices.',
      readTime: '9 min read',
      tags: ['Java', 'Spring Boot', 'Enterprise'],
      featured: false
    },
    {
      slug: 'angular',
      title: 'Angular: Building Enterprise-Grade Frontends',
      category: 'Frontend',
      excerpt: 'Angular delivers structure and scalability for major business apps.',
      readTime: '8 min read',
      tags: ['Angular', 'TypeScript', 'Enterprise'],
      featured: false
    },
    {
      slug: 'vue-nuxt',
      title: 'Vue.js & Nuxt.js: Fast, Composable UIs',
      category: 'Frontend',
      excerpt: 'Vue.js and Nuxt enable rapid, scalable SPAs and static sites with SSR for SEO.',
      readTime: '7 min read',
      tags: ['Vue.js', 'Nuxt.js', 'SSR'],
      featured: false
    }
  ];

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Cloud', 'DevOps', 'Tools', 'Language'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Tech Blog
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            In-depth articles about the technologies I use to build modern, scalable applications. 
            Real experiences, practical insights, and lessons learned from production environments.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center">
              <Star className="h-6 w-6 text-yellow-500 mr-2" />
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                      Read article
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            All Articles ({filteredPosts.length})
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                No articles found matching your search criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span
                          key={tag}
                          className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium">
                      Read article
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default BlogHub;