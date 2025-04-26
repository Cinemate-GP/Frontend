import Link from "next/link";

import { icons } from "@/constants";
const Menu = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const menueItems = [
    {
      name: "Watchlist",
      href: "/pages/profile/watchlist",
      icon: icons.Watchlist,
    },
    {
      name: "Likes",
      href: "/pages/profile/liked",
      icon: icons.Likes,
    },
    {
      name: "Movies",
      href: "/pages/movies",
      icon: icons.Movies,
    },
    {
      name: "Settings",
      href: "/pages/settings",
      icon: icons.Settings,
    },
    {
      name: "Profile",
      href: "/pages/profile",
      icon: icons.Profile,
    },
  ];
  return (
    <ul className="border border-gray-900 bg-background grid grid-cols-3 gap-4 fixed bottom-20 right-5 p-4 z-50">
      {menueItems.map((item) => (
        <li
          onClick={() => setIsOpen(false)}
          key={item.name}
          className="w-16 h-full  bg-white/10 rounded-lg"
        >
          <Link
            href={item.href}
            className="p-4 flex flex-col items-center font-medium text-xs"
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
