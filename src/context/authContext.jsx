import { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [searching, setSearching] = useState(false);

  const getUserData = async () => {
    setSearching(true);
    try {
      const { data } = await axiosInstance.get("/api/auth/user-data");
      if (data.success) {
        setUser(data.userData);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      // console.log("Error in getting user data", error.response.data);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setSearching(false);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  // Register user
  const registerUser = async (firstName, email, password) => {
    try {
      const { data } = await axiosInstance.post("/api/auth/register", {
        firstName,
        email,
        password,
      });
      if (data.success) {
        getUserData();
        toast.success(data.message);
        return data.success;
      } else {
        toast.error(data.message);
        return data.success;
      }
    } catch (error) {
      // console.log("Error in registering user", error.response.data);
      toast.error(error.response.data.message);
      return error.response.data.success;
    }
  };
  // Login user
  const loginUser = async (email, password) => {
    try {
      const response = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });
      if (response.data) {
        getUserData();
        setUser(response.data);
        setIsAuthenticated(true);
        return toast.success("Login successful");
      } else {
        toast.error(response.data.message);
        return response.data;
      }
    } catch (error) {
      // console.log("Error in login user", error);
      toast.error(error.response.data.message);
    }
  };

  // Logout user
  const logoutUser = async () => {
    try {
      const response = await axiosInstance.post("/api/auth/logout");
      if (response.data.success) {
        getUserData();
        setUser(null);
        setIsAuthenticated(false);
        toast.success("Logout successful");
        return response.data;
      } else {
        toast.error(response.data.message);
        return response.data;
      }
    } catch (error) {
      // console.log("Error in logout user", error);
      toast.error(error.response.data.message);
    }
  };

  // Send Verification OTP
  const sendVerificationOTP = async () => {
    try {
      const { data } = await axiosInstance.post(
        "/api/auth/send-verification-otp"
      );
      if (data.success) {
        getUserData();
        toast.success(data.message);
        return data;
      } else {
        toast.error(data.message);
        return data;
      }
    } catch (error) {
      // console.log("Error in sending verification OTP", error);
      toast.error(error.response.data.message);
      return error.response.data;
    }
  };

  // Verify Account
  const verifyAccount = async (otp) => {
    try {
      const { data } = await axiosInstance.post("/api/auth/verify-account", {
        otp,
      });
      if (data.success) {
        getUserData();
        toast.success(data.message);
        return data;
      } else {
        toast.error(data.message);
        return data;
      }
    } catch (error) {
      // console.log("Error in verifying account", error);
      toast.error(error.response.data.message);
      return error.response.data;
    }
  };

  // Send Forgot Password OTP
  const sendForgotPasswordOTP = async (email) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/auth/send-password-reset-otp",
        {
          email,
        }
      );
      if (data.success) {
        getUserData();
        toast.success(data.message);
        return data;
      } else {
        toast.error(data.message);
        return data;
      }
    } catch (error) {
      // console.log("Error in sending forgot password OTP", error);
      toast.error(error.response.data.message);
      return error.response.data;
    }
  };

  // Reset Password
  const resetPassword = async (email, password, otp) => {
    try {
      const { data } = await axiosInstance.post("/api/auth/reset-password", {
        email,
        password,
        otp,
      });
      if (data.success) {
        getUserData();
        toast.success(data.message);
        return data;
      } else {
        toast.error(data.message);
        return data;
      }
    } catch (error) {
      // console.log("Error in resetting password", error);
      toast.error(error.response.data.message);
      return error.response.data;
    }
  };

  const value = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    loginUser,
    logoutUser,
    sendVerificationOTP,
    verifyAccount,
    registerUser,
    searching,
    sendForgotPasswordOTP,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
