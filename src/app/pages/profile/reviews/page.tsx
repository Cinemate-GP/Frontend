'use client'
import ReviewCard from "@/components/profile/ReviewCard";
import SectionTitle from "@/components/SectionTitle";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
const UserReviews = () => {
  const {reviews} = useSelector((state:RootState) => state.reviews);
  
  return (
    <div className="mt-5">
      <SectionTitle title="Reviews" />
      <div className="flex flex-col gap-4">
        {reviews?.length === 0 && <p>No Reveis Added</p>}
        {reviews?.map((item) => (
          <ReviewCard key={item.tmdbId} {...item} />
        ))}
      </div>
    </div>
  );
};

export default UserReviews;
