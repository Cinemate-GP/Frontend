/* eslint-disable @next/next/no-img-element */
"use client";
import { useDebounce } from "@/hooks/useDebounce";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { MovieGridSkeleton } from "../skeletons";

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
      className="fixed inset-0 bg-black/80 z-50 flex justify-center items-start animate-fadeIn"
    >
      <div
        className="w-full max-w-5xl bg-background p-6 rounded-2xl shadow-2xl mb-10 border border-border mt-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="bg-secondaryBg rounded-xl flex items-center px-4 py-2 mb-6 sticky top-0 z-50 border border-border">
          <CiSearch className="text-primary text-xl" />
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search movies or actors..."
            className="ml-3 bg-transparent outline-none text-foreground w-full placeholder-gray-400 text-base"
          />
        </div>
        <div className="flex justify-between sm:gap-6 gap-0 sm:justify-start items-center mb-3">
          <h2 className="text-foreground text-lg font-semibold ">Results</h2>
          <select
            className="bg-secondaryBg text-foreground px-3 py-1 rounded-md w-[150px] border border-border focus:ring-2 focus:ring-primary/30"
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
              <p className="text-textMuted">
                No results found for &quot;{debouncedSearch}&quot;
              </p>
            )}
          {!loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-40">
              {values.map((item) => (
                <div
                  key={item.id}
                  className="bg-background rounded-xl border border-border p-3 flex flex-col items-center shadow-sm"
                >
                  <img
                    src={item.poster}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover mb-2 border border-border"
                  />
                  <span className="font-semibold text-foreground text-center truncate w-full">
                    {item.name}
                  </span>
                  <span className="text-xs text-textMuted mt-1">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
