"use client";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { SearchModal } from "./ui/Modals";

const NavbarSearch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="bg-[#1e2526] rounded-3xl flex items-center ml-[2rem] p-3 bg-opacity-80">
      <CiSearch />
      <input
        onFocus={() => setIsModalOpen(true)}
        type="text"
        placeholder="Search.."
        className="ml-2 bg-transparent outline-none w-full h-full"
      />
      {isModalOpen && <SearchModal onclose={() => setIsModalOpen(false)} />}
    </div>
    
  );
};

export default NavbarSearch;


