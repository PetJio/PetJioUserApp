import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { goBack } from '../../utils/navigationService';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const ContactUs: React.FC = () => {
  const handlePhonePress = () => {
    Linking.openURL('tel:+918892088888');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:register@petjio.in');
  };

  const handleAddressPress = () => {
    const address = '307 Arch Square, EP Block, EP-Y1 Salt lake Sector- V, Bidhan Nagar, Kolkata - 700 091';
    const encodedAddress = encodeURIComponent(address);
    const url = Platform.select({
      ios: `maps:0,0?q=${encodedAddress}`,
      android: `geo:0,0?q=${encodedAddress}`,
    });
    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
        animated={true}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Contact Us</Text>
          <Text style={styles.headerSubtitle}>We're here to help</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Get In Touch Section */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>
            Get In <Text style={styles.touchText}>Touch</Text>
          </Text>
          <Text style={styles.subtitle}>
            We'd love to hear from you! Whether you have questions, feedback, or need assistance, we're here to help.
          </Text>
        </View>

        {/* Contact Cards */}
        <View style={styles.cardsContainer}>
          {/* Phone Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={handlePhonePress}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#FF9800' }]}>
              <MaterialIcons name="phone" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.cardTitle}>Phone</Text>
            <Text style={styles.cardDescription}>Got Questions? Call us 24/7</Text>
            <Text style={styles.cardValue}>+91 8892088888</Text>
          </TouchableOpacity>

          {/* Email Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={handleEmailPress}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#58B9D0' }]}>
              <MaterialIcons name="email" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.cardTitle}>Email</Text>
            <Text style={styles.cardDescription}>Send us an email anytime</Text>
            <Text style={styles.cardValue}>register@petjio.in</Text>
          </TouchableOpacity>

          {/* Address Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={handleAddressPress}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: '#E91E63' }]}>
              <MaterialIcons name="location-on" size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.cardTitle}>Address</Text>
            <Text style={styles.cardDescription}>Visit our office</Text>
            <Text style={styles.cardValue}>
              307 Arch Square, EP Block, EP-Y1 Salt lake Sector- V, Bidhan Nagar, Kolkata - 700 091.
            </Text>
          </TouchableOpacity>
        </View>

        {/* Additional Info */}
        <View style={styles.infoBox}>
          <MaterialIcons name="info-outline" size={24} color="#58B9D0" />
          <Text style={styles.infoText}>
            Our support team is available 24/7 to assist you with any queries regarding pet care services, bookings, or technical support.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'ios' ? responsiveHeight(6) : StatusBar.currentHeight,
    paddingBottom: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(5),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: responsiveWidth(5),
    paddingBottom: responsiveHeight(4),
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: responsiveHeight(3),
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  touchText: {
    background: 'linear-gradient(to right, #58B9D0, #E91E63)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: '#58B9D0',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: responsiveWidth(5),
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#58B9D0',
    textAlign: 'center',
    lineHeight: 24,
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1976D2',
    lineHeight: 20,
    marginLeft: 12,
  },
});

export default ContactUs;
