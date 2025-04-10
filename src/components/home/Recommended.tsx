"use client";
import useFetch from "@/hooks/useFetch";
import SectionTitle from "../SectionTitle";
import MovieSlider from "../SliderCards";
import SliderWrapper from "../SliderWrapper";
interface Movie {
  id: number;
  movieId: number;
  tmdbId: number;
  title: string;
  poster_path: string;
}
const Recommended = () => {
  const { data , loading} = useFetch<Movie[]>("/api/Movie/top-ten");
  return (
    <div className="mx-[1rem] sm:mx-0 mt-48 sm:mt-32">
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
