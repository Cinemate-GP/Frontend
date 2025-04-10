"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

import { BsGrid } from "react-icons/bs";
import Menu from "./Menu";
import { SearchModal } from "./Search";

const HorizontalNav = ({ pathname }: { pathname: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsOpen((prev: boolean) => !prev);
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#search")) {
        setIsSearchModalOpen(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [isSearchModalOpen]);
  return (
    <>
      <div className="w-full h-[60px] bg-opacity-15 fixed z-50 left-0 bottom-0 p-4 pt-0 block md:hidden backdrop-blur-md shadow-lg">
        <ul className="flex items-center justify-between px-3 bg-opacity-30 sm:px-5">
          <li className="text-lg">
            <Link
              href="/pages"
              className={`flex flex-col gap-1 items-center px-4 py-2 ${
                pathname === "/" ? "text-primary" : ""
              }`}
            >
              <AiOutlineHome className="w-5 h-5" aria-hidden="true" />
              <span className="text-[12px]">Home</span>
            </Link>
          </li>
          <li>
            <button
              className={`flex flex-col gap-1 items-center px-4 py-2`}
              onClick={() => setIsSearchModalOpen(true)}
            >
              <CiSearch className="w-6 h-6" aria-hidden="true" />
              <span className="text-[12px]">Search</span>
            </button>
          </li>
          <li>
            <button
              className={`flex flex-col gap-1 items-center px-4 py-2 ${
                isOpen ? "text-primary" : ""
              }`}
              onClick={toggleMenu}
            >
              <BsGrid className="w-5 h-5" aria-hidden="true" />
              <span className="text-[12px]">Menu</span>
            </button>
          </li>
        </ul>
        {isOpen && <Menu setIsOpen={setIsOpen} />}
      </div>
      {isSearchModalOpen && <SearchModal />}
    </>
  );
};

export default HorizontalNav;
