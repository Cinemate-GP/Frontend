/* eslint-disable @next/next/no-img-element */
import { IMAGEPOSTER } from "@/constants";

export const MoviePoster = ({
  poster_path,
  title,
}: {
  poster_path: string;
  title?: string;
}) => {
  if (!poster_path) return null;

  return (
    <img
      src={`${IMAGEPOSTER}${poster_path}`}
      alt={title || "Movie poster"}
      className="rounded-lg hidden lg:block w-[300px] h-[450px] object-cover"
    />
  );
};
