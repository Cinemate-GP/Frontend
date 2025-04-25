import React from "react";
import MovieReviewForm from "../movies/MovieReviewForm";
import { IoClose } from "react-icons/io5";
interface ModalProps {
  tmdbId: number;
  title: string;
  poster_path: string;
  onclose: () => void;
  onRate: (rated: boolean) => void;
}

const RatingModal = ({
  tmdbId,
  title,
  poster_path,
  onRate,
  onclose,
}: ModalProps) => {
  return (
    // Modal background
    <div
      onClick={onclose}
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center w-full h-screen z-50"
    >
      {/* Modal content */}
      <div className="bg-secondaryBg rounded-lg p-4 px-5 relative w-5/6 md:w-2/3 lg:w-1/2 mx-auto">
        <button
          onClick={onclose}
          className="absolute top-2 right-2 bg-primary text-white p-1 rounded w-8 h-8 flex items-center justify-center"
        >
          <IoClose />
        </button>
        {/* Review Form */}
        <div onClick={(e) => e.stopPropagation()}>
          <MovieReviewForm
            tmdbId={tmdbId!}
            title={title!}
            poster_path={poster_path!}
            onclose={onclose}
            setRated={onRate}
          />
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
