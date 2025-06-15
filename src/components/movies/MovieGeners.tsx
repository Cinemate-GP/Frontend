interface GenerProps {
    genres: { 
        id: number; 
        name: string 
    }[]
}
export const MovieGenres = ({ genres }: GenerProps) => {
    if (!genres?.length) return null;
  
    return (
      <ul className="flex flex-wrap justify-center gap-2">
        {genres.map((genre) => (
          <li
            key={genre.id}
            className="bg-primary text-white px-3 py-1 italic rounded-md text-[14px] sm:text-[16] lg:text-lg"
          >
            {genre.name}
          </li>
        ))}
      </ul>
    );
  };
  