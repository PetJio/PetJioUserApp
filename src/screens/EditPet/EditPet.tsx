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
  Image,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { BORDER_RADIUS, FONT_SIZES } from '../../constants/dimensions';
import { spacing } from '../../styles/spacing';
import { typography } from '../../styles/typography';
import colors from '../../styles/colors/index';
import { shadows } from '../../styles/shadows';
import { API_CONFIG } from '../../config/api';
import { storageService } from '../../utils/storage';
import { goBack } from '../../utils/navigationService';
import { RootStackNavigationProp } from '../../types/navigation';

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
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#58B9D0" />
          <Text style={styles.loadingText}>Loading form data...</Text>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
      
      {/* Sticky Header */}
      <View style={styles.stickyHeader}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#58B9D0" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Edit Pet Profile</Text>
          <Text style={styles.headerSubtitle}>Update {pet?.petName}'s information</Text>
        </View>
        <View style={styles.headerPlaceholder} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Content Container */}
        <View style={styles.contentContainer}>
          
          {/* Messages */}
          {message && (
            <View style={[
              styles.messageContainer,
              message.type === 'success' ? styles.successMessage : styles.errorMessage
            ]}>
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          )}

          {/* Pet Profile Photo Section */}
          <View style={styles.profilePhotoSection}>
            <View style={styles.profilePhotoCard}>
              <TouchableOpacity 
                style={styles.profilePhotoButton}
                activeOpacity={0.8}
              >
                <View style={styles.profilePhotoWrapper}>
                  {pet?.profileImg && pet.profileImg !== 'img' ? (
                    <Image
                      source={{ uri: pet.profileImg }}
                      style={styles.profilePhotoImage}
                      defaultSource={require('../../../assets/icons/googleIcon.png')}
                    />
                  ) : (
                    <View style={[styles.profilePhotoImage, styles.defaultPetImageContainer]}>
                      <MaterialIcons name="pets" size={50} color="#58B9D0" />
                    </View>
                  )}
                  <View style={styles.cameraIconOverlay}>
                    <MaterialIcons name="camera-alt" size={20} color="#ffffff" />
                  </View>
                </View>
              </TouchableOpacity>
              
              <View style={styles.petInfoContainer}>
                <Text style={styles.petNameTitle}>{pet?.petName || 'Pet Name'}</Text>
                <Text style={styles.petCategoryTitle}>
                  {pet?.category?.catName} • {pet?.gender?.name}
                </Text>
              </View>
              
              <Text style={styles.photoUploadText}>
                <MaterialIcons name="touch-app" size={16} color="#666" />
                {' '}Tap photo to update
              </Text>
            </View>
          </View>

          {/* Basic Information Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="pets" size={24} color="#58B9D0" style={styles.sectionHeaderIcon} />
              <Text style={styles.sectionHeaderTitle}>Basic Information</Text>
            </View>

            <View style={styles.inputGroup}>
              <View>
                <TextInput
                  mode="outlined"
                  label="Pet Name *"
                  placeholder="Enter your pet's name"
                  value={petName}
                  onChangeText={(value) => {
                    setPetName(value);
                    clearFieldError('petName');
                  }}
                  style={styles.textInput}
                  contentStyle={styles.inputContent}
                  outlineStyle={[
                    styles.inputOutline,
                    errors.petName && styles.inputError
                  ]}
                  theme={{ 
                    roundness: 16,
                    colors: { primary: '#58B9D0', outline: errors.petName ? '#FF6B6B' : '#E8E8E8' }
                  }}
                  left={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialIcons 
                          name="pets" 
                          size={20} 
                          color={errors.petName ? '#FF6B6B' : '#666'} 
                        />
                      )}
                    />
                  }
                />
                {errors.petName && <Text style={styles.errorText}>{errors.petName}</Text>}
              </View>

              <View style={styles.rowContainer}>
                <View style={styles.halfWidth}>
                  <TextInput
                    mode="outlined"
                    label="Age (Years) *"
                    placeholder="0"
                    value={ageInYears}
                    onChangeText={(value) => {
                      setAgeInYears(value);
                      clearFieldError('ageInYears');
                    }}
                    keyboardType="numeric"
                    style={styles.textInput}
                    contentStyle={styles.inputContent}
                    outlineStyle={[
                      styles.inputOutline,
                      errors.ageInYears && styles.inputError
                    ]}
                    theme={{ 
                      roundness: 16,
                      colors: { primary: '#58B9D0', outline: errors.ageInYears ? '#FF6B6B' : '#E8E8E8' }
                    }}
                    left={
                      <TextInput.Icon
                        icon={() => (
                          <MaterialIcons 
                            name="cake" 
                            size={20} 
                            color={errors.ageInYears ? '#FF6B6B' : '#666'} 
                          />
                        )}
                      />
                    }
                  />
                  {errors.ageInYears && <Text style={styles.errorText}>{errors.ageInYears}</Text>}
                </View>

                <View style={styles.halfWidth}>
                  <TextInput
                    mode="outlined"
                    label="Age (Months) *"
                    placeholder="0-11"
                    value={ageInMonths}
                    onChangeText={(value) => {
                      setAgeInMonths(value);
                      clearFieldError('ageInMonths');
                    }}
                    keyboardType="numeric"
                    style={styles.textInput}
                    contentStyle={styles.inputContent}
                    outlineStyle={[
                      styles.inputOutline,
                      errors.ageInMonths && styles.inputError
                    ]}
                    theme={{ 
                      roundness: 16,
                      colors: { primary: '#58B9D0', outline: errors.ageInMonths ? '#FF6B6B' : '#E8E8E8' }
                    }}
                    left={
                      <TextInput.Icon
                        icon={() => (
                          <MaterialIcons 
                            name="calendar-today" 
                            size={20} 
                            color={errors.ageInMonths ? '#FF6B6B' : '#666'} 
                          />
                        )}
                      />
                    }
                  />
                  {errors.ageInMonths && <Text style={styles.errorText}>{errors.ageInMonths}</Text>}
                </View>
              </View>

              {/* Category Dropdown */}
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownLabel}>Category *</Text>
                <Dropdown
                  style={[styles.dropdown, errors.category && styles.dropdownError]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
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
                {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
              </View>

              {/* Size Dropdown */}
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownLabel}>Size *</Text>
                <Dropdown
                  style={[styles.dropdown, errors.size && styles.dropdownError]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
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
                {errors.size && <Text style={styles.errorText}>{errors.size}</Text>}
              </View>

              {/* Gender Dropdown */}
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownLabel}>Gender *</Text>
                <Dropdown
                  style={[styles.dropdown, errors.gender && styles.dropdownError]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
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
                {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
              </View>
            </View>
          </View>

          {/* Physical Details Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="straighten" size={24} color="#58B9D0" style={styles.sectionHeaderIcon} />
              <Text style={styles.sectionHeaderTitle}>Physical Details</Text>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.rowContainer}>
                <View style={styles.halfWidth}>
                  <TextInput
                    mode="outlined"
                    label="Weight (kg)"
                    placeholder="e.g. 18.5"
                    value={weight}
                    onChangeText={setWeight}
                    keyboardType="numeric"
                    style={styles.textInput}
                    contentStyle={styles.inputContent}
                    outlineStyle={styles.inputOutline}
                    theme={{ 
                      roundness: 16,
                      colors: { primary: '#58B9D0', outline: '#E8E8E8' }
                    }}
                    left={
                      <TextInput.Icon
                        icon={() => (
                          <MaterialIcons 
                            name="fitness-center" 
                            size={20} 
                            color="#666" 
                          />
                        )}
                      />
                    }
                  />
                </View>

                <View style={styles.halfWidth}>
                  <TextInput
                    mode="outlined"
                    label="Height"
                    placeholder="e.g. 45cm"
                    value={height}
                    onChangeText={setHeight}
                    style={styles.textInput}
                    contentStyle={styles.inputContent}
                    outlineStyle={styles.inputOutline}
                    theme={{ 
                      roundness: 16,
                      colors: { primary: '#58B9D0', outline: '#E8E8E8' }
                    }}
                    left={
                      <TextInput.Icon
                        icon={() => (
                          <MaterialIcons 
                            name="straighten" 
                            size={20} 
                            color="#666" 
                          />
                        )}
                      />
                    }
                  />
                </View>
              </View>

              <TextInput
                mode="outlined"
                label="Daily Feed Count"
                placeholder="e.g. 3"
                value={dailyFeedCount}
                onChangeText={setDailyFeedCount}
                keyboardType="numeric"
                style={styles.textInput}
                contentStyle={styles.inputContent}
                outlineStyle={styles.inputOutline}
                theme={{ 
                  roundness: 16,
                  colors: { primary: '#58B9D0', outline: '#E8E8E8' }
                }}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons 
                        name="restaurant" 
                        size={20} 
                        color="#666" 
                      />
                    )}
                  />
                }
              />
            </View>
          </View>

          {/* Health & Diet Section */}
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <MaterialIcons name="favorite" size={24} color="#58B9D0" style={styles.sectionHeaderIcon} />
              <Text style={styles.sectionHeaderTitle}>Health & Diet</Text>
            </View>

            <View style={styles.inputGroup}>
              <TextInput
                mode="outlined"
                label="Treats"
                placeholder="e.g. Chicken jerky, Carrots"
                value={treats}
                onChangeText={setTreats}
                multiline
                numberOfLines={2}
                style={styles.textInput}
                contentStyle={styles.inputContent}
                outlineStyle={styles.inputOutline}
                theme={{ 
                  roundness: 16,
                  colors: { primary: '#58B9D0', outline: '#E8E8E8' }
                }}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons 
                        name="cookie" 
                        size={20} 
                        color="#666" 
                      />
                    )}
                  />
                }
              />

              <TextInput
                mode="outlined"
                label="Cookies/Snacks"
                placeholder="e.g. Peanut butter"
                value={cookie}
                onChangeText={setCookie}
                multiline
                numberOfLines={2}
                style={styles.textInput}
                contentStyle={styles.inputContent}
                outlineStyle={styles.inputOutline}
                theme={{ 
                  roundness: 16,
                  colors: { primary: '#58B9D0', outline: '#E8E8E8' }
                }}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons 
                        name="cake" 
                        size={20} 
                        color="#666" 
                      />
                    )}
                  />
                }
              />

              <TextInput
                mode="outlined"
                label="Allergies"
                placeholder="e.g. Grain, Dairy"
                value={allergies}
                onChangeText={setAllergies}
                multiline
                numberOfLines={2}
                style={styles.textInput}
                contentStyle={styles.inputContent}
                outlineStyle={styles.inputOutline}
                theme={{ 
                  roundness: 16,
                  colors: { primary: '#58B9D0', outline: '#E8E8E8' }
                }}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons 
                        name="warning" 
                        size={20} 
                        color="#666" 
                      />
                    )}
                  />
                }
              />

              <TextInput
                mode="outlined"
                label="Disability"
                placeholder="e.g. None"
                value={disability}
                onChangeText={setDisability}
                multiline
                numberOfLines={2}
                style={styles.textInput}
                contentStyle={styles.inputContent}
                outlineStyle={styles.inputOutline}
                theme={{ 
                  roundness: 16,
                  colors: { primary: '#58B9D0', outline: '#E8E8E8' }
                }}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons 
                        name="accessible" 
                        size={20} 
                        color="#666" 
                      />
                    )}
                  />
                }
              />
            </View>
          </View>

          {/* Submit Button */}
          <View style={styles.buttonSection}>
            <TouchableOpacity 
              onPress={handleSubmit}
              style={[styles.loginButton, loading && styles.loadingButton]}
              disabled={loading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#58B9D0', '#4A90A4']}
                style={styles.loginButtonGradient}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
              >
                {loading ? (
                  <View style={styles.loginButtonContent}>
                    <ActivityIndicator size="small" color="white" />
                    <Text style={styles.loadingButtonText}>Updating Profile...</Text>
                  </View>
                ) : (
                  <View style={styles.loginButtonContent}>
                    <MaterialIcons name="save" size={24} color="white" />
                    <Text style={styles.loginButtonText}>Update Pet Profile</Text>
                  </View>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  scrollView: {
    flex: 1,
  },
  stickyHeader: {
    backgroundColor: '#F8F9FB',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EBF0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center' as const,
    marginLeft: -22,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: '#1A1D29',
    marginBottom: 2,
    textAlign: 'center' as const,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '400' as const,
    textAlign: 'center' as const,
  },
  headerPlaceholder: {
    width: 44,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F8F9FB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  contentContainer: {
    backgroundColor: '#F8F9FB',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  messageContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center' as const,
  },
  successMessage: {
    backgroundColor: '#4CAF50',
  },
  errorMessage: {
    backgroundColor: '#FF6B6B',
  },
  messageText: {
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center' as const,
    fontWeight: '600' as const,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E8EBF0',
  },
  sectionHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  sectionHeaderIcon: {
    marginRight: 8,
  },
  sectionHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: '#1A1D29',
    flex: 1,
  },
  inputGroup: {
    gap: 16,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    marginBottom: 4,
    borderWidth: 0,
  },
  inputContent: {
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1A1D29',
  },
  inputOutline: {
    borderWidth: 1.5,
    borderColor: '#E8EBF0',
    backgroundColor: '#FFFFFF',
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  rowContainer: {
    flexDirection: 'row' as const,
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  dropdownContainer: {
    marginBottom: 4,
  },
  dropdownLabel: {
    fontSize: 16,
    color: '#1A1D29',
    marginBottom: 8,
    fontWeight: '500' as const,
  },
  dropdown: {
    height: 56,
    borderColor: '#E8EBF0',
    borderWidth: 1.5,
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
  },
  dropdownError: {
    borderColor: '#FF6B6B',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#999',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#1A1D29',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
    fontWeight: '500' as const,
  },
  buttonSection: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    paddingHorizontal: 4,
  },
  loginButton: {
    width: '100%' as const,
    height: responsiveHeight(6.5),
    borderRadius: BORDER_RADIUS.xl,
    marginBottom: spacing.lg,
    ...shadows.md,
    shadowColor: '#58B9D0',
  },
  loadingButton: {
    opacity: 0.7,
  },
  loginButtonGradient: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderRadius: BORDER_RADIUS.xl,
  },
  loginButtonContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingHorizontal: spacing.md,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: FONT_SIZES.xl,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: 0.5,
    marginLeft: spacing.sm,
  },
  loadingButtonText: {
    color: colors.white,
    fontSize: FONT_SIZES.xl,
    fontWeight: typography.fontWeight.bold,
    marginLeft: spacing.sm,
  },
  
  // Profile Photo Section Styles
  profilePhotoSection: {
    marginBottom: 20,
  },
  profilePhotoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center' as const,
    borderWidth: 1,
    borderColor: '#E8EBF0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profilePhotoButton: {
    marginBottom: 16,
  },
  profilePhotoWrapper: {
    position: 'relative' as const,
  },
  profilePhotoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F8F9FB',
  },
  defaultPetImageContainer: {
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: 'rgba(88, 185, 208, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(88, 185, 208, 0.3)',
    borderStyle: 'dashed' as const,
  },
  cameraIconOverlay: {
    position: 'absolute' as const,
    bottom: 8,
    right: 8,
    backgroundColor: '#58B9D0',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  petInfoContainer: {
    alignItems: 'center' as const,
    marginBottom: 12,
  },
  petNameTitle: {
    fontSize: 22,
    fontWeight: 'bold' as const,
    color: '#1A1D29',
    marginBottom: 4,
    textAlign: 'center' as const,
  },
  petCategoryTitle: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500' as const,
    textAlign: 'center' as const,
  },
  photoUploadText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '400' as const,
    textAlign: 'center' as const,
    marginTop: 8,
  },
};

export default EditPet;