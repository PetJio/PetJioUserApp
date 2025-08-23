
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import images from '../../../assets/images';
import Icon from 'react-native-vector-icons/Feather';
import Icons from '../../../assets/icons';
import ngouserstyles from './ngouser.styles';
import BoardTrain from '../TrainingUser/BoardTrain';
import TrainatHome from '../TrainingUser/TrainatHome';
import NGOUserDetails from './NGOUserDetails';
import { StackNavigationProp } from '@react-navigation/stack';



// Define your navigation stack's param list
type RootStackParamList = {
    UserDetails: undefined;
    CalendarSheet:undefined;
    TrainingLocalAddress:{section: string};
};

// Define the navigation prop type
export type UserDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserDetails'
>;

// Define props interface for the component
interface UserDetailsProps {
    navigation: UserDetailsScreenNavigationProp; // Navigation is now required
}

const NGOUser: React.FC<UserDetailsProps> = ({ navigation }) => {
    const [show, setShow] = useState<boolean>(true);

    const handleToggle = () => {
        setShow(!show);
    };

    return (
        <View style={ngouserstyles.container}>
            <NGOUserDetails navigation={navigation}  />
        </View>
    );
};

export default NGOUser;
