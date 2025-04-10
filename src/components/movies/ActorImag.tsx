/* eslint-disable @next/next/no-img-element */
import { IMAGEPOSTER } from "@/constants";

const ActorImage = ({
  profilePath,
  name,
}: {
  profilePath: string;
  name: string;
}) => {
console.log(profilePath ? profilePath : '/user-placeholder.jpg')
  return (
    <div className="relative w-14 h-16 rounded-lg overflow-hidden">
      <img
        src={profilePath ? IMAGEPOSTER + profilePath : "/ueser-placeholder.jpg"}
        alt={name}
        width={100}
        height={200}
        loading="lazy"
        className={`w-full h-full object-cover rounded-lg transition-opacity duration-500 `}
      />
    </div>
  );
};

export default ActorImage;
