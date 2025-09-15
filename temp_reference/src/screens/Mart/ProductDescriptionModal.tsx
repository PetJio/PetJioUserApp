import { useState } from 'react';
import { View,Text,Image, FlatList,TouchableOpacity,Modal} from 'react-native';
import { responsiveWidth,responsiveHeight} from 'react-native-responsive-dimensions';
import productdescriptionmodalstyles from './productdescriptionmodal.styles';
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

const ProductDescriptionModal: React.FC<Omit<ModalComponentProps, 'navigation'>> = ({modalVisible,setModalVisible}) => {
    const navigation = useNavigation<TrainingModalScreenNavigationProp>();
    const [activeTab, setActiveTab] = useState<string>('NormalWalking');

    const handleTabPress = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <View style={productdescriptionmodalstyles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={productdescriptionmodalstyles.subcontainer}>
                    <View style={productdescriptionmodalstyles.setmodalRadious}>
                      <View style={{gap:responsiveHeight(2)}}>
                            <View style={{gap:responsiveHeight(1)}}>
                                 <Text style={{fontSize:16,fontWeight:'600',lineHeight:22,letterSpacing:0,color:'#4494A8'}}>Product Description</Text>
                                 <Text style={{fontSize:12,fontWeight:'500',fontStyle:'italic',lineHeight:18,color:'#7C7C7C'}}>The monster who only feasts on snuggles and playtimes!</Text>
                                  <Text style={{fontSize:12,fontWeight:'500',fontStyle:'italic',lineHeight:18,color:'#7C7C7C'}}> <Text style={{fontSize:12,fontWeight:'500',lineHeight:18,color:'#7C7C7C'}}>Meet Chompzilla-the squeaky cuddle toy your dog will {"\n"} love to bits! Made with soft corduroy fabric, this plush monster-shaped toy promises perfect snuggle sessions as well as stimulating playtime. The hidden squeaker in its belly makes it a great sensory experience for your pet, encouraging active play. This super adorable monster has a lightweight body that is easy to play with and cuddle close.</Text></Text>
                            </View>
                            <View>
                                   <Text style={{fontSize:16,fontWeight:'600',lineHeight:22,letterSpacing:0,color:'#4494A8'}}>Features</Text>
                                   {/* Bullet Points */}
                                                   <View>
                                                       {[
                                                       'Made with soft corduroy fabric',
                                                       'Safe and non-toxic materials',
                                                       'Squeaker inside for interactive play',
                                                       'Lightweight design',
                                                       'Easy to play with',
                                                       'Dimension: 20 cm/ 7.9 inches'
                                                       ].map((item, index) => (
                                                       <View key={index} style={{ flexDirection: 'row',marginLeft:responsiveWidth(3) }}>
                                                           <Text style={{ fontSize: 12,lineHeight:18,fontWeight:'500',letterSpacing:0,color:'#949494'}}>{'\u2022'}</Text>
                                                           <Text style={{ fontSize: 12,lineHeight:18,fontWeight:'500',letterSpacing:0,color:'#949494',marginLeft:responsiveWidth(1)}}>{item}</Text>
                                                       </View>
                                                       ))}
                                                   </View>
                            </View>

                            <View>
                                   <Text style={{fontSize:16,fontWeight:'600',lineHeight:22,letterSpacing:0,color:'#4494A8'}}>Wash Care</Text>
                                   {/* Bullet Points */}
                                                   <View>
                                                       {[
                                                       'Wash under regular running water using a mild soap',
                                                       'Dry the toy properly before use.',
                                                       ].map((item, index) => (
                                                       <View key={index} style={{ flexDirection: 'row',marginLeft:responsiveWidth(3) }}>
                                                           <Text style={{ fontSize: 12,lineHeight:18,fontWeight:'500',letterSpacing:0,color:'#949494'}}>{'\u2022'}</Text>
                                                           <Text style={{ fontSize: 12,lineHeight:18,fontWeight:'500',letterSpacing:0,color:'#949494',marginLeft:responsiveWidth(1)}}>{item}</Text>
                                                       </View>
                                                       ))}
                                                   </View>
                            </View>

                             <View>
                                   <Text style={{fontSize:16,fontWeight:'600',lineHeight:22,letterSpacing:0,color:'#4494A8'}}>Pet parents, please note</Text>
                                   {/* Bullet Points */}
                                                   <View>
                                                       {[
                                                       'We always recommend pet parental supervision',
                                                        'during playtime.',
                                                       'Always buy size-appropriate toys for your pet.',
                                                       'No toy is completely indestructible. In case of '
                                                       ].map((item, index) => (
                                                       <View key={index} style={{ flexDirection: 'row',marginLeft:responsiveWidth(3) }}>
                                                           <Text style={{ fontSize: 12,lineHeight:18,fontWeight:'500',letterSpacing:0,color:'#949494'}}>{'\u2022'}</Text>
                                                           <Text style={{ fontSize: 12,lineHeight:18,fontWeight:'500',letterSpacing:0,color:'#949494',marginLeft:responsiveWidth(1)}}>{item}</Text>
                                                       </View>
                                                       ))}
                                                   </View>
                                       </View>
                           </View>  
                                     
                        <View style={productdescriptionmodalstyles.fixedButtonContainer}>
                            <TouchableOpacity
                                 onPress={()=>setModalVisible(false)}
                                style={productdescriptionmodalstyles.nextBtnContainer}>
                                <Text style={productdescriptionmodalstyles.nextBtnText}>
                                    Confirm
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ProductDescriptionModal;
