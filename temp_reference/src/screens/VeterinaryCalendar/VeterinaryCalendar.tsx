import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icons from '../../../assets/icons';
import veterinarycalendarstyles from './veterinarycalendar.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// Define your navigation stack's param list
type RootStackParamList = {
    Locality: undefined;
    Grooming: undefined;
    HomeService: undefined;
    Main:undefined;
    BoardingUser:undefined;
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

const VeterinaryCalendar: React.FC<LocalityProps> = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [fromTime, setFromTime] = useState<string>('From');
    const [toTime, setToTime] = useState<string>('To');
    const [showFromPicker, setShowFromPicker] = useState<boolean>(false);
    const [showToPicker, setShowToPicker] = useState<boolean>(false);

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
            type === 'from'
                ? setFromTime(formattedTime)
                : setToTime(formattedTime);
        }
    };

    return (
        <View style={veterinarycalendarstyles.parentContainer}>
            <View style={{ flex: 1 }}>
                <View style={veterinarycalendarstyles.relative}>
                    <View style={veterinarycalendarstyles.positionDateTimeIcon}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Main')}>
                            <View style={veterinarycalendarstyles.flexGap}>
                                <Image
                                    source={Icons.LeftArrow}
                                    style={veterinarycalendarstyles.iconColor}
                                />
                                <Text style={veterinarycalendarstyles.textDateTime}>
                                    Date and Time
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={veterinarycalendarstyles.trackingPositionIcon}>
                            <Text style={veterinarycalendarstyles.trackTextColor}>
                                Kasba, Kolkata
                            </Text>
                            <Image
                                source={Icons.DownArrow}
                                style={veterinarycalendarstyles.trackIcon}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={veterinarycalendarstyles.selectDateText}>
                            Select Date
                        </Text>
                    </View>
                </View>

                <View style={veterinarycalendarstyles.calendarPosition}>
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
                                        setSelectedDate(date.dateString)
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

                <View style={veterinarycalendarstyles.container}>
                    <Text style={veterinarycalendarstyles.label}>Select Time</Text>
                    <View style={veterinarycalendarstyles.row}>
                        <TouchableOpacity
                            onPress={() => setShowFromPicker(true)}
                            style={veterinarycalendarstyles.inputBox}>
                            <TextInput
                                value={fromTime}
                                editable={false}
                                mode="outlined"
                                style={veterinarycalendarstyles.textInput}
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
                            style={veterinarycalendarstyles.inputBox}>
                            <TextInput
                                value={toTime}
                                editable={false}
                                mode="outlined"
                                style={veterinarycalendarstyles.textInput}
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
            <View style={veterinarycalendarstyles.fixedButtonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('BoardingUser')}
                    style={veterinarycalendarstyles.nextBtnContainer}>
                    <Text style={veterinarycalendarstyles.nextBtnText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default VeterinaryCalendar;