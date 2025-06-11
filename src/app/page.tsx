"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { getCookie } from "@/lib/utils";

const Page = () => {
  const router = useRouter();
  const token = getCookie("token");

  return (
    <div>
      <div>
        {token ? (
          <button onClick={() => router.push("/home")}>
            Continue To Dashboard
          </button>
        ) : (
          <>
            <button onClick={() => router.push("/signup")}>
              Get Started
            </button>

            <button onClick={() => router.push("/login")}>
              Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
