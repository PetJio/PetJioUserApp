import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, StatusBar, Platform, ActivityIndicator, Modal, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import registrationformstyles from './registrationform_new.styles';
import CheckBox from 'react-native-check-box';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { Dropdown } from 'react-native-element-dropdown';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { API_CONFIG } from '../../config/api';
import { storageService } from '../../utils/storage';
import BoardingHeader from '../../components/BoardingHeader/BoardingHeader';

// Pet interfaces - same as Home page
interface PetCategory {
  id: number;
  catName: string;
}

interface PetSize {
  id: number;
  size: string;
}

interface PetGender {
  id: number;
  name: string;
}

interface PetProfile {
  id: number;
  petName: string;
  ageInYears: number | null;
  ageInMonths: number | null;
  category: PetCategory;
  size: PetSize;
  height: string | null;
  profileImg: string | null;
  gender: PetGender;
  weight: string | null;
  dailyFeedCount: number | null;
  treats: string | null;
  cookie: string | null;
}

interface PetApiResponse {
  statusCode: number;
  message: string;
  body: PetProfile[];
}

// Define your navigation stack's param list
interface RootStackParamList {
    PetParentform: undefined;
    Main: undefined;
    PetWarriorform: undefined;
    DeliveryPartnerform: undefined;
    ServiceProviderform: undefined;
    SignIn: undefined;
    BoardingDetails: undefined;
    AddVaccination: undefined;
    BookBoarder: undefined;
}

// Define props interface for the component
interface BoardingFormProps {}

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

const BoardingRegistrationform: React.FC<BoardingFormProps> = () => {
    const navigation = useNavigation();
    
    // Pet fetching state
    const [pets, setPets] = useState<PetProfile[]>([]);
    const [loadingPets, setLoadingPets] = useState(false);
    const [petsError, setPetsError] = useState<string | null>(null);
    const [selectedPet, setSelectedPet] = useState<PetProfile | null>(null);
    
    const [formData, setFormData] = useState({
        petName: '',
        breed: '',
        category: '',
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

    // Bottom sheet states
    const [petModalVisible, setPetModalVisible] = useState(false);
    const [stateModalVisible, setStateModalVisible] = useState(false);
    const [cityModalVisible, setCityModalVisible] = useState(false);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCheckboxChange = (field: string, value: boolean) => {
        setCheckboxStates(prev => ({ ...prev, [field]: value }));
    };

    // Pet fetching functions - same as Home page
    const getAuthToken = async () => {
        try {
            return await storageService.getUserToken();
        } catch (error) {
            console.error('Error getting auth token:', error);
            return null;
        }
    };

    const getOwnerIdFromAPI = async () => {
        try {
            const token = await getAuthToken();
            if (!token) {
                console.error('No authentication token found');
                return null;
            }

            console.log('🚀 BOARDING REGISTRATION DEBUG - Fetching owner data');
            const apiUrl = `${API_CONFIG.BASE_URL}/api/pet-owner/findByUserId`;
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ API Error Response:', errorText);
                return null;
            }

            const responseText = await response.text();
            console.log('📄 Raw Response Text for Boarding Registration:', responseText);

            let data;
            try {
                data = JSON.parse(responseText);
                console.log('✅ Parsed Response Data:', {
                    statusCode: data.statusCode,
                    message: data.message,
                    hasBody: !!data.body,
                    ownerId: data.body?.id,
                });
            } catch (parseError) {
                console.error('❌ JSON Parse Error:', parseError);
                return null;
            }
            
            if (data.statusCode === 200 && data.body?.id) {
                console.log('✅ Owner ID found:', data.body.id);
                return data.body.id;
            } else {
                console.error('❌ API returned non-200 status or no owner ID found');
                return null;
            }
        } catch (error) {
            console.error('🔥 Critical Error in getOwnerIdFromAPI:', error);
            return null;
        }
    };

    const fetchPets = async () => {
        setLoadingPets(true);
        setPetsError(null);
        
        try {
            console.log('🔍 BOARDING REGISTRATION PETS DEBUG - Starting pets fetch');
            
            const token = await getAuthToken();
            if (!token) {
                console.error('❌ No authentication token found');
                setPetsError('Authentication token not found. Please login again.');
                return;
            }

            // Get the owner ID from API
            const ownerId = await getOwnerIdFromAPI();
            if (!ownerId) {
                console.error('❌ No owner ID found');
                setPetsError('Owner ID not found. Please try refreshing the page.');
                return;
            }

            console.log('🚀 FETCHING PETS - Starting pet profiles fetch');
            console.log('🔑 Using Owner ID:', ownerId);

            const apiUrl = `${API_CONFIG.BASE_URL}/api/pet-profile/owner/${ownerId}`;
            console.log('🌐 Pet Profiles Request URL:', apiUrl);

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('📥 Pet Profiles Response Status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ Pet Profiles API Error:', errorText);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const responseText = await response.text();
            console.log('📄 Pet Profiles Raw Response Text:', responseText);

            let result: PetApiResponse;
            try {
                result = JSON.parse(responseText);
                console.log('✅ Pet Profiles Parsed Response:', {
                    statusCode: result.statusCode,
                    message: result.message,
                    petCount: result.body ? result.body.length : 0,
                    petNames: result.body ? result.body.map(pet => pet.petName) : [],
                });
            } catch (parseError) {
                console.error('❌ Pet Profiles JSON Parse Error:', parseError);
                throw new Error(`Invalid JSON response: ${responseText}`);
            }
            
            if (result.statusCode === 200) {
                console.log('✅ Pet Profiles Success - Data loaded:', result.body);
                console.log('📋 FIRST PET DETAILS:', result.body?.[0]);
                console.log('📊 PET NAMES:', result.body?.map(pet => pet.petName));
                setPets(result.body || []);
            } else {
                console.error('❌ Pet Profiles API returned non-200 status:', result.statusCode);
                throw new Error(result.message || 'Failed to fetch pet profiles');
            }
        } catch (error) {
            console.error('🔥 Critical Error in fetchPets:', error);
            setPetsError(`Failed to load pets: ${error.message}`);
        } finally {
            console.log('🏁 fetchPets completed');
            setLoadingPets(false);
        }
    };

    const handlePetSelection = (petId: string) => {
        const pet = pets.find(p => p.id.toString() === petId);
        if (pet) {
            setSelectedPet(pet);
            
            // Log the complete pet object to understand the structure
            console.log('🔍 COMPLETE PET DATA RECEIVED:', JSON.stringify(pet, null, 2));
            console.log('🔍 INDIVIDUAL PROPERTIES:');
            console.log('  - ID:', pet.id);
            console.log('  - Name:', pet.petName);
            console.log('  - Age (Years):', pet.ageInYears);
            console.log('  - Age (Months):', pet.ageInMonths);
            console.log('  - Category:', pet.category);
            console.log('  - Size:', pet.size);
            console.log('  - Gender:', pet.gender);
            console.log('  - Height:', pet.height);
            console.log('  - Weight:', pet.weight);
            console.log('  - Daily Feed Count:', pet.dailyFeedCount);
            console.log('  - Treats:', pet.treats);
            console.log('  - Cookie:', pet.cookie);
            
            // Auto-fill form fields with proper mapping
            const ageText = pet.ageInYears ? `${pet.ageInYears} years` : 
                           pet.ageInMonths ? `${pet.ageInMonths} months` : '';
                           
            setFormData(prev => ({
                ...prev,
                petName: petId,
                breed: pet.category?.catName || '',
                category: pet.size?.size || '',
                age: ageText,
                weight: pet.weight || '',
                dailyFeeds: pet.dailyFeedCount?.toString() || '1',
                treats: pet.treats || '',
            }));
            
            console.log('🐕 Pet selected:', pet.petName);
            console.log('📋 Auto-filled form data:', {
                petName: petId,
                breed: pet.category?.catName || 'N/A',
                category: pet.size?.size || 'N/A',
                age: ageText || 'N/A',
                weight: pet.weight || 'N/A',
                dailyFeeds: pet.dailyFeedCount?.toString() || '1',
                treats: pet.treats || 'N/A',
            });
        } else {
            console.error('❌ Pet not found with ID:', petId);
        }
    };

    // Fetch pets on component mount
    useEffect(() => {
        fetchPets();
    }, []);

    // Transform pets data for dropdown
    const getPetsDropdownData = () => {
        console.log('🔍 DROPDOWN DATA DEBUG - Raw pets:', pets);
        
        if (!pets.length) {
            console.log('❌ No pets available for dropdown');
            return [];
        }
        
        const dropdownData = pets.map(pet => ({
            value: pet.id.toString(),
            lable: pet.petName, // Note: keeping "lable" typo for consistency with existing dropdown structure
        }));
        
        console.log('✅ DROPDOWN DATA FORMATTED:', dropdownData);
        return dropdownData;
    };

    // Get breed data for selected pet or default data
    const getBreedDropdownData = () => {
        if (selectedPet && selectedPet.category?.catName) {
            return [{ 
                value: selectedPet.category.catName, 
                lable: selectedPet.category.catName 
            }];
        }
        return bella_data;
    };

    // Get category data for selected pet or default data  
    const getCategoryDropdownData = () => {
        if (selectedPet && selectedPet.size?.size) {
            return [{ 
                value: selectedPet.size.size, 
                lable: selectedPet.size.size 
            }];
        }
        return category_data;
    };

    // Get daily feeds data for selected pet or default data
    const getDailyFeedsDropdownData = () => {
        if (selectedPet && selectedPet.dailyFeedCount) {
            const feedCount = selectedPet.dailyFeedCount.toString();
            const feedLabel = `${feedCount} time${selectedPet.dailyFeedCount > 1 ? 's' : ''}`;
            return [{ 
                value: feedCount, 
                lable: feedLabel 
            }];
        }
        return daily_feeds_data;
    };

    // Create specialized pet dropdown with loading/error states
    const renderPetDropdown = (label: string, field: string, placeholder: string = 'Select pet') => (
        <View style={registrationformstyles.inputContainer}>
            <Text style={registrationformstyles.inputLabel}>{label}</Text>
            {loadingPets ? (
                <View style={[registrationformstyles.dropdown, { justifyContent: 'center', alignItems: 'center', height: 50, flexDirection: 'row' }]}>
                    <ActivityIndicator size="small" color="#58B9D0" />
                    <Text style={{ marginLeft: 8, color: '#666' }}>Loading pets...</Text>
                </View>
            ) : petsError ? (
                <TouchableOpacity 
                    style={[registrationformstyles.dropdown, { justifyContent: 'center', height: 50, backgroundColor: '#FFF5F5' }]}
                    onPress={fetchPets}
                >
                    <Text style={{ color: '#FF6B6B', textAlign: 'center', fontSize: 12 }}>
                        {petsError}
                    </Text>
                    <Text style={{ color: '#58B9D0', textAlign: 'center', fontSize: 11, marginTop: 2 }}>
                        Tap to retry
                    </Text>
                </TouchableOpacity>
            ) : (
                <Dropdown
                    style={registrationformstyles.dropdown}
                    selectedTextStyle={registrationformstyles.selectedTextStyle}
                    placeholderStyle={registrationformstyles.placeholderStyle}
                    iconStyle={registrationformstyles.iconStyle}
                    maxHeight={200}
                    value={formData[field as keyof typeof formData]}
                    data={getPetsDropdownData()}
                    valueField="value"
                    labelField="lable"
                    placeholder={getPetsDropdownData().length ? placeholder : 'No pets found'}
                    searchPlaceholder="Search pets..."
                    search={true}
                    renderItem={(item) => {
                        console.log('🎨 RENDERING DROPDOWN ITEM:', item);
                        return (
                            <TouchableOpacity style={{
                                padding: 15,
                                borderBottomWidth: 1,
                                borderBottomColor: '#F0F0F0',
                                backgroundColor: '#FFFFFF'
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: '#333',
                                    fontWeight: '500'
                                }}>
                                    {item.lable || 'Unnamed Pet'}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                    onChange={(e) => {
                        console.log('🐕 DROPDOWN SELECTION DEBUG:', e);
                        console.log('🔍 Selected pet ID:', e.value);
                        console.log('🔍 Selected pet name:', e.lable);
                        console.log('🔍 Current form data before change:', formData[field]);
                        
                        handleInputChange(field, e.value);
                        handlePetSelection(e.value);
                    }}
                    disable={getPetsDropdownData().length === 0}
                    onFocus={() => console.log('🔍 DROPDOWN FOCUSED - Available data:', getPetsDropdownData())}
                />
            )}
        </View>
    );

    // Create enhanced dropdown for auto-filled fields
    const renderAutoFillDropdown = (label: string, field: string, data: any[], placeholder: string, isAutoFilled: boolean = false) => (
        <View style={registrationformstyles.inputContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <Text style={registrationformstyles.inputLabel}>{label}</Text>
                {isAutoFilled && (
                    <View style={{ 
                        backgroundColor: '#E8F5E8', 
                        paddingHorizontal: 6, 
                        paddingVertical: 2, 
                        borderRadius: 8, 
                        marginLeft: 8 
                    }}>
                        <Text style={{ fontSize: 9, color: '#4CAF50', fontWeight: '600' }}>AUTO-FILLED</Text>
                    </View>
                )}
            </View>
            <Dropdown
                style={[registrationformstyles.dropdown, isAutoFilled && { backgroundColor: '#FAFCFF', borderColor: '#58B9D0' }]}
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
                disable={isAutoFilled}
            />
        </View>
    );

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

    // Create auto-filled input field that's disabled
    const renderAutoFilledInput = (label: string, field: string, placeholder: string, isAutoFilled: boolean = false, multiline: boolean = false, keyboardType: any = 'default') => (
        <View style={registrationformstyles.inputContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <Text style={registrationformstyles.inputLabel}>{label}</Text>
                {isAutoFilled && (
                    <View style={{ 
                        backgroundColor: '#E8F5E8', 
                        paddingHorizontal: 6, 
                        paddingVertical: 2, 
                        borderRadius: 8, 
                        marginLeft: 8 
                    }}>
                        <Text style={{ fontSize: 9, color: '#4CAF50', fontWeight: '600' }}>AUTO-FILLED</Text>
                    </View>
                )}
            </View>
            <TextInput
                style={[
                    registrationformstyles.textInput,
                    multiline && registrationformstyles.textInputMultiline,
                    isAutoFilled && { 
                        backgroundColor: '#FAFCFF', 
                        borderColor: '#58B9D0',
                        color: '#666'
                    }
                ]}
                placeholder={isAutoFilled ? 'Auto-filled from pet data' : placeholder}
                placeholderTextColor={isAutoFilled ? '#58B9D0' : '#A0A3BD'}
                value={formData[field as keyof typeof formData] as string}
                onChangeText={(text) => !isAutoFilled && handleInputChange(field, text)}
                multiline={multiline}
                numberOfLines={multiline ? 3 : 1}
                keyboardType={keyboardType}
                editable={!isAutoFilled}
                selectTextOnFocus={!isAutoFilled}
            />
        </View>
    );

    const renderDropdown = (label: string, field: string, data: any[], placeholder: string = 'Select option') => (
        <View style={registrationformstyles.inputContainer}>
            <Text style={registrationformstyles.inputLabel}>{label}</Text>
            <Dropdown
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

    // Bottom Sheet Components
    const renderPetBottomSheet = () => (
        <Modal
            visible={petModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setPetModalVisible(false)}
        >
            <TouchableOpacity 
                style={registrationformstyles.bottomSheetOverlay}
                activeOpacity={1}
                onPress={() => setPetModalVisible(false)}
            >
                <TouchableOpacity 
                    style={registrationformstyles.bottomSheetContainer}
                    activeOpacity={1}
                    onPress={() => {}}
                >
                    <View style={registrationformstyles.bottomSheetHeader}>
                        <Text style={registrationformstyles.bottomSheetTitle}>Select Pet</Text>
                        <TouchableOpacity 
                            onPress={() => setPetModalVisible(false)}
                            style={registrationformstyles.bottomSheetCloseButton}
                        >
                            <MaterialIcons name="close" size={20} color="#666" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={registrationformstyles.bottomSheetContent}>
                        {pets.map((pet, index) => (
                            <TouchableOpacity
                                key={pet.id}
                                style={[
                                    registrationformstyles.bottomSheetItem,
                                    selectedPet?.id === pet.id && registrationformstyles.bottomSheetSelectedItem
                                ]}
                                onPress={() => {
                                    handlePetSelection(pet.id.toString());
                                    setPetModalVisible(false);
                                }}
                            >
                                <Text style={[
                                    registrationformstyles.bottomSheetItemText,
                                    selectedPet?.id === pet.id && registrationformstyles.bottomSheetSelectedText
                                ]}>
                                    {pet.petName}
                                </Text>
                                {selectedPet?.id === pet.id && (
                                    <MaterialIcons name="check" size={20} color="#58B9D0" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );

    const renderStateBottomSheet = () => (
        <Modal
            visible={stateModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setStateModalVisible(false)}
        >
            <TouchableOpacity 
                style={registrationformstyles.bottomSheetOverlay}
                activeOpacity={1}
                onPress={() => setStateModalVisible(false)}
            >
                <TouchableOpacity 
                    style={registrationformstyles.bottomSheetContainer}
                    activeOpacity={1}
                    onPress={() => {}}
                >
                    <View style={registrationformstyles.bottomSheetHeader}>
                        <Text style={registrationformstyles.bottomSheetTitle}>Select State</Text>
                        <TouchableOpacity 
                            onPress={() => setStateModalVisible(false)}
                            style={registrationformstyles.bottomSheetCloseButton}
                        >
                            <MaterialIcons name="close" size={20} color="#666" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={registrationformstyles.bottomSheetContent}>
                        {state_data.map((state, index) => (
                            <TouchableOpacity
                                key={state.value}
                                style={[
                                    registrationformstyles.bottomSheetItem,
                                    formData.state === state.lable && registrationformstyles.bottomSheetSelectedItem
                                ]}
                                onPress={() => {
                                    handleInputChange('state', state.lable);
                                    setStateModalVisible(false);
                                }}
                            >
                                <Text style={[
                                    registrationformstyles.bottomSheetItemText,
                                    formData.state === state.lable && registrationformstyles.bottomSheetSelectedText
                                ]}>
                                    {state.lable}
                                </Text>
                                {formData.state === state.lable && (
                                    <MaterialIcons name="check" size={20} color="#58B9D0" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );

    const renderCityBottomSheet = () => (
        <Modal
            visible={cityModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setCityModalVisible(false)}
        >
            <TouchableOpacity 
                style={registrationformstyles.bottomSheetOverlay}
                activeOpacity={1}
                onPress={() => setCityModalVisible(false)}
            >
                <TouchableOpacity 
                    style={registrationformstyles.bottomSheetContainer}
                    activeOpacity={1}
                    onPress={() => {}}
                >
                    <View style={registrationformstyles.bottomSheetHeader}>
                        <Text style={registrationformstyles.bottomSheetTitle}>Select City</Text>
                        <TouchableOpacity 
                            onPress={() => setCityModalVisible(false)}
                            style={registrationformstyles.bottomSheetCloseButton}
                        >
                            <MaterialIcons name="close" size={20} color="#666" />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={registrationformstyles.bottomSheetContent}>
                        {city_data.map((city, index) => (
                            <TouchableOpacity
                                key={city.value}
                                style={[
                                    registrationformstyles.bottomSheetItem,
                                    formData.city === city.lable && registrationformstyles.bottomSheetSelectedItem
                                ]}
                                onPress={() => {
                                    handleInputChange('city', city.lable);
                                    setCityModalVisible(false);
                                }}
                            >
                                <Text style={[
                                    registrationformstyles.bottomSheetItemText,
                                    formData.city === city.lable && registrationformstyles.bottomSheetSelectedText
                                ]}>
                                    {city.lable}
                                </Text>
                                {formData.city === city.lable && (
                                    <MaterialIcons name="check" size={20} color="#58B9D0" />
                                )}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );

    return (
        <View style={registrationformstyles.container}>
            <BoardingHeader 
                title="Boarding Registration"
                subtitle="Complete your pet's boarding details"
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView 
                style={registrationformstyles.scrollContainer}
                contentContainerStyle={registrationformstyles.scrollContentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Pet Details Section */}
                {renderSection("Pet Details", (
                    <>
                        {/* Pet Name Selection with Bottom Sheet */}
                        <View style={registrationformstyles.inputContainer}>
                            <Text style={registrationformstyles.inputLabel}>Pet Name</Text>
                            <TouchableOpacity
                                style={[
                                    registrationformstyles.textInput,
                                    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
                                ]}
                                onPress={() => setPetModalVisible(true)}
                            >
                                <Text style={[
                                    { fontSize: 16, color: '#1A1D29' },
                                    !selectedPet && { color: '#999' }
                                ]}>
                                    {selectedPet ? selectedPet.petName : 'Select your pet'}
                                </Text>
                                <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>
                        {renderAutoFillDropdown("Breed", "breed", getBreedDropdownData(), selectedPet ? "Auto-filled from pet data" : "Select breed", !!selectedPet)}
                        {renderAutoFillDropdown("Breed Category", "category", getCategoryDropdownData(), selectedPet ? "Auto-filled from pet data" : "Select category", !!selectedPet)}
                        
                        {renderAutoFilledInput("Age", "age", "Enter age", !!selectedPet && !!(selectedPet.ageInYears || selectedPet.ageInMonths), false, 'numeric')}
                        {renderAutoFilledInput("Weight", "weight", "Enter weight", !!selectedPet && !!selectedPet.weight, false, 'numeric')}

                        {renderInput("Owner's Name", "ownerName", "Enter owner's name")}
                        {renderInput("Owner's Phone", "ownerPhone", "Enter phone number", false, 'phone-pad')}
                        {renderInput("Alternate Phone", "alternatePhone", "Enter alternate number", false, 'phone-pad')}
                        {renderInput("Email ID", "email", "Enter email address", false, 'email-address')}

                        {/* State Selection with Bottom Sheet */}
                        <View style={registrationformstyles.inputContainer}>
                            <Text style={registrationformstyles.inputLabel}>State</Text>
                            <TouchableOpacity
                                style={[
                                    registrationformstyles.textInput,
                                    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
                                ]}
                                onPress={() => setStateModalVisible(true)}
                            >
                                <Text style={[
                                    { fontSize: 16, color: '#1A1D29' },
                                    !formData.state && { color: '#999' }
                                ]}>
                                    {formData.state || 'Select state'}
                                </Text>
                                <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        {/* City Selection with Bottom Sheet */}
                        <View style={registrationformstyles.inputContainer}>
                            <Text style={registrationformstyles.inputLabel}>City</Text>
                            <TouchableOpacity
                                style={[
                                    registrationformstyles.textInput,
                                    { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
                                ]}
                                onPress={() => setCityModalVisible(true)}
                            >
                                <Text style={[
                                    { fontSize: 16, color: '#1A1D29' },
                                    !formData.city && { color: '#999' }
                                ]}>
                                    {formData.city || 'Select city'}
                                </Text>
                                <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        {renderInput("Address", "address", "Enter complete address", true)}

                        {renderInput("Arrival Date", "arrivalDate", "DD/MM/YYYY")}
                        {renderInput("Departure Date", "departureDate", "DD/MM/YYYY")}

                        {renderInput("Personal Possessions", "personalPossessions", "Toys, blankets, etc.", true)}
                    </>
                ))}

                {/* Feeding Details Section */}
                {renderSection("Feeding Details", (
                    <>
                        {renderAutoFillDropdown("Daily Feeds", "dailyFeeds", getDailyFeedsDropdownData(), selectedPet && selectedPet.dailyFeedCount ? "Auto-filled from pet data" : "How many times per day", !!selectedPet && !!selectedPet.dailyFeedCount)}
                        {renderDropdown("Quantity per meal", "quantity", quantity_data, "Select quantity")}
                        
                        {renderCheckboxGroup(
                            "Diet Switching",
                            "If we run out of dog's meals, may we switch to our Chicken Based kennel diet? If you prefer to not switch, we will shop for your dog's own diet, for which there will be extra charges (purchase cost plus transportation)",
                            "Yes", "No", "switchDiet", "noSwitchDiet"
                        )}

                        {renderAutoFilledInput("Special Treats", "treats", "Any special treats or food preferences", !!selectedPet && !!selectedPet.treats, true)}

                        {renderDropdown("Dog Treats/Cookies", "dogTreat", dog_treat_data, "Select treats")}
                        {renderDropdown("Bland Diet", "blandDiet", Bland_Diet_data, "Select diet")}

                        {renderDropdown("Allergies", "allergies", allergies_data, "Select allergies")}
                        {renderDropdown("Physical Condition", "physicalCondition", physical_condition_data, "Select condition")}
                    </>
                ))}

                {/* Emergency Contact Section */}
                {renderSection("Emergency Contacts", (
                    <>
                        <Text style={registrationformstyles.subsectionTitle}>Primary Contact</Text>
                        {renderInput("Contact Name", "emergencyContact1Name", "Enter name")}
                        {renderInput("Phone Number", "emergencyContact1Phone", "Enter phone", false, 'phone-pad')}

                        <Text style={registrationformstyles.subsectionTitle}>Secondary Contact</Text>
                        {renderInput("Contact Name", "emergencyContact2Name", "Enter name")}
                        {renderInput("Phone Number", "emergencyContact2Phone", "Enter phone", false, 'phone-pad')}
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

                {/* Vaccination Section - Commented out for now */}
                {/* {renderSection("Vaccination Records", (
                    <>
                        <View style={registrationformstyles.vaccinationHeader}>
                            <Text style={registrationformstyles.subsectionTitle}>Vaccination Status</Text>
                            <TouchableOpacity 
                                onPress={() => (navigation as any).navigate("AddVaccination")}
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
                ))} */}

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
                    <MaterialIcons name="file-download" size={22} color="#58B9D0" />
                    <Text style={registrationformstyles.downloadButtonText}>Download PDF</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    onPress={() => (navigation as any).navigate("BookBoarder")}
                    style={registrationformstyles.continueButton}
                >
                    <Text style={registrationformstyles.continueButtonText}>Save & Continue</Text>
                    <MaterialIcons name="arrow-forward" size={22} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            {/* Bottom Sheet Modals */}
            {renderPetBottomSheet()}
            {renderStateBottomSheet()}
            {renderCityBottomSheet()}
        </View>
    );
};

export default BoardingRegistrationform;
