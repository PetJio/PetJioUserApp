import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  BackHandler,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../../constants/api';

type RootStackParamList = {
  PaymentWebView: {
    paymentUrl: string;
    bookingId: number;
    startDate?: string;
    endDate?: string;
    selectedPets?: number[];
    petOwnerId?: number;
    boardingDetails?: any;
    isSettlement?: boolean; // Flag to indicate if this is a settlement payment
    settlementAmount?: number; // Amount paid for settlement
  };
  BoardingSuccess: {
    bookingId: number;
    startDate?: string;
    endDate?: string;
    selectedPets?: number[];
    petOwnerId?: number;
    boardingDetails?: any;
  };
  SettlementSuccess: {
    bookingId: number;
    amount?: number;
  };
};

type PaymentWebViewNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PaymentWebView'
>;
type PaymentWebViewRouteProp = RouteProp<RootStackParamList, 'PaymentWebView'>;

const PaymentWebView: React.FC = () => {
  const navigation = useNavigation<PaymentWebViewNavigationProp>();
  const route = useRoute<PaymentWebViewRouteProp>();
  const webViewRef = useRef<WebView>(null);

  const {
    paymentUrl,
    bookingId,
    startDate,
    endDate,
    selectedPets,
    petOwnerId,
    boardingDetails,
    isSettlement,
    settlementAmount,
  } = route.params;

  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [paymentDetected, setPaymentDetected] = React.useState(false);

  // Inject JavaScript to detect payment status on the page
  const injectedJavaScript = `
    (function() {
      // Check for "PAID" text on the page
      const checkPaymentStatus = () => {
        const bodyText = document.body.innerText || document.body.textContent;
        const isPaid = bodyText.toUpperCase().includes('PAID') || 
                       bodyText.toUpperCase().includes('PAYMENT SUCCESSFUL') ||
                       bodyText.toUpperCase().includes('SUCCESS');
        
        if (isPaid && !window.paymentDetected) {
          window.paymentDetected = true;
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'PAYMENT_SUCCESS' }));
        }
      };
      
      // Check immediately
      setTimeout(checkPaymentStatus, 1000);
      
      // Also check when DOM changes
      if (window.MutationObserver) {
        const observer = new MutationObserver(checkPaymentStatus);
        observer.observe(document.body, { childList: true, subtree: true });
      }
    })();
    true;
  `;

  // Handle messages from WebView
  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'PAYMENT_SUCCESS' && !paymentDetected) {
        setPaymentDetected(true);
        console.log('✅ Payment SUCCESS detected from WebView');
        handlePaymentSuccess();
      }
    } catch (error) {
      console.log('WebView message parse error:', error);
    }
  };

  // Handle back button press
  const handleBackPress = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }

    Alert.alert(
      'Cancel Payment',
      'Are you sure you want to cancel the payment?',
      [
        { text: 'Continue Payment', style: 'cancel' },
        {
          text: 'Cancel Payment',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]
    );
    return true;
  };

  // Monitor URL changes to detect payment completion
  const handleNavigationStateChange = (navState: any) => {
    console.log('📍 WebView URL:', navState.url);
    setCanGoBack(navState.canGoBack);

    // Check if payment is successful by monitoring URL changes
    // Razorpay typically redirects to success/failure URLs after payment
    // Also check for "PAID" status in URL or title
    if (
      navState.url.includes('payment_id') ||
      navState.url.includes('razorpay_payment_id') ||
      navState.url.includes('success') ||
      navState.url.includes('callback') ||
      navState.url.includes('paid') ||
      navState.title?.toUpperCase().includes('PAID')
    ) {
      console.log('✅ Payment appears to be completed');
      handlePaymentSuccess();
    } else if (navState.url.includes('cancel') || navState.url.includes('failure')) {
      console.log('❌ Payment appears to be cancelled/failed');
      handlePaymentFailure();
    }
  };

  const handlePaymentSuccess = async () => {
    // If this is a settlement payment, update status to 8 and navigate to SettlementSuccess
    if (isSettlement) {
      try {
        const token = await AsyncStorage.getItem('token');
        const statusUrl = `${API_CONFIG.BASE_URL}/api/booking-details/update-booking-status/${bookingId}`;

        console.log('🔄 Updating settlement booking status to 8 (settled)...');
        console.log(`📍 URL: ${statusUrl}`);
        console.log(`🎫 Booking ID: ${bookingId}`);

        // Generate CURL command for debugging
        const curlCommand = `curl --location --request PATCH '${statusUrl}' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer ${token ? token.substring(0, 20) + '...' : 'NO_TOKEN'}' \\
--data '{
  "status": 8
}'`;
        console.log('📋 CURL Command:\n', curlCommand);

        const statusResponse = await fetch(statusUrl, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: 8, // settled status
          }),
        });

        const statusData = await statusResponse.json();
        console.log('✅ Settlement status update response:', JSON.stringify(statusData));

        if (!statusResponse.ok) {
          console.warn('⚠️ Failed to update settlement status, but continuing to success screen');
        }
      } catch (error) {
        console.error('❌ Error updating settlement status:', error);
        // Continue to success screen even if status update fails
      }

      console.log('✅ Settlement payment successful, navigating to SettlementSuccess');
      navigation.replace('SettlementSuccess', {
        bookingId,
        amount: settlementAmount,
      });
      return;
    }

    // Original boarding booking payment flow
    try {
      // Update booking status to pending (status: 1) after payment success
      const token = await AsyncStorage.getItem('token');
      const statusUrl = `${API_CONFIG.BASE_URL}/api/booking-details/update-booking-status/${bookingId}`;

      console.log('🔄 Updating booking status to pending...');
      console.log(`📍 URL: ${statusUrl}`);
      console.log(`🎫 Booking ID: ${bookingId}`);

      // Generate CURL command for debugging
      const curlCommand = `curl --location --request PATCH '${statusUrl}' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer ${token ? token.substring(0, 20) + '...' : 'NO_TOKEN'}' \\
--data '{
  "status": 1
}'`;
      console.log('📋 CURL Command:\n', curlCommand);

      const statusResponse = await fetch(statusUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: 1, // pending status
        }),
      });

      const statusData = await statusResponse.json();
      console.log('✅ Booking status update response:', JSON.stringify(statusData));

      if (!statusResponse.ok) {
        console.warn('⚠️ Failed to update booking status, but continuing to success screen');
      }
    } catch (error) {
      console.error('❌ Error updating booking status:', error);
      // Continue to success screen even if status update fails
    }

    // Navigate directly to success screen without showing alert
    console.log('✅ Navigating to BoardingSuccess screen');
    navigation.replace('BoardingSuccess', {
      bookingId,
      startDate,
      endDate,
      selectedPets,
      petOwnerId,
      boardingDetails,
    });
  };

  const handlePaymentFailure = () => {
    Alert.alert(
      'Payment Cancelled',
      'Your payment was not completed. You can try again later.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  // Listen for back button on Android
  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => backHandler.remove();
  }, [canGoBack]);

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB',  }}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingBottom: 16,
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 1,
          borderBottomColor: '#E5E7EB',
          elevation: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          paddingTop: (StatusBar.currentHeight - 4)
        }}
      >
        <TouchableOpacity
          onPress={handleBackPress}
          style={{
            marginRight: 16,
            padding: 4,
          }}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: '#1F2937',
              marginBottom: 4,
            }}
          >
            Complete Payment
          </Text>
          <Text
            style={{
              fontSize: 13,
              color: '#6B7280',
              fontWeight: '500',
            }}
          >
            Secure payment powered by Razorpay
          </Text>
        </View>
      </View>

      {/* Loading Indicator */}
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            zIndex: 1,
          }}
        >
          <ActivityIndicator size="large" color="#58B9D0" />
          <Text
            style={{
              fontSize: 14,
              color: '#6B7280',
              marginTop: 12,
            }}
          >
            Loading payment gateway...
          </Text>
        </View>
      )}

      {/* WebView */}
      <WebView
        ref={webViewRef}
        source={{ uri: paymentUrl }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
        onMessage={handleWebViewMessage}
        injectedJavaScript={injectedJavaScript}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        style={{ flex: 1 }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error:', nativeEvent);
          Alert.alert(
            'Error',
            'Failed to load payment page. Please check your internet connection.',
            [
              {
                text: 'Retry',
                onPress: () => webViewRef.current?.reload(),
              },
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => navigation.goBack(),
              },
            ]
          );
        }}
      />
    </View>
  );
};

export default PaymentWebView;
