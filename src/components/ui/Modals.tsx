/* eslint-disable @next/next/no-img-element */
"use client";
import { IMAGEPOSTER } from "@/constants";
import { useDebounce } from "@/hooks/useDebounce";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { MovieGridSkeleton } from "../skeletons";
import MovieCard from "../MovieCard";
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

export const SearchModal = ({ onclose }: NavbarSearchModalProps) => {
  const [values, setValues] = React.useState<SearchValue[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedVal, setSelectedVal] = React.useState("Movie");
  const debouncedSearch = useDebounce(searchValue, 500);

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
      onClick={onclose}
      className="fixed inset-0 bg-black/80 z-50 flex justify-center items-start"
    >
      <div
        className="w-full max-w-5xl bg-gray-900 p-6 rounded-xl shadow-2xl mb-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="bg-[#1e2526] rounded-xl flex items-center px-4 py-2 mb-6 sticky top-0 z-50">
          <CiSearch className="text-white text-xl" />
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search movies or actors..."
            className="ml-3 bg-transparent outline-none text-white w-full placeholder-gray-400"
          />
        </div>
        <div className="flex justify-between sm:gap-6 gap-0 sm:justify-start items-center mb-3">
          <h2 className="text-white text-lg font-semibold ">Results</h2>
          <select
            className="bg-[#1e2526] text-white px-3 py-1 rounded-md w-[150px]"
            onChange={(e) => setSelectedVal(e.target.value)}
          >
            <option value="Movie">Movies</option>
            <option value="Actor">Actors</option>
          </select>
        </div>
        {/* Results */}
        <div className="flex flex-col gap-4 max-h-[95vh] overflow-auto scrollbar-hidden">
          {loading && <MovieGridSkeleton />}

          {!loading &&
            values.length === 0 &&
            debouncedSearch.trim().length >= 2 && (
              <p className="text-gray-400">
                No results found for &quot;{debouncedSearch}&quot;
              </p>
            )}          {!loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-40">
              {values.map((item) => (
                <>
                  {selectedVal === "Movie" ? (
                    <div key={item.id} onClick={onclose} className="w-full">
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
                    </div>
                  ) : (
                    <div key={item.id} onClick={onclose}>
                      <Link href={`/actors/${item.id}`}>
                        <div className="relative group overflow-hidden rounded-lg">
                          <img
                            src={
                              item.poster
                                ? IMAGEPOSTER + item.poster
                                : "/ueser-placeholder.jpg"
                            }
                            alt={item.name}
                            width={300}
                            height={450}
                            loading="lazy"
                            decoding="async"
                            className="group-hover:scale-110 transition-all duration-500 ease-in-out h-auto w-[300px] max-h-[450px] object-cover rounded"
                          />
                          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 to-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="flex flex-col justify-end h-full p-4 relative group-hover:top-0 top-[3rem] transition-all duration-500">
                              <div className="flex items-center justify-between flex-wrap">
                                <h4>{item.name}</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
