import { authFetch } from "@/lib/api";
import { Review } from "@/lib/types";
import { FormatDate, getUserId, truncateText } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiHappy, BiSad, BiTrashAlt } from "react-icons/bi";
import { FaStar } from "react-icons/fa6";

const MovieReviewList = ({
  movieReviews: initialReviews,
}: {
  movieReviews: Review[] | undefined;
}) => {
  const [expandedReviews, setExpandedReviews] = useState<{
    [key: string]: boolean;
  }>({});
  const [reviews, setReviews] = useState<Review[]>([]);
  const toggleExpand = (name: number) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };
  useEffect(() => {
    if (initialReviews) setReviews(initialReviews);
  }, [initialReviews]);

  const handleDelete = async (tmdbId: number, reviewId: number) => {
    // delete on server
    try {
      const res = await authFetch(`/api/UserReviewMovie/Delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
        body: JSON.stringify({
          tmdbId: tmdbId,
          userId: getUserId(),
          reviewId: reviewId,
        }),
      });
      if (!res.ok) throw new Error("Failed to delete movie");
      // Remove from local state
      setReviews((prev) =>
        prev.filter((review) => review.reviewId !== reviewId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1 bg-secondaryBg p-6 rounded-lg mt-6 lg:mt-0">
      <h3 className="text-foreground text-lg font-bold">
        Reviews ({reviews?.length})
      </h3>
      {reviews?.length === 0 && (
        <p className="text-gray-400 mt-3">No Reviews Found for this Movie</p>
      )}
      <div className="mt-4 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
        {reviews?.map((review) => {
          const isExpanded = expandedReviews[review.reviewId] || false;
          return (
            <div
              key={review.reviewId}
              className="grid grid-cols-10 p-2 md:p-4 rounded-lg gap-4 bg-hoverBg"
            >
              <Link
                href={`/${review.userName}`}
                className="col-span-10 sm:col-span-2 lg:col-span-1"
              >
                <Image
                  src={
                    review.profilePic
                      ? review.profilePic
                      : "/ueser-placeholder.jpg"
                  }
                  alt="User"
                  width={50}
                  height={50}
                  className="w-16 h-16 rounded-full object-cover"
                  priority
                />
              </Link>
              <div className="col-span-10 sm:col-span-8 lg:col-span-9">
                <div className="flex gap-3 items-center flex-wrap">
                  <h4 className="text-textMuted text-lg sm:text-xl font-bold">
                    {review.fullName}
                  </h4>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={16}
                        className={
                          i < review.stars ? "text-primary" : "text-zinc-600"
                        }
                      />
                    ))}
                  </div>
                  {review.userName === getUserId() && (
                    <button
                      onClick={() =>
                        handleDelete(review.tmdbId, review.reviewId)
                      }
                      className="ml-auto"
                    >
                      <BiTrashAlt className="text-foreground text-lg hover:text-primary duration-150 transition-all" />
                    </button>
                  )}
                </div>
                <p className="text-gray-500 text-[18px] mt-1">
                  {truncateText(review.reviewBody, isExpanded, 80)}
                  {review.reviewBody.length > 80 && (
                    <button
                      className="text-white text-sm ml-2"
                      onClick={() => toggleExpand(review.reviewId)}
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                </p>
                {review.reviewType && (
                  <div className="flex items-center gap-1 text-sm my-4">
                    <span
                      className={`flex text-[16px] items-center gap-1 px-2 py-0.5 rounded-full font-medium ${
                        review.reviewType === "positive"
                          ? "bg-green-600/10 text-green-400"
                          : "bg-red-600/10 text-red-400"
                      }`}
                    >
                      {review.reviewType === "positive" ? (
                        <BiHappy className="text-green-400 text-sm" />
                      ) : (
                        <BiSad className="text-red-400 text-sm" />
                      )}
                      {review.reviewType.charAt(0).toUpperCase() +
                        review.reviewType.slice(1)}
                    </span>
                    <span className="text-textMuted text-[16px]">
                      ({((review?.reviewConfidence ?? 0) * 100).toFixed(1)}%
                      confidence)
                    </span>
                  </div>
                )}
                <p className="text-gray-400 text-xs mt-1">
                  {FormatDate(review.reviewedOn)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieReviewList;
