import { useState,useMemo } from 'react';
import { View,Text,Image, FlatList,TouchableOpacity,Modal,TextInput,TextStyle} from 'react-native';
import { responsiveWidth,responsiveHeight} from 'react-native-responsive-dimensions';
import ngopetcoinmodalstyles from './ngopetcoinmodal.styles';
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
    DonatePaymentconfirmmethod:undefined
};


// Define the navigation prop type
type TrainingModalScreenNavigationProp = StackNavigationProp<RootStackParamList>;


type ModalComponentProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    navigation: TrainingModalScreenNavigationProp;
};

const NGOPetcoinModal: React.FC<Omit<ModalComponentProps, 'navigation'>> = ({modalVisible,setModalVisible}) => {
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
        <View style={ngopetcoinmodalstyles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={ngopetcoinmodalstyles.subcontainer}>
                    <View style={selectedId === '1'?ngopetcoinmodalstyles.paypartiallymodalRadious:ngopetcoinmodalstyles.payfullymodalRadious}>
                         <View style={ngopetcoinmodalstyles.GapView}>
                               <Text style={{fontSize:18,fontWeight:'600',lineHeight:19,letterSpacing:0,color:'#000000'}} >Do you want to pay using Pet coin ?</Text>
                               <Text style={{fontSize:14,fontWeight:'500',lineHeight:19,letterSpacing:0,color:'#696969'}}>Available Petcoin : 20 Coins</Text>
                               
                               <RadioGroup
                                 radioButtons={radioButtons}
                                 onPress={setSelectedId}
                                 selectedId={selectedId}
                                 layout="row"
                                 containerStyle={ngopetcoinmodalstyles.radioContainer}
                           />

                           {selectedId === '1'?<TextInput
                               placeholder="Enter the amount pet coin you want to use"
                               placeholderTextColor="#9A9A9A"
                               value={petCoinAmount}
                               onChangeText={setPetCoinAmount}
                               style={ngopetcoinmodalstyles.input}
                               keyboardType="numeric"
                            />:''}

                        </View>

                
                        <View style={ngopetcoinmodalstyles.fixedButtonContainer}>
                            <TouchableOpacity
                                 onPress={()=>navigation.navigate("DonatePaymentconfirmmethod")}
                                style={ngopetcoinmodalstyles.nextBtnContainer}>
                                <Text style={ngopetcoinmodalstyles.nextBtnText}>
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

export default NGOPetcoinModal;
