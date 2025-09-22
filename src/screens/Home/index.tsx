import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
  ScrollView,
  RefreshControl,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import Icons from '../../../assets/icons';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import images from '../../../assets/images';
import { storageService } from '../../utils/storage';
import { API_CONFIG } from '../../config/api';
import { navigate } from '../../utils/navigationService';

interface PetCategory {
  id: number;
  catName: string;
}

interface PetSize {
  id: number;
  size: string;
}

interface PetGender {
  id: number;
  name: string;
}

interface PetProfile {
  id: number;
  petName: string;
  ageInYears: number | null;
  ageInMonths: number | null;
  category: PetCategory;
  size: PetSize;
  height: string | null;
  profileImg: string | null;
  gender: PetGender;
  weight: string | null;
  dailyFeedCount: number | null;
  treats: string | null;
  cookie: string | null;
}

interface PetApiResponse {
  statusCode: number;
  message: string;
  body: PetProfile[];
}

const Home: React.FC = () => {
  const flatListRef = useRef<FlatList>(null);
  const screenWidth = Dimensions.get('window').width;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [userName, setUserName] = useState<string>('User');
  const [pets, setPets] = useState<PetProfile[]>([]);
  const [loadingPets, setLoadingPets] = useState<boolean>(true);
  const [petsError, setPetsError] = useState<string | null>(null);

  // Memoize the scroll function
  const scrollToIndex = useCallback((index: number) => {
    try {
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
      });
      setActiveIndex(index);
    } catch (error) {
      console.log('Scroll error:', error);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        activeIndex === Carousel.length - 1 ? 0 : activeIndex + 1;
      scrollToIndex(nextIndex);
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex, scrollToIndex]);

  useEffect(() => {
    const loadUserName = async () => {
      try {
        const firstName = await storageService.getUserFirstName();
        setUserName(firstName);
      } catch (error) {
        console.error('Error loading user name:', error);
      }
    };

    loadUserName();
    fetchPets(); // Fetch pets when component mounts
  }, []);

  const getAuthToken = async () => {
    const possibleTokenKeys = [
      'token',
      'user_token',
      'authToken',
      'access_token',
      'loginToken',
    ];

    for (const key of possibleTokenKeys) {
      const value = await AsyncStorage.getItem(key);
      if (value) {
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      }
    }
    return null;
  };

  const getOwnerIdFromAPI = async () => {
    try {
      const token = await getAuthToken();
      if (!token) {
        console.error('No authentication token found');
        return null;
      }

      console.log('🚀 HOME PAGE DEBUG - Fetching owner data');
      const apiUrl = `${API_CONFIG.BASE_URL}/api/pet-owner/findByUserId`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ API Error Response:', errorText);
        return null;
      }

      const responseText = await response.text();
      console.log('📄 Raw Response Text for Home Page:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('✅ Parsed Response Data:', {
          statusCode: data.statusCode,
          message: data.message,
          hasBody: !!data.body,
          ownerId: data.body?.id,
        });
      } catch (parseError) {
        console.error('❌ JSON Parse Error:', parseError);
        return null;
      }

      if (data.statusCode === 200 && data.body?.id) {
        console.log('✅ Owner ID found:', data.body.id);
        return data.body.id;
      } else {
        console.error('❌ API returned non-200 status or no owner ID found');
        return null;
      }
    } catch (error) {
      console.error('🔥 Critical Error in getOwnerIdFromAPI:', error);
      return null;
    }
  };

  const fetchPets = async () => {
    setLoadingPets(true);
    setPetsError(null);

    try {
      console.log('🔍 HOME PAGE PETS DEBUG - Starting pets fetch');

      const token = await getAuthToken();
      if (!token) {
        console.error('❌ No authentication token found');
        setPetsError('Authentication token not found. Please login again.');
        return;
      }

      // Get the owner ID from API
      const ownerId = await getOwnerIdFromAPI();
      if (!ownerId) {
        console.error('❌ No owner ID found');
        setPetsError('Owner ID not found. Please try refreshing the page.');
        return;
      }

      console.log('🚀 FETCHING PETS - Starting pet profiles fetch');
      console.log('🔑 Using Owner ID:', ownerId);

      const apiUrl = `${API_CONFIG.BASE_URL}/api/pet-profile/owner/${ownerId}`;
      console.log('🌐 Pet Profiles Request URL:', apiUrl);

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 Pet Profiles Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Pet Profiles API Error:', errorText);
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`,
        );
      }

      const responseText = await response.text();
      console.log('📄 Pet Profiles Raw Response Text:', responseText);

      let result: PetApiResponse;
      try {
        result = JSON.parse(responseText);
        console.log('✅ Pet Profiles Parsed Response:', {
          statusCode: result.statusCode,
          message: result.message,
          petCount: result.body ? result.body.length : 0,
          petNames: result.body ? result.body.map(pet => pet.petName) : [],
        });
      } catch (parseError) {
        console.error('❌ Pet Profiles JSON Parse Error:', parseError);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }

      if (result.statusCode === 200) {
        console.log('✅ Pet Profiles Success - Data loaded:', result.body);
        setPets(result.body || []);
      } else {
        console.error(
          '❌ Pet Profiles API returned non-200 status:',
          result.statusCode,
        );
        throw new Error(result.message || 'Failed to fetch pet profiles');
      }
    } catch (error) {
      console.error('🔥 Critical Error in fetchPets:', error);
      setPetsError(`Failed to load pets: ${error.message}`);
    } finally {
      console.log('🏁 fetchPets completed');
      setLoadingPets(false);
    }
  };

  const onScrollFailed = (error: any) => {
    const offset = error.index * screenWidth;
    flatListRef.current?.scrollToOffset({ offset, animated: true });
    setActiveIndex(error.index);
  };

  const getItemLayout = (_data: any, index: number) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  const Carousel = [
    { id: '1', name: 'firstwalker', image: images.firstwalker },
    { id: '2', name: 'secondwalker', image: images.secondwalker },
    { id: '3', name: 'thirdwalker', image: images.thirdwalker },
    { id: '4', name: 'thirdwalker', image: images.thirdwalker },
  ];

  const renderItem = ({
    item,
  }: {
    item: { id: string; name: string; image: any };
  }) => {
    return (
      <View style={{ width: screenWidth }}>
        {/* <Image
                    source={item.image}
                    style={{
                        width: responsiveWidth(90),
                        height: responsiveHeight(30.8),
                        borderRadius: responsiveWidth(2),
                        marginLeft: responsiveWidth(4.8),
                    }}
                /> */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: responsiveWidth(90),
            height: responsiveHeight(18.5),
            borderRadius: responsiveWidth(1),
            backgroundColor: '#58B9D0',
            marginLeft: responsiveWidth(4.8),
          }}
        >
          <View>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: responsiveHeight(2.2),
                paddingHorizontal: responsiveWidth(4),
                gap: responsiveWidth(2),
              }}
            >
              <Image source={Icons.earthIcon} />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '500',
                  letterSpacing: 0,
                  color: '#FFFFFF',
                  lineHeight: 20,
                }}
              >
                Law updates
              </Text>
            </View>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: responsiveWidth(4),
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    lineHeight: 23,
                    letterSpacing: 0,
                    color: '#FFFFFF',
                  }}
                >
                  +
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    lineHeight: 23,
                    letterSpacing: 0,
                    color: '#FFFFFF',
                  }}
                >
                  35
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '500',
                    lineHeight: 23,
                    letterSpacing: 0,
                    color: '#FFFFFF',
                    left: responsiveWidth(2),
                  }}
                >
                  places
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '500',
                  lineHeight: 16,
                  letterSpacing: 0,
                  color: '#FFFFFF',
                  paddingHorizontal: responsiveWidth(4),
                }}
              >
                New vaccination departments for {'\n'} your pet{' '}
              </Text>
            </View>
          </View>
          <View>
            <Image source={Icons.IoMdPaw} />
          </View>
        </View>
      </View>
    );
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const renderDotIndicators = () => {
    return Carousel.map(
      (dot: { id: string; name: string; image: any }, index: number) => {
        if (activeIndex === index) {
          return <View key={index} style={styles.green_dot_Indicator} />;
        } else {
          return <View key={index} style={styles.white_dot_Indicator} />;
        }
      },
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" translucent={false} />
      <View style={styles.subcontainer}>
        {/* Header Section - Reference Project Style */}
        <View style={styles.subcontainertextwithIcon}>
          <Text style={styles.text}>Hello, {userName}</Text>
          <View style={styles.IconGap}>
            <Image source={Icons.BlackBiCalendar} />
            <View style={styles.relative}>
              <Image source={Icons.BiBell} />
              <View style={styles.positionofAlertIcon}>
                <Image source={Icons.alertEllipse} />
              </View>
            </View>
          </View>
        </View>

        {/* Pets Section - Reference Project Style */}
        <View style={styles.doctoranddogimagecontainer}>
          {loadingPets ? (
            <View style={[styles.loadingContainer, {
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              minHeight: 100
            }]}>
              <ActivityIndicator size="large" color="#58B9D0" />
              <Text style={{
                marginTop: 8,
                fontSize: 14,
                color: '#666',
                textAlign: 'center'
              }}>Loading your pets...</Text>
            </View>
          ) : petsError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Error loading pets</Text>
            </View>
          ) : (
            <>
              {/* First pet slot */}
              {/* {pets.length > 0 ? (
                <TouchableOpacity
                  onPress={() => navigate('EditPet', { pet: pets[0] })}
                  activeOpacity={0.8}
                >
                  <View>
                    <View style={[styles.doctorcontainer, {
                      backgroundColor: '#58B9D0',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }]}>
                      <MaterialIcons name="pets" size={24} color="#FFFFFF" />
                    </View>
                    <Text style={styles.dogname}>{pets[0].petName}</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => navigate('AddPet')}
                  activeOpacity={0.7}
                >
                  <View>
                    <View style={styles.doctorcontainer}>
                      <View
                        style={{
                          width: 60,
                          height: 60,
                          borderRadius: 30,
                          backgroundColor: '#58B9D0',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <MaterialIcons name="pets" size={24} color="#FFFFFF" />
                      </View>
                    </View>
                    <Text style={styles.dogname}>Add Pet</Text>
                  </View>
                </TouchableOpacity>
              )} */}

              {/* Second pet slot - Always show DaisyDog container */}
              {/* {pets.length > 1 && (
                <TouchableOpacity
                  onPress={() => navigate('EditPet', { pet: pets[1] })}
                  activeOpacity={0.8}
                >
                  <View>
                    <View style={[styles.dogcontainer, {
                      backgroundColor: '#58B9D0',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }]}>
                      <MaterialIcons name="pets" size={24} color="#FFFFFF" />
                    </View>
                    <Text style={styles.dogname}>{pets[1].petName}</Text>
                  </View>
                </TouchableOpacity>
              )} */}

              {/* Plus button only shows when no pets */}

              {pets?.map(item => (
                <TouchableOpacity
                  key={item?.id}
                  onPress={() => navigate('EditPet', { pet: item })}
                  activeOpacity={0.8}
                >
                  <View>
                    <View style={[styles.doctorcontainer, {
                      backgroundColor: '#58B9D0',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }]}>
                      <MaterialIcons name="pets" size={24} color="#FFFFFF" />
                    </View>
                    <Text style={styles.dogname}>{item.petName}</Text>
                  </View>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.pluscontainer}
                onPress={() => navigate('AddPet')}
                activeOpacity={0.8}
              >
                <Image source={Icons.BiPlus} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* Appointments Section - Reference Project Style */}
      <View>
        <View style={styles.secondcontainer}>
          <View style={styles.flex}>
            <Text style={styles.appointmentText}>Appointments</Text>
            <Text style={styles.showallText}>Show All</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          top: responsiveHeight(5.5),
          paddingHorizontal: responsiveWidth(5),
        }}
      >
        <View
          style={{
            width: responsiveWidth(90),
            borderRadius: responsiveWidth(2),
            backgroundColor: '#F0FCFF',
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              width: responsiveWidth(0.9),
              backgroundColor: '#58B9D0',
              borderTopLeftRadius: responsiveWidth(8),
              borderBottomLeftRadius: responsiveWidth(8),
            }}
          ></View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: responsiveHeight(0.9),
                paddingHorizontal: responsiveWidth(3.2),
                width: responsiveWidth(90),
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    lineHeight: 17,
                    color: '#3C3C3C',
                  }}
                >
                  Dr. Samar Halder
                </Text>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '400',
                    lineHeight: 14,
                    letterSpacing: 0,
                    color: '#858585',
                  }}
                >
                  Consultation
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: -10 }}>
                {pets.length > 0 ? (
                  pets.slice(0, 2).map((pet, index) => (
                    <View
                      key={pet.id}
                      style={index === 0 ? {} : { marginLeft: -10 }}
                    >
                      <View
                        style={{
                          width: 35,
                          height: 35,
                          borderRadius: 17.5,
                          borderWidth: 2,
                          borderColor: '#fff',
                          backgroundColor: '#58B9D0',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <MaterialIcons name="pets" size={16} color="#FFFFFF" />
                      </View>
                    </View>
                  ))
                ) : (
                  <>
                    <View
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: 17.5,
                        borderWidth: 2,
                        borderColor: '#fff',
                        backgroundColor: '#58B9D0',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <MaterialIcons name="pets" size={16} color="#FFFFFF" />
                    </View>
                    <View
                      style={{
                        width: 35,
                        height: 35,
                        borderRadius: 17.5,
                        backgroundColor: '#58B9D0',
                        overflow: 'hidden',
                        marginLeft: -10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <MaterialIcons name="pets" size={16} color="#FFFFFF" />
                    </View>
                  </>
                )}
              </View>
            </View>
            <View
              style={{
                width: responsiveWidth(83),
                borderBottomWidth: responsiveWidth(0.2),
                borderColor: '#E8E8E8',
                left: responsiveWidth(2.5),
              }}
            />
            <View
              style={{
                paddingVertical: responsiveHeight(1),
                paddingHorizontal: responsiveWidth(3),
                gap: responsiveWidth(2.5),
              }}
            >
              <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
                <Image source={Icons.BiMap} />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '400',
                    lineHeight: 14,
                    color: '#858585',
                  }}
                >
                  32/E-1 M . L . B, Road, Bally, Howrah
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
                <Image source={Icons.BiCalendar} />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '400',
                    lineHeight: 14,
                    color: '#858585',
                  }}
                >
                  Wednesday, October 25, 2024
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: responsiveWidth(2) }}>
                <Image source={Icons.BiTimeFive} />
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '400',
                    lineHeight: 14,
                    color: '#858585',
                  }}
                >
                  2:00 PM
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* News Section - Reference Project Style */}
      <View>
        <View style={styles.fourthcontainer}>
          <View style={styles.flex}>
            <Text style={styles.appointmentText}>News</Text>
            <Text style={styles.showallText}>Show All</Text>
          </View>
        </View>
      </View>

      <View style={{ top: responsiveHeight(9) }}>
        <FlatList
          data={Carousel}
          ref={flatListRef}
          getItemLayout={getItemLayout}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          bounces={false}
          onScrollToIndexFailed={onScrollFailed}
        />

        <View style={styles.bottomparentview}>
          <View style={styles.dots_Indicator}>
            <TouchableOpacity>
              <Image
                source={Icons.IoIosArrowBack}
                style={{ bottom: responsiveWidth(0.9) }}
              />
            </TouchableOpacity>
            {renderDotIndicators()}
            <Image
              source={Icons.IoIosArrowForwardWhite}
              style={{ bottom: responsiveWidth(0.9) }}
            />
          </View>
        </View>
      </View>

      {/* Blogs Section - Reference Project Style */}
      <View>
        <View style={styles.fivethcontainer}>
          <View style={styles.flex}>
            <Text style={styles.appointmentText}>Blogs</Text>
            <Text style={styles.showallText}>Show All</Text>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.paddingBottom}
          >
            <View style={styles.GapView}>
              <View style={{ paddingHorizontal: responsiveWidth(3.5) }}>
                <View
                  style={{
                    width: responsiveWidth(90),
                    borderRadius: responsiveWidth(2),
                    borderWidth: responsiveWidth(0.3),
                    borderColor: '#EBEBEB',
                    padding: responsiveWidth(2),
                  }}
                >
                  <View
                    style={{ flexDirection: 'row', gap: responsiveWidth(2) }}
                  >
                    <View
                      style={{
                        width: responsiveWidth(20),
                        height: responsiveHeight(9),
                        borderRadius: responsiveWidth(1),
                        backgroundColor: '#58B9D0',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <MaterialIcons name="pets" size={32} color="#FFFFFF" />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: '600',
                          lineHeight: 14,
                          letterSpacing: 0,
                          color: '#4B4B4B',
                        }}
                        numberOfLines={1}
                      >
                        How to Calm Dog Anxiety
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginVertical: responsiveHeight(0.5),
                        }}
                      >
                        <Image
                          source={Icons.ClockCircle}
                          style={{
                            width: responsiveWidth(2.5),
                            height: responsiveHeight(1.5),
                            marginRight: responsiveWidth(1),
                          }}
                          resizeMode="contain"
                        />
                        <Text
                          style={{
                            fontSize: 9,
                            fontWeight: '500',
                            lineHeight: 10,
                            letterSpacing: 0,
                            color: '#7B7B7B',
                          }}
                        >
                          10th October 2024
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 10,
                          lineHeight: 13,
                          fontWeight: '400',
                          letterSpacing: 0,
                          color: '#848484',
                        }}
                        numberOfLines={3}
                      >
                        All of us have things that scare us, but for our
                        four-legged friends, loud noises, new situations and
                        changes in the{' '}
                        <Text style={{ color: '#4494A8' }}>Read More</Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default Home;
