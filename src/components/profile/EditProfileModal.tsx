"use client";
import { useState } from "react";
import Image from "next/image";
import { FiUploadCloud } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";

export default function EditProfileModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState(JSON.parse(localStorage.getItem("user") || "{}").name);
  const [file, setFile] = useState<File | null>(null);
  const [newEmail, setNewEmail] = useState("");
  const dispatch = useDispatch();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };    

  const handleUpdate = () => {
    if (!file) return; 

    const reader = new FileReader();
    reader.onloadend = () => {
      dispatch(setUser({ name, profileImage: reader.result }));
      onClose();
    };
    reader.readAsDataURL(file);
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
        <div className="space-y-4">
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
                  src={file ? URL.createObjectURL(file) : "/image-placeholder.png"}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="w-32 h-32 rounded-lg object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-5">
              <label className="block text-gray-300">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 rounded bg-background text-white outline-none focus:ring-2 focus:ring-red-600"
                placeholder="Enter cast name"
              />
            </div>
            <div className="flex flex-col gap-1 mt-5">
              <label className="block text-gray-300">Email</label>
              <input
                type="text"
                value={newEmail}// التأكد من اختيار ملف قبل الرفع
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full p-4 rounded bg-background text-white outline-none focus:ring-2 focus:ring-red-600"
                placeholder="johndoe@example"
              />
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleUpdate}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-4 rounded mt-6"
        >
          Update
        </button>
      </div>
    </div>
  );
}
