import Image from "next/image";
import { BsStarFill } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

const NavbarSearch = () => {
  return (
    <div className="bg-[#1e2526] rounded-3xl flex items-center ml-0 lg:ml-[2rem] p-3 bg-opacity-80">
      <CiSearch />
      <input
        type="text"
        placeholder="Search.."
        className="ml-2 bg-transparent outline-none w-full h-full"
      />
    </div>
  );
};

export default NavbarSearch;

export const SearchModal = () => {
  const searchResults = [
    {
      id: 1,
      name: "Movie 1",
      img: "https://image.tmdb.org/t/p/w342/15JJd47Wy6enQS3roKSdK1ouce7.jpg",
      rate: 5,
      date: "Oct 20, 2022",
    },
    {
      id: 2,
      name: "Movie 1",
      img: "https://image.tmdb.org/t/p/w342/cRZz2iM6l0shz62gHGf5U84kdPX.jpg",
      rate: 5,
      date: "Oct 20, 2022",
    },
    {
      id: 3,
      name: "Movie 1",
      img: "https://image.tmdb.org/t/p/w342/15JJd47Wy6enQS3roKSdK1ouce7.jpg",
      rate: 5,
      date: "Oct 20, 2022",
    },
  ];
  return (
    <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-sm">
      <div className="fixed p-4 left-[50%] top-[50%] min-h-[20rem] z-50 w-[95%] mx-auto bg-secondaryBg max-w-6xl flex flex-col translate-x-[-50%] translate-y-[-50%] gap-2 duration-500 rounded-lg overflow-auto" id="search">
        <span className="text-lg font-medium pl-3">Search</span>
        <div className="relative bg-[#111111] rounded-xl">
          <CiSearch className="absolute top-4 left-4 text-gray-400 w-6 h-6" />
          <input
            type="text"
            placeholder="What are you looking for.."
            className="bg-transparent size-full p-6 py-4 pl-12 !text-[.95rem] 2xl:!text-base !text-gray-100 tracking-wider outline-none"
          />
        </div>
        <ul className="flex flex-col gap-2 max-h-[55vh] bg-[#111111] overflow-y-auto p-2 rounded-xl overflow-x-hidden">
          {searchResults.map((result) => (
            <li
              key={result.id}
              className="w-full !aspect-[5/1] !p-2 !shrink-0 gap-4 flex cursor-pointer rounded-xl shadow overflow-hidden relative smoothie hover:bg-white/[.03]"
            >
              <div className="h-full shrink-0 !aspect-square rounded-md overflow-hidden relative bg-white/5">
                <Image
                  src={result.img}
                  alt={result.name}
                  fill
                  sizes="100%"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 h-full justify-center flex-grow text-[.82rem] sm:text-sm font-medium">
                <div className="line-clamp-2 tracking-wider">
                  Super Dimension Fortress Macross
                </div>
                <div className="flex gap-3 items-center text-[.85rem] text-gray-400">
                    <span className="gap-1 rounded-md flex items-center ">
                        <BsStarFill color="gold" size={12}/>
                        {result.rate}
                    </span>
                    <span className="text-[.85rem] text-gray-400">{result.date}</span>

                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
