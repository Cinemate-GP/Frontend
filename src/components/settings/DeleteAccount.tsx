"use client";
import React from "react";

const DeleteAccount = () => {
  const deleteAccount = async () => {
    try {
      const res = await fetch("/api/Profile/DeleteAccount", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${document.cookie.split("=")[1]}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete account");
      localStorage.removeItem("user");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/signup";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mb-6 bg-gray-800 p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-3">Delete Account</h2>
      <p className="text-gray-400 mb-3">
        Warning: This action is permanent and cannot be undone.
      </p>
      <button
        onClick={deleteAccount}
        className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
      >
        Delete Account
      </button>
    </div>
  );
};

export default DeleteAccount;
