import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, StatusBar, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import registrationformstyles from './registrationform.styles';
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
    Main: undefined;
    PetWarriorform: undefined;
    DeliveryPartnerform: undefined;
    ServiceProviderform: undefined;
    SignIn: undefined;
    BoardingDetails: undefined;
    AddVaccination: undefined;
    BookBoarder: undefined;
};

// Define the navigation prop type
type BoardingFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BoardingDetails'>;

// Define props interface for the component
interface BoardingFormProps {
    navigation: BoardingFormScreenNavigationProp;
}

const daisy_data = [
    { value: '1', lable: 'Daisy' },
    { value: '2', lable: 'Bella' },
    { value: '3', lable: 'Leo' },
    { value: '4', lable: 'Max' },
    { value: '5', lable: 'Charlie' },
];

const bella_data = [
    { value: '1', lable: 'Golden Retriever' },
    { value: '2', lable: 'Labrador' },
    { value: '3', lable: 'German Shepherd' },
    { value: '4', lable: 'Beagle' },
    { value: '5', lable: 'Bulldog' },
];

const category_data = [
    { value: '1', lable: 'Large Breed' },
    { value: '2', lable: 'Medium Breed' },
    { value: '3', lable: 'Small Breed' },
    { value: '4', lable: 'Toy Breed' },
    { value: '5', lable: 'Giant Breed' },
];

const state_data = [
    { value: '1', lable: 'West Bengal' },
    { value: '2', lable: 'Maharashtra' },
    { value: '3', lable: 'Delhi' },
    { value: '4', lable: 'Karnataka' },
    { value: '5', lable: 'Tamil Nadu' },
];

const city_data = [
    { value: '1', lable: 'Kolkata' },
    { value: '2', lable: 'Mumbai' },
    { value: '3', lable: 'Delhi' },
    { value: '4', lable: 'Bangalore' },
    { value: '5', lable: 'Chennai' },
];

const diet_data = [
    { value: '1', lable: 'Dry Food' },
    { value: '2', lable: 'Wet Food' },
    { value: '3', lable: 'Raw Diet' },
    { value: '4', lable: 'Home Cooked' },
    { value: '5', lable: 'Mixed Diet' },
];

const daily_feeds_data = [
    { value: '1', lable: '1 time' },
    { value: '2', lable: '2 times' },
    { value: '3', lable: '3 times' },
    { value: '4', lable: '4 times' },
    { value: '5', lable: '5 times' },
];

const quantity_data = [
    { value: '1', lable: '1/2 cup' },
    { value: '2', lable: '1 cup' },
    { value: '3', lable: '1.5 cups' },
    { value: '4', lable: '2 cups' },
    { value: '5', lable: '2.5 cups' },
];

const dog_treat_data = [
    { value: '1', lable: 'Biscuits' },
    { value: '2', lable: 'Jerky Treats' },
    { value: '3', lable: 'Dental Chews' },
    { value: '4', lable: 'Training Treats' },
    { value: '5', lable: 'Natural Treats' },
];

const Bland_Diet_data = [
    { value: '1', lable: 'Rice & Chicken' },
    { value: '2', lable: 'Boiled Rice' },
    { value: '3', lable: 'Pumpkin' },
    { value: '4', lable: 'Sweet Potato' },
    { value: '5', lable: 'Cottage Cheese' },
];

const allergies_data = [
    { value: '1', lable: 'No Allergies' },
    { value: '2', lable: 'Food Allergies' },
    { value: '3', lable: 'Environmental' },
    { value: '4', lable: 'Seasonal' },
    { value: '5', lable: 'Multiple Allergies' },
];

const physical_condition_data = [
    { value: '1', lable: 'Excellent' },
    { value: '2', lable: 'Good' },
    { value: '3', lable: 'Fair' },
    { value: '4', lable: 'Special Care Needed' },
    { value: '5', lable: 'Senior Care' },
];

const BoardingRegistrationform: React.FC<BoardingFormProps> = ({ navigation }) => {
    const [formData, setFormData] = useState({
        petName: '1',
        breed: '1',
        category: '1',
        age: '',
        weight: '',
        ownerName: '',
        ownerPhone: '',
        alternatePhone: '',
        email: '',
        state: '1',
        city: '1',
        address: '',
        arrivalDate: '',
        departureDate: '',
        personalPossessions: '',
        dailyFeeds: '1',
        quantity: '1',
        treats: '',
        dogTreat: '1',
        blandDiet: '1',
        allergies: '1',
        physicalCondition: '1',
        emergencyContact1Name: '',
        emergencyContact1Phone: '',
        emergencyContact2Name: '',
        emergencyContact2Phone: '',
        description: '',
    });

    const [checkboxStates, setCheckboxStates] = useState({
        switchDiet: false,
        noSwitchDiet: false,
        groomingYes: false,
        groomingNo: false,
        previousGroomingYes: false,
        previousGroomingNo: false,
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCheckboxChange = (field: string, value: boolean) => {
        setCheckboxStates(prev => ({ ...prev, [field]: value }));
    };

    const renderSection = (title: string, children: React.ReactNode) => (
        <View style={registrationformstyles.sectionContainer}>
            <Text style={registrationformstyles.sectionTitle}>{title}</Text>
            <View style={registrationformstyles.sectionContent}>
                {children}
            </View>
        </View>
    );

    const renderInput = (label: string, field: string, placeholder: string = '', multiline: boolean = false, keyboardType: any = 'default') => (
        <View style={registrationformstyles.inputContainer}>
            <Text style={registrationformstyles.inputLabel}>{label}</Text>
            <TextInput
                style={[
                    registrationformstyles.textInput,
                    multiline && registrationformstyles.textInputMultiline
                ]}
                placeholder={placeholder}
                value={formData[field as keyof typeof formData]}
                onChangeText={(value) => handleInputChange(field, value)}
                multiline={multiline}
                numberOfLines={multiline ? 3 : 1}
                keyboardType={keyboardType}
                placeholderTextColor="#A0A3BD"
            />
        </View>
    );

    const renderDropdown = (label: string, field: string, data: any[], placeholder: string = 'Select option') => (
        <View style={registrationformstyles.inputContainer}>
            <Text style={registrationformstyles.inputLabel}>{label}</Text>
            <SelectCountry
                style={registrationformstyles.dropdown}
                selectedTextStyle={registrationformstyles.selectedTextStyle}
                placeholderStyle={registrationformstyles.placeholderStyle}
                iconStyle={registrationformstyles.iconStyle}
                maxHeight={200}
                value={formData[field as keyof typeof formData]}
                data={data}
                valueField="value"
                labelField="lable"
                placeholder={placeholder}
                searchPlaceholder="Search..."
                onChange={(e) => handleInputChange(field, e.value)}
            />
        </View>
    );

    const renderTwoColumnInputs = (leftInput: React.ReactNode, rightInput: React.ReactNode) => (
        <View style={registrationformstyles.twoColumnContainer}>
            <View style={registrationformstyles.halfWidth}>
                {leftInput}
            </View>
            <View style={registrationformstyles.halfWidth}>
                {rightInput}
            </View>
        </View>
    );

    const renderCheckboxGroup = (title: string, note: string, leftText: string, rightText: string, leftField: string, rightField: string) => (
        <View style={registrationformstyles.checkboxSection}>
            <Text style={registrationformstyles.checkboxTitle}>{title}</Text>
            <Text style={registrationformstyles.noteText}>
                <Text style={registrationformstyles.noteHighlight}>*Note: </Text>
                {note}
            </Text>
            <View style={registrationformstyles.checkboxRow}>
                <BouncyCheckbox
                    style={registrationformstyles.checkbox}
                    size={18}
                    fillColor="#58B9D0"
                    unFillColor="#FFFFFF"
                    text={leftText}
                    iconStyle={{ borderColor: "#58B9D0", borderWidth: 2 }}
                    innerIconStyle={{ borderWidth: 1 }}
                    textStyle={registrationformstyles.checkboxText}
                    isChecked={checkboxStates[leftField as keyof typeof checkboxStates]}
                    onPress={(value) => handleCheckboxChange(leftField, value)}
                />
                <BouncyCheckbox
                    style={registrationformstyles.checkbox}
                    size={18}
                    fillColor="#58B9D0"
                    unFillColor="#FFFFFF"
                    text={rightText}
                    iconStyle={{ borderColor: "#58B9D0", borderWidth: 2 }}
                    innerIconStyle={{ borderWidth: 1 }}
                    textStyle={registrationformstyles.checkboxText}
                    isChecked={checkboxStates[rightField as keyof typeof checkboxStates]}
                    onPress={(value) => handleCheckboxChange(rightField, value)}
                />
            </View>
        </View>
    );

    const renderVaccinationCard = (name: string, expiry: string) => (
        <View style={registrationformstyles.vaccinationCard}>
            <View style={registrationformstyles.vaccinationContent}>
                <Image 
                    source={images.injection} 
                    style={registrationformstyles.vaccinationIcon}
                />
                <View style={registrationformstyles.vaccinationInfo}>
                    <Text style={registrationformstyles.vaccinationName}>{name}</Text>
                    <Text style={registrationformstyles.vaccinationExpiry}>Expires on: {expiry}</Text>
                </View>
                <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
            </View>
        </View>
    );

    return (
        <View style={registrationformstyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
            
            {/* Modern Header - Matching BoardingDetails */}
            <View style={registrationformstyles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={registrationformstyles.backButtonContainer}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#58B9D0" />
                </TouchableOpacity>
                <View style={registrationformstyles.headerTitleContainer}>
                    <Text style={registrationformstyles.headerTitle}>Boarding Registration</Text>
                    <Text style={registrationformstyles.headerSubtitle}>Complete your pet's boarding details</Text>
                </View>
                <View style={registrationformstyles.headerPlaceholder} />
            </View>

            <ScrollView 
                style={registrationformstyles.scrollContainer}
                contentContainerStyle={registrationformstyles.scrollContentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Pet Details Section */}
                {renderSection("Pet Details", (
                    <>
                        {renderDropdown("Pet Name", "petName", daisy_data, "Select pet name")}
                        {renderDropdown("Breed", "breed", bella_data, "Select breed")}
                        {renderDropdown("Breed Category", "category", category_data, "Select category")}
                        
                        {renderTwoColumnInputs(
                            renderInput("Age", "age", "Enter age", false, 'numeric'),
                            renderInput("Weight", "weight", "Enter weight", false, 'numeric')
                        )}

                        {renderInput("Owner's Name", "ownerName", "Enter owner's name")}
                        {renderInput("Owner's Phone", "ownerPhone", "Enter phone number", false, 'phone-pad')}
                        {renderInput("Alternate Phone", "alternatePhone", "Enter alternate number", false, 'phone-pad')}
                        {renderInput("Email ID", "email", "Enter email address", false, 'email-address')}

                        {renderTwoColumnInputs(
                            renderDropdown("State", "state", state_data, "Select state"),
                            renderDropdown("City", "city", city_data, "Select city")
                        )}

                        {renderInput("Address", "address", "Enter complete address", true)}

                        {renderTwoColumnInputs(
                            renderInput("Arrival Date", "arrivalDate", "DD/MM/YYYY"),
                            renderInput("Departure Date", "departureDate", "DD/MM/YYYY")
                        )}

                        {renderInput("Personal Possessions", "personalPossessions", "Toys, blankets, etc.", true)}
                    </>
                ))}

                {/* Feeding Details Section */}
                {renderSection("Feeding Details", (
                    <>
                        {renderDropdown("Daily Feeds", "dailyFeeds", daily_feeds_data, "How many times per day")}
                        {renderDropdown("Quantity per meal", "quantity", quantity_data, "Select quantity")}
                        
                        {renderCheckboxGroup(
                            "Diet Switching",
                            "If we run out of dog's meals, may we switch to our Chicken Based kennel diet? If you prefer to not switch, we will shop for your dog's own diet, for which there will be extra charges (purchase cost plus transportation)",
                            "Yes", "No", "switchDiet", "noSwitchDiet"
                        )}

                        {renderInput("Special Treats", "treats", "Any special treats or food preferences", true)}

                        {renderTwoColumnInputs(
                            renderDropdown("Dog Treats/Cookies", "dogTreat", dog_treat_data, "Select treats"),
                            renderDropdown("Bland Diet", "blandDiet", Bland_Diet_data, "Select diet")
                        )}

                        {renderDropdown("Allergies", "allergies", allergies_data, "Select allergies")}
                        {renderDropdown("Physical Condition", "physicalCondition", physical_condition_data, "Select condition")}
                    </>
                ))}

                {/* Emergency Contact Section */}
                {renderSection("Emergency Contacts", (
                    <>
                        <Text style={registrationformstyles.subsectionTitle}>Primary Contact</Text>
                        {renderTwoColumnInputs(
                            renderInput("Contact Name", "emergencyContact1Name", "Enter name"),
                            renderInput("Phone Number", "emergencyContact1Phone", "Enter phone", false, 'phone-pad')
                        )}

                        <Text style={registrationformstyles.subsectionTitle}>Secondary Contact</Text>
                        {renderTwoColumnInputs(
                            renderInput("Contact Name", "emergencyContact2Name", "Enter name"),
                            renderInput("Phone Number", "emergencyContact2Phone", "Enter phone", false, 'phone-pad')
                        )}
                    </>
                ))}

                {/* Grooming Section */}
                {renderSection("Grooming Preferences", (
                    <>
                        {renderCheckboxGroup(
                            "Grooming Service",
                            "If time allows would you like us to bathe or groom your pet before pick up?",
                            "Yes", "No", "groomingYes", "groomingNo"
                        )}

                        {renderCheckboxGroup(
                            "Previous Grooming",
                            "Have we groomed your pet before?",
                            "Yes", "No", "previousGroomingYes", "previousGroomingNo"
                        )}

                        {renderInput("Grooming Description", "description", "If yes, same as previously or describe changes. If no, use groomer's discretion or describe preferences.", true)}
                    </>
                ))}

                {/* Vaccination Section */}
                {renderSection("Vaccination Records", (
                    <>
                        <View style={registrationformstyles.vaccinationHeader}>
                            <Text style={registrationformstyles.subsectionTitle}>Vaccination Status</Text>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate("AddVaccination")}
                                style={registrationformstyles.addVaccinationButton}
                            >
                                <MaterialIcons name="add" size={18} color="#58B9D0" />
                                <Text style={registrationformstyles.addVaccinationText}>Add Vaccination</Text>
                            </TouchableOpacity>
                        </View>

                        {renderVaccinationCard("Leptospirosis vaccine", "02.12.2024")}
                        {renderVaccinationCard("Rabies vaccine", "15.11.2024")}
                        {renderVaccinationCard("DHPP vaccine", "28.10.2024")}
                    </>
                ))}

                {/* Terms and Conditions Section */}
                {renderSection("Terms & Conditions", (
                    <View style={registrationformstyles.termsContainer}>
                        <Text style={registrationformstyles.termsTitle}>Please read this carefully</Text>
                        <Text style={registrationformstyles.termsText}>
                            It affects any rights you may have if you, your dog(s), or anybody bring along to day-care are injured or otherwise suffer damages while participating in doggy day-care and boarding at Petjio Creche. It also states your responsibilities regarding fees and expectations associated with doggy day-care and boarding at Petjio Creche.
                        </Text>
                        <Text style={registrationformstyles.termsText}>
                            I, __________(guardians of the dog(s)), hereby agree to the following covenants described below regarding the doggy care and boarding at Petjio Creche.
                        </Text>
                        <Text style={registrationformstyles.termsHighlight}>
                            Key Points:
                        </Text>
                        <Text style={registrationformstyles.termsText}>
                            • Participation in doggy day-care and boarding is voluntary
                        </Text>
                        <Text style={registrationformstyles.termsText}>
                            • We reserve the right to excuse any dog for negative behavior
                        </Text>
                        <Text style={registrationformstyles.termsText}>
                            • No refund will be given for behavioral issues
                        </Text>
                        <Text style={registrationformstyles.termsText}>
                            • We evaluate and supervise to the best of our ability
                        </Text>
                    </View>
                ))}
            </ScrollView>

            {/* Fixed Bottom Buttons */}
            <View style={registrationformstyles.bottomButtonsContainer}>
                <TouchableOpacity style={registrationformstyles.downloadButton}>
                    <MaterialIcons name="file-download" size={20} color="#58B9D0" />
                    <Text style={registrationformstyles.downloadButtonText}>Download PDF</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    onPress={() => navigation.navigate("BookBoarder")}
                    style={registrationformstyles.continueButton}
                >
                    <LinearGradient
                        colors={['#58B9D0', '#4A9BC2']}
                        style={registrationformstyles.continueButtonGradient}
                    >
                        <Text style={registrationformstyles.continueButtonText}>Save & Continue</Text>
                        <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BoardingRegistrationform;



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

const BoardingRegistrationform: React.FC<BoardingFormProps> = ({navigation}) => {

    const [country, setCountry] = useState<string>('1');
    const [dogtreat, setDogtreat] = useState<string>('1');
    const [dogdiet, setDogdiet] = useState<string>('1');
    const [allergies,setAllergies] = useState<string>('1');
    const [physicalcondition,setPhysicalcondition] = useState<string>('1');

    return (
        <View style={registrationformstyles.container}>
            <View>  
              <View style={registrationformstyles.relative}>
              <View style={registrationformstyles.positionDateTimeIcon}>
                        <TouchableOpacity
                            onPress={() =>navigation.navigate('BoardingDetails')}
                            >
                            <View style={registrationformstyles.flexGap}>
                                <Image
                                    source={Icons.LeftArrow}
                                    style={registrationformstyles.iconColor}
                                />
                                <Text style={registrationformstyles.textDateTime}>
                                  Boarding Registration form
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {/* <View>
                        <Text style={registrationformstyles.selectDateText}>
                          Pet Details
                        </Text>
                    </View> */}
                </View>
                </View>
                <ScrollView contentContainerStyle={registrationformstyles.dropdownMarginTop} showsVerticalScrollIndicator={false}>
                <View>
                       <Text style={registrationformstyles.selectDateText}>
                          Pet Details
                       </Text>
                 </View>
                  <View style={{justifyContent:'center',alignItems:'center',gap:responsiveHeight(0.60)}}>
                  <View style={registrationformstyles.GapTextorlabel}>
                  <Text style={registrationformstyles.petText} >Pet name</Text>
                  <SelectCountry
                      style={registrationformstyles.dropdown}
                      selectedTextStyle={registrationformstyles.selectedTextStyle}
                      placeholderStyle={registrationformstyles.placeholderStyle}
                      imageStyle={registrationformstyles.imageStyle}
                      iconStyle={registrationformstyles.iconStyle}
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
                 <View style={registrationformstyles.GapTextorlabel}>
                 <Text style={registrationformstyles.petText} >Breed</Text>
                 <SelectCountry
                    style={registrationformstyles.dropdown}
                    selectedTextStyle={registrationformstyles.selectedTextStyle}
                    placeholderStyle={registrationformstyles.placeholderStyle}
                    imageStyle={registrationformstyles.imageStyle}
                    iconStyle={registrationformstyles.iconStyle}
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
                 <View style={registrationformstyles.GapTextorlabel}>
                 <Text style={registrationformstyles.petText}>Breed Category</Text>
                 <SelectCountry
                    style={registrationformstyles.dropdown}
                    selectedTextStyle={registrationformstyles.selectedTextStyle}
                    placeholderStyle={registrationformstyles.placeholderStyle}
                    imageStyle={registrationformstyles.imageStyle}
                    iconStyle={registrationformstyles.iconStyle}
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
                 <View style={registrationformstyles.divideTextInputField}>
                    <View style={registrationformstyles.GapTextorlabel}>
                        <Text style={registrationformstyles.petText}>Age</Text>
                        <TextInput style={registrationformstyles.DivideTextInputField}/>
                    </View>
                    <View style={registrationformstyles.GapTextorlabel}>
                        <Text style={registrationformstyles.petText}>Weight</Text>
                        <TextInput style={registrationformstyles.DivideTextInputField}/>
                    </View>
                 </View>
                 <View style={registrationformstyles.GapTextorlabel}>
                        <Text style={registrationformstyles.petText}>Owner’s name</Text>
                        <TextInput style={registrationformstyles.TextInputField}/>
                  </View>
                  <View style={registrationformstyles.GapTextorlabel}>
                        <Text style={registrationformstyles.petText}>Owner’s Phone no.</Text>
                        <TextInput style={registrationformstyles.TextInputField}/>
                  </View>
                  <View style={registrationformstyles.GapTextorlabel}>
                        <Text style={registrationformstyles.petText}>Alternate Phone no.</Text>
                        <TextInput style={registrationformstyles.TextInputField}/>
                  </View>
                  <View style={registrationformstyles.GapTextorlabel}>
                        <Text style={registrationformstyles.petText}>Email Id.</Text>
                        <TextInput style={registrationformstyles.TextInputField}/>
                  </View>

                  <View style={registrationformstyles.divideTextInputField}>
                  <View style={registrationformstyles.GapTextorlabel}>
                  <Text style={registrationformstyles.petText}>State</Text>
                  <SelectCountry
                    style={registrationformstyles.dividedropdown}
                    selectedTextStyle={registrationformstyles.selectedTextStyle}
                    placeholderStyle={registrationformstyles.placeholderStyle}
                    imageStyle={registrationformstyles.imageStyle}
                    iconStyle={registrationformstyles.iconStyle}
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
                 <View style={registrationformstyles.GapTextorlabel}>
                 <Text style={registrationformstyles.petText}>City</Text>
                 <SelectCountry
                    style={registrationformstyles.dividedropdown}
                    selectedTextStyle={registrationformstyles.selectedTextStyle}
                    placeholderStyle={registrationformstyles.placeholderStyle}
                    imageStyle={registrationformstyles.imageStyle}
                    iconStyle={registrationformstyles.iconStyle}
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

                 <View style={registrationformstyles.addressTextView}>
                        <Text style={registrationformstyles.petText}>Address.</Text>
                        <TextInput style={registrationformstyles.TextInputField}/>
                 </View>

                 <View style={registrationformstyles.divideTextInputField}>
                    <View style={registrationformstyles.addressTextView}>
                        <Text style={registrationformstyles.petText}>Arrival Date</Text>
                        <TextInput style={registrationformstyles.DivideTextInputField}/>
                    </View>
                    <View style={registrationformstyles.addressTextView}>
                        <Text style={registrationformstyles.petText}>Departure Date</Text>
                        <TextInput style={registrationformstyles.DivideTextInputField}/>
                    </View>
                 </View>

                 <View style={registrationformstyles.addressTextView}>
                        <Text style={registrationformstyles.petText}>Personal Possessions</Text>
                        <TextInput style={registrationformstyles.TextInputField}/>
                 </View>

                 <View style={registrationformstyles.addressTextView}>
                 <Text style={registrationformstyles.petText}>Daily Feeds</Text>
                 <SelectCountry
                    style={registrationformstyles.dropdown}
                    selectedTextStyle={registrationformstyles.selectedTextStyle}
                    placeholderStyle={registrationformstyles.placeholderStyle}
                    imageStyle={registrationformstyles.imageStyle}
                    iconStyle={registrationformstyles.iconStyle}
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
                    <View style={registrationformstyles.addressTextView}>
                      <Text style={registrationformstyles.petText}>Quantity</Text>
                      <SelectCountry
                        style={registrationformstyles.dropdown}
                        selectedTextStyle={registrationformstyles.selectedTextStyle}
                        placeholderStyle={registrationformstyles.placeholderStyle}
                        imageStyle={registrationformstyles.imageStyle}
                        iconStyle={registrationformstyles.iconStyle}
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
                  <View style={registrationformstyles.addressTextView}>
                        <Text style={registrationformstyles.petText}>Treats.</Text>
                        <TextInput style={registrationformstyles.TreatsTextInputField}/>
                 </View>

                 <View style={registrationformstyles.addressTextView}>
                 <View style={registrationformstyles.divideTextInputField}>
                  <View style={registrationformstyles.GapTextorlabel}>
                  <Text style={registrationformstyles.petText}>Dog Treats/Dog Cookies</Text>
                  <SelectCountry
                    style={registrationformstyles.dividedropdown}
                    selectedTextStyle={registrationformstyles.selectedTextStyle}
                    placeholderStyle={registrationformstyles.placeholderStyle}
                    imageStyle={registrationformstyles.imageStyle}
                    iconStyle={registrationformstyles.iconStyle}
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
                 <View style={registrationformstyles.GapTextorlabel}>
                 <Text style={registrationformstyles.petText}>Bland Diet</Text>
                 <SelectCountry
                    style={registrationformstyles.dividedropdown}
                    selectedTextStyle={registrationformstyles.selectedTextStyle}
                    placeholderStyle={registrationformstyles.placeholderStyle}
                    imageStyle={registrationformstyles.imageStyle}
                    iconStyle={registrationformstyles.iconStyle}
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
                 <View style={registrationformstyles.addressTextView}>
                      <Text style={registrationformstyles.petText}>Allergies</Text>
                      <SelectCountry
                        style={registrationformstyles.dropdown}
                        selectedTextStyle={registrationformstyles.selectedTextStyle}
                        placeholderStyle={registrationformstyles.placeholderStyle}
                        imageStyle={registrationformstyles.imageStyle}
                        iconStyle={registrationformstyles.iconStyle}
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
                    {/* <View style={registrationformstyles.addressTextView}>
                      <Text style={registrationformstyles.petText}>Physical Condition</Text>
                      <SelectCountry
                        style={registrationformstyles.dropdown}
                        selectedTextStyle={registrationformstyles.selectedTextStyle}
                        placeholderStyle={registrationformstyles.placeholderStyle}
                        imageStyle={registrationformstyles.imageStyle}
                        iconStyle={registrationformstyles.iconStyle}
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
                    <View style={registrationformstyles.addressTextView}>
                      <Text style={registrationformstyles.petText}>Physical Condition</Text>
                      <SelectCountry
                        style={registrationformstyles.dropdown}
                        selectedTextStyle={registrationformstyles.selectedTextStyle}
                        placeholderStyle={registrationformstyles.placeholderStyle}
                        imageStyle={registrationformstyles.imageStyle}
                        iconStyle={registrationformstyles.iconStyle}
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
                       <View style={registrationformstyles.divideTextInputField}>
                          <View style={registrationformstyles.GapTextorlabel}>
                              <Text style={registrationformstyles.petText}>Contact name</Text>
                              <TextInput style={registrationformstyles.DivideTextInputField}/>
                          </View>
                          <View style={registrationformstyles.GapTextorlabel}>
                              <Text style={registrationformstyles.petText}>Phone No.</Text>
                              <TextInput style={registrationformstyles.DivideTextInputField}/>
                          </View>
                     </View>
                     <View style={registrationformstyles.divideTextInputField}>
                          <View style={registrationformstyles.GapTextorlabel}>
                              <Text style={registrationformstyles.petText}>Contact name</Text>
                              <TextInput style={registrationformstyles.DivideTextInputField}/>
                          </View>
                          <View style={registrationformstyles.GapTextorlabel}>
                              <Text style={registrationformstyles.petText}>Phone No.</Text>
                              <TextInput style={registrationformstyles.DivideTextInputField}/>
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
                   <View style={registrationformstyles.addressTextView}>
                        <Text style={registrationformstyles.petText}>Description</Text>
                        <TextInput style={registrationformstyles.TreatsTextInputField}/>
                  </View>
                  <Text style={registrationformstyles.descriptionText}>If yes, same as previously, Make some changes. If no, use groomer's discretion, or describe what would you like. </Text>
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
                    <View style={registrationformstyles.vaccinationView}>
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
                    <View style={registrationformstyles.vaccinationView}>
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
                    <View style={registrationformstyles.vaccinationView}>
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
            <View style={registrationformstyles.fixedButtonContainer}>
                <TouchableOpacity
                    // onPress={() => navigation.navigate('HomeService')}
                    style={registrationformstyles.nextBtnContainer}>
                    <View style={registrationformstyles.divideTextInputField}>
                    <View style={registrationformstyles.borderRadiousBtn}>
                        <Text style={registrationformstyles.ButtonText}>Download Pdf</Text>
                       
                    </View>
                    <TouchableOpacity
                     onPress={()=>navigation.navigate("BookBoarder")}
                    >
                        <View style={registrationformstyles.selectedborderRadiousBtn}>
                        <Text style={registrationformstyles.selectedButtonText}>Save & Continue</Text>
                    </View>
                    </TouchableOpacity>
                    
                 </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BoardingRegistrationform;
