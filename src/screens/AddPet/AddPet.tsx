import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar,
  Image,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { API_CONFIG } from '../../config/api';
import { storageService } from '../../utils/storage';
import { goBack } from '../../utils/navigationService';
import signupstyles from '../SignUp/signup.styles';
import Icons from '../../../assets/icons';
import boardingstyles from '../Boarding/boarding.styles';
import boardingQuestionStyles from '../BoardingQuestions/boardingquestions.styles';
import serviceStyles from '../Service/styles';

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

interface ValidationErrors {
  petName?: string;
  ageInYears?: string;
  ageInMonths?: string;
  category?: string;
  size?: string;
  gender?: string;
}

const AddPet: React.FC = () => {
  // Form states
  const [petName, setPetName] = useState('');
  const [ageInYears, setAgeInYears] = useState('');
  const [ageInMonths, setAgeInMonths] = useState('');
  const [category, setCategory] = useState<number | null>(null);
  const [size, setSize] = useState<number | null>(null);
  const [gender, setGender] = useState<number | null>(null);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [treats, setTreats] = useState('');
  const [feedCount, setFeedCount] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [cookie, setCookie] = useState('');
  const [allergies, setAllergies] = useState('');
  const [disability, setDisability] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Data states
  const [petCategories, setPetCategories] = useState<PetCategory[]>([]);
  const [petSizes, setPetSizes] = useState<PetSize[]>([]);
  const [petGenders, setPetGenders] = useState<PetGender[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  console.log(petGenders, petSizes, 'petGenderspetGenders');
  

  const clearFieldError = (field: keyof ValidationErrors) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!petName.trim()) {
      newErrors.petName = 'Pet name is required';
    }

    if (!ageInYears.trim()) {
      newErrors.ageInYears = 'Age in years is required';
    } else if (isNaN(Number(ageInYears)) || Number(ageInYears) < 0) {
      newErrors.ageInYears = 'Please enter a valid age';
    }

    if (!ageInMonths.trim()) {
      newErrors.ageInMonths = 'Age in months is required';
    } else if (
      isNaN(Number(ageInMonths)) ||
      Number(ageInMonths) < 0 ||
      Number(ageInMonths) > 11
    ) {
      newErrors.ageInMonths = 'Please enter months (0-11)';
    }

    if (!category) {
      newErrors.category = 'Please select a category';
    }

    if (!size) {
      newErrors.size = 'Please select a size';
    }

    if (!gender) {
      newErrors.gender = 'Please select a gender';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchDropdownData = async () => {
    try {
      const token = await storageService.getUserToken();
      console.log('this is token', token);
      if (!token) {
        setMessage({ type: 'error', text: 'Authentication token not found' });
        return;
      }

      // Fetch pet categories
      const categoriesResponse = await fetch(
        `${API_CONFIG.BASE_URL}/api/pet-category`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        setPetCategories(categoriesData.body || []);
      }

      // Fetch pet sizes
      const sizesResponse = await fetch(`${API_CONFIG.BASE_URL}/api/pet-size`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (sizesResponse.ok) {
        const sizesData = await sizesResponse.json();
        setPetSizes(sizesData.body || []);
      }

      // Fetch pet genders
      const gendersResponse = await fetch(`${API_CONFIG.BASE_URL}/api/gender`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (gendersResponse.ok) {
        const gendersData = await gendersResponse.json();
        setPetGenders(gendersData.body || []);
      }
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
      setMessage({ type: 'error', text: 'Failed to load form data' });
    } finally {
      setInitialLoading(false);
    }
  };

  // Helper function to generate curl command for debugging
  const generateAddPetCurlCommand = (url: string, token: string, data: any) => {
    const curlCommand = `curl -X POST "${url}" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${token}" \\
  -d '${JSON.stringify(data, null, 2)}' \\
  -v`;

    return curlCommand;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      console.warn('⚠️ Form validation failed');
      return;
    }

    try {
      setLoading(true);
      console.log('🔄 Starting pet profile creation...');

      // Debug token retrieval
      const token = await storageService.getUserToken();
      console.log('🔍 Token retrieved:', token ? `Present (${token.substring(0, 20)}...)` : 'Missing');

      if (!token) {
        console.error('❌ No authentication token found');
        setMessage({ type: 'error', text: 'Authentication token not found' });
        return;
      }

      // Fetch owner ID dynamically from API
      console.log('🔍 Fetching owner ID from API...');
      const ownerResponse = await fetch(
        `${API_CONFIG.BASE_URL}/api/pet-owner/findByUserId`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!ownerResponse.ok) {
        console.error('❌ Failed to get owner information:', ownerResponse.status);
        setMessage({ type: 'error', text: 'Failed to get owner information' });
        return;
      }

      const ownerData = await ownerResponse.json();
      console.log('📋 Owner API response:', ownerData);

      if (ownerData.statusCode !== 200 || !ownerData.body?.id) {
        console.error('❌ Owner ID not found in response:', ownerData);
        setMessage({ type: 'error', text: 'Owner ID not found' });
        return;
      }

      const ownerId = ownerData.body.id;
      console.log('👤 Owner ID retrieved:', ownerId);

      const petData = {
        petName: petName.trim(),
        ageInYears: parseInt(ageInYears),
        ageInMonths: parseInt(ageInMonths),
        category: category,
        size: size,
        gender: gender,
        weight: weight.trim() ? parseFloat(weight) : null,
        height: height.trim() || null,
        treats: treats.trim() || null,
        ownerId: ownerId,
        profileImg: '',
        dailyFeedCount: feedCount.trim() ? parseInt(feedCount) : null,
        cookie: cookie.trim() || null,
        allergies: allergies.trim() || null,
        disability: disability.trim() || null,
      };

      const apiUrl = `${API_CONFIG.BASE_URL}/api/pet-profile`;

      console.log('📝 Pet data to be sent:', petData);
      console.log('🌐 API URL:', apiUrl);
      console.log('🔑 Authorization header:', `Bearer ${token.substring(0, 20)}...`);

      // Generate and log curl command for easy testing
      const curlCommand = generateAddPetCurlCommand(apiUrl, token, petData);
      console.log('🔧 Generated curl command for debugging:');
      console.log('=====================================');
      console.log(curlCommand);
      console.log('=====================================');

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
      });

      console.log('📡 API Response status:', response.status);
      console.log('📡 API Response headers:', Object.fromEntries(response.headers.entries()));

      if (response.ok) {
        const responseData = await response.json();
        console.log('✅ Pet profile created successfully:', responseData);

        setMessage({
          type: 'success',
          text: 'Pet profile created successfully!',
        });
        setTimeout(() => {
          goBack();
        }, 1500);
      } else {
        console.error('❌ Pet creation failed with status:', response.status);

        let errorData;
        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
        } else {
          errorData = { message: await response.text() };
        }

        console.error('❌ Error response data:', errorData);
        setMessage({
          type: 'error',
          text: errorData.message || `Failed to create pet profile (${response.status})`,
        });
      }
    } catch (error) {
      console.error('🔥 Error creating pet profile:', error);
      console.error('🔥 Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      setMessage({
        type: 'error',
        text: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setLoading(false);
      console.log('✅ Pet creation process completed');
    }
  };

  useEffect(() => {
    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (initialLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
        <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
        animated={true}
      />
        <View style={{ flex: 1 }}>
          {/* Header Section matching Services page */}
          <View style={serviceStyles.stickyHeader}>
            <TouchableOpacity onPress={goBack} style={{ marginRight: 16 }}>
              <Image
                source={Icons.LeftArrow}
                style={{ tintColor: '#000000', width: 20, height: 20 }}
              />
            </TouchableOpacity>
            <View style={serviceStyles.headerTitleContainer}>
              <Text style={serviceStyles.stickyHeaderTitle}>
                Add Pet
              </Text>
              <Text style={serviceStyles.stickyHeaderSubtitle}>
                Create a new pet profile
              </Text>
            </View>
          </View>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size="large" color="#58B9D0" />
            <Text style={{ marginTop: 16, color: '#666' }}>
              Loading form data...
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
        animated={true}
      />
      <View style={{ flex: 1 }}>
        {/* Header Section matching Services page */}
        <View style={serviceStyles.stickyHeader}>
          <TouchableOpacity onPress={goBack} style={{ marginRight: 16 }}>
            <Image
              source={Icons.LeftArrow}
              style={{ tintColor: '#000000', width: 20, height: 20 }}
            />
          </TouchableOpacity>
          <View style={serviceStyles.headerTitleContainer}>
            <Text style={serviceStyles.stickyHeaderTitle}>
              Add Pet
            </Text>
            <Text style={serviceStyles.stickyHeaderSubtitle}>
              Add a new pet
            </Text>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            backgroundColor: '#F8F9FB',
            paddingHorizontal: responsiveWidth(4),
          }}
          contentContainerStyle={{
            paddingTop: responsiveHeight(2),
            paddingBottom: responsiveHeight(4),
          }}
        >
          {/* Subtitle section */}
          {/* <View style={boardingQuestionStyles.header}>
            <Text style={boardingQuestionStyles.subtitle}>
              Create a new pet profile
            </Text>
          </View> */}

          <View style={{ gap: responsiveHeight(2) }}>

          {/* Messages */}
          {message && (
            <View
              style={[
                signupstyles.messageContainer,
                message.type === 'success'
                  ? signupstyles.successMessage
                  : signupstyles.errorMessage,
              ]}
            >
              <Text style={signupstyles.messageText}>{message.text}</Text>
            </View>
          )}

          <View style={signupstyles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Pet Name"
              placeholder="Enter your pet's name"
              value={petName}
              onChangeText={value => {
                setPetName(value);
                clearFieldError('petName');
              }}
              theme={{
                roundness: 12,
                colors: {
                  primary: '#58B9D0',
                  outline: errors.petName ? '#FF6B6B' : '#E2E2E2',
                },
              }}
              error={!!errors.petName}
            />
            {errors.petName && (
              <Text style={signupstyles.errorText}>{errors.petName}</Text>
            )}

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  mode="outlined"
                  label="Age (Years)"
                  placeholder="0"
                  value={ageInYears}
                  onChangeText={value => {
                    setAgeInYears(value);
                    clearFieldError('ageInYears');
                  }}
                  keyboardType="numeric"
                  theme={{
                    roundness: 12,
                    colors: {
                      primary: '#58B9D0',
                      outline: errors.ageInYears ? '#FF6B6B' : '#E2E2E2',
                    },
                  }}
                  error={!!errors.ageInYears}
                />
                {errors.ageInYears && (
                  <Text style={signupstyles.errorText}>
                    {errors.ageInYears}
                  </Text>
                )}
              </View>

              <View style={{ flex: 1 }}>
                <TextInput
                  mode="outlined"
                  label="Age (Months)"
                  placeholder="0-11"
                  value={ageInMonths}
                  onChangeText={value => {
                    setAgeInMonths(value);
                    clearFieldError('ageInMonths');
                  }}
                  keyboardType="numeric"
                  theme={{
                    roundness: 12,
                    colors: {
                      primary: '#58B9D0',
                      outline: errors.ageInMonths ? '#FF6B6B' : '#E2E2E2',
                    },
                  }}
                  error={!!errors.ageInMonths}
                />
                {errors.ageInMonths && (
                  <Text style={signupstyles.errorText}>
                    {errors.ageInMonths}
                  </Text>
                )}
              </View>
            </View>

            <View>
              <Dropdown
                style={[
                  {
                    height: 56,
                    borderColor: errors.category ? '#FF6B6B' : '#E2E2E2',
                    borderWidth: 1,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    backgroundColor: '#fff',
                  },
                ]}
                placeholderStyle={{ fontSize: 16, color: '#666' }}
                selectedTextStyle={{ fontSize: 16, color: '#333' }}
                itemTextStyle={{ fontSize: 16, color: '#333' }}
                containerStyle={{ 
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#E2E2E2',
                  marginTop: 5,
                }}
                itemContainerStyle={{
                  backgroundColor: '#fff',
                  borderBottomWidth: 1,
                  borderBottomColor: '#F0F0F0',
                }}
                data={petCategories.map(cat => ({
                  label: cat.catName,
                  value: cat.id,
                }))}
                labelField="label"
                valueField="value"
                placeholder="Select Category"
                value={category}
                onChange={item => {
                  setCategory(item.value);
                  clearFieldError('category');
                }}
              />
              {errors.category && (
                <Text style={signupstyles.errorText}>{errors.category}</Text>
              )}
            </View>

            <View>
              <Dropdown
                style={[
                  {
                    height: 56,
                    borderColor: errors.size ? '#FF6B6B' : '#E2E2E2',
                    borderWidth: 1,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    backgroundColor: '#fff',
                  },
                ]}
                placeholderStyle={{ fontSize: 16, color: '#666' }}
                selectedTextStyle={{ fontSize: 16, color: '#333' }}
                itemTextStyle={{ fontSize: 16, color: '#333' }}
                containerStyle={{ 
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#E2E2E2',
                  marginTop: 5,
                }}
                itemContainerStyle={{
                  backgroundColor: '#fff',
                  borderBottomWidth: 1,
                  borderBottomColor: '#F0F0F0',
                }}
                data={petSizes.map(s => ({ label: s.size, value: s.id }))}
                labelField="label"
                valueField="value"
                placeholder="Select Size"
                value={size}
                onChange={item => {
                  setSize(item.value);
                  clearFieldError('size');
                }}
              />
              {errors.size && (
                <Text style={signupstyles.errorText}>{errors.size}</Text>
              )}
            </View>

            <View>
              <Dropdown
                style={[
                  {
                    height: 56,
                    borderColor: errors.gender ? '#FF6B6B' : '#E2E2E2',
                    borderWidth: 1,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    backgroundColor: '#fff',
                  },
                ]}
                placeholderStyle={{ fontSize: 16, color: '#666' }}
                selectedTextStyle={{ fontSize: 16, color: '#333' }}
                itemTextStyle={{ fontSize: 16, color: '#333' }}
                containerStyle={{ 
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: '#E2E2E2',
                  marginTop: 5,
                }}
                itemContainerStyle={{
                  backgroundColor: '#fff',
                  borderBottomWidth: 1,
                  borderBottomColor: '#F0F0F0',
                }}
                data={petGenders.map(g => ({ label: g.name, value: g.id }))}
                labelField="label"
                valueField="value"
                placeholder="Select Gender"
                value={gender}
                onChange={item => {
                  setGender(item.value);
                  clearFieldError('gender');
                }}
              />
              {errors.gender && (
                <Text style={signupstyles.errorText}>{errors.gender}</Text>
              )}
            </View>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <TextInput
                  mode="outlined"
                  label="Weight (kg)"
                  placeholder="e.g. 18.5"
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                  theme={{
                    roundness: 12,
                    colors: { primary: '#58B9D0', outline: '#E2E2E2' },
                  }}
                />
              </View>

              <View style={{ flex: 1 }}>
                <TextInput
                  mode="outlined"
                  label="Height"
                  placeholder="e.g. 45cm"
                  value={height}
                  onChangeText={setHeight}
                  theme={{
                    roundness: 12,
                    colors: { primary: '#58B9D0', outline: '#E2E2E2' },
                  }}
                />
              </View>
            </View>

            <TextInput
              mode="outlined"
              label="Daily Feed Count"
              placeholder="e.g. 2"
              value={feedCount}
              onChangeText={setFeedCount}
              keyboardType="numeric"
              theme={{
                roundness: 12,
                colors: { primary: '#58B9D0', outline: '#E2E2E2' },
              }}
            />

            <TextInput
              mode="outlined"
              label="Cookie/Food Type"
              placeholder="e.g. grain, meat-based"
              value={cookie}
              onChangeText={setCookie}
              theme={{
                roundness: 12,
                colors: { primary: '#58B9D0', outline: '#E2E2E2' },
              }}
            />

            <TextInput
              mode="outlined"
              label="Allergies"
              placeholder="e.g. Dairy, Nuts"
              value={allergies}
              onChangeText={setAllergies}
              multiline
              numberOfLines={2}
              theme={{
                roundness: 12,
                colors: { primary: '#58B9D0', outline: '#E2E2E2' },
              }}
            />

            <TextInput
              mode="outlined"
              label="Disability/Special Needs"
              placeholder="e.g. none, mobility issues"
              value={disability}
              onChangeText={setDisability}
              multiline
              numberOfLines={2}
              theme={{
                roundness: 12,
                colors: { primary: '#58B9D0', outline: '#E2E2E2' },
              }}
            />

            <TextInput
              mode="outlined"
              label="Favorite Treats"
              placeholder="e.g. Chicken jerky, Carrots"
              value={treats}
              onChangeText={setTreats}
              multiline
              numberOfLines={2}
              theme={{
                roundness: 12,
                colors: { primary: '#58B9D0', outline: '#E2E2E2' },
              }}
            />

            <TextInput
              mode="outlined"
              label="Medical History"
              placeholder="Any medical conditions or treatments"
              value={medicalHistory}
              onChangeText={setMedicalHistory}
              multiline
              numberOfLines={3}
              theme={{
                roundness: 12,
                colors: { primary: '#58B9D0', outline: '#E2E2E2' },
              }}
            />
          </View>
          </View>
            
          {/* Submit Button inside ScrollView */}
          <TouchableOpacity
              onPress={handleSubmit}
              style={[
                boardingQuestionStyles.bookButton,
                loading && boardingQuestionStyles.disabledButton
              ]}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={boardingQuestionStyles.bookButtonText}>Add Pet</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  };

export default AddPet;
