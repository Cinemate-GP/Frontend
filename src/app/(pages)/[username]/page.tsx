"use client";
import { useParams } from "next/navigation";
import RecentActivitySection from "@/components/user/UserActivities";

const UsernamePage = () => {
  const params = useParams();
  const username = params.username as string;

  return <RecentActivitySection userId={username} />;
};

export default UsernamePage;
