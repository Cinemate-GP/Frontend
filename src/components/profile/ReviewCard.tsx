/* eslint-disable @next/next/no-img-element */
import SectionTitle from "../SectionTitle";
import { IMAGEPOSTER } from "@/constants";
import { FormateDate, getUserId } from "@/lib/utils";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";

interface cardProps {
  tmdbId: number;
  title: string;
  poster_path: string;
  reviewBody: string;
  rating: string;
  createdAt: Date;
  type: string;
  onDelete: (movieId: number) => void;
}

const ReviewCard = (item: cardProps) => {
  // delet on client side
  const handleDelete = async () => {
    item.onDelete(item.tmdbId);

    // delete on server
    try {
      const res = await fetch(`/api/User${item.type}Movie/Delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
        body: JSON.stringify({
          tmdbId: item.tmdbId,
          userId: getUserId(),
        }),
      });
      if (!res.ok) throw new Error("Failed to delete movie");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Link
      href={`/pages/movies/${item.tmdbId}`}
      className="border-b border-primary py-6"
    >
      <div className="max-w-xl sm:max-w-3xl md:max-w-4xl  flex gap-4">
        {/* Movie Poster */}
        <div className="w-[130px] h-[190px] sm:w-[190px] sm:h-[250px] overflow-hidden">
          <img
            src={IMAGEPOSTER + item.poster_path}
            alt="Batman Begins"
            width={190}
            height={250}
            className="object-cover rounded-lg w-full h-full"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Movie Title */}
          <SectionTitle title="BATMAN BEGINS" />

          {/* Review */}
          <div className="bg-background p-3 rounded-lg mt-3">
            <div className="flex items-center space-x-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  size={14}
                  className={i < 3 ? "text-red-500" : "text-zinc-600"}
                />
              ))}
            </div>
            <p className="text-white mt-2 text-sm sm:text-lg">
              {item.reviewBody}
            </p>
            <span className="text-white text-sm mt-3 flex items-center gap-1">
              <span className="w-1 h-4 rounded-xl bg-primary block"></span>
              <span>{FormateDate(item.createdAt)}</span>
            </span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDelete();
            }}
            className="hover:text-primary duration-150 transition-all text-sm border p-2 rounded ml-2 mt-4"
          >
            Remove
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ReviewCard;
