"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string | null;
}

const SuccessModal = ({ isOpen, onClose, email }: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-secondaryBg/90 backdrop-blur-md p-6 text-left align-middle shadow-xl border border-gray-700/30 transition-all">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-8 w-8 text-green-500" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                  
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold text-white mb-2"
                  >
                    Email Sent Successfully!
                  </Dialog.Title>
                  
                  <div className="mt-2">
                    <p className="text-sm text-gray-400 mb-2">
                      We have sent a password reset link to:
                    </p>
                    {email && (
                      <p className="text-white font-medium mb-4">
                        {email}
                      </p>
                    )}
                    <p className="text-sm text-gray-400 mb-6">
                      Please check your inbox and follow the instructions to reset your password.
                    </p>
                  </div>

                  <div className="mt-4 flex gap-3 w-full">
                    <button
                      type="button"
                      className="flex-1 inline-flex justify-center rounded-lg border border-transparent bg-primary px-4 py-3 text-sm font-medium text-white hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                      onClick={onClose}
                    >
                      Got it
                    </button>
                    
                    <Link
                      href="/login"
                      className="flex-1 inline-flex justify-center rounded-lg border border-gray-600 bg-transparent px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500/50"
                    >
                      Back to Login
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SuccessModal;
