# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# Preserve React Native classes to prevent crashes in release build
-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.react.**

# Keep location/geolocation related classes
-keep class com.google.android.gms.location.** { *; }
-dontwarn com.google.android.gms.location.**

# Keep community geolocation native modules
-keep class com.reactnativecommunity.geolocation.** { *; }
-dontwarn com.reactnativecommunity.geolocation.**

# Keep react-native-geolocation-service classes
-keep class com.agontuk.RNFusedLocation.** { *; }
-dontwarn com.agontuk.RNFusedLocation.**
