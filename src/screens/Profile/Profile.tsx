import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
  Animated,
  Alert,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary, MediaType, ImagePickerResponse } from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { API_CONFIG } from '../../config/api';
import profileStyles from './profileStyles';
import { storageService } from '../../utils/storage';
import { reset, navigate } from '../../utils/navigationService';
import googleSignInService from '../../services/googleSignInService';

interface PetOwner {
  userId: number;
  pets: string;
  alterNo: string;
  profileImg: string;
  id: number;
  lat: number;
  lng: number;
  uid: string;
  address: string;
  pinCode: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  firstName: string;
  lastName: string;
  businessName: string;
  isActive: number;
}

interface ApiResponse {
  statusCode: number;
  message: string;
  body: PetOwner;
}

interface PetCategory {
  id: number;
  catName: string;
}

interface PetSize {
  id: number;
  size: string;
}

interface PetGender {
  id: number;
  name: string;
}

interface PetProfile {
  id: number;
  petName: string;
  ageInYears: number | null;
  ageInMonths: number | null;
  category: PetCategory;
  size: PetSize;
  height: string | null;
  profileImg: string | null;
  gender: PetGender;
  weight: string | null;
  dailyFeedCount: number | null;
  treats: string | null;
  cookie: string | null;
}

interface PetApiResponse {
  statusCode: number;
  message: string;
  body: PetProfile[];
}

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  mobile?: string;
  alterNo?: string;
  address?: string;
  city?: string;
  state?: string;
  pinCode?: string;
}

const Profile: React.FC = () => {
  const [petOwner, setPetOwner] = useState<PetOwner | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  // Form is always in editing mode now
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // Tab state
  const [activeTab, setActiveTab] = useState<'user' | 'pets'>('user');
  
  // Pet profiles state
  const [petProfiles, setPetProfiles] = useState<PetProfile[]>([]);
  const [loadingPets, setLoadingPets] = useState(false);
  
  // Form data states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [alterNo, setAlterNo] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pinCode, setPinCode] = useState('');
  
  const scrollY = new Animated.Value(0);

  useEffect(() => {
    fetchPetOwnerData();
  }, []);

  useEffect(() => {
    if (activeTab === 'pets') {
      fetchPetProfiles();
    }
  }, [activeTab]);

  const fetchPetOwnerData = async () => {
    try {
      console.log('🔍 TOKEN DEBUGGING - Starting token retrieval');
      
      // Debug: Check all possible token storage locations
      const allStorageKeys = await AsyncStorage.getAllKeys();
      console.log('📱 All AsyncStorage keys:', allStorageKeys);
      
      // Use storageService to get token consistently
      let token = await storageService.getUserToken();
      console.log('🔧 StorageService token result:', {
        found: !!token,
        type: typeof token,
        preview: token ? `${token.substring(0, 10)}...` : 'None'
      });
      
      // If no token from storageService, try fallback method
      if (!token) {
        console.log('🔄 No token from storageService, trying manual search...');
        const possibleTokenKeys = ['token', 'user_token', 'authToken', 'access_token', 'loginToken'];
        
        // Debug: Check what's actually stored in each key
        for (const key of possibleTokenKeys) {
          const rawValue = await AsyncStorage.getItem(key);
          console.log(`🔑 Key "${key}":`, {
            exists: !!rawValue,
            type: typeof rawValue,
            length: rawValue ? rawValue.length : 0,
            preview: rawValue ? `${rawValue.substring(0, 20)}...` : 'null'
          });
        }
        
        for (const key of possibleTokenKeys) {
          const value = await AsyncStorage.getItem(key);
          if (value) {
            try {
              token = JSON.parse(value);
              console.log(`✅ Token successfully parsed from key: ${key}`);
            } catch {
              token = value;
              console.log(`✅ Token used as string from key: ${key}`);
            }
            break;
          }
        }
      } else {
        console.log('✅ Token found using storageService');
      }
      
      if (!token) {
        console.error('No authentication token found');
        Alert.alert('Error', 'Please login to view profile');
        setLoading(false);
        return;
      }

      console.log('🚀 PROFILE API DEBUG - Starting profile fetch');
      console.log('🔑 Token Details:', {
        tokenExists: !!token,
        tokenType: typeof token,
        tokenLength: token ? token.length : 0,
        tokenPreview: token ? `${token.substring(0, 10)}...` : 'No token',
      });

      const apiUrl = `${API_CONFIG.BASE_URL}/api/pet-owner/findByUserId`;
      const requestHeaders = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      console.log('🌐 Request Details:', {
        url: apiUrl,
        method: 'GET',
        headers: {
          ...requestHeaders,
          Authorization: requestHeaders.Authorization ? `Bearer ${token.substring(0, 10)}...` : 'Missing',
        },
      });

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: requestHeaders,
      });

      console.log('📥 Response Details:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries()),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          errorBody: errorText,
        });
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const responseText = await response.text();
      console.log('📄 Raw Response Text:', responseText);

      let data: ApiResponse;
      try {
        data = JSON.parse(responseText);
        console.log('✅ Parsed Response Data:', {
          statusCode: data.statusCode,
          message: data.message,
          hasBody: !!data.body,
          bodyKeys: data.body ? Object.keys(data.body) : [],
        });
      } catch (parseError) {
        console.error('❌ JSON Parse Error:', parseError);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }
      
      if (data.statusCode === 200) {
        console.log('✅ Success Response - Profile data loaded:', {
          userId: data.body.userId,
          firstName: data.body.firstName,
          email: data.body.email,
          hasProfileImg: !!data.body.profileImg,
        });
        
        setPetOwner(data.body);
        // Populate form fields
        setFirstName(data.body.firstName || '');
        setLastName(data.body.lastName || '');
        setEmail(data.body.email || '');
        setMobile(data.body.mobile || '');
        setAlterNo(data.body.alterNo || '');
        setAddress(data.body.address || '');
        setCity(data.body.city || '');
        setState(data.body.state || '');
        setPinCode(data.body.pinCode || '');
        
        console.log('✅ Form fields populated successfully');
      } else {
        console.error('❌ API returned non-200 status:', {
          statusCode: data.statusCode,
          message: data.message,
        });
        setMessage({type: 'error', text: data.message || 'Failed to fetch profile data'});
      }
    } catch (error) {
      console.error('🔥 Critical Error in fetchPetOwnerData:', {
        errorName: error.name,
        errorMessage: error.message,
        errorStack: error.stack,
      });
      setMessage({type: 'error', text: `Failed to fetch profile data: ${error.message}`});
    } finally {
      console.log('🏁 fetchPetOwnerData completed, setting loading to false');
      setLoading(false);
    }
  };

  const fetchPetProfiles = async () => {
    setLoadingPets(true);
    try {
      console.log('🔍 PET PROFILES DEBUG - Starting pet profiles fetch');
      
      // Use storageService to get token consistently
      let token = await storageService.getUserToken();
      
      // If no token from storageService, try fallback method
      if (!token) {
        console.log('🔄 No token from storageService, trying manual search...');
        const possibleTokenKeys = ['token', 'user_token', 'authToken', 'access_token', 'loginToken'];
        
        for (const key of possibleTokenKeys) {
          const value = await AsyncStorage.getItem(key);
          if (value) {
            try {
              token = JSON.parse(value);
              console.log(`✅ Token successfully parsed from key: ${key}`);
            } catch {
              token = value;
              console.log(`✅ Token used as string from key: ${key}`);
            }
            break;
          }
        }
      } else {
        console.log('✅ Token found using storageService');
      }
      
      console.log('🔑 Pet Profiles Token Details:', {
        tokenExists: !!token,
        tokenType: typeof token,
        tokenLength: token ? token.length : 0,
        tokenPreview: token ? `${token.substring(0, 10)}...` : 'No token',
      });
      
      // Use the same owner ID approach as AddPet - get the 'id' field from petOwner
      let ownerId = null;
      
      console.log('🔍 Trying to get owner ID from multiple sources...');
      
      // First priority: Use the 'id' field from petOwner state (this is the owner ID we need)
      if (petOwner && petOwner.id) {
        ownerId = petOwner.id;
        console.log('✅ Found owner ID from petOwner.id:', ownerId);
      }
      
      // Second priority: Try to get owner data from API directly if petOwner is not available
      if (!ownerId) {
        console.log('🔄 petOwner.id not available, fetching from API...');
        try {
          if (!token) {
            console.error('❌ No token available for API call');
          } else {
            const ownerApiUrl = `${API_CONFIG.BASE_URL}/api/pet-owner/findByUserId`;
            console.log('🌐 Fetching owner data from:', ownerApiUrl);
            
            const ownerResponse = await fetch(ownerApiUrl, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
            
            console.log('📥 Owner API Response Details:', {
              status: ownerResponse.status,
              statusText: ownerResponse.statusText,
              ok: ownerResponse.ok,
            });
            
            if (ownerResponse.ok) {
              const ownerResponseText = await ownerResponse.text();
              console.log('📄 Owner Raw Response Text:', ownerResponseText);
              
              const ownerData = JSON.parse(ownerResponseText);
              if (ownerData.statusCode === 200 && ownerData.body?.id) {
                ownerId = ownerData.body.id;
                console.log('✅ Owner ID found from API:', ownerId);
              } else {
                console.error('❌ Owner API returned non-200 status or no ID found');
              }
            } else {
              const errorText = await ownerResponse.text();
              console.error('❌ Owner API Error:', errorText);
            }
          }
        } catch (ownerError) {
          console.error('🔥 Error fetching owner data:', ownerError);
        }
      }
      
      // Fallback: Try old method with userId for backward compatibility
      if (!ownerId) {
        console.log('🔄 Falling back to userId method...');
        
        // First try from storageService
        try {
          const userData = await storageService.getUserData();
          ownerId = userData?.userId;
          console.log('StorageService userData:', userData);
          console.log('Using userId as fallback ownerId:', ownerId);
        } catch (error) {
          console.log('Could not get userId from storageService:', error);
        }
        
        // If not found, try to get from petOwner state
        if (!ownerId && petOwner) {
          ownerId = petOwner.userId;
          console.log('Using petOwner.userId as fallback ownerId:', ownerId);
        }
        
        // If still not found, try AsyncStorage directly
        if (!ownerId) {
          const possibleUserKeys = ['userData', 'user', 'userInfo'];
          for (const key of possibleUserKeys) {
            const value = await AsyncStorage.getItem(key);
            if (value) {
              try {
                const userData = JSON.parse(value);
                if (userData?.userId) {
                  ownerId = userData.userId;
                  console.log(`Found userId in ${key}:`, ownerId);
                  break;
                }
              } catch (error) {
                console.log(`Error parsing ${key}:`, error);
              }
            }
          }
        }
      }
      
      if (!token) {
        console.error('❌ No authentication token found');
        setMessage({type: 'error', text: 'Authentication token not found. Please login again.'});
        return;
      }
      
      if (!ownerId) {
        console.error('❌ No owner ID found from any source');
        setMessage({type: 'error', text: 'Owner ID not found. Please try refreshing the page.'});
        return;
      }

      console.log('🚀 PET PROFILES API DEBUG - Starting pet profiles fetch');
      console.log('🔑 Final Owner ID being used:', ownerId);
      console.log('🔑 Owner ID type:', typeof ownerId);

      const apiUrl = `${API_CONFIG.BASE_URL}/api/pet-profile/owner/${ownerId}`;
      console.log('🌐 Pet Profiles Request Details:', {
        url: apiUrl,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.substring(0, 10)}...`,
          'Content-Type': 'application/json',
        },
      });

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 Pet Profiles Response Details:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Object.fromEntries(response.headers.entries()),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Pet Profiles API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          errorBody: errorText,
        });
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const responseText = await response.text();
      console.log('📄 Pet Profiles Raw Response Text:', responseText);

      let result: PetApiResponse;
      try {
        result = JSON.parse(responseText);
        console.log('✅ Pet Profiles Parsed Response Data:', {
          statusCode: result.statusCode,
          message: result.message,
          hasBody: !!result.body,
          petCount: result.body ? result.body.length : 0,
          petNames: result.body ? result.body.map(pet => pet.petName) : [],
        });
      } catch (parseError) {
        console.error('❌ Pet Profiles JSON Parse Error:', parseError);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }
      
      if (result.statusCode === 200) {
        console.log('✅ Pet Profiles Success - Data loaded:', {
          petCount: result.body ? result.body.length : 0,
          pets: result.body ? result.body.map(pet => ({
            id: pet.id,
            name: pet.petName,
            category: pet.category?.catName,
            size: pet.size?.size,
            gender: pet.gender?.name,
          })) : [],
        });
        setPetProfiles(result.body || []);
      } else {
        console.error('❌ Pet Profiles API returned non-200 status:', {
          statusCode: result.statusCode,
          message: result.message,
        });
        throw new Error(result.message || 'Failed to fetch pet profiles');
      }
    } catch (error) {
      console.error('🔥 Critical Error in fetchPetProfiles:', {
        errorName: error.name,
        errorMessage: error.message,
        errorStack: error.stack,
      });
      setMessage({type: 'error', text: `Failed to load pet profiles: ${error.message}`});
    } finally {
      console.log('🏁 fetchPetProfiles completed, setting loadingPets to false');
      setLoadingPets(false);
    }
  };

  const requestPermissions = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        // For Android 13+ (API 33+), we need READ_MEDIA_IMAGES
        // For older Android versions, we need READ_EXTERNAL_STORAGE
        const androidVersion = Platform.Version;
        let permission: string;
        
        if (androidVersion >= 33) {
          // Android 13+ uses READ_MEDIA_IMAGES
          permission = 'android.permission.READ_MEDIA_IMAGES';
        } else {
          // Older Android versions
          permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
        }

        const granted = await PermissionsAndroid.request(
          permission as any,
          {
            title: 'Photo Library Permission',
            message: 'App needs access to your photo library to select profile pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        
        console.log('Permission result:', granted);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission request error:', err);
        return false;
      }
    }
    return true;
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    }

    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!pinCode.trim()) {
      newErrors.pinCode = 'Pin code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearFieldError = (field: keyof ValidationErrors) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      setMessage({type: 'error', text: 'Please fix the errors below'});
      return;
    }

    if (!petOwner) return;

    setIsSaving(true);
    setMessage(null);

    try {
      await updatePetOwnerProfile(petOwner.profileImg || '');
      setMessage({type: 'success', text: 'Profile updated successfully!'});
      await fetchPetOwnerData();
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage({type: 'error', text: 'Failed to update profile. Please try again.'});
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Sign out from Google if signed in
      const isGoogleSignedIn = await googleSignInService.isSignedIn();
      if (isGoogleSignedIn) {
        await googleSignInService.signOut();
      } else {
        await storageService.logout();
      }
      
      console.log('Logout completed successfully');
      reset('SignIn');
    } catch (error) {
      console.error('Logout failed:', error);
      setMessage({type: 'error', text: 'Failed to logout. Please try again.'});
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getPresignedUrl = async (fileName: string, fileType: string) => {
    try {
      // Use storageService to get token consistently
      let token = await storageService.getUserToken();
      
      // If no token from storageService, try fallback method
      if (!token) {
        const possibleTokenKeys = ['token', 'user_token', 'authToken', 'access_token', 'loginToken'];
        
        for (const key of possibleTokenKeys) {
          const value = await AsyncStorage.getItem(key);
          if (value) {
            try {
              token = JSON.parse(value);
            } catch {
              token = value;
            }
            break;
          }
        }
      }

      if (!token) {
        throw new Error('No authentication token found');
      }

      // Use the API base URL with the correct endpoint for presigned URL
      const s3ApiUrl = `${API_CONFIG.BASE_URL.replace(':3000', ':3008')}/api/aws-s3/presigned-url`;
      
      console.log('Getting presigned URL from:', s3ApiUrl);
      console.log('Request body:', { fileType, fileName });
      
      const response = await fetch(s3ApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          fileType,
          fileName,
        }),
      });

      console.log('Presigned URL response status:', response.status);

      if (!response.ok) {
        throw new Error(`Failed to get presigned URL: ${response.status}`);
      }

      const data = await response.json();
      if (data.statusCode === 201) {
        return data.body;
      } else {
        throw new Error(data.message || 'Failed to get presigned URL');
      }
    } catch (error) {
      console.error('Error getting presigned URL:', error);
      throw error;
    }
  };

  const uploadImageToS3 = async (presignedUrl: string, imageUri: string) => {
    try {
      console.log('Starting S3 upload with URL:', presignedUrl);
      console.log('Image URI:', imageUri);
      
      // Try two different approaches for S3 upload
      let response;
      
      // Approach 1: Direct binary upload (typical for S3)
      try {
        console.log('Attempting direct binary upload...');
        
        // Read the file as blob/binary data
        const fileResponse = await fetch(imageUri);
        const fileBlob = await fileResponse.blob();
        
        response = await fetch(presignedUrl, {
          method: 'PUT',
          body: fileBlob,
          headers: {
            'Content-Type': 'image/jpeg',
          },
        });
        
        console.log('Direct upload response status:', response.status);
        
      } catch (directUploadError) {
        console.log('Direct upload failed, trying FormData approach:', directUploadError);
        
        // Approach 2: FormData upload (fallback)
        const formData = new FormData();
        formData.append('file', {
          uri: imageUri,
          type: 'image/jpeg',
          name: 'profile-image.jpg',
        } as any);

        response = await fetch(presignedUrl, {
          method: 'PUT',
          body: formData,
        });
        
        console.log('FormData upload response status:', response.status);
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('S3 upload error response:', errorText);
        throw new Error(`Failed to upload image to S3: ${response.status} - ${errorText}`);
      }

      // Extract the base URL (remove query parameters)
      const imageUrl = presignedUrl.split('?')[0];
      console.log('Upload successful, image URL:', imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading to S3:', error);
      
      // Add more specific error handling
      if (error.message?.includes('Network request failed')) {
        throw new Error('Network connection failed. Please check your internet connection and try again.');
      } else if (error.message?.includes('timeout')) {
        throw new Error('Upload timeout. Please try again with a smaller image.');
      } else {
        throw new Error(`Upload failed: ${error.message}`);
      }
    }
  };

  const updatePetOwnerProfile = async (profileImageUrl: string) => {
    try {
      // Use storageService to get token consistently
      let token = await storageService.getUserToken();
      
      // If no token from storageService, try fallback method
      if (!token) {
        const possibleTokenKeys = ['token', 'user_token', 'authToken', 'access_token', 'loginToken'];
        
        for (const key of possibleTokenKeys) {
          const value = await AsyncStorage.getItem(key);
          if (value) {
            try {
              token = JSON.parse(value);
            } catch {
              token = value;
            }
            break;
          }
        }
      }

      if (!token || !petOwner) {
        throw new Error('Missing authentication token or user data');
      }

      const requestBody = {
        lat: petOwner.lat,
        lng: petOwner.lng,
        address,
        pinCode,
        email,
        mobile,
        city,
        state,
        firstName,
        lastName,
        businessName: petOwner.businessName || '',
        pets: petOwner.pets || '',
        alterNo: alterNo || '',
        profileImg: profileImageUrl,
      };

      console.log('Updating pet owner profile with data:', requestBody);
      console.log('API endpoint:', `${API_CONFIG.BASE_URL}/api/pet-owner/update-profile`);

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/pet-owner/update-profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Profile update response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Profile update error response:', errorText);
        throw new Error(`Failed to update profile: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating pet owner profile:', error);
      throw error;
    }
  };

  const handleImagePicker = async () => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'To change your profile picture, please allow access to your photo library in your device settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => {
              // On Android, this will open app settings
              if (Platform.OS === 'android') {
                import('react-native').then(({ Linking }) => {
                  Linking.openSettings();
                });
              }
            }}
          ]
        );
        return;
      }

      setUploadingImage(true);
      setMessage(null);

      launchImageLibrary(
        {
          mediaType: 'photo' as MediaType,
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
          quality: 0.8,
        },
        async (response: ImagePickerResponse) => {
          try {
            if (response.didCancel || response.errorMessage) {
              setUploadingImage(false);
              return;
            }

            if (response.assets && response.assets[0]) {
              const asset = response.assets[0];
              const fileName = `profile-picture-${Date.now()}.jpg`;
              const fileType = 'image/jpeg';

              // Step 1: Get presigned URL
              const presignedUrl = await getPresignedUrl(fileName, fileType);

              // Step 2: Upload image to S3
              const imageUrl = await uploadImageToS3(presignedUrl, asset.uri!);

              // Step 3: Update pet owner profile with S3 URL
              console.log('Updating profile with new image URL:', imageUrl);
              await updatePetOwnerProfile(imageUrl);

              // Step 4: Refresh profile data
              console.log('Refreshing profile data...');
              await fetchPetOwnerData();

              setMessage({type: 'success', text: 'Profile picture updated successfully!'});
            }
          } catch (error) {
            console.error('Error uploading image:', error);
            
            // Provide more specific error messages based on the step that failed
            if (error.message?.includes('Failed to update profile')) {
              setMessage({type: 'error', text: 'Image uploaded successfully, but failed to update profile. Please try saving your profile changes manually.'});
            } else if (error.message?.includes('Failed to upload')) {
              setMessage({type: 'error', text: 'Failed to upload image to server. Please check your internet connection and try again.'});
            } else {
              setMessage({type: 'error', text: `Failed to upload profile picture: ${error.message}`});
            }
          } finally {
            setUploadingImage(false);
          }
        },
      );
    } catch (error) {
      console.error('Error handling image picker:', error);
      setMessage({type: 'error', text: 'Failed to open image picker'});
      setUploadingImage(false);
    }
  };

  if (loading) {
    return (
      <KeyboardAvoidingView 
        style={profileStyles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={profileStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#58B9D0" />
          <Text style={profileStyles.loadingText}>Loading profile...</Text>
        </View>
      </KeyboardAvoidingView>
    );
  }

  if (!petOwner) {
    return (
      <KeyboardAvoidingView 
        style={profileStyles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={profileStyles.errorContainer}>
          <Text style={profileStyles.errorText}>Failed to load profile data</Text>
          <TouchableOpacity 
            onPress={handleLogout}
            style={[
              profileStyles.commonButton,
              profileStyles.commonButtonDanger,
              isLoggingOut && profileStyles.loadingButton,
              { marginTop: 20 }
            ]}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <ActivityIndicator size="small" color="#FF6B6B" />
            ) : (
              <>
                <MaterialIcons name="logout" size={20} color="#FF6B6B" style={{marginRight: 8}} />
                <Text style={[profileStyles.commonButtonText, profileStyles.commonButtonTextDanger]}>Sign Out</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={profileStyles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
      
      {/* Sticky Header */}
      <View style={profileStyles.stickyHeader}>
        <View style={profileStyles.headerTitleContainer}>
          <Text style={profileStyles.headerTitle}>Profile</Text>
          <Text style={profileStyles.headerSubtitle}>Manage your account</Text>
        </View>
      </View>
      
      <Animated.ScrollView 
        contentContainerStyle={profileStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >

        {/* Enhanced Profile Photo Upload Section */}
        <View style={profileStyles.profilePhotoSection}>
          <View style={profileStyles.profilePhotoCard}>
            <TouchableOpacity 
              onPress={handleImagePicker} 
              disabled={uploadingImage}
              style={profileStyles.profilePhotoButton}
              activeOpacity={0.8}
            >
              <View style={profileStyles.profilePhotoWrapper}>
                <Image
                  source={{ 
                    uri: petOwner.profileImg || undefined 
                  }}
                  style={profileStyles.profilePhotoImage}
                  defaultSource={require('../../../assets/icons/googleIcon.png')}
                />
                {uploadingImage ? (
                  <View style={profileStyles.uploadingOverlay}>
                    <ActivityIndicator size="small" color="#58B9D0" />
                    <Text style={profileStyles.uploadingText}>Uploading...</Text>
                  </View>
                ) : (
                  <View style={profileStyles.cameraIconOverlay}>
                    <MaterialIcons name="camera-alt" size={24} color="#ffffff" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
            
            {/* User Information */}
            <View style={profileStyles.userInfoContainer}>
              <Text style={profileStyles.userName}>
                {firstName} {lastName}
              </Text>
              <Text style={profileStyles.userEmail}>{email}</Text>
              <View style={profileStyles.verifiedBadge}>
                <MaterialIcons name="verified" size={16} color="#4CAF50" />
                <Text style={profileStyles.verifiedText}>Verified Profile</Text>
              </View>
            </View>
            
            <Text style={profileStyles.photoUploadText}>
              <MaterialIcons name="touch-app" size={16} color="#666" />
              {' '}Tap photo to update
            </Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={profileStyles.tabContainer}>
          <TouchableOpacity 
            style={[
              profileStyles.tabButton, 
              activeTab === 'user' && profileStyles.activeTab
            ]}
            onPress={() => setActiveTab('user')}
          >
            <MaterialIcons 
              name="person" 
              size={20} 
              color={activeTab === 'user' ? '#FFFFFF' : '#999'} 
            />
            <Text style={[
              profileStyles.tabText,
              activeTab === 'user' && profileStyles.activeTabText
            ]}>User Profile</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              profileStyles.tabButton, 
              activeTab === 'pets' && profileStyles.activeTab
            ]}
            onPress={() => setActiveTab('pets')}
          >
            <MaterialIcons 
              name="pets" 
              size={20} 
              color={activeTab === 'pets' ? '#FFFFFF' : '#999'} 
            />
            <Text style={[
              profileStyles.tabText,
              activeTab === 'pets' && profileStyles.activeTabText
            ]}>Pets Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Content Container */}
        <View style={profileStyles.contentContainer}>

          {/* Messages */}
          {message && (
            <View style={[
              profileStyles.messageContainer,
              message.type === 'success' ? profileStyles.successMessage : profileStyles.errorMessage
            ]}>
              <Text style={profileStyles.messageText}>{message.text}</Text>
            </View>
          )}

          {activeTab === 'user' ? (
            <View style={profileStyles.sectionCard}>
              <View style={profileStyles.sectionHeader}>
                <MaterialIcons 
                  name="person" 
                  size={24} 
                  color="#58B9D0" 
                  style={profileStyles.sectionHeaderIcon}
                />
                <Text style={profileStyles.sectionHeaderTitle}>Personal Information</Text>
              </View>
            <View style={profileStyles.inputGroup}>
              <View>
                <TextInput
                  mode="outlined"
                  label="First Name"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChangeText={(value) => {
                    setFirstName(value);
                    clearFieldError('firstName');
                  }}
                  editable={true}
                  theme={{ 
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.firstName ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  style={profileStyles.textInput}
                  contentStyle={profileStyles.inputContent}
                  outlineStyle={[
                    profileStyles.inputOutline,
                    errors.firstName && profileStyles.inputError
                  ]}
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
                {errors.firstName && <Text style={profileStyles.errorText}>{errors.firstName}</Text>}
              </View>

              <View>
                <TextInput
                  mode="outlined"
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChangeText={(value) => {
                    setLastName(value);
                    clearFieldError('lastName');
                  }}
                  editable={true}
                  theme={{ 
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.lastName ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  style={profileStyles.textInput}
                  contentStyle={profileStyles.inputContent}
                  outlineStyle={[
                    profileStyles.inputOutline,
                    errors.lastName && profileStyles.inputError
                  ]}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons 
                          name="person" 
                          size={20} 
                          color={errors.lastName ? '#FF6B6B' : '#666'} 
                        />
                      )}
                    />
                  }
                />
                {errors.lastName && <Text style={profileStyles.errorText}>{errors.lastName}</Text>}
              </View>

              <View>
                <TextInput
                  mode="outlined"
                  label="Email"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={(value) => {
                    setEmail(value);
                    clearFieldError('email');
                  }}
                  editable={true}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  theme={{ 
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.email ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  style={profileStyles.textInput}
                  contentStyle={profileStyles.inputContent}
                  outlineStyle={[
                    profileStyles.inputOutline,
                    errors.email && profileStyles.inputError
                  ]}
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
                {errors.email && <Text style={profileStyles.errorText}>{errors.email}</Text>}
              </View>

              <View>
                <TextInput
                  mode="outlined"
                  label="Mobile Number"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChangeText={(value) => {
                    setMobile(value);
                    clearFieldError('mobile');
                  }}
                  editable={true}
                  keyboardType="phone-pad"
                  theme={{ 
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.mobile ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  style={profileStyles.textInput}
                  contentStyle={profileStyles.inputContent}
                  outlineStyle={[
                    profileStyles.inputOutline,
                    errors.mobile && profileStyles.inputError
                  ]}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons 
                          name="phone" 
                          size={20} 
                          color={errors.mobile ? '#FF6B6B' : '#666'} 
                        />
                      )}
                    />
                  }
                />
                {errors.mobile && <Text style={profileStyles.errorText}>{errors.mobile}</Text>}
              </View>

              <View>
                <TextInput
                  mode="outlined"
                  label="Alternate Number (Optional)"
                  placeholder="Enter alternate number"
                  value={alterNo}
                  onChangeText={(value) => {
                    setAlterNo(value);
                    clearFieldError('alterNo');
                  }}
                  editable={true}
                  keyboardType="phone-pad"
                  theme={{ 
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: '#E8E8E8' }
                  }}
                  style={profileStyles.textInput}
                  contentStyle={profileStyles.inputContent}
                  outlineStyle={profileStyles.inputOutline}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons 
                          name="phone" 
                          size={20} 
                          color="#666" 
                        />
                      )}
                    />
                  }
                />
              </View>

              <View>
                <TextInput
                  mode="outlined"
                  label="Address"
                  placeholder="Enter your address"
                  value={address}
                  onChangeText={(value) => {
                    setAddress(value);
                    clearFieldError('address');
                  }}
                  editable={true}
                  multiline
                  numberOfLines={2}
                  theme={{ 
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.address ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  style={profileStyles.textInput}
                  contentStyle={profileStyles.inputContent}
                  outlineStyle={[
                    profileStyles.inputOutline,
                    errors.address && profileStyles.inputError
                  ]}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons 
                          name="location-on" 
                          size={20} 
                          color={errors.address ? '#FF6B6B' : '#666'} 
                        />
                      )}
                    />
                  }
                />
                {errors.address && <Text style={profileStyles.errorText}>{errors.address}</Text>}
              </View>

              <View>
                <TextInput
                  mode="outlined"
                  label="City"
                  placeholder="Enter your city"
                  value={city}
                  onChangeText={(value) => {
                    setCity(value);
                    clearFieldError('city');
                  }}
                  editable={true}
                  theme={{ 
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.city ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  style={profileStyles.textInput}
                  contentStyle={profileStyles.inputContent}
                  outlineStyle={[
                    profileStyles.inputOutline,
                    errors.city && profileStyles.inputError
                  ]}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons 
                          name="location-city" 
                          size={20} 
                          color={errors.city ? '#FF6B6B' : '#666'} 
                        />
                      )}
                    />
                  }
                />
                {errors.city && <Text style={profileStyles.errorText}>{errors.city}</Text>}
              </View>

              <View>
                <TextInput
                  mode="outlined"
                  label="State"
                  placeholder="Enter your state"
                  value={state}
                  onChangeText={(value) => {
                    setState(value);
                    clearFieldError('state');
                  }}
                  editable={true}
                  theme={{ 
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.state ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  style={profileStyles.textInput}
                  contentStyle={profileStyles.inputContent}
                  outlineStyle={[
                    profileStyles.inputOutline,
                    errors.state && profileStyles.inputError
                  ]}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons 
                          name="map" 
                          size={20} 
                          color={errors.state ? '#FF6B6B' : '#666'} 
                        />
                      )}
                    />
                  }
                />
                {errors.state && <Text style={profileStyles.errorText}>{errors.state}</Text>}
              </View>

              <View>
                <TextInput
                  mode="outlined"
                  label="Pin Code"
                  placeholder="Enter your pin code"
                  value={pinCode}
                  onChangeText={(value) => {
                    setPinCode(value);
                    clearFieldError('pinCode');
                  }}
                  editable={true}
                  keyboardType="numeric"
                  theme={{ 
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.pinCode ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  style={profileStyles.textInput}
                  contentStyle={profileStyles.inputContent}
                  outlineStyle={[
                    profileStyles.inputOutline,
                    errors.pinCode && profileStyles.inputError
                  ]}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons 
                          name="local-post-office" 
                          size={20} 
                          color={errors.pinCode ? '#FF6B6B' : '#666'} 
                        />
                      )}
                    />
                  }
                />
                {errors.pinCode && <Text style={profileStyles.errorText}>{errors.pinCode}</Text>}
              </View>
            </View>
            </View>
          ) : (
            <View style={profileStyles.sectionCard}>
              <View style={profileStyles.sectionHeader}>
                <MaterialIcons 
                  name="pets" 
                  size={24} 
                  color="#58B9D0" 
                  style={profileStyles.sectionHeaderIcon}
                />
                <Text style={profileStyles.sectionHeaderTitle}>My Pets</Text>
                <TouchableOpacity 
                  style={profileStyles.addPetButton}
                  onPress={() => navigate('AddPet')}
                >
                  <MaterialIcons name="add" size={20} color="#58B9D0" />
                  <Text style={profileStyles.addPetButtonText}>Add Pet</Text>
                </TouchableOpacity>
              </View>
              
              <View style={profileStyles.petsSection}>
              {loadingPets ? (
                <View style={profileStyles.loadingContainer}>
                  <ActivityIndicator size="large" color="#58B9D0" />
                  <Text style={profileStyles.loadingText}>Loading pets...</Text>
                </View>
              ) : petProfiles.length > 0 ? (
                <ScrollView showsVerticalScrollIndicator={false}>
                  {petProfiles.map((pet) => (
                    <PetCard key={pet.id} pet={pet} onUpdate={fetchPetProfiles} />
                  ))}
                </ScrollView>
              ) : (
                <View style={profileStyles.emptyPetsContainer}>
                  <MaterialIcons name="pets" size={64} color="#ccc" />
                  <Text style={profileStyles.emptyPetsText}>No pets found</Text>
                  <Text style={profileStyles.emptyPetsSubtext}>Add your first pet to get started</Text>
                </View>
              )}
              </View>
            </View>
          )}
        </View>
          
        {/* Bottom Buttons Section */}
        {activeTab === 'user' && (
          <View style={profileStyles.bottomSection}>
            {/* Save Button */}
            <TouchableOpacity 
              onPress={handleSave}
              style={[
                profileStyles.commonButton,
                profileStyles.commonButtonPrimary,
                isSaving && profileStyles.loadingButton
              ]}
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="#58B9D0" />
              ) : (
                <>
                  <MaterialIcons name="save" size={20} color="#58B9D0" style={{marginRight: 8}} />
                  <Text style={[profileStyles.commonButtonText, profileStyles.commonButtonTextPrimary]}>Save Changes</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Logout Button */}
            <TouchableOpacity 
              onPress={handleLogout}
              style={[
                profileStyles.commonButton,
                profileStyles.commonButtonDanger,
                isLoggingOut && profileStyles.loadingButton
              ]}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <ActivityIndicator size="small" color="#FF6B6B" />
              ) : (
                <>
                  <MaterialIcons name="logout" size={20} color="#FF6B6B" style={{marginRight: 8}} />
                  <Text style={[profileStyles.commonButtonText, profileStyles.commonButtonTextDanger]}>Sign Out</Text>
                </>
              )}
            </TouchableOpacity>
            
            <Text style={profileStyles.versionText}>Version 1.0.0</Text>
          </View>
        )}
      </Animated.ScrollView>
    </KeyboardAvoidingView>
  );
}

// Pet Card Component
interface PetCardProps {
  pet: PetProfile;
  onUpdate: () => void;
}

const PetCard: React.FC<PetCardProps> = ({ pet, onUpdate }) => {

  return (
    <View style={profileStyles.petCard}>
      <View style={profileStyles.petCardHeader}>
        <View style={profileStyles.petImageContainer}>
          {pet.profileImg ? (
            <Image
              source={{ uri: pet.profileImg }}
              style={profileStyles.petImage}
              defaultSource={require('../../../assets/icons/googleIcon.png')}
            />
          ) : (
            <View style={[profileStyles.petImage, profileStyles.defaultPetImageContainer]}>
              <MaterialIcons name="pets" size={40} color="#58B9D0" />
            </View>
          )}
        </View>
        <View style={profileStyles.petBasicInfo}>
          <Text style={profileStyles.petName}>{pet.petName}</Text>
          <Text style={profileStyles.petCategory}>{pet.category.catName} • {pet.gender.name}</Text>
          <Text style={profileStyles.petSize}>Size: {pet.size.size}</Text>
          {pet.ageInYears !== null && pet.ageInMonths !== null && (
            <Text style={profileStyles.petAge}>
              Age: {pet.ageInYears} years {pet.ageInMonths} months
            </Text>
          )}
          {pet.weight && (
            <Text style={profileStyles.petWeight}>Weight: {pet.weight} kg</Text>
          )}
          {pet.dailyFeedCount && (
            <Text style={profileStyles.petFeedCount}>Daily Feeds: {pet.dailyFeedCount}</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => navigate('EditPet', { pet })}
          style={profileStyles.editPetButton}
        >
          <MaterialIcons 
            name="edit" 
            size={20} 
            color="#58B9D0" 
          />
        </TouchableOpacity>
      </View>

    </View>
  );
};


export default Profile;