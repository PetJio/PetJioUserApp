import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    TouchableOpacity,
    Modal,
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

// Define your navigation stack's param list
type RootStackParamList = {
    Locality: undefined;
    Grooming: undefined;
    HomeService: undefined;
    Main:undefined;
    BoardingUser: {
        selectedDate: string;
        selectedTime: string;
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

    // Local state for UI modals only
    const [showFromPicker, setShowFromPicker] = useState<boolean>(false);
    const [showToPicker, setShowToPicker] = useState<boolean>(false);
    const [showCityModal, setShowCityModal] = useState<boolean>(false);

    const handleTimeChange = (
        event: any,
        selectedTime: Date | undefined,
        type: 'from' | 'to',
    ) => {
        if (type === 'from') setShowFromPicker(false);
        else setShowToPicker(false);

        if (selectedTime) {
            const formattedTime = selectedTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            });
            if (type === 'from') {
                dispatch(setFromTime(formattedTime));
            } else {
                dispatch(setToTime(formattedTime));
            }
        }
    };

    // Function to convert time from 12-hour to 24-hour format for API
    const convertTo24Hour = (time12h: string): string => {
        if (time12h === 'From' || time12h === 'To') return '';

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
        if (!selectedDate || fromTime === 'From' || toTime === 'To') {
            alert('Please select date, from time, and to time');
            return;
        }

        // Format start time to 24-hour format for API (using fromTime as selectedTime)
        const formattedFromTime = convertTo24Hour(fromTime);

        // Navigate to BoardingUser with parameters
        navigation.navigate('BoardingUser', {
            selectedDate,
            selectedTime: formattedFromTime,
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
            <View style={{ flex: 1 }}>
                <View style={boardingstyles.relative}>
                    <View style={boardingstyles.positionDateTimeIcon}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Main')}>
                            <View style={boardingstyles.flexGap}>
                                <Image
                                    source={Icons.LeftArrow}
                                    style={boardingstyles.iconColor}
                                />
                                <Text style={boardingstyles.textDateTime}>
                                    Date and Time
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={boardingstyles.trackingPositionIcon}
                            onPress={() => setShowCityModal(true)}
                        >
                            <Text style={boardingstyles.trackTextColor}>
                                {selectedCity}
                            </Text>
                            <Image
                                source={Icons.DownArrow}
                                style={boardingstyles.trackIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={boardingstyles.selectDateText}>
                            Select Date
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
                            if (!date) return null; // Ensure date is defined
                            const isSelected = selectedDate === date.dateString;
                            return (
                                <TouchableOpacity
                                    onPress={() =>
                                        dispatch(setSelectedDate(date.dateString))
                                    }
                                    style={{
                                        height:responsiveHeight(6),
                                        width: responsiveWidth(12),
                                        borderRadius:responsiveWidth(1),
                                        backgroundColor: isSelected
                                            ? '#58B9D0'
                                            : '#EFFCFF',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            color: isSelected
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
                    />
                </View>

                <View style={boardingstyles.container}>
                    <Text style={boardingstyles.label}>Select Time</Text>
                    <View style={boardingstyles.row}>
                        <TouchableOpacity
                            onPress={() => setShowFromPicker(true)}
                            style={boardingstyles.inputBox}>
                            <TextInput
                                value={fromTime}
                                editable={false}
                                mode="outlined"
                                style={boardingstyles.textInput}
                                left={
                                    <TextInput.Icon
                                        icon={() => (
                                            <Image
                                                source={Icons.ClockCircle}
                                                style={{
                                                    width:responsiveWidth(4.8),
                                                    height:responsiveHeight(2.5),
                                                }}
                                            />
                                        )}
                                    />
                                }
                                right={<TextInput.Icon
                                        icon={() => (
                                            <Image
                                                source={Icons.DownArrow}
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    tintColor:'#898989'
                                                }}
                                            />
                                        )}
                                         onPress={() => setShowFromPicker(true)}
                                    />}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={boardingstyles.inputBox}>
                            <TextInput
                                value={toTime}
                                editable={false}
                                mode="outlined"
                                style={boardingstyles.textInput}
                                left={
                                    <TextInput.Icon
                                        icon={() => (
                                            <Image
                                                source={Icons.ClockCircle}
                                                style={{
                                                    width:responsiveWidth(4.8),
                                                    height:responsiveHeight(2.5),
                                                }}
                                            />
                                        )}
                                    />
                                }
                                 right={<TextInput.Icon
                                        icon={() => (
                                            <Image
                                                source={Icons.DownArrow}
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    tintColor:'#898989'
                                                }}
                                            />
                                        )}
                                          onPress={() => setShowToPicker(true)}
                                    />}
                            />
                        </TouchableOpacity>
                    </View>

                    {showFromPicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="time"
                            display="default"
                            onChange={(event, time) =>
                                handleTimeChange(event, time, 'from')
                            }
                        />
                    )}
                    {showToPicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="time"
                            display="default"
                            onChange={(event, time) =>
                                handleTimeChange(event, time, 'to')
                            }
                        />
                    )}
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