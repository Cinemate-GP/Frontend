import { Review } from "@/lib/types";
import { FormatDate, truncateText } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";

const MovieReviewList = ({movieReviews}:{movieReviews:Review[] | undefined}) => {
  const [expandedReviews, setExpandedReviews] = useState<{
    [key: string]: boolean;
  }>({});
  const toggleExpand = (name: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };
  
  return (
    <div className="flex-1 bg-secondaryBg p-6 rounded-lg mt-6 lg:mt-0">
      <h3 className="text-foreground text-lg font-bold">
        Reviews ({movieReviews?.length})
      </h3>
      {movieReviews?.length === 0 && <p className="text-gray-400 mt-3">No Reviews Found for this Movie</p>}
      <div className="mt-4 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
        {movieReviews?.map((review) => {
          const isExpanded = expandedReviews[review.reviewId] || false;
          return (
            <div
              key={review.reviewId}
              className="grid grid-cols-10 p-2 md:p-4 rounded-lg gap-4 bg-hoverBg"
            >
              <Link href={`/user/${review.userId}`} className="col-span-10 sm:col-span-2 lg:col-span-1">
                <Image
                  src={review.profilePic ? review.profilePic : "/ueser-placeholder.jpg"}
                  alt="User"
                  width={50}
                  height={50}
                  className="w-16 h-16 rounded-full object-cover"
                  priority
                />
              </Link>
              <div className="col-span-10 sm:col-span-8 lg:col-span-9">
                <div className="flex gap-3 items-center flex-wrap">
                  <h4 className="text-textMuted font-bold">{review.fullName}</h4>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={14}
                        className={
                          i < review.stars ? "text-red-500" : "text-zinc-600"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-500 text-sm mt-1">
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
                <p className="text-gray-400 text-xs mt-1">{FormatDate(review.reviewedOn)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieReviewList;
