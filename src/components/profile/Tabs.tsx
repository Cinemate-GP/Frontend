"use client";
import { useRouter, usePathname, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { capitalizeString, getUserId } from "@/lib/utils";

const Tabs = () => {
  const tabs = ["Profile", "Watched", "Liked", "Watchlist", "Reviews", "Rated", "Recommended"];
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [activeTab, setActiveTab] = useState<string>("Profile")
  
  const username = params.username as string || getUserId();
  
  function clickHandler(name: string) {
    setActiveTab(name);
    switch (name) {
      case "Liked":
        router.push(`/${username}/liked`);
        break;
      case "Watched":
        router.push(`/${username}/watched`);
        break;
      case "Watchlist":
        router.push(`/${username}/watchlist`);
        break;
      case "Reviews":
        router.push(`/${username}/reviews`);
        break;
      case "Rated":
        router.push(`/${username}/rated`);
        break;
      case "Recommended":
        router.push(`/${username}/recommended`);
        break;
      default:
        router.push(`/${username}`);
    }
  }
    useEffect(() => {
    const pathParts = pathname.split("/");
    // For /username or /username/subpage
    const subPage = pathParts[2]; // This will be undefined for just /username, or the subpage name
    setActiveTab(capitalizeString(subPage || "profile"));
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
