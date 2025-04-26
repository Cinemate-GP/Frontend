import React from "react";
import Image from "next/image";
import { FiStar } from "react-icons/fi";

interface ActionCardProps {
  name: string;
  time: string;
  actionText: string;
  imageUrl: string;
  stars?: number;
  review?: string;
}

const FeedCard: React.FC<ActionCardProps> = ({
  name,
  time,
  actionText,
  imageUrl,
  stars,
  review
}) => {
  return (
    <div className="flex flex-col  bg-secondaryBg p-4 rounded-lg w-full max-w-6xl">
      {/* header */}
      <div className="flex items-center justify-between">
        {/* Profile */}
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 bg-gray-600 rounded-full">
            <Image
              src={"/user-profile.webp"}
              alt="Profile"
              width={40}
              height={40}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-white font-semibold">{name}</h2>
          </div>
        </div>
        {/* Date Time */}
        <div className="text-gray-400 text-xs">{time}</div>
      </div>

      {/* content */}
      <div className="bg-[#3f3d3d60] p-4 rounded-lg mt-2">
        <div className="flex justify-between">
          {/* left */}
          <div>
            <p className="text-white mt-2">{actionText}</p>
            {stars && (
              <div className="flex gap-1 mt-2 bg-black rounded-full w-fit justify-center px-4 py-2">
                {[...Array(stars)].map((_, index) => (
                  <FiStar key={index} className="text-primary" />
                ))}
              </div>

            )}
            {review && (
              <p className="text-white max-w-[200px] md:max-w-[400px] bg-gray-900 mt-2 border border-gray-500 rounded-lg p-2">{review}</p>
            )}
          </div>
          {/* right*/}
          <div className="ml-4 w-[80px] h-[80px]">
            <Image
              src={imageUrl}
              alt="Action Image"
              width={80}
              height={80}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
