
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Modal, FlatList, StatusBar, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import images from '../../../assets/images';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icons from '../../../assets/icons';
import boardinguserstyles from './boardinguser.styles';
import CommercialService from './CommercialService';
import BoardingHomeService from './BoardingHomeService';
import { StackNavigationProp } from '@react-navigation/stack';
import serviceStyles from '../Service/styles';
import { API_CONFIG } from '../../config/api';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// Pet interfaces
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

// Define your navigation stack's param list
type RootStackParamList = {
    UserDetails: undefined;
    CalendarSheet:undefined;
    TrainingLocalAddress:{section: string};
    Boarding:{section: string}
    BoardingDetails:undefined
};

// Define the navigation prop type
type UserDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BoardingDetails'>;

// Define props interface for the component
interface UserDetailsProps {
    navigation: UserDetailsScreenNavigationProp; // Navigation is now required
}

const BoardingUser: React.FC<UserDetailsProps> = ({ navigation }) => {
    const [show, setShow] = useState<boolean>(false);
    const [showCityDropdown, setShowCityDropdown] = useState<boolean>(false);
    const [selectedCity, setSelectedCity] = useState<string>('Kolkata');

    // Pet selection state
    const [showPetModal, setShowPetModal] = useState<boolean>(true); // Open on mount
    const [pets, setPets] = useState<PetProfile[]>([]);
    const [loadingPets, setLoadingPets] = useState<boolean>(true);
    const [selectedPets, setSelectedPets] = useState<Set<number>>(new Set());
    const [petsError, setPetsError] = useState<string | null>(null);

    // Boarding results state
    const [boardingResults, setBoardingResults] = useState<any[]>([]);
    const [loadingResults, setLoadingResults] = useState<boolean>(false);
    const [resultsError, setResultsError] = useState<string | null>(null);

    // Selected date (you can pass this from previous screen or use current date)
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const indianCities = [
        'Mumbai',
        'Delhi',
        'Bangalore',
        'Hyderabad',
        'Chennai',
        'Kolkata',
        'Pune',
        'Ahmedabad',
        'Jaipur',
        'Surat',
        'Lucknow',
        'Kanpur',
        'Nagpur',
        'Indore',
        'Thane',
        'Bhopal',
        'Visakhapatnam',
        'Patna',
        'Vadodara',
        'Ludhiana',
        'Agra',
        'Nashik',
        'Gurgaon',
        'Noida',
        'Faridabad',
        'Ghaziabad',
        'Rajkot',
        'Meerut',
        'Varanasi',
        'Srinagar',
        'Aurangabad',
        'Amritsar',
        'Navi Mumbai',
        'Ranchi',
        'Coimbatore',
        'Vijayawada',
        'Jodhpur',
        'Madurai',
        'Raipur',
        'Kota',
        'Guwahati',
        'Chandigarh',
        'Mysore',
        'Bhubaneswar',
        'Thiruvananthapuram',
        'Dehradun',
        'Kochi',
        'Jamshedpur',
        'Mangalore',
        'Udaipur',
        'Kasba'
    ];

    const handleToggle = () => {
        setShow(!show);
    };

    const handleCitySelect = (city: string) => {
        setSelectedCity(city);
        setShowCityDropdown(false);
    };

    // Fetch pets on mount
    useEffect(() => {
        fetchPets();
    }, []);

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
            if (!token) return null;

            const response = await fetch(`${API_CONFIG.BASE_URL}/api/pet-owner/findByUserId`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) return null;
            const result = await response.json();
            return result.statusCode === 200 ? result.body.id : null;
        } catch (error) {
            console.error('Error getting owner ID:', error);
            return null;
        }
    };

    const fetchPets = async () => {
        setLoadingPets(true);
        setPetsError(null);

        try {
            const token = await getAuthToken();
            if (!token) {
                setPetsError('Authentication token not found');
                return;
            }

            const ownerId = await getOwnerIdFromAPI();
            if (!ownerId) {
                setPetsError('Owner ID not found');
                return;
            }

            const response = await fetch(
                `${API_CONFIG.BASE_URL}/api/pet-profile/owner/${ownerId}`,
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            if (response.ok) {
                const result = await response.json();
                if (result.statusCode === 200) {
                    setPets(result.body || []);
                }
            }
        } catch (error) {
            console.error('Error fetching pets:', error);
            setPetsError('Failed to load pets');
        } finally {
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

    const searchBoardings = async () => {
        if (selectedPets.size === 0) {
            alert('Please select at least one pet');
            return;
        }

        setShowPetModal(false);
        setLoadingResults(true);
        setResultsError(null);

        try {
            const token = await getAuthToken();
            if (!token) {
                alert('Please login to continue');
                return;
            }

            const petIdsString = Array.from(selectedPets).join(',');
            const apiUrl = `${API_CONFIG.BASE_URL}/api/boarding/search-boardings?date=${selectedDate}&pets=${petIdsString}`;

            console.log('🔍 Searching boardings:', apiUrl);

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            console.log('📦 API Response:', result);
            

            if (response.ok) {
                console.log('✅ Boarding results:', result);
                setBoardingResults(result.body || []);
            } else {
                setResultsError(result.message || 'Failed to search boardings');
            }
        } catch (error) {
            console.error('Error searching boardings:', error);
            setResultsError('Failed to search boardings');
        } finally {
            setLoadingResults(false);
        }
    };

    const renderCityItem = ({ item }: { item: string }) => (
        <TouchableOpacity
            style={boardinguserstyles.cityItem}
            onPress={() => handleCitySelect(item)}
        >
            <Text style={boardinguserstyles.cityText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={boardinguserstyles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFFFFF"
                translucent={false}
                animated={true}
            />

            {/* Header Section matching BoardingDetails page */}
            <View style={[serviceStyles.stickyHeader, { backgroundColor: '#FFFFFF', borderBottomColor: '#E5E7EB' }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
                    <Image
                        source={Icons.LeftArrow}
                        style={{ tintColor: '#000000', width: 20, height: 20 }}
                    />
                </TouchableOpacity>
                <View style={serviceStyles.headerTitleContainer}>
                    <Text style={serviceStyles.stickyHeaderTitle}>
                        Boarding
                    </Text>
                    <Text style={serviceStyles.stickyHeaderSubtitle}>
                        Find trusted boarding providers
                    </Text>
                </View>
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#F8F9FB', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }}
                    onPress={() => setShowCityDropdown(true)}
                >
                    <Text style={{ fontSize: 14, color: '#1A1D29', fontWeight: '500' }}>
                        {selectedCity}
                    </Text>
                    <Image
                        source={Icons.DownArrow}
                        style={{ width: 16, height: 16, tintColor: '#6B7280' }}
                    />
                </TouchableOpacity>
            </View>

            {/* Tab Navigation */}
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#F8F9FB',
                borderRadius: 12,
                // padding: 4,
                marginHorizontal: 20,
                // marginTop: 8,
                // marginBottom: 12,
                borderWidth: 1,
                borderColor: '#E5E7EB',
            }}>
                <TouchableOpacity
                    onPress={handleToggle}
                    style={{
                        flex: 1,
                        paddingVertical: 12,
                        alignItems: 'center',
                        backgroundColor: !show ? '#58B9D0' : 'transparent',
                        borderRadius: 8,
                    }}
                >
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: !show ? '#FFFFFF' : '#6B7280',
                    }}>
                        Home Service
                    </Text>
                </TouchableOpacity>
                                <TouchableOpacity
                    onPress={handleToggle}
                    style={{
                        flex: 1,
                        paddingVertical: 12,
                        alignItems: 'center',
                        backgroundColor: show ? '#58B9D0' : 'transparent',
                        borderRadius: 8,
                    }}
                >
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: show ? '#FFFFFF' : '#6B7280',
                    }}>
                        Commercial Service
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Search and Filter */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingHorizontal: 20,
                // marginBottom: 12,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: '#F6F6F6',
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    height: 48,
                }}>
                    <MaterialIcons name="search" size={20} color="#999" style={{ marginRight: 12 }} />
                    <TextInput
                        placeholder="Search for Boarders"
                        placeholderTextColor="#999"
                        style={{
                            flex: 1,
                            fontSize: 16,
                            color: '#333',
                        }}
                    />
                </View>
                <TouchableOpacity style={{
                    width: 48,
                    height: 48,
                    backgroundColor: '#58B9D0',
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <MaterialIcons name="tune" size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            {/* Selected Pets Display */}
            {selectedPets.size > 0 && (
                <View style={{
                    marginHorizontal: 20,
                    marginTop: 12,
                    marginBottom: 8,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 8,
                    }}>
                        <Text style={{
                            fontSize: 14,
                            fontWeight: '600',
                            color: '#1A1D29',
                        }}>
                            Selected Pets ({selectedPets.size})
                        </Text>
                        <TouchableOpacity
                            onPress={() => setShowPetModal(true)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 4,
                            }}
                        >
                            <MaterialIcons name="edit" size={16} color="#58B9D0" />
                            <Text style={{
                                fontSize: 13,
                                color: '#58B9D0',
                                fontWeight: '500',
                            }}>Change</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ gap: 8 }}
                    >
                        {Array.from(selectedPets).map((petId) => {
                            const pet = pets.find(p => p.id === petId);
                            if (!pet) return null;
                            return (
                                <View
                                    key={petId}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        backgroundColor: '#F0F9FF',
                                        borderWidth: 1,
                                        borderColor: '#58B9D0',
                                        borderRadius: 20,
                                        paddingVertical: 6,
                                        paddingLeft: 6,
                                        paddingRight: 12,
                                        gap: 8,
                                    }}
                                >
                                    <View style={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: 16,
                                        backgroundColor: '#58B9D0',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        {pet.profileImg ? (
                                            <Image
                                                source={{ uri: pet.profileImg }}
                                                style={{ width: 32, height: 32, borderRadius: 16 }}
                                                resizeMode="cover"
                                            />
                                        ) : (
                                            <MaterialIcons name="pets" size={18} color="#FFFFFF" />
                                        )}
                                    </View>
                                    <Text style={{
                                        fontSize: 13,
                                        fontWeight: '600',
                                        color: '#1A1D29',
                                    }}>
                                        {pet.petName}
                                    </Text>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            )}

            {/* No Results Message */}
            {!loadingResults && boardingResults.length === 0 && selectedPets.size > 0 && (
                <View style={{
                    marginHorizontal: 20,
                    marginTop: 20,
                    padding: 24,
                    backgroundColor: '#F9FAFB',
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: '#E5E7EB',
                    alignItems: 'center',
                }}>
                    <MaterialIcons name="search-off" size={48} color="#9CA3AF" />
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '600',
                        color: '#1F2937',
                        marginTop: 16,
                        marginBottom: 8,
                    }}>
                        No Boardings Found
                    </Text>
                    <Text style={{
                        fontSize: 14,
                        color: '#6B7280',
                        textAlign: 'center',
                        lineHeight: 20,
                    }}>
                        We couldn't find any boarding facilities for your selected pets. Try adjusting your selection or check back later.
                    </Text>
                </View>
            )}

            {/* Loading Results */}
            {loadingResults && (
                <View style={{
                    marginHorizontal: 20,
                    marginTop: 20,
                    padding: 40,
                    alignItems: 'center',
                }}>
                    <ActivityIndicator size="large" color="#58B9D0" />
                    <Text style={{
                        fontSize: 14,
                        color: '#6B7280',
                        marginTop: 16,
                    }}>
                        Searching for boardings...
                    </Text>
                </View>
            )}

            {/* Results */}
            {!loadingResults && boardingResults.length > 0 && (
                show ? (
                    <BoardingHomeService navigation={navigation} mode={9} boardingResults={boardingResults} selectedPets={Array.from(selectedPets)} />
                ) : (
                    <CommercialService mode={10} boardingResults={boardingResults} navigation={navigation} selectedPets={Array.from(selectedPets)} />
                )
            )}

            <Modal
                visible={showCityDropdown}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowCityDropdown(false)}
            >
                <TouchableOpacity
                    style={boardinguserstyles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowCityDropdown(false)}
                >
                    <View style={boardinguserstyles.dropdownContainer}>
                        <View style={boardinguserstyles.dropdownHeader}>
                            <Text style={boardinguserstyles.dropdownTitle}>Select City</Text>
                            <TouchableOpacity onPress={() => setShowCityDropdown(false)}>
                                <Text style={boardinguserstyles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={indianCities}
                            renderItem={renderCityItem}
                            keyExtractor={(item, index) => index.toString()}
                            style={boardinguserstyles.cityList}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Pet Selection Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showPetModal}
                onRequestClose={() => {
                    if (selectedPets.size === 0) {
                        alert('Please select at least one pet to continue');
                    } else {
                        setShowPetModal(false);
                    }
                }}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    justifyContent: 'flex-end',
                }}>
                    <View style={{
                        backgroundColor: '#FFFFFF',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        height: responsiveHeight(75),
                    }}>
                        {/* Bottom Sheet Handle */}
                        <View style={{
                            width: 40,
                            height: 4,
                            backgroundColor: '#D1D5DB',
                            borderRadius: 2,
                            alignSelf: 'center',
                            marginTop: 12,
                            marginBottom: 8,
                        }} />

                        {/* Header */}
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 20,
                            paddingVertical: 16,
                            borderBottomWidth: 1,
                            borderBottomColor: '#F3F4F6',
                        }}>
                            <View>
                                <Text style={{
                                    fontSize: 20,
                                    fontWeight: '700',
                                    color: '#111827',
                                }}>Select Your Pets</Text>
                                <Text style={{
                                    fontSize: 13,
                                    color: '#6B7280',
                                    marginTop: 2,
                                }}>Choose pets for boarding</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    if (selectedPets.size === 0) {
                                        alert('Please select at least one pet to continue');
                                    } else {
                                        setShowPetModal(false);
                                    }
                                }}
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 16,
                                    backgroundColor: '#F3F4F6',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <MaterialIcons name="close" size={20} color="#6B7280" />
                            </TouchableOpacity>
                        </View>

                        {/* Pet List Content */}
                        {loadingPets ? (
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <ActivityIndicator size="large" color="#58B9D0" />
                                <Text style={{
                                    marginTop: 16,
                                    fontSize: 14,
                                    color: '#666',
                                    textAlign: 'center'
                                }}>
                                    Loading your pets...
                                </Text>
                            </View>
                        ) : petsError ? (
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    color: '#E74C3C',
                                    textAlign: 'center',
                                    marginBottom: 16
                                }}>
                                    {petsError}
                                </Text>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#58B9D0',
                                        paddingHorizontal: 20,
                                        paddingVertical: 10,
                                        borderRadius: 8
                                    }}
                                    onPress={fetchPets}>
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
                            <ScrollView
                                style={{ flex: 1 }}
                                contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 16 }}
                                showsVerticalScrollIndicator={false}
                            >
                                    {pets.map((pet) => {
                                        const isSelected = selectedPets.has(pet.id);
                                        return (
                                            <TouchableOpacity
                                                key={pet.id}
                                                onPress={() => togglePetSelection(pet.id)}
                                                activeOpacity={0.7}
                                                style={{ marginBottom: 12 }}
                                            >
                                                <View style={{
                                                    backgroundColor: '#FFFFFF',
                                                    borderRadius: 16,
                                                    borderWidth: isSelected ? 2 : 1,
                                                    borderColor: isSelected ? '#58B9D0' : '#E5E7EB',
                                                    overflow: 'hidden',
                                                }}>
                                                    <View style={{
                                                        padding: 14,
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                    }}>
                                                        {/* Pet Avatar */}
                                                        <View style={{
                                                            width: 60,
                                                            height: 60,
                                                            borderRadius: 30,
                                                            marginRight: 14,
                                                            overflow: 'hidden',
                                                            borderWidth: 2,
                                                            borderColor: isSelected ? '#58B9D0' : '#E5E7EB',
                                                        }}>
                                                            {pet.profileImg ? (
                                                                <Image
                                                                    source={{ uri: pet.profileImg }}
                                                                    style={{ width: '100%', height: '100%' }}
                                                                    resizeMode="cover"
                                                                />
                                                            ) : (
                                                                <View style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    backgroundColor: 'rgba(88, 185, 208, 0.1)',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                }}>
                                                                    <MaterialIcons name="pets" size={30} color="#58B9D0" />
                                                                </View>
                                                            )}
                                                        </View>

                                                        {/* Pet Info */}
                                                        <View style={{ flex: 1 }}>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                marginBottom: 6,
                                                            }}>
                                                                <Text style={{
                                                                    fontSize: 17,
                                                                    fontWeight: '700',
                                                                    color: '#1F2937',
                                                                    marginRight: 6,
                                                                }}>
                                                                    {pet.petName}
                                                                </Text>
                                                                <MaterialIcons
                                                                    name={pet.gender.name.toLowerCase() === 'female' ? 'female' : 'male'}
                                                                    size={16}
                                                                    color={pet.gender.name.toLowerCase() === 'female' ? '#E91E63' : '#2196F3'}
                                                                />
                                                            </View>

                                                            {/* Category and Size Badges */}
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                gap: 8,
                                                            }}>
                                                                {/* Category Badge */}
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    backgroundColor: '#F0F9FF',
                                                                    paddingHorizontal: 8,
                                                                    paddingVertical: 3,
                                                                    borderRadius: 6,
                                                                    gap: 3,
                                                                }}>
                                                                    <MaterialIcons name="pets" size={12} color="#0284C7" />
                                                                    <Text style={{
                                                                        fontSize: 12,
                                                                        color: '#0284C7',
                                                                        fontWeight: '600',
                                                                        textTransform: 'capitalize',
                                                                    }}>
                                                                        {pet.category.catName}
                                                                    </Text>
                                                                </View>

                                                                {/* Size Badge */}
                                                                {pet.size?.size && (
                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center',
                                                                        backgroundColor: '#F0FDF4',
                                                                        paddingHorizontal: 8,
                                                                        paddingVertical: 3,
                                                                        borderRadius: 6,
                                                                        gap: 3,
                                                                    }}>
                                                                        <MaterialIcons name="straighten" size={12} color="#16A34A" />
                                                                        <Text style={{
                                                                            fontSize: 12,
                                                                            color: '#16A34A',
                                                                            fontWeight: '600',
                                                                            textTransform: 'capitalize',
                                                                        }}>
                                                                            {pet.size.size}
                                                                        </Text>
                                                                    </View>
                                                                )}
                                                            </View>
                                                        </View>

                                                        {/* Selection Indicator */}
                                                        <View style={{
                                                            width: 26,
                                                            height: 26,
                                                            borderRadius: 13,
                                                            borderWidth: 2,
                                                            borderColor: isSelected ? '#58B9D0' : '#D1D5DB',
                                                            backgroundColor: isSelected ? '#58B9D0' : '#FFFFFF',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}>
                                                            {isSelected && (
                                                                <MaterialIcons name="check" size={18} color="#FFFFFF" />
                                                            )}
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </ScrollView>
                            )}

                        {/* Action Button - Fixed at Bottom */}
                        {pets.length > 0 && (
                            <View style={{
                                paddingHorizontal: 20,
                                paddingVertical: 16,
                                borderTopWidth: 1,
                                borderTopColor: '#F3F4F6',
                                backgroundColor: '#FFFFFF',
                            }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: selectedPets.size > 0 ? '#58B9D0' : '#D1D5DB',
                                        paddingVertical: 16,
                                        borderRadius: 12,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        gap: 8,
                                    }}
                                    onPress={searchBoardings}
                                    disabled={selectedPets.size === 0 || loadingResults}
                                    activeOpacity={0.8}>
                                    {loadingResults ? (
                                        <>
                                            <ActivityIndicator size="small" color="#FFFFFF" />
                                            <Text style={{
                                                color: '#FFFFFF',
                                                fontWeight: '600',
                                                fontSize: 16,
                                            }}>
                                                Searching...
                                            </Text>
                                        </>
                                    ) : (
                                        <>
                                            <Text style={{
                                                color: selectedPets.size > 0 ? '#FFFFFF' : '#9CA3AF',
                                                fontWeight: '600',
                                                fontSize: 16,
                                            }}>
                                                {selectedPets.size === 0
                                                    ? 'Please select at least one pet'
                                                    : `Continue with ${selectedPets.size} ${selectedPets.size === 1 ? 'Pet' : 'Pets'}`
                                                }
                                            </Text>
                                            {selectedPets.size > 0 && (
                                                <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
                                            )}
                                        </>
                                    )}
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default BoardingUser;
