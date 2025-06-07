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
    fetchData();  }, [selected]);
  const popularGenres = geners.slice(0, 8); // Limit to 8 most popular genres
  return (
    <div>
      <div className="flex flex-col gap-4">
        <SectionTitle title="Discover By Genres" />
        <div className="w-full overflow-x-auto custom-scrollbar">
          <div className="flex gap-4 pb-2 min-w-max">
            <button
              onClick={() => setSelected("Geners")}
              className={`px-4 py-2 text-sm transition-all duration-300 relative group ${
                selected === "Geners"
                  ? "text-primary"
                  : "text-textMuted hover:text-primary"
              }`}
            >
              All
              <span className={`absolute -bottom-[2px] left-0 w-full h-[2px] transition-all duration-300 ${
                selected === "Geners" ? "bg-primary w-full" : "bg-primary/0 w-0 group-hover:w-full"
              }`}></span>
            </button>
            {popularGenres.map((gen) => (
              <button
                key={gen.Id}
                onClick={() => setSelected(gen.Name)}
                className={`px-4 py-2 text-sm transition-all duration-300 relative group ${
                  selected === gen.Name
                    ? "text-primary"
                    : "text-textMuted hover:text-primary"
                }`}
              >
                {gen.Name}
                <span className={`absolute -bottom-[2px] left-0 w-full h-[2px] transition-all duration-300 ${
                  selected === gen.Name ? "bg-primary w-full" : "bg-primary/0 w-0 group-hover:w-full"
                }`}></span>
              </button>
            ))}
          </div>
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
