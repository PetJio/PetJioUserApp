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
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import boardingdetailstyles from './boardingdetails.styles';
import BoardingAbout from './BoardingAbout';
import BoardingReview from './BoardingReview';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { API_CONFIG, API_ENDPOINTS } from '../../config/api';
import boardinguserstyles from '../BoardingUser/boardinguser.styles';

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
  };
  BoardingReview: undefined;
  BoardingRegistrationform: undefined;
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
  const [bookingDetailsData, setBookingDetailsData] = useState<any[]>([]);

  // Get route params with defaults
  const {
    providerId = 1,
    selectedDate,
    selectedTime,
    city,
  } = route.params || {
    providerId: 1,
    selectedDate: new Date().toISOString().split('T')[0],
    selectedTime: '10:00 AM',
    city: 'Kolkata',
  };

  const { boardDetails } = route?.params;

  useEffect(() => {
    console.log('details ==> ', boardDetails);
    // fetchBoardingDetails();
    setBookingDetailsData(boardDetails);
  }, [boardDetails]);

  const fetchBoardingDetails = async () => {
    try {
      setLoading(true);
      setError('');

      console.log('Fetching boarding details for providerId:', boardId);

      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_ENDPOINTS.SERVICES.BOARDING_DETAILS}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Com Details 009 ==>', data);

      if (
        data &&
        data.body &&
        Array.isArray(data.body) &&
        data.body.length > 0
      ) {
        setServiceDetails(data.body[0]); // Get the first boarding from the list
      } else {
        // If no API data, use default values to match reference UI
        setServiceDetails({
          user: { firstName: 'Kiara', lastName: 'Das' },
          reviewAvg: 4.8,
          profileImg: null,
          description:
            'Hi Pet Parents !!!! I am a proficient grooming partner with pgroomy have an experience of 7+ years, can work efficiently with both dogs and cats. Also experienced with different breeds of pets in terms of styling and grooming.',
          experience: 7,
          facilityName: "Kiara's Boarding",
        });
      }
    } catch (error: any) {
      console.error('Error fetching boarding details:', error);
      setError(error.message || 'Failed to fetch boarding details');

      // Set default data to match reference even on error
      setServiceDetails({
        user: { firstName: 'Kiara', lastName: 'Das' },
        reviewAvg: 4.8,
        profileImg: null,
        description:
          'Hi Pet Parents !!!! I am a proficient grooming partner with pgroomy have an experience of 7+ years, can work efficiently with both dogs and cats. Also experienced with different breeds of pets in terms of styling and grooming.',
        experience: 7,
        facilityName: "Kiara's Boarding",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTabPress = (tab: string, screen?: keyof RootStackParamList) => {
    setActiveTab(tab);
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
  const providerName = serviceDetails?.user
    ? `${serviceDetails.user.firstName || ''} ${
        serviceDetails.user.lastName || ''
      }`.trim() || 'Kiara Das'
    : 'Kiara Das';

  const rating = serviceDetails?.reviewAvg?.toFixed(1) || '4.8';
  const profileImage = serviceDetails?.profileImg;

  return (
    <View style={boardingdetailstyles.container}>
      <View style={boardingdetailstyles.containerchild}>
        <TouchableOpacity onPress={() => navigation.goBack('')}>
          <View style={boardingdetailstyles.containerfirstsubchild}>
            <Image
              source={Icons.LeftArrow}
              style={boardingdetailstyles.leftarrowicon}
            />
            <Text style={boardinguserstyles.groomingText}>
              Boarding Details
            </Text>
          </View>
        </TouchableOpacity>
        <View style={boardingdetailstyles.locationtext}>
          <Image
            source={Icons.MdOutlineCall}
            style={boardingdetailstyles.IconSize}
          />
          <Image
            source={Icons.LoveIcon}
            style={boardingdetailstyles.downArrowIcon}
          />
        </View>
      </View>

      <View style={boardingdetailstyles.containerthirdsubchild}>
        <View style={boardingdetailstyles.shadow}>
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={boardingdetailstyles.userimage}
            />
          ) : (
            <Image
              source={images.walkinguserimage}
              style={boardingdetailstyles.userimage}
            />
          )}
          <View style={boardingdetailstyles.gap}>
            <View style={boardingdetailstyles.userTextWidth}>
              <View style={boardingdetailstyles.userTextgap}>
                <Text style={boardingdetailstyles.textSize}>
                  {' '}
                  {bookingDetailsData?.facilityName ?? ''}{' '}
                </Text>
              </View>
              <View style={boardingdetailstyles.ratingGap}>
                <Image source={Icons.MdVerifiedUser} />
                <Text style={boardingdetailstyles.verifyText}>Verified</Text>
              </View>
            </View>

            <View style={boardingdetailstyles.flex}>
              <View style={boardingdetailstyles.setIconTextGap}>
                <Image
                  source={Icons.BiTimeFive}
                  style={boardingdetailstyles.setImageIconPosition}
                />
                <Text style={boardingdetailstyles.setTextSize}>
                  {' '}
                  {bookingDetailsData?.checkinTime} am -{' '}
                  {bookingDetailsData?.checkoutTime} am{' '}
                </Text>
              </View>
              <View style={boardingdetailstyles.ratingGap}>
                <Image
                  source={Icons.StarIcon}
                  style={boardingdetailstyles.ratingHeight}
                />
                <Text style={boardingdetailstyles.ratePointSize}>
                  {' '}
                  {bookingDetailsData?.reviewCount ?? ''}
                </Text>
              </View>
            </View>
            <View style={boardingdetailstyles.widthSpace}>
              <View style={boardingdetailstyles.iconAndTextGap}>
                <Image
                  source={Icons.locationposition}
                  style={boardingdetailstyles.setImageIconPosition}
                />
                <Text style={boardingdetailstyles.setDigitSize}>
                  {' '}
                  {bookingDetailsData?.regNo ?? ''}{' '}
                </Text>
              </View>

              <View style={boardingdetailstyles.iconTextSpace}>
                <Text style={boardingdetailstyles.bold}> ₹ 200 </Text>
                <Text>/Day</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={boardingdetailstyles.menuTitleContainer}>
          <TouchableOpacity
            onPress={() => handleTabPress('about', 'UserAbout')}
          >
            <View style={boardingdetailstyles.menuTitleAlignment}>
              <Text
                style={[
                  boardingdetailstyles.serviceText,
                  activeTab === 'about' && boardingdetailstyles.commonTextColor,
                ]}
              >
                About
              </Text>
              {activeTab === 'about' && (
                <View style={boardingdetailstyles.menuBottomBoarder} />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleTabPress('reviews', 'Reviews')}
          >
            <View style={boardingdetailstyles.menuTitleAlignment}>
              <Text
                style={[
                  boardingdetailstyles.reviewsText,
                  activeTab === 'reviews' && boardingdetailstyles.reviewsText,
                ]}
              >
                Reviews
              </Text>
              {activeTab === 'reviews' && (
                <View style={boardingdetailstyles.menuBottomBoarder} />
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {activeTab === 'about' && (
        <BoardingAbout serviceDetails={bookingDetailsData} />
      )}
      {activeTab === 'reviews' && (
        <BoardingReview
          rating={parseFloat(rating)}
          reviews={serviceDetails?.reviewCount || 150}
        />
      )}
    </View>
  );
};

export default BoardingDetails;
