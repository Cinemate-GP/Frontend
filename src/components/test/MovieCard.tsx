'use client'
import useFetch from "@/hooks/useFetch";
import { Movie } from "@/lib/types";
import Image from "next/image";
import { IMAGEPOSTER } from "@/constants";


interface MovieCardProps {
  setLoading: (loading: boolean) => void;
  currentIndex: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  setLoading,
  currentIndex,
}: MovieCardProps) => {
   const { data:movies } = useFetch<Movie[]>(
    `/api/Profile/start-test`
  );
  
  if (!movies || movies.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-secondaryBg rounded-2xl">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-textMuted">Loading movies...</p>
        </div>
      </div>
    );
  }

  const currentMovie = movies[Math.min(currentIndex, movies.length - 1)];

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src={IMAGEPOSTER+currentMovie.posterPath}
        alt={currentMovie.title}
        fill
        sizes="(max-width: 768px) 100vw, 400px"
        priority
        className="object-cover transition-transform duration-300 hover:scale-105"
        onLoad={() => setLoading(false)}
      />
      
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      
      {/* Movie info overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">        <h3 className="text-lg font-semibold mb-1 overflow-hidden" style={{ 
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {currentMovie.title}
        </h3>
        {currentMovie.releaseDate && (
          <p className="text-sm text-gray-300">
            {new Date(currentMovie.releaseDate).getFullYear()}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
