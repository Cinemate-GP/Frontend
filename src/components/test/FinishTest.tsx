import Link from "next/link";
import { useUser } from "@/context/UserContext";

interface Result {
  ratedMovies: { rating: number; movieId: number }[];
}

const FinishTest = ({
  hideButtons,
}: {
  hideButtons: boolean;
  result: Result;
  resetTest: () => void;
}) => {
  const { user } = useUser();

  return (
    <>
      {hideButtons && (
        <div className="text-center space-y-4">
          <div className="p-4 bg-primary/10 rounded-xl border border-primary/20">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">🎉</span>              <h3 className="text-lg font-semibold text-primary">
                Perfect! You&apos;re all set
              </h3>
            </div>
            <p className="text-textMuted text-sm">
              We&apos;ve analyzed your ratings and can now create personalized recommendations
            </p>
          </div>
          
          <Link
            href={`/${user?.userName || `home`}`}
            className="group w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-modern-hover flex items-center justify-center gap-2"
          >
            <span>View My Recommendations</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      )}
    </>
  );
};

export default FinishTest;
