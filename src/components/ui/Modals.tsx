/* eslint-disable @next/next/no-img-element */
"use client";
import { IMAGEPOSTER } from "@/constants";
import { useDebounce } from "@/hooks/useDebounce";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { SearchResultSkeleton } from "../skeletons";

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
        setValues(data.value || []);
      } catch (error) {
        console.error(error);
        setValues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedSearch]);

  return (
    <div
      onClick={onclose}
      className="fixed inset-0 bg-black/80 z-50 flex justify-center items-start overflow-y-auto p-4"
    >
      <div
        className="w-full max-w-3xl bg-gray-900 p-6 rounded-xl shadow-2xl max-h-[95vh] overflow-y-auto custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="bg-[#1e2526] rounded-xl flex items-center px-4 py-2 mb-6">
          <CiSearch className="text-white text-xl" />
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder="Search movies or actors..."
            className="ml-3 bg-transparent outline-none text-white w-full placeholder-gray-400"
          />
        </div>

        {/* Results */}
        <h2 className="text-white text-lg font-semibold mb-3">Results</h2>
        <div className="flex flex-col gap-4">
          {loading && Array.from({ length: 5 }).map((_, idx) => (
            <SearchResultSkeleton key={idx} />
          ))}

          {!loading && values.length === 0 && debouncedSearch.trim().length >= 2 && (
            <p className="text-gray-400">No results found for &quot;{debouncedSearch}&quot;</p>
          )}

          {!loading &&
            values.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center gap-4 min-w-[140px] bg-gray-800 hover:bg-gray-700 transition-colors p-3 rounded-md"
              >
                <img
                  src={movie.poster ? IMAGEPOSTER + movie.poster : './ueser-placeholder.jpg'}
                  alt={movie.name}
                  loading="lazy"
                  className={`w-20 h-20 object-cover ${movie.type === "Actor" ? "rounded-full" : "rounded-md"}`}
                />
                <p className="text-white text-base font-medium">{movie.name}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
