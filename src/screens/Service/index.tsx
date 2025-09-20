import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../../assets/images';
import styles from './styles';

const Mart: React.FC = () => {
  const naviagtion = useNavigation();

  const services = [
    // { id: '1', name: 'Veterinary', image: images.serviceveterinaryImage },
    // { id: '2', name: 'Grooming', image: images.GroomingService },
    // { id: '3', name: 'Walking', image: images.Walking },
    { id: '4', name: 'Boarding', image: images.Boarding },
    // { id: '5', name: 'ParaVet', image: images.ParaVet },
    // { id: '6', name: 'Training', image: images.Training },
    // { id: '7', name: 'NGO', image: images.NGOs },
  ];

  const funcName = (type: { name: string }) => {
    // Navigate directly to BoardingUser instead of Boarding (Date and Time page)
    if (type.name === 'Boarding') {
      naviagtion.navigate('BoardingUser' as never, {
        selectedDate: new Date().toISOString().split('T')[0],
        selectedTime: '10:00:00',
        city: 'Bardhaman'
      } as never);
    } else {
      naviagtion.navigate(type.name as never);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
      
      {/* Sticky Header */}
      <View style={styles.stickyHeader}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.stickyHeaderTitle}>Services</Text>
          <Text style={styles.stickyHeaderSubtitle}>Find the perfect care for your pet</Text>
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
          paddingBottom: responsiveHeight(10),
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
                  onPress={() => funcName({ name: item.name })}
                >
                  <Image source={item.image} style={styles.image} />
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
                  onPress={() => funcName({ name: item.name })}
                >
                  <Image source={item.image} style={styles.image} />
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
