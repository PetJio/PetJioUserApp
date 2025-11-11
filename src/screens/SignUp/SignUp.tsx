import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../../assets/images';
import signupstyles from './signup.styles';
import { RootStackParamList } from '../../types/navigation';
import CustomTextInput from '../../components/CustomTextInput';

export interface UserSignUpData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

type SignUpScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp'
>;

interface SignUpProps {
  navigation: SignUpScreenNavigationProp;
}

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUp: React.FC<SignUpProps> = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const scrollY = new Animated.Value(0);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Name validation
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Phone validation
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    if (!validateForm()) {
      setMessage({ type: 'error', text: 'Please fix the errors below' });
      return;
    }

    setMessage({ type: 'success', text: 'Basic information saved! Now let\'s get your location.' });

    // Navigate to location page after a brief delay with user data
    setTimeout(() => {
      const userSignUpData: UserSignUpData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password
      };

      navigation.navigate("Location", { userSignUpData });
    }, 1500);
  };

  const clearFieldError = (field: keyof ValidationErrors) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      console.log('🚀 Starting Google Sign-Up...');
      const response: GoogleSignInResponse = await googleSignInService.signIn();

      if (response.success && response.user && response.token) {
        console.log('✅ Google Sign-Up successful:', response.user.name);
        
        setMessage({
          type: 'success',
          text: `Welcome ${response.user.name}! Account created successfully.`
        });

        // Navigate directly to main screen since user is authenticated
        setTimeout(() => {
          navigation.navigate('Main');
        }, 1500);
      } else {
        console.log('❌ Google Sign-Up failed:', response.error);
        setMessage({
          type: 'error',
          text: response.error || 'Google Sign-Up failed'
        });
      }
    } catch (error) {
      console.error('🔥 Google Sign-Up error:', error);
      setMessage({
        type: 'error',
        text: 'Failed to sign up with Google. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <KeyboardAvoidingView
      style={signupstyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Sticky Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={signupstyles.stickyBackButton}>
        <View style={signupstyles.backIconContainer}>
          <MaterialIcons name="arrow-back" size={24} color="#58B9D0" />
        </View>
      </TouchableOpacity>

      <ScrollView
        style={signupstyles.scrollContainer}
        contentContainerStyle={signupstyles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={signupstyles.setLeftIconposition}>
          <Image source={images.signupImage} style={signupstyles.topImage} />
        </View>

        <View style={signupstyles.formContainer}>
          <View style={{alignItems:'center'}}>
            <Text style={signupstyles.heading}>Create Account</Text>
            <Text style={signupstyles.subheading}>Join us and start your journey</Text>
          </View>
          
          {message && (
            <View style={[
              signupstyles.messageContainer,
              message.type === 'success' ? signupstyles.successMessage : signupstyles.errorMessage
            ]}>
              <Text style={signupstyles.messageText}>{message.text}</Text>
            </View>
          )}

          <View style={signupstyles.inputContainer}>
          <CustomTextInput
            label="First Name"
            icon="person"
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={(value: string) => {
              setFirstName(value);
              clearFieldError('firstName');
            }}
            error={errors.firstName}
          />

          <CustomTextInput
            label="Last Name"
            icon="person-outline"
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={(value: string) => {
              setLastName(value);
              clearFieldError('lastName');
            }}
            error={errors.lastName}
          />

          <CustomTextInput
            label="Email Address"
            icon="email"
            placeholder="Enter your email"
            value={email}
            onChangeText={(value: string) => {
              setEmail(value);
              clearFieldError('email');
            }}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomTextInput
            label="Phone Number"
            icon="phone"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={(value: string) => {
              setPhoneNumber(value);
              clearFieldError('phoneNumber');
            }}
            error={errors.phoneNumber}
            keyboardType="phone-pad"
            maxLength={10}
          />

          <CustomTextInput
            label="Password"
            icon="lock"
            placeholder="Enter your password"
            value={password}
            onChangeText={(value: string) => {
              setPassword(value);
              clearFieldError('password');
            }}
            error={errors.password}
            showPasswordToggle
            secureTextEntry={!showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          <CustomTextInput
            label="Confirm Password"
            icon="lock-outline"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={(value: string) => {
              setConfirmPassword(value);
              clearFieldError('confirmPassword');
            }}
            error={errors.confirmPassword}
            showPasswordToggle
            secureTextEntry={!showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          />
          </View>

          <TouchableOpacity
           onPress={handleSignIn}
           style={[signupstyles.loginButton, isLoading && {opacity: 0.7}]}
           disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={signupstyles.loginText}>Next</Text>
            )}
          </TouchableOpacity>

          <Text style={signupstyles.registerText}>
            Have an account?{' '}
           <TouchableOpacity onPress={()=>navigation.navigate("LogIn")}>
            <Text style={signupstyles.registerLink}>Log in</Text>
           </TouchableOpacity>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;