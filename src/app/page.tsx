import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";

const page = () => {
  return (
    <div className="bg-[url('/main-img.png')] bg-cover bg-center max-h-full h-screen w-full relative">
      <div className="absolute w-full h-full bg-black/80">
        <div className="container mx-auto !px-2 xl:!px-[6rem] !py-2 md:px-24 !md:py-4">
          {/* Navebar */}
          <div className="flex items-center justify-between gap-4">
            <Link href="/pages">
              <Image src="/logo.svg" width={100} height={100} alt="logo" />
            </Link>
            <div className="bg-[#2d3638] rounded-3xl flex items-center ml-0 lg:ml-[2rem] p-3 bg-opacity-80 w-full lg:w-3/6">
              <CiSearch />
              <input
                type="text"
                placeholder="Search.."
                className="ml-2 bg-transparent outline-none w-full h-full"
              />
            </div>
            <div className="flex gap-4 items-center">
              <button className="relative">
                <span className="text-white bg-primary w-[5px] h-[5px] rounded-full absolute top-0 right-2"></span>
                <IoIosNotificationsOutline size={24} />
              </button>
              <Link
                href={"/auth/login"}
                className="text-xs md:text-sm bg-primary block w-[5rem] py-2 text-center rounded-3xl border border-transparent hover:border-white hover:bg-transparent transition-all duration-00"
              >
                Login
              </Link>
            </div>
          </div>
          {/* Content */}
          <div className="w-full mt-12 sm:mt-20 md:mt-32 lg:mt-20 pl-0 2xl:pl-24 mb-8 md:mb-0 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12 w-full relative z-10">
              {/* Text Section */}
              <div className="text-center md:text-start pr-0 lg:pr-5">
                <h1 className="text-2xl !leading-[40px] md:text-4xl font-semibold lg:text-4xl lg:!leading-[56px]">
                  Find Your Next Favorite Movie with AI-Powered Recommendations!
                  🎬
                </h1>
                <p className="text-lg md:text-xl mt-5 text-gray-300">
                  Can’t decide between thousands of streaming movies? let Us do the work!
                </p>
                <Link
                  href="/auth/signup"
                  className="flex w-fit mx-auto md:mx-0 items-center gap-5 text-xs rounded-3xl text-center md:text-lg bg-gradient-to-r from-primary to-red-500 hover:translate-y-[-3px] shadow-lg hover:shadow-red-500/50 transition-all duration-300 px-6 py-3 mt-5"
                >
                  <span>Start Now</span> 🚀
                </Link>
              </div>

              {/* Movie List */}
              <div className="text-center md:text-start max-w-[400px] w-full mx-auto md:max-w-sm">
                <ul className="w-full bg-secondaryBg p-4 relative max-h-[20rem] lg:max-h-[30rem] overflow-y-scroll custom-scrollbar flex flex-col gap-6 rounded-lg">
                  {/* Movie Item */}
                  {[
                    {
                      title: "The Dark Knight",
                      year: "2008",
                      match: "80%",
                      img: "https://image.tmdb.org/t/p/original//qJ2tW6WMUDux911r6m7haRef0WH.jpg",
                    },
                    {
                      title: "Inception",
                      year: "2010",
                      match: "98%",
                      img: "https://image.tmdb.org/t/p/original//3L3l6LsiLGHkTG4RFB2aBA6BttB.jpg",
                    },
                    {
                      title: "Interstellar",
                      year: "2014",
                      match: "95%",
                      img: "/test2.png",
                    },
                  ].map((movie, index) => (
                    <li
                      key={index}
                      className="flex gap-5 items-start hover:scale-105 transition-all duration-300 animate-fade-in-up"
                    >
                      <div className="rounded w-[70px] md:w-[90px] overflow-hidden">
                        <Image
                          src={movie.img}
                          width={100}
                          height={100}
                          alt="movie poster"
                          className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <h3 className="flex gap-2 text-lg items-center">
                          <span className="bg-primary w-[7px] h-5 rounded-full block"></span>
                          {movie.title}{" "}
                          <span className="text-sm text-primary">
                            ({movie.year})
                          </span>
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Action | Sci-Fi | Thriller
                        </p>
                        <p className="text-green-400 text-lg font-semibold mt-2">
                          {movie.match} Match ✅
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
