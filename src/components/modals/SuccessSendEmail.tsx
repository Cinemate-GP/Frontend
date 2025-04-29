"use client";

import {  useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string | null;
  title?: string;
  message?: string;
  type?: "reset-password" | "email-verification" | "generic";
}

const SuccessModal = ({ 
  isOpen, 
  onClose, 
  email,
  title = "Email Sent Successfully!",
  message = "Please check your inbox and follow the instructions to reset your password.",
  type = "reset-password"
}: ModalProps) => {
  // Get appropriate message based on the modal type
  const getDescription = () => {
    switch(type) {
      case "email-verification":
        return "We have sent a verification link to:";
      case "reset-password":
        return "We have sent a password reset link to:";
      default:
        return "We have sent an email to:";
    }
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);
  
  // Handle body scroll lock when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" 
           onClick={onClose}
           style={{
             opacity: isOpen ? 1 : 0,
             transition: 'opacity 300ms ease-out'
           }} />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-secondaryBg/90 backdrop-blur-md p-6 text-left align-middle shadow-xl border border-gray-700/30"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  type: "spring", 
                  damping: 20, 
                  stiffness: 300 
                }}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  {/* Animated success icon */}
                  <motion.div 
                    className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-8 w-8 text-green-500" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </motion.svg>
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {title}
                  </h3>
                  
                  <div className="mt-2">
                    <p className="text-sm text-gray-400 mb-2">
                      {getDescription()}
                    </p>
                    {email && (
                      <motion.p 
                        className="text-white font-medium mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {email}
                      </motion.p>
                    )}
                    <p className="text-sm text-gray-400 mb-6">
                      {message}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-3 w-full">
                    <motion.button
                      type="button"
                      className="flex-1 inline-flex justify-center rounded-lg border border-transparent bg-gradient-to-r from-red-700 to-red-600 px-4 py-3 text-sm font-medium text-white hover:from-red-600 hover:to-red-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 transition-colors duration-200"
                      onClick={onClose}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Got it
                    </motion.button>
                    
                    <Link
                      href="/login"
                      className="flex-1 inline-flex justify-center rounded-lg border border-gray-600 bg-transparent px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500/50 transition-colors duration-200"
                    >
                      Back to Login
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
