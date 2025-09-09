import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Image,
    Modal,
    FlatList,
    Alert,
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icons from '../../../assets/icons';
import boardingstyles from './boarding.styles';
import profileStyles from '../Profile/profileStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// Define your navigation stack's param list
type RootStackParamList = {
    Locality: undefined;
    Grooming: undefined;
    HomeService: undefined;
    Main: undefined;
    BoardingUser: { selectedDate: string; selectedTime: string; city: string };
    Boarding: undefined;
};

// Define the navigation prop type
type BoardingScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Boarding'
>;

// Define props interface for the component
interface BoardingProps {
    navigation: BoardingScreenNavigationProp;
}

const Boarding: React.FC<BoardingProps> = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [showCityModal, setShowCityModal] = useState<boolean>(false);
    const [showTimeModal, setShowTimeModal] = useState<boolean>(false);

    // Auto-detect location on component mount - Removed as per requirements
    useEffect(() => {
        // Set default city to Kolkata instead of auto-detection
        setSelectedCity('Kolkata');
    }, []);

    // Debug modal visibility
    useEffect(() => {
        console.log('Time Modal visibility changed:', showTimeModal);
    }, [showTimeModal]);

    useEffect(() => {
        console.log('City Modal visibility changed:', showCityModal);
    }, [showCityModal]);

    // Function to convert time from 12-hour to 24-hour format
    const convertTo24Hour = (time12h: string): string => {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        
        if (hours === '12') {
            hours = '00';
        }
        
        if (modifier === 'PM') {
            hours = (parseInt(hours, 10) + 12).toString();
        }
        
        return `${hours.padStart(2, '0')}:${minutes}:00`;
    };

    const handleNext = () => {
        if (!selectedDate || !selectedTime || !selectedCity) {
            alert('Please select date, time, and city');
            return;
        }

        // Format time to 24-hour format for API
        const formattedTime = convertTo24Hour(selectedTime);
        
        // Navigate to BoardingUser with parameters
        navigation.navigate('BoardingUser', {
            selectedDate,
            selectedTime: formattedTime,
            city: selectedCity
        });
    };

    const cities = [
        { label: 'Select City', value: '' },
        { label: 'Kolkata', value: 'Kolkata' },
        { label: 'Howrah', value: 'Howrah' },
        { label: 'Delhi', value: 'Delhi' },
        { label: 'Mumbai', value: 'Mumbai' },
        { label: 'Bangalore', value: 'Bangalore' },
        { label: 'Chennai', value: 'Chennai' },
        { label: 'Pune', value: 'Pune' },
        { label: 'Hyderabad', value: 'Hyderabad' },
    ];

    const timeSlots = [
        { label: 'Select Time', value: '' },
        { label: '9:00 AM', value: '9:00 AM' },
        { label: '9:30 AM', value: '9:30 AM' },
        { label: '10:00 AM', value: '10:00 AM' },
        { label: '10:30 AM', value: '10:30 AM' },
        { label: '11:00 AM', value: '11:00 AM' },
        { label: '11:30 AM', value: '11:30 AM' },
        { label: '12:00 PM', value: '12:00 PM' },
        { label: '12:30 PM', value: '12:30 PM' },
        { label: '1:00 PM', value: '1:00 PM' },
        { label: '1:30 PM', value: '1:30 PM' },
        { label: '2:00 PM', value: '2:00 PM' },
        { label: '2:30 PM', value: '2:30 PM' },
        { label: '3:00 PM', value: '3:00 PM' },
        { label: '3:30 PM', value: '3:30 PM' },
        { label: '4:00 PM', value: '4:00 PM' },
        { label: '4:30 PM', value: '4:30 PM' },
        { label: '5:00 PM', value: '5:00 PM' },
        { label: '5:30 PM', value: '5:30 PM' },
        { label: '6:00 PM', value: '6:00 PM' },
        { label: '6:30 PM', value: '6:30 PM' },
        { label: '7:00 PM', value: '7:00 PM' },
        { label: '7:30 PM', value: '7:30 PM' },
        { label: '8:00 PM', value: '8:00 PM' },
        { label: '8:30 PM', value: '8:30 PM' }
    ];

    return (
        <View style={boardingstyles.parentContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
            
            {/* Header - Matching Services Page Style */}
            <View style={boardingstyles.servicesStyleHeader}>
                <TouchableOpacity onPress={() => navigation.navigate('Main')} style={boardingstyles.backButtonContainer}>
                    <Image
                        source={Icons.LeftArrow}
                        style={boardingstyles.newServicesBackIcon}
                    />
                </TouchableOpacity>
                <View style={boardingstyles.servicesHeaderTitleContainer}>
                    <Text style={boardingstyles.newServicesHeaderTitle}>Boarding</Text>
                    <Text style={boardingstyles.servicesHeaderSubtitle}>Book a safe home for your pet</Text>
                </View>
            </View>

            <ScrollView 
                style={boardingstyles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={boardingstyles.scrollContentReduced}
            >
                {/* Date Selection Card */}
                <View style={boardingstyles.sectionCard}>
                    <View style={boardingstyles.sectionHeader}>
                        <MaterialIcons 
                            name="date-range" 
                            size={24} 
                            color="#58B9D0" 
                            style={boardingstyles.sectionHeaderIcon}
                        />
                        <Text style={boardingstyles.sectionHeaderTitle}>Choose Date</Text>
                    </View>
                    
                    <View style={boardingstyles.calendarContainer}>
                        <Calendar
                            style={boardingstyles.calendar}
                            theme={{
                                backgroundColor: '#FAFBFC',
                                calendarBackground: '#FAFBFC',
                                textSectionTitleColor: '#666',
                                selectedDayBackgroundColor: '#58B9D0',
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: '#58B9D0',
                                dayTextColor: '#1A1D29',
                                textDisabledColor: '#d9e1e8',
                                dotColor: '#58B9D0',
                                selectedDotColor: '#ffffff',
                                arrowColor: '#58B9D0',
                                monthTextColor: '#1A1D29',
                                indicatorColor: '#58B9D0',
                                textDayFontFamily: 'System',
                                textMonthFontFamily: 'System',
                                textDayHeaderFontFamily: 'System',
                                textDayFontWeight: '500',
                                textMonthFontWeight: '600',
                                textDayHeaderFontWeight: '500',
                                textDayFontSize: 14,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 12
                            }}
                            dayComponent={({
                                date,
                                state,
                            }: {
                                date?: DateData;
                                state?: string;
                            }) => {
                                if (!date) return null;
                                const isSelected = selectedDate === date.dateString;
                                return (
                                    <TouchableOpacity
                                        onPress={() =>
                                            setSelectedDate(date.dateString)
                                        }
                                        style={[
                                            boardingstyles.dateButtonWithGaps,
                                            isSelected && boardingstyles.dateButtonSelected
                                        ]}>
                                        <Text
                                            style={[
                                                boardingstyles.dateText,
                                                isSelected && boardingstyles.dateTextSelected,
                                                state === 'disabled' && boardingstyles.dateTextDisabled
                                            ]}>
                                            {date.day}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </View>

                {/* Time Selection Card - Modern Input */}
                <View style={boardingstyles.sectionCard}>
                    <View style={boardingstyles.sectionHeader}>
                        <MaterialIcons 
                            name="access-time" 
                            size={24} 
                            color="#58B9D0" 
                            style={boardingstyles.sectionHeaderIcon}
                        />
                        <Text style={boardingstyles.sectionHeaderTitle}>Choose Time</Text>
                    </View>
                    
                    <TouchableOpacity
                        onPress={() => {
                            console.log('Time dropdown pressed');
                            Alert.alert('Debug', 'Time dropdown pressed!');
                            setShowTimeModal(true);
                        }}
                        style={boardingstyles.modernInputContainer}
                    >
                        <Text style={selectedTime ? boardingstyles.selectedValueText : boardingstyles.placeholderText}>
                            {selectedTime || 'Select Time'}
                        </Text>
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* City Selection Card - Modern Input */}
                <View style={boardingstyles.sectionCard}>
                    <View style={boardingstyles.sectionHeader}>
                        <MaterialIcons 
                            name="location-on" 
                            size={24} 
                            color="#58B9D0" 
                            style={boardingstyles.sectionHeaderIcon}
                        />
                        <Text style={boardingstyles.sectionHeaderTitle}>Choose City</Text>
                    </View>
                    
                    <TouchableOpacity
                        onPress={() => {
                            console.log('City dropdown pressed');
                            Alert.alert('Debug', 'City dropdown pressed!');
                            setShowCityModal(true);
                        }}
                        style={boardingstyles.modernInputContainer}
                    >
                        <Text style={selectedCity ? boardingstyles.selectedValueText : boardingstyles.placeholderText}>
                            {selectedCity || 'Select City'}
                        </Text>
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="#666" />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Enhanced Next Button - Matching Login Page Theme */}
            <View style={boardingstyles.bottomButtonContainer}>
                <TouchableOpacity 
                    onPress={handleNext}
                    style={[
                        profileStyles.commonButton,
                        profileStyles.commonButtonPrimary,
                        boardingstyles.enhancedButton
                    ]}
                    activeOpacity={0.8}
                >
                    <MaterialIcons name="arrow-forward" size={22} color="#58B9D0" />
                    <Text style={[profileStyles.commonButtonText, profileStyles.commonButtonTextPrimary]}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Time Selection Bottom Sheet */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showTimeModal}
                onRequestClose={() => setShowTimeModal(false)}
            >
                <View style={boardingstyles.modalOverlay}>
                    <View style={boardingstyles.bottomSheetContainer}>
                        <View style={boardingstyles.bottomSheetHandle}></View>
                        <View style={boardingstyles.bottomSheetHeader}>
                            <Text style={boardingstyles.bottomSheetTitle}>Select Time</Text>
                            <TouchableOpacity onPress={() => setShowTimeModal(false)}>
                                <MaterialIcons name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>
                        
                        <FlatList
                            data={timeSlots.filter(slot => slot.value !== '')}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={boardingstyles.bottomSheetItem}
                                    onPress={() => {
                                        setSelectedTime(item.value);
                                        setShowTimeModal(false);
                                    }}
                                >
                                    <Text style={boardingstyles.bottomSheetItemText}>{item.label}</Text>
                                    {selectedTime === item.value && (
                                        <MaterialIcons name="check" size={20} color="#58B9D0" />
                                    )}
                                </TouchableOpacity>
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </Modal>

            {/* City Selection Bottom Sheet */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showCityModal}
                onRequestClose={() => setShowCityModal(false)}
            >
                <View style={boardingstyles.modalOverlay}>
                    <View style={boardingstyles.bottomSheetContainer}>
                        <View style={boardingstyles.bottomSheetHandle}></View>
                        <View style={boardingstyles.bottomSheetHeader}>
                            <Text style={boardingstyles.bottomSheetTitle}>Select City</Text>
                            <TouchableOpacity onPress={() => setShowCityModal(false)}>
                                <MaterialIcons name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>
                        
                        <FlatList
                            data={cities.filter(city => city.value !== '')}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={boardingstyles.bottomSheetItem}
                                    onPress={() => {
                                        setSelectedCity(item.value);
                                        setShowCityModal(false);
                                    }}
                                >
                                    <Text style={boardingstyles.bottomSheetItemText}>{item.label}</Text>
                                    {selectedCity === item.value && (
                                        <MaterialIcons name="check" size={20} color="#58B9D0" />
                                    )}
                                </TouchableOpacity>
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Boarding;
