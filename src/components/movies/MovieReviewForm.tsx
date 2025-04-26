"use client";
import {useState } from "react";
import { toast } from "react-toastify";
import { useCookie } from "@/hooks/useCookie";

interface Props {
  tmdbId: number;
  title: string;
  poster_path: string;
  onclose: () => void;
  setRated: (rated: boolean) => void;
}

const MovieReviewForm = ({ tmdbId, title, onclose }: Props) => {
  const [message, setMessage] = useState("");

  const { user } = JSON.parse(localStorage.getItem("user") || "{}");
  const token = useCookie();


  // handle review
  const HandleSubmitReview = async () => {
    if (message.length < 10) {
      toast.error("Please enter a message with at least 10 characters", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    } else {
      try {
        const res = await fetch("/api/UserReviewMovie/Add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            tmdbId,
            userId: user.id,
            reviewBody: message,
          }),
        });
        if (!res.ok) {
          throw new Error("Failed to add review");
        }
        toast.success("Review added successfully!", {
          position: "top-center",
          autoClose: 2000,
          theme: "dark",
        });
        setMessage("");
        onclose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex-1 bg-secondaryBg rounded-lg">
      <h3 className="text-white text-lg font-bold">Rate &quot;{title}&quot;</h3>
      <p className="text-gray-400 text-sm mt-3">
        Write a review for this movie. It will be posted on this page.
      </p>

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
