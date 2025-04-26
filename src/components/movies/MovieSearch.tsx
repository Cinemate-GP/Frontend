'use client'
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

interface Props {
    handleFilterValue:(type:string, value:string) => void
}
  
export default function SearchComponent({handleFilterValue}: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearched, setLastSearched] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    // Only trigger search if:
    // 1. The term is at least 3 characters OR empty (to reset search)
    // 2. And it's different from the last searched term
    if (debouncedSearchTerm !== lastSearched && 
        (debouncedSearchTerm.length >= 3 || debouncedSearchTerm === '')) {
      handleFilterValue("search", debouncedSearchTerm);
      setLastSearched(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, handleFilterValue, lastSearched]);

  const handleBlur = () => {
    // On blur, if term is at least 3 chars and different from last search, trigger immediately
    if (searchTerm !== lastSearched && 
        (searchTerm.length >= 3 || searchTerm === '')) {
      handleFilterValue("search", searchTerm);
      setLastSearched(searchTerm);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // If user clears the input, reset the search immediately
    if (value === '') {
      handleFilterValue("search", '');
      setLastSearched('');
    }
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      className="col-span-2 lg:col-span-1 border border-gray-500 bg-black text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
      onChange={handleChange}
      onBlur={handleBlur}
      value={searchTerm}
    />
  );
}
