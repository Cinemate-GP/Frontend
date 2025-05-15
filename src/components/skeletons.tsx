"use client";
// Loading animation
export const HomeSliderSkeleton = () => {
  return (
    <div className="mx-[1rem] sm:mx-[2rem] relative w-full h-[700px] bg-secondaryBg rounded-lg overflow-hidden">
      <div className="absolute inset-0"></div>
      <div className="absolute my-auto bottom-1/2 top-1/3  left-4 md:left-8 w-full">
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
      <div className="hidden sm:flex h-screen bg-secondaryBg text-white">
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
      <div className="sm:hidden flex flex-col h-screen bg-secondaryBg text-white">
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
            <div
              key={idx}
              className="bg-gray-800 h-48 rounded-md animate-pulse"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export const SkeletonMovieInfo = () => {
  return (
    <div className="hidden sm:flex bg-secondary text-white p-6 mt-[5rem] mx-[2rem]">
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
          <div className="h-10 w-16 bg-gray-700 rounded-xl animate-pulse"></div>
          <div className="h-10 w-16 bg-gray-700 rounded-xl animate-pulse"></div>
          <div className="h-10 w-16 bg-gray-700 rounded-xl animate-pulse"></div>
          <div className="h-10 w-16 bg-gray-700 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

import { IoPlay } from "react-icons/io5";

export const SkeletonMovieStreaming = () => {
  return (
    <div className="bg-secondaryBg rounded-lg section p-4">
      <div className="relative w-full max-w-[1280px] mx-auto">
        <div className="relative rounded-lg overflow-hidden w-full aspect-video md:aspect-[16/9] max-h-[70vh] bg-gray-700 animate-pulse">
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center bg-black bg-opacity-50 py-4 w-20 h-12 rounded-md">
            <IoPlay className="text-gray-500 text-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonActors = () => {
  return (
    <div className="bg-secondaryBg rounded-lg p-4 mx-[2rem]">
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

export const ReviewSkeletonCard = () => {
  return (
    <div className="max-w-xl sm:max-w-3xl md:max-w-4xl flex gap-4 bg-secondaryBg rounded-lg">
      {/* Movie Poster */}
      <div className="w-[100px] h-[160px] sm:w-[190px] sm:h-[250px] bg-zinc-800 rounded-lg animate-pulse" />

      {/* Content */}
      <div className="flex-1 space-y-3">
        {/* Review Box */}
        <div className="w-5/6 p-3 rounded-lg mt-3 space-y-3">
          {/* Title */}
          <div className="w-2/3 h-6 bg-zinc-800 rounded animate-pulse" />

          {/* Stars */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-zinc-800 animate-pulse rounded-full"
              />
            ))}
          </div>

          {/* Review Text */}
          <div className="w-3/4 h-4 rounded animate-pulse" />
          <div className="w-full h-4 rounded animate-pulse" />

          {/* Date */}
          <div className="flex items-center gap-2 mt-2">
            <div className="w-20 h-4 animate-pulse bg-zinc-800 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SearchResultSkeleton = () => {
  return (
    <div className="flex flex-1 items-center gap-4 min-w-[140px p-2 rounded-md">
      <div className={`w-20 h-20 rounded animate-pulse`} />
      <div className="flex-1 flex flex-col gap-2">
        <div className="h-6 rounded w-3/4 animate-pulse" />
        <div className="h-8 rounded w-1/4 animate-pulse" />
      </div>
    </div>
  );
};

export function FeedCardSkelton() {
  return (
    <div className="flex flex-col gap-6 mt-20 p-4 mx-[0] sm:mx-8 mb-10 md:mb-0">
      {Array.from({ length: 3 }, (_, i) => i).map((i) => (
        <div key={i}>
          {/* Header */}
          <div className="flex items-center justify-between">
            {/* Profile */}
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 animate-pulse rounded-full"></div>
              <div>
                <div className="h-4 animate-pulse rounded w-24"></div>
              </div>
            </div>
            {/* Date Time */}
            <div className="h-3 animate-pulse rounded w-16"></div>
          </div>

          {/* Content */}
          <div className="bg-[#1a1a1a] p-4 rounded-lg mt-2">
            <div className="flex justify-between">
              {/* Left */}
              <div className="flex flex-col gap-2">
                <div className="h-4 animate-pulse rounded w-40"></div>
                <div className="h-6 animate-pulse rounded w-32"></div>
                <div className="h-10 animate-pulse rounded-lg w-[200px] md:w-[400px]"></div>
              </div>
              {/* Right */}
              <div className="ml-4 animate-pulse w-[80px] h-[80px] bg-gray-600 rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ActivityCardSkeleton() {
  return (
    <div className="flex gap-4 flex-wrap">
      {Array.from({ length: 2 }, (_, i) => i).map((i) => (
        <div
          key={i}
          className="flex bg-secondaryBg p-4 rounded-lg w-full md:max-w-xl xl:max-w-lg  gap-4"
        >
          {/* Image Placeholder */}
          <div className="w-24 h-32 animate-pulse rounded-lg"></div>

          {/* Content */}
          <div className="flex-1">
            {/* Title */}
            <div className="h-5 animate-pulse rounded w-3/4 mb-2"></div>

            {/* Action Text */}
            <div className="h-4 animate-pulse rounded w-1/4 mb-4"></div>

            {/* Review or Rating */}
            <div className="h-4 animate-pulse rounded w-2/3 mb-4"></div>
            <div className="flex gap-1">
              <div className="w-5 h-5 animate-pulse rounded-full"></div>
              <div className="w-5 h-5 animate-pulse rounded-full"></div>
              <div className="w-5 h-5 animate-pulse rounded-full"></div>
              <div className="w-5 h-5 animate-pulse rounded-full"></div>
              <div className="w-5 h-5 animate-pulse rounded-full"></div>
            </div>

            {/* Time */}
            <div className="mt-4 h-3 animate-pulse rounded w-1/5"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProfileHeaderSkeleton() {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center gap-8">
      {/* Left side */}
      <div className="flex gap-4 items-center flex-wrap">
        {/* Profile Image Skeleton */}
        <div className="border-2 border-primary p-1 rounded-full mx-auto sm:mx-0">
          <div className="w-16 h-16 sm:w-32 sm:h-32 rounded-full bg-gray-700 animate-pulse" />
        </div>

        {/* Name and Follow Button */}
        <div className="flex items-center mx-auto sm:mx-0">
          <span className="block w-[6px] h-6 rounded-xl bg-primary mr-2"></span>
          <div className="h-6 w-32 sm:w-48 bg-gray-700 rounded animate-pulse" />
          <div className="h-8 w-24 bg-gray-700 rounded-lg ml-3 animate-pulse" />
        </div>
      </div>

      {/* Right side (Stats) */}
      <ul className="flex gap-3 justify-center sm:justify-start">
        {/* Each Stat */}
        <li className="flex flex-col items-center border-r-2 pr-3 border-white/40 animate-pulse">
          <div className="h-6 w-10  rounded animate-pulse" />
          <div className="h-4 w-12 rounded mt-1 animate-pulse" />
        </li>
        <li className="flex flex-col items-center border-r-2 pr-3 border-white/40 animate-pulse">
          <div className="h-6 w-10  rounded animate-pulse" />
          <div className="h-4 w-16 rounded mt-1 animate-pulse" />
        </li>
        <li className="flex flex-col items-center animate-pulse">
          <div className="h-6 w-10 rounded animate-pulse" />
          <div className="h-4 w-16 rounded mt-1 animate-pulse" />
        </li>
      </ul>
    </header>
  );
}

export function ProfileInfoSkeleton() {
  return (
    
    <div className="flex flex-col gap-4 items-center justify-start">
      {/* Profile Image Skeleton */}
      <div className="border-2 border-primary p-1 rounded-full  sm:mx-0">
        <div className="w-16 h-16 sm:w-32 sm:h-32 rounded-full bg-gray-700 animate-pulse" />
      </div>

      {/* Name and Follow Button */}
      <div className="flex items-center  sm:mx-0">
        <div className="h-6 w-32 sm:w-48 bg-gray-700 rounded animate-pulse" />
      </div>
    </div>
  );
}


export const FollowItemSkeleton = () => {
  return (
    <div>
      {Array.from({length:5}).map((_,index) => (
        <div key={index} className="flex justify-between items-center border-b border-gray-700 py-4">
        {/* Left part: image and name */}
        <div className="flex items-center gap-4">
          {/* Profile Picture Skeleton */}
          <div className="w-16 h-16 rounded-full animate-pulse" />
  
          {/* Name Skeleton */}
          <div className="h-4 w-32 animate-pulse rounded" />
        </div>
  
        {/* Button Skeleton */}
        <div className="w-20 h-8 rounded-md animate-pulse" />
      </div>
      ))}
    </div>
  );
};
