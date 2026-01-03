"use client";

import { AppDispatch, RootState } from '@/src/redux/store';
import { clearUserMessage } from '@/src/redux/user/userSlice';
import { updateUserPassword } from '@/src/redux/user/userThunk';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ChangePasswordPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, successMessage } = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState({
    oldpassword: "",
    newpassword: "",
    newpassword_confirmation: ""
  });

  useEffect(() => {
    return () => {
      dispatch(clearUserMessage());
    };
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUserPassword(formData));
    setFormData({
      oldpassword: "",
      newpassword: "",
      newpassword_confirmation: ""
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
      </div>

      {successMessage && (
        <div className="p-3 bg-green-50 text-green-700 text-sm rounded-md border border-green-200">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl text-gray-900">
        <div>
          <label htmlFor="oldpassword" className="block text-sm font-medium text-gray-700 mb-2">
            Old Password*
          </label>
          <input
            type="password"
            id="oldpassword"
            name="oldpassword"
            value={formData.oldpassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="newpassword" className="block text-sm font-medium text-gray-700 mb-2">
            New Password*
          </label>
          <input
            type="password"
            id="newpassword"
            name="newpassword"
            value={formData.newpassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="newpassword_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password*
          </label>
          <input
            type="password"
            id="newpassword_confirmation"
            name="newpassword_confirmation"
            value={formData.newpassword_confirmation}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-700 text-white font-medium px-8 py-3 rounded-full hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Change"}
          </button>
        </div>
      </form>
    </div>
  );
}