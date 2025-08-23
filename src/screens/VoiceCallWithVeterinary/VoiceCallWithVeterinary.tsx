import React from 'react';
import { View, Text,Image } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import voicecallwithveterinarystyles from './voicecallwithveterinary.styles';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';


// Define your navigation stack's param list
type RootStackParamList = {
     UserService: undefined;
     UserReview:undefined;
     OnlineChatWithVeterinary:undefined;
     LiveTalkToVeterinary:undefined;
};

// Define the navigation prop type
type VoiceCallWithVeterinaryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OnlineChatWithVeterinary'>;

// Define props interface for the component
interface VoiceCallWithVeterinaryProps {
    navigation: VoiceCallWithVeterinaryScreenNavigationProp; // Navigation is now required
}

const VoiceCallWithVeterinary: React.FC<VoiceCallWithVeterinaryProps> = ({navigation}) => {
    return (
        <View style={voicecallwithveterinarystyles.container}>
            <Image source={images.veterinaryImage} style={{width:responsiveWidth(100),height:responsiveHeight(100),position:'relative'}}/>
             <Text style={{fontSize:18,fontWeight:'600',lineHeight:30,color:'#FFFFFF',position:'absolute',top:responsiveHeight(8),justifyContent:'center',alignItems:'center'}}>Dr. Samar Halder </Text>
             <Text style={{fontSize:16,fontWeight:'600',lineHeight:18,color:'#FFFFFF',position:'absolute',justifyContent:'center',alignItems:'center'}}>Connecting...</Text>
             <View style={{justifyContent:'center', alignItems:'center', width:responsiveWidth(35),height:responsiveWidth(13),borderRadius:responsiveWidth(6),borderWidth:responsiveWidth(0.60),borderColor:'#ffffff',backgroundColor:'#EAEBEF',position:'absolute',bottom:responsiveHeight(4)}}>
                   <View style={{ width:responsiveWidth(25), flexDirection:'row',justifyContent:'space-between'}}>

                      <TouchableOpacity onPress={()=>navigation.navigate("LiveTalkToVeterinary")}>

                        <View style={{justifyContent:'center',alignItems:'center',width:responsiveWidth(8),height:responsiveWidth(8),borderRadius:responsiveWidth(8),backgroundColor:'#299F4D'}}>
                             <Image source={Icons.BsFillTelephoneFill}/>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity 
                       onPress={()=>navigation.navigate("OnlineChatWithVeterinary")}
                       >
                         <View style={{justifyContent:'center',alignItems:'center',width:responsiveWidth(8),height:responsiveWidth(8),borderRadius:responsiveWidth(8),backgroundColor:'#D22B2B'}}>
                           <Image source={Icons.BsFillTelephoneXFill}/>
                         </View>
                      </TouchableOpacity>
                    
                      </View>   
             </View>
        </View>
    );
};

export default VoiceCallWithVeterinary;
