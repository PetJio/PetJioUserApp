
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Modal, FlatList, StatusBar } from 'react-native';
import images from '../../../assets/images';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icons from '../../../assets/icons';
import boardinguserstyles from './boardinguser.styles';
import CommercialService from './CommercialService';
import BoardingHomeService from './BoardingHomeService';
import { StackNavigationProp } from '@react-navigation/stack';
import serviceStyles from '../Service/styles';



// Define your navigation stack's param list
type RootStackParamList = {
    UserDetails: undefined;
    CalendarSheet:undefined;
    TrainingLocalAddress:{section: string};
    Boarding:{section: string}
    BoardingDetails:undefined
};

// Define the navigation prop type
type UserDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BoardingDetails'>;

// Define props interface for the component
interface UserDetailsProps {
    navigation: UserDetailsScreenNavigationProp; // Navigation is now required
}

const BoardingUser: React.FC<UserDetailsProps> = ({ navigation }) => {
    const [show, setShow] = useState<boolean>(false);
    const [showCityDropdown, setShowCityDropdown] = useState<boolean>(false);
    const [selectedCity, setSelectedCity] = useState<string>('Kolkata');

    const indianCities = [
        'Mumbai',
        'Delhi',
        'Bangalore',
        'Hyderabad',
        'Chennai',
        'Kolkata',
        'Pune',
        'Ahmedabad',
        'Jaipur',
        'Surat',
        'Lucknow',
        'Kanpur',
        'Nagpur',
        'Indore',
        'Thane',
        'Bhopal',
        'Visakhapatnam',
        'Patna',
        'Vadodara',
        'Ludhiana',
        'Agra',
        'Nashik',
        'Gurgaon',
        'Noida',
        'Faridabad',
        'Ghaziabad',
        'Rajkot',
        'Meerut',
        'Varanasi',
        'Srinagar',
        'Aurangabad',
        'Amritsar',
        'Navi Mumbai',
        'Ranchi',
        'Coimbatore',
        'Vijayawada',
        'Jodhpur',
        'Madurai',
        'Raipur',
        'Kota',
        'Guwahati',
        'Chandigarh',
        'Mysore',
        'Bhubaneswar',
        'Thiruvananthapuram',
        'Dehradun',
        'Kochi',
        'Jamshedpur',
        'Mangalore',
        'Udaipur',
        'Kasba'
    ];

    const handleToggle = () => {
        setShow(!show);
    };

    const handleCitySelect = (city: string) => {
        setSelectedCity(city);
        setShowCityDropdown(false);
    };

    const renderCityItem = ({ item }: { item: string }) => (
        <TouchableOpacity
            style={boardinguserstyles.cityItem}
            onPress={() => handleCitySelect(item)}
        >
            <Text style={boardinguserstyles.cityText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={boardinguserstyles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFFFFF"
                translucent={false}
                animated={true}
            />

            {/* Header Section matching BoardingDetails page */}
            <View style={[serviceStyles.stickyHeader, { backgroundColor: '#FFFFFF', borderBottomColor: '#E5E7EB' }]}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
                    <Image
                        source={Icons.LeftArrow}
                        style={{ tintColor: '#000000', width: 20, height: 20 }}
                    />
                </TouchableOpacity>
                <View style={serviceStyles.headerTitleContainer}>
                    <Text style={serviceStyles.stickyHeaderTitle}>
                        Boarding
                    </Text>
                    <Text style={serviceStyles.stickyHeaderSubtitle}>
                        Find trusted boarding providers
                    </Text>
                </View>
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#F8F9FB', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }}
                    onPress={() => setShowCityDropdown(true)}
                >
                    <Text style={{ fontSize: 14, color: '#1A1D29', fontWeight: '500' }}>
                        {selectedCity}
                    </Text>
                    <Image
                        source={Icons.DownArrow}
                        style={{ width: 16, height: 16, tintColor: '#6B7280' }}
                    />
                </TouchableOpacity>
            </View>

            {/* Tab Navigation */}
            <View style={{
                flexDirection: 'row',
                backgroundColor: '#F8F9FB',
                borderRadius: 12,
                // padding: 4,
                marginHorizontal: 20,
                // marginTop: 8,
                // marginBottom: 12,
                borderWidth: 1,
                borderColor: '#E5E7EB',
            }}>
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
                        Commercial Service
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Search and Filter */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                paddingHorizontal: 20,
                // marginBottom: 12,
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
                        placeholder="Search for Boarders"
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
                <BoardingHomeService navigation={navigation} mode={9} />
            ) : (
                <CommercialService mode={10} />
            )}

            <Modal
                visible={showCityDropdown}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowCityDropdown(false)}
            >
                <TouchableOpacity
                    style={boardinguserstyles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowCityDropdown(false)}
                >
                    <View style={boardinguserstyles.dropdownContainer}>
                        <View style={boardinguserstyles.dropdownHeader}>
                            <Text style={boardinguserstyles.dropdownTitle}>Select City</Text>
                            <TouchableOpacity onPress={() => setShowCityDropdown(false)}>
                                <Text style={boardinguserstyles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={indianCities}
                            renderItem={renderCityItem}
                            keyExtractor={(item, index) => index.toString()}
                            style={boardinguserstyles.cityList}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

export default BoardingUser;
