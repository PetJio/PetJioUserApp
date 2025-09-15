
import {useState} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView,Image,TouchableOpacity } from 'react-native';
import dogadoptionscreeningformstyles from './dogadoptionscreeningform.styles';
import CheckBox from 'react-native-check-box';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { SelectCountry } from 'react-native-element-dropdown';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { StackNavigationProp } from '@react-navigation/stack';
import BouncyCheckbox from "react-native-bouncy-checkbox";



// Define your navigation stack's param list
type RootStackParamList = {
    PetParentform: undefined;
    Main:undefined;
    PetWarriorform:undefined;
    DeliveryPartnerform:undefined;
    ServiceProviderform:undefined;
    SignIn:undefined;
    BoardingDetails:undefined;
    AddVaccination:undefined;
    BookBoarder:undefined;
    NGODetails:undefined;
};

// Define the navigation prop type
type BoardingFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BoardingDetails'>;

// Define props interface for the component
interface BoardingFormProps {
  navigation: BoardingFormScreenNavigationProp;
}


const daisy_data = [
    {
      value: '1',
      lable: 'Daisy',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '2',
      lable: 'Bella',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '3',
      lable: 'Leo',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '4',
      lable: 'Daisy',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '5',
      lable: 'Bella',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
  ];
  const bella_data = [
    {
      value: '1',
      lable: 'Daisy',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '2',
      lable: 'Bella',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '3',
      lable: 'Leo',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '4',
      lable: 'Daisy',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '5',
      lable: 'Bella',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
  ];

  const category_data = [
    {
      value: '1',
      lable: 'category1',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '2',
      lable: 'category2',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '3',
      lable: 'category3',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '4',
      lable: 'category4',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '5',
      lable: 'category5',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
  ];

  const state_data = [
    {
      value: '1',
      lable: 'state1',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '2',
      lable: 'state2',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '3',
      lable: 'state3',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '4',
      lable: 'state4',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '5',
      lable: 'state5',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
  ];

  const city_data = [
    {
      value: '1',
      lable: 'kolkata1',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '2',
      lable: 'kolkata2',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '3',
      lable: 'state3',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '4',
      lable: 'kolkata3',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '5',
      lable: 'kolkata4',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
  ];
  const diet_data = [
    {
      value: '1',
      lable: 'diet1',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '2',
      lable: 'diet2',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '3',
      lable: 'diet13',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '4',
      lable: 'diet4',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '5',
      lable: 'diet5',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
  ];

  const daily_feeds_data = [
    {
      value: '1',
      lable: 'diet1',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '2',
      lable: 'diet2',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '3',
      lable: 'diet13',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '4',
      lable: 'diet4',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '5',
      lable: 'diet5',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
  ];
  const quantity_data = [
    {
      value: '1',
      lable: 'diet1',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '2',
      lable: 'diet2',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '3',
      lable: 'diet13',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '4',
      lable: 'diet4',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '5',
      lable: 'diet5',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
  ];
  const dog_treat_data = [
    {
      value: '1',
      lable: 'Dog Treat1',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '2',
      lable: 'Dog Treat2',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '3',
      lable: 'Dog Treat3',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '4',
      lable: 'Dog Treat4',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '5',
      lable: 'Dog Treat5',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
  ];

  const Bland_Diet_data = [
    {
      value: '1',
      lable: 'Diet1',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '2',
      lable: 'Diet2',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '3',
      lable: 'Diet3',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '4',
      lable: 'Diet4',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '5',
      lable: 'Diet5',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
  ];

  const allergies_data = [
    {
      value: '1',
      lable: 'allergies1',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '2',
      lable: 'allergies2',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '3',
      lable: 'allergies3',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '4',
      lable: 'allergies4',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '5',
      lable: 'allergies5',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
  ];

  const physical_condition_data = [
    {
      value: '1',
      lable: 'Physical Condition1',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '2',
      lable: 'Physical Condition2',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '3',
      lable: 'Physical Condition3',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '4',
      lable: 'Physical Condition4',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
    {
      value: '5',
      lable: 'Physical Condition5',
    //   image: {
    //     uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
    //   },
    },
  ];

const DogAdoptionScreeningForm: React.FC<BoardingFormProps> = ({navigation}) => {

    const [country, setCountry] = useState<string>('1');
    const [dogtreat, setDogtreat] = useState<string>('1');
    const [dogdiet, setDogdiet] = useState<string>('1');
    const [allergies,setAllergies] = useState<string>('1');
    const [physicalcondition,setPhysicalcondition] = useState<string>('1');

    return (
        <View style={dogadoptionscreeningformstyles.container}>
            <View>  
              <View style={dogadoptionscreeningformstyles.relative}>
              <View style={dogadoptionscreeningformstyles.positionDateTimeIcon}>
                        <TouchableOpacity
                            onPress={() =>navigation.navigate('NGODetails')}
                            >
                            <View style={dogadoptionscreeningformstyles.flexGap}>
                                <Image
                                    source={Icons.LeftArrow}
                                    style={dogadoptionscreeningformstyles.iconColor}
                                />
                                <Text style={dogadoptionscreeningformstyles.textDateTime}>
                                    Dog Adoption Screening Form
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* <View>
                        <Text style={dogadoptionscreeningformstyles.selectDateText}>
                          Pet Details
                        </Text>
                    </View> */}
                </View>
                </View>
                <ScrollView contentContainerStyle={dogadoptionscreeningformstyles.dropdownMarginTop} showsVerticalScrollIndicator={false}>
                <View>
                       <Text style={dogadoptionscreeningformstyles.selectDateText}>
                          Owner Details
                       </Text>
                 </View>
                  <View style={{justifyContent:'center',alignItems:'center',gap:responsiveHeight(0.60)}}>
                  <View style={dogadoptionscreeningformstyles.GapTextorlabel}>
                  <Text style={dogadoptionscreeningformstyles.petText} >Pet name</Text>
                  <SelectCountry
                      style={dogadoptionscreeningformstyles.dropdown}
                      selectedTextStyle={dogadoptionscreeningformstyles.selectedTextStyle}
                      placeholderStyle={dogadoptionscreeningformstyles.placeholderStyle}
                      imageStyle={dogadoptionscreeningformstyles.imageStyle}
                      iconStyle={dogadoptionscreeningformstyles.iconStyle}
                      maxHeight={200}
                      value={country}
                      data={daisy_data}
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
                 <View style={dogadoptionscreeningformstyles.GapTextorlabel}>
                 <Text style={dogadoptionscreeningformstyles.petText} >Breed</Text>
                 <SelectCountry
                    style={dogadoptionscreeningformstyles.dropdown}
                    selectedTextStyle={dogadoptionscreeningformstyles.selectedTextStyle}
                    placeholderStyle={dogadoptionscreeningformstyles.placeholderStyle}
                    imageStyle={dogadoptionscreeningformstyles.imageStyle}
                    iconStyle={dogadoptionscreeningformstyles.iconStyle}
                    maxHeight={200}
                    value={country}
                    data={bella_data}
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
                 <View style={dogadoptionscreeningformstyles.GapTextorlabel}>
                 <Text style={dogadoptionscreeningformstyles.petText}>Breed Category</Text>
                 <SelectCountry
                    style={dogadoptionscreeningformstyles.dropdown}
                    selectedTextStyle={dogadoptionscreeningformstyles.selectedTextStyle}
                    placeholderStyle={dogadoptionscreeningformstyles.placeholderStyle}
                    imageStyle={dogadoptionscreeningformstyles.imageStyle}
                    iconStyle={dogadoptionscreeningformstyles.iconStyle}
                    maxHeight={200}
                    value={country}
                    data={category_data}
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
                 <View style={dogadoptionscreeningformstyles.divideTextInputField}>
                    <View style={dogadoptionscreeningformstyles.GapTextorlabel}>
                        <Text style={dogadoptionscreeningformstyles.petText}>Age</Text>
                        <TextInput style={dogadoptionscreeningformstyles.DivideTextInputField}/>
                    </View>
                    <View style={dogadoptionscreeningformstyles.GapTextorlabel}>
                        <Text style={dogadoptionscreeningformstyles.petText}>Weight</Text>
                        <TextInput style={dogadoptionscreeningformstyles.DivideTextInputField}/>
                    </View>
                 </View>
                 <View style={dogadoptionscreeningformstyles.GapTextorlabel}>
                        <Text style={dogadoptionscreeningformstyles.petText}>Owner’s name</Text>
                        <TextInput style={dogadoptionscreeningformstyles.TextInputField}/>
                  </View>
                  <View style={dogadoptionscreeningformstyles.GapTextorlabel}>
                        <Text style={dogadoptionscreeningformstyles.petText}>Owner’s Phone no.</Text>
                        <TextInput style={dogadoptionscreeningformstyles.TextInputField}/>
                  </View>
                  <View style={dogadoptionscreeningformstyles.GapTextorlabel}>
                        <Text style={dogadoptionscreeningformstyles.petText}>Alternate Phone no.</Text>
                        <TextInput style={dogadoptionscreeningformstyles.TextInputField}/>
                  </View>
                  <View style={dogadoptionscreeningformstyles.GapTextorlabel}>
                        <Text style={dogadoptionscreeningformstyles.petText}>Email Id.</Text>
                        <TextInput style={dogadoptionscreeningformstyles.TextInputField}/>
                  </View>

                  <View style={dogadoptionscreeningformstyles.divideTextInputField}>
                  <View style={dogadoptionscreeningformstyles.GapTextorlabel}>
                  <Text style={dogadoptionscreeningformstyles.petText}>State</Text>
                  <SelectCountry
                    style={dogadoptionscreeningformstyles.dividedropdown}
                    selectedTextStyle={dogadoptionscreeningformstyles.selectedTextStyle}
                    placeholderStyle={dogadoptionscreeningformstyles.placeholderStyle}
                    imageStyle={dogadoptionscreeningformstyles.imageStyle}
                    iconStyle={dogadoptionscreeningformstyles.iconStyle}
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
                 <View style={dogadoptionscreeningformstyles.GapTextorlabel}>
                 <Text style={dogadoptionscreeningformstyles.petText}>City</Text>
                 <SelectCountry
                    style={dogadoptionscreeningformstyles.dividedropdown}
                    selectedTextStyle={dogadoptionscreeningformstyles.selectedTextStyle}
                    placeholderStyle={dogadoptionscreeningformstyles.placeholderStyle}
                    imageStyle={dogadoptionscreeningformstyles.imageStyle}
                    iconStyle={dogadoptionscreeningformstyles.iconStyle}
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

                 <View style={dogadoptionscreeningformstyles.addressTextView}>
                        <Text style={dogadoptionscreeningformstyles.petText}>Address.</Text>
                        <TextInput style={dogadoptionscreeningformstyles.TextInputField}/>
                 </View>

                 <View style={dogadoptionscreeningformstyles.divideTextInputField}>
                    <View style={dogadoptionscreeningformstyles.addressTextView}>
                        <Text style={dogadoptionscreeningformstyles.petText}>Arrival Date</Text>
                        <TextInput style={dogadoptionscreeningformstyles.DivideTextInputField}/>
                    </View>
                    <View style={dogadoptionscreeningformstyles.addressTextView}>
                        <Text style={dogadoptionscreeningformstyles.petText}>Departure Date</Text>
                        <TextInput style={dogadoptionscreeningformstyles.DivideTextInputField}/>
                    </View>
                 </View>

                 <View style={dogadoptionscreeningformstyles.addressTextView}>
                        <Text style={dogadoptionscreeningformstyles.petText}>Personal Possessions</Text>
                        <TextInput style={dogadoptionscreeningformstyles.TextInputField}/>
                 </View>

                 <View style={dogadoptionscreeningformstyles.addressTextView}>
                 <Text style={dogadoptionscreeningformstyles.petText}>Daily Feeds</Text>
                 <SelectCountry
                    style={dogadoptionscreeningformstyles.dropdown}
                    selectedTextStyle={dogadoptionscreeningformstyles.selectedTextStyle}
                    placeholderStyle={dogadoptionscreeningformstyles.placeholderStyle}
                    imageStyle={dogadoptionscreeningformstyles.imageStyle}
                    iconStyle={dogadoptionscreeningformstyles.iconStyle}
                    maxHeight={200}
                    value={country}
                    data={daily_feeds_data}
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

                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={dogadoptionscreeningformstyles.addressTextView}>
                      <Text style={dogadoptionscreeningformstyles.petText}>Quantity</Text>
                      <SelectCountry
                        style={dogadoptionscreeningformstyles.dropdown}
                        selectedTextStyle={dogadoptionscreeningformstyles.selectedTextStyle}
                        placeholderStyle={dogadoptionscreeningformstyles.placeholderStyle}
                        imageStyle={dogadoptionscreeningformstyles.imageStyle}
                        iconStyle={dogadoptionscreeningformstyles.iconStyle}
                        maxHeight={200}
                        value={country}
                        data={quantity_data}
                        valueField="value"
                        labelField="lable"
                        imageField="image"
                        placeholder="Select quantity"
                        searchPlaceholder="Search..."
                        onChange={e => {
                          setCountry(e.value);
                        }}
                      />
                    </View>
                     <View style={{ marginTop: responsiveHeight(2), paddingHorizontal: responsiveWidth(6) }}>
                        <Text style={{ fontSize: 10, fontWeight: '500', color: '#444444' }}>
                          <Text style={{ fontSize: 12, fontWeight: '700' }}>*Note: </Text>
                          If we run out of dog’s meals, may we switch to our Chicken Based kennel diet? If you prefer to not switch, we will shop for your dog’s own diet, for which there will be extra charges (purchase cost plus transportation)
                        </Text>
                          <View style={{flexDirection:'row',top:responsiveHeight(0.40)}}>
                          <BouncyCheckbox
                            style={{ width:responsiveWidth(18) }} 
                            size={15}
                            fillColor="#8E8E8E"
                            unFillColor="#FFFFFF"
                            text="Yes"
                            iconStyle={{ borderColor: "white" }}
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{ fontFamily: "JosefinSans-Regular" }}
                            onPress={(isChecked: boolean) => {console.log(isChecked)}}
                       />
                        <BouncyCheckbox
                          style={{ width:responsiveWidth(18) }} 
                          size={15}
                            fillColor="#8E8E8E"
                            unFillColor="#FFFFFF"
                            text="No"
                            iconStyle={{ borderColor: "white" }}
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{ fontFamily: "JosefinSans-Regular" }}
                            onPress={(isChecked: boolean) => {console.log(isChecked)}}
                       />
                      </View>
                      </View> 
                  </View>
                  <View style={dogadoptionscreeningformstyles.addressTextView}>
                        <Text style={dogadoptionscreeningformstyles.petText}>Treats.</Text>
                        <TextInput style={dogadoptionscreeningformstyles.TreatsTextInputField}/>
                 </View>

                 <View style={dogadoptionscreeningformstyles.addressTextView}>
                 <View style={dogadoptionscreeningformstyles.divideTextInputField}>
                  <View style={dogadoptionscreeningformstyles.GapTextorlabel}>
                  <Text style={dogadoptionscreeningformstyles.petText}>Dog Treats/Dog Cookies</Text>
                  <SelectCountry
                    style={dogadoptionscreeningformstyles.dividedropdown}
                    selectedTextStyle={dogadoptionscreeningformstyles.selectedTextStyle}
                    placeholderStyle={dogadoptionscreeningformstyles.placeholderStyle}
                    imageStyle={dogadoptionscreeningformstyles.imageStyle}
                    iconStyle={dogadoptionscreeningformstyles.iconStyle}
                    maxHeight={200}
                    value={dogdiet}
                    data={dog_treat_data}
                    valueField="value"
                    labelField="lable"
                    imageField="image"
                    placeholder="Select country"
                    searchPlaceholder="Search..."
                    onChange={e => {
                    setDogdiet(e.value);
                    }}
                 />
                 </View>
                 <View style={dogadoptionscreeningformstyles.GapTextorlabel}>
                 <Text style={dogadoptionscreeningformstyles.petText}>Bland Diet</Text>
                 <SelectCountry
                    style={dogadoptionscreeningformstyles.dividedropdown}
                    selectedTextStyle={dogadoptionscreeningformstyles.selectedTextStyle}
                    placeholderStyle={dogadoptionscreeningformstyles.placeholderStyle}
                    imageStyle={dogadoptionscreeningformstyles.imageStyle}
                    iconStyle={dogadoptionscreeningformstyles.iconStyle}
                    maxHeight={200}
                    value={dogtreat}
                    data={Bland_Diet_data}
                    valueField="value"
                    labelField="lable"
                    imageField="image"
                    placeholder="Select country"
                    searchPlaceholder="Search..."
                    onChange={e => {
                    setDogtreat(e.value);
                    }}
                 />
                 </View>
                  </View>
                  
                 </View>
                 <View style={dogadoptionscreeningformstyles.addressTextView}>
                      <Text style={dogadoptionscreeningformstyles.petText}>Allergies</Text>
                      <SelectCountry
                        style={dogadoptionscreeningformstyles.dropdown}
                        selectedTextStyle={dogadoptionscreeningformstyles.selectedTextStyle}
                        placeholderStyle={dogadoptionscreeningformstyles.placeholderStyle}
                        imageStyle={dogadoptionscreeningformstyles.imageStyle}
                        iconStyle={dogadoptionscreeningformstyles.iconStyle}
                        maxHeight={200}
                        value={country}
                        data={allergies_data}
                        valueField="value"
                        labelField="lable"
                        imageField="image"
                        placeholder="Select quantity"
                        searchPlaceholder="Search..."
                        onChange={e => {
                          setAllergies(e.value);
                        }}
                      />
                    </View>
                    {/* <View style={dogadoptionscreeningformstyles.addressTextView}>
                      <Text style={dogadoptionscreeningformstyles.petText}>Physical Condition</Text>
                      <SelectCountry
                        style={dogadoptionscreeningformstyles.dropdown}
                        selectedTextStyle={dogadoptionscreeningformstyles.selectedTextStyle}
                        placeholderStyle={dogadoptionscreeningformstyles.placeholderStyle}
                        imageStyle={dogadoptionscreeningformstyles.imageStyle}
                        iconStyle={dogadoptionscreeningformstyles.iconStyle}
                        maxHeight={200}
                        value={country}
                        data={physical_condition_data}
                        valueField="value"
                        labelField="lable"
                        imageField="image"
                        placeholder="Select quantity"
                        searchPlaceholder="Search..."
                        onChange={e => {
                          setPhysicalcondition(e.value);
                        }}
                      />
                    </View> */}

                   <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={dogadoptionscreeningformstyles.addressTextView}>
                      <Text style={dogadoptionscreeningformstyles.petText}>Physical Condition</Text>
                      <SelectCountry
                        style={dogadoptionscreeningformstyles.dropdown}
                        selectedTextStyle={dogadoptionscreeningformstyles.selectedTextStyle}
                        placeholderStyle={dogadoptionscreeningformstyles.placeholderStyle}
                        imageStyle={dogadoptionscreeningformstyles.imageStyle}
                        iconStyle={dogadoptionscreeningformstyles.iconStyle}
                        maxHeight={200}
                        value={physicalcondition}
                        data={physical_condition_data}
                        valueField="value"
                        labelField="lable"
                        imageField="image"
                        placeholder="Select quantity"
                        searchPlaceholder="Search..."
                        onChange={e => {
                          setPhysicalcondition(e.value);
                        }}
                      />
                    </View>
                     <View style={{ marginTop: responsiveHeight(2), paddingHorizontal: responsiveWidth(6) }}>
                        <Text style={{ fontSize: 10, fontWeight: '500', color: '#444444' }}>
                          <Text style={{ fontSize: 12, fontWeight: '700' }}>*Note: </Text>
                          If we run out of dog’s meals, may we switch to our Chicken Based kennel diet? If you prefer to not switch, we will shop for your dog’s own diet, for which there will be extra charges (purchase cost plus transportation)
                        </Text>
                          <View style={{flexDirection:'row',top:responsiveHeight(0.40)}}>
                          <BouncyCheckbox
                            style={{ width:responsiveWidth(18) }} 
                            size={15}
                            fillColor="#8E8E8E"
                            unFillColor="#FFFFFF"
                            text="Yes"
                            iconStyle={{ borderColor: "white" }}
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{ fontFamily: "JosefinSans-Regular" }}
                            onPress={(isChecked: boolean) => {console.log(isChecked)}}
                       />
                        <BouncyCheckbox
                          style={{ width:responsiveWidth(18) }} 
                          size={15}
                            fillColor="#8E8E8E"
                            unFillColor="#FFFFFF"
                            text="No"
                            iconStyle={{ borderColor: "white" }}
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{ fontFamily: "JosefinSans-Regular" }}
                            onPress={(isChecked: boolean) => {console.log(isChecked)}}
                       />
                      </View>
                      </View> 
                  </View>
                  </View>
                  <View style={{paddingHorizontal:responsiveWidth(4.5),top:responsiveHeight(2.8)}}>
                       <Text style={{fontSize:14,fontWeight:'600',lineHeight:14,letterSpacing:0,color:'#303030'}}>Emergency Contact</Text>
                       <View style={dogadoptionscreeningformstyles.divideTextInputField}>
                          <View style={dogadoptionscreeningformstyles.GapTextorlabel}>
                              <Text style={dogadoptionscreeningformstyles.petText}>Contact name</Text>
                              <TextInput style={dogadoptionscreeningformstyles.DivideTextInputField}/>
                          </View>
                          <View style={dogadoptionscreeningformstyles.GapTextorlabel}>
                              <Text style={dogadoptionscreeningformstyles.petText}>Phone No.</Text>
                              <TextInput style={dogadoptionscreeningformstyles.DivideTextInputField}/>
                          </View>
                     </View>
                     <View style={dogadoptionscreeningformstyles.divideTextInputField}>
                          <View style={dogadoptionscreeningformstyles.GapTextorlabel}>
                              <Text style={dogadoptionscreeningformstyles.petText}>Contact name</Text>
                              <TextInput style={dogadoptionscreeningformstyles.DivideTextInputField}/>
                          </View>
                          <View style={dogadoptionscreeningformstyles.GapTextorlabel}>
                              <Text style={dogadoptionscreeningformstyles.petText}>Phone No.</Text>
                              <TextInput style={dogadoptionscreeningformstyles.DivideTextInputField}/>
                          </View>
                     </View>
                  </View>
                  <View style={{paddingHorizontal:responsiveWidth(4.5),top:responsiveHeight(4),gap:responsiveHeight(1)}}>
                       <Text style={{fontSize:14,fontWeight:'600',lineHeight:14,letterSpacing:0,color:'#303030'}}>Grooming</Text>
                        <View style={{gap:responsiveHeight(2)}}>
                        <View>
                        <Text style={{ fontSize: 10, fontWeight: '500', color: '#444444' }}>
                          <Text style={{ fontSize: 12, fontWeight: '700' }}>*Note: </Text>
                           If time allows would you like us to bathe or groom your pet before pick up?
                        </Text>
                          <View style={{flexDirection:'row',top:responsiveHeight(0.40)}}>
                          <BouncyCheckbox
                            style={{ width:responsiveWidth(18) }} 
                            size={15}
                            fillColor="#8E8E8E"
                            unFillColor="#FFFFFF"
                            text="Yes"
                            iconStyle={{ borderColor: "white" }}
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{ fontFamily: "JosefinSans-Regular" }}
                            onPress={(isChecked: boolean) => {console.log(isChecked)}}
                       />
                        <BouncyCheckbox
                          style={{ width:responsiveWidth(18) }} 
                          size={15}
                            fillColor="#8E8E8E"
                            unFillColor="#FFFFFF"
                            text="No"
                            iconStyle={{ borderColor: "white" }}
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{ fontFamily: "JosefinSans-Regular" }}
                            onPress={(isChecked: boolean) => {console.log(isChecked)}}
                       />
                      </View>
                      </View>
                    
                      <View>
                        <Text style={{ fontSize: 10, fontWeight: '500', color: '#444444' }}>
                          <Text style={{ fontSize: 12, fontWeight: '700' }}>*Note: </Text>
                          If so, please provide the following information: have we groomed your pet before?
                        </Text>
                          <View style={{flexDirection:'row',top:responsiveHeight(0.40)}}>
                          <BouncyCheckbox
                            style={{ width:responsiveWidth(18) }} 
                            size={15}
                            fillColor="#8E8E8E"
                            unFillColor="#FFFFFF"
                            text="Yes"
                            iconStyle={{ borderColor: "white" }}
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{ fontFamily: "JosefinSans-Regular" }}
                            onPress={(isChecked: boolean) => {console.log(isChecked)}}
                       />
                        <BouncyCheckbox
                          style={{ width:responsiveWidth(18) }} 
                          size={15}
                            fillColor="#8E8E8E"
                            unFillColor="#FFFFFF"
                            text="No"
                            iconStyle={{ borderColor: "white" }}
                            innerIconStyle={{ borderWidth: 2 }}
                            textStyle={{ fontFamily: "JosefinSans-Regular" }}
                            onPress={(isChecked: boolean) => {console.log(isChecked)}}
                       />
                      </View>
                      </View>
                    

                        </View>
                  </View>
                   <View style={{justifyContent:'center',alignItems:'center',top:responsiveHeight(3)}}>
                   <View style={dogadoptionscreeningformstyles.addressTextView}>
                        <Text style={dogadoptionscreeningformstyles.petText}>Description</Text>
                        <TextInput style={dogadoptionscreeningformstyles.TreatsTextInputField}/>
                  </View>
                  <Text style={dogadoptionscreeningformstyles.descriptionText}>If yes, same as previously, Make some changes. If no, use groomer's discretion, or describe what would you like. </Text>
                   </View>
                   <View style={{gap:responsiveHeight(2)}}>
                   <View style={{flexDirection:'row',justifyContent:'space-between', paddingHorizontal:responsiveWidth(6),top:responsiveHeight(6)}}>
                         <Text style={{fontSize:14,fontWeight:'600',lineHeight:14,letterSpacing:0}}>Vaccination</Text>
                          <TouchableOpacity onPress={()=>navigation.navigate("AddVaccination")}>
                            <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                                <Image source={Icons.BiPlus} style={{width:responsiveWidth(2),height:responsiveHeight(1.8),top:responsiveHeight(0.45)}}/>
                                <Text style={{fontSize:9,fontWeight:'500',lineHeight:10,letterSpacing:0,color:'#4494A8',top:responsiveHeight(1)}}>Add Vaccination</Text>
                          </View>
                          </TouchableOpacity>
                   </View>
                    <View style={{justifyContent:'center',alignItems:'center',top:responsiveHeight(6)}}>
                    <View style={dogadoptionscreeningformstyles.vaccinationView}>
                       <View style={{flexDirection:'row',gap:responsiveWidth(1.5)}}>
                       <Image source={images.injection} style={{width:responsiveWidth(8),height:responsiveHeight(4),borderRadius:responsiveWidth(8)}}/>
                        <View>
                        <Text style={{fontSize:10,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#3A3A3A'}}>Leptospirosis vaccine</Text>
                        <BouncyCheckbox
                          style={{ width: responsiveWidth(100) }}
                          size={15}
                          fillColor="#299F4D" 
                          unFillColor="#299F4D" 
                          text="Expires on: 02.12.2024"
                          iconStyle={{ borderColor: "#299F4D", borderWidth: 2 }}
                          innerIconStyle={{ borderWidth: 1 }}
                          textStyle={{
                            fontSize: 8,
                            fontWeight: '500',
                            lineHeight: 10,
                            letterSpacing: 0,
                            color: '#7E7E7E',
                            right:responsiveWidth(1.5)
                          }}
                          
                          isChecked={false}
                          onPress={(isChecked: boolean) => {
                            console.log(isChecked);
                          }}
                        />
                        </View>
                       </View>
                   </View>
                    </View>

                    <View style={{justifyContent:'center',alignItems:'center',top:responsiveHeight(6)}}>
                    <View style={dogadoptionscreeningformstyles.vaccinationView}>
                       <View style={{flexDirection:'row',gap:responsiveWidth(1.5)}}>
                       <Image source={images.injection} style={{width:responsiveWidth(8),height:responsiveHeight(4),borderRadius:responsiveWidth(8)}}/>
                        <View>
                        <Text style={{fontSize:10,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#3A3A3A'}}>Leptospirosis vaccine</Text>
                        <BouncyCheckbox
                          style={{ width: responsiveWidth(100) }}
                          size={15}
                          fillColor="#299F4D" 
                          unFillColor="#299F4D" 
                          text="Expires on: 02.12.2024"
                          iconStyle={{ borderColor: "#299F4D", borderWidth: 2 }}
                          innerIconStyle={{ borderWidth: 1 }}
                          textStyle={{
                            fontSize: 8,
                            fontWeight: '500',
                            lineHeight: 10,
                            letterSpacing: 0,
                            color: '#7E7E7E',
                            right:responsiveWidth(1.5)
                          }}
                          
                          isChecked={false}
                          onPress={(isChecked: boolean) => {
                            console.log(isChecked);
                          }}
                        />
                        </View>
                       </View>
                   </View>
                    </View>
                    <View style={{justifyContent:'center',alignItems:'center',top:responsiveHeight(6)}}>
                    <View style={dogadoptionscreeningformstyles.vaccinationView}>
                       <View style={{flexDirection:'row',gap:responsiveWidth(1.5)}}>
                       <Image source={images.injection} style={{width:responsiveWidth(8),height:responsiveHeight(4),borderRadius:responsiveWidth(8)}}/>
                        <View>
                        <Text style={{fontSize:10,fontWeight:'500',lineHeight:14,letterSpacing:0,color:'#3A3A3A'}}>Leptospirosis vaccine</Text>
                        <BouncyCheckbox
                          style={{ width: responsiveWidth(100) }}
                          size={15}
                          fillColor="#299F4D" 
                          unFillColor="#299F4D" 
                          text="Expires on: 02.12.2024"
                          iconStyle={{ borderColor: "#299F4D", borderWidth: 2 }}
                          innerIconStyle={{ borderWidth: 1 }}
                          textStyle={{
                            fontSize: 8,
                            fontWeight: '500',
                            lineHeight: 10,
                            letterSpacing: 0,
                            color: '#7E7E7E',
                            right:responsiveWidth(1.5)
                          }}
                          
                          isChecked={false}
                          onPress={(isChecked: boolean) => {
                            console.log(isChecked);
                          }}
                        />
                        </View>
                       </View>
                   </View>
                    </View>
                   </View>

                   <View style={{paddingHorizontal:responsiveWidth(4.5),top:responsiveHeight(8),gap:responsiveHeight(2)}}>
                      <Text style={{fontSize:14,fontWeight:'600',lineHeight:14,letterSpacing:0,color:'#303030'}}>Please read this carefully</Text>
                      <Text style={{fontSize:9,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#444444'}}>It affects any rights you may have if you, your dog(s), or anybody bring along to day-care are injured or otherwise suffer damages while participating in doggy day-care and boarding at Petjio Creche. It also states your responsibilities regarding fees and expectations associated with doggy day-care and boarding at Petjio Creche.</Text>
                      <Text style={{fontSize:9,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#444444'}}>I, __________(guardians of the dog(s)),hereby agree to the following covenants described below regarding the doggy care and boarding at Petjio Creche.</Text>
                      <Text style={{fontSize:9,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#444444'}}>I, further release, waive, discharge and covenant not to sue Petjio Creche and any of the officers, servants, agents, employees and volunteers of the above mentioned entities (here in after referred to as RELEASES) for any liability, calm and/or cause of action arising out of or related to any loss, damage or injury, including death, that occurs as a result of my participation in the below described activities.</Text>
                      <Text style={{fontSize:9,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#444444'}}>1.Participation in doggy day-care and boarding is voluntary. We reserve the right to excuse any dog from dog day-care or boarding at any time for negative behavior and no refund will be given.</Text>
                      <Text style={{fontSize:9,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#444444'}}>2.It is the participant’s choice to bring other people to the day-care area at his or her risk and it is the participant’s sole responsibility to ensure their safety and well being.</Text>
                      <Text style={{fontSize:9,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#444444'}}>3.RELEASES do not guarantee a dog’s behavior at any time, during or outside of the day-care or boarding. We can only evaluate and supervise to the best of our ability.</Text>
                      <Text style={{fontSize:9,fontWeight:'400',lineHeight:14,letterSpacing:0,color:'#444444'}}>4.RELEASES do not guarantee a dog’s behavior at any time, during or outside of the day-care or boarding. We can only evaluate and supervise to the best of our ability.</Text>
                    </View>
                </ScrollView>

                 {/* Fixed Next Button */}
            {/* <View style={dogadoptionscreeningformstyles.fixedButtonContainer}>
                <TouchableOpacity
                    // onPress={() => navigation.navigate('HomeService')}
                    style={dogadoptionscreeningformstyles.nextBtnContainer}>
                    <View style={dogadoptionscreeningformstyles.divideTextInputField}>
                    <View style={dogadoptionscreeningformstyles.borderRadiousBtn}>
                        <Text style={dogadoptionscreeningformstyles.ButtonText}>Download Pdf</Text>
                       
                    </View>
                    <TouchableOpacity
                     onPress={()=>navigation.navigate("BookBoarder")}
                    >
                        <View style={dogadoptionscreeningformstyles.selectedborderRadiousBtn}>
                        <Text style={dogadoptionscreeningformstyles.selectedButtonText}>Save & Continue</Text>
                    </View>
                    </TouchableOpacity>
                    
                 </View>
                </TouchableOpacity>
            </View> */}
        </View>
    );
};

export default DogAdoptionScreeningForm;

