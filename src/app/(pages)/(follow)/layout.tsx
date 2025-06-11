"use client";
import DisplayFollowersCount from "@/components/profile/DisplayFollowersCount";
import { ProfileInfoSkeleton } from "@/components/skeletons";
import { ProfileProvider } from "@/context/FollowersContext";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface User {
  id: string;
  fullName: string;
  profilePic: string;
  followersCount: number;
  followingCount: number;
}

const FollowLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const slug = params.slug as string[];
  const userId = slug[0];
  const { data, loading } = useFetch<User>(`/api/Profile/details/${userId}`);
  
console.log(data?.followersCount)
  return (
    <ProfileProvider  key={data?.followersCount} initialFollowers={data?.followersCount || 0}>
      <div className="min-h-screen bg-mainBg">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-16">
          {loading && <ProfileInfoSkeleton />}
          <div className="grid grid-cols-12 gap-y-6 md:gap-x-12 items-start">
            {!loading && (
              <div className="flex flex-row col-span-12 lg:flex-col lg:col-span-3 gap-4 items-center justify-start text-center md:text-left">                <Link
                  href={`/${userId}`}
                  className="border-2 mx-0 border-primary p-1 rounded-full aspect-square w-full max-w-[120px] sm:max-w-[160px] overflow-hidden flex-justify-center items-center"
                >
                  {data?.profilePic ? (
                    <Image
                      src={data.profilePic}
                      alt="user profile"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (                    <Image
                      src="/user-placeholder.jpg"
                      alt="user profile"
                      width={100}
                      height={100}
                      className="w-full h-full rounded-full object-cover"
                    />
                  )}
                </Link>
                <div>
                  <h2 className="text-lg sm:text-2xl text-start mb-3 lg:text-center">
                    {data?.fullName || "User Name"}
                  </h2>
                  <div className="flex items-center gap-2 flex-wrap justify-start mx-0 ">
                    <DisplayFollowersCount />
                    <p>
                      <span className="text-primary">
                        {data?.followingCount}
                      </span>{" "}
                      following
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="col-span-12 lg:col-span-9 max-w-full overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ProfileProvider>
  );
};

export default FollowLayout;
