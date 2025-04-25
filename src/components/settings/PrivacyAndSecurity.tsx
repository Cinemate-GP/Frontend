import React from "react";

const PrivacyAndSecurity = () => {
  return (
    <div className="mb-6 bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-3">Privacy & Security</h2>
      <button className="bg-gray-700 px-4 py-2 mb-2 rounded mr-4 hover:bg-red-500 duration-200">
        Manage Watch History
      </button>
      <button className="bg-gray-700 px-4 py-2 rounded hover:bg-red-500 transition duration-200">
        Manage Liked Movies
      </button>
    </div>
  );
};

export default PrivacyAndSecurity;
