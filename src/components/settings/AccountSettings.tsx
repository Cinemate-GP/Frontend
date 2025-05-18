"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  IoEye,
  IoEyeOff,
  IoLockClosed,
  IoMail,
  IoSettingsSharp,
} from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { getCookie, getUserId } from "@/lib/utils";
import { User } from "./profile/types";
import { useUser } from "@/context/UserContext";
import { toast } from "react-toastify";

const AccountSettings = () => {
  const { setUser: setContextUser, refreshUserData } = useUser();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);

  const [user, setUser] = useState<User>({
    fullName: "",
    userName: "",
    email: "",
    profilePic: "",
    bio: "",
  });

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const parsed = JSON.parse(localUser);
      if (parsed.user?.userName) {
        const newUser = {
          ...parsed.user,
        };
        setUser(newUser);
      }
    }
  }, []);
  const [loading, setLoading] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      if (user.newPassword !== user.confirmPassword)
        toast.error("Passwords do not match");
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      formData.append("userName", user.userName);
      formData.append("email", user.email);
      formData.append("newPassword", user.newPassword || "");
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
          console.error("Profile update failed:", errorDetail);
          return;
        }

        const data = await res.json();
        const updatedUser = {
          ...user,
          userName: data.userName,
          email: data.email,
        };

        setUser(updatedUser);
        setContextUser(updatedUser);
        localStorage.setItem(
          "user",
          JSON.stringify({ user: { id: getUserId(), ...updatedUser } })
        );
        refreshUserData();
      } catch (error) {
        console.error("Update error:", error);
      } finally {
        setLoading(false);
      }
    },
    [user, setContextUser, refreshUserData]
  );

  return (
    <div className="bg-secondaryBg p-4 sm:p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 sm:mb-6 text-foreground flex items-center gap-2">
        <IoSettingsSharp className="text-primary" />
        Account Settings
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4 sm:space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-textMuted text-sm font-medium mb-1.5 sm:mb-2"
            >
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-textMuted">
                <FaUser className="h-4 w-4" />
              </span>
              <input
                id="username"
                name="userName"
                type="text"
                value={user.userName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg bg-background text-textMuted border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none text-sm sm:text-base"
                placeholder="Change username"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-textMuted text-sm font-medium mb-1.5 sm:mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-textMuted">
                <IoMail className="h-4 w-4" />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg bg-background text-textMuted border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none text-sm sm:text-base"
                placeholder="Change email address"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              className="text-primary hover:text-red-400 text-sm font-medium flex items-center gap-1"
              onClick={() => setShowPasswordFields(!showPasswordFields)}
            >
              <IoLockClosed className="h-3.5 w-3.5" />
              {showPasswordFields ? "Hide password fields" : "Change password"}
            </button>
          </div>

          {showPasswordFields && (
            <div className="space-y-4 pt-3 pb-2 border-t border-border">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-textMuted text-sm font-medium mb-1.5 sm:mb-2"
                >
                  Current Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-textMuted">
                    <IoLockClosed className="h-4 w-4" />
                  </span>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={user.currentPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg bg-background text-textMuted border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none text-sm sm:text-base"
                    placeholder="Enter current password"
                  />
                  <span
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 mr-3 flex items-center text-textMuted"
                  >
                    {showCurrentPassword ? (
                      <IoEyeOff className="h-4 w-4" />
                    ) : (
                      <IoEye className="h-4 w-4" />
                    )}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-textMuted text-sm font-medium mb-1.5 sm:mb-2"
                >
                  New Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-textMuted">
                    <IoLockClosed className="h-4 w-4" />
                  </span>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={user.newPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg bg-background text-textMuted border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none text-sm sm:text-base"
                    placeholder="Enter new password"
                  />
                  <span
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 mr-3 flex items-center text-textMuted"
                  >
                    {showNewPassword ? (
                      <IoEyeOff className="h-4 w-4" />
                    ) : (
                      <IoEye className="h-4 w-4" />
                    )}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-textMuted text-sm font-medium mb-1.5 sm:mb-2"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-textMuted">
                    <IoLockClosed className="h-4 w-4" />
                  </span>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showNewPasswordConfirm ? "text" : "password"}
                    value={user.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg bg-background text-textMuted border border-border focus:border-primary focus:ring-1 focus:ring-primary transition-colors outline-none text-sm sm:text-base"
                    placeholder="Confirm new password"
                  />
                  <span
                    onClick={() =>
                      setShowNewPasswordConfirm(!showNewPasswordConfirm)
                    }
                    className="absolute inset-y-0 right-0 mr-3 flex items-center text-textMuted"
                  >
                    {showNewPasswordConfirm ? (
                      <IoEyeOff className="h-4 w-4" />
                    ) : (
                      <IoEye className="h-4 w-4" />
                    )}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 sm:py-3 bg-primary hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 mr-2 text-white"
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
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
