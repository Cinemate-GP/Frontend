"use client";
import { ProfileInfoSkeleton } from "@/components/skeletons";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import { useParams } from "next/navigation";
import { RiGroupLine } from "react-icons/ri";

interface User {
  id: string;
  fullName: string;
  profilePic: string;
  followersCount: number;
  followingCount: number;
}

const FollowLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const slug = params.slug as string;
  const userId = slug.split("_")[0];
  const { data, loading } = useFetch<User>(`/api/Profile/details/${userId}`);
  return (
    <div className="mt-24 px-10">
      {loading && <ProfileInfoSkeleton />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-12 md:gap-x-24 items-center mx-auto">
        {!loading && (
          <div className="flex flex-col gap-4 items-center text-center md:items-start md:text-left">
            <div className="border-2 border-primary p-1 rounded-full aspect-square w-full max-w-[120px] sm:max-w-[160px] overflow-hidden mx-auto">
              {data?.profilePic ? (
                <Image
                  src={data.profilePic}
                  alt="user profile"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <Image
                  src="/ueser-placeholder.jpg"
                  alt="user profile"
                  width={100}
                  height={100}
                  className="w-16 h-16 sm:w-32 sm:h-32 rounded-full object-cover"
                />
              )}
            </div>
            <h2 className="text-lg sm:text-3xl text-center mx-auto">
              {data?.fullName || "User Name"}
            </h2>
            <div className="flex items-center gap-2 flex-wrap justify-center mx-auto">
              <p className="flex items-center gap-1">
                <RiGroupLine />
                <span className="text-primary">{data?.followersCount}</span>
                followers ·
              </p>
              <p>
                <span className="text-primary">{data?.followingCount}</span> following
              </p>
            </div>
          </div>
        )}

        <div className="md:col-span-3 w-full max-w-[600px] overflow-y-auto mb-12 md:mb-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FollowLayout;
