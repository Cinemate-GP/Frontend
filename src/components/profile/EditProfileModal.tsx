"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FiUploadCloud } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useUser } from "@/context/UserContext";
import { useCookie } from "@/hooks/useCookie";

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
  const { user, setUser } = useUser();
  const token = useCookie();

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
      const res = await fetch("/api/Profile/UpdateAccount", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
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
            <div className="flex gap-4 items-center">
              <div className="border-2 border-dashed border-gray-600 p-6 text-center rounded cursor-pointer w-3/4">
                <input
                  type="file"
                  accept=".jpg,.png"
                  className="hidden"
                  id="fileUpload"
                  onChange={handleImageUpload}
                />
                <label htmlFor="fileUpload" className="cursor-pointer">
                  <FiUploadCloud className="mx-auto text-red-500" size={40} />
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
                  className="w-32 h-32 rounded-lg object-cover"
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
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-4 rounded mt-6"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
