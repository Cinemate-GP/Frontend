"use client";

interface ModalProps {
  setIsOpen: (state: boolean) => void;
  trailer: string
}
const TrailerModal = ({ setIsOpen, trailer }: ModalProps) => {
  return (
    <>
      {/* Modal */}

      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
        {/* Modal Container */}
        <div className="relative bg-gray-900 rounded-2xl p-6 w-full max-w-3xl shadow-lg">
          {/* Close Button */}
          <button
            onClick={()=> setIsOpen(false)}
            className="text-lg absolute -top-3 -right-3 text-white bg-primary w-8 h-8 rounded-full transition-all hover:bg-red-700 flex items-center justify-center duration-300"
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
