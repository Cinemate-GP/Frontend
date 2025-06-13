// context/ProfileContext.tsx
import { createContext, useContext, useMemo, useState } from "react";

type ProfileContextType = {
  flag: boolean;
  setFlag: (flag: boolean) => void;
};

const ProfileContext = createContext<ProfileContextType | null>(null);
export const useFilterWatched = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [flag, setFlag] = useState(false);
  const value = useMemo(() => ({ flag, setFlag }), [flag]);

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};
