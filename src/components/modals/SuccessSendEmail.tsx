import { FC } from "react";
import { createPortal } from "react-dom";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: FC<SuccessModalProps> = ({ isOpen, onClose }) => {

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#121212] text-white rounded-lg w-full max-w-md p-6 shadow-lg">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold">Email Sent Successfully</h2>
          <p className="text-gray-400 text-sm mt-2">
            Please check your inbox for further instructions.
          </p>

          {/* Buttons */}
          <div className="flex mt-6 gap-4">
            <button
              className="bg-red-600 px-6 py-2 rounded-full hover:bg-red-700 transition"
              onClick={onClose}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SuccessModal;
