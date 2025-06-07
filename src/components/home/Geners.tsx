"use client";

import React, { useEffect } from "react";
import SectionTitle from "../SectionTitle";
import SliderWrapper from "../SliderWrapper";
import MovieSlider from "../SliderCards";
import { Geners as geners } from "@/constants";

interface Movie {
  id: number;
  tmdbId: number;
  imdbRating: string;
  title: string;
  posterPath: string;
}

const Geners = () => {
  const [selected, setSelected] = React.useState("Geners");
  const [loading, setLoading] = React.useState(true);
  const [filteredData, setFilteredData] = React.useState<Movie[] | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const url =
        selected === "Geners"
          ? `/api/Movie/genres`
          : `/api/Movie/genres?Genere=${selected}`;
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");
        const json = await response.json();
        setFilteredData(json);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selected]);
  
  const popularGenres = geners.slice(0, 8);
  
  return (
    <div className="space-y-6">
      <SectionTitle title="Discover By Genres" />
      
      {/* Clean Genre Filter */}
      <div className="bg-secondaryBg/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setSelected("Geners")}
            className={`flex-shrink-0 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              selected === "Geners"
                ? "bg-primary text-white shadow-lg"
                : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            All
          </button>
          
          {popularGenres.map((gen) => (
            <button
              key={gen.Id}
              onClick={() => setSelected(gen.Name)}
              className={`flex-shrink-0 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                selected === gen.Name
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              {gen.Name}
            </button>
          ))}
        </div>
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
