"use client";
// Loading animation
export const HomeSliderSkeleton = () => {
  return (
    <div className="mx-[1rem] sm:mx-[2rem] relative w-full h-[500px] bg-gray-800 animate-pulse rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40"></div>
      <div className="absolute bottom-8 left-4 md:left-8 w-full">
        {/* Title */}
        <div className="h-8 w-3/4 sm:w-2/5 bg-gray-700 rounded mb-2 animate-pulse"></div>

        {/* info */}
        <div className="flex items-center gap-2 my-3">
          <span className="h-6 w-8 bg-gray-700 rounded-3xl animate-pulse"></span>
          <span className="h-6 w-8 bg-gray-700 rounded animate-pulse"></span>
          <span className="h-6 w-20 bg-gray-700 rounded animate-pulse"></span>
        </div>
        {/* Description */}
        <div className="mt-4 h-20 w-5/6 sm:w-1/2 bg-gray-700 rounded animate-pulse"></div>

        {/* Buttons */}
        <div className="mt-4 flex space-x-4 items-center w-1/2">
          <div className="h-7 md:h-10 w-16 md:w-32 bg-gray-700 rounded-3xl  animate-pulse"></div>
          <div className="h-7 md:h-10 w-12 md:w-24 bg-gray-700 rounded-3xl animate-pulse"></div>
          <div className="h-7 md:h-10 w-20 md:w-40 bg-gray-700 rounded-3xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export const MovieGridSkeleton = () => {
  return (
    <div className="p-4">
      {/* Movie grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="w-full h-[400px] bg-gray-800 animate-pulse rounded-lg"
          ></div>
        ))}
      </div>
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="w-full h-[400px] bg-gray-800 animate-pulse rounded-lg"></div>
      <div className="w-full h-[400px] bg-gray-800 animate-pulse rounded-lg hidden sm:block"></div>
      <div className="w-full h-[400px] bg-gray-800 animate-pulse rounded-lg hidden md:block"></div>
      <div className="w-full h-[400px] bg-gray-800 animate-pulse rounded-lg hidden lg:block"></div>
    </div>
  );
};

export const ActorMoviesSkeleton = () => {
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden sm:flex h-screen bg-black text-white">
        {/* Movie Grid Skeleton */}
        <div className="grid grid-cols-3 gap-4 p-6 flex-grow">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="w-full h-[300px] bg-gray-800 animate-pulse rounded-lg"
              ></div>
            ))}
        </div>

        {/* actor details */}
        <div className="w-64 p-4 border-l border-red-600 overflow-auto">
          <div className="p-1">
            <div className="animate-pulse h-60 w-full rounded-lg mb-4"></div>
            <div className="animate-pulse h-6 w-3/4 rounded mb-2"></div>
            <div className="animate-pulse h-12 w-1/2 rounded"></div>
          </div>
        </div>
      </div>
      {/* Mobile Layout */}
      <div className="sm:hidden flex flex-col h-screen bg-black text-white">
        {/* Actor Info */}
        <div className="flex flex-col items-center p-4 space-y-2">
          <div className="w-32 h-32 bg-gray-900 rounded-full animate-pulse" />
          <div className="h-4 w-24 bg-gray-900 rounded animate-pulse" />
          <div className="space-y-1 text-center">
            <div className="h-3 w-40 bg-gray-900 rounded mx-auto animate-pulse" />
            <div className="h-3 w-32 bg-gray-900 rounded mx-auto animate-pulse" />
            <div className="h-3 w-36 bg-gray-900 rounded mx-auto animate-pulse" />
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-3 gap-4 p-4 overflow-y-auto custom-scrollbar">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="bg-gray-800 h-48 rounded-md animate-pulse" />
          ))}
        </div>
      </div>
    </>
  );
};

export const SkeletonMovieInfo = () => {
  return (
    <div className="hidden sm:flex bg-black text-white p-6 mt-[5rem] mx-[2rem]">
      {/* Movie Poster Skeleton */}
      <div className="w-64 h-96 bg-gray-700 animate-pulse rounded-lg hidden lg:block"></div>

      {/* Movie Details Skeleton */}
      <div className="ml-0 lg:ml-8 flex flex-col flex-grow justify-center">
        {/* Title */}
        <div className="h-10 w-full md:w-3/4 bg-gray-700 rounded mb-4 animate-pulse"></div>

        {/* Meta Info (Date, Rating, Duration) */}
        <div className="flex items-center gap-4 mb-4">
          <div className="h-6 w-16 md:w-24 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 w-12 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 w-16 bg-gray-700 rounded animate-pulse"></div>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 w-16 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 w-16 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-6 w-16 bg-gray-700 rounded animate-pulse"></div>
        </div>

        {/* Description */}
        <div className="h-20 w-fullw-5/6 bg-gray-700 rounded mb-4 animate-pulse"></div>

        {/* Buttons */}
        <div className="flex gap-4">
          <div className="h-10 w-12 md:w-24 bg-gray-700 rounded-xl animate-pulse"></div>
          <div className="h-10 w-32 md:w-40 bg-gray-700 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};
import { IoPlay } from "react-icons/io5";

export const SkeletonTrailer = () => {
  return (
    <div className="bg-black rounded-lg section p-4">
      {/* Section Title Skeleton */}
      <div className="h-8 w-32 bg-gray-700 rounded mb-4 animate-pulse"></div>

      {/* Video Placeholder */}
      <div className="relative rounded-lg overflow-hidden w-full h-[75vh] mb-[2rem] bg-gray-700 animate-pulse">
        {/* Play Button Placeholder */}
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center bg-black bg-opacity-50 py-4 w-20 h-12 rounded-md">
          <IoPlay className="text-gray-500 text-4xl" />
        </div>
      </div>
    </div>
  );
};

export const SkeletonActors = () => {
  return (
    <div className="bg-black rounded-lg p-4 mx-[2rem]">
      {/* Title Skeleton */}
      <div className="h-8 w-32 bg-gray-700 rounded mb-4 animate-pulse"></div>

      {/* List of Skeleton Actors */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            {/* Circular Image Placeholder */}
            <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse"></div>

            {/* Text Skeletons */}
            <div className="flex flex-col">
              <div className="h-4 w-32 bg-gray-700 rounded animate-pulse mb-1"></div>
              <div className="h-3 w-24 bg-gray-800 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
