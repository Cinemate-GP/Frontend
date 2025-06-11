"use client";

import { FiSearch, FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import { useState } from "react";

interface SearchInputProps {
  search: string;
  setSearch: (value: string) => void;
  selectedVal: string;
  setSelectedVal: (value: string) => void;
  setShowResults: (show: boolean) => void;
  border?: boolean;
  showFilter?: boolean;
  isNavbar?: boolean;
  isMobile?: boolean;
}

const SearchInput = ({
  search,
  setSearch,
  selectedVal,
  setSelectedVal,
  setShowResults,
  showFilter = false,
  isNavbar = false,
  isMobile = false,
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "Movie", label: "Movies" },
    { value: "Actor", label: "Actors" },
    { value: "User", label: "Users" }
  ];

  const selectedOption = filterOptions.find(option => option.value === selectedVal);

  return (
    <div      className={`
        flex items-center w-full transition-all duration-300 ease-in-out
        bg-background border border-border rounded-xl
        ${isFocused ? 'border-primary/50' : ''}
        ${showFilter ? (isMobile ? 'pl-4 pr-2 py-3' : 'pl-4 pr-2 py-2') : (isMobile ? 'px-4 py-4' : 'px-4 py-3')}
        will-change-transform
        shadow-sm
        gap-2
        focus-within:border-primary/50 focus-within:shadow-none
      `}
      style={{
        // Explicitly override any browser defaults
        outline: 'none !important',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        boxShadow: 'none !important',
        borderColor: isFocused ? 'rgb(230 46 45 / 0.5)' : 'var(--border)'
      }}
    >
      <div className="flex items-center flex-1 min-w-0">        <FiSearch 
          className={`mr-3 flex-shrink-0 text-gray-400 dark:text-gray-500 ${isFocused ? 'text-primary' : ''}`}
          size={isMobile ? 20 : 18}
          data-search-icon="true"
        />        <input
          type="text"
          placeholder="Search movies, actors, users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => {
            setShowResults(true);
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          className={`
            bg-transparent outline-none flex-1 min-w-0 font-medium
            text-foreground placeholder-gray-400 dark:placeholder-gray-500
            transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-0 focus:border-transparent
            focus:shadow-none focus:border-none
            ${isMobile ? 'text-base py-2' : 'text-sm py-2'}
          `}          style={{
            outline: 'none !important',
            border: 'none !important',
            boxShadow: 'none !important',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            appearance: 'none',
            borderColor: 'transparent !important',
            backgroundColor: 'transparent !important',
            color: 'inherit'
          }}
          autoComplete="off"
          spellCheck="false"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="ml-2 p-1 rounded-full transition-colors duration-200 flex-shrink-0 text-gray-400 hover:text-primary hover:bg-primary/10"
            aria-label="Clear search"
          >
            <FiX size={isMobile ? 18 : 16} />
          </button>
        )}
      </div>
      {showFilter && (
        <div className="relative ml-2">          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}            onBlur={() => {
              setTimeout(() => setIsDropdownOpen(false), 150);
            }}
            className={`flex items-center justify-center px-3 py-2 pr-8 rounded-lg font-medium cursor-pointer transition-all duration-200 focus:outline-none min-w-[80px] bg-secondaryBg border border-border text-foreground hover:border-primary/50 relative ${isMobile ? 'text-base py-3' : 'text-sm'}`}
            data-dropdown="custom-filter"
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}            style={{
              outline: 'none !important',
              boxShadow: 'none !important',
              WebkitAppearance: 'none',
              MozAppearance: 'none',
              appearance: 'none',
              borderColor: 'var(--border)',
              backgroundColor: 'var(--secondary-bg)'
            }}
          ><span className="w-full text-center">{selectedOption?.label}</span>
            {isNavbar ? (
              <FiChevronLeft 
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''} text-gray-400`}
                size={14}
              />
            ) : (
              <FiChevronRight 
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''} text-gray-400`}
                size={14}
              />
            )}
          </button>          {isDropdownOpen && (
            <div className={`absolute top-full mt-2 left-0 right-0 flex flex-col gap-1 rounded-xl shadow-xl border border-border z-[60] overflow-hidden bg-secondaryBg animate-fadeInDropdown p-2 ${isMobile ? 'min-w-[120px]' : 'min-w-[100px]'}`}>
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSelectedVal(option.value);
                  }}                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-150 font-medium whitespace-nowrap
                    ${selectedVal === option.value ? 'bg-primary/10 text-primary shadow' : 'text-foreground hover:bg-primary/5'}
                    ${isMobile ? 'text-base py-3' : 'text-sm'}
                  `}
                  role="option"
                  aria-selected={selectedVal === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
