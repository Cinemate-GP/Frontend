"use client";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const { isCollapsed } = useSelector((state: RootState) => state.sideNave);
  return (
    <div
      className={`h-screen overflow-y-auto custom-scrollbar overflow-x-hidden max-w-full relative ml-auto transition-all duration-300 ${isCollapsed ? 'md:w-[calc(100%-4rem)]' : 'md:w-[calc(100%-14rem)]'}`}
    >
      {children}
    </div>
  );
};

export default MainContent;
