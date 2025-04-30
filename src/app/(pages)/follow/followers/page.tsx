"use client";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import Link from "next/link";

interface User {
  userId: string;
  fullName: string;
  profilePic: string;
}

function Followers() {
  const { data, loading } = useFetch<User[]>(
    "/api/UserFollow/get-all-followers"
  );

  return (
    <div className="col-span-4 md:col-span-3  w-full">
      {loading && <p>Loading...</p>}
      {!loading && data?.length === 0 && <p>No followers found</p>}
      {!loading && (data?.length as number) > 0 && (
        <div className="flex flex-col gap-4 w-full">
          {data?.map((user) => (
            <div key={user.userId} className="flex justify-between items-center border-b border-gray-700">
              <Link href={`/user/${user.userId}`} className="flex items-center gap-4 p-4 px-0">
                {user.profilePic ? (
                  <Image
                    src={user.profilePic}
                    alt="user profile"
                    width={100}
                    height={100}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <Image
                    src="/ueser-placeholder.jpg"
                    alt="user profile"
                    width={100}
                    height={100}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <h2 className="text-lg">{user.fullName}</h2>
              </Link>
              <button className="rounded-lg px-3 py-1 border border-primary text-sm ml-3 text-white transition-all duration-200 hover:bg-primary">
                follow
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Followers;
