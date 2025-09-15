import {useState}from 'react';
import { View, Text,TouchableOpacity,Image,TextInput,Platform  } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';
import addvaccinationstyles from './addvaccination.styles';
import Icons from '../../../assets/icons';
import images from '../../../assets/images';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackNavigationProp } from '@react-navigation/stack';



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
     BoardingRegistrationform:undefined
 };
 
 // Define the navigation prop type
 type AddVaccinationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BoardingRegistrationform'>;
 
 // Define props interface for the component
 interface AddVaccinationProps {
   navigation: AddVaccinationScreenNavigationProp;
 }
 



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

const AddVaccination: React.FC<AddVaccinationProps> = ({navigation}) => {
    const [country, setCountry] = useState<string>('1');
    const [startdate, setStartdate] = useState(new Date());
    const [enddate,setEnddate] = useState(new Date());
    const [showstartdate,setShowstartdate] = useState<boolean>(false);
    const [showenddate,setShowenddate] = useState<boolean>(false);
  
    const onChangestartdate = (event:any, selectedDate?: Date) => {
        setShowstartdate(Platform.OS === 'ios');
         if (selectedDate) {
         setStartdate(selectedDate);
         
        }
     };

     const onChangeendtdate = (event:any, selectedDate?: Date) => {
        console.log("End Date",selectedDate)
        setShowenddate(Platform.OS === 'ios')
         if (selectedDate) {
            setEnddate(selectedDate);
         
        }
     };
    return (
        <View style={addvaccinationstyles.container}>
          <View style={addvaccinationstyles.positionDateTimeIcon}>
                        <TouchableOpacity
                            // onPress={() => navigation.navigate('Grooming')}
                         >
                            <View style={addvaccinationstyles.flexGap}>
                                <Image
                                    source={Icons.LeftArrow}
                                    style={addvaccinationstyles.iconColor}
                                />
                                <Text style={addvaccinationstyles.textDateTime}>
                                 Add Vaccine
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
              
                  <View style={addvaccinationstyles.Gap}>

                    <View style={addvaccinationstyles.imagesetCenter}>
                       <Image source={images.veterinariTakingImage} style={addvaccinationstyles.ImageSize}/>
                     </View>
                      <Text style={addvaccinationstyles.addvaccinText}>Add Vaccine</Text>  
                 </View>
                      
             <View style={addvaccinationstyles.showCenterDropdown}>
               <View style={addvaccinationstyles.GapTextorlabel}>
                 <Text style={addvaccinationstyles.petText}>Name of the vaccine*</Text>
                   <View style={addvaccinationstyles.GapTextorlabel} >
                   <SelectCountry
                    style={addvaccinationstyles.dividedropdown}
                    selectedTextStyle={addvaccinationstyles.selectedTextStyle}
                    placeholderStyle={addvaccinationstyles.placeholderStyle}
                    imageStyle={addvaccinationstyles.imageStyle}
                    iconStyle={addvaccinationstyles.iconStyle}
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
                 <BouncyCheckbox
                          style={addvaccinationstyles.bouncyCheckboxWidth}
                          size={15}
                          fillColor="#299F4D" 
                          unFillColor="#299F4D" 
                          text="Gegen: Lepto, Parvo, Distemper, Rabies"
                          iconStyle={addvaccinationstyles.borderColorandWidth}
                          innerIconStyle={addvaccinationstyles.innerIconStyle}
                          textStyle={addvaccinationstyles.textStyle}
                          
                          isChecked={false}
                          onPress={(isChecked: boolean) => {
                            console.log(isChecked);
                          }}
                        />
                   </View>
                 </View>

                 <View style={addvaccinationstyles.GapTextorlabel}>
                 <Text style={addvaccinationstyles.petText}>Good from*</Text>
                 <TouchableOpacity
                        onPress={() => setShowstartdate(true)}
                        style={addvaccinationstyles.DateTimePickerStyle}
                    >
                    <Text>{startdate.toLocaleDateString('en-GB')}</Text>
                </TouchableOpacity>
                    {showstartdate && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={startdate}
                        mode="date"
                        display="default"
                        onChange={onChangestartdate}
                        />
                    )}
                 </View>

                 <View style={addvaccinationstyles.GapTextorlabel}>
                 <Text style={addvaccinationstyles.petText}>Good until*</Text>
                 <TouchableOpacity
                        onPress={() => setShowenddate(true)}
                        style={addvaccinationstyles.DateTimePickerStyle}
                    >
                    <Text>{enddate.toLocaleDateString('en-GB')}</Text>
                </TouchableOpacity>
                    {showenddate && (
                        <DateTimePicker
                        testID="dateTimePicker"
                        value={enddate}
                        mode="date"
                        display="default"
                        onChange={onChangeendtdate}
                        />
                    )}
                 </View>
                   </View>
                  
            
                <View style={addvaccinationstyles.fixedButtonContainer}>
                      <TouchableOpacity
                           onPress={() =>navigation.navigate("BoardingRegistrationform")}
                          style={addvaccinationstyles.nextBtnContainer}>
                          <Text style={addvaccinationstyles.nextBtnText}>Add Vaccination</Text>
                      </TouchableOpacity>
              </View>
        </View>
    );
};

export default AddVaccination;
