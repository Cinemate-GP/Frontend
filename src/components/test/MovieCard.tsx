import Image from "next/image";

interface MovieCardProps {
  movies: { tmdbId: number; title: string; poster: string; year: string }[];
  setLoading: (loading: boolean) => void;
  currentIndex: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movies,
  setLoading,
  currentIndex,
}: MovieCardProps) => {
  return (
    <>
      <Image
        src={movies[Math.min(currentIndex, movies.length - 1)].poster}
        alt={movies[Math.min(currentIndex, movies.length - 1)].title}
        width={500}
        height={400}
        priority
        className="rounded-lg object-cover"
        onLoad={() => setLoading(false)}
      />
      <div className="absolute h-[500px] md:h-[560px] inset-0 bg-gradient-to-t from-black via-black/30 to-black/5"></div>
      {/* <div className="relative bottom-16 w-full flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold">
          {movies[Math.min(currentIndex, movies.length - 1)].title}
        </h2>
        <p>{movies[Math.min(currentIndex, movies.length - 1)].year}</p>
      </div> */}
    </>
  );
};

export default MovieCard;
