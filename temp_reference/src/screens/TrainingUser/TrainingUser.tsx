
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import images from '../../../assets/images';
import Icon from 'react-native-vector-icons/Feather';
import Icons from '../../../assets/icons';
import homeservicestyles from '../Service/HomeService/homeservice.styles';
import BoardTrain from './BoardTrain';
import TrainatHome from './TrainatHome';
import { StackNavigationProp } from '@react-navigation/stack';



// Define your navigation stack's param list
type RootStackParamList = {
    UserDetails: undefined;
    CalendarSheet:undefined;
    TrainingLocalAddress:{section: string};
};

// Define the navigation prop type
type UserDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserDetails'>;

// Define props interface for the component
interface UserDetailsProps {
    navigation: UserDetailsScreenNavigationProp; // Navigation is now required
}

const TrainingUser: React.FC<UserDetailsProps> = ({ navigation }) => {
    const [show, setShow] = useState<boolean>(true);

    const handleToggle = () => {
        setShow(!show);
    };

    return (
        <View style={homeservicestyles.container}>
            <View style={homeservicestyles.containerchild}>
               <TouchableOpacity onPress={()=>navigation.navigate('TrainingLocalAddress',{section:'training'})}>
                    <View style={homeservicestyles.containerfirstsubchild}>
                            <Image source={Icons.LeftArrow} style={homeservicestyles.leftarrowicon} />
                            <Text style={homeservicestyles.groomingText}>Training</Text>
                        </View>
               </TouchableOpacity>
                <View style={homeservicestyles.locationtext}>
                    <Text style={homeservicestyles.locationtextColor}>Kasba, Kolkata</Text>
                    <Image source={Icons.DownArrow} style={homeservicestyles.downArrowIcon} />
                </View>
            </View>

            <View style={homeservicestyles.containersecondsubchild}>
                <TouchableOpacity onPress={handleToggle}>
                    <Text style={show ? homeservicestyles.onsitetext : homeservicestyles.homeservicetext}>
                      Board & Train
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleToggle}>
                    <Text style={show ? homeservicestyles.homeservicetext : homeservicestyles.onsitetext}>
                     Train at Home
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={homeservicestyles.searchparent}>
                <View style={homeservicestyles.searchchild}>
                    <Image source={Icons.search}  style={homeservicestyles.iconMargin}/>
                    <TextInput
                        placeholder="Search for services"
                        placeholderTextColor="#999"
                        style={homeservicestyles.textInput}
                    />
                </View>
                <TouchableOpacity style={homeservicestyles.filterbtn}>
                    <Image source={Icons.Filter} style={homeservicestyles.filterIcon} />
                </TouchableOpacity>
            </View>
            {show ? (
                <TrainatHome navigation={navigation}/>
            ) : (
                <BoardTrain />
            )}
        </View>
    );
};

export default TrainingUser;
