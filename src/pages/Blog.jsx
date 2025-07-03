import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  Search,
  ChevronRight,
  Heart,
  Share2
} from 'lucide-react';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to Organic Eating",
      excerpt: "Discover the benefits of organic food and learn how to make the transition to a healthier lifestyle with our comprehensive guide.",
      content: "Learn everything about organic eating, from understanding certifications to choosing the best products for your family...",
      image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
      author: "Sarah Johnson",
      date: "2024-01-15",
      readTime: "8 min read",
      category: "nutrition",
      tags: ["organic", "health", "nutrition", "lifestyle"],
      featured: true
    },
    {
      id: 2,
      title: "Seasonal Produce: What to Buy in Winter",
      excerpt: "Make the most of winter's bounty with our guide to seasonal fruits and vegetables that are at their peak right now.",
      content: "Winter offers amazing seasonal produce that's both nutritious and delicious. Here's what to look for...",
      image: "https://images.pexels.com/photos/1367243/pexels-photo-1367243.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
      author: "Michael Chen",
      date: "2024-01-12",
      readTime: "6 min read",
      category: "seasonal",
      tags: ["seasonal", "winter", "vegetables", "fruits"]
    },
    {
      id: 3,
      title: "Sustainable Packaging: Our Commitment to the Environment",
      excerpt: "Learn about our eco-friendly packaging initiatives and how we're working to reduce our environmental impact.",
      content: "Sustainability is at the heart of everything we do. Here's how we're making a difference...",
      image: "https://images.pexels.com/photos/7656745/pexels-photo-7656745.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
      author: "Emily Rodriguez",
      date: "2024-01-10",
      readTime: "5 min read",
      category: "sustainability",
      tags: ["sustainability", "environment", "packaging", "eco-friendly"]
    },
    {
      id: 4,
      title: "Quick & Healthy Smoothie Recipes",
      excerpt: "Start your day right with these nutritious and delicious smoothie recipes using fresh organic ingredients.",
      content: "These smoothie recipes are perfect for busy mornings and packed with nutrients...",
      image: "https://images.pexels.com/photos/775032/pexels-photo-775032.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
      author: "David Thompson",
      date: "2024-01-08",
      readTime: "4 min read",
      category: "recipes",
      tags: ["recipes", "smoothies", "healthy", "breakfast"]
    },
    {
      id: 5,
      title: "Supporting Local Farmers: Our Partnership Network",
      excerpt: "Meet the local farmers who make FreshNest possible and learn about our commitment to supporting local agriculture.",
      content: "We're proud to work with over 50 local organic farmers. Here are their stories...",
      image: "https://images.pexels.com/photos/1212693/pexels-photo-1212693.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
      author: "Sarah Johnson",
      date: "2024-01-05",
      readTime: "7 min read",
      category: "farming",
      tags: ["farmers", "local", "organic", "community"]
    },
    {
      id: 6,
      title: "Meal Prep with Organic Ingredients",
      excerpt: "Save time and eat healthier with these meal prep strategies using fresh organic produce and pantry staples.",
      content: "Meal prepping doesn't have to be complicated. Here's how to do it with organic ingredients...",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=500&fit=crop",
      author: "Michael Chen",
      date: "2024-01-03",
      readTime: "9 min read",
      category: "recipes",
      tags: ["meal-prep", "recipes", "organic", "healthy"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'nutrition', name: 'Nutrition', count: blogPosts.filter(p => p.category === 'nutrition').length },
    { id: 'recipes', name: 'Recipes', count: blogPosts.filter(p => p.category === 'recipes').length },
    { id: 'seasonal', name: 'Seasonal', count: blogPosts.filter(p => p.category === 'seasonal').length },
    { id: 'sustainability', name: 'Sustainability', count: blogPosts.filter(p => p.category === 'sustainability').length },
    { id: 'farming', name: 'Farming', count: blogPosts.filter(p => p.category === 'farming').length },
  ];

  const popularTags = ['organic', 'healthy', 'recipes', 'sustainability', 'nutrition', 'seasonal'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              FreshNest Blog
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Discover tips, recipes, and insights for living a healthier, more sustainable lifestyle
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mb-6">
                    {featuredPost.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <Link to={`/blog/${featuredPost.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                    >
                      Read More
                      <ChevronRight className="h-4 w-4" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filter */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            {regularPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {regularPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium capitalize">
                          {post.category}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors">
                          <Heart className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-2 bg-white/90 hover:bg-white rounded-full transition-colors">
                          <Share2 className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-green-600 transition-colors">
                        <Link to={`/blog/${post.id}`}>
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map(tag => (
                            <span
                              key={tag}
                              className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <Link to={`/blog/${post.id}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1"
                          >
                            Read More
                            <ChevronRight className="h-3 w-3" />
                          </motion.button>
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="text-gray-400 mb-4">
                  <Search className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              {/* Popular Tags */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map(tag => (
                    <span
                      key={tag}
                      className="bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-3">
                  Stay Updated
                </h3>
                <p className="text-green-100 text-sm mb-4">
                  Get the latest articles and tips delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-3 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white placeholder-green-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-green-600 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Posts
                </h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map(post => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.id}`}
                      className="block group"
                    >
                      <div className="flex gap-3">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(post.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;