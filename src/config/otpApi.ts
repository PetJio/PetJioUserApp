// import axios from 'axios';

// const BASE_URL = 'https://13.204.155.197';

// export const sendOtp = async (email: string) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/send-otp`, { email });
//     return response.data;
//   } catch (err) {
//     return { success: false, message: 'Network error' };
//   }
// };

// export const verifyOtp = async (email: string, otp: string) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/verify-otp`, { email, otp });
//     return response.data;
//   } catch (err) {
//     return { success: false, message: 'Network error' };
//   }
// };

// export const resetPassword = async (email: string, password: string, verificationId: string) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/reset-password`, { email, password, verificationId });
//     return response.data;
//   } catch (err) {
//     return { success: false, message: 'Network error' };
//   }
// };
// import axios from 'axios';

// // const BASE_URL = 'http://13.204.155.197';
// const BASE_URL = 'https://stage.petgeo.in/api/user/get-otp';

// // ✅ Generate OTP
// export const sendOtp = async (email: string) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/api/user/get-otp`, { email });
//     return {
//       success: response.data.statusCode === 200,
//       message: response.data.message,
//       data: response.data.body,
//     };
//   } catch (err: any) {
//     return { success: false, message: err.message || 'Network error' };
//   }
// };

// // ✅ Verify OTP
// export const verifyOtp = async (email: string, otp: string) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/verify`, { email, otp });
//     return {
//       success: response.data.statusCode === 200,
//       message: response.data.message,
//       data: response.data.body, // will contain verificationId
//     };
//   } catch (err: any) {
//     return { success: false, message: err.message || 'Network error' };
//   }
// };

// // ✅ Update Password
// export const resetPassword = async (
//   email: string,
//   verificationId: string,
//   newPassword: string,
// ) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/update-password`, {
//       email,
//       verificationId,
//       newPassword,
//     });
//     return {
//       success: response.data.statusCode === 200,
//       message: response.data.message,
//       data: response.data.data,
//     };
//   } catch (err: any) {
//     return { success: false, message: err.message || 'Network error' };
//   }
// };
import axios from "axios";

const BASE_URL = "https://stage.petgeo.in";

//  Send OTP
export const sendOtp = async (email: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/user/get-otp`, { email });
    return {
      success: res.data.statusCode === 200,
      message: res.data.message,
      data: res.data.body,
    };
  } catch (err: any) {
    console.log("Error sending OTP:", err.message);
    return { success: false, message: err.message || "Network error" };
  }
};

//  Verify OTP
export const verifyOtp = async (email: string, otp: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/user/verify`, { email, otp });
    return {
      success: res.data.statusCode === 200,
      message: res.data.message,
      data: res.data.body,
    };
  } catch (err: any) {
    console.log("Error verifying OTP:", err.message);
    return { success: false, message: err.message || "Network error" };
  }
};

// Reset Password
export const resetPassword = async (
  email: string,
  verificationId: string,
  newPassword: string
) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/user/update-password`, {
      email,
      verificationId,
      newPassword,
    });
    return {
      success: res.data.statusCode === 200,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (err: any) {
    console.log("Error resetting password:", err.message);
    return { success: false, message: err.message || "Network error" };
  }
};
