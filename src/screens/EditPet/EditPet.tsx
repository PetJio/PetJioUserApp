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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomTextInput from '../../components/CustomTextInput';
import CustomSelect, { SelectOption } from '../../components/CustomSelect';
import CustomDatePicker from '../../components/CustomDatePicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import VaccinationDisplay from '../../components/VaccinationDisplay/VaccinationDisplay';
import { PetFormSkeleton } from '../../components/SkeletonLoader/SkeletonLoader';
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
  name?: string; // Legacy field
  breedName?: string; // Current API field
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

interface FoodOption {
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
  const [foodType, setFoodType] = useState<number | null>(
    typeof pet?.foodType === 'object' && pet?.foodType?.id
      ? pet.foodType.id
      : (typeof pet?.foodType === 'number' ? pet.foodType : null)
  );
  const [favouriteGames, setFavouriteGames] = useState(pet?.favGames || '');

  console.log('📊 Initial state values:', {
    category,
    size,
    gender,
    breed,
    feedCount,
    foodType,
  });
  console.log('🍖 FoodType from pet data:', pet?.foodType);
  console.log('🍖 FoodType state value:', foodType);

  // Uploads
  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [selectedProfileImg, setSelectedProfileImg] = useState<string>(pet?.profileImg || '');

  // Dropdown data
  const [petCategories, setPetCategories] = useState<PetCategory[]>([]);
  const [petBreeds, setPetBreeds] = useState<PetBreed[]>([]);
  const [petSizes, setPetSizes] = useState<PetSize[]>([]);
  const [petGenders, setPetGenders] = useState<PetGender[]>([]);
  const [foodOptions, setFoodOptions] = useState<FoodOption[]>([]);

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

  const fetchDropdownData = async (retryCount = 0) => {
    setLoadingData(true);
    try {
      const token = await getAuthToken();
      if (!token) {
        Alert.alert('Error', 'Please login to continue');
        setLoadingData(false);
        return;
      }

      console.log('🔄 Fetching dropdown data from:', API_CONFIG.BASE_URL);
      console.log('🔑 Using token:', token ? `${token.substring(0, 20)}...` : 'None');

      // Generate CURL commands for debugging
      const categoriesUrl = `${API_CONFIG.BASE_URL}/api/pet-category`;
      const sizesUrl = `${API_CONFIG.BASE_URL}/api/pet-size`;
      const gendersUrl = `${API_CONFIG.BASE_URL}/api/gender`;

      console.log('\n📋 CURL for Categories:');
      console.log(`curl -X GET "${categoriesUrl}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "Content-Type: application/json"`);

      console.log('\n📏 CURL for Sizes:');
      console.log(`curl -X GET "${sizesUrl}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "Content-Type: application/json"`);

      console.log('\n👥 CURL for Genders:');
      console.log(`curl -X GET "${gendersUrl}" \\
  -H "Authorization: Bearer ${token}" \\
  -H "Content-Type: application/json"\n`);

      // Fetch categories, sizes, and genders in parallel with better error handling
      const [categoriesRes, sizesRes, gendersRes] = await Promise.all([
        fetch(categoriesUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }).catch(err => {
          console.error('❌ Categories fetch error:', err);
          console.error('❌ Categories error details:', JSON.stringify(err, null, 2));
          return null;
        }),
        fetch(sizesUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }).catch(err => {
          console.error('❌ Sizes fetch error:', err);
          console.error('❌ Sizes error details:', JSON.stringify(err, null, 2));
          return null;
        }),
        fetch(gendersUrl, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        }).catch(err => {
          console.error('❌ Genders fetch error:', err);
          console.error('❌ Genders error details:', JSON.stringify(err, null, 2));
          return null;
        }),
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
        console.log('📏 Raw sizes response:', sizesData);
        const sizes = sizesData.body || [];
        setPetSizes(sizes);
        console.log('📏 Sizes loaded:', sizes);
        console.log('📏 Sizes array length:', sizes.length);
      } else {
        console.error('❌ Sizes request failed:', sizesRes?.status, sizesRes?.statusText);
      }

      // Handle genders
      if (gendersRes && gendersRes.ok) {
        const gendersData = await gendersRes.json();
        console.log('👥 Raw genders response:', gendersData);
        const genders = gendersData.body || [];
        setPetGenders(genders);
        console.log('👥 Genders loaded:', genders);
        console.log('👥 Genders array length:', genders.length);
      } else {
        console.error('❌ Genders request failed:', gendersRes?.status, gendersRes?.statusText);
      }

      // Fetch food options
      const foodOptionsUrl = `${API_CONFIG.BASE_URL}/api/boarding-food-options`;
      console.log('🔧 Food options CURL:');
      console.log(`curl -X GET "${foodOptionsUrl}" -H "Authorization: Bearer ${token.substring(0, 20)}..."`);

      const foodOptionsRes = await fetch(foodOptionsUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }).catch(err => {
        console.error('❌ Food options fetch error:', err);
        return null;
      });

      console.log('📡 Food options response status:', foodOptionsRes?.status);

      if (foodOptionsRes && foodOptionsRes.ok) {
        const foodOptionsData = await foodOptionsRes.json();
        console.log('🍖 Food options loaded:', foodOptionsData);
        console.log('🍖 Food options count:', foodOptionsData.body?.length || 0);
        console.log('🍖 Food options array:', foodOptionsData.body);
        setFoodOptions(foodOptionsData.body || []);

        // Log after setting food options
        console.log('🍖 Current foodType state:', foodType);
        console.log('🍖 Should auto-select foodType:', foodType);
      } else {
        console.error('❌ Food options request failed:', foodOptionsRes?.status);
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
      newErrors.category = 'Please select a category';
    }

    if (!gender) {
      newErrors.gender = 'Please select a gender';
    }

    // Size is required only for dogs
    const isDog = petCategories.find(c => c.id === category)?.catName?.toLowerCase() === 'dog';
    if (isDog && !size) {
      newErrors.size = 'Please select a size for dog';
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
        foodType: typeof foodType === 'number' ? foodType : null, // Food type ID - ensure it's a number
        medicalHistory: medicalHistory.trim() || '',
        favGames: favouriteGames.trim() || '',
      };

      console.log('🔍 Debug foodType value:', foodType);
      console.log('🔍 Debug foodType type:', typeof foodType);
      console.log('Updating pet profile with data:', updateData);

      // Generate CURL command for debugging
      const updateUrl = `${API_CONFIG.BASE_URL}/api/pet-profile/${pet.id}`;
      const curlCommand = `curl -X PATCH "${updateUrl}" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${token}" \\
  -d '${JSON.stringify(updateData, null, 2)}' \\
  -v`;

      console.log('🔧 Update Pet CURL Command:');
      console.log('=====================================');
      console.log(curlCommand);
      console.log('=====================================');

      const response = await fetch(updateUrl, {
        method: 'PATCH',
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
        <ScrollView 
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <PetFormSkeleton />
        </ScrollView>
      </View>
    </View>
  );
}  const selectedCategory = petCategories.find(c => c.id === category);
  const isExotic = selectedCategory?.catName?.toLowerCase() === 'exotic';
  const isDog = selectedCategory?.catName?.toLowerCase() === 'dog';

  console.log('🔍 Render - petSizes state:', petSizes);
  console.log('🔍 Render - petGenders state:', petGenders);
  console.log('🔍 Render - current size value:', size);
  console.log('🔍 Render - current gender value:', gender);

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
            <CustomTextInput
              label="Pet Name"
              icon="pets"
              placeholder="Enter your pet's name"
              value={petName}
              onChangeText={(value: string) => {
                setPetName(value);
                clearFieldError('petName');
              }}
              error={errors.petName}
            />

            {/* Date of Birth */}
            <CustomDatePicker
              label="Date of Birth"
              icon="cake"
              placeholder="Select Date of Birth"
              value={dob}
              onChange={(dateString) => {
                setDob(dateString);
                clearFieldError('dob');
              }}
              error={errors.dob}
              maximumDate={new Date()}
              minimumDate={new Date(1990, 0, 1)}
            />

            {/* Category */}
            <CustomSelect
              label="Category"
              icon="category"
              placeholder="Select Category"
              data={petCategories.map(cat => ({ label: cat.catName, value: cat.id }))}
              value={category}
              onChange={(item) => {
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
              error={errors.category}
            />

            {/* Exotic Type (conditional) */}
            {isExotic && (
              <CustomTextInput
                label="Exotic Pet Type"
                icon="pets"
                placeholder="e.g., Rabbit, Hamster, Parrot"
                value={exoticType}
                onChangeText={(value: string) => {
                  setExoticType(value);
                  clearFieldError('exoticType');
                }}
                error={errors.exoticType}
              />
            )}

            {/* Breed (conditional - only for cat/dog) */}
            {!isExotic && petBreeds.length > 0 && (
              <CustomSelect
                label="Breed"
                icon="pets"
                placeholder="Select Breed"
                data={petBreeds.map(b => ({ label: b.breedName || b.name || '', value: b.id }))}
                value={breed}
                onChange={(item) => {
                  setBreed(item.value);
                  clearFieldError('breed');
                  if (item.value !== 0) {
                    setBreedOthers('');
                  }
                }}
                error={errors.breed}
              />
            )}

            {/* Breed (Others) - conditional */}
            {breed === 0 && (
              <CustomTextInput
                label="Breed (Others)"
                icon="edit"
                placeholder="Enter breed name"
                value={breedOthers}
                onChangeText={(value: string) => {
                  setBreedOthers(value);
                  clearFieldError('breedOthers');
                }}
                error={errors.breedOthers}
              />
            )}

            {/* Size (conditional - only for dogs) */}
            {isDog && (
              <CustomSelect
                label="Size"
                icon="photo-size-select-large"
                placeholder="Select Size"
                data={petSizes.map(s => ({ label: s.size, value: s.id }))}
                value={size}
                onChange={(item) => {
                  setSize(item.value);
                  clearFieldError('size');
                }}
                error={errors.size}
              />
            )}

            {/* Gender */}
            <CustomSelect
              label="Gender"
              icon="wc"
              placeholder="Select Gender"
              data={petGenders.map(g => ({ label: g.name, value: g.id }))}
              value={gender}
              onChange={(item) => {
                setGender(item.value);
                clearFieldError('gender');
              }}
              error={errors.gender}
            />

            {/* Weight */}
            <CustomTextInput
              label="Weight (kg)"
              icon="monitor-weight"
              placeholder="e.g. 18.5"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />

            {/* Daily Feed Count */}
            <CustomSelect
              label="Daily Feed Count"
              icon="restaurant"
              placeholder="Select Daily Feed Count"
              data={[
                { label: '1 time', value: 1 },
                { label: '2 times', value: 2 },
                { label: '3 times', value: 3 },
                { label: '4 times', value: 4 },
                { label: '5 times', value: 5 },
                { label: '6 times', value: 6 },
              ]}
              value={feedCount}
              onChange={(item) => {
                setFeedCount(item.value);
                clearFieldError('feedCount');
              }}
              error={errors.feedCount}
            />

            {/* Food Type */}
            <CustomSelect
              label="Food Type"
              icon="fastfood"
              placeholder="Food Type"
              data={foodOptions.map(f => ({ label: f.name, value: f.id }))}
              value={foodType}
              onChange={(item) => {
                setFoodType(item.value);
              }}
            />

            {/* Allergies */}
            <CustomTextInput
              label="Allergies"
              icon="warning"
              placeholder="e.g. Dairy, Nuts"
              value={allergies}
              onChangeText={setAllergies}
              multiline
              numberOfLines={2}
            />

            {/* Disability */}
            <CustomTextInput
              label="Disability/Special Needs"
              icon="accessible"
              placeholder="e.g. none, mobility issues"
              value={disability}
              onChangeText={setDisability}
              multiline
              numberOfLines={2}
            />

            {/* Treats */}
            <CustomTextInput
              label="Favorite Treats"
              icon="favorite"
              placeholder="e.g. Chicken jerky, Carrots"
              value={treats}
              onChangeText={setTreats}
              multiline
              numberOfLines={2}
            />

            {/* Favourite Games */}
            <CustomTextInput
              label="Favourite Games"
              icon="sports-esports"
              placeholder="e.g. Tug, Fetch"
              value={favouriteGames}
              onChangeText={setFavouriteGames}
              multiline
              numberOfLines={2}
            />

            {/* Medical History */}
            <CustomTextInput
              label="Medical History"
              icon="medical-services"
              placeholder="Any medical conditions or treatments"
              value={medicalHistory}
              onChangeText={setMedicalHistory}
              multiline
              numberOfLines={3}
            />

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
                <View style={{ alignItems: 'center' }}>
                  <Text style={{
                    fontSize: 12,
                    color: '#6B7280',
                    marginBottom: 2,
                  }}>
                    Uploaded
                  </Text>
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#10B981',
                  }}>
                    {uploads.filter(f => f.s3Url).length}/{uploads.length}
                  </Text>
                </View>
              </View>
            </View>

            {/* Vaccination Records */}
            <View style={{ marginTop: responsiveHeight(2) }}>
              <VaccinationDisplay petId={pet.id} petName={pet.petName} />
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
