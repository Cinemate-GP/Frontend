"use client";
import { redirect, useParams } from "next/navigation";
import { getUserId } from "@/lib/utils";
import ProfileHeader from "@/components/profile/ProfileHeader";
import RecentActivitySection from "@/components/user/UserActivities";


const UserPage = () => {
  const params = useParams();
  const userId = params.userId;
  if (userId === getUserId()) {
    redirect("/profile");
  }

  return (
    <div className="min-h-screen bg-mainBg">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-16">
        <ProfileHeader userId={userId as string}/>
        <RecentActivitySection
          userId={ userId as string}
        />
      </div>
    </div>
  );
};

export default UserPage;
