import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
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

// Interface definitions from History.tsx
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

  const getCurrentStatus = (flowHistories: FlowHistory[]) => {
    if (flowHistories.length === 0) return null;
    const latestFlow = flowHistories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
    return { id: latestFlow.boardingBookingFlowOptionsId };
  };

  // Handle chat navigation
  const handleChatPress = () => {
    if (!currentBookingData.serviceBookings || currentBookingData.serviceBookings.length === 0) {
      Alert.alert('Error', 'Provider information not available');
      return;
    }

    const serviceProvider = currentBookingData.serviceBookings[0].service;
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

      const response = await fetch(`http://13.204.155.197/api/boarding-booking-flow-history/by-boarding?boardingBookingId=${bookingId}`, {
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
    await refreshBookingData(currentBookingData.bookingDetail.id);
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
        const ownerResponse = await fetch('http://13.204.155.197/api/pet-owner/findByUserId', {
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

      const response = await fetch('http://13.204.155.197/api/boarding-booking-flow-history', {
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

  const duration = calculateDuration(currentBookingData.bookingDetail.startTime, currentBookingData.bookingDetail.endTime);
  const serviceTitle = getServiceTitle(currentBookingData);
  const providerName = getProviderName(currentBookingData);
  const currentStatus = getCurrentStatus(currentBookingData.flowHistories);
  const actionButton = currentStatus ? getActionButton(currentStatus.id, currentBookingData.bookingDetail.id) : null;

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
            #{currentBookingData.bookingDetail.id}
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
                <Text style={historyStyles.dateValue}>{formatDate(currentBookingData.bookingDetail.startTime)}</Text>
              </View>
            </View>
            <View style={historyStyles.dateDivider} />
            <View style={historyStyles.dateItem}>
              <MaterialIcons name="event" size={16} color="#666" />
              <View style={historyStyles.dateTexts}>
                <Text style={historyStyles.dateLabel}>Check-out</Text>
                <Text style={historyStyles.dateValue}>{formatDate(currentBookingData.bookingDetail.endTime)}</Text>
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
        {currentBookingData.serviceBookings.length > 0 && (
          <View style={historyStyles.detailsCard}>
            <Text style={historyStyles.cardTitle}>Service Provider</Text>
            <View style={historyStyles.providerInfo}>
              <View style={historyStyles.providerDetail}>
                <MaterialIcons name="person" size={16} color="#666" />
                <Text style={historyStyles.providerDetailText}>
                  {currentBookingData.serviceBookings[0].service.firstName} {currentBookingData.serviceBookings[0].service.lastName}
                </Text>
              </View>
              <View style={historyStyles.providerDetail}>
                <MaterialIcons name="email" size={16} color="#666" />
                <Text style={historyStyles.providerDetailText}>
                  {currentBookingData.serviceBookings[0].service.email}
                </Text>
              </View>
              <View style={historyStyles.providerDetail}>
                <MaterialIcons name="phone" size={16} color="#666" />
                <Text style={historyStyles.providerDetailText}>
                  {currentBookingData.serviceBookings[0].service.mobile}
                </Text>
              </View>
              <View style={historyStyles.providerDetail}>
                <MaterialIcons name="location-on" size={16} color="#666" />
                <Text style={historyStyles.providerDetailText}>
                  {currentBookingData.serviceBookings[0].service.address}, {currentBookingData.serviceBookings[0].service.city}, {currentBookingData.serviceBookings[0].service.state}
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
                {getStatusMessage(currentStatus.id)}
              </Text>
            </View>
          </View>
        )}

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
    </View>
  );
};

export default ViewDetails;