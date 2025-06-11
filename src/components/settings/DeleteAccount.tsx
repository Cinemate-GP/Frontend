"use client";
import React, { useState } from "react";
import { IoWarning } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { authFetch } from "@/lib/api";
import { getCookie } from "@/lib/utils";

const DeleteAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);

  const deleteAccount = async () => {
    try {
      setLoading(true);
      const res = await authFetch("/api/Profile/DeleteAccount", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete account");
      localStorage.removeItem("user");
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/signup";
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-background p-4 sm:p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-textMuted flex items-center gap-2">
          <FaTrash className="text-primary" />
          Delete Account
        </h2>
        
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-3 sm:p-4 mb-5 sm:mb-6">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-red-800/40 rounded-full mt-1">
              <IoWarning className="text-red-400" size={16} />
            </div>
            <div>
              <h3 className="text-red-400 text-xs sm:text-sm font-medium mb-1">Warning: Permanent Action</h3>
              <p className="text-textMuted text-xs sm:text-sm">
                Deleting your account will remove all your data, including:
              </p>
              <ul className="list-disc list-inside text-textMuted text-xs sm:text-sm mt-2 space-y-1">
                <li>Your profile information</li>
                <li>Watch history and preferences</li>
                <li>Reviews and ratings</li>
                <li>Saved movies and watchlists</li>
              </ul>
              <p className="text-red-400 text-xs sm:text-sm mt-3">This action cannot be undone.</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full py-2.5 sm:py-3 bg-primary text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <FaTrash size={16} />
          Delete My Account
        </button>
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-red-900/50 p-4 sm:p-6 rounded-xl max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Confirm Account Deletion</h3>
            
            <p className="text-gray-300 text-xs sm:text-sm mb-4">
              This action is permanent. To confirm deletion, please type <span className="font-bold text-primary">DELETE</span> below.
            </p>
            
            <div className="mb-4">
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors text-sm sm:text-base"
                placeholder="Type DELETE to confirm"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm sm:text-base"
              >
                Cancel
              </button>
              
              <button
                onClick={deleteAccount}
                disabled={confirmText !== "DELETE" || loading}
                className={`flex-1 py-2.5 flex items-center justify-center gap-2 rounded-lg transition-colors text-sm sm:text-base ${
                  confirmText === "DELETE" && !loading
                    ? "bg-primary text-white"
                    : "bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <>
                    <svg 
                      className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" 
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
                    Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash size={16} />
                    Confirm Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteAccount;
