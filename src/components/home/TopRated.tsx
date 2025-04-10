'use client'
import useFetch from "@/hooks/useFetch";
import SectionTitle from "../SectionTitle";
import MovieSlider from "../SliderCards";
import SliderWrapper from "../SliderWrapper";

interface Movie {
  id:number;
  movieId: number;
  tmdbId: number;
  title: string;
  poster_path: string;
}

const TopRated = () => {
  const {data,loading} = useFetch<Movie[]>('/api/Movie/top-ten')
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
