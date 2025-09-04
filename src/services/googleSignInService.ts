import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  User,
} from '@react-native-google-signin/google-signin';
import { fetchWithErrorHandling, StandardApiResponse } from '../utils/apiErrorHandler';
import { storageService } from '../utils/storage';
import { STORAGE_KEYS } from '../constants';

export interface GoogleUserInfo {
  id: string;
  name: string;
  email: string;
  photo?: string;
  familyName?: string;
  givenName?: string;
}

export interface GoogleSignInResponse {
  success: boolean;
  user?: GoogleUserInfo;
  token?: string;
  message?: string;
  error?: string;
}

export interface GoogleAuthRequest {
  googleId: string;
  email: string;
  name: string;
  givenName: string;
  familyName: string;
  photo?: string;
}

class GoogleSignInService {
  private configured = false;

  constructor() {
    this.configureGoogleSignIn();
  }

  private configureGoogleSignIn() {
    if (this.configured) return;

    GoogleSignin.configure({
      webClientId: '983696737650-7ciq1l2fqd8c901m11rnjicrhqgh9kb7.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      forceCodeForRefreshToken: true,
      accountName: '',
      // iosClientId: 'your-ios-client-id.apps.googleusercontent.com', // Only needed for iOS
      googleServicePlistPath: '',
    });
    
    this.configured = true;
  }

  async signIn(): Promise<GoogleSignInResponse> {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log('🔍 Google Sign-In userInfo:', userInfo);

      if (userInfo.user) {
        const googleUserInfo: GoogleUserInfo = {
          id: userInfo.user.id,
          name: userInfo.user.name || '',
          email: userInfo.user.email,
          photo: userInfo.user.photo || undefined,
          familyName: userInfo.user.familyName || undefined,
          givenName: userInfo.user.givenName || undefined,
        };

        // Send Google user info to your backend for authentication
        const authResponse = await this.authenticateWithBackend(googleUserInfo);
        
        if (authResponse.success) {
          // Store user data and token in AsyncStorage
          await storageService.setUserData(authResponse.user);
          await storageService.setUserToken(authResponse.token!);
          await storageService.setItem(STORAGE_KEYS.IS_LOGGED_IN, true);

          console.log('✅ Google Sign-In successful and data stored');
          
          return {
            success: true,
            user: authResponse.user,
            token: authResponse.token,
            message: authResponse.message,
          };
        } else {
          return {
            success: false,
            error: authResponse.error || 'Authentication with backend failed',
          };
        }
      } else {
        return {
          success: false,
          error: 'Failed to get user information from Google',
        };
      }
    } catch (error: any) {
      console.error('🔥 Google Sign-In error:', error);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return {
          success: false,
          error: 'Sign in was cancelled',
        };
      } else if (error.code === statusCodes.IN_PROGRESS) {
        return {
          success: false,
          error: 'Sign in is already in progress',
        };
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return {
          success: false,
          error: 'Play Services not available or outdated',
        };
      } else {
        return {
          success: false,
          error: 'Something went wrong with Google Sign-In',
        };
      }
    }
  }

  // Authenticate Google user with your backend
  private async authenticateWithBackend(googleUser: GoogleUserInfo): Promise<{
    success: boolean;
    user?: any;
    token?: string;
    message?: string;
    error?: string;
  }> {
    try {
      const authData: GoogleAuthRequest = {
        googleId: googleUser.id,
        email: googleUser.email,
        name: googleUser.name,
        givenName: googleUser.givenName || '',
        familyName: googleUser.familyName || '',
        photo: googleUser.photo,
      };

      console.log('🚀 Sending Google auth data to backend:', authData);

      const result: StandardApiResponse<any> = await fetchWithErrorHandling(
        'http://13.204.155.197/api/auth/google',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(authData)
        }
      );

      if (result.success && result.data) {
        const userData = result.data.body?.user || result.data.user;
        const userToken = result.data.body?.token || result.data.token;

        if (userData && userToken) {
          return {
            success: true,
            user: userData,
            token: userToken,
            message: result.data.message || result.message || 'Google Sign-In successful',
          };
        }
      }

      return {
        success: false,
        error: result.error || 'Backend authentication failed',
      };
    } catch (error: any) {
      console.error('🔥 Backend authentication error:', error);
      return {
        success: false,
        error: 'Failed to authenticate with server',
      };
    }
  }

  async signOut(): Promise<boolean> {
    try {
      await GoogleSignin.signOut();
      await storageService.logout(); // Clear all stored user data
      console.log('✅ Google Sign-Out successful');
      return true;
    } catch (error) {
      console.error('❌ Google Sign-Out error:', error);
      return false;
    }
  }

  async isSignedIn(): Promise<boolean> {
    try {
      const isSignedIn = await GoogleSignin.hasPreviousSignIn();
      return isSignedIn;
    } catch (error) {
      return false;
    }
  }

  async getCurrentUser(): Promise<GoogleUserInfo | null> {
    try {
      const userInfo = await GoogleSignin.getCurrentUser();
      if (userInfo?.user) {
        return {
          id: userInfo.user.id,
          name: userInfo.user.name || '',
          email: userInfo.user.email,
          photo: userInfo.user.photo || undefined,
          familyName: userInfo.user.familyName || undefined,
          givenName: userInfo.user.givenName || undefined,
        };
      }
      return null;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  // Mock implementation for development/testing
  async mockSignIn(): Promise<GoogleSignInResponse> {
    // Simulate network delay
    await new Promise<void>(resolve => setTimeout(resolve, 1500));
    
    const mockUser: GoogleUserInfo = {
      id: 'mock_google_user_123',
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      givenName: 'John',
      familyName: 'Doe',
      photo: 'https://lh3.googleusercontent.com/a/default-user=s96-c'
    };

    return {
      success: true,
      user: mockUser,
    };
  }
}

export default new GoogleSignInService();