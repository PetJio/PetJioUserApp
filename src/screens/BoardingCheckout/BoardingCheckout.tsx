import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Platform,
  Alert,
  Linking,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icons from '../../../assets/icons';
import { API_CONFIG } from '../../config/api';
import { storageService } from '../../utils/storage';
import boardingCheckoutStyles from './boardingcheckout.styles';
import { BoardingCheckoutSkeleton } from '../../components/SkeletonLoader/SkeletonLoader';
import { openRazorpay, mockPaymentSuccess } from '../../services/razorpayService';
import MockPaymentModal from '../../components/MockPaymentModal/MockPaymentModal';

type RootStackParamList = {
  BoardingCheckout: {
    bookingId: number;
    bookingData: any;
    startDate?: string;
    endDate?: string;
    boardingDetails?: any;
    petOwnerId?: number;
  };
  BoardingSuccess: {
    bookingId: number;
    startDate?: string;
    endDate?: string;
    selectedPets?: number[];
    petOwnerId?: number;
    boardingDetails?: any;
  };
  BoardingQuestions: {
    bookingId: number;
    startDate?: string;
    endDate?: string;
    selectedPets?: number[];
    petOwnerId?: number;
    boardingDetails?: any;
  };
  Home: undefined;
};

type BoardingCheckoutScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BoardingCheckout'
>;
type BoardingCheckoutScreenRouteProp = RouteProp<
  RootStackParamList,
  'BoardingCheckout'
>;

interface BoardingCheckoutProps {
  navigation: BoardingCheckoutScreenNavigationProp;
  route: BoardingCheckoutScreenRouteProp;
}

const BoardingCheckout: React.FC<BoardingCheckoutProps> = ({
  navigation,
  route,
}) => {
  const { bookingId, bookingData, startDate, endDate, boardingDetails, petOwnerId: routePetOwnerId } = route.params;
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [pets, setPets] = useState<any[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const [petOwnerId, setPetOwnerId] = useState<number | null>(routePetOwnerId || null);

  useEffect(() => {
    // Validate bookingData
    if (!bookingData || !Array.isArray(bookingData) || bookingData.length === 0) {
      Alert.alert(
        'Error',
        'Booking data is missing. Please try booking again.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
      return;
    }

    fetchPetsAndOwner();
    loadUserDetails();
    console.log('📋 BoardingCheckout params:', { bookingId, petOwnerId: routePetOwnerId, bookingData });
  }, []);

  const loadUserDetails = async () => {
    const email = await storageService.getUserEmail();
    const firstName = await storageService.getUserFirstName();
    const lastName = await storageService.getUserLastName();
    const mobile = await storageService.getUserMobile();
    setUserEmail(email);
    setUserName(`${firstName} ${lastName}`.trim());
    setUserContact(mobile);
  };

  const fetchPetsAndOwner = async () => {
    try {
      setDataLoading(true);
      const token = await storageService.getUserToken();
      if (!token) {
        setDataLoading(false);
        return;
      }

      // Fetch pet owner ID
      const ownerResponse = await fetch(
        `${API_CONFIG.BASE_URL}/api/pet-owner/findByUserId`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!ownerResponse.ok) {
        setDataLoading(false);
        return;
      }
      const ownerResult = await ownerResponse.json();
      const ownerId =
        ownerResult.statusCode === 200 ? ownerResult.body.id : null;

      if (!ownerId) {
        setDataLoading(false);
        return;
      }

      // Set pet owner ID to state
      setPetOwnerId(ownerId);
      console.log('✅ Pet Owner ID fetched:', ownerId);

      // Fetch all pets for this owner
      const petsResponse = await fetch(
        `${API_CONFIG.BASE_URL}/api/pet-profile/owner/${ownerId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (petsResponse.ok) {
        const petsResult = await petsResponse.json();
        if (petsResult.statusCode === 200) {
          setPets(petsResult.body || []);
        }
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const getPetById = (petId: number) => {
    return pets.find((p) => p.id === petId);
  };

  const calculateTotal = () => {
    if (!bookingData || !Array.isArray(bookingData)) {
      return 0;
    }
    return bookingData.reduce((sum, item) => sum + item.price, 0);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  /**
   * Handle payment process - Call payment API and open payment link
   */
  const handlePayNow = async () => {
    // Validate required data
    if (!bookingId) {
      Alert.alert('Error', 'Booking ID is missing. Please try again.');
      return;
    }

    if (!petOwnerId) {
      Alert.alert('Error', 'Pet owner information is missing. Please try again.');
      return;
    }

    if (!userEmail) {
      Alert.alert('Error', 'User email is missing. Please try again.');
      return;
    }

    if (!userContact) {
      Alert.alert('Error', 'User contact number is missing. Please try again.');
      return;
    }

    setLoading(true);
    try {
      const token = await storageService.getUserToken();
      if (!token) {
        Alert.alert('Error', 'Authentication token not found. Please login again.');
        setLoading(false);
        return;
      }

      // Create payment link payload - amount is hardcoded to 1 as per requirement
      // All other values are dynamic from the logged-in user
      const paymentPayload = {
        amount: 1, // Hardcoded as per requirement
        email: userEmail, // Dynamic - from logged-in user
        contact: userContact, // Dynamic - from logged-in user
        bookingsId: bookingId, // Dynamic - from booking creation
        petOwnerId: petOwnerId, // Dynamic - from API
      };

      console.log('💳 Creating payment link with payload:', paymentPayload);

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/api/user-payment/create-link`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentPayload),
        }
      );

      const result = await response.json();
      console.log('💳 Payment link API response:', result);

      if (response.ok && result.statusCode === 201) {
        // Payment link created successfully
        console.log('✅ Payment link created:', result.body);

        // Check if short_url exists
        if (result.body && result.body.short_url) {
          const paymentUrl = result.body.short_url;
          console.log('💳 Opening payment URL:', paymentUrl);

          // Open the payment URL in browser
          const supported = await Linking.canOpenURL(paymentUrl);
          if (supported) {
            await Linking.openURL(paymentUrl);

            // Show dialog to confirm payment status
            setTimeout(() => {
              Alert.alert(
                'Payment Status',
                'Please complete the payment in your browser.\n\nHave you completed the payment?',
                [
                  {
                    text: 'Yes, Payment Done',
                    onPress: () => {
                      // Navigate to success screen
                      const selectedPetIds = bookingData.map((item: any) => item.petId);
                      navigation.navigate('BoardingSuccess', {
                        bookingId,
                        startDate,
                        endDate,
                        selectedPets: selectedPetIds,
                        petOwnerId,
                        boardingDetails,
                      });
                    },
                  },
                  {
                    text: 'No, Cancel',
                    style: 'cancel',
                    onPress: () => {
                      Alert.alert(
                        'Payment Pending',
                        'Your booking is saved but payment is pending. You can complete payment later.'
                      );
                    },
                  },
                ]
              );
            }, 2000);
          } else {
            Alert.alert('Error', 'Cannot open payment link.');
          }
        } else {
          Alert.alert('Error', 'Payment link URL not found in response.');
        }
      } else {
        Alert.alert(
          'Payment Failed',
          result.message || 'Failed to create payment link. Please try again.'
        );
      }
    } catch (error) {
      console.error('🔥 Payment API error:', error);
      Alert.alert(
        'Payment Error',
        'Network error. Please check your connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = (paymentData: any) => {
    console.log('✅ Payment successful:', paymentData);
    setShowPaymentModal(false);

    // Here you can save the payment details to your backend
    // await saveBookingWithPayment(paymentData);

    // Navigate to success screen
    setTimeout(() => {
      navigation.navigate('BoardingSuccess');
    }, 300);
  };

  const handlePaymentFailure = (error: string) => {
    console.error('❌ Payment failed:', error);
    setShowPaymentModal(false);

    Alert.alert(
      'Payment Failed',
      error || 'Unable to process payment. Please try again.',
      [{ text: 'OK' }]
    );
  };

  const handlePaymentCancel = () => {
    console.log('⚠️ Payment cancelled by user');
    setShowPaymentModal(false);
  };

  return (
    <View style={boardingCheckoutStyles.container}>
      {/* Header */}
      <View style={boardingCheckoutStyles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginRight: 16 }}
        >
          <Image
            source={Icons.LeftArrow}
            style={{ tintColor: '#000000', width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={boardingCheckoutStyles.headerTitle}>Checkout</Text>
          <Text style={boardingCheckoutStyles.headerSubtitle}>
            Review your booking details
          </Text>
        </View>
      </View>

      {dataLoading ? (
        <BoardingCheckoutSkeleton />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: responsiveWidth(4),
            paddingTop: 20,
            paddingBottom: 100,
          }}
        >
          {/* Booking Summary Card */}
          <View style={boardingCheckoutStyles.card}>
          <View style={boardingCheckoutStyles.cardHeader}>
            <MaterialIcons name="calendar-today" size={20} color="#58B9D0" />
            <Text style={boardingCheckoutStyles.cardTitle}>
              Booking Summary
            </Text>
          </View>

          <View style={boardingCheckoutStyles.infoRow}>
            <Text style={boardingCheckoutStyles.infoLabel}>Provider:</Text>
            <Text style={boardingCheckoutStyles.infoValue}>
              {boardingDetails?.facilityName || 'Boarding Service'}
            </Text>
          </View>

          <View style={boardingCheckoutStyles.infoRow}>
            <Text style={boardingCheckoutStyles.infoLabel}>Check-in:</Text>
            <Text style={boardingCheckoutStyles.infoValue}>
              {startDate ? formatDate(startDate) : 'N/A'}
            </Text>
          </View>

          <View style={boardingCheckoutStyles.infoRow}>
            <Text style={boardingCheckoutStyles.infoLabel}>Check-out:</Text>
            <Text style={boardingCheckoutStyles.infoValue}>
              {endDate ? formatDate(endDate) : 'N/A'}
            </Text>
          </View>
        </View>

        {/* Pricing Breakdown */}
        <View style={boardingCheckoutStyles.card}>
          <View style={boardingCheckoutStyles.cardHeader}>
            <MaterialIcons name="receipt" size={20} color="#58B9D0" />
            <Text style={boardingCheckoutStyles.cardTitle}>
              Pricing Details
            </Text>
          </View>

          {bookingData && Array.isArray(bookingData) && bookingData.map((item, index) => {
            const pet = getPetById(item.petId);
            return (
              <View key={index} style={boardingCheckoutStyles.priceRow}>
                <View style={{ flex: 1 }}>
                  <Text style={boardingCheckoutStyles.petName}>
                    {pet?.name || `Pet ${item.petId}`}
                  </Text>
                  <Text style={boardingCheckoutStyles.serviceText}>
                    Service ID: {item.serviceId}
                  </Text>
                </View>
                <Text style={boardingCheckoutStyles.priceText}>
                  ₹ {item.price.toFixed(2)}
                </Text>
              </View>
            );
          })}

          <View style={boardingCheckoutStyles.divider} />

          <View style={boardingCheckoutStyles.totalRow}>
            <Text style={boardingCheckoutStyles.totalLabel}>Total Amount</Text>
            <Text style={boardingCheckoutStyles.totalPrice}>
              ₹ {calculateTotal().toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Important Note */}
        <View style={boardingCheckoutStyles.noteCard}>
          <MaterialIcons name="info" size={20} color="#F59E0B" />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={boardingCheckoutStyles.noteTitle}>Please Note</Text>
            <Text style={boardingCheckoutStyles.noteText}>
              The booking will be confirmed after successful payment. You will
              receive updates on your pet's stay.
            </Text>
          </View>
        </View>
        </ScrollView>
      )}

      {/* Bottom Payment Section */}
      {!dataLoading && (
      <View style={boardingCheckoutStyles.bottomSection}>
        <View style={boardingCheckoutStyles.paymentInfo}>
          <View>
            <Text style={boardingCheckoutStyles.totalAmountLabel}>
              Total Amount
            </Text>
            <Text style={boardingCheckoutStyles.totalAmountValue}>
              ₹ {calculateTotal().toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handlePayNow}
            disabled={loading}
            style={[
              boardingCheckoutStyles.payButton,
              loading && boardingCheckoutStyles.payButtonDisabled,
            ]}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={boardingCheckoutStyles.payButtonText}>Pay Now</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      )}

      {/* Payment Modal */}
      <MockPaymentModal
        visible={showPaymentModal}
        amount={calculateTotal()}
        onSuccess={handlePaymentSuccess}
        onFailure={handlePaymentFailure}
        onCancel={handlePaymentCancel}
        userEmail={userEmail}
        userName={userName}
        description={`Boarding service for ${bookingData?.length || 0} pet(s)`}
      />
    </View>
  );
};

export default BoardingCheckout;
