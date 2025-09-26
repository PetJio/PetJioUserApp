const { execSync } = require('child_process');

console.log('🔍 Getting current FCM token from your app...');

// First, let's trigger the app to print the current FCM token
console.log('📱 Make sure your app is running and logged in');
console.log('⏳ Monitoring logs for FCM token...');

try {
  // Clear logcat and start monitoring
  execSync('adb logcat -c', { stdio: 'ignore' });

  // Start the app if it's not running
  console.log('🚀 Starting/refreshing app...');
  execSync('adb shell am start -n com.petjiouser/.MainActivity', { stdio: 'ignore' });

  // Wait a bit for the app to start
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Monitor logs for FCM token
  console.log('👀 Watching logs for FCM token (30 seconds)...');

  const logProcess = execSync('timeout 30s adb logcat ReactNativeJS:* -s', {
    encoding: 'utf8',
    timeout: 35000
  });

  const lines = logProcess.split('\n');
  let fcmToken = null;

  for (const line of lines) {
    // Look for FCM token patterns in logs
    const tokenPattern = /([a-zA-Z0-9_-]{140,200}:[a-zA-Z0-9_-]{1,100})/g;
    const matches = line.match(tokenPattern);

    if (matches && matches.length > 0) {
      fcmToken = matches[0];
      console.log('✅ Found FCM Token:', fcmToken);
      break;
    }

    // Also look for explicit token log messages
    if (line.includes('FCM Token') || line.includes('FCM TOKEN') || line.includes('firebase_token')) {
      console.log('📋 FCM Log:', line);
      const tokenMatch = line.match(tokenPattern);
      if (tokenMatch) {
        fcmToken = tokenMatch[0];
        break;
      }
    }
  }

  if (!fcmToken) {
    console.log('❌ No FCM token found in logs');
    console.log('💡 Make sure:');
    console.log('  1. App is running and logged in');
    console.log('  2. Notifications are enabled');
    console.log('  3. Firebase messaging is initialized');

    // Try to get from AsyncStorage as fallback
    console.log('\n🔍 Trying to get token from AsyncStorage...');

    try {
      const storageCmd = 'adb shell "run-as com.petjiouser find /data/data/com.petjiouser -name \'*\' -type f -exec grep -l \'eJ.*:APA91b\' {} \\;"';
      const storageFiles = execSync(storageCmd, { encoding: 'utf8', timeout: 10000 });

      if (storageFiles.trim()) {
        const firstFile = storageFiles.trim().split('\n')[0];
        const content = execSync(`adb shell "run-as com.petjiouser cat '${firstFile}'"`, { encoding: 'utf8' });

        const storageTokenMatch = content.match(/([a-zA-Z0-9_-]{140,200}:[a-zA-Z0-9_-]{1,100})/g);
        if (storageTokenMatch) {
          fcmToken = storageTokenMatch[0];
          console.log('✅ Found FCM token in storage:', fcmToken);
        }
      }
    } catch (e) {
      console.log('⚠️ Could not access AsyncStorage');
    }
  }

  if (fcmToken) {
    console.log('\n🎯 SUCCESS! FCM Token retrieved:');
    console.log(fcmToken);
    console.log('\n📋 You can now use this token to send test notifications');

    // Save to file for easy access
    require('fs').writeFileSync('current-fcm-token.txt', fcmToken);
    console.log('💾 Token saved to: current-fcm-token.txt');
  } else {
    console.log('\n❌ Failed to retrieve FCM token');
    console.log('🔧 Troubleshooting steps:');
    console.log('  1. Ensure app is running and user is logged in');
    console.log('  2. Check that Firebase messaging is properly initialized');
    console.log('  3. Look for any error messages in the logs');
    console.log('  4. Try restarting the app');
  }

} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('💡 Make sure ADB is connected and app is installed');
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}