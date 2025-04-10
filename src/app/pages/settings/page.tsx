import AccountSettings from "@/components/settings/AccountSettings";
import AppearanceSettings from "@/components/settings/Appearance";
import NotificationSettings from "@/components/settings/NotificationSettings";
import PrivacyAndSecurity from "@/components/settings/PrivacyAndSecurity";

export default function Settings() {
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
      <div className="mb-6 bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">
          Delete Account
        </h2>
        <p className="text-gray-400 mb-3">
          Warning: This action is permanent and cannot be undone.
        </p>
        <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Delete Account</button>
      </div>

      {/* Logout */}
      <button className="bg-gray-700 px-4 py-2 rounded hover:bg-red-500 transition duration-200">Logout</button>
    </div>
  );
}
