import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";

interface MovieCardProps {
  id?: number;
  tmdbid: number;
  title: string;
  image: string;
  imdbRating?: string;
  cardType?: 'top10' | 'default';
}

const MovieCard = ({ id, tmdbid, title, image, imdbRating, cardType = 'default' }: MovieCardProps) => {
  const isTop10 = cardType === 'top10';
  
  const baseImageClasses = "transition-all duration-300 ease-in-out";
  
  if (isTop10) {
    return (
      <Link href={`/movies/${tmdbid}`} className="block">
        <div className="relative flex items-end group">
          <span
            className={`absolute text-stroke-primary transition-all duration-300
              ${id === 10 ? 'w-[200px] tracking-[-9px] md:tracking-[-18px]' : ''}
              text-[90px] lg:text-[128px] -z-10 -bottom-2 md:-bottom-8
              -left-10 md:-left-16
              group-hover:scale-110 group-hover:-bottom-8
              group-hover:text-transparent group-hover:bg-clip-text
              group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-black`}
          >
            {id}
          </span>
          <Image
            src={image}
            alt={title}
            width={300}
            height={450}
            className={`${baseImageClasses} border-2 border-transparent group-hover:border-gray-700`}
          />
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/movies/${tmdbid}`} className="block">
      <div className="relative group rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={300}
          height={450}
          className={`${baseImageClasses} group-hover:scale-105 h-auto w-full object-cover rounded-lg`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col justify-end h-full p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-white font-medium line-clamp-2">{title}</h4>
              {imdbRating && (
                <span className="flex items-center gap-1 text-sm">
                  <FaStar className="text-primary" />
                  {imdbRating.split("/")[0]}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
