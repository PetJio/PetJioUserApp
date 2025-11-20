import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../../assets/images';
import styles from './styles';
import { RootStackNavigationProp} from '../../types/navigation';

const Mart: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<'Main'>['navigation']>();


  // Force status bar to be white whenever Service screen is focused
  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor('#FFFFFF', true);
        StatusBar.setBarStyle('dark-content', true);
      }
    }, []),
  );

  const services = [
    { id: '4', name: 'Boarding', image: images.Boarding },
    { id: '1', name: 'Veterinary', image: images.serviceveterinaryImage },
    { id: '2', name: 'Grooming', image: images.GroomingService },
    { id: '3', name: 'Walking', image: images.Walking },
    { id: '5', name: 'ParaVet', image: images.ParaVet },
    { id: '6', name: 'Training', image: images.Training },
    { id: '7', name: 'NGO', image: images.NGOs },
  ];

  const funcName = (type: { name: string }) => {
    // Navigate directly to BoardingUser instead of Boarding (Date and Time page)
    if (type.name === 'Boarding') {
      navigation.navigate(
        'BoardingUser' as never,
        {
          selectedDate: new Date().toISOString().split('T')[0],
          selectedTime: '10:00:00',
          city: 'Bardhaman',
        } as never,
      );
    } else {
      navigation.navigate(type.name as never);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
        animated={true}
      />

      {/* Sticky Header */}
      <View style={styles.stickyHeader}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.stickyHeaderTitle}>Services</Text>
          <Text style={styles.stickyHeaderSubtitle}>
            Find the perfect care for your pet
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          padding: responsiveWidth(4),
          gap: responsiveHeight(2),
          backgroundColor: '#F8F9FB',
        }}
      >
        <View style={styles.searchContainer}>
          <TextInput
            mode="outlined"
            placeholder="Search for services"
            theme={{
              roundness: 16,
              colors: { primary: '#58B9D0', outline: '#E8E8E8' },
            }}
            style={styles.textInput}
            contentStyle={styles.inputContent}
            outlineStyle={styles.inputOutline}
            left={
              <TextInput.Icon
                icon={() => (
                  <MaterialIcons name="search" size={20} color="#666" />
                )}
              />
            }
          />
          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="tune" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
          }}
        >
          <View style={styles.card}>
            <View style={styles.cardindex}>
              {services?.map((item, index) =>
                index % 2 !== 0 ? (
                  <View key={index} />
                ) : (
                 <TouchableOpacity
  key={index}
  onPress={() => {
    if (item.name === 'Boarding') {
      funcName({ name: item.name });
      return;
    }

    if (item.name === 'Veterinary') {
      navigation.navigate('Veterinary');
      return;
    }

    console.log(item.name + " Coming Soon");
  }}
  disabled={!(item.name === 'Boarding' || item.name === 'Veterinary')}
  activeOpacity={(item.name === 'Boarding' || item.name === 'Veterinary') ? 0.7 : 1}
>
  <View style={styles.serviceImageContainer}>
    <Image source={item.image} style={styles.image} />

    {(item.name !== 'Boarding' && item.name !== 'Veterinary') && (
      <View style={styles.comingSoonOverlay}>
        <Text style={styles.comingSoonText}>Coming Soon</Text>
      </View>
    )}
  </View>
</TouchableOpacity>

                ),
              )}
            </View>
            <View style={styles.cardindex}>
              {services?.map((item, index) =>
                index % 2 === 0 ? (
                  <View key={index} />
                ) : (
                 <TouchableOpacity
  key={index}
  onPress={() => {
    if (item.name === 'Boarding') {
      funcName({ name: item.name });
      return;
    }

    if (item.name === 'Veterinary') {
      navigation.navigate('Veterinary' as never);
      return;
    }

    console.log(item.name + ' Coming Soon');
  }}
  disabled={!(item.name === 'Boarding' || item.name === 'Veterinary')}
  activeOpacity={(item.name === 'Boarding' || item.name === 'Veterinary') ? 0.7 : 1}
>
  <View style={styles.serviceImageContainer}>
    <Image source={item.image} style={styles.image} />

    {(item.name !== 'Boarding' && item.name !== 'Veterinary') && (
      <View style={styles.comingSoonOverlay}>
        <Text style={styles.comingSoonText}>Coming Soon</Text>
      </View>
    )}
  </View>
</TouchableOpacity>

                ),
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Mart;
