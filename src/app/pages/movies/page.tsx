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
    search: "",
    year: "",
    popularity: "",
    rating: "",
    genre: "",
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

        if (filters.search) query.append("SearchValue", filters.search);
        if (filters.year) query.append("Year", filters.year);
        if (filters.popularity) query.append("SortDirection", filters.popularity);
        if (filters.rating) query.append("rating", filters.rating);
        if (filters.genre) query.append("Gener", filters.genre);
        query.set("pageNumber", pageNumber.toString());
        const queryString = query.toString();
        const url = queryString
          ? `/api/Movie/filter?${queryString}`
          : `/api/Movie/filter`;

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
      {/* filters */}
      <MoviesFilter handleFilterValue={handleFilterValue} />
      {/* grid */}
      <MoviesGrid movieList={data} loading={loading} />
      {/* pagination */}
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
