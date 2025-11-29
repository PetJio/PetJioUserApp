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
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CustomTextInput from '../../components/CustomTextInput';
import CustomSelect, { SelectOption } from '../../components/CustomSelect';
import CustomDatePicker from '../../components/CustomDatePicker';
import { PetFormSkeleton } from '../../components/SkeletonLoader/SkeletonLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  launchImageLibrary,
  MediaType,
  ImagePickerResponse,
} from 'react-native-image-picker';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { API_CONFIG } from '../../config/api';
import { storageService } from '../../utils/storage';
import { goBack, navigate } from '../../utils/navigationService';
import signupstyles from '../SignUp/signup.styles';
import Icons from '../../../assets/icons';
import boardingstyles from '../Boarding/boarding.styles';
import boardingQuestionStyles from '../BoardingDetails/boardingquestions.styles';
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

interface PetBreed {
  id: number;
  name?: string; // Legacy field
  breedName?: string; // Current API field
  pet?: {
    id: number;
    catName: string;
  };
}

interface FoodOption {
  id: number;
  name: string;
}

interface UploadedFile {
  uri: string;
  type: 'image' | 'video';
  name: string;
  size: number;
  s3Url?: string;
  uploading?: boolean;
  progress?: number;
}

interface ValidationErrors {
  petName?: string;
  category?: string;
  size?: string;
  gender?: string;
  dob?: string;
}

const AddPet: React.FC = () => {
  // Form states
  const [petName, setPetName] = useState('');
  const [dob, setDob] = useState('');
  const [category, setCategory] = useState<number | null>(null);
  const [exoticType, setExoticType] = useState('');
  const [size, setSize] = useState<number | null>(1);
  const [gender, setGender] = useState<number | null>(null);
  const [breed, setBreed] = useState<number | null>(null);
  const [breedOthers, setBreedOthers] = useState('');
  const [weight, setWeight] = useState('');
  const [treats, setTreats] = useState('');
  const [feedCount, setFeedCount] = useState<number | null>(null);
  const [medicalHistory, setMedicalHistory] = useState('');
  const [foodType, setFoodType] = useState<number | null>(null);
  const [favouriteGames, setFavouriteGames] = useState('');
  const [allergies, setAllergies] = useState('');
  const [disability, setDisability] = useState('');
  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [selectedProfileImg, setSelectedProfileImg] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Data states
  const [petCategories, setPetCategories] = useState<PetCategory[]>([]);
  const [petSizes, setPetSizes] = useState<PetSize[]>([]);
  const [petGenders, setPetGenders] = useState<PetGender[]>([]);
  const [petBreeds, setPetBreeds] = useState<PetBreed[]>([]);
  const [foodOptions, setFoodOptions] = useState<FoodOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  console.log(petGenders, petSizes, 'petGenderspetGenders');
  

  const clearFieldError = (field: keyof ValidationErrors) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Fetch breeds based on selected category
  const fetchBreedsByCategory = async (categoryId: number) => {
    try {
      const token = await storageService.getUserToken();
      if (!token) return;

      console.log('🔄 Fetching breeds from API...');
      const response = await fetch(`${API_CONFIG.BASE_URL}/api/breed`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Breeds fetched:', data);

        if (data.body) {
          // Filter breeds based on selected category
          const selectedCat = petCategories.find(c => c.id === categoryId);
          const categoryName = selectedCat?.catName?.toLowerCase();

          const filteredBreeds = data.body.filter((breed: any) =>
            breed.pet?.catName?.toLowerCase() === categoryName
          );

          console.log('📋 Filtered breeds for', categoryName, ':', filteredBreeds);
          setPetBreeds(filteredBreeds);
        }
      }
    } catch (error) {
      console.error('❌ Error fetching breeds:', error);
    }
  };

  // File upload helper functions
  const pickMediaFiles = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission denied',
            'Storage permission is required to access files.',
          );
          return;
        }
      }

      // Check current upload limits
      const imageCount = uploads.filter(f => f.type === 'image').length;
      const videoCount = uploads.filter(f => f.type === 'video').length;

      if (uploads.length >= 5) {
        Alert.alert('Limit Reached', 'Maximum 5 files allowed');
        return;
      }

      const options = {
        mediaType: 'mixed' as MediaType,
        quality: 0.8,
        selectionLimit: 5 - uploads.length,
      };

      launchImageLibrary(options, (response: ImagePickerResponse) => {
        if (response.didCancel || response.errorMessage) {
          return;
        }

        if (response.assets) {
          const newFiles: UploadedFile[] = [];

          for (const asset of response.assets) {
            if (!asset.uri || !asset.fileName || !asset.fileSize) continue;

            const fileType = asset.type?.startsWith('video') ? 'video' : 'image';
            const currentImageCount = imageCount + newFiles.filter(f => f.type === 'image').length;
            const currentVideoCount = videoCount + newFiles.filter(f => f.type === 'video').length;

            // Check file type limits
            if (fileType === 'image' && currentImageCount >= 3) {
              Alert.alert('Limit Reached', 'Maximum 3 images allowed');
              continue;
            }
            if (fileType === 'video' && currentVideoCount >= 2) {
              Alert.alert('Limit Reached', 'Maximum 2 videos allowed');
              continue;
            }

            // Check file size
            const maxSize = fileType === 'image' ? 5 * 1024 * 1024 : 20 * 1024 * 1024; // 5MB for images, 20MB for videos
            if (asset.fileSize > maxSize) {
              Alert.alert(
                'File Too Large',
                `${fileType === 'image' ? 'Images' : 'Videos'} must be less than ${fileType === 'image' ? '5MB' : '20MB'}`,
              );
              continue;
            }

            newFiles.push({
              uri: asset.uri,
              type: fileType,
              name: asset.fileName,
              size: asset.fileSize,
              uploading: false,
              progress: 0,
            });
          }

          if (newFiles.length > 0) {
            setUploads(prev => [...prev, ...newFiles]);
            // Start uploading files
            newFiles.forEach(file => uploadFileToS3(file));
          }
        }
      });
    } catch (error) {
      console.error('Error picking files:', error);
      Alert.alert('Error', 'Failed to open file picker');
    }
  };

  const uploadFileToS3 = async (file: UploadedFile) => {
    try {
      // Mark file as uploading
      setUploads(prev =>
        prev.map(f => (f.uri === file.uri ? { ...f, uploading: true, progress: 0 } : f)),
      );

      const token = await storageService.getUserToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }

      // Generate unique filename
      const timestamp = Date.now();
      const fileExtension = file.name.split('.').pop();
      const fileName = `pet-${file.type}-${timestamp}.${fileExtension}`;
      const fileType = file.type === 'image' ? 'image/jpeg' : 'video/mp4';

      console.log('🔄 Step 1: Getting presigned URL...', { fileName, fileType });

      // Get presigned URL
      const presignedResponse = await fetch(
        `${API_CONFIG.BASE_URL}/api/aws-s3/presigned-url`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileType: fileType,
            fileName: fileName,
          }),
        },
      );

      console.log('📥 Presigned URL Response Status:', presignedResponse.status);

      if (!presignedResponse.ok) {
        const errorText = await presignedResponse.text();
        console.error('❌ Presigned URL Error:', errorText);
        throw new Error(`Failed to get presigned URL: ${presignedResponse.status}`);
      }

      const presignedData = await presignedResponse.json();
      console.log('✅ Presigned URL Response:', presignedData);

      if (presignedData.statusCode === 201 && presignedData.body) {
        const presignedUrl = presignedData.body;
        console.log('🔄 Step 2: Uploading file to S3...');

        // Upload to S3
        const uploadResult = await ReactNativeBlobUtil.fetch(
          'PUT',
          presignedUrl,
          {
            'Content-Type': fileType,
          },
          ReactNativeBlobUtil.wrap(file.uri.replace('file://', '')),
        );

        console.log('📤 Upload Result Status:', uploadResult.info().status);

        if (uploadResult.info().status === 200) {
          const s3Url = presignedUrl.split('?')[0];
          console.log('✅ File successfully uploaded to S3:', s3Url);

          // Update file with S3 URL
          setUploads(prev =>
            prev.map(f =>
              f.uri === file.uri
                ? { ...f, s3Url, uploading: false, progress: 100 }
                : f,
            ),
          );
        } else {
          throw new Error(`Upload failed with status: ${uploadResult.info().status}`);
        }
      } else {
        console.error('❌ Invalid presigned URL response:', presignedData);
        throw new Error('Invalid presigned URL response');
      }
    } catch (error) {
      console.error('🔥 Error uploading file:', error);
      console.error('🔥 Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
      // Mark upload as failed
      setUploads(prev =>
        prev.map(f => (f.uri === file.uri ? { ...f, uploading: false } : f)),
      );
      Alert.alert('Upload Failed', `Failed to upload file: ${error.message}`);
    }
  };

  const removeFile = (uri: string) => {
    setUploads(prev => prev.filter(f => f.uri !== uri));
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
        // Filter to only Cat, Dog, and Exotic from API
        const allowedCategories = ['cat', 'dog', 'exotic'];
        const filteredCategories = (categoriesData.body || []).filter(
          (cat: PetCategory) => allowedCategories.includes(cat.catName?.toLowerCase())
        );

        setPetCategories(filteredCategories);
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

      // Fetch food options
      const foodOptionsUrl = `${API_CONFIG.BASE_URL}/api/boarding-food-options`;
      console.log('🔧 Food options CURL:');
      console.log(`curl -X GET "${foodOptionsUrl}" -H "Authorization: Bearer ${token.substring(0, 20)}..."`);

      const foodOptionsResponse = await fetch(foodOptionsUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('📡 Food options response status:', foodOptionsResponse.status);

      if (foodOptionsResponse.ok) {
        const foodOptionsData = await foodOptionsResponse.json();
        console.log('✅ Food options fetched:', foodOptionsData);
        console.log('🍖 Food options count:', foodOptionsData.body?.length || 0);
        setFoodOptions(foodOptionsData.body || []);
      } else {
        console.error('❌ Food options request failed:', foodOptionsResponse.status);
        const errorText = await foodOptionsResponse.text();
        console.error('❌ Error details:', errorText);
      }

      // Don't fetch breeds initially - they will be fetched when cat/dog is selected
      // Initialize with empty array
      setPetBreeds([]);
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

      // Get category name to check if exotic
      const selectedCategory = petCategories.find(c => c.id === category);
      const isExotic = selectedCategory?.catName?.toLowerCase() === 'exotic';

      // Debug: Log category value
      console.log('🐾 Category ID:', category);
      console.log('🐾 Selected Category:', selectedCategory);
      console.log('🐾 Is Exotic:', isExotic);

      // Prepare pet data in the exact format required by API
      const petData = {
        petName: petName.trim(),
        dob: dob.trim(),
        category: category, // Category ID
        size: size || 1, // Size ID
        ownerId: ownerId,
        profileImg: selectedProfileImg || uploads.find(f => f.type === 'image')?.s3Url || '',
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

        // Navigate to vaccination upload page with pet details
        setTimeout(() => {
          if (responseData.body?.id) {
            navigate('VaccinationUpload', {
              petId: responseData.body.id,
              petName: petName.trim(),
            });
          } else {
            goBack();
          }
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
          
          {/* Skeleton Loader */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, backgroundColor: '#F8F9FB' }}
          >
            <PetFormSkeleton />
          </ScrollView>
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

            <CustomSelect
              label="Category"
              icon="category"
              placeholder="Select Category"
              data={petCategories.map(cat => ({
                label: cat.catName,
                value: cat.id,
              }))}
              value={category}
              onChange={(item) => {
                setCategory(item.value);
                clearFieldError('category');
                // Reset related fields when changing category
                setExoticType('');
                setBreed(null);
                setBreedOthers('');
                setSize(1);

                // Fetch breeds if cat or dog is selected
                const selectedCat = petCategories.find(c => c.id === item.value);
                if (selectedCat?.catName?.toLowerCase() === 'cat' || selectedCat?.catName?.toLowerCase() === 'dog') {
                  fetchBreedsByCategory(item.value);
                } else {
                  // Clear breeds for exotic
                  setPetBreeds([]);
                }
              }}
              error={errors.category}
            />

            {/* Exotic Type field - Only show for Exotic */}
            {category && petCategories.find(c => c.id === category)?.catName?.toLowerCase() === 'exotic' && (
              <CustomTextInput
                label="Exotic Type"
                icon="pets"
                placeholder="e.g. Rabbit, Turtle, Reptile, Fish"
                value={exoticType}
                onChangeText={setExoticType}
              />
            )}

            {/* Size field - Only show for Dogs */}
            {category && petCategories.find(c => c.id === category)?.catName?.toLowerCase() === 'dog' && (
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

            {/* Breed field - Only show for Cat and Dog */}
            {category && (petCategories.find(c => c.id === category)?.catName?.toLowerCase() === 'cat' ||
                         petCategories.find(c => c.id === category)?.catName?.toLowerCase() === 'dog') && (
              <CustomSelect
                label="Breed"
                icon="pets"
                placeholder="Select Breed"
                data={[
                  ...petBreeds.map(b => ({ label: b.breedName || b.name || '', value: b.id })),
                  { label: 'Other', value: 0 }
                ]}
                value={breed}
                onChange={(item) => {
                  setBreed(item.value);
                  // Clear breedOthers if not selecting "Other"
                  if (item.value !== 0) {
                    setBreedOthers('');
                  }
                }}
                maxHeight={300}
              />
            )}

            {/* Breed (Others) field - Only show when "Other" breed is selected */}
            {breed === 0 && (
              <CustomTextInput
                label="Breed (Others)"
                icon="edit"
                placeholder="Enter breed name"
                value={breedOthers}
                onChangeText={setBreedOthers}
              />
            )}

            <CustomTextInput
              label="Weight (kg)"
              icon="monitor-weight"
              placeholder="e.g. 18.5"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
            />

            <CustomSelect
              label="Daily Feed Count"
              icon="restaurant"
              placeholder="Daily Feed Count"
              data={[
                { label: '1', value: 1 },
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: '4', value: 4 },
                { label: '5', value: 5 },
                { label: '6', value: 6 },
              ]}
              value={feedCount}
              onChange={(item) => {
                setFeedCount(item.value);
              }}
            />

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

            <CustomTextInput
              label="Allergies"
              icon="warning"
              placeholder="e.g. Dairy, Nuts"
              value={allergies}
              onChangeText={setAllergies}
              multiline
              numberOfLines={2}
            />

            <CustomTextInput
              label="Disability/Special Needs"
              icon="accessible"
              placeholder="e.g. none, mobility issues"
              value={disability}
              onChangeText={setDisability}
              multiline
              numberOfLines={2}
            />

            <CustomTextInput
              label="Favorite Treats"
              icon="favorite"
              placeholder="e.g. Chicken jerky, Carrots"
              value={treats}
              onChangeText={setTreats}
              multiline
              numberOfLines={2}
            />

            <CustomTextInput
              label="Favourite Games"
              icon="sports-esports"
              placeholder="e.g. Tug, Fetch"
              value={favouriteGames}
              onChangeText={setFavouriteGames}
              multiline
              numberOfLines={2}
            />

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
                        source={{ uri: file.uri }}
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
