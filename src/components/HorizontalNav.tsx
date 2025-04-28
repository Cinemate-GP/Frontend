"use client";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsGrid } from "react-icons/bs";
import Menu from "./Menu";
import { Search } from "./Search";

const HorizontalNav = ({ pathname }: { pathname: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const toggleMenu = () => {
    setIsOpen((prev: boolean) => !prev);
  };

  return (
    <>
      <div className="w-full h-[60px] bg-opacity-15 fixed z-[100] left-0 bottom-0 p-4 pt-0 block md:hidden backdrop-blur-md shadow-lg">
        <ul className="flex items-center justify-between px-3 bg-opacity-30 sm:px-5">
          <li className="text-lg">
            <Link
              href="/home"
              className={`flex flex-col gap-1 items-center px-4 py-2 ${
                pathname === "/" ? "text-primary" : ""
              }`}
            >
              <AiOutlineHome className="w-5 h-5" aria-hidden="true" />
              <span className="text-[12px]">Home</span>
            </Link>
          </li>
          <li className="relative">
            <Search isMobile={true} />
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
      </div>
      {isOpen && <Menu setIsOpen={setIsOpen} />}
    </>
  );
};

export default HorizontalNav;
