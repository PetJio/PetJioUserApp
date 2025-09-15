import React from 'react';
import { View, Text, TouchableOpacity, StatusBar, Platform, SafeAreaView, Pressable } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const boardingHeaderStyles = {
    safeArea: {
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 25 : 0, // Extra padding for Android status bar
    },
    header: {
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? 15 : 25,
        paddingBottom: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        minHeight: Platform.OS === 'ios' ? 70 : 90,
        elevation: 0, // Remove any elevation that might interfere with touch
        zIndex: 1000, // High z-index for the entire header
    },
    headerContent: {
        flexDirection: 'row' as const,
        alignItems: 'center' as const,
        justifyContent: 'space-between' as const,
        flex: 1,
        minHeight: 40, // Match button size
        position: 'relative' as const,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E6F3F7',
        alignItems: 'center' as const,
        justifyContent: 'center' as const,
        zIndex: 1001, // Higher than header
        elevation: 0, // Remove Android elevation to match chat button
        position: 'relative' as const,
        borderWidth: 1,
        borderColor: '#D1E7DD',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center' as const,
        paddingHorizontal: 10,
        zIndex: 1, // Lower than button
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700' as const,
        color: '#2c3e50',
        textAlign: 'center' as const,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#6c757d',
        textAlign: 'center' as const,
        marginTop: 2,
        fontWeight: '500' as const,
    },
    placeholder: {
        width: 40, // Match back button width
        height: 40, // Match back button height
    },
};

interface BoardingHeaderProps {
    title: string;
    subtitle?: string;
    onBackPress?: () => void;
    showBackButton?: boolean;
}

const BoardingHeader: React.FC<BoardingHeaderProps> = ({
    title,
    subtitle,
    onBackPress,
    showBackButton = true,
}) => {
    const navigation = useNavigation();

    const handleBackPress = () => {
        console.log('Back button pressed - BoardingHeader'); // Enhanced debug log
        try {
            if (onBackPress) {
                console.log('Calling custom onBackPress function');
                onBackPress();
            } else {
                console.log('Calling navigation.goBack()');
                navigation.goBack();
            }
        } catch (error) {
            console.error('Error in back button press:', error);
        }
    };

    return (
        <SafeAreaView style={boardingHeaderStyles.safeArea}>
            <StatusBar 
                barStyle="dark-content" 
                backgroundColor="#fff" 
                translucent={false}
                hidden={false}
            />
            <View style={boardingHeaderStyles.header}>
                <View style={boardingHeaderStyles.headerContent}>
                    {showBackButton && (
                        <>
                            {/* Primary TouchableOpacity */}
                            <TouchableOpacity
                                style={boardingHeaderStyles.backButton}
                                onPress={handleBackPress}
                                activeOpacity={0.6}
                                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                                testID="boarding-header-back-button"
                            >
                                <MaterialIcons name="arrow-back" size={20} color="#58B9D0" />
                            </TouchableOpacity>
                            
                            {/* Backup Pressable (invisible overlay for debugging) */}
                            <Pressable
                                style={[boardingHeaderStyles.backButton, { 
                                    position: 'absolute',
                                    backgroundColor: 'transparent',
                                    borderColor: 'transparent',
                                    zIndex: 1002,
                                }]}
                                onPress={handleBackPress}
                                testID="boarding-header-back-button-backup"
                            >
                                {/* Empty pressable for backup touch detection */}
                            </Pressable>
                        </>
                    )}
                    <View style={boardingHeaderStyles.titleContainer}>
                        <Text style={boardingHeaderStyles.headerTitle}>{title}</Text>
                        {subtitle && (
                            <Text style={boardingHeaderStyles.headerSubtitle}>{subtitle}</Text>
                        )}
                    </View>
                    <View style={boardingHeaderStyles.placeholder} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default BoardingHeader;
