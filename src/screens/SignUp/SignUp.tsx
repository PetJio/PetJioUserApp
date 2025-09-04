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
import loginstyles from './signup.styles';
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
      style={loginstyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
      
      {/* Sticky Header with Back Button */}
      <View style={loginstyles.stickyHeader}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={loginstyles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#58B9D0" />
        </TouchableOpacity>
        <View style={loginstyles.headerTitleContainer}>
          <Text style={loginstyles.headerTitle}>Sign Up</Text>
          <Text style={loginstyles.headerSubtitle}>Create your account</Text>
        </View>
        <View style={loginstyles.headerPlaceholder} />
      </View>

      <Animated.ScrollView
        contentContainerStyle={loginstyles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={loginstyles.contentContainer}>
          <View style={loginstyles.welcomeSection}>
            <Text style={loginstyles.welcomeText}>Welcome!</Text>
            <Text style={loginstyles.subtitle}>Tell us a bit about yourself</Text>
          </View>

          {message && (
            <View style={[
              loginstyles.messageContainer,
              message.type === 'success' ? loginstyles.successMessage : loginstyles.errorMessage
            ]}>
              <Text style={loginstyles.messageText}>{message.text}</Text>
            </View>
          )}

          <View style={loginstyles.formSection}>
            <View style={loginstyles.inputGroup}>
              <View>
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
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.firstName ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  style={loginstyles.textInput}
                  contentStyle={loginstyles.inputContent}
                  outlineStyle={[
                    loginstyles.inputOutline,
                    errors.firstName && loginstyles.inputError
                  ]}
                  autoCapitalize="words"
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons
                          name="person"
                          size={20}
                          color={errors.firstName ? '#FF6B6B' : '#666'}
                        />
                      )}
                    />
                  }
                />
                {errors.firstName && <Text style={loginstyles.errorText}>{errors.firstName}</Text>}
              </View>

              <View>
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
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.lastName ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  style={loginstyles.textInput}
                  contentStyle={loginstyles.inputContent}
                  outlineStyle={[
                    loginstyles.inputOutline,
                    errors.lastName && loginstyles.inputError
                  ]}
                  autoCapitalize="words"
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons
                          name="person-outline"
                          size={20}
                          color={errors.lastName ? '#FF6B6B' : '#666'}
                        />
                      )}
                    />
                  }
                />
                {errors.lastName && <Text style={loginstyles.errorText}>{errors.lastName}</Text>}
              </View>

              <View>
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
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.email ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  style={loginstyles.textInput}
                  contentStyle={loginstyles.inputContent}
                  outlineStyle={[
                    loginstyles.inputOutline,
                    errors.email && loginstyles.inputError
                  ]}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons
                          name="email"
                          size={20}
                          color={errors.email ? '#FF6B6B' : '#666'}
                        />
                      )}
                    />
                  }
                />
                {errors.email && <Text style={loginstyles.errorText}>{errors.email}</Text>}
              </View>

              <View>
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
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.phoneNumber ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  style={loginstyles.textInput}
                  contentStyle={loginstyles.inputContent}
                  outlineStyle={[
                    loginstyles.inputOutline,
                    errors.phoneNumber && loginstyles.inputError
                  ]}
                  keyboardType="phone-pad"
                  maxLength={10}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons
                          name="phone"
                          size={20}
                          color={errors.phoneNumber ? '#FF6B6B' : '#666'}
                        />
                      )}
                    />
                  }
                />
                {errors.phoneNumber && <Text style={loginstyles.errorText}>{errors.phoneNumber}</Text>}
              </View>

              <View>
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
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.password ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  style={loginstyles.textInput}
                  contentStyle={loginstyles.inputContent}
                  outlineStyle={[
                    loginstyles.inputOutline,
                    errors.password && loginstyles.inputError
                  ]}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons
                          name="lock"
                          size={20}
                          color={errors.password ? '#FF6B6B' : '#666'}
                        />
                      )}
                    />
                  }
                  right={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons
                          name={showPassword ? 'visibility-off' : 'visibility'}
                          size={20}
                          color="#666"
                        />
                      )}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                />
                {errors.password && <Text style={loginstyles.errorText}>{errors.password}</Text>}
              </View>

              <View>
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
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.confirmPassword ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  style={loginstyles.textInput}
                  contentStyle={loginstyles.inputContent}
                  outlineStyle={[
                    loginstyles.inputOutline,
                    errors.confirmPassword && loginstyles.inputError
                  ]}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons
                          name="lock-outline"
                          size={20}
                          color={errors.confirmPassword ? '#FF6B6B' : '#666'}
                        />
                      )}
                    />
                  }
                  right={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons
                          name={showConfirmPassword ? 'visibility-off' : 'visibility'}
                          size={20}
                          color="#666"
                        />
                      )}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  }
                />
                {errors.confirmPassword && <Text style={loginstyles.errorText}>{errors.confirmPassword}</Text>}
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSignIn}
              style={[
                profileStyles.commonButton,
                profileStyles.commonButtonPrimary,
                isLoading && profileStyles.loadingButton
              ]}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              <MaterialIcons name="arrow-forward" size={22} color="#58B9D0" />
              <Text style={[profileStyles.commonButtonText, profileStyles.commonButtonTextPrimary]}>Next</Text>
            </TouchableOpacity>

            <View style={loginstyles.dividerContainer}>
              <View style={loginstyles.dividerLine} />
              <Text style={loginstyles.dividerText}>Or Register with</Text>
              <View style={loginstyles.dividerLine} />
            </View>

            <View style={[loginstyles.socialButtonsContainer, { justifyContent: 'center' }]}>
              <TouchableOpacity
                style={[
                  profileStyles.commonButton,
                  profileStyles.commonButtonGray,
                  isLoading && profileStyles.loadingButton
                ]}
                activeOpacity={0.7}
                onPress={handleGoogleSignUp}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#6B7280" />
                ) : (
                  <>
                    <Image source={Icons.googleIcon} style={profileStyles.commonButtonIconSmall} />
                    <Text style={[profileStyles.commonButtonText, profileStyles.commonButtonTextGray]}>
                      {isLoading ? 'Creating account...' : 'Google'}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            <View style={loginstyles.signupPrompt}>
              <Text style={loginstyles.signupText}>
                Have an account?{' '}
                <Text
                  style={loginstyles.signupLink}
                  onPress={() => navigation.navigate("LogIn")}
                >
                  Log in
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>

    </KeyboardAvoidingView>
  );
};

export default SignUp;