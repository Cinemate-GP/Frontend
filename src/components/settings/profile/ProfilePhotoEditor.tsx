"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { FiCamera, FiMove } from "react-icons/fi";
import { IoClose, IoCheckmarkCircle } from "react-icons/io5";
import { MdZoomIn, MdZoomOut } from "react-icons/md";
import Image from "next/image";

interface ImageEditorState {
  scale: number;
  position: { x: number; y: number };
  originalImageDimensions: { width: number; height: number } | null;
}

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
  const [editorState, setEditorState] = useState<ImageEditorState>({
    scale: 1,
    position: { x: 0, y: 0 },
    originalImageDimensions: null,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = useCallback(() => {
    if (imageRef.current && !editorState.originalImageDimensions) {
      setEditorState((prev) => ({
        ...prev,
        originalImageDimensions: {
          width: imageRef.current!.naturalWidth,
          height: imageRef.current!.naturalHeight,
        },
      }));
    }
  }, [editorState.originalImageDimensions]);

  const handleScaleChange = useCallback((newScale: number) => {
    setEditorState((prev) => ({
      ...prev,
      scale: Math.max(0.5, Math.min(3, newScale)),
    }));
  }, []);

  const handleDragStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - editorState.position.x,
      y: e.clientY - editorState.position.y,
    });
    e.preventDefault();
  }, [editorState.position]);

  const handleDragMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    setEditorState((prev) => ({
      ...prev,
      position: { x: newX, y: newY },
    }));
  }, [isDragging, dragStart]);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;

        setEditorState((prev) => ({
          ...prev,
          position: { x: newX, y: newY },
        }));
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, dragStart]);

  const applyEditing = useCallback(async (): Promise<File | null> => {
    if (!imageRef.current || !canvasRef.current || !editorState.originalImageDimensions) return null;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const outputSize = 500;
    canvas.width = outputSize;
    canvas.height = outputSize;

    const containerSize = containerRef.current?.clientWidth || 288;
    const canvasSize = 500;
    const scaleFactor = canvasSize / containerSize;

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, outputSize, outputSize);

    const img = imageRef.current;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    ctx.save();
    ctx.beginPath();
    ctx.arc(outputSize / 2, outputSize / 2, outputSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    const centerX = outputSize / 2;
    const centerY = outputSize / 2;

    ctx.translate(centerX + editorState.position.x * scaleFactor, centerY + editorState.position.y * scaleFactor);
    ctx.scale(editorState.scale, editorState.scale);

    ctx.drawImage(img, -imgWidth / 2, -imgHeight / 2, imgWidth, imgHeight);

    ctx.restore();

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(new File([blob], "profile.jpg", { type: "image/jpeg" }));
          } else {
            resolve(null);
          }
        },
        "image/jpeg",
        0.92
      );
    });
  }, [editorState]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/90">
      <div className="bg-zinc-900 rounded-xl max-w-3xl w-full p-6 shadow-2xl border border-zinc-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-lg font-medium">Adjust Profile Photo</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-white p-1">
            <IoClose size={24} />
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col items-center">
            <div
              ref={containerRef}
              className="relative w-72 h-72 rounded-full overflow-hidden bg-zinc-800 mb-4 ring-2 ring-red-500/20"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
              <Image
                ref={imageRef}
                src={previewUrl}
                alt="Profile Preview"
                onLoad={handleImageLoad}
                className="absolute"
                fill
                sizes="288px"
                style={{
                  transform: `translate(${editorState.position.x}px, ${editorState.position.y}px) scale(${editorState.scale})`,
                  transformOrigin: 'center',
                  transition: isDragging ? "none" : "transform 0.1s ease-out",
                  objectFit: 'cover',
                }}
                unoptimized={true}
              />
              <div className="absolute inset-0 rounded-full ring-4 ring-primary pointer-events-none" />
            </div>
            <div className="text-gray-400 text-sm flex items-center gap-2 mb-4">
              <FiMove className="text-primary" /> Drag to position
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-6 w-full">
              <div className="space-y-2">
                <label className="text-gray-300 flex items-center gap-2 text-sm font-medium">
                  <MdZoomIn size={20} className="text-primary" /> Zoom
                </label>
                <div className="flex items-center gap-3">
                  <MdZoomOut size={18} className="text-gray-400" />
                  <input
                    type="range"
                    min="0.5"
                    max="3"
                    step="0.01"
                    value={editorState.scale}
                    onChange={(e) => handleScaleChange(parseFloat(e.target.value))}
                    className="flex-1 h-2 bg-zinc-700 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                  />
                  <MdZoomIn size={18} className="text-gray-400" />
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <button
                  type="button"
                  onClick={async () => {
                    const file = await applyEditing();
                    if (file) onApply(file);
                  }}
                  className="w-full  bg-primary text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
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
        <canvas ref={canvasRef} style={{ display: "none" }} width="500" height="500" />
      </div>
    </div>
  );
};