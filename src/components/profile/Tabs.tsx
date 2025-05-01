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
    <div className="w-full overflow-x-auto custom-scrollbar tabs-scroll mt-8">
      {/* Modern tabs with red accents and smoother transitions */}
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-1">
        <ul className="flex gap-1 sm:gap-2 overflow-x-auto custom-scrollbar whitespace-nowrap">
          {tabs.map((tab) => (
            <button
              onClick={() => clickHandler(tab)}
              key={tab}
              className={`relative px-4 py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base
                ${
                  activeTab === tab 
                    ? "text-white bg-gradient-to-br from-red-700 to-red-900 shadow-lg" 
                    : "text-gray-400 hover:text-white hover:bg-zinc-800"
                }
              `}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
              )}
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tabs;
