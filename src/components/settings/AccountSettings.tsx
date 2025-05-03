"use client";
import React, { useState } from "react";
import { IoLockClosed, IoMail, IoSettingsSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Get token from cookies and clean it
      const cookies = document.cookie;
      const tokenCookie = cookies.split(';').find(c => c.trim().startsWith('token='));
      let token = '';
      
      if (tokenCookie) {
        // Extract just the token value, without any trailing data
        token = tokenCookie.split('=')[1].split(';')[0].trim();
      }
      
      const response = await fetch('/api/Auth/update-account', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username: formData.username || undefined,
          email: formData.email || undefined,
          currentPassword: formData.currentPassword || undefined,
          newPassword: formData.newPassword || undefined
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update account');
      }
      
      // Show success notification
      alert('Account settings updated successfully');
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }));
      
      setShowPasswordFields(false);
    } catch (error) {
      console.error('Error updating account:', error);
      alert(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 p-4 sm:p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 sm:mb-6 text-white flex items-center gap-2">
        <IoSettingsSharp className="text-red-500" />
        Account Settings
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 sm:space-y-5">
          <div>
            <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-1.5 sm:mb-2">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <FaUser className="h-4 w-4" />
              </span>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors outline-none text-sm sm:text-base"
                placeholder="Change username"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-1.5 sm:mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                <IoMail className="h-4 w-4" />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors outline-none text-sm sm:text-base"
                placeholder="Change email address"
              />
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="button" 
              className="text-red-500 hover:text-red-400 text-sm font-medium flex items-center gap-1"
              onClick={() => setShowPasswordFields(!showPasswordFields)}
            >
              <IoLockClosed className="h-3.5 w-3.5" />
              {showPasswordFields ? "Hide password fields" : "Change password"}
            </button>
          </div>

          {showPasswordFields && (
            <div className="space-y-4 pt-3 pb-2 border-t border-zinc-700">
              <div>
                <label htmlFor="currentPassword" className="block text-gray-300 text-sm font-medium mb-1.5 sm:mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <IoLockClosed className="h-4 w-4" />
                  </span>
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors outline-none text-sm sm:text-base"
                    placeholder="Enter current password"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-gray-300 text-sm font-medium mb-1.5 sm:mb-2">
                  New Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <IoLockClosed className="h-4 w-4" />
                  </span>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors outline-none text-sm sm:text-base"
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-1.5 sm:mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <IoLockClosed className="h-4 w-4" />
                  </span>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors outline-none text-sm sm:text-base"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base"
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
