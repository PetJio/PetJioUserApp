
import React, {useState} from 'react';
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
import { TextInput } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../../assets/images'; 
import Icons from '../../../assets/icons';
import loginstyles from './login.styles';
import profileStyles from '../Profile/profileStyles';
import { loginUser, LoginRequest } from '../../services/authService';
import googleSignInService, { GoogleSignInResponse } from '../../services/googleSignInService';
import { RootStackParamList } from '../../types/navigation';
import { storageService } from '../../utils/storage';
import { STORAGE_KEYS } from '../../constants';

type LogInScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LogIn'
>;

interface LogInProps {
  navigation: LogInScreenNavigationProp;
}

interface ValidationErrors {
  emailPhone?: string;
  password?: string;
}

const LogIn: React.FC<LogInProps> = ({ navigation }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [emailPhone, setEmailPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
    const scrollY = new Animated.Value(0);

    const validateForm = (): boolean => {
      const newErrors: ValidationErrors = {};

      if (!emailPhone.trim()) {
        newErrors.emailPhone = 'Email or phone number is required';
      } else if (emailPhone.trim().length < 3) {
        newErrors.emailPhone = 'Please enter a valid email or phone number';
      }

      if (!password.trim()) {
        newErrors.password = 'Password is required';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
      if (!validateForm()) {
        setMessage({type: 'error', text: 'Please fix the errors below'});
        return;
      }

      setIsLoginLoading(true);
      
      try {
        const loginData: LoginRequest = {
          emailPhone,
          password
        };

        const response = await loginUser(loginData);
        
        if (response.success && response.user && response.token) {
          // Store user data and token directly
          console.log('🔄 Storing login data:', {
            hasUser: !!response.user,
            hasToken: !!response.token,
            userName: response.user.firstName
          });
          
          await storageService.setUserData(response.user);
          await storageService.setUserToken(response.token);
          await storageService.setItem(STORAGE_KEYS.IS_LOGGED_IN, true);
          
          console.log('✅ Login data stored successfully');
          setMessage({type: 'success', text: response.message});
          
          setTimeout(() => {
            navigation.navigate('Main');
          }, 1500);
        } else {
          console.log('❌ Login failed or missing data:', {
            success: response.success,
            hasUser: !!response.user,
            hasToken: !!response.token
          });
          setMessage({type: 'error', text: response.message || 'Login failed'});
        }
      } catch (error) {
        setMessage({type: 'error', text: 'Login failed. Please try again.'});
      } finally {
        setIsLoginLoading(false);
      }
    };

    const clearFieldError = (field: keyof ValidationErrors) => {
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    };

    const handleGoogleSignIn = async () => {
      setIsGoogleLoading(true);
      setMessage(null);
      
      try {
        console.log('🚀 Starting Google Sign-In...');
        const response: GoogleSignInResponse = await googleSignInService.signIn();
        
        if (response.success && response.user && response.token) {
          console.log('✅ Google Sign-In successful:', response.user.name);
          
          setMessage({
            type: 'success', 
            text: `Welcome ${response.user.name}! Signed in successfully.`
          });
          
          // Navigate to main screen after successful Google sign-in
          setTimeout(() => {
            navigation.navigate('Main');
          }, 1500);
        } else {
          console.log('❌ Google Sign-In failed:', response.error);
          setMessage({
            type: 'error', 
            text: response.error || 'Google Sign-In failed'
          });
        }
      } catch (error) {
        console.error('🔥 Google Sign-In error:', error);
        setMessage({
          type: 'error', 
          text: 'Failed to sign in with Google. Please try again.'
        });
      } finally {
        setIsGoogleLoading(false);
      }
    };

  return (
    <View style={loginstyles.container}>
      {/* Sticky Header */}
      <View style={loginstyles.stickyHeader}>
        <TouchableOpacity 
          style={loginstyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#58B9D0" />
        </TouchableOpacity>
        <View style={loginstyles.headerTitleContainer}>
          <Text style={loginstyles.headerTitle}>Sign In</Text>
          <Text style={loginstyles.headerSubtitle}>Welcome back to your account</Text>
        </View>
        <View style={loginstyles.headerPlaceholder} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
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
              <Text style={loginstyles.welcomeText}>Welcome back!</Text>
              <Text style={loginstyles.subtitle}>Sign in to continue to your account</Text>
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
                  label="Email or Phone Number"
                  placeholder="Enter your email or phone number"
                  value={emailPhone}
                  onChangeText={(value) => {
                    setEmailPhone(value);
                    clearFieldError('emailPhone');
                  }}
                  theme={{ 
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.emailPhone ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  style={loginstyles.textInput}
                  contentStyle={loginstyles.inputContent}
                  outlineStyle={[
                    loginstyles.inputOutline,
                    errors.emailPhone && loginstyles.inputError
                  ]}
                  keyboardType="default"
                  autoCapitalize="none"
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons 
                          name="email" 
                          size={20} 
                          color={errors.emailPhone ? '#FF6B6B' : '#666'} 
                        />
                      )}
                    />
                  }
                />
                {errors.emailPhone && <Text style={loginstyles.errorText}>{errors.emailPhone}</Text>}
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
            </View>

            <TouchableOpacity style={loginstyles.forgotPasswordContainer}>
              <Text style={loginstyles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={handleLogin}
              style={[
                profileStyles.commonButton,
                profileStyles.commonButtonPrimary,
                isLoginLoading && profileStyles.loadingButton
              ]}
              activeOpacity={0.8}
              disabled={isLoginLoading || isGoogleLoading}
            >
              {isLoginLoading ? (
                <ActivityIndicator size="small" color="#58B9D0" />
              ) : (
                <>
                  <MaterialIcons name="login" size={20} color="#58B9D0" style={{marginRight: 8}} />
                  <Text style={[profileStyles.commonButtonText, profileStyles.commonButtonTextPrimary]}>Sign In</Text>
                </>
              )}
            </TouchableOpacity>

            <View style={loginstyles.dividerContainer}>
              <View style={loginstyles.dividerLine} />
              <Text style={loginstyles.dividerText}>Or Sign In with</Text>
              <View style={loginstyles.dividerLine} />
            </View>

            <View style={[loginstyles.socialButtonsContainer, {justifyContent: 'center'}]}>
              <TouchableOpacity 
                style={[
                  profileStyles.commonButton,
                  profileStyles.commonButtonGray,
                  isGoogleLoading && profileStyles.loadingButton
                ]} 
                activeOpacity={0.7}
                onPress={handleGoogleSignIn}
                disabled={isLoginLoading || isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <ActivityIndicator size="small" color="#6B7280" />
                ) : (
                  <>
                    <Image source={Icons.googleIcon} style={profileStyles.commonButtonIconSmall} />
                    <Text style={[profileStyles.commonButtonText, profileStyles.commonButtonTextGray]}>
                      {isGoogleLoading ? 'Signing in...' : 'Google'}
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

           <View style={loginstyles.signupPrompt}>
              <Text style={loginstyles.signupText}>
                Don't have an account?{' '}
                <Text 
                  style={loginstyles.signupLink}
                  onPress={() => navigation.navigate("SignUp")}
                >
                  Sign Up
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LogIn;
