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
import veterinarystyles from './veterinary.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


// Define your navigation stack's param list
type RootStackParamList = {
    Locality: undefined;
    Grooming: undefined;
    HomeService: undefined;
    Main:undefined;
    BoardingUser:undefined;
    VeterinaryLocal:undefined;
    VeterinariansDetails:undefined;
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

const Veterinary: React.FC<LocalityProps> = ({ navigation }) => {
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
        <View style={veterinarystyles.parentContainer}>
            <View style={{ flex: 1 }}>
                <View style={veterinarystyles.relative}>
                    <View style={veterinarystyles.positionDateTimeIcon}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Main')}>
                            <View style={veterinarystyles.flexGap}>
                                <Image
                                    source={Icons.LeftArrow}
                                    style={veterinarystyles.iconColor}
                                />
                                <Text style={veterinarystyles.textDateTime}>
                                    Date and Time
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={()=>navigation.navigate("VeterinaryLocal")}
                         >
                         <View style={veterinarystyles.trackingPositionIcon}>
                            <Text style={veterinarystyles.trackTextColor}>
                                Kasba, Kolkata
                            </Text>
                            <Image
                                source={Icons.DownArrow}
                                style={veterinarystyles.trackIcon}
                            />
                        </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={veterinarystyles.selectDateText}>
                            Select Date
                        </Text>
                    </View>
                </View>

                <View style={veterinarystyles.calendarPosition}>
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

                <View style={veterinarystyles.container}>
                    <Text style={veterinarystyles.label}>Select Time</Text>
                    <View style={veterinarystyles.row}>
                        <TouchableOpacity
                            onPress={() => setShowFromPicker(true)}
                            style={veterinarystyles.inputBox}>
                            <TextInput
                                value={fromTime}
                                editable={false}
                                mode="outlined"
                                style={veterinarystyles.textInput}
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
                            style={veterinarystyles.inputBox}>
                            <TextInput
                                value={toTime}
                                editable={false}
                                mode="outlined"
                                style={veterinarystyles.textInput}
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
            <View style={veterinarystyles.fixedButtonContainer}>
                <TouchableOpacity
                    // onPress={() => navigation.navigate('VeterinariansDetails')}
                     onPress={()=>navigation.navigate("Main",{
                                                  screen: 'Service',params: {
                                                    screen: 'VeterinariansDetails',}
                                              })}
                    style={veterinarystyles.nextBtnContainer}>
                    <Text style={veterinarystyles.nextBtnText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Veterinary;