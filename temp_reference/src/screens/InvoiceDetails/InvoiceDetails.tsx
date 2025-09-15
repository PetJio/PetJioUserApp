import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
import { StackNavigationProp } from '@react-navigation/stack';
import InvoiceDetailstyles from './InvoiceDetails.styles';

// Define your navigation stack's param list
type RootStackParamList = {
    UserDetails: undefined;
    CalendarSheet: undefined;
    Paymentmethod:{section: 'walking'};
};

// Define the navigation prop type
type PaymentmethodScreenNavigationProp = StackNavigationProp<RootStackParamList,'Paymentmethod'>;

// Define props interface for the component
interface paymentmethodProps {
    navigation: PaymentmethodScreenNavigationProp; // Navigation is now required
}

const InvoiceDetails: React.FC<paymentmethodProps> = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <View style={InvoiceDetailstyles.container}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Paymentmethod',{section: 'walking'})}
                    style={{ zIndex: 10 }}>
                    <View style={InvoiceDetailstyles.containerchild}>
                        <View
                            style={InvoiceDetailstyles.containerfirstsubchild}>
                            <Image
                                source={Icons.LeftArrow}
                                style={InvoiceDetailstyles.leftarrowicon}
                            />
                            <Text style={InvoiceDetailstyles.checkoutText}>
                                Invoice Details
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: responsiveHeight(90),
                    }}>
                    <View style={InvoiceDetailstyles.congratualtiondetailsView}>
                        <View style={InvoiceDetailstyles.congratualtiondetails}>
                            <View style={InvoiceDetailstyles.row}>
                                <Image source={Icons.happyparty} />
                                <View>
                                    <Text
                                        style={
                                            InvoiceDetailstyles.congratulationText
                                        }>
                                        Congratulations
                                    </Text>
                                    <Text
                                        style={InvoiceDetailstyles.bookedText}>
                                        Your pet grooming appointment is
                                        successfully booked
                                    </Text>
                                </View>
                            </View>
                            <View style={InvoiceDetailstyles.viewGap}>
                                <View style={InvoiceDetailstyles.IDTPNRow}>
                                    <Text style={InvoiceDetailstyles.BookingID}>
                                        Booking ID :
                                    </Text>
                                    <Text style={InvoiceDetailstyles.TPNumber}>
                                        TPN-67331
                                    </Text>
                                </View>
                                <View style={InvoiceDetailstyles.IDTPNRow}>
                                    <Text style={InvoiceDetailstyles.BookingID}>
                                        Time Slot :
                                    </Text>
                                    <Text style={InvoiceDetailstyles.TPNumber}>
                                        2:00PM
                                    </Text>
                                </View>
                                <View style={InvoiceDetailstyles.IDTPNRow}>
                                    <Text style={InvoiceDetailstyles.BookingID}>
                                        Appointment Date :
                                    </Text>
                                    <Text style={InvoiceDetailstyles.TPNumber}>
                                        25-10-24
                                    </Text>
                                </View>
                                <View style={InvoiceDetailstyles.IDTPNRow}>
                                    <Text style={InvoiceDetailstyles.BookingID}>
                                        Booking Address :
                                    </Text>
                                    <Text style={InvoiceDetailstyles.TPNumber}>
                                        32/E-1 M . L .B Road, Bally, Howrah
                                    </Text>
                                </View>
                                <View style={InvoiceDetailstyles.IDTPNRow}>
                                    <Text style={InvoiceDetailstyles.BookingID}>
                                        Groomer Name :
                                    </Text>
                                    <Text style={InvoiceDetailstyles.TPNumber}>
                                        Souvic Das
                                    </Text>
                                </View>
                            </View>
                            <View>
                                <Text
                                    style={InvoiceDetailstyles.petdetailsText}>
                                    Pet Details
                                </Text>
                                <View
                                    style={InvoiceDetailstyles.petdetailsview}>
                                    <View
                                        style={
                                            InvoiceDetailstyles.petdetailsviewGap
                                        }>
                                        <View
                                            style={
                                                InvoiceDetailstyles.IDTPNRow
                                            }>
                                            <Text
                                                style={
                                                    InvoiceDetailstyles.BookingID
                                                }>
                                                Booking ID :
                                            </Text>
                                            <Text
                                                style={
                                                    InvoiceDetailstyles.TPNumber
                                                }>
                                                TPN-67331
                                            </Text>
                                        </View>
                                        <View
                                            style={
                                                InvoiceDetailstyles.IDTPNRow
                                            }>
                                            <Text
                                                style={
                                                    InvoiceDetailstyles.BookingID
                                                }>
                                                Time Slot :
                                            </Text>
                                            <Text
                                                style={
                                                    InvoiceDetailstyles.TPNumber
                                                }>
                                                2:00PM
                                            </Text>
                                        </View>
                                        <View
                                            style={
                                                InvoiceDetailstyles.IDTPNRow
                                            }>
                                            <Text
                                                style={
                                                    InvoiceDetailstyles.BookingID
                                                }>
                                                Appointment Date :
                                            </Text>
                                            <Text
                                                style={
                                                    InvoiceDetailstyles.TPNumber
                                                }>
                                                25-10-24
                                            </Text>
                                        </View>
                                        <View
                                            style={
                                                InvoiceDetailstyles.IDTPNRow
                                            }>
                                            <Text
                                                style={
                                                    InvoiceDetailstyles.BookingID
                                                }>
                                                Booking Address :
                                            </Text>
                                            <Text
                                                style={
                                                    InvoiceDetailstyles.TPNumber
                                                }>
                                                32/E-1 M . L .B Road, Bally,
                                                Howrah
                                            </Text>
                                        </View>
                                        <View
                                            style={
                                                InvoiceDetailstyles.IDTPNRow
                                            }>
                                            <Text
                                                style={
                                                    InvoiceDetailstyles.BookingID
                                                }>
                                                Groomer Name :
                                            </Text>
                                            <Text
                                                style={
                                                    InvoiceDetailstyles.TPNumber
                                                }>
                                                Souvic Das
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View>
                                <Text
                                    style={InvoiceDetailstyles.petdetailsText}>
                                    Payment Summary
                                </Text>
                                <View
                                    style={InvoiceDetailstyles.petdetailsview}>
                                    <View
                                        style={
                                            InvoiceDetailstyles.petdetailsviewGap
                                        }>
                                        <View
                                            style={
                                                InvoiceDetailstyles.IDTPNRow
                                            }>
                                            <Text
                                                style={
                                                    InvoiceDetailstyles.BookingID
                                                }>
                                                Payment Status :
                                            </Text>
                                            <View
                                                style={{
                                                    width: responsiveWidth(
                                                        11.5,
                                                    ),
                                                    height: responsiveHeight(
                                                        2.8,
                                                    ),
                                                    borderRadius:
                                                        responsiveWidth(1),
                                                    backgroundColor: '#2E8D3F',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                <Text
                                                    style={
                                                        InvoiceDetailstyles.PAIDTEXT
                                                    }>
                                                    Paid
                                                </Text>
                                            </View>
                                        </View>
                                        <View
                                            style={
                                                InvoiceDetailstyles.IDTPNRow
                                            }>
                                            <Text
                                                style={
                                                    InvoiceDetailstyles.BookingID
                                                }>
                                                Payment Mode :
                                            </Text>
                                            <Text
                                                style={
                                                    InvoiceDetailstyles.TPNumber
                                                }>
                                                Google Pay UPI
                                            </Text>
                                        </View>
                                        <View
                                            style={
                                                InvoiceDetailstyles.IDTPNRow
                                            }>
                                            <Text
                                                style={
                                                    InvoiceDetailstyles.BookingID
                                                }>
                                                Only Hair Cut :
                                            </Text>
                                            <Text
                                                style={
                                                    InvoiceDetailstyles.TPNumber
                                                }>
                                                ₹ 200.00
                                            </Text>
                                        </View>
                                        <View
                                            style={
                                                InvoiceDetailstyles.IDTPNRow
                                            }>
                                            <Text
                                                style={
                                                    InvoiceDetailstyles.BookingID
                                                }>
                                                Full Spa :
                                            </Text>
                                            <Text
                                                style={
                                                    InvoiceDetailstyles.TPNumber
                                                }>
                                                ₹ 200.00
                                            </Text>
                                        </View>
                                        <View style={{width:responsiveWidth(90),borderWidth:responsiveWidth(0.1),borderColor:'#ECECEC'}}/>
                                        <View
                                            style={
                                                InvoiceDetailstyles.IDTPNRow
                                            }>
                                            <Text
                                                style={
                                                    InvoiceDetailstyles.BookingID
                                                }>
                                                Total
                                            </Text>
                                            <Text
                                                style={
                                                    InvoiceDetailstyles.TotalAmount
                                                }>
                                                ₹ 400.00
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                {/* Button at the Bottom */}
                <View style={InvoiceDetailstyles.fixedButtonContainer}>
                    <TouchableOpacity
                        // onPress={() => navigation.navigate('HomeService')}
                        style={InvoiceDetailstyles.nextBtnContainer}>
                        <Text style={InvoiceDetailstyles.nextBtnText}>
                            Download Invoice
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default InvoiceDetails;
