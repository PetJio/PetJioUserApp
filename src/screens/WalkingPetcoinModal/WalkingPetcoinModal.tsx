import { useState,useMemo } from 'react';
import { View,Text,Image, FlatList,TouchableOpacity,Modal,TextInput,TextStyle} from 'react-native';
import { responsiveWidth,responsiveHeight} from 'react-native-responsive-dimensions';
import walkingpetcoinmodalstyles from './walkingpetcoinmodal.styles';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import RadioGroup from 'react-native-radio-buttons-group';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define your navigation stack's param list
type RootStackParamList = {
    ConfirmDetails:undefined;
    TrainingConfirmDetails:undefined;
    VirtualAdoption:undefined;
    NGODetails:undefined;
    GroomingPaymentconfirmmethod:undefined;
    BoardingBooking:undefined;
    Paymentconfirmmethod:undefined;
};


// Define the navigation prop type
type TrainingModalScreenNavigationProp = StackNavigationProp<RootStackParamList>;


type ModalComponentProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    navigation: TrainingModalScreenNavigationProp;
};

const WalkingPetcoinModal: React.FC<Omit<ModalComponentProps, 'navigation'>> = ({modalVisible,setModalVisible}) => {
    const navigation = useNavigation<TrainingModalScreenNavigationProp>();
    const [activeTab, setActiveTab] = useState<string>('NormalWalking');
    const [selectedId, setSelectedId] = useState<string>('1');
    const [petCoinAmount, setPetCoinAmount] = useState<string>('');
    const handleTabPress = (tab: string) => {
        setActiveTab(tab);
    };



const radioButtons = useMemo(() => ([
  {
    id: '1', 
    label: 'Pay Partially',
    value: 'Pay Partially',
    color: '#58B9D0',      
    borderColor: '#58B9D0', 
    labelStyle: {
      fontSize: 14,
      fontWeight: '500' as TextStyle['fontWeight'],
      color: '#1F1F1F',
    } as TextStyle,
  },
  {
    id: '2',
    label: 'Pay Fully',
    value: 'Pay Fully',
    color: '#58B9D0',      
    borderColor: '#58B9D0', 
    labelStyle: {
      fontSize: 14,
      fontWeight: '500' as TextStyle['fontWeight'],
      color: '#1F1F1F',
    } as TextStyle,
  }
]), []);

    
    return (
        <View style={walkingpetcoinmodalstyles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={walkingpetcoinmodalstyles.subcontainer}>
                    <View style={walkingpetcoinmodalstyles.modalRadiousView}>
                         <View style={walkingpetcoinmodalstyles.GapView}>
                               <Text style={{fontSize:18,fontWeight:'600',lineHeight:19,letterSpacing:0,color:'#000000'}} >Do you want to pay using Pet coin ?</Text>
                               <Text style={{fontSize:14,fontWeight:'500',lineHeight:19,letterSpacing:0,color:'#696969'}}>Available Petcoin : 20 Coins</Text>
                               
                               {/* <RadioGroup
                                 radioButtons={radioButtons}
                                 onPress={setSelectedId}
                                 selectedId={selectedId}
                                 layout="row"
                                 containerStyle={walkingpetcoinmodalstyles.radioContainer}
                           /> */}

                        
                        </View>

                
                        <View style={walkingpetcoinmodalstyles.fixedButtonContainer}>
                            <TouchableOpacity
                                 onPress={()=>navigation.navigate("Paymentconfirmmethod")}
                                style={walkingpetcoinmodalstyles.nextBtnContainer}>
                                <Text style={walkingpetcoinmodalstyles.nextBtnText}>
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

export default WalkingPetcoinModal;