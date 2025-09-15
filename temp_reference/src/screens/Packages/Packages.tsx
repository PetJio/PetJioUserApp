import React from 'react';
import { View, Text, Image,  } from 'react-native';
import images from '../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';

import packagestyles from './Packages.styles';

const Packages: React.FC = () => {
    return (
        <LinearGradient
      colors={['#58DFFF', '#00809E', '#073B47']} // gradient from light blue to deep blue
      style={{
        borderRadius: 20,
        padding: 16,
        marginHorizontal: 16,
        marginTop: 24,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 4,
      }}
    >
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>
          Premium Pet Walking Package
        </Text>
        {/* <CheckBox value={false} /> */}
      </View>

      {/* Info */}
      <View style={{ marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          {/* <MaterialIcons name="calendar-today" size={16} color="white" /> */}
          <Text style={{ color: '#fff', marginLeft: 8 }}>Duration : 15 Days</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          {/* <FontAwesome5 name="clock" size={16} color="white" /> */}
          <Text style={{ color: '#fff', marginLeft: 8 }}>Walk Time : 30 minutes per Day</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <FontAwesome5 name="rupee-sign" size={16} color="white" /> */}
          <Text style={{ color: '#fff', marginLeft: 8 }}>Price : ₹ 12000</Text>
        </View>
      </View>

      {/* What's Included */}
      <Text style={{ color: '#fff', fontWeight: '600', marginBottom: 8 }}>What’s Included?</Text>
      <View style={{ marginBottom: 12 }}>
        {[
          'Daily 30-minute walk for your pet',
          'Safe and pet-friendly routes',
          'Personalized care and attention',
          'Hydration breaks during walks',
          'Experienced and friendly pet walkers',
        ].map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 }}>
            {/* <Ionicons name="checkmark-circle" size={16} color="#10B981" /> */}
            <Text style={{ color: '#fff', marginLeft: 8 }}>{item}</Text>
          </View>
        ))}
      </View>

      {/* Dog Image */}
      <View style={{ alignItems: 'flex-end' }}>
        <Image
          source={images.petdogImage}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
    );
};

export default Packages;
