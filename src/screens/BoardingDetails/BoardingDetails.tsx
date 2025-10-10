import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import boardingdetailstyles from './boardingdetails.styles';
import BoardingAbout from './BoardingAbout';
import BoardingReview from './BoardingReview';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { API_CONFIG, API_ENDPOINTS } from '../../config/api';
import boardinguserstyles from '../BoardingUser/boardinguser.styles';
import serviceStyles from '../Service/styles';
import boardingQuestionStyles from '../BoardingQuestions/boardingquestions.styles';
import { storageService } from '../../utils/storage';

// Define your navigation stack's param list
type RootStackParamList = {
  UserService: undefined;
  UserReview: undefined;
  UserAbout: undefined;
  HomeService: undefined;
  WalkingUser: { section: string };
  Main: undefined;
  Locality: undefined;
  Packages: undefined;
  Reviews: undefined;
  WalkingDetails: { section: string };
  TrainingUser: { section: string };
  TrainingDetails: { section: string };
  BoardingUser: { section: string };
  BoardingDetails: {
    providerId?: number;
    startDate?: string;
    endDate?: string;
    city?: string;
    boardDetails?: any;
    mode?: number;
    selectedPets?: number[];
  };
  BoardingReview: undefined;
  BoardingRegistrationform: undefined;
  Chat: {
    user: {
      id: string;
      name: string;
      avatar?: string;
      isOnline?: boolean;
      lastMessage?: string;
      timestamp?: string;
      unreadCount?: number;
      role?: string;
    }
  };
};

// Define the navigation prop type
type WalkingDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BoardingDetails'
>;
type WalkingDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'BoardingDetails'
>;

// Define props interface for the component
interface BoardingDetailsProps {
  navigation: WalkingDetailsScreenNavigationProp;
  route: WalkingDetailsScreenRouteProp;
}

interface BookingDay {
  id: number;
  date: string;
  uploads: string[] | null;
  createdAt: string;
  updatedAt: string;
}

const BoardingDetails: React.FC<BoardingDetailsProps> = ({
  navigation,
  route,
}) => {
  const [activeTab, setActiveTab] = useState<string>('about');
  const [serviceDetails, setServiceDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [bookingDetailsData, setBookingDetailsData] = useState<any>(null);
  const [bookingDays, setBookingDays] = useState<BookingDay[]>([]);
  const [loadingDays, setLoadingDays] = useState<boolean>(false);
  const [pets, setPets] = useState<any[]>([]);
  const [boardingServices, setBoardingServices] = useState<any[]>([]);
  const [petOwnerId, setPetOwnerId] = useState<number | null>(null);

  const { height: screenHeight } = Dimensions.get('window');

  // Get route params with defaults
  const routeParams = route?.params as any;
  const {
    providerId = 1,
    startDate,
    endDate,
    city,
    boardDetails,
    mode,
    selectedPets,
  } = routeParams || {
    providerId: 1,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    city: 'Kolkata',
    boardDetails: null,
    mode: 9,
    selectedPets: [],
  };

  // Fetch booking days with photos/videos
  const fetchBookingDays = async (bookingId: number) => {
    try {
      setLoadingDays(true);
      console.log('🔄 Starting fetchBookingDays...');
      console.log('📋 Booking ID:', bookingId);

      const token = await storageService.getUserToken();
      console.log('🔑 Token retrieved:', token ? `Present (${token.substring(0, 20)}...)` : 'Missing');

      if (!token) {
        console.error('❌ No authentication token found');
        return;
      }

      const apiUrl = `${API_CONFIG.BASE_URL}/api/booking-days/booking/123`;
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

          // Filter out future days (days with null uploads) and sort by date descending (newest first)
          const today = new Date().toISOString().split('T')[0];
          console.log('📅 Today\'s date:', today);

          const pastAndTodayDays = data.body
            .filter((day: BookingDay) => {
              const isPastOrToday = day.date <= today;
              console.log(`🔍 Day ${day.date}: isPastOrToday = ${isPastOrToday}, hasUploads = ${!!day.uploads}`);
              return isPastOrToday;
            })
            .sort((a: BookingDay, b: BookingDay) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
            );

          console.log('✅ Filtered and sorted days:', pastAndTodayDays.length);
          pastAndTodayDays.forEach((day: BookingDay, index: number) => {
            console.log(`  ${index + 1}. Date: ${day.date}, Uploads: ${day.uploads?.length || 0}`);
            if (day.uploads) {
              day.uploads.forEach((upload, uploadIndex) => {
                const s3Url = `https://petjio-stage-bucket.s3.ap-south-1.amazonaws.com/${upload}`;
                console.log(`     ${uploadIndex + 1}. ${upload} -> ${s3Url}`);
              });
            }
          });

          setBookingDays(pastAndTodayDays);
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

  useEffect(() => {
    const routeParams = route?.params as any;
    const boardDetailsData = routeParams?.boardDetails;
    console.log('details ==> ', boardDetailsData);
    // fetchBoardingDetails();
    if (boardDetailsData) {
      setBookingDetailsData(boardDetailsData);

      // Fetch boarding days if booking ID is available
      if (boardDetailsData.id) {
        fetchBookingDays(boardDetailsData.id);
      }

      // Fetch boarding services for this provider
      if (boardDetailsData.boardingServices) {
        setBoardingServices(boardDetailsData.boardingServices);
      }
    }

    // Fetch pets data
    fetchPetsData();
  }, [route?.params]);

  // Fetch pets data
  const fetchPetsData = async () => {
    try {
      const token = await storageService.getUserToken();
      if (!token) return;

      // Fetch pet owner ID
      const ownerResponse = await fetch(`${API_CONFIG.BASE_URL}/api/pet-owner/findByUserId`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      if (!ownerResponse.ok) return;
      const ownerResult = await ownerResponse.json();
      const ownerId = ownerResult.statusCode === 200 ? ownerResult.body.id : null;
      
      if (!ownerId) return;

      // Save petOwnerId to state
      setPetOwnerId(ownerId);
      console.log('✅ BoardingDetails - Fetched petOwnerId:', ownerId);

      // Fetch all pets for this owner
      const petsResponse = await fetch(
        `${API_CONFIG.BASE_URL}/api/pet-profile/owner/${ownerId}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (petsResponse.ok) {
        const petsResult = await petsResponse.json();
        if (petsResult.statusCode === 200) {
          setPets(petsResult.body || []);
        }
      }
    } catch (error) {
      console.error('Error fetching pets data:', error);
    }
  };

  const handleTabPress = (tab: string, screen?: keyof RootStackParamList) => {
    setActiveTab(tab);
  };

  // Calculate serviceBookings based on selected pets and their sizes
  const calculateServiceBookings = (): number[] => {
    if (!selectedPets || selectedPets.length === 0) {
      return [];
    }

    const serviceBookings: number[] = [];
    
    selectedPets.forEach(petId => {
      const pet = pets.find(p => p.id === petId);
      if (pet && boardingServices.length > 0) {
        // Find service ID for this pet's size
        const serviceForPet = boardingServices.find(
          service => service.breed?.size?.toLowerCase() === pet.size?.size?.toLowerCase()
        );
        
        if (serviceForPet) {
          serviceBookings.push(serviceForPet.id);
        } else {
          // Fallback to mode if no matching service found
          serviceBookings.push(mode || 9);
        }
      } else {
        // Fallback to mode if pet or services not found
        serviceBookings.push(mode || 9);
      }
    });

    console.log('🎯 Calculated serviceBookings:', serviceBookings);
    console.log('📊 Selected pets:', selectedPets);
    console.log('📦 Boarding services:', boardingServices);
    
    return serviceBookings;
  };

  // Handle chat navigation
  const handleChatPress = () => {
    if (!bookingDetailsData) {
      Alert.alert('Error', 'Provider information not available');
      return;
    }

    const providerNameWithLocation = bookingDetailsData.facilityName 
      ? `${bookingDetailsData.facilityName} (${bookingDetailsData.city || 'Location'})`
      : 'Provider';

    const chatUser = {
      id: bookingDetailsData.userId?.toString() || 'unknown',
      name: providerNameWithLocation,
      avatar: bookingDetailsData.profileImg
        ? `${API_CONFIG.BASE_URL}${bookingDetailsData.profileImg}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(bookingDetailsData.facilityName || 'Provider')}&background=58B9D0&color=fff`,
      isOnline: Math.random() > 0.5, // Random online status for demo
      role: 'boarding_provider',
    };

    console.log('🗨️ Opening chat with provider:', chatUser);
    navigation.navigate('Chat', { user: chatUser });
  };

  if (loading) {
    return (
      <View
        style={[
          boardingdetailstyles.container,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" color="#58B9D0" />
        <Text style={{ marginTop: 10, color: '#666' }}>
          Loading boarding details...
        </Text>
      </View>
    );
  }

  // Extract data from API response or use defaults
  const providerName = bookingDetailsData?.facilityName || 'Facility Name Not Available';
  const rating = bookingDetailsData?.reviewAvg ? bookingDetailsData.reviewAvg.toFixed(1) : '0.0';
  const profileImage = bookingDetailsData?.profileImg;

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF', minHeight: screenHeight }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
        animated={true}
      />

      {/* Header Section matching AddPet page */}
      <View style={[serviceStyles.stickyHeader, { backgroundColor: '#FFFFFF', borderBottomColor: '#E5E7EB' }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
          <Image
            source={Icons.LeftArrow}
            style={{ tintColor: '#000000', width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <View style={serviceStyles.headerTitleContainer}>
          <Text style={serviceStyles.stickyHeaderTitle}>
            Boarding Details
          </Text>
          <Text style={serviceStyles.stickyHeaderSubtitle}>
            {bookingDetailsData?.facilityName ? `Petjio Boarder (${bookingDetailsData.city || 'Location'})` : 'Facility information'}
          </Text>
        </View>
        {/* <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity style={{
            width: 40,
            height: 40,
            backgroundColor: '#E8F4FD',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <MaterialIcons name="call" size={20} color="#58B9D0" />
          </TouchableOpacity>
          <TouchableOpacity style={{
            width: 40,
            height: 40,
            backgroundColor: '#FFEAEA',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <MaterialIcons name="favorite-border" size={20} color="#E74C3C" />
          </TouchableOpacity>
        </View> */}
      </View>

      
      <View style={{ flex: 39, height: responsiveHeight(100) }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, backgroundColor: '#FFFFFF' }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: responsiveWidth(4),
            paddingTop: responsiveHeight(2),
            paddingBottom: 20,
          }}
        >
          {/* Facility Card */}
        <View style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          borderWidth: 1,
          borderColor: '#E5E7EB',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2,
        }}>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <View style={{
              width: 85,
              height: 85,
              borderRadius: 16,
              backgroundColor: '#F8F9FB',
              borderWidth: 2,
              borderColor: '#E5E7EB',
              overflow: 'hidden',
            }}>
              <Image
                source={
                  bookingDetailsData?.profileImg
                    ? { uri: bookingDetailsData.profileImg }
                    : images.walkinguserimage
                }
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#F3F4F6',
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              {/* Facility Name */}
              <Text style={{
                fontSize: 17,
                fontWeight: '700',
                color: '#111827',
                marginBottom: 6,
                lineHeight: 24,
              }} numberOfLines={1}>
                {bookingDetailsData?.facilityName 
                  ? `Petjio Boarder (${bookingDetailsData.city || 'Location'})`
                  : 'Boarding Provider'}
              </Text>

              {/* Rating */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                marginBottom: 12,
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                  backgroundColor: '#FEF3C7',
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 16,
                }}>
                  <MaterialIcons name="star" size={16} color="#F59E0B" />
                  <Text style={{
                    fontSize: 13,
                    color: '#F59E0B',
                    fontWeight: '700',
                  }}>
                    {bookingDetailsData?.reviewAvg ? bookingDetailsData.reviewAvg.toFixed(1) : '0.0'}
                  </Text>
                </View>
                <Text style={{
                  fontSize: 12,
                  color: '#6B7280',
                  fontWeight: '500',
                }}>
                  ({bookingDetailsData?.reviewCount || 0} reviews)
                </Text>
              </View>

              {/* Verified Badge */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                marginBottom: 8,
              }}>
                <MaterialIcons name="verified" size={16} color="#10B981" />
                <Text style={{
                  fontSize: 12,
                  color: '#10B981',
                  fontWeight: '500',
                }}>
                  Verified • {bookingDetailsData?.experience ? `${bookingDetailsData.experience} years exp` : 'New provider'}
                </Text>
              </View>

              {/* Time */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                marginBottom: 8,
              }}>
                <MaterialIcons name="access-time" size={14} color="#6B7280" />
                <Text style={{
                  fontSize: 12,
                  color: '#6B7280',
                  fontWeight: '500',
                }}>
                  {bookingDetailsData?.checkinTime && bookingDetailsData?.checkoutTime
                    ? `${bookingDetailsData.checkinTime}:00 am - ${bookingDetailsData.checkoutTime}:00 pm`
                    : 'Hours not specified'
                  }
                </Text>
              </View>

              {/* Location and Registration */}
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
              }}>
                <MaterialIcons name="location-on" size={14} color="#6B7280" />
                <Text style={{
                  fontSize: 12,
                  color: '#6B7280',
                  fontWeight: '500',
                  flex: 1,
                }}>
                  {bookingDetailsData?.city || 'Location not specified'} • Reg: {bookingDetailsData?.regNo || 'Not provided'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={{
          flexDirection: 'row',
          backgroundColor: '#F8F9FB',
          borderRadius: 12,
          padding: 4,
          marginBottom: 20,
          borderWidth: 1,
          borderColor: '#E5E7EB',
        }}>
          <TouchableOpacity
            onPress={() => setActiveTab('about')}
            style={{
              flex: 1,
              paddingVertical: 12,
              alignItems: 'center',
              backgroundColor: activeTab === 'about' ? '#58B9D0' : 'transparent',
              borderRadius: 8,
            }}
          >
            <Text style={{
              fontSize: 14,
              fontWeight: '600',
              color: activeTab === 'about' ? '#FFFFFF' : '#6B7280',
            }}>
              About
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setActiveTab('reviews')}
            style={{
              flex: 1,
              paddingVertical: 12,
              alignItems: 'center',
              backgroundColor: activeTab === 'reviews' ? '#58B9D0' : 'transparent',
              borderRadius: 8,
            }}
          >
            <Text style={{
              fontSize: 14,
              fontWeight: '600',
              color: activeTab === 'reviews' ? '#FFFFFF' : '#6B7280',
            }}>
              Reviews ({bookingDetailsData?.reviewCount || 0})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('updates')}
            style={{
              flex: 1,
              paddingVertical: 12,
              alignItems: 'center',
              backgroundColor: activeTab === 'updates' ? '#58B9D0' : 'transparent',
              borderRadius: 8,
            }}
          >
            <Text style={{
              fontSize: 14,
              fontWeight: '600',
              color: activeTab === 'updates' ? '#FFFFFF' : '#6B7280',
            }}>
              Updates
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        <View style={{ flex: 1 }}>
          {activeTab === 'about' && (
            <BoardingAbout serviceDetails={bookingDetailsData} />
          )}
          {activeTab === 'reviews' && (
            <BoardingReview
              rating={bookingDetailsData?.reviewAvg ? parseFloat(bookingDetailsData.reviewAvg) : 0}
              reviews={bookingDetailsData?.reviewCount || 0}
            />
          )}
          {activeTab === 'updates' && (
            <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
              {loadingDays ? (
                <View style={{ alignItems: 'center', paddingVertical: 40 }}>
                  <ActivityIndicator size="large" color="#58B9D0" />
                  <Text style={{ marginTop: 12, color: '#666' }}>Loading updates...</Text>
                </View>
              ) : bookingDays.length === 0 ? (
                <View style={{ alignItems: 'center', paddingVertical: 60 }}>
                  <MaterialIcons name="photo-library" size={60} color="#CBD5E1" />
                  <Text style={{ marginTop: 16, fontSize: 16, fontWeight: '600', color: '#1F2937' }}>
                    No Updates Yet
                  </Text>
                  <Text style={{ marginTop: 8, fontSize: 14, color: '#6B7280', textAlign: 'center' }}>
                    Daily photos and videos will appear here
                  </Text>
                </View>
              ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                  {bookingDays.map((day, index) => {
                    const isToday = day.date === new Date().toISOString().split('T')[0];
                    const hasUploads = day.uploads && day.uploads.length > 0;

                    return (
                      <View
                        key={day.id}
                        style={{
                          marginBottom: 20,
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
                            paddingVertical: 12,
                            paddingHorizontal: 16,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
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
                        <View style={{ padding: 16 }}>
                          {!hasUploads ? (
                            <View style={{ alignItems: 'center', paddingVertical: 20 }}>
                              <MaterialIcons name="photo-camera" size={40} color="#CBD5E1" />
                              <Text style={{ marginTop: 12, fontSize: 14, color: '#6B7280' }}>
                                No photos or videos for this day
                              </Text>
                            </View>
                          ) : (
                            <View
                              style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                marginHorizontal: -4,
                              }}
                            >
                              {day.uploads!.map((fileUrl, uploadIndex) => {
                                const isVideo = fileUrl.toLowerCase().endsWith('.mp4') ||
                                               fileUrl.toLowerCase().endsWith('.mov') ||
                                               fileUrl.toLowerCase().endsWith('.avi');
                                
                                console.log('📷 Rendering upload:', { fileUrl, isVideo });

                                return (
                                  <View
                                    key={uploadIndex}
                                    style={{
                                      width: '48%',
                                      aspectRatio: 1,
                                      marginHorizontal: '1%',
                                      marginBottom: 8,
                                      borderRadius: 8,
                                      overflow: 'hidden',
                                      backgroundColor: '#F8F9FB',
                                    }}
                                  >
                                    {isVideo ? (
                                      <TouchableOpacity
                                        style={{
                                          width: '100%',
                                          height: '100%',
                                          backgroundColor: '#1F2937',
                                          justifyContent: 'center',
                                          alignItems: 'center',
                                        }}
                                        onPress={() => {
                                          // Handle video playback
                                          Alert.alert('Video', `Play: ${fileUrl}`, [
                                            { text: 'OK' }
                                          ]);
                                        }}
                                      >
                                        <MaterialIcons name="play-circle-filled" size={48} color="#FFFFFF" />
                                        <Text
                                          style={{
                                            fontSize: 12,
                                            color: '#FFFFFF',
                                            marginTop: 8,
                                          }}
                                        >
                                          VIDEO
                                        </Text>
                                      </TouchableOpacity>
                                    ) : (
                                      <Image
                                        source={{ uri: fileUrl }}
                                        style={{ width: '100%', height: '100%' }}
                                        resizeMode="cover"
                                      />
                                    )}
                                  </View>
                                );
                              })}
                            </View>
                          )}
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              )}
            </View>
          )}
        </View>
        </ScrollView>

        {/* Chat and Book Now Buttons - Fixed at bottom */}
      <View style={{
        backgroundColor: '#FFFFFF',
        paddingHorizontal: responsiveWidth(4),
        paddingTop: 16,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}>
        <View style={{
          flexDirection: 'row',
          gap: 12,
        }}>

          {/* Book Now Button */}
          <TouchableOpacity
            style={{
              flex: 2,
              backgroundColor: '#58B9D0',
              paddingVertical: 16,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 50,
            }}
            onPress={() => {
              // Calculate serviceBookings based on selected pets
              const serviceBookings = calculateServiceBookings();
              
              console.log('🚀 BoardingDetails - Navigating to BoardingQuestions with params:', {
                startDate,
                endDate,
                mode: mode || 9,
                boardingId: bookingDetailsData?.userId,
                bordingUserId: bookingDetailsData?.userId,
                selectedPets: selectedPets || [],
                petOwnerId: petOwnerId,
                serviceBookings: serviceBookings.length > 0 ? serviceBookings : [mode || 9],
              });
              
              // Navigate directly to BoardingQuestions with the dates and pets
              navigation.navigate('BoardingQuestions' as any, {
                startDate,
                endDate,
                mode: mode || 9,
                boardingId: bookingDetailsData?.userId,
                bordingUserId: bookingDetailsData?.userId,
                selectedPets: selectedPets || [],
                petOwnerId: petOwnerId,
                serviceBookings: serviceBookings.length > 0 ? serviceBookings : [mode || 9],
              });
            }}
          >
            <Text style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#FFFFFF',
            }}>
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    </View>
  );
};

export default BoardingDetails;
