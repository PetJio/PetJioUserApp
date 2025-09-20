import { useState } from 'react';
import { View,Text,Image, FlatList,TouchableOpacity,Modal, Platform, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { responsiveWidth,responsiveHeight} from 'react-native-responsive-dimensions';
import boardingmodalstyles from './boardingmodal.styles';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';



 // Define your navigation stack's param list
 type RootStackParamList = {
     PetParentform: undefined;
     Main:undefined;
     PetWarriorform:undefined;
     DeliveryPartnerform:undefined;
     ServiceProviderform:undefined;
     SignIn:undefined;
     BoardingDetails:undefined;
     AddVaccination:undefined;
     BoardingRegistrationform:undefined;
     BoardingQuestions:undefined;
 };
 
 // Define the navigation prop type
 type BoardingModalScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BoardingRegistrationform'>;
 
 // Define props interface for the component
//  interface BoardingModalProps {
//    navigation:BoardingModalScreenNavigationProp;
//  }
 


type ModalComponentProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
};



const BoardingModal: React.FC<Omit<ModalComponentProps, 'navigation'>> = ({modalVisible,setModalVisible}) => {
   const navigation = useNavigation<BoardingModalScreenNavigationProp>();
    const [activeTab, setActiveTab] = useState<string>('NormalWalking');
    const [showDateModal, setShowDateModal] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
    const [showEndPicker, setShowEndPicker] = useState<boolean>(false);

    const handleTabPress = (tab: string) => {
        setActiveTab(tab);
    };

    const handleConfirm = () => {
        setModalVisible(false);
        setShowDateModal(true);
    };

    const handleDateConfirm = () => {
        setShowDateModal(false);
        navigation.navigate('BoardingQuestions');
    };

    const handleDateCancel = () => {
        setShowDateModal(false);
    };

    const handleStartDateChange = (event: any, selectedDate?: Date) => {
        setShowStartPicker(false);
        if (selectedDate) {
            setStartDate(selectedDate);
            // Ensure end date is after start date
            if (selectedDate >= endDate) {
                setEndDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000));
            }
        }
    };

    const handleEndDateChange = (event: any, selectedDate?: Date) => {
        setShowEndPicker(false);
        if (selectedDate && selectedDate > startDate) {
            setEndDate(selectedDate);
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <View style={boardingmodalstyles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={boardingmodalstyles.subcontainer}>
                    <View style={boardingmodalstyles.setmodalRadious}>
                        <View
                            style={
                                boardingmodalstyles.paddingOfNormalWalkingGroupWalking
                            }>
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
                            <View style={{gap: responsiveWidth(2.5)}}>
                                <View
                                    style={boardingmodalstyles.setFlexRow}>
                                    <View
                                        style={boardingmodalstyles.setFlexWithGap}>
                                        <Image
                                            source={images.germanDog}
                                            style={boardingmodalstyles.imageSize}
                                        />
                                        <View
                                            style={boardingmodalstyles.center}>
                                            <View
                                                style={boardingmodalstyles.flexORGap}>
                                                <Text
                                                    style={boardingmodalstyles.daisyText}>
                                                    Daisy
                                                </Text>
                                                <Image
                                                    source={Icons.BiFemaleSign}
                                                />
                                            </View>
                                            <Text
                                                style={boardingmodalstyles.yearText}>
                                                3 years
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={boardingmodalstyles.topforImage}>
                                        <Image
                                            source={Icons.BiSolidCheckCircle}
                                        />
                                    </View>
                                </View>
                                <View
                                    style={boardingmodalstyles.setFlexRow}>
                                    <View
                                        style={boardingmodalstyles.setFlexWithGap}>
                                        <Image
                                            source={images.goldenDog}
                                            style={boardingmodalstyles.imageSize}
                                        />
                                        <View
                                            style={boardingmodalstyles.center}>
                                            <View
                                                style={boardingmodalstyles.flexORGap}>
                                                <Text
                                                    style={boardingmodalstyles.daisyText}>
                                                     Leo
                                                </Text>
                                                <Image
                                                    source={Icons.BiFemaleSign}
                                                />
                                            </View>
                                            <Text
                                                style={boardingmodalstyles.yearText}>
                                                3 years
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={boardingmodalstyles.topforImage}>
                                        <Image
                                            source={Icons.BiSolidCheckCircle}
                                        />
                                    </View>
                                </View>
                               
                                <View
                                    style={boardingmodalstyles.setFlexRow}>
                                    <View
                                        style={boardingmodalstyles.setFlexWithGap}>
                                        <Image
                                            source={images.spaneilDog}
                                            style={boardingmodalstyles.imageSize}
                                        />
                                        <View
                                            style={boardingmodalstyles.center}>
                                            <View
                                                style={boardingmodalstyles.flexORGap}>
                                                <Text
                                                    style={boardingmodalstyles.daisyText}>
                                                    Bella
                                                </Text>
                                                <Image
                                                    source={Icons.BiFemaleSign}
                                                />
                                            </View>
                                            <Text
                                                style={boardingmodalstyles.yearText}>
                                                3 years
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={boardingmodalstyles.topforImage}>
                                        <Image
                                            source={Icons.CgRadioCheck}
                                        />
                                    </View>
                                </View>
                            </View>
                        )}

                        <View style={boardingmodalstyles.fixedButtonContainer}>
                            <TouchableOpacity
                                onPress={handleConfirm}
                                style={boardingmodalstyles.nextBtnContainer}>
                                <Text style={boardingmodalstyles.nextBtnText}>
                                    Confirm
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Date Selection Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showDateModal}
                onRequestClose={handleDateCancel}>
                <View style={boardingmodalstyles.dateModalOverlay}>
                    <View style={boardingmodalstyles.dateModalContainer}>
                        <View style={boardingmodalstyles.dateModalHeader}>
                            <Text style={boardingmodalstyles.dateModalTitle}>
                                Select Boarding Dates
                            </Text>
                            <TouchableOpacity onPress={handleDateCancel}>
                                <Text style={boardingmodalstyles.dateModalClose}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={boardingmodalstyles.dateInputsContainer}>
                            {/* Start Date Input */}
                            <View style={boardingmodalstyles.dateInputGroup}>
                                <Text style={boardingmodalstyles.dateLabel}>Start Date</Text>
                                <TouchableOpacity
                                    style={boardingmodalstyles.dateInput}
                                    onPress={() => setShowStartPicker(true)}>
                                    <Text style={boardingmodalstyles.dateInputText}>
                                        {formatDate(startDate)}
                                    </Text>
                                    <Image source={Icons.DownArrow} style={boardingmodalstyles.dateInputIcon} />
                                </TouchableOpacity>
                            </View>

                            {/* End Date Input */}
                            <View style={boardingmodalstyles.dateInputGroup}>
                                <Text style={boardingmodalstyles.dateLabel}>End Date</Text>
                                <TouchableOpacity
                                    style={boardingmodalstyles.dateInput}
                                    onPress={() => setShowEndPicker(true)}>
                                    <Text style={boardingmodalstyles.dateInputText}>
                                        {formatDate(endDate)}
                                    </Text>
                                    <Image source={Icons.DownArrow} style={boardingmodalstyles.dateInputIcon} />
                                </TouchableOpacity>
                            </View>

                            {/* Duration Display */}
                            <View style={boardingmodalstyles.durationContainer}>
                                <Text style={boardingmodalstyles.durationText}>
                                    Duration: {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                                </Text>
                            </View>
                        </View>

                        <View style={boardingmodalstyles.dateModalButtons}>
                            <TouchableOpacity
                                style={boardingmodalstyles.dateCancelBtn}
                                onPress={handleDateCancel}>
                                <Text style={boardingmodalstyles.dateCancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={boardingmodalstyles.dateConfirmBtn}
                                onPress={handleDateConfirm}>
                                <Text style={boardingmodalstyles.dateConfirmText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Start Date Picker */}
            {showStartPicker && (
                <DateTimePicker
                    value={startDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleStartDateChange}
                    minimumDate={new Date()}
                />
            )}

            {/* End Date Picker */}
            {showEndPicker && (
                <DateTimePicker
                    value={endDate}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleEndDateChange}
                    minimumDate={new Date(startDate.getTime() + 24 * 60 * 60 * 1000)}
                />
            )}
        </View>
    );
};

export default BoardingModal;
