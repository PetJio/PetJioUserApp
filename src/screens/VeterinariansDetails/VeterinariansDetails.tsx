import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import images from '../../../assets/images';
import Icon from 'react-native-vector-icons/Feather';
import Icons from '../../../assets/icons';
import veterinariandetailstyles from './veterinariandetails.styles';
import Onsiteveterinary from './Onsiteveterinary';
import Consultationveterinary from './Consultationveterinary';
// import InSiteService from './InSiteService';
// import OnSiteService from './OnSiteService';
import { StackNavigationProp } from '@react-navigation/stack';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


// Define your navigation stack's param list
type RootStackParamList = {
    UserDetails: undefined;
    CalendarSheet:undefined;
    VeterinaryLocal:undefined;
};

// Define the navigation prop type
type UserDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserDetails'>;

// Define props interface for the component
interface UserDetailsProps {
    navigation: UserDetailsScreenNavigationProp; // Navigation is now required
}

const VeterinariansDetails: React.FC<UserDetailsProps> = ({ navigation }) => {
    const [show, setShow] = useState<boolean>(true);

    const handleToggle = () => {
        setShow(!show);
    };

    return (
        <View style={veterinariandetailstyles.container}>
            <View style={veterinariandetailstyles.containerchild}>
               <TouchableOpacity onPress={()=>navigation.navigate('VeterinaryLocal')}>
                    <View style={veterinariandetailstyles.containerfirstsubchild}>
                            <Image source={Icons.LeftArrow} style={veterinariandetailstyles.leftarrowicon} />
                            <Text style={veterinariandetailstyles.groomingText}>Veterinarians</Text>
                        </View>
               </TouchableOpacity>
                <View style={veterinariandetailstyles.locationtext}>
                    <Text style={veterinariandetailstyles.locationtextColor}>Kasba, Kolkata</Text>
                    <Image source={Icons.DownArrow} style={veterinariandetailstyles.downArrowIcon}/>
                </View>
            </View>

            <View style={veterinariandetailstyles.containersecondsubchild}>
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
                        <Text  style={show?{fontSize:14,fontWeight:'500',lineHeight:14,letterSpacing:1, color:'#58B9D0'}:{fontSize:14,fontWeight:'500',lineHeight:14,letterSpacing:1, color:'#AAAAAA'}}>Consultation</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={veterinariandetailstyles.searchparent}>
                <View style={veterinariandetailstyles.searchchild}>
                    <Image source={Icons.search}/>
                    <TextInput
                        placeholder="Search for services"
                        placeholderTextColor="#999"
                        style={veterinariandetailstyles.textInput}
                    />
                </View>
                <TouchableOpacity style={veterinariandetailstyles.filterbtn}>
                    <Image source={Icons.Filter} style={veterinariandetailstyles.filterIcon} />
                </TouchableOpacity>
            </View>
            {show ? (
                <Consultationveterinary/>
            ) : (
                <Onsiteveterinary/>
            )}
        </View>
    );
};

export default VeterinariansDetails;
