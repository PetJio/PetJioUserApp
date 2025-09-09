import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import boardingdetailstyles from './boardingdetails.styles';
import BoardingAbout from './BoardingAbout';
import BoardingReview from './BoardingReview';

// Define your navigation stack's param list
type RootStackParamList = {
    UserDetails: undefined;
    CalendarSheet: undefined;
    TrainingLocalAddress: {section: string};
    Boarding: {section: string};
    BoardingDetails: {
        providerId?: number;
        selectedDate: string;
        selectedTime: string;
        city: string;
    };
    BoardingUser: {
        selectedDate: string;
        selectedTime: string;
        city: string;
    };
    BoardingRegistrationform: undefined;
    BoardingPackage: undefined;
};

// Define the navigation prop type
type BoardingDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BoardingDetails'>;
type BoardingDetailsScreenRouteProp = RouteProp<RootStackParamList, 'BoardingDetails'>;

// Define props interface for the component
interface BoardingDetailsProps {
    navigation: BoardingDetailsScreenNavigationProp;
    route: BoardingDetailsScreenRouteProp;
}

const BoardingDetails: React.FC<BoardingDetailsProps> = ({ navigation, route }) => {
    const [selectedTab, setSelectedTab] = useState<string>('about');
    const [providerData, setProviderData] = useState<any>(null);

    // Get route params with defaults
    const { providerId = 1, selectedDate, selectedTime, city } = route.params || {
        providerId: 1,
        selectedDate: new Date().toISOString().split('T')[0],
        selectedTime: '10:00 AM',
        city: 'Kolkata'
    };

    useEffect(() => {
        // Load provider details based on the providerId
        const demoProvider = {
            id: providerId,
            name: 'Kiara Das',
            rating: 4.8,
            reviews: 856,
            experience: '3+ years',
            location: city,
            image: 'https://via.placeholder.com/150',
            verified: true,
            price: '₹500',
            priceUnit: '/day',
            availability: 'Available',
            distance: '700m away from you',
            description: 'Experienced pet boarder with a love for all animals. I provide a safe, loving home environment for your pets.',
            timeSlot: '10:00 am - 09:00 pm'
        };
        setProviderData(demoProvider);
    }, [providerId, city]);

    const handleTabPress = (tab: string) => {
        setSelectedTab(tab);
    };

    const handleBooking = () => {
        navigation.navigate('BoardingRegistrationform');
    };

    if (!providerData) {
        return (
            <View style={boardingdetailstyles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={boardingdetailstyles.container}>
            {/* Header */}
            <View style={boardingdetailstyles.containerchild}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}>
                    <View style={boardingdetailstyles.containerfirstsubchild}>
                        <MaterialIcons name="arrow-back" size={24} color="#000" />
                    </View>
                </TouchableOpacity>
                <View style={boardingdetailstyles.locationtext}>
                    <TouchableOpacity>
                        <MaterialIcons name="call" size={24} color="#4CAF50" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name="favorite-border" size={24} color="#FF6B6B" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Provider Card */}
            <View style={boardingdetailstyles.containerthirdsubchild}>
                <View style={boardingdetailstyles.shadow}>
                    <Image
                        source={{ uri: providerData.image }}
                        style={boardingdetailstyles.userimage}
                        defaultSource={require('../../../assets/images/userImage.png')}
                    />
                    
                    <View style={boardingdetailstyles.gap}>
                        <View style={boardingdetailstyles.userTextWidth}>
                            <View style={boardingdetailstyles.userTextgap}>
                                <Text style={boardingdetailstyles.textSize}>
                                    {providerData.name}
                                </Text>
                            </View>
                            {providerData.verified && (
                                <View style={boardingdetailstyles.ratingGap}>
                                    <MaterialIcons name="verified" size={18} color="#4CAF50" />
                                    <Text style={boardingdetailstyles.verifyText}>Verified</Text>
                                </View>
                            )}
                        </View>

                        <View style={boardingdetailstyles.flex}>
                            <View style={boardingdetailstyles.setIconTextGap}>
                                <MaterialIcons name="access-time" size={16} color="#666" />
                                <Text style={boardingdetailstyles.setTextSize}>
                                    {providerData.timeSlot}
                                </Text>
                            </View>
                            <View style={boardingdetailstyles.ratingGap}>
                                <MaterialIcons name="star" size={16} color="#FFB800" />
                                <Text style={boardingdetailstyles.ratePointSize}>
                                    {providerData.rating}
                                </Text>
                            </View>
                        </View>
                        
                        <View style={boardingdetailstyles.widthSpace}>
                            <View style={boardingdetailstyles.iconAndTextGap}>
                                <MaterialIcons name="location-on" size={16} color="#666" />
                                <Text style={boardingdetailstyles.setDigitSize}>
                                    {providerData.distance}
                                </Text>
                            </View>

                            <View style={boardingdetailstyles.iconTextSpace}>
                                <Text style={boardingdetailstyles.bold}>
                                    {providerData.price}
                                </Text>
                                <Text>{providerData.priceUnit}</Text>
                            </View>
                        </View>

                        {/* Booking Details */}
                        <View style={boardingdetailstyles.gap}>
                            <Text style={boardingdetailstyles.textSize}>Booking Details</Text>
                            <Text style={boardingdetailstyles.setTextSize}>Date: {selectedDate}</Text>
                            <Text style={boardingdetailstyles.setTextSize}>Time: {selectedTime}</Text>
                            <Text style={boardingdetailstyles.setTextSize}>City: {city}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Tab Navigation */}
            <View style={boardingdetailstyles.menuTitleContainer}>
                <TouchableOpacity
                    onPress={() => handleTabPress('about')}>
                    <View style={boardingdetailstyles.menuTitleAlignment}>
                        <Text
                            style={[
                                boardingdetailstyles.serviceText,
                                selectedTab === 'about' &&
                                    boardingdetailstyles.commonTextColor,
                            ]}>
                            About
                        </Text>
                        {selectedTab === 'about' && (
                            <View
                                style={
                                    boardingdetailstyles.menuBottomBoarder
                                }
                            />
                        )}
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => handleTabPress('reviews')}>
                    <View style={boardingdetailstyles.menuTitleAlignment}>
                        <Text
                            style={[
                                boardingdetailstyles.reviewsText,
                                selectedTab === 'reviews' &&
                                    boardingdetailstyles.commonTextColor,
                            ]}>
                            Reviews
                        </Text>
                        {selectedTab === 'reviews' && (
                            <View
                                style={
                                    boardingdetailstyles.menuBottomBoarder
                                }
                            />
                        )}
                    </View>
                </TouchableOpacity>
            </View>

            {/* Tab Content */}
            {selectedTab === 'about' && (
                <BoardingAbout description={providerData.description} />
            )}
            {selectedTab === 'reviews' && (
                <BoardingReview rating={providerData.rating} reviews={providerData.reviews} />
            )}

            {/* Book Now Button */}
            <View style={boardingdetailstyles.bottomButtonContainer}>
                <TouchableOpacity 
                    style={boardingdetailstyles.bottomButton}
                    onPress={handleBooking}>
                    <Text style={boardingdetailstyles.bottomButtonText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BoardingDetails;
