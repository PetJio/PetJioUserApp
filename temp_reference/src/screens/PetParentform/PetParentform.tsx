import React, { useMemo,useState } from 'react';
import { View, Text, TouchableOpacity, Image,TextInput, ScrollView,StyleProp, TextStyle } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import petparentformstyles from './petparentform.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { SelectCountry } from 'react-native-element-dropdown';
import MapView from "react-native-maps";
import RadioGroup from 'react-native-radio-buttons-group';


const state_data = [
  {
    value: '1',
    lable: '0 years',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '2',
    lable: '1 years',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '3',
    lable: '2 years',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '4',
    lable: '3 years',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '5',
    lable: '4 years',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
];

const city_data = [
  {
    value: '1',
    lable: '0 months',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '2',
    lable: '1 months',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '3',
    lable: '2 months',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '4',
    lable: '3 months',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '5',
    lable: '4 months',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
];


 const gender_data = [
    {
      value: '1',
      lable: 'Male',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '2',
      lable: 'Female',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    
   
  
  ];



  const petType_data = [
  {
    value: '1',
    lable: 'Dog',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '2',
    lable: 'Cat',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '3',
    lable: 'Bird',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '4',
    lable: 'Other',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '5',
    lable: '4 months',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
];

  const breedType_data = [
  {
    value: '1',
    lable: 'Breed1',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '2',
    lable: 'Breed2',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '3',
    lable: 'Breed3',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '4',
    lable: 'Breed4',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
  {
    value: '5',
    lable: '4 months',
  //   image: {
  //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
  //   },
  },
];




type RootStackParamList = {
    PetParentform: undefined;
    Main: undefined;
    SignUp: undefined;
};


type PetParentformScreenNavigationProp = StackNavigationProp< RootStackParamList,'SignUp'>;


interface PetParentformProps {
    navigation: PetParentformScreenNavigationProp;
}

const PetParentform: React.FC<PetParentformProps> = ({ navigation }) => {
  const [coordinate, setCoordinate] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [country, setCountry] = useState<string>('1');
  const [gender, setGender] = useState<string>('1');
  const [pettype,setPettype] = useState<string>('1');
  const [breedtype,setBreedtype] = useState<string>('1');
  const [selectedId, setSelectedId] = useState<string>();
  const [medicaltypeId,setMedicaltypeId] = useState<string>('1');
  const foodTypeOptions = [
  {
    id: '1',
    label: 'Commercial / Packed Food',
    value: 'commercial',
    labelStyle: {
      fontSize: 16,
      color: '#000',
      fontWeight: '500',
    } as StyleProp<TextStyle>,
  },
  {
    id: '2',
    label: 'Home Cooked Food',
    value: 'home',
    labelStyle: {
      fontSize: 14,
      color: '#000',
      fontWeight: '500',
    } as StyleProp<TextStyle>,
  },
  {
    id: '3',
    label: 'Both',
    value: 'both',
    labelStyle: {
      fontSize: 14,
      color: '#000',
      fontWeight: '500',
    } as StyleProp<TextStyle>,
  },
];


const anymedicalCondition = [
  {
    id: '1',
    label: 'Yes',
    value: 'commercial',
    labelStyle: {
      fontSize: 16,
      color: '#000',
      fontWeight: '500',
    } as StyleProp<TextStyle>,
  },
  {
    id: '2',
    label: 'No',
    value: 'home',
    labelStyle: {
      fontSize: 14,
      color: '#000',
      fontWeight: '500',
    } as StyleProp<TextStyle>,
  },
 
];



    return (
      <View style={petparentformstyles.parentcontainer}>
            <View style={petparentformstyles.headerContainer}>
                  <View style={petparentformstyles.positionDateTimeIcon}>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Image
                                    source={Icons.LeftArrow}
                                    style={petparentformstyles.iconColor}
                                />
                            </TouchableOpacity>
                            <View style={petparentformstyles.flexGap}>
                                <Text style={petparentformstyles.text}>Pet Parent</Text>
                            </View>
                        </View>
                </View>

               <ScrollView contentContainerStyle={petparentformstyles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={petparentformstyles.formSection}>
              {/* First & Last Name */}
              <View style={petparentformstyles.row}>
                <View style={petparentformstyles.inputWrapper}>
                  <Text style={petparentformstyles.label}>First Name <Text style={petparentformstyles.required}>*</Text></Text>
                  <TextInput style={petparentformstyles.input} placeholder="Enter your first name" />
                </View>
                <View style={petparentformstyles.inputWrapper}>
                  <Text style={petparentformstyles.label}>Last Name <Text style={petparentformstyles.required}>*</Text></Text>
                  <TextInput style={petparentformstyles.input} placeholder="Enter your last name" />
                </View>
              </View>

              {/* Email */}
              <Text style={petparentformstyles.label}>Email</Text>
              <TextInput style={petparentformstyles.input} placeholder="Enter your email" />

              {/* Mobile Number */}
              <Text style={petparentformstyles.label}>Mobile Number <Text style={petparentformstyles.required}>*</Text></Text>
                <View style={petparentformstyles.mobileContainer}>
                  <TouchableOpacity style={petparentformstyles.codeBox}>
                    <Text style={petparentformstyles.codeText}>+91</Text>
                    <Image source={Icons.DownArrow} style={petparentformstyles.dropdownIcon} />
                  </TouchableOpacity>

                  <TextInput
                    style={petparentformstyles.mobileInput}
                    placeholder="Enter your mobile number"
                    placeholderTextColor="#7D7D7D"
                    keyboardType="phone-pad"
                  />
                </View>

              {/* Your Location */}
              <Text style={petparentformstyles.sectionTitle}>Your Location</Text>

              {/* Pin Code */}
              <Text style={petparentformstyles.label}>Pin Code <Text style={petparentformstyles.required}>*</Text></Text>
              <TextInput style={petparentformstyles.input} placeholder="Pin Code" keyboardType="numeric" />

              {/* Address */}
              <Text style={petparentformstyles.label}>Address</Text>
              <TextInput style={petparentformstyles.input} placeholder="Enter Address" />

              {/* City */}
              <Text style={petparentformstyles.label}>City</Text>
              <TextInput style={petparentformstyles.input} placeholder="Enter City" />

              {/* State */}
              <Text style={petparentformstyles.label}>State</Text>
              <TextInput style={petparentformstyles.input} placeholder="Enter State" />

               {/* Location */}
               <View style={petparentformstyles.locationAndText}>
               <Text style={petparentformstyles.label}>Location</Text>
               <Text style={petparentformstyles.selectlocationText}>Please select a specific location on the map</Text>
               </View>
               <View style={petparentformstyles.mapSize}>
                 <MapView
                      style={{ flex: 1, }}
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
                     <Text style={petparentformstyles.selectlocationText}>⚠️ Please select your exact location on the map before continuing</Text>
              </View>
              <View style={petparentformstyles.Bottomborder}/>
              <View style={petparentformstyles.viewflex}>
                     <Text style={petparentformstyles.petInformationText}>Pet Information</Text>
                     <View style={petparentformstyles.flexTextAndInputField}>
                            <Text style={petparentformstyles.nameText}>Number of Pets:</Text>
                            <TextInput  style={petparentformstyles.TextInput}/>
                     </View>
              </View>
              <View>
                   <TextInput placeholder='3' style={petparentformstyles.bydefaultTextInput}/>
              </View>

              <View style={petparentformstyles.addressTextView}>
                        <Text style={petparentformstyles.nameText}>Pet Name</Text>
                        <TextInput placeholder="Pet Name" style={petparentformstyles.TextInputField}/>
              </View>
              <View style={petparentformstyles.divideTextInputField}>
                  <View style={petparentformstyles.GapTextorlabel}>
                  <Text style={petparentformstyles.nameText}>Pet Age</Text>
                  <SelectCountry
                    style={petparentformstyles.dividedropdown}
                    selectedTextStyle={petparentformstyles.selectedTextStyle}
                    placeholderStyle={petparentformstyles.placeholderStyle}
                    imageStyle={petparentformstyles.imageStyle}
                    iconStyle={petparentformstyles.iconStyle}
                    maxHeight={200}
                    value={country}
                    data={state_data}
                    valueField="value"
                    labelField="lable"
                    imageField="image"
                    placeholder="Select country"
                    searchPlaceholder="Search..."
                    onChange={e => {
                    setCountry(e.value);
                    }}
                 />
                 </View>
                 <View style={petparentformstyles.GapTextorlabel}>
                 <Text style={petparentformstyles.nameText}>Month</Text>
                 <SelectCountry
                    style={petparentformstyles.dividedropdown}
                    selectedTextStyle={petparentformstyles.selectedTextStyle}
                    placeholderStyle={petparentformstyles.placeholderStyle}
                    imageStyle={petparentformstyles.imageStyle}
                    iconStyle={petparentformstyles.iconStyle}
                    maxHeight={200}
                    value={country}
                    data={city_data}
                    valueField="value"
                    labelField="lable"
                    imageField="image"
                    placeholder="Select country"
                    searchPlaceholder="Search..."
                    onChange={e => {
                    setCountry(e.value);
                    }}
                 />
                 </View>
                  </View>
                <View style={petparentformstyles.addressTextView}>
                 <Text style={petparentformstyles.nameText}>Gender</Text>
                 <SelectCountry
                    style={petparentformstyles.dropdown}
                    selectedTextStyle={petparentformstyles.selectedTextStyle}
                    placeholderStyle={petparentformstyles.placeholderStyle}
                    imageStyle={petparentformstyles.imageStyle}
                    iconStyle={petparentformstyles.iconStyle}
                    maxHeight={200}
                    value={country}
                    data={gender_data}
                    valueField="value"
                    labelField="lable"
                    imageField="image"
                    placeholder="Select country"
                    searchPlaceholder="Search..."
                    onChange={e => {
                    setGender(e.value);
                    }}
                 />
                 </View>

                <View style={petparentformstyles.addressTextView}>
                 <Text style={petparentformstyles.nameText}>Pet Type</Text>
                 <SelectCountry
                    style={petparentformstyles.dropdown}
                    selectedTextStyle={petparentformstyles.selectedTextStyle}
                    placeholderStyle={petparentformstyles.placeholderStyle}
                    imageStyle={petparentformstyles.imageStyle}
                    iconStyle={petparentformstyles.iconStyle}
                    maxHeight={200}
                    value={pettype}
                    data={petType_data}
                    valueField="value"
                    labelField="lable"
                    imageField="image"
                    placeholder="Select country"
                    searchPlaceholder="Search..."
                    onChange={e => {
                    setPettype(e.value);
                    }}
                 />
                 </View>

                 <View style={petparentformstyles.addressTextView}>
                 <Text style={petparentformstyles.nameText}>Breed</Text>
                 <SelectCountry
                    style={petparentformstyles.dropdown}
                    selectedTextStyle={petparentformstyles.selectedTextStyle}
                    placeholderStyle={petparentformstyles.placeholderStyle}
                    imageStyle={petparentformstyles.imageStyle}
                    iconStyle={petparentformstyles.iconStyle}
                    maxHeight={200}
                    value={breedtype}
                    data={breedType_data}
                    valueField="value"
                    labelField="lable"
                    imageField="image"
                    placeholder="Select country"
                    searchPlaceholder="Search..."
                    onChange={e => {
                    setBreedtype(e.value);
                    }}
                 />
                 </View>
                 <View style={petparentformstyles.addressTextView}>
                        <Text style={petparentformstyles.nameText}>Present Vet Name</Text>
                        <TextInput placeholder="Enter veterinary's name" style={petparentformstyles.TextInputField}/>
              </View>
              <View style={petparentformstyles.addressTextView}>
                        <Text style={petparentformstyles.nameText}>Present Vet Contact</Text>
                        <TextInput placeholder="Enter veterinary's contact number" style={petparentformstyles.TextInputField}/>
              </View>

                
              <View style={petparentformstyles.addressTextView}>
                <Text style={petparentformstyles.nameText}>Food Type</Text>
                <RadioGroup
                  radioButtons={foodTypeOptions}
                  onPress={setSelectedId}
                  selectedId={selectedId}
                  containerStyle={petparentformstyles.radioGroupContainer}
                />
              </View>

               <View style={petparentformstyles.addressTextView}>
                <Text style={petparentformstyles.nameText}>Any Medical Condition?</Text>
                <RadioGroup
                  radioButtons={anymedicalCondition}
                  onPress={setMedicaltypeId}
                  selectedId={medicaltypeId}
                  containerStyle={petparentformstyles.radioGroupContainer}
                />
              </View>

              {medicaltypeId == '1'?  <View style={petparentformstyles.addressTextView}>
                        <Text style={petparentformstyles.nameText}>Present Vet Name</Text>
                        <TextInput placeholder="Enter veterinary's name" style={petparentformstyles.TextInputField}/>
              </View>:''}

            
            </View> 
               </ScrollView>
            
              <View style={petparentformstyles.fixedButtonContainer}>
                  <TouchableOpacity
                      // onPress={() => navigation.navigate('HomeService')}
                      style={petparentformstyles.nextBtnContainer}>
                      <Text style={petparentformstyles.nextBtnText}>Register</Text>
                  </TouchableOpacity>
            </View>
      </View>
       
    );
};

export default PetParentform;
