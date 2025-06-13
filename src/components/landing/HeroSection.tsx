import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { getCookie } from "@/lib/utils";
import { Movie } from "@/lib/types";
import { IMAGEPOSTER } from "@/constants";
import React, { useRef, useEffect, useState } from "react";

interface HeroSectionProps {
  trending: Movie[];
}

// Custom hook for seamless infinite scroll
function useInfiniteScroll(length: number, duration: number, direction: 'up' | 'down') {
  const [y, setY] = useState(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    let frame: number;
    function animate(now: number) {
      if (startTime.current === null) startTime.current = now;
      const elapsed = now - startTime.current;
      const totalHeight = length;
      const speed = totalHeight / (duration * 1000); // px/ms
      let nextY = (direction === 'up' ? -1 : 1) * speed * elapsed;
      // Loop
      if (Math.abs(nextY) >= totalHeight) {
        startTime.current = now;
        nextY = 0;
      }
      setY(nextY);
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      startTime.current = null;
    };
  }, [length, duration, direction]);
  return y;
}

const HeroSection = ({ trending }: HeroSectionProps) => {
  const router = useRouter();
  const token = getCookie("token");
  const posterArt = trending?.slice(0, 10).map(m => ({ src: IMAGEPOSTER + m.posterPath })) || [];

  // Responsive poster settings
  const posterHeight = 135 + 20; // Desktop: 135px + 20px gap (adjusted for desktop)
  const postersPerCol = 8; // Optimized count
  const duration = 25; // Slightly slower for better viewing

  // Pre-calculate the hook values for each column to avoid calling hooks in loops
  const totalHeight = posterHeight * postersPerCol;
  const y0 = useInfiniteScroll(totalHeight, duration, 'up');
  const y1 = useInfiniteScroll(totalHeight, duration, 'down');
  const y2 = useInfiniteScroll(totalHeight, duration, 'up');
  const yValues = [y0, y1, y2];

  return (
    <div className="relative h-screen flex items-center overflow-hidden z-10">
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-start justify-center w-full gap-6 sm:gap-8 lg:gap-12">
          {/* Logo and Brand */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 sm:gap-4 lg:gap-6"
          >
            <Image
              src="/logo.png"
              alt="CineMate Logo"
              width={64}
              height={64}
              className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
              priority
            />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight drop-shadow-lg select-none">
              <span className="text-white">Cine</span><span className="text-primary">Mate</span>
            </span>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-full sm:max-w-2xl space-y-4 sm:space-y-6 lg:space-y-8"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-white leading-tight">
              Your Ultimate
              <span className="text-primary block mt-1 sm:mt-2">
                Movie Companion
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 leading-relaxed max-w-lg">
              Discover new movies, track your favorites, and connect with a community of movie enthusiasts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
              {token ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push("/home")}
                  className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-xl 
                           flex items-center justify-center gap-3 font-medium text-base sm:text-lg transition-all duration-300
                           shadow-lg shadow-primary/20 w-full sm:w-auto min-w-[180px]"
                >
                  <FaPlay className="text-sm sm:text-xl" />
                  Go to Dashboard
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/signup")}
                    className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-xl 
                             flex items-center justify-center gap-3 font-medium text-base sm:text-lg transition-all duration-300
                             shadow-lg shadow-primary/20 w-full sm:w-auto min-w-[140px]"
                  >
                    Get Started
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push("/login")}
                    className="bg-white/10 hover:bg-white/20 text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-xl 
                             flex items-center justify-center gap-3 font-medium text-base sm:text-lg backdrop-blur-sm 
                             transition-all duration-300 shadow-lg w-full sm:w-auto min-w-[120px]"
                  >
                    Sign In
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>

          {/* Mobile: Horizontal sliding row */}
          <div className="sm:hidden w-full overflow-hidden">
            <div className="flex gap-4 animate-scroll-horizontal">
              {posterArt.concat(posterArt).map((poster, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="flex-shrink-0 relative w-[80px] h-[120px] rounded-lg overflow-hidden bg-gray-800 shadow-lg"
                  style={{
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  }}
                >
                  <Image
                    src={poster.src}
                    alt="Trending Movie Poster"
                    fill={true}
                    className="object-cover rounded-lg transition-all duration-300"
                    priority={i < 6}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Collage Background and Overlays */}
      <div className="absolute inset-0 z-0">
        {/* Overlays */}
        <div className="absolute inset-0 bg-black/60 z-0" />
        {/* Desktop gradient - stronger left side for text readability */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40 z-0" />
        {/* Mobile gradient - simpler since no poster collage behind text */}
        <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-0" />
        
        {/* Desktop: Vertical Collage | Mobile: Hidden (replaced with horizontal slider below) */}
        <div className="hidden sm:block absolute left-1/2 top-0 h-full w-[45%] overflow-visible pointer-events-none z-10">
          <div className="relative w-full h-[80vh] flex flex-row items-center justify-center gap-4 lg:gap-8" style={{ top: '8vh' }}>
            {posterArt.length > 0 && [0, 1, 2].map(col => {
              // Offset posters for each column
              const posters = Array.from({ length: postersPerCol }).map((_, i) => {
                const offset = (i + col * 3) % posterArt.length;
                return posterArt[offset];
              });
              // Triple for seamlessness
              const postersLoop = posters.concat(posters, posters);
              // Use pre-calculated hook values
              const y = yValues[col];
              return (
                <div
                  key={col}
                  className="flex flex-col gap-4 lg:gap-8"
                  style={{ 
                    marginTop: col === 1 ? '20px' : col === 2 ? '40px' : '0',
                    willChange: 'transform',
                    transform: `translateY(${y}px)`
                  }}
                >
                  {postersLoop.map((p, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.1, rotate: 2 }}
                      className="group relative w-[90px] h-[135px] lg:w-[110px] lg:h-[165px] 
                               shadow-lg rounded-xl overflow-hidden bg-gray-800"
                      style={{
                        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                      }}
                    >
                      <Image
                        src={p.src}
                        alt="Trending Movie Poster"
                        fill={true}
                        className="object-cover rounded-xl shadow-xl group-hover:brightness-110 \
                                 group-hover:shadow-2xl group-hover:ring-4 group-hover:ring-primary/60 \
                                 transition-all duration-300"
                        priority={i < 4}
                      />
                    </motion.div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 