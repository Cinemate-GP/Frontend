'use client'
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState } from "react";

interface MovieCardProps {
  id?: number;
  tmdbid: number;
  title: string;
  image: string;
  imdbRating?: string;
  cardType?: 'top10' | 'default';
}

const MovieCard = ({ id, tmdbid, title, image, imdbRating, cardType = 'default' }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const isTop10 = cardType === 'top10';
    if (isTop10) {
    return (
      <Link href={`/movies/${tmdbid}`} className="block">
        <motion.div 
          className="relative flex items-end group cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Enhanced Number with Background */}
          <motion.div
            className="absolute -z-10 -bottom-2 md:-bottom-8 -left-10 md:-left-16"
            whileHover={{
              scale: 1.1,
              y: -8,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Number Shadow/Glow */}
            <span
              className={`absolute text-stroke-primary transition-all duration-500 ease-out select-none
                ${id === 10 ? 'w-[200px] tracking-[-9px] md:tracking-[-18px]' : ''}
                text-[90px] lg:text-[128px] opacity-30 blur-sm`}
              style={{
                background: 'linear-gradient(45deg, var(--primary), #ff6b6b, var(--primary))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                filter: 'drop-shadow(0 0 10px rgba(230, 46, 45, 0.3))'
              }}
            >
              {id}
            </span>
            
            {/* Main Number */}
            <span
              className={`relative text-stroke-primary transition-all duration-500 ease-out select-none font-black
                ${id === 10 ? 'w-[200px] tracking-[-9px] md:tracking-[-18px]' : ''}
                text-[90px] lg:text-[128px] group-hover:text-primary/80`}
              style={{
                background: 'linear-gradient(135deg, #ffffff, #f0f0f0, #ffffff)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                WebkitTextStroke: '3px var(--primary)',
              }}
            >
              {id}
            </span>
          </motion.div>
            {/* Movie Poster */}
          <motion.div 
            className="relative overflow-hidden rounded-2xl"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
          >
            {/* Ranking Badge */}
            <motion.div 
              className="absolute top-3 right-3 z-20 bg-black/80 backdrop-blur-sm border border-primary/50 rounded-lg px-3 py-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-white font-bold text-sm">#{id}</span>
              <span className="text-primary text-xs ml-1 font-medium">TOP</span>
            </motion.div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            
            <Image
              src={image}
              alt={title}
              width={300}
              height={450}
              className={`transition-all duration-500 ease-out border-2 border-transparent 
                group-hover:border-primary/30 shadow-xl group-hover:shadow-2xl
                ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}              onLoad={() => setImageLoaded(true)}
              priority={Boolean(id && id <= 3)}
            />
            
            {/* Loading placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-2xl" />
            )}
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
          </motion.div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/movies/${tmdbid}`} className="block h-full">
      <motion.div 
        className="relative group rounded-2xl overflow-hidden h-full bg-secondaryBg/50 backdrop-blur-sm border border-white/5"
        whileHover={{ 
          y: -8,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Movie Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={300}
            height={450}
            className={`w-full h-full object-cover transition-all duration-500 ease-out
              group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse" />
          )}
          
          {/* Overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Content */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-4 text-white"
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h4 className="font-semibold text-lg line-clamp-2 mb-2 drop-shadow-lg">
                {title}
              </h4>
              
              {imdbRating && (
                <motion.div 
                  className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full w-fit"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaStar className="text-primary text-sm" />
                  <span className="text-sm font-medium">
                    {imdbRating.split("/")[0]}
                  </span>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
          
          {/* Glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
        </div>
        
        {/* Bottom border accent */}
        <motion.div 
          className="h-1 bg-gradient-to-r from-primary/60 to-primary/20"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0 }}
        />
      </motion.div>
    </Link>
  );
}

export default MovieCard;
