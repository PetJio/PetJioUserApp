import { useState, useEffect } from 'react';
import { View,Text,Image, FlatList,TouchableOpacity,Modal, Platform, TextInput, ActivityIndicator} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../../config/api';
import { responsiveWidth,responsiveHeight} from 'react-native-responsive-dimensions';
import boardingmodalstyles from './boardingmodal.styles';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
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
     BoardingRegistrationform:undefined;
     BoardingQuestions:undefined;
 };
 
 // Define the navigation prop type
 type BoardingModalScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BoardingRegistrationform'>;
 
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

type ModalComponentProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
};



const BoardingModal: React.FC<Omit<ModalComponentProps, 'navigation'>> = ({modalVisible,setModalVisible}) => {
   const navigation = useNavigation<BoardingModalScreenNavigationProp>();
    const [activeTab, setActiveTab] = useState<string>('NormalWalking');
    const [showDateModal, setShowDateModal] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
    const [showEndPicker, setShowEndPicker] = useState<boolean>(false);

    // Pet state
    const [pets, setPets] = useState<PetProfile[]>([]);
    const [loadingPets, setLoadingPets] = useState<boolean>(true);
    const [petsError, setPetsError] = useState<string | null>(null);
    const [selectedPets, setSelectedPets] = useState<Set<number>>(new Set());

    const handleTabPress = (tab: string) => {
        setActiveTab(tab);
    };

    const handleConfirm = () => {
        setModalVisible(false);
        setShowDateModal(true);
    };

    const handleDateConfirm = () => {
        setShowDateModal(false);
        navigation.navigate('BoardingQuestions');
    };

    const handleDateCancel = () => {
        setShowDateModal(false);
    };

    const handleStartDateChange = (event: any, selectedDate?: Date) => {
        setShowStartPicker(false);
        if (selectedDate) {
            setStartDate(selectedDate);
            // Ensure end date is after start date
            if (selectedDate >= endDate) {
                setEndDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000));
            }
        }
    };

    const handleEndDateChange = (event: any, selectedDate?: Date) => {
        setShowEndPicker(false);
        if (selectedDate && selectedDate > startDate) {
            setEndDate(selectedDate);
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
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
                // Auto-select all pets by default
                if (result.body && result.body.length > 0) {
                    setSelectedPets(new Set(result.body.map(pet => pet.id)));
                }
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

    const togglePetSelection = (petId: number) => {
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

    // Fetch pets when modal opens
    useEffect(() => {
        if (modalVisible) {
            fetchPets();
        }
    }, [modalVisible]);

    return (
        <View style={boardingmodalstyles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={boardingmodalstyles.subcontainer}>
                    <View style={boardingmodalstyles.setmodalRadious}>
                        <View
                            style={
                                boardingmodalstyles.paddingOfNormalWalkingGroupWalking
                            }>
                            {/* <TouchableOpacity
                                onPress={() => handleTabPress('NormalWalking')}>
                                <View
                                    style={[
                                        activeTab === 'NormalWalking' &&
                                            boardingmodalstyles.menuBottomBoarder,
                                    ]}>
                                    <Text
                                        style={[
                                            boardingmodalstyles.unselectText,
                                            activeTab === 'NormalWalking' &&
                                                boardingmodalstyles.selectText,
                                        ]}>
                                        Normal Walking
                                    </Text>
                                </View>
                            </TouchableOpacity> */}
                            {/* <TouchableOpacity
                                onPress={() => handleTabPress('GroupWalking')}>
                                <View
                                    style={[
                                        activeTab === 'GroupWalking' &&
                                            boardingmodalstyles.menuBottomBoarder,
                                    ]}>
                                    <Text
                                        style={[
                                            boardingmodalstyles.unselectText,
                                            activeTab === 'GroupWalking' &&
                                                boardingmodalstyles.selectText,
                                        ]}>
                                        Group Walking
                                    </Text>
                                </View>
                            </TouchableOpacity> */}
                        </View>

                        {activeTab === 'NormalWalking' && (
                            <View style={{gap: responsiveWidth(2.5)}}>
                                {loadingPets ? (
                                    <View style={boardingmodalstyles.loadingContainer}>
                                        <ActivityIndicator size="large" color="#58B9D0" />
                                        <Text style={boardingmodalstyles.loadingText}>Loading your pets...</Text>
                                    </View>
                                ) : petsError ? (
                                    <View style={boardingmodalstyles.errorContainer}>
                                        <Text style={boardingmodalstyles.errorText}>{petsError}</Text>
                                        <TouchableOpacity
                                            style={boardingmodalstyles.retryButton}
                                            onPress={fetchPets}>
                                            <Text style={boardingmodalstyles.retryButtonText}>Retry</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : pets.length === 0 ? (
                                    <View style={boardingmodalstyles.noPetsContainer}>
                                        <Text style={boardingmodalstyles.noPetsText}>No pets found. Please add your pets first.</Text>
                                    </View>
                                ) : (
                                    pets.map((pet) => (
                                        <TouchableOpacity
                                            key={pet.id}
                                            style={boardingmodalstyles.setFlexRow}
                                            onPress={() => togglePetSelection(pet.id)}>
                                            <View style={boardingmodalstyles.setFlexWithGap}>
                                                <Image
                                                    source={pet.profileImg ? { uri: pet.profileImg } : images.germanDog}
                                                    style={boardingmodalstyles.imageSize}
                                                />
                                                <View style={boardingmodalstyles.center}>
                                                    <View style={boardingmodalstyles.flexORGap}>
                                                        <Text style={boardingmodalstyles.daisyText}>
                                                            {pet.petName}
                                                        </Text>
                                                        <Image
                                                            source={pet.gender.name.toLowerCase() === 'female' ? Icons.BiFemaleSign : Icons.BiFemaleSign}
                                                        />
                                                    </View>
                                                    <Text style={boardingmodalstyles.yearText}>
                                                        {pet.ageInYears ? `${pet.ageInYears} years` : pet.ageInMonths ? `${pet.ageInMonths} months` : 'Age unknown'}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={boardingmodalstyles.topforImage}>
                                                <Image
                                                    source={selectedPets.has(pet.id) ? Icons.BiSolidCheckCircle : Icons.CgRadioCheck}
                                                    style={[
                                                        boardingmodalstyles.selectionIcon,
                                                        selectedPets.has(pet.id) && boardingmodalstyles.selectedIcon
                                                    ]}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                )}
                            </View>
                        )}

                        <View style={boardingmodalstyles.fixedButtonContainer}>
                            <TouchableOpacity
                                onPress={handleConfirm}
                                style={boardingmodalstyles.nextBtnContainer}>
                                <Text style={boardingmodalstyles.nextBtnText}>
                                    Confirm
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Date Selection Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showDateModal}
                onRequestClose={handleDateCancel}>
                <View style={boardingmodalstyles.dateModalOverlay}>
                    <View style={boardingmodalstyles.dateModalContainer}>
                        <View style={boardingmodalstyles.dateModalHeader}>
                            <Text style={boardingmodalstyles.dateModalTitle}>
                                Select Boarding Dates
                            </Text>
                            <TouchableOpacity onPress={handleDateCancel}>
                                <Text style={boardingmodalstyles.dateModalClose}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={boardingmodalstyles.dateInputsContainer}>
                            {/* Start Date Input */}
                            <View style={boardingmodalstyles.dateInputGroup}>
                                <Text style={boardingmodalstyles.dateLabel}>Start Date</Text>
                                <TouchableOpacity
                                    style={boardingmodalstyles.dateInput}
                                    onPress={() => setShowStartPicker(true)}>
                                    <Text style={boardingmodalstyles.dateInputText}>
                                        {formatDate(startDate)}
                                    </Text>
                                    <Image source={Icons.DownArrow} style={boardingmodalstyles.dateInputIcon} />
                                </TouchableOpacity>
                            </View>

                            {/* End Date Input */}
                            <View style={boardingmodalstyles.dateInputGroup}>
                                <Text style={boardingmodalstyles.dateLabel}>End Date</Text>
                                <TouchableOpacity
                                    style={boardingmodalstyles.dateInput}
                                    onPress={() => setShowEndPicker(true)}>
                                    <Text style={boardingmodalstyles.dateInputText}>
                                        {formatDate(endDate)}
                                    </Text>
                                    <Image source={Icons.DownArrow} style={boardingmodalstyles.dateInputIcon} />
                                </TouchableOpacity>
                            </View>

                            {/* Duration Display */}
                            <View style={boardingmodalstyles.durationContainer}>
                                <Text style={boardingmodalstyles.durationText}>
                                    Duration: {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                                </Text>
                            </View>
                        </View>

                        <View style={boardingmodalstyles.dateModalButtons}>
                            <TouchableOpacity
                                style={boardingmodalstyles.dateCancelBtn}
                                onPress={handleDateCancel}>
                                <Text style={boardingmodalstyles.dateCancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={boardingmodalstyles.dateConfirmBtn}
                                onPress={handleDateConfirm}>
                                <Text style={boardingmodalstyles.dateConfirmText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Start Date Picker */}
            {showStartPicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleStartDateChange}
                    minimumDate={new Date()}
                />
            )}

            {/* End Date Picker */}
            {showEndPicker && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleEndDateChange}
                    minimumDate={new Date(startDate.getTime() + 24 * 60 * 60 * 1000)}
                />
            )}
        </View>
    );
};

export default BoardingModal;