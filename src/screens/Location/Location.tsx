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
  PermissionsAndroid,
  Linking,
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

  // Auto-capture coordinates when component mounts with fallback strategy
  const captureCoordinates = () => {
    const requestAndGet = async () => {
      try {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
          setMessage({ type: 'error', text: 'Location permission denied. Please enable it in settings.' });
          return;
        }

        setIsGettingLocation(true);
        console.log('[Location] Getting current position with high accuracy...');

        // First attempt: High accuracy with moderate timeout
        Geolocation.getCurrentPosition(
          (position) => {
            console.log('[Location] High accuracy position received:', position);
            const { latitude, longitude } = position.coords;
            
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
            console.error('[Location] High accuracy failed:', error);
            
            // If high accuracy fails, try with lower accuracy as fallback
            console.log('[Location] Trying with lower accuracy as fallback...');
            
            Geolocation.getCurrentPosition(
              (position) => {
                console.log('[Location] Low accuracy position received:', position);
                const { latitude, longitude } = position.coords;
                
                setLocationData(prev => ({
                  ...prev,
                  lat: latitude,
                  lng: longitude,
                }));
                
                setHasCoordinates(true);
                setIsGettingLocation(false);
                
                setMessage({
                  type: 'success', 
                  text: 'Approximate location detected! Click "Use My Current Location" to fill address details.'
                });
              },
              (fallbackError) => {
                console.error('[Location] Fallback also failed:', fallbackError);
                let errorMessage = 'Could not detect location automatically.';
                
                switch (fallbackError.code) {
                  case 1: // PERMISSION_DENIED
                    errorMessage = 'Location access denied. Please enable permissions and try the button.';
                    break;
                  case 2: // POSITION_UNAVAILABLE
                    errorMessage = 'GPS unavailable. Please check location settings and try the button.';
                    break;
                  case 3: // TIMEOUT
                    errorMessage = 'Location detection timed out. Try using the "Use My Current Location" button.';
                    break;
                }
                
                setMessage({
                  type: 'error', 
                  text: errorMessage
                });
                setIsGettingLocation(false);
              },
              {
                enableHighAccuracy: false, // Low accuracy fallback
                timeout: 20000, // Longer timeout for fallback
                maximumAge: 60000, // Accept older cached location
              }
            );
          },
          {
            enableHighAccuracy: true,
            timeout: 10000, // Shorter timeout for first attempt
            maximumAge: 5000, // Fresh location preferred
          }
        );
      } catch (err) {
        console.error('[Location] Permission request error:', err);
        setMessage({ type: 'error', text: 'Unable to request location permission' });
        setIsGettingLocation(false);
      }
    };

    requestAndGet();
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
      const requestAndFill = async () => {
        try {
          const hasPermission = await requestLocationPermission();
          if (!hasPermission) {
            setMessage({ type: 'error', text: 'Location permission denied. Please enable it in settings.' });
            setIsFillingAddress(false);
            return;
          }

          Geolocation.getCurrentPosition(
            async (position) => {
              console.log('[Location] High accuracy position for address fill:', position);
              const { latitude, longitude } = position.coords;
              
              // Store coordinates and fill address
              await reverseGeocode(latitude, longitude);
              setHasCoordinates(true);
              setIsFillingAddress(false);
            },
            (error) => {
              console.error('[Location] High accuracy failed for address fill:', error);
              
              // Try with lower accuracy as fallback
              console.log('[Location] Trying lower accuracy for address fill...');
              
              Geolocation.getCurrentPosition(
                async (position) => {
                  console.log('[Location] Low accuracy position for address fill:', position);
                  const { latitude, longitude } = position.coords;
                  
                  await reverseGeocode(latitude, longitude);
                  setHasCoordinates(true);
                  setIsFillingAddress(false);
                },
                (fallbackError) => {
                  console.error('[Location] Both attempts failed for address fill:', fallbackError);
                  let errorMessage = 'Failed to get your location. Please enter manually.';
                  
                  switch (fallbackError.code) {
                    case 1: // PERMISSION_DENIED
                      errorMessage = 'Location access denied. Please enable location permissions.';
                      break;
                    case 2: // POSITION_UNAVAILABLE
                      errorMessage = 'Location unavailable. Please check your GPS and try again.';
                      break;
                    case 3: // TIMEOUT
                      errorMessage = 'Location request timed out. Please try again or enter manually.';
                      break;
                  }
                  
                  setMessage({
                    type: 'error', 
                    text: errorMessage
                  });
                  setIsFillingAddress(false);
                },
                {
                  enableHighAccuracy: false, // Low accuracy fallback
                  timeout: 25000, // Longer timeout for fallback
                  maximumAge: 30000, // Accept older location for fallback
                }
              );
            },
            {
              enableHighAccuracy: true,
              timeout: 12000, // Moderate timeout for first attempt
              maximumAge: 0, // Fresh location for address fill
            }
          );
        } catch (err) {
          console.error('Permission request error:', err);
          setMessage({ type: 'error', text: 'Unable to request location permission' });
          setIsFillingAddress(false);
        }
      };

      requestAndFill();
    }
  };

  // Request location permission at runtime for Android
  const requestLocationPermission = async (): Promise<boolean> => {
    console.log('[Location] Requesting permissions...');
    
    if (Platform.OS === 'ios') {
      // For iOS, permissions are handled in Info.plist
      console.log('[Location] iOS permissions handled in Info.plist');
      return true;
    }
    
    // For Android
    try {
      console.log('[Location] Requesting Android location permissions (coarse+fine)');

      // Check current permissions first
      const fineCheck = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      const coarseCheck = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
      
      console.log('[Location] Current permissions:', { fine: fineCheck, coarse: coarseCheck });
      
      // If we already have permissions, return true
      if (fineCheck || coarseCheck) {
        console.log('[Location] Permissions already granted');
        return true;
      }

      // Request fine location first as it's more important
      const fine = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'PetJio Location Permission',
          message: 'PetJio needs precise location to autofill your address.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      // Request coarse location as a fallback
      const coarse = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'PetJio Location Permission',
          message: 'PetJio needs location to autofill your address. Coarse location helps when precise is not available.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      console.log('[Location] Android permission results:', { fine, coarse });

      // If user selected NEVER_ASK_AGAIN for either, guide them to settings
      if (fine === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN || coarse === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        console.warn('[Location] Permission set to NEVER_ASK_AGAIN');
        Alert.alert(
          'Location Permission Required',
          'Location permission is required to auto-fill your address. Please enable it in app settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return false;
      }

      const hasPermission = fine === PermissionsAndroid.RESULTS.GRANTED || coarse === PermissionsAndroid.RESULTS.GRANTED;
      console.log('[Location] Final permission result:', hasPermission);
      return hasPermission;
    } catch (err) {
      console.error('[Location] Android permission error:', err);
      return false;
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

  // Configure geolocation settings
  useEffect(() => {
    // Set configuration for better Android performance
    if (Platform.OS === 'android') {
      console.log('[Location] Configuring geolocation for Android');
      
      // Set Android-specific configuration
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false, // We handle permissions ourselves
        authorizationLevel: 'whenInUse',
        enableBackgroundLocationUpdates: false,
        locationProvider: 'auto' // Use both GPS and network
      });
    }
  }, []);

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
    <KeyboardAvoidingView 
      style={locationStyles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={locationStyles.scrollContainer} 
        contentContainerStyle={locationStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={locationStyles.setLeftIconposition}>
          <Image source={images.signupImage} style={locationStyles.topImage} />
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={locationStyles.arrowIconPosition}
          >
            <Image source={Icons.LeftArrow} style={locationStyles.leftArrowIconSize}/>
          </TouchableOpacity>
        </View>

        <View style={locationStyles.formContainer}>
          <View style={{alignItems:'center'}}>
            <Text style={locationStyles.heading}>Enter Your Location</Text>
            <Text style={locationStyles.subheading}>Help us know where you are</Text>
          </View>

          {message && (
            <View style={[
              locationStyles.messageContainer,
              message.type === 'success' ? locationStyles.successMessage : locationStyles.errorMessage
            ]}>
              <Text style={locationStyles.messageText}>{message.text}</Text>
            </View>
          )}

          <View style={locationStyles.inputContainer}>
              <View>
                <TextInput
                  mode="outlined"
                  label="Full Address"
                  placeholder="Enter your full address"
                  value={locationData.address}
                  onChangeText={(value) => updateLocationData('address', value)}
                  theme={{ 
                    roundness: 12,
                    colors: { primary: '#58B9D0', outline: errors.address ? '#FF6B6B' : '#E2E2E2' }
                  }}
                  error={!!errors.address}
                  multiline
                  numberOfLines={3}
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
                    roundness: 12,
                    colors: { primary: '#58B9D0', outline: errors.city ? '#FF6B6B' : '#E2E2E2' }
                  }}
                  error={!!errors.city}
                  autoCapitalize="words"
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
                    roundness: 12,
                    colors: { primary: '#58B9D0', outline: errors.state ? '#FF6B6B' : '#E2E2E2' }
                  }}
                  error={!!errors.state}
                  autoCapitalize="words"
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
                    roundness: 12,
                    colors: { primary: '#58B9D0', outline: errors.pincode ? '#FF6B6B' : '#E2E2E2' }
                  }}
                  error={!!errors.pincode}
                  keyboardType="numeric"
                  maxLength={6}
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
              {(isFillingAddress || isGettingLocation) ? (
                <ActivityIndicator size="small" color="#58B9D0" />
              ) : (
                <Text style={locationStyles.locationButtonText}>
                  {isFillingAddress ? 'Filling Address...' : 
                   isGettingLocation ? 'Detecting Location...' : 
                   'Use My Current Location'}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={handleSignUp}
              style={locationStyles.loginButton}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={locationStyles.loginText}>Sign Up</Text>
              )}
            </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Location;