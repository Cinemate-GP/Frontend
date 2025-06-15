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
      <div className="relative group w-full hidden lg:block max-w-[250px] md:max-w-[280px] lg:max-w-[350px]">
        <img
          src={`${IMAGEPOSTER}${poster_path}`}
          alt={title || "Movie poster"}
          className="rounded-xl w-full h-auto aspect-[2/3] object-cover shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] group-hover:scale-[1.01]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      </div>
      
      
  );
};
