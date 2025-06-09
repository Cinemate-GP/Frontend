"use client";

import React, { useState, useRef, useCallback } from "react";
import Cropper from "react-easy-crop";
import { IoClose, IoCheckmarkCircle } from "react-icons/io5";
import { FiCamera } from "react-icons/fi";
import type { Area } from "react-easy-crop";

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
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | { x: number; y: number; width: number; height: number }>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleApply = useCallback(async () => {
    if (!croppedAreaPixels || !canvasRef.current) return;

    const image = new Image();
    image.src = previewUrl;

    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], "profile.jpg", { type: "image/jpeg" });
        onApply(file);
      }
    }, "image/jpeg");
  }, [croppedAreaPixels, previewUrl, onApply]);

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
          <div className="relative w-72 h-72 bg-zinc-800 rounded-full overflow-hidden">
            <Cropper
              image={previewUrl}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <input
            type="range"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
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
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  );
};
