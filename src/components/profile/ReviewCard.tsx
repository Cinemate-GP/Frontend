/* eslint-disable @next/next/no-img-element */
import SectionTitle from "../SectionTitle";
import { IMAGEPOSTER } from "@/constants";
import { FormateDate } from "@/lib/utils";
import { FaStar } from "react-icons/fa6";

interface cardProps {
  tmdbId: number;
  title: string;
  poster_path: string;
  reviewBody: string;
  createdAt: Date;
}

const ReviewCard = (item: cardProps) => {
  return (
    <div className="border-b border-primary py-6">
      <div className="max-w-xl sm:max-w-3xl md:max-w-4xl  flex gap-4">
        {/* Movie Poster */}
        <div className="w-[100px] h-[160px] sm:w-[190px] sm:h-[250px] overflow-hidden">
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
                  className={
                    i < 3 ? "text-red-500" : "text-zinc-600"
                  }
                />
              ))}
            </div>
            <p className="text-white mt-2 text-sm sm:text-lg">{item.reviewBody}</p>
            <span className="text-white text-sm mt-3 flex items-center gap-1">
              <span className="w-1 h-4 rounded-xl bg-primary block"></span>
              <span>{FormateDate(item.createdAt)}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
