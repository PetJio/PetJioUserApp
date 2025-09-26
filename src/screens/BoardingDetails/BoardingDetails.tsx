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
import BoardingModal from '../BoardingModal/BoardingModal';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { API_CONFIG, API_ENDPOINTS } from '../../config/api';
import boardinguserstyles from '../BoardingUser/boardinguser.styles';
import serviceStyles from '../Service/styles';
import boardingQuestionStyles from '../BoardingQuestions/boardingquestions.styles';

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
    selectedDate: string;
    selectedTime: string;
    city: string;
    boardDetails?: any;
    mode?: number;
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

const BoardingDetails: React.FC<BoardingDetailsProps> = ({
  navigation,
  route,
}) => {
  const [activeTab, setActiveTab] = useState<string>('about');
  const [serviceDetails, setServiceDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [bookingDetailsData, setBookingDetailsData] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const { height: screenHeight } = Dimensions.get('window');

  // Get route params with defaults
  const routeParams = route?.params as any;
  const {
    providerId = 1,
    selectedDate,
    selectedTime,
    city,
    boardDetails,
  } = routeParams || {
    providerId: 1,
    selectedDate: new Date().toISOString().split('T')[0],
    selectedTime: '10:00 AM',
    city: 'Kolkata',
    boardDetails: null,
  };

  useEffect(() => {
    const routeParams = route?.params as any;
    const boardDetailsData = routeParams?.boardDetails;
    console.log('details ==> ', boardDetailsData);
    // fetchBoardingDetails();
    if (boardDetailsData) {
      setBookingDetailsData(boardDetailsData);
    }
  }, [route?.params]);

  const handleTabPress = (tab: string, screen?: keyof RootStackParamList) => {
    setActiveTab(tab);
  };

  // Handle chat navigation
  const handleChatPress = () => {
    if (!bookingDetailsData) {
      Alert.alert('Error', 'Provider information not available');
      return;
    }

    const chatUser = {
      id: bookingDetailsData.userId?.toString() || 'unknown',
      name: bookingDetailsData.facilityName || 'Provider',
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
            {bookingDetailsData?.facilityName || 'Facility information'}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 12 }}>
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
        </View>
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
                fontSize: 20,
                fontWeight: '700',
                color: '#111827',
                marginBottom: 6,
                lineHeight: 24,
              }} numberOfLines={1}>
                {bookingDetailsData?.facilityName || 'John Orthon'}
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
            onPress={() => setModalVisible(true)}
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

      {/* Boarding Modal */}
      <BoardingModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        boardingId={bookingDetailsData?.id}
        bordingUserId={bookingDetailsData?.userId}
      />
    </View>
  );
};

export default BoardingDetails;
