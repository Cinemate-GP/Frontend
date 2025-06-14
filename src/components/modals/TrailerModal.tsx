"use client";

import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { FiX, FiPlay } from "react-icons/fi";

interface ModalProps {
  setIsOpen: (state: boolean) => void;
  trailer: string
}

const TrailerModal = ({ setIsOpen, trailer }: ModalProps) => {
  const { isCollapsed } = useSelector((state: RootState) => state.sideNave);
  
  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'auto';
    };
  }, [setIsOpen]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 bg-black/80 backdrop-blur-sm w-full ${isCollapsed ? 'md:w-[calc(100%-4rem)]' : 'md:w-[calc(100%-14rem)]'} ms-auto flex items-center justify-center z-50 p-6`}
      onClick={handleBackdropClick}
    >
      {/* Modal Container */}
      <div className="relative bg-background backdrop-blur-md border border-border rounded-xl w-full max-w-5xl">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
              <FiPlay className="text-white text-lg ml-0.5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Movie Trailer</h2>
              <p className="text-sm text-gray-500 mt-1">Watch in HD</p>
            </div>
          </div>
          
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 hover:bg-primary text-foreground hover:text-white rounded-lg border border-border flex items-center justify-center transition-all duration-200 group"
          >
            <FiX className="text-lg group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video p-2 sm:p-6">
          <div className="relative w-full h-full rounded-xl overflow-hidden border border-gray-800/30">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${trailer}?autoplay=1&rel=0&modestbranding=1`}
              title="Movie Trailer"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 border-t border-border pt-4">
          <div className="flex items-center justify-center">
            <p className="text-sm text-textMuted">
              Press <kbd className="px-2 py-1 bg-gray-500 rounded text-xs font-mono text-white">ESC</kbd> to close
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
