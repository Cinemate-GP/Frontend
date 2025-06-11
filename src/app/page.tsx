"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { getCookie } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaRegPlayCircle, FaStar, FaUsers, FaBookmark, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Page = () => {
  const router = useRouter();
  const token = getCookie("token");
  const { themeMode } = useSelector((state: RootState) => state.theme);

  const features = [
    {
      icon: <FaStar className="text-2xl text-primary" />,
      title: "Rate & Review",
      description: "Share your thoughts and discover movies through personalized ratings"
    },
    {
      icon: <FaUsers className="text-2xl text-primary" />,
      title: "Social Discovery",
      description: "Follow friends and see what movies they're watching and loving"
    },
    {
      icon: <FaBookmark className="text-2xl text-primary" />,
      title: "Personal Library",
      description: "Create watchlists and keep track of your movie journey"
    }
  ];

  return (
    <div className="min-h-screen bg-mainBg relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-mainBg via-secondaryBg/50 to-mainBg" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Logo */}              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3 mb-8"
              >                <Image
                  src="/logo.png"
                  width={50}
                  height={50}
                  alt="CineMate logo"
                  className={`object-contain filter ${
                    themeMode === "light" ? "invert" : ""
                  }`}
                />
                <h1 className="text-3xl font-bold text-foreground">CineMate</h1>
              </motion.div>

              {/* Hero Text */}
              <div className="space-y-6">                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-4xl md:text-6xl font-bold text-foreground leading-tight"
                >
                  Your Movie Journey
                  <span className="text-primary block">Starts Here</span>
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-xl text-textMuted leading-relaxed max-w-xl"
                >
                  Discover, rate, and share your favorite movies with a community of film enthusiasts. 
                  Build your personal cinema universe.
                </motion.p>
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >                {token ? (
                  <button
                    onClick={() => router.push("/home")}
                    className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg 
                             flex items-center gap-3 font-semibold text-lg shadow-xl 
                             hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1
                             hover:scale-105"
                  >
                    <FaRegPlayCircle size={24} />
                    Continue To Dashboard
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => router.push("/signup")}
                      className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg 
                               flex items-center gap-3 font-semibold text-lg shadow-xl 
                               hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1
                               hover:scale-105"
                    >
                      <FaUserPlus size={24} />
                      Get Started
                    </button>

                    <button
                      onClick={() => router.push("/login")}
                      className="bg-transparent hover:bg-white/10 text-foreground border-2 border-border 
                               hover:border-primary/50 px-8 py-4 rounded-lg flex items-center gap-3 
                               font-semibold text-lg backdrop-blur-sm transition-all duration-300 
                               transform hover:-translate-y-1"
                    >
                      <FaSignInAlt size={24} />
                      Sign In
                    </button>
                  </>
                )}
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="flex items-center gap-8 pt-8 border-t border-border/10"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-textMuted">Movies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5K+</div>
                  <div className="text-sm text-textMuted">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-textMuted">Reviews</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >              {/* Movie Preview Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative bg-secondaryBg/80 backdrop-blur-md rounded-2xl p-5 
                         border border-border/10 shadow-2xl hover:shadow-primary/5 
                         transition-all duration-500 group w-full"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-20 h-28 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                    <Image
                      src="/main-img.png"
                      alt="Featured Movie Poster"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                        <FaRegPlayCircle className="text-white text-lg" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">The Cinematic Experience</h3>
                    <p className="text-textMuted text-sm mb-3">Discover trending films and hidden gems in our curated collection</p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-primary text-sm" />
                        ))}
                      </div>
                      <span className="text-textMuted text-sm font-medium">4.8/5</span>
                      <span className="text-textMuted text-xs">• 2.5K reviews</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-textMuted">
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full">Action</span>
                      <span>2h 15m</span>
                      <span>2024</span>
                    </div>
                  </div>
                </div>
                  <div className="border-t border-border/10 pt-3">
                  <p className="text-textMuted text-sm leading-relaxed">
                    Join thousands of movie lovers sharing their passion for cinema and discover your next favorite film.
                  </p>
                </div>
              </motion.div>

              {/* Features List */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}                    className="flex items-start gap-4 p-4 bg-secondaryBg/50 backdrop-blur-sm 
                             rounded-xl border border-border/10 hover:border-primary/30 
                             transition-all duration-300 group hover:bg-secondaryBg/70"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg 
                                  flex items-center justify-center group-hover:bg-primary/20 
                                  transition-colors duration-300">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-textMuted text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-mainBg to-transparent pointer-events-none" />
    </div>
  );
};

export default Page;
