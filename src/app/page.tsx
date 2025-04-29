"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCookie } from "@/hooks/useCookie";

const Page = () => {
  const router = useRouter();
  const token = useCookie();
  const [countdown, setCountdown] = useState(30);
  const [loading, setLoading] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  
  // Pre-load main content
  useEffect(() => {
    // Ensure minimum loading time for smoother transition
    const loadTimer = setTimeout(() => {  
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(loadTimer);
  }, []);

  // Handle countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (!loading) {
      // Start countdown once content is loaded
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShouldRedirect(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [loading]);

  // Handle redirect in a separate useEffect
  useEffect(() => {
    if (shouldRedirect) {
      // Using setTimeout to ensure this happens in a separate tick
      const redirectTimeout = setTimeout(() => {
        if (token) {
          router.push("/home");
        } else {
          router.push("/login");
        }
      }, 0);
      
      return () => clearTimeout(redirectTimeout);
    }
  }, [shouldRedirect, token, router]);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black">
        {/* Simple loading spinner */}
        <div className="relative w-14 h-14">
          <div className="absolute w-full h-full rounded-full border-4 border-gray-700"></div>
          <div className="absolute w-full h-full rounded-full border-4 border-transparent border-t-[hsl(0,100%,50%)] animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black h-screen w-full relative overflow-hidden flex flex-col">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars"></div>
        <div className="moving-film-strip"></div>
      </div>
      
      {/* Countdown overlay */}
      <div className="fixed top-6 right-6 bg-[hsl(0,100%,50%)]/80 text-white rounded-full h-16 w-16 flex items-center justify-center text-xl font-bold animate-pulse z-50">
        {countdown}
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-4 flex flex-col h-full">
        {/* Logo area */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/favicon.ico" width={40} height={40} alt="logo" className="animate-fadeIn" priority />
            <span className="text-white text-xl font-semibold">CineMate</span>
          </div>
          <div className="text-white/70 text-sm">Redirecting in {countdown} seconds...</div>
        </div>
        
        {/* Main content - using flex-grow to take available space */}
        <div className="flex-grow flex items-center justify-center">
          {/* Hero text */}
          <div className="text-center max-w-4xl mx-auto animate-slideUp">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[hsl(0,100%,50%)] via-[hsl(0,100%,60%)] to-[hsl(0,100%,40%)] leading-tight">
              Discover Cinema Magic Like Never Before
            </h1>
            <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Immerse yourself in a world of cinematic wonders tailored just for you.
            </p>
            <div className="mt-8 flex flex-row gap-4 justify-center">
              {token ? (
                <button 
                  onClick={() => setShouldRedirect(true)}
                  className="px-6 py-3 bg-[hsl(0,100%,50%)] rounded-full text-white font-medium hover:shadow-lg hover:shadow-[hsl(0,100%,50%)]/30 transform hover:-translate-y-1 transition-all duration-300"
                >
                  Continue to Dashboard
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => setShouldRedirect(true)}
                    className="px-6 py-3 bg-[hsl(0,100%,50%)] rounded-full text-white font-medium hover:shadow-lg hover:shadow-[hsl(0,100%,50%)]/30 transform hover:-translate-y-1 transition-all duration-300"
                  >
                    Get Started
                  </button>
                  <button 
                    onClick={() => setShouldRedirect(true)}
                    className="px-6 py-3 bg-[#121212] border border-white/20 text-white rounded-full font-medium hover:border-[hsl(0,100%,50%)]/50 transition-all duration-300"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Features - at the bottom of the screen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fadeIn max-w-5xl mx-auto mb-4">
          {[
            {
              icon: "🎯",
              title: "Personalized",
              description: "AI recommendations matching your taste"
            },
            {
              icon: "🎥",
              title: "Exclusive Content",
              description: "Movies, behind-the-scenes and more."
            },
            {
              icon: "🌐",
              title: "Community",
              description: "Connect with fellow film enthusiasts"
            }
          ].map((feature, index) => (
            <div key={index} className="bg-[#121212] p-3 md:p-4 rounded-xl border border-white/5 hover:border-[hsl(0,100%,50%)]/30 transition-all duration-300">
              <div className="flex items-center gap-2">
                <div className="text-2xl">{feature.icon}</div>
                <div>
                  <h3 className="text-sm md:text-base font-medium text-white">{feature.title}</h3>
                  <p className="text-xs md:text-sm text-gray-400">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom accent */}
        <div className="relative h-2">
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 h-1 bg-[hsl(6,78%,57%)] rounded-full blur-sm"></div>
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-[hsl(6,78%,57%)] rounded-full"></div>
        </div>
      </div>
      
      {/* Add custom CSS for animations */}
      <style jsx global>{`
        .stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          background-image: radial-gradient(circle, #ffffff 1px, transparent 1px);
          background-size: 50px 50px;
          opacity: 0.15;
        }
        
        .moving-film-strip {
          position: absolute;
          top: 40%;
          left: -100%;
          width: 300%;
          height: 1px;
          background: linear-gradient(90deg, transparent, hsl(6, 78%, 57%), hsl(6, 78%, 57%), transparent);
          animation: filmStrip 15s linear infinite;
          opacity: 0.3;
          transform: rotate(-15deg);
        }
        
        @keyframes filmStrip {
          0% { transform: translateX(0) rotate(-15deg); }
          100% { transform: translateX(33.33%) rotate(-15deg); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-in;
        }
        
        .animate-slideUp {
          animation: slideUp 1s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Page;
