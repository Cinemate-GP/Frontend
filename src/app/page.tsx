"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { Movie } from "@/lib/types";
import HeroSection from "@/components/landing/HeroSection";
import { getCookie } from "@/lib/utils";

const Page = () => {
  const router = useRouter();
  const { data: trending } = useFetch<Movie[]>("/api/Movie/trending");

  useEffect(() => {
    if (getCookie("token")) router.replace("/home");
  }, [router]);

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      <div className="fixed inset-0 -z-10 bg-[url('/main-img.png')] bg-cover bg-center bg-no-repeat" />
      <div className="relative z-10">
        <HeroSection trending={trending || []} />
      </div>
    </div>
  );
};

export default Page;