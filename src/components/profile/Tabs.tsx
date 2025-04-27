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
      case "Recommended":
        router.push("/profile/recommended");
        break;
      default:
        router.push("/profile");
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
            className={`text-[16px] sm:text-lg hover:text-primary hover:border-primary transition-all duration-300 border-0 sm:border-b-2 pb-3 ${
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
