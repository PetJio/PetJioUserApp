import React, {useState, useEffect} from 'react';
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
  PermissionsAndroid,
  Linking,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomTextInput from '../../components/CustomTextInput';
import { RouteProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geolocation from '@react-native-community/geolocation';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import locationStyles from './location.styles';
import profileStyles from '../Profile/profileStyles';
import { registerUser, RegisterRequest } from '../../services/authService';
import { RootStackParamList } from '../../types/navigation';
import LocationEnableModal from '../../components/LocationEnableModal';
import CustomAlert from '../../components/CustomAlert';

export interface UserSignUpData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

type LocationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Location'
>;

type LocationScreenRouteProp = RouteProp<RootStackParamList, 'Location'>;

interface LocationProps {
  navigation: LocationScreenNavigationProp;
  route: LocationScreenRouteProp;
}

interface LocationData {
  address: string;
  city: string;
  state: string;
  pincode: string;
  lat: number | null;
  lng: number | null;
}

interface ValidationErrors {
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

const Location: React.FC<LocationProps> = ({ navigation, route }) => {
  const { userSignUpData } = route.params;
  const [locationData, setLocationData] = useState<LocationData>({
    address: '',
    city: '',
    state: '',
    pincode: '',
    lat: null,
    lng: null,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPincodeLoading, setIsPincodeLoading] = useState<boolean>(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
  const [showPermissionAlert, setShowPermissionAlert] = useState<boolean>(false);



  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!locationData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!locationData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!locationData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!locationData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(locationData.pincode)) {
      newErrors.pincode = 'Enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchAddressFromPincode = async (pincode: string) => {
    if (!pincode || pincode.length !== 6) return;

    setIsPincodeLoading(true);
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();

      if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice) {
        const postOffice = data[0].PostOffice[0];
        setLocationData(prev => ({
          ...prev,
          city: postOffice.District || '',
          state: postOffice.State || '',
          address: prev.address || `${postOffice.Name}, ${postOffice.Block}`,
        }));
        setMessage({type: 'success', text: 'Address details auto-filled successfully!'});
      } else {
        setMessage({type: 'error', text: 'Invalid pincode or no data found'});
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      setMessage({type: 'error', text: 'Failed to fetch address details'});
    } finally {
      setIsPincodeLoading(false);
    }
  };

  const reverseGeocode = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=en&zoom=18`,
        {
          headers: {
            'User-Agent': 'Petjio-Mobile-App/1.0',
            'Accept': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && data.address) {
        const address = data.address;
        const fullAddress = data.display_name || '';
        const city = address.city || address.town || address.village || address.suburb || '';
        const state = address.state || '';
        const pincode = address.postcode || '';
        
        setLocationData(prev => ({
          ...prev,
          lat: latitude,
          lng: longitude,
          address: fullAddress,
          city: city,
          state: state,
          pincode: pincode,
        }));
        
        setMessage({
          type: 'success', 
          text: '✓ Address detected successfully!'
        });
      } else {
        throw new Error('No address data found');
      }
    } catch (error) {
      setLocationData(prev => ({
        ...prev,
        lat: latitude,
        lng: longitude,
      }));
      
      setMessage({
        type: 'success', 
        text: '✓ Location captured! Fill in remaining details.'
      });
    }
  };

  // Simplified location detection
  const detectCurrentLocation = async () => {
    setIsDetectingLocation(true);

    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setIsDetectingLocation(false);
        return;
      }

      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await reverseGeocode(latitude, longitude);
          setIsDetectingLocation(false);
        },
        (error) => {
          if (error.code === 2) {
            // Location services are off - show modal
            setShowLocationModal(true);
          }
          setIsDetectingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to access location services.' });
      setIsDetectingLocation(false);
    }
  };

  // Request location permission
  const requestLocationPermission = async (): Promise<boolean> => {
    if (Platform.OS === 'ios') {
      return true; // iOS permissions handled in Info.plist
    }

    try {
      // First check current permission status
      const checkPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (checkPermission) {
        return true;
      }

      // Request permission - this will show Android's native dialog
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access',
          message: 'Petjio needs your location to auto-fill your address.',
          buttonPositive: 'Allow',
          buttonNegative: 'Deny',
        }
      );

      // If user selected "Never ask again" or denied permanently
      if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        setShowPermissionAlert(true);
        return false;
      }

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.error('Error requesting location permission:', err);
      return false;
    }
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // If coordinates not available, try to get them one last time
      if (locationData.lat === null || locationData.lng === null) {
        setMessage({type: 'error', text: 'Please use "Detect My Location" or we\'ll use approximate coordinates.'});
        setIsLoading(false);
        return;
      }

      const registrationData: RegisterRequest = {
        firstName: userSignUpData.firstName,
        lastName: userSignUpData.lastName,
        email: userSignUpData.email,
        mobile: userSignUpData.phoneNumber,
        password: userSignUpData.password,
        address: locationData.address,
        pinCode: locationData.pincode,
        city: locationData.city,
        state: locationData.state,
        lat: locationData.lat,
        lng: locationData.lng,
        roles: ['user'],
      };

      const response = await registerUser(registrationData);
      
      console.log('🔍 [LOCATION] Registration response:', {
        success: response.success,
        message: response.message,
        hasUser: !!response.user
      });
      
      if (response.success) {
        console.log('✅ [LOCATION] Showing success message and navigating to login');
        setMessage({type: 'success', text: 'Signup successful! Redirecting to login...'});
        
        // Navigate to login screen after successful registration
        setTimeout(() => {
          navigation.navigate('LogIn');
        }, 2000);
      } else {
        console.log('❌ [LOCATION] Showing error message:', response.message);
        setMessage({type: 'error', text: response.message});
      }
    } catch (error) {
      setMessage({type: 'error', text: 'Registration failed. Please try again.'});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (locationData.pincode.length === 6) {
      fetchAddressFromPincode(locationData.pincode);
    }
  }, [locationData.pincode]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const updateLocationData = (field: keyof LocationData, value: string) => {
    setLocationData(prev => ({ ...prev, [field]: value }));

    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={locationStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Sticky Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={locationStyles.stickyBackButton}
      >
        <View style={locationStyles.backIconContainer}>
          <MaterialIcons name="arrow-back" size={24} color="#58B9D0" />
        </View>
      </TouchableOpacity>

      <ScrollView
        style={locationStyles.scrollContainer}
        contentContainerStyle={locationStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={locationStyles.setLeftIconposition}>
          <Image source={images.signupImage} style={locationStyles.topImage} />
        </View>

        <View style={locationStyles.formContainer}>
          <View style={{alignItems:'center'}}>
            <Text style={locationStyles.heading}>Where are you located?</Text>
            <Text style={locationStyles.subheading}>Choose how you'd like to provide your address</Text>
          </View>

          {message && (
            <View style={[
              locationStyles.messageContainer,
              message.type === 'success' ? locationStyles.successMessage : locationStyles.errorMessage
            ]}>
              <Text style={locationStyles.messageText}>{message.text}</Text>
            </View>
          )}

          {/* Quick Location Options */}
          <View style={locationStyles.quickOptionsContainer}>
            <TouchableOpacity 
              onPress={detectCurrentLocation}
              style={[locationStyles.quickOptionButton, locationStyles.primaryOption]}
              activeOpacity={0.8}
              disabled={isDetectingLocation}
            >
              {isDetectingLocation ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <MaterialIcons name="my-location" size={20} color="#fff" />
                  <Text style={locationStyles.quickOptionTextPrimary}>Detect My Location</Text>
                </>
              )}
            </TouchableOpacity>
            
            <View style={locationStyles.dividerContainer}>
              <View style={locationStyles.dividerLine} />
              <Text style={locationStyles.dividerText}>OR</Text>
              <View style={locationStyles.dividerLine} />
            </View>
          </View>

          {/* Manual Entry Section */}
          <View style={locationStyles.manualEntrySection}>
            <Text style={locationStyles.sectionTitle}>Enter Address Manually</Text>
            
            <View style={locationStyles.inputContainer}>
              <View style={{ position: 'relative' }}>
                <CustomTextInput
                  label="Pincode"
                  icon="pin-drop"
                  placeholder="Enter 6-digit pincode"
                  value={locationData.pincode}
                  onChangeText={(value: string) => updateLocationData('pincode', value)}
                  error={errors.pincode}
                  keyboardType="numeric"
                  maxLength={6}
                />
                {isPincodeLoading && locationData.pincode.length === 6 && (
                  <View style={{ position: 'absolute', right: 16, top: '50%', marginTop: -10 }}>
                    <ActivityIndicator size="small" color="#58B9D0" />
                  </View>
                )}
              </View>
              
              <CustomTextInput
                label="City"
                icon="location-city"
                placeholder="Enter your city"
                value={locationData.city}
                onChangeText={(value: string) => updateLocationData('city', value)}
                error={errors.city}
                autoCapitalize="words"
              />

              <CustomTextInput
                label="State"
                icon="map"
                placeholder="Enter your state"
                value={locationData.state}
                onChangeText={(value: string) => updateLocationData('state', value)}
                error={errors.state}
                autoCapitalize="words"
              />

              <CustomTextInput
                label="Full Address"
                icon="home"
                placeholder="Street, building, landmark"
                value={locationData.address}
                onChangeText={(value: string) => updateLocationData('address', value)}
                error={errors.address}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          <TouchableOpacity 
            onPress={handleSignUp}
            style={locationStyles.loginButton}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={locationStyles.loginText}>Complete Sign Up</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <LocationEnableModal
        visible={showLocationModal}
        onDismiss={() => setShowLocationModal(false)}
      />

      <CustomAlert
        visible={showPermissionAlert}
        title="Permission Required"
        message="Please enable location permission in app settings to use this feature."
        icon="warning"
        iconColor="#FF9800"
        iconBackgroundColor="#FFF3E0"
        buttons={[
          { text: 'Cancel', style: 'cancel' },
          { text: 'Open Settings', onPress: () => Linking.openSettings() },
        ]}
        onDismiss={() => setShowPermissionAlert(false)}
      />
    </KeyboardAvoidingView>
  );
};

export default Location;