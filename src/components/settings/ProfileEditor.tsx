"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useUser } from "@/context/UserContext";
import { getCookie, getUserId } from "@/lib/utils";
import { ProfilePhotoEditor } from "./profile/ProfilePhotoEditor";
import { User, ProfileEditorProps } from "./profile/types";
import { FaUserCircle, /*FaInstagram, FaTwitter, FaLinkedin */} from "react-icons/fa";
import { MdPhotoCamera } from "react-icons/md";
import Image from "next/image";

export default function ProfileEditor({ modal = false, onClose }: ProfileEditorProps) {
  const [user, setUser] = useState<User>({
    fullName: "",
    email: "",
    profilePic: "",
    bio: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setUser: setContextUser, refreshUserData } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const parsed = JSON.parse(localUser);
      const newUser = {
        ...parsed.user,
        bio: parsed.user?.bio || "",
        socialMedia: {
          instagram: parsed.user?.socialMedia?.instagram || "",
          twitter: parsed.user?.socialMedia?.twitter || "",
          linkedin: parsed.user?.socialMedia?.linkedin || "",
        },
      };
      setUser(newUser);
      if (parsed.user?.profilePic) setPreviewUrl(parsed.user.profilePic);
    }
  }, []);

  const handleImageClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File size should not exceed 5MB");
      return;
    }

    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    setIsEditingImage(true);
  }, []);

  const handleUserChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setUser((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof User] as Record<string, string> || {}),
          [child]: value,
        },
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  const handleUpdate = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setErrorMessage(null);

      const formData = new FormData();
      formData.append("fullName", user.fullName);
      // Email is no longer editable, but we still need to send it in the API request
      formData.append("email", user.email);
      if (user.bio) formData.append("bio", user.bio);
      // if (user.socialMedia?.instagram) formData.append("socialMedia.instagram", user.socialMedia.instagram);
      // if (user.socialMedia?.twitter) formData.append("socialMedia.twitter", user.socialMedia.twitter);
      // if (user.socialMedia?.linkedin) formData.append("socialMedia.linkedin", user.socialMedia.linkedin);
      if (file) formData.append("profile_Image", file);

      try {
        const res = await fetch("/api/Profile/UpdateAccount", {
          method: "PUT",
          headers: { Authorization: `Bearer ${getCookie("token")}` },
          body: formData,
        });

        if (!res.ok) {
          // Get more detailed error information if available
          let errorDetail = "Failed to update profile";
            const errorData = await res.json();
            errorDetail = errorData.message || errorData.error || errorDetail;
          
          
          setErrorMessage(errorDetail);
          console.error("Profile update failed:", errorDetail);
          return;
        }

        const data = await res.json();
        const updatedUser = {
          ...user,
          fullName: data.fullName,
          profilePic: data.profile_Image,
          bio: data.bio,
      
        };

        setUser(updatedUser);
        setContextUser(updatedUser);
        localStorage.setItem(
          "user",
          JSON.stringify({ user: { id: getUserId(), ...updatedUser } })
        );
        refreshUserData();
        setIsEditingImage(false);
        if (modal && onClose) onClose();
      } catch (error) {
        console.error("Update error:", error);
        setErrorMessage("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    },
    [user, file, setContextUser, refreshUserData, modal, onClose]
  );

  return (
    <>
      {isEditingImage && (
        <ProfilePhotoEditor
          previewUrl={previewUrl}
          onCancel={() => {
            setIsEditingImage(false);
            setPreviewUrl(user.profilePic || "");
            setFile(null);
          }}
          onApply={(processedFile) => {
            setFile(processedFile);
            setPreviewUrl(URL.createObjectURL(processedFile));
            setIsEditingImage(false);
          }}
          onChooseDifferent={handleImageClick}
        />
      )}
      
      <div className="bg-secondaryBg p-4 sm:p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 sm:mb-6 text-foreground flex items-center gap-2">
          <FaUserCircle className="text-primary" />
          Profile Information
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4 sm:space-y-6">
          {/* Profile Photo */}
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-center gap-4 sm:gap-6 py-4 border-b border-border">
            <div 
              onClick={handleImageClick} 
              className="relative cursor-pointer group w-24 h-24 rounded-full overflow-hidden border-2 border-primary"
            >
              <Image
                src={previewUrl || "/user-placeholder.jpg"}
                alt="Profile"
                width={96}
                height={96}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <MdPhotoCamera size={30} className="text-white" />
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left md:text-center lg:text-left">
              <h3 className="text-gray-500 text-[16px] mb-2">Profile Photo</h3>
              <p className="text-gray-500 text-sm mb-3">Click on the image to change your profile photo</p>
              <button
                type="button"
                onClick={handleImageClick}
                className="text-sm bg-primary hover:bg-zinc-700 px-3 py-1.5 rounded text-white transition-colors"
              >
                Upload New Photo
              </button>
            </div>
          </div>

          {/* Name */}
          <div className="flex flex-col py-3 border-b border-border">
            <div className="flex items-start gap-3 mb-3">
              <FaUserCircle className="text-gray-400 mt-1" size={20} />
              <div>
                <label htmlFor="fullName" className="block text-textMuted mb-1">Full Name</label>
                <p className="text-xs text-gray-500">Your name as it appears across the platform</p>
              </div>
            </div>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={user.fullName}
              onChange={handleUserChange}
              className="bg-background text-foreground border border-border rounded-lg px-4 py-2 w-full focus:outline-none focus:border-primary"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col py-3 border-b border-border">
            <div className="flex items-start gap-3 mb-3">
              <svg className="text-gray-400 mt-1" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <div>
                <label htmlFor="bio" className="block text-textMuted mb-1">Biography</label>
                <p className="text-xs text-gray-500">Tell others about yourself</p>
              </div>
            </div>
            <textarea
              id="bio"
              name="bio"
              value={user.bio || ""}
              onChange={handleUserChange}
              rows={4}
              className="bg-background text-white border border-border rounded-lg px-4 py-2 w-full focus:outline-none focus:border-primary"
              placeholder="Write a short bio about yourself..."
            />
          </div>

          {/* Social Media */}
          {/* <div className="py-3 space-y-4">
            <h3 className="text-gray-300 mb-3 flex items-center gap-2">
              <svg className="text-gray-400" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Social Media Links
            </h3>

            <div className="flex flex-col py-2">
              <div className="flex items-center gap-3 mb-2">
                <FaInstagram className="text-gray-400" size={20} />
                <label htmlFor="instagram" className="text-gray-300">Instagram</label>
              </div>
              <input
                type="text"
                id="instagram"
                name="socialMedia.instagram"
                value={user.socialMedia?.instagram || ""}
                onChange={handleUserChange}
                className="bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-primary"
                placeholder="Username"
              />
            </div>

            <div className="flex flex-col py-2">
              <div className="flex items-center gap-3 mb-2">
                <FaTwitter className="text-gray-400" size={20} />
                <label htmlFor="twitter" className="text-gray-300">Twitter</label>
              </div>
              <input
                type="text"
                id="twitter"
                name="socialMedia.twitter"
                value={user.socialMedia?.twitter || ""}
                onChange={handleUserChange}
                className="bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-primary"
                placeholder="Username"
              />
            </div>

            <div className="flex flex-col py-2">
              <div className="flex items-center gap-3 mb-2">
                <FaLinkedin className="text-gray-400" size={20} />
                <label htmlFor="linkedin" className="text-gray-300">LinkedIn</label>
              </div>
              <input
                type="text"
                id="linkedin"
                name="socialMedia.linkedin"
                value={user.socialMedia?.linkedin || ""}
                onChange={handleUserChange}
                className="bg-zinc-800 text-white border border-zinc-700 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-primary"
                placeholder="Username"
              />
            </div>
          </div> */}

          {/* Error Message */}
          {errorMessage && (
            <div className="text-primary text-sm text-center py-2">
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating Profile...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>

        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>
    </>
  );
}