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
            className="bg-[#AE251C] text-white px-3 py-1 italic rounded-md text-[14] sm:text-[16]"
          >
            {genre.name}
          </li>
        ))}
      </ul>
    );
  };
  