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
import { RootStackNavigationProp } from '../../types/navigation';
import signupstyles from '../SignUp/signup.styles';
import Icons from '../../../assets/icons';
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
  allergies?: string | null;
  disability?: string | null;
}

interface ValidationErrors {
  petName?: string;
  ageInYears?: string;
  ageInMonths?: string;
  category?: string;
  size?: string;
  gender?: string;
}

interface EditPetProps extends RootStackNavigationProp<'EditPet'> {}

const EditPet: React.FC<EditPetProps> = ({ route }) => {
  const pet = route?.params?.pet;

  const [petName, setPetName] = useState(pet?.petName || '');
  const [ageInYears, setAgeInYears] = useState(pet?.ageInYears?.toString() || '');
  const [ageInMonths, setAgeInMonths] = useState(pet?.ageInMonths?.toString() || '');
  const [category, setCategory] = useState<number | null>(pet?.category?.id || null);
  const [size, setSize] = useState<number | null>(pet?.size?.id || null);
  const [height, setHeight] = useState(pet?.height || '');
  const [gender, setGender] = useState<number | null>(pet?.gender?.id || null);
  const [weight, setWeight] = useState(pet?.weight || '');
  const [treats, setTreats] = useState(pet?.treats || '');
  const [cookie, setCookie] = useState(pet?.cookie || '');
  const [allergies, setAllergies] = useState(pet?.allergies || '');
  const [disability, setDisability] = useState(pet?.disability || '');
  const [dailyFeedCount, setDailyFeedCount] = useState(pet?.dailyFeedCount?.toString() || '');

  const [petCategories, setPetCategories] = useState<PetCategory[]>([]);
  const [petSizes, setPetSizes] = useState<PetSize[]>([]);
  const [petGenders, setPetGenders] = useState<PetGender[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  useEffect(() => {
    if (!pet) {
      Alert.alert('Error', 'Pet data not found', [
        { text: 'OK', onPress: () => goBack() }
      ]);
      return;
    }
    fetchDropdownData();
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

  const fetchDropdownData = async () => {
    setLoadingData(true);
    try {
      const token = await getAuthToken();
      if (!token) {
        Alert.alert('Error', 'Please login to continue');
        return;
      }

      // Fetch categories, sizes, and genders in parallel
      const [categoriesRes, sizesRes, gendersRes] = await Promise.all([
        fetch(`${API_CONFIG.BASE_URL}/api/pet-category`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }).catch(() => null),
        fetch(`${API_CONFIG.BASE_URL}/api/pet-size`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }).catch(() => null),
        fetch(`${API_CONFIG.BASE_URL}/api/pet-gender`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }).catch(() => null),
      ]);

      // Handle categories
      if (categoriesRes && categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        setPetCategories(categoriesData.body || []);
      } else {
        // Provide fallback categories
        setPetCategories([
          { id: 1, catName: 'Dog' },
          { id: 2, catName: 'Cat' },
          { id: 3, catName: 'Bird' },
          { id: 4, catName: 'Other' },
        ]);
      }

      // Handle sizes
      if (sizesRes && sizesRes.ok) {
        const sizesData = await sizesRes.json();
        setPetSizes(sizesData.body || []);
      } else {
        // Provide fallback sizes
        setPetSizes([
          { id: 1, size: 'Small' },
          { id: 2, size: 'Medium' },
          { id: 3, size: 'Large' },
          { id: 4, size: 'Extra Large' },
        ]);
      }

      // Handle genders
      if (gendersRes && gendersRes.ok) {
        const gendersData = await gendersRes.json();
        setPetGenders(gendersData.body || []);
      } else {
        // Provide fallback genders
        setPetGenders([
          { id: 1, name: 'Male' },
          { id: 2, name: 'Female' },
        ]);
      }

    } catch (error) {
      console.error('Error fetching dropdown data:', error);
      setMessage({type: 'error', text: 'Failed to load form data'});
    } finally {
      setLoadingData(false);
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
      newErrors.ageInYears = 'Please enter a valid age in years';
    }

    if (!ageInMonths.trim()) {
      newErrors.ageInMonths = 'Age in months is required';
    } else if (isNaN(Number(ageInMonths)) || Number(ageInMonths) < 0 || Number(ageInMonths) > 11) {
      newErrors.ageInMonths = 'Please enter a valid age in months (0-11)';
    }

    if (!category) {
      newErrors.category = 'Pet category is required';
    }

    if (!size) {
      newErrors.size = 'Pet size is required';
    }

    if (!gender) {
      newErrors.gender = 'Pet gender is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearFieldError = (field: keyof ValidationErrors) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm() || !pet) {
      setMessage({type: 'error', text: 'Please fix the errors below'});
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const token = await getAuthToken();

      if (!token) {
        Alert.alert('Error', 'Authentication token not found. Please login again.');
        return;
      }

      const updateData = {
        petName: petName.trim(),
        size: size!,
        ageInYears: Number(ageInYears),
        ageInMonths: Number(ageInMonths),
        category: category!,
        height: height.trim() || "0",
        gender: gender!,
        weight: weight ? Number(weight) : 0,
        treats: treats.trim() || "",
        cookie: cookie.trim() || "",
        allergies: allergies.trim() || "",
        disability: disability.trim() || "no",
        dailyFeedCount: dailyFeedCount ? Number(dailyFeedCount) : 0,
      };

      console.log('Updating pet profile with data:', updateData);

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/pet-profile/${pet.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert(
          'Success',
          'Pet profile updated successfully!',
          [
            {
              text: 'OK',
              onPress: () => goBack(),
            }
          ]
        );
      } else {
        throw new Error(result.message || 'Failed to update pet profile');
      }

    } catch (error) {
      console.error('Error updating pet profile:', error);
      setMessage({
        type: 'error',
        text: `Failed to update pet profile: ${error.message}`,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
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
                Edit Pet Profile
              </Text>
              <Text style={serviceStyles.stickyHeaderSubtitle}>
                Update {pet?.petName}'s information
              </Text>
            </View>
          </View>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size="large" color="#58B9D0" />
            <Text style={{ marginTop: 16, color: '#666' }}>
              Loading pet data...
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
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
              Edit Pet Profile
            </Text>
            <Text style={serviceStyles.stickyHeaderSubtitle}>
              Update {pet?.petName}'s information
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
                data={petCategories.map(cat => ({ label: cat.catName, value: cat.id }))}
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
              value={dailyFeedCount}
              onChangeText={setDailyFeedCount}
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
                <Text style={boardingQuestionStyles.bookButtonText}>Update Pet Profile</Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  };

  const clearFieldError = (field: keyof ValidationErrors) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

export default EditPet;