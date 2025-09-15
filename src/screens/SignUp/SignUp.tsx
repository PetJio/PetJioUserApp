import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Animated,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import signupstyles from './signup.styles';
import profileStyles from '../Profile/profileStyles';
import { RootStackParamList } from '../../types/navigation';
import googleSignInService, { GoogleSignInResponse } from '../../services/googleSignInService';

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
      <ScrollView 
        style={signupstyles.scrollContainer}
        contentContainerStyle={signupstyles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={signupstyles.setLeftIconposition}>
          <Image source={images.signupImage} style={signupstyles.topImage} />
          <TouchableOpacity onPress={() => navigation.goBack()} style={signupstyles.arrowIconPosition}>
            <View>
              <Image source={Icons.LeftArrow} style={signupstyles.leftArrowIconSize}/>
            </View>
          </TouchableOpacity>
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
          <TextInput
            mode="outlined"
            label="Enter First Name"
            placeholder="First Name"
            value={firstName}
            onChangeText={(value) => {
              setFirstName(value);
              clearFieldError('firstName');
            }}
            theme={{ 
              roundness: 12,
              colors: { primary: '#58B9D0', outline: errors.firstName ? '#FF6B6B' : '#E2E2E2' }
            }}
            error={!!errors.firstName}
          />
          {errors.firstName && <Text style={signupstyles.errorText}>{errors.firstName}</Text>}
          
          <TextInput
            mode="outlined"
            label="Enter Last Name" 
            placeholder="Last Name"
            value={lastName}
            onChangeText={(value) => {
              setLastName(value);
              clearFieldError('lastName');
            }}
            theme={{ 
              roundness: 12,
              colors: { primary: '#58B9D0', outline: errors.lastName ? '#FF6B6B' : '#E2E2E2' }
            }}
            error={!!errors.lastName}
          />
          {errors.lastName && <Text style={signupstyles.errorText}>{errors.lastName}</Text>}

          <TextInput
            mode="outlined"
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              clearFieldError('email');
            }}
            theme={{ 
              roundness: 12,
              colors: { primary: '#58B9D0', outline: errors.email ? '#FF6B6B' : '#E2E2E2' }
            }}
            error={!!errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={signupstyles.errorText}>{errors.email}</Text>}

          <TextInput
            mode="outlined"
            label="Phone Number"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={(value) => {
              setPhoneNumber(value);
              clearFieldError('phoneNumber');
            }}
            theme={{ 
              roundness: 12,
              colors: { primary: '#58B9D0', outline: errors.phoneNumber ? '#FF6B6B' : '#E2E2E2' }
            }}
            error={!!errors.phoneNumber}
            keyboardType="phone-pad"
            maxLength={10}
          />
          {errors.phoneNumber && <Text style={signupstyles.errorText}>{errors.phoneNumber}</Text>}

          <TextInput
            mode="outlined"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={(value) => {
              setPassword(value);
              clearFieldError('password');
            }}
            secureTextEntry={!showPassword}
            theme={{ 
              roundness: 12,
              colors: { primary: '#58B9D0', outline: errors.password ? '#FF6B6B' : '#E2E2E2' }
            }}
            error={!!errors.password}
            right={
              <TextInput.Icon
                icon={showPassword ? Icons.eyeInvisible : Icons.eyeInvisible}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
          {errors.password && <Text style={signupstyles.errorText}>{errors.password}</Text>}

          <TextInput
            mode="outlined"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={(value) => {
              setConfirmPassword(value);
              clearFieldError('confirmPassword');
            }}
            secureTextEntry={!showConfirmPassword}
            theme={{ 
              roundness: 12,
              colors: { primary: '#58B9D0', outline: errors.confirmPassword ? '#FF6B6B' : '#E2E2E2' }
            }}
            error={!!errors.confirmPassword}
            right={
              <TextInput.Icon
                icon={showConfirmPassword ? Icons.eyeInvisible : Icons.eyeInvisible}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
          />
          {errors.confirmPassword && <Text style={signupstyles.errorText}>{errors.confirmPassword}</Text>}
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

          <View style={signupstyles.orContainer}>
           <View style={signupstyles.line} />
           <Text style={signupstyles.orText}>Or register with</Text>
           <View style={signupstyles.line} />
          </View>

          <View style={signupstyles.socialButtons}>
            <TouchableOpacity 
              style={[signupstyles.socialButton, isLoading && {opacity: 0.7}]}
              onPress={handleGoogleSignUp}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#666" />
              ) : (
                <Image source={Icons.googleIcon} style={signupstyles.socialIcon} />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={signupstyles.socialButton}>
              <Image source={Icons.facebookIcon} style={signupstyles.socialIcon} />
            </TouchableOpacity>
          </View>

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