// Quick script to get access token for Firebase REST API
const { GoogleAuth } = require('google-auth-library');

async function getAccessToken() {
  const auth = new GoogleAuth({
    keyFile: 'c:/Users/Apurba Ruidas/Downloads/fcm-secret-key.json',
    scopes: ['https://www.googleapis.com/auth/firebase.messaging']
  });

  const client = await auth.getClient();
  const accessToken = await client.getAccessToken();

  console.log('Access Token:', accessToken.token);
  console.log('\n📋 Use this curl command to send a test notification:');
  console.log(`
curl -X POST 'https://fcm.googleapis.com/v1/projects/petjio-main/messages:send' \\
-H 'Authorization: Bearer ${accessToken.token}' \\
-H 'Content-Type: application/json' \\
-d '{
  "message": {
    "token": "eJsS2qsZTsiUEuA-SjVdrf:APA91bG4FIxQTiY_GPJlitE411aOdqg9ZxpLZ5bmnppV_i4LZ7nyPYx2_QZvri5HtCdKsOsrlPrLkRPz6Y-FQC81d82wz2_C_R8gQElv9wv7HT67TcTShdI",
    "notification": {
      "title": "Test Notification 🐕",
      "body": "Your Petjio notifications work! 🎉"
    },
    "android": {
      "notification": {
        "icon": "ic_launcher",
        "color": "#58B9D0",
        "channel_id": "default_notification_channel_id"
      }
    }
  }
}'
  `);
}

getAccessToken().catch(console.error);