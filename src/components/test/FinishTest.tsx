interface Result {
  ratedMovies: { rating: number; movieId: number }[];
}

const FinishTest = ({
  hideButtons,
  result,
}: {
  hideButtons: boolean;
  result: Result;
  resetTest: () => void;
}) => {
  // const router = useRouter();
  const handleFinish = () => {
    // router.push("/");
    console.log(result);
  };
  return (
    <>
      {hideButtons && (
        <div className="text-center flex">
          <button
            onClick={handleFinish}
            className="relative bg-primary -mt-2 px-6 py-2 bg-primar transition rounded-lg w-full  text-white"
          >
            Finish
          </button>
        </div>
      )}
    </>
  );
};

export default FinishTest;
