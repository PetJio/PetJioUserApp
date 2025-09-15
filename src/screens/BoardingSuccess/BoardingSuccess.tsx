import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import icons from '../../../assets/icons';
import boardingSuccessStyles from './styles';
import BoardingHeader from '../../components/BoardingHeader/BoardingHeader';

const BoardingSuccess = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const handleGoHome = () => {
        // Navigate back to main screen
        (navigation as any).navigate('Main');
    };

    const handleViewBooking = () => {
        // Navigate to main screen for now
        (navigation as any).navigate('Main');
    };

    return (
        <View style={boardingSuccessStyles.container}>
            <BoardingHeader 
                title="Booking Confirmed"
                onBackPress={handleGoHome}
            />

            <ScrollView style={boardingSuccessStyles.scrollContainer} showsVerticalScrollIndicator={false}>
                <View style={boardingSuccessStyles.content}>
                    {/* Success Icon */}
                    <View style={boardingSuccessStyles.successIconContainer}>
                        <LinearGradient
                            colors={['#4CAF50', '#45A049']}
                            style={boardingSuccessStyles.successIconGradient}
                        >
                            <MaterialIcons name="check" size={60} color="#fff" />
                        </LinearGradient>
                    </View>

                    {/* Success Message */}
                    <View style={boardingSuccessStyles.messageContainer}>
                        <Text style={boardingSuccessStyles.successTitle}>Booking Confirmed!</Text>
                        <Text style={boardingSuccessStyles.successSubtitle}>
                            Your boarding request has been successfully submitted
                        </Text>
                    </View>

                    {/* Booking Details Card */}
                    <View style={boardingSuccessStyles.detailsCard}>
                        <View style={boardingSuccessStyles.cardHeader}>
                            <Text style={boardingSuccessStyles.cardTitle}>Booking Details</Text>
                        </View>
                        <View style={boardingSuccessStyles.cardContent}>
                            <View style={boardingSuccessStyles.detailRow}>
                                <Text style={boardingSuccessStyles.detailLabel}>Booking ID</Text>
                                <Text style={boardingSuccessStyles.detailValue}>#BD{new Date().getTime().toString().slice(-6)}</Text>
                            </View>
                            <View style={boardingSuccessStyles.detailRow}>
                                <Text style={boardingSuccessStyles.detailLabel}>Pet(s)</Text>
                                <Text style={boardingSuccessStyles.detailValue}>Daisy, Leo</Text>
                            </View>
                            <View style={boardingSuccessStyles.detailRow}>
                                <Text style={boardingSuccessStyles.detailLabel}>Duration</Text>
                                <Text style={boardingSuccessStyles.detailValue}>16 days</Text>
                            </View>
                            <View style={boardingSuccessStyles.detailRow}>
                                <Text style={boardingSuccessStyles.detailLabel}>Total Amount</Text>
                                <Text style={boardingSuccessStyles.detailValueBold}>₹22,000.00</Text>
                            </View>
                            <View style={boardingSuccessStyles.detailRow}>
                                <Text style={boardingSuccessStyles.detailLabel}>Payment Method</Text>
                                <View style={boardingSuccessStyles.paymentMethod}>
                                    <Image source={icons.googlepay} style={boardingSuccessStyles.paymentIcon} />
                                    <Text style={boardingSuccessStyles.detailValue}>Google Pay</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Next Steps */}
                    <View style={boardingSuccessStyles.stepsCard}>
                        <View style={boardingSuccessStyles.cardHeader}>
                            <Text style={boardingSuccessStyles.cardTitle}>What's Next?</Text>
                        </View>
                        <View style={boardingSuccessStyles.cardContent}>
                            <View style={boardingSuccessStyles.stepItem}>
                                <View style={boardingSuccessStyles.stepIcon}>
                                    <MaterialIcons name="phone" size={20} color="#58B9D0" />
                                </View>
                                <View style={boardingSuccessStyles.stepContent}>
                                    <Text style={boardingSuccessStyles.stepTitle}>Confirmation Call</Text>
                                    <Text style={boardingSuccessStyles.stepDescription}>We'll call you within 2 hours to confirm details</Text>
                                </View>
                            </View>
                            <View style={boardingSuccessStyles.stepItem}>
                                <View style={boardingSuccessStyles.stepIcon}>
                                    <MaterialIcons name="calendar-today" size={20} color="#58B9D0" />
                                </View>
                                <View style={boardingSuccessStyles.stepContent}>
                                    <Text style={boardingSuccessStyles.stepTitle}>Drop-off Reminder</Text>
                                    <Text style={boardingSuccessStyles.stepDescription}>You'll receive a reminder 1 day before drop-off</Text>
                                </View>
                            </View>
                            <View style={boardingSuccessStyles.stepItem}>
                                <View style={boardingSuccessStyles.stepIcon}>
                                    <MaterialIcons name="pets" size={20} color="#58B9D0" />
                                </View>
                                <View style={boardingSuccessStyles.stepContent}>
                                    <Text style={boardingSuccessStyles.stepTitle}>Pet Care Updates</Text>
                                    <Text style={boardingSuccessStyles.stepDescription}>Regular updates and photos during boarding</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={boardingSuccessStyles.actionContainer}>
                <TouchableOpacity 
                    style={boardingSuccessStyles.secondaryButton}
                    onPress={handleViewBooking}
                >
                    <Text style={boardingSuccessStyles.secondaryButtonText}>View My Bookings</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={boardingSuccessStyles.primaryButton}
                    onPress={handleGoHome}
                >
                    <Text style={boardingSuccessStyles.primaryButtonText}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BoardingSuccess;
