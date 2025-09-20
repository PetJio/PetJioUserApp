
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native';
import images from '../../../assets/images';
import Icon from 'react-native-vector-icons/Feather';
import Icons from '../../../assets/icons';
import boardinguserstyles from './boardinguser.styles';
import CommercialService from './CommercialService';
import BoardingHomeService from './BoardingHomeService';
import { StackNavigationProp } from '@react-navigation/stack';



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
    const [show, setShow] = useState<boolean>(true);
    const [showCityDropdown, setShowCityDropdown] = useState<boolean>(false);
    const [selectedCity, setSelectedCity] = useState<string>('Kasba');

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
            <View style={boardinguserstyles.containerchild}>
               <TouchableOpacity onPress={()=>navigation.goBack('')}>
                    <View style={boardinguserstyles.containerfirstsubchild}>
                            <Image source={Icons.LeftArrow} style={boardinguserstyles.leftarrowicon} />
                            <Text style={boardinguserstyles.groomingText}>Boarding</Text>
                        </View>
               </TouchableOpacity>
                <TouchableOpacity
                    style={boardinguserstyles.locationtext}
                    onPress={() => setShowCityDropdown(true)}
                >
                    <Text style={boardinguserstyles.locationtextColor}>{selectedCity}</Text>
                    <Image source={Icons.DownArrow} style={boardinguserstyles.downArrowIcon} />
                </TouchableOpacity>
            </View>

            <View style={boardinguserstyles.containersecondsubchild}>
                <TouchableOpacity onPress={handleToggle}>
                    <Text style={show ? boardinguserstyles.onsitetext : boardinguserstyles.homeservicetext}>
                       Commercial Service 
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleToggle}>
                    <Text style={show ? boardinguserstyles.homeservicetext : boardinguserstyles.onsitetext}>
                       Home Service
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={boardinguserstyles.searchparent}>
                <View style={boardinguserstyles.searchchild}>
                    <Image source={Icons.search} style={boardinguserstyles.iconMargin}/>
                    <TextInput
                        placeholder="Search for Boarders"
                        placeholderTextColor="#999"
                        style={boardinguserstyles.textInput}
                    />
                </View>
                <TouchableOpacity style={boardinguserstyles.filterbtn}>
                    <Image source={Icons.Filter} style={boardinguserstyles.filterIcon} />
                </TouchableOpacity>
            </View>
            {show ? (
                <BoardingHomeService navigation={navigation} />
            ) : (
                <CommercialService />
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
