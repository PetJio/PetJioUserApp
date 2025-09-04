import { useState } from 'react';
import { View,Text,Image, FlatList,TouchableOpacity,Modal} from 'react-native';
import { responsiveWidth,responsiveHeight} from 'react-native-responsive-dimensions';
import veterinaryreviewmodalstyles from './veterinaryreviewmodal.styles';
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
};


// Define the navigation prop type
type TrainingModalScreenNavigationProp = StackNavigationProp<RootStackParamList>;


type ModalComponentProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    navigation: TrainingModalScreenNavigationProp;
};

const VeterinaryReviewModal: React.FC<Omit<ModalComponentProps, 'navigation'>> = ({modalVisible,setModalVisible}) => {
    const navigation = useNavigation<TrainingModalScreenNavigationProp>();
    const [activeTab, setActiveTab] = useState<string>('NormalWalking');

    const handleTabPress = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <View style={veterinaryreviewmodalstyles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={veterinaryreviewmodalstyles.subcontainer}>
                    <View style={veterinaryreviewmodalstyles.setmodalRadious}>
                        <View>
                                <Text  style={{fontSize:16,fontWeight:'500',lineHeight:18,letterSpacing:0,color:'#000000'}} >How was your experience ?</Text>
                        </View> 

                         <View style={{flexDirection:'row',gap:responsiveWidth(2)}}>
                                 <Image source={Icons.AiOutlineStar}/> 
                                 <Image source={Icons.AiOutlineStar}/>    
                                 <Image source={Icons.AiOutlineStar}/>    
                                 <Image source={Icons.AiOutlineStar}/>    
                                 <Image source={Icons.AiOutlineStar}/>       
                         </View> 

                         <View style={{gap:responsiveHeight(1.5)}}>
                               <Text style={{fontSize:16,fontWeight:'500',lineHeight:18,}}>Write a review</Text>
                               <View style={{width:responsiveWidth(88.5),height:responsiveHeight(16),borderRadius:responsiveWidth(1),borderWidth:responsiveWidth(0.30),borderColor:'#D7D7D7'}} />
                               <View style={{justifyContent:'center', alignItems:'center',width:responsiveWidth(24),height:responsiveHeight(12),borderRadius:responsiveWidth(1),borderWidth:responsiveWidth(0.30),borderColor:"#D7D7D7"}}>
                                    <View style={{justifyContent:'center', alignItems:'center',width:responsiveWidth(11),height:responsiveHeight(6),borderRadius:responsiveWidth(12),backgroundColor:"#58B9D0"}}>
                                           <Image source={Icons.BiSolidCamera}/>
                                            
                                    </View>
                                    <Text style={{fontSize:10,fontWeight:'500',lineHeight:18,letterSpacing:0,color:'#000000'}}>Add Photos</Text>
                               </View>
                         </View>    
                   

                       
                        <View style={veterinaryreviewmodalstyles.fixedButtonContainer}>
                            <TouchableOpacity
                                 onPress={()=>setModalVisible(false)}
                                style={veterinaryreviewmodalstyles.nextBtnContainer}>
                                <Text style={veterinaryreviewmodalstyles.nextBtnText}>
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

export default VeterinaryReviewModal;
