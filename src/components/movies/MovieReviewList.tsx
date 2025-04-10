import { truncateText } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa6";

const MovieReviewList = () => {
  const [expandedReviews, setExpandedReviews] = useState<{
    [key: string]: boolean;
  }>({});
  const toggleExpand = (name: string) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };
  const reviews = [
    {
      name: "Juanpa Zurita",
      date: "Jun 15, 2024",
      rating: 5,
      message:
        "This film captures the essence of three different movies but never feels disconnected or disjoint. It transforms into characters as effortlessly.",
      avatar:
        "https://image.tmdb.org/t/p/original//jPsLqiYGSofU4s6BjrxnefMfabb.jpg",
    },
    {
      name: "Agustín Arana",
      date: "Jun 15, 2024",
      rating: 5,
      message:
        "Stunning performance and direction. Every frame was packed with emotion and subtlety. Brilliant!",
      avatar:
        "https://image.tmdb.org/t/p/original//jPsLqiYGSofU4s6BjrxnefMfabb.jpg",
    },
    {
      name: "Camila Rojas",
      date: "Mar 12, 2025",
      rating: 4,
      message:
        "A very engaging story with stunning visuals. Some parts felt rushed, but overall a great experience!",
      avatar:
        "https://image.tmdb.org/t/p/original//jPsLqiYGSofU4s6BjrxnefMfabb.jpg",
    },
    {
      name: "Diego Herrera",
      date: "Feb 28, 2025",
      rating: 3,
      message:
        "The performances were solid, but the storyline lacked depth in certain scenes. Still worth a watch.",
      avatar:
        "https://image.tmdb.org/t/p/original//jPsLqiYGSofU4s6BjrxnefMfabb.jpg",
    },
    {
      name: "Luciana Torres",
      date: "Jan 17, 2025",
      rating: 5,
      message:
        "Absolutely loved it! The character arcs were beautifully developed and the music was phenomenal.",
      avatar:
        "https://image.tmdb.org/t/p/original//jPsLqiYGSofU4s6BjrxnefMfabb.jpg",
    },
  ];
  return (
    <div className="flex-1 bg-secondaryBg p-6 rounded-lg mt-6 lg:mt-0">
      <h3 className="text-white text-lg font-bold">
        Reviews ({reviews.length})
      </h3>
      <div className="mt-4 space-y-4 h-96 overflow-y-auto custom-scrollbar">
        {reviews.map((review) => {
          const isExpanded = expandedReviews[review.name] || false;
          return (
            <div
              key={review.name + review.date}
              className="grid grid-cols-6 bg-background p-2 md:p-4 rounded-lg gap-4"
            >
              <div className="col-span-6 sm:col-span-1 lg:col-span-1">
                <Image
                  src={review.avatar}
                  alt="User"
                  width={50}
                  height={50}
                  className="w-16 h-16 rounded-full object-cover"
                  priority
                />
              </div>
              <div className="col-span-6 sm:col-span-5 md:col-span-5">
                <div className="flex gap-3 items-center flex-wrap">
                  <h4 className="text-white font-bold">{review.name}</h4>
                  <div className="flex items-center space-x-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={14}
                        className={
                          i < review.rating ? "text-red-500" : "text-zinc-600"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-1">
                  {truncateText(review.message, isExpanded, 80)}
                  {review.message.length > 80 && (
                    <button
                      className="text-white text-sm ml-2"
                      onClick={() => toggleExpand(review.name)}
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                </p>
                <p className="text-gray-500 text-xs mt-1">{review.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieReviewList;
