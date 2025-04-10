"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function withAuth<T extends object>(
  Component: React.ComponentType<T>
) {
  return function AuthComponent(props: T) {
    const router = useRouter();

    useEffect(() => {
      if (typeof window === "undefined") return;

      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get("userId");
      const code = urlParams.get("code");

      const confirmEmail = async () => {
        if (userId && code) {
          try {
            Cookies.set("token", code, { expires: 7, path: "/" }); // Store token
             await fetch("/api/auth/confirm-email",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, code }),
              }
            );

          } catch (error) {
            console.error("Fetch error:", error);
          }
        }
      };

      confirmEmail();
    }, [router]);

    useEffect(() => {
      const token = Cookies.get("token");
      if (!token) {
        router.replace("/auth/login");
      } 
    }, [router]);


    return <Component {...props} />;
  };
}
