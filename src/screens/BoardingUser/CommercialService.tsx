// import React from 'react';
// import { View, Text,Image } from 'react-native';
// import images from '../../../assets/images';
// import Icons from '../../../assets/icons';
// import commercialservicestyles from './commercialservice.styles';

// const CommercialService: React.FC = () => {
//     return (
//         <View style={commercialservicestyles.container}>
//            <View style={commercialservicestyles.containerthirdsubchild}>
//                 <View
//                     style={commercialservicestyles.shadow}>
//                     <Image source={images.UserImage} style={commercialservicestyles.userimage}/>
//                     <View style={commercialservicestyles.gap}>
//                         <View
//                             style={commercialservicestyles.userTextWidth}>
//                             <View
//                                 style={commercialservicestyles.userTextgap}>
//                                 <Text style={commercialservicestyles.textSize}> Souvic Das </Text>
//                                 <View style={commercialservicestyles.borderRadius}>
//                                     <Text style={commercialservicestyles.celebrityText}> Celebrity  </Text>
//                                 </View>
//                             </View>
//                             <View style={commercialservicestyles.ratingGap}>
//                                 <Image source={Icons.StarIcon} style={commercialservicestyles.ratingHeight} />
//                                 <Text style={commercialservicestyles.ratePointSize}> 4.8</Text>
//                             </View>
//                         </View>

//                         <View
//                             style={commercialservicestyles.setIconTextGap}>
//                             <Image source={Icons.Vector} style={commercialservicestyles.setImageIconPosition}/>
//                             <Text style={commercialservicestyles.setTextSize}> 3 years experience </Text>
//                         </View>

//                         <View style={commercialservicestyles.widthSpace}>
//                             <View
//                                 style={commercialservicestyles.iconAndTextGap}>
//                                 <Image
//                                     source={Icons.Location}
//                                     style={commercialservicestyles.setImageIconPosition}
//                                 />
//                                 <Text style={commercialservicestyles.setDigitSize}> 2.2km Away  </Text>
//                             </View>

//                             <View style={commercialservicestyles.iconTextSpace}>
//                                 <Image source={Icons.StarIcon} style={commercialservicestyles.setImageIconPosition}
//                                 />
//                                 <Text  style={commercialservicestyles.bold}>  7000 </Text>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default CommercialService;


import React, { useState, useEffect } from 'react';
import { View, Text,Image ,TouchableOpacity,ScrollView, ActivityIndicator, FlatList } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import commercialservicestyles from './commercialservice.styles';
import { StackNavigationProp } from '@react-navigation/stack';
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
    navigation: StackNavigationProp<RootStackParamList, 'BoardingDetails'>;
    selectedDate?: string;
    selectedTime?: string;
    city?: string;
};



const CommercialService: React.FC<InSiteServiceProps> = ({
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
                city: 'Bardhaman',
                mode: '9' // offline = 9 for Commercial Service
            };

            const queryString = buildQueryString(queryParams);
            const fullUrl = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.SERVICES.SEARCH_BOARDINGS}?${queryString}`;

            console.log('Fetching commercial boarding services from:', fullUrl);

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
            console.log('Commercial boarding services response:', data);

            if (data && data.body && Array.isArray(data.body)) {
                setBoardingData(data.body);
            } else {
                setBoardingData([]);
            }

        } catch (error: any) {
            console.error('Error fetching commercial boarding services:', error);
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
        const providerName = item.facilityName || `${item.user?.firstName || ''} ${item.user?.lastName || ''}`.trim() || 'PetJio Creche';
        const rating = item.reviewAvg?.toFixed(1) || '4.8';

        return (
            <View style={commercialservicestyles.viewGap}>
                <TouchableOpacity onPress={() => handleBookNow(item.id)}>
                    <View style={commercialservicestyles.containerthirdsubchild}>
                        <View style={commercialservicestyles.shadow}>
                            {item.profileImg ? (
                                <Image
                                    source={{ uri: item.profileImg }}
                                    style={commercialservicestyles.userimage}
                                />
                            ) : (
                                <View style={[commercialservicestyles.userimage, commercialservicestyles.fallbackContainer]}>
                                    <MaterialIcons name="person" size={40} color="#999" />
                                </View>
                            )}
                            <View style={commercialservicestyles.gap}>
                                <View style={commercialservicestyles.userTextWidth}>
                                    <View style={commercialservicestyles.userTextgap}>
                                        <Text style={commercialservicestyles.textSize}>{providerName}</Text>
                                        <View style={commercialservicestyles.verified}>
                                            <Image source={Icons.Ellipse}/>
                                            <Text style={{fontSize:9,fontWeight:'600',lineHeight:10,letterSpacing:0,color:'#299F4D'}}>Open</Text>
                                        </View>
                                    </View>
                                    <View style={commercialservicestyles.verified}>
                                        <Image source={Icons.MdVerifiedUser} />
                                        <Text style={commercialservicestyles.verifyText}>Verified</Text>
                                    </View>
                                </View>

                                <View style={commercialservicestyles.viewFlex}>
                                    <View style={commercialservicestyles.setIconTextGap}>
                                        <Image source={Icons.BiTimeFive} style={commercialservicestyles.setImageIconPosition}/>
                                        <Text style={commercialservicestyles.setTextSize}>10:00 am - 09:00 pm</Text>
                                    </View>

                                    <View style={commercialservicestyles.ratingGap}>
                                        <Image source={Icons.StarIcon} style={commercialservicestyles.ratingHeight} />
                                        <Text style={commercialservicestyles.ratePointSize}>{rating}</Text>
                                    </View>
                                </View>

                                <View style={commercialservicestyles.widthSpace}>
                                    <View style={commercialservicestyles.iconAndTextGap}>
                                        <Image
                                            source={Icons.RiPinDistanceLine}
                                            style={commercialservicestyles.setImageIconPosition}
                                        />
                                        <Text style={commercialservicestyles.setDigitSize}>2.2km Away</Text>
                                    </View>

                                    <View style={commercialservicestyles.iconTextSpace}>
                                        <Text style={commercialservicestyles.bold}>₹ 200 <Text style={commercialservicestyles.weekText}>/week</Text></Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={[commercialservicestyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#58B9D0" />
                <Text style={{ marginTop: 10, color: '#666' }}>Loading commercial services...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[commercialservicestyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
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
        <View style={commercialservicestyles.container}>
            <FlatList
                data={boardingData}
                renderItem={renderBoardingItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={commercialservicestyles.contentContainerStyle}
                ListEmptyComponent={() => (
                    <View style={[commercialservicestyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                        <Text style={{ color: '#666', textAlign: 'center' }}>No commercial boarding services available</Text>
                    </View>
                )}
            />
        </View>
    );
};


export default CommercialService;
