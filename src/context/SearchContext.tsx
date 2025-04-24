'use client'
import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from "react";

// Define the type for the context value
interface SearchContextType {
  search: string;
  setSearch: (value: string) => void;
}

// Create the context with the correct type
export const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  
  // Ensure we don't get undefined context
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export default function SearchProvider({ children }: SearchProviderProps) {
  const [search, setSearch] = useState<string>("");

  const SetSearchValue = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const value = useMemo(() => ({
    search,
    setSearch: SetSearchValue,
  }), [search, SetSearchValue]);

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
