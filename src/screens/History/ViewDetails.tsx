import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Modal,
  TextInput,
  Image,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { goBack } from '../../utils/navigationService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import { API_CONFIG } from '../../config/api';
import historyStyles from './history.styles';
import serviceStyles from '../Service/styles';
import { HistoryDetailsSkeleton } from '../../components/SkeletonLoader/SkeletonLoader';

// Interface definitions matching NEW API response structure from History.tsx
interface Status {
  id: number;
  name: string;
}

interface Mode {
  id: number;
  value: string;
}

interface Customer {
  id: number;
  userId: number;
  pets: any;
  alterNo: string;
  profileImg: string;
}

interface ServiceProvider {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  address: string;
  businessName?: string;
  fcmToken?: string;
}

interface Boarding {
  id: number;
  facilityName: string;
  userId: number;
  description: string;
  regNo: string;
  serviceUploads: string[];
  profileImg: string;
  experience: number;
  keepCustomerPossessions: boolean;
  checkinTime: number;
  checkoutTime: number;
  lastCheckoutTime: number;
  capacity: number;
  acAvailable: boolean;
  medicatedBath: number;
  swimming: number;
  nailClipping: number;
  commercialFood: number;
  walksPerDay: number;
  docAvailibility: boolean;
}

interface BookingDetail {
  id: number;
  startTime: string;
  endTime: string;
}

interface BoardingServiceBooking {
  id: number;
  petId?: number;
  pet?: any;
  possessions: boolean;
  isDocReqd: boolean;
  nailClipping: boolean;
  swimmingPool: boolean;
  walksPerDay: number | null;
  medicatedBath: boolean;
  additionalAdvice?: string;
  bookingDetails: BookingDetail;
}

interface FlowHistory {
  id: number;
  boardingBookingId: number;
  boardingBookingFlowOptionsId: number;
  customerId?: number;
  boardingId?: number;
  createdAt: string;
}

interface FlowOption {
  id: number;
  name: string;
}

interface BookingHistoryItem {
  id: number;
  mode: Mode;
  startTime: string;
  endTime: string;
  customer: Customer;
  status: Status;
  service: ServiceProvider;
  boarding: Boarding;
  boardingServiceBookings: BoardingServiceBooking[];
  flowHistories?: FlowHistory[];
}

interface BookingDay {
  id: number;
  date: string;
  uploads: string[] | null;
  uploadsWithUrls?: Array<{filename: string; url: string; isVideo: boolean;}>;
  createdAt: string;
  updatedAt: string;
}

interface ViewDetailsProps {
  route: {
    params: {
      bookingItem: BookingHistoryItem;
    };
  };
}

const ViewDetails: React.FC<ViewDetailsProps> = ({ route }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { bookingItem } = route.params;
  const [currentBookingData, setCurrentBookingData] = useState<BookingHistoryItem>(bookingItem);
  const [updatingStatus, setUpdatingStatus] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [ownerId, setOwnerId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookingDays, setBookingDays] = useState<BookingDay[]>([]);
  const [loadingDays, setLoadingDays] = useState<boolean>(false);
  const [hasAnyUpdates, setHasAnyUpdates] = useState<boolean>(false);

  // Helper to get local YYYY-MM-DD string (avoids timezone shifts from toISOString)
  const localIsoDate = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  // Full screen media viewer states
  const [showMediaViewer, setShowMediaViewer] = useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<{url: string; isVideo: boolean; filename: string} | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [paused, setPaused] = useState(false);
  const videoRef = useRef<any>(null);

  // Pet handover modal states
  const [showHandoverModal, setShowHandoverModal] = useState<boolean>(false);
  const [petItems, setPetItems] = useState<Array<{name: string; count: string}>>([{name: '', count: ''}]);
  const [submittingHandover, setSubmittingHandover] = useState<boolean>(false);

  // Settlement checkout modal states
  const [showSettlementModal, setShowSettlementModal] = useState<boolean>(false);
  const [settlementData, setSettlementData] = useState<any>(null);
  const [loadingSettlement, setLoadingSettlement] = useState<boolean>(false);
  const [pets, setPets] = useState<any[]>([]);
  const [loadingPets, setLoadingPets] = useState<boolean>(true);

  // Simulate initial data loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Fetch pet details
  useEffect(() => {
    if (currentBookingData?.customer?.id) {
      fetchPetProfiles(currentBookingData.customer.id);
    }
  }, [currentBookingData?.customer?.id]);

  // Fetch booking days when component mounts
  useEffect(() => {
    if (currentBookingData?.id) {
      console.log('📋 Fetching booking days for booking ID:', currentBookingData.id);
      fetchBookingDays(currentBookingData.id);
      // Also refresh booking data to get latest flow histories
      refreshBookingData(currentBookingData.id);
    }
  }, [currentBookingData?.id]);

  // Helper functions from History.tsx
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const calculateDuration = (startTime: string, endTime: string) => {
    try {
      const start = new Date(startTime);
      const end = new Date(endTime);
      const diffInMs = end.getTime() - start.getTime();
      const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
      return diffInDays;
    } catch {
      return 0;
    }
  };

  const getServiceTitle = (booking: BookingHistoryItem) => {
    return booking.boarding?.facilityName || 'Boarding Service';
  };

  const getProviderName = (booking: BookingHistoryItem) => {
    const service = booking.service;
    if (service) {
      return `${service.firstName} ${service.lastName}`;
    }
    return 'Service Provider';
  };

  const getServiceFeatures = (booking: BoardingServiceBooking) => {
    const features = [];
    if (booking.possessions) features.push('Possessions');
    if (booking.isDocReqd) features.push('Doctor Required');
    if (booking.nailClipping) features.push('Nail Clipping');
    if (booking.swimmingPool) features.push('Swimming Pool');
    if (booking.medicatedBath) features.push('Medicated Bath');
    if (booking.walksPerDay) features.push(`${booking.walksPerDay} Walks/day`);
    return features;
  };

  const getStatusMessage = (statusId: number) => {
    switch (statusId) {
      case 7:
        return 'Waiting for boarder to accept the booking';
      case 8:
        return 'Booking accepted by boarder';
      case 3:
        return 'Waiting for boarder to accept the pet';
      case 4:
        return 'Pet accepted by boarder';
      case 5:
        return 'Pet returned by boarder';
      case 6:
        return 'Pet accepted by user after service';
      default:
        return 'Status unknown';
    }
  };

  const getCurrentStatus = (booking: BookingHistoryItem) => {
    // Get the latest status from flowHistories array (last item in the array)
    if (booking.flowHistories && booking.flowHistories.length > 0) {
      const latestFlow = booking.flowHistories[booking.flowHistories.length - 1];
      const statusId = latestFlow.boardingBookingFlowOptionsId;
      const statusName = getStatusMessage(statusId);
      
      return {
        id: statusId,
        name: statusName
      };
    }
    
    // Return null if no flow histories available (will hide booking status)
    return null;
  };

  // Handle chat navigation
  const handleChatPress = () => {
    if (!currentBookingData.service) {
      Alert.alert('Error', 'Provider information not available');
      return;
    }

    const serviceProvider = currentBookingData.service;
    const chatUser = {
      id: serviceProvider.id?.toString() || 'unknown',
      name: `${serviceProvider.firstName} ${serviceProvider.lastName}`,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(`${serviceProvider.firstName} ${serviceProvider.lastName}`)}&background=58B9D0&color=fff`,
      isOnline: Math.random() > 0.5, // Random online status for demo
      role: 'service_provider',
    };

    console.log('🗨️ Opening chat with provider:', chatUser);
    navigation.navigate('Chat', { user: chatUser });
  };

  // Handle Accept Pet - Update status and navigate to settlement checkout
  const handleAcceptPet = async (bookingId: number) => {
    try {
      console.log('🐾 Accepting pet for booking:', bookingId);

      // First update the booking status to 6 (Pet accepted)
      await updateBookingStatus(bookingId, 6);

      // Then navigate to settlement checkout
      console.log('💰 Navigating to settlement checkout');
      navigation.navigate('SettlementCheckout', {
        bookingId: bookingId,
        bookingData: currentBookingData,
      });
    } catch (error) {
      console.error('🔥 Error in handleAcceptPet:', error);
      Alert.alert('Error', 'Failed to process pet acceptance');
    }
  };

  const getActionButton = (statusId: number, bookingId: number) => {
    switch (statusId) {
      case 8:
        return {
          text: 'Handover Pet',
          action: () => setShowHandoverModal(true),
          color: '#58B9D0'
        };
      case 5:
        return {
          text: 'Accept Pet',
          action: () => handleAcceptPet(bookingId),
          color: '#10B981'
        };
      default:
        return null;
    }
  };

  // Function to get presigned URL for a file
  const getPresignedUrl = async (filename: string, token: string): Promise<string> => {
    try {
      console.log(`🔗 Getting presigned URL for: ${filename}`);

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/aws-s3/get-presigned-url`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName: filename }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Presigned URL response for ${filename}:`, data);

        if (data.statusCode === 200 && data.body) {
          console.log(`✅ Presigned URL obtained: ${data.body.substring(0, 50)}...`);
          return data.body;
        }
      }

      console.error(`❌ Failed to get presigned URL for ${filename}`);
      // Return the direct S3 URL as fallback (though it may not work)
      return `https://petjio-stage-bucket.s3.ap-south-1.amazonaws.com/${filename}`;
    } catch (error) {
      console.error(`🔥 Error getting presigned URL for ${filename}:`, error);
      return `https://petjio-stage-bucket.s3.ap-south-1.amazonaws.com/${filename}`;
    }
  };

  // Function to fetch booking days with photos/videos
  const fetchBookingDays = async (bookingId: number) => {
    try {
      setLoadingDays(true);
      console.log('🔄 Starting fetchBookingDays...');
      console.log('📋 Booking ID:', bookingId);

      const token = await getAuthToken();
      console.log('🔑 Token retrieved:', token ? `Present (${token.substring(0, 20)}...)` : 'Missing');

      if (!token) {
        console.error('❌ No authentication token found');
        return;
      }

      const apiUrl = `${API_CONFIG.BASE_URL}/api/booking-days/booking/${bookingId}`;
      console.log('🌐 API URL:', apiUrl);

      // Generate CURL command for debugging
      const curlCommand = `curl -X GET "${apiUrl}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "Content-Type: application/json" \\
  -v`;

      console.log('🔧 CURL command for booking days API:');
      console.log('=====================================');
      console.log(curlCommand);
      console.log('=====================================');

      console.log('📡 Sending request to booking days API...');
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 Response status:', response.status);
      console.log('📥 Response headers:', response.headers);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Booking days raw response:', JSON.stringify(data, null, 2));
        console.log('📊 Response statusCode:', data.statusCode);
        console.log('📊 Response message:', data.message);
        console.log('📊 Number of days in response:', data.body ? data.body.length : 0);

        if (data.statusCode === 200 && data.body) {
          console.log('📋 Raw booking days:', data.body);

          // Include all days up to today (even if uploads is null) and sort by date descending
          const now = new Date();
          const today = localIsoDate(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
          console.log('📅 Today\'s date:', today);

          const pastAndTodayDays = data.body
            .filter((day: BookingDay) => day.date <= today)
            .sort((a: BookingDay, b: BookingDay) => new Date(b.date).getTime() - new Date(a.date).getTime());

          console.log('✅ Past-and-today days count:', pastAndTodayDays.length);

          // Map uploads (which are full S3 URLs) to uploadsWithUrls; if uploads is null, use empty array
          const daysWithUrls = pastAndTodayDays.map((day: BookingDay) => {
            const uploadsArr: string[] = Array.isArray(day.uploads) ? day.uploads : [];

            const uploadsWithUrls = uploadsArr.map((fileUrl) => {
              const isVideo = fileUrl.toLowerCase().endsWith('.mp4') ||
                              fileUrl.toLowerCase().endsWith('.mov') ||
                              fileUrl.toLowerCase().endsWith('.avi');
              const filename = fileUrl.split('/').pop() || fileUrl;
              return { filename, url: fileUrl, isVideo };
            });

            return {
              ...day,
              uploadsWithUrls
            };
          });

          console.log('✅ Mapped days with uploadsWithUrls:', JSON.stringify(daysWithUrls, null, 2));

          // Determine the slice from the earliest day up to today
          const daysAsc = daysWithUrls.slice().sort((a: BookingDay, b: BookingDay) => new Date(a.date).getTime() - new Date(b.date).getTime());
          const todayIndex = daysAsc.findIndex(d => d.date === today);
          const sliceEnd = todayIndex >= 0 ? todayIndex + 1 : daysAsc.length;
          const sliceToShow = daysAsc.slice(0, sliceEnd);

          // Reverse to show newest first in UI
          const finalDays = sliceToShow.slice().reverse();

          // Check if any uploads exist within the days to show
          const anyUpdates = finalDays.some((d: BookingDay) => Array.isArray(d.uploadsWithUrls) && d.uploadsWithUrls.length > 0);
          setHasAnyUpdates(anyUpdates);
          setBookingDays(finalDays);
          console.log('✅ Booking days state updated successfully');
        } else {
          console.error('❌ Invalid response structure or non-200 statusCode');
        }
      } else {
        const errorText = await response.text();
        console.error('❌ Failed to fetch booking days');
        console.error('❌ Status:', response.status);
        console.error('❌ Error response:', errorText);
      }
    } catch (error) {
      console.error('🔥 Error fetching booking days:', error);
      console.error('🔥 Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    } finally {
      setLoadingDays(false);
      console.log('✅ fetchBookingDays completed');
    }
  };

  // Function to get auth token
  const getAuthToken = async () => {
    const possibleTokenKeys = ['token', 'user_token', 'authToken', 'access_token', 'loginToken'];

    for (const key of possibleTokenKeys) {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      }
    }
    return null;
  };

  // Function to fetch pet profiles
  const fetchPetProfiles = async (petOwnerId: number) => {
    try {
      setLoadingPets(true);
      console.log('🐾 Fetching pet profiles for owner ID:', petOwnerId);
      console.log('📋 Current booking data:', JSON.stringify(currentBookingData.boardingServiceBookings, null, 2));

      const token = await getAuthToken();
      if (!token) {
        console.error('❌ No authentication token found');
        setLoadingPets(false);
        return;
      }

      // Check if pets are already embedded in the boardingServiceBookings
      const embeddedPets = currentBookingData.boardingServiceBookings
        .map(booking => booking.pet)
        .filter(pet => pet !== null && pet !== undefined);

      if (embeddedPets.length > 0) {
        console.log('✅ Using embedded pet data from booking:', embeddedPets.length);
        setPets(embeddedPets);
        setLoadingPets(false);
        return;
      }

      // Check if petId is available in boardingServiceBookings
      const petIds = currentBookingData.boardingServiceBookings
        .map(booking => booking.petId)
        .filter(id => id !== null && id !== undefined);

      if (petIds.length === 0) {
        console.log('⚠️ No pet IDs found in boardingServiceBookings, fetching from individual booking endpoints');

        // Fallback: Fetch each boarding service booking to get petId
        const bookingPetIds: number[] = [];
        const collectedPets: any[] = [];

        for (const booking of currentBookingData.boardingServiceBookings) {
          const bookingApiUrl = `${API_CONFIG.BASE_URL}/api/boarding-service-bookings/${booking.id}`;
          console.log('🌐 Fetching booking details from:', bookingApiUrl);

          const bookingResponse = await fetch(bookingApiUrl, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (bookingResponse.ok) {
            const bookingData = await bookingResponse.json();
            console.log('✅ Booking data:', JSON.stringify(bookingData, null, 2));

            if (bookingData.statusCode === 200 && bookingData.body) {
              // Check if pet is embedded
              if (bookingData.body.pet) {
                collectedPets.push(bookingData.body.pet);
              } else if (bookingData.body.petId) {
                bookingPetIds.push(bookingData.body.petId);
              }
            }
          }
        }

        // If we got pets from the embedded data, we're done
        if (collectedPets.length > 0) {
          console.log('✅ Pets loaded from embedded data:', collectedPets.length);
          setPets(collectedPets);
          setLoadingPets(false);
          return;
        }

        // Use the collected pet IDs
        petIds.push(...bookingPetIds);
      }

      console.log('📋 Pet IDs to fetch:', petIds);

      // Fetch individual pet profiles
      const petPromises = petIds.map(async (petId) => {
        const petApiUrl = `${API_CONFIG.BASE_URL}/api/pet-profile/${petId}`;
        console.log('🌐 Fetching pet profile:', petApiUrl);

        const petResponse = await fetch(petApiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (petResponse.ok) {
          const petData = await petResponse.json();
          console.log('✅ Pet data:', JSON.stringify(petData, null, 2));

          if (petData.statusCode === 200 && petData.body) {
            return petData.body;
          }
        }
        return null;
      });

      const fetchedPets = await Promise.all(petPromises);
      const validPets = fetchedPets.filter(pet => pet !== null);

      console.log('✅ Pet profiles loaded:', validPets.length);
      console.log('✅ Pet profiles data:', JSON.stringify(validPets, null, 2));

      setPets(validPets);
    } catch (error) {
      console.error('🔥 Error fetching pet profiles:', error);
    } finally {
      setLoadingPets(false);
    }
  };

  // Function to refresh booking data from API
  const refreshBookingData = async (bookingId: number) => {
    try {
      const token = await getAuthToken();
      if (!token) return;

      const apiUrl = `${API_CONFIG.BASE_URL}/api/boarding-booking-flow-history/by-boarding?boardingBookingId=${bookingId}`;
      
      // Generate CURL command for debugging
      const curlCommand = `curl -X GET "${apiUrl}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "Content-Type: application/json" \\
  -v`;

      console.log('🔧 CURL command for refreshBookingData API:');
      console.log('=====================================');
      console.log(curlCommand);
      console.log('=====================================');

      console.log('📤 refreshBookingData REQUEST:');
      console.log('URL:', apiUrl);
      console.log('Method: GET');
      console.log('Headers:', {
        'Authorization': `Bearer ${token.substring(0, 20)}...`,
        'Content-Type': 'application/json'
      });
      console.log('Booking ID:', bookingId);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 refreshBookingData RESPONSE:');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);
      
      // Log response headers manually
      const headersObj: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        headersObj[key] = value;
      });
      console.log('Headers:', JSON.stringify(headersObj, null, 2));

      if (response.ok) {
        const result = await response.json();
        console.log('✅ refreshBookingData Response Body:', JSON.stringify(result, null, 2));
        console.log('Response statusCode:', result.statusCode);
        console.log('Response message:', result.message);
        console.log('Response body type:', typeof result.body);
        console.log('Response body length:', Array.isArray(result.body) ? result.body.length : 'N/A');

        if (result.statusCode === 200 && result.body) {
          // The API returns an array of flow history items, so we need to merge with existing booking data
          const updatedFlowHistories = result.body;
          console.log('✅ Updating flow histories:', JSON.stringify(updatedFlowHistories, null, 2));

          setCurrentBookingData(prevData => ({
            ...prevData,
            flowHistories: updatedFlowHistories
          }));
          console.log('✅ Booking data updated successfully');
        } else {
          console.warn('⚠️ Response statusCode is not 200 or body is missing');
        }
      } else {
        const errorText = await response.text();
        console.error('❌ refreshBookingData Error Response:', errorText);
      }
    } catch (error) {
      console.error('🔥 Error in refreshBookingData:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }
  };

  // Pull-to-refresh function
  const onRefresh = async () => {
    setRefreshing(true);
    await refreshBookingData(currentBookingData.id);
    setRefreshing(false);
  };

  // Get dynamic status message for status updates
  const getStatusChangeMessage = (newStatusId: number) => {
    switch (newStatusId) {
      case 3:
        return 'Pet handover initiated! Your pet is now with the boarder.';
      case 6:
        return 'Pet pickup completed! Thank you for using our boarding service.';
      default:
        return 'Status updated successfully';
    }
  };

  // Function to submit pet extras (items provided)
  const submitPetExtras = async (bookingId: number) => {
    // Validate that at least one item has both name and count
    const validItems = petItems.filter(item => item.name.trim() && item.count.trim() && parseInt(item.count) > 0);
    
    if (validItems.length === 0) {
      Alert.alert('Error', 'Please add at least one item with name and quantity');
      return;
    }

    setSubmittingHandover(true);
    try {
      const token = await getAuthToken();
      if (!token) {
        Alert.alert('Error', 'Authentication token not found');
        return;
      }

      const petExtrasUrl = `${API_CONFIG.BASE_URL}/api/pet-extras`;
      const requestBody = {
        boardingId: bookingId,
        data: validItems.map(item => ({
          customerProvides: parseInt(item.count),
          name: item.name.trim()
        }))
      };

      // Generate CURL command for debugging
      const curlCommand = `curl -X POST "${petExtrasUrl}" \\
  -H "Authorization: Bearer ${token.substring(0, 20)}..." \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(requestBody)}'`;

      console.log('🔧 CURL command for pet-extras API:');
      console.log('=====================================');
      console.log(curlCommand);
      console.log('=====================================');

      console.log('📤 Pet Extras REQUEST:');
      console.log('URL:', petExtrasUrl);
      console.log('Method: POST');
      console.log('Headers:', {
        'Authorization': `Bearer ${token.substring(0, 20)}...`,
        'Content-Type': 'application/json'
      });
      console.log('Body:', JSON.stringify(requestBody, null, 2));

      // Call pet-extras API
      const petExtrasResponse = await fetch(petExtrasUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('📥 Pet Extras RESPONSE:');
      console.log('Status:', petExtrasResponse.status);
      console.log('Status Text:', petExtrasResponse.statusText);

      // Log response headers
      const responseHeaders: Record<string, string> = {};
      petExtrasResponse.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });
      console.log('Headers:', JSON.stringify(responseHeaders, null, 2));

      if (!petExtrasResponse.ok) {
        const errorText = await petExtrasResponse.text();
        console.error('❌ Pet Extras Error Response:', errorText);
        Alert.alert('Error', 'Failed to save items provided');
        return;
      }

      const petExtrasData = await petExtrasResponse.json();
      console.log('✅ Pet Extras Response Body:', JSON.stringify(petExtrasData, null, 2));

      // After successful pet extras submission, update status to handover (status 3)
      console.log('🔄 Starting updateBookingStatus call with status 3...');
      console.log('📋 Booking ID for status update:', bookingId);
      
      try {
        await updateBookingStatus(bookingId, 3);
        console.log('✅ Successfully updated booking status to 3');
      } catch (statusError) {
        console.error('❌ Error updating booking status:', statusError);
        // Don't throw - still close modal and show success for pet extras
      }

      // Close modal and reset
      setShowHandoverModal(false);
      setPetItems([{name: '', count: ''}]);
    } catch (error) {
      console.error('🔥 Error submitting pet extras:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      Alert.alert('Error', 'Failed to process handover');
    } finally {
      setSubmittingHandover(false);
    }
  };

  const updateBookingStatus = async (bookingId: number, newStatusId: number) => {
    console.log('🔄 updateBookingStatus CALLED');
    console.log('📋 Parameters:', { bookingId, newStatusId });
    
    setUpdatingStatus(true);
    try {
      const token = await getAuthToken();
      console.log('🔑 Token retrieved in updateBookingStatus:', token ? `Present (${token.substring(0, 20)}...)` : 'Missing');
      
      if (!token) {
        console.error('❌ No token found in updateBookingStatus');
        Alert.alert('Error', 'Authentication token not found');
        return;
      }

      // Get owner ID if not available
      let currentOwnerId = ownerId;
      console.log('👤 Current ownerId state:', currentOwnerId);
      
      if (!currentOwnerId) {
        console.log('📤 Fetching owner ID from API...');
        const ownerApiUrl = `${API_CONFIG.BASE_URL}/api/pet-owner/findByUserId`;
        
        // Generate CURL command for owner API
        const ownerCurlCommand = `curl -X GET "${ownerApiUrl}" \\
  -H "Authorization: Bearer ${token.substring(0, 20)}..." \\
  -H "Content-Type: application/json" \\
  -v`;

        console.log('🔧 CURL command for pet-owner API:');
        console.log('=====================================');
        console.log(ownerCurlCommand);
        console.log('=====================================');

        const ownerResponse = await fetch(ownerApiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('📥 Owner API Response Status:', ownerResponse.status);
        console.log('📥 Owner API Response Status Text:', ownerResponse.statusText);

        if (ownerResponse.ok) {
          const ownerData = await ownerResponse.json();
          console.log('✅ Owner API Response:', JSON.stringify(ownerData, null, 2));
          
          if (ownerData.statusCode === 200) {
            currentOwnerId = ownerData.body.id;
            setOwnerId(currentOwnerId);
            console.log('✅ Owner ID retrieved:', currentOwnerId);
          } else {
            console.error('❌ Owner API returned non-200 statusCode:', ownerData.statusCode);
          }
        } else {
          const errorText = await ownerResponse.text();
          console.error('❌ Owner API Error Response:', errorText);
        }
      }

      if (!currentOwnerId) {
        console.error('❌ Unable to get owner ID');
        Alert.alert('Error', 'Unable to get owner information');
        return;
      }

      console.log('📤 Sending boarding-booking-flow-history request...');
      const statusApiUrl = `${API_CONFIG.BASE_URL}/api/boarding-booking-flow-history`;
      
      // Extract boardingServiceBookings IDs
      const boardingServiceBookingsIds = currentBookingData.boardingServiceBookings.map(booking => booking.id);
      console.log('📋 Extracted boardingServiceBookingsIds:', boardingServiceBookingsIds);
      
      const statusRequestBody = {
        customerId: currentOwnerId,
        boardingBookingFlowOptionsId: newStatusId,
        boardingBookingId: bookingId,
        boardingId: currentBookingData.boarding.userId,
        boardingServiceBookingsId: boardingServiceBookingsIds
      };

      // Generate CURL command for status update API
      const statusCurlCommand = `curl -X POST "${statusApiUrl}" \\
  -H "Authorization: Bearer ${token.substring(0, 20)}..." \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(statusRequestBody)}' \\
  -v`;

      console.log('🔧 CURL command for boarding-booking-flow-history API:');
      console.log('=====================================');
      console.log(statusCurlCommand);
      console.log('=====================================');

      console.log('📤 Status Update REQUEST:');
      console.log('URL:', statusApiUrl);
      console.log('Method: POST');
      console.log('Headers:', {
        'Authorization': `Bearer ${token.substring(0, 20)}...`,
        'Content-Type': 'application/json'
      });
      console.log('Body:', JSON.stringify(statusRequestBody, null, 2));

      const response = await fetch(statusApiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(statusRequestBody)
      });

      console.log('📥 Status Update RESPONSE:');
      console.log('Status:', response.status);
      console.log('Status Text:', response.statusText);

      // Log response headers
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });
      console.log('Headers:', JSON.stringify(responseHeaders, null, 2));

      if (response.ok) {
        const responseData = await response.json();
        console.log('✅ Status Update Response Body:', JSON.stringify(responseData, null, 2));
        
        // Refresh booking data instead of navigating back
        console.log('🔄 Refreshing booking data...');
        await refreshBookingData(bookingId);

        // Show dynamic status message
        const successMessage = getStatusChangeMessage(newStatusId);
        console.log('✅ Showing success message:', successMessage);
        Alert.alert('Success', successMessage);
      } else {
        const errorText = await response.text();
        console.error('❌ Status Update Error Response:', errorText);
        Alert.alert('Error', 'Failed to update status');
      }
    } catch (error) {
      console.error('🔥 Error in updateBookingStatus:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      Alert.alert('Error', 'Failed to update status');
    } finally {
      setUpdatingStatus(false);
      console.log('✅ updateBookingStatus completed');
    }
  };

  console.log(currentBookingData, 'currentBookingDatacurrentBookingData');
  

  const duration = calculateDuration(currentBookingData.startTime, currentBookingData.endTime);
  const serviceTitle = getServiceTitle(currentBookingData);
  const providerName = getProviderName(currentBookingData);
  const currentStatus = getCurrentStatus(currentBookingData);
  const actionButton = currentStatus ? getActionButton(currentStatus.id, currentBookingData.id) : null;

  return (
    <View style={historyStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      {/* Header */}
      <View style={serviceStyles.stickyHeader}>
        <TouchableOpacity onPress={goBack} style={{ marginRight: 16 }}>
          <MaterialIcons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <View style={serviceStyles.headerTitleContainer}>
          <Text style={serviceStyles.stickyHeaderTitle}>Booking Details</Text>
          <Text style={serviceStyles.stickyHeaderSubtitle}>
            #{currentBookingData.id}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleChatPress}
          style={{
            padding: 8,
            borderRadius: 20,
            backgroundColor: 'transparent'
          }}
        >
          <MaterialIcons name="chat-bubble-outline" size={24} color="#58B9D0" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      {loading ? (
        <ScrollView
          style={historyStyles.detailsScrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <HistoryDetailsSkeleton />
        </ScrollView>
      ) : (
        <ScrollView
          style={historyStyles.detailsScrollContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: responsiveWidth(4) }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#58B9D0']}
              tintColor="#58B9D0"
            />
          }
        >
        {/* Main Info Card */}
        <View style={historyStyles.detailsCard}>
          <View style={historyStyles.cardHeader}>
            <View style={historyStyles.headerLeft}>
              <View style={historyStyles.serviceIcon}>
                <MaterialIcons name="pets" size={24} color="#58B9D0" />
              </View>
              <View>
                <Text style={historyStyles.detailsServiceTitle}>{serviceTitle}</Text>
                <Text style={historyStyles.detailsProviderName}>{providerName}</Text>
              </View>
            </View>
            <View style={historyStyles.headerRight}>
              <Text style={historyStyles.duration}>{duration} days</Text>
            </View>
          </View>
        </View>

        {/* Date Range Card */}
        <View style={historyStyles.detailsCard}>
          <Text style={historyStyles.cardTitle}>Booking Period</Text>
          <View style={historyStyles.dateSection}>
            <View style={historyStyles.dateItem}>
              <MaterialIcons name="calendar-today" size={16} color="#666" />
              <View style={historyStyles.dateTexts}>
                <Text style={historyStyles.dateLabel}>Check-in</Text>
                <Text style={historyStyles.dateValue}>{formatDate(currentBookingData.startTime)}</Text>
              </View>
            </View>
            <View style={historyStyles.dateDivider} />
            <View style={historyStyles.dateItem}>
              <MaterialIcons name="event" size={16} color="#666" />
              <View style={historyStyles.dateTexts}>
                <Text style={historyStyles.dateLabel}>Check-out</Text>
                <Text style={historyStyles.dateValue}>{formatDate(currentBookingData.endTime)}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Service Features */}
        {currentBookingData.boardingServiceBookings.length > 0 && (
          <View style={historyStyles.detailsCard}>
            <Text style={historyStyles.cardTitle}>Services Included</Text>
            <View style={historyStyles.featuresList}>
              {getServiceFeatures(currentBookingData.boardingServiceBookings[0]).map((feature, index) => (
                <View key={index} style={historyStyles.featureItem}>
                  <MaterialIcons name="check-circle" size={16} color="#10B981" />
                  <Text style={historyStyles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
            {currentBookingData.boardingServiceBookings[0].additionalAdvice && (
              <View style={historyStyles.additionalAdviceSection}>
                <Text style={historyStyles.adviceLabel}>Additional Instructions:</Text>
                <Text style={historyStyles.adviceText}>
                  {currentBookingData.boardingServiceBookings[0].additionalAdvice}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Provider Details */}
        {currentBookingData.service && (
          <View style={historyStyles.detailsCard}>
            <Text style={historyStyles.cardTitle}>Service Provider</Text>
            <View style={historyStyles.providerInfo}>
              <View style={historyStyles.providerDetail}>
                <MaterialIcons name="person" size={16} color="#666" />
                <Text style={historyStyles.providerDetailText}>
                  {currentBookingData.service.firstName} {currentBookingData.service.lastName}
                </Text>
              </View>
              <View style={historyStyles.providerDetail}>
                <MaterialIcons name="email" size={16} color="#666" />
                <Text style={historyStyles.providerDetailText}>
                  {currentBookingData.service.email}
                </Text>
              </View>
              <View style={historyStyles.providerDetail}>
                <MaterialIcons name="phone" size={16} color="#666" />
                <Text style={historyStyles.providerDetailText}>
                  {currentBookingData.service.mobile}
                </Text>
              </View>
              <View style={historyStyles.providerDetail}>
                <MaterialIcons name="location-on" size={16} color="#666" />
                <Text style={historyStyles.providerDetailText}>
                  {currentBookingData.service.address}, {currentBookingData.service.city}, {currentBookingData.service.state}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Status Card */}
        <View style={historyStyles.detailsCard}>
          <Text style={historyStyles.cardTitle}>Status Information</Text>
          
          {/* Payment Status */}
          {currentBookingData.status && (
            <View style={{ marginBottom: 12 }}>
              <View style={historyStyles.statusRow}>
                <MaterialIcons name="payment" size={20} color="#10B981" />
                <View style={{ marginLeft: 8, flex: 1 }}>
                  <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 2 }}>Payment Status</Text>
                  <Text style={historyStyles.statusTextLarge}>
                    {currentBookingData.status.name}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Booking Status */}
          {currentStatus && (
            <View>
              <View style={historyStyles.statusRow}>
                <MaterialIcons name="info-outline" size={20} color="#58B9D0" />
                <View style={{ marginLeft: 8, flex: 1 }}>
                  <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 2 }}>Booking Status</Text>
                  <Text style={historyStyles.statusTextLarge}>
                    {currentStatus.name}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Daily Updates Section */}
        <View style={historyStyles.detailsCard}>
          <Text style={historyStyles.cardTitle}>Daily Updates</Text>
          {loadingDays ? (
            <View style={{ alignItems: 'center', paddingVertical: 20 }}>
              <ActivityIndicator size="large" color="#58B9D0" />
              <Text style={{ marginTop: 12, color: '#666', fontSize: 14 }}>Loading updates...</Text>
            </View>
          ) : !hasAnyUpdates ? (
            <View style={{ alignItems: 'center', paddingVertical: 30 }}>
              <MaterialIcons name="photo-library" size={48} color="#CBD5E1" />
              <Text style={{ marginTop: 12, fontSize: 14, fontWeight: '600', color: '#1F2937' }}>
                No Updates Yet
              </Text>
              <Text style={{ marginTop: 6, fontSize: 13, color: '#6B7280', textAlign: 'center' }}>
                Daily photos and videos will appear here{'\n'}
                Check back later for updates from your boarder
              </Text>
            </View>
          ) : (
            <View style={{ marginTop: 12 }}>
              {bookingDays.map((day, index) => {
                const now = new Date();
                const todayDate = localIsoDate(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
                const isToday = day.date === todayDate;

                return (
                  <View
                    key={day.id}
                    style={{
                      marginBottom: 16,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: isToday ? '#58B9D0' : '#E5E7EB',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Date Header */}
                    <View
                      style={{
                        backgroundColor: isToday ? '#58B9D0' : '#F8F9FB',
                        paddingVertical: 10,
                        paddingHorizontal: 14,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '600',
                          color: isToday ? '#FFFFFF' : '#1F2937',
                        }}
                      >
                        {new Date(day.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                        {isToday && ' (Today)'}
                      </Text>
                    </View>

                    {/* Content */}
                    <View style={{ padding: 12 }}>
                      {/* Show message if this is today's update */}
                      {isToday && day.uploadsWithUrls && day.uploadsWithUrls.length > 0 && (
                        <View style={{
                          backgroundColor: '#EFF6FF',
                          borderRadius: 8,
                          padding: 12,
                          marginBottom: 12,
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}>
                          <MaterialIcons name="check-circle" size={20} color="#3B82F6" />
                          <Text style={{
                            marginLeft: 8,
                            fontSize: 13,
                            color: '#1E40AF',
                            flex: 1,
                          }}>
                            New update uploaded today!
                          </Text>
                        </View>
                      )}
                      {day.uploadsWithUrls && day.uploadsWithUrls.length > 0 ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            marginHorizontal: -4,
                          }}
                        >
                          {day.uploadsWithUrls.map((upload, uploadIndex) => {
                            return (
                              <TouchableOpacity
                                key={uploadIndex}
                                style={{
                                  width: '48%',
                                  aspectRatio: 1,
                                  marginHorizontal: '1%',
                                  marginBottom: 8,
                                  borderRadius: 12,
                                  overflow: 'hidden',
                                  backgroundColor: '#F8F9FB',
                                  borderWidth: 1,
                                  borderColor: '#E5E7EB',
                                }}
                                onPress={() => {
                                  setSelectedMedia(upload);
                                  setShowMediaViewer(true);
                                  if (upload.isVideo) {
                                    setIsVideoLoading(true);
                                    setPaused(false);
                                  }
                                }}
                                activeOpacity={0.8}
                              >
                                {upload.isVideo ? (
                                  <View
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      backgroundColor: '#1F2937',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <MaterialIcons name="play-circle-filled" size={48} color="#FFFFFF" />
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        fontWeight: '600',
                                        color: '#FFFFFF',
                                        marginTop: 8,
                                      }}
                                    >
                                      VIDEO
                                    </Text>
                                  </View>
                                ) : (
                                  <Image
                                    source={{ uri: upload.url }}
                                    style={{ width: '100%', height: '100%' }}
                                    resizeMode="cover"
                                  />
                                )}
                              </TouchableOpacity>
                            );
                          })}
                        </View>
                      ) : (
                        <View style={{
                          alignItems: 'center',
                          paddingVertical: 24,
                          paddingHorizontal: 16,
                        }}>
                          <View style={{
                            width: 56,
                            height: 56,
                            borderRadius: 28,
                            backgroundColor: '#F3F4F6',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 12,
                          }}>
                            <MaterialIcons name="photo-camera" size={28} color="#9CA3AF" />
                          </View>
                          <Text style={{
                            fontSize: 14,
                            fontWeight: '600',
                            color: '#6B7280',
                            marginBottom: 4,
                          }}>
                            No Updates for This Day
                          </Text>
                          <Text style={{
                            fontSize: 12,
                            color: '#9CA3AF',
                            textAlign: 'center',
                          }}>
                            Photos and videos will appear here{'\n'}when uploaded by the boarder
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          )}
        </View>

        {/* Pets Details */}
        <View style={historyStyles.detailsCard}>
          <Text style={historyStyles.cardTitle}>
            Pets ({currentBookingData.boardingServiceBookings.length})
          </Text>
          {loadingPets ? (
            <View style={{ paddingVertical: 20, alignItems: 'center' }}>
              <ActivityIndicator size="small" color="#58B9D0" />
              <Text style={{ marginTop: 8, fontSize: 13, color: '#6B7280' }}>
                Loading pet details...
              </Text>
            </View>
          ) : pets.length > 0 ? (
            <View style={{ marginTop: 12 }}>
              {pets.map((pet, index) => {
                const breedName = typeof pet.breed === 'object'
                  ? (pet.breed?.name || pet.breed?.breedName)
                  : pet.breed;

                const genderLower = pet.gender ? String(pet.gender).toLowerCase() : null;
                const genderIcon = genderLower === 'male' ? 'male' : 'female';
                const genderColor = genderLower === 'male' ? '#3B82F6' : '#EC4899';

                // Format DOB
                const formatDOB = (dob: string) => {
                  try {
                    const date = new Date(dob);
                    return date.toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    });
                  } catch {
                    return dob;
                  }
                };

                return (
                  <View
                    key={pet.id}
                    style={{
                      backgroundColor: '#F9FAFB',
                      borderRadius: 12,
                      padding: 16,
                      marginBottom: index < pets.length - 1 ? 12 : 0,
                      borderWidth: 1,
                      borderColor: '#E5E7EB',
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                      {/* Pet Image */}
                      <View
                        style={{
                          width: 64,
                          height: 64,
                          borderRadius: 32,
                          backgroundColor: '#E0F2FE',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 12,
                          overflow: 'hidden',
                        }}
                      >
                        {pet.profileImg ? (
                          <Image
                            source={{ uri: pet.profileImg }}
                            style={{ width: 64, height: 64 }}
                            resizeMode="cover"
                          />
                        ) : (
                          <MaterialIcons name="pets" size={32} color="#58B9D0" />
                        )}
                      </View>

                      {/* Pet Info */}
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '700',
                            color: '#111827',
                            marginBottom: 6,
                          }}
                        >
                          {pet.petName || pet.name}
                        </Text>

                        {breedName && (
                          <Text
                            style={{
                              fontSize: 13,
                              color: '#6B7280',
                              marginBottom: 8,
                            }}
                          >
                            {breedName}
                          </Text>
                        )}

                        {/* Pet Details Row */}
                        <View
                          style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: 12,
                          }}
                        >
                          {/* Gender */}
                          {pet.gender && (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#FFFFFF',
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                                borderRadius: 6,
                                gap: 4,
                              }}
                            >
                              <MaterialIcons name={genderIcon} size={14} color={genderColor} />
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: '#374151',
                                  fontWeight: '500',
                                }}
                              >
                                {String(pet.gender)}
                              </Text>
                            </View>
                          )}

                          {/* Weight */}
                          {pet.weight && (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#FFFFFF',
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                                borderRadius: 6,
                                gap: 4,
                              }}
                            >
                              <MaterialIcons name="fitness-center" size={14} color="#10B981" />
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: '#374151',
                                  fontWeight: '500',
                                }}
                              >
                                {pet.weight} kg
                              </Text>
                            </View>
                          )}

                          {/* DOB */}
                          {pet.dob && (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#FFFFFF',
                                paddingHorizontal: 8,
                                paddingVertical: 4,
                                borderRadius: 6,
                                gap: 4,
                              }}
                            >
                              <MaterialIcons name="cake" size={14} color="#F59E0B" />
                              <Text
                                style={{
                                  fontSize: 12,
                                  color: '#374151',
                                  fontWeight: '500',
                                }}
                              >
                                {formatDOB(pet.dob)}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={{ paddingVertical: 20, alignItems: 'center' }}>
              <MaterialIcons name="pets" size={48} color="#D1D5DB" />
              <Text style={{ marginTop: 12, fontSize: 14, color: '#6B7280' }}>
                No pet details available
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
      )}

      {/* Action Button - Fixed at bottom */}
      {actionButton && (
        <View style={historyStyles.bottomButtonContainer}>
          <TouchableOpacity
            style={[historyStyles.bottomActionButton, { backgroundColor: actionButton.color }]}
            onPress={actionButton.action}
            disabled={updatingStatus}
          >
            {updatingStatus ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <MaterialIcons name="pets" size={20} color="white" />
                <Text style={historyStyles.bottomActionButtonText}>{actionButton.text}</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Pet Handover Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showHandoverModal}
        onRequestClose={() => setShowHandoverModal(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'flex-end',
        }}>
          <View style={{
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingHorizontal: 20,
            paddingTop: 8,
            paddingBottom: 20,
          }}>
            {/* Bottom Sheet Handle */}
            <View style={{
              width: 40,
              height: 4,
              backgroundColor: '#D1D5DB',
              borderRadius: 2,
              alignSelf: 'center',
              marginTop: 8,
              marginBottom: 12,
            }} />

            {/* Header */}
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}>
              <View>
                <Text style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#111827',
                }}>Pet Handover</Text>
                <Text style={{
                  fontSize: 13,
                  color: '#6B7280',
                  marginTop: 2,
                }}>Provide items for your pet</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowHandoverModal(false)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: '#F3F4F6',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MaterialIcons name="close" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Items List */}
            <View style={{ marginBottom: 16 }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 12,
              }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#374151',
                }}>Items You're Providing</Text>
                <TouchableOpacity
                  onPress={() => setPetItems([...petItems, {name: '', count: ''}])}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#EFF6FF',
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 20,
                    gap: 4,
                  }}
                >
                  <MaterialIcons name="add" size={18} color="#3B82F6" />
                  <Text style={{
                    fontSize: 13,
                    fontWeight: '600',
                    color: '#3B82F6',
                  }}>Add Item</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 300 }} showsVerticalScrollIndicator={false}>
                {petItems.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: '#F9FAFB',
                      borderRadius: 12,
                      padding: 12,
                      marginBottom: 12,
                      borderWidth: 1,
                      borderColor: '#E5E7EB',
                    }}
                  >
                    {/* Item Header with Remove Button */}
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 10,
                    }}>
                      <Text style={{
                        fontSize: 13,
                        fontWeight: '600',
                        color: '#6B7280',
                      }}>Item {index + 1}</Text>
                      {petItems.length > 1 && (
                        <TouchableOpacity
                          onPress={() => {
                            const newItems = petItems.filter((_, i) => i !== index);
                            setPetItems(newItems);
                          }}
                          style={{
                            padding: 4,
                          }}
                        >
                          <MaterialIcons name="delete-outline" size={20} color="#EF4444" />
                        </TouchableOpacity>
                      )}
                    </View>

                    {/* Item Name Input */}
                    <View style={{ marginBottom: 8 }}>
                      <Text style={{
                        fontSize: 12,
                        fontWeight: '500',
                        color: '#6B7280',
                        marginBottom: 6,
                      }}>Item Name</Text>
                      <TextInput
                        style={{
                          borderWidth: 1,
                          borderColor: '#E5E7EB',
                          borderRadius: 8,
                          padding: 10,
                          fontSize: 14,
                          color: '#1F2937',
                          backgroundColor: '#FFFFFF',
                        }}
                        placeholder="e.g., Food bowl, Toy, Blanket"
                        placeholderTextColor="#9CA3AF"
                        value={item.name}
                        onChangeText={(text) => {
                          const newItems = [...petItems];
                          newItems[index].name = text;
                          setPetItems(newItems);
                        }}
                      />
                    </View>

                    {/* Quantity Input */}
                    <View>
                      <Text style={{
                        fontSize: 12,
                        fontWeight: '500',
                        color: '#6B7280',
                        marginBottom: 6,
                      }}>Quantity</Text>
                      <TextInput
                        style={{
                          borderWidth: 1,
                          borderColor: '#E5E7EB',
                          borderRadius: 8,
                          padding: 10,
                          fontSize: 14,
                          color: '#1F2937',
                          backgroundColor: '#FFFFFF',
                        }}
                        placeholder="Enter quantity"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="numeric"
                        value={item.count}
                        onChangeText={(text) => {
                          // Only allow numbers
                          const numericText = text.replace(/[^0-9]/g, '');
                          const newItems = [...petItems];
                          newItems[index].count = numericText;
                          setPetItems(newItems);
                        }}
                      />
                    </View>
                  </View>
                ))}
              </ScrollView>

              <Text style={{
                fontSize: 12,
                color: '#6B7280',
                marginTop: 4,
              }}>Add all items you're providing with quantities</Text>
            </View>

            {/* Action Buttons */}
            <View style={{
              flexDirection: 'row',
              gap: 12,
            }}>
              <TouchableOpacity
                onPress={() => {
                  setShowHandoverModal(false);
                  setPetItems([{name: '', count: ''}]);
                }}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  borderRadius: 12,
                  backgroundColor: '#F3F4F6',
                  alignItems: 'center',
                }}
              >
                <Text style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#6B7280',
                }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => submitPetExtras(currentBookingData.id)}
                disabled={submittingHandover || petItems.every(item => !item.name.trim() || !item.count.trim())}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  borderRadius: 12,
                  backgroundColor: petItems.some(item => item.name.trim() && item.count.trim()) ? '#58B9D0' : '#D1D5DB',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 8,
                }}
              >
                {submittingHandover ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <>
                    <MaterialIcons name="pets" size={20} color="#FFFFFF" />
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '600',
                      color: '#FFFFFF',
                    }}>Handover Pet</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Full Screen Media Viewer Modal */}
      <Modal
        visible={showMediaViewer}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowMediaViewer(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: '#000000',
        }}>
          {/* Close Button */}
          <TouchableOpacity
            onPress={() => setShowMediaViewer(false)}
            style={{
              position: 'absolute',
              top: 50,
              right: 20,
              zIndex: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              borderRadius: 20,
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MaterialIcons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Media Content */}
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {selectedMedia && (
              selectedMedia.isVideo ? (
                <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height * 0.4, justifyContent: 'center', alignItems: 'center' }}>
                  {/* Video Player */}
                  <Video
                    ref={videoRef}
                    source={{ uri: selectedMedia.url }}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    controls={true}
                    resizeMode="contain"
                    paused={paused}
                    onLoadStart={() => setIsVideoLoading(true)}
                    onLoad={() => setIsVideoLoading(false)}
                    onError={(error: any) => {
                      console.error('Video error:', error);
                      setIsVideoLoading(false);
                    }}
                  />

                  {/* Loading Indicator */}
                  {isVideoLoading && (
                    <View style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}>
                      <ActivityIndicator size="large" color="#58B9D0" />
                      <Text style={{ color: '#FFFFFF', marginTop: 10 }}>Loading video...</Text>
                    </View>
                  )}

                  {/* Play/Pause Button Overlay */}
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: [{ translateX: -30 }, { translateY: -30 }],
                      width: 60,
                      height: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: 30,
                    }}
                    onPress={() => setPaused(!paused)}
                  >
                    <MaterialIcons
                      name={paused ? "play-arrow" : "pause"}
                      size={40}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <ScrollView
                  maximumZoomScale={3}
                  minimumZoomScale={1}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    source={{ uri: selectedMedia.url }}
                    style={{
                      width: Dimensions.get('window').width,
                      height: Dimensions.get('window').height,
                    }}
                    resizeMode="contain"
                  />
                </ScrollView>
              )
            )}
          </View>

          {/* Filename/Info Footer */}
          {selectedMedia && (
            <View style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              paddingVertical: 16,
              paddingHorizontal: 20,
            }}>
              <Text style={{
                color: '#FFFFFF',
                fontSize: 14,
                textAlign: 'center',
              }} numberOfLines={1}>
                {selectedMedia.filename}
              </Text>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default ViewDetails;