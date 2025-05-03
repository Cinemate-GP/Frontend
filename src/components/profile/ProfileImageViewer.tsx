"use client";
import Image from "next/image";

interface ProfileImageViewerProps {
  imageUrl: string;
  onClose: () => void;
}

const ProfileImageViewer = ({ imageUrl, onClose }: ProfileImageViewerProps) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="w-96 h-96 rounded-full overflow-hidden shadow-xl border-4 border-white/10">
        <Image
          src={imageUrl || "/user-placeholder.jpg"}
          alt="Profile"
          width={500}
          height={500}
          className="w-full h-full object-cover"
          priority={true}
        />
      </div>
    </div>
  );
};

export default ProfileImageViewer;