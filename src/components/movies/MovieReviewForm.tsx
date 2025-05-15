"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCookie } from "@/hooks/useCookie";
import { authFetch } from "@/lib/api";

interface Props {
  tmdbId: number;
  title: string;
  poster_path: string;
  onclose: () => void;
}

const MovieReviewForm = ({ tmdbId, title, onclose }: Props) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = JSON.parse(localStorage.getItem("user") || "{}");
  const token = useCookie();

  // handle review
  const HandleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.length < 3) {
      toast.error("Please enter a message with at least 3 characters", {
        position: "top-center",
        autoClose: 2000,
        theme: "dark",
      });
    } else {
      try {
        setLoading(true);
        const res = await authFetch("/api/UserReviewMovie/Add", {
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
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex-1 bg-gray-900 p-4 rounded-lg">
      <h3 className="text-white text-sm sm:text-lg font-bold">
        Rate &quot;{title}&quot;
      </h3>
      <p className="text-gray-400 text-sm mt-3">
        Write a review for this movie. It will be posted on this page.
      </p>

      <form onSubmit={HandleSubmitReview} className="mt-4">
        <label className="text-gray-400 text-sm">Message</label>
        <textarea
          className="w-full bg-background text-white text-xs sm:text-[16px] p-2 rounded-md h-40 mt-1 outline-1  focus:outline-primary"
          placeholder="Make it short and sweet..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="bg-primary text-white hover:scale-105 transition-all duration-150 rounded-full px-8 sm:px-12 py-2 sm:text-sm mt-3"
        >
          {loading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"
                viewBox="0 0 24 24"
              ></svg>
              Loading...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default MovieReviewForm;
