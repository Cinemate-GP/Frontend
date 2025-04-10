const ratings = [
  { label: "Awful", color: "bg-[#869FB4]" },
  { label: "Meh", color: "bg-[#99896D]" },
  { label: "Good", color: "bg-[#F9A11B]" },
  { label: "Amazing", color: "bg-[#F26522]" },
];

interface RatingButtonsProps {
  rateMovie: (label: string, movieId: number, isSeen: boolean) => void;
  movies: { id: number; title: string; poster: string }[];
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
        {ratings.map((rating: { label: string; color: string }, idx) => (
          <button
            key={rating.label}
            className={`w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full text-white font-semibold flex items-center justify-center border-2 border-white text-xs md:text-sm ${
              rating.color
            } ${idx === 0 || idx === 3 ? "-mt-3" : ""}`}
            onClick={() =>
              rateMovie(rating.label, movies[currentIndex].id, true)
            }
          >
            {rating.label}
          </button>
        ))}
      </div>
      {/* Haven't Seen Button */}
      <button
        onClick={() => rateMovie("", movies[currentIndex].id, false)}
        className="flex w-fit mx-auto justify-center relative top-5 px-6 py-2 bg-gray-800 rounded-md text-white"
      >
        <span>Haven&apos;t Seen</span>
      </button>
    </>
  );
};

export default RatingButtons;
