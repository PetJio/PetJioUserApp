import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image,TextInput, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import deliverypartnerformstyles from './deliverypartnerform.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import MapView from "react-native-maps";
import { SelectCountry } from 'react-native-element-dropdown';
import CheckBox from 'react-native-check-box';
  const vehicalType_data = [
   {
    value: '0',
    lable: 'Select Vehicle Type',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '1',
    lable: 'Bicycle',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '2',
    lable: 'Scooter',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '3',
    lable: 'Bike',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
 
];
 const availability_data = [
   
  {
    value: '1',
    lable: 'Full-time',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '2',
    lable: 'Part-time',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '3',
    lable: 'weekendes',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
 
];

interface ServiceState {
  feeding: boolean;
 
 
}


type RootStackParamList = {
    PetParentform: undefined;
    Main: undefined;
    SignUp: undefined;
};


type PetParentformScreenNavigationProp = StackNavigationProp< RootStackParamList,'SignUp'>;


interface PetParentformProps {
    navigation: PetParentformScreenNavigationProp;
}

const DeliveryPartnerform: React.FC<PetParentformProps> = ({ navigation }) => {
  const [coordinate, setCoordinate] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  
  const [vehicaltype,setVehicaltype] = useState<string>('1');
  const [availability,setAvailability] = useState<string>('1');
   const [services, setServices] = useState<ServiceState>({
      feeding: false,
    
    })
     const toggleService = (key: keyof ServiceState): void => {
       setServices((prev) => ({ ...prev, [key]: !prev[key] }));
  };
    return (
      <View style={deliverypartnerformstyles.parentcontainer}>
            <View style={deliverypartnerformstyles.headerContainer}>
                  <View style={deliverypartnerformstyles.positionDateTimeIcon}>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Image
                                    source={Icons.LeftArrow}
                                    style={deliverypartnerformstyles.iconColor}
                                />
                            </TouchableOpacity>
                            <View style={deliverypartnerformstyles.flexGap}>
                                <Text style={deliverypartnerformstyles.text}>Delivery Partner</Text>
                            </View>
                        </View>
                </View>

               

               <ScrollView contentContainerStyle={deliverypartnerformstyles.scrollContent} showsVerticalScrollIndicator={false}>
               
            <View style={deliverypartnerformstyles.formSection}>
            <View>
                      <Text style={deliverypartnerformstyles.text}>Personal Information</Text>
                </View>
              {/* First & Last Name */}
              <View style={deliverypartnerformstyles.row}>
                <View style={deliverypartnerformstyles.inputWrapper}>
                  <Text style={deliverypartnerformstyles.label}>First Name <Text style={deliverypartnerformstyles.required}>*</Text></Text>
                  <TextInput style={deliverypartnerformstyles.input} placeholder="Enter your first name" />
                </View>
                <View style={deliverypartnerformstyles.inputWrapper}>
                  <Text style={deliverypartnerformstyles.label}>Last Name <Text style={deliverypartnerformstyles.required}>*</Text></Text>
                  <TextInput style={deliverypartnerformstyles.input} placeholder="Enter your last name" />
                </View>
              </View>

              {/* Email */}
              <Text style={deliverypartnerformstyles.label}>Email</Text>
              <TextInput style={deliverypartnerformstyles.input} placeholder="Enter your email" />

              {/* Mobile Number */}
              <Text style={deliverypartnerformstyles.label}>Mobile Number <Text style={deliverypartnerformstyles.required}>*</Text></Text>
                <View style={deliverypartnerformstyles.mobileContainer}>
                  <TouchableOpacity style={deliverypartnerformstyles.codeBox}>
                    <Text style={deliverypartnerformstyles.codeText}>+91</Text>
                    <Image source={Icons.DownArrow} style={deliverypartnerformstyles.dropdownIcon} />
                  </TouchableOpacity>

                  <TextInput
                    style={deliverypartnerformstyles.mobileInput}
                    placeholder="Enter your mobile number"
                    placeholderTextColor="#7D7D7D"
                    keyboardType="phone-pad"
                  />
                </View>

              {/* Your Location */}
              <Text style={deliverypartnerformstyles.sectionTitle}>Location Details</Text>

              {/* Pin Code */}
              <Text style={deliverypartnerformstyles.label}>Pin Code <Text style={deliverypartnerformstyles.required}>*</Text></Text>
              <TextInput style={deliverypartnerformstyles.input} placeholder="Pin Code" keyboardType="numeric" />

              {/* Address */}
              <Text style={deliverypartnerformstyles.label}>Address</Text>
              <TextInput style={deliverypartnerformstyles.input} placeholder="Enter Address" />

              {/* City */}
              <Text style={deliverypartnerformstyles.label}>City</Text>
              <TextInput style={deliverypartnerformstyles.input} placeholder="Enter City" />

              {/* State */}
              <Text style={deliverypartnerformstyles.label}>State</Text>
              <TextInput style={deliverypartnerformstyles.input} placeholder="Enter State" />

               {/* Location */}
               <View style={deliverypartnerformstyles.locationAndText}>
               <Text style={deliverypartnerformstyles.label}>Location</Text>
               <Text style={deliverypartnerformstyles.selectlocationText}>Please select a specific location on the map</Text>
               </View>
               <View style={deliverypartnerformstyles.mapSize}>
                 <MapView
                      style={{ flex: 1 }}
                       initialRegion={{
                       latitude: 37.78825,
                       longitude: -122.4324,
                       latitudeDelta: 0.0922,
                       longitudeDelta: 0.0421,
                   }}
                />
                <Text>Tap to expand map, then double-tap to set your location.</Text>
              </View>
              <View>
                     <Text style={deliverypartnerformstyles.selectlocationText}>⚠️ Please select your exact location on the map before continuing</Text>
              </View>
              <View>
                    <Text style={deliverypartnerformstyles.ServicesProvidedText}>Delivery Vehicle Information</Text>
              </View>

              <View style={deliverypartnerformstyles.addressTextView}>
                <Text style={deliverypartnerformstyles.nameText}>
                    Vehicle Type <Text style={deliverypartnerformstyles.starIconColor}>*</Text>
                </Text>
                 <SelectCountry
                    style={deliverypartnerformstyles.dropdown}
                    selectedTextStyle={deliverypartnerformstyles.selectedTextStyle}
                    placeholderStyle={deliverypartnerformstyles.placeholderStyle}
                    imageStyle={deliverypartnerformstyles.imageStyle}
                    iconStyle={deliverypartnerformstyles.iconStyle}
                    maxHeight={200}
                    value={vehicaltype}
                    data={vehicalType_data}
                    valueField="value"
                    labelField="lable"
                    imageField="image"
                    placeholder="Select country"
                    searchPlaceholder="Search..."
                    onChange={e => {
                    setVehicaltype(e.value);
                    }}
                 />
                 </View>
                    <View>
                      <View style={deliverypartnerformstyles.item}>
                      <CheckBox
                        isChecked={services.feeding}
                        onClick={() => toggleService('feeding')}
                        checkBoxColor="#ECECEC"
                        style={deliverypartnerformstyles.checkbox}
                      />
                      <Text style={deliverypartnerformstyles.servicesproviderText}>I am a specially abled person</Text>
                    </View>
                          <Text>Let us know if you have any disabilities so we can provide better support.</Text>
                    </View>
                    <View style={deliverypartnerformstyles.addressTextView}>
                <Text style={deliverypartnerformstyles.nameText}>
                    Availability
                </Text>
                 <SelectCountry
                    style={deliverypartnerformstyles.dropdown}
                    selectedTextStyle={deliverypartnerformstyles.selectedTextStyle}
                    placeholderStyle={deliverypartnerformstyles.placeholderStyle}
                    imageStyle={deliverypartnerformstyles.imageStyle}
                    iconStyle={deliverypartnerformstyles.iconStyle}
                    maxHeight={200}
                    value={availability}
                    data={availability_data}
                    valueField="value"
                    labelField="lable"
                    imageField="image"
                    placeholder="Select country"
                    searchPlaceholder="Search..."
                    onChange={e => {
                    setAvailability(e.value);
                    }}
                 />
                 </View>
            </View>  
               </ScrollView>
            
              <View style={deliverypartnerformstyles.fixedButtonContainer}>
                  <TouchableOpacity
                      // onPress={() => navigation.navigate('HomeService')}
                      style={deliverypartnerformstyles.nextBtnContainer}>
                      <Text style={deliverypartnerformstyles.nextBtnText}>Register</Text>
                  </TouchableOpacity>
            </View>
      </View>
       
    );
};

export default DeliveryPartnerform;
