'use client'
import { Movie } from "@/lib/types";
import SectionTitle from "../SectionTitle";
import MovieSlider from "../SliderCards";
import SliderWrapper from "../SliderWrapper";
import useFetch from "@/hooks/useFetch";

const SimilarMovies = () => {
  const { data, loading } = useFetch<Movie[]>("/api/Movie/top-ten");
  return (
    <div>
      <SectionTitle title="You May Like" />
      <SliderWrapper>
        <MovieSlider sliderType="recommended" movieList={data} loading={loading}/>
      </SliderWrapper>
    </div>
  );
};

export default SimilarMovies;
