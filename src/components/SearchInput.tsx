"use client";

import { FiSearch } from "react-icons/fi";


const SearchInput = ({
  search,
  setSearch,
  selectedVal,
  setSelectedVal,
  setShowResults,
  border = false,
  showFilter = false,
}: {
  search: string;
  setSearch: (s: string) => void;
  selectedVal: string;
  setSelectedVal: (v: string) => void;
  setShowResults: (show: boolean) => void;
  border?: boolean;
  showFilter?: boolean;
}) => {
  const filterOptions = [
    { value: "all", label: "All" },
    { value: "Movie", label: "Movies" },
    { value: "Actor", label: "Actors" },
    { value: "User", label: "Users" },
  ];

  return (
    <div
      className={`flex items-center h-12 bg-secondaryBg rounded-xl overflow-hidden border border-border focus-within:border-primary transition-colors ${
        border ? "p-[2px] pl-3" : "pl-3"
      }`}
    >
      <FiSearch className="text-gray-400 text-xl flex-shrink-0" />

      <input
        value={search}
        onFocus={() => setShowResults(true)}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search movies, actors, users..."
        className="bg-transparent outline-none flex-1 mx-3 py-2.5 text-sm text-foreground placeholder:text-gray-400"
      />

      {showFilter && (
        <div className="h-full">
          <select
            value={selectedVal}
            onChange={(e) => setSelectedVal(e.target.value)}
            className="h-full bg-sideNavBg outline-none px-3 border-l border-border sm:px-4  cursor-pointer"
          >
            {filterOptions.map((option) => (
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

export default SearchInput;
