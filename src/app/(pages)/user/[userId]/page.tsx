"use client";
import { redirect, useParams } from "next/navigation";
import { getUserId } from "@/lib/utils";
import ProfileHeader from "@/components/profile/ProfileHeader";
import RecentActivitySection from "@/components/UserActivities";


const UserPage = () => {
  const params = useParams();
  const userId = params.userId;
  if (userId === getUserId()) {
    redirect("/profile");
  }


  return (
    <div className="mt-24 px-10">
     <ProfileHeader userId={userId as string}/>
      <RecentActivitySection
        userId={ userId as string}
      />
    </div>
  );
};

export default UserPage;
