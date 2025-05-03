"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext"; 
import { authFetch } from "@/lib/api";
import { getCookie, getUserId } from "@/lib/utils";
import Link from "next/link";
import ProfileImageViewer from "./ProfileImageViewer";
import { useRouter } from "next/navigation";

const ProfileHeader = () => {
  const router = useRouter();
  const { user, refreshUserData } = useUser();
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const token = getCookie("token");

  // Explicitly refresh user data when component mounts
  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);
  
  useEffect(() => {
    if (!user) return;
    
    (async function () {
      try {
        const userId = getUserId();
        if (!userId) {
          console.error("User ID not found");
          return;
        }

        // Add userId to the endpoint
        const res = await authFetch(`/api/UserFollow/count-follow/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (!res.ok) throw new Error("Failed to fetch followers");
        const data = await res.json();
        
        // Update state with the retrieved counts
        setFollowers(data.followersCount);
        setFollowing(data.followingCount);
        
        console.log("Follower/Following counts:", data); // Debug logging
      } catch (error) {
        console.error("Error fetching follow counts:", error);
      }
    })();
  }, [token, user]); // Changed dependency to just user

  const handleNavigateToSettings = () => {
    router.push("/settings");
  };

  return (
    <>
      <header className="backdrop-blur-sm bg-zinc-900/90 rounded-xl shadow-md p-6">
        <div className="flex flex-col sm:flex-row items-center gap-6 justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Profile image - with click handler */}
            <div 
              onClick={() => setShowImageViewer(true)} 
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <Image
                src={user?.profilePic || "/user-placeholder.jpg"}
                alt="user profile"
                width={100}
                height={100}
                className="w-24 h-24 rounded-full object-cover shadow-md"
                priority={true}
              />
            </div>
            
            {/* Profile information */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-white mb-2">
                {user?.fullName || "User Name"}
              </h2>
              
              <button
                onClick={handleNavigateToSettings}
                className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-1.5 rounded-md transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-zinc-600"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Stats row - moved to the right */}
          <div className="flex justify-center gap-6 mt-4 sm:mt-0">
            <div className="text-center">
              <span className="block text-xl font-bold">80</span>
              <span className="text-sm text-zinc-400">Films</span>
            </div>
            
            <Link href={`/followers/${getUserId()}`} className="text-center group">
              <span className="block text-xl font-bold">{followers}</span>
              <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">Followers</span>
            </Link>
            
            <Link href={`/following/${getUserId()}`} className="text-center group">
              <span className="block text-xl font-bold">{following}</span>
              <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">Following</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Profile Image Viewer */}
      {showImageViewer && (
        <ProfileImageViewer 
          imageUrl={user?.profilePic || "/user-placeholder.jpg"} 
          onClose={() => setShowImageViewer(false)} 
        />
      )}
    </>
  );
};

export default ProfileHeader;
