"use client";

import useFetch from "@/hooks/useFetch";
import MovieSlider from "../SliderCards";

interface Movie {
  id: number;
  movieId: number;
  tmdbId: number;
  title: string;
  poster_path: string;
}
const Top10 = () => {
  const { data , loading } = useFetch<Movie[]>("/api/Movie/top-ten");
  return (
    <div className="mx-[2rem] mt-12 sm:mt-24">
      <div className="flex gap-4 items-center mb-5">
        <h1 className="ml-3">
          <span className="text-stroke-primary !text-[40px] sm:!text-[80px] lg:!text-[128px] -mr-0 sm:-mr-3">
            T
          </span>
          <span className="text-stroke-primary !text-[40px] sm:!text-[80px] lg:!text-[128px]">
            O
          </span>
          <span className="text-stroke-primary !text-[40px] sm:!text-[80px] lg:!text-[128px] mr-2 -ml-0 sm:-ml-3">
            P
          </span>
          <span className="text-stroke-primary !text-[40px] sm:!text-[80px] lg:!text-[128px]">
            1
          </span>
          <span className="text-stroke-primary !text-[40px] sm:!text-[80px] lg:!text-[128px] -ml-0 sm:-ml-3">
            0
          </span>
        </h1>
        <span className="uppercase text-[14px] md:text-2xl tracking-[0.4rem]">
          content
          <br /> today
        </span>
      </div>
      <MovieSlider sliderType="top10" movieList={data} loading={loading} />
    </div>
  );
};

export default Top10;
