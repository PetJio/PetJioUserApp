import { useState, useEffect } from 'react';
import { View,Text,Image, FlatList,TouchableOpacity,Modal, Platform, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { API_CONFIG } from '../../config/api';
import { responsiveWidth,responsiveHeight} from 'react-native-responsive-dimensions';
import boardingmodalstyles from './boardingmodal.styles';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PetSelectionSkeleton } from '../../components/SkeletonLoader/SkeletonLoader';



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
     BoardingRegistrationform:undefined;
     BoardingQuestions: {
        startTime?: string;
        endTime?: string;
        mode?: number;
     };
 };
 
 // Define the navigation prop type
 type BoardingModalScreenNavigationProp = any;
 
 // Define props interface for the component
//  interface BoardingModalProps {
//    navigation:BoardingModalScreenNavigationProp;
//  }
 


// Pet interfaces from Home page
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

// Boarding service interfaces
interface BoardingServiceBreed {
  id: number;
  size: string;
}

interface BoardingService {
  id: number;
  breed: BoardingServiceBreed;
  price: number;
  mealPrice: number;
  discount: number;
  backupFoodChange: string;
  extraServiceCharge: string;
}

interface BoardingServiceApiResponse {
  statusCode: number;
  message: string;
  body: BoardingService[];
}

type ModalComponentProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    mode?: number;
    boardingId?: number;
    bordingUserId?: number;
    preSelectedPets?: number[];
};



const BoardingModal: React.FC<Omit<ModalComponentProps, 'navigation'>> = ({modalVisible,setModalVisible, mode, boardingId, bordingUserId, preSelectedPets}) => {
   const navigation = useNavigation<BoardingModalScreenNavigationProp>();
    const [activeTab, setActiveTab] = useState<string>('NormalWalking');
    const [showDateModal, setShowDateModal] = useState<boolean>(false);
    
    // Separate date and time states
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    const [endTime, setEndTime] = useState<Date>(new Date());
    
    // Separate picker states for date and time
    const [showStartDatePicker, setShowStartDatePicker] = useState<boolean>(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState<boolean>(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState<boolean>(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState<boolean>(false);
    const [showStartTimeDropdown, setShowStartTimeDropdown] = useState<boolean>(false);
    const [showEndTimeDropdown, setShowEndTimeDropdown] = useState<boolean>(false);

    // Pet state
    const [pets, setPets] = useState<PetProfile[]>([]);
    const [loadingPets, setLoadingPets] = useState<boolean>(true);
    const [petsError, setPetsError] = useState<string | null>(null);
    const [selectedPets, setSelectedPets] = useState<Set<number>>(new Set());
    
    // Dynamic IDs state
    const [ownerId, setOwnerId] = useState<number | null>(null);
    const [serviceIds, setServiceIds] = useState<number[]>([]);
    
    // Boarding services state
    const [boardingServices, setBoardingServices] = useState<BoardingService[]>([]);
    const [loadingServices, setLoadingServices] = useState<boolean>(true);
    const [servicesError, setServicesError] = useState<string | null>(null);

    console.log(pets, 'petspets')

    const handleTabPress = (tab: string) => {
        setActiveTab(tab);
    };

    const handleConfirm = () => {
        setModalVisible(false);
        setShowDateModal(true);
    };

    const handleDateConfirm = () => {
        // Validate required data before proceeding
        if (selectedPets.size === 0) {
            alert('Please select at least one pet before proceeding.');
            return;
        }
        
        if (!ownerId) {
            alert('Unable to retrieve owner information. Please try again.');
            return;
        }
        
        setShowDateModal(false);
        // Merge date and time to create full datetime ISO strings
        const mergedStartDateTime = mergeDateTime(startDate, startTime);
        const mergedEndDateTime = mergeDateTime(endDate, endTime);
        
        // Convert selected pets Set to array
        const selectedPetIds = Array.from(selectedPets);
        
        // Calculate serviceBookings based on selected pets' sizes
        // Each pet gets one service ID, so serviceBookings will have same count as selectedPetIds
        const serviceBookings: number[] = [];
        selectedPetIds.forEach(petId => {
            const pet = pets.find(p => p.id === petId);
            if (pet) {
                const serviceIdsForPet = getServiceIdsForPetSize(pet.size.size);
                // Take the first available service ID for this pet's size
                if (serviceIdsForPet.length > 0) {
                    serviceBookings.push(serviceIdsForPet[0]);
                } else {
                    // Fallback if no service found for this pet size
                    serviceBookings.push(mode || 9);
                }
            } else {
                // Fallback if pet not found
                serviceBookings.push(mode || 9);
            }
        });

        console.log('🎯 Selected pets and their service mappings:');
        selectedPetIds.forEach((petId, index) => {
            const pet = pets.find(p => p.id === petId);
            console.log(`Pet ${petId} (${pet?.petName}, ${pet?.size.size}) → Service ${serviceBookings[index]}`);
        });
        console.log('📊 Arrays count - selectedPetIds:', selectedPetIds.length, 'serviceBookings:', serviceBookings.length);
        
        // Pass the merged dates, selected pets, and dynamic IDs to BoardingQuestions
        navigation.navigate('BoardingQuestions', {
            startTime: mergedStartDateTime,
            endTime: mergedEndDateTime,
            mode: mode || 9, // Pass the mode, default to 9 (Home Service) if not provided
            selectedPetIds: selectedPetIds,
            petOwnerId: ownerId,
            boardingId: bordingUserId,
            serviceIds: serviceIds.length > 0 ? serviceIds : [mode || 9], // Use serviceIds if available, otherwise use mode
            serviceBookings: serviceBookings.length > 0 ? serviceBookings : [mode || 9], // Use calculated serviceBookings
        });
    };

    const handleDateCancel = () => {
        setShowDateModal(false);
    };

    // Function to merge separate date and time into one datetime
    const mergeDateTime = (date: Date, time: Date) => {
        const combined = new Date(date);
        combined.setHours(time.getHours());
        combined.setMinutes(time.getMinutes());
        combined.setSeconds(0);
        combined.setMilliseconds(0);
        return combined.toISOString();
    };

    // Separate handlers for date and time pickers
    const handleStartDateChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowStartDatePicker(false);
        }

        if (event?.type === 'dismissed') {
            setShowStartDatePicker(false);
            return;
        }

        if (selectedDate) {
            setStartDate(selectedDate);
        }
    };

    const handleStartTimeChange = (event: any, selectedTime?: Date) => {
        if (Platform.OS === 'android') {
            setShowStartTimePicker(false);
        }

        if (event?.type === 'dismissed') {
            setShowStartTimePicker(false);
            return;
        }

        if (selectedTime) {
            setStartTime(selectedTime);
        }
    };

    const handleEndDateChange = (event: any, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowEndDatePicker(false);
        }

        if (event?.type === 'dismissed') {
            setShowEndDatePicker(false);
            return;
        }

        if (selectedDate && selectedDate > startDate) {
            setEndDate(selectedDate);
        }
    };

    const handleEndTimeChange = (event: any, selectedTime?: Date) => {
        if (Platform.OS === 'android') {
            setShowEndTimePicker(false);
        }

        if (event?.type === 'dismissed') {
            setShowEndTimePicker(false);
            return;
        }

        if (selectedTime) {
            setEndTime(selectedTime);
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatTime = (time: Date) => {
        return time.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    // Pet API functions (from Home page)
    const getAuthToken = async () => {
        const possibleTokenKeys = ['token', 'user_token', 'authToken', 'access_token', 'loginToken'];

        for (const key of possibleTokenKeys) {
            const value = await AsyncStorage.getItem(key);
            if (value) {
                try {
                    return JSON.parse(value);
                } catch {
                    return value;
                }
            }
        }
        return null;
    };

    const getOwnerIdFromAPI = async () => {
        try {
            const token = await getAuthToken();
            if (!token) {
                console.error('No authentication token found');
                return null;
            }

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
            const result = JSON.parse(responseText);

            if (result.statusCode === 200) {
                return result.body.id;
            } else {
                console.error('❌ API returned non-200 status:', result.statusCode);
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
            console.log('🔍 BOARDING MODAL PETS DEBUG - Starting pets fetch');

            const token = await getAuthToken();
            if (!token) {
                console.error('❌ No authentication token found');
                setPetsError('Authentication token not found. Please login again.');
                return;
            }

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
                setPets(result.body || []);
                // Don't auto-select pets - let user choose manually
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

    const fetchBoardingServices = async () => {
        if (!boardingId) {
            console.warn('⚠️ No boardingId provided for fetching services');
            setLoadingServices(false);
            return;
        }

        try {
            setLoadingServices(true);
            setServicesError(null);
            
            const token = await getAuthToken();
            if (!token) {
                setServicesError('No authentication token found');
                return;
            }

            console.log('🔍 Fetching boarding services for boardingId:', boardingId);
            const apiUrl = `${API_CONFIG.BASE_URL}/boarding-service/${boardingId}`;

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
                setServicesError('Failed to fetch boarding services');
                return;
            }

            const responseText = await response.text();
            const result: BoardingServiceApiResponse = JSON.parse(responseText);

            if (result.statusCode === 200) {
                console.log('✅ Boarding services fetched successfully:', result.body);
                setBoardingServices(result.body);
                
                // Extract service IDs for the serviceBookings
                const serviceIdsList = result.body.map(service => service.id);
                setServiceIds(serviceIdsList);
                console.log('📋 Service IDs extracted:', serviceIdsList);
            } else {
                console.error('❌ API returned non-200 status:', result.statusCode);
                setServicesError('Failed to fetch boarding services');
            }
        } catch (error: any) {
            console.error('🔥 Critical Error in fetchBoardingServices:', error);
            setServicesError(`Failed to load boarding services: ${error.message}`);
        } finally {
            console.log('🏁 fetchBoardingServices completed');
            setLoadingServices(false);
        }
    };

    // Helper function to check if a pet's size is supported by boarding services
    const isPetSizeSupported = (petSize: string): boolean => {
        return boardingServices.some(service => 
            service.breed.size.toLowerCase() === petSize.toLowerCase()
        );
    };

    // Helper function to get available service IDs for a specific pet size
    const getServiceIdsForPetSize = (petSize: string): number[] => {
        return boardingServices
            .filter(service => service.breed.size.toLowerCase() === petSize.toLowerCase())
            .map(service => service.id);
    };

    const togglePetSelection = (petId: number) => {
        const pet = pets.find(p => p.id === petId);
        if (!pet) return;

        // Check if pet's size is supported by the boarding service
        if (!isPetSizeSupported(pet.size.size)) {
            alert(`Sorry, ${pet.petName} cannot be selected. This boarding service does not support ${pet.size.size} sized pets.`);
            return;
        }

        setSelectedPets(prev => {
            const newSet = new Set(prev);
            if (newSet.has(petId)) {
                newSet.delete(petId);
            } else {
                newSet.add(petId);
            }
            return newSet;
        });
    };

    // Fetch pets and boarding services when modal opens
    useEffect(() => {
        if (modalVisible) {
            // If preSelectedPets are provided, use them and skip to date selection
            if (preSelectedPets && preSelectedPets.length > 0) {
                setSelectedPets(new Set(preSelectedPets));
                // Close the main modal and show date modal immediately
                setModalVisible(false);
                setTimeout(() => {
                    setShowDateModal(true);
                }, 100); // Small delay for smooth transition
            } else {
                // Reset selected pets when modal opens to ensure they start unchecked
                setSelectedPets(new Set());
            }
            fetchPets();
            if (boardingId) {
                fetchBoardingServices();
            }
        }
    }, [modalVisible, boardingId, preSelectedPets]);

    // Fetch owner ID when component mounts
    useEffect(() => {
        const fetchOwnerData = async () => {
            const ownerIdFromAPI = await getOwnerIdFromAPI();
            if (ownerIdFromAPI) {
                setOwnerId(ownerIdFromAPI);
            }
        };
        fetchOwnerData();
    }, []);

    return (
        <View style={boardingmodalstyles.container}>
            {/* Pet Selection Modal - Only show if no preSelectedPets */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible && (!preSelectedPets || preSelectedPets.length === 0)}
                onRequestClose={() => setModalVisible(false)}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    justifyContent: 'flex-end',
                }}>
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        borderTopLeftRadius: responsiveWidth(6),
                        borderTopRightRadius: responsiveWidth(6),
                        paddingHorizontal: responsiveWidth(4),
                        paddingBottom: 0,
                        maxHeight: responsiveHeight(70),
                        elevation: 20,
                        shadowColor: 'rgba(88, 185, 208, 0.4)',
                        shadowOffset: { width: 0, height: -8 },
                        shadowOpacity: 0.3,
                        shadowRadius: 16,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }}>
                        {/* Bottom Sheet Handle */}
                        <View style={{
                            width: responsiveWidth(10),
                            height: responsiveHeight(0.4),
                            backgroundColor: 'rgba(88, 185, 208, 0.3)',
                            borderRadius: responsiveHeight(0.2),
                            alignSelf: 'center',
                            marginTop: responsiveHeight(1),
                            marginBottom: responsiveHeight(0.5),
                        }} />

                        {/* Header */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: responsiveHeight(1.5),
                            borderBottomWidth: 1,
                            borderBottomColor: 'rgba(88, 185, 208, 0.1)',
                            marginBottom: responsiveHeight(2),
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: '600',
                                color: '#1A1D29',
                                letterSpacing: -0.3,
                            }}>Select Your Pets</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={{
                                    fontSize: 20,
                                    color: '#666',
                                    fontWeight: 'bold',
                                }}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Pet List Content */}
                        <View style={{ flex: 1, marginBottom: responsiveHeight(2) }}>
                            {(loadingPets || loadingServices) ? (
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <PetSelectionSkeleton />
                                </ScrollView>
                            ) : (petsError || servicesError) ? (
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: responsiveHeight(4)
                                }}>
                                    <Text style={{
                                        fontSize: 14,
                                        color: '#E74C3C',
                                        textAlign: 'center',
                                        marginBottom: 16
                                    }}>
                                        {petsError || servicesError}
                                    </Text>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#58B9D0',
                                            paddingHorizontal: 20,
                                            paddingVertical: 10,
                                            borderRadius: 8
                                        }}
                                        onPress={() => {
                                            if (petsError) fetchPets();
                                            if (servicesError && boardingId) fetchBoardingServices();
                                        }}>
                                        <Text style={{
                                            color: '#FFFFFF',
                                            fontWeight: '500'
                                        }}>Retry</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : pets.length === 0 ? (
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: responsiveHeight(4)
                                }}>
                                    <MaterialIcons name="pets" size={48} color="#CCCCCC" />
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#666',
                                        textAlign: 'center',
                                        marginTop: 16
                                    }}>No pets found</Text>
                                    <Text style={{
                                        fontSize: 14,
                                        color: '#999',
                                        textAlign: 'center',
                                        marginTop: 8
                                    }}>Please add your pets first.</Text>
                                </View>
                            ) : (
                                <FlatList
                                    data={pets}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(pet) => pet.id.toString()}
                                    contentContainerStyle={{ paddingBottom: 16 }}
                                    renderItem={({ item: pet }) => {
                                        const isSupported = loadingServices || isPetSizeSupported(pet.size.size);
                                        const isDisabled = !loadingServices && !isSupported;
                                        const isSelected = selectedPets.has(pet.id);

                                        return (
                                            <TouchableOpacity
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    backgroundColor: isSelected ? 'rgba(88, 185, 208, 0.1)' : '#FFFFFF',
                                                    paddingHorizontal: 16,
                                                    paddingVertical: 16,
                                                    marginVertical: 4,
                                                    borderRadius: 12,
                                                    borderWidth: 1,
                                                    borderColor: isSelected ? '#58B9D0' : 'rgba(88, 185, 208, 0.2)',
                                                    opacity: isDisabled ? 0.5 : 1,
                                                    elevation: isSelected ? 2 : 0,
                                                    shadowColor: isSelected ? '#58B9D0' : 'transparent',
                                                    shadowOffset: { width: 0, height: 1 },
                                                    shadowOpacity: 0.2,
                                                    shadowRadius: 3,
                                                }}
                                                onPress={() => togglePetSelection(pet.id)}
                                                disabled={isDisabled}>

                                                {/* Pet Avatar */}
                                                <View style={{
                                                    width: 50,
                                                    height: 50,
                                                    borderRadius: 25,
                                                    backgroundColor: isSelected ? '#58B9D0' : (isDisabled ? '#CCCCCC' : 'rgba(88, 185, 208, 0.8)'),
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginRight: 16,
                                                }}>
                                                    <MaterialIcons
                                                        name="pets"
                                                        size={24}
                                                        color="#FFFFFF"
                                                    />
                                                </View>

                                                {/* Pet Info */}
                                                <View style={{ flex: 1 }}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        marginBottom: 4
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 16,
                                                            fontWeight: '600',
                                                            color: isDisabled ? '#999999' : '#1A1D29',
                                                            marginRight: 8
                                                        }}>
                                                            {pet.petName}
                                                        </Text>
                                                        <MaterialIcons
                                                            name={pet.gender.name.toLowerCase() === 'female' ? 'female' : 'male'}
                                                            size={16}
                                                            color={pet.gender.name.toLowerCase() === 'female' ? '#E91E63' : '#2196F3'}
                                                        />
                                                    </View>
                                                    <Text style={{
                                                        fontSize: 12,
                                                        color: isDisabled ? '#999999' : '#666',
                                                        lineHeight: 16
                                                    }}>
                                                        {pet.ageInYears ? `${pet.ageInYears} years` : pet.ageInMonths ? `${pet.ageInMonths} months` : 'Age unknown'} • {pet.size.size}
                                                    </Text>
                                                    {isDisabled && (
                                                        <Text style={{
                                                            fontSize: 11,
                                                            color: '#E74C3C',
                                                            marginTop: 2,
                                                            fontStyle: 'italic'
                                                        }}>
                                                            Size not supported
                                                        </Text>
                                                    )}
                                                </View>

                                                {/* Selection Indicator */}
                                                <View style={{
                                                    width: 24,
                                                    height: 24,
                                                    borderRadius: 12,
                                                    borderWidth: 2,
                                                    borderColor: isSelected ? '#58B9D0' : '#CCCCCC',
                                                    backgroundColor: isSelected ? '#58B9D0' : 'transparent',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    {isSelected && (
                                                        <MaterialIcons name="check" size={16} color="#FFFFFF" />
                                                    )}
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    }}
                                />
                            )}
                        </View>

                        {/* Action Button */}
                        <View style={{
                            paddingBottom: Platform.OS === 'ios' ? responsiveHeight(4) : responsiveHeight(2),
                            paddingTop: responsiveHeight(2),
                            borderTopWidth: 1,
                            borderTopColor: 'rgba(88, 185, 208, 0.1)',
                        }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: selectedPets.size > 0 ? '#58B9D0' : '#CCCCCC',
                                    paddingVertical: responsiveHeight(1.8),
                                    borderRadius: 8,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onPress={handleConfirm}
                                disabled={selectedPets.size === 0}>
                                <Text style={{
                                    color: '#FFFFFF',
                                    fontWeight: '600',
                                    fontSize: 16,
                                }}>
                                    Continue with {selectedPets.size} pet{selectedPets.size !== 1 ? 's' : ''}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={showDateModal}
                onRequestClose={handleDateCancel}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    justifyContent: 'flex-end',
                }}>
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        borderTopLeftRadius: responsiveWidth(6),
                        borderTopRightRadius: responsiveWidth(6),
                        paddingHorizontal: responsiveWidth(4),
                        paddingBottom: 0,
                        maxHeight: responsiveHeight(60),
                        elevation: 20,
                        shadowColor: 'rgba(88, 185, 208, 0.4)',
                        shadowOffset: { width: 0, height: -8 },
                        shadowOpacity: 0.3,
                        shadowRadius: 16,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        // zIndex: 1000,
                    }}>
                        {/* Bottom Sheet Handle */}
                        <View style={{
                            width: responsiveWidth(10),
                            height: responsiveHeight(0.4),
                            backgroundColor: 'rgba(88, 185, 208, 0.3)',
                            borderRadius: responsiveHeight(0.2),
                            alignSelf: 'center',
                            marginTop: responsiveHeight(1),
                            marginBottom: responsiveHeight(0.5),
                        }} />

                        {/* Header */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingVertical: responsiveHeight(1.5),
                            borderBottomWidth: 1,
                            borderBottomColor: 'rgba(88, 185, 208, 0.1)',
                            marginBottom: responsiveHeight(2),
                        }}>
                            <Text style={{
                                fontSize: 18,
                                fontWeight: '600',
                                color: '#1A1D29',
                                letterSpacing: -0.3,
                            }}>Select Boarding Dates</Text>
                            <TouchableOpacity onPress={handleDateCancel}>
                                <Text style={{
                                    fontSize: 20,
                                    color: '#666',
                                    fontWeight: 'bold',
                                }}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Date and Time Inputs */}
                        <View style={{ gap: responsiveHeight(2), marginBottom: responsiveHeight(3) }}>
                            {/* Start Date and Time */}
                            <View>
                                <Text style={boardingmodalstyles.dateLabel}>Start Date & Time</Text>
                                <View style={{ flexDirection: 'row', gap: responsiveWidth(2), position: 'relative' }}>
                                    <TouchableOpacity
                                        style={[boardingmodalstyles.dateInput, { flex: 1 }]}
                                        onPress={() => setShowStartDatePicker(true)}>
                                        <Text style={boardingmodalstyles.dateInputText}>
                                            {formatDate(startDate)}
                                        </Text>
                                        <Image source={Icons.DownArrow} style={boardingmodalstyles.dateInputIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[boardingmodalstyles.dateInput, { flex: 1 }]}
                                        onPress={() => setShowStartTimeDropdown(true)}>
                                        <Text style={boardingmodalstyles.dateInputText}>
                                            {formatTime(startTime)}
                                        </Text>
                                        <Image source={Icons.DownArrow} style={boardingmodalstyles.dateInputIcon} />
                                    </TouchableOpacity>
                                </View>
                                {/* Inline Start Time Dropdown */}
                                {showStartTimeDropdown && (
                                    <View style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, marginTop: 8, maxHeight: responsiveHeight(25), backgroundColor: '#FFFFFF' }}>
                                        <ScrollView>
                                            {generateTimeSlots(6, 22, 30).map(slot => (
                                                <TouchableOpacity key={slot} onPress={() => {
                                                    const [h, m] = slot.split(':').map(s => parseInt(s, 10));
                                                    const newTime = new Date(startTime);
                                                    newTime.setHours(h, m, 0, 0);
                                                    setStartTime(newTime);
                                                    setShowStartTimeDropdown(false);
                                                }} style={{ paddingVertical: 10, paddingHorizontal: 12 }}>
                                                    <Text>{formatTimeString(slot)}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </View>
                                )}
                            </View>

                            {/* End Date and Time */}
                            <View>
                                <Text style={boardingmodalstyles.dateLabel}>End Date & Time</Text>
                                <View style={{ flexDirection: 'row', gap: responsiveWidth(2), position: 'relative' }}>
                                    <TouchableOpacity
                                        style={[boardingmodalstyles.dateInput, { flex: 1 }]}
                                        onPress={() => setShowEndDatePicker(true)}>
                                        <Text style={boardingmodalstyles.dateInputText}>
                                            {formatDate(endDate)}
                                        </Text>
                                        <Image source={Icons.DownArrow} style={boardingmodalstyles.dateInputIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[boardingmodalstyles.dateInput, { flex: 1 }]}
                                        onPress={() => setShowEndTimeDropdown(true)}>
                                        <Text style={boardingmodalstyles.dateInputText}>
                                            {formatTime(endTime)}
                                        </Text>
                                        <Image source={Icons.DownArrow} style={boardingmodalstyles.dateInputIcon} />
                                    </TouchableOpacity>
                                </View>
                                {/* Inline End Time Dropdown */}
                                {showEndTimeDropdown && (
                                    <View style={{ borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 8, marginTop: 8, maxHeight: responsiveHeight(25), backgroundColor: '#FFFFFF' }}>
                                        <ScrollView>
                                            {generateTimeSlots(6, 22, 30).map(slot => (
                                                <TouchableOpacity key={slot} onPress={() => {
                                                    const [h, m] = slot.split(':').map(s => parseInt(s, 10));
                                                    const newTime = new Date(endTime);
                                                    newTime.setHours(h, m, 0, 0);
                                                    setEndTime(newTime);
                                                    setShowEndTimeDropdown(false);
                                                }} style={{ paddingVertical: 10, paddingHorizontal: 12 }}>
                                                    <Text>{formatTimeString(slot)}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </View>
                                )}
                            </View>
                        </View>

                        {/* Action Buttons */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: responsiveWidth(3),
                            paddingBottom: Platform.OS === 'ios' ? responsiveHeight(4) : responsiveHeight(2),
                            paddingTop: responsiveHeight(2),
                        }}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    paddingVertical: responsiveHeight(1.5),
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: '#58B9D0',
                                    alignItems: 'center',
                                }}
                                onPress={handleDateCancel}>
                                <Text style={{
                                    color: '#58B9D0',
                                    fontWeight: '500',
                                    fontSize: 16,
                                }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    paddingVertical: responsiveHeight(1.5),
                                    borderRadius: 8,
                                    backgroundColor: '#58B9D0',
                                    alignItems: 'center',
                                }}
                                onPress={handleDateConfirm}>
                                <Text style={{
                                    color: '#FFFFFF',
                                    fontWeight: '500',
                                    fontSize: 16,
                                }}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Start Date Picker */}
            {showStartDatePicker && (
                <>
                    <DateTimePicker
                        value={startDate}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleStartDateChange}
                        minimumDate={new Date()}
                    />
                    {Platform.OS === 'ios' && (
                        <View style={{
                            backgroundColor: 'white',
                            padding: responsiveWidth(4),
                            alignItems: 'flex-end'
                        }}>
                            <TouchableOpacity
                                onPress={() => setShowStartDatePicker(false)}
                                style={{
                                    backgroundColor: '#58B9D0',
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 8
                                }}>
                                <Text style={{ color: 'white', fontWeight: '500' }}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </>
            )}

            {/* Start Time Picker */}
            {showStartTimePicker && (
                <>
                    <DateTimePicker
                        value={startTime}
                        mode="time"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleStartTimeChange}
                    />
                    {Platform.OS === 'ios' && (
                        <View style={{
                            backgroundColor: 'white',
                            padding: responsiveWidth(4),
                            alignItems: 'flex-end'
                        }}>
                            <TouchableOpacity
                                onPress={() => setShowStartTimePicker(false)}
                                style={{
                                    backgroundColor: '#58B9D0',
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 8
                                }}>
                                <Text style={{ color: 'white', fontWeight: '500' }}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </>
            )}

            {/* End Date Picker */}
            {showEndDatePicker && (
                <>
                    <DateTimePicker
                        value={endDate}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleEndDateChange}
                        minimumDate={new Date(startDate.getTime() + 24 * 60 * 60 * 1000)}
                    />
                    {Platform.OS === 'ios' && (
                        <View style={{
                            backgroundColor: 'white',
                            padding: responsiveWidth(4),
                            alignItems: 'flex-end'
                        }}>
                            <TouchableOpacity
                                onPress={() => setShowEndDatePicker(false)}
                                style={{
                                    backgroundColor: '#58B9D0',
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 8
                                }}>
                                <Text style={{ color: 'white', fontWeight: '500' }}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </>
            )}

            {/* End Time Picker */}
            {showEndTimePicker && (
                <>
                    <DateTimePicker
                        value={endTime}
                        mode="time"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleEndTimeChange}
                    />
                    {Platform.OS === 'ios' && (
                        <View style={{
                            backgroundColor: 'white',
                            padding: responsiveWidth(4),
                            alignItems: 'flex-end'
                        }}>
                            <TouchableOpacity
                                onPress={() => setShowEndTimePicker(false)}
                                style={{
                                    backgroundColor: '#58B9D0',
                                    paddingHorizontal: 20,
                                    paddingVertical: 10,
                                    borderRadius: 8
                                }}>
                                <Text style={{ color: 'white', fontWeight: '500' }}>Done</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </>
            )}
            {/* Start Time Dropdown (custom list) */}
            <Modal
                visible={showStartTimeDropdown}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowStartTimeDropdown(false)}
            >
                <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                    <View style={{ backgroundColor: 'white', padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12, maxHeight: responsiveHeight(50) }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Select Start Time</Text>
                        <ScrollView>
                            {generateTimeSlots(6, 22, 30).map((slot) => (
                                <TouchableOpacity key={slot} onPress={() => {
                                    const [h, m] = slot.split(':').map(s => parseInt(s, 10));
                                    const newTime = new Date(startTime);
                                    newTime.setHours(h, m, 0, 0);
                                    setStartTime(newTime);
                                    setShowStartTimeDropdown(false);
                                }} style={{ paddingVertical: 12 }}>
                                    <Text style={{ fontSize: 15 }}>{formatTimeString(slot)}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity onPress={() => setShowStartTimeDropdown(false)} style={{ marginTop: 10, alignSelf: 'flex-end' }}>
                            <Text style={{ color: '#58B9D0', fontWeight: '600' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* End Time Dropdown (custom list) */}
            <Modal
                visible={showEndTimeDropdown}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowEndTimeDropdown(false)}
            >
                <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' }}>
                    <View style={{ backgroundColor: 'white', padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12, maxHeight: responsiveHeight(50) }}>
                        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>Select End Time</Text>
                        <ScrollView>
                            {generateTimeSlots(6, 22, 30).map((slot) => (
                                <TouchableOpacity key={slot} onPress={() => {
                                    const [h, m] = slot.split(':').map(s => parseInt(s, 10));
                                    const newTime = new Date(endTime);
                                    newTime.setHours(h, m, 0, 0);
                                    setEndTime(newTime);
                                    setShowEndTimeDropdown(false);
                                }} style={{ paddingVertical: 12 }}>
                                    <Text style={{ fontSize: 15 }}>{formatTimeString(slot)}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity onPress={() => setShowEndTimeDropdown(false)} style={{ marginTop: 10, alignSelf: 'flex-end' }}>
                            <Text style={{ color: '#58B9D0', fontWeight: '600' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

// Helper to generate time slots between startHour and endHour with given step minutes (e.g., 30)
const generateTimeSlots = (startHour: number, endHour: number, stepMinutes: number) => {
    const slots: string[] = [];
    for (let h = startHour; h <= endHour; h++) {
        for (let m = 0; m < 60; m += stepMinutes) {
            const hh = String(h).padStart(2, '0');
            const mm = String(m).padStart(2, '0');
            slots.push(`${hh}:${mm}`);
        }
    }
    return slots;
};

const formatTimeString = (slot: string) => {
    const [hh, mm] = slot.split(':').map(s => parseInt(s, 10));
    const date = new Date();
    date.setHours(hh, mm, 0, 0);
    // Format as 12-hour e.g., 6:00 AM
    return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
};

export default BoardingModal;