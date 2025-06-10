"use client";

import { useState, useEffect, useRef } from "react";
import { useSearch } from "@/context/SearchContext";
import { useDebounce } from "@/hooks/useDebounce";
import { FiSearch, FiX } from "react-icons/fi";
import { IMAGEPOSTER } from "@/constants";
import { authFetch } from "@/lib/api";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { SearchResultSkeleton } from "./skeletons";
import SearchInput from "./SearchInput";

interface SearchValue {
  id: number;
  name: string;
  poster: string;
  type: string;
}

interface SearchProps {
  border?: boolean;
  isMobile?: boolean;
  isNavbar?: boolean;
}

export const Search = ({ border, isMobile = false, isNavbar = false }: SearchProps) => {
  const { setSearch, search } = useSearch();
  const [values, setValues] = useState<SearchValue[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVal, setSelectedVal] = useState("all");
  const [showResults, setShowResults] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const debouncedSearch = useDebounce(search, 500);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Fetch results
  useEffect(() => {
    const trimmed = debouncedSearch.trim();
    if (trimmed.length < 2) {
      setValues([]);
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        const res = await authFetch(`/api/Movie/search?SearchValue=${trimmed}`);
        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();
        const results: SearchValue[] = data?.value || [];        if (selectedVal === "all") {
          const priority: Record<string, number> = { User: 0, Movie: 1, Actor: 2 };
          results.sort((a, b) => (priority[a.type] ?? 3) - (priority[b.type] ?? 3));
        }

        const filtered = selectedVal === "all"
          ? results
          : results.filter((item) => item.type === selectedVal);

        setValues(filtered);
      } catch (err) {
        console.error(err);
        setValues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedSearch, selectedVal]);
  // Close on outside click, ESC, or scroll
  useEffect(() => {
    const handleOutside = (e: Event) => {
      const target = e.target as HTMLElement;

      const dropdown = document.querySelector('[data-search-results="true"]');
      const isClickInsideDropdown = dropdown?.contains(target);
      const isClickInsideDropdownFilter = target.closest('[data-dropdown="custom-filter"]');
      const input = searchContainerRef.current?.querySelector('input');
      const icon = searchContainerRef.current?.querySelector('[data-search-icon="true"]');

      if (
        isClickInsideDropdown ||
        isClickInsideDropdownFilter ||
        target === input ||
        icon?.contains(target)
      ) return;

      setShowResults(false);
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowResults(false);
        setShowMobileSearch(false);
      }
    };
    const handleScroll = () => setShowResults(false);

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Blur handling
  useEffect(() => {
    const input = searchContainerRef.current?.querySelector("input");
    const handleBlur = (e: FocusEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement;
      if (relatedTarget?.closest('[data-dropdown="custom-filter"]') || searchContainerRef.current?.contains(relatedTarget)) return;

      setTimeout(() => setShowResults(false), 150);
    };

    input?.addEventListener("blur", handleBlur);
    return () => input?.removeEventListener("blur", handleBlur);
  }, []);

  const getImageUrl = (item: SearchValue) =>
    !item.poster ? "/ueser-placeholder.jpg" : item.type === "User" ? item.poster : IMAGEPOSTER + item.poster;

  const getItemLink = (item: SearchValue) => {
    const routes: Record<string, string> = {
      Movie: `/movies/${item.id}`,
      Actor: `/actors/${item.id}`,
      User: `/user/${item.id}`,
    };
    return routes[item.type] ?? "#";
  };  const renderResults = () => {
    if (loading) return <SearchResultSkeleton />;
    if (!values.length) return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-textMuted">
        <span className="text-base font-medium">No results found</span>
        <span className="text-sm mt-1 opacity-70">Try searching for something else</span>
      </div>
    );
    return (      <div className="space-y-1">
        {values.map((item) => (
          <Link
            href={getItemLink(item)}
            key={`${item.id}-${item.type}`}
            onClick={() => {
              setShowResults(false);
              setShowMobileSearch(false);
            }}
            className={`
              flex items-center gap-3 transition-all duration-150 group rounded-lg
              ${isMobile ? 'p-4' : 'p-3'}
              ${isNavbar 
                ? 'hover:bg-white/5 active:bg-white/10' 
                : 'hover:bg-primary/5 active:bg-primary/10'
              }
              focus:outline-none focus:ring-2 focus:ring-primary/20
              ${isMobile ? 'min-h-[60px]' : ''}
            `}
          >            <div className="relative flex-shrink-0">
              <Image
                src={getImageUrl(item)}
                alt={item.name}
                width={isMobile ? 48 : 44}
                height={isMobile ? 48 : 44}
                className={`
                  rounded-lg object-cover bg-gray-200 dark:bg-gray-700 border border-border/50 shadow-sm transition-transform duration-150 group-hover:scale-105
                  ${isMobile ? 'w-12 h-12' : 'w-11 h-11'}
                `}
              />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className={`
                truncate font-medium text-foreground group-hover:text-primary transition-colors duration-150
                ${isMobile ? 'text-base' : 'text-sm'}
              `}>
                {item.name}
              </span>
              <span className={`
                text-textMuted/80 mt-0.5 capitalize
                ${isMobile ? 'text-sm' : 'text-xs'}
              `}>
                {item.type.toLowerCase()}
              </span>
            </div>
            <div className={`
              opacity-0 group-hover:opacity-100 transition-opacity duration-150
              ${isNavbar ? 'text-white/40' : 'text-primary/40'}
            `}>
              <svg className={`fill-none stroke-currentColor viewBox="0 0 24 24" ${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
        {values.length > 5 && (
          <div className={`
            text-center border-t mt-2 pt-3
            ${isMobile ? 'p-4 text-sm' : 'p-3 text-xs'}
            ${isNavbar 
              ? 'text-white/40 border-white/5' 
              : 'text-gray-400 border-border/30'
            }
          `}>
            {values.length} results found • Scroll for more
          </div>
        )}
      </div>
    );
  };// Mobile version
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
          <FiSearch className="w-5 h-5 mb-1" />
          <span className="text-[10px]">Search</span>
        </Link>        {showMobileSearch && typeof document !== "undefined" &&
          createPortal(
            <div 
              className="fixed inset-0 z-[110] bg-black/90 backdrop-blur-xl"
              onTouchStart={(e) => {
                // Prevent background scroll on mobile
                e.preventDefault();
              }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex-shrink-0 p-4 bg-background/95 backdrop-blur-md border-b border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={() => setShowMobileSearch(false)}
                      className="p-2 rounded-full bg-secondaryBg hover:bg-primary/10 text-foreground transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      aria-label="Close search"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                    <h2 className="text-lg font-semibold text-foreground">Search</h2>
                  </div>
                  
                  {/* Search Input */}
                  <div className="mb-3">                    <SearchInput 
                      search={search}
                      setSearch={setSearch}
                      selectedVal={selectedVal}
                      setSelectedVal={setSelectedVal}
                      setShowResults={() => {}}
                      showFilter={true}
                      isNavbar={false}
                      isMobile={true}
                    />
                  </div>
                  
                  {/* Search hint */}
                  {search.trim().length < 2 && (
                    <p className="text-sm text-gray-400 px-2">
                      Start typing to search for movies, actors, or users...
                    </p>
                  )}
                  
                  {/* Results count */}
                  {search.trim().length >= 2 && !loading && values.length > 0 && (
                    <p className="text-sm text-gray-400 px-2">
                      {values.length} result{values.length !== 1 ? 's' : ''} found
                    </p>
                  )}
                </div>

                {/* Results */}
                <div className="flex-1 overflow-hidden bg-background">
                  {search.trim().length >= 2 && (
                    <div className="h-full overflow-y-auto custom-scrollbar">
                      <div className="p-4">
                        {renderResults()}
                      </div>
                    </div>
                  )}
                  
                  {/* Empty state when no search */}
                  {search.trim().length < 2 && (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                      <FiSearch className="w-16 h-16 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">Search Everything</h3>
                      <p className="text-gray-400 text-sm max-w-sm">
                        Discover movies, find actors, and connect with other users in our community.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>,
            document.body
          )}
      </>
    );
  }// Desktop version
  return (
    <div className="relative w-full" ref={searchContainerRef}>
      <SearchInput {...{ search, setSearch, selectedVal, setSelectedVal, setShowResults, border, showFilter: true, isNavbar }} />
      {showResults && search.trim().length >= 2 && (
        <div
          className={`
            absolute top-full left-0 right-0 mt-2 rounded-xl z-50 overflow-hidden
            max-w-[calc(100vw-2rem)] border transition-all duration-200 ease-in-out
            shadow-2xl animate-fadeIn
            ${isNavbar 
              ? 'bg-black/95 border-white/10 backdrop-blur-md' 
              : 'bg-background border-border backdrop-blur-sm'
            }
          `}
          data-search-results="true"
          style={{backdropFilter: 'blur(20px)'}}
        >
          <div className="py-3 px-3 custom-scrollbar max-h-[420px] overflow-y-auto">
            {renderResults()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
