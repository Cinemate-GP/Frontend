"use client";

import useFetch from "@/hooks/useFetch";
import SectionTitle from "../SectionTitle";
import MovieSlider from "../SliderCards";
import SliderWrapper from "../SliderWrapper";

interface Movie {
  id: number;
  tmdbId: number;
  imdbRating: string;
  title: string;
  posterPath: string;
}

const Recommended = () => {
  const { data, loading } = useFetch<Movie[]>("/api/Movie/top-ten");
  
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

export default Recommended;
