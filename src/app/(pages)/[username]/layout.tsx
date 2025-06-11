"use client";
import { useParams } from "next/navigation";
import { getUserId } from "@/lib/utils";
import ProfileHeader from "@/components/profile/ProfileHeader";
import Tabs from "@/components/profile/Tabs";

const UsernameLayout = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const username = params.username as string;
  const currentUserId = getUserId();
  const isOwnProfile = username === currentUserId;
  return (
    <div className="min-h-screen bg-mainBg">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-16">
        <ProfileHeader userId={username} />
        {isOwnProfile && <Tabs />}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default UsernameLayout;
