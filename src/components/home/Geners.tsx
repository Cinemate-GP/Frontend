"use client";

import React, { useEffect, useRef } from "react";
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
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  
  const popularGenres = geners;
  const scrollToSelectedGenre = (genreName: string) => {
    const selectedButton = buttonRefs.current[genreName];
    const container = scrollContainerRef.current;
    
    if (selectedButton && container) {
      // Calculate the scroll position to center the button
      const scrollLeft = selectedButton.offsetLeft - (container.clientWidth / 2) + (selectedButton.clientWidth / 2);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };
  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  };

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };
  // Check scroll buttons on mount and when content changes
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollButtons();
      container.addEventListener('scroll', checkScrollButtons);
      
      // Add wheel scrolling support
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        container.scrollBy({
          left: e.deltaY,
          behavior: 'smooth'
        });
      };
      
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      // Check again after a short delay to ensure all content is loaded
      const timer = setTimeout(checkScrollButtons, 100);
      
      return () => {
        container.removeEventListener('scroll', checkScrollButtons);
        container.removeEventListener('wheel', handleWheel);
        clearTimeout(timer);
      };
    }
  }, [popularGenres]);
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
  // Scroll to selected genre when it changes
  useEffect(() => {
    if (selected) {
      scrollToSelectedGenre(selected);
    }
  }, [selected]);
  
  return (
    <div className="space-y-6">
      <SectionTitle title="Discover By Genres" />      {/* Clean Genre Filter */}
      <div className="bg-secondaryBg/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4">        <div className="relative">
          {/* Left Scroll Button */}
          {canScrollLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
              aria-label="Scroll left"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {/* Right Scroll Button */}
          {canScrollRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
              aria-label="Scroll right"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          <div ref={scrollContainerRef} className={`flex gap-2 overflow-x-auto scrollbar-hide ${canScrollLeft || canScrollRight ? 'px-8' : ''}`}>
            <button
              ref={(el) => { buttonRefs.current["Geners"] = el; }}
              onClick={() => setSelected("Geners")}
              className={`flex-shrink-0 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                selected === "Geners"
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white/5 text-textMuted hover:bg-white/10 hover:text-foreground"
              }`}
            >
              All
            </button>
            
            {popularGenres.map((gen) => (
              <button
                key={gen.Id}
                ref={(el) => { buttonRefs.current[gen.Name] = el; }}
                onClick={() => setSelected(gen.Name)}
                className={`flex-shrink-0 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selected === gen.Name
                    ? "bg-primary text-white shadow-lg"
                    : "bg-white/5 text-textMuted hover:bg-white/10 hover:text-foreground"
                }`}
              >
                {gen.Name}
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
