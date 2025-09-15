import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import images from '../../../../assets/images';
import Icon from 'react-native-vector-icons/Feather';
import Icons from '../../../../assets/icons';
import homeservicestyles from './homeservice.styles';
import InSiteService from './InSiteService';
import OnSiteService from './OnSiteService';
import { StackNavigationProp } from '@react-navigation/stack';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


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
            <View style={homeservicestyles.containerchild}>
               <TouchableOpacity onPress={()=>navigation.navigate('CalendarSheet')}>
                    <View style={homeservicestyles.containerfirstsubchild}>
                            <Image source={Icons.LeftArrow} style={homeservicestyles.leftarrowicon} />
                            <Text style={homeservicestyles.groomingText}>Grooming</Text>
                        </View>
               </TouchableOpacity>
                <View style={homeservicestyles.locationtext}>
                    <Text style={homeservicestyles.locationtextColor}>Kasba, Kolkata</Text>
                    <Image source={Icons.DownArrow} style={homeservicestyles.downArrowIcon} />
                </View>
            </View>

            <View style={homeservicestyles.containersecondsubchild}>
             <TouchableOpacity onPress={handleToggle}>
                <View
                    style={{
                    width: responsiveWidth(35),
                    paddingTop: responsiveHeight(3),
                    borderBottomWidth: show ? 0 :responsiveWidth(0.5),
                    borderColor: '#58B9D0',
                    alignItems: 'center', // centers child horizontally
                    paddingVertical:responsiveHeight(0.90)
                   
                    }}
                >
                    <Text style={show?{fontSize:14,fontWeight:'500',lineHeight:14,letterSpacing:1, color:'#AAAAAA'}:{fontSize:14,fontWeight:'500',lineHeight:14,letterSpacing:1,color:'#58B9D0' }}>On Site</Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleToggle}>
                    <View style={show?{ justifyContent:'center',alignItems:'center', paddingVertical:responsiveHeight(0.90), paddingTop:responsiveHeight(3),borderBottomWidth:responsiveWidth(0.5),borderColor:'#58B9D0',width:responsiveWidth(35)}:{width:responsiveWidth(35),paddingTop:responsiveHeight(3),justifyContent:'center',alignItems:'center',}}>
                        <Text  style={show?{fontSize:14,fontWeight:'500',lineHeight:14,letterSpacing:1, color:'#58B9D0'}:{fontSize:14,fontWeight:'500',lineHeight:14,letterSpacing:1, color:'#AAAAAA'}}>Home Service</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={homeservicestyles.searchparent}>
                <View style={homeservicestyles.searchchild}>
                    <Image source={Icons.search}/>
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
                <InSiteService navigation={navigation}/>
            ) : (
                <OnSiteService/>
            )}
        </View>
    );
};

export default HomeService;
