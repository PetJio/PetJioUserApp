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

interface PetOwner {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  profileImg?: string;
}

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
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
    address: '',
    city: '',
    state: '',
    zipCode: '',
    profileImg: '',
  });

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
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
  const [isUploading, setIsUploading] = useState(false);

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

      if (userData) {
        console.log('Loading profile from storage:', userData);
        setPetOwner(userData);
        setFirstName(userData.firstName || '');
        setLastName(userData.lastName || '');
        setEmail(userData.email || '');
        setPhoneNumber(userData.phoneNumber || userData.mobile || '');
        setAddress(userData.address || '');
        setCity(userData.city || '');
        setState(userData.state || '');
        setZipCode(userData.zipCode || userData.pinCode || '');
        return;
      }

      // If no user data in storage, try to fetch from API
      const token = await storageService.getUserToken();

      if (!token) {
        setMessage({ type: 'error', text: 'Authentication token not found' });
        return;
      }

      console.log('Fetching profile from API...');
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/user/profile`, {
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

        // Store the fetched data for future use
        await storageService.setUserData(profile);

        setPetOwner(profile);
        setFirstName(profile.firstName || '');
        setLastName(profile.lastName || '');
        setEmail(profile.email || '');
        setPhoneNumber(profile.phoneNumber || profile.mobile || '');
        setAddress(profile.address || '');
        setCity(profile.city || '');
        setState(profile.state || '');
        setZipCode(profile.zipCode || profile.pinCode || '');
      } else {
        const errorText = await response.text();
        console.error('Profile API error:', response.status, errorText);
        setMessage({
          type: 'error',
          text: `Failed to load profile: ${response.status}`,
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setMessage({ type: 'error', text: 'Error loading profile data' });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPetProfiles = async () => {
    try {
      setLoadingPets(true);
      const token = await storageService.getUserToken();

      if (!token) {
        setMessage({ type: 'error', text: 'Authentication token not found' });
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
        setMessage({ type: 'error', text: 'Failed to get owner information' });
        return;
      }

      const ownerData = await ownerResponse.json();
      if (ownerData.statusCode !== 200 || !ownerData.body?.id) {
        setMessage({ type: 'error', text: 'Owner ID not found' });
        return;
      }

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
        } else {
          throw new Error(result.message || 'Failed to fetch pet profiles');
        }
      } else {
        throw new Error('Failed to fetch pet profiles');
      }
    } catch (error) {
      console.error('Error fetching pet profiles:', error);
      setMessage({ type: 'error', text: 'Failed to load pet profiles' });
    } finally {
      setLoadingPets(false);
    }
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
          Alert.alert('Permission denied', 'Camera permission is required to take photos.');
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
      const formData = new FormData();
      formData.append('profileImg', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'profile.jpg',
      } as any);

      const token = await storageService.getUserToken();
      if (!token) {
        Alert.alert('Error', 'Authentication token not found');
        return;
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/pet-owner/upload-profile-image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.statusCode === 200) {
          setPetOwner(prev => ({ ...prev, profileImg: result.body.profileImg }));
          setMessage({ type: 'success', text: 'Profile image updated successfully!' });
        } else {
          throw new Error(result.message || 'Failed to upload image');
        }
      } else {
        throw new Error('Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload profile image');
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
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phoneNumber: phoneNumber.trim(),
        address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        zipCode: zipCode.trim(),
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
              const unregistered = await FirebaseMessagingService.unregisterDeviceToken();
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
    }, [activeTab])
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

        {/* Modern Header */}
        <View style={profileStyles.stickyHeader}>
          <View style={profileStyles.headerTitleContainer}>
            <Text style={profileStyles.headerTitle}>Profile</Text>
            <Text style={profileStyles.headerSubtitle}>
              Manage your account & pets
            </Text>
          </View>
        </View>

        <View style={profileStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#58B9D0" />
          <Text style={profileStyles.loadingText}>
            Loading profile...
          </Text>
        </View>
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
          paddingHorizontal: responsiveWidth(2),
          paddingTop: responsiveHeight(1),
          paddingBottom: responsiveHeight(2),
        }}
      >
        {/* Profile Info Card */}
        <View style={profileStyles.sectionCard}>
          <View style={profileStyles.profileInfoHeader}>
            <TouchableOpacity
              style={profileStyles.profilePhotoButton}
              onPress={pickImage}
              disabled={isUploading}
            >
              <View style={profileStyles.compactProfilePhotoWrapper}>
                {petOwner.profileImg ? (
                  <Image
                    source={{ uri: petOwner.profileImg }}
                    style={profileStyles.compactProfilePhoto}
                  />
                ) : (
                  <View style={profileStyles.compactProfilePhoto}>
                    <MaterialIcons name="person" size={40} color="#CCCCCC" />
                  </View>
                )}

                {isUploading && (
                  <View style={profileStyles.compactUploadingOverlay}>
                    <ActivityIndicator size="small" color="#58B9D0" />
                  </View>
                )}

                <View style={profileStyles.compactCameraIcon}>
                  <MaterialIcons name="camera-alt" size={14} color="#FFFFFF" />
                </View>
              </View>
            </TouchableOpacity>

            <View style={profileStyles.profileInfoText}>
              <Text style={profileStyles.compactUserName}>
                {`${petOwner.firstName} ${petOwner.lastName}` || 'User Name'}
              </Text>
              <Text style={profileStyles.compactUserEmail}>{petOwner.email}</Text>
              <View style={profileStyles.compactVerifiedBadge}>
                <MaterialIcons name="verified" size={14} color="#4CAF50" />
                <Text style={profileStyles.compactVerifiedText}>Verified</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={profileStyles.tabContainer}>
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
              <View style={profileStyles.sectionCard}>
                <View style={profileStyles.sectionHeader}>
                  <MaterialIcons
                    name="person-outline"
                    size={24}
                    color="#58B9D0"
                    style={profileStyles.sectionHeaderIcon}
                  />
                  <Text style={profileStyles.sectionHeaderTitle}>Personal Information</Text>
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
                    style={[profileStyles.textInput, errors.firstName && profileStyles.inputError]}
                    theme={{
                      roundness: 12,
                      colors: {
                        primary: '#58B9D0',
                        outline: errors.firstName ? '#FF6B6B' : '#E5E7EB',
                        background: '#FFFFFF',
                      },
                    }}
                    error={!!errors.firstName}
                    editable={!isSaving}
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
                    style={[profileStyles.textInput, errors.lastName && profileStyles.inputError]}
                    theme={{
                      roundness: 12,
                      colors: {
                        primary: '#58B9D0',
                        outline: errors.lastName ? '#FF6B6B' : '#E5E7EB',
                        background: '#FFFFFF',
                      },
                    }}
                    error={!!errors.lastName}
                    editable={!isSaving}
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
                    style={[profileStyles.textInput, errors.email && profileStyles.inputError]}
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
                    editable={!isSaving}
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
                    style={[profileStyles.textInput, errors.phoneNumber && profileStyles.inputError]}
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
                  editable={!isSaving}
                  left={<TextInput.Icon icon="phone" iconColor="#58B9D0" />}
                />
                {errors.phoneNumber && (
                  <Text style={profileStyles.errorText}>
                    {errors.phoneNumber}
                  </Text>
                )}
                </View>
              </View>
            )}

            {/* Address Section */}
            {activeTab === 'user' && (
              <View style={profileStyles.sectionCard}>
                <View style={profileStyles.sectionHeader}>
                  <MaterialIcons
                    name="location-on"
                    size={24}
                    color="#58B9D0"
                    style={profileStyles.sectionHeaderIcon}
                  />
                  <Text style={profileStyles.sectionHeaderTitle}>Address Information</Text>
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
                    style={[profileStyles.textInput, errors.address && profileStyles.inputError]}
                    theme={{
                      roundness: 12,
                      colors: {
                        primary: '#58B9D0',
                        outline: errors.address ? '#FF6B6B' : '#E5E7EB',
                        background: '#FFFFFF',
                      },
                    }}
                    error={!!errors.address}
                    editable={!isSaving}
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
                    style={[profileStyles.textInput, errors.city && profileStyles.inputError]}
                    theme={{
                      roundness: 12,
                      colors: {
                        primary: '#58B9D0',
                        outline: errors.city ? '#FF6B6B' : '#E5E7EB',
                        background: '#FFFFFF',
                      },
                    }}
                    error={!!errors.city}
                    editable={!isSaving}
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
                    style={[profileStyles.textInput, errors.state && profileStyles.inputError]}
                    theme={{
                      roundness: 12,
                      colors: {
                        primary: '#58B9D0',
                        outline: errors.state ? '#FF6B6B' : '#E5E7EB',
                        background: '#FFFFFF',
                      },
                    }}
                    error={!!errors.state}
                    editable={!isSaving}
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
                    style={[profileStyles.textInput, errors.zipCode && profileStyles.inputError]}
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
                  editable={!isSaving}
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
                    <MaterialIcons name="add" size={16} color="#FFFFFF" />
                    <Text style={profileStyles.addPetButtonText}>Add Pet</Text>
                  </TouchableOpacity>
                </View>

                {loadingPets ? (
                  <View
                    style={{
                      padding: responsiveHeight(3),
                      alignItems: 'center',
                    }}
                  >
                    <ActivityIndicator size="large" color="#58B9D0" />
                    <Text style={{ marginTop: 10, color: '#666' }}>
                      Loading pets...
                    </Text>
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
                  <View style={{
                    gap: responsiveHeight(1.5),
                    marginTop: responsiveHeight(1)
                  }}>
                    {petProfiles.map((pet, index) => (
                      <View
                        key={pet.id || index}
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: 16,
                          borderWidth: 1,
                          borderColor: '#E5E7EB',
                          padding: responsiveWidth(4),
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        {/* Pet Avatar */}
                        <View
                          style={{
                            width: 64,
                            height: 64,
                            borderRadius: 32,
                            backgroundColor: 'rgba(88, 185, 208, 0.1)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: responsiveWidth(4),
                          }}
                        >
                          <MaterialIcons name="pets" size={32} color="#58B9D0" />
                        </View>

                        {/* Pet Info */}
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: '600',
                              color: '#1F2937',
                              marginBottom: 4,
                            }}
                          >
                            {pet.petName || 'Unnamed Pet'}
                          </Text>

                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 4,
                          }}>
                            <MaterialIcons name="category" size={16} color="#6B7280" />
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#6B7280',
                                marginLeft: 6,
                              }}
                            >
                              {pet.category?.catName || 'Unknown Category'}
                            </Text>
                          </View>

                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                            <MaterialIcons name="straighten" size={16} color="#6B7280" />
                            <Text
                              style={{
                                fontSize: 14,
                                color: '#6B7280',
                                marginLeft: 6,
                              }}
                            >
                              {pet.size?.size || 'Unknown Size'}
                            </Text>
                          </View>
                        </View>

                        {/* Edit Button */}
                        <TouchableOpacity
                          onPress={() => navigate('EditPet', { pet })}
                          style={{
                            backgroundColor: '#58B9D0',
                            paddingVertical: 10,
                            paddingHorizontal: 16,
                            borderRadius: 8,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <MaterialIcons name="edit" size={18} color="#FFFFFF" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}

        {/* Message Display */}
        {message && (
          <View style={profileStyles.sectionCard}>
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

        {/* Action Buttons - Always visible */}
        <View style={profileStyles.actionButtonsContainer}>
          {/* Save Button */}
          <TouchableOpacity
            onPress={handleSave}
            style={[
              profileStyles.commonButton,
              profileStyles.commonButtonPrimary,
              isSaving && { opacity: 0.7 },
            ]}
            disabled={isSaving}
          >
            {isSaving ? (
              <View style={profileStyles.loadingContainer}>
                <ActivityIndicator size="small" color="#FFFFFF" />
                <Text style={[profileStyles.commonButtonText, profileStyles.commonButtonTextPrimary]}>
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
                <Text style={[profileStyles.commonButtonText, profileStyles.commonButtonTextPrimary]}>
                  Save Changes
                </Text>
              </>
            )}
          </TouchableOpacity>

          {/* Logout Button */}
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
                <Text style={[profileStyles.commonButtonText, profileStyles.commonButtonTextDanger]}>
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
                <Text style={[profileStyles.commonButtonText, profileStyles.commonButtonTextDanger]}>
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
