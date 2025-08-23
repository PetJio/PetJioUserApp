import React, { useMemo,useState } from 'react';
import { View, Text, TouchableOpacity, Image,TextInput, ScrollView,StyleProp, TextStyle ,Platform} from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import veterinaryformstyles from './veterinaryform.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { SelectCountry } from 'react-native-element-dropdown';
import MapView from "react-native-maps";
import RadioGroup from 'react-native-radio-buttons-group';
import CheckBox from 'react-native-check-box';
import ToggleSwitch from 'toggle-switch-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface ServiceState {
  Orthopedic: boolean;
  Heart: boolean;
  Surgeon:boolean;
  Gastro: boolean;
  General: boolean;
  Gyno:boolean;
  alloftheabove:boolean
}



type RootStackParamList = {
    PetParentform: undefined;
    Main: undefined;
    SignUp: undefined;
};


type VeterinaryformPropsScreenNavigationProp = StackNavigationProp< RootStackParamList,'SignUp'>;


interface VeterinaryformProps {
    navigation: VeterinaryformPropsScreenNavigationProp;
}

const Veterinaryform: React.FC<VeterinaryformProps> = ({ navigation }) => {
  const [coordinate, setCoordinate] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
   const [services, setServices] = useState<ServiceState>({
      Orthopedic: false,
      Heart: false,
      Surgeon:false,
      Gastro: false,
      General: false,
      Gyno:false,
      alloftheabove:false
    });

  const [selectedonlineId, setSelectedonlineId] = useState<string>('1');
  const [selectedofflineId, setSelectedofflineId] = useState<string>('1');
  const [selectedbothId, setSelectedbothId] = useState<string>('1');
  const [isOn, setIsOn] = useState<boolean>(false);
  const [startTime, setStartTime] = useState(new Date());
  const [showStartTime, setShowStartTime] = useState<boolean>(false);
  
    
       const onChangestartdate = (event:any, selectedTime?: Date) => {
           setShowStartTime(Platform.OS === 'ios');
            if (selectedTime) {
            setStartTime(selectedTime);
            
           }
        };


  const onlineOptions = [
  {
    id: '1',
    label: 'Online',
    value: 'Online',
    labelStyle: {
      fontSize: 16,
      color: '#000',
      fontWeight: '500',
    } as StyleProp<TextStyle>,
  },
  
 
];

  const offlineOptions = [
  {
    id: '2',
    label: 'Offline',
    value: 'Offline',
    labelStyle: {
      fontSize: 16,
      color: '#000',
      fontWeight: '500',
    } as StyleProp<TextStyle>,
  },
];


  const bothOptions = [
  {
    id: '3',
    label: 'Both',
    value: 'Both',
    labelStyle: {
      fontSize: 16,
      color: '#000',
      fontWeight: '500',
    } as StyleProp<TextStyle>,
  },
  
];




const toggleService = (key: keyof ServiceState): void => {
    setServices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

    return (
      <View style={veterinaryformstyles.parentcontainer}>
            <View style={veterinaryformstyles.headerContainer}>
                  <View style={veterinaryformstyles.positionDateTimeIcon}>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Image
                                    source={Icons.LeftArrow}
                                    style={veterinaryformstyles.iconColor}
                                />
                            </TouchableOpacity>
                            <View style={veterinaryformstyles.flexGap}>
                                <Text style={veterinaryformstyles.text}>Veterinary</Text>
                            </View>
                        </View>
                </View>

               <ScrollView contentContainerStyle={veterinaryformstyles.scrollContent} showsVerticalScrollIndicator={false}>
            <View style={veterinaryformstyles.formSection}>
                <View>
                       <Text>Professional Details</Text>
                </View>
              {/* First & Last Name */}
              <View style={veterinaryformstyles.inputWrapper}>
                  <Text style={veterinaryformstyles.label}>Doctor's Name <Text style={veterinaryformstyles.required}>*</Text></Text>
                  <TextInput style={veterinaryformstyles.input} placeholder="Enter doctor's name" />
                </View>

              {/* Email */}
              <Text style={veterinaryformstyles.label}>Clinic/Hospital Name</Text>
              <TextInput style={veterinaryformstyles.input} placeholder="enter clinic/hospital name" />

              {/* Mobile Number */}
              <Text style={veterinaryformstyles.label}>Mobile Number <Text style={veterinaryformstyles.required}>*</Text></Text>
                <View style={veterinaryformstyles.mobileContainer}>
                  <TouchableOpacity style={veterinaryformstyles.codeBox}>
                    <Text style={veterinaryformstyles.codeText}>+91</Text>
                    <Image source={Icons.DownArrow} style={veterinaryformstyles.dropdownIcon} />
                  </TouchableOpacity>

                  <TextInput
                    style={veterinaryformstyles.mobileInput}
                    placeholder="Enter your mobile number"
                    placeholderTextColor="#7D7D7D"
                    keyboardType="phone-pad"
                  />
                </View>

              {/* Your Location */}
              {/* <Text style={veterinaryformstyles.sectionTitle}>Your Location</Text> */}

        
              {/* Email Address */}
              <Text style={veterinaryformstyles.label}>Email Address</Text>
              <TextInput style={veterinaryformstyles.input} placeholder="enter your email address" />

               {/* Pin Code */}
              <Text style={veterinaryformstyles.label}>Degree <Text style={veterinaryformstyles.required}>*</Text></Text>
              <TextInput style={veterinaryformstyles.input} placeholder="enter your degree" />

              {/* City */}
              <Text style={veterinaryformstyles.label}>Registration/License Number (optional)</Text>
              <TextInput style={veterinaryformstyles.input} placeholder="enter registration/license number" />
              
                {/* Your Location */}
              <Text style={veterinaryformstyles.sectionTitle}>Location Details</Text>

              {/* State */}
              <Text style={veterinaryformstyles.label}>Pin Code <Text style={veterinaryformstyles.required}>*</Text></Text>
              <TextInput style={veterinaryformstyles.input} placeholder="Pin Code" />


               {/* Address*/}
              <Text style={veterinaryformstyles.label}>Address</Text>
              <TextInput style={veterinaryformstyles.input} placeholder="Enter Address" />

               {/* City*/}
              <Text style={veterinaryformstyles.label}>City</Text>
              <TextInput style={veterinaryformstyles.input} placeholder="Enter City" />

               {/* State*/}
              <Text style={veterinaryformstyles.label}>State</Text>
              <TextInput style={veterinaryformstyles.input} placeholder="Enter State" />

               {/* Location */}
               <View style={veterinaryformstyles.locationAndText}>
               <Text style={veterinaryformstyles.label}>Location</Text>
              
               </View>
               <View style={veterinaryformstyles.mapSize}>
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
                     <Text style={veterinaryformstyles.petInformationText}>Specialization (if any)</Text>
              </View>
              
               <View style={veterinaryformstyles.checkboxcontainer}>
                  <Text style={veterinaryformstyles.title}>Pet Warrior Services You Undertake</Text>

                  <View style={veterinaryformstyles.checkboxrow}>
                    <View style={veterinaryformstyles.item}>
                      <CheckBox
                        isChecked={services.Orthopedic}
                        onClick={() => toggleService('Orthopedic')}
                        checkBoxColor="#ECECEC"
                        checkedCheckBoxColor="green"
                        style={veterinaryformstyles.checkbox}
                      />
                      <Text style={veterinaryformstyles.servicesproviderText}>Orthopedic</Text>
                    </View>

                  <View style={veterinaryformstyles.item}>
                    <CheckBox
                      isChecked={services.Heart}
                      onClick={() => toggleService('Heart')}
                      checkBoxColor="#ECECEC"
                      checkedCheckBoxColor="green"
                      style={veterinaryformstyles.checkbox}
                    />
                    <Text style={veterinaryformstyles.servicesproviderText}>Heart</Text>
                  </View>

                    <View style={veterinaryformstyles.item}>
                      <CheckBox
                        isChecked={services.Surgeon}
                        onClick={() => toggleService('Surgeon')}
                        checkBoxColor="#ECECEC"
                        checkedCheckBoxColor="green"
                        style={veterinaryformstyles.checkbox}
                      />
                      <Text style={veterinaryformstyles.servicesproviderText}>Surgeon</Text>
                    </View>
                  </View>
                   <View style={veterinaryformstyles.checkboxrow}>
                    <View style={veterinaryformstyles.item}>
                      <CheckBox
                        isChecked={services.Gastro}
                        onClick={() => toggleService('Gastro')}
                        checkBoxColor="#ECECEC"
                        checkedCheckBoxColor="green"
                        style={veterinaryformstyles.checkbox}
                      />
                      <Text style={veterinaryformstyles.servicesproviderText}>Gastro</Text>
                    </View>

                  <View style={veterinaryformstyles.item}>
                    <CheckBox
                      isChecked={services.General}
                      onClick={() => toggleService('General')}
                      checkBoxColor="#ECECEC"
                      checkedCheckBoxColor="green"
                      style={veterinaryformstyles.checkbox}
                    />
                    <Text style={veterinaryformstyles.servicesproviderText}>General</Text>
                  </View>

                    <View style={veterinaryformstyles.item}>
                      <CheckBox
                        isChecked={services.Gyno}
                        onClick={() => toggleService('Gyno')}
                        checkBoxColor="#ECECEC"
                        checkedCheckBoxColor="green"
                        style={veterinaryformstyles.checkbox}
                      />
                      <Text style={veterinaryformstyles.servicesproviderText}>Gyno</Text>
                    </View>
                    <View style={veterinaryformstyles.item}>
                      <CheckBox
                        isChecked={services.alloftheabove}
                        onClick={() => toggleService('alloftheabove')}
                        checkBoxColor="#ECECEC"
                        checkedCheckBoxColor="green"
                        style={veterinaryformstyles.checkbox}
                      />
                      <Text style={veterinaryformstyles.servicesproviderText}>All of the{"\n"} above</Text>
                    </View>
                  </View>
                </View>
                <View style={veterinaryformstyles.checkboxcontainer}>
                  <Text style={veterinaryformstyles.ConsultationTypeText}>Consultation Type</Text>

                  <View style={veterinaryformstyles.checkboxrow}>
                    <View style={veterinaryformstyles.item}>
                      <RadioGroup
                        radioButtons={onlineOptions}
                        onPress={setSelectedonlineId}
                        selectedId={selectedonlineId}
                        containerStyle={veterinaryformstyles.checkbox}
                      />
                     
                    </View>

                  <View style={veterinaryformstyles.item}>
                     <RadioGroup
                        radioButtons={offlineOptions}
                        onPress={setSelectedofflineId}
                        selectedId={selectedofflineId}
                        containerStyle={veterinaryformstyles.checkbox}
                      />
                  </View>

                    <View style={veterinaryformstyles.item}>
                      <RadioGroup
                        radioButtons={bothOptions}
                        onPress={setSelectedbothId}
                        selectedId={selectedbothId}
                        containerStyle={veterinaryformstyles.checkbox}
                      />
                    </View>
                  </View>
                </View>

                <View style={veterinaryformstyles.onlineConsultationView}>
                    <Text style={veterinaryformstyles.onlineConsultationHoursText}>Online Consultation Hours</Text>
                    <View style={veterinaryformstyles.flexdayandswitch}>
                         <Text style={veterinaryformstyles.dayText}>Monday</Text>
                          <View style={veterinaryformstyles.switchText}>
                          <ToggleSwitch
                                isOn={isOn}
                                onColor="blue"
                                offColor="gray"
                                // label="Example label"
                                labelStyle={veterinaryformstyles.switchLabelStyle}
                                size="medium"
                                onToggle={setIsOn}
                            />
                          <Text>
                         {isOn ? 'Available' : 'Unavailable'}
                 </Text>
              </View>
                    </View>

                 <View style={veterinaryformstyles.divideTimeView}>
                     <View style={veterinaryformstyles.GapTextorlabel}>
                 <Text style={veterinaryformstyles.startTime}>Start Time</Text>
                 <TouchableOpacity
                        onPress={() => setShowStartTime(true)}
                        style={veterinaryformstyles.DateTimePickerStyle}
                    >
                    <Text> {startTime.toLocaleTimeString('en-US', {
                             hour: '2-digit',
                             minute: '2-digit',
                             hour12: true,
                            })}</Text>
                                    </TouchableOpacity>
                                        {showStartTime && (
                                            <DateTimePicker
                                            testID="dateTimePicker"
                                            value={startTime}
                                            mode="time"
                                            display="default"
                                            onChange={onChangestartdate}
                                            />
                                        )}
                                </View>
                                 <View style={veterinaryformstyles.GapTextorlabel}>
                 <Text style={veterinaryformstyles.endTime}>End Time</Text>
                 <TouchableOpacity
                        onPress={() => setShowStartTime(true)}
                        style={veterinaryformstyles.DateTimePickerStyle}
                    >
                    <Text> {startTime.toLocaleTimeString('en-US', {
                             hour: '2-digit',
                             minute: '2-digit',
                             hour12: true,
                            })}</Text>
                                    </TouchableOpacity>
                                        {showStartTime && (
                                            <DateTimePicker
                                            testID="dateTimePicker"
                                            value={startTime}
                                            mode="time"
                                            display="default"
                                            onChange={onChangestartdate}
                                            />
                                        )}
                                </View>

                 </View>


                    </View>
                        </View> 
               </ScrollView>
            
              <View style={veterinaryformstyles.fixedButtonContainer}>
                  <TouchableOpacity
                      // onPress={() => navigation.navigate('HomeService')}
                      style={veterinaryformstyles.nextBtnContainer}>
                      <Text style={veterinaryformstyles.nextBtnText}>Register</Text>
                  </TouchableOpacity>
            </View>
      </View>
       
    );
};

export default Veterinaryform;
