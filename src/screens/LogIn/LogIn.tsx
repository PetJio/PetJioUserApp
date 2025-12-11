
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../../assets/images';
import loginstyles from './login.styles';
import { loginUser, LoginRequest } from '../../services/authService';
import { RootStackParamList } from '../../types/navigation';
import { storageService } from '../../utils/storage';
import { STORAGE_KEYS } from '../../constants';
import CustomTextInput from '../../components/CustomTextInput';

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
    const [devModeTaps, setDevModeTaps] = useState<number>(0);
    const [showDevMode, setShowDevMode] = useState<boolean>(false);

    // Development test credentials
    const DEV_CREDENTIALS = {
      email: 'test@petjio.com',
      password: 'Test@123'
    };

    const validateForm = (): boolean => {
      const newErrors: ValidationErrors = {};

      if (!emailPhone.trim()) {
        newErrors.emailPhone = 'Email is required';
      } else if (emailPhone.trim().length < 3) {
        newErrors.emailPhone = 'Please enter a valid email';
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
        // FRONTEND BYPASS: Check if using test credentials
        if (emailPhone === DEV_CREDENTIALS.email && password === DEV_CREDENTIALS.password) {
          console.log('🔧 DEV MODE: Bypassing API, using mock test user data');

          // Mock test user data
          const mockUser = {
            id: 'test-user-001',
            email: 'test@petjio.com',
            firstName: 'Test',
            lastName: 'User',
            mobile: '1234567890',
            address: 'Test Address, Test City',
            city: 'Test City',
            state: 'Test State',
            pinCode: '123456',
            lat: 0,
            lng: 0,
            roles: ['user']
          };

          const mockToken = 'mock-jwt-token-for-testing-' + Date.now();

          // Store mock data
          await storageService.setUserData(mockUser);
          await storageService.setUserToken(mockToken);
          await storageService.setItem(STORAGE_KEYS.IS_LOGGED_IN, true);

          console.log('✅ Mock test user data stored successfully');
          setMessage({type: 'success', text: '🔧 Test Account - Login Bypassed'});

          setTimeout(() => {
            navigation.navigate('Main');
          }, 1000);

          setIsLoginLoading(false);
          return;
        }

        // Normal API login flow
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

          // Register FCM token after successful login with a small delay
          // to ensure auth token is fully persisted to storage
          console.log('🔔 Scheduling FCM token registration after login...');

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

  

    // Dev mode: Triple tap on logo to activate
    const handleLogoPress = () => {
      const newTapCount = devModeTaps + 1;
      setDevModeTaps(newTapCount);

      if (newTapCount === 3) {
        setShowDevMode(true);
        setMessage({type: 'success', text: '🔧 Dev Mode Activated'});
        setTimeout(() => setMessage(null), 2000);
      }

      // Reset tap count after 2 seconds
      setTimeout(() => setDevModeTaps(0), 2000);
    };

    // Auto-fill test credentials
    const useTestCredentials = () => {
      setEmailPhone(DEV_CREDENTIALS.email);
      setPassword(DEV_CREDENTIALS.password);
      setMessage({type: 'success', text: '✅ Test credentials loaded'});
      setTimeout(() => setMessage(null), 2000);
    };

  return (
    <View style={loginstyles.mainContainer}>
      {/* Sticky Back Button */}
      <TouchableOpacity onPress={()=>navigation.navigate("SignIn")} style={loginstyles.stickyBackButton}>
        <View style={loginstyles.backIconContainer}>
             <MaterialIcons name="arrow-back" size={24} color="#58B9D0" />
        </View>
      </TouchableOpacity>

      <ScrollView style={loginstyles.container} showsVerticalScrollIndicator={false}>
       <TouchableOpacity
         style={loginstyles.setLeftIconposition}
         onPress={handleLogoPress}
         activeOpacity={0.9}>
            <Image source={images.signupImage} style={loginstyles.topImage} />
       </TouchableOpacity>

      <View style={loginstyles.formContainer}>
        <View style={{alignItems:'center'}}>
            <Text style={loginstyles.heading}>Log In</Text>
        </View>
        
        {message && (
          <View style={[
            loginstyles.messageContainer,
            message.type === 'success' ? loginstyles.successMessage : loginstyles.errorMessage
          ]}>
            <Text style={loginstyles.messageText}>{message.text}</Text>
          </View>
        )}

        <View style={loginstyles.inputContainer}>
        <CustomTextInput
          label="Email"
          icon="email"
          placeholder="Enter your email"
          value={emailPhone}
          onChangeText={(value: string) => {
            setEmailPhone(value);
            clearFieldError('emailPhone');
          }}
          error={errors.emailPhone}
          keyboardType="email-address"
          autoCapitalize="none"
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
        </View>
  

        {/* <TouchableOpacity>
          <Text style={loginstyles.forgotText}>Forget Password?</Text>
        </TouchableOpacity> */}

        {/* Dev Mode: Quick Test Login Button */}
        {showDevMode && (
          <TouchableOpacity
            onPress={useTestCredentials}
            style={[loginstyles.loginButton, {backgroundColor: '#FF9800', marginBottom: 10}]}>
            <Text style={loginstyles.loginText}>🔧 Use Test Credentials</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
         onPress={handleLogin}
         style={[loginstyles.loginButton, isLoginLoading && {opacity: 0.7}]}
         disabled={isLoginLoading}>
          {isLoginLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={loginstyles.loginText}>Login</Text>
          )}
        </TouchableOpacity>

        <Text style={loginstyles.registerText}>
          Don't have an account?{' '}
         <TouchableOpacity onPress={()=>navigation.navigate("SignUp")}>
          <Text style={loginstyles.registerLink}>Register</Text>
         </TouchableOpacity>
        </Text>
      </View>
    </ScrollView>
    </View>
  );
};

export default LogIn;
