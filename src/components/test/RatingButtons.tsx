const ratings = [
  { label: "Terrible", rating: 0, emoji: "😤", color: "from-red-500 to-red-600" },
  { label: "Meh", rating: 1, emoji: "😐", color: "from-orange-500 to-orange-600" },
  { label: "Good", rating: 2, emoji: "😊", color: "from-yellow-500 to-yellow-600" },
  { label: "Amazing", rating: 3, emoji: "🤩", color: "from-green-500 to-green-600" },
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
    <div className="space-y-4">
      {/* Rating Title */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          How would you rate this movie?
        </h3>
      </div>

      {/* Rating Buttons Grid */}
      <div className="grid grid-cols-2 gap-3">
        {ratings.map((rating) => (
          <button
            key={rating.rating}
            className={`group relative overflow-hidden bg-gradient-to-br ${rating.color} text-white p-4 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95`}
            onClick={() =>
              rateMovie(rating.rating, movies[currentIndex].tmdbId, true)
            }
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl">{rating.emoji}</span>
              <span className="text-sm font-semibold">{rating.label}</span>
            </div>
            
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        ))}
      </div>

      {/* Haven't Seen Button */}
      <div className="pt-2">
        <button
          onClick={() => rateMovie(-1, movies[currentIndex].tmdbId, false)}
          className="w-full py-3 px-4 bg-secondaryBg hover:bg-border text-textMuted hover:text-foreground border border-border rounded-xl transition-all duration-300 hover:shadow-md"
        >
          <span className="flex items-center justify-center gap-2">
            <span>👀</span>
            <span className="font-medium">Haven&apos;t Seen This</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default RatingButtons;
