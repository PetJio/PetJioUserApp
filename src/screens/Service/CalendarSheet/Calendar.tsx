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
import Icons from '../../../../assets/icons';
import calendarstyles from './calendar.styles';
import { StackNavigationProp } from '@react-navigation/stack';

// Define your navigation stack's param list
type RootStackParamList = {
    Locality: undefined;
    Grooming: undefined;
    HomeService: undefined;
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

const CalendarSheet: React.FC<LocalityProps> = ({ navigation }) => {
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
        <View style={calendarstyles.parentContainer}>
            <View style={{ flex: 1 }}>
                <View style={calendarstyles.relative}>
                    <View style={calendarstyles.positionDateTimeIcon}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Grooming')}>
                            <View style={calendarstyles.flexGap}>
                                <Image
                                    source={Icons.LeftArrow}
                                    style={calendarstyles.iconColor}
                                />
                                <Text style={calendarstyles.textDateTime}>
                                    Date and Time
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <View style={calendarstyles.trackingPositionIcon}>
                            <Text style={calendarstyles.trackTextColor}>
                                Kasba, Kolkata
                            </Text>
                            <Image
                                source={Icons.DownArrow}
                                style={calendarstyles.trackIcon}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={calendarstyles.selectDateText}>
                            Select Date
                        </Text>
                    </View>
                </View>

                <View style={calendarstyles.calendarPosition}>
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
                                        height: 50,
                                        width: 50,
                                        borderRadius: 4,
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

                <View style={calendarstyles.container}>
                    <Text style={calendarstyles.label}>Select Time</Text>
                    <View style={calendarstyles.row}>
                        <TouchableOpacity
                            style={calendarstyles.inputBox}>
                            <TextInput
                                value={fromTime}
                                editable={false}
                                mode="outlined"
                                style={calendarstyles.textInput}
                                left={
                                    <TextInput.Icon
                                        icon={() => (
                                            <Image
                                                source={Icons.ClockCircle}
                                                style={{
                                                    width: 20,
                                                    height: 20,
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
                            style={calendarstyles.inputBox}>
                            <TextInput
                                value={toTime}
                                editable={false}
                                mode="outlined"
                                style={calendarstyles.textInput}
                                left={
                                    <TextInput.Icon
                                        icon={() => (
                                            <Image
                                                source={Icons.ClockCircle}
                                                style={{
                                                    width: 20,
                                                    height: 20,
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
            <View style={calendarstyles.fixedButtonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('HomeService')}
                    style={calendarstyles.nextBtnContainer}>
                    <Text style={calendarstyles.nextBtnText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CalendarSheet;
