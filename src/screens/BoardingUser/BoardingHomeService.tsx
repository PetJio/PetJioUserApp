/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import images from '../../../assets/images';
import Icons from '../../../assets/icons';
import boardinghomeservicestyles from './boardinghomeservice.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { API_CONFIG, API_ENDPOINTS } from '../../config/api';
import { BoardingCardSkeleton } from '../../components/SkeletonLoader/SkeletonLoader';

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
  mode?: number;
};

const BoardingHomeService: React.FC<InSiteServiceProps> = ({
  navigation,
  mode,
}) => {
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
        console.log('📋 Boarding Service Items:', data.body);
        console.log('📋 First item facilityName:', data.body[0]?.facilityName);
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

  if (loading) {
    return (
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {[...Array(6)].map((_, index) => (
            <BoardingCardSkeleton key={index} />
          ))}
        </ScrollView>
      </View>
    );
  }

  return (
    <View
      style={[
        boardinghomeservicestyles.container,
        { height: undefined, flex: 1 },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 80,
          flexGrow: 1,
        }}
        style={{ flex: 1 }}
      >
        <View style={{ gap: 0 }}>
          {getHomeSerData.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate('BoardingDetails', {
                  boardDetails: item,
                  mode: mode,
                })
              }
            >
              <View
                style={{
                  backgroundColor: '#F8F9FA',
                  borderRadius: 16,
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: '#E5E7EB',
                  padding: 16,
                }}
              >
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <Image
                    source={
                      item?.profileImg
                        ? { uri: item.profileImg }
                        : images.walkinguserimage
                    }
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                      backgroundColor: '#F3F4F6',
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    {/* Facility Name */}

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: '700',
                          color: '#111827',
                          marginBottom: 4,
                          lineHeight: 22,
                        }}
                        numberOfLines={1}
                      >
                        {item?.facilityName || 'Facility Name Not Available'}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 3,
                        }}
                      >
                        <Image
                          source={Icons.StarIcon}
                          style={{ width: 12, height: 12 }}
                        />
                        <Text
                          style={{
                            fontSize: 11,
                            color: '#F59E0B',
                            fontWeight: '600',
                          }}
                        >
                          {item?.reviewAvg ? item.reviewAvg.toFixed(1) : '0.0'}{' '}
                          ({item?.reviewCount || 0})
                        </Text>
                      </View>
                    </View>

                    {/* Experience and Registration */}
                    <Text
                      style={{
                        fontSize: 11,
                        color: '#6B7280',
                        fontWeight: '500',
                        marginBottom: 6,
                      }}
                    >
                      {item?.experience
                        ? `${item.experience} years experience`
                        : 'Experience not specified'}{' '}
                      • Reg: {item?.regNo || 'Not provided'}
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 2
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <Image
                          source={Icons.RiPinDistanceLine}
                          style={{
                            width: 12,
                            height: 12,
                            tintColor: '#6B7280',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 11,
                            color: '#6B7280',
                            fontWeight: '500',
                          }}
                        >
                          {item?.city || 'Location not specified'}
                        </Text>
                      </View>
                    </View>

                    {/* Description */}
                    <Text
                      style={{
                        fontSize: 12,
                        color: '#4B5563',
                        lineHeight: 16,
                        marginBottom: 8,
                      }}
                      numberOfLines={2}
                    >
                      {item?.description || 'No description available'}
                    </Text>




                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default BoardingHomeService;
