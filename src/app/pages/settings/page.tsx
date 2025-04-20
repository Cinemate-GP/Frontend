"use client";
import AccountSettings from "@/components/settings/AccountSettings";
import AppearanceSettings from "@/components/settings/Appearance";
import DeleteAccount from "@/components/settings/DeleteAccount";
import NotificationSettings from "@/components/settings/NotificationSettings";
import PrivacyAndSecurity from "@/components/settings/PrivacyAndSecurity";

export default function Settings() {
  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };
  return (
    <div className="p-6 text-white mt-[5rem]">
      <h1 className="text-3xl font-bold mb-4">Settings</h1>

      {/* Account Settings */}
      <AccountSettings />

      {/* Appearance */}
      <AppearanceSettings />

      {/* Privacy & Security */}
      <PrivacyAndSecurity />

      {/* Notifications */}
      <NotificationSettings />

      {/* Delete Account */}
      <DeleteAccount />
      {/* Logout */}
      <button
        onClick={() => logout()}
        className="bg-gray-700 px-4 py-2 rounded hover:bg-red-500 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
}
