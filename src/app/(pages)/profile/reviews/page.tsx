'use client'
import ReviewCard from "@/components/profile/ReviewCard";
import SectionTitle from "@/components/SectionTitle";
import { ReviewSkeletonCard } from "@/components/skeletons";
import { withProfileContainer } from "@/hoc/withProfileContainer";
import { ProfileCard } from "@/lib/types";
import React from "react";

interface Review extends ProfileCard {
  reviewBody: string;
  createdAt:Date
  stars:number
  reviewId:number
}
interface ComponentProps {
  resources: Review[] | null;
  loading: boolean;
  onDelete: (tmdbId: number) => void;
}
 
const UserReviews = ({resources,loading,onDelete}:ComponentProps) => {
  
  return (
    <div className="mt-5">
      <SectionTitle title="Reviews" />
      {loading && <ReviewSkeletonCard />}
      <div className="flex flex-col gap-4">
        {resources?.length === 0 && <p>No Reviews Added</p>}
        {resources?.map((item) => (
          <ReviewCard key={item.tmdbId} {...item} onDelete={onDelete} type="Review" />
        ))}
      </div>
    </div>
  );
};

export default withProfileContainer<Review>(
  UserReviews,
  "/api/Profile/ReviewedMovies"
);
