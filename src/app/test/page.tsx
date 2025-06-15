"use client";

import { useMemo, useState } from "react";
import { moviesRates as movies } from "@/lib/placeholders";
import Progress from "@/components/test/Progress";
import MovieCard from "@/components/test/MovieCard";
import RatingButtons from "@/components/test/RatingButtons";
import FinishTest from "@/components/test/FinishTest";
import { useRouter } from "next/navigation";
import withAuth from "@/hoc/withAuthContainer";
import { MdOutlineMovie } from "react-icons/md";
import { SlReload } from "react-icons/sl";



const MovieRating = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratedCount, setRatedCount] = useState(0);
  const [seenCount, setSeenCount] = useState(0);
  const [ratedMovies, setRatedMovies] = useState<
    { rating:number, movieId: number }[]
  >([]);
  const router = useRouter();

  const rateMovie = (rating:number, movieId: number, isSeen: boolean) => {
    if (isSeen) {
      setRatedMovies((prev) => [...prev, { rating, movieId }]);
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
    setRatedMovies([]);
  };

  const hideButtons = useMemo(() => {
    return ratedCount >= 5 || seenCount === movies.length;
  }, [ratedCount, seenCount]);

  return (
    <>
      {/* Step 0: Introduction */}
      {step === 0 && (
        <div className="h-screen w-full flex items-center justify-center px-4 bg-background text-foreground">
          <div className="text-center max-w-xl space-y-5 animate-fadeIn">
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">
              🎬 Find Movies That Match Your Taste
            </h1>
            <p className="text-textMuted text-sm sm:text-base">
              Let&#39;s build your recommendation profile! This test will help
              us suggest movies you might love.
            </p>
            <div className="flex justify-center items-center gap-4 sm:gap-6 mt-6">
              <button
                onClick={() => setStep(1)}
                className="bg-primary hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300 px-5 py-2 sm:px-6 sm:py-3 text-sm rounded-lg text-white font-medium"
              >
                Start Test 🚀
              </button>
              <button
                onClick={() => router.push("/login")}
                className="border border-gray-300 text-sm px-5 py-2 rounded-lg text-foreground hover:bg-gray-700 hover:text-white transition"
              >
                Skip Test
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Step 2: Rate Movies */}
      {step === 1 && (
        <div className="flex flex-col items-center justify-start min-h-screen bg-background text-foreground px-4 py-6 animate-fadeIn">
          <div className="text-center max-w-2xl mb-4 space-y-3">
            {/* Back Button */}
            <button
              onClick={() => setStep(1)}
              className="self-start mb-4 px-4 py-1.5 text-sm bg-transparent border border-border rounded-md hover:bg-border transition"
            >
              ← Back
            </button>
            <h2 className="text-2xl font-bold flex items-center justify-center gap-2 text-primary">
              <MdOutlineMovie size={24} /> Rate Movies You’ve Seen
            </h2>
            <p className="text-[16px] text-textMuted">
              👇 Rate at least{" "}
              <strong className="text-primary">5 movies</strong> to get your
              recommendations.
              <br />
              If you haven’t seen a movie, just skip it!
            </p>
          </div>
          <button
            onClick={resetTest}
            className="hover:text-primary transition-all duration-300"
          >
            <SlReload size={24} />
          </button>
          <Progress ratedCount={ratedCount} minRated={5} />

          <div className="relative w-[320px] md:w-[360px] lg:w-[400px] mt-3 pb-4 shadow-xl rounded-xl overflow-hidden border border-border bg-card transition-all duration-300">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 rounded-xl">
                <p className="text-white text-sm">Loading...</p>
              </div>
            )}

            <div className="relative w-full h-[420px] rounded-xl bg-background shadow-sm flex flex-col">
              <MovieCard
                movies={movies}
                setLoading={setLoading}
                currentIndex={currentIndex}
              />
            </div>

            {/* Add padding and constrain height for buttons only */}
            <div className="p-3 max-h-[140px] overflow-visible flex flex-col gap-3">
              {!hideButtons && (
                <RatingButtons
                  rateMovie={rateMovie}
                  movies={movies}
                  currentIndex={currentIndex}
                />
              )}

              <FinishTest
                result={{
                  ratedMovies: ratedMovies.map(({ rating, movieId }) => ({
                    rating,
                    movieId,
                  })),
                }}
                hideButtons={hideButtons}
                resetTest={resetTest}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withAuth(MovieRating);
