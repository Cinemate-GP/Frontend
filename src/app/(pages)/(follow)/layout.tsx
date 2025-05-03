"use client";
import { ProfileInfoSkeleton } from "@/components/skeletons";
import useFetch from "@/hooks/useFetch";
import { getUserId } from "@/lib/utils";
import Image from "next/image";

interface User {
  id: string;
  fullName: string;
  profilePic: string;
  isFollowing: boolean;
}

const FollowLayout = ({ children }: { children: React.ReactNode }) => {
  const userId = getUserId();
  const { data, loading } = useFetch<User>(`/api/UserFollow/follow-details/${userId}`);
  return (
    <div className="mt-24 px-10">
      {loading && <ProfileInfoSkeleton />}
      <div className="grid grid-cols-4 gap-12 md:gap-24 items-center justify-items-center sm:justify-items-start">
        {!loading && (
          <div className="flex flex-col gap-4 col-span-4 md:col-span-1 mx-auto items-center text-center">
            <div className="border-2 border-primary p-1 rounded-full mx-auto sm:mx-0">
              {data?.profilePic && (
                <Image
                  src={data.profilePic}
                  alt="user profile"
                  width={100}
                  height={100}
                  className="w-16 h-16 sm:w-32 sm:h-32 rounded-full object-cover"
                />
              )}
              {!data?.profilePic && (
                <Image
                  src="/ueser-placeholder.jpg"
                  alt="user profile"
                  width={100}
                  height={100}
                  className="w-16 h-16 sm:w-32 sm:h-32 rounded-full object-cover"
                />
              )}
            </div>
            <h2 className="text-lg sm:text-3xl">
              {data?.fullName ? data?.fullName : "User Name"}
            </h2>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default FollowLayout;
