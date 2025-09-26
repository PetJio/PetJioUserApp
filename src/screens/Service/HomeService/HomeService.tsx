import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import images from '../../../../assets/images';
import Icon from 'react-native-vector-icons/Feather';
import Icons from '../../../../assets/icons';
import homeservicestyles from './homeservice.styles';
import InSiteService from './InSiteService';
import OnSiteService from './OnSiteService';
import { StackNavigationProp } from '@react-navigation/stack';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import serviceStyles from '../styles';


// Define your navigation stack's param list
type RootStackParamList = {
    UserDetails: undefined;
    CalendarSheet:undefined;
};

// Define the navigation prop type
type UserDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserDetails'>;

// Define props interface for the component
interface UserDetailsProps {
    navigation: UserDetailsScreenNavigationProp; // Navigation is now required
}

const HomeService: React.FC<UserDetailsProps> = ({ navigation }) => {
    const [show, setShow] = useState<boolean>(true);

    const handleToggle = () => {
        setShow(!show);
    };

    return (
        <View style={homeservicestyles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFFFFF"
                translucent={false}
                animated={true}
            />

            {/* Header Section matching BoardingDetails page */}
            <View style={[serviceStyles.stickyHeader, { backgroundColor: '#FFFFFF', borderBottomColor: '#E5E7EB' }]}>
                <TouchableOpacity onPress={() => navigation.navigate('CalendarSheet')} style={{ marginRight: 16 }}>
                    <Image
                        source={Icons.LeftArrow}
                        style={{ tintColor: '#000000', width: 20, height: 20 }}
                    />
                </TouchableOpacity>
                <View style={serviceStyles.headerTitleContainer}>
                    <Text style={serviceStyles.stickyHeaderTitle}>
                        Grooming
                    </Text>
                    <Text style={serviceStyles.stickyHeaderSubtitle}>
                        Find trusted grooming services
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#F8F9FB', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }}>
                    <Text style={{ fontSize: 14, color: '#1A1D29', fontWeight: '500' }}>
                        Kasba, Kolkata
                    </Text>
                    <Image
                        source={Icons.DownArrow}
                        style={{ width: 16, height: 16, tintColor: '#6B7280' }}
                    />
                </View>
            </View>

            {/* Tab Navigation */}
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#F8F9FB',
                borderRadius: 12,
                padding: 4,
                marginHorizontal: 20,
                marginTop: 8,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: '#E5E7EB',
            }}>
                <TouchableOpacity
                    onPress={handleToggle}
                    style={{
                        flex: 1,
                        paddingVertical: 12,
                        alignItems: 'center',
                        backgroundColor: show ? '#58B9D0' : 'transparent',
                        borderRadius: 8,
                    }}
                >
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: show ? '#FFFFFF' : '#6B7280',
                    }}>
                        On Site
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleToggle}
                    style={{
                        flex: 1,
                        paddingVertical: 12,
                        alignItems: 'center',
                        backgroundColor: !show ? '#58B9D0' : 'transparent',
                        borderRadius: 8,
                    }}
                >
                    <Text style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: !show ? '#FFFFFF' : '#6B7280',
                    }}>
                        Home Service
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Search and Filter */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingHorizontal: 20,
                marginBottom: 12,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    backgroundColor: '#F6F6F6',
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    height: 48,
                }}>
                    <MaterialIcons name="search" size={20} color="#999" style={{ marginRight: 12 }} />
                    <TextInput
                        placeholder="Search for services"
                        placeholderTextColor="#999"
                        style={{
                            flex: 1,
                            fontSize: 16,
                            color: '#333',
                        }}
                    />
                </View>
                <TouchableOpacity style={{
                    width: 48,
                    height: 48,
                    backgroundColor: '#58B9D0',
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <MaterialIcons name="tune" size={20} color="#FFFFFF" />
                </TouchableOpacity>
            </View>
            {show ? (
                <InSiteService navigation={navigation}/>
            ) : (
                <OnSiteService/>
            )}
        </View>
    );
};

export default HomeService;
