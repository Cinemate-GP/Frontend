"use client";
import { useSearch } from "@/context/SearchContext";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";

export const Search = ({ border }: { border?: boolean }) => {
  const { setSearch , search } = useSearch();
  const router = useRouter();
  return (
    <>
     {!border && <CiSearch />}
      <input
        value={search}
        onFocus={() => router.push("/pages/search")}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="Search.."
        className={`ml-2 bg-transparent outline-none w-full h-full ${
          border
            ? "border focus:outline-none border-gray-500 bg-black text-white px-4 py-1 rounded-md !ml-0"
            : ""
        }`}
      />
    </>
  );
};

const NavbarSearch = () => {
  return (
    <div className="bg-[#1e2526] rounded-3xl flex items-center ml-[2rem] p-3 bg-opacity-80">
      <Search />
    </div>
  );
};

export default NavbarSearch;
