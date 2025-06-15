"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import { setCookie } from "@/lib/utils";

export default function withAuth<T extends object>(
  Component: React.ComponentType<T>
) {
  return function AuthComponent(props: T) {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
      if (typeof window === "undefined") return;

      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get("userId");
      const code = urlParams.get("code");

      const confirmEmail = async () => {
        if (userId && code) {
          try {
            const Cookies = (await import("js-cookie")).default;
            Cookies.set("token", code, { expires: 7, path: "/" }); // Store token
            const res = await fetch("/api/auth/confirm-email", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ userId, code }),
            });
            if (!res.ok) throw Error("erro verify account");
            const user = await res.json();
            dispatch(setUser({ user }));
            setCookie("token", user.token, 1);
            setCookie("refreshToken", user.refreshToken, 1);
            setCookie("userId", user.id, 1);
          } catch (error) {
            console.error("Fetch error:", error);
          }
        }
      };

      confirmEmail();
    }, [router, dispatch]);

    useEffect(() => {
      const checkAuth = async () => {
        const Cookies = (await import("js-cookie")).default;
        const token = Cookies.get("token");
        if (!token) {
          router.replace("/login");
        }
      };

      checkAuth();
    }, [router]);

    return <Component {...props} />;
  };
}
