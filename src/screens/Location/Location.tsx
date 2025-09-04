import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
  const [isGettingLocation, setIsGettingLocation] = useState<boolean>(false);
  const [isFillingAddress, setIsFillingAddress] = useState<boolean>(false);
  const [hasCoordinates, setHasCoordinates] = useState<boolean>(false);
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  const scrollY = new Animated.Value(0);

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
      // Using a more reliable geocoding approach with proper headers
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=en&zoom=18`,
        {
          headers: {
            'User-Agent': 'Petjio-Mobile-App/1.0',
            'Accept': 'application/json',
          },
        }
      );

      // Check if response is ok and content-type is JSON
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON format');
      }

      const data = await response.json();
      
      if (data && data.address) {
        const address = data.address;
        
        // Extract address components with better fallbacks
        const fullAddress = data.display_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        const city = address.city || address.town || address.village || address.suburb || address.county || '';
        const state = address.state || address.province || '';
        const pincode = address.postcode || '';
        
        // Update location data with reverse geocoded information
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
          text: 'Location captured and address details filled automatically!'
        });
      } else {
        throw new Error('No address data found in response');
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      
      // Always store coordinates, even if geocoding fails
      setLocationData(prev => ({
        ...prev,
        lat: latitude,
        lng: longitude,
      }));
      
      setMessage({
        type: 'success', 
        text: 'Location captured! Please fill in your address details.'
      });
    }
  };

  // Auto-capture coordinates when component mounts
  const captureCoordinates = () => {
    setIsGettingLocation(true);
    
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Store coordinates silently without filling address
        setLocationData(prev => ({
          ...prev,
          lat: latitude,
          lng: longitude,
        }));
        
        setHasCoordinates(true);
        setIsGettingLocation(false);
        
        setMessage({
          type: 'success', 
          text: 'Location detected! Click "Use My Current Location" to fill address details.'
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Could not detect location automatically.';
        
        // Provide specific error messages
        switch (error.code) {
          case 1:
            errorMessage = 'Location access denied. Please enable permissions and try the button.';
            break;
          case 2:
            errorMessage = 'GPS unavailable. Use the button to try again.';
            break;
          case 3:
            errorMessage = 'Location timeout. Use the button to try again.';
            break;
        }
        
        setMessage({
          type: 'error', 
          text: errorMessage
        });
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000, // Accept cached location up to 30 seconds old
      }
    );
  };

  // Fill address using existing coordinates or get new ones
  const fillCurrentLocationAddress = async () => {
    if (hasCoordinates && locationData.lat && locationData.lng) {
      // Use existing coordinates to fill address
      setIsFillingAddress(true);
      await reverseGeocode(locationData.lat, locationData.lng);
      setIsFillingAddress(false);
    } else {
      // Get fresh coordinates and fill address
      setIsFillingAddress(true);
      
      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Store coordinates and fill address
          await reverseGeocode(latitude, longitude);
          setHasCoordinates(true);
          setIsFillingAddress(false);
        },
        (error) => {
          console.error('Geolocation error:', error);
          let errorMessage = 'Failed to get your location. Please enter manually.';
          
          switch (error.code) {
            case 1:
              errorMessage = 'Location access denied. Please enable location permissions.';
              break;
            case 2:
              errorMessage = 'Location unavailable. Please check your GPS.';
              break;
            case 3:
              errorMessage = 'Location request timed out. Please try again.';
              break;
          }
          
          setMessage({
            type: 'error', 
            text: errorMessage
          });
          setIsFillingAddress(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        }
      );
    }
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Validate coordinates are available
      if (locationData.lat === null || locationData.lng === null) {
        setMessage({type: 'error', text: 'Location coordinates are required. Please enable location access when prompted.'});
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

  // Auto-capture coordinates when component mounts
  useEffect(() => {
    captureCoordinates();
  }, []);

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
    <View style={locationStyles.container}>
      {/* Sticky Header */}
      <View style={locationStyles.stickyHeader}>
        <TouchableOpacity 
          style={locationStyles.backButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={locationStyles.headerTitleContainer}>
          <Text style={locationStyles.headerTitle}>Where are you?</Text>
        </View>
        <View style={locationStyles.backButton} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Animated.ScrollView 
          contentContainerStyle={locationStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        >
          <View style={locationStyles.contentContainer}>
            <View style={{ marginBottom: 20, alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>Help us know your location</Text>
            </View>

          {message && (
            <View style={[
              locationStyles.messageContainer,
              message.type === 'success' ? locationStyles.successMessage : locationStyles.errorMessage
            ]}>
              <Text style={locationStyles.messageText}>{message.text}</Text>
            </View>
          )}

          <View style={locationStyles.formSection}>
            <View style={locationStyles.inputGroup}>
              <View>
                <TextInput
                  mode="outlined"
                  label="Full Address"
                  placeholder="Enter your full address"
                  value={locationData.address}
                  onChangeText={(value) => updateLocationData('address', value)}
                  theme={{ 
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.address ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  style={locationStyles.textInput}
                  contentStyle={locationStyles.inputContent}
                  outlineStyle={[
                    locationStyles.inputOutline,
                    errors.address && locationStyles.inputError
                  ]}
                  multiline
                  numberOfLines={3}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons 
                          name="home" 
                          size={20} 
                          color={errors.address ? '#FF6B6B' : '#666'} 
                        />
                      )}
                    />
                  }
                />
                {errors.address && <Text style={locationStyles.errorText}>{errors.address}</Text>}
              </View>

              <View>
                <TextInput
                  mode="outlined"
                  label="City"
                  placeholder="Enter your city"
                  value={locationData.city}
                  onChangeText={(value) => updateLocationData('city', value)}
                  theme={{ 
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.city ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  style={locationStyles.textInput}
                  contentStyle={locationStyles.inputContent}
                  outlineStyle={[
                    locationStyles.inputOutline,
                    errors.city && locationStyles.inputError
                  ]}
                  autoCapitalize="words"
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
                {errors.city && <Text style={locationStyles.errorText}>{errors.city}</Text>}
              </View>

              <View>
                <TextInput
                  mode="outlined"
                  label="State"
                  placeholder="Enter your state"
                  value={locationData.state}
                  onChangeText={(value) => updateLocationData('state', value)}
                  theme={{ 
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.state ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  style={locationStyles.textInput}
                  contentStyle={locationStyles.inputContent}
                  outlineStyle={[
                    locationStyles.inputOutline,
                    errors.state && locationStyles.inputError
                  ]}
                  autoCapitalize="words"
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons 
                          name="location-on" 
                          size={20} 
                          color={errors.state ? '#FF6B6B' : '#666'} 
                        />
                      )}
                    />
                  }
                />
                {errors.state && <Text style={locationStyles.errorText}>{errors.state}</Text>}
              </View>

              <View>
                <TextInput
                  mode="outlined"
                  label="Pincode"
                  placeholder="Enter 6-digit pincode"
                  value={locationData.pincode}
                  onChangeText={(value) => updateLocationData('pincode', value)}
                  theme={{ 
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.pincode ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  style={locationStyles.textInput}
                  contentStyle={locationStyles.inputContent}
                  outlineStyle={[
                    locationStyles.inputOutline,
                    errors.pincode && locationStyles.inputError
                  ]}
                  keyboardType="numeric"
                  maxLength={6}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons 
                          name="pin-drop" 
                          size={20} 
                          color={errors.pincode ? '#FF6B6B' : '#666'} 
                        />
                      )}
                    />
                  }
                  right={
                    isPincodeLoading && locationData.pincode.length === 6 ? (
                      <TextInput.Icon
                        icon={() => (
                          <ActivityIndicator size="small" color="#58B9D0" />
                        )}
                      />
                    ) : null
                  }
                />
                {errors.pincode && <Text style={locationStyles.errorText}>{errors.pincode}</Text>}
              </View>
            </View>

            <TouchableOpacity 
              onPress={fillCurrentLocationAddress}
              style={locationStyles.locationButton}
              activeOpacity={0.8}
              disabled={isFillingAddress || isGettingLocation}
            >
              <LinearGradient
                colors={['rgba(88, 185, 208, 0.1)', 'rgba(88, 185, 208, 0.05)']}
                style={locationStyles.locationButtonGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
              >
                <View style={locationStyles.locationButtonContent}>
                  {(isFillingAddress || isGettingLocation) ? (
                    <ActivityIndicator size="small" color="#58B9D0" />
                  ) : (
                    <MaterialIcons 
                      name={hasCoordinates ? "home" : "gps-fixed"} 
                      size={24} 
                      color="#58B9D0" 
                    />
                  )}
                  <Text style={locationStyles.locationButtonText}>
                    {isFillingAddress ? 'Filling Address...' : 
                     isGettingLocation ? 'Detecting Location...' : 
                     'Use My Current Location'}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={handleSignUp}
              style={[
                profileStyles.commonButton,
                profileStyles.commonButtonPrimary,
                isLoading && profileStyles.loadingButton
              ]}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={[profileStyles.commonButtonText, profileStyles.commonButtonTextPrimary]}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Location;