import React from "react";
import Image from "next/image";
import { FiStar } from "react-icons/fi";
import Link from "next/link";
import { IMAGEPOSTER } from "@/constants";
import { capitalizeString, convertToDateTime, extractDigit } from "@/lib/utils";
import { FaHeart } from "react-icons/fa6";
import { MdOutlineRateReview } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
import { FaPlayCircle } from "react-icons/fa";

interface ActionCardProps {
  id: number;
  userId: string;
  type: string;
  profilePic: string;
  fullName: string;
  time: string;
  actionTitle: string;
  posterPath: string;
  description: string;
}

const FeedCard: React.FC<ActionCardProps> = ({
  userId,
  id,
  profilePic,
  fullName,
  time,
  type,
  actionTitle,
  posterPath,
  description,
}) => {
  function getIcon(type: string) {
    switch (type) {
      case "like":
        return <FaHeart color="red" size={12}/>;
      case "Watched":
        return <FaPlayCircle color="red" size={12}/>;
      case "review":
        return <MdOutlineRateReview style={{ color: '#577fc5' }} size={16}/>;
      case "rate":
        return null;
      case "follow":
        return <RiUserFollowLine color="green" size={20}/>;
    }
  }
  return (
    <div className="flex flex-col bg-secondaryBg py-4 px-0 sm:px-4 rounded-lg w-full max-w-6xl">
      {/* header */}
      <div className="flex items-center justify-between">
        {/* Profile */}
        <div className="flex items-center gap-2">
          <Link
            href={`/user/${userId}`}
            className="w-12 h-12 bg-gray-600 rounded-full"
          >
            <Image
              src={profilePic ? profilePic : "/ueser-placeholder.jpg"}
              alt="Profile"
              width={40}
              height={40}
              className="w-full h-full rounded-full object-cover"
            />
          </Link>
          <div className="flex flex-col">
            <h2 className="text-foreground font-semibold">{fullName}</h2>
            <p className="text-textMuted">{userId}</p>
          </div>
        </div>
        {/* Date Time */}
        <div className="text-gray-400 text-xs">{convertToDateTime(time)}</div>
      </div>

      {/* content */}
      <div className="bg-[#3f3d3d60] py-0 sm:py-2 px-4 rounded-lg mt-2">
        <div className="flex justify-between">
          {/* left */}
          <div>
            <p className="text-white mt-2">
              <span className="text-primary">{capitalizeString(type)}:</span>{" "}
              {actionTitle}
            </p>
            {type === "rate" && (
              <div className="flex gap-1 mt-2 bg-black rounded-full w-fit justify-center px-4 py-2">
                {[...Array(extractDigit(description))].map((_, index) => (
                  <FiStar key={index} className="text-primary" />
                ))}
              </div>
            )}
            {type === "review" && (
              <p className="text-white break-words max-w-[200px] md:max-w-[400px] bg-gray-900 mt-2 border border-gray-500 rounded-lg p-2">
                {description}
              </p>
            )}
            <div className="mt-4">{getIcon(type)}</div>
          </div>
          {/* right*/}
          <Link
            href={`/${type === "follow" ? "user" : "movies"}/${id}`}
            className="ml-4 w-[80px] h-[80px]"
          >
            <Image
              src={posterPath ? type === "follow" ? posterPath : IMAGEPOSTER + posterPath : "/ueser-placeholder.jpg"}
              alt="Action Image"
              width={80}
              height={80}
              className="w-full h-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
