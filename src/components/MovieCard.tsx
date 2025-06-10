'use client'
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState } from "react";
import { MPARatingBadge } from "@/components/ui/MPARatingBadge";

interface MovieCardProps {
  id?: number;
  tmdbid: number;
  title: string;
  image: string;
  imdbRating?: string;
  mpaRating?: string;
  cardType?: 'top10' | 'default';
}

interface MovieImageProps {
  src: string;
  alt: string;
  isLoaded: boolean;
  onLoad: () => void;
  priority?: boolean;
  className?: string;
}

interface RatingDisplayProps {
  rating: string;
}

// Clean and simple animation variants
const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const titleVariants = {
  initial: { opacity: 0, scale: 0.9 },
  hover: { opacity: 1, scale: 1 }
};

const imageVariants = {
  initial: { scale: 1, filter: "blur(0px)" },
  hover: { 
    scale: 1.03,
    filter: "blur(1px)",
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

// Movie Image component with loading state
const MovieImage = ({ src, alt, isLoaded, onLoad, priority = false, className = "" }: MovieImageProps) => (
  <>
    <Image
      src={src}
      alt={alt}
      width={300}
      height={450}
      className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      onLoad={onLoad}
      priority={priority}
    />
    {/* Loading placeholder */}
    {!isLoaded && (
      <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-2xl" />
    )}
  </>
);

// Rating display component with improved styling
const RatingDisplay = ({ rating }: RatingDisplayProps) => (
  <motion.div 
    className="flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full w-fit border border-white/10"
    whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.7)" }}
    transition={{ duration: 0.2 }}
  >
    <FaStar className="text-primary text-xs" />
    <span className="text-xs font-medium text-white">
      {rating.split("/")[0]}
    </span>
  </motion.div>
);

// Top 10 card variant - shows ranking number with modern styling
const Top10Card = ({ tmdbid, title, image, id }: Pick<MovieCardProps, 'tmdbid' | 'title' | 'image' | 'id'>) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link href={`/movies/${tmdbid}`} className="block">
      <motion.div 
        className="relative group cursor-pointer overflow-hidden rounded-xl"
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={cardVariants}
      >
        <div className="relative aspect-[2/3]">
          <motion.div 
            variants={imageVariants} 
            className="w-full h-full overflow-hidden rounded-xl"
          >
            <MovieImage
              src={image}
              alt={title}
              isLoaded={imageLoaded}
              onLoad={() => setImageLoaded(true)}
              priority={Boolean(id && id <= 3)}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Subtle overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />
          
          {/* Modern ranking number badge */}
          <motion.div 
            className="absolute top-3 left-3 flex items-center justify-center"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0.4 }}
          >
            <div className="relative">
              {/* Main number background */}
              <div className="w-12 h-12 bg-gradient-to-br from-primary/90 to-primary/70 backdrop-blur-sm rounded-full border-2 border-white/20 shadow-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg leading-none">
                  {id || 1}
                </span>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 w-12 h-12 bg-primary/30 rounded-full blur-sm -z-10 group-hover:bg-primary/50 transition-colors duration-300" />
            </div>
          </motion.div>            {/* Movie title on hover */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-4 backdrop-blur-sm"
            variants={{
              initial: { opacity: 0, y: 20 },
              hover: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h4 className="text-white font-semibold text-sm line-clamp-2 drop-shadow-lg">
              {title}
            </h4>
          </motion.div>
          
          {/* Subtle hover effect */}
          <motion.div 
            className="absolute inset-0 bg-primary/5 rounded-xl"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </motion.div>
    </Link>
  );
};

// Default card variant - clean, always shows info
const DefaultCard = ({ tmdbid, title, image, imdbRating, mpaRating }: Pick<MovieCardProps, 'tmdbid' | 'title' | 'image' | 'imdbRating' | 'mpaRating'>) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link href={`/movies/${tmdbid}`} className="block h-full">
      <motion.div 
        className="relative group h-full bg-gray-900/10 backdrop-blur-sm border border-white/5 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        {/* Movie Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <motion.div 
            variants={imageVariants} 
            className="w-full h-full"
          >
            <MovieImage
              src={image}
              alt={title}
              isLoaded={imageLoaded}
              onLoad={() => setImageLoaded(true)}
              className="w-full h-full object-cover"
            />          </motion.div>
          
          {/* Gentle overlay - always visible, lighter */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            {/* Ratings - always visible */}
          <div className="absolute bottom-3 left-3 right-3 z-10 flex justify-between items-end">
            {imdbRating && (
              <RatingDisplay rating={imdbRating} />
            )}            {mpaRating && (
              <MPARatingBadge 
                rating={mpaRating}
                size="small"
                showTooltip={false}
                variant="default"
              />
            )}
          </div>{/* Movie title on hover - appears in bottom area */}
          <motion.div 
            className="absolute bottom-16 left-3 right-3"
            variants={titleVariants}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h4 className="text-white font-semibold text-xs text-center line-clamp-2 drop-shadow-lg">
              {title}
            </h4>
          </motion.div>
        </div>
        
        {/* Subtle accent line */}
        <motion.div 
          className="h-0.5 bg-primary/20 group-hover:bg-primary/50 transition-colors duration-300"
        />
      </motion.div>
    </Link>
  );
};

// Main MovieCard component
const MovieCard = ({ id, tmdbid, title, image, imdbRating, mpaRating, cardType = 'default' }: MovieCardProps) => {
  const isTop10 = cardType === 'top10';
  
  if (isTop10) {
    return <Top10Card tmdbid={tmdbid} title={title} image={image} id={id} />;
  }
  
  return <DefaultCard tmdbid={tmdbid} title={title} image={image} imdbRating={imdbRating} mpaRating={mpaRating} />;
};

export default MovieCard;
