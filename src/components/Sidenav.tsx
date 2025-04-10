"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { mainLinks, userLinks, icons, NavLink } from "@/constants";
import HorizontalNav from "./HorizontalNav";
import Image from "next/image";

const renderLinks = (links: NavLink[], pathname: string) => {
  return links.map((link) => {
    const Icon = icons[link.icon];
    const isActive = pathname === link.href;
    return (
      <li key={link.name} className="relative text-lg">
        <Link
          href={link.href}
          className={`flex items-center px-4 py-2 hover:text-primary transition-all duration-150 ease-in-out ${
            isActive ? "text-primary" : ""
          }`}
        >
          <Icon className="w-5 h-5 mr-3" aria-hidden="true" />
          {link.name}
        </Link>
        <div
          className={`border-r ${
            pathname === link.href ? "block" : "hidden"
          } absolute top-0 right-0 border-primary h-[40px]`}
        ></div>
      </li>
    );
  });
};

export default function Sidenav() {
  const pathname = usePathname(); // Get the current pathname

  return (
    <>
      <div className="w-48 h-screen text-white bg-secondaryBg border-r fixed z-50 border-gray-800 hidden md:block">
        <Link href={"/pages"} className="py-5">
          <Image
            src="/logo.svg"
            width={80}
            height={70}
            priority
            alt="logo"
            className="mx-auto w-[80px] h-[70px] object-contai mt-4"
          />
        </Link>
        <ul className="space-y-4 mt-4">
          <h3 className="text-sm text-gray-400 pl-3">Menu</h3>
          {renderLinks(mainLinks, pathname)}

          <h3 className="mt-6 text-gray-400 pl-3">General</h3>
          {renderLinks(userLinks, pathname)}
        </ul>
      </div>
      <HorizontalNav pathname={pathname} />
    </>
  );
}
