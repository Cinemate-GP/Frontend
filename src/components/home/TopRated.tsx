'use client'
import useFetch from "@/hooks/useFetch";
import SectionTitle from "../SectionTitle";
import MovieSlider from "../SliderCards";
import SliderWrapper from "../SliderWrapper";

interface Movie {
  id:number;
  tmdbId: number;
  title: string;
  imdbRating: string;
  posterPath: string;
}

const TopRated = () => {
  const {data,loading} = useFetch<Movie[]>('/api/Movie/top-rated')
  return (
    <div className="">
      <SectionTitle title="Top Rated" />
      <SliderWrapper>
        <MovieSlider sliderType="topRated" movieList={data} loading={loading}/>
      </SliderWrapper>
    </div>
  );
};

export default TopRated;
