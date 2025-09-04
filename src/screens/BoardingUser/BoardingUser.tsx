
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
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

    const handleToggle = () => {
        setShow(!show);
    };

    return (
        <View style={boardinguserstyles.container}>
            <View style={boardinguserstyles.containerchild}>
               <TouchableOpacity onPress={()=>navigation.navigate('Boarding',{section:'boarding'})}>
                    <View style={boardinguserstyles.containerfirstsubchild}>
                            <Image source={Icons.LeftArrow} style={boardinguserstyles.leftarrowicon} />
                            <Text style={boardinguserstyles.groomingText}>Boarding</Text>
                        </View>
               </TouchableOpacity>
                <View style={boardinguserstyles.locationtext}>
                    <Text style={boardinguserstyles.locationtextColor}>Kasba, Kolkata</Text>
                    <Image source={Icons.DownArrow} style={boardinguserstyles.downArrowIcon} />
                </View>
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
                <CommercialService navigation={navigation} />
            )}
        </View>
    );
};

export default BoardingUser;
