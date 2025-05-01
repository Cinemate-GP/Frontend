import { useCookie } from "@/hooks/useCookie";
import { getUserId } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { ProfileHeaderSkeleton } from "../skeletons";
import { authFetch } from "@/lib/api";

interface User {
  id: string | undefined;
  fullName: string | undefined;
  profilePic: string | undefined;
  isFollowing?: boolean | undefined;
  loading: boolean;
}

const UserInfo = ({ id, fullName, profilePic, isFollowing, loading }: User) => {
  const [follow, setFollow] = React.useState<boolean>(isFollowing ?? false);
  const token = useCookie();

  React.useEffect(() => {
    setFollow(isFollowing ?? false);
  }, [isFollowing]);

  const toggleFollow = async () => {
    try {
      const endpoint = follow
        ? "/api/UserFollow/Delete"
        : "/api/UserFollow/Add";
      const method = follow ? "DELETE" : "POST";

      const res = await authFetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: getUserId(), followId: id }),
      });

      if (!res.ok) throw new Error("Failed to toggle follow status");

      setFollow(!follow); // Update local state only after success
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <ProfileHeaderSkeleton />;
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center gap-8">
      <div className="flex gap-4 items-center flex-wrap">
        <div className="border-2 border-primary p-1 rounded-full mx-auto sm:mx-0">
          {profilePic && (
            <Image
              src={profilePic}
              alt="user profile"
              width={100}
              height={100}
              className="w-16 h-16 sm:w-32 sm:h-32 rounded-full object-cover"
            />
          )}
          {!profilePic && (
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
            {fullName ? fullName : "User Name"}
          </h2>

          <button
            onClick={toggleFollow}
            className={`rounded-lg px-3 py-1 border border-primary text-sm ml-3 ${
              follow ? "bg-primary" : ""
            }`}
          >
            {follow ? "Followed" : "follow"}
          </button>
        </div>
      </div>
      <ul className="flex gap-3 justify-center sm:justify-start">
        <li className="flex flex-col items-center border-r-2 pr-3 border-white">
          <span className="text-lg sm:text-2xl font-bold">80</span>
          <span>film</span>
        </li>
        <li className="flex flex-col items-center border-r-2 pr-3 border-white">
          <span className="text-lg sm:text-2xl font-bold">48</span>
          <span>folowers</span>
        </li>
        <li className="flex flex-col items-center">
          <span className="text-lg sm:text-2xl font-bold">56</span>
          <span>following</span>
        </li>
      </ul>
    </header>
  );
};

export default UserInfo;
