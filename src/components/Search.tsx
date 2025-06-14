"use client";
import { useSearch } from "@/context/SearchContext";
import { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { IMAGEPOSTER } from "@/constants";
import { useDebounce } from "@/hooks/useDebounce";
import Link from "next/link";
import Image from "next/image";
import { createPortal } from "react-dom";
import { SearchResultSkeleton } from "./skeletons";
import { authFetch } from "@/lib/api";

interface SearchValue {
  id: number;
  name: string;
  poster: string;
  type: string;
}

// Utility functions moved outside main component
const getImageUrl = (item: SearchValue) => {
  if (!item.poster) return "/user-placeholder.jpg";
  return item.type === "User" ? item.poster : IMAGEPOSTER + item.poster;
};

const getItemLink = (item: SearchValue) => {
  switch (item.type) {
    case "User":
      return `/${item.id}`;
    case "Movie":
      return `/movies/${item.id}`;
    case "Actor":
      return `/actors/${item.id}`;
    default:
      return "#";
  }
};

// Mobile search modal extracted
interface MobileSearchModalProps {
  search: string;
  setSearch: (search: string) => void;
  selectedVal: string;
  setSelectedVal: (val: string) => void;
  setShowResults: (show: boolean) => void;
  loading: boolean;
  values: SearchValue[];
  setShowMobileSearch: (show: boolean) => void;
}

const MobileSearchModal = ({
  search,
  setSearch,
  selectedVal,
  setSelectedVal,
  setShowResults,
  loading,
  values,
  setShowMobileSearch,
}: MobileSearchModalProps) =>
  typeof document !== "undefined" &&
  createPortal(    <div className="fixed inset-0 bg-black/90 z-[110] flex flex-col">
      <div className="p-4 pt-8">
        {/* Mobile Header with X button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-lg font-semibold">Search</h2>
          <button
            onClick={() => setShowMobileSearch(false)}
            className="text-white hover:text-gray-300 transition-colors p-2"
            aria-label="Close search"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        {/* Search Input - Full Width */}
        <div className="mb-4">
          <SearchInput
            search={search}
            setSearch={setSearch}
            selectedVal={selectedVal}
            setSelectedVal={setSelectedVal}
            setShowResults={setShowResults}
            showFilter={true}
          />
        </div>{search.trim().length >= 2 && (
          <div className="bg-secondaryBg rounded-xl overflow-hidden flex-1 max-h-[70vh] border border-border">
            {loading ? (
              <div className="overflow-y-auto max-h-[70vh] p-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className="flex items-center p-4 border-b border-gray-800/50 animate-pulse last:border-b-0"
                  >
                    <div className="h-14 w-14 flex-shrink-0 rounded-lg bg-gray-800"></div>
                    <div className="ml-4 flex-1">
                      <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : values.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                <FiSearch className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-base">No results found</p>
                <p className="text-sm mt-1">Try searching for &quot;{search}&quot;</p>
              </div>
            ) : (
              <div className="overflow-y-auto max-h-[70vh] custom-scrollbar">
                {values.map((item: SearchValue, index: number) => (
                  <Link
                    href={getItemLink(item)}
                    key={`${item.id}-${item.type}`}
                    onClick={() => setShowMobileSearch(false)}
                    className={`flex items-center p-4 hover:bg-[#252525] active:bg-[#2a2a2a] transition-colors ${
                      index < values.length - 1 ? "border-b border-gray-800/50" : ""
                    }`}
                  >
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-gray-800">
                      <Image
                        src={getImageUrl(item)}
                        alt={item.name}
                        width={56}
                        height={56}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1 min-w-0">
                      <p className="text-white text-base font-medium truncate">
                        {item.name}
                      </p>
                      <div className="flex items-center mt-2">
                        <span
                          className={`text-xs px-2 py-1 rounded-md font-medium ${
                            item.type === "Movie"
                              ? "bg-blue-900/50 text-blue-300"
                              : item.type === "Actor"
                              ? "bg-purple-900/50 text-purple-300"
                              : "bg-green-900/50 text-green-300"
                          }`}
                        >
                          {item.type}
                        </span>
                      </div>
                    </div>
                    <div className="ml-2 text-gray-400">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );

// Desktop search results extracted
interface DesktopSearchResultsProps {
  showResults: boolean;
  search: string;
  loading: boolean;
  values: SearchValue[];
  setShowResults: (show: boolean) => void;
}

const DesktopSearchResults = ({
  showResults,
  search,
  loading,
  values,
  setShowResults,
}: DesktopSearchResultsProps) =>
  showResults && search.trim().length >= 2 && (
    <div className="absolute top-full left-0 right-0 mt-1.5 bg-secondaryBg rounded-xl shadow-2xl border border-border z-50 max-h-[340px] overflow-hidden">
      <div className="py-1">
        {loading && <SearchResultSkeleton />}
        {!loading && values.length === 0 && (
          <p className="text-gray-400 text-sm p-4 text-center">
            No results found for &quot;{search}&quot;
          </p>
        )}
        {!loading && values.length > 0 && (
          <div className="flex flex-col max-h-[340px] overflow-y-auto custom-scrollbar">
            {values.map((item: SearchValue, index: number) => (
              <Link
                href={getItemLink(item)}
                key={`${item.id}-${item.type}`}
                onClick={() => setShowResults(false)}
                className={`flex items-center p-3 hover:bg-hoverBg transition-colors ${
                  index < values.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded">
                  <Image
                    src={getImageUrl(item)}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-foreground text-sm font-medium truncate">
                    {item.name}
                  </p>
                  <div className="flex items-center mt-1">
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded-sm ${
                        item.type === "Movie"
                          ? "bg-blue-900/50 text-foreground"
                          : item.type === "Actor"
                          ? "bg-purple-900/50 text-foreground"
                          : "bg-green-900/50 text-foreground"
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );

export const Search = ({
  isMobile = false,
}: {
  isMobile?: boolean;
}) => {
  const { setSearch, search } = useSearch();
  const [values, setValues] = useState<SearchValue[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVal, setSelectedVal] = useState("all");
  const [showResults, setShowResults] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const debouncedSearch = useDebounce(search, 500);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchResults = async () => {
      const trimmed = debouncedSearch.trim();
      if (trimmed.length < 2) {
        setValues([]);
        return;
      }
      try {
        setLoading(true);
        const res = await authFetch(`/api/Movie/search?SearchValue=${trimmed}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        if (selectedVal === "all") {
          // Order: users, movies, actors
          const allResults: SearchValue[] = data.value || [];
          const users = allResults.filter((item) => item.type === "User");
          const movies = allResults.filter((item) => item.type === "Movie");
          const actors = allResults.filter((item) => item.type === "Actor");
          setValues([...users, ...movies, ...actors]);
        } else {
          setValues(
            data.value.filter((item: SearchValue) => item.type === selectedVal) || []
          );
        }
      } catch (error) {
        console.error(error);
        setValues([]);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [debouncedSearch, selectedVal]);

  // Handle click outside to close results
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(target)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mobile search button for bottom navigation
  if (isMobile) {
    return (
      <>
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setShowMobileSearch(true);
          }}
          className="flex flex-col items-center justify-center h-full text-gray-400 hover:text-primary transition-colors"
        >
          <FiSearch className="w-5 h-5 mb-1" aria-hidden="true" />
          <span className="text-[10px]">Search</span>
        </Link>
        {showMobileSearch && (
          <MobileSearchModal
            search={search}
            setSearch={setSearch}
            selectedVal={selectedVal}
            setSelectedVal={setSelectedVal}
            setShowResults={setShowResults}
            loading={loading}
            values={values}
            setShowMobileSearch={setShowMobileSearch}
          />
        )}
      </>
    );
  }
  return (
    <div className="relative w-full" ref={searchContainerRef}>
      <SearchInput
        search={search}
        setSearch={setSearch}
        selectedVal={selectedVal}
        setSelectedVal={setSelectedVal}
        setShowResults={setShowResults}
        showFilter={true}
      />
      <DesktopSearchResults
        showResults={showResults}
        search={search}
        loading={loading}
        values={values}
        setShowResults={setShowResults}
      />
    </div>
  );
};

// Sub-components for SearchInput
const SearchFilter = ({
  selectedVal,
  setSelectedVal,
  filterOptions,
}: {
  selectedVal: string;
  setSelectedVal: (value: string) => void;
  filterOptions: { value: string; label: string }[];
}) => (
  <div className="flex-shrink-0 flex items-center">
    <div className="relative">      <select
        value={selectedVal}
        onChange={(e) => setSelectedVal(e.target.value)}
        className="appearance-none bg-background text-foreground text-sm font-semibold rounded-lg py-1.5 focus:outline-none transition-colors duration-150 min-w-[60px] text-center shadow-sm cursor-pointer search-filter-select"
        aria-label="Filter search by type"
        style={{
          textAlignLast: 'center',
          textAlign: 'center',
          paddingLeft: '6px',
          paddingRight: '20px'
        }}
      >        {filterOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-background text-foreground text-sm font-semibold text-center"
            style={{ textAlign: 'center', paddingRight: '20px', paddingLeft: '20px' }}
          >
            {option.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-textMuted transition-colors">
        <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </div>
  </div>
);

const SearchInput = ({
  search,
  setSearch,
  selectedVal,
  setSelectedVal,
  setShowResults,
  showFilter = false,
}: {
  search: string;
  setSearch: (s: string) => void;
  selectedVal: string;
  setSelectedVal: (v: string) => void;
  setShowResults: (show: boolean) => void;
  showFilter?: boolean;
}) => {
  const filterOptions = [
    { value: "all", label: "All" },
    { value: "User", label: "Users" },
    { value: "Movie", label: "Movies" },
    { value: "Actor", label: "Actors" },
  ];
  const placeholder = "Search users, movies, actors...";  return (
    <div className={`flex items-center w-full h-12 bg-secondaryBg rounded-2xl focus-within:border-primary transition-colors px-2 gap-2`}>
      <span className="pl-2 pr-1 flex items-center">
        <FiSearch className="text-gray-400 text-lg" />
      </span>
      <input
        value={search}
        onFocus={() => setShowResults(true)}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder={placeholder}
        className="bg-transparent outline-none flex-1 py-2 text-base text-foreground placeholder:text-gray-400 font-medium"
        aria-label="Search input"
      />      {search && (
        <button
          type="button"
          onClick={() => setSearch("")}
          className="text-gray-400 hover:text-primary transition-colors px-1 flex items-center justify-center"
          aria-label="Clear search"
        >
          &#10005;
        </button>
      )}
      {showFilter && (
        <SearchFilter
          selectedVal={selectedVal}
          setSelectedVal={setSelectedVal}
          filterOptions={filterOptions}
        />
      )}
    </div>
  );
};

const NavbarSearch = () => {
  return (
    <div className="w-full max-w-6xl">
      <Search />
    </div>
  );
};

export default NavbarSearch;
