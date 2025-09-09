import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, StatusBar, Platform } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import registrationformstyles from './registrationform_new.styles';
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
