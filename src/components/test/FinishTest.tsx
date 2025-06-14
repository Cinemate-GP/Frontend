import Link from "next/link";
import { useRouter } from "next/navigation";

const FinishTest = ({
  hideButtons,
  result,
}: {
  hideButtons: boolean;
  result: { label: string; movieId: number }[];
}) => {
  const router = useRouter();
  const handleFinish = () => {
    router.push("/");
    console.log(result);
  };
  return (
    <>
      {hideButtons && (
        <div className="text-center">
          <Link
            href="/login"
            onClick={handleFinish}
            className="relative bg-primary -mt-2 px-6 py-2 bg-primar transition rounded-lg w-full text-white"
          >
            Finish
          </Link>
        </div>
      )}
    </>
  );
};

export default FinishTest;
