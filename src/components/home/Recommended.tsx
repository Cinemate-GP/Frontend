"use client";

import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import SectionTitle from "../SectionTitle";
import MovieSlider from "../SliderCards";
import SliderWrapper from "../SliderWrapper";
import { getCookie } from "@/lib/utils";

interface Movie {
  id: number;
  tmdbId: number;
  imdbRating: string;
  title: string;
  posterPath: string;
  score: number;
}

const RecommendedInner = () => {
  const { data, loading } = useFetch<Movie[]>("/api/Movie/recommender");
  return (
    <div className="space-y-6">
      <SectionTitle title="Recommended For You" />
      <SliderWrapper>
        <MovieSlider
          sliderType="recommended"
          movieList={data}
          loading={loading}
        />
      </SliderWrapper>
    </div>
  );
};

const Recommended = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    setIsAuthenticated(!!getCookie("token"));
  }, []);

  if (!isAuthenticated) return null;
  return <RecommendedInner />;
};

export default Recommended;
