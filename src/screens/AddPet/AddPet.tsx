import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { API_CONFIG } from '../../config/api';
import { storageService } from '../../utils/storage';
import { goBack } from '../../utils/navigationService';
import signupstyles from '../SignUp/signup.styles';
import Icons from '../../../assets/icons';

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
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Data states
  const [petCategories, setPetCategories] = useState<PetCategory[]>([]);
  const [petSizes, setPetSizes] = useState<PetSize[]>([]);
  const [petGenders, setPetGenders] = useState<PetGender[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

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
    } else if (isNaN(Number(ageInMonths)) || Number(ageInMonths) < 0 || Number(ageInMonths) > 11) {
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
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        setMessage({ type: 'error', text: 'Authentication token not found' });
        return;
      }

      // Fetch pet categories
      const categoriesResponse = await fetch(`${API_CONFIG.BASE_URL}/api/pet-category`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (categoriesResponse.ok) {
        const categoriesData = await categoriesResponse.json();
        setPetCategories(categoriesData.body || []);
      }

      // Fetch pet sizes
      const sizesResponse = await fetch(`${API_CONFIG.BASE_URL}/api/pet-size`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (sizesResponse.ok) {
        const sizesData = await sizesResponse.json();
        setPetSizes(sizesData.body || []);
      }

      // Fetch pet genders
      const gendersResponse = await fetch(`${API_CONFIG.BASE_URL}/api/pet-gender`, {
        headers: { 'Authorization': `Bearer ${token}` }
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

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
      const ownerId = await AsyncStorage.getItem('ownerId');

      if (!token || !ownerId) {
        setMessage({ type: 'error', text: 'Authentication data not found' });
        return;
      }

      const petData = {
        petName: petName.trim(),
        ageInYears: parseInt(ageInYears),
        ageInMonths: parseInt(ageInMonths),
        petCatId: category,
        petSizeId: size,
        petGenderId: gender,
        weight: weight.trim() || null,
        height: height.trim() || null,
        treats: treats.trim() || null,
        feedCount: feedCount.trim() || null,
        medicalHistory: medicalHistory.trim() || null,
        ownerId: parseInt(ownerId),
      };

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/pet-profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(petData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Pet profile created successfully!' });
        setTimeout(() => {
          goBack();
        }, 1500);
      } else {
        const errorData = await response.json();
        setMessage({ type: 'error', text: errorData.message || 'Failed to create pet profile' });
      }
    } catch (error) {
      console.error('Error creating pet profile:', error);
      setMessage({ type: 'error', text: 'Error creating pet profile' });
    } finally {
      setLoading(false);
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
      <KeyboardAvoidingView 
        style={signupstyles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#58B9D0" />
          <Text style={{marginTop: 16, color: '#666'}}>Loading form data...</Text>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={signupstyles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <ScrollView 
        style={signupstyles.scrollContainer}
        contentContainerStyle={signupstyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={signupstyles.formContainer}>
          {/* Back Button */}
          <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: responsiveHeight(2), marginBottom: responsiveHeight(2)}}>
            <TouchableOpacity 
              onPress={goBack} 
              style={{
                padding: 8,
                borderRadius: 8,
                backgroundColor: '#f0f0f0'
              }}
            >
              <MaterialIcons name="arrow-back" size={24} color="#58B9D0" />
            </TouchableOpacity>
          </View>
          
          <View style={{alignItems:'center', paddingTop: responsiveHeight(1)}}>
            <Text style={signupstyles.heading}>Add Pet Profile</Text>
            <Text style={signupstyles.subheading}>Create a new pet profile</Text>
          </View>
          
          {/* Messages */}
          {message && (
            <View style={[
              signupstyles.messageContainer,
              message.type === 'success' ? signupstyles.successMessage : signupstyles.errorMessage
            ]}>
              <Text style={signupstyles.messageText}>{message.text}</Text>
            </View>
          )}

          <View style={signupstyles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Pet Name"
              placeholder="Enter your pet's name"
              value={petName}
              onChangeText={(value) => {
                setPetName(value);
                clearFieldError('petName');
              }}
              theme={{ 
                roundness: 12,
                colors: { primary: '#58B9D0', outline: errors.petName ? '#FF6B6B' : '#E2E2E2' }
              }}
              error={!!errors.petName}
            />
            {errors.petName && <Text style={signupstyles.errorText}>{errors.petName}</Text>}

            <View style={{flexDirection: 'row', gap: 10}}>
              <View style={{flex: 1}}>
                <TextInput
                  mode="outlined"
                  label="Age (Years)"
                  placeholder="0"
                  value={ageInYears}
                  onChangeText={(value) => {
                    setAgeInYears(value);
                    clearFieldError('ageInYears');
                  }}
                  keyboardType="numeric"
                  theme={{ 
                    roundness: 12,
                    colors: { primary: '#58B9D0', outline: errors.ageInYears ? '#FF6B6B' : '#E2E2E2' }
                  }}
                  error={!!errors.ageInYears}
                />
                {errors.ageInYears && <Text style={signupstyles.errorText}>{errors.ageInYears}</Text>}
              </View>

              <View style={{flex: 1}}>
                <TextInput
                  mode="outlined"
                  label="Age (Months)"
                  placeholder="0-11"
                  value={ageInMonths}
                  onChangeText={(value) => {
                    setAgeInMonths(value);
                    clearFieldError('ageInMonths');
                  }}
                  keyboardType="numeric"
                  theme={{ 
                    roundness: 12,
                    colors: { primary: '#58B9D0', outline: errors.ageInMonths ? '#FF6B6B' : '#E2E2E2' }
                  }}
                  error={!!errors.ageInMonths}
                />
                {errors.ageInMonths && <Text style={signupstyles.errorText}>{errors.ageInMonths}</Text>}
              </View>
            </View>

            <View>
              <Text style={{fontSize: 16, color: '#333', marginBottom: 8}}>Category *</Text>
              <Dropdown
                style={[
                  {
                    height: 56,
                    borderColor: errors.category ? '#FF6B6B' : '#E2E2E2',
                    borderWidth: 1,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    backgroundColor: '#fff'
                  }
                ]}
                placeholderStyle={{fontSize: 16, color: '#666'}}
                selectedTextStyle={{fontSize: 16, color: '#333'}}
                data={petCategories.map(cat => ({ label: cat.catName, value: cat.id }))}
                labelField="label"
                valueField="value"
                placeholder="Select Category"
                value={category}
                onChange={(item) => {
                  setCategory(item.value);
                  clearFieldError('category');
                }}
              />
              {errors.category && <Text style={signupstyles.errorText}>{errors.category}</Text>}
            </View>

            <View>
              <Text style={{fontSize: 16, color: '#333', marginBottom: 8}}>Size *</Text>
              <Dropdown
                style={[
                  {
                    height: 56,
                    borderColor: errors.size ? '#FF6B6B' : '#E2E2E2',
                    borderWidth: 1,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    backgroundColor: '#fff'
                  }
                ]}
                placeholderStyle={{fontSize: 16, color: '#666'}}
                selectedTextStyle={{fontSize: 16, color: '#333'}}
                data={petSizes.map(s => ({ label: s.size, value: s.id }))}
                labelField="label"
                valueField="value"
                placeholder="Select Size"
                value={size}
                onChange={(item) => {
                  setSize(item.value);
                  clearFieldError('size');
                }}
              />
              {errors.size && <Text style={signupstyles.errorText}>{errors.size}</Text>}
            </View>

            <View>
              <Text style={{fontSize: 16, color: '#333', marginBottom: 8}}>Gender *</Text>
              <Dropdown
                style={[
                  {
                    height: 56,
                    borderColor: errors.gender ? '#FF6B6B' : '#E2E2E2',
                    borderWidth: 1,
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    backgroundColor: '#fff'
                  }
                ]}
                placeholderStyle={{fontSize: 16, color: '#666'}}
                selectedTextStyle={{fontSize: 16, color: '#333'}}
                data={petGenders.map(g => ({ label: g.name, value: g.id }))}
                labelField="label"
                valueField="value"
                placeholder="Select Gender"
                value={gender}
                onChange={(item) => {
                  setGender(item.value);
                  clearFieldError('gender');
                }}
              />
              {errors.gender && <Text style={signupstyles.errorText}>{errors.gender}</Text>}
            </View>

            <View style={{flexDirection: 'row', gap: 10}}>
              <View style={{flex: 1}}>
                <TextInput
                  mode="outlined"
                  label="Weight (kg)"
                  placeholder="e.g. 18.5"
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                  theme={{ 
                    roundness: 12,
                    colors: { primary: '#58B9D0', outline: '#E2E2E2' }
                  }}
                />
              </View>

              <View style={{flex: 1}}>
                <TextInput
                  mode="outlined"
                  label="Height"
                  placeholder="e.g. 45cm"
                  value={height}
                  onChangeText={setHeight}
                  theme={{ 
                    roundness: 12,
                    colors: { primary: '#58B9D0', outline: '#E2E2E2' }
                  }}
                />
              </View>
            </View>

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
                colors: { primary: '#58B9D0', outline: '#E2E2E2' }
              }}
            />

            <TextInput
              mode="outlined"
              label="Feed Count (per day)"
              placeholder="e.g. 3"
              value={feedCount}
              onChangeText={setFeedCount}
              keyboardType="numeric"
              theme={{ 
                roundness: 12,
                colors: { primary: '#58B9D0', outline: '#E2E2E2' }
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
                colors: { primary: '#58B9D0', outline: '#E2E2E2' }
              }}
            />
          </View>

          <TouchableOpacity 
            onPress={handleSubmit}
            style={[signupstyles.loginButton, loading && {opacity: 0.7}]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={signupstyles.loginText}>Add Pet Profile</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddPet;