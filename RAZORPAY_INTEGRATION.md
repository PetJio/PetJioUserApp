# Razorpay Integration Guide

This document explains how the Razorpay payment gateway is integrated into the PetJio app for the boarding checkout process.

## Overview

The app currently uses **Mock Razorpay** for testing purposes. This allows you to test the payment flow without processing actual payments. When ready for production, you can easily switch to the real Razorpay integration.

## Current Setup (Mock Mode)

### Files Involved

1. **`src/services/razorpayService.ts`** - Razorpay service with both real and mock implementations
2. **`src/screens/BoardingCheckout/BoardingCheckout.tsx`** - Checkout screen with payment integration
3. **`src/utils/storage.ts`** - Storage service with user data methods

### How Mock Payment Works

When a user clicks "Pay Now":
1. Shows loading indicator
2. Simulates a 2-second delay (like real payment processing)
3. Returns a mock payment response with dummy IDs
4. Navigates to success screen

```typescript
// Mock response structure
{
  razorpay_payment_id: "pay_mock_1234567890",
  razorpay_order_id: "order_mock_1234567890",
  razorpay_signature: "signature_mock_1234567890"
}
```

## Switching to Real Razorpay

### Step 1: Get Razorpay API Keys

1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Get your **Key ID** and **Key Secret** from Settings → API Keys
3. For testing, use **Test Mode** keys (starts with `rzp_test_`)
4. For production, use **Live Mode** keys (starts with `rzp_live_`)

### Step 2: Update Configuration

Edit `src/services/razorpayService.ts`:

```typescript
const RAZORPAY_CONFIG = {
  key: 'rzp_test_YOUR_ACTUAL_KEY_HERE', // Replace with your actual key
  // ... rest of the config
};
```

### Step 3: Enable Real Razorpay

Edit `src/screens/BoardingCheckout/BoardingCheckout.tsx`:

**Current (Mock):**
```typescript
const paymentResponse = await mockPaymentSuccess(totalAmount);
```

**Change to (Real):**
```typescript
const paymentResponse = await openRazorpay({
  amount: totalAmount,
  userEmail: userEmail || '',
  userName: userName || '',
  description: `Boarding service for ${bookingData.length} pet(s)`,
});
```

### Step 4: Android Setup

For Android, you need to add Razorpay configuration to your app:

1. No additional native configuration needed for basic integration
2. Razorpay SDK handles the payment UI automatically

### Step 5: iOS Setup (If applicable)

For iOS, you might need to add URL schemes:

1. Open `ios/PetJioUser/Info.plist`
2. Add Razorpay URL scheme (refer to Razorpay iOS documentation)

## Payment Flow

### User Journey

1. User fills in booking details
2. User reviews checkout summary
3. User clicks "Pay Now" button
4. Razorpay checkout opens (or mock simulation runs)
5. User completes payment
6. App receives payment response
7. App navigates to success screen

### Technical Flow

```
User clicks Pay Now
    ↓
BoardingCheckout.handlePayNow()
    ↓
Gather user details (email, name)
    ↓
Call razorpayService.openRazorpay() or mockPaymentSuccess()
    ↓
Process payment
    ↓
Receive payment response
    ↓
Navigate to success screen
```

## Error Handling

The integration handles various error scenarios:

1. **Payment Cancelled**: User closes Razorpay without paying
2. **Network Error**: No internet connection during payment
3. **Payment Failed**: Transaction declined by bank
4. **General Errors**: Any other payment processing errors

All errors show an alert dialog to the user with appropriate messages.

## Testing

### Mock Mode Testing

Current implementation allows you to:
- Test the payment flow without Razorpay account
- Test success scenarios
- Test UI/UX during payment processing
- Test navigation after payment

### Real Razorpay Testing

Once you enable real Razorpay:
1. Use Test Mode keys
2. Use Razorpay's test cards (see Razorpay documentation)
3. Test various scenarios (success, failure, cancellation)
4. Verify payment responses

## Backend Integration (TODO)

For production, you should:

1. **Create Order on Backend**:
   ```typescript
   // Before opening Razorpay
   const order = await createOrderOnBackend(totalAmount);
   const paymentResponse = await openRazorpay({
     amount: totalAmount,
     orderId: order.id, // Use backend-generated order ID
     // ...
   });
   ```

2. **Verify Payment on Backend**:
   ```typescript
   // After successful payment
   const verified = await verifyPaymentOnBackend({
     paymentId: paymentResponse.razorpay_payment_id,
     orderId: paymentResponse.razorpay_order_id,
     signature: paymentResponse.razorpay_signature,
   });
   ```

3. **Save Booking Details**:
   ```typescript
   // After verification
   await saveBookingWithPayment(paymentResponse);
   ```

## Security Best Practices

1. **Never expose Key Secret** in client-side code
2. **Always verify payments** on your backend
3. **Use HTTPS** for all API calls
4. **Validate amount** on backend before creating order
5. **Log all transactions** for audit purposes

## Troubleshooting

### Payment not opening
- Check if Razorpay SDK is properly installed
- Verify your API key is correct
- Check console logs for errors

### Payment succeeds but app doesn't navigate
- Check navigation setup
- Verify success route exists
- Check console for navigation errors

### "Invalid Key" error
- Ensure you're using the correct key format
- Verify key is active in Razorpay dashboard
- Check if using Test key in Test mode

## Additional Resources

- [Razorpay Documentation](https://razorpay.com/docs/)
- [React Native SDK](https://razorpay.com/docs/payment-gateway/react-native-sdk/)
- [Test Cards](https://razorpay.com/docs/payment-gateway/test-card-details/)

## Support

For Razorpay-related issues, contact Razorpay support at support@razorpay.com
