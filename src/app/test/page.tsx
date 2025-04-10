"use client";

import { useMemo, useState } from "react";
import { moviesRates as movies } from "@/lib/placeholders";
import Progress from "@/components/test/Progress";
import MovieCard from "@/components/test/MovieCard";
import RatingButtons from "@/components/test/RatingButtons";
import FinishTest from "@/components/test/FinishTest";
import { useRouter } from "next/navigation";
import withAuth from "@/hoc/WithAuth";

interface Result {
  label: string;
  movieId: number;
}

const MovieRating = () => {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratedCount, setRatedCount] = useState(0);
  const [seenCount, setSeenCount] = useState(0);
  const [result, setResult] = useState<Result[]>([]);
  const [isSkipped, setIsSkipped] = useState(true);
  const router = useRouter();

  

  const rateMovie = (label: string, movieId: number, isSeen: boolean) => {

    if (isSeen) {
      setResult((prev) => [...prev, { label, movieId }]);
      setRatedCount((prev) => prev + 1);
    }
    setSeenCount((prev) => prev + 1);

    if (ratedCount < 4 && currentIndex < movies.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const resetTest = () => {
    setCurrentIndex(0);
    setRatedCount(0);
    setSeenCount(0);
    setResult([]);
  };

  const hideButtons = useMemo(() => {
    return ratedCount >= 5 || seenCount === movies.length;
  }, [ratedCount, seenCount]);

  return (
    <>
      {isSkipped && (
        <div className="h-screen w-full flex items-center justify-center px-4">
          <div className="text-center max-w-xl">
            <h1 className="text-3xl font-bold mb-4 text-white drop-shadow-md text-shdow-glow">
              Find Movies That Match Your Taste
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Rate at least{" "}
              <span className="font-semibold text-red-400">5 movies </span>
              to receive tailored recommendations. If you haven&apos;t seen a
              movie, simply skip it. Start now and explore your next favorite
              film!
            </p>

            <div className="mt-6 flex items-center justify-center gap-6">
              <button
                onClick={() => setIsSkipped(false)}
                className="bg-gradient-to-r from-primary to-red-500 rounded-3xl hover:translate-y-[-3px] shadow-lg hover:shadow-red-500/50 transition-all duration-300 px-6 py-3"
              >
                Start Test
              </button>

              <button
                onClick={() => router.push("/")}
                className="py-3 px-6 border border-gray-300 text-white font-semibold 
                         rounded-full hover:bg-gray-800 hover:border-gray-500 
                         transition-all duration-300"
              >
                Continue Without Test
              </button>
            </div>
          </div>
        </div>
      )}

      {!isSkipped && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
          {/* Progress Bar */}
          <Progress ratedCount={ratedCount} minRated={5} />
          {/* Movie Card */}
          <div className="relative w-72 rounded-lg mx-auto">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <p className="text-white text-sm">Loading...</p>
              </div>
            )}
            <MovieCard
              movies={movies}
              setLoading={setLoading}
              currentIndex={currentIndex}
              resetTest={resetTest}
            />

            {/*  rating buttons  */}
            {!hideButtons && (
              <RatingButtons
                rateMovie={rateMovie}
                movies={movies}
                currentIndex={currentIndex}
              />
            )}

            {/* Finish button */}
            <FinishTest result={result} hideButtons={hideButtons} />
          </div>
        </div>
      )}
    </>
  );
};

export default withAuth(MovieRating);
