
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ActivityIndicator, FlatList, Alert, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icons from '../../../assets/icons';
import boardinguserstyles from './boardinguser.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, RouteProp } from '@react-navigation/native';
import { API_CONFIG, API_ENDPOINTS, buildApiUrl, buildQueryString, buildQueryStringWithoutEncoding, apiRequest } from '../../config/api';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

// Define your navigation stack's param list
type RootStackParamList = {
    UserDetails: undefined;
    CalendarSheet:undefined;
    TrainingLocalAddress:{section: string};
    Boarding:{section: string};
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
};

// Define the navigation prop type
type BoardingUserScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'BoardingUser'>;
type BoardingUserScreenRouteProp = RouteProp<RootStackParamList, 'BoardingUser'>;

// Define props interface for the component
interface BoardingUserProps {
    navigation: BoardingUserScreenNavigationProp;
    route: BoardingUserScreenRouteProp;
}

const BoardingUser: React.FC<BoardingUserProps> = ({ navigation, route }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [boardingData, setBoardingData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    
    // Get route params with defaults and validation
    const { selectedDate, selectedTime, city } = route.params || {
        selectedDate: new Date().toISOString().split('T')[0],
        selectedTime: '10:00:00',
        city: 'Kolkata'
    };

    // Validate and format the parameters
    const formatTime = (time: string) => {
        if (!time) return '10:00:00';
        
        // Handle AM/PM format (e.g., "9:30 AM" -> "9:30:00")
        if (time.includes('AM') || time.includes('PM')) {
            const [timePart, period] = time.split(' ');
            const [hours, minutes] = timePart.split(':');
            let hour = parseInt(hours);
            
            if (period === 'PM' && hour !== 12) {
                hour += 12;
            } else if (period === 'AM' && hour === 12) {
                hour = 0;
            }
            
            return `${hour}:${minutes || '00'}:00`;
        }
        
        // Handle HH:MM format -> HH:MM:00
        if (time.includes(':')) {
            const parts = time.split(':');
            if (parts.length === 2) {
                // Ensure we have proper formatting (e.g., "6:30" -> "6:30:00")
                return `${parts[0]}:${parts[1]}:00`;
            } else if (parts.length === 3) {
                return time; // Already in HH:MM:SS format
            }
        }
        
        return '10:00:00';
    };

    const formattedTime = formatTime(selectedTime);
    const formattedCity = city ? city.toLowerCase().trim() : 'howrah';

    // Debug: Log the time formatting
    console.log('Original time:', selectedTime);
    console.log('Formatted time:', formattedTime);

    // Fetch boarding services on component mount
    useEffect(() => {
        fetchBoardingServices();
    }, [selectedDate, formattedTime, formattedCity]);

    // Helper function to log API response structure
    const logResponseStructure = (data: any, prefix = 'Response') => {
        console.log(`${prefix}:`, JSON.stringify(data, null, 2));
        if (Array.isArray(data) && data.length > 0) {
            console.log(`${prefix} - First item structure:`, Object.keys(data[0]));
            console.log(`${prefix} - Sample item:`, data[0]);
        }
    };

    const fetchBoardingServices = async () => {
        try {
            setLoading(true);
            setError('');
            
            // Build query parameters
            const queryParams = {
                date: selectedDate,
                time: formattedTime,
                city: formattedCity
            };
            
            // Build the complete URL with query parameters (custom to avoid encoding colons)
            const baseUrl = `${API_CONFIG.BASE_URL}${API_ENDPOINTS.SERVICES.BOARDING_AVAILABILITY}`;
            const customQueryString = buildQueryStringWithoutEncoding(queryParams);
            const fullUrl = `${baseUrl}?${customQueryString}`;
            
            console.log('Fetching boarding services from:', fullUrl);
            console.log('Query parameters:', queryParams);
            console.log('Formatted time:', formattedTime);
            console.log('Custom query string (no encoding):', customQueryString);
            console.log('Regular query string (with encoding):', buildQueryString(queryParams));
            
            try {
                // Try using the apiRequest helper first with custom query string
                const response = await apiRequest(API_ENDPOINTS.SERVICES.BOARDING_AVAILABILITY + `?${customQueryString}`);
                
                // Log the response structure for debugging
                logResponseStructure(response, 'API Response');
                
                // Log success message if available
                if (response && response.message) {
                    console.log('API Success Message:', response.message);
                }
                
                // Handle response data
                if (response && Array.isArray(response)) {
                    console.log('Using response directly as array, length:', response.length);
                    setBoardingData(response);
                } else if (response && response.body && Array.isArray(response.body)) {
                    console.log('Using response.body as array, length:', response.body.length);
                    setBoardingData(response.body);
                } else if (response && response.data && Array.isArray(response.data)) {
                    console.log('Using response.data as array, length:', response.data.length);
                    setBoardingData(response.data);
                } else if (response && response.services && Array.isArray(response.services)) {
                    console.log('Using response.services as array, length:', response.services.length);
                    setBoardingData(response.services);
                } else if (response && response.result && Array.isArray(response.result)) {
                    console.log('Using response.result as array, length:', response.result.length);
                    setBoardingData(response.result);
                } else {
                    console.log('Unexpected response format:', response);
                    console.log('Response keys:', response ? Object.keys(response) : 'null');
                    setBoardingData([]);
                }
                
            } catch (apiError) {
                console.log('apiRequest failed, trying manual fetch:', apiError);
                
                // Fallback to manual fetch
                const fetchResponse = await fetch(fullUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });
                
                if (!fetchResponse.ok) {
                    throw new Error(`HTTP ${fetchResponse.status}: ${fetchResponse.statusText}`);
                }
                
                const data = await fetchResponse.json();
                logResponseStructure(data, 'Manual Fetch Response');
                
                // Log success message if available
                if (data && data.message) {
                    console.log('Manual Fetch Success Message:', data.message);
                }
                
                // Handle manual fetch response data
                if (Array.isArray(data)) {
                    setBoardingData(data);
                } else if (data && data.body && Array.isArray(data.body)) {
                    setBoardingData(data.body);
                } else if (data && data.data && Array.isArray(data.data)) {
                    setBoardingData(data.data);
                } else if (data && data.services && Array.isArray(data.services)) {
                    setBoardingData(data.services);
                } else if (data && data.result && Array.isArray(data.result)) {
                    setBoardingData(data.result);
                } else {
                    console.log('Unexpected manual fetch response format:', data);
                    setBoardingData([]);
                }
            }
            
        } catch (error: any) {
            console.error('Error fetching boarding services:', error);
            setError(error.message || 'Failed to fetch boarding services');
            
            // Show user-friendly error message
            Alert.alert(
                'Error', 
                'Unable to load boarding services. Please check your internet connection and try again.',
                [
                    { text: 'Retry', onPress: fetchBoardingServices },
                    { text: 'Cancel', style: 'cancel' }
                ]
            );
        } finally {
            setLoading(false);
        }
    };

    // Filter boarding data based on search query
    const filteredData = boardingData.filter(item => {
        const searchLower = searchQuery.toLowerCase();
        return (
            // Handle actual API response structure
            item.boarding?.facilityName?.toLowerCase().includes(searchLower) ||
            item.facilityName?.toLowerCase().includes(searchLower) ||
            item.name?.toLowerCase().includes(searchLower) ||
            item.boarding?.user?.firstName?.toLowerCase().includes(searchLower) ||
            item.boarding?.user?.lastName?.toLowerCase().includes(searchLower) ||
            item.user?.firstName?.toLowerCase().includes(searchLower) ||
            item.user?.lastName?.toLowerCase().includes(searchLower) ||
            item.provider?.name?.toLowerCase().includes(searchLower) ||
            item.mode?.value?.toLowerCase().includes(searchLower) ||
            item.serviceMode?.toLowerCase().includes(searchLower) ||
            item.description?.toLowerCase().includes(searchLower)
        );
    });

    const renderBoardingItem = ({ item }: { item: any }) => {
        // Flexible data extraction to handle different API response structures
        const facilityName = item.boarding?.facilityName || 
                            item.facilityName || 
                            item.name || 
                            item.serviceName || 
                            'Boarding Service';
                            
        const providerName = item.boarding?.user ? 
                           `${item.boarding.user.firstName || ''} ${item.boarding.user.lastName || ''}`.trim() :
                           item.user ? 
                           `${item.user.firstName || ''} ${item.user.lastName || ''}`.trim() :
                           item.provider?.name ||
                           item.providerName ||
                           'Provider';
                           
        const serviceMode = item.mode?.value || 
                           item.serviceMode || 
                           item.boarding?.mode?.value ||
                           item.type ||
                           'Standard Service';
                           
        const availableDay = item.day?.name || 
                           item.availableDay || 
                           item.dayName ||
                           item.availability?.day ||
                           'Available';
                           
        const timeSlot = item.startTime && item.endTime ? 
                        `${item.startTime} - ${item.endTime}` :
                        item.time ||
                        item.timeSlot ||
                        item.availability?.time ||
                        selectedTime;
                        
        const rating = item.averageReview || 
                      item.rating || 
                      item.averageRating ||
                      item.boarding?.rating ||
                      4.0;
                      
        const boardingId = item.boarding?.id || 
                          item.id || 
                          item.serviceId ||
                          item.providerId;
                          
        const price = item.price || 
                     item.boarding?.price || 
                     item.cost ||
                     item.pricePerDay ||
                     '500';
                     
        const priceUnit = item.priceUnit || 
                         item.unit ||
                         '/day';

        return (
            <View style={boardinguserstyles.boardingCard}>
                <TouchableOpacity
                    style={boardinguserstyles.cardContent}
                    onPress={() => navigation.navigate('BoardingDetails', {
                        providerId: boardingId,
                        serviceId: item.id || item.boarding?.id || boardingId,
                        selectedDate,
                        selectedTime,
                        city
                    })}
                >
                    <View style={boardinguserstyles.providerInfo}>
                        <Text style={boardinguserstyles.providerName}>
                            {facilityName}
                        </Text>
                        <Text style={boardinguserstyles.providerLocation}>
                            Managed by: {providerName}
                        </Text>
                        <Text style={boardinguserstyles.providerDescription}>
                            {serviceMode}
                        </Text>
                        
                        <View style={boardinguserstyles.scheduleInfo}>
                            <Text style={boardinguserstyles.scheduleText}>
                                📅 Available on {availableDay}
                            </Text>
                            <Text style={boardinguserstyles.scheduleText}>
                                ⏰ {timeSlot}
                            </Text>
                        </View>
                    </View>
                    
                    <View style={boardinguserstyles.cardActions}>
                        <View style={boardinguserstyles.ratingContainer}>
                            <MaterialIcons name="star" size={16} color="#FFD700" />
                            <Text style={boardinguserstyles.ratingText}>
                                {rating.toFixed(1)}
                            </Text>
                        </View>
                        <Text style={boardinguserstyles.priceText}>
                            ₹{price}{priceUnit}
                        </Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity
                    style={boardinguserstyles.bookNowButton}
                    onPress={() => navigation.navigate('BoardingDetails', {
                        providerId: boardingId,
                        serviceId: item.id || item.boarding?.id || boardingId,
                        selectedDate,
                        selectedTime,
                        city
                    })}
                >
                    <MaterialIcons name="arrow-forward" size={22} color="#58B9D0" />
                    <Text style={boardinguserstyles.bookNowText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={boardinguserstyles.parentContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
            
            {/* Header - Matching Services Page Style */}
            <View style={boardinguserstyles.servicesStyleHeader}>
                <TouchableOpacity onPress={() => navigation.navigate('Boarding', { section: 'boarding' })} style={boardinguserstyles.backButtonContainer}>
                    <Image
                        source={Icons.LeftArrow}
                        style={boardinguserstyles.newServicesBackIcon}
                    />
                </TouchableOpacity>
                <View style={boardinguserstyles.servicesHeaderTitleContainer}>
                    <Text style={boardinguserstyles.newServicesHeaderTitle}>Boarding Services</Text>
                    <Text style={boardinguserstyles.servicesHeaderSubtitle}>Available services for your selected preferences</Text>
                </View>
            </View>

            <View style={boardinguserstyles.dateTimeInfoCard}>
                <View style={boardinguserstyles.infoItem}>
                    <Text style={boardinguserstyles.infoLabel}>Date</Text>
                    <Text style={boardinguserstyles.infoValue}>{selectedDate}</Text>
                </View>
                <View style={boardinguserstyles.infoItem}>
                    <Text style={boardinguserstyles.infoLabel}>Time</Text>
                    <Text style={boardinguserstyles.infoValue}>{formattedTime}</Text>
                </View>
                <View style={boardinguserstyles.infoItem}>
                    <Text style={boardinguserstyles.infoLabel}>City</Text>
                    <Text style={boardinguserstyles.infoValue}>{formattedCity}</Text>
                </View>
            </View>

            {loading && (
                <View style={boardinguserstyles.loadingContainer}>
                    <ActivityIndicator size="large" color="#58B9D0" />
                    <Text style={boardinguserstyles.loadingText}>Loading boarding services...</Text>
                </View>
            )}

            {error && !loading && (
                <View style={boardinguserstyles.errorContainer}>
                    <MaterialIcons name="error-outline" size={48} color="#FF5252" />
                    <Text style={boardinguserstyles.errorText}>
                        Failed to load boarding services. Please check your internet connection.
                    </Text>
                    <TouchableOpacity 
                        style={boardinguserstyles.retryButton}
                        onPress={fetchBoardingServices}
                    >
                        <Text style={boardinguserstyles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            )}

            {!loading && !error && (
                <FlatList
                    data={filteredData}
                    renderItem={renderBoardingItem}
                    keyExtractor={(item, index) => (
                        item.id?.toString() || 
                        item.boarding?.id?.toString() || 
                        index.toString()
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ 
                        paddingBottom: responsiveHeight(12),
                        flexGrow: 1
                    }}
                    ListHeaderComponent={() => (
                        <View style={boardinguserstyles.searchContainer}>
                            <View style={boardinguserstyles.searchInputContainer}>
                                <MaterialIcons name="search" size={24} color="#999" />
                                <TextInput
                                    placeholder="Search for Boarding Services"
                                    placeholderTextColor="#999"
                                    style={boardinguserstyles.searchInput}
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                />
                            </View>
                            <TouchableOpacity style={boardinguserstyles.filterButton}>
                                <MaterialIcons name="filter-list" size={24} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <View style={boardinguserstyles.emptyContainer}>
                            <MaterialIcons name="pets" size={64} color="#CCC" />
                            <Text style={boardinguserstyles.emptyText}>
                                {searchQuery 
                                    ? `No boarding services found for "${searchQuery}"` 
                                    : `No boarding services available for ${selectedDate} at ${formattedTime} in ${formattedCity}.`
                                }
                            </Text>
                            <Text style={boardinguserstyles.debugText}>
                                Search parameters: Date: {selectedDate}, Time: {formattedTime}, City: {formattedCity}
                            </Text>
                            <Text style={boardinguserstyles.debugText}>
                                API URL: /api/boarding-service-availibility/by-day?{buildQueryStringWithoutEncoding({ date: selectedDate, time: formattedTime, city: formattedCity })}
                            </Text>
                            <Text style={boardinguserstyles.debugText}>
                                Total services loaded: {boardingData.length}
                            </Text>
                            {searchQuery && (
                                <TouchableOpacity 
                                    style={boardinguserstyles.retryButton}
                                    onPress={() => setSearchQuery('')}
                                >
                                    <Text style={boardinguserstyles.retryButtonText}>Clear Search</Text>
                                </TouchableOpacity>
                            )}
                            {!searchQuery && (
                                <TouchableOpacity 
                                    style={boardinguserstyles.retryButton}
                                    onPress={fetchBoardingServices}
                                >
                                    <Text style={boardinguserstyles.retryButtonText}>Refresh</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                />
            )}
        </View>
    );
};

export default BoardingUser;
