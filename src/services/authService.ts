// Authentication Service
import { fetchWithErrorHandling, StandardApiResponse } from '../utils/apiErrorHandler';
import FirebaseMessagingService from './firebaseMessagingService';

const API_BASE_URL = 'http://13.204.155.197';
const API_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export interface LoginRequest {
  emailPhone: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  address: string;
  pinCode: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  roles: string[];
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    mobile: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    lat: number;
    lng: number;
    roles: string[];
  };
  token?: string;
}


// Login user function - calls real API with proper error handling
export const loginUser = async (loginData: LoginRequest): Promise<AuthResponse> => {
  try {
    const result: StandardApiResponse<any> = await fetchWithErrorHandling(
      `${API_BASE_URL}/api/user/login`,
      {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify(loginData)
      }
    );

    if (result.success && result.data) {
      console.log('✅ Login successful:', {
        emailPhone: loginData.emailPhone,
        hasUser: !!result.data.body?.user,
        rawResponse: result.data
      });
      
      // Handle the actual API response structure
      const userData = result.data.body?.user || result.data.user;
      const userToken = result.data.body?.token || result.data.token;
      
      if (userData && userToken) {
        // Initialize Firebase messaging after successful login
        try {
          FirebaseMessagingService.initializeMessaging();
        } catch (error) {
          console.error('⚠️ Failed to initialize Firebase messaging after login:', error);
          // Don't fail the login if Firebase messaging fails
        }

        return {
          success: true,
          message: result.data.message || result.message,
          user: userData,
          token: userToken
        };
      } else {
        console.log('❌ Missing user data or token in response:', result.data);
        return {
          success: false,
          message: 'Login response missing required data'
        };
      }
    } else {
      console.log('❌ Login failed:', {
        emailPhone: loginData.emailPhone,
        error: result.error
      });
      
      return {
        success: false,
        message: result.message
      };
    }
  } catch (error: any) {
    console.error('🔥 Login error:', error);
    return {
      success: false,
      message: 'Login failed. Please try again.'
    };
  }
};

// Register user function - calls real API with proper error handling
export const registerUser = async (registerData: RegisterRequest): Promise<AuthResponse> => {
  try {
    const result: StandardApiResponse<any> = await fetchWithErrorHandling(
      `${API_BASE_URL}/api/user`,
      {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify(registerData)
      }
    );

    if (result.success && result.data) {
      console.log('✅ Registration successful:', {
        email: registerData.email,
        firstName: registerData.firstName,
        hasUser: !!result.data.user
      });
      
      return {
        success: true,
        message: result.message,
        user: result.data.user,
        token: result.data.token
      };
    } else {
      console.log('❌ Registration failed:', {
        email: registerData.email,
        error: result.error
      });
      
      return {
        success: false,
        message: result.message
      };
    }
  } catch (error: any) {
    console.error('🔥 Registration error:', error);
    return {
      success: false,
      message: 'Registration failed. Please try again.'
    };
  }
};

// Logout user function - calls real API with proper error handling
export const logoutUser = async (token?: string): Promise<{ success: boolean; message: string }> => {
  try {
    const headers = token ? { ...API_HEADERS, 'Authorization': `Bearer ${token}` } : API_HEADERS;
    
    const result: StandardApiResponse = await fetchWithErrorHandling(
      `${API_BASE_URL}/api/auth/logout`,
      {
        method: 'POST',
        headers
      }
    );

    if (result.success) {
      console.log('✅ Logout successful:', { hasToken: !!token });
    } else {
      console.log('❌ Logout failed:', { error: result.error });
    }

    return {
      success: result.success,
      message: result.message
    };
  } catch (error: any) {
    console.error('🔥 Logout error:', error);
    return {
      success: false,
      message: 'Logout failed. Please try again.'
    };
  }
};

// Check if email exists function with proper error handling
export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const result: StandardApiResponse = await fetchWithErrorHandling(
      `${API_BASE_URL}/api/user/profile?email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: API_HEADERS
      }
    );
    
    const exists = result.success;
    console.log('📧 Email check:', { email, exists });
    return exists;
  } catch (error: any) {
    console.error('🔥 Email check error:', { email, error: error.message });
    return false; // If error (404, etc.), email doesn't exist
  }
};