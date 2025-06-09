'use client'
import ProfileHeader from "@/components/profile/ProfileHeader";
import Tabs from "@/components/profile/Tabs";
import { getUserId } from "@/lib/utils";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const userId = getUserId();
  return (
    <div className="relative">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-16">
        <ProfileHeader userId={userId} />
        <Tabs />
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;
