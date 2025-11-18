import React from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import historyStyles from './history.styles';

const History: React.FC = () => {

  return (
    <View style={historyStyles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
        animated={true}
      />

      {/* Sticky Header - Services Style */}
      <View style={historyStyles.stickyHeader}>
        <View style={historyStyles.headerTitleContainer}>
          <Text style={historyStyles.stickyHeaderTitle}>History</Text>
          <Text style={historyStyles.stickyHeaderSubtitle}>View your booking history and details</Text>
        </View>
      </View>

      {/* Content */}
      <View style={historyStyles.content}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 80,
          paddingHorizontal: 20,
        }}>
          <View style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#F3F4F6',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 24,
          }}>
            <MaterialIcons name="schedule" size={48} color="#9CA3AF" />
          </View>
          <Text style={{
            fontSize: 22,
            fontWeight: '700',
            color: '#374151',
            textAlign: 'center',
            marginBottom: 12,
          }}>
            History Coming Soon
          </Text>
          <Text style={{
            fontSize: 15,
            color: '#6B7280',
            textAlign: 'center',
            lineHeight: 22,
            maxWidth: 300,
          }}>
            We're working on bringing you a comprehensive booking history feature. Stay tuned!
          </Text>
        </View>
      </View>
    </View>
  );
};

export default History;