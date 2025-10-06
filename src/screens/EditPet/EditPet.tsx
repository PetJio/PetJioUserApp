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
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary, MediaType, ImagePickerResponse } from 'react-native-image-picker';
import ReactNativeBlobUtil from 'react-native-blob-util';
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

interface PetBreed {
  id: number;
  breedName: string;
  pet?: {
    id: number;
    catName: string;
  };
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
  dob?: string;
  ageInYears?: number | null;
  ageInMonths?: number | null;
  category: PetCategory;
  breed?: PetBreed;
  otherBreedName?: string;
  otherPetName?: string;
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
  uploads?: string[];
  medicalHistory?: string | null;
  foodType?: number | null;
  favGames?: string | null;
}

interface ValidationErrors {
  petName?: string;
  dob?: string;
  category?: string;
  size?: string;
  gender?: string;
  exoticType?: string;
  breed?: string;
  breedOthers?: string;
  feedCount?: string;
}

interface EditPetProps extends RootStackNavigationProp<'EditPet'> {}

interface UploadedFile {
  uri: string;
  name: string;
  type: 'image' | 'video';
  size: number;
  s3Url?: string;
  uploading?: boolean;
  uploadProgress?: number;
  error?: string;
}

const EditPet: React.FC<EditPetProps> = ({ route }) => {
  const pet = route?.params?.pet;

  console.log('🔍 Pet data received:', JSON.stringify(pet, null, 2));

  // Format DOB from ISO string to YYYY-MM-DD
  const formatDob = (dobString: string | undefined) => {
    if (!dobString) return '';
    try {
      const date = new Date(dobString);
      return date.toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  // Basic info
  const [petName, setPetName] = useState(pet?.petName || '');
  const [dob, setDob] = useState(formatDob(pet?.dob));
  const [dobDate, setDobDate] = useState<Date>(pet?.dob ? new Date(pet.dob) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Category and breed
  const [category, setCategory] = useState<number | null>(pet?.category?.id || null);
  const [exoticType, setExoticType] = useState(pet?.otherBreedName || pet?.otherPetName || '');
  const [breed, setBreed] = useState<number | null>(pet?.breed?.id || null);
  const [breedOthers, setBreedOthers] = useState('');

  // Other fields
  const [size, setSize] = useState<number | null>(pet?.size?.id || null);
  const [gender, setGender] = useState<number | null>(pet?.gender?.id || null);
  const [weight, setWeight] = useState(pet?.weight ? String(pet.weight) : '');
  const [treats, setTreats] = useState(pet?.treats || '');
  const [allergies, setAllergies] = useState(pet?.allergies || '');
  const [disability, setDisability] = useState(pet?.disability || '');
  const [feedCount, setFeedCount] = useState<number | null>(pet?.dailyFeedCount || null);
  const [medicalHistory, setMedicalHistory] = useState(pet?.medicalHistory || '');
  const [foodType, setFoodType] = useState<number | null>(pet?.foodType || null);
  const [favouriteGames, setFavouriteGames] = useState(pet?.favGames || '');

  console.log('📊 Initial state values:', {
    category,
    size,
    gender,
    breed,
    feedCount,
  });

  // Uploads
  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [selectedProfileImg, setSelectedProfileImg] = useState<string>(pet?.profileImg || '');

  // Dropdown data
  const [petCategories, setPetCategories] = useState<PetCategory[]>([]);
  const [petBreeds, setPetBreeds] = useState<PetBreed[]>([]);
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

    // Load existing uploads
    if (pet.uploads && pet.uploads.length > 0) {
      const existingUploads: UploadedFile[] = pet.uploads.map((url: string) => ({
        uri: url,
        name: url.split('/').pop() || 'file',
        type: url.match(/\.(mp4|mov|avi)$/i) ? 'video' : 'image',
        size: 0,
        s3Url: url,
      }));
      setUploads(existingUploads);
    }
  }, []);

  // Fetch breeds when categories are loaded
  useEffect(() => {
    if (petCategories.length > 0 && pet?.category) {
      const categoryName = pet.category.catName?.toLowerCase();
      if (categoryName === 'cat' || categoryName === 'dog') {
        fetchBreedsByCategory(pet.category.id, petCategories);
      }
    }
  }, [petCategories]);

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
      let categories: PetCategory[] = [];
      if (categoriesRes && categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        categories = categoriesData.body || [];
        setPetCategories(categories);
        console.log('📋 Categories loaded:', categories);
      }

      // Handle sizes
      if (sizesRes && sizesRes.ok) {
        const sizesData = await sizesRes.json();
        const sizes = sizesData.body || [];
        setPetSizes(sizes);
        console.log('📏 Sizes loaded:', sizes);
      }

      // Handle genders
      if (gendersRes && gendersRes.ok) {
        const gendersData = await gendersRes.json();
        const genders = gendersData.body || [];
        setPetGenders(genders);
        console.log('👥 Genders loaded:', genders);
      }

    } catch (error) {
      console.error('Error fetching dropdown data:', error);
      setMessage({type: 'error', text: 'Failed to load form data'});
    } finally {
      setLoadingData(false);
    }
  };

  const fetchBreedsByCategory = async (categoryId: number, categories?: PetCategory[]) => {
    try {
      console.log('🐕 Fetching breeds for category ID:', categoryId);
      const token = await getAuthToken();
      if (!token) {
        console.log('❌ No token found for breed fetch');
        return;
      }

      const response = await fetch(`${API_CONFIG.BASE_URL}/api/breed`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        const categoriesList = categories || petCategories;
        const selectedCat = categoriesList.find(c => c.id === categoryId);
        const categoryName = selectedCat?.catName?.toLowerCase();

        console.log('🔍 Selected category:', selectedCat);
        console.log('📦 All breeds from API:', data.body?.length);

        const filteredBreeds = data.body.filter((breed: PetBreed) =>
          breed.pet?.catName?.toLowerCase() === categoryName
        );

        console.log('✅ Filtered breeds for', categoryName, ':', filteredBreeds.length);

        // Add "Other" option
        const breedsWithOther = [
          ...filteredBreeds,
          { id: 0, breedName: 'Other', pet: selectedCat }
        ];

        setPetBreeds(breedsWithOther);
        console.log('🎯 Breeds set in state:', breedsWithOther.length);
      }
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  const pickMediaFiles = async () => {
    try {
      const result: ImagePickerResponse = await launchImageLibrary({
        mediaType: 'mixed' as MediaType,
        selectionLimit: 5,
        quality: 0.8,
      });

      if (result.didCancel || !result.assets) {
        return;
      }

      const currentImages = uploads.filter(f => f.type === 'image').length;
      const currentVideos = uploads.filter(f => f.type === 'video').length;

      const newFiles: UploadedFile[] = [];
      let imageCount = currentImages;
      let videoCount = currentVideos;

      for (const asset of result.assets) {
        const isVideo = asset.type?.startsWith('video/');
        const fileSize = asset.fileSize || 0;
        const fileSizeMB = fileSize / (1024 * 1024);

        if (isVideo) {
          if (videoCount >= 2) {
            Alert.alert('Limit Reached', 'You can only upload up to 2 videos');
            continue;
          }
          if (fileSizeMB > 20) {
            Alert.alert('File Too Large', `Video ${asset.fileName} exceeds 20MB limit`);
            continue;
          }
          videoCount++;
        } else {
          if (imageCount >= 3) {
            Alert.alert('Limit Reached', 'You can only upload up to 3 images');
            continue;
          }
          if (fileSizeMB > 5) {
            Alert.alert('File Too Large', `Image ${asset.fileName} exceeds 5MB limit`);
            continue;
          }
          imageCount++;
        }

        newFiles.push({
          uri: asset.uri || '',
          name: asset.fileName || `file_${Date.now()}`,
          type: isVideo ? 'video' : 'image',
          size: fileSize,
          uploading: true,
          uploadProgress: 0,
        });
      }

      if (newFiles.length > 0) {
        setUploads(prev => [...prev, ...newFiles]);

        // Upload files to S3
        for (const file of newFiles) {
          uploadFileToS3(file);
        }
      }
    } catch (error) {
      console.error('Error picking files:', error);
      Alert.alert('Error', 'Failed to pick files');
    }
  };

  const uploadFileToS3 = async (file: UploadedFile) => {
    try {
      const token = await getAuthToken();
      if (!token) {
        updateFileStatus(file.uri, { error: 'No auth token', uploading: false });
        return;
      }

      console.log('🔹 Getting presigned URL for:', file.name);

      // Get presigned URL
      const presignedResponse = await fetch(
        `${API_CONFIG.BASE_URL}/api/aws-s3/presigned-url`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fileName: file.name,
            fileType: file.type === 'video' ? 'video/mp4' : 'image/jpeg',
          }),
        }
      );

      if (!presignedResponse.ok) {
        const errorText = await presignedResponse.text();
        console.error('❌ Presigned URL error:', errorText);
        throw new Error('Failed to get presigned URL');
      }

      const presignedData = await presignedResponse.json();
      console.log('✅ Got presigned URL:', presignedData);

      const { uploadUrl, fileUrl } = presignedData.body;

      // Upload to S3
      console.log('📤 Uploading to S3...');
      const uploadResponse = await ReactNativeBlobUtil.fetch(
        'PUT',
        uploadUrl,
        {
          'Content-Type': file.type === 'video' ? 'video/mp4' : 'image/jpeg',
        },
        ReactNativeBlobUtil.wrap(file.uri.replace('file://', ''))
      );

      if (uploadResponse.info().status === 200) {
        console.log('✅ Upload successful, S3 URL:', fileUrl);
        updateFileStatus(file.uri, { s3Url: fileUrl, uploading: false, uploadProgress: 100 });
      } else {
        throw new Error('S3 upload failed');
      }
    } catch (error) {
      console.error('❌ Upload error:', error);
      updateFileStatus(file.uri, {
        error: error instanceof Error ? error.message : 'Upload failed',
        uploading: false
      });
    }
  };

  const updateFileStatus = (uri: string, updates: Partial<UploadedFile>) => {
    setUploads(prev =>
      prev.map(f => (f.uri === uri ? { ...f, ...updates } : f))
    );
  };

  const removeFile = (uri: string) => {
    setUploads(prev => prev.filter(f => f.uri !== uri));
    if (selectedProfileImg === uploads.find(f => f.uri === uri)?.s3Url) {
      setSelectedProfileImg('');
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDobDate(selectedDate);
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDob(formattedDate);
      clearFieldError('dob');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!petName.trim()) {
      newErrors.petName = 'Pet name is required';
    }

    if (!dob.trim()) {
      newErrors.dob = 'Date of birth is required';
    }

    if (!category) {
      newErrors.category = 'Pet category is required';
    }

    const selectedCategory = petCategories.find(c => c.id === category);
    const isExotic = selectedCategory?.catName?.toLowerCase() === 'exotic';
    const isDog = selectedCategory?.catName?.toLowerCase() === 'dog';

    if (isExotic && !exoticType.trim()) {
      newErrors.exoticType = 'Exotic pet type is required';
    }

    if (!isExotic && !breed) {
      newErrors.breed = 'Breed is required';
    }

    if (breed === 0 && !breedOthers.trim()) {
      newErrors.breedOthers = 'Please specify the breed';
    }

    if (isDog && !size) {
      newErrors.size = 'Size is required for dogs';
    }

    if (!gender) {
      newErrors.gender = 'Gender is required';
    }

    if (!feedCount) {
      newErrors.feedCount = 'Daily feed count is required';
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

      const selectedCategory = petCategories.find(c => c.id === category);
      const isExotic = selectedCategory?.catName?.toLowerCase() === 'exotic';

      // Prepare update data in the exact format required by API
      const updateData = {
        petName: petName.trim(),
        dob: dob.trim(),
        category: category, // Category ID
        size: size, // Size ID
        ownerId: pet.ownerId || pet.owner?.id, // Owner ID
        profileImg: selectedProfileImg || uploads.find(f => f.type === 'image')?.s3Url || pet.profileImg || '',
        otherPetName: isExotic ? exoticType.trim() : (breed === 0 ? breedOthers.trim() : ''),
        uploads: uploads.filter(f => f.s3Url).map(f => f.s3Url || ''),
        gender: gender, // Gender ID
        weight: weight.trim() ? parseFloat(weight) : null,
        dailyFeedCount: feedCount || null,
        treats: treats.trim() || '',
        breed: breed === 0 ? null : breed || null, // Breed ID or null
        allergies: allergies.trim() || '',
        disability: disability.trim() || '',
        foodType: foodType || null, // Food type ID
        medicalHistory: medicalHistory.trim() || '',
        favGames: favouriteGames.trim() || '',
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
        setMessage({
          type: 'success',
          text: 'Pet profile updated successfully!',
        });
        setTimeout(() => {
          goBack();
        }, 1500);
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
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#FFFFFF"
          translucent={false}
          animated={true}
        />
        <View style={{ flex: 1 }}>
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

  const selectedCategory = petCategories.find(c => c.id === category);
  const isExotic = selectedCategory?.catName?.toLowerCase() === 'exotic';
  const isDog = selectedCategory?.catName?.toLowerCase() === 'dog';

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />
      <View style={{ flex: 1 }}>
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
            {/* Pet Name */}
            <View>
              <TextInput
                mode="outlined"
                label="Pet Name"
                placeholder="Enter your pet's name"
                value={petName}
                onChangeText={value => {
                  setPetName(value);
                  clearFieldError('petName');
                }}
                left={<TextInput.Icon icon={() => <MaterialIcons name="pets" size={20} color="#58B9D0" />} />}
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
            </View>

            {/* Date of Birth */}
            <View>
              <TouchableOpacity
                onPress={showDatepicker}
                style={{
                  height: 56,
                  borderColor: errors.dob ? '#FF6B6B' : '#E2E2E2',
                  borderWidth: 1,
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <MaterialIcons name="cake" size={20} color="#58B9D0" />
                  <Text style={{ fontSize: 16, color: dob ? '#333' : '#666' }}>
                    {dob || 'Select Date of Birth'}
                  </Text>
                </View>
                <MaterialIcons name="calendar-today" size={20} color="#58B9D0" />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={dobDate}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                  maximumDate={new Date()}
                  minimumDate={new Date(1990, 0, 1)}
                />
              )}
              {errors.dob && (
                <Text style={signupstyles.errorText}>{errors.dob}</Text>
              )}
            </View>

            {/* Category */}
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
                renderLeftIcon={() => <MaterialIcons name="category" size={20} color="#58B9D0" style={{ marginRight: 10 }} />}
                onChange={item => {
                  setCategory(item.value);
                  clearFieldError('category');
                  setExoticType('');
                  setBreed(null);
                  setBreedOthers('');
                  setSize(null);

                  const selectedCat = petCategories.find(c => c.id === item.value);
                  if (selectedCat?.catName?.toLowerCase() === 'cat' || selectedCat?.catName?.toLowerCase() === 'dog') {
                    fetchBreedsByCategory(item.value);
                  } else {
                    setPetBreeds([]);
                  }
                }}
              />
              {errors.category && (
                <Text style={signupstyles.errorText}>{errors.category}</Text>
              )}
            </View>

            {/* Exotic Type (conditional) */}
            {isExotic && (
              <View>
                <TextInput
                  mode="outlined"
                  label="Exotic Pet Type"
                  placeholder="e.g., Rabbit, Hamster, Parrot"
                  value={exoticType}
                  onChangeText={value => {
                    setExoticType(value);
                    clearFieldError('exoticType');
                  }}
                  left={<TextInput.Icon icon={() => <MaterialIcons name="pets" size={20} color="#58B9D0" />} />}
                  theme={{
                    roundness: 12,
                    colors: {
                      primary: '#58B9D0',
                      outline: errors.exoticType ? '#FF6B6B' : '#E2E2E2',
                    },
                  }}
                  error={!!errors.exoticType}
                />
                {errors.exoticType && (
                  <Text style={signupstyles.errorText}>{errors.exoticType}</Text>
                )}
              </View>
            )}

            {/* Breed (conditional - only for cat/dog) */}
            {!isExotic && petBreeds.length > 0 && (
              <View>
                <Dropdown
                  style={[
                    {
                      height: 56,
                      borderColor: errors.breed ? '#FF6B6B' : '#E2E2E2',
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
                  data={petBreeds.map(b => ({ label: b.breedName, value: b.id }))}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Breed"
                  value={breed}
                  renderLeftIcon={() => <MaterialIcons name="pets" size={20} color="#58B9D0" style={{ marginRight: 10 }} />}
                  onChange={item => {
                    setBreed(item.value);
                    clearFieldError('breed');
                    if (item.value !== 0) {
                      setBreedOthers('');
                    }
                  }}
                  search
                  searchPlaceholder="Search breed..."
                />
                {errors.breed && (
                  <Text style={signupstyles.errorText}>{errors.breed}</Text>
                )}
              </View>
            )}

            {/* Breed (Others) - conditional */}
            {breed === 0 && (
              <View>
                <TextInput
                  mode="outlined"
                  label="Breed (Others)"
                  placeholder="Enter breed name"
                  value={breedOthers}
                  onChangeText={value => {
                    setBreedOthers(value);
                    clearFieldError('breedOthers');
                  }}
                  left={<TextInput.Icon icon={() => <MaterialIcons name="edit" size={20} color="#58B9D0" />} />}
                  theme={{
                    roundness: 12,
                    colors: {
                      primary: '#58B9D0',
                      outline: errors.breedOthers ? '#FF6B6B' : '#E2E2E2',
                    },
                  }}
                  error={!!errors.breedOthers}
                />
                {errors.breedOthers && (
                  <Text style={signupstyles.errorText}>{errors.breedOthers}</Text>
                )}
              </View>
            )}

            {/* Size (conditional - only for dogs) */}
            {isDog && (
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
                  renderLeftIcon={() => <MaterialIcons name="straighten" size={20} color="#58B9D0" style={{ marginRight: 10 }} />}
                  onChange={item => {
                    setSize(item.value);
                    clearFieldError('size');
                  }}
                />
                {errors.size && (
                  <Text style={signupstyles.errorText}>{errors.size}</Text>
                )}
              </View>
            )}

            {/* Gender */}
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
                renderLeftIcon={() => <MaterialIcons name="wc" size={20} color="#58B9D0" style={{ marginRight: 10 }} />}
                onChange={item => {
                  setGender(item.value);
                  clearFieldError('gender');
                }}
              />
              {errors.gender && (
                <Text style={signupstyles.errorText}>{errors.gender}</Text>
              )}
            </View>

            {/* Weight */}
            <View>
              <TextInput
                mode="outlined"
                label="Weight (kg)"
                placeholder="e.g. 18.5"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
                left={<TextInput.Icon icon={() => <MaterialIcons name="monitor-weight" size={20} color="#58B9D0" />} />}
                theme={{
                  roundness: 12,
                  colors: { primary: '#58B9D0', outline: '#E2E2E2' },
                }}
              />
            </View>

            {/* Daily Feed Count */}
            <View>
              <Dropdown
                style={[
                  {
                    height: 56,
                    borderColor: errors.feedCount ? '#FF6B6B' : '#E2E2E2',
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
                data={[
                  { label: '1 time', value: 1 },
                  { label: '2 times', value: 2 },
                  { label: '3 times', value: 3 },
                  { label: '4 times', value: 4 },
                  { label: '5 times', value: 5 },
                  { label: '6 times', value: 6 },
                ]}
                labelField="label"
                valueField="value"
                placeholder="Select Daily Feed Count"
                value={feedCount}
                renderLeftIcon={() => <MaterialIcons name="restaurant" size={20} color="#58B9D0" style={{ marginRight: 10 }} />}
                onChange={item => {
                  setFeedCount(item.value);
                  clearFieldError('feedCount');
                }}
              />
              {errors.feedCount && (
                <Text style={signupstyles.errorText}>{errors.feedCount}</Text>
              )}
            </View>

            {/* Allergies */}
            <View>
              <TextInput
                mode="outlined"
                label="Allergies"
                placeholder="e.g. Dairy, Nuts"
                value={allergies}
                onChangeText={setAllergies}
                multiline
                numberOfLines={2}
                left={<TextInput.Icon icon={() => <MaterialIcons name="warning" size={20} color="#58B9D0" />} />}
                theme={{
                  roundness: 12,
                  colors: { primary: '#58B9D0', outline: '#E2E2E2' },
                }}
              />
            </View>

            {/* Disability */}
            <View>
              <TextInput
                mode="outlined"
                label="Disability/Special Needs"
                placeholder="e.g. none, mobility issues"
                value={disability}
                onChangeText={setDisability}
                multiline
                numberOfLines={2}
                left={<TextInput.Icon icon={() => <MaterialIcons name="accessible" size={20} color="#58B9D0" />} />}
                theme={{
                  roundness: 12,
                  colors: { primary: '#58B9D0', outline: '#E2E2E2' },
                }}
              />
            </View>

            {/* Treats */}
            <View>
              <TextInput
                mode="outlined"
                label="Favorite Treats"
                placeholder="e.g. Chicken jerky, Carrots"
                value={treats}
                onChangeText={setTreats}
                multiline
                numberOfLines={2}
                left={<TextInput.Icon icon={() => <MaterialIcons name="cookie" size={20} color="#58B9D0" />} />}
                theme={{
                  roundness: 12,
                  colors: { primary: '#58B9D0', outline: '#E2E2E2' },
                }}
              />
            </View>

            {/* Photo/Video Upload Section */}
            <View style={{
              marginTop: responsiveHeight(2),
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: '#E5E7EB',
            }}>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <MaterialIcons name="cloud-upload" size={24} color="#58B9D0" />
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#1F2937',
                  }}>
                    Photos & Videos
                  </Text>
                </View>
                <Text style={{
                  fontSize: 12,
                  color: '#6B7280',
                }}>
                  {uploads.length}/5
                </Text>
              </View>

              <Text style={{
                fontSize: 13,
                color: '#6B7280',
                marginBottom: 8,
                lineHeight: 18,
              }}>
                Upload up to 3 images (max 5MB each) and 2 videos (max 20MB each)
              </Text>
              <Text style={{
                fontSize: 12,
                color: '#FF9800',
                marginBottom: 12,
                lineHeight: 16,
                fontWeight: '500',
              }}>
                ⭐ Tap the star icon on any image to set it as profile picture
              </Text>

              {/* Upload Grid */}
              <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                marginHorizontal: -4,
              }}>
                {uploads.map((file, index) => (
                  <View
                    key={index}
                    style={{
                      width: '31.33%',
                      aspectRatio: 1,
                      marginHorizontal: '1%',
                      marginBottom: 8,
                      borderRadius: 12,
                      overflow: 'hidden',
                      position: 'relative',
                      backgroundColor: '#F8F9FB',
                      borderWidth: selectedProfileImg === file.s3Url ? 3 : 0,
                      borderColor: '#FFD700',
                    }}
                  >
                    {file.type === 'image' ? (
                      <Image
                        source={{ uri: file.s3Url || file.uri }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#1F2937',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                        <MaterialIcons name="videocam" size={32} color="#FFFFFF" />
                        <Text style={{
                          fontSize: 10,
                          color: '#FFFFFF',
                          marginTop: 4,
                        }}>
                          VIDEO
                        </Text>
                      </View>
                    )}

                    {/* Uploading Overlay */}
                    {file.uploading && (
                      <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                        <ActivityIndicator size="small" color="#FFFFFF" />
                        <Text style={{
                          fontSize: 10,
                          color: '#FFFFFF',
                          marginTop: 4,
                        }}>
                          Uploading...
                        </Text>
                      </View>
                    )}

                    {/* Upload Success */}
                    {file.s3Url && !file.uploading && (
                      <View style={{
                        position: 'absolute',
                        top: 4,
                        left: 4,
                        backgroundColor: '#10B981',
                        borderRadius: 12,
                        padding: 4,
                      }}>
                        <MaterialIcons name="check" size={12} color="#FFFFFF" />
                      </View>
                    )}

                    {/* Set as Profile Button - Only for images */}
                    {file.type === 'image' && file.s3Url && !file.uploading && (
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedProfileImg(file.s3Url === selectedProfileImg ? '' : file.s3Url || '');
                        }}
                        style={{
                          position: 'absolute',
                          bottom: 4,
                          right: 4,
                          backgroundColor: selectedProfileImg === file.s3Url ? '#FFD700' : 'rgba(0, 0, 0, 0.6)',
                          borderRadius: 12,
                          padding: 6,
                        }}
                      >
                        <MaterialIcons
                          name={selectedProfileImg === file.s3Url ? 'star' : 'star-border'}
                          size={14}
                          color="#FFFFFF"
                        />
                      </TouchableOpacity>
                    )}

                    {/* Remove Button */}
                    <TouchableOpacity
                      onPress={() => {
                        // Clear profile image selection if removing the selected profile image
                        if (selectedProfileImg === file.s3Url) {
                          setSelectedProfileImg('');
                        }
                        removeFile(file.uri);
                      }}
                      style={{
                        position: 'absolute',
                        top: 4,
                        right: 4,
                        backgroundColor: '#EF4444',
                        borderRadius: 12,
                        padding: 4,
                      }}
                    >
                      <MaterialIcons name="close" size={12} color="#FFFFFF" />
                    </TouchableOpacity>

                    {/* File Type Badge */}
                    <View style={{
                      position: 'absolute',
                      bottom: 4,
                      left: 4,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      borderRadius: 6,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                    }}>
                      <Text style={{
                        fontSize: 9,
                        color: '#FFFFFF',
                        fontWeight: '600',
                      }}>
                        {file.type === 'image' ? 'IMG' : 'VID'}
                      </Text>
                    </View>
                  </View>
                ))}

                {/* Add Button */}
                {uploads.length < 5 && (
                  <TouchableOpacity
                    onPress={pickMediaFiles}
                    style={{
                      width: '31.33%',
                      aspectRatio: 1,
                      marginHorizontal: '1%',
                      marginBottom: 8,
                      borderRadius: 12,
                      borderWidth: 2,
                      borderColor: '#58B9D0',
                      borderStyle: 'dashed',
                      backgroundColor: 'rgba(88, 185, 208, 0.05)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <MaterialIcons name="add" size={28} color="#58B9D0" />
                    <Text style={{
                      fontSize: 10,
                      color: '#58B9D0',
                      marginTop: 4,
                      fontWeight: '500',
                    }}>
                      Add
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Upload Stats */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 12,
                paddingTop: 12,
                borderTopWidth: 1,
                borderTopColor: '#F3F4F6',
              }}>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{
                    fontSize: 12,
                    color: '#6B7280',
                    marginBottom: 2,
                  }}>
                    Images
                  </Text>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#58B9D0',
                  }}>
                    {uploads.filter(f => f.type === 'image').length}/3
                  </Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                  <Text style={{
                    fontSize: 12,
                    color: '#6B7280',
                    marginBottom: 2,
                  }}>
                    Videos
                  </Text>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#58B9D0',
                  }}>
                    {uploads.filter(f => f.type === 'video').length}/2
                  </Text>
                </View>
              </View>
            </View>
          </View>
          </View>

          {/* Submit Button */}
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

export default EditPet;
