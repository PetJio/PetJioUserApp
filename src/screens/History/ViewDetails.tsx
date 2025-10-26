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
  const [customerProvides, setCustomerProvides] = useState<string>('');
  const [submittingHandover, setSubmittingHandover] = useState<boolean>(false);

  // Simulate initial data loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Fetch booking days when component mounts
  useEffect(() => {
    if (currentBookingData?.id) {
      console.log('📋 Fetching booking days for booking ID:', currentBookingData.id);
      fetchBookingDays(currentBookingData.id);
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
    // Return the status from the new API response
    return booking.status;
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
          action: () => updateBookingStatus(bookingId, 6),
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
          const anyUpdates = finalDays.some(d => Array.isArray(d.uploadsWithUrls) && d.uploadsWithUrls.length > 0);
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

  // Function to refresh booking data from API
  const refreshBookingData = async (bookingId: number) => {
    try {
      const token = await getAuthToken();
      if (!token) return;

      const response = await fetch(`${API_CONFIG.BASE_URL}/boarding-booking-flow-history/by-boarding?boardingBookingId=${bookingId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.statusCode === 200 && result.body) {
          // The API returns an array of flow history items, so we need to merge with existing booking data
          const updatedFlowHistories = result.body;
          setCurrentBookingData(prevData => ({
            ...prevData,
            flowHistories: updatedFlowHistories
          }));
        }
      }
    } catch (error) {
      console.error('Error refreshing booking data:', error);
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
    if (!customerProvides.trim()) {
      Alert.alert('Error', 'Please enter items you are providing');
      return;
    }

    setSubmittingHandover(true);
    try {
      const token = await getAuthToken();
      if (!token) {
        Alert.alert('Error', 'Authentication token not found');
        return;
      }

      // Call pet-extras API
      const petExtrasResponse = await fetch(`${API_CONFIG.BASE_URL}/api/pet-extras`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerProvides: customerProvides.trim(),
          bookingId: bookingId
        })
      });

      if (!petExtrasResponse.ok) {
        Alert.alert('Error', 'Failed to save items provided');
        return;
      }

      // After successful pet extras submission, update status to handover (status 3)
      await updateBookingStatus(bookingId, 3);

      // Close modal and reset
      setShowHandoverModal(false);
      setCustomerProvides('');
    } catch (error) {
      console.error('Error submitting pet extras:', error);
      Alert.alert('Error', 'Failed to process handover');
    } finally {
      setSubmittingHandover(false);
    }
  };

  const updateBookingStatus = async (bookingId: number, newStatusId: number) => {
    setUpdatingStatus(true);
    try {
      const token = await getAuthToken();
      if (!token) {
        Alert.alert('Error', 'Authentication token not found');
        return;
      }

      // Get owner ID if not available
      let currentOwnerId = ownerId;
      if (!currentOwnerId) {
        const ownerResponse = await fetch(`${API_CONFIG.BASE_URL}/pet-owner/findByUserId`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (ownerResponse.ok) {
          const ownerData = await ownerResponse.json();
          if (ownerData.statusCode === 200) {
            currentOwnerId = ownerData.body.id;
            setOwnerId(currentOwnerId);
          }
        }
      }

      if (!currentOwnerId) {
        Alert.alert('Error', 'Unable to get owner information');
        return;
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}/boarding-booking-flow-history`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: currentOwnerId,
          boardingBookingFlowOptionsId: newStatusId,
          boardingBookingId: bookingId
        })
      });

      if (response.ok) {
        // Refresh booking data instead of navigating back
        await refreshBookingData(bookingId);

        // Show dynamic status message
        Alert.alert('Success', getStatusChangeMessage(newStatusId));
      } else {
        Alert.alert('Error', 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      Alert.alert('Error', 'Failed to update status');
    } finally {
      setUpdatingStatus(false);
    }
  };

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

        {/* Current Status */}
        {currentStatus && (
          <View style={historyStyles.detailsCard}>
            <Text style={historyStyles.cardTitle}>Current Status</Text>
            <View style={historyStyles.statusRow}>
              <MaterialIcons name="info-outline" size={20} color="#58B9D0" />
              <Text style={historyStyles.statusTextLarge}>
                {currentStatus.name}
              </Text>
            </View>
          </View>
        )}

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

        {/* Pets Summary */}
        <View style={historyStyles.detailsCard}>
          <Text style={historyStyles.cardTitle}>Pets</Text>
          <View style={historyStyles.petsSection}>
            <MaterialIcons name="pets" size={20} color="#58B9D0" />
            <Text style={historyStyles.petsTextLarge}>
              {currentBookingData.boardingServiceBookings.length} pet{currentBookingData.boardingServiceBookings.length !== 1 ? 's' : ''} boarded
            </Text>
          </View>
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

            {/* Items Input */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#374151',
                marginBottom: 8,
              }}>Items You're Providing</Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  borderRadius: 12,
                  padding: 12,
                  fontSize: 14,
                  color: '#1F2937',
                  backgroundColor: '#F9FAFB',
                  minHeight: 100,
                  textAlignVertical: 'top',
                }}
                placeholder="e.g., Food bowl, favorite toy, blanket..."
                placeholderTextColor="#9CA3AF"
                value={customerProvides}
                onChangeText={setCustomerProvides}
                multiline
                numberOfLines={4}
              />
              <Text style={{
                fontSize: 12,
                color: '#6B7280',
                marginTop: 4,
              }}>List all items you're providing for your pet</Text>
            </View>

            {/* Action Buttons */}
            <View style={{
              flexDirection: 'row',
              gap: 12,
            }}>
              <TouchableOpacity
                onPress={() => setShowHandoverModal(false)}
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
                disabled={submittingHandover || !customerProvides.trim()}
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  borderRadius: 12,
                  backgroundColor: customerProvides.trim() ? '#58B9D0' : '#D1D5DB',
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