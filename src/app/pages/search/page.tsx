/* eslint-disable @next/next/no-img-element */
"use client";

import MovieCard from "@/components/MovieCard";
import { Search } from "@/components/Search";
import { MovieGridSkeleton } from "@/components/skeletons";
import { IMAGEPOSTER } from "@/constants";
import { useSearch } from "@/context/SearchContext";
import { useDebounce } from "@/hooks/useDebounce";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Result {
  id: number;
  poster: string;
  name: string;
  type: string;
}

const SearchPage = () => {
  const { search } = useSearch();
  const [searchResult, setSearchResult] = useState<Result[]>([]);
  const [selectedValue, setSelectValue] = useState<string>("all");
  const debouncedValue = useDebounce(search, 500);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/Movie/search?SearchValue=${debouncedValue}`
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        if (selectedValue === "all") {
          setSearchResult(json.value);
        } else {
          setSearchResult(
            json.value.filter((item: Result) => item.type === selectedValue)
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [debouncedValue, selectedValue]);

  return (
    <div className="pt-[5rem] mx-0 sm:mx-[2rem] mb-[4rem] md:mb-0 px-4">
      <div className="block md:hidden">
        <Search border={true} />
      </div>
      <div className="flex items-center justify-between sm:justify-start gap-10 mt-5">
        <h2>Result</h2>
        <select
          onChange={(e) => setSelectValue(e.target.value)}
          className="border focus:outline-none border-gray-500 bg-black text-white py-1 rounded-md w-[150px] sm:w-[200px]"
        >
          <option value="all">All</option>
          <option value="Movie">Movies</option>
          <option value="Actor">Actors</option>
          <option value="User">Users</option>
        </select>
      </div>

      {/* Loading Skeleton */}
      {loading && <MovieGridSkeleton />}

      {/* No results */}
      {!loading && debouncedValue !== "" && searchResult.length === 0 && (
        <p className="mt-3">No Result for &quot;{debouncedValue}&quot;</p>
      )}

      {/* Result Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-7 mt-5 p-4">
        {searchResult.map((item) => {
          if (selectedValue === "all" || selectedValue === "Movie") {
            return (
              <MovieCard
                key={item.id}
                tmdbid={item.id}
                title={item.name}
                image={item.poster ? IMAGEPOSTER + item.poster : "/ueser-placeholder.jpg"}
              />
            );
          } else if (selectedValue === "Actor") {
            return (
              <Link href={`/pages/actors/${item.id}`} key={item.id}>
                <div className="text-center cursor-pointer hover:opacity-80 transition">
                  <img
                    src={
                      item.poster
                        ? IMAGEPOSTER + item.poster
                        : "/ueser-placeholder.jpg"
                    }
                    alt={item.name}
                    className="rounded-md w-full h-[250px] object-cover"
                  />
                  <p className="mt-2 text-white">{item.name}</p>
                </div>
              </Link>
            );
          } else {
            return (
              <div
                key={item.id}
                className="text-center cursor-pointer hover:opacity-80 transition"
              >
                <img
                  src={
                    item.poster
                      ? IMAGEPOSTER + item.poster
                      : "/ueser-placeholder.jpg"
                  }
                  alt={item.name}
                  className="rounded-md w-full h-[250px] object-cover"
                />
                <p className="mt-2 text-white">{item.name}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default SearchPage;
