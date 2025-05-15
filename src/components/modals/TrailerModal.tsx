"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

interface ModalProps {
  setIsOpen: (state: boolean) => void;
  trailer: string
}
const TrailerModal = ({ setIsOpen, trailer }: ModalProps) => {
  const { isCollapsed } = useSelector((state: RootState) => state.sideNave);
  return (
    <>
      {/* Modal */}

      <div className={`fixed inset-0 px-4 bg-black bg-opacity-80 w-full ${isCollapsed ? 'md:w-[calc(100%-4rem)]' : 'md:w-[calc(100%-14rem)]'} ms-auto flex items-center justify-center z-50`}>
        {/* Modal Container */}
        <div className="relative bg-gray-900 rounded-2xl p-6 w-full max-w-3xl shadow-lg">
          {/* Close Button */}
          <button
            onClick={()=> setIsOpen(false)}
            className="text-lg absolute -top-3 right-1 text-white bg-primary w-8 h-8 rounded-full transition-all hover:bg-red-700 flex items-center justify-center duration-300"
          >
            ✕
          </button>

          {/* Video Player */}
          <div className="relative aspect-video">
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${trailer}?si=Jcm0QOB1ZJxU8RVS`}
              title='trailer'
              allowFullScreen
            ></iframe>
          </div>

        </div>
      </div>
    </>
  );
};

export default TrailerModal;
