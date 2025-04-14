"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { capitalizeString } from "@/lib/utils";
const Tabs = () => {

  const tabs = ["Profile","Watched","Liked", "Watchlist", "Reviews", "Recommended"];
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("Profile")
  
  function clickHandler(name: string) {
    setActiveTab(name);
    switch (name) {
      case "Liked":
        router.push("/pages/profile/likes");
        break;
      case "Watched":
        router.push("/pages/profile/watched");
        break;
      case "Watchlist":
        router.push("/pages/profile/watchlist");
        break;
      case "Reviews":
        router.push("/pages/profile/reviews");
        break;
      case "Recommended":
        router.push("/pages/profile/recommended");
        break;
      default:
        router.push("/pages/profile");
    }
  }
  useEffect(() => {
    const path = pathname.split("/")[3];
    setActiveTab(capitalizeString(path ? path : pathname.split("/")[2]));
  }, [activeTab, pathname]);
       
  return (
    <div className="w-full overflow-x-auto custom-scrollbar tabs-scroll">
      {/* tabs */}
      <ul className="flex gap-3 sm:gap-4 mt-12 border-b border-gray-600">
        {tabs.map((tab) => (
          <button
            onClick={() => clickHandler(tab)}
            key={tab}
            className={`text-[16px] sm:text-lg hover:text-primary hover:border-primary transition-all duration-300 border-b-2 pb-3 ${
              activeTab === tab ? "text-primary border-primary" : "border-transparent"
            }`}
          >
            {tab}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
