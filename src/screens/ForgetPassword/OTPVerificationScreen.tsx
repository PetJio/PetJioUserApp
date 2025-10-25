import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { verifyOtp, sendOtp } from '../../config/otpApi';
import { AuthStackParamList } from '../../navigation/StackNavigator/types';

type OTPScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'OTPVerificationScreen'
>;
type OTPScreenRouteProp = RouteProp<AuthStackParamList, 'OTPVerificationScreen'>;

const OTPVerificationScreen = () => {
  const navigation = useNavigation<OTPScreenNavigationProp>();
  const route = useRoute<OTPScreenRouteProp>();
  const { email } = route.params;

  // ================= HOOKS =================
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef<Array<TextInput | null>>([]);

  const [timer, setTimer] = useState(60);
  const [isResendVisible, setIsResendVisible] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  // ================= TIMER =================
  useEffect(() => {
    if (timer === 0) {
      setIsResendVisible(true);
      return;
    }
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // ================= OTP INPUT =================
   const handleChange = (text: string, index: number) => {
  
  const cleanText = text.replace(/[^0-9]/g, '');

  const newOtp = [...otp];

  if (cleanText.length > 1) {
    
    const chars = cleanText.split('');
    chars.forEach((char, i) => {
      if (index + i < 6) newOtp[index + i] = char;
    });
    setOtp(newOtp);
    const nextIndex = Math.min(index + cleanText.length, 5);
    inputs.current[nextIndex]?.focus();
    return;
  }

  newOtp[index] = cleanText;
  setOtp(newOtp);

  if (cleanText) {
    if (index < 5) inputs.current[index + 1]?.focus();
  } else {
   
    if (index > 0) inputs.current[index - 1]?.focus();
  }
};



  // ================= VERIFY OTP =================
  const handleVerify = async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      Alert.alert('Error', 'Please enter all 6 digits');
      return;
    }

    try {
      const res = await verifyOtp(email, fullOtp);
      if (res.success) {
        const verificationId = res.data?.verificationId;
        navigation.navigate('NewPasswordScreen', { email, verificationId });
        setTimeout(() => {
          Alert.alert('Success', 'OTP verified successfully!');
        }, 300);
      } else {
        Alert.alert('Error', res.message || 'Invalid OTP');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to verify OTP');
    }
  };

  // ================= RESEND OTP =================
  const handleResendOtp = async () => {
    if (isSendingOtp) return;
    setIsSendingOtp(true);

    try {
      const res = await sendOtp(email);
      if (res.success) {
        Alert.alert('Success', 'OTP resent successfully!');
        setTimer(60);
        setIsResendVisible(false);
        setOtp(['', '', '', '', '', '']);
        inputs.current[0]?.focus();
      } else {
        Alert.alert('Error', res.message || 'Failed to resend OTP');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Something went wrong');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // ================= RENDER =================
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>Enter the 6-digit code sent to {email}</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            style={styles.otpBox}
            value={digit}
            keyboardType="numeric"
            maxLength={1}
            onChangeText={(text) => handleChange(text, index)}
            // onKeyPress={(e) => handleKeyPress(e, index)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>

      <View style={styles.timerContainer}>
        {!isResendVisible ? (
          <Text style={styles.timerText}>Resend OTP in {timer}s</Text>
        ) : (
          <TouchableOpacity onPress={handleResendOtp} disabled={isSendingOtp}>
            <Text style={[styles.resendText, isSendingOtp && { opacity: 0.5 }]}>
              Resend OTP
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { textAlign: 'center', color: '#555', marginBottom: 30 },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 },
  otpBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 45,
    height: 55,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
  },
  button: { backgroundColor: '#58B9D0', padding: 15, borderRadius: 8, marginTop: 30 },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  timerContainer: { marginTop: 25, alignItems: 'center' },
  timerText: { color: '#777', fontSize: 16 },
  resendText: { color: '#58B9D0', fontSize: 16, fontWeight: '600' },
});
