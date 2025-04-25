import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

interface Result {
  label: string;
  movieId: number;
}

export const useMovieRating = () => {
  const [loading, setLoading] = useState(true);
  const [currentRate, setCurrentRate] = useState(0);
  const [result, setResult] = useState<Result[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const router = useRouter();

  const movies = useMemo(
    () => [
      {
        id: 1,
        title: "The Shawshank Redemption",
        poster:
          "https://image.tmdb.org/t/p/original//d8Ryb8AunYAuycVKDp5HpdWPKgC.jpg",
      },
      {
        id: 2,
        title: "The Dark Knight",
        poster:
          "https://image.tmdb.org/t/p/original//aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
      },
      {
        id: 3,
        title: "Inception",
        poster:
          "https://image.tmdb.org/t/p/original//3L3l6LsiLGHkTG4RFB2aBA6BttB.jpg",
      },
      {
        id: 4,
        title: "Interstellar",
        poster:
          "https://image.tmdb.org/t/p/original//qJ2tW6WMUDux911r6m7haRef0WH.jpg",
      },
      {
        id: 5,
        title: "Pulp Fiction",
        poster:
          "https://image.tmdb.org/t/p/original//uuitWHpJwxD1wruFl2nZHIb4UGN.jpg",
      },
    ],
    []
  );

  const ratings = useMemo(
    () => [
      { label: "Awful", color: "bg-[#869FB4]" },
      { label: "Meh", color: "bg-[#99896D]" },
      { label: "Good", color: "bg-[#F9A11B]" },
      { label: "Amazing", color: "bg-[#F26522]" },
    ],
    []
  );

  const rateMovie = (label: string, movieId: number) => {
    setResult((prev) => [...prev, { label, movieId }]);
    if (currentRate + 1 >= movies.length) {
      setIsFinished(true);
      console.log(result)
    } else {
      setCurrentRate((prev) => prev + 1);
    }
  };

  const reset = () => {
    setCurrentRate(0);
    setResult([]);
    setIsFinished(false);
  };

  const finish = () => {
    router.push("/");
  };

  return {
    loading,
    setLoading,
    currentRate,
    movies,
    ratings,
    isFinished,
    rateMovie,
    reset,
    finish,
  };
};
