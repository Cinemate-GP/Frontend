"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { useGetUser } from "@/hooks/useGetUser";
import { authFetch } from "@/lib/api";
import { getCookie } from "@/lib/utils";
import Link from "next/link";

const ProfileHeader = () => {
  const user = useGetUser();
  const [isOpen, setIsOpen] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const token = getCookie("token");
  useEffect(() => {
    (async function () {
      try {
        const res = await authFetch("/api/UserFollow/count-follow", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch followers");
        const data = await res.json();
        setFollowers(data.followersCount);
        setFollowing(data.followingCount);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [token]);
  return (
    <>
      <header className="flex flex-col sm:flex-row justify-between items-center gap-8">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="border-2 border-primary p-1 rounded-full mx-auto sm:mx-0">
            {user?.profilePic && (
              <Image
                src={user.profilePic}
                alt="user profile"
                width={100}
                height={100}
                className="w-16 h-16 sm:w-32 sm:h-32 rounded-full object-cover"
              />
            )}
            {!user.profilePic && (
              <Image
                src="/ueser-placeholder.jpg"
                alt="user profile"
                width={100}
                height={100}
                className="w-16 h-16 sm:w-32 sm:h-32 rounded-full object-cover"
              />
            )}
          </div>
          <div className="flex items-center mx-auto sm:mx-0">
            <span className="block w-[6px] h-6 rounded-xl bg-primary mr-2"></span>
            <h2 className="text-lg sm:text-3xl">
              {user.fullName ? user.fullName : "User Name"}
            </h2>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-primary rounded-3xl px-4 py-2 text-xs sm:text-sm ml-3 mt-1"
            >
              Edit Profile
            </button>
          </div>
        </div>
        <ul className="flex gap-3 justify-center sm:justify-start">
          {/* <li className="flex flex-col items-center border-r-2 pr-3 border-white">
            <span className="text-lg sm:text-2xl font-bold">80</span>
            <span>film</span>
          </li> */}
          <li className="flex flex-col items-center border-r border-gray-600 pr-3">
            <span className="text-lg sm:text-2xl font-bold">{followers}</span>
            <Link href={`/follow/followers`} className={`text-sm transition-all duration-200 hover:text-primary `}>Followers</Link>
          </li>
          <li className="flex flex-col items-center">
            <span className="text-lg sm:text-2xl font-bold">{following}</span>
            <Link href={`/follow/following`} className={`transition-all text-sm duration-200 hover:text-primary `}>Following</Link>
          </li>
        </ul>
      </header>

      {isOpen && <EditProfileModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ProfileHeader;
