import React from 'react';
import { View, Text,Image,TouchableOpacity,TextInput } from 'react-native';
import {responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';
import images from '../../../assets/images';
import Icons  from '../../../assets/icons';
import Icon from "react-native-vector-icons/Feather";
import veterinarylocalstyles from './veterinarylocal.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute, RouteProp } from '@react-navigation/native'



// Define your navigation stack's param list
type RootStackParamList = {
    CalendarSheet: undefined; // Example route;
    HomeService:undefined;
    Locality: { section: string };
    Grooming:undefined;
    Walking:undefined;
    Veterinary:undefined;
    VeterinaryCalendar:undefined;
  // Add other routes here as needed
};

// Define the navigation prop type
type LocalityScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Locality'>;
type LocalityScreenRouteProp = RouteProp<RootStackParamList, 'Locality'>;


// Define props interface for the component
interface LocalityProps {
  navigation:LocalityScreenNavigationProp;
  route: LocalityScreenRouteProp;
}

const VeterinaryLocal: React.FC<LocalityProps> = ({navigation }) => {
  
     
    return (
        <View style={{width:responsiveWidth(100),height:responsiveHeight(100),backgroundColor:'#FFFFFF'}}>

        <View style={{top:responsiveHeight(7),gap:responsiveHeight(1.5)}}>
        <TouchableOpacity onPress={()=>navigation.navigate("VeterinaryCalendar")}>
            <View style={{flexDirection:'row',gap:responsiveWidth(1),paddingHorizontal:responsiveWidth(4)}}>
                    <Image source={Icons.LeftArrow} style={{ tintColor: "#000000",top:responsiveHeight(0.50)}}/>
                    <Text style={{color:"#000000",fontSize:20,fontWeight:'500',fontFamily:''}}>Enter your city or locatlity</Text>
            </View>
        </TouchableOpacity>

        <View style={veterinarylocalstyles.searchparent}>
                <View style={veterinarylocalstyles.searchchild}>
                    <Icon name="search" size={20} color="#4494A8" style={{marginLeft:responsiveHeight(1.5)}} />
                    <TextInput
                        placeholder="Search for services"
                        placeholderTextColor="#999"
                        style={veterinarylocalstyles.textInput}
                    />
                </View>
               
        </View>

        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:responsiveWidth(4)}}>
          <Text style={{color:'#4494A8',fontWeight:'bold'}}>Use current location</Text>
          <Image source={Icons.locationIcon} style={{top:responsiveHeight(0.50)}}/>
       </View>

       <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',backgroundColor:'#EFFCFF',width:responsiveWidth(100),height:responsiveHeight(4),paddingHorizontal:responsiveWidth(4)}}>
              <Text style={{color:"#555555",fontWeight:'bold',}}>Recent Search</Text>
              <Text style={{color:"#4494A8",fontWeight:'bold',}}>Clear</Text>
       </View>

       <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',paddingHorizontal:responsiveWidth(4)}}>
           <View>
                  <Text style={{color:"#000000",fontWeight:'bold',}}>Mukundapur</Text>
                  <Text>Kolkata</Text>
           </View>
           <Text>Locality</Text>
       </View>

       <View style={{ borderWidth: 0.5, borderColor: '#ECECEC' }} />


       <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',paddingHorizontal:responsiveWidth(4)}}>
           <View>
                  <Text style={{color:"#000000",fontWeight:'bold',}}>Kasba</Text>
                  <Text>Kolkata</Text>
           </View>
           <Text>Locality</Text>
       </View>


       <View style={{flexDirection:'row', justifyContent:'space-between',alignItems:'center',backgroundColor:'#EFFCFF',width:responsiveWidth(100),height:responsiveHeight(4),paddingHorizontal:responsiveWidth(4)}}>
              <Text style={{color:"#555555",fontWeight:'bold',}}>Top Localities in Kolkata</Text> 
       </View>
 
        <View style={{paddingHorizontal:responsiveWidth(4)}}>
              <Text>Salt Lake</Text>
        </View>
        <View style={{ borderWidth: 0.5, borderColor: '#ECECEC' }} />
        <View style={{paddingHorizontal:responsiveWidth(4)}}>
              <Text>New Town</Text>
        </View>
        <View style={{ borderWidth: 0.5, borderColor: '#ECECEC' }} />



        <View style={{paddingHorizontal:responsiveWidth(4)}}>
              <Text>Kasba</Text>
        </View>
        <View style={{ borderWidth: 0.5, borderColor: '#ECECEC' }} />

        <View style={{paddingHorizontal:responsiveWidth(4)}}>
              <Text>Garia</Text>
        </View>
        <View style={{ borderWidth: 0.5, borderColor: '#ECECEC' }} />




        <View style={{paddingHorizontal:responsiveWidth(4)}}>
              <Text>Beliaghata</Text>
        </View>
        <View style={{ borderWidth: 0.5, borderColor: '#ECECEC' }} />


        <View style={{paddingHorizontal:responsiveWidth(4)}}>
              <Text>Tollygunge</Text>
        </View>
        <View style={{ borderWidth: 0.5, borderColor: '#ECECEC' }} />
        <View style={{paddingHorizontal:responsiveWidth(4)}}>
              <Text>Behala</Text>
        </View>
        <View style={{ borderWidth: 0.5, borderColor: '#ECECEC' }} />



        <View style={{paddingHorizontal:responsiveWidth(4)}}>
              <Text>Ballygunge</Text>
        </View>
        <View style={{ borderWidth: 0.5, borderColor: '#ECECEC' }} />
        <View style={{paddingHorizontal:responsiveWidth(4)}}>
              <Text>Lake Town</Text>
        </View>
        <View style={{ borderWidth: 0.5, borderColor: '#ECECEC' }} />


   </View>
</View>
    );
};

export default VeterinaryLocal;
