"use client";
import MoviesFilter from "@/components/movies/MoviesFilter";
import MoviesGrid from "@/components/movies/MoviesGrid";
import Pagination from "@/components/movies/Pagination";
import { Movie } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";

const MoviesPage = () => {
  const [data, setDate] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    year: "",
    popularity: "",
    rating: "",
    genre: "",
    mpa: ""
  });
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [hasPreviosPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const handleFilterValue = useCallback((type: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams();

        if (filters.year) query.append("Year", filters.year);
        if (filters.popularity) query.append("SortDirection", filters.popularity);
        if (filters.rating) query.append("rating", filters.rating);
        if (filters.genre) query.append("Gener", filters.genre);
        if (filters.mpa) query.append("MPA", filters.mpa);
        query.set("pageNumber", pageNumber.toString());
        
        const queryString = query.toString();
        const url = `/api/Movie/filter${queryString ? `?${queryString}` : ''}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch data");

        const json = await res.json();
        setDate(json.items);
        setPageNumber(json.pageNumber);
        setTotalPages(json.totalPages);
        setHasPreviousPage(json.hasPreviosPage);
        setHasNextPage(json.hasNextPage);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, pageNumber]);

  return (
    <div className="pt-[5rem] mx-0 sm:mx-[2rem] mb-[4rem] md:mb-0">
      <MoviesFilter handleFilterValue={handleFilterValue} />
      <MoviesGrid movieList={data} loading={loading} />
      <Pagination
        pageNumber={pageNumber}
        totalPages={totalPages}
        hasPreviousPage={hasPreviosPage}
        hasNextPage={hasNextPage}
        onPageChange={(page) => setPageNumber(page)}
      />
    </div>
  );
};

export default MoviesPage;
