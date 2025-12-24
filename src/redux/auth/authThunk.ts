import api from "@/src/lib/axios";
import { RegisterResponse } from "@/src/types/auth.types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    data: {
      name: string;
      email: string;
      contact_no: string;
      password: string;
      password_confirmation: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post<RegisterResponse>("/register", data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    data: {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/login", data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const resendVerificationEmail = createAsyncThunk(
  "auth/resendVerificationEmail",
  async (token: string, { rejectWithValue }) => {
    try {
      const res = await api.post("/email/resend", { token });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to resend verification email");
    }
  }
);
