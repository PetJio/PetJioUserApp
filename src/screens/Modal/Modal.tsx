import { useState } from 'react';
import { View,Text,Image, FlatList,TouchableOpacity,Modal,TextInput} from 'react-native';
import { responsiveWidth,responsiveHeight} from 'react-native-responsive-dimensions';
import modalstyles from './modal.styles';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import { useNavigation } from '@react-navigation/native';


type ModalComponentProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
};

const ModalComponent: React.FC<Omit<ModalComponentProps, 'navigation'>> = ({modalVisible,setModalVisible}) => {
    const navigation = useNavigation();
    const [activeTab, setActiveTab] = useState<string>('NormalWalking');

    const handleTabPress = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <View style={modalstyles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={modalstyles.subcontainer}>
                   {activeTab === "NormalWalking"? <View style={modalstyles.setmodalRadious}>
                        <View
                            style={
                                modalstyles.paddingOfNormalWalkingGroupWalking
                            }>
                            <TouchableOpacity
                                onPress={() => handleTabPress('NormalWalking')}>
                                <View
                                    style={[
                                        activeTab === 'NormalWalking' &&
                                            modalstyles.menuBottomBoarder,
                                    ]}>
                                    <Text
                                        style={[
                                            modalstyles.unselectText,
                                            activeTab === 'NormalWalking' &&
                                                modalstyles.selectText,
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
                                            modalstyles.menuBottomBoarder,
                                    ]}>
                                    <Text
                                        style={[
                                            modalstyles.unselectText,
                                            activeTab === 'GroupWalking' &&
                                                modalstyles.selectText,
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
                        )}




                        

                        <View style={modalstyles.fixedButtonContainer}>
                            <TouchableOpacity
                                 onPress={()=>navigation.navigate("ConfirmDetails")}
                                // onPress={() => setModalVisible(false)}
                                style={modalstyles.nextBtnContainer}>
                                <Text style={modalstyles.nextBtnText}>
                                    Confirm
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>:<View style={{
        backgroundColor: 'white',
        // bottom:-15,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: responsiveHeight(52),
    }}>

        <View style={modalstyles.paddingOfNormalWalkingGroupWalking}>
            <TouchableOpacity onPress={() => handleTabPress('NormalWalking')}>
                <View style={[activeTab === 'NormalWalking' && modalstyles.menuBottomBoarder,]}>
                  <Text style={[ modalstyles.unselectText, activeTab === 'NormalWalking' && modalstyles.selectText, ]}>
                                        Normal Walking
                                    </Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleTabPress('GroupWalking')}>
                                <View
                                    style={[
                                        activeTab === 'GroupWalking' &&
                                            modalstyles.menuBottomBoarder,
                                    ]}>
                                    <Text
                                        style={[
                                            modalstyles.unselectText,
                                            activeTab === 'GroupWalking' &&
                                                modalstyles.selectText,
                                        ]}>
                                        Group Walking
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={modalstyles.searchparent}>
                <View style={modalstyles.searchchild}>
                    <Image source={Icons.search} />
                    <TextInput
                        placeholder="Search for services"
                        placeholderTextColor="#999"
                        style={modalstyles.textInput}
                    />
                </View>
                <TouchableOpacity style={modalstyles.filterbtn}>
                   <Image source={Icons.Filter} style={modalstyles.filterIcon}/>
                </TouchableOpacity>
            </View>


          
           <View style={modalstyles.searchparent}>


           



                          {activeTab === 'GroupWalking' && (
                            <View style={{ gap: responsiveWidth(2.5) }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingHorizontal: responsiveWidth(4),
                                        width:responsiveWidth(90)
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
                        )}







           </View>

      
           <View style={modalstyles.fixedButtonContainer}>

               <View style={{flexDirection:'row',gap:responsiveWidth(2.5)}}>
                 <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(28),height:responsiveHeight(6.3),borderRadius:responsiveWidth(1.5),borderWidth:responsiveWidth(0.30),borderColor:'#58B9D0',}}>
                        <Text style={{fontSize:12,fontWeight:'600',lineHeight:18,letterSpacing:0,color:'#58B9D0'}}>Get Code</Text>
                 </View>

                  <TouchableOpacity
                    onPress={()=>navigation.navigate("ConfirmDetails")}
                  >

                    <View style={{justifyContent:'center',alignItems:'center', width:responsiveWidth(60),height:responsiveHeight(6.3),borderRadius:responsiveWidth(1.5),borderWidth:responsiveWidth(0.30), borderColor:'#58B9D0', backgroundColor:'#58B9D0',}}>
                        <Text style={{fontSize:12,fontWeight:'600',lineHeight:18,letterSpacing:0,color:'#FFFFFF'}}>Confirm</Text>
                   </View>


                  </TouchableOpacity>

                  

            </View>


           </View>







           
        
               





























































































        
        </View>}
                </View>
            </Modal>
        </View>
    );
};

export default ModalComponent;
