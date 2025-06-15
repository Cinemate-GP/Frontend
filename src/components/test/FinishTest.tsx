import Link from "next/link";

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

  return (
    <>
      {hideButtons && (
        <div className="text-center flex">
          <Link
            href="/test/results"
            className="relative bg-primary -mt-2 px-6 py-2 bg-primar transition rounded-lg w-full  text-white"
          >
            Finish
          </Link>
        </div>
      )}
    </>
  );
};

export default FinishTest;
