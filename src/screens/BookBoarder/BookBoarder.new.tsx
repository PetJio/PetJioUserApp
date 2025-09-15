import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import bookboarderstyles from './bookboarder.styles';

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
            {/* Modern Header */}
            <View style={bookboarderstyles.header}>
                <View style={bookboarderstyles.headerContent}>
                    <TouchableOpacity 
                        style={bookboarderstyles.backButton}
                        onPress={() => navigation.navigate('BoardingRegistrationform')}
                    >
                        <MaterialIcons name="arrow-back" size={24} color="#58B9D0" />
                    </TouchableOpacity>
                    <Text style={bookboarderstyles.headerTitle}>Booking Confirmation</Text>
                </View>
            </View>

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
                <TouchableOpacity 
                    style={bookboarderstyles.paymentMethodContainer}
                    onPress={() => navigation.navigate('BoardingPaymentmethod', { section: 'boarding' })}
                >
                    <Image 
                        source={require('../../../assets/icons/Upis/google-pay.png')} 
                        style={bookboarderstyles.paymentMethodIcon} 
                    />
                    <View style={bookboarderstyles.paymentMethodText}>
                        <Text style={bookboarderstyles.paymentMethodLabel}>PAY USING</Text>
                        <Text style={bookboarderstyles.paymentMethodName}>Google Pay UPI</Text>
                    </View>
                    <TouchableOpacity style={bookboarderstyles.changePaymentButton}>
                        <MaterialIcons name="keyboard-arrow-up" size={20} color="#666" />
                    </TouchableOpacity>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={bookboarderstyles.paymentButton}
                    onPress={() => navigation.navigate('BoardingPaymentmethod', { section: 'boarding' })}
                >
                    <Text style={bookboarderstyles.paymentButtonText}>Book Boarder</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BookBoarder;
