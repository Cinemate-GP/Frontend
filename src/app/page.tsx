"use client";

import React from "react";
import useFetch from "@/hooks/useFetch";
import { Movie } from "@/lib/types";
import HeroSection from "@/components/landing/HeroSection";

const Page = () => {
  const { data: trending } = useFetch<Movie[]>("/api/Movie/trending");

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden">
      {/* Fullscreen background image */}
      <div className="fixed inset-0 -z-10 bg-mainBg bg-[url('/main-img.png')] bg-cover bg-center bg-no-repeat" />
      {/* Page content */}
      <div className="relative z-10">
        <HeroSection trending={trending || []} />
      </div>
    </div>
  );
};

export default Page;
