// src/navigation/StackNavigator/types.ts

// ✅ Ye file navigation stack ke liye type definitions rakhti hai
// Industrial practice: Har stack ke liye ek separate type list banti hai
export type AuthStackParamList = {
  ForgetPasswordScreen: undefined;
  OTPVerificationScreen: { email: string };
  NewPasswordScreen: { email: string; verificationId: string };
  LogIn: undefined;
};

