"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiCamera } from "react-icons/fi";
import { IoClose, IoCheckmarkCircle } from "react-icons/io5";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

interface User {
  id?: string;
  fullName: string;
  email: string;
  profilePic?: string;
  bio?: string;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface ProfileFormProps {
  user: User;
  previewUrl: string;
  onUserChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onImageClick: () => void;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  modal?: boolean;
  onClose?: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  user,
  previewUrl,
  onUserChange,
  onSubmit,
  onImageClick,
  handleImageUpload,
  loading,
  modal,
  onClose
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={modal ? "" : "max-w-2xl mx-auto"}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Update Profile</h2>
        {modal && (
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <IoClose size={24} />
          </button>
        )}
      </div>

      <form className="space-y-6" onSubmit={onSubmit}>
        <div className="bg-zinc-800/50 p-6 rounded-xl">
          <label className="block text-gray-300 mb-6 text-sm font-medium">Profile Photo</label>
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div
                className="w-36 h-36 rounded-full overflow-hidden border-2 border-zinc-700 hover:border-red-500 cursor-pointer transition-all duration-200 group"
                onClick={onImageClick}
              >
                <Image
                  src={previewUrl || user.profilePic || "/user-placeholder.jpg"}
                  alt="Profile"
                  width={144}
                  height={144}
                  priority
                  unoptimized={previewUrl?.startsWith("blob:")}
                  className="w-36 h-36 object-cover group-hover:opacity-80 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/60 p-2 rounded-full">
                    <FiCamera size={24} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-500 text-xs text-center mt-1">Click to change photo</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        <div className="bg-zinc-800/50 p-6 rounded-xl space-y-4">
          <h3 className="font-medium text-gray-200">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Full Name</label>
              <input
                name="fullName"
                type="text"
                value={user.fullName}
                onChange={onUserChange}
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 text-white border border-zinc-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors outline-none"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1">Bio</label>
              <textarea
                name="bio"
                rows={4}
                value={user.bio || ""}
                onChange={onUserChange}
                className="w-full px-4 py-3 rounded-lg bg-zinc-900/80 text-white border border-zinc-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors outline-none resize-none"
                placeholder="Tell us about yourself"
              />
            </div>
          </div>
        </div>

        <div className="bg-zinc-800/50 p-6 rounded-xl space-y-4">
          <h3 className="font-medium text-gray-200">Social Media</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 flex justify-center">
                <FaInstagram className="text-pink-500" size={20} />
              </div>
              <input
                name="socialMedia.instagram"
                type="text"
                value={user.socialMedia?.instagram || ""}
                onChange={onUserChange}
                className="flex-grow px-4 py-3 rounded-lg bg-zinc-900/80 text-white border border-zinc-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors outline-none"
                placeholder="Instagram username"
              />
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 flex justify-center">
                <FaTwitter className="text-blue-400" size={20} />
              </div>
              <input
                name="socialMedia.twitter"
                type="text"
                value={user.socialMedia?.twitter || ""}
                onChange={onUserChange}
                className="flex-grow px-4 py-3 rounded-lg bg-zinc-900/80 text-white border border-zinc-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors outline-none"
                placeholder="Twitter/X username"
              />
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0 w-10 flex justify-center">
                <FaLinkedin className="text-blue-600" size={20} />
              </div>
              <input
                name="socialMedia.linkedin"
                type="text"
                value={user.socialMedia?.linkedin || ""}
                onChange={onUserChange}
                className="flex-grow px-4 py-3 rounded-lg bg-zinc-900/80 text-white border border-zinc-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors outline-none"
                placeholder="LinkedIn username"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          {modal && (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-zinc-600 text-gray-300 rounded-lg hover:bg-zinc-700/50 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <IoCheckmarkCircle size={18} /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};