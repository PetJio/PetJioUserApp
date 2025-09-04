import {useState,useEffect,useRef,useCallback,} from 'react';
import { View, Text,Image, Dimensions,TouchableOpacity,FlatList, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { StackNavigationProp } from '@react-navigation/stack';
import veterinaryaboutstyles from './veterinaryabout.styles';
import { responsiveWidth, responsiveHeight,} from 'react-native-responsive-dimensions';
import VeterinaryBookConsultation from '../VeterinaryBookConsultation/VeterinaryBookConsultation';


const VeterinaryAbout: React.FC = () => {

     const [modalVisible,setModalVisible] = useState<boolean>(false);

    return (
          <View style={veterinaryaboutstyles.containerFlex}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:90}}>

             <View style={veterinaryaboutstyles.container}>
                 <View style={veterinaryaboutstyles.containerthirdsubchild} />
                <View style={veterinaryaboutstyles.expertiseText}>
                       <Text style={veterinaryaboutstyles.bioText}>Education</Text>
                       <Text style={veterinaryaboutstyles.paragraphText}>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </Text>
                </View>

               
               
                <View style={veterinaryaboutstyles.expertiseText}>
                     <Text style={veterinaryaboutstyles.paragraphText}>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                     </Text>
              </View>
   
              <View style={{ marginLeft:responsiveWidth(4),gap:responsiveHeight(1)}}>
                    <Text style={{color:'#343434',fontSize:14,fontWeight:'500',lineHeight:18,letterSpacing:0}}>Available Time slots</Text>
                    <View style={{flexDirection:'row',gap:responsiveWidth(1),top:responsiveHeight(0.50)}}>
                    <View style={{width:responsiveWidth(20), height:responsiveHeight(5), borderWidth:1,  borderColor:'#D3D3D3', borderRadius:responsiveHeight(0.60),justifyContent:'center',alignItems:'center',}}>
                           <Text style={{color:'#000000',fontSize:12,fontWeight:'600',lineHeight:14,letterSpacing:0}}>01:00 PM</Text>
                           <Text style={{color:'#000000',fontSize:8,fontWeight:'300',lineHeight:12,letterSpacing:0}}>Slots available</Text>
                    </View>
                    <View style={{width:responsiveWidth(20), height:responsiveHeight(5), borderWidth:1, borderColor:'#D3D3D3', borderRadius:responsiveHeight(0.60),justifyContent:'center',alignItems:'center',backgroundColor:'#58B9D0'}}>
                           <Text style={{color:'#ffffff',fontSize:12,fontWeight:'600',lineHeight:14,letterSpacing:0}}>02:00 PM</Text>
                           <Text style={{color:'#ffffff',fontSize:8,fontWeight:'300',lineHeight:12,letterSpacing:0}}>Slots available</Text>
                    </View>
                    <View style={{width:responsiveWidth(20), height:responsiveHeight(5), borderWidth:1,  borderColor:'#D3D3D3', borderRadius:responsiveHeight(0.60),justifyContent:'center',alignItems:'center',}}>
                           <Text style={{color:'#6C6C6C',fontSize:12,fontWeight:'600',lineHeight:14,letterSpacing:0}}>03:00 PM</Text>
                           <Text style={{color:'#6C6C6C',fontSize:8,fontWeight:'300',lineHeight:12,letterSpacing:0}}>No Slots available</Text>
                    </View>
                    <View style={{width:responsiveWidth(20), height:responsiveHeight(5), borderWidth:1,  borderColor:'#D3D3D3', borderRadius:responsiveHeight(0.60),justifyContent:'center',alignItems:'center',}}>
                           <Text style={{color:'#000000',fontSize:12,fontWeight:'600',lineHeight:14,letterSpacing:0}}>03:00 PM</Text>
                           <Text style={{color:'#000000',fontSize:8,fontWeight:'300',lineHeight:12,letterSpacing:0}}>Slots available</Text>
                    </View>
                    </View>
              </View>
              <View style={{justifyContent:'center',alignItems:'center'}}>
                     <Text style={{fontSize:12,fontWeight:'400',lineHeight:16,letterSpacing:0,color:'#1D4650'}}>View all slots</Text>
              </View>
          </View>
    </ScrollView>

    <VeterinaryBookConsultation modalVisible={modalVisible} setModalVisible={setModalVisible} />



    {/* Fixed Button at the Bottom */}
<View style={veterinaryaboutstyles.fixedButtonContainer}>
    <TouchableOpacity
        onPress={() =>setModalVisible(true)}
        style={veterinaryaboutstyles.nextBtnContainer}>
        <Text style={veterinaryaboutstyles.nextBtnText}>Book for Consultation</Text>
    </TouchableOpacity>
</View>

    
</View>

       
    );
};

export default VeterinaryAbout;