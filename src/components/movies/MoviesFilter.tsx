import React from "react";
import SearchComponent from "./MovieSearch";
import { Geners, MPA_CATEGORIES, Years } from "@/constants";
interface Props {
  handleFilterValue: (tye: string, value: string) => void;
}

const MoviesFilter = ({ handleFilterValue }: Props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 bg-secondaryBg shadow-lg rounded-2xl p-4 border border-border">
      <select
        className="border border-border bg-background text-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200"
        onChange={(e) => handleFilterValue("year", e.target.value)}
      >
        <option value={""}>Year</option>
        {Years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select
        className="border border-border bg-background text-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200"
        onChange={(e) => handleFilterValue("popularity", e.target.value)}
      >
        <option value={""}>Popular</option>
        <option value={"1"}>Most Popular</option>
        <option value={"0"}>Less Popular</option>
      </select>
      <select
        className="border border-border bg-background text-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200"
        onChange={(e) => handleFilterValue("mpa", e.target.value)}
      >
        <option value={""}>MPA</option>
        {MPA_CATEGORIES.map((mpa) => (
          <option key={mpa} value={mpa}>
            {mpa}
          </option>
        ))}
      </select>
      <select
        className="border border-border bg-background text-gray-400 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200"
        onChange={(e) => handleFilterValue("genre", e.target.value)}
      >
        <option value={""}>Genre</option>
        {Geners.map((gener) => (
          <option key={gener.Id} value={gener.Name}>
            {gener.Name}
          </option>
        ))}
      </select>
      {/* HEY HERE */}
      <SearchComponent
        handleFilterValue={(type, value) => handleFilterValue(type, value)}
      />
    </div>
  );
};

export default MoviesFilter;
