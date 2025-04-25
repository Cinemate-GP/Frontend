'use client'
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

interface Props {
    handleFilterValue:(tye:string,value:string) => void
  }
  
export default function SearchComponent({handleFilterValue}: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
   
    if (debouncedSearchTerm) {
      handleFilterValue("search",debouncedSearchTerm);
    }else {
        handleFilterValue("search",'');
    }
  }, [debouncedSearchTerm]);

  return (
    <input
        type="text"
        placeholder="Search..."
        className="col-span-2 lg:col-span-1 border border-gray-500 bg-black text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
  );
}
