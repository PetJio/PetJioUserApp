import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import boardinghomeservicestyles from './boardinghomeservice.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { API_CONFIG, API_ENDPOINTS, buildQueryString } from '../../config/api';


// Define interfaces
interface Boarding {
    id: number;
    facilityName: string;
    userId: number;
    description: string;
    regNo: string;
    certificate: string[];
    profileImg: string;
    whyChooseUs: string;
    experience: number;
    keepCustomerPossessions: boolean;
    checkinTime: number;
    checkoutTime: number;
    reviewAvg: number;
    reviewCount: number;
    user: {
        lat: number;
        lng: number;
        uid: string;
        address: string;
        pinCode: string;
        email: string;
        mobile: string;
        city: string;
        state: string;
        firstName: string;
        lastName: string;
        fcmToken: string;
    };
}

// Define stack params
type RootStackParamList = {
    UserDetails: undefined;
    UserAbout:undefined;
    TrainerAbout:undefined;
    TrainingDetails:undefined;
    BoardingDetails: {
        providerId?: number;
        selectedDate: string;
        selectedTime: string;
        city: string;
    };
};

// Define prop types
type InSiteServiceProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'BoardingDetails'>;
    selectedDate?: string;
    selectedTime?: string;
    city?: string;
};

const BoardingHomeService: React.FC<InSiteServiceProps> = ({
    navigation,
    selectedDate = new Date().toISOString().split('T')[0],
    selectedTime = '10:00 AM',
    city = 'Bardhaman'
}) => {
    const [boardingData, setBoardingData] = useState<Boarding[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchBoardingServices();
    }, []);

    const fetchBoardingServices = async () => {
        try {
            setLoading(true);
            setError('');

            const queryParams = {
                city: city,
                mode: '10' // online = 10 for Home Service
            };

            const queryString = buildQueryString(queryParams);
            const fullUrl = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.SERVICES.SEARCH_BOARDINGS}?${queryString}`;

            console.log('Fetching home boarding services from:', fullUrl);

            const response = await fetch(fullUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Home boarding services response:', data);

            if (data && data.body && Array.isArray(data.body)) {
                setBoardingData(data.body);
            } else {
                setBoardingData([]);
            }

        } catch (error: any) {
            console.error('Error fetching home boarding services:', error);
            setError(error.message || 'Failed to fetch boarding services');
        } finally {
            setLoading(false);
        }
    };

    const handleBookNow = (providerId: number) => {
        navigation.navigate('BoardingDetails', {
            providerId,
            selectedDate,
            selectedTime,
            city
        });
    };

    const renderBoardingItem = ({ item }: { item: Boarding }) => {
        const providerName = `${item.user?.firstName || ''} ${item.user?.lastName || ''}`.trim() || 'Kiara Das';
        const rating = item.reviewAvg?.toFixed(1) || '4.8';

        return (
            <View style={boardinghomeservicestyles.viewGap}>
                <TouchableOpacity onPress={() => handleBookNow(item.id)}>
                    <View style={boardinghomeservicestyles.containerthirdsubchild}>
                        <View style={boardinghomeservicestyles.shadow}>
                            {item.profileImg ? (
                                <Image
                                    source={{ uri: item.profileImg }}
                                    style={boardinghomeservicestyles.userimage}
                                />
                            ) : (
                                <View style={[boardinghomeservicestyles.userimage, boardinghomeservicestyles.fallbackContainer]}>
                                    <MaterialIcons name="person" size={40} color="#999" />
                                </View>
                            )}
                            <View style={boardinghomeservicestyles.gap}>
                                <View style={boardinghomeservicestyles.userTextWidth}>
                                    <View style={boardinghomeservicestyles.userTextgap}>
                                        <Text style={boardinghomeservicestyles.textSize}>{providerName}</Text>
                                        <View style={boardinghomeservicestyles.verified}>
                                            <Image source={Icons.Ellipse}/>
                                            <Text style={{fontSize:9,fontWeight:'600',lineHeight:10,letterSpacing:0,color:'#299F4D'}}>Open</Text>
                                        </View>
                                    </View>
                                    <View style={boardinghomeservicestyles.verified}>
                                        <Image source={Icons.MdVerifiedUser} />
                                        <Text style={boardinghomeservicestyles.verifyText}>Verified</Text>
                                    </View>
                                </View>

                                <View style={boardinghomeservicestyles.viewFlex}>
                                    <View style={boardinghomeservicestyles.setIconTextGap}>
                                        <Image source={Icons.BiTimeFive} style={boardinghomeservicestyles.setImageIconPosition}/>
                                        <Text style={boardinghomeservicestyles.setTextSize}>10:00 am - 09:00 pm</Text>
                                    </View>

                                    <View style={boardinghomeservicestyles.ratingGap}>
                                        <Image source={Icons.StarIcon} style={boardinghomeservicestyles.ratingHeight} />
                                        <Text style={boardinghomeservicestyles.ratePointSize}>{rating}</Text>
                                    </View>
                                </View>

                                <View style={boardinghomeservicestyles.widthSpace}>
                                    <View style={boardinghomeservicestyles.iconAndTextGap}>
                                        <Image
                                            source={Icons.RiPinDistanceLine}
                                            style={boardinghomeservicestyles.setImageIconPosition}
                                        />
                                        <Text style={boardinghomeservicestyles.setDigitSize}>2.2km Away</Text>
                                    </View>

                                    <View style={boardinghomeservicestyles.iconTextSpace}>
                                        <Text style={boardinghomeservicestyles.bold}>₹ 200 <Text style={boardinghomeservicestyles.weekText}>/week</Text></Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    style={boardinghomeservicestyles.bookButton}
                                    onPress={() => handleBookNow(item.id)}
                                >
                                    <Text style={boardinghomeservicestyles.bookButtonText}>Book Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={[boardinghomeservicestyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#58B9D0" />
                <Text style={{ marginTop: 10, color: '#666' }}>Loading home services...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[boardinghomeservicestyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <Text style={{ color: '#FF5252', textAlign: 'center', marginBottom: 10 }}>{error}</Text>
                <TouchableOpacity
                    onPress={fetchBoardingServices}
                    style={{ backgroundColor: '#58B9D0', padding: 10, borderRadius: 5 }}
                >
                    <Text style={{ color: 'white' }}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={boardinghomeservicestyles.container}>
            <FlatList
                data={boardingData}
                renderItem={renderBoardingItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={boardinghomeservicestyles.contentContainerStyle}
                ListEmptyComponent={() => (
                    <View style={[boardinghomeservicestyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={{ color: '#666', textAlign: 'center' }}>No home boarding services available</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default BoardingHomeService;