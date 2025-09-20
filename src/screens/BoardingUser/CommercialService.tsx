/* eslint-disable react-native/no-inline-styles */
// import React from 'react';
// import { View, Text,Image } from 'react-native';
// import images from '../../../assets/images';
// import Icons from '../../../assets/icons';
// import commercialservicestyles from './commercialservice.styles';

// const CommercialService: React.FC = () => {
//     return (
//         <View style={commercialservicestyles.container}>
//            <View style={commercialservicestyles.containerthirdsubchild}>
//                 <View
//                     style={commercialservicestyles.shadow}>
//                     <Image source={images.UserImage} style={commercialservicestyles.userimage}/>
//                     <View style={commercialservicestyles.gap}>
//                         <View
//                             style={commercialservicestyles.userTextWidth}>
//                             <View
//                                 style={commercialservicestyles.userTextgap}>
//                                 <Text style={commercialservicestyles.textSize}> Souvic Das </Text>
//                                 <View style={commercialservicestyles.borderRadius}>
//                                     <Text style={commercialservicestyles.celebrityText}> Celebrity  </Text>
//                                 </View>
//                             </View>
//                             <View style={commercialservicestyles.ratingGap}>
//                                 <Image source={Icons.StarIcon} style={commercialservicestyles.ratingHeight} />
//                                 <Text style={commercialservicestyles.ratePointSize}> 4.8</Text>
//                             </View>
//                         </View>

//                         <View
//                             style={commercialservicestyles.setIconTextGap}>
//                             <Image source={Icons.Vector} style={commercialservicestyles.setImageIconPosition}/>
//                             <Text style={commercialservicestyles.setTextSize}> 3 years experience </Text>
//                         </View>

//                         <View style={commercialservicestyles.widthSpace}>
//                             <View
//                                 style={commercialservicestyles.iconAndTextGap}>
//                                 <Image
//                                     source={Icons.Location}
//                                     style={commercialservicestyles.setImageIconPosition}
//                                 />
//                                 <Text style={commercialservicestyles.setDigitSize}> 2.2km Away  </Text>
//                             </View>

//                             <View style={commercialservicestyles.iconTextSpace}>
//                                 <Image source={Icons.StarIcon} style={commercialservicestyles.setImageIconPosition}
//                                 />
//                                 <Text  style={commercialservicestyles.bold}>  7000 </Text>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default CommercialService;

import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import commercialservicestyles from './commercialservice.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { API_CONFIG, API_ENDPOINTS } from '../../config/api';
import { useNavigation } from '@react-navigation/native';

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

const BoardingHomeService: React.FC<InSiteServiceProps> = () => {
  const [getCommercialData, setGetCommercialData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigation = useNavigation<any>();

  useEffect(() => {
    fetchCommercialDetails();
  }, []);

  const fetchCommercialDetails = async () => {
    try {
      // setLoading(true);
      // setError('');

      // console.log('Fetching boarding details for providerId:', providerId);

      const response = await fetch(
        `${API_CONFIG.BASE_URL}${
          API_ENDPOINTS.SERVICES.SEARCH_BOARDINGS
        }?city=${''}&mode=10`,
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
      console.log('Commercial details API response: =====>', data);

      if (
        data &&
        data.body &&
        Array.isArray(data.body) &&
        data.body.length > 0
      ) {
        setGetCommercialData(data.body); // Get the first boarding from the list
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
    <View style={commercialservicestyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={commercialservicestyles.contentContainerStyle}
      >
        <View style={commercialservicestyles.viewGap}>
          {getCommercialData.map(item => (
            <TouchableOpacity
              key={item?.id}
              onPress={() =>
                navigation.navigate('BoardingDetails', { boardDetails: item })
              }
            >
              <View style={commercialservicestyles.containerthirdsubchild}>
                <View style={commercialservicestyles.shadow}>
                  <Image
                    source={images.petJiocrecheImage}
                    style={commercialservicestyles.userimage}
                  />
                  <View style={commercialservicestyles.gap}>
                    <View style={commercialservicestyles.userTextWidth}>
                      <View style={commercialservicestyles.userTextgap}>
                        <Text style={commercialservicestyles.textSize}>
                          {' '}
                          {item?.facilityName}{' '}
                        </Text>
                        <View style={commercialservicestyles.verified}>
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
                      <View style={commercialservicestyles.verified}>
                        <Image source={Icons.MdVerifiedUser} />
                        <Text style={commercialservicestyles.verifyText}>
                          Verified
                        </Text>
                      </View>
                    </View>

                    <View style={commercialservicestyles.viewFlex}>
                      <View style={commercialservicestyles.setIconTextGap}>
                        <Image
                          source={Icons.BiTimeFive}
                          style={commercialservicestyles.setImageIconPosition}
                        />
                        <Text style={commercialservicestyles.setTextSize}>
                          {' '}
                          {item?.checkinTime} am - {item?.checkoutTime} am{' '}
                        </Text>
                      </View>

                      <View style={commercialservicestyles.ratingGap}>
                        <Image
                          source={Icons.StarIcon}
                          style={commercialservicestyles.ratingHeight}
                        />
                        <Text style={commercialservicestyles.ratePointSize}>
                          {' '}
                          {item?.reviewCount}
                        </Text>
                      </View>
                    </View>

                    <View style={commercialservicestyles.widthSpace}>
                      <View style={commercialservicestyles.iconAndTextGap}>
                        <Image
                          source={Icons.RiPinDistanceLine}
                          style={commercialservicestyles.setImageIconPosition}
                        />
                        <Text style={commercialservicestyles.setDigitSize}>
                          {item?.regNo}
                        </Text>
                      </View>

                      <View style={commercialservicestyles.iconTextSpace}>
                        <Text style={commercialservicestyles.bold}>
                          {' '}
                          ₹ 200{' '}
                          <Text style={commercialservicestyles.weekText}>
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

          {/* <View style={commercialservicestyles.containerthirdsubchild}>
            <View style={commercialservicestyles.shadow}>
              <Image
                source={images.petJiocrecheImage}
                style={commercialservicestyles.userimage}
              />
              <View style={commercialservicestyles.gap}>
                <View style={commercialservicestyles.userTextWidth}>
                  <View style={commercialservicestyles.userTextgap}>
                    <Text style={commercialservicestyles.textSize}>
                      {' '}
                      PetJio Creche{' '}
                    </Text>
                    <View style={commercialservicestyles.verified}>
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
                  <View style={commercialservicestyles.verified}>
                    <Image source={Icons.MdVerifiedUser} />
                    <Text style={commercialservicestyles.verifyText}>
                      Verified
                    </Text>
                  </View>
                </View>

                <View style={commercialservicestyles.viewFlex}>
                  <View style={commercialservicestyles.setIconTextGap}>
                    <Image
                      source={Icons.BiTimeFive}
                      style={commercialservicestyles.setImageIconPosition}
                    />
                    <Text style={commercialservicestyles.setTextSize}>
                      {' '}
                      10:00 am - 09:00 pm{' '}
                    </Text>
                  </View>

                  <View style={commercialservicestyles.ratingGap}>
                    <Image
                      source={Icons.StarIcon}
                      style={commercialservicestyles.ratingHeight}
                    />
                    <Text style={commercialservicestyles.ratePointSize}>
                      {' '}
                      4.8
                    </Text>
                  </View>
                </View>

                <View style={commercialservicestyles.widthSpace}>
                  <View style={commercialservicestyles.iconAndTextGap}>
                    <Image
                      source={Icons.RiPinDistanceLine}
                      style={commercialservicestyles.setImageIconPosition}
                    />
                    <Text style={commercialservicestyles.setDigitSize}>
                      2.2km Away
                    </Text>
                  </View>

                  <View style={commercialservicestyles.iconTextSpace}>
                    <Text style={commercialservicestyles.bold}>
                      {' '}
                      ₹ 200{' '}
                      <Text style={commercialservicestyles.weekText}>
                        /week
                      </Text>{' '}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View> */}
          {/* <View style={commercialservicestyles.containerthirdsubchild}>
            <View style={commercialservicestyles.shadow}>
              <Image
                source={images.petJiocrecheImage}
                style={commercialservicestyles.userimage}
              />
              <View style={commercialservicestyles.gap}>
                <View style={commercialservicestyles.userTextWidth}>
                  <View style={commercialservicestyles.userTextgap}>
                    <Text style={commercialservicestyles.textSize}>
                      {' '}
                      PetJio Creche{' '}
                    </Text>
                    <View style={commercialservicestyles.verified}>
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
                  <View style={commercialservicestyles.verified}>
                    <Image source={Icons.MdVerifiedUser} />
                    <Text style={commercialservicestyles.verifyText}>
                      Verified
                    </Text>
                  </View>
                </View>

                <View style={commercialservicestyles.viewFlex}>
                  <View style={commercialservicestyles.setIconTextGap}>
                    <Image
                      source={Icons.BiTimeFive}
                      style={commercialservicestyles.setImageIconPosition}
                    />
                    <Text style={commercialservicestyles.setTextSize}>
                      {' '}
                      10:00 am - 09:00 pm{' '}
                    </Text>
                  </View>

                  <View style={commercialservicestyles.ratingGap}>
                    <Image
                      source={Icons.StarIcon}
                      style={commercialservicestyles.ratingHeight}
                    />
                    <Text style={commercialservicestyles.ratePointSize}>
                      {' '}
                      4.8
                    </Text>
                  </View>
                </View>

                <View style={commercialservicestyles.widthSpace}>
                  <View style={commercialservicestyles.iconAndTextGap}>
                    <Image
                      source={Icons.RiPinDistanceLine}
                      style={commercialservicestyles.setImageIconPosition}
                    />
                    <Text style={commercialservicestyles.setDigitSize}>
                      2.2km Away
                    </Text>
                  </View>

                  <View style={commercialservicestyles.iconTextSpace}>
                    <Text style={commercialservicestyles.bold}>
                      {' '}
                      ₹ 200{' '}
                      <Text style={commercialservicestyles.weekText}>
                        /week
                      </Text>{' '}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={commercialservicestyles.containerthirdsubchild}>
            <View style={commercialservicestyles.shadow}>
              <Image
                source={images.petJiocrecheImage}
                style={commercialservicestyles.userimage}
              />
              <View style={commercialservicestyles.gap}>
                <View style={commercialservicestyles.userTextWidth}>
                  <View style={commercialservicestyles.userTextgap}>
                    <Text style={commercialservicestyles.textSize}>
                      {' '}
                      PetJio Creche{' '}
                    </Text>
                    <View style={commercialservicestyles.verified}>
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
                  <View style={commercialservicestyles.verified}>
                    <Image source={Icons.MdVerifiedUser} />
                    <Text style={commercialservicestyles.verifyText}>
                      Verified
                    </Text>
                  </View>
                </View>

                <View style={commercialservicestyles.viewFlex}>
                  <View style={commercialservicestyles.setIconTextGap}>
                    <Image
                      source={Icons.BiTimeFive}
                      style={commercialservicestyles.setImageIconPosition}
                    />
                    <Text style={commercialservicestyles.setTextSize}>
                      {' '}
                      10:00 am - 09:00 pm{' '}
                    </Text>
                  </View>

                  <View style={commercialservicestyles.ratingGap}>
                    <Image
                      source={Icons.StarIcon}
                      style={commercialservicestyles.ratingHeight}
                    />
                    <Text style={commercialservicestyles.ratePointSize}>
                      {' '}
                      4.8
                    </Text>
                  </View>
                </View>

                <View style={commercialservicestyles.widthSpace}>
                  <View style={commercialservicestyles.iconAndTextGap}>
                    <Image
                      source={Icons.RiPinDistanceLine}
                      style={commercialservicestyles.setImageIconPosition}
                    />
                    <Text style={commercialservicestyles.setDigitSize}>
                      2.2km Away
                    </Text>
                  </View>

                  <View style={commercialservicestyles.iconTextSpace}>
                    <Text style={commercialservicestyles.bold}>
                      {' '}
                      ₹ 200{' '}
                      <Text style={commercialservicestyles.weekText}>
                        /week
                      </Text>{' '}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={commercialservicestyles.containerthirdsubchild}>
            <View style={commercialservicestyles.shadow}>
              <Image
                source={images.petJiocrecheImage}
                style={commercialservicestyles.userimage}
              />
              <View style={commercialservicestyles.gap}>
                <View style={commercialservicestyles.userTextWidth}>
                  <View style={commercialservicestyles.userTextgap}>
                    <Text style={commercialservicestyles.textSize}>
                      {' '}
                      PetJio Creche{' '}
                    </Text>
                  </View>
                  <View style={commercialservicestyles.ratingGap}>
                    <Image source={Icons.MdVerifiedUser} />
                    <Text style={commercialservicestyles.verifyText}>
                      Verified
                    </Text>
                  </View>
                </View>

                <View style={commercialservicestyles.viewFlex}>
                  <View style={commercialservicestyles.setIconTextGap}>
                    <Image
                      source={Icons.BiTimeFive}
                      style={commercialservicestyles.setImageIconPosition}
                    />
                    <Text style={commercialservicestyles.setTextSize}>
                      {' '}
                      10:00 am - 09:00 pm{' '}
                    </Text>
                  </View>

                  <View style={commercialservicestyles.ratingGap}>
                    <Image
                      source={Icons.StarIcon}
                      style={commercialservicestyles.ratingHeight}
                    />
                    <Text style={commercialservicestyles.ratePointSize}>
                      {' '}
                      4.8
                    </Text>
                  </View>
                </View>

                <View style={commercialservicestyles.widthSpace}>
                  <View style={commercialservicestyles.iconAndTextGap}>
                    <Image
                      source={Icons.RiPinDistanceLine}
                      style={commercialservicestyles.setImageIconPosition}
                    />
                    <Text style={commercialservicestyles.setDigitSize}>
                      2.2km Away
                    </Text>
                  </View>

                  <View style={commercialservicestyles.iconTextSpace}>
                    <Text style={commercialservicestyles.bold}>
                      {' '}
                      ₹ 200{' '}
                      <Text style={commercialservicestyles.weekText}>
                        /week
                      </Text>{' '}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={commercialservicestyles.containerthirdsubchild}>
            <View style={commercialservicestyles.shadow}>
              <Image
                source={images.petJiocrecheImage}
                style={commercialservicestyles.userimage}
              />
              <View style={commercialservicestyles.gap}>
                <View style={commercialservicestyles.userTextWidth}>
                  <View style={commercialservicestyles.userTextgap}>
                    <Text style={commercialservicestyles.textSize}>
                      {' '}
                      PetJio Creche{' '}
                    </Text>
                    <View style={commercialservicestyles.verified}>
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
                  <View style={commercialservicestyles.verified}>
                    <Image source={Icons.MdVerifiedUser} />
                    <Text style={commercialservicestyles.verifyText}>
                      Verified
                    </Text>
                  </View>
                </View>

                <View style={commercialservicestyles.viewFlex}>
                  <View style={commercialservicestyles.setIconTextGap}>
                    <Image
                      source={Icons.BiTimeFive}
                      style={commercialservicestyles.setImageIconPosition}
                    />
                    <Text style={commercialservicestyles.setTextSize}>
                      {' '}
                      10:00 am - 09:00 pm{' '}
                    </Text>
                  </View>

                  <View style={commercialservicestyles.ratingGap}>
                    <Image
                      source={Icons.StarIcon}
                      style={commercialservicestyles.ratingHeight}
                    />
                    <Text style={commercialservicestyles.ratePointSize}>
                      {' '}
                      4.8
                    </Text>
                  </View>
                </View>

                <View style={commercialservicestyles.widthSpace}>
                  <View style={commercialservicestyles.iconAndTextGap}>
                    <Image
                      source={Icons.RiPinDistanceLine}
                      style={commercialservicestyles.setImageIconPosition}
                    />
                    <Text style={commercialservicestyles.setDigitSize}>
                      2.2km Away
                    </Text>
                  </View>

                  <View style={commercialservicestyles.iconTextSpace}>
                    <Text style={commercialservicestyles.bold}>
                      {' '}
                      ₹ 200{' '}
                      <Text style={commercialservicestyles.weekText}>
                        /week
                      </Text>{' '}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={commercialservicestyles.containerthirdsubchild}>
            <View style={commercialservicestyles.shadow}>
              <Image
                source={images.petJiocrecheImage}
                style={commercialservicestyles.userimage}
              />
              <View style={commercialservicestyles.gap}>
                <View style={commercialservicestyles.userTextWidth}>
                  <View style={commercialservicestyles.userTextgap}>
                    <Text style={commercialservicestyles.textSize}>
                      {' '}
                      PetJio Creche
                    </Text>
                  </View>
                  <View style={commercialservicestyles.ratingGap}>
                    <Image source={Icons.MdVerifiedUser} />
                    <Text style={commercialservicestyles.verifyText}>
                      Verified
                    </Text>
                  </View>
                </View>

                <View style={commercialservicestyles.viewFlex}>
                  <View style={commercialservicestyles.setIconTextGap}>
                    <Image
                      source={Icons.BiTimeFive}
                      style={commercialservicestyles.setImageIconPosition}
                    />
                    <Text style={commercialservicestyles.setTextSize}>
                      {' '}
                      10:00 am - 09:00 pm{' '}
                    </Text>
                  </View>

                  <View style={commercialservicestyles.ratingGap}>
                    <Image
                      source={Icons.StarIcon}
                      style={commercialservicestyles.ratingHeight}
                    />
                    <Text style={commercialservicestyles.ratePointSize}>
                      {' '}
                      4.8
                    </Text>
                  </View>
                </View>

                <View style={commercialservicestyles.widthSpace}>
                  <View style={commercialservicestyles.iconAndTextGap}>
                    <Image
                      source={Icons.RiPinDistanceLine}
                      style={commercialservicestyles.setImageIconPosition}
                    />
                    <Text style={commercialservicestyles.setDigitSize}>
                      2.2km Away
                    </Text>
                  </View>

                  <View style={commercialservicestyles.iconTextSpace}>
                    <Text style={commercialservicestyles.bold}>
                      {' '}
                      ₹ 200{' '}
                      <Text style={commercialservicestyles.weekText}>
                        /week
                      </Text>{' '}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={commercialservicestyles.containerthirdsubchild}>
            <View style={commercialservicestyles.shadow}>
              <Image
                source={images.petJiocrecheImage}
                style={commercialservicestyles.userimage}
              />
              <View style={commercialservicestyles.gap}>
                <View style={commercialservicestyles.userTextWidth}>
                  <View style={commercialservicestyles.userTextgap}>
                    <Text style={commercialservicestyles.textSize}>
                      {' '}
                      PetJio Creche{' '}
                    </Text>
                    <View style={commercialservicestyles.verified}>
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
                  <View style={commercialservicestyles.verified}>
                    <Image source={Icons.MdVerifiedUser} />
                    <Text style={commercialservicestyles.verifyText}>
                      Verified
                    </Text>
                  </View>
                </View>

                <View style={commercialservicestyles.viewFlex}>
                  <View style={commercialservicestyles.setIconTextGap}>
                    <Image
                      source={Icons.BiTimeFive}
                      style={commercialservicestyles.setImageIconPosition}
                    />
                    <Text style={commercialservicestyles.setTextSize}>
                      {' '}
                      10:00 am - 09:00 pm{' '}
                    </Text>
                  </View>

                  <View style={commercialservicestyles.ratingGap}>
                    <Image
                      source={Icons.StarIcon}
                      style={commercialservicestyles.ratingHeight}
                    />
                    <Text style={commercialservicestyles.ratePointSize}>
                      {' '}
                      4.8
                    </Text>
                  </View>
                </View>

                <View style={commercialservicestyles.widthSpace}>
                  <View style={commercialservicestyles.iconAndTextGap}>
                    <Image
                      source={Icons.RiPinDistanceLine}
                      style={commercialservicestyles.setImageIconPosition}
                    />
                    <Text style={commercialservicestyles.setDigitSize}>
                      2.2km Away
                    </Text>
                  </View>

                  <View style={commercialservicestyles.iconTextSpace}>
                    <Text style={commercialservicestyles.bold}>
                      {' '}
                      ₹ 200{' '}
                      <Text style={commercialservicestyles.weekText}>
                        /week
                      </Text>{' '}
                    </Text>
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
