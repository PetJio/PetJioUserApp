import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Modal,
    StatusBar,
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icons from '../../../assets/icons';
import boardingstyles from './boarding.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSelectedDate, setFromTime, setToTime, setSelectedCity } from '../../store/slices/boardingSlice';
import serviceStyles from '../Service/styles';

// Define your navigation stack's param list
type RootStackParamList = {
    Locality: undefined;
    Grooming: undefined;
    HomeService: undefined;
    Main:undefined;
    BoardingUser: {
        startDate: string;
        endDate: string;
        city: string;
    };
};

// Define the navigation prop type
type LocalityScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Locality'
>;

// Define props interface for the component
interface LocalityProps {
    navigation: LocalityScreenNavigationProp;
}

const Boarding: React.FC<LocalityProps> = ({ navigation }) => {
    // Redux state and dispatch
    const dispatch = useAppDispatch();
    const { formData } = useAppSelector((state) => state.boarding);
    const { selectedDate, fromTime, toTime, selectedCity } = formData;

    // Local state for start and end dates
    const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState<string>('');
    const [showCityModal, setShowCityModal] = useState<boolean>(false);

    const handleNext = () => {
        if (!startDate || !endDate) {
            alert('Please select both start date and end date');
            return;
        }

        // Validate end date is after start date
        if (new Date(endDate) <= new Date(startDate)) {
            alert('End date must be after start date');
            return;
        }

        // Navigate to BoardingUser with start and end dates
        navigation.navigate('BoardingUser', {
            startDate,
            endDate,
            city: selectedCity
        });
    };

    const cities = [
        { label: 'Kolkata', value: 'Kolkata' },
        { label: 'Delhi', value: 'Delhi' },
        { label: 'Mumbai', value: 'Mumbai' },
        { label: 'Bangalore', value: 'Bangalore' },
        { label: 'Chennai', value: 'Chennai' },
        { label: 'Pune', value: 'Pune' },
        { label: 'Hyderabad', value: 'Hyderabad' },
        { label: 'Ahmedabad', value: 'Ahmedabad' },
        { label: 'Jaipur', value: 'Jaipur' },
        { label: 'Lucknow', value: 'Lucknow' },
        { label: 'Kanpur', value: 'Kanpur' },
        { label: 'Nagpur', value: 'Nagpur' },
        { label: 'Indore', value: 'Indore' },
        { label: 'Bhopal', value: 'Bhopal' },
        { label: 'Visakhapatnam', value: 'Visakhapatnam' },
        { label: 'Patna', value: 'Patna' },
        { label: 'Vadodara', value: 'Vadodara' },
        { label: 'Ghaziabad', value: 'Ghaziabad' },
        { label: 'Ludhiana', value: 'Ludhiana' },
        { label: 'Coimbatore', value: 'Coimbatore' },
        { label: 'Madurai', value: 'Madurai' },
        { label: 'Rajkot', value: 'Rajkot' },
        { label: 'Kochi', value: 'Kochi' },
        { label: 'Thiruvananthapuram', value: 'Thiruvananthapuram' },
        { label: 'Chandigarh', value: 'Chandigarh' },
        { label: 'Mysore', value: 'Mysore' },
        { label: 'Nashik', value: 'Nashik' },
        { label: 'Faridabad', value: 'Faridabad' },
        { label: 'Gurgaon', value: 'Gurgaon' },
        { label: 'Noida', value: 'Noida' },
    ];

    return (
        <View style={boardingstyles.parentContainer}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFFFFF"
                translucent={false}
                animated={true}
            />

            {/* Header Section matching BoardingDetails page */}
            <View style={[serviceStyles.stickyHeader, { backgroundColor: '#FFFFFF', borderBottomColor: '#E5E7EB' }]}>
                <TouchableOpacity onPress={() => navigation.navigate('Main')} style={{ marginRight: 16 }}>
                    <Image
                        source={Icons.LeftArrow}
                        style={{ tintColor: '#000000', width: 20, height: 20 }}
                    />
                </TouchableOpacity>
                <View style={serviceStyles.headerTitleContainer}>
                    <Text style={serviceStyles.stickyHeaderTitle}>
                        Date and Time
                    </Text>
                    <Text style={serviceStyles.stickyHeaderSubtitle}>
                        Select your boarding schedule
                    </Text>
                </View>
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#F8F9FB', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }}
                    onPress={() => setShowCityModal(true)}
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

            <View style={{ flex: 1 }}>
                <View style={boardingstyles.relative}>
                    <View>
                        <Text style={boardingstyles.selectDateText}>
                            Select Boarding Period
                        </Text>
                        <Text style={{ fontSize: 12, color: '#6B7280', textAlign: 'center', marginTop: 4 }}>
                            Tap to select start date, then tap again for end date
                        </Text>
                    </View>
                </View>

                <View style={boardingstyles.calendarPosition}>
                    <Calendar
                        dayComponent={({
                            date,
                            state,
                        }: {
                            date?: DateData;
                            state?: string;
                        }) => {
                            if (!date) return null;
                            const isStartDate = startDate === date.dateString;
                            const isEndDate = endDate === date.dateString;
                            const isInRange = startDate && endDate && 
                                date.dateString > startDate && 
                                date.dateString < endDate;
                            
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        if (!startDate || (startDate && endDate)) {
                                            // First selection or reset: set as start date
                                            setStartDate(date.dateString);
                                            setEndDate('');
                                        } else if (date.dateString > startDate) {
                                            // Second selection: set as end date if after start
                                            setEndDate(date.dateString);
                                        } else {
                                            // If selected date is before start, reset and make it start
                                            setStartDate(date.dateString);
                                            setEndDate('');
                                        }
                                    }}
                                    style={{
                                        height: responsiveHeight(6),
                                        width: responsiveWidth(12),
                                        borderRadius: responsiveWidth(1),
                                        backgroundColor: isStartDate || isEndDate
                                            ? '#58B9D0'
                                            : isInRange
                                            ? '#B3E5F4'
                                            : '#EFFCFF',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            color: isStartDate || isEndDate
                                                ? 'white'
                                                : state === 'disabled'
                                                ? '#d9e1e8'
                                                : '#000000',
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                        }}>
                                        {date.day}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                        minDate={new Date().toISOString().split('T')[0]}
                    />
                </View>

                {/* Show selected dates */}
                <View style={{ paddingHorizontal: responsiveWidth(5), marginTop: responsiveHeight(2), marginBottom: responsiveHeight(2) }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12, backgroundColor: '#F8F9FB', padding: 12, borderRadius: 8 }}>
                        <Text style={{ fontSize: 14, color: '#6B7280', fontWeight: '500' }}>Start Date:</Text>
                        <Text style={{ fontSize: 14, color: '#1A1D29', fontWeight: '600' }}>
                            {startDate || 'Not selected'}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F8F9FB', padding: 12, borderRadius: 8 }}>
                        <Text style={{ fontSize: 14, color: '#6B7280', fontWeight: '500' }}>End Date:</Text>
                        <Text style={{ fontSize: 14, color: '#1A1D29', fontWeight: '600' }}>
                            {endDate || 'Not selected'}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Fixed Next Button */}
            <View style={boardingstyles.fixedButtonContainer}>
                <TouchableOpacity
                    onPress={handleNext}
                    style={boardingstyles.nextBtnContainer}>
                    <Text style={boardingstyles.nextBtnText}>Next</Text>
                </TouchableOpacity>
            </View>

            {/* City Selection Modal */}
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
                                <Text style={boardingstyles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={cities}
                            keyExtractor={(item) => item.value}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={boardingstyles.bottomSheetItem}
                                    onPress={() => {
                                        dispatch(setSelectedCity(item.value));
                                        setShowCityModal(false);
                                    }}
                                >
                                    <Text style={boardingstyles.bottomSheetItemText}>{item.label}</Text>
                                    {selectedCity === item.value && (
                                        <Text style={boardingstyles.checkMark}>✓</Text>
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