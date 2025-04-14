"use client";

import SectionTitle from "../SectionTitle";
import MovieReviewList from "./MovieReviewList";



export default function Reviews() {
  
  

  return (
    <div className="bg-black rounded-lg mb-[4rem] section">
      <SectionTitle title="Reviews" />

      <div className="mt-4 flex flex-col lg:flex-row">
        {/* Reviews List */}
        <MovieReviewList/>
      </div>
    </div>
  );
}
