import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { responsiveWidth } from 'react-native-responsive-dimensions';

type RootStackParamList = {
  SettlementSuccess: {
    bookingId: number;
    amount?: number;
  };
  Main: { screen: string };
};

type SettlementSuccessNavigationProp = StackNavigationProp<RootStackParamList, 'SettlementSuccess'>;
type SettlementSuccessRouteProp = RouteProp<RootStackParamList, 'SettlementSuccess'>;

const SettlementSuccess = () => {
  const navigation = useNavigation<SettlementSuccessNavigationProp>();
  const route = useRoute<SettlementSuccessRouteProp>();

  const { bookingId, amount } = route.params || {};

  const handleGoHome = () => {
    (navigation as any).navigate('Main', {
      screen: 'Home'
    });
  };

  const handleViewBooking = () => {
    // Navigate back to booking history
    (navigation as any).navigate('Main', {
      screen: 'History'
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: responsiveWidth(4) }}>
        {/* Success Icon */}
        <View style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: '#10B981',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 30
        }}>
          <MaterialIcons name="check" size={60} color="#fff" />
        </View>

        {/* Success Title */}
        <Text style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#1F2937',
          marginBottom: 12,
          textAlign: 'center'
        }}>
          Payment Successful!
        </Text>

        {/* Success Message */}
        <Text style={{
          fontSize: 16,
          color: '#6B7280',
          textAlign: 'center',
          marginBottom: 20,
          lineHeight: 24,
          paddingHorizontal: 20
        }}>
          Thank you for settling your boarding service payment
        </Text>

        {/* Amount Display (if provided) */}
        {amount && amount > 0 && (
          <View style={{
            backgroundColor: '#F3F4F6',
            paddingHorizontal: 24,
            paddingVertical: 16,
            borderRadius: 12,
            marginTop: 10
          }}>
            <Text style={{
              fontSize: 14,
              color: '#6B7280',
              marginBottom: 4,
              textAlign: 'center'
            }}>
              Amount Paid
            </Text>
            <Text style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: '#10B981',
              textAlign: 'center'
            }}>
              ₹{amount.toFixed(2)}
            </Text>
          </View>
        )}

        {/* Additional Info */}
        <Text style={{
          fontSize: 14,
          color: '#9CA3AF',
          textAlign: 'center',
          marginTop: 30,
          lineHeight: 20,
          paddingHorizontal: 20
        }}>
          A receipt has been sent to your registered email address
        </Text>
      </View>

      {/* Action Buttons - Fixed at bottom */}
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
        {/* View Booking History Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#58B9D0',
            paddingVertical: 16,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            minHeight: 50,
            marginBottom: 12,
          }}
          onPress={handleViewBooking}
        >
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#FFFFFF',
          }}>
            View Booking History
          </Text>
        </TouchableOpacity>

        {/* Back to Home Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#FFFFFF',
            paddingVertical: 16,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            minHeight: 50,
            borderWidth: 1,
            borderColor: '#58B9D0',
          }}
          onPress={handleGoHome}
        >
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#58B9D0',
          }}>
            Back to Home
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettlementSuccess;
