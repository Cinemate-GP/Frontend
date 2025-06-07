"use client";

import Geners from "@/components/home/Geners";
import HomeSlider from "@/components/home/HomeSlider";
import Recommended from "@/components/home/Recommended";
import Top10 from "@/components/home/Top10";
import TopRated from "@/components/home/TopRated";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/effect-fade";

export default function Home() {
  return (
    <div className="overflow-hidden mb-[70px] relative">
      {/* Simple background */}
      <div className="fixed inset-0 bg-mainBg pointer-events-none z-0" />
      
      {/* Clean Hero Section */}
      <section id="home" className="relative h-screen bg-mainBg overflow-hidden">
        <HomeSlider />
        
        {/* Simple gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-mainBg to-transparent pointer-events-none" />
      </section>      {/* Simple background overlay */}
      <div className="absolute inset-0 bg-mainBg/90 pointer-events-none z-5" />

      {/* Main Content */}
      <div className="relative z-10 pt-16 pb-16">
        <div className="container mx-auto px-4">
          
          {/* Content Sections */}
          <div className="space-y-16">
            
            {/* Simple Welcome Banner */}
            <div className="text-center py-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Discover Great Movies
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Explore thousands of movies and find your next favorite
              </p>
            </div>            {/* Top 10 Section */}
            <section>
              <Top10 />
            </section>
            
            {/* Top Rated Section */}
            <section>
              <TopRated />
            </section>
            
            {/* Recommended Section */}
            <section>
              <Recommended />
            </section>
            
            {/* Genres Section */}
            <section>
              <Geners />
            </section>
          </div>
        </div>
      </div>
        {/* Scroll to top button */}
      <ScrollToTopButton />
      
      {/* Toast notifications */}
      <ToastContainer 
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        theme="dark"
      />
    </div>
  );
}
