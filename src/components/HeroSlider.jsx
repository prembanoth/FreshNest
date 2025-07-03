import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: "Fresh Organic Produce",
      subtitle: "Nature's Best for Your Family",
      description: "Discover our carefully selected organic fruits and vegetables, grown with love and harvested at peak freshness.",
      image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      buttonText: "Shop Now",
      buttonLink: "/shop",
      accent: "Fresh & Pure"
    },
    {
      id: 2,
      title: "Sustainable Living",
      subtitle: "Eco-Friendly Products for Modern Life",
      description: "Join the green revolution with our sustainable and environmentally conscious product range.",
      image: "https://images.pexels.com/photos/1212693/pexels-photo-1212693.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      buttonText: "Explore",
      buttonLink: "/shop",
      accent: "Eco-Conscious"
    },
    {
      id: 3,
      title: "Premium Quality",
      subtitle: "Handpicked Excellence",
      description: "Experience the difference with our premium selection of artisanal and carefully curated products.",
      image: "https://images.pexels.com/photos/1389104/pexels-photo-1389104.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      buttonText: "Discover",
      buttonLink: "/shop",
      accent: "Premium Selection"
    }
  ];

  return (
    <div className="relative h-screen">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation={{
          nextEl: '.hero-button-next',
          prevEl: '.hero-button-prev',
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full">
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-2xl">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className="mb-4"
                    >
                      <span className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                        {slide.accent}
                      </span>
                    </motion.div>

                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                      className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
                    >
                      {slide.title}
                    </motion.h1>

                    <motion.h2
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="text-xl md:text-2xl text-green-300 mb-6 font-light"
                    >
                      {slide.subtitle}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                      className="text-lg text-gray-200 mb-8 max-w-lg leading-relaxed"
                    >
                      {slide.description}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="flex flex-col sm:flex-row gap-4"
                    >
                      <Link to={slide.buttonLink}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold transition-colors duration-200 flex items-center gap-2 group"
                        >
                          <ShoppingBag className="h-5 w-5" />
                          {slide.buttonText}
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                      </Link>
                      
                      <Link to="/about">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold transition-all duration-200"
                        >
                          Learn More
                        </motion.button>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <div className="hero-button-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full cursor-pointer transition-all duration-200">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      
      <div className="hero-button-next absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full cursor-pointer transition-all duration-200">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSlider;