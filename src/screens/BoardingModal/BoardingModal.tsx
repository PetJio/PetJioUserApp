import { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import boardingmodalstyles from './boardingmodal.styles';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define your navigation stack's param list
type RootStackParamList = {
  PetParentform: undefined;
  Main: undefined;
  PetWarriorform: undefined;
  DeliveryPartnerform: undefined;
  ServiceProviderform: undefined;
  SignIn: undefined;
  BoardingDetails: undefined;
  AddVaccination: undefined;
  BoardingRegistrationform: undefined;
};

// Define the navigation prop type
type BoardingModalScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BoardingRegistrationform'
>;

// Define props interface for the component
//  interface BoardingModalProps {
//    navigation:BoardingModalScreenNavigationProp;
//  }

type ModalComponentProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

const BoardingModal: React.FC<Omit<ModalComponentProps, 'navigation'>> = ({
  modalVisible,
  setModalVisible,
}) => {
  const navigation = useNavigation<BoardingModalScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<string>('NormalWalking');

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <View style={boardingmodalstyles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={boardingmodalstyles.subcontainer}>
          <View style={boardingmodalstyles.setmodalRadious}>
            <View
              style={boardingmodalstyles.paddingOfNormalWalkingGroupWalking}
            >
              {/* <TouchableOpacity
                                onPress={() => handleTabPress('NormalWalking')}>
                                <View
                                    style={[
                                        activeTab === 'NormalWalking' &&
                                            boardingmodalstyles.menuBottomBoarder,
                                    ]}>
                                    <Text
                                        style={[
                                            boardingmodalstyles.unselectText,
                                            activeTab === 'NormalWalking' &&
                                                boardingmodalstyles.selectText,
                                        ]}>
                                        Normal Walking
                                    </Text>
                                </View>
                            </TouchableOpacity> */}
              {/* <TouchableOpacity
                                onPress={() => handleTabPress('GroupWalking')}>
                                <View
                                    style={[
                                        activeTab === 'GroupWalking' &&
                                            boardingmodalstyles.menuBottomBoarder,
                                    ]}>
                                    <Text
                                        style={[
                                            boardingmodalstyles.unselectText,
                                            activeTab === 'GroupWalking' &&
                                                boardingmodalstyles.selectText,
                                        ]}>
                                        Group Walking
                                    </Text>
                                </View>
                            </TouchableOpacity> */}
            </View>

            {activeTab === 'NormalWalking' && (
              <View style={{ gap: responsiveWidth(2.5) }}>
                <View style={boardingmodalstyles.setFlexRow}>
                  <View style={boardingmodalstyles.setFlexWithGap}>
                    <Image
                      source={images.germanDog}
                      style={boardingmodalstyles.imageSize}
                    />
                    <View style={boardingmodalstyles.center}>
                      <View style={boardingmodalstyles.flexORGap}>
                        <Text style={boardingmodalstyles.daisyText}>Daisy</Text>
                        <Image source={Icons.BiFemaleSign} />
                      </View>
                      <Text style={boardingmodalstyles.yearText}>3 years</Text>
                    </View>
                  </View>
                  <View style={boardingmodalstyles.topforImage}>
                    <Image source={Icons.BiSolidCheckCircle} />
                  </View>
                </View>
                <View style={boardingmodalstyles.setFlexRow}>
                  <View style={boardingmodalstyles.setFlexWithGap}>
                    <Image
                      source={images.goldenDog}
                      style={boardingmodalstyles.imageSize}
                    />
                    <View style={boardingmodalstyles.center}>
                      <View style={boardingmodalstyles.flexORGap}>
                        <Text style={boardingmodalstyles.daisyText}>Leo</Text>
                        <Image source={Icons.BiFemaleSign} />
                      </View>
                      <Text style={boardingmodalstyles.yearText}>3 years</Text>
                    </View>
                  </View>
                  <View style={boardingmodalstyles.topforImage}>
                    <Image source={Icons.BiSolidCheckCircle} />
                  </View>
                </View>

                <View style={boardingmodalstyles.setFlexRow}>
                  <View style={boardingmodalstyles.setFlexWithGap}>
                    <Image
                      source={images.spaneilDog}
                      style={boardingmodalstyles.imageSize}
                    />
                    <View style={boardingmodalstyles.center}>
                      <View style={boardingmodalstyles.flexORGap}>
                        <Text style={boardingmodalstyles.daisyText}>Bella</Text>
                        <Image source={Icons.BiFemaleSign} />
                      </View>
                      <Text style={boardingmodalstyles.yearText}>3 years</Text>
                    </View>
                  </View>
                  <View style={boardingmodalstyles.topforImage}>
                    <Image source={Icons.CgRadioCheck} />
                  </View>
                </View>
              </View>
            )}

            <View style={boardingmodalstyles.fixedButtonContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('BoardingRegistrationform')}
                // onPress={() => setModalVisible(false)}
                style={boardingmodalstyles.nextBtnContainer}
              >
                <Text style={boardingmodalstyles.nextBtnText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BoardingModal;
