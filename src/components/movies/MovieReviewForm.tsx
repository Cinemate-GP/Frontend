'use client'
import { FormatDate } from "@/lib/utils";
import { addToRecentActivities } from "@/redux/slices/recentActivity";
import { addToReviews } from "@/redux/slices/reviews";
import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
interface Props {
    tmdbId: number;
    title: string;
    poster_path: string;
}

const MovieReviewForm = ({tmdbId, title, poster_path}: Props) => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState("");
    
    const dispatch = useDispatch();
  const handleRating = (i: number) => {
    setRating(i);
  };

  const HandleSubmitReview = () => {
    if (message.length < 10) {
      toast.error("Please enter a message with at least 10 characters", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    } else {
      const date = new Date();
      dispatch(
        addToReviews({
          tmdbId,
          title,
          poster_path,
          message,
          rating,
          createdAt: FormatDate(date),
        })
      );
      dispatch(
        addToRecentActivities({
          tmdbId,
          movieTitle: title,
          title: "reviewed",
          poster_path,
          type: "reviewed",
          rating,
          reviewMessage: message,
          createdAt: new Date().toISOString(),
        })
      );
      toast.success("Review added successfully!", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
      setRating(0);
      setMessage("");
    }
  };
  
  return (
    <div className="flex-1 bg-secondaryBg p-6 rounded-lg">
      <h3 className="text-white text-lg font-bold">
        Review &quot;{title || "Unknown Title"}&quot;
      </h3>
      <p className="text-gray-400 text-sm mt-3">
        Write a review for this movie. It will be posted on this page.
      </p>

      <div className="mt-4">
        <label className="text-gray-400 text-sm">Select Rating</label>
        <div className="flex items-center gap-4 mt-1">
          <select
            className="bg-background text-white p-2 rounded-md w-1/2"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={0}>0 - Poor</option>
            <option value={1}>1 - Bad</option>
            <option value={2}>2 - Okay</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Very Good</option>
            <option value={5}>5 - Excellent</option>
          </select>

          <div className="flex gap-1">
            {Array.from({ length: rating }, (_, i) => (
              <button key={i} onClick={() => handleRating(i + 1)}>
                <FaStar color="gold" className="text-xl" />
              </button>
            ))}
            {Array.from({ length: 5 - rating }, (_, i) => (
              <button key={i} onClick={() => handleRating(rating + i + 1)}>
                <FaRegStar color="gold" className="text-xl" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label className="text-gray-400 text-sm">Message</label>
        <textarea
          className="w-full bg-background text-white p-2 rounded-md h-40 mt-1"
          placeholder="Make it short and sweet..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button
        onClick={HandleSubmitReview}
        className="w-full bg-red-600 text-white font-bold py-2 rounded-lg mt-4"
      >
        Submit
      </button>
    </div>
  );
};

export default MovieReviewForm;
