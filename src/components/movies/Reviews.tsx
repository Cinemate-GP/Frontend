"use client";

import { Review } from "@/lib/types";
import SectionTitle from "../SectionTitle";
import MovieReviewList from "./MovieReviewList";



export default function Reviews({movieReviews}:{movieReviews:Review[] | undefined}) {
  
  
  return (
    <div className="bg-secondaryBg p-6 rounded-lg">
      <SectionTitle title="Reviews" />

      <div className="mt-4 flex flex-col lg:flex-row">
        {/* Reviews List */}
        <MovieReviewList movieReviews={movieReviews}/>
      </div>
    </div>
  );
}
