import Image from "next/image";
import { SlReload } from "react-icons/sl";

interface MovieCardProps {
  movies: { id: number; title: string; poster: string,year:string }[];
  resetTest: () => void;
  setLoading: (loading: boolean) => void;
  currentIndex: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movies,
  setLoading,
  resetTest,
  currentIndex,
}: MovieCardProps) => {
  return (
    <>
      <button
        onClick={resetTest}
        className="absolute -right-8 top-1/2 transform -translate-y-1/2"
      >
        <SlReload size={24} />
      </button>
      <Image
        src={movies[Math.min(currentIndex, movies.length - 1)].poster}
        alt={movies[Math.min(currentIndex, movies.length - 1)].title}
        width={300}
        height={450}
        priority
        className="rounded-lg object-cover"
        onLoad={() => setLoading(false)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/5"></div>
      <div className="relative -top-16 w-full flex flex-col justify-center items-center">
        <h2 className="mt-3 text-lg font-semibold">
          {movies[Math.min(currentIndex, movies.length - 1)].title}
        </h2>
        <p>{movies[Math.min(currentIndex, movies.length - 1)].year}</p>
      </div>
    </>
  );
};

export default MovieCard;
