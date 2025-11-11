import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import Icons from '../../../assets/icons';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { storageService } from '../../utils/storage';
import { API_CONFIG } from '../../config/api';
import { navigate, reset } from '../../utils/navigationService';
import { useFocusEffect } from '@react-navigation/native';
import { PetSkeleton, AppointmentCardSkeleton } from '../../components/SkeletonLoader/SkeletonLoader';
import { blogs } from '../../data/blogs';
import { petNews } from '../../data/news';

interface PetCategory {
  id: number;
  catName: string;
}

interface PetSize {
  id: number;
  size: string;
}

interface PetGender {
  id: number;
  name: string;
}

interface PetProfile {
  id: number;
  petName: string;
  ageInYears: number | null;
  ageInMonths: number | null;
  category: PetCategory;
  size: PetSize;
  height: string | null;
  profileImg: string | null;
  gender: PetGender;
  weight: string | null;
  dailyFeedCount: number | null;
  treats: string | null;
  cookie: string | null;
}

interface PetApiResponse {
  statusCode: number;
  message: string;
  body: PetProfile[];
}

// Booking interfaces
interface BookingHistoryItem {
  id: number;
  mode: { id: number; value: string };
  startTime: string;
  endTime: string;
  customer: any;
  status: { id: number; name: string };
  service: any;
  boarding: any;
  boardingServiceBookings: any[];
  flowHistories?: Array<{
    id: number;
    boardingBookingFlowOptionsId: number;
    createdAt: string;
  }>;
}

const Home: React.FC = () => {
  const [userName, setUserName] = useState<string>('User');
  const [pets, setPets] = useState<PetProfile[]>([]);
  const [loadingPets, setLoadingPets] = useState<boolean>(true);
  const [petsError, setPetsError] = useState<string | null>(null);

  // Appointments state
  const [appointments, setAppointments] = useState<BookingHistoryItem[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState<boolean>(true);
  const [appointmentsError, setAppointmentsError] = useState<string | null>(null);

  // Logout handler for 401 errors
  const handleUnauthorized = async () => {
    try {
      console.log('🚪 Unauthorized access detected - logging out user');
      await storageService.logout();
      reset('Login'); // Reset navigation stack to Login screen
    } catch (error) {
      console.error('❌ Error during logout:', error);
      // Still navigate to login even if logout fails
      reset('Login');
    }
  };

  // Force status bar to be white whenever Home screen is focused
  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === 'android') {
        // Force completely opaque white status bar
        StatusBar.setBackgroundColor('#FFFFFF', false);
        StatusBar.setBarStyle('dark-content', false);
        StatusBar.setTranslucent(false);
        StatusBar.setHidden(false);

        // Try setting again with animation after a small delay
        setTimeout(() => {
          StatusBar.setBackgroundColor('#FFFFFF', true);
          StatusBar.setBarStyle('dark-content', true);
        }, 100);
      }
    }, []),
  );

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const firstName = await storageService.getUserFirstName();
        setUserName(firstName);
      } catch (error) {
        console.error('Error loading user name:', error);
      }
    };

    loadUserName();
    fetchPets(); // Fetch pets when component mounts
    fetchAppointments(); // Fetch appointments when component mounts
  }, []);

  const getAuthToken = async () => {
    try {
      // Use storageService to get the token - it handles JSON parsing correctly
      const token = await storageService.getUserToken();
      if (token) {
        console.log('✅ Auth token retrieved successfully');
        return token;
      }
      console.warn('⚠️ No auth token found in storage');
      return null;
    } catch (error) {
      console.error('❌ Error getting auth token:', error);
      return null;
    }
  };

  const getOwnerIdFromAPI = async () => {
    try {
      const token = await getAuthToken();
      if (!token) {
        console.error('No authentication token found');
        return null;
      }

      const apiUrl = `${API_CONFIG.BASE_URL}/api/pet-owner/findByUserId`;

      // Print CURL command
      console.log('\n========================================');
      console.log('📡 GET OWNER ID API CALL');
      console.log('========================================');
      console.log('🔗 CURL Command:');
      console.log(`curl -X GET '${apiUrl}' \\`);
      console.log(`  -H 'Content-Type: application/json' \\`);
      console.log(`  -H 'Authorization: Bearer ${token}'`);
      console.log('========================================\n');

      console.log('📤 Request Details:');
      console.log('  URL:', apiUrl);
      console.log('  Method: GET');
      console.log('  Headers:', {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.substring(0, 20)}...`,
      });

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('\n📥 Response Details:');
      console.log('  Status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('  Body (Error):', errorText);
        console.log('========================================\n');
        console.error('❌ API Error Response:', errorText);

        // Check for 401 Unauthorized status
        if (response.status === 401) {
          console.log('🔒 401 Unauthorized - User session expired');
          await handleUnauthorized();
          return null;
        }

        return null;
      }

      const responseText = await response.text();
      console.log('  Body (Raw):', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('  Body (Parsed):', JSON.stringify(data, null, 2));
        console.log('========================================\n');
        console.log('✅ Parsed Response Data:', {
          statusCode: data.statusCode,
          message: data.message,
          hasBody: !!data.body,
          ownerId: data.body?.id,
        });
      } catch (parseError) {
        console.log('========================================\n');
        console.error('❌ JSON Parse Error:', parseError);
        return null;
      }

      if (data.statusCode === 200 && data.body?.id) {
        console.log('✅ Owner ID found:', data.body.id);
        return data.body.id;
      } else {
        console.error('❌ API returned non-200 status or no owner ID found');
        return null;
      }
    } catch (error) {
      console.error('🔥 Critical Error in getOwnerIdFromAPI:', error);
      return null;
    }
  };

  const fetchPets = async () => {
    setLoadingPets(true);
    setPetsError(null);

    try {
      console.log('🔍 HOME PAGE PETS DEBUG - Starting pets fetch');

      const token = await getAuthToken();
      if (!token) {
        console.error('❌ No authentication token found');
        setPetsError('Authentication token not found. Please login again.');
        return;
      }

      // Get the owner ID from API
      const ownerId = await getOwnerIdFromAPI();
      if (!ownerId) {
        console.error('❌ No owner ID found');
        setPetsError('Owner ID not found. Please try refreshing the page.');
        return;
      }

      console.log('🚀 FETCHING PETS - Starting pet profiles fetch');
      console.log('🔑 Using Owner ID:', ownerId);

      const apiUrl = `${API_CONFIG.BASE_URL}/api/pet-profile/owner/${ownerId}`;
      console.log('🌐 Pet Profiles Request URL:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 Pet Profiles Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Pet Profiles API Error:', errorText);

        // Check for 401 Unauthorized status
        if (response.status === 401) {
          console.log('🔒 401 Unauthorized on Pet Profiles - User session expired');
          await handleUnauthorized();
          return;
        }

        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`,
        );
      }

      const responseText = await response.text();
      console.log('📄 Pet Profiles Raw Response Text:', responseText);

      let result: PetApiResponse;
      try {
        result = JSON.parse(responseText);
        console.log('✅ Pet Profiles Parsed Response:', {
          statusCode: result.statusCode,
          message: result.message,
          petCount: result.body ? result.body.length : 0,
          petNames: result.body ? result.body.map(pet => pet.petName) : [],
        });
      } catch (parseError) {
        console.error('❌ Pet Profiles JSON Parse Error:', parseError);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }

      if (result.statusCode === 200) {
        console.log('✅ Pet Profiles Success - Data loaded:', result.body);
        setPets(result.body || []);
      } else {
        console.error(
          '❌ Pet Profiles API returned non-200 status:',
          result.statusCode,
        );
        throw new Error(result.message || 'Failed to fetch pet profiles');
      }
    } catch (error) {
      console.error('🔥 Critical Error in fetchPets:', error);
      setPetsError(`Failed to load pets: ${error.message}`);
    } finally {
      console.log('🏁 fetchPets completed');
      setLoadingPets(false);
    }
  };

  const fetchAppointments = async () => {
    setLoadingAppointments(true);
    setAppointmentsError(null);

    try {
      console.log('📅 HOME PAGE - Starting appointments fetch');

      const token = await getAuthToken();
      if (!token) {
        console.error('❌ No authentication token found');
        setAppointmentsError('Authentication token not found');
        return;
      }

      // Get the owner ID from API
      const ownerId = await getOwnerIdFromAPI();
      if (!ownerId) {
        console.error('❌ No owner ID found');
        setAppointmentsError('Owner ID not found');
        return;
      }

      console.log('🚀 FETCHING APPOINTMENTS - Using Owner ID:', ownerId);

      const apiUrl = `${API_CONFIG.BASE_URL}/api/booking-details/get-booking-by-pet-owner/${ownerId}`;
      console.log('🌐 Appointments Request URL:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 Appointments Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Appointments API Error:', errorText);

        if (response.status === 401) {
          console.log('🔒 401 Unauthorized on Appointments');
          await handleUnauthorized();
          return;
        }

        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Appointments Response:', {
        statusCode: result.statusCode,
        bookingCount: result.body ? result.body.length : 0,
      });

      if (result.statusCode === 200) {
        const bookingData = result.body || [];

        // Filter for upcoming and ongoing appointments
        const now = new Date();
        const upcomingBookings = bookingData.filter((booking: BookingHistoryItem) => {
          const endTime = new Date(booking.endTime);

          // Get the latest flow status
          const latestFlowStatus = booking.flowHistories && booking.flowHistories.length > 0
            ? booking.flowHistories[booking.flowHistories.length - 1].boardingBookingFlowOptionsId
            : null;

          // Filter criteria:
          // 1. Booking hasn't ended yet (endTime is in the future)
          // 2. Status is not completed (status 6)
          // Flow statuses: 7=Pending, 8=Accepted, 3=Pet Handover, 4=Pet with Boarder, 5=Pet Returned, 6=Completed
          // If no flow status exists yet (new booking), include it
          const isNotEnded = endTime > now;
          const isActiveStatus = latestFlowStatus === null || latestFlowStatus !== 6; // Include if no status or not completed

          console.log(`📊 Booking ${booking.id}: endTime=${booking.endTime}, latestStatus=${latestFlowStatus}, isNotEnded=${isNotEnded}, isActive=${isActiveStatus}`);

          return isNotEnded && isActiveStatus;
        });

        // Sort by start time (nearest first)
        const sortedBookings = upcomingBookings.sort((a, b) => {
          return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
        });

        console.log('✅ Filtered Upcoming Appointments:', sortedBookings.length);
        setAppointments(sortedBookings);
      } else {
        throw new Error(result.message || 'Failed to fetch appointments');
      }
    } catch (error) {
      console.error('🔥 Error in fetchAppointments:', error);
      setAppointmentsError(`Failed to load appointments: ${error.message}`);
    } finally {
      setLoadingAppointments(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
        animated={false}
        hidden={false}
      />

      {/* Clean Sticky Header */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          paddingBottom: responsiveHeight(2),
          paddingHorizontal: responsiveWidth(5),
          zIndex: 1000,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.02,
          shadowRadius: 3,
          elevation: 1,
          paddingTop: Platform.OS === 'ios' ? responsiveHeight(6) : responsiveHeight(5),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: '#1F2937',
                lineHeight: 28,
              }}
            >
              Hello, {userName}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#6B7280',
                marginTop: 2,
              }}
            >
              Welcome back to PetJio
            </Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: responsiveHeight(12) }}
      >
        <View style={styles.subcontainer}>
          {/* Pets Section Header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: responsiveWidth(5),
              marginTop: responsiveHeight(2),
              marginBottom: responsiveHeight(1),
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#1F2937',
                }}
              >
                My Pets
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#6B7280',
                  marginTop: 2,
                }}
              >
                {pets.length} {pets.length === 1 ? 'pet' : 'pets'} in your care
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigate('AddPet')}
              style={{
                backgroundColor: '#58B9D0',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
              }}
              activeOpacity={0.8}
            >
              <MaterialIcons name="add" size={18} color="#FFFFFF" />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: '#FFFFFF',
                }}
              >
                Add Pet
              </Text>
            </TouchableOpacity>
          </View>

          {/* Pets Section - Reference Project Style */}
          {loadingPets ? (
            <View style={styles.doctoranddogimagecontainer}>
              <PetSkeleton />
            </View>
          ) : petsError ? (
            <View style={styles.doctoranddogimagecontainer}>
              <View style={styles.errorContainer}>
                <View style={styles.errorIconWrapper}>
                  <MaterialIcons name="pets" size={40} color="#58B9D0" />
                </View>
                <Text style={styles.errorTitle}>Unable to load pets</Text>
                <Text style={styles.errorMessage}>
                  We couldn't fetch your pet profiles. Please check your connection and try again.
                </Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={fetchPets}
                  activeOpacity={0.8}
                >
                  <MaterialIcons name="refresh" size={18} color="#FFFFFF" />
                  <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingLeft: responsiveWidth(5),
                paddingRight: responsiveWidth(5),
                paddingVertical: responsiveHeight(2),
                gap: 16,
              }}
              style={{ flexGrow: 0 }}
            >
              {pets?.map(item => (
                <TouchableOpacity
                  key={item?.id}
                  onPress={() => navigate('EditPet', { pet: item })}
                  activeOpacity={0.8}
                >
                  <View>
                    <View
                      style={[
                        styles.doctorcontainer,
                        {
                          backgroundColor: '#58B9D0',
                          alignItems: 'center',
                          justifyContent: 'center',
                          overflow: 'hidden',
                        },
                      ]}
                    >
                      {item.profileImg ? (
                        <Image
                          source={{ uri: item.profileImg }}
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: responsiveWidth(7.5),
                          }}
                          resizeMode="cover"
                        />
                      ) : (
                        <MaterialIcons name="pets" size={24} color="#FFFFFF" />
                      )}
                    </View>
                    <Text style={styles.dogname}>{item.petName}</Text>
                  </View>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.pluscontainer}
                onPress={() => navigate('AddPet')}
                activeOpacity={0.8}
              >
                <Image source={Icons.BiPlus} />
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>

        {/* Upcoming Appointments Section */}
        <View
          style={{
            marginTop: responsiveHeight(3),
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: 12,
              paddingHorizontal: responsiveWidth(5),
            }}
          >
            Upcoming Appointments
          </Text>

          {loadingAppointments ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ 
                gap: 12,
                paddingLeft: responsiveWidth(5),
                paddingRight: responsiveWidth(5),
              }}
            >
              {[...Array(2)].map((_, index) => (
                <View key={index} style={{ width: responsiveWidth(85) }}>
                  <AppointmentCardSkeleton />
                </View>
              ))}
            </ScrollView>
          ) : appointments.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ 
                gap: 12, 
                paddingLeft: responsiveWidth(5),
                paddingRight: responsiveWidth(5) 
              }}
            >
              {appointments.map((booking) => {
                const facilityName = booking.boarding?.facilityName || 'Boarding Service';
                const providerName = booking.service
                  ? `${booking.service.firstName} ${booking.service.lastName}`
                  : 'Service Provider';
                const startDate = new Date(booking.startTime);
                const endDate = new Date(booking.endTime);
                const now = new Date();

                // Determine if ongoing or upcoming
                const isOngoing = startDate <= now && endDate >= now;
                const statusText = isOngoing ? 'Ongoing' : 'Upcoming';
                const statusColor = isOngoing ? '#10B981' : '#3B82F6';

                // Get latest flow status
                const latestFlowStatus = booking.flowHistories && booking.flowHistories.length > 0
                  ? booking.flowHistories[booking.flowHistories.length - 1].boardingBookingFlowOptionsId
                  : null;

                let flowStatusText = '';
                if (latestFlowStatus === 7) flowStatusText = 'Pending Acceptance';
                else if (latestFlowStatus === 8) flowStatusText = 'Accepted';
                else if (latestFlowStatus === 3) flowStatusText = 'Pet Handover';
                else if (latestFlowStatus === 4) flowStatusText = 'Pet with Boarder';
                else if (latestFlowStatus === 5) flowStatusText = 'Pet Returned';

                // Calculate duration
                const durationInDays = Math.ceil(
                  (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
                );

                // Get booking ID
                const bookingId = `#${booking.id}`;

                return (
                  <TouchableOpacity
                    key={booking.id}
                    onPress={() => navigate('ViewDetails', { bookingItem: booking })}
                    activeOpacity={0.8}
                    style={{ width: responsiveWidth(85) }}
                  >
                    <LinearGradient
                      colors={isOngoing ? ['#F0FDF4', '#FFFFFF'] : ['#EFF6FF', '#FFFFFF']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        borderRadius: 16,
                        padding: 18,
                        borderWidth: 1.5,
                        borderColor: isOngoing ? '#86EFAC' : '#93C5FD',
                        minHeight: 165,
                        shadowColor: isOngoing ? '#10B981' : '#3B82F6',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 3,
                      }}
                    >
                      {/* Header Row: Booking ID and Status Badge */}
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: 8,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '600',
                            color: '#58B9D0',
                          }}
                        >
                          {bookingId}
                        </Text>
                        <View
                          style={{
                            backgroundColor: statusColor,
                            paddingHorizontal: 10,
                            paddingVertical: 4,
                            borderRadius: 12,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '700',
                              color: '#FFFFFF',
                            }}
                          >
                            {statusText}
                          </Text>
                        </View>
                      </View>

                      {/* Facility Name */}
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: '#111827',
                          marginBottom: 4,
                        }}
                        numberOfLines={1}
                      >
                        {facilityName}
                      </Text>

                      {/* Provider Name */}
                      <Text
                        style={{
                          fontSize: 13,
                          color: '#6B7280',
                          marginBottom: 12,
                        }}
                      >
                        {providerName}
                      </Text>

                      {/* Date Range */}
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginBottom: 8,
                        }}
                      >
                        <MaterialIcons name="calendar-today" size={16} color="#58B9D0" />
                        <Text
                          style={{
                            fontSize: 13,
                            color: '#374151',
                            marginLeft: 8,
                            fontWeight: '500',
                          }}
                        >
                          {startDate.toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                          })}{' '}
                          -{' '}
                          {endDate.toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#6B7280',
                            marginLeft: 8,
                          }}
                        >
                          ({durationInDays} {durationInDays === 1 ? 'day' : 'days'})
                        </Text>
                      </View>

                      {/* Flow Status */}
                      {flowStatusText && (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <MaterialIcons name="info-outline" size={16} color="#6B7280" />
                          <Text
                            style={{
                              fontSize: 13,
                              color: '#6B7280',
                              marginLeft: 8,
                            }}
                          >
                            Status: {flowStatusText}
                          </Text>
                        </View>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: responsiveHeight(2.5),
                backgroundColor: '#F8F9FB',
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderStyle: 'dashed',
                minHeight: 150,
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: '#E3F2FD',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <MaterialIcons name="event" size={28} color="#58B9D0" />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#1F2937',
                  textAlign: 'center',
                  marginBottom: 4,
                }}
              >
                No upcoming appointments
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#6B7280',
                  textAlign: 'center',
                  lineHeight: 20,
                }}
              >
                Schedule your pet's next visit with our trusted veterinarians
              </Text>
            </View>
          )}
        </View>
        {/* Pet News Section */}
        <View
          style={{
            marginTop: responsiveHeight(2),
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: 12,
              paddingHorizontal: responsiveWidth(5),
            }}
          >
            Latest Pet News
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ 
              gap: 16, 
              paddingLeft: responsiveWidth(5),
              paddingRight: responsiveWidth(5) 
            }}
          >
            {petNews.map((news) => {
              const publishedDate = new Date(news.publishedAt);
              const now = new Date();
              const diffTime = Math.abs(now.getTime() - publishedDate.getTime());
              const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

              let timeAgo = '';
              if (diffDays === 0) {
                timeAgo = 'Today';
              } else if (diffDays === 1) {
                timeAgo = 'Yesterday';
              } else if (diffDays < 7) {
                timeAgo = `${diffDays} days ago`;
              } else {
                timeAgo = publishedDate.toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                });
              }

              return (
                <TouchableOpacity
                  key={news.id}
                  onPress={() => navigate('NewsDetails', { news })}
                  activeOpacity={0.8}
                  style={{ width: responsiveWidth(80) }}
                >
                  <View
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 16,
                      borderWidth: 1,
                      borderColor: '#E5E7EB',
                      overflow: 'hidden',
                    }}
                  >
                    {/* News Image */}
                    <Image
                      source={{ uri: news.image }}
                      style={{
                        width: '100%',
                        height: 160,
                        backgroundColor: '#F3F4F6',
                      }}
                      resizeMode="cover"
                    />

                    {/* News Content */}
                    <View style={{ padding: 16 }}>
                      {/* Category Badge and Time */}
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: 8,
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: '#DBEAFE',
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            borderRadius: 12,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: '600',
                              color: '#3B82F6',
                            }}
                          >
                            {news.category}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 10,
                            color: '#6B7280',
                          }}
                        >
                          {timeAgo}
                        </Text>
                      </View>

                      {/* News Title */}
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '700',
                          color: '#111827',
                          marginBottom: 8,
                          lineHeight: 20,
                        }}
                        numberOfLines={2}
                      >
                        {news.title}
                      </Text>

                      {/* News Description */}
                      <Text
                        style={{
                          fontSize: 12,
                          color: '#6B7280',
                          lineHeight: 17,
                          marginBottom: 12,
                        }}
                        numberOfLines={2}
                      >
                        {news.description}
                      </Text>

                      {/* Source */}
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <MaterialIcons name="source" size={14} color="#58B9D0" />
                        <Text
                          style={{
                            fontSize: 11,
                            color: '#58B9D0',
                            marginLeft: 4,
                            fontWeight: '600',
                          }}
                        >
                          {news.source}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Show More Button */}
          <TouchableOpacity
            onPress={() => navigate('AllNews')}
            activeOpacity={0.8}
            style={{
              marginTop: 16,
              paddingVertical: 12,
              paddingHorizontal: 20,
              backgroundColor: '#F8F9FB',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#3B82F6',
                marginRight: 6,
              }}
            >
              View All News
            </Text>
            <MaterialIcons name="arrow-forward" size={18} color="#3B82F6" />
          </TouchableOpacity>
        </View>

        {/* Blog Posts Section */}
        <View
          style={{
            marginTop: responsiveHeight(2),
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: 12,
              paddingHorizontal: responsiveWidth(5),
            }}
          >
            Pet Care Blog
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ 
              gap: 16, 
              paddingLeft: responsiveWidth(5),
              paddingRight: responsiveWidth(5) 
            }}
          >
            {blogs.map((blog) => (
              <TouchableOpacity
                key={blog.id}
                onPress={() => navigate('BlogDetails', { blog })}
                activeOpacity={0.8}
                style={{ width: responsiveWidth(75) }}
              >
                <View
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    overflow: 'hidden',
                  }}
                >
                  {/* Blog Image */}
                  <Image
                    source={{ uri: blog.image }}
                    style={{
                      width: '100%',
                      height: 150,
                      backgroundColor: '#F3F4F6',
                    }}
                    resizeMode="cover"
                  />

                  {/* Blog Content */}
                  <View style={{ padding: 16 }}>
                    {/* Category Badge */}
                    <View
                      style={{
                        alignSelf: 'flex-start',
                        backgroundColor: '#FEF3C7',
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 12,
                        marginBottom: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '600',
                          color: '#F59E0B',
                        }}
                      >
                        {blog.category}
                      </Text>
                    </View>

                    {/* Blog Title */}
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#111827',
                        marginBottom: 8,
                        lineHeight: 22,
                      }}
                      numberOfLines={2}
                    >
                      {blog.title}
                    </Text>

                    {/* Blog Excerpt */}
                    <Text
                      style={{
                        fontSize: 13,
                        color: '#6B7280',
                        lineHeight: 18,
                        marginBottom: 12,
                      }}
                      numberOfLines={2}
                    >
                      {blog.excerpt}
                    </Text>

                    {/* Meta Info */}
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="person-outline" size={14} color="#6B7280" />
                        <Text
                          style={{
                            fontSize: 11,
                            color: '#6B7280',
                            marginLeft: 4,
                          }}
                          numberOfLines={1}
                        >
                          {blog.author.split(',')[0]}
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialIcons name="access-time" size={14} color="#6B7280" />
                        <Text
                          style={{
                            fontSize: 11,
                            color: '#6B7280',
                            marginLeft: 4,
                          }}
                        >
                          {blog.readTime}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* View More Button for Blogs */}
          <TouchableOpacity
            onPress={() => navigate('AllBlogs')}
            activeOpacity={0.8}
            style={{
              marginTop: 16,
              paddingVertical: 12,
              paddingHorizontal: 20,
              backgroundColor: '#FFFBEB',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#FEF3C7',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: '600',
                color: '#F59E0B',
                marginRight: 6,
              }}
            >
              View All Blogs
            </Text>
            <MaterialIcons name="arrow-forward" size={18} color="#F59E0B" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
