import SingleActor from "@/components/movies/Actor";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-mainBg">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-32 pb-20">
        <SingleActor />
      </div>
    </div>
  );
};

export default page;
