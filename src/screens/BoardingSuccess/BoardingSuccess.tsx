import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

const BoardingSuccess = () => {
    const navigation = useNavigation();

    const handleGoHome = () => {
        (navigation as any).navigate('Main', {
            screen: 'Home'
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

            {/* Back to Home Button - Fixed at bottom matching Book Now button */}
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
                <TouchableOpacity
                    style={{
                        backgroundColor: '#58B9D0',
                        paddingVertical: 16,
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        minHeight: 50,
                    }}
                    onPress={handleGoHome}
                >
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#FFFFFF',
                    }}>
                        Back to Home
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default BoardingSuccess;
