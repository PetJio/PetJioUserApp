import { useState } from 'react';
import { View,Text,Image, FlatList,TouchableOpacity,Modal} from 'react-native';
import { responsiveWidth,responsiveHeight} from 'react-native-responsive-dimensions';
import veterinarybookconsultationstyles from './veterinarybookconsultation.styles';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';



// Define your navigation stack's param list
type RootStackParamList = {
    ConfirmDetails:undefined;
    TrainingConfirmDetails:undefined;
    VirtualAdoption:undefined;
    NGODetails:undefined;
    VoiceCallWithVeterinary:undefined;
};


// Define the navigation prop type
type TrainingModalScreenNavigationProp = StackNavigationProp<RootStackParamList>;


type ModalComponentProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    navigation: TrainingModalScreenNavigationProp;
};

const VeterinaryBookConsultation: React.FC<Omit<ModalComponentProps, 'navigation'>> = ({modalVisible,setModalVisible}) => {
    const navigation = useNavigation<TrainingModalScreenNavigationProp>();
    const [activeTab, setActiveTab] = useState<string>('NormalWalking');

    const handleTabPress = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <View style={veterinarybookconsultationstyles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={veterinarybookconsultationstyles.subcontainer}>
                    <View style={veterinarybookconsultationstyles.setmodalRadious}>
                      <View style={{justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:20,fontWeight:'600',lineHeight:25,letterSpacing:0,color:'#000000'}} >Book a consultation</Text>
                            <View>
                                   <Text style={{fontSize:8,fontWeight:'500',lineHeight:12,letterSpacing:0,color:'#737373'}} >Every minute of usage deducts credits from your wallet. If your balance reaches zero, additional usage will accrue as an outstanding amount, which will be deducted first when you add funds. Please monitor your balance to avoid interruptions.</Text>
                            </View>
                      </View> 

                      <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center',gap:responsiveWidth(2)}}>
                             

                              <View style={{gap:responsiveHeight(1)}}>
                                   <TouchableOpacity
                                      onPress={()=>{navigation.navigate("VoiceCallWithVeterinary");setModalVisible(false)}}
                                    >
                                 <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(45),height:responsiveHeight(6),borderRadius:responsiveWidth(1),borderWidth:responsiveWidth(0.30),borderColor:'#4494A8'}}>
                                   <View style={{flexDirection:'row',gap:responsiveWidth(3)}}>
                                          <Image source={Icons.BsTelephoneFill}/>
                                          <Text style={{fontSize:14,fontWeight:'500',lineHeight:18,letterSpacing:0,color:'#4494A8'}}>Voice Call</Text>
                                   </View>
                               </View>

                                   </TouchableOpacity>
                                   <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row',gap:responsiveWidth(1)}}>
                                       <Image source={Icons.petjio_logo}/>
                                       <Text style={{fontSize:11,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#828282'}} >20 per minute</Text>
                                   </View>
                                    
                             </View>
                            
                             {/* <View style={{justifyContent:'center', alignItems:'center', width:responsiveWidth(45),height:responsiveHeight(6),borderRadius:responsiveWidth(1),borderWidth:responsiveWidth(0.30),borderColor:'#4494A8'}}>
                                            <View style={{flexDirection:'row',gap:responsiveWidth(3)}}>
                                          <Image source={Icons.BsFillCameraVideoFill}/>
                                          <Text style={{fontSize:14,fontWeight:'500',lineHeight:18,letterSpacing:0,color:'#4494A8'}}>Voice Call</Text>
                                   </View>
                             </View> */}


                            <View style={{gap:responsiveHeight(1)}}>
                                <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(45),height:responsiveHeight(6),borderRadius:responsiveWidth(1),borderWidth:responsiveWidth(0.30),borderColor:'#4494A8'}}>
                                   <View style={{flexDirection:'row',gap:responsiveWidth(3)}}>
                                          <Image source={Icons.BsFillCameraVideoFill}/>
                                          <Text style={{fontSize:14,fontWeight:'500',lineHeight:18,letterSpacing:0,color:'#4494A8'}}>Video Call</Text>
                                   </View>
                             </View>
                                   <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row',gap:responsiveWidth(1)}}>
                                       <Image source={Icons.petjio_logo}/>
                                       <Text style={{fontSize:11,fontWeight:'500',lineHeight:16,letterSpacing:0,color:'#828282'}} >20 per minute</Text>
                                   </View>
                                    
                             </View>


                      </View>

                         
 
                   

                       
                        <View style={veterinarybookconsultationstyles.fixedButtonContainer}>
                            <TouchableOpacity
                                 onPress={()=>setModalVisible(false)}
                                style={veterinarybookconsultationstyles.nextBtnContainer}>
                                <Text style={veterinarybookconsultationstyles.nextBtnText}>
                                    Submit Review
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default VeterinaryBookConsultation;
