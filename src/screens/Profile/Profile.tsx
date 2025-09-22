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
import signupstyles from '../SignUp/signup.styles';
import profileStyles from './profileStyles';
import serviceStyles from '../Service/styles';
import { storageService } from '../../utils/storage';
import { reset, navigate } from '../../utils/navigationService';
import googleSignInService from '../../services/googleSignInService';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

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
    profileImg: ''
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
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState<'user' | 'pets'>('user');
  const [petProfiles, setPetProfiles] = useState([]);
  const [loadingPets, setLoadingPets] = useState(false);

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
        setMessage({type: 'error', text: 'Authentication token not found'});
        return;
      }

      console.log('Fetching profile from API...');
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/user/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
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
        setMessage({type: 'error', text: `Failed to load profile: ${response.status}`});
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setMessage({type: 'error', text: 'Error loading profile data'});
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPetProfiles = async () => {
    try {
      setLoadingPets(true);
      const token = await storageService.getUserToken();

      if (!token) {
        setMessage({type: 'error', text: 'Authentication token not found'});
        return;
      }

      // First get the owner ID by calling the pet-owner API
      const ownerResponse = await fetch(`${API_CONFIG.BASE_URL}/api/pet-owner/findByUserId`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!ownerResponse.ok) {
        setMessage({type: 'error', text: 'Failed to get owner information'});
        return;
      }

      const ownerData = await ownerResponse.json();
      if (ownerData.statusCode !== 200 || !ownerData.body?.id) {
        setMessage({type: 'error', text: 'Owner ID not found'});
        return;
      }

      const ownerId = ownerData.body.id;

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/pet-profile/owner/${ownerId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.statusCode === 200) {
          setPetProfiles(result.body || []);
        } else {
          throw new Error(result.message || 'Failed to fetch pet profiles');
        }
      } else {
        throw new Error('Failed to fetch pet profiles');
      }
    } catch (error) {
      console.error('Error fetching pet profiles:', error);
      setMessage({type: 'error', text: 'Failed to load pet profiles'});
    } finally {
      setLoadingPets(false);
    }
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsSaving(true);
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        setMessage({type: 'error', text: 'Authentication token not found'});
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

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/user/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        setMessage({type: 'success', text: 'Profile updated successfully'});
        await fetchUserProfile();
      } else {
        const errorData = await response.json();
        setMessage({type: 'error', text: errorData.message || 'Failed to update profile'});
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({type: 'error', text: 'Error updating profile'});
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoggingOut(true);
              await storageService.logout();
              await googleSignInService.signOut();
              reset('SignIn');
            } catch (error) {
              console.error('Logout error:', error);
              setMessage({type: 'error', text: 'Error during logout'});
            } finally {
              setIsLoggingOut(false);
            }
          }
        }
      ]
    );
  };

  useEffect(() => {
    fetchUserProfile();
    fetchPetProfiles();
  }, []);

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
      <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
        
        {/* Sticky Header */}
        <View style={serviceStyles.stickyHeader}>
          <View style={serviceStyles.headerTitleContainer}>
            <Text style={serviceStyles.stickyHeaderTitle}>Profile</Text>
            <Text style={serviceStyles.stickyHeaderSubtitle}>Manage your account</Text>
          </View>
        </View>
        
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#58B9D0" />
          <Text style={{marginTop: 16, color: '#666'}}>Loading profile...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
      
      {/* Sticky Header */}
      <View style={serviceStyles.stickyHeader}>
        <View style={serviceStyles.headerTitleContainer}>
          <Text style={serviceStyles.stickyHeaderTitle}>Profile</Text>
          <Text style={serviceStyles.stickyHeaderSubtitle}>Manage your account</Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: responsiveWidth(4),
          backgroundColor: '#F8F9FB',
        }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: responsiveHeight(5),
            flexGrow: 1,
          }}
        >
          <View style={{
            paddingTop: responsiveHeight(2),
            paddingBottom: responsiveHeight(2),
          }}>
            {message && (
              <View style={[
                signupstyles.messageContainer,
                message.type === 'success' ? signupstyles.successMessage : signupstyles.errorMessage
              ]}>
                <Text style={signupstyles.messageText}>{message.text}</Text>
              </View>
            )}

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
              ]}>My Pets</Text>
            </TouchableOpacity>
          </View>

          {/* User Profile Tab Content */}
          {activeTab === 'user' && (
            <View style={{
              gap: responsiveHeight(1.5),
              paddingVertical: responsiveHeight(1),
            }}>
              <TextInput
                mode="outlined"
                label="First Name"
                placeholder="Enter your first name"
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
                editable={!isSaving}
              />
              {errors.firstName && <Text style={signupstyles.errorText}>{errors.firstName}</Text>}

              <TextInput
                mode="outlined"
                label="Last Name"
                placeholder="Enter your last name"
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
                editable={!isSaving}
              />
              {errors.lastName && <Text style={signupstyles.errorText}>{errors.lastName}</Text>}

              <TextInput
                mode="outlined"
                label="Email"
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
                editable={!isSaving}
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
                editable={!isSaving}
              />
              {errors.phoneNumber && <Text style={signupstyles.errorText}>{errors.phoneNumber}</Text>}

              <TextInput
                mode="outlined"
                label="Address"
                placeholder="Enter your address"
                value={address}
                onChangeText={(value) => {
                  setAddress(value);
                  clearFieldError('address');
                }}
                theme={{ 
                  roundness: 12,
                  colors: { primary: '#58B9D0', outline: errors.address ? '#FF6B6B' : '#E2E2E2' }
                }}
                error={!!errors.address}
                editable={!isSaving}
              />
              {errors.address && <Text style={signupstyles.errorText}>{errors.address}</Text>}

              <TextInput
                mode="outlined"
                label="City"
                placeholder="Enter your city"
                value={city}
                onChangeText={(value) => {
                  setCity(value);
                  clearFieldError('city');
                }}
                theme={{ 
                  roundness: 12,
                  colors: { primary: '#58B9D0', outline: errors.city ? '#FF6B6B' : '#E2E2E2' }
                }}
                error={!!errors.city}
                editable={!isSaving}
              />
              {errors.city && <Text style={signupstyles.errorText}>{errors.city}</Text>}

              <TextInput
                mode="outlined"
                label="State"
                placeholder="Enter your state"
                value={state}
                onChangeText={(value) => {
                  setState(value);
                  clearFieldError('state');
                }}
                theme={{ 
                  roundness: 12,
                  colors: { primary: '#58B9D0', outline: errors.state ? '#FF6B6B' : '#E2E2E2' }
                }}
                error={!!errors.state}
                editable={!isSaving}
              />
              {errors.state && <Text style={signupstyles.errorText}>{errors.state}</Text>}

              <TextInput
                mode="outlined"
                label="Zip Code"
                placeholder="Enter your zip code"
                value={zipCode}
                onChangeText={(value) => {
                  setZipCode(value);
                  clearFieldError('zipCode');
                }}
                theme={{ 
                  roundness: 12,
                  colors: { primary: '#58B9D0', outline: errors.zipCode ? '#FF6B6B' : '#E2E2E2' }
                }}
                error={!!errors.zipCode}
                keyboardType="numeric"
                editable={!isSaving}
              />
              {errors.zipCode && <Text style={signupstyles.errorText}>{errors.zipCode}</Text>}
            </View>
          )}

          {/* Pets Tab Content */}
          {activeTab === 'pets' && (
            <View style={{ paddingVertical: responsiveHeight(1) }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: responsiveHeight(1.5),
                paddingHorizontal: responsiveWidth(1),
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialIcons 
                    name="pets" 
                    size={20} 
                    color="#58B9D0" 
                    style={{ marginRight: 8 }}
                  />
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#333',
                  }}>My Pets</Text>
                </View>
                <TouchableOpacity 
                  style={{
                    backgroundColor: '#58B9D0',
                    paddingVertical: responsiveHeight(1.2),
                    paddingHorizontal: responsiveWidth(4),
                    borderRadius: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={() => navigate('AddPet')}
                >
                  <MaterialIcons name="add" size={18} color="#FFFFFF" style={{marginRight: 4}} />
                  <Text style={{
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: '600',
                    color: '#FFFFFF',
                  }}>Add Pet</Text>
                </TouchableOpacity>
              </View>

              {loadingPets ? (
                <View style={{padding: responsiveHeight(3), alignItems: 'center'}}>
                  <ActivityIndicator size="large" color="#58B9D0" />
                  <Text style={{marginTop: 10, color: '#666'}}>Loading pets...</Text>
                </View>
              ) : petProfiles.length === 0 ? (
                <View style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  padding: responsiveWidth(6),
                  alignItems: 'center',
                  marginTop: responsiveHeight(2),
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 2,
                  elevation: 2,
                }}>
                  <MaterialIcons name="pets" size={40} color="#ccc" />
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#999',
                    marginTop: 12,
                    textAlign: 'center',
                  }}>No pets added yet</Text>
                  <Text style={{
                    fontSize: 14,
                    color: '#ccc',
                    marginTop: 4,
                    textAlign: 'center',
                  }}>Add your first pet to get started</Text>
                </View>
              ) : (
                petProfiles.map((pet, index) => (
                  <View key={pet.id || index} style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 12,
                    padding: responsiveWidth(3),
                    marginBottom: responsiveHeight(1),
                    flexDirection: 'row',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 2,
                  }}>
                    <View style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: '#58B9D0',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: responsiveWidth(3),
                    }}>
                      <MaterialIcons name="pets" size={20} color="#FFFFFF" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#333',
                        marginBottom: 2,
                      }}>{pet.petName || 'Unnamed Pet'}</Text>
                      <Text style={{
                        fontSize: 14,
                        color: '#666',
                        marginBottom: 1,
                      }}>{pet.category?.catName || 'Unknown Category'}</Text>
                      <Text style={{
                        fontSize: 12,
                        color: '#999',
                      }}>{pet.size?.size || 'Unknown Size'}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigate('EditPet', { pet })}
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        backgroundColor: '#F0F0F0',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <MaterialIcons name="edit" size={16} color="#58B9D0" />
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </View>
          )}

          {/* Bottom Buttons Section - Only show for User tab */}
          {activeTab === 'user' && (
            <View style={{ paddingTop: responsiveHeight(2) }}>
              {/* Save Button */}
              <TouchableOpacity 
                onPress={handleSave}
                style={[
                  {
                    backgroundColor: '#58B9D0',
                    paddingVertical: responsiveHeight(1.8),
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: responsiveHeight(1.5),
                    width: '100%',
                  },
                  isSaving && {opacity: 0.7}
                ]}
                disabled={isSaving}
              >
                {isSaving ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#FFFFFF',
                  }}>Save Profile</Text>
                )}
              </TouchableOpacity>

              {/* Logout Button */}
              <TouchableOpacity 
                onPress={handleLogout}
                style={[
                  {
                    backgroundColor: '#FF6B6B',
                    paddingVertical: responsiveHeight(1.8),
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  },
                  isLoggingOut && {opacity: 0.7}
                ]}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#FFFFFF',
                  }}>Sign Out</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Profile;