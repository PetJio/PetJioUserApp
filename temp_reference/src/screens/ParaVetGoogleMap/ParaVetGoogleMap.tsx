import React from 'react';
import { View, Text ,Image,TouchableOpacity,ImageBackground } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { StackNavigationProp } from '@react-navigation/stack';
import paravetgooglemapstyles from './paravetgooglemap.styles';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


// Define your navigation stack's param list
type RootStackParamList = {
    InvoiceDetails:undefined;
    Home:undefined;
    Main:undefined;
  
};

// Define the navigation prop type
type InvoiceDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'InvoiceDetails'>;

// Define props interface for the component
interface InvoiceProps {
  navigation: InvoiceDetailsScreenNavigationProp;
}


const ParaVetGoogleMap: React.FC<InvoiceProps> = ({navigation}) => {
    return (
        <View style={paravetgooglemapstyles.container}>
            <ImageBackground source={images.googleMap} style={paravetgooglemapstyles.mapImage}>
            <View style={{width:responsiveWidth(100), height:responsiveHeight(50),backgroundColor:'#FFFFFF',position:'absolute',bottom:0}}>
            
             <View style={{paddingHorizontal:responsiveWidth(5),marginTop:responsiveHeight(3),gap:responsiveHeight(1)}}>
                   <Text style={{fontSize:14,fontWeight:'500',lineHeight:17,letterSpacing:0,color:'#5C5C5C'}}>Order #201</Text>
                   <View style={{flexDirection:'row',gap:responsiveWidth(1)}}>
                         <Text style={{fontSize:18,fontWeight:'600',lineHeight:19,letterSpacing:0,color:'#000000'}}>Blood Collection Is</Text>
                         <Text style={{fontSize:18,fontWeight:'600',lineHeight:19,letterSpacing:0,color:'#4494A8'}}>going on</Text>
                         <Image source={Icons.EllipseIcon}/>
                   </View>
             </View>

               <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 20 }}>
      
      {/* Step 1: Blood Collected */}
       <View style={{flexDirection:'row',left:responsiveWidth(6)}}>
         <View style={{ alignItems: 'center' }}>
         <Image source={Icons.bloodconectionIcon}/>
        <Text style={{ fontSize: 10, fontWeight: '500', lineHeight: 13, letterSpacing: 0, color: '#58B9D0', marginTop: 4 }}>Blood</Text>
        <Text style={{ fontSize: 10, fontWeight: '500', lineHeight: 13, letterSpacing: 0, color: '#58B9D0' }}>Collected</Text>
      </View>
         <View style={{ width: responsiveWidth(35), borderTopWidth: 1, borderColor: '#A0A0A0', right:responsiveWidth(4),top:responsiveHeight(0.90)  }} />
       </View>

      {/* Dashed line */}
    

      {/* Step 2: Blood is on the Way */}
      <View style={{flexDirection:'row',right:responsiveWidth(4)}}>

      <View style={{ alignItems: 'center' }}>
        <Image source={Icons.bloodIsonthWayIcon}/>
        <Text style={{ fontSize: 10, fontWeight: '500', lineHeight: 13, letterSpacing: 0, color: '#A0A0A0', marginTop: 4, textAlign: 'center' }}>
          Blood is on{'\n'}the Way
        </Text>
        </View>
        <View style={{ width: responsiveWidth(35), borderTopWidth: 1, borderColor: '#A0A0A0',top:responsiveHeight(0.90),right:responsiveWidth(4) }} />  
      </View>
    
      {/* Step 3: Blood Delivered */}
      <View style={{ alignItems: 'center',right:responsiveWidth(16) }}>
        <Image source={Icons.bloodIsonthWayIcon}/>
        <Text style={{ fontSize: 10, fontWeight: '500', lineHeight: 13, letterSpacing: 0, color: '#A0A0A0', marginTop: 4, textAlign: 'center' }}>
          Blood Delivered{'\n'}in Laboratory
        </Text>
      </View>
    </View>
     <View style={{gap:responsiveHeight(1)}}>
               <View style={{paddingHorizontal:responsiveWidth(4)}}>
                      <Text style={{fontSize:14,fontWeight:'600',lineHeight:15,letterSpacing:0,color:'#000000'}}>Order Details</Text>
               </View>
               <View style={{flexDirection:'row',paddingHorizontal:responsiveWidth(4),gap:responsiveWidth(0.90)}}>
                    <Text style={{fontSize:12,fontWeight:'500',lineHeight:17,letterSpacing:0,color:'#969696'}}>Owner Name :</Text>
                    <Text style={{fontSize:13,fontWeight:'500',lineHeight:17,letterSpacing:0,color:'#535353'}}>Peter Fernandez</Text>
               </View>
                 <View style={{flexDirection:'row',paddingHorizontal:responsiveWidth(4),gap:responsiveWidth(0.90)}}>
                    <Text style={{fontSize:12,fontWeight:'500',lineHeight:17,letterSpacing:0,color:'#969696'}}>Date Created :</Text>
                    <Text style={{fontSize:13,fontWeight:'500',lineHeight:17,letterSpacing:0,color:'#535353'}}>25 - 10 - 24</Text>
               </View>
                 <View style={{flexDirection:'row',paddingHorizontal:responsiveWidth(4),gap:responsiveWidth(0.90)}}>
                    <Text style={{fontSize:12,fontWeight:'500',lineHeight:17,letterSpacing:0,color:'#969696'}}>Address :</Text>
                    <Text style={{fontSize:13,fontWeight:'500',lineHeight:17,letterSpacing:0,color:'#535353'}}>32/E-1 M.L.B, Road , Bally, Howrah</Text>
               </View>
               <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:responsiveWidth(4),top:responsiveHeight(1)}}>
                     <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                            <Image source={images.paravetUserImage} style={{width:responsiveWidth(8),height:responsiveHeight(3.5),borderRadius:responsiveWidth(4)}}/>
                            <View style={{top:responsiveHeight(0.30)}}>
                                    <Text style={{fontSize:14,fontWeight:'600',lineHeight:15,letterSpacing:0,color:'#000000'}}>Joe Davis</Text>
                                    <Text style={{fontSize:10,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#878787'}}>Your Para Vet</Text>
                            </View>
                     </View>
                     <View style={{flexDirection:'row',gap:responsiveWidth(2),top:responsiveHeight(1)}}>
                            <Image source={Icons.BiMessageSquareDetail}/>
                            <Image source={Icons.BsTelephone}/>
                     </View>
               </View>
      </View>


             



              {/* Fixed Next Button */}
            <View style={paravetgooglemapstyles.fixedButtonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Main')}
                    style={paravetgooglemapstyles.nextBtnContainer}>
                    <Text style={paravetgooglemapstyles.nextBtnText}>Go Back to Homepage</Text>
                </TouchableOpacity>
            </View>


                   
            </View>
        </ImageBackground>

            

              
               
        </View>
    );
};

export default ParaVetGoogleMap;
