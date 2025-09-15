import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import icons from '../../../assets/icons';
import bookboarderstyles from './bookboarder.styles';
import BoardingHeader from '../../components/BoardingHeader/BoardingHeader';

// Define your navigation stack's param list
type RootStackParamList = {
    UserDetails: undefined;
    CalendarSheet: undefined;
    Paymentmethod: { section: string };
    UserService: undefined;
    WalkingDetails: undefined;
    ConfirmDetails: undefined;
    TrainingDetails: undefined;
    TrainingPaymentmethod: { section: string };
    BoardingRegistrationform: undefined;
    BoardingPaymentmethod: { section: string };
    BoardingSuccess: undefined;
};

// Define the navigation prop type
type PaymentMethodScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Paymentmethod'>;

// Define props interface for the component
interface UserDetailsProps {
    navigation: PaymentMethodScreenNavigationProp;
}

const BookBoarder: React.FC<UserDetailsProps> = ({ navigation }) => {
    return (
        <View style={bookboarderstyles.container}>
            <BoardingHeader 
                title="Booking Confirmation"
                subtitle="Review your booking details"
                onBackPress={() => navigation.navigate('BoardingRegistrationform')}
            />

            <ScrollView style={bookboarderstyles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={bookboarderstyles.content}>
                    
                    {/* Pet Information Card */}
                    <View style={bookboarderstyles.section}>
                        <View style={bookboarderstyles.sectionHeader}>
                            <Text style={bookboarderstyles.sectionTitle}>Pet Information</Text>
                        </View>
                        <View style={bookboarderstyles.sectionContent}>
                            <View style={bookboarderstyles.petCard}>
                                <View style={bookboarderstyles.petHeader}>
                                    <View style={bookboarderstyles.petIcon}>
                                        <MaterialIcons name="pets" size={24} color="#fff" />
                                    </View>
                                    <Text style={bookboarderstyles.petName}>Daisy, Leo</Text>
                                </View>
                                <View style={bookboarderstyles.petDetails}>
                                    <View style={bookboarderstyles.petDetailRow}>
                                        <Text style={bookboarderstyles.petDetailLabel}>Breed Category</Text>
                                        <Text style={bookboarderstyles.petDetailValue}>Small</Text>
                                    </View>
                                    <View style={bookboarderstyles.petDetailRow}>
                                        <Text style={bookboarderstyles.petDetailLabel}>Service Type</Text>
                                        <Text style={bookboarderstyles.petDetailValue}>Normal Boarding</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Service Details */}
                    <View style={bookboarderstyles.section}>
                        <View style={bookboarderstyles.sectionHeader}>
                            <Text style={bookboarderstyles.sectionTitle}>Service Details</Text>
                        </View>
                        <View style={bookboarderstyles.sectionContent}>
                            <View style={[bookboarderstyles.serviceRow, bookboarderstyles.serviceRowLast]}>
                                <Text style={bookboarderstyles.serviceLabel}>Boarding Duration</Text>
                                <Text style={bookboarderstyles.serviceValue}>16 days</Text>
                            </View>
                        </View>
                    </View>

                    {/* Price Breakdown */}
                    <View style={bookboarderstyles.section}>
                        <View style={bookboarderstyles.sectionHeader}>
                            <Text style={bookboarderstyles.sectionTitle}>Price Details</Text>
                        </View>
                        <View style={bookboarderstyles.sectionContent}>
                            <View style={bookboarderstyles.priceSection}>
                                <View style={bookboarderstyles.priceRow}>
                                    <View>
                                        <Text style={bookboarderstyles.priceLabel}>Boarding Service</Text>
                                        <Text style={bookboarderstyles.priceDescription}>Daisy, Leo • 16 days</Text>
                                    </View>
                                    <Text style={bookboarderstyles.priceValue}>₹ 20,000.00</Text>
                                </View>
                                <View style={bookboarderstyles.priceRow}>
                                    <View>
                                        <Text style={bookboarderstyles.priceLabel}>Meals</Text>
                                        <Text style={bookboarderstyles.priceDescription}>16 days</Text>
                                    </View>
                                    <Text style={bookboarderstyles.priceValue}>₹ 2,000.00</Text>
                                </View>
                                <View style={[bookboarderstyles.priceRow, bookboarderstyles.totalRow]}>
                                    <Text style={bookboarderstyles.totalLabel}>Total Amount</Text>
                                    <Text style={bookboarderstyles.totalValue}>₹ 22,000.00</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>

            {/* Payment Section */}
            <View style={bookboarderstyles.paymentContainer}>
                <Text style={bookboarderstyles.paymentSectionTitle}>Payment Methods</Text>
                
                {/* Selected Payment Method */}
                <View style={bookboarderstyles.paymentOptionsContainer}>
                    <TouchableOpacity 
                        style={[bookboarderstyles.paymentMethodContainer, bookboarderstyles.selectedPaymentMethod]}
                        onPress={() => navigation.navigate('BoardingPaymentmethod', { section: 'boarding' })}
                    >
                        <Image 
                            source={icons.googlepay} 
                            style={bookboarderstyles.paymentMethodIcon} 
                        />
                        <View style={bookboarderstyles.paymentMethodText}>
                            <Text style={bookboarderstyles.paymentMethodLabel}>PAY USING</Text>
                            <Text style={bookboarderstyles.paymentMethodName}>Google Pay UPI</Text>
                        </View>
                        <TouchableOpacity style={bookboarderstyles.changePaymentButton}>
                            <MaterialIcons name="keyboard-arrow-down" size={20} color="#58B9D0" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>

                {/* UPI Payment Options Grid */}
                <View style={bookboarderstyles.upiOptionsContainer}>
                    <TouchableOpacity style={[bookboarderstyles.upiOption, bookboarderstyles.selectedUpiOption]}>
                        <Image 
                            source={icons.googlepay} 
                            style={bookboarderstyles.upiOptionIcon} 
                        />
                        <Text style={bookboarderstyles.upiOptionText}>Google Pay</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={bookboarderstyles.upiOption}>
                        <Image 
                            source={icons.paytm} 
                            style={bookboarderstyles.upiOptionIcon} 
                        />
                        <Text style={bookboarderstyles.upiOptionText}>Paytm</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={bookboarderstyles.upiOption}>
                        <Image 
                            source={icons.phonepay} 
                            style={bookboarderstyles.upiOptionIcon} 
                        />
                        <Text style={bookboarderstyles.upiOptionText}>PhonePe</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={bookboarderstyles.upiOption}>
                        <Image 
                            source={icons.upi} 
                            style={bookboarderstyles.upiOptionIcon} 
                        />
                        <Text style={bookboarderstyles.upiOptionText}>UPI</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={bookboarderstyles.upiOption}>
                        <Image 
                            source={icons.visa} 
                            style={bookboarderstyles.upiOptionIcon} 
                        />
                        <Text style={bookboarderstyles.upiOptionText}>Visa</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={bookboarderstyles.upiOption}>
                        <Image 
                            source={icons.card} 
                            style={bookboarderstyles.upiOptionIcon} 
                        />
                        <Text style={bookboarderstyles.upiOptionText}>Card</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={bookboarderstyles.upiOption}>
                        <Image 
                            source={icons.wallet} 
                            style={bookboarderstyles.upiOptionIcon} 
                        />
                        <Text style={bookboarderstyles.upiOptionText}>Wallet</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={bookboarderstyles.upiOption}>
                        <MaterialIcons name="more-horiz" size={32} color="#58B9D0" />
                        <Text style={bookboarderstyles.upiOptionText}>More</Text>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                    style={bookboarderstyles.paymentButton}
                    onPress={() => navigation.navigate('BoardingSuccess')}
                >
                    <Text style={bookboarderstyles.paymentButtonText}>Book Boarder - ₹22,000.00</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BookBoarder;
