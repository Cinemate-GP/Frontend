import { useProfile } from "@/context/FollowersContext";
import React from "react";
import { RiGroupLine } from "react-icons/ri";

const DisplayFollowersCount = () => {
  const { followersCount } = useProfile();
  return (
    <p className="flex items-center gap-1">
      <RiGroupLine />
      <span className="text-primary">{followersCount}</span>
      followers ·
    </p>
  );
};

export default DisplayFollowersCount;
