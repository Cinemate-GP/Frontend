import React from "react";

const AccountSettings = () => {
  return (
    <form>
      <div className="mb-6 bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Account Settings</h2>
        <input
          type="text"
          placeholder="Change Username"
          className="w-full p-2 mb-2 bg-gray-700 rounded"
        />
        <input
          type="email"
          placeholder="Change Email"
          className="w-full p-2 mb-2 bg-gray-700 rounded"
        />
        <input
          type="password"
          placeholder="Change Password"
          className="w-full p-2 mb-2 bg-gray-700 rounded"
        />
        <button type="submit" className="bg-primary hover:bg-red-700 px-4 py-2 rounded">Save Changes</button>
      </div>
    </form>
  );
};

export default AccountSettings;
