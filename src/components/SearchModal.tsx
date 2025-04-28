/* eslint-disable @next/next/no-img-element */
"use client";
import { IMAGEPOSTER } from "@/constants";
import { useDebounce } from "@/hooks/useDebounce";
import React, { useRef, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { MovieGridSkeleton } from "./skeletons";
import MovieCard from "./MovieCard";
import Link from "next/link";

interface NavbarSearchModalProps {
  onclose: () => void;
}

interface SearchValue {
  id: number;
  name: string;
  poster: string;
  type: string;
}

const SearchModal = ({ onclose }: NavbarSearchModalProps) => {
  const [values, setValues] = React.useState<SearchValue[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedVal, setSelectedVal] = React.useState("Movie");
  const debouncedSearch = useDebounce(searchValue, 500);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onclose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onclose]);

  React.useEffect(() => {
    const fetchResults = async () => {
      const trimmed = debouncedSearch.trim();
      if (trimmed.length < 2) {
        setValues([]);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`/api/Movie/search?SearchValue=${trimmed}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setValues(
          data.value.filter((item: SearchValue) => item.type === selectedVal) ||
            []
        );
      } catch (error) {
        console.error(error);
        setValues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedSearch, selectedVal]);

  return (
    <div
      ref={modalRef}
      className="absolute top-full mt-2 w-[300px] md:w-[600px] md:right-0 right-[-250px] bg-gray-900 rounded-xl shadow-2xl border border-gray-800 z-50 max-h-[80vh] overflow-auto"
    >
      <div className="p-4">
        <div className="bg-[#1e2526] rounded-xl flex items-center px-4 py-2 mb-4 sticky top-0">
          <CiSearch className="text-white text-xl" />
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search movies or actors..."
            className="ml-3 bg-transparent outline-none text-white w-full placeholder-gray-400"
          />
        </div>

        <div className="flex justify-between items-center mb-3">
          <h2 className="text-white text-sm font-semibold">Results</h2>
          <select
            className="bg-[#1e2526] text-white text-sm px-3 py-1 rounded-md w-[120px]"
            onChange={(e) => setSelectedVal(e.target.value)}
          >
            <option value="Movie">Movies</option>
            <option value="Actor">Actors</option>
          </select>
        </div>

        <div className="flex flex-col gap-4">
          {loading && <MovieGridSkeleton />}

          {!loading &&
            values.length === 0 &&
            debouncedSearch.trim().length >= 2 && (
              <p className="text-gray-400 text-sm">
                No results found for &quot;{debouncedSearch}&quot;
              </p>
            )}

          {!loading && (
            <div className="grid md:grid-cols-3 grid-cols-2 gap-4">
              {values.map((item) => (
                <div key={item.id} onClick={onclose}>
                  {selectedVal === "Movie" ? (
                    <MovieCard
                      imdbRating=""
                      tmdbid={item.id}
                      title={item.name}
                      image={
                        item.poster
                          ? IMAGEPOSTER + item.poster
                          : "/ueser-placeholder.jpg"
                      }
                    />
                  ) : (
                    <Link href={`/actors/${item.id}`}>
                      <div className="relative group overflow-hidden rounded-lg">
                        <img
                          src={
                            item.poster
                              ? IMAGEPOSTER + item.poster
                              : "/ueser-placeholder.jpg"
                          }
                          alt={item.name}
                          className="w-full h-[200px] object-cover rounded transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                          <h4 className="text-white text-sm">{item.name}</h4>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;