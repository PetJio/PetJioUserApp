import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  ScrollView,
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
import { storageService } from '../../utils/storage';
import { API_CONFIG } from '../../config/api';
import { navigate } from '../../utils/navigationService';
import { useFocusEffect } from '@react-navigation/native';
import { PetSkeleton } from '../../components/SkeletonLoader/SkeletonLoader';

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
  const [userName, setUserName] = useState<string>('User');
  const [pets, setPets] = useState<PetProfile[]>([]);
  const [loadingPets, setLoadingPets] = useState<boolean>(true);
  const [petsError, setPetsError] = useState<string | null>(null);

  // Force status bar to be white whenever Home screen is focused
  useFocusEffect(
    React.useCallback(() => {
      if (Platform.OS === 'android') {
        // Force completely opaque white status bar
        StatusBar.setBackgroundColor('#FFFFFF', false);
        StatusBar.setBarStyle('dark-content', false);
        StatusBar.setTranslucent(false);
        StatusBar.setHidden(false);

        // Try setting again with animation after a small delay
        setTimeout(() => {
          StatusBar.setBackgroundColor('#FFFFFF', true);
          StatusBar.setBarStyle('dark-content', true);
        }, 100);
      }
    }, []),
  );

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

  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
        animated={false}
        hidden={false}
      />

      {/* Clean Sticky Header */}
      <View
        style={{
          backgroundColor: '#FFFFFF',
          paddingTop: responsiveHeight(1.5),
          paddingBottom: responsiveHeight(2),
          paddingHorizontal: responsiveWidth(5),
          zIndex: 1000,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.02,
          shadowRadius: 3,
          elevation: 1,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '700',
                color: '#1F2937',
                lineHeight: 28,
              }}
            >
              Hello, {userName}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: '#6B7280',
                marginTop: 2,
              }}
            >
              Welcome back to PetJio
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <TouchableOpacity
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: '#F8F9FB',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#E5E7EB',
              }}
            >
              <MaterialIcons name="calendar-today" size={22} color="#58B9D0" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: '#F8F9FB',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#E5E7EB',
                position: 'relative',
              }}
            >
              <MaterialIcons name="notifications" size={22} color="#58B9D0" />
              <View
                style={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#EF4444',
                  borderWidth: 1,
                  borderColor: '#FFFFFF',
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: responsiveHeight(12) }}
      >
        <View style={styles.subcontainer}>
          {/* Pets Section - Reference Project Style */}
          <View style={styles.doctoranddogimagecontainer}>
            {loadingPets ? (
              <PetSkeleton />
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
                      <View
                        style={[
                          styles.doctorcontainer,
                          {
                            backgroundColor: '#58B9D0',
                            alignItems: 'center',
                            justifyContent: 'center',
                          },
                        ]}
                      >
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

        {/* Appointments Section - Dynamic Data Only */}
        <View>
          <View style={styles.secondcontainer}>
            <View style={styles.flex}>
              <Text style={styles.appointmentText}>Appointments</Text>
              <Text style={styles.showallText}>Show All</Text>
            </View>
          </View>
        </View>

        {/* Attractive empty state for appointments */}
        <View
          style={{
            marginTop: responsiveHeight(1),
            paddingHorizontal: responsiveWidth(5),
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: responsiveHeight(2.5),
            backgroundColor: '#F8F9FB',
            marginHorizontal: responsiveWidth(5),
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#E5E7EB',
            borderStyle: 'dashed',
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#E3F2FD',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <MaterialIcons name="event" size={28} color="#58B9D0" />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#1F2937',
              textAlign: 'center',
              marginBottom: 4,
            }}
          >
            No upcoming appointments
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#6B7280',
              textAlign: 'center',
              lineHeight: 20,
            }}
          >
            Schedule your pet's next visit with our trusted veterinarians
          </Text>
        </View>

        {/* News Section - Dynamic Data Only */}
        <View>
          <View style={styles.fourthcontainer}>
            <View style={styles.flex}>
              <Text style={styles.appointmentText}>News</Text>
              <Text style={styles.showallText}>Show All</Text>
            </View>
          </View>
        </View>

        {/* Attractive empty state for news */}
        <View
          style={{
            marginTop: responsiveHeight(1),
            paddingHorizontal: responsiveWidth(5),
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: responsiveHeight(2.5),
            backgroundColor: '#F0FCFF',
            marginHorizontal: responsiveWidth(5),
            borderRadius: 16,
            borderWidth: 1,
            borderColor: '#B8E6FF',
            borderStyle: 'dashed',
          }}
        >
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#DBEAFE',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <MaterialIcons name="newspaper" size={28} color="#3B82F6" />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: '#1F2937',
              textAlign: 'center',
              marginBottom: 4,
            }}
          >
            No news updates
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#6B7280',
              textAlign: 'center',
              lineHeight: 20,
            }}
          >
            Stay tuned for the latest pet care news and updates
          </Text>
        </View>

        <View style={{ marginTop: responsiveHeight(1) }}>
          <View style={styles.fivethcontainer}>
            {/* Attractive empty state for blogs */}
            <View
              style={{
                paddingHorizontal: responsiveWidth(5),
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: responsiveHeight(2.5),
                backgroundColor: '#FEF7ED',
                marginHorizontal: responsiveWidth(5),
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#FED7AA',
                borderStyle: 'dashed',
                marginBottom: responsiveHeight(3),
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: '#FEF3C7',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <MaterialIcons name="article" size={28} color="#F59E0B" />
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#1F2937',
                  textAlign: 'center',
                  marginBottom: 4,
                }}
              >
                No blog posts yet
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#6B7280',
                  textAlign: 'center',
                  lineHeight: 20,
                }}
              >
                Discover helpful tips and guides for caring for your pets
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
