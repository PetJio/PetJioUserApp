import { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
} from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Provider as PaperProvider, RadioButton } from 'react-native-paper';
import { SelectCountry } from 'react-native-element-dropdown';
import { StackNavigationProp } from '@react-navigation/stack';


import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
import servicepricestyles from './serviceprice.styles';

// Define your navigation stack's param list
type RootStackParamList = {
    UserDetails: undefined;
    CalendarSheet:undefined;
    Paymentmethod:{ section: 'walking' };
    UserService:undefined;
    GroomingDetails:undefined;
    GroomingPaymentmethod:undefined;
};

// Define the navigation prop type
type PaymentMethodScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Paymentmethod'>;

// Define props interface for the component
interface UserDetailsProps {
    navigation: PaymentMethodScreenNavigationProp; // Navigation is now required
}

const local_data = [
    {
        value: '1',
        lable: 'Country 1',
    },
    {
        value: '2',
        lable: 'Country 2',
    },
    {
        value: '3',
        lable: 'Country 3',
    },
    {
        value: '4',
        lable: 'Country 4',
    },
    {
        value: '5',
        lable: 'Country 5',
    },
];

const ServicePrice: React.FC<UserDetailsProps> = ({navigation}) => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [fromTime, setFromTime] = useState('From');
    const [toTime, setToTime] = useState('To');
    const [showFromPicker, setShowFromPicker] = useState<boolean>(false);
    const [showToPicker, setShowToPicker] = useState<boolean>(false);
    const [selectedBreed, setSelectedBreed] = useState<string>('1');
    const [country, setCountry] = useState<string>('1');
    const [checked, setChecked] = useState<string>('option1');
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
        <View style={servicepricestyles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: responsiveHeight(10),gap:responsiveHeight(2) }}>
                <View style={servicepricestyles.containerchild}>
                    <TouchableOpacity onPress={()=>navigation.navigate('GroomingDetails')}>
                        <View style={servicepricestyles.containerfirstsubchild}>
                            <Image
                                source={Icons.LeftArrow}
                                style={servicepricestyles.leftarrowicon}
                            />
                            <Text style={servicepricestyles.checkoutText}>
                                Checkout
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={servicepricestyles.imageposition}>
                    <Image
                        source={images.germanDog}
                        style={servicepricestyles.imagesize}
                    />
                    <Text style={servicepricestyles.dogtitle}>Daisy</Text>
                </View>

                <View style={servicepricestyles.gapandheightcontainer}>
                    <View style={servicepricestyles.flexposition}>
                        <View
                            style={{
                                flexDirection: 'row',
                                gap: responsiveWidth(3),
                            }}>
                            <Image
                                source={images.HairCutDog}
                                style={{
                                    width: responsiveWidth(15),
                                    height: responsiveHeight(7.5),
                                    borderRadius: responsiveWidth(1.8),
                                }}
                            />
                            <View>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: '600',
                                        color: '#000000',
                                        top: responsiveHeight(2),
                                    }}>
                                    Hair Cut
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 8,
                                        color: '#A0A0A0',
                                        fontWeight: '500',
                                        top: responsiveHeight(2),
                                    }}>
                                    Time: 40 minutes
                                </Text>
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                gap: responsiveWidth(1.4),
                            }}>
                            <Text
                                style={{
                                    color: '#DF09A7',
                                    fontSize: 16,
                                    fontWeight: '700',
                                    top: responsiveHeight(2),
                                }}>
                                {' '}
                                ₹ 200.00{' '}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: responsiveHeight(2),
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                gap: responsiveWidth(3),
                            }}>
                            <Image
                                source={images.HairCutDog}
                                style={{
                                    width: responsiveWidth(15),
                                    height: responsiveHeight(7.5),
                                    borderRadius: responsiveWidth(1.8),
                                }}
                            />
                            <View style={{ gap: responsiveHeight(0.3) }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: '600',
                                        color: '#000000',
                                    }}>
                                    Hair Cut
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 8,
                                        color: '#A0A0A0',
                                        fontWeight: '500',
                                    }}>
                                    Time: 40 minutes
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        gap: responsiveWidth(2),
                                    }}>
                                    <View style={{ gap: responsiveWidth(1) }}>
                                        <Image source={Icons.pathNewIcon} />
                                        <Text
                                            style={{
                                                color: '#626262',
                                                fontSize: 8,
                                                fontWeight: '500',
                                                lineHeight: 8,
                                            }}>
                                            Bathing
                                        </Text>
                                    </View>
                                    <View style={{ gap: responsiveWidth(1) }}>
                                        <Image source={Icons.pathNewIcon} />
                                        <Text
                                            style={{
                                                color: '#626262',
                                                fontSize: 8,
                                                fontWeight: '500',
                                                lineHeight: 8,
                                            }}>
                                            Blow Drying
                                        </Text>
                                    </View>
                                    <View style={{ gap: responsiveWidth(1) }}>
                                        <Image source={Icons.newpathIcon} />
                                        <Text
                                            style={{
                                                color: '#626262',
                                                fontSize: 8,
                                                fontWeight: '500',
                                                lineHeight: 8,
                                            }}>
                                            Nail Clipping
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                gap: responsiveWidth(1.4),
                            }}>
                            <Text
                                style={{
                                    color: '#DF09A7',
                                    fontSize: 16,
                                    fontWeight: '700',
                                    top: responsiveHeight(2),
                                }}>
                                {' '}
                                ₹ 200.00{' '}
                            </Text>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: responsiveWidth(2),
                        gap: responsiveWidth(2),
                        top: responsiveHeight(5),
                    }}>
                    <View style={{ paddingHorizontal: responsiveWidth(3) }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                marginBottom: 5,
                            }}>
                            Selected Date
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                backgroundColor: '#FFFFFF',
                                borderRadius: responsiveWidth(2),
                                overflow: 'hidden',
                                width: responsiveWidth(45),
                                padding: 5,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.2,
                                shadowRadius: 4,
                                elevation: 5,
                            }}>
                            {/* Calendar Icon */}
                            <View
                                style={{
                                    width: responsiveWidth(10),
                                    height: responsiveHeight(4),
                                    backgroundColor: '#58B9D0',
                                    borderBottomLeftRadius: responsiveWidth(2),
                                    borderTopLeftRadius: responsiveWidth(2),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    source={Icons.BiCalendar}
                                    style={{
                                        tintColor: '#FFFFFF',
                                        width: 20,
                                        height: 20,
                                    }}
                                />
                            </View>

                            {/* Date Text */}
                            <Text
                                style={{
                                    marginLeft: 10,
                                    fontSize: 16,
                                    color: '#555',
                                }}>
                                25-10-2024
                            </Text>
                        </View>
                    </View>

                    <View>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                marginBottom: 5,
                            }}>
                            Selected Time Slot
                        </Text>
                        <TouchableOpacity
                            onPress={() => setShowToPicker(true)}
                            style={{
                                backgroundColor: '#5DBCD2',
                                borderRadius: responsiveWidth(1.5),
                                padding: 10,
                                width: responsiveWidth(30),
                                height: responsiveHeight(5),
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <Text
                                style={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}>
                                {toTime}
                            </Text>
                            <Icon name="chevron-down" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Time Pickers */}
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

                <View style={{ top: responsiveHeight(5.5) }}>
                    <Text
                        style={{
                            color: '#000000',
                            fontSize: 17,
                            fontWeight: '600',
                            paddingHorizontal: responsiveWidth(4),
                            marginLeft: responsiveHeight(0.9),
                        }}>
                        Breed Category
                    </Text>
                    <SelectCountry
                        style={servicepricestyles.dropdown}
                        selectedTextStyle={servicepricestyles.selectedTextStyle}
                        placeholderStyle={servicepricestyles.placeholderStyle}
                        imageStyle={servicepricestyles.imageStyle}
                        iconStyle={servicepricestyles.iconStyle}
                        maxHeight={200}
                        value={null}
                        data={local_data}
                        valueField="value"
                        labelField="lable"
                        imageField="image"
                        placeholder="Small Breed"
                        searchPlaceholder="Search..."
                        onChange={e => {
                            setCountry(e.value);
                        }}
                    />
                </View>

                <View
                    style={{
                        paddingHorizontal: responsiveWidth(4),
                        top: responsiveHeight(5.5),
                    }}>
                    <Text
                        style={{
                            marginLeft: responsiveHeight(0.9),
                            fontWeight: 'bold',
                            fontSize: 16,
                            marginBottom: 5,
                        }}>
                        Appointment Address
                    </Text>

                    <View
                        style={{
                            width: responsiveWidth(90),
                            height: responsiveHeight(6.9),
                            borderRadius: responsiveWidth(1.5),
                            backgroundColor: '#58B9D0',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginLeft: responsiveHeight(0.6),
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: responsiveWidth(90),
                                paddingHorizontal: responsiveWidth(3),
                            }}>
                            <View>
                                <Text
                                    style={{
                                        color: '#FFFFFF',
                                        fontSize: 14,
                                        fontWeight: '600',
                                    }}>
                                    Peter Fernandez
                                </Text>
                                <Text
                                    style={{
                                        color: '#FFFFFF',
                                        fontSize: 10,
                                        fontWeight: '400',
                                    }}>
                                    32/E-1 M.L.B, Road , Bally, Howrah,
                                </Text>
                            </View>
                            <View>
                                <PaperProvider>
                                    <RadioButton
                                        value="option1"
                                        status={
                                            checked === 'option1'
                                                ? 'checked'
                                                : 'unchecked'
                                        }
                                        onPress={() => setChecked('option1')}
                                        color="#FFFFFF"
                                    />
                                </PaperProvider>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ top: responsiveHeight(5.5) }}>
                    <Text
                        style={{
                            color: '#000000',
                            fontSize: 17,
                            fontWeight: '600',
                            paddingHorizontal: responsiveWidth(4),
                            marginLeft: responsiveHeight(0.9),
                        }}>
                        Additional Note{' '}
                        <Text
                            style={{
                                fontSize: 12,
                                color: '#717171',
                                fontWeight: '400',
                            }}>
                            (Optional)
                        </Text>
                    </Text>
                    <TextInput style={servicepricestyles.inputtext} />
                </View>

                <View>
                    <View
                        style={{
                            top: responsiveHeight(7),
                            paddingHorizontal: responsiveWidth(4),
                            marginLeft: responsiveHeight(0.6),
                        }}>
                        <Image
                            source={images.washDogImage}
                            style={{
                                width: responsiveWidth(90),
                                height: responsiveHeight(15),
                                borderBottomRightRadius: responsiveWidth(1.5),
                                borderBottomLeftRadius: responsiveWidth(1.5),
                            }}
                        />
                    </View>
                    <View
                        style={{
                            top: responsiveHeight(7),
                            paddingHorizontal: responsiveWidth(4),
                        }}>
                        <View>
                            <Text
                                style={{
                                    top: responsiveHeight(2),
                                    fontSize: 14,
                                    fontWeight: '600',
                                    color: '#000000BD',
                                    paddingHorizontal: responsiveWidth(3),
                                }}>
                                We recommend you to have the following items on
                                the day of the appointment:
                            </Text>
                            <View style={{ marginLeft: responsiveWidth(6) }}>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontWeight: '600',
                                        color: '#000000BD',
                                        width: responsiveWidth(100),
                                        lineHeight: 20,
                                    }}>
                                    {'\n'}• A bathing area and Personal Towels
                                    (If Any)
                                    {'\n'}• A well-lit area that has access to
                                    outlets for blow drying
                                    {'\n'}• A comfortable seating area
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View
                style={{
                    bottom: responsiveHeight(4),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: responsiveWidth(4),
                }}>
                <View style={{ gap: responsiveHeight(1) }}>
                    <TouchableOpacity onPress={()=>navigation.navigate('GroomingPaymentmethod',)}>
                    <View
                        style={{
                            flexDirection: 'row',
                            gap: responsiveWidth(2),
                        }}>
                        <Image source={Icons.googlepay} />
                        <Text
                            style={{
                                color: '#414141',
                                fontSize: 11,
                                fontWeight: '300',
                                top:responsiveHeight(0.90)
                            }}>
                            PAY USING
                        </Text>
                        <Image source={Icons.IoIosArrowUp} style={{ top:responsiveHeight(1)}} />
                    </View>
                    </TouchableOpacity>
                    
                    <Text
                        style={{
                            color: '#303030',
                            fontSize: 14,
                            fontWeight: '400',
                            lineHeight: 18,
                            letterSpacing: 0,
                        }}>
                        Google Pay UPI
                    </Text>
                </View>
                <View
                    style={{
                        width: responsiveWidth(63),
                        height: responsiveHeight(5.5),
                        borderRadius: responsiveWidth(1.5),
                        backgroundColor: '#58B9D0',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            color: '#FFFFFF',
                            fontSize: 12,
                            fontWeight: '600',
                            lineHeight: 18,
                            letterSpacing: 0,
                        }}>
                        Place Order
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default ServicePrice;
