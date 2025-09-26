const admin = require('firebase-admin');
const path = require('path');
const { execSync } = require('child_process');

// Path to your service account key
const serviceAccountPath = path.join(__dirname, '..', '..', 'Users', 'Apurba Ruidas', 'Downloads', 'fcm-secret-key.json');
const serviceAccount = require(serviceAccountPath);

// Function to get FCM token from device AsyncStorage
async function getFCMTokenFromDevice() {
  try {
    console.log('🔍 Retrieving FCM token from device AsyncStorage...');

    // Try different possible keys where FCM token might be stored
    const possibleKeys = [
      'fcm_token',
      'firebase_token',
      'registered_fcm_token',
      'device_token',
      'push_token',
      '@firebase_token',
      '@fcm_token'
    ];

    for (const key of possibleKeys) {
      try {
        const cmd = `adb shell run-as com.petjiouser cat /data/data/com.petjiouser/shared_prefs/RKStorage.xml | grep "${key}"`;
        const result = execSync(cmd, { encoding: 'utf8', stdio: 'pipe' });

        if (result && result.includes(key)) {
          // Extract token from XML
          const match = result.match(/<string name="[^"]*">(.*?)<\/string>/);
          if (match && match[1]) {
            console.log(`✅ Found FCM token in key: ${key}`);
            return match[1];
          }
        }
      } catch (e) {
        // Continue to next key
      }
    }

    // Try React Native AsyncStorage method
    try {
      console.log('🔍 Trying React Native AsyncStorage method...');
      const cmd = `adb shell "run-as com.petjiouser find /data/data/com.petjiouser -name '*AsyncStorage*' -type f"`;
      const files = execSync(cmd, { encoding: 'utf8' }).split('\n').filter(f => f.trim());

      for (const file of files) {
        if (file.trim()) {
          try {
            const content = execSync(`adb shell "run-as com.petjiouser cat '${file.trim()}'"`, { encoding: 'utf8' });

            // Look for FCM token patterns in the content
            const tokenPattern = /[a-zA-Z0-9_-]{140,200}:[a-zA-Z0-9_-]{1,100}/g;
            const matches = content.match(tokenPattern);

            if (matches && matches.length > 0) {
              console.log(`✅ Found FCM token in AsyncStorage file: ${file}`);
              return matches[0];
            }
          } catch (e) {
            // Continue to next file
          }
        }
      }
    } catch (e) {
      console.log('⚠️ Could not access AsyncStorage files');
    }

    // Fallback: check app logs for recently printed FCM token
    console.log('🔍 Checking recent app logs for FCM token...');
    try {
      const logCmd = `adb logcat -d ReactNativeJS:* | grep -i "fcm.*token\\|token.*fcm" | tail -5`;
      const logResult = execSync(logCmd, { encoding: 'utf8' });

      const tokenPattern = /[a-zA-Z0-9_-]{140,200}:[a-zA-Z0-9_-]{1,100}/g;
      const logMatches = logResult.match(tokenPattern);

      if (logMatches && logMatches.length > 0) {
        console.log('✅ Found FCM token in recent logs');
        return logMatches[logMatches.length - 1]; // Get the most recent one
      }
    } catch (e) {
      console.log('⚠️ Could not read app logs');
    }

    // If all methods fail, use the hardcoded token as fallback
    console.log('⚠️ Could not retrieve FCM token from device, using fallback token');
    return 'eJsS2qsZTsiUEuA-SjVdrf:APA91bG4FIxQTiY_GPJlitE411aOdqg9ZxpLZ5bmnppV_i4LZ7nyPYx2_QZvri5HtCdKsOsrlPrLkRPz6Y-FQC81d82wz2_C_R8gQElv9wv7HT67TcTShdI';

  } catch (error) {
    console.log('❌ Error retrieving FCM token:', error.message);
    console.log('⚠️ Using fallback token');
    return 'eJsS2qsZTsiUEuA-SjVdrf:APA91bG4FIxQTiY_GPJlitE411aOdqg9ZxpLZ5bmnppV_i4LZ7nyPYx2_QZvri5HtCdKsOsrlPrLkRPz6Y-FQC81d82wz2_C_R8gQElv9wv7HT67TcTShdI';
  }
}

async function sendNotification() {
  console.log('🔥 Initializing Firebase Admin SDK...');

  // Initialize Firebase Admin
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'petjio-main'
  });

  console.log('✅ Firebase Admin SDK initialized successfully');

  // Get FCM token dynamically
  const fcmToken = await getFCMTokenFromDevice();
  console.log('🔗 Using FCM Token:', fcmToken.substring(0, 20) + '...');

  // Message to send
  const message = {
    token: fcmToken,
    notification: {
      title: 'Test Notification from Petjio! 🐕',
      body: 'Your push notifications are working perfectly! 🎉'
    },
    data: {
      custom_key: 'custom_value',
      test: 'true',
      timestamp: Date.now().toString()
    },
    android: {
      notification: {
        icon: 'ic_launcher',
        color: '#58B9D0',
        sound: 'default',
        channel_id: 'default_notification_channel_id'
      }
    }
  };

  console.log('📱 Sending notification...');
  console.log('📨 Message payload:', JSON.stringify(message.notification, null, 2));

  try {
    // Send the message
    const response = await admin.messaging().send(message);

    console.log('\n🎉 SUCCESS! Notification sent successfully');
    console.log('📊 Response ID:', response);
    console.log('📱 Check your device for the notification!');

    console.log('\n✅ DEBUGGING INFO:');
    console.log('1. Make sure notifications are enabled in device settings');
    console.log('2. Check if app is in foreground/background');
    console.log('3. Look at device logs for incoming message:');
    console.log('   adb logcat -s ReactNativeJS:* | grep -i notification');

    return true;
  } catch (error) {
    console.log('\n❌ ERROR sending notification:', error.code || 'Unknown error');
    console.log('📋 Details:', error.message);

    if (error.code === 'messaging/registration-token-not-registered') {
      console.log('\n🔍 POSSIBLE CAUSES:');
      console.log('- FCM token is expired or invalid');
      console.log('- App was uninstalled and reinstalled');
      console.log('- Need to generate a new FCM token');
      console.log('\n💡 SOLUTION: Restart your app to generate a new token');
    } else if (error.code === 'messaging/invalid-registration-token') {
      console.log('\n🔍 POSSIBLE CAUSES:');
      console.log('- FCM token format is incorrect');
      console.log('- Token contains invalid characters');
      console.log('\n💡 SOLUTION: Check token extraction from device');
    } else if (error.code === 'messaging/mismatched-credential') {
      console.log('\n🔍 POSSIBLE CAUSES:');
      console.log('- Service account doesn\'t match the project');
      console.log('- Wrong Firebase project configuration');
    }

    return false;
  }
}

// Run the notification sender
sendNotification()
  .then((success) => {
    if (success) {
      console.log('\n🏁 Test completed successfully!');
    } else {
      console.log('\n🏁 Test completed with errors.');
    }
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    console.error('\n💥 Unexpected error:', error);
    process.exit(1);
  });