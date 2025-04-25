import { useEffect, useState } from "react";

interface User {
  fullName: string;
  email: string;
  profilePic: string;
}
export const useGetUser = () => {
  const localUser = localStorage.getItem("user") || "{}";
  const [user, setUser] = useState<User>({
    fullName: "",
    email: "",
    profilePic: "",
  });
  useEffect(() => {
    if (localUser) {
      const parsed = JSON.parse(localUser);
      setUser(parsed.user || {});
    }
  }, [localUser]);

  return user;
};
