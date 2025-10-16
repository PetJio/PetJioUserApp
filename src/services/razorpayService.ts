import RazorpayCheckout from 'react-native-razorpay';

// Mock Razorpay configuration
const RAZORPAY_CONFIG = {
  // These are test/mock keys - replace with real keys in production
  key: 'rzp_test_1DP5mmOlF5G5ag', // Mock test key
  amount: 0, // Will be set dynamically
  name: 'PetJio',
  description: 'Pet Boarding Service Payment',
  image: 'https://your-logo-url.com/logo.png', // Replace with actual logo URL
  currency: 'INR',
  prefill: {
    email: '',
    contact: '',
    name: '',
  },
  theme: {
    color: '#58B9D0', // PetJio primary color
  },
};

export interface RazorpayOptions {
  amount: number; // Amount in rupees (will be converted to paise)
  orderId?: string;
  userEmail?: string;
  userContact?: string;
  userName?: string;
  description?: string;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

/**
 * Opens Razorpay payment checkout
 * @param options Payment options
 * @returns Promise with payment response
 */
export const openRazorpay = async (
  options: RazorpayOptions
): Promise<RazorpayResponse> => {
  try {
    // Convert amount to paise (Razorpay requires amount in smallest currency unit)
    const amountInPaise = Math.round(options.amount * 100);

    const razorpayOptions = {
      ...RAZORPAY_CONFIG,
      amount: amountInPaise,
      order_id: options.orderId || `order_${Date.now()}`,
      prefill: {
        email: options.userEmail || '',
        contact: options.userContact || '',
        name: options.userName || '',
      },
      description: options.description || RAZORPAY_CONFIG.description,
    };

    console.log('🔐 Opening Razorpay with options:', {
      amount: options.amount,
      amountInPaise,
      orderId: razorpayOptions.order_id,
    });

    // Open Razorpay checkout
    const data = await RazorpayCheckout.open(razorpayOptions);

    console.log('✅ Razorpay payment successful:', data);
    return data as RazorpayResponse;
  } catch (error: any) {
    console.error('❌ Razorpay payment error:', error);

    // Handle different error types
    if (error.code === RazorpayCheckout.PAYMENT_CANCELLED) {
      throw new Error('Payment was cancelled by user');
    } else if (error.code === RazorpayCheckout.NETWORK_ERROR) {
      throw new Error('Network error occurred. Please check your internet connection');
    } else {
      throw new Error(error.description || 'Payment failed. Please try again');
    }
  }
};

/**
 * Mock function to simulate payment success (for testing)
 * Use this when you want to test the success flow without actual payment
 */
export const mockPaymentSuccess = async (
  amount: number
): Promise<RazorpayResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    razorpay_payment_id: `pay_mock_${Date.now()}`,
    razorpay_order_id: `order_mock_${Date.now()}`,
    razorpay_signature: `signature_mock_${Date.now()}`,
  };
};

/**
 * Verify payment on backend
 * This should be called after successful payment to verify the payment signature
 */
export const verifyPayment = async (
  paymentId: string,
  orderId: string,
  signature: string
): Promise<boolean> => {
  try {
    // In production, this should call your backend API to verify the payment
    // For now, we'll just return true
    console.log('🔍 Verifying payment:', { paymentId, orderId, signature });

    // Mock verification - always returns true
    // Replace this with actual API call to your backend
    /*
    const response = await fetch(`${API_CONFIG.BASE_URL}/api/payment/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ paymentId, orderId, signature }),
    });

    const result = await response.json();
    return result.verified;
    */

    return true;
  } catch (error) {
    console.error('❌ Payment verification error:', error);
    return false;
  }
};

export default {
  openRazorpay,
  mockPaymentSuccess,
  verifyPayment,
};
