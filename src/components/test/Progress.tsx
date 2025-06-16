import { getProgress } from "@/lib/utils";

const Progress = ({
  ratedCount,
  minRated,
}: {
  ratedCount: number;
  minRated: number;
}) => {
  const progress = getProgress(ratedCount, minRated);
  
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-textMuted">Progress</span>
        <span className="text-foreground font-medium">
          {ratedCount}/{minRated} movies rated
        </span>
      </div>
      
      <div className="relative">
        <div className="w-full h-2 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Progress indicator dot */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full border-2 border-background shadow-lg transition-all duration-500 ease-out"
          style={{ 
            left: `calc(${progress}% - 6px)`,
            opacity: progress > 0 ? 1 : 0 
          }}
        ></div>
      </div>
      
      {progress >= 100 && (
        <div className="text-center">
          <span className="text-primary text-sm font-medium">
            ✨ Great! You&apos;re ready for recommendations
          </span>
        </div>
      )}
    </div>
  );
};

export default Progress;
