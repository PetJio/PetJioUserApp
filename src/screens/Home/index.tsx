import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
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
    const possibleTokenKeys = ['token', 'user_token', 'authToken', 'access_token', 'loginToken'];
    
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
          'Authorization': `Bearer ${token}`,
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
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📥 Pet Profiles Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Pet Profiles API Error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
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
        console.error('❌ Pet Profiles API returned non-200 status:', result.statusCode);
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
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
      
      {/* Sticky Header */}
      <View style={styles.stickyHeader}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.stickyHeaderTitle}>Hello, {userName}</Text>
          <Text style={styles.stickyHeaderSubtitle}>Welcome back to PetJio</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="event" size={24} color="#58B9D0" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <View style={styles.relative}>
              <MaterialIcons name="notifications" size={24} color="#58B9D0" />
              <View style={styles.positionofAlertIcon}>
                <View style={styles.alertDot} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingTop: responsiveHeight(0.5) }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.subcontainer}>

        {/* Dynamic Pets Section */}
        <View style={styles.petsContainer}>
          {loadingPets ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#58B9D0" />
              <Text style={styles.loadingText}>Loading your pets...</Text>
            </View>
          ) : petsError ? (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={48} color="#FF6B6B" />
              <Text style={styles.errorText}>{petsError}</Text>
              <TouchableOpacity 
                style={styles.retryButton} 
                onPress={fetchPets}
              >
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.petsDisplayContainer}>
              {/* Display actual pets */}
              {pets.slice(0, 2).map((pet, index) => (
                <TouchableOpacity 
                  key={pet.id} 
                  style={styles.petCard}
                  onPress={() => navigate('EditPet', { pet })}
                  activeOpacity={0.8}
                >
                  <View style={[styles.petImageContainer, { backgroundColor: index === 0 ? '#E8F5E8' : '#FFF0E6' }]}>
                    {pet.profileImg && pet.profileImg !== 'img' ? (
                      <Image 
                        source={{ uri: pet.profileImg }} 
                        style={styles.petImage}
                        defaultSource={images.BellaDog}
                      />
                    ) : (
                      <View style={[styles.petImage, styles.defaultPetImageContainer]}>
                        <MaterialIcons name="pets" size={32} color="#58B9D0" />
                      </View>
                    )}
                    {/* Pet status indicator */}
                    <View style={styles.petStatusIndicator}>
                      <View style={styles.petStatusDot} />
                    </View>
                  </View>
                  <Text style={styles.petName} numberOfLines={1}>{pet.petName}</Text>
                  <Text style={styles.petInfo} numberOfLines={1}>
                    {pet.category?.catName || 'Pet'} • {pet.gender?.name || 'Unknown'}
                  </Text>
                </TouchableOpacity>
              ))}
              
              {/* Show empty slots if less than 2 pets */}
              {Array.from({ length: Math.max(0, 2 - pets.length) }).map((_, index) => (
                <TouchableOpacity 
                  key={`empty-${index}`}
                  style={[styles.petCard, styles.emptyPetCard]}
                  onPress={() => navigate('AddPet')}
                  activeOpacity={0.7}
                >
                  <View style={[styles.petImageContainer, styles.emptyPetImageContainer]}>
                    <View style={[styles.petImage, styles.emptyPetSlot]}>
                      <MaterialIcons name="add" size={32} color="#CCCCCC" />
                    </View>
                  </View>
                  <Text style={styles.emptyPetText}>Add Pet</Text>
                  <Text style={styles.emptyPetSubtext}>Tap to add</Text>
                </TouchableOpacity>
              ))}
              
            </View>
          )}
        </View>
      </View>

      {/* Coming Soon - Full Appointments Section */}
      <View
        style={{
          top: responsiveHeight(5.5),
          paddingHorizontal: responsiveWidth(5),
          marginBottom: responsiveHeight(3),
        }}
      >
        <View
          style={{
            width: '100%',
            paddingBottom: responsiveHeight(8),
            paddingHorizontal: responsiveWidth(6),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'transparent',
            minHeight: responsiveHeight(25),
          }}
        >
          {/* Large Coming Soon Icon */}
          <MaterialIcons
            name="build-circle"
            size={80}
            color="#58B9D0"
            style={{ marginBottom: responsiveHeight(2) }}
          />

          {/* Main Coming Soon Text */}
          <Text
            style={{
              fontSize: 32,
              fontWeight: '800',
              color: '#2C5282',
              marginBottom: responsiveHeight(1.5),
              textAlign: 'center',
              letterSpacing: 0.5,
            }}
          >
            Coming Soon!
          </Text>

          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: '#58B9D0',
              marginBottom: responsiveHeight(2),
              textAlign: 'center',
            }}
          >
            Exciting Features on the Way
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: '#718096',
              textAlign: 'center',
              lineHeight: 24,
              paddingHorizontal: responsiveWidth(2),
              marginBottom: responsiveHeight(3),
            }}
          >
            We're working hard to bring you lots of amazing features! This isn't just about appointments - we're building a complete pet care ecosystem for you and your furry friends.
          </Text>

          {/* Feature Preview Pills */}
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 8,
              marginBottom: responsiveHeight(2),
            }}
          >
            <View
              style={{
                backgroundColor: '#E6F9FF',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#B3E5FF',
              }}
            >
              <Text
                style={{ fontSize: 12, color: '#2C5282', fontWeight: '500' }}
              >
                Easy Booking
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#E6F9FF',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#B3E5FF',
              }}
            >
              <Text
                style={{ fontSize: 12, color: '#2C5282', fontWeight: '500' }}
              >
                Reminders
              </Text>
            </View>
            <View
              style={{
                backgroundColor: '#E6F9FF',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: '#B3E5FF',
              }}
            >
              <Text
                style={{ fontSize: 12, color: '#2C5282', fontWeight: '500' }}
              >
                Track History
              </Text>
            </View>
          </View>

          {/* Animated Dots */}
          <View
            style={{
              flexDirection: 'row',
              gap: 12,
            }}
          >
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: '#58B9D0',
              }}
            />
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: '#A0D8EF',
              }}
            />
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: '#58B9D0',
              }}
            />
          </View>
        </View>
      </View>

      {/* <View>
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
      </View>

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
                    <Image
                      source={images.silentDog}
                      style={{
                        width: responsiveWidth(20),
                        height: responsiveHeight(9),
                        borderRadius: responsiveWidth(1),
                      }}
                      resizeMode="cover"
                    />

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
                    <Image
                      source={images.catwashImage}
                      style={{
                        width: responsiveWidth(20),
                        height: responsiveHeight(9),
                        borderRadius: responsiveWidth(1),
                      }}
                      resizeMode="cover"
                    />

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
                        Guide to Grooming your Cat
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
                    <Image
                      source={images.catwashImage}
                      style={{
                        width: responsiveWidth(20),
                        height: responsiveHeight(9),
                        borderRadius: responsiveWidth(1),
                      }}
                      resizeMode="cover"
                    />

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
                        Guide to Grooming your Cat
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
                    <Image
                      source={images.catwashImage}
                      style={{
                        width: responsiveWidth(20),
                        height: responsiveHeight(9),
                        borderRadius: responsiveWidth(1),
                      }}
                      resizeMode="cover"
                    />

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
                        Guide to Grooming your Cat
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
      </View> */}
      </ScrollView>
    </View>
  );
};

export default Home;
