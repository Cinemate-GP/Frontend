import { getProgress } from "@/lib/utils";

const Progress = ({
  ratedCount,
  minRated,
}: {
  ratedCount: number;
  minRated: number;
}) => {
  return (
    <div className="w-full max-w-xs mt-4 mb-2 relative">
      <p className="text-center text-sm">Calculating your taste...</p>
      <div className="w-full h-1 bg-gray-700 rounded-full mt-1">
        <div
          className="h-1 bg-red-500 rounded-full"
          style={{ width: `${getProgress(ratedCount, minRated)}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Progress;
