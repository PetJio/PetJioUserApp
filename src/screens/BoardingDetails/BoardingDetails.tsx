import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, Alert, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import boardingdetailstyles from './boardingdetails.styles';
import BoardingAbout from './BoardingAbout';
import BoardingReview from './BoardingReview';
import Icons from '../../../assets/icons';
import { apiRequest, buildApiUrl } from '../../config/api';
import { responsiveHeight } from 'react-native-responsive-dimensions';

// Define your navigation stack's param list
type RootStackParamList = {
    UserDetails: undefined;
    CalendarSheet: undefined;
    TrainingLocalAddress: {section: string};
    Boarding: {section: string};
    BoardingDetails: {
        providerId?: number;
        serviceId?: number;
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
    const [serviceDetails, setServiceDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    // Get route params with defaults
    const { providerId = 1, serviceId = 26, selectedDate, selectedTime, city } = route.params || {
        providerId: 1,
        serviceId: 26,
        selectedDate: new Date().toISOString().split('T')[0],
        selectedTime: '10:00 AM',
        city: 'Kolkata'
    };

    useEffect(() => {
        fetchServiceDetails();
    }, [serviceId]);

    const fetchServiceDetails = async () => {
        try {
            setLoading(true);
            setError('');
            
            console.log('Fetching service details for serviceId:', serviceId);
            
            // Call the API endpoint
            const response = await apiRequest(
                `/api/boarding-service/get-service-details/${serviceId}`,
                {
                    method: 'GET',
                }
            );
            
            console.log('Service details API response:', JSON.stringify(response, null, 2));
            
            // Handle the response structure
            let serviceData = null;
            if (response && response.body) {
                serviceData = response.body;
            } else if (response) {
                serviceData = response;
            }
            
            if (serviceData) {
                setServiceDetails(serviceData);
                console.log('Service details set successfully');
            } else {
                throw new Error('No service data received');
            }
            
        } catch (error: any) {
            console.error('Error fetching service details:', error);
            setError(error.message || 'Failed to fetch service details');
            
            // Show user-friendly error message
            Alert.alert(
                'Error',
                'Unable to load service details. Please check your internet connection and try again.',
                [
                    { text: 'Retry', onPress: fetchServiceDetails },
                    { text: 'Cancel', style: 'cancel' }
                ]
            );
        } finally {
            setLoading(false);
        }
    };

    const handleTabPress = (tab: string) => {
        setSelectedTab(tab);
    };

    const handleBooking = () => {
        navigation.navigate('BoardingRegistrationform');
    };

    if (loading) {
        return (
            <View style={boardingdetailstyles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
                
                {/* Header */}
                <View style={boardingdetailstyles.servicesStyleHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={boardingdetailstyles.backButtonContainer}>
                        <Image
                            source={Icons.LeftArrow}
                            style={boardingdetailstyles.newServicesBackIcon}
                        />
                    </TouchableOpacity>
                    <View style={boardingdetailstyles.servicesHeaderTitleContainer}>
                        <Text style={boardingdetailstyles.newServicesHeaderTitle}>Boarding Details</Text>
                        <Text style={boardingdetailstyles.servicesHeaderSubtitle}>Service provider information</Text>
                    </View>
                </View>
                
                <View style={boardingdetailstyles.loadingContainer}>
                    <ActivityIndicator size="large" color="#58B9D0" />
                    <Text style={boardingdetailstyles.loadingText}>Loading service details...</Text>
                </View>
            </View>
        );
    }

    if (error) {
        return (
            <View style={boardingdetailstyles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
                
                {/* Header */}
                <View style={boardingdetailstyles.servicesStyleHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={boardingdetailstyles.backButtonContainer}>
                        <Image
                            source={Icons.LeftArrow}
                            style={boardingdetailstyles.newServicesBackIcon}
                        />
                    </TouchableOpacity>
                    <View style={boardingdetailstyles.servicesHeaderTitleContainer}>
                        <Text style={boardingdetailstyles.newServicesHeaderTitle}>Boarding Details</Text>
                        <Text style={boardingdetailstyles.servicesHeaderSubtitle}>Service provider information</Text>
                    </View>
                </View>
                
                <View style={boardingdetailstyles.errorContainer}>
                    <MaterialIcons name="error-outline" size={48} color="#FF6B6B" />
                    <Text style={boardingdetailstyles.errorTitle}>Unable to Load Details</Text>
                    <Text style={boardingdetailstyles.errorText}>{error}</Text>
                    <TouchableOpacity style={boardingdetailstyles.retryButton} onPress={fetchServiceDetails}>
                        <Text style={boardingdetailstyles.retryButtonText}>Try Again</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    if (!serviceDetails) {
        return (
            <View style={boardingdetailstyles.container}>
                <Text>No service details available</Text>
            </View>
        );
    }

    // Extract data from API response
    const providerName = serviceDetails.boarding?.user ? 
        `${serviceDetails.boarding.user.firstName || ''} ${serviceDetails.boarding.user.lastName || ''}`.trim() :
        'Service Provider';
        
    const facilityName = serviceDetails.boarding?.facilityName || 'Boarding Facility';
    const price = serviceDetails.price ? `₹${serviceDetails.price}` : '₹500';
    const rating = serviceDetails.averageRating || 4.0;
    const address = serviceDetails.boarding?.user?.address || city;
    const experience = serviceDetails.boarding?.experience || 3;
    const description = serviceDetails.boarding?.description || 'Professional boarding service for your pets';

    return (
        <View style={boardingdetailstyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
            
            {/* Header - Matching Services Page Style */}
            <View style={boardingdetailstyles.servicesStyleHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={boardingdetailstyles.backButtonContainer}>
                    <Image
                        source={Icons.LeftArrow}
                        style={boardingdetailstyles.newServicesBackIcon}
                    />
                </TouchableOpacity>
                <View style={boardingdetailstyles.servicesHeaderTitleContainer}>
                    <Text style={boardingdetailstyles.newServicesHeaderTitle}>Boarding Details</Text>
                    <Text style={boardingdetailstyles.servicesHeaderSubtitle}>Service provider information</Text>
                </View>
                <View style={boardingdetailstyles.headerActionsContainer}>
                    <TouchableOpacity>
                        <MaterialIcons name="call" size={24} color="#4CAF50" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialIcons name="favorite-border" size={24} color="#FF6B6B" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 110 }}
            >
                {/* Provider Card */}
                <View style={boardingdetailstyles.providerCard}>
                    <Image
                        source={{ uri: serviceDetails.boarding?.profileImg || 'https://via.placeholder.com/150' }}
                        style={boardingdetailstyles.userimage}
                        defaultSource={require('../../../assets/images/userImage.png')}
                    />
                    
                    <View style={boardingdetailstyles.gap}>
                        <View style={boardingdetailstyles.userTextWidth}>
                            <View style={boardingdetailstyles.userTextgap}>
                                <Text style={boardingdetailstyles.textSize}>
                                    {providerName}
                                </Text>
                            </View>
                            <View style={boardingdetailstyles.ratingGap}>
                                <MaterialIcons name="verified" size={18} color="#4CAF50" />
                                <Text style={boardingdetailstyles.verifyText}>Verified</Text>
                            </View>
                        </View>

                        <View style={boardingdetailstyles.flex}>
                            <View style={boardingdetailstyles.setIconTextGap}>
                                <MaterialIcons name="access-time" size={16} color="#666" />
                                <Text style={boardingdetailstyles.setTextSize}>
                                    10:00 am - 09:00 pm
                                </Text>
                            </View>
                            <View style={boardingdetailstyles.ratingGap}>
                                <MaterialIcons name="star" size={16} color="#FFB800" />
                                <Text style={boardingdetailstyles.ratePointSize}>
                                    {rating}
                                </Text>
                            </View>
                        </View>
                        
                        <View style={boardingdetailstyles.widthSpace}>
                            <View style={boardingdetailstyles.iconAndTextGap}>
                                <MaterialIcons name="location-on" size={16} color="#58B9D0" />
                                <Text style={boardingdetailstyles.setDigitSize}>
                                    {address.length > 30 ? `${address.substring(0, 30)}...` : address}
                                </Text>
                            </View>

                            <View style={boardingdetailstyles.iconTextSpace}>
                                <Text style={boardingdetailstyles.bold}>
                                    {price}
                                </Text>
                            </View>
                        </View>

                        {/* Booking Details */}
                        <View style={boardingdetailstyles.bookingDetailsSection}>
                            <Text style={boardingdetailstyles.bookingDetailsTitle}>Booking Details</Text>
                            
                            <View style={boardingdetailstyles.bookingDetailItem}>
                                <Text style={boardingdetailstyles.bookingDetailLabel}>Date:</Text>
                                <Text style={boardingdetailstyles.bookingDetailValue}>{selectedDate}</Text>
                            </View>
                            
                            <View style={boardingdetailstyles.bookingDetailItem}>
                                <Text style={boardingdetailstyles.bookingDetailLabel}>Time:</Text>
                                <Text style={boardingdetailstyles.bookingDetailValue}>{selectedTime}</Text>
                            </View>
                            
                            <View style={boardingdetailstyles.bookingDetailItem}>
                                <Text style={boardingdetailstyles.bookingDetailLabel}>City:</Text>
                                <Text style={boardingdetailstyles.bookingDetailValue}>{city}</Text>
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
                <BoardingAbout 
                    serviceDetails={serviceDetails}
                    description={description}
                    providerName={providerName}
                    facilityName={facilityName}
                    experience={experience}
                />
            )}
            {selectedTab === 'reviews' && (
                <BoardingReview rating={rating} reviews={150} serviceId={serviceId} />
            )}
            </ScrollView>

            {/* Floating Book Now Button */}
            <View style={boardingdetailstyles.floatingButtonContainer}>
                <TouchableOpacity 
                    style={boardingdetailstyles.floatingButton}
                    onPress={handleBooking}>
                    <MaterialIcons name="arrow-forward" size={22} color="#58B9D0" />
                    <Text style={boardingdetailstyles.floatingButtonText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BoardingDetails;
