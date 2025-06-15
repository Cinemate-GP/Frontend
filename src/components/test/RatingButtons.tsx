const ratings = [
  { label: "Awful", rating: 0, color: "bg-[#869FB4]" },
  { label: "Meh", rating: 1, color: "bg-[#99896D]" },
  { label: "Good", rating: 2, color: "bg-[#F9A11B]" },
  { label: "Amazing", rating: 3, color: "bg-[#F26522]" },
];

interface RatingButtonsProps {
  rateMovie: (rating: number, tmdbId: number, isSeen: boolean) => void;
  movies: { tmdbId: number; title: string; poster: string }[];
  currentIndex: number;
}

const RatingButtons: React.FC<RatingButtonsProps> = ({
  rateMovie,
  movies,
  currentIndex,
}: RatingButtonsProps) => {
  return (
    <>
      <div className="flex relative justify-center -mt-10">
        {ratings.map(
          (rating: { label: string; rating: number; color: string }, idx) => (
            <button
              key={rating.label}
              className={`w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full text-white font-semibold flex items-center justify-center border-2 border-white text-xs md:text-sm ${
                rating.color
              } ${idx === 0 || idx === 3 ? "-mt-3" : ""}`}
              onClick={() =>
                rateMovie(rating.rating, movies[currentIndex].tmdbId, true)
              }
            >
              {rating.label}
            </button>
          )
        )}
      </div>
      {/* Haven't Seen Button */}
      <button
        onClick={() => rateMovie(-1, movies[currentIndex].tmdbId, false)}
        className="flex w-fit mx-auto justify-center relative top-5 px-6 py-2 bg-gray-800 rounded-md text-white"
      >
        <span>Haven&apos;t Seen</span>
      </button>
    </>
  );
};

export default RatingButtons;
