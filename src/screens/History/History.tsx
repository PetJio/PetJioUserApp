import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../../config/api';
import { navigate } from '../../utils/navigationService';
import historyStyles from './history.styles';
import { HistoryCardSkeleton } from '../../components/SkeletonLoader/SkeletonLoader';

// Interface definitions based on API response
interface BookingDetail {
  id: number;
  startTime: string;
  endTime: string;
}

interface Service {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  address: string;
  businessName?: string;
}

interface ServiceBooking {
  serviceId: number;
  customerId: number;
  consultationId: number;
  service: Service;
}

interface BoardingServiceBooking {
  id: number;
  possessions: boolean;
  backUpFood: boolean;
  shaveAndTrimming: boolean;
  groomingBeforeDischarge: boolean;
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
  bookingDetail: BookingDetail;
  serviceBookings: ServiceBooking[];
  boardingServiceBookings: BoardingServiceBooking[];
  flowHistories: FlowHistory[];
}

interface ApiResponse {
  statusCode: number;
  message: string;
  body: BookingHistoryItem[];
}

interface FlowOptionsResponse {
  statusCode: number;
  message: string;
  body: FlowOption[];
}

const History: React.FC = () => {
  const [bookings, setBookings] = useState<BookingHistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [ownerId, setOwnerId] = useState<number | null>(null);
  const [flowOptions, setFlowOptions] = useState<FlowOption[]>([]);
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);

  useEffect(() => {
    initializeAndLoadData();
    loadFlowOptions();
  }, []);

  // Refresh data when screen comes into focus (after returning from ViewDetails)
  useFocusEffect(
    React.useCallback(() => {
      if (ownerId && bookings.length > 0) {
        // Only refresh if we already have data and ownerId
        loadBookingHistory(ownerId);
      }
    }, [ownerId, bookings.length])
  );

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

  // Function to get owner ID from API
  const getOwnerIdFromAPI = async () => {
    try {
      const token = await getAuthToken();
      if (!token) {
        console.error('No authentication token found');
        return null;
      }

      const apiUrl = `${API_CONFIG.BASE_URL}/api/pet-owner/findByUserId`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error('❌ API Error Response:', response.status);
        return null;
      }

      const result = await response.json();

      if (result.statusCode === 200) {
        return result.body.id;
      } else {
        console.error('❌ API returned non-200 status:', result.statusCode);
        return null;
      }
    } catch (error) {
      console.error('🔥 Critical Error in getOwnerIdFromAPI:', error);
      return null;
    }
  };

  const initializeAndLoadData = async () => {
    const ownerIdFromAPI = await getOwnerIdFromAPI();
    if (ownerIdFromAPI) {
      setOwnerId(ownerIdFromAPI);
      loadBookingHistory(ownerIdFromAPI);
    } else {
      setError('Unable to retrieve owner information. Please try again.');
      setLoading(false);
    }
  };

  const loadBookingHistory = async (userId: number) => {
    setLoading(true);
    setError('');

    try {
      const token = await getAuthToken();
      if (!token) {
        setError('Authentication token not found. Please login again.');
        return;
      }

      const apiUrl = `http://13.204.155.197/api/service-bookings/booking-details-by-owner/${userId}`;
      console.log('🌐 Fetching booking history from:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 Booking History API Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Booking History API Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('📄 Booking History Raw Response length:', responseText.length);

      let result: ApiResponse;
      try {
        result = JSON.parse(responseText);
        console.log('✅ Booking History Parsed Response:', {
          statusCode: result.statusCode,
          message: result.message,
          bookingCount: result.body ? result.body.length : 0,
        });
      } catch (parseError) {
        console.error('❌ Booking History JSON Parse Error:', parseError);
        throw new Error(`Invalid JSON response`);
      }

      if (result.statusCode === 200) {
        const bookingData = result.body || [];
        console.log('✅ Booking History Success - Data loaded:', bookingData.length, 'bookings');

        // Sort bookings by start time in descending order (newest first)
        const sortedBookings = bookingData.sort((a, b) => {
          const dateA = new Date(a.bookingDetail.startTime);
          const dateB = new Date(b.bookingDetail.startTime);
          return dateB.getTime() - dateA.getTime();
        });

        setBookings(sortedBookings);

        if (bookingData.length === 0) {
          setError('No booking history found');
        }
      } else {
        console.error('❌ Booking History API returned non-200 status:', result.statusCode);
        throw new Error(result.message || 'Failed to fetch booking history');
      }
    } catch (error) {
      console.error('🔥 Critical Error in loadBookingHistory:', error);
      setError(`Failed to load booking history: ${error.message}`);
    } finally {
      console.log('🏁 loadBookingHistory completed');
      setLoading(false);
    }
  };

  const loadFlowOptions = async () => {
    try {
      const token = await getAuthToken();
      if (!token) return;

      const response = await fetch('http://13.204.155.197/api/boarding-booking-flow-history-options', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result: FlowOptionsResponse = await response.json();
        if (result.statusCode === 200) {
          setFlowOptions(result.body);
        }
      }
    } catch (error) {
      console.error('Error loading flow options:', error);
    }
  };

  const onRefresh = async () => {
    if (ownerId) {
      setRefreshing(true);
      await loadBookingHistory(ownerId);
      setRefreshing(false);
    }
  };

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
    if (booking.boardingServiceBookings.length > 0) {
      return 'Boarding Service';
    } else if (booking.serviceBookings.length > 0) {
      return 'Pet Service';
    }
    return 'Service Booking';
  };

  const getProviderName = (booking: BookingHistoryItem) => {
    if (booking.serviceBookings.length > 0) {
      const service = booking.serviceBookings[0].service;
      return `${service.firstName} ${service.lastName}`;
    }
    return 'Service Provider';
  };

  const getServiceFeatures = (booking: BoardingServiceBooking) => {
    const features = [];
    if (booking.possessions) features.push('Possessions');
    if (booking.backUpFood) features.push('Backup Food');
    if (booking.shaveAndTrimming) features.push('Grooming');
    if (booking.groomingBeforeDischarge) features.push('Pre-discharge Grooming');
    return features;
  };

  const getCurrentStatus = (flowHistories: FlowHistory[]) => {
    if (flowHistories.length === 0) return null;
    const latestFlow = flowHistories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
    return flowOptions.find(option => option.id === latestFlow.boardingBookingFlowOptionsId);
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

  const getActionButton = (statusId: number, bookingId: number) => {
    switch (statusId) {
      case 8:
        return {
          text: 'Handover Pet',
          action: () => updateBookingStatus(bookingId, 3),
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

  const updateBookingStatus = async (bookingId: number, newStatusId: number) => {
    if (!ownerId) return;

    setUpdatingStatus(bookingId);
    try {
      const token = await getAuthToken();
      if (!token) {
        Alert.alert('Error', 'Authentication token not found');
        return;
      }

      const response = await fetch('http://13.204.155.197/api/boarding-booking-flow-history', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: ownerId,
          boardingBookingFlowOptionsId: newStatusId,
          boardingBookingId: bookingId
        })
      });

      if (response.ok) {
        Alert.alert('Success', 'Status updated successfully');
        await loadBookingHistory(ownerId);
      } else {
        Alert.alert('Error', 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      Alert.alert('Error', 'Failed to update status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleViewDetails = (item: BookingHistoryItem) => {
    navigate('ViewDetails', { bookingItem: item });
  };

  const renderBookingItem = ({ item }: { item: BookingHistoryItem }) => {
    const duration = calculateDuration(item.bookingDetail.startTime, item.bookingDetail.endTime);
    const serviceTitle = getServiceTitle(item);
    const providerName = getProviderName(item);
    const currentStatus = getCurrentStatus(item.flowHistories);

    return (
      <View style={historyStyles.bookingCard}>
        {/* Header */}
        <View style={historyStyles.cardHeader}>
          <View style={historyStyles.headerLeft}>
            <View style={historyStyles.serviceIcon}>
              <MaterialIcons name="pets" size={20} color="#58B9D0" />
            </View>
            <View>
              <Text style={historyStyles.serviceTitle}>{serviceTitle}</Text>
              <Text style={historyStyles.providerName}>{providerName}</Text>
            </View>
          </View>
          <View style={historyStyles.headerRight}>
            <Text style={historyStyles.bookingId}>#{item.bookingDetail.id}</Text>
            <Text style={historyStyles.duration}>{duration} days</Text>
          </View>
        </View>

        {/* Minimal Date Info */}
        <View style={historyStyles.minimalDateSection}>
          <Text style={historyStyles.dateRange}>
            {formatDate(item.bookingDetail.startTime)} - {formatDate(item.bookingDetail.endTime)}
          </Text>
        </View>

        {/* Status */}
        {currentStatus && (
          <View style={historyStyles.statusRow}>
            <MaterialIcons name="info-outline" size={16} color="#666" />
            <Text style={historyStyles.statusText}>
              {getStatusMessage(currentStatus.id)}
            </Text>
          </View>
        )}

        {/* Footer */}
        <View style={historyStyles.cardFooter}>
          <Text style={historyStyles.bookingDate}>
            {item.boardingServiceBookings.length} pet{item.boardingServiceBookings.length !== 1 ? 's' : ''}
          </Text>
          <TouchableOpacity
            style={historyStyles.viewButton}
            onPress={() => handleViewDetails(item)}
          >
            <Text style={historyStyles.viewButtonText}>View Details</Text>
            <MaterialIcons name="chevron-right" size={16} color="#58B9D0" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={historyStyles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
        animated={true}
      />

      {/* Header - Service Page Style */}
      <View style={historyStyles.serviceStyleHeader}>
        <View style={historyStyles.serviceHeaderContainer}>
          <View style={historyStyles.serviceHeaderLeft}>
            <Text style={historyStyles.serviceHeaderTitle}>History</Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <View style={historyStyles.content}>
        {loading && !refreshing ? (
          <View style={{ flex: 1, paddingTop: 20 }}>
            {[...Array(5)].map((_, index) => (
              <HistoryCardSkeleton key={index} />
            ))}
          </View>
        ) : error ? (
          <View style={historyStyles.errorContainer}>
            <MaterialIcons name="error-outline" size={48} color="#E74C3C" />
            <Text style={historyStyles.errorText}>{error}</Text>
            <TouchableOpacity style={historyStyles.retryButton} onPress={initializeAndLoadData}>
              <Text style={historyStyles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={bookings}
            renderItem={renderBookingItem}
            keyExtractor={(item) => item.bookingDetail.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              historyStyles.listContainer,
              bookings.length === 0 && historyStyles.emptyList
            ]}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#58B9D0']}
                tintColor="#58B9D0"
              />
            }
            ListEmptyComponent={
              !loading && !error ? (
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 80,
                  paddingHorizontal: 20,
                }}>
                  <View style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: '#F3F4F6',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 24,
                  }}>
                    <MaterialIcons name="history" size={48} color="#9CA3AF" />
                  </View>
                  <Text style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#374151',
                    textAlign: 'center',
                    marginBottom: 8,
                  }}>
                    No Booking History
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    color: '#6B7280',
                    textAlign: 'center',
                    lineHeight: 20,
                    marginBottom: 32,
                  }}>
                    Your booking history will appear here{'\n'}once you make your first booking
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#58B9D0',
                      paddingHorizontal: 32,
                      paddingVertical: 16,
                      borderRadius: 25,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                    }}
                    onPress={() => navigate('Main')}
                  >
                    <MaterialIcons name="pets" size={20} color="#FFFFFF" />
                    <Text style={{
                      color: '#FFFFFF',
                      fontSize: 16,
                      fontWeight: '600',
                    }}>
                      Book a Service
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null
            }
          />
        )}
      </View>
    </View>
  );
};

export default History;