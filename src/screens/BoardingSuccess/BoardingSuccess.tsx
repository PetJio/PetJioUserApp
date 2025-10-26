import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../../constants/api';

type RootStackParamList = {
    BoardingSuccess: {
        bookingId: number;
        startDate?: string;
        endDate?: string;
        selectedPets?: number[];
        petOwnerId?: number;
        boardingDetails?: any;
    };
    BoardingQuestions: {
        bookingId: number;
        startDate?: string;
        endDate?: string;
        selectedPets?: number[];
        petOwnerId?: number;
        boardingDetails?: any;
    };
    Main: { screen: string };
};

type BoardingSuccessNavigationProp = StackNavigationProp<RootStackParamList, 'BoardingSuccess'>;
type BoardingSuccessRouteProp = RouteProp<RootStackParamList, 'BoardingSuccess'>;

const BoardingSuccess = () => {
    const navigation = useNavigation<BoardingSuccessNavigationProp>();
    const route = useRoute<BoardingSuccessRouteProp>();

    const { bookingId, startDate, endDate, selectedPets, petOwnerId, boardingDetails } = route.params || {};

    const handleGoHome = () => {
        (navigation as any).navigate('Main', {
            screen: 'Home'
        });
    };

    const handleFillDetails = () => {
        // Navigate to BoardingQuestions with all the booking data
        navigation.navigate('BoardingQuestions', {
            bookingId,
            startDate,
            endDate,
            selectedPets,
            petOwnerId,
            boardingDetails,
        });
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: responsiveWidth(4) }}>
                <View style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: '#4CAF50',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 30
                }}>
                    <MaterialIcons name="check" size={60} color="#fff" />
                </View>

                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: '#1F2937',
                    marginBottom: 10,
                    textAlign: 'center'
                }}>
                    Booking Confirmed!
                </Text>

                <Text style={{
                    fontSize: 16,
                    color: '#6B7280',
                    textAlign: 'center',
                    marginBottom: 40,
                    lineHeight: 24
                }}>
                    Your boarding request has been successfully submitted
                </Text>
            </View>

            {/* Action Buttons - Fixed at bottom */}
            <View style={{
                backgroundColor: '#FFFFFF',
                paddingHorizontal: responsiveWidth(4),
                paddingTop: 16,
                paddingBottom: 20,
                borderTopWidth: 1,
                borderTopColor: '#E5E7EB',
                elevation: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            }}>
                {/* Fill All Details Button */}
                <TouchableOpacity
                    style={{
                        backgroundColor: '#58B9D0',
                        paddingVertical: 16,
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        minHeight: 50,
                        marginBottom: 12,
                    }}
                    onPress={handleFillDetails}
                >
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#FFFFFF',
                    }}>
                        Fill All Details
                    </Text>
                </TouchableOpacity>

                {/* Back to Home Button */}
                <TouchableOpacity
                    style={{
                        backgroundColor: '#FFFFFF',
                        paddingVertical: 16,
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        minHeight: 50,
                        borderWidth: 1,
                        borderColor: '#58B9D0',
                    }}
                    onPress={handleGoHome}
                >
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#58B9D0',
                    }}>
                        Back to Home
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BoardingSuccess;
