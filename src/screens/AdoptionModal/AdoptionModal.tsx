import { useState } from 'react';
import { View,Text,Image, FlatList,TouchableOpacity,Modal} from 'react-native';
import { responsiveWidth,responsiveHeight} from 'react-native-responsive-dimensions';
import adoptionmodalstyles from './adoptionmodal.styles';
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

const AdoptionModal: React.FC<Omit<ModalComponentProps, 'navigation'>> = ({modalVisible,setModalVisible}) => {
    const navigation = useNavigation<TrainingModalScreenNavigationProp>();
    const [activeTab, setActiveTab] = useState<string>('NormalWalking');

    const handleTabPress = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <View style={adoptionmodalstyles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={adoptionmodalstyles.subcontainer}>
                    <View style={adoptionmodalstyles.setmodalRadious}>
                        
                      <View style={adoptionmodalstyles.centerInnerView}>
                         <View style={adoptionmodalstyles.adoptionDogView}>
                             <View>
                                  <Image source={images.physicaladoptionImage} style={adoptionmodalstyles.imageSize}/>
                                  <Text style={adoptionmodalstyles.text}>Physical Adoption</Text>
                             </View>
                       </View>
                       <TouchableOpacity
                        onPress={()=>navigation.navigate('VirtualAdoption')}
                       >

                          <View style={adoptionmodalstyles.adoptionDogView}>
                             <View>
                                  <Image source={images.physicaladoptionImage} style={adoptionmodalstyles.imageSize}/>
                                  <Text style={adoptionmodalstyles.text}>Virtual Adoption</Text>
                             </View>
                       </View>
                       </TouchableOpacity>
                              
                      </View>

                       
                        <View style={adoptionmodalstyles.fixedButtonContainer}>
                            <TouchableOpacity
                                 onPress={()=>setModalVisible(false)}
                                style={adoptionmodalstyles.nextBtnContainer}>
                                <Text style={adoptionmodalstyles.nextBtnText}>
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

export default AdoptionModal;
