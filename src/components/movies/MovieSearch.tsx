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
    if (debouncedSearchTerm !== lastSearched && 
        (debouncedSearchTerm.length >= 3 || debouncedSearchTerm === '')) {
      handleFilterValue("search", debouncedSearchTerm);
      setLastSearched(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, handleFilterValue, lastSearched]);

  const handleBlur = () => {
    if (searchTerm !== lastSearched && 
        (searchTerm.length >= 3 || searchTerm === '')) {
      handleFilterValue("search", searchTerm);
      setLastSearched(searchTerm);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      handleFilterValue("search", '');
      setLastSearched('');
    }
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      className="col-span-2 lg:col-span-1 border border-border bg-background text-foreground px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-sm transition-all duration-200"
      onChange={handleChange}
      onBlur={handleBlur}
      value={searchTerm}
    />
  );
}
