
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import images from '../../../assets/images'; 
import Icons from '../../../assets/icons';
import loginstyles from './login.styles';
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
     <View style={loginstyles.setLeftIconposition}>
          <Image source={images.signupImage} style={loginstyles.topImage} />
         <TouchableOpacity onPress={()=>navigation.navigate("SignIn")} style={loginstyles.arrowIconPosition}>
          <View>
               <Image source={Icons.LeftArrow} style={loginstyles.leftArrowIconSize}/>
          </View>
         </TouchableOpacity>
     </View>

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
        <TextInput
          mode="outlined"
          label="Email"
          placeholder="Enter your email"
          value={emailPhone}
          onChangeText={(value) => {
            setEmailPhone(value);
            clearFieldError('emailPhone');
          }}
          theme={{ 
            roundness: 12,
            colors: { primary: '#58B9D0', outline: errors.emailPhone ? '#FF6B6B' : '#E2E2E2' }
          }}
          error={!!errors.emailPhone}
        />
        {errors.emailPhone && <Text style={loginstyles.errorText}>{errors.emailPhone}</Text>}
        
        <View style={{ position: 'relative' }}>
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
        {errors.password && <Text style={loginstyles.errorText}>{errors.password}</Text>}
      </View>

        </View>
  

        <TouchableOpacity>
          <Text style={loginstyles.forgotText}>Forget Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
         onPress={handleLogin}
         style={[loginstyles.loginButton, isLoginLoading && {opacity: 0.7}]}
         disabled={isLoginLoading || isGoogleLoading}>
          {isLoginLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={loginstyles.loginText}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={loginstyles.orContainer}>
         <View style={loginstyles.line} />
         <Text style={loginstyles.orText}>Or login with</Text>
         <View style={loginstyles.line} />
        </View>

        <View style={loginstyles.socialButtons}>
          <TouchableOpacity 
            style={[loginstyles.socialButton, isGoogleLoading && {opacity: 0.7}]}
            onPress={handleGoogleSignIn}
            disabled={isLoginLoading || isGoogleLoading}>
            {isGoogleLoading ? (
              <ActivityIndicator size="small" color="#666" />
            ) : (
              <Image source={Icons.googleIcon} style={loginstyles.socialIcon} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={loginstyles.socialButton}>
            <Image source={Icons.facebookIcon} style={loginstyles.socialIcon} />
          </TouchableOpacity>
        </View>

        <Text style={loginstyles.registerText}>
          Don't have an account?{' '}
         <TouchableOpacity onPress={()=>navigation.navigate("SignUp")}>
          <Text style={loginstyles.registerLink}>Register</Text>
         </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
};

export default LogIn;
