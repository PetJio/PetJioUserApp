# Firebase Cloud Messaging (FCM) Setup Instructions

## Overview
Firebase Cloud Messaging has been integrated into your React Native app to handle push notifications. The integration automatically registers device tokens with your backend API after successful login.

## What's Been Implemented

### 1. Firebase Messaging Service
- **Location**: `src/services/firebaseMessagingService.ts`
- **Features**:
  - Request push notification permissions
  - Get FCM token from device
  - Register device token with backend API (`/api/notifications/register-device`)
  - Handle token refresh
  - Setup message handlers for foreground, background, and quit state

### 2. React Hook
- **Location**: `src/hooks/useFirebaseMessaging.ts`
- **Purpose**: Easy integration into React components

### 3. Auto-Integration
- **App.tsx**: Firebase messaging is initialized when app starts
- **authService.ts**: Device token registration happens automatically after successful login

## Setup Required

### 1. Firebase Project Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Add your Android app to the project
4. Download `google-services.json` and place it in `android/app/`
5. For iOS: Download `GoogleService-Info.plist` and add to iOS project

### 2. Android Configuration
The AndroidManifest.xml has been updated with:
- Required permissions (WAKE_LOCK, VIBRATE, C2DM_RECEIVE)
- Firebase messaging service configuration
- Default notification settings

### 3. Build Configuration
You may need to add Firebase plugins to your build.gradle files:

**android/build.gradle** (project level):
```gradle
dependencies {
    classpath 'com.google.gms:google-services:4.3.15'
}
```

**android/app/build.gradle** (app level):
```gradle
apply plugin: 'com.google.gms.google-services'

dependencies {
    implementation 'com.google.firebase:firebase-messaging'
}
```

## API Integration

### Device Registration Endpoint
- **URL**: `POST /api/notifications/register-device`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}`
- **Body**:
```json
{
    "fcmToken": "device_fcm_token_here"
}
```

### When It's Called
- Automatically after successful login
- When FCM token is refreshed
- Only registers if token has changed

## Message Handling

### Current Implementation
- **Foreground**: Messages logged to console
- **Background**: Default system notification
- **App Launch**: Message data available for routing

### Customization Points
You can customize message handling in `firebaseMessagingService.ts`:

```typescript
// Handle foreground messages
messaging().onMessage(async (remoteMessage) => {
    // Your custom logic here
    // Show in-app notification, update UI, etc.
});

// Handle notification taps
messaging().onNotificationOpenedApp((remoteMessage) => {
    // Navigate to specific screen
    // Handle deep linking, etc.
});
```

## Testing

### Testing FCM Integration
1. Build and run the app
2. Login to register device token
3. Check logs for successful registration
4. Send test notification from Firebase Console

### Debug Information
The service logs detailed information:
- ✅ Success messages
- ❌ Error messages  
- 📱 Token information
- 🔄 Token refresh events

## Security Notes

- FCM tokens are automatically encrypted in transit
- Tokens are stored locally and sent securely to your backend
- Token refresh is handled automatically
- No sensitive user data is included in registration

## Troubleshooting

### Common Issues
1. **No token received**: Check Firebase project configuration
2. **Registration fails**: Verify API endpoint and authentication
3. **Permissions denied**: Ensure user grants notification permission
4. **Build errors**: Verify google-services.json placement and build configuration

### Debug Steps
1. Check React Native logs for Firebase errors
2. Verify network requests to registration endpoint
3. Test with Firebase Console test messages
4. Ensure proper build.gradle configuration

## Next Steps

1. **Add google-services.json** to `android/app/`
2. **Update build.gradle files** with Firebase plugins
3. **Test notification flow** end-to-end
4. **Customize message handling** as needed
5. **Setup iOS configuration** if targeting iOS

The integration is ready to use once Firebase project is properly configured!