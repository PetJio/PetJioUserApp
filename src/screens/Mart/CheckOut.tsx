import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    StatusBar,
    Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Provider as PaperProvider, RadioButton } from 'react-native-paper';
import { SelectCountry } from 'react-native-element-dropdown';
import { StackNavigationProp } from '@react-navigation/stack';
import {responsiveWidth,responsiveHeight,} from 'react-native-responsive-dimensions';

import checkoutstyles from './checkout.styles';

// Define your navigation stack's param list
type RootStackParamList = {
    UserDetails: undefined;
    CalendarSheet:undefined;
    Paymentmethod:{ section: 'walking' };
    UserService:undefined;
    ParavetServices:undefined;
    ParavetDetails:undefined;
    ParaVetPaymentmethod:undefined;
    MyCart:undefined;
    DeliveryAddress:undefined;
    PetMartPaymentMethod:undefined;
};

// Define props interface for the component
interface UserDetailsProps {
    navigation: any; // Simplified navigation type
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

const CheckOut: React.FC<UserDetailsProps> = ({navigation}) => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [fromTime, setFromTime] = useState('From');
    const [toTime, setToTime] = useState('To');
    const [showFromPicker, setShowFromPicker] = useState<boolean>(false);
    const [showToPicker, setShowToPicker] = useState<boolean>(false);
    const [selectedBreed, setSelectedBreed] = useState<string>('1');
    const [country, setCountry] = useState<string>('1');
    const [checked, setChecked] = useState<string>('option1');
    
    // Sample order items - in real app this would come from props/context
    const orderItems = [
        {
            id: 1,
            name: 'Chompzilla Squeaky Plush Toy',
            category: 'Toy',
            price: 221.00,
            image: images.tongImage,
            quantity: 1
        },
        {
            id: 2,
            name: 'Premium Dog Food',
            category: 'Food',
            price: 850.00,
            image: images.tongImage,
            quantity: 2
        },
        {
            id: 3,
            name: 'Dog Collar Premium',
            category: 'Accessory',
            price: 450.00,
            image: images.tongImage,
            quantity: 1
        }
    ];

    const subtotal = orderItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const deliveryFee = 50;
    const tax = subtotal * 0.18; // 18% tax
    const total = subtotal + deliveryFee + tax;

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
        <View style={checkoutstyles.container}>
            <StatusBar backgroundColor="#F8F9FB" barStyle="dark-content" />
            
            {/* Header */}
            <View style={checkoutstyles.header}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('MyCart')}
                    style={checkoutstyles.backButtonContainer}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#58B9D0" />
                </TouchableOpacity>
                
                <View style={checkoutstyles.headerTitleContainer}>
                    <Text style={checkoutstyles.headerTitle}>Checkout</Text>
                    <Text style={checkoutstyles.headerSubtitle}>Review your order</Text>
                </View>
                
                <View style={checkoutstyles.headerPlaceholder} />
            </View>

            <ScrollView 
                style={checkoutstyles.scrollContainer}
                contentContainerStyle={checkoutstyles.scrollContentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Delivery Address Section */}
                <View style={checkoutstyles.sectionContainer}>
                    <View style={checkoutstyles.sectionHeader}>
                        <MaterialIcons name="location-on" size={24} color="#58B9D0" />
                        <Text style={checkoutstyles.sectionTitle}>Delivery Address</Text>
                    </View>
                    
                    <View style={checkoutstyles.addressContainer}>
                        <View style={checkoutstyles.addressInfo}>
                            <Text style={checkoutstyles.addressLabel}>Home</Text>
                            <Text style={checkoutstyles.addressText}>
                                32/E-1 M.L.B, Road, Bally, Howrah, West Bengal - 711201
                            </Text>
                        </View>
                        
                        <TouchableOpacity style={checkoutstyles.changeButton}>
                            <Text style={checkoutstyles.changeButtonText}>CHANGE</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Order Summary Section */}
                <View style={checkoutstyles.sectionContainer}>
                    <View style={checkoutstyles.sectionHeader}>
                        <MaterialIcons name="shopping-bag" size={24} color="#58B9D0" />
                        <Text style={checkoutstyles.sectionTitle}>Order Summary</Text>
                    </View>
                    
                    {orderItems.map((item, index) => (
                        <View key={item.id} style={checkoutstyles.orderItem}>
                            <View style={checkoutstyles.itemImageContainer}>
                                <Image source={item.image} style={checkoutstyles.itemImage} />
                            </View>
                            
                            <View style={checkoutstyles.itemDetails}>
                                <Text style={checkoutstyles.itemName}>{item.name}</Text>
                                <Text style={checkoutstyles.itemCategory}>{item.category}</Text>
                                <View style={checkoutstyles.itemPriceContainer}>
                                    <Text style={checkoutstyles.itemPrice}>₹{item.price.toFixed(2)}</Text>
                                    <Text style={checkoutstyles.itemQuantity}>Qty: {item.quantity}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Price Breakdown Section */}
                <View style={checkoutstyles.sectionContainer}>
                    <View style={checkoutstyles.sectionHeader}>
                        <MaterialIcons name="receipt" size={24} color="#58B9D0" />
                        <Text style={checkoutstyles.sectionTitle}>Price Details</Text>
                    </View>
                    
                    <View style={checkoutstyles.priceBreakdown}>
                        <View style={checkoutstyles.priceRow}>
                            <Text style={checkoutstyles.priceLabel}>Subtotal ({orderItems.length} items)</Text>
                            <Text style={checkoutstyles.priceValue}>₹{subtotal.toFixed(2)}</Text>
                        </View>
                        
                        <View style={checkoutstyles.priceRow}>
                            <Text style={checkoutstyles.priceLabel}>Delivery Fee</Text>
                            <Text style={checkoutstyles.priceValue}>₹{deliveryFee.toFixed(2)}</Text>
                        </View>
                        
                        <View style={checkoutstyles.priceRow}>
                            <Text style={checkoutstyles.priceLabel}>Tax (18%)</Text>
                            <Text style={checkoutstyles.priceValue}>₹{tax.toFixed(2)}</Text>
                        </View>
                        
                        <View style={checkoutstyles.divider} />
                        
                        <View style={checkoutstyles.totalRow}>
                            <Text style={checkoutstyles.totalLabel}>Total Amount</Text>
                            <Text style={checkoutstyles.totalValue}>₹{total.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>

                {/* Payment Method Preview */}
                <View style={checkoutstyles.sectionContainer}>
                    <View style={checkoutstyles.sectionHeader}>
                        <MaterialIcons name="payment" size={24} color="#58B9D0" />
                        <Text style={checkoutstyles.sectionTitle}>Payment Method</Text>
                    </View>
                    
                    <TouchableOpacity 
                        style={checkoutstyles.paymentMethodContainer}
                        onPress={() => navigation.navigate('PetMartPaymentMethod')}
                    >
                        <View style={checkoutstyles.paymentMethodInfo}>
                            <Image source={Icons.googlepay} style={checkoutstyles.paymentIcon} />
                            <View>
                                <Text style={checkoutstyles.paymentMethodLabel}>Google Pay UPI</Text>
                                <Text style={checkoutstyles.paymentMethodSubtext}>Pay using UPI</Text>
                            </View>
                        </View>
                        
                        <MaterialIcons name="keyboard-arrow-right" size={24} color="#666" />
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {/* Fixed Bottom Payment Button */}
            <View style={checkoutstyles.bottomButtonContainer}>
                <View style={checkoutstyles.totalSummary}>
                    <Text style={checkoutstyles.totalSummaryLabel}>Total: ₹{total.toFixed(2)}</Text>
                    <Text style={checkoutstyles.totalSummarySubtext}>Inclusive of all taxes</Text>
                </View>
                
                <TouchableOpacity
                    onPress={() => navigation.navigate('PetMartPaymentMethod')}
                    style={checkoutstyles.paymentButton}
                >
                    <Text style={checkoutstyles.paymentButtonText}>Make Payment</Text>
                    <MaterialIcons name="arrow-forward" size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CheckOut;
