import { useState } from 'react';
import { View,Text,Image, FlatList,TouchableOpacity,Modal} from 'react-native';
import { responsiveWidth,responsiveHeight} from 'react-native-responsive-dimensions';
import trainingmodalstyles from './trainingmodal.styles';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


// Define your navigation stack's param list
type RootStackParamList = {
    ConfirmDetails:undefined;
    TrainingConfirmDetails:undefined;
};


// Define the navigation prop type
type TrainingModalScreenNavigationProp = StackNavigationProp<RootStackParamList>;


type ModalComponentProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    navigation: TrainingModalScreenNavigationProp;
};

const TrainingModal: React.FC<Omit<ModalComponentProps, 'navigation'>> = ({modalVisible,setModalVisible}) => {
    const navigation = useNavigation<TrainingModalScreenNavigationProp>();
    const [activeTab, setActiveTab] = useState<string>('NormalWalking');

    const handleTabPress = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <View style={trainingmodalstyles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={trainingmodalstyles.subcontainer}>
                    <View style={trainingmodalstyles.setmodalRadious}>
                        <View style={{ gap: responsiveWidth(2.5) }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: responsiveWidth(4),
                                    }}>
                                    <View
                                        style={{
                                            top: responsiveHeight(2),
                                            flexDirection: 'row',
                                            gap: responsiveWidth(2.5),
                                        }}>
                                        <Image
                                            source={images.germanDog}
                                            resizeMode="cover"
                                            style={{
                                                width: responsiveWidth(12),
                                                height:responsiveWidth(12),
                                                borderRadius:
                                                    responsiveWidth(6),
                                            }}
                                        />
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    gap: responsiveWidth(1),
                                                }}>
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: '500',
                                                        lineHeight: 18,
                                                        letterSpacing: -0.5,
                                                        color: '#000000',
                                                    }}>
                                                    Daisy
                                                </Text>
                                                <Image
                                                    source={Icons.BiFemaleSign}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: '500',
                                                    lineHeight: 12,
                                                    letterSpacing: 0.5,
                                                    color: '#979797',
                                                    right: responsiveHeight(1),
                                                }}>
                                                3 years
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ top: responsiveHeight(4) }}>
                                        <Image
                                            source={Icons.BiSolidCheckCircle}
                                        />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: responsiveWidth(4),
                                    }}>
                                    <View
                                        style={{
                                            top: responsiveHeight(2),
                                            flexDirection: 'row',
                                            gap: responsiveWidth(2.5),
                                        }}>
                                        <Image
                                            source={images.goldenDog}
                                            resizeMode="cover"
                                            style={{
                                                width: responsiveWidth(12),
                                                height:responsiveWidth(12),
                                                borderRadius:
                                                    responsiveWidth(6),
                                            }}
                                        />
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    gap: responsiveWidth(1),
                                                }}>
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: '500',
                                                        lineHeight: 18,
                                                        letterSpacing: -0.5,
                                                        color: '#000000',
                                                    }}>
                                                    Daisy
                                                </Text>
                                                <Image
                                                    source={Icons.BiMaleSign}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: '500',
                                                    lineHeight: 12,
                                                    letterSpacing: 0.5,
                                                    color: '#979797',
                                                    right: responsiveHeight(1),
                                                }}>
                                                3 years
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ top: responsiveHeight(4) }}>
                                        <Image
                                            source={Icons.BiSolidCheckCircle}
                                        />
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: responsiveWidth(4),
                                    }}>
                                    <View
                                        style={{
                                            top: responsiveHeight(2),
                                            flexDirection: 'row',
                                            gap: responsiveWidth(2.5),
                                        }}>
                                         <Image
                                            source={images.spaneilDog}
                                            resizeMode="cover"
                                            style={{
                                                width: responsiveWidth(12),
                                                height:responsiveWidth(12),
                                                borderRadius:
                                                    responsiveWidth(6),
                                            }}
                                        />
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    gap: responsiveWidth(1),
                                                }}>
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: '500',
                                                        lineHeight: 18,
                                                        letterSpacing: -0.5,
                                                        color: '#000000',
                                                    }}>
                                                    Leo
                                                </Text>
                                                <Image
                                                    source={Icons.BiMaleSign}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: '500',
                                                    lineHeight: 12,
                                                    letterSpacing: 0.5,
                                                    color: '#979797',
                                                    right: responsiveHeight(1),
                                                }}>
                                                3 years
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ top: responsiveHeight(4) }}>
                                        <Image source={Icons.CgRadioCheck} />
                                    </View>
                                </View>
                            </View>
                        {/* <View
                            style={
                                trainingmodalstyles.paddingOfNormalWalkingGroupWalking
                            }>
                            <TouchableOpacity
                                onPress={() => handleTabPress('NormalWalking')}>
                                <View
                                    style={[
                                        activeTab === 'NormalWalking' &&
                                        trainingmodalstyles.menuBottomBoarder,
                                    ]}>
                                    <Text
                                        style={[
                                            trainingmodalstyles.unselectText,
                                            activeTab === 'NormalWalking' &&
                                            trainingmodalstyles.selectText,
                                        ]}>
                                        Normal Walking
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleTabPress('GroupWalking')}>
                                <View
                                    style={[
                                        activeTab === 'GroupWalking' &&
                                        trainingmodalstyles.menuBottomBoarder,
                                    ]}>
                                    <Text
                                        style={[
                                            trainingmodalstyles.unselectText,
                                            activeTab === 'GroupWalking' &&
                                            trainingmodalstyles.selectText,
                                        ]}>
                                        Group Walking
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {activeTab === 'NormalWalking' && (
                            <View style={{ gap: responsiveWidth(2.5) }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: responsiveWidth(4),
                                    }}>
                                    <View
                                        style={{
                                            top: responsiveHeight(2),
                                            flexDirection: 'row',
                                            gap: responsiveWidth(2.5),
                                        }}>
                                        <Image
                                            source={images.germanDog}
                                            resizeMode="cover"
                                            style={{
                                                width: responsiveWidth(12),
                                                height:responsiveWidth(12),
                                                borderRadius:
                                                    responsiveWidth(6),
                                            }}
                                        />


                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    gap: responsiveWidth(1),
                                                }}>
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: '500',
                                                        lineHeight: 18,
                                                        letterSpacing: -0.5,
                                                        color: '#000000',
                                                    }}>
                                                    Daisy
                                                </Text>
                                                <Image
                                                    source={Icons.BiFemaleSign}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: '500',
                                                    lineHeight: 12,
                                                    letterSpacing: 0.5,
                                                    color: '#979797',
                                                    right: responsiveHeight(1),
                                                }}>
                                                3 years
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ top: responsiveHeight(4) }}>
                                        <Image
                                            source={Icons.BiSolidCheckCircle}
                                        />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: responsiveWidth(4),
                                    }}>
                                    <View
                                        style={{
                                            top: responsiveHeight(2),
                                            flexDirection: 'row',
                                            gap: responsiveWidth(2.5),
                                        }}>
                                        <Image
                                            source={images.goldenDog}
                                            resizeMode="cover"
                                            style={{
                                                width: responsiveWidth(12),
                                                height:responsiveWidth(12),
                                                borderRadius:
                                                    responsiveWidth(6),
                                            }}
                                        />
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    gap: responsiveWidth(1),
                                                }}>
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: '500',
                                                        lineHeight: 18,
                                                        letterSpacing: -0.5,
                                                        color: '#000000',
                                                    }}>
                                                    Daisy
                                                </Text>
                                                <Image
                                                    source={Icons.BiMaleSign}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: '500',
                                                    lineHeight: 12,
                                                    letterSpacing: 0.5,
                                                    color: '#979797',
                                                    right: responsiveHeight(1),
                                                }}>
                                                3 years
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ top: responsiveHeight(4) }}>
                                        <Image
                                            source={Icons.BiSolidCheckCircle}
                                        />
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: responsiveWidth(4),
                                    }}>
                                    <View
                                        style={{
                                            top: responsiveHeight(2),
                                            flexDirection: 'row',
                                            gap: responsiveWidth(2.5),
                                        }}>
                                         <Image
                                            source={images.spaneilDog}
                                            resizeMode="cover"
                                            style={{
                                                width: responsiveWidth(12),
                                                height:responsiveWidth(12),
                                                borderRadius:
                                                    responsiveWidth(6),
                                            }}
                                        />
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    gap: responsiveWidth(1),
                                                }}>
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: '500',
                                                        lineHeight: 18,
                                                        letterSpacing: -0.5,
                                                        color: '#000000',
                                                    }}>
                                                    Leo
                                                </Text>
                                                <Image
                                                    source={Icons.BiMaleSign}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: '500',
                                                    lineHeight: 12,
                                                    letterSpacing: 0.5,
                                                    color: '#979797',
                                                    right: responsiveHeight(1),
                                                }}>
                                                3 years
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ top: responsiveHeight(4) }}>
                                        <Image source={Icons.CgRadioCheck} />
                                    </View>
                                </View>
                            </View>
                        )} */}


          
                             {/* {activeTab === 'GroupWalking' && (
                            <View style={{ gap: responsiveWidth(2.5) }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: responsiveWidth(4),
                                    }}>
                                    <View
                                        style={{
                                            top: responsiveHeight(2),
                                            flexDirection: 'row',
                                            gap: responsiveWidth(2.5),
                                        }}>
                                        <Image
                                            source={images.germanDog}
                                            style={{
                                                width: responsiveWidth(12),
                                                height: responsiveHeight(5.2),
                                                borderRadius:
                                                    responsiveWidth(30),
                                            }}
                                        />
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    gap: responsiveWidth(1),
                                                }}>
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: '500',
                                                        lineHeight: 18,
                                                        letterSpacing: -0.5,
                                                        color: '#000000',
                                                    }}>
                                                    Daisy
                                                </Text>
                                                <Image
                                                    source={Icons.BiFemaleSign}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: '500',
                                                    lineHeight: 12,
                                                    letterSpacing: 0.5,
                                                    color: '#979797',
                                                    right: responsiveHeight(1),
                                                }}>
                                                3 years
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ top: responsiveHeight(4) }}>
                                        <Image
                                            source={Icons.BiSolidCheckCircle}
                                        />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: responsiveWidth(4),
                                    }}>
                                    <View
                                        style={{
                                            top: responsiveHeight(2),
                                            flexDirection: 'row',
                                            gap: responsiveWidth(2.5),
                                        }}>
                                        <Image
                                            source={images.goldenDog}
                                            style={{
                                                width: responsiveWidth(12),
                                                height: responsiveHeight(5.2),
                                                borderRadius:
                                                    responsiveWidth(30),
                                            }}
                                        />
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    gap: responsiveWidth(1),
                                                }}>
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: '500',
                                                        lineHeight: 18,
                                                        letterSpacing: -0.5,
                                                        color: '#000000',
                                                    }}>
                                                    Daisy
                                                </Text>
                                                <Image
                                                    source={Icons.BiMaleSign}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: '500',
                                                    lineHeight: 12,
                                                    letterSpacing: 0.5,
                                                    color: '#979797',
                                                    right: responsiveHeight(1),
                                                }}>
                                                3 years
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ top: responsiveHeight(4) }}>
                                        <Image
                                            source={Icons.BiSolidCheckCircle}
                                        />
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: responsiveWidth(4),
                                    }}>
                                    <View
                                        style={{
                                            top: responsiveHeight(2),
                                            flexDirection: 'row',
                                            gap: responsiveWidth(2.5),
                                        }}>
                                        <Image
                                            source={images.spaneilDog}
                                            style={{
                                                width: responsiveWidth(12),
                                                height: responsiveHeight(5.2),
                                                borderRadius:
                                                    responsiveWidth(30),
                                            }}
                                        />
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    gap: responsiveWidth(1),
                                                }}>
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        fontWeight: '500',
                                                        lineHeight: 18,
                                                        letterSpacing: -0.5,
                                                        color: '#000000',
                                                    }}>
                                                    Leo
                                                </Text>
                                                <Image
                                                    source={Icons.BiMaleSign}
                                                />
                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    fontWeight: '500',
                                                    lineHeight: 12,
                                                    letterSpacing: 0.5,
                                                    color: '#979797',
                                                    right: responsiveHeight(1),
                                                }}>
                                                3 years
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ top: responsiveHeight(4) }}>
                                        <Image source={Icons.CgRadioCheck} />
                                    </View>
                                </View>
                            </View>
                        )} */}









                        <View style={trainingmodalstyles.fixedButtonContainer}>
                            <TouchableOpacity
                                 onPress={()=>navigation.navigate("TrainingConfirmDetails")}
                                style={trainingmodalstyles.nextBtnContainer}>
                                <Text style={trainingmodalstyles.nextBtnText}>
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

export default TrainingModal;
