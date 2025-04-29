"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCookie } from "@/hooks/useCookie";
import { FaPlay, FaSignInAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const token = useCookie();
  const [loading, setLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Modernized feature card data
  const features = [
    {
      icon: "🎬",
      title: "AI Recommendations",
      description: "Personalized film suggestions based on your unique taste"
    },
    {
      icon: "✨",
      title: "Exclusive Content",
      description: "Early access to premieres, director's cuts, and exclusives"
    },
    {
      icon: "🌐",
      title: "Film Community",
      description: "Connect with fellow enthusiasts and critics worldwide"
    }
  ];

  // Auto cycle through feature cards
  useEffect(() => {
    if (loading) return;
    
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % features.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [loading, features.length]);

  // Loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Handle redirect after loading completes
  useEffect(() => {
    if (loading) return;
    
    const timer = setTimeout(() => {
      setIsRedirecting(true);
    }, 10000); // Set a reasonable timeout before redirect

    return () => clearTimeout(timer);
  }, [loading]);

  // Handle redirect
  useEffect(() => {
    if (isRedirecting) {
      const redirectTo = token ? "/home" : "/login";
      router.push(redirectTo);
    }
  }, [isRedirecting, token, router]);

  // Enhanced loading animation
  if (loading) {
    return (
      <div className="h-screen w-full bg-zinc-950 flex items-center justify-center">
        <motion.div 
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Modern circular loader with glow effect */}
          <div className="relative w-20 h-20">
            <div className="absolute inset-0 rounded-full bg-red-600/20 blur-xl animate-pulse"></div>
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="#292524"
                strokeWidth="6"
              />
              <motion.circle
                cx="50" cy="50" r="45"
                fill="none"
                stroke="#dc2626"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0, rotate: 0 }}
                animate={{ 
                  pathLength: [0, 0.5, 0.5, 0], 
                  rotate: 360 
                }}
                transition={{ 
                  duration: 1.5, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  times: [0, 0.5, 0.5, 1]
                }}
                style={{ 
                  rotateZ: 0,
                  originX: "50%", 
                  originY: "50%" 
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-10 h-10 opacity-90"
                style={{ filter: "grayscale(20%)" }}
              />
            </div>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 text-zinc-400 font-light text-base tracking-wider"
          >
            Preparing your cinematic experience...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-screen h-screen max-w-full overflow-hidden bg-zinc-950 text-white">
      {/* Main background image - keeping the background as requested */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <Image 
          src="/main-img.png" 
          alt="Cinema Background" 
          fill 
          priority
          className="object-cover opacity-60"
        />
      </div>
      
      {/* Enhanced cinematic background overlay */}
      <div className="absolute inset-0 z-10">
        {/* Modernized cinema effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Updated gradient animations */}
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.3),rgba(0,0,0,0)_70%)]"
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(220,38,38,0.2),rgba(0,0,0,0)_60%)]"
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          {/* Enhanced film grain texture */}
          <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuMTUiLz48L3N2Zz4=')]"></div>
        </div>
        
        {/* Modernized decorative elements */}
        <motion.div 
          className="absolute -top-20 -left-20 w-96 h-96 opacity-5"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full border-4 border-dashed border-red-600"></div>
        </motion.div>
        
        <motion.div 
          className="absolute -bottom-20 -right-20 w-80 h-80 opacity-5"
          animate={{ rotate: -360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full border-[6px] border-dashed border-red-600"></div>
        </motion.div>
        
        {/* Cinematic bars */}
        <div className="absolute top-0 w-full h-[4vh] bg-black opacity-30"></div>
        <div className="absolute bottom-0 w-full h-[4vh] bg-black opacity-30"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-20 h-full flex flex-col">
        {/* Modern header with glass effect */}
        <header className="pt-6 px-6 md:px-10 flex justify-between items-center">
          {/* Logo with enhanced glow */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <img 
                src="/logo.png" 
                alt="CineMate" 
                className="w-10 h-10 object-contain"
              />
              <div className="absolute -inset-1.5 bg-red-500/20 rounded-full blur-lg -z-10 animate-pulse"></div>
            </div>
            <span className="text-xl font-medium tracking-wide">
              Cine<span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600">Mate</span>
            </span>
          </motion.div>
        </header>

        {/* Main content with modern layout */}
        <div className="flex-1 flex items-center">
          <div className="w-full max-w-screen-xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left column - Enhanced text content */}
            <motion.div
              className="lg:col-span-7 flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Enhanced headline design with glow */}
              <div className="relative">
                <motion.div
                  className="absolute -inset-4 rounded-2xl opacity-20 blur-xl -z-10 bg-gradient-to-br from-red-500 to-red-800"
                  animate={{ 
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    repeatType: "mirror" 
                  }}
                />
                
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-7xl font-bold leading-none tracking-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="relative whitespace-nowrap">
                    <span className="relative z-10">Experience Cinema</span>
                    <motion.div 
                      className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-red-600 to-red-500/0"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1, duration: 1 }}
                    />
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="mt-3"
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-600 to-red-500 relative">
                      Reimagined
                      <motion.div 
                        className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-red-600 to-transparent"
                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />
                    </span>
                  </motion.div>
                </motion.h1>
              </div>
              
              <motion.p
                className="mt-6 text-zinc-300 text-xl max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Discover a revolutionary platform where AI curates 
                <span className="text-red-400"> perfect film experiences </span> 
                tailored to your unique taste and mood.
              </motion.p>
              
              {/* Modern CTA Buttons with enhanced effects */}
              <motion.div
                className="mt-8 flex flex-wrap gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {token ? (
                  <button
                    onClick={() => router.push("/home")}
                    className="group relative px-8 py-3.5 bg-gradient-to-r from-red-700 to-red-600 rounded-lg text-white font-medium overflow-hidden shadow-lg shadow-red-700/20"
                  >
                    <div className="relative z-10 flex items-center gap-2">
                      Continue To Dashboard
                    </div>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => router.push("/signup")}
                      className="group relative px-8 py-3.5 bg-gradient-to-r from-red-700 to-red-600 rounded-lg text-white font-medium overflow-hidden shadow-lg shadow-red-700/20"
                    >
                      <div className="relative z-10 flex items-center gap-2">
                        <FaPlay className="text-xs" />
                        Get Started
                      </div>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </button>
                    
                    <button
                      onClick={() => router.push("/login")}
                      className="group relative px-8 py-3.5 rounded-lg border border-zinc-700 text-white font-medium overflow-hidden"
                    >
                      <div className="relative z-10 flex items-center gap-2">
                        <FaSignInAlt className="text-xs text-red-500" />
                        Sign In
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </button>
                  </>
                )}
              </motion.div>
              
              {/* Social proof section */}
              <motion.div
                className="mt-12 flex items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-800"></div>
                  ))}
                </div>
                <div className="text-sm text-zinc-400">
                  <span className="text-white font-medium">2k+</span> film enthusiasts joined this month
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right column - Modern feature card with glass effect */}
            <div className="lg:col-span-5 relative h-[340px]">
              {/* Cinematic spotlight effects */}
              <motion.div
                className="absolute -top-10 left-1/4 w-40 h-80 bg-gradient-to-b from-red-500/10 via-red-500/5 to-transparent rotate-12 rounded-full blur-2xl"
                animate={{ opacity: [0.5, 0.3, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
              />
              
              {/* Glass morphism feature card with enhanced effects */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-full max-w-xs">
                  {/* Main card with glass effect */}
                  <motion.div
                    className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl overflow-hidden shadow-[0_20px_80px_-12px_rgba(220,38,38,0.25)]"
                    animate={{ 
                      boxShadow: ["0 20px 50px -12px rgba(220,38,38,0.15)", "0 20px 80px -12px rgba(220,38,38,0.25)", "0 20px 50px -12px rgba(220,38,38,0.15)"] 
                    }}
                    transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
                  >
                    {/* Glass reflections */}
                    <div className="absolute -inset-1/2 bg-gradient-to-tr from-white/5 to-transparent rotate-12 opacity-30"></div>
                    
                    {/* Card content with animated transition */}
                    <div className="relative overflow-hidden h-56">
                      <AnimatePresence mode="wait">
                        <motion.div
                          className="flex flex-col items-center text-center absolute inset-0"
                          key={`card-${activeIndex}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                        >
                          <motion.div 
                            className="text-6xl mb-6"
                            animate={{ 
                              scale: [1, 1.1, 1],
                              rotate: [0, 5, 0, -5, 0] 
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            {features[activeIndex].icon}
                          </motion.div>
                          <h3 className="text-xl font-medium mb-3 text-white">{features[activeIndex].title}</h3>
                          <p className="text-zinc-300">{features[activeIndex].description}</p>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    
                    {/* Modern pagination with animated indicator */}
                    <div className="flex justify-center gap-3 mt-6 relative">
                      <div 
                        className="absolute h-0.5 bg-red-600 transition-all duration-300 rounded-full"
                        style={{ 
                          left: `calc(${activeIndex * 33.33}% + 8px)`, 
                          width: 'calc(33.33% - 16px)' 
                        }}
                      ></div>
                      
                      {features.map((_, i) => (
                        <button 
                          key={i}
                          onClick={() => setActiveIndex(i)}
                          className="group relative z-10 py-2 px-1 flex-1"
                          aria-label={`View feature ${i + 1}`}
                        >
                          <div className={`w-full h-0.5 rounded-full transition-all duration-300 ${
                            i === activeIndex 
                              ? 'bg-transparent' 
                              : 'bg-zinc-700 group-hover:bg-zinc-600'
                          }`} />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Enhanced glass reflection effect */}
                  <div className="h-12 w-full overflow-hidden opacity-20">
                    <div 
                      className="w-full h-full bg-white/5 backdrop-blur-xl border-x border-white/10 rotate-x-180 scale-y-[-1] rounded-b-xl"
                      style={{
                        maskImage: 'linear-gradient(to bottom, black, transparent)'
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Enhanced floating particles with glow */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full shadow-lg"
                    style={{
                      width: Math.random() * 4 + 1,
                      height: Math.random() * 4 + 1,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      backgroundColor: i % 3 === 0 ? '#ef4444' : '#f8fafc',
                      boxShadow: i % 3 === 0 ? '0 0 8px rgba(239, 68, 68, 0.5)' : 'none',
                      opacity: Math.random() * 0.3
                    }}
                    animate={{
                      y: [0, -20 - Math.random() * 20, 0],
                      opacity: [0, Math.random() * 0.6 + 0.2, 0],
                      scale: [1, 1.3, 1]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 5,
                      repeat: Infinity,
                      delay: Math.random() * 5
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Modern footer with glass morphism */}
        <div className="mt-auto pb-4 px-6 md:px-10">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent"></div>
          <div className="flex justify-between items-center mt-4 text-xs text-zinc-500">
            <div className="flex items-center gap-6">
              <span>© {new Date().getFullYear()} CineMate</span>
              <div className="hidden sm:flex gap-4">
                <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
                <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
                <a href="#" className="hover:text-zinc-300 transition-colors">Support</a>
              </div>
            </div>
            <motion.div 
              className="text-zinc-400"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Elevating the cinema experience
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;