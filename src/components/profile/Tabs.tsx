"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { capitalizeString } from "@/lib/utils";

const Tabs = () => {
  const tabs = ["Profile", "Watched", "Liked", "Watchlist", "Reviews", "Rated", "Recommended"];
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("Profile")
  
  function clickHandler(name: string) {
    setActiveTab(name);
    switch (name) {
      case "Liked":
        router.push("/profile/liked");
        break;
      case "Watched":
        router.push("/profile/watched");
        break;
      case "Watchlist":
        router.push("/profile/watchlist");
        break;
      case "Reviews":
        router.push("/profile/reviews");
        break;
      case "Rated":
        router.push("/profile/rated");
        break;
      case "Recommended":
        router.push("/profile/recommended");
        break;
      default:
        router.push("/profile");
    }
  }
  
  useEffect(() => {
    const path = pathname.split("/")[2];
    setActiveTab(capitalizeString(path ?  pathname.split("/")[2] ? path : pathname.split("/")[2] : "profile"));
  }, [activeTab, pathname]);
       
  return (
    <div className="w-full overflow-x-auto mt-8">
      <div className="bg-sideNavBg rounded-xl border border-border p-1">
        <ul className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hidden whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              onClick={() => clickHandler(tab)}
              key={tab}
              className={`relative px-4 py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base
                ${
                  activeTab === tab 
                    ? "text-white bg-gradient-to-br bg-primary shadow-lg" 
                    : "text-gray-500 hover:text-foreground"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tabs;
