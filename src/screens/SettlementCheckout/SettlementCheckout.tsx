import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import {
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { API_CONFIG } from '../../config/api';
import { storageService } from '../../utils/storage';
import settlementCheckoutStyles from './settlementcheckout.styles';
import { RootStackParamList } from '../../types/navigation';
import { SettlementCheckoutSkeleton } from '../../components/SkeletonLoader/SkeletonLoader';

type SettlementCheckoutScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SettlementCheckout'
>;
type SettlementCheckoutScreenRouteProp = RouteProp<
  RootStackParamList,
  'SettlementCheckout'
>;

interface SettlementCheckoutProps {
  navigation: SettlementCheckoutScreenNavigationProp;
  route: SettlementCheckoutScreenRouteProp;
}

interface SettlementBreakdown {
  medicatedBath?: number;
  nailClipping?: number;
  commercialFood?: number;
  swimming?: number;
  docAvailibility?: number;
}

interface SettlementData {
  totalAmountPending: number;
  totalPaidAmount: number;
  breakdown: SettlementBreakdown;
}

const SettlementCheckout: React.FC<SettlementCheckoutProps> = ({
  navigation,
  route,
}) => {
  const { bookingId, bookingData } = route.params;
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [settlementData, setSettlementData] = useState<SettlementData | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const [petOwnerId, setPetOwnerId] = useState<number | null>(null);

  useEffect(() => {
    loadUserDetails();
    fetchSettlementData();
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

  const fetchSettlementData = async () => {
    try {
      setDataLoading(true);
      console.log('🔄 Fetching settlement data for booking ID:', bookingId);

      const token = await storageService.getUserToken();
      if (!token) {
        Alert.alert('Error', 'Authentication token not found');
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

      if (ownerResponse.ok) {
        const ownerResult = await ownerResponse.json();
        const ownerId = ownerResult.statusCode === 200 ? ownerResult.body.id : null;
        setPetOwnerId(ownerId);
        console.log('✅ Pet Owner ID fetched:', ownerId);
      }

      // Build accServices array from bookingData
      const accServices = bookingData.boardingServiceBookings.map((booking: any) => {
        const services: any = {};
        if (booking.medicatedBath) services.medicatedBath = true;
        if (booking.nailClipping) services.nailClipping = true;
        if (booking.swimmingPool) services.swimming = true;
        if (booking.isDocReqd) services.docAvailibility = true;
        // Note: commercialFood is not in boardingServiceBookings, only in boarding
        return services;
      });

      // If boarding has commercialFood info, add it to first service
      if (bookingData.boarding?.commercialFood && accServices.length > 0) {
        accServices[0].commercialFood = true;
      }

      const settlementPayload = {
        bookingId: bookingId,
        boardingId: bookingData.boarding.id,
        accServices: accServices.filter((s: any) => Object.keys(s).length > 0), // Only send non-empty objects
      };

      console.log('📤 Settlement calculation payload:', JSON.stringify(settlementPayload, null, 2));

      // Generate CURL command for debugging
      const curlCommand = `curl -X POST "${API_CONFIG.BASE_URL}/api/boarding-service-bookings/calculate-settlement" \\
  -H "Authorization: Bearer ${token.substring(0, 20)}..." \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(settlementPayload)}'`;

      console.log('🔧 CURL command for settlement API:');
      console.log('=====================================');
      console.log(curlCommand);
      console.log('=====================================');

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/api/boarding-service-bookings/calculate-settlement`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(settlementPayload),
        }
      );

      console.log('📥 Settlement response status:', response.status);

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Settlement response:', JSON.stringify(result, null, 2));

        if (result.statusCode === 200 && result.body) {
          setSettlementData(result.body);
        } else {
          Alert.alert('Error', result.message || 'Failed to calculate settlement');
        }
      } else {
        const errorText = await response.text();
        console.error('❌ Settlement API error:', errorText);
        Alert.alert('Error', 'Failed to fetch settlement details');
      }
    } catch (error) {
      console.error('🔥 Error fetching settlement:', error);
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setDataLoading(false);
    }
  };

  const handlePayNow = async () => {
    if (!settlementData) {
      Alert.alert('Error', 'Settlement data not available');
      return;
    }

    if (!petOwnerId) {
      Alert.alert('Error', 'Pet owner information is missing');
      return;
    }

    if (!userEmail || !userContact) {
      Alert.alert('Error', 'User information is missing');
      return;
    }

    setLoading(true);
    try {
      const token = await storageService.getUserToken();
      if (!token) {
        Alert.alert('Error', 'Authentication token not found');
        setLoading(false);
        return;
      }

      // Amount - Static for testing
      const amountInPaise = 1; // Static - 1 for testing
      console.log('💰 Settlement amount (static):', amountInPaise);

      const paymentPayload = {
        amount: amountInPaise, // Static - 1 for testing
        email: userEmail,
        contact: userContact,
        bookingsId: bookingId,
        petOwnerId: petOwnerId,
      };

      console.log('💳 Creating payment link for settlement:', paymentPayload);

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
      console.log('💳 Payment link response:', result);

      if (response.ok && result.statusCode === 201) {
        if (result.body && result.body.short_url) {
          const paymentUrl = result.body.short_url;
          console.log('💳 Opening payment URL:', paymentUrl);

          // Navigate to PaymentWebView with settlement flag
          navigation.navigate('PaymentWebView', {
            paymentUrl,
            bookingId,
            petOwnerId,
            isSettlement: true,
            settlementAmount: settlementData.totalAmountPending,
          });
        } else {
          Alert.alert('Error', 'Payment link URL not found');
        }
      } else {
        Alert.alert(
          'Payment Failed',
          result.message || 'Failed to create payment link'
        );
      }
    } catch (error) {
      console.error('🔥 Payment error:', error);
      Alert.alert('Payment Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getServiceIcon = (serviceName: string) => {
    switch (serviceName) {
      case 'medicatedBath':
        return { icon: 'bathtub', color: '#3B82F6', bg: '#DBEAFE', label: 'Medicated Bath' };
      case 'nailClipping':
        return { icon: 'content-cut', color: '#EC4899', bg: '#FCE7F3', label: 'Nail Clipping' };
      case 'commercialFood':
        return { icon: 'restaurant', color: '#F59E0B', bg: '#FEF3C7', label: 'Commercial Food' };
      case 'swimming':
        return { icon: 'pool', color: '#06B6D4', bg: '#CFFAFE', label: 'Swimming Pool' };
      case 'docAvailibility':
        return { icon: 'medical-services', color: '#DC2626', bg: '#FEE2E2', label: 'Doctor Consultation' };
      default:
        return { icon: 'check-circle', color: '#10B981', bg: '#ECFDF5', label: serviceName };
    }
  };

  return (
    <View style={settlementCheckoutStyles.container}>
      {/* Header */}
      <View style={settlementCheckoutStyles.header}>
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
          <Text style={settlementCheckoutStyles.headerTitle}>Settlement Checkout</Text>
          <Text style={settlementCheckoutStyles.headerSubtitle}>
            Additional services payment
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
          <MaterialIcons name="account-balance-wallet" size={20} color="#58B9D0" />
        </View>
      </View>

      {dataLoading ? (
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          <SettlementCheckoutSkeleton />
        </ScrollView>
      ) : settlementData ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: responsiveWidth(5),
            paddingTop: 20,
            paddingBottom: 100,
          }}
        >
          {/* Booking Info Card */}
          <View style={settlementCheckoutStyles.card}>
            <View style={settlementCheckoutStyles.cardHeader}>
              <MaterialIcons name="receipt-long" size={20} color="#58B9D0" />
              <Text style={settlementCheckoutStyles.cardTitle}>
                Booking #{bookingId}
              </Text>
            </View>
            <View style={settlementCheckoutStyles.infoRow}>
              <Text style={settlementCheckoutStyles.infoLabel}>Provider:</Text>
              <Text style={settlementCheckoutStyles.infoValue}>
                {bookingData?.boarding?.facilityName || 'Boarding Service'}
              </Text>
            </View>
            <View style={settlementCheckoutStyles.infoRow}>
              <Text style={settlementCheckoutStyles.infoLabel}>Already Paid:</Text>
              <Text style={[settlementCheckoutStyles.infoValue, { color: '#10B981', fontWeight: '600' }]}>
                ₹{settlementData.totalPaidAmount}
              </Text>
            </View>
          </View>

          {/* Additional Services Breakdown */}
          <View style={settlementCheckoutStyles.card}>
            <View style={settlementCheckoutStyles.cardHeader}>
              <MaterialIcons name="miscellaneous-services" size={20} color="#58B9D0" />
              <Text style={settlementCheckoutStyles.cardTitle}>
                Additional Services Used
              </Text>
            </View>

            {Object.entries(settlementData.breakdown).map(([service, amount], index) => {
              if (amount === 0) return null;
              const serviceInfo = getServiceIcon(service);

              return (
                <View key={index} style={settlementCheckoutStyles.serviceBreakdownRow}>
                  <View style={[settlementCheckoutStyles.serviceIconBadge, { backgroundColor: serviceInfo.bg }]}>
                    <MaterialIcons name={serviceInfo.icon} size={18} color={serviceInfo.color} />
                  </View>
                  <Text style={settlementCheckoutStyles.serviceBreakdownLabel}>
                    {serviceInfo.label}
                  </Text>
                  <Text style={settlementCheckoutStyles.serviceBreakdownAmount}>
                    ₹{amount}
                  </Text>
                </View>
              );
            })}

            {Object.values(settlementData.breakdown).every(v => v === 0) && (
              <View style={{ paddingVertical: 20, alignItems: 'center' }}>
                <MaterialIcons name="check-circle" size={48} color="#10B981" />
                <Text style={{ marginTop: 12, fontSize: 14, color: '#6B7280', textAlign: 'center' }}>
                  No additional services were used during the stay
                </Text>
              </View>
            )}
          </View>

          {/* Total Amount Pending Card */}
          <LinearGradient
            colors={['#58B9D0', '#4A9FB8', '#3D8BA4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={settlementCheckoutStyles.grandTotalCard}
          >
            <View style={settlementCheckoutStyles.grandTotalRow}>
              <View>
                <Text style={settlementCheckoutStyles.grandTotalLabel}>AMOUNT PENDING</Text>
                <Text style={{ fontSize: 12, color: '#FFFFFF', opacity: 0.8, marginTop: 4 }}>
                  for additional services
                </Text>
              </View>
              <Text style={settlementCheckoutStyles.grandTotalValue}>
                ₹{settlementData.totalAmountPending}
              </Text>
            </View>
          </LinearGradient>

          {/* Important Note */}
          <View style={settlementCheckoutStyles.noteCard}>
            <View style={settlementCheckoutStyles.noteIconContainer}>
              <MaterialIcons name="info" size={22} color="#F59E0B" />
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={settlementCheckoutStyles.noteTitle}>Settlement Payment</Text>
              <Text style={settlementCheckoutStyles.noteText}>
                This is the final payment for additional services used during your pet's boarding stay.
                After successful payment, your booking will be completed.
              </Text>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
          <MaterialIcons name="error-outline" size={64} color="#EF4444" />
          <Text style={{ marginTop: 16, fontSize: 16, fontWeight: '600', color: '#1F2937' }}>
            Failed to Load Settlement
          </Text>
          <Text style={{ marginTop: 8, fontSize: 14, color: '#6B7280', textAlign: 'center' }}>
            Unable to calculate settlement amount. Please try again.
          </Text>
          <TouchableOpacity
            onPress={fetchSettlementData}
            style={{
              marginTop: 20,
              paddingHorizontal: 24,
              paddingVertical: 12,
              backgroundColor: '#58B9D0',
              borderRadius: 8,
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: 14, fontWeight: '600' }}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Payment Section */}
      {!dataLoading && settlementData && settlementData.totalAmountPending > 0 && (
        <View style={settlementCheckoutStyles.bottomSection}>
          <TouchableOpacity
            onPress={handlePayNow}
            disabled={loading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={loading ? ['#CBD5E1', '#CBD5E1'] : ['#58B9D0', '#4A9FB8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={settlementCheckoutStyles.confirmButton}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <MaterialIcons name="payment" size={22} color="#FFFFFF" />
                  <Text style={settlementCheckoutStyles.confirmButtonText}>
                    Pay ₹{settlementData.totalAmountPending}
                  </Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}

      {!dataLoading && settlementData && settlementData.totalAmountPending === 0 && (
        <View style={settlementCheckoutStyles.bottomSection}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#10B981', '#059669']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={settlementCheckoutStyles.confirmButton}
            >
              <MaterialIcons name="check-circle" size={22} color="#FFFFFF" />
              <Text style={settlementCheckoutStyles.confirmButtonText}>
                No Payment Required
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default SettlementCheckout;
