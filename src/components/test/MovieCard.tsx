'use client'
import useFetch from "@/hooks/useFetch";
import { Movie } from "@/lib/types";
import Image from "next/image";

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
    return null;
  }

  return (
    <>
      <Image
        src={movies[Math.min(currentIndex, movies.length - 1)].posterPath}
        alt={movies[Math.min(currentIndex, movies.length - 1)].title}
        width={500}
        height={400}
        priority
        className="rounded-lg object-cover"
        onLoad={() => setLoading(false)}
      />
      <div className="absolute h-[500px] md:h-[560px] inset-0 bg-gradient-to-t from-black via-black/30 to-black/5"></div>
    </>
  );
};

export default MovieCard;
