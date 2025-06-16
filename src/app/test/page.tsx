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
import { authFetch } from "@/lib/api";
import { getCookie, getUserId } from "@/lib/utils";

const MovieRating = () => {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratedCount, setRatedCount] = useState(0);
  const [seenCount, setSeenCount] = useState(0);
  const [ratedMovies, setRatedMovies] = useState<
    { rating: number, movieId: number }[]
  >([]);
  const router = useRouter();

  const rateMovie = async (rating: number, movieId: number, isSeen: boolean) => {
    if (isSeen) {
      setRatedMovies((prev) => [...prev, { rating, movieId }]);
      setRatedCount((prev) => prev + 1);
      try {
        const res = await authFetch("/api/UserRateMovie/Add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          body: JSON.stringify({
            tmdbId: movieId,
            userId: getUserId(),
            stars: rating,
          }),
        });
        if (!res.ok) throw new Error("Failed to add rating");
      } catch (error) {
        console.log(error);
      }
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
        <div className="min-h-screen w-full flex items-center justify-center px-4 bg-background text-foreground relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondaryBg"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/10 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 text-center max-w-2xl space-y-8 animate-fade-in-up">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-modern">
                <MdOutlineMovie size={40} className="text-white" />
              </div>
            </div>
            
            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Discover Your Perfect
                <span className="text-primary block">Movie Match</span>
              </h1>
              <p className="text-textMuted text-lg sm:text-xl max-w-lg mx-auto leading-relaxed">
                Help us understand your taste by rating a few movies. We&apos;ll create personalized recommendations just for you.
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
              <button
                onClick={() => setStep(1)}
                className="group bg-primary hover:bg-primaryHover text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-modern-hover w-full sm:w-auto"
              >
                <span className="flex items-center justify-center gap-2">
                  Start Rating Movies
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
              <button
                onClick={() => router.push("/home")}
                className="text-textMuted hover:text-foreground px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 hover:bg-hoverBg w-full sm:w-auto"
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Rate Movies */}
      {step === 1 && (
        <div className="min-h-screen bg-background text-foreground px-4 py-8 animate-fade-in-up">
          {/* Header */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setStep(0)}
                className="flex items-center gap-2 px-4 py-2 text-textMuted hover:text-foreground transition-colors rounded-lg hover:bg-hoverBg"
              >
                <span>←</span> Back
              </button>
              <button
                onClick={resetTest}
                className="p-2 text-textMuted hover:text-foreground hover:bg-hoverBg rounded-lg transition-all hover:rotate-180"
                title="Reset test"
              >
                <SlReload size={20} />
              </button>
            </div>
            
            {/* Title and Description */}
            <div className="text-center mb-8 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MdOutlineMovie size={24} className="text-primary" />
                </div>
                Rate Movies You&apos;ve Seen
              </h2>
              <p className="text-textMuted text-lg max-w-2xl mx-auto">
                Rate at least <span className="text-primary font-semibold">5 movies</span> to get personalized recommendations.
                <br />
                <span className="text-sm">Skip movies you haven&apos;t seen</span>
              </p>
            </div>

            {/* Progress */}
            <div className="flex justify-center mb-8">
              <Progress ratedCount={ratedCount} minRated={5} />
            </div>

            {/* Movie Card Container */}
            <div className="flex justify-center">
              <div className="relative max-w-sm w-full">
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-20 rounded-2xl">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-textMuted text-sm">Loading next movie...</p>
                    </div>
                  </div>
                )}

                {/* Movie Card */}
                <div className="relative bg-secondaryBg rounded-2xl overflow-hidden shadow-modern border border-border/50">
                  <div className="relative w-full h-[500px]">
                    <MovieCard
                      setLoading={setLoading}
                      currentIndex={currentIndex}
                    />
                  </div>

                  {/* Rating Controls */}
                  <div className="p-6 space-y-4">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default withAuth(MovieRating);
