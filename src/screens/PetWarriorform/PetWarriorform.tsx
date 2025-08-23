import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image,TextInput, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import petwarriorstyles from './petwarriorform.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import MapView from "react-native-maps";
import { SelectCountry } from 'react-native-element-dropdown';
import CheckBox from 'react-native-check-box';
import { responsiveWidth, responsiveHeight,} from 'react-native-responsive-dimensions';
 const Serviceable_Area_data = [
  {
    value: '1',
    lable: '3 km',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '2',
    lable: '5 km',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '3',
    lable: '10 km',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
 
];


interface ServiceState {
  feeding: boolean;
  rescue: boolean;
  sterilization: boolean;
  homeCare: boolean;
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

const PetWarriorform: React.FC<PetParentformProps> = ({ navigation }) => {
  const [coordinate, setCoordinate] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [servicearea,setServicearea] = useState<string>('1');
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [services, setServices] = useState<ServiceState>({
    feeding: false,
    rescue: false,
    sterilization: false,
    homeCare: false,
  });

  const toggleService = (key: keyof ServiceState): void => {
    setServices((prev) => ({ ...prev, [key]: !prev[key] }));
  };
    return (
      <View style={petwarriorstyles.parentcontainer}>
            <View style={petwarriorstyles.headerContainer}>
                  <View style={petwarriorstyles.positionDateTimeIcon}>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Image
                                    source={Icons.LeftArrow}
                                    style={petwarriorstyles.iconColor}
                                />
                            </TouchableOpacity>
                            <View style={petwarriorstyles.flexGap}>
                                <Text style={petwarriorstyles.text}>Pet Warrior</Text>
                            </View>
                        </View>
                </View>

               <ScrollView contentContainerStyle={petwarriorstyles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={petwarriorstyles.formSection}>
              {/* First & Last Name */}
              <View style={petwarriorstyles.row}>
                <View style={petwarriorstyles.inputWrapper}>
                  <Text style={petwarriorstyles.label}>First Name <Text style={petwarriorstyles.required}>*</Text></Text>
                  <TextInput style={petwarriorstyles.input} placeholder="Enter your first name" />
                </View>
                <View style={petwarriorstyles.inputWrapper}>
                  <Text style={petwarriorstyles.label}>Last Name <Text style={petwarriorstyles.required}>*</Text></Text>
                  <TextInput style={petwarriorstyles.input} placeholder="Enter your last name" />
                </View>
              </View>

              {/* Email */}
              <Text style={petwarriorstyles.label}>Email</Text>
              <TextInput style={petwarriorstyles.input} placeholder="Enter your email" />

              {/* Mobile Number */}
              <Text style={petwarriorstyles.label}>Phone No <Text style={petwarriorstyles.required}>*</Text></Text>
                <View style={petwarriorstyles.mobileContainer}>
                  <TouchableOpacity style={petwarriorstyles.codeBox}>
                    <Text style={petwarriorstyles.codeText}>+91</Text>
                    <Image source={Icons.DownArrow} style={petwarriorstyles.dropdownIcon} />
                  </TouchableOpacity>

                  <TextInput
                    style={petwarriorstyles.mobileInput}
                    placeholder="Enter your mobile number"
                    placeholderTextColor="#7D7D7D"
                    keyboardType="phone-pad"
                  />
                </View>

              {/* Your Location */}
              <Text style={petwarriorstyles.sectionTitle}>Location Details</Text>

              {/* Pin Code */}
              <Text style={petwarriorstyles.label}>Pin Code <Text style={petwarriorstyles.required}>*</Text></Text>
              <TextInput style={petwarriorstyles.input} placeholder="Pin Code" keyboardType="numeric" />

              {/* Address */}
              <Text style={petwarriorstyles.label}>Address</Text>
              <TextInput style={petwarriorstyles.input} placeholder="Enter Address" />

              {/* City */}
              <Text style={petwarriorstyles.label}>City</Text>
              <TextInput style={petwarriorstyles.input} placeholder="Enter City" />

              {/* State */}
              <Text style={petwarriorstyles.label}>State</Text>
              <TextInput style={petwarriorstyles.input} placeholder="Enter State" />

               {/* Location */}
               <View style={petwarriorstyles.locationAndText}>
               <Text style={petwarriorstyles.label}>Location</Text>
               <Text style={petwarriorstyles.selectlocationText}>Please select a specific location on the map</Text>
               </View>
                <View style={petwarriorstyles.mapSize}>
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
                     <Text style={petwarriorstyles.selectlocationText}>⚠️ Please select your exact location on the map before continuing</Text>
              </View>
               <View style={petwarriorstyles.addressTextView}>
                 <Text style={petwarriorstyles.nameText}>Serviceable Area</Text>
                 <SelectCountry
                    style={petwarriorstyles.dropdown}
                    selectedTextStyle={petwarriorstyles.selectedTextStyle}
                    placeholderStyle={petwarriorstyles.placeholderStyle}
                    imageStyle={petwarriorstyles.imageStyle}
                    iconStyle={petwarriorstyles.iconStyle}
                    maxHeight={200}
                    value={servicearea}
                    data={Serviceable_Area_data}
                    valueField="value"
                    labelField="lable"
                    imageField="image"
                    placeholder="Select country"
                    searchPlaceholder="Search..."
                    onChange={e => {
                    setServicearea(e.value);
                    }}
                 />
                 </View>
                 <View>
                    <Text style={petwarriorstyles.ServicesProvidedText}>Services Provided</Text>
                 </View>
                  <View style={petwarriorstyles.checkboxcontainer}>
                  <Text style={petwarriorstyles.title}>Pet Warrior Services You Undertake</Text>

                  <View style={petwarriorstyles.checkboxrow}>
                    <View style={petwarriorstyles.item}>
                      <CheckBox
                        isChecked={services.feeding}
                        onClick={() => toggleService('feeding')}
                        checkBoxColor="#ECECEC"
                        style={petwarriorstyles.checkbox}
                      />
                      <Text style={petwarriorstyles.servicesproviderText}>Feeding</Text>
                    </View>

                  <View style={petwarriorstyles.item}>
                    <CheckBox
                      isChecked={services.rescue}
                      onClick={() => toggleService('rescue')}
                      checkBoxColor="#ECECEC"
                      style={petwarriorstyles.checkbox}
                    />
                    <Text style={petwarriorstyles.servicesproviderText}>Rescue</Text>
                  </View>

                    <View style={petwarriorstyles.item}>
                      <CheckBox
                        isChecked={services.sterilization}
                        onClick={() => toggleService('sterilization')}
                        checkBoxColor="#ECECEC"
                        style={petwarriorstyles.checkbox}
                      />
                      <Text style={petwarriorstyles.servicesproviderText}>Sterilization/Vaccination</Text>
                    </View>
                  </View>

                  <View style={petwarriorstyles.row}>
                    <View style={petwarriorstyles.item}>
                      <CheckBox
                        isChecked={services.homeCare}
                        onClick={() => toggleService('homeCare')}
                        checkBoxColor="#ECECEC"
                        style={petwarriorstyles.checkbox}
                      />
                      <Text style={petwarriorstyles.servicesproviderText}>Home Care</Text>
                    </View>
                  </View>
                </View>
                <View>
              <Text style={petwarriorstyles.selectlocationText}>⚠️ Please select your exact location on the map before submitting</Text>
            </View>
                    </View>  
                      </ScrollView>
                    
                      <View style={petwarriorstyles.fixedButtonContainer}>
                          <TouchableOpacity
                              // onPress={() => navigation.navigate('HomeService')}
                              style={petwarriorstyles.nextBtnContainer}>
                              <Text style={petwarriorstyles.nextBtnText}>Register</Text>
                          </TouchableOpacity>
                    </View>
              </View>
              
    );
};

export default PetWarriorform;
