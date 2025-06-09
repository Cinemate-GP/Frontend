"use client";

import useFetch from "@/hooks/useFetch";
import SectionTitle from "../SectionTitle";
import MovieSlider from "../SliderCards";
import SliderWrapper from "../SliderWrapper";

interface Movie {
  id: number;
  movieId: number;
  imdbRating: string;
  tmdbId: number;
  title: string;
  posterPath: string;
}

const Top10 = () => {
  const { data, loading } = useFetch<Movie[]>("/api/Movie/top-ten");
  
  return (
    <div className="space-y-6">
      <SectionTitle title="Top 10" />
      <SliderWrapper>
        <MovieSlider sliderType="top10" movieList={data} loading={loading} />
      </SliderWrapper>
    </div>
  );
};

export default Top10;
