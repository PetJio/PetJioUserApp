/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import boardinghomeservicestyles from './boardinghomeservice.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { API_CONFIG, API_ENDPOINTS } from '../../config/api';

// Define stack params
type RootStackParamList = {
  UserDetails: undefined;
  UserAbout: undefined;
  TrainerAbout: undefined;
  TrainingDetails: undefined;
  BoardingDetails: undefined;
};

// Define prop types
type InSiteServiceProps = {
  navigation: StackNavigationProp<RootStackParamList, 'BoardingDetails'>;
};

const BoardingHomeService: React.FC<InSiteServiceProps> = ({ navigation }) => {
  const [getHomeSerData, setGetHomeSerData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchHomeSerDetails();
  }, []);

  const fetchHomeSerDetails = async () => {
    try {
      setLoading(true);
      setError('');

      // console.log('Fetching boarding details for providerId:', providerId);

      const response = await fetch(
        `${API_CONFIG.BASE_URL}${
          API_ENDPOINTS.SERVICES.SEARCH_BOARDINGS
        }?city=${''}&mode=9`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Home Service details API response: =====>', data);

      if (
        data &&
        data.body &&
        Array.isArray(data.body) &&
        data.body.length > 0
      ) {
        setGetHomeSerData(data.body); // Get the first boarding from the list
      } else {
        // If no API data, use default values to match reference UI
        // setServiceDetails({
        //     user: { firstName: 'Kiara', lastName: 'Das' },
        //     reviewAvg: 4.8,
        //     profileImg: null,
        //     description: 'Hi Pet Parents !!!! I am a proficient grooming partner with pgroomy have an experience of 7+ years, can work efficiently with both dogs and cats. Also experienced with different breeds of pets in terms of styling and grooming.',
        //     experience: 7,
        //     facilityName: 'Kiara\'s Boarding'
        // });
      }
    } catch (error: any) {
      console.error('Error fetching boarding details:', error);
      setError(error.message || 'Failed to fetch boarding details');

      // Set default data to match reference even on error
      // setServiceDetails({
      //     user: { firstName: 'Kiara', lastName: 'Das' },
      //     reviewAvg: 4.8,
      //     profileImg: null,
      //     description: 'Hi Pet Parents !!!! I am a proficient grooming partner with pgroomy have an experience of 7+ years, can work efficiently with both dogs and cats. Also experienced with different breeds of pets in terms of styling and grooming.',
      //     experience: 7,
      //     facilityName: 'Kiara\'s Boarding'
      // });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={boardinghomeservicestyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={boardinghomeservicestyles.contentContainerStyle}
      >
        <View style={boardinghomeservicestyles.viewGap}>
          {getHomeSerData.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.navigate('BoardingDetails', { boardDetails: item })}
            >
              <View style={boardinghomeservicestyles.containerthirdsubchild}>
                <View style={boardinghomeservicestyles.shadow}>
                  <Image
                    source={images.walkinguserimage}
                    style={boardinghomeservicestyles.userimage}
                  />
                  <View style={boardinghomeservicestyles.gap}>
                    <View style={boardinghomeservicestyles.userTextWidth}>
                      <View style={boardinghomeservicestyles.userTextgap}>
                        <Text style={boardinghomeservicestyles.textSize}>
                          {' '}
                          {item?.facilityName}{' '}
                        </Text>
                        <View style={boardinghomeservicestyles.verified}>
                          <Image source={Icons.Ellipse} />
                          <Text
                            style={{
                              fontSize: 9,
                              fontWeight: '600',
                              lineHeight: 10,
                              letterSpacing: 0,
                              color: '#299F4D',
                            }}
                          >
                            Open
                          </Text>
                        </View>
                      </View>
                      <View style={boardinghomeservicestyles.verified}>
                        <Image source={Icons.MdVerifiedUser} />
                        <Text style={boardinghomeservicestyles.verifyText}>
                          Verified
                        </Text>
                      </View>
                    </View>

                    <View style={boardinghomeservicestyles.viewFlex}>
                      <View style={boardinghomeservicestyles.setIconTextGap}>
                        <Image
                          source={Icons.BiTimeFive}
                          style={boardinghomeservicestyles.setImageIconPosition}
                        />
                        <Text style={boardinghomeservicestyles.setTextSize}>
                          {' '}
                          {item?.checkinTime} am - {item?.checkoutTime} am{' '}
                        </Text>
                      </View>

                      <View style={boardinghomeservicestyles.ratingGap}>
                        <Image
                          source={Icons.StarIcon}
                          style={boardinghomeservicestyles.ratingHeight}
                        />
                        <Text style={boardinghomeservicestyles.ratePointSize}>
                          {' '}
                           {item?.reviewCount}
                        </Text>
                      </View>
                    </View>

                    <View style={boardinghomeservicestyles.widthSpace}>
                      <View style={boardinghomeservicestyles.iconAndTextGap}>
                        <Image
                          source={Icons.RiPinDistanceLine}
                          style={boardinghomeservicestyles.setImageIconPosition}
                        />
                        <Text style={boardinghomeservicestyles.setDigitSize}>
                           {item?.regNo}
                        </Text>
                      </View>

                      <View style={boardinghomeservicestyles.iconTextSpace}>
                        <Text style={boardinghomeservicestyles.bold}>
                          {' '}
                          ₹ 200{' '}
                          <Text style={boardinghomeservicestyles.weekText}>
                            /week
                          </Text>{' '}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* <View style={boardinghomeservicestyles.containerthirdsubchild}>
                    <View
                        style={boardinghomeservicestyles.shadow}>
                        <Image source={images.walkinguserimage} style={boardinghomeservicestyles.userimage}/>
                        <View style={boardinghomeservicestyles.gap}>
                            <View
                                style={boardinghomeservicestyles.userTextWidth}>
                                <View
                                    style={boardinghomeservicestyles.userTextgap}>
                                    <Text style={boardinghomeservicestyles.textSize}> Kiara Das </Text>
                                     <View style={boardinghomeservicestyles.verified}>
                                         <Image source={Icons.Ellipse}/>
                                    <Text style={{fontSize:9,fontWeight:'600',lineHeight:10,letterSpacing:0,color:'#299F4D'}}>Open</Text>
                                     </View>
                                </View>
                                <View style={boardinghomeservicestyles.verified}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={boardinghomeservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={boardinghomeservicestyles.viewFlex}>

                            <View
                                style={boardinghomeservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={boardinghomeservicestyles.setImageIconPosition}/>
                                <Text style={boardinghomeservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={boardinghomeservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={boardinghomeservicestyles.ratingHeight} />
                                    <Text style={boardinghomeservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={boardinghomeservicestyles.widthSpace}>
                                <View
                                    style={boardinghomeservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={boardinghomeservicestyles.setImageIconPosition}
                                    />
                                    <Text style={boardinghomeservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={boardinghomeservicestyles.iconTextSpace}>
                                    <Text  style={boardinghomeservicestyles.bold}> ₹ 200 <Text style={boardinghomeservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View> */}

          {/* <View style={boardinghomeservicestyles.containerthirdsubchild}>
                    <View
                        style={boardinghomeservicestyles.shadow}>
                        <Image source={images.walkinguserimage} style={boardinghomeservicestyles.userimage}/>
                        <View style={boardinghomeservicestyles.gap}>
                            <View
                                style={boardinghomeservicestyles.userTextWidth}>
                                <View
                                    style={boardinghomeservicestyles.userTextgap}>
                                    <Text style={boardinghomeservicestyles.textSize}> Kiara Das </Text>
                                     <View style={boardinghomeservicestyles.verified}>
                                         <Image source={Icons.Ellipse}/>
                                    <Text style={{fontSize:9,fontWeight:'600',lineHeight:10,letterSpacing:0,color:'#299F4D'}}>Open</Text>
                                     </View>
                                </View>
                                <View style={boardinghomeservicestyles.verified}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={boardinghomeservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={boardinghomeservicestyles.viewFlex}>

                            <View
                                style={boardinghomeservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={boardinghomeservicestyles.setImageIconPosition}/>
                                <Text style={boardinghomeservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={boardinghomeservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={boardinghomeservicestyles.ratingHeight} />
                                    <Text style={boardinghomeservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={boardinghomeservicestyles.widthSpace}>
                                <View
                                    style={boardinghomeservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={boardinghomeservicestyles.setImageIconPosition}
                                    />
                                    <Text style={boardinghomeservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={boardinghomeservicestyles.iconTextSpace}>
                                    <Text  style={boardinghomeservicestyles.bold}> ₹ 200 <Text style={boardinghomeservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                 <View style={boardinghomeservicestyles.containerthirdsubchild}>
                    <View
                        style={boardinghomeservicestyles.shadow}>
                        <Image source={images.walkinguserimage} style={boardinghomeservicestyles.userimage}/>
                        <View style={boardinghomeservicestyles.gap}>
                            <View
                                style={boardinghomeservicestyles.userTextWidth}>
                                <View
                                    style={boardinghomeservicestyles.userTextgap}>
                                    <Text style={boardinghomeservicestyles.textSize}> Kiara Das </Text>
                                     <View style={boardinghomeservicestyles.verified}>
                                         <Image source={Icons.Ellipse}/>
                                    <Text style={{fontSize:9,fontWeight:'600',lineHeight:10,letterSpacing:0,color:'#299F4D'}}>Open</Text>
                                     </View>
                                </View>
                                <View style={boardinghomeservicestyles.verified}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={boardinghomeservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={boardinghomeservicestyles.viewFlex}>

                            <View
                                style={boardinghomeservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={boardinghomeservicestyles.setImageIconPosition}/>
                                <Text style={boardinghomeservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={boardinghomeservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={boardinghomeservicestyles.ratingHeight} />
                                    <Text style={boardinghomeservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={boardinghomeservicestyles.widthSpace}>
                                <View
                                    style={boardinghomeservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={boardinghomeservicestyles.setImageIconPosition}
                                    />
                                    <Text style={boardinghomeservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={boardinghomeservicestyles.iconTextSpace}>
                                    <Text  style={boardinghomeservicestyles.bold}> ₹ 200 <Text style={boardinghomeservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={boardinghomeservicestyles.containerthirdsubchild}>
                    <View
                        style={boardinghomeservicestyles.shadow}>
                        <Image source={images.walkinguserimage} style={boardinghomeservicestyles.userimage}/>
                        <View style={boardinghomeservicestyles.gap}>
                            <View
                                style={boardinghomeservicestyles.userTextWidth}>
                                <View
                                    style={boardinghomeservicestyles.userTextgap}>
                                    <Text style={boardinghomeservicestyles.textSize}> Kiara Das </Text>
                                </View>
                                <View style={boardinghomeservicestyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={boardinghomeservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={boardinghomeservicestyles.viewFlex}>

                            <View
                                style={boardinghomeservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={boardinghomeservicestyles.setImageIconPosition}/>
                                <Text style={boardinghomeservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={boardinghomeservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={boardinghomeservicestyles.ratingHeight} />
                                    <Text style={boardinghomeservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={boardinghomeservicestyles.widthSpace}>
                                <View
                                    style={boardinghomeservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={boardinghomeservicestyles.setImageIconPosition}
                                    />
                                    <Text style={boardinghomeservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={boardinghomeservicestyles.iconTextSpace}>
                                    <Text  style={boardinghomeservicestyles.bold}> ₹ 200 <Text style={boardinghomeservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                 <View style={boardinghomeservicestyles.containerthirdsubchild}>
                    <View
                        style={boardinghomeservicestyles.shadow}>
                        <Image source={images.walkinguserimage} style={boardinghomeservicestyles.userimage}/>
                        <View style={boardinghomeservicestyles.gap}>
                            <View
                                style={boardinghomeservicestyles.userTextWidth}>
                                <View
                                    style={boardinghomeservicestyles.userTextgap}>
                                    <Text style={boardinghomeservicestyles.textSize}> Kiara Das</Text>
                                     <View style={boardinghomeservicestyles.verified}>
                                         <Image source={Icons.Ellipse}/>
                                    <Text style={{fontSize:9,fontWeight:'600',lineHeight:10,letterSpacing:0,color:'#299F4D'}}>Open</Text>
                                     </View>
                                </View>
                                <View style={boardinghomeservicestyles.verified}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={boardinghomeservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={boardinghomeservicestyles.viewFlex}>

                            <View
                                style={boardinghomeservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={boardinghomeservicestyles.setImageIconPosition}/>
                                <Text style={boardinghomeservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={boardinghomeservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={boardinghomeservicestyles.ratingHeight} />
                                    <Text style={boardinghomeservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={boardinghomeservicestyles.widthSpace}>
                                <View
                                    style={boardinghomeservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={boardinghomeservicestyles.setImageIconPosition}
                                    />
                                    <Text style={boardinghomeservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={boardinghomeservicestyles.iconTextSpace}>
                                    <Text  style={boardinghomeservicestyles.bold}> ₹ 200 <Text style={boardinghomeservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                 <View style={boardinghomeservicestyles.containerthirdsubchild}>
                    <View
                        style={boardinghomeservicestyles.shadow}>
                        <Image source={images.walkinguserimage} style={boardinghomeservicestyles.userimage}/>
                        <View style={boardinghomeservicestyles.gap}>
                            <View
                                style={boardinghomeservicestyles.userTextWidth}>
                                <View
                                    style={boardinghomeservicestyles.userTextgap}>
                                    <Text style={boardinghomeservicestyles.textSize}> Kiara Das </Text>
                                </View>
                                <View style={boardinghomeservicestyles.ratingGap}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={boardinghomeservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={boardinghomeservicestyles.viewFlex}>

                            <View
                                style={boardinghomeservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={boardinghomeservicestyles.setImageIconPosition}/>
                                <Text style={boardinghomeservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={boardinghomeservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={boardinghomeservicestyles.ratingHeight} />
                                    <Text style={boardinghomeservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={boardinghomeservicestyles.widthSpace}>
                                <View
                                    style={boardinghomeservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={boardinghomeservicestyles.setImageIconPosition}
                                    />
                                    <Text style={boardinghomeservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={boardinghomeservicestyles.iconTextSpace}>
                                    <Text  style={boardinghomeservicestyles.bold}> ₹ 200 <Text style={boardinghomeservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={boardinghomeservicestyles.containerthirdsubchild}>
                    <View
                        style={boardinghomeservicestyles.shadow}>
                        <Image source={images.walkinguserimage} style={boardinghomeservicestyles.userimage}/>
                        <View style={boardinghomeservicestyles.gap}>
                            <View
                                style={boardinghomeservicestyles.userTextWidth}>
                                <View
                                    style={boardinghomeservicestyles.userTextgap}>
                                    <Text style={boardinghomeservicestyles.textSize}> Kiara Das </Text>
                                     <View style={boardinghomeservicestyles.verified}>
                                         <Image source={Icons.Ellipse}/>
                                    <Text style={{fontSize:9,fontWeight:'600',lineHeight:10,letterSpacing:0,color:'#299F4D'}}>Open</Text>
                                     </View>
                                </View>
                                <View style={boardinghomeservicestyles.verified}>
                                    <Image source={Icons.MdVerifiedUser}  />
                                    <Text style={boardinghomeservicestyles.verifyText}>Verified</Text>
                                </View>
                            </View>

                            <View style={boardinghomeservicestyles.viewFlex}>

                            <View
                                style={boardinghomeservicestyles.setIconTextGap}>
                                <Image source={Icons.BiTimeFive} style={boardinghomeservicestyles.setImageIconPosition}/>
                                <Text style={boardinghomeservicestyles.setTextSize}> 10:00 am - 09:00 pm </Text>
                            </View>

                            <View style={boardinghomeservicestyles.ratingGap}>
                                    <Image source={Icons.StarIcon} style={boardinghomeservicestyles.ratingHeight} />
                                    <Text style={boardinghomeservicestyles.ratePointSize}> 4.8</Text>
                                </View>

                            </View>

                            <View style={boardinghomeservicestyles.widthSpace}>
                                <View
                                    style={boardinghomeservicestyles.iconAndTextGap}>
                                    <Image
                                        source={Icons.RiPinDistanceLine}
                                        style={boardinghomeservicestyles.setImageIconPosition}
                                    />
                                    <Text style={boardinghomeservicestyles.setDigitSize}>2.2km Away</Text>
                                </View>

                                <View style={boardinghomeservicestyles.iconTextSpace}>
                                    <Text  style={boardinghomeservicestyles.bold}> ₹ 200 <Text style={boardinghomeservicestyles.weekText}>/week</Text> </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default BoardingHomeService;
