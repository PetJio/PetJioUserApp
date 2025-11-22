import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const History: React.FC = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 16,
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 1,
          borderBottomColor: '#E5E7EB',
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            color: '#1F2937',
          }}
        >
          History
        </Text>
      </View>

      {/* Coming Soon Message */}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 40,
        }}
      >
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#E3F2FD',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <MaterialIcons name="history" size={50} color="#58B9D0" />
        </View>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            color: '#1F2937',
            textAlign: 'center',
            marginBottom: 12,
          }}
        >
          Coming Soon
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#6B7280',
            textAlign: 'center',
            lineHeight: 24,
          }}
        >
          Booking history feature is under development and will be available soon.
        </Text>
      </View>
    </View>
  );
};

export default History;
