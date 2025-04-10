"use client";
import React, { useEffect } from "react";
import SectionTitle from "../SectionTitle";
import SliderWrapper from "../SliderWrapper";
import MovieSlider from "../SliderCards";
import { Geners as geners } from "@/constants";
interface Movie {
  id: number;
  movieId: number;
  tmdbId: number;
  title: string;
  poster_path: string;
}
const Geners = () => {
  const [selected, setSelected] = React.useState("Geners");
  const [loading,setLoading] = React.useState(true)
  const [filteredData, setFilteredData] = React.useState<Movie[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const url = selected === "Geners" ? `/api/Movie/genres` : `/api/Movie/genres?Genere=${selected}`
      try {
        setLoading(true)
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");
        const json = await response.json();
        setFilteredData(json);
        
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, [selected]);
  return (
    <div className="mx-[1rem] sm:mx-0 mt-48 sm:mt-32">
      <div className="flex justify-between items-center pr-1 sm:pr-4">
        <SectionTitle title="Descover By Geners" />
        <select
          className="border border-gray-500 bg-black text-white px-4 py-1 rounded-md mb-4 w-[100px] sm:w-[200px]"
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value="">Genres</option>
          {geners.map((gen) => (
            <option key={gen.Id} value={gen.Name}>
              {gen.Name}
            </option>
          ))}
        </select>
      </div>
      <SliderWrapper>
        <MovieSlider
          sliderType="geners"
          movieList={filteredData}
          loading={loading}
        />
      </SliderWrapper>
    </div>
  );
};

export default Geners;
