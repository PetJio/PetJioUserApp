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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
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
  PaymentWebView: {
    paymentUrl: string;
    bookingId: number;
    startDate?: string;
    endDate?: string;
    selectedPets?: number[];
    petOwnerId?: number;
    boardingDetails?: any;
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

      // Create payment link payload with static amount for testing
      // Amount is set to 1 rupee (100 paise) for testing purposes
      const amountInPaise = 100; // Static - 1 rupee = 100 paise
      console.log('💰 Amount in paise for Razorpay (static):', amountInPaise);

      const paymentPayload = {
        amount: amountInPaise, // Static - 1 rupee (100 paise) for testing
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
          console.log('💳 Opening payment URL in WebView:', paymentUrl);

          // Navigate to PaymentWebView screen
          const selectedPetIds = bookingData.map((item: any) => item.petId);
          navigation.navigate('PaymentWebView', {
            paymentUrl,
            bookingId,
            startDate,
            endDate,
            selectedPets: selectedPetIds,
            petOwnerId,
            boardingDetails,
          });
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
          style={{ 
            marginRight: 16,
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: '#F3F4F6',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MaterialIcons name="arrow-back" size={22} color="#1F2937" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={boardingCheckoutStyles.headerTitle}>Checkout Summary</Text>
          <Text style={boardingCheckoutStyles.headerSubtitle}>
            Review your selections
          </Text>
        </View>
        <View style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: '#E0F2FE',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <MaterialIcons name="shopping-cart" size={20} color="#58B9D0" />
        </View>
      </View>

      {dataLoading ? (
        <BoardingCheckoutSkeleton />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: responsiveWidth(5),
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

        {/* Pet Details Cards */}
        {bookingData && Array.isArray(bookingData) && bookingData.map((item, index) => {
          const pet = getPetById(item.petId);

          // Extract service details from the item
          const services = [];
          if (item.foodType) {
            // Handle foodType as object {id, name} or string
            const foodTypeName = typeof item.foodType === 'object' ? item.foodType.name : item.foodType;
            services.push(`Food: ${foodTypeName}`);
          }
          if (item.nailClipping) services.push('Nail Clipping');
          if (item.medicatedBath) services.push('Medicated Bath');
          if (item.swimmingPool) services.push('Swimming Pool');
          if (item.walksPerDay) services.push(`Walks (${item.walksPerDay}/day)`);
          if (item.isDocReqd) services.push('On-site Doctor Requested');

          return (
            <View key={index} style={boardingCheckoutStyles.petCard}>
              <View style={boardingCheckoutStyles.petCardHeader}>
                <View style={boardingCheckoutStyles.petIconContainer}>
                  <MaterialIcons name="pets" size={24} color="#58B9D0" />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={boardingCheckoutStyles.petCardName}>
                    {pet?.petName || pet?.name || `Pet ${item.petId}`}
                  </Text>
                  {pet?.breed && (
                    <Text style={boardingCheckoutStyles.petCardBreed}>
                      {typeof pet.breed === 'object' ? pet.breed.name || pet.breed.breedName : pet.breed}
                    </Text>
                  )}
                </View>
                <View style={boardingCheckoutStyles.petPriceTag}>
                  <Text style={boardingCheckoutStyles.petPriceLabel}>Pet Total</Text>
                  <Text style={boardingCheckoutStyles.petPriceValue}>
                    ₹ {item.price}
                  </Text>
                </View>
              </View>

              {services.length > 0 && (
                <View style={boardingCheckoutStyles.servicesContainer}>
                  {services.map((service, idx) => {
                    // Get icon, color, and background based on service type
                    let iconName = 'check-circle';
                    let iconColor = '#10B981';
                    let bgColor = '#ECFDF5';
                    
                    if (service.toLowerCase().includes('doctor')) {
                      iconName = 'medical-services';
                      iconColor = '#DC2626';
                      bgColor = '#FEE2E2';
                    } else if (service.toLowerCase().includes('food')) {
                      iconName = 'restaurant';
                      iconColor = '#F59E0B';
                      bgColor = '#FEF3C7';
                    } else if (service.toLowerCase().includes('bath')) {
                      iconName = 'bathtub';
                      iconColor = '#3B82F6';
                      bgColor = '#DBEAFE';
                    } else if (service.toLowerCase().includes('pool')) {
                      iconName = 'pool';
                      iconColor = '#06B6D4';
                      bgColor = '#CFFAFE';
                    } else if (service.toLowerCase().includes('walk')) {
                      iconName = 'directions-walk';
                      iconColor = '#8B5CF6';
                      bgColor = '#EDE9FE';
                    } else if (service.toLowerCase().includes('nail')) {
                      iconName = 'content-cut';
                      iconColor = '#EC4899';
                      bgColor = '#FCE7F3';
                    }
                    
                    return (
                      <View key={idx} style={[boardingCheckoutStyles.serviceChip, { backgroundColor: bgColor }]}>
                        <MaterialIcons
                          name={iconName}
                          size={14}
                          color={iconColor}
                        />
                        <Text style={[boardingCheckoutStyles.serviceChipText, { color: iconColor }]}>
                          {service}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}

        {/* Grand Total Card */}
        <LinearGradient
          colors={['#58B9D0', '#4A9FB8', '#3D8BA4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={boardingCheckoutStyles.grandTotalCard}
        >
          <View style={boardingCheckoutStyles.grandTotalRow}>
            <View>
              <Text style={boardingCheckoutStyles.grandTotalLabel}>TOTAL AMOUNT</Text>
              <Text style={{ fontSize: 12, color: '#FFFFFF', opacity: 0.8, marginTop: 4 }}>
                including all services
              </Text>
            </View>
            <Text style={boardingCheckoutStyles.grandTotalValue}>
              ₹{calculateTotal()}
            </Text>
          </View>
        </LinearGradient>

        {/* Important Note */}
        <View style={boardingCheckoutStyles.noteCard}>
          <View style={boardingCheckoutStyles.noteIconContainer}>
            <MaterialIcons name="info" size={22} color="#F59E0B" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={boardingCheckoutStyles.noteTitle}>Important Information</Text>
            <Text style={boardingCheckoutStyles.noteText}>
              Your booking will be confirmed after successful payment. You'll receive regular updates about your pet's stay including daily photos and videos.
            </Text>
          </View>
        </View>
        </ScrollView>
      )}

      {/* Bottom Payment Section */}
      {!dataLoading && (
      <View style={boardingCheckoutStyles.bottomSection}>
        <TouchableOpacity
          onPress={handlePayNow}
          disabled={loading}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={loading ? ['#CBD5E1', '#CBD5E1'] : ['#58B9D0', '#4A9FB8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={boardingCheckoutStyles.confirmButton}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <MaterialIcons name="payment" size={22} color="#FFFFFF" />
                <Text style={boardingCheckoutStyles.confirmButtonText}>
                  Confirm Booking
                </Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
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
