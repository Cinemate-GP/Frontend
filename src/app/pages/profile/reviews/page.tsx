'use client'
import ReviewCard from "@/components/profile/ReviewCard";
import SectionTitle from "@/components/SectionTitle";
import { ReviewSkeletonCard } from "@/components/skeletons";
import React, { useEffect, useState } from "react";

interface Review {
  movieId: number;
  tmdbId: number;
  title: string;
  poster_path: string;
  reviewBody: string;
  createdAt:Date
}
 
const UserReviews = () => {
  const [reviews,setReviews]= useState<Review[] | null>(null)
  const [loading,setLoading] = useState(false)
  const token = document.cookie.split("=")[1];  
  useEffect(()=> {
    (async function() {
      setLoading(true)
      try {
        const res = await fetch("/api/Profile/ReviewedMovies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        if(!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data)
      } catch (error) {
        console.log(error)
      }finally {
        setLoading(false)
      }
    })()
  },[token])
  return (
    <div className="mt-5">
      <SectionTitle title="Reviews" />
      {loading && <ReviewSkeletonCard />}
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
