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
import { useFocusEffect } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  launchImageLibrary,
  MediaType,
  ImagePickerResponse,
} from 'react-native-image-picker';
import ReactNativeBlobUtil from 'react-native-blob-util';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { API_CONFIG } from '../../config/api';
import signupstyles from '../SignUp/signup.styles';
import profileStyles from './profileStyles';
import serviceStyles from '../Service/styles';
import { storageService } from '../../utils/storage';
import { reset, navigate } from '../../utils/navigationService';
import googleSignInService from '../../services/googleSignInService';
import FirebaseMessagingService from '../../services/firebaseMessagingService';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {
  ProfileHeaderSkeleton,
  PersonalInfoSkeleton,
  AddressInfoSkeleton,
  PetsTabSkeleton,
} from '../../components/SkeletonLoader/SkeletonLoader';

interface PetOwner {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  mobile?: string;
  alterNo?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  pinCode?: string;
  profileImg?: string;
  pets?: string;
  lat?: number;
  lng?: number;
}

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  alterNo?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

const Profile: React.FC = () => {
  const [petOwner, setPetOwner] = useState<PetOwner>({
    userId: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    mobile: '',
    alterNo: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    pinCode: '',
    profileImg: '',
    pets: '',
    lat: 0,
    lng: 0,
  });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [alterNo, setAlterNo] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState<'user' | 'pets'>('user');
  const [petProfiles, setPetProfiles] = useState([]);
  const [loadingPets, setLoadingPets] = useState(false);
  const [petsError, setPetsError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [deletingPetId, setDeletingPetId] = useState<number | null>(null);

  // Logout handler for 401 errors
  const handleUnauthorized = async () => {
    try {
      console.log(
        '🚪 Unauthorized access detected - logging out user from Profile',
      );
      await storageService.logout();
      reset('Login'); // Reset navigation stack to Login screen
    } catch (error) {
      console.error('❌ Error during logout:', error);
      // Still navigate to login even if logout fails
      reset('Login');
    }
  };

  const clearFieldError = (fieldName: keyof ValidationErrors) => {
    if (errors[fieldName]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);

      // First try to load user data from storage
      const userData = await storageService.getUserData();

      const token = await storageService.getUserToken();

      if (!token) {
        setMessage({ type: 'error', text: 'Authentication token not found' });
        return;
      }

      console.log('Fetching profile from API...');

      const apiUrl = `${API_CONFIG.BASE_URL}/api/pet-owner/findByUserId`;

      // Generate and log CURL command for debugging
      const curlCommand = `curl --location --request GET '${apiUrl}' \\
            --header 'Content-Type: application/json' \\
            --header 'Authorization: Bearer ${token}'`;

      console.log('🔧 CURL command for fetchUserProfile:');
      console.log('=====================================');
      console.log(curlCommand);
      console.log('=====================================');

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Profile API response:', data);
        const profile = data.user || data.body || data;
        console.log(profile, 'profileprofile');

        // Store the fetched data for future use
        await storageService.setUserData(profile);

        setPetOwner(profile);
        setFirstName(profile.firstName || '');
        setLastName(profile.lastName || '');
        setEmail(profile.email || '');
        setPhoneNumber(profile.phoneNumber || profile.mobile || '');
        setAlterNo(profile.alterNo || '');
        setAddress(profile.address || '');
        setCity(profile.city || '');
        setState(profile.state || '');
        setZipCode(profile.zipCode || profile.pinCode || '');
      } else {
        const errorText = await response.text();
        console.error('Profile API error:', response.status, errorText);

        // Check for 401 Unauthorized status
        if (response.status === 401) {
          console.log('🔒 401 Unauthorized - User session expired on Profile');
          await handleUnauthorized();
          return;
        }

        setMessage({
          type: 'error',
          text: `Failed to load profile: ${response.status}`,
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setMessage({ type: 'error', text: 'Error loading profile data' });
    } finally {
      // Add a small delay to show skeleton loaders
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const fetchPetProfiles = async () => {
    try {
      setLoadingPets(true);
      setPetsError(false);
      const token = await storageService.getUserToken();

      if (!token) {
        setPetsError(true);
        return;
      }

      // First get the owner ID by calling the pet-owner API
      const ownerResponse = await fetch(
        `${API_CONFIG.BASE_URL}/api/pet-owner/findByUserId`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!ownerResponse.ok) {
        // Check for 401 Unauthorized status
        if (ownerResponse.status === 401) {
          console.log(
            '🔒 401 Unauthorized on fetchPetProfiles - User session expired',
          );
          await handleUnauthorized();
          return;
        }
        setPetsError(true);
        return;
      }

      const ownerData = await ownerResponse.json();
      if (ownerData.statusCode !== 200 || !ownerData.body?.id) {
        setPetsError(true);
        return;
      }

      console.log(ownerData, 'ownerDataownerData');

      const ownerId = ownerData.body.id;

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/api/pet-profile/owner/${ownerId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        const result = await response.json();
        if (result.statusCode === 200) {
          console.log('Pet profiles fetched:', result.body);
          setPetProfiles(result.body || []);
          setPetsError(false);
        } else {
          throw new Error(result.message || 'Failed to fetch pet profiles');
        }
      } else {
        // Check for 401 Unauthorized status
        if (response.status === 401) {
          console.log(
            '🔒 401 Unauthorized on pet profiles - User session expired',
          );
          await handleUnauthorized();
          return;
        }
        throw new Error('Failed to fetch pet profiles');
      }
    } catch (error) {
      console.error('Error fetching pet profiles:', error);
      setPetsError(true);
    } finally {
      setLoadingPets(false);
    }
  };

  // Delete pet handler - calls same pet-profile endpoint with DELETE and pet id
  const handleDeletePet = (petId: number) => {
    Alert.alert(
      'Delete Pet',
      'Are you sure you want to delete this pet? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setDeletingPetId(petId);
              const token = await storageService.getUserToken();
              if (!token) {
                setMessage({
                  type: 'error',
                  text: 'Authentication token not found',
                });
                setDeletingPetId(null);
                return;
              }

              const deleteUrl = `${API_CONFIG.BASE_URL}/api/pet-profile/${petId}`;

              // Generate and log CURL command for debugging
              const curlCommand = `curl -X DELETE "${deleteUrl}" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${token}" \\
  -v`;

              console.log('🔧 Delete Pet CURL Command:');
              console.log('=====================================');
              console.log(curlCommand);
              console.log('=====================================');

              const resp = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              });

              console.log('📡 Delete response status:', resp.status);

              if (resp.status === 401) {
                await handleUnauthorized();
                setDeletingPetId(null);
                return;
              }

              if (resp.ok || resp.status === 204) {
                // Try to parse response body if any
                try {
                  const body = await resp.json();
                  console.log('Delete pet response:', body);
                } catch (e) {
                  // ignore JSON parse errors for empty body
                }
                setMessage({
                  type: 'success',
                  text: 'Pet deleted successfully',
                });
                // Refresh list
                fetchPetProfiles();
              } else {
                const text = await resp.text();
                console.error('Failed to delete pet:', resp.status, text);
                setMessage({
                  type: 'error',
                  text: `Failed to delete pet: ${resp.status}`,
                });
              }
            } catch (err: any) {
              console.error('Error deleting pet:', err);
              setMessage({
                type: 'error',
                text: `Failed to delete pet: ${err?.message || err}`,
              });
            } finally {
              setDeletingPetId(null);
            }
          },
        },
      ],
    );
  };

  // Helper function to generate curl command for debugging
  const generateCurlCommand = (url: string, token: string, data: any) => {
    const curlCommand = `curl -X PATCH "${url}" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${token}" \\
  -d '${JSON.stringify(data, null, 2)}' \\
  -v`;

    return curlCommand;
  };

  // Image picker function for profile photo
  const pickImage = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission denied',
            'Camera permission is required to take photos.',
          );
          return;
        }
      }

      const options = {
        mediaType: 'photo' as MediaType,
        quality: 0.8,
        maxWidth: 500,
        maxHeight: 500,
      };

      launchImageLibrary(options, (response: ImagePickerResponse) => {
        if (response.didCancel || response.errorMessage) {
          return;
        }

        if (response.assets && response.assets[0]) {
          const asset = response.assets[0];
          if (asset.uri) {
            uploadProfileImage(asset.uri);
          }
        }
      });
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to open image picker');
    }
  };

  // Upload profile image function
  const uploadProfileImage = async (imageUri: string) => {
    setIsUploading(true);
    try {
      const token = await storageService.getUserToken();
      if (!token) {
        Alert.alert('Error', 'Authentication token not found');
        return;
      }

      // Generate a unique filename
      const timestamp = Date.now();
      const fileName = `profile-${timestamp}.jpg`;
      const fileType = 'image/jpeg';

      // Step 1: Get presigned URL from AWS S3
      console.log('🔄 Step 1: Getting presigned URL...');
      const presignedResponse = await fetch(
        `${API_CONFIG.BASE_URL}/api/aws-s3/presigned-url`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileType: fileType,
            fileName: fileName,
          }),
        },
      );

      if (!presignedResponse.ok) {
        throw new Error('Failed to get presigned URL');
      }

      const presignedData = await presignedResponse.json();
      console.log('✅ Presigned URL Response:', presignedData);

      // Step 2: Upload image directly to S3 using presigned URL
      if (presignedData.statusCode === 201 && presignedData.body) {
        const presignedUrl = presignedData.body;
        console.log('🔄 Step 2: Uploading image to S3...');

        // Use react-native-blob-util to upload the file
        const uploadResult = await ReactNativeBlobUtil.fetch(
          'PUT',
          presignedUrl,
          {
            'Content-Type': fileType,
          },
          ReactNativeBlobUtil.wrap(imageUri.replace('file://', '')),
        );

        if (uploadResult.info().status === 200) {
          console.log('✅ Image successfully uploaded to S3!');

          // Extract the clean S3 URL (without query parameters)
          const s3ImageUrl = presignedUrl.split('?')[0];
          console.log('📷 Final S3 Image URL:', s3ImageUrl);

          // Update local state with the new profile image
          setPetOwner(prev => ({ ...prev, profileImg: s3ImageUrl }));

          // Update user data in storage
          const userData = await storageService.getUserData();
          if (userData) {
            await storageService.setUserData({
              ...userData,
              profileImg: s3ImageUrl,
            });
          }

          setMessage({
            type: 'success',
            text: 'Profile photo updated successfully!',
          });
        } else {
          throw new Error(
            `Upload failed with status: ${uploadResult.info().status}`,
          );
        }
      } else {
        throw new Error('Invalid presigned URL response');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload profile image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsSaving(true);
      console.log('🔄 Starting profile update...');

      // Debug token retrieval
      const token = await storageService.getUserToken();
      console.log(
        '🔍 Token retrieved:',
        token ? `Present (${token.substring(0, 20)}...)` : 'Missing',
      );

      if (!token) {
        console.error('❌ No authentication token found');
        setMessage({ type: 'error', text: 'Authentication token not found' });
        return;
      }

      const updateData = {
        email: firstName.trim(),
      };

      const apiUrl = `${API_CONFIG.BASE_URL}/api/pet-owner/update-profile`;

      console.log('📝 Update data:', updateData);
      console.log('🌐 API URL:', apiUrl);
      console.log(
        '🔑 Authorization header:',
        `Bearer ${token.substring(0, 20)}...`,
      );

      // Generate and log curl command for easy testing
      const curlCommand = generateCurlCommand(apiUrl, token, updateData);
      console.log('🔧 Generated curl command for debugging:');
      console.log('=====================================');
      console.log(curlCommand);
      console.log('=====================================');

      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      console.log('📡 API Response status:', response.status, response.json());
      console.log(
        '📡 API Response headers:',
        Object.fromEntries(response.headers.entries()),
      );

      if (response.ok) {
        console.log('✅ Profile update successful');
        setMessage({ type: 'success', text: 'Profile updated successfully' });
        await fetchUserProfile();
      } else {
        console.error('❌ Profile update failed with status:', response.status);

        let errorData;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
        } else {
          errorData = { message: await response.text() };
        }

        console.error('❌ Error response data:', errorData);
        setMessage({
          type: 'error',
          text:
            errorData.message ||
            `Failed to update profile (${response.status})`,
        });
      }
    } catch (error) {
      console.error('🔥 Error updating profile:', error);
      console.error('🔥 Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      setMessage({
        type: 'error',
        text: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSaving(false);
      console.log('✅ Profile update process completed');
    }
  };

  const handleLogout = async () => {
    Alert.alert('Confirm Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            setIsLoggingOut(true);

            // Unregister FCM token before logout
            console.log('🔔 Unregistering FCM token before logout...');
            try {
              const unregistered =
                await FirebaseMessagingService.unregisterDeviceToken();
              if (unregistered) {
                console.log('✅ FCM token unregistered successfully');
              } else {
                console.log('⚠️ Failed to unregister FCM token');
              }
            } catch (error) {
              console.error('❌ Error unregistering FCM token:', error);
            }

            // Clear local storage and sign out
            await storageService.logout();
            await googleSignInService.signOut();
            reset('SignIn');
          } catch (error) {
            console.error('Logout error:', error);
            setMessage({ type: 'error', text: 'Error during logout' });
          } finally {
            setIsLoggingOut(false);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    fetchUserProfile();
    fetchPetProfiles();
  }, []);

  // Refetch pets when switching to pets tab
  useEffect(() => {
    if (activeTab === 'pets') {
      fetchPetProfiles();
    }
  }, [activeTab]);

  // Refetch pets when returning from AddPet screen
  useFocusEffect(
    React.useCallback(() => {
      if (activeTab === 'pets') {
        fetchPetProfiles();
      }
    }, [activeTab]),
  );

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (isLoading) {
    return (
      <View style={profileStyles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFFFFF"
          translucent={false}
          animated={true}
        />

        {/* Header - Service Page Style */}
        <View style={serviceStyles.stickyHeader}>
          <View style={serviceStyles.headerTitleContainer}>
            <Text style={serviceStyles.stickyHeaderTitle}>Profile</Text>
            <Text style={serviceStyles.stickyHeaderSubtitle}>
              Manage your account & pets
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: responsiveWidth(2),
            paddingTop: responsiveHeight(1),
            paddingBottom: responsiveHeight(2),
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: '#F8F9FB',
              paddingTop: responsiveHeight(2),
            }}
          >
            {/* Profile Header Skeleton */}
            <ProfileHeaderSkeleton />

            {/* Personal Information Skeleton */}
            <PersonalInfoSkeleton />

            {/* Address Information Skeleton */}
            <AddressInfoSkeleton />
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={profileStyles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
        animated={true}
      />

      {/* Header - Service Page Style */}
      <View style={serviceStyles.stickyHeader}>
        <View style={serviceStyles.headerTitleContainer}>
          <Text style={serviceStyles.stickyHeaderTitle}>Profile</Text>
          <Text style={serviceStyles.stickyHeaderSubtitle}>
            Manage your account & pets
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingTop: responsiveHeight(1),
          paddingBottom: responsiveHeight(2),
        }}
      >
        {/* Profile Info Card - Centered Layout */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            paddingVertical: responsiveHeight(2.5),
            paddingHorizontal: responsiveWidth(5),
            alignItems: 'center',
            gap: 12,
            marginHorizontal: 16,
            marginBottom: responsiveHeight(2),
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#E5E7EB',
          }}
        >
          {/* Profile Photo */}
          <TouchableOpacity
            onPress={pickImage}
            disabled={isUploading}
            style={{ position: 'relative' }}
          >
            <View style={{ position: 'relative' }}>
              {petOwner.profileImg ? (
                <Image
                  source={{ uri: petOwner.profileImg }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: '#F8F9FB',
                  }}
                />
              ) : (
                <View
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    backgroundColor: '#F8F9FB',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MaterialIcons name="person" size={40} color="#CCCCCC" />
                </View>
              )}

              {isUploading && (
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: 40,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ActivityIndicator size="small" color="#FFFFFF" />
                </View>
              )}

              {/* Camera Icon */}
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  backgroundColor: '#58B9D0',
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 2,
                  borderColor: '#FFFFFF',
                }}
              >
                <MaterialIcons name="camera-alt" size={14} color="#FFFFFF" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Profile Name */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: '#1F2937',
              textAlign: 'center',
            }}
          >
            {`${petOwner.firstName} ${petOwner.lastName}` || 'User Name'}
          </Text>

          {/* Email */}
          <Text
            style={{
              fontSize: 14,
              color: '#6B7280',
              textAlign: 'center',
            }}
          >
            {petOwner.email}
          </Text>

          {/* Verified Badge */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              backgroundColor: '#F0FDF4',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 12,
            }}
          >
            <MaterialIcons name="verified" size={16} color="#4CAF50" />
            <Text
              style={{
                fontSize: 14,
                color: '#16A34A',
                fontWeight: '500',
              }}
            >
              Verified
            </Text>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={[profileStyles.tabContainer, { marginHorizontal: 16 }]}>
          <TouchableOpacity
            style={[
              profileStyles.tabButton,
              activeTab === 'user' && profileStyles.activeTab,
            ]}
            onPress={() => setActiveTab('user')}
          >
            <MaterialIcons
              name="person"
              size={20}
              color={activeTab === 'user' ? '#FFFFFF' : '#999'}
            />
            <Text
              style={[
                profileStyles.tabText,
                activeTab === 'user' && profileStyles.activeTabText,
              ]}
            >
              User Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              profileStyles.tabButton,
              activeTab === 'pets' && profileStyles.activeTab,
            ]}
            onPress={() => setActiveTab('pets')}
          >
            <MaterialIcons
              name="pets"
              size={20}
              color={activeTab === 'pets' ? '#FFFFFF' : '#999'}
            />
            <Text
              style={[
                profileStyles.tabText,
                activeTab === 'pets' && profileStyles.activeTabText,
              ]}
            >
              My Pets
            </Text>
          </TouchableOpacity>
        </View>

        {/* User Profile Tab Content */}
        {activeTab === 'user' && (
          <View style={[profileStyles.sectionCard, { marginHorizontal: 16 }]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: responsiveHeight(2),
              }}
            >
              <View
                style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
              >
                <MaterialIcons
                  name="person-outline"
                  size={24}
                  color="#58B9D0"
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#1F2937',
                  }}
                >
                  Personal Information
                </Text>
              </View>
              {!isEditingProfile && (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#58B9D0',
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                  }}
                  onPress={() => setIsEditingProfile(true)}
                >
                  <MaterialIcons name="edit" size={16} color="#FFFFFF" />
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 14,
                      fontWeight: '600',
                    }}
                  >
                    Edit
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={profileStyles.inputGroup}>
              <TextInput
                mode="outlined"
                label="First Name"
                placeholder="Enter your first name"
                value={firstName}
                onChangeText={value => {
                  setFirstName(value);
                  clearFieldError('firstName');
                }}
                style={[
                  profileStyles.textInput,
                  errors.firstName && profileStyles.inputError,
                ]}
                theme={{
                  roundness: 12,
                  colors: {
                    primary: '#58B9D0',
                    outline: errors.firstName ? '#FF6B6B' : '#E5E7EB',
                    background: '#FFFFFF',
                  },
                }}
                error={!!errors.firstName}
                editable={isEditingProfile && !isSaving}
                left={<TextInput.Icon icon="account" iconColor="#58B9D0" />}
              />
              {errors.firstName && (
                <Text style={profileStyles.errorText}>{errors.firstName}</Text>
              )}

              <TextInput
                mode="outlined"
                label="Last Name"
                placeholder="Enter your last name"
                value={lastName}
                onChangeText={value => {
                  setLastName(value);
                  clearFieldError('lastName');
                }}
                style={[
                  profileStyles.textInput,
                  errors.lastName && profileStyles.inputError,
                ]}
                theme={{
                  roundness: 12,
                  colors: {
                    primary: '#58B9D0',
                    outline: errors.lastName ? '#FF6B6B' : '#E5E7EB',
                    background: '#FFFFFF',
                  },
                }}
                error={!!errors.lastName}
                editable={isEditingProfile && !isSaving}
                left={<TextInput.Icon icon="account" iconColor="#58B9D0" />}
              />
              {errors.lastName && (
                <Text style={profileStyles.errorText}>{errors.lastName}</Text>
              )}

              <TextInput
                mode="outlined"
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={value => {
                  setEmail(value);
                  clearFieldError('email');
                }}
                style={[
                  profileStyles.textInput,
                  errors.email && profileStyles.inputError,
                ]}
                theme={{
                  roundness: 12,
                  colors: {
                    primary: '#58B9D0',
                    outline: errors.email ? '#FF6B6B' : '#E5E7EB',
                    background: '#FFFFFF',
                  },
                }}
                error={!!errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={isEditingProfile && !isSaving}
                left={<TextInput.Icon icon="email" iconColor="#58B9D0" />}
              />
              {errors.email && (
                <Text style={profileStyles.errorText}>{errors.email}</Text>
              )}

              <TextInput
                mode="outlined"
                label="Phone Number"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChangeText={value => {
                  setPhoneNumber(value);
                  clearFieldError('phoneNumber');
                }}
                style={[
                  profileStyles.textInput,
                  errors.phoneNumber && profileStyles.inputError,
                ]}
                theme={{
                  roundness: 12,
                  colors: {
                    primary: '#58B9D0',
                    outline: errors.phoneNumber ? '#FF6B6B' : '#E5E7EB',
                    background: '#FFFFFF',
                  },
                }}
                error={!!errors.phoneNumber}
                keyboardType="phone-pad"
                editable={isEditingProfile && !isSaving}
                left={<TextInput.Icon icon="phone" iconColor="#58B9D0" />}
              />
              {errors.phoneNumber && (
                <Text style={profileStyles.errorText}>
                  {errors.phoneNumber}
                </Text>
              )}

              <TextInput
                mode="outlined"
                label="Alternative Phone Number"
                placeholder="Enter alternative phone number"
                value={alterNo}
                onChangeText={value => {
                  setAlterNo(value);
                  clearFieldError('alterNo');
                }}
                style={[
                  profileStyles.textInput,
                  errors.alterNo && profileStyles.inputError,
                ]}
                theme={{
                  roundness: 12,
                  colors: {
                    primary: '#58B9D0',
                    outline: errors.alterNo ? '#FF6B6B' : '#E5E7EB',
                    background: '#FFFFFF',
                  },
                }}
                error={!!errors.alterNo}
                keyboardType="phone-pad"
                editable={isEditingProfile && !isSaving}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons name="phone" size={24} color="#58B9D0" />
                    )}
                  />
                }
              />
              {errors.alterNo && (
                <Text style={profileStyles.errorText}>{errors.alterNo}</Text>
              )}
            </View>
          </View>
        )}

        {/* Address Section */}
        {activeTab === 'user' && (
          <View style={[profileStyles.sectionCard, { marginHorizontal: 16 }]}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: responsiveHeight(2),
              }}
            >
              <MaterialIcons
                name="location-on"
                size={24}
                color="#58B9D0"
                style={{ marginRight: 10 }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#1F2937',
                }}
              >
                Address Information
              </Text>
            </View>

            <View style={profileStyles.inputGroup}>
              <TextInput
                mode="outlined"
                label="Address"
                placeholder="Enter your address"
                value={address}
                onChangeText={value => {
                  setAddress(value);
                  clearFieldError('address');
                }}
                style={[
                  profileStyles.textInput,
                  errors.address && profileStyles.inputError,
                ]}
                theme={{
                  roundness: 12,
                  colors: {
                    primary: '#58B9D0',
                    outline: errors.address ? '#FF6B6B' : '#E5E7EB',
                    background: '#FFFFFF',
                  },
                }}
                error={!!errors.address}
                editable={isEditingProfile && !isSaving}
                left={<TextInput.Icon icon="home" iconColor="#58B9D0" />}
              />
              {errors.address && (
                <Text style={profileStyles.errorText}>{errors.address}</Text>
              )}

              <TextInput
                mode="outlined"
                label="City"
                placeholder="Enter your city"
                value={city}
                onChangeText={value => {
                  setCity(value);
                  clearFieldError('city');
                }}
                style={[
                  profileStyles.textInput,
                  errors.city && profileStyles.inputError,
                ]}
                theme={{
                  roundness: 12,
                  colors: {
                    primary: '#58B9D0',
                    outline: errors.city ? '#FF6B6B' : '#E5E7EB',
                    background: '#FFFFFF',
                  },
                }}
                error={!!errors.city}
                editable={isEditingProfile && !isSaving}
                left={<TextInput.Icon icon="domain" iconColor="#58B9D0" />}
              />
              {errors.city && (
                <Text style={profileStyles.errorText}>{errors.city}</Text>
              )}

              <TextInput
                mode="outlined"
                label="State"
                placeholder="Enter your state"
                value={state}
                onChangeText={value => {
                  setState(value);
                  clearFieldError('state');
                }}
                style={[
                  profileStyles.textInput,
                  errors.state && profileStyles.inputError,
                ]}
                theme={{
                  roundness: 12,
                  colors: {
                    primary: '#58B9D0',
                    outline: errors.state ? '#FF6B6B' : '#E5E7EB',
                    background: '#FFFFFF',
                  },
                }}
                error={!!errors.state}
                editable={isEditingProfile && !isSaving}
                left={<TextInput.Icon icon="map" iconColor="#58B9D0" />}
              />
              {errors.state && (
                <Text style={profileStyles.errorText}>{errors.state}</Text>
              )}

              <TextInput
                mode="outlined"
                label="Zip Code"
                placeholder="Enter your zip code"
                value={zipCode}
                onChangeText={value => {
                  setZipCode(value);
                  clearFieldError('zipCode');
                }}
                style={[
                  profileStyles.textInput,
                  errors.zipCode && profileStyles.inputError,
                ]}
                theme={{
                  roundness: 12,
                  colors: {
                    primary: '#58B9D0',
                    outline: errors.zipCode ? '#FF6B6B' : '#E5E7EB',
                    background: '#FFFFFF',
                  },
                }}
                error={!!errors.zipCode}
                keyboardType="numeric"
                editable={isEditingProfile && !isSaving}
                left={<TextInput.Icon icon="mailbox" iconColor="#58B9D0" />}
              />
              {errors.zipCode && (
                <Text style={profileStyles.errorText}>{errors.zipCode}</Text>
              )}
            </View>
          </View>
        )}

        {/* Pets Tab Content */}
        {activeTab === 'pets' && (
          <View style={[profileStyles.sectionCard, { marginHorizontal: 16 }]}>
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
                <MaterialIcons name="add" size={16} color="#FFFFFF" />
                <Text style={profileStyles.addPetButtonText}>Add Pet</Text>
              </TouchableOpacity>
            </View>

            {loadingPets ? (
              <PetsTabSkeleton />
            ) : petsError ? (
              <View
                style={{
                  backgroundColor: '#FFF5F5',
                  borderRadius: 16,
                  borderWidth: 1.5,
                  borderColor: '#FEB2B2',
                  padding: responsiveWidth(6),
                  alignItems: 'center',
                  marginTop: responsiveHeight(2),
                }}
              >
                <View
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 32,
                    backgroundColor: '#FED7D7',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 16,
                  }}
                >
                  <MaterialIcons
                    name="error-outline"
                    size={32}
                    color="#F56565"
                  />
                </View>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#C53030',
                    marginBottom: 8,
                    textAlign: 'center',
                  }}
                >
                  Unable to Load Pets
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    color: '#742A2A',
                    marginBottom: 20,
                    textAlign: 'center',
                    lineHeight: 20,
                  }}
                >
                  We couldn't fetch your pet profiles.{'\n'}
                  Please check your connection and try again.
                </Text>

                <TouchableOpacity
                  onPress={fetchPetProfiles}
                  style={{
                    backgroundColor: '#F56565',
                    paddingVertical: 12,
                    paddingHorizontal: 24,
                    borderRadius: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    elevation: 2,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                  }}
                >
                  <MaterialIcons name="refresh" size={20} color="#FFFFFF" />
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 16,
                      fontWeight: '600',
                    }}
                  >
                    Try Again
                  </Text>
                </TouchableOpacity>
              </View>
            ) : petProfiles.length === 0 ? (
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#E2E2E2',
                  padding: responsiveWidth(6),
                  alignItems: 'center',
                  marginTop: responsiveHeight(2),
                }}
              >
                <MaterialIcons name="pets" size={40} color="#ccc" />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#999',
                    marginTop: 12,
                    textAlign: 'center',
                  }}
                >
                  No pets added yet
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#ccc',
                    marginTop: 4,
                    textAlign: 'center',
                  }}
                >
                  Add your first pet to get started
                </Text>
              </View>
            ) : (
              <View
                style={{
                  gap: responsiveHeight(1.5),
                  marginTop: responsiveHeight(1),
                }}
              >
                {petProfiles.map((pet, index) => (
                  <TouchableOpacity
                    key={pet.id || index}
                    onPress={() => navigate('EditPet', { pet })}
                    activeOpacity={0.8}
                  >
                    <View
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: '#E5E7EB',
                        overflow: 'hidden',
                      }}
                    >
                      <View
                        style={{
                          paddingVertical: responsiveHeight(1.2),
                          paddingHorizontal: responsiveWidth(3),
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        {/* Compact Avatar */}
                        <View
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 24,
                            marginRight: responsiveWidth(3),
                            overflow: 'hidden',
                            borderWidth: 1,
                            borderColor: '#E5E7EB',
                          }}
                        >
                          {pet.profileImg ? (
                            <Image
                              source={{ uri: pet.profileImg }}
                              style={{ width: '100%', height: '100%' }}
                              resizeMode="cover"
                            />
                          ) : (
                            <View
                              style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: 'rgba(88, 185, 208, 0.08)',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <MaterialIcons
                                name="pets"
                                size={22}
                                color="#58B9D0"
                              />
                            </View>
                          )}
                        </View>

                        {/* Pet Info */}
                        <View style={{ flex: 1 }}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 15,
                              fontWeight: '700',
                              color: '#1F2937',
                            }}
                          >
                            {pet.petName || 'Unnamed Pet'}
                          </Text>

                          <View
                            style={{
                              flexDirection: 'row',
                              gap: 6,
                              marginTop: 6,
                              flexWrap: 'wrap',
                            }}
                          >
                            {pet.category?.catName && (
                              <View
                                style={{
                                  backgroundColor: '#E0F2FE',
                                  paddingHorizontal: 10,
                                  paddingVertical: 4,
                                  borderRadius: 12,
                                  borderWidth: 1,
                                  borderColor: '#BAE6FD',
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: '600',
                                    color: '#0369A1',
                                    textTransform: 'capitalize',
                                  }}
                                >
                                  {pet.category.catName}
                                </Text>
                              </View>
                            )}
                            {pet.size?.size && (
                              <View
                                style={{
                                  backgroundColor: '#F0FDF4',
                                  paddingHorizontal: 10,
                                  paddingVertical: 4,
                                  borderRadius: 12,
                                  borderWidth: 1,
                                  borderColor: '#BBF7D0',
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: 11,
                                    fontWeight: '600',
                                    color: '#15803D',
                                    textTransform: 'capitalize',
                                  }}
                                >
                                  {pet.size.size}
                                </Text>
                              </View>
                            )}
                          </View>
                        </View>

                        {/* Actions: Edit + Delete */}
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => navigate('EditPet', { pet })}
                            style={{
                              backgroundColor: '#58B9D0',
                              width: 36,
                              height: 36,
                              borderRadius: 18,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <MaterialIcons
                              name="edit"
                              size={18}
                              color="#FFFFFF"
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => handleDeletePet(pet.id)}
                            style={{
                              backgroundColor: '#FEE2E2',
                              width: 36,
                              height: 36,
                              borderRadius: 18,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {deletingPetId === pet.id ? (
                              <ActivityIndicator size="small" color="#DC2626" />
                            ) : (
                              <MaterialIcons
                                name="delete"
                                size={18}
                                color="#DC2626"
                              />
                            )}
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Message Display */}
        {message && (
          <View style={[profileStyles.sectionCard, { marginHorizontal: 16 }]}>
            <View
              style={[
                signupstyles.messageContainer,
                message.type === 'success'
                  ? signupstyles.successMessage
                  : signupstyles.errorMessage,
              ]}
            >
              <Text style={signupstyles.messageText}>{message.text}</Text>
            </View>
          </View>
        )}

        {/* Action Buttons - Conditional based on tab and edit mode */}
        {activeTab === 'user' && isEditingProfile && (
          <View
            style={{
              marginHorizontal: 16,
              flexDirection: 'row',
              gap: 12,
              marginTop: responsiveHeight(2),
              marginBottom: responsiveHeight(1),
            }}
          >
            {/* Save Button */}
            <TouchableOpacity
              onPress={() => {
                handleSave();
                setIsEditingProfile(false);
              }}
              style={[
                profileStyles.commonButton,
                profileStyles.commonButtonPrimary,
                { flex: 1 },
                isSaving && { opacity: 0.7 },
              ]}
              disabled={isSaving}
            >
              {isSaving ? (
                <View style={profileStyles.loadingContainer}>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text
                    style={[
                      profileStyles.commonButtonText,
                      profileStyles.commonButtonTextPrimary,
                    ]}
                  >
                    Saving...
                  </Text>
                </View>
              ) : (
                <>
                  <MaterialIcons
                    name="save"
                    size={20}
                    color="#FFFFFF"
                    style={profileStyles.commonButtonIcon}
                  />
                  <Text
                    style={[
                      profileStyles.commonButtonText,
                      profileStyles.commonButtonTextPrimary,
                    ]}
                  >
                    Save Changes
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
              onPress={() => {
                setIsEditingProfile(false);
                // Reset form values
                fetchUserProfile();
              }}
              style={[
                profileStyles.commonButton,
                {
                  flex: 1,
                  backgroundColor: 'transparent',
                  borderWidth: 1.5,
                  borderColor: '#6B7280',
                },
              ]}
            >
              <MaterialIcons
                name="close"
                size={20}
                color="#6B7280"
                style={profileStyles.commonButtonIcon}
              />
              <Text
                style={[profileStyles.commonButtonText, { color: '#6B7280' }]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Logout Button - Always visible */}
        <View
          style={[
            profileStyles.actionButtonsContainer,
            { marginHorizontal: 16 },
          ]}
        >
          <TouchableOpacity
            onPress={handleLogout}
            style={[
              profileStyles.commonButton,
              profileStyles.commonButtonDanger,
              isLoggingOut && { opacity: 0.7 },
            ]}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? (
              <View style={profileStyles.loadingContainer}>
                <ActivityIndicator size="small" color="#FFFFFF" />
                <Text
                  style={[
                    profileStyles.commonButtonText,
                    profileStyles.commonButtonTextDanger,
                  ]}
                >
                  Signing Out...
                </Text>
              </View>
            ) : (
              <>
                <MaterialIcons
                  name="logout"
                  size={20}
                  color="#FFFFFF"
                  style={profileStyles.commonButtonIcon}
                />
                <Text
                  style={[
                    profileStyles.commonButtonText,
                    profileStyles.commonButtonTextDanger,
                  ]}
                >
                  Sign Out
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
