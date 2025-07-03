import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Clock, 
  Tag, 
  ChevronRight,
  Heart,
  Share2,
  Facebook,
  Twitter,
  ArrowLeft
} from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();

  // Mock blog post data - in real app, fetch by ID
  const post = {
    id: parseInt(id),
    title: "The Ultimate Guide to Organic Eating",
    excerpt: "Discover the benefits of organic food and learn how to make the transition to a healthier lifestyle with our comprehensive guide.",
    image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
    author: "Sarah Johnson",
    authorBio: "Nutrition expert and organic food advocate with over 10 years of experience in sustainable living.",
    authorImage: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "nutrition",
    tags: ["organic", "health", "nutrition", "lifestyle"],
    content: `
      <p>Organic eating has become more than just a trend—it's a lifestyle choice that millions of people are embracing for their health and the environment. But what exactly does "organic" mean, and how can you make the transition to organic eating without breaking the bank or overwhelming yourself?</p>

      <h2>What Makes Food Organic?</h2>
      <p>Organic foods are produced using methods that do not involve synthetic pesticides, fertilizers, genetically modified organisms (GMOs), antibiotics, or growth hormones. The organic certification process is rigorous, ensuring that farmers follow strict guidelines that promote ecological balance and conserve biodiversity.</p>

      <p>The benefits of choosing organic include:</p>
      <ul>
        <li>Reduced exposure to harmful chemicals and pesticides</li>
        <li>Higher nutritional content in many cases</li>
        <li>Better taste and freshness</li>
        <li>Environmental sustainability</li>
        <li>Support for animal welfare</li>
      </ul>

      <h2>The Dirty Dozen and Clean Fifteen</h2>
      <p>Not all produce needs to be organic. The Environmental Working Group publishes annual lists to help consumers prioritize their organic purchases:</p>

      <h3>Dirty Dozen (prioritize organic):</h3>
      <ul>
        <li>Strawberries</li>
        <li>Spinach</li>
        <li>Kale, collard and mustard greens</li>
        <li>Peaches</li>
        <li>Pears</li>
        <li>Nectarines</li>
        <li>Apples</li>
        <li>Grapes</li>
        <li>Bell and hot peppers</li>
        <li>Cherries</li>
        <li>Blueberries</li>
        <li>Green beans</li>
      </ul>

      <h3>Clean Fifteen (conventional is fine):</h3>
      <ul>
        <li>Avocados</li>
        <li>Sweet corn</li>
        <li>Pineapple</li>
        <li>Onions</li>
        <li>Papaya</li>
        <li>Sweet peas (frozen)</li>
        <li>Asparagus</li>
        <li>Honeydew melon</li>
        <li>Kiwi</li>
        <li>Cabbage</li>
        <li>Mushrooms</li>
        <li>Mangoes</li>
        <li>Sweet potatoes</li>
        <li>Watermelon</li>
        <li>Carrots</li>
      </ul>

      <h2>Making the Transition</h2>
      <p>Transitioning to organic eating doesn't have to be overwhelming. Here's a step-by-step approach:</p>

      <h3>1. Start Small</h3>
      <p>Begin by replacing the items you consume most frequently with organic alternatives. If you eat a lot of apples, start with organic apples. If you drink milk daily, switch to organic milk.</p>

      <h3>2. Focus on the Dirty Dozen</h3>
      <p>Prioritize buying organic versions of the produce on the Dirty Dozen list, as these have the highest pesticide residues.</p>

      <h3>3. Read Labels Carefully</h3>
      <p>Look for the USDA Organic seal, which guarantees that the product meets organic standards. Be wary of terms like "natural" or "made with organic ingredients," which don't guarantee the same standards.</p>

      <h3>4. Shop Smart</h3>
      <p>Organic doesn't have to be expensive. Shop at farmers markets, buy in season, purchase in bulk, and consider generic organic brands.</p>

      <h2>Beyond Fruits and Vegetables</h2>
      <p>Organic eating extends beyond produce. Consider these other organic options:</p>

      <ul>
        <li><strong>Dairy products:</strong> Organic milk, yogurt, and cheese come from animals not treated with antibiotics or growth hormones.</li>
        <li><strong>Meat and poultry:</strong> Organic options ensure animals were fed organic feed and had access to the outdoors.</li>
        <li><strong>Grains and legumes:</strong> Organic versions are free from synthetic pesticides and aren't genetically modified.</li>
        <li><strong>Pantry staples:</strong> Items like olive oil, vinegar, and spices can make a difference in your overall organic intake.</li>
      </ul>

      <h2>The Environmental Impact</h2>
      <p>Choosing organic isn't just about personal health—it's about the health of our planet. Organic farming practices:</p>

      <ul>
        <li>Reduce pollution from synthetic chemicals</li>
        <li>Conserve water and soil</li>
        <li>Reduce erosion</li>
        <li>Increase soil fertility</li>
        <li>Use less energy</li>
        <li>Support biodiversity</li>
      </ul>

      <h2>Common Myths Debunked</h2>
      
      <h3>Myth: Organic food doesn't taste different</h3>
      <p>Reality: Many people report that organic produce tastes fresher and more flavorful, likely due to healthier soil and more natural growing processes.</p>

      <h3>Myth: Organic food is just a marketing scam</h3>
      <p>Reality: Organic certification is a rigorous process with strict standards enforced by government agencies.</p>

      <h3>Myth: You need to buy everything organic</h3>
      <p>Reality: A strategic approach, focusing on the Dirty Dozen and your most-consumed items, can provide significant benefits without breaking the bank.</p>

      <h2>Your Next Steps</h2>
      <p>Ready to start your organic eating journey? Here's what you can do today:</p>

      <ol>
        <li>Assess your current diet and identify your most-consumed foods</li>
        <li>Make a shopping list prioritizing organic versions of Dirty Dozen items</li>
        <li>Find local sources for organic produce, such as farmers markets or CSA programs</li>
        <li>Start with one or two organic swaps per week</li>
        <li>Track how you feel and any changes you notice</li>
      </ol>

      <p>Remember, the goal isn't perfection—it's progress. Every organic choice you make is a step toward better health for you and the planet. Start where you are, use what you have, and do what you can.</p>
    `
  };

  const relatedPosts = [
    {
      id: 2,
      title: "Seasonal Produce: What to Buy in Winter",
      image: "https://images.pexels.com/photos/1367243/pexels-photo-1367243.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      date: "2024-01-12",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Quick & Healthy Smoothie Recipes",
      image: "https://images.pexels.com/photos/775032/pexels-photo-775032.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      date: "2024-01-08",
      readTime: "4 min read"
    },
    {
      id: 6,
      title: "Meal Prep with Organic Ingredients",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      date: "2024-01-03",
      readTime: "9 min read"
    }
  ];

  return (
    <div className="pt-16 lg:pt-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-green-600">Home</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link to="/blog" className="text-gray-500 hover:text-green-600">Blog</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-gray-900 truncate">{post.title}</span>
          </nav>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="mb-4">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium capitalize">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div className="flex items-center gap-4 text-gray-600 mb-4 sm:mb-0">
              <div className="flex items-center gap-2">
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors"
              >
                <Heart className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gray-100 hover:bg-blue-100 hover:text-blue-600 rounded-full transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gray-100 hover:bg-blue-100 hover:text-blue-400 rounded-full transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <Share2 className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="prose prose-lg prose-green max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            lineHeight: '1.8',
            fontSize: '1.1rem'
          }}
        />

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center gap-2 mb-8 pb-8 border-b border-gray-200"
        >
          <Tag className="h-5 w-5 text-gray-400" />
          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="bg-gray-100 hover:bg-green-100 text-gray-700 hover:text-green-700 px-3 py-1 rounded-full text-sm cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Author Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gray-50 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-start gap-4">
            <img
              src={post.authorImage}
              alt={post.author}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {post.author}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {post.authorBio}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Posts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost, index) => (
              <motion.div
                key={relatedPost.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <Link to={`/blog/${relatedPost.id}`}>
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 hover:text-green-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{new Date(relatedPost.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{relatedPost.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </article>
    </div>
  );
};

export default BlogPost;