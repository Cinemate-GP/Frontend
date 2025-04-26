"use client";
import { useSearch } from "@/context/SearchContext";
import { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { IMAGEPOSTER } from "@/constants";
import { useDebounce } from "@/hooks/useDebounce";
import Link from "next/link";
import Image from "next/image";
import { createPortal } from "react-dom";

interface SearchValue {
  id: number;
  name: string;
  poster: string;
  type: string;
}

export const Search = ({ border, isMobile = false }: { border?: boolean, isMobile?: boolean }) => {
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
        const res = await fetch(`/api/Movie/search?SearchValue=${trimmed}`);
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        
        if (selectedVal === "all") {
          setValues(data.value || []);
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
      if (searchContainerRef.current && !searchContainerRef.current.contains(target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getImageUrl = (item: SearchValue) => {
    if (!item.poster) return "/ueser-placeholder.jpg";
    return item.type === "User" ? item.poster : IMAGEPOSTER + item.poster;
  };

  const getItemLink = (item: SearchValue) => {
    switch (item.type) {
      case "Movie":
        return `/pages/movies/${item.id}`;
      case "Actor":
        return `/pages/actors/${item.id}`;
      case "User":
        return `/pages/users/${item.id}`;
      default:
        return "#";
    }
  };

  // Mobile search button for bottom navigation
  if (isMobile) {
    return (
      <>
        <button 
          onClick={() => setShowMobileSearch(true)} 
          className="flex flex-col items-center justify-center"
        >
          <CiSearch className="w-5 h-5" aria-hidden="true" />
          <span className="text-[12px]">Search</span>
        </button>
        
        {showMobileSearch && typeof document !== 'undefined' && createPortal(
          <div className="fixed inset-0 bg-black/90 z-[110] flex flex-col">
            <div className="p-4 pt-8">
              <div className="flex items-center mb-4">
                <button 
                  onClick={() => setShowMobileSearch(false)} 
                  className="mr-4 text-white"
                >
                  Cancel
                </button>
                <div className="flex-1">
                  <SearchInput 
                    search={search}
                    setSearch={setSearch}
                    selectedVal={selectedVal}
                    setSelectedVal={setSelectedVal}
                    setShowResults={setShowResults}
                  />
                </div>
              </div>
              
              {search.trim().length >= 2 && (
                <div className="bg-[#121212] rounded-xl overflow-hidden flex-1 max-h-[calc(100vh-140px)]">
                  {loading ? (
                    <div className="overflow-y-auto max-h-[calc(100vh-140px)]">
                      {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="flex items-center p-3 border-b border-gray-800/50 animate-pulse">
                          <div className="h-12 w-12 flex-shrink-0 rounded bg-gray-800"></div>
                          <div className="ml-3 flex-1">
                            <div className="h-3 bg-gray-800 rounded w-3/4 mb-2"></div>
                            <div className="h-2 bg-gray-800 rounded w-1/4"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : values.length === 0 ? (
                    <div className="p-4 text-center text-gray-400">
                      No results found for &quot;{search}&quot;
                    </div>
                  ) : (
                    <div className="overflow-y-auto max-h-[calc(100vh-140px)]">
                      {values.map((item, index) => (
                        <Link 
                          href={getItemLink(item)} 
                          key={`${item.id}-${item.type}`}
                          onClick={() => setShowMobileSearch(false)}
                          className={`flex items-center p-3 hover:bg-[#252525] transition-colors ${
                            index < values.length - 1 ? 'border-b border-gray-800/50' : ''
                          }`}
                        >
                          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded bg-gray-800">
                            <Image
                              src={getImageUrl(item)}
                              alt={item.name}
                              width={48}
                              height={48}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-white text-sm font-medium truncate">{item.name}</p>
                            <div className="flex items-center mt-1">
                              <span className={`text-xs px-1.5 py-0.5 rounded-sm ${
                                item.type === "Movie" ? "bg-blue-900/50 text-blue-300" :
                                item.type === "Actor" ? "bg-purple-900/50 text-purple-300" :
                                "bg-green-900/50 text-green-300"
                              }`}>
                                {item.type}
                              </span>
                            </div>
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
        )}
      </>
    );
  }

  return (
    <div 
      className="relative w-full" 
      ref={searchContainerRef}
    >
      <SearchInput 
        search={search}
        setSearch={setSearch}
        selectedVal={selectedVal}
        setSelectedVal={setSelectedVal}
        setShowResults={setShowResults}
        border={border}
        showFilter={true}
      />

      {showResults && search.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#191919] rounded-xl shadow-2xl border border-gray-800 z-50 max-h-[calc(100vh-200px)] overflow-hidden">
          <div className="py-1">
            {loading && (
              <div className="px-4 py-2">
                <div className="flex flex-col space-y-3">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="flex items-center space-x-3 animate-pulse">
                      <div className="h-12 w-12 rounded bg-gray-800"></div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-800 rounded w-3/4 mb-2"></div>
                        <div className="h-2 bg-gray-800 rounded w-1/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!loading && values.length === 0 && (
              <p className="text-gray-400 text-sm p-4 text-center">
                No results found for &quot;{search}&quot;
              </p>
            )}

            {!loading && values.length > 0 && (
              <div className="flex flex-col max-h-[calc(100vh-200px)] overflow-y-auto">
                {values.map((item, index) => (
                  <Link 
                    href={getItemLink(item)} 
                    key={`${item.id}-${item.type}`}
                    onClick={() => setShowResults(false)}
                    className={`flex items-center p-3 hover:bg-[#252525] transition-colors ${
                      index < values.length - 1 ? 'border-b border-gray-800/50' : ''
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
                      <p className="text-white text-sm font-medium truncate">{item.name}</p>
                      <div className="flex items-center mt-1">
                        <span className={`text-xs px-1.5 py-0.5 rounded-sm ${
                          item.type === "Movie" ? "bg-blue-900/50 text-blue-300" :
                          item.type === "Actor" ? "bg-purple-900/50 text-purple-300" :
                          "bg-green-900/50 text-green-300"
                        }`}>
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
                {values.length > 4 && (
                  <div className="p-2 text-center text-xs text-gray-500 border-t border-gray-800">
                    Scroll for more results
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const SearchInput = ({ 
  search, 
  setSearch, 
  selectedVal, 
  setSelectedVal, 
  setShowResults, 
  border = false,
  showFilter = false
}: { 
  search: string, 
  setSearch: (s: string) => void, 
  selectedVal: string, 
  setSelectedVal: (v: string) => void, 
  setShowResults: (show: boolean) => void, 
  border?: boolean,
  showFilter?: boolean
}) => {
  const filterOptions = [
    { value: "all", label: "All" },
    { value: "Movie", label: "Movies" },
    { value: "Actor", label: "Actors" },
    { value: "User", label: "Users" },
  ];
  
  return (
    <div className={`flex items-center h-12 bg-[#1a1a1a] rounded-xl overflow-hidden border border-gray-800 focus-within:border-red-500/70 transition-colors ${
      border ? "p-[2px] pl-3" : "pl-3"
    }`}>
      <CiSearch className="text-gray-400 text-xl flex-shrink-0" />
      
      <input
        value={search}
        onFocus={() => setShowResults(true)}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search movies, actors, users..."
        className="bg-transparent outline-none flex-1 mx-3 py-2.5 text-sm text-white placeholder-gray-400"
      />
      
      {showFilter && (
        <div className="flex-shrink-0 h-full">
          <select
            value={selectedVal}
            onChange={(e) => setSelectedVal(e.target.value)}
            className="h-full bg-[#292929] border-none outline-none text-gray-300 px-3 sm:px-4 border-l border-gray-700 cursor-pointer"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

const NavbarSearch = () => {
  return (
    <div className="ml-[1rem] sm:ml-[2rem] w-full max-w-[600px]">
      <Search />
    </div>
  );
};

export default NavbarSearch;
