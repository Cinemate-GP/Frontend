/* eslint-disable @next/next/no-img-element */
"use client";
import { useDebounce } from "@/hooks/useDebounce";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";

interface SignInModalProps {
  onClose: () => void;
  message?: string;
}

export const SignInModal = ({ onClose, message = "Sign in to save your activity" }: SignInModalProps) => {
  const router = useRouter();
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-secondaryBg rounded-2xl shadow-2xl border border-border p-8 flex flex-col items-center gap-5"
      >
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground mb-1">Sign in required</h2>
          <p className="text-sm text-textMuted">{message}</p>
        </div>
        <div className="flex gap-3 w-full">
          <button
            onClick={() => router.push("/login")}
            className="flex-1 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="flex-1 py-2.5 border border-border hover:bg-hoverBg text-foreground rounded-lg font-medium transition-colors"
          >
            Sign Up
          </button>
        </div>
        <button onClick={onClose} className="text-sm text-textMuted hover:text-foreground transition-colors">
          Continue browsing
        </button>
      </div>
    </div>
  );
};
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
