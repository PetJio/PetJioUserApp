import React from 'react';
import { View, Text,Image } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import livetalktoveterinarystyles from './livetalktoveterinary.styles';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';


// Define your navigation stack's param list
type RootStackParamList = {
     UserService: undefined;
     UserReview:undefined;
     OnlineChatWithVeterinary:undefined;
     
};

// Define the navigation prop type
type VoiceCallWithVeterinaryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OnlineChatWithVeterinary'>;

// Define props interface for the component
interface VoiceCallWithVeterinaryProps {
    navigation: VoiceCallWithVeterinaryScreenNavigationProp; // Navigation is now required
}

const LiveTalkToVeterinary: React.FC<VoiceCallWithVeterinaryProps> = ({navigation}) => {
    return (
        <View style={livetalktoveterinarystyles.container}>
            <Image source={images.veterinaryImage} style={{width:responsiveWidth(100),height:responsiveHeight(100),position:'relative'}}/>
             <Text style={{fontSize:18,fontWeight:'600',lineHeight:30,color:'#FFFFFF',position:'absolute',top:responsiveHeight(8),justifyContent:'center',alignItems:'center'}}>Dr. Samar Halder </Text>
             <Text style={{fontSize:16,fontWeight:'600',lineHeight:18,color:'#FFFFFF',position:'absolute',justifyContent:'center',alignItems:'center'}}>Connecting...</Text>
             <View style={{justifyContent:'center', alignItems:'center', width:responsiveWidth(60),height:responsiveWidth(13),borderRadius:responsiveWidth(6),borderWidth:responsiveWidth(0.60),borderColor:'#ffffff',backgroundColor:'#EAEBEF',position:'absolute',bottom:responsiveHeight(4)}}>
                   <View style={{flexDirection:'row', gap:responsiveWidth(5)}}>

                      <TouchableOpacity
                         onPress={()=>navigation.navigate("OnlineChatWithVeterinary")}
                       >

                      <View style={{justifyContent:'center',alignItems:'center',width:responsiveWidth(8),height:responsiveWidth(8),borderRadius:responsiveWidth(8),backgroundColor:'#D22B2B'}}>
                           <Image source={Icons.BsFillTelephoneXFill}/>
                      </View>

                      </TouchableOpacity>
                       <View style={{justifyContent:'center',alignItems:'center',width:responsiveWidth(8),height:responsiveWidth(8),borderRadius:responsiveWidth(8),backgroundColor:'#FFFFFF'}}>
                           <Image source={Icons.BsCameraVideoFill}/>
                      </View>
                      <View style={{justifyContent:'center',alignItems:'center',width:responsiveWidth(8),height:responsiveWidth(8),borderRadius:responsiveWidth(8),backgroundColor:'#FFFFFF'}}>
                           <Image source={Icons.BsChatDotsFill}/>
                      </View>
                      <View style={{justifyContent:'center',alignItems:'center',width:responsiveWidth(8),height:responsiveWidth(8),borderRadius:responsiveWidth(8),backgroundColor:'#FFFFFF'}}>
                           <Image source={Icons.BsFillMicFill}/>
                      </View>
                    
                      </View>   
             </View>
             <View style={{position:'absolute', right:responsiveWidth(4), bottom:responsiveHeight(14)}}>
                   <Image source={images.userShowImage} style={{width:responsiveWidth(25.5),height:responsiveHeight(18.2),borderRadius:responsiveWidth(2),borderWidth:responsiveWidth(1.2),borderColor:'#FFFFFF'}}/>
             </View>
        </View>
    );
};

export default LiveTalkToVeterinary;
