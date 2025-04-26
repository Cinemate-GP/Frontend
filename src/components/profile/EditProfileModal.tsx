"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiUploadCloud } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useUser } from "@/context/UserContext";

interface User {
  fullName: string;
  email: string;
  profilePic?: string;
}

export default function EditProfileModal({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [storedUser, setStoredUser] = useState<User>({
    fullName: "",
    email: "",
  });
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const parsed = JSON.parse(localUser);
      setStoredUser(parsed.user || {});
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Create a temporary URL for preview
      const previewUrl = URL.createObjectURL(selectedFile);
      setStoredUser((prev) => ({
        ...prev,
        profilePic: previewUrl,
      }));
    }
  };

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoredUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDate = new FormData();
    formDate.append("fullName", storedUser.fullName);
    formDate.append("email", storedUser.email);
    if (file) formDate.append("profile_Image", file);
    try {
      setLoading(true);
      const res = await fetch("/api/Profile/UpdateAccount", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
        body: formDate,
      });
      if (!res.ok) throw new Error("Failed to update profile");
      const data = await res.json();
      setStoredUser({
        fullName: data.fullName,
        email: data.email,
        profilePic: data.profile_Image,
      });
      setUser({
        fullName: data.fullName,
        email: data.email,
        profilePic: data.profile_Image,
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          user: {
            fullName: data.fullName,
            email: data.email,
            profilePic: data.profile_Image,
          },
        })
      );
    } catch (error) {
      console.log(error);
    }finally {
      setLoading(false);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="bg-secondaryBg p-6 rounded-lg w-full max-w-3xl shadow-lg border border-gray-700">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl mx-auto text-center font-bold text-white">
            Update Profile
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleUpdate}>
          <div>
            <label className="block text-gray-300 mb-2">Upload Image</label>
            <div className="flex gap-4 items-start sm:items-center">
              <div className="border-2 border-dashed border-gray-600 p-4 sm:p-6 text-center rounded cursor-pointer w-2/3 sm:w-3/4 max-h-max">
                <input
                  type="file"
                  accept=".jpg,.png"
                  className="hidden"
                  id="fileUpload"
                  onChange={handleImageUpload}
                />
                <label htmlFor="fileUpload" className="cursor-pointer">
                  <FiUploadCloud className="mx-auto text-red-500 !text-sm" size={40}/>
                  <p className="text-gray-400 text-sm">Drag your image here</p>
                  <p className="text-xs text-gray-500">
                    (Only .jpg and .png files will be accepted)
                  </p>
                </label>
              </div>

              <div className="flex items-center justify-center">
                <Image
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : typeof storedUser.profilePic === "string" &&
                        storedUser.profilePic
                      ? storedUser.profilePic
                      : "/image-placeholder.png"
                  }
                  alt="Preview"
                  width={100}
                  height={100}
                  priority
                  className="w-20 h-20 sm:w-32 sm:h-32 rounded-lg object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 mt-5">
              <label className="block text-gray-300">Full Name</label>
              <input
                name="fullName"
                type="text"
                value={storedUser.fullName}
                onChange={handleChangeUser}
                className="w-full p-4 rounded bg-background text-white outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter full name"
              />
            </div>

            <div className="flex flex-col gap-1 mt-5">
              <label className="block text-gray-300">Email</label>
              <input
                name="email"
                type="email"
                value={storedUser.email}
                onChange={handleChangeUser}
                className="w-full p-4 rounded bg-background text-white outline-none focus:ring-2 focus:ring-red-600"
                placeholder="johndoe@example.com"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-[linear-gradient(90deg,#ff0000,#800000)] hover:scale-105 transition-all duration-150 rounded-full px-8 sm:px-12 py-2 sm:text-sm flex justify-center mx-auto mt-3"
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"
                  viewBox="0 0 24 24"
                ></svg>
                Loading...
              </span>
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
