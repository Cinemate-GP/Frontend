// context/ProfileContext.tsx
import { createContext, useContext, useMemo, useState } from "react";

type ProfileContextType = {
  followersCount: number;
  setFollowersCount: (count: number) => void;
};

const ProfileContext = createContext<ProfileContextType | null>(null);
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
export const FollowProvider = ({
  children,
  initialFollowers,
}: {
  children: React.ReactNode;
  initialFollowers: number;
}) => {
  const [followersCount, setFollowersCount] = useState(initialFollowers);
  const value = useMemo(() => ({ followersCount, setFollowersCount }), [followersCount]);

  return (
    <ProfileContext.Provider
      value={value}
    >
      {children}
    </ProfileContext.Provider>
  );
};
