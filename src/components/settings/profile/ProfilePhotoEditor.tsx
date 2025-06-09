"use client";

import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { IoClose, IoCheckmarkCircle } from "react-icons/io5";
import { FiCamera } from "react-icons/fi";

interface ProfilePhotoEditorProps {
  previewUrl: string;
  onCancel: () => void;
  onApply: (file: File) => void;
  onChooseDifferent: () => void;
}

export const ProfilePhotoEditor: React.FC<ProfilePhotoEditorProps> = ({
  previewUrl,
  onCancel,
  onApply,
  onChooseDifferent,
}) => {
  const [scale, setScale] = useState(1);
  const editorRef = useRef<AvatarEditor>(null);

  const handleApply = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas().toDataURL("image/jpeg");
      fetch(canvas)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], "profile.jpg", { type: "image/jpeg" });
          onApply(file);
        });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/90">
      <div className="bg-zinc-900 rounded-xl max-w-3xl w-full p-6 shadow-2xl border border-zinc-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-lg font-medium">Adjust Profile Photo</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-white p-1">
            <IoClose size={24} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-6">
          <AvatarEditor
            ref={editorRef}
            image={previewUrl}
            width={288}
            height={288}
            border={50}
            borderRadius={144}
            scale={scale}
            className="bg-zinc-800"
          />
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.01"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-full h-2 bg-zinc-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
          />
          <div className="flex flex-col w-full gap-3">
            <button
              type="button"
              onClick={handleApply}
              className="w-full bg-primary text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <IoCheckmarkCircle size={18} /> Apply Changes
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-gray-300 py-2.5 px-4 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onChooseDifferent}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-gray-300 py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <FiCamera size={16} /> Choose Different Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
