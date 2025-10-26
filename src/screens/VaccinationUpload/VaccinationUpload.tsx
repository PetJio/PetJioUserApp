import React, { useState } from 'react';
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
import { TextInput } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import ReactNativeBlobUtil from 'react-native-blob-util';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { API_CONFIG } from '../../config/api';
import { storageService } from '../../utils/storage';
import { goBack, navigate } from '../../utils/navigationService';
import { RootStackNavigationProp } from '../../types/navigation';
import {
  readVaccinationData,
  createVaccination,
  VaccinationData,
} from '../../services/vaccinationService';
import signupstyles from '../SignUp/signup.styles';
import Icons from '../../../assets/icons';
import boardingQuestionStyles from '../BoardingQuestions/boardingquestions.styles';
import serviceStyles from '../Service/styles';

interface VaccinationUploadProps extends RootStackNavigationProp<'VaccinationUpload'> {}

interface CertificateItem {
  uri: string;
  name: string;
  s3Url?: string;
  uploading?: boolean;
  extractedData?: VaccinationData;
  extracting?: boolean;
  vaccineName: string;
  date: string;
  expiry: string;
}

const VaccinationUpload: React.FC<VaccinationUploadProps> = ({ route }) => {
  const petId = route?.params?.petId;
  const petName = route?.params?.petName;

  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showDatePicker, setShowDatePicker] = useState<number | null>(null);
  const [showExpiryPicker, setShowExpiryPicker] = useState<number | null>(null);

  const pickCertificateImage = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert(
            'Permission denied',
            'Storage permission is required to access files.'
          );
          return;
        }
      }

      const result: ImagePickerResponse = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      });

      if (result.didCancel || !result.assets || result.assets.length === 0) {
        return;
      }

      const asset = result.assets[0];
      if (!asset.uri || !asset.fileName) return;

      // Check file size (max 5MB)
      if (asset.fileSize && asset.fileSize > 5 * 1024 * 1024) {
        Alert.alert('File Too Large', 'Certificate image must be less than 5MB');
        return;
      }

      const newCertificate: CertificateItem = {
        uri: asset.uri,
        name: asset.fileName,
        uploading: true,
        extracting: false,
        vaccineName: '',
        date: '',
        expiry: '',
      };

      setCertificates(prev => [...prev, newCertificate]);

      // Upload to S3 first
      await uploadCertificateToS3(asset.uri, asset.fileName);
    } catch (error) {
      console.error('Error picking certificate:', error);
      Alert.alert('Error', 'Failed to pick certificate image');
    }
  };

  const uploadCertificateToS3 = async (uri: string, fileName: string) => {
    try {
      const token = await storageService.getUserToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }

      console.log('🔄 Uploading certificate to S3:', fileName);

      // Get presigned URL
      const timestamp = Date.now();
      const s3FileName = `vaccination-cert-${timestamp}.jpg`;

      const presignedResponse = await fetch(
        `${API_CONFIG.BASE_URL}/api/aws-s3/presigned-url`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fileType: 'image/jpeg',
            fileName: s3FileName,
          }),
        }
      );

      if (!presignedResponse.ok) {
        throw new Error('Failed to get presigned URL');
      }

      const presignedData = await presignedResponse.json();

      if (presignedData.statusCode === 201 && presignedData.body) {
        const presignedUrl = presignedData.body;

        // Upload to S3
        const uploadResult = await ReactNativeBlobUtil.fetch(
          'PUT',
          presignedUrl,
          { 'Content-Type': 'image/jpeg' },
          ReactNativeBlobUtil.wrap(uri.replace('file://', ''))
        );

        if (uploadResult.info().status === 200) {
          const s3Url = presignedUrl.split('?')[0];
          console.log('✅ Certificate uploaded to S3:', s3Url);
          console.log('📝 S3 filename used:', s3FileName);

          // Update certificate with S3 URL
          setCertificates(prev =>
            prev.map(cert =>
              cert.uri === uri
                ? { ...cert, s3Url, uploading: false, extracting: true }
                : cert
            )
          );

          // Extract data from image using OCR
          // Pass the S3 filename (not the full URL) to the OCR API
          await extractDataFromCertificate(uri, s3FileName);
        } else {
          throw new Error('S3 upload failed');
        }
      }
    } catch (error) {
      console.error('❌ Upload error:', error);
      setCertificates(prev =>
        prev.map(cert =>
          cert.uri === uri ? { ...cert, uploading: false } : cert
        )
      );
      Alert.alert('Upload Failed', 'Failed to upload certificate');
    }
  };

  const extractDataFromCertificate = async (uri: string, s3FileName: string) => {
    try {
      console.log('🔍 Extracting data from certificate...');
      console.log('🔍 S3 filename:', s3FileName);

      // Send the filename directly to the OCR API
      const extractedData = await readVaccinationData(s3FileName);

      console.log('✅ Extracted data:', extractedData);

      // Update certificate with extracted data
      setCertificates(prev =>
        prev.map(cert =>
          cert.uri === uri
            ? {
                ...cert,
                extracting: false,
                extractedData,
                vaccineName: extractedData.vaccineName || '',
                date: extractedData.date || '',
                expiry: extractedData.expiry || '',
              }
            : cert
        )
      );
    } catch (error) {
      console.error('❌ Extraction error:', error);
      setCertificates(prev =>
        prev.map(cert =>
          cert.uri === uri ? { ...cert, extracting: false } : cert
        )
      );
      Alert.alert(
        'Extraction Failed',
        'Could not extract data from certificate. Please enter manually.'
      );
    }
  };

  const removeCertificate = (uri: string) => {
    setCertificates(prev => prev.filter(cert => cert.uri !== uri));
  };

  const updateCertificateField = (
    uri: string,
    field: 'vaccineName' | 'date' | 'expiry',
    value: string
  ) => {
    setCertificates(prev =>
      prev.map(cert => (cert.uri === uri ? { ...cert, [field]: value } : cert))
    );
  };

  const handleDateChange = (uri: string, selectedDate?: Date) => {
    setShowDatePicker(null);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      updateCertificateField(uri, 'date', formattedDate);
    }
  };

  const handleExpiryChange = (uri: string, selectedDate?: Date) => {
    setShowExpiryPicker(null);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      updateCertificateField(uri, 'expiry', formattedDate);
    }
  };

  const handleSaveAll = async () => {
    if (certificates.length === 0) {
      Alert.alert('No Certificates', 'Please upload at least one certificate or skip this step.');
      return;
    }

    // Validate all certificates
    for (const cert of certificates) {
      if (!cert.vaccineName.trim()) {
        Alert.alert('Incomplete Data', 'Please enter vaccine name for all certificates');
        return;
      }
      if (!cert.date.trim()) {
        Alert.alert('Incomplete Data', 'Please enter vaccination date for all certificates');
        return;
      }
      if (!cert.s3Url) {
        Alert.alert('Upload Pending', 'Please wait for all uploads to complete');
        return;
      }
    }

    setLoading(true);
    try {
      console.log('💾 Saving all vaccination records...');

      // Save each certificate
      for (const cert of certificates) {
        await createVaccination({
          vaccineName: cert.vaccineName.trim(),
          date: cert.date.trim(),
          expiry: cert.expiry.trim() || null,
          petId: petId,
          uploadUrl: cert.s3Url!,
        });
      }

      setMessage({
        type: 'success',
        text: `${certificates.length} vaccination record(s) saved successfully!`,
      });

      setTimeout(() => {
        // Navigate to Main tab navigator and then to Profile tab
        navigate('Main');
        // Small delay to ensure Main is loaded before navigating to Profile
        setTimeout(() => {
          navigate('Profile');
        }, 100);
      }, 1500);
    } catch (error) {
      console.error('Error saving vaccinations:', error);
      setMessage({
        type: 'error',
        text: 'Failed to save vaccination records',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Vaccination Upload',
      'You can add vaccination certificates later from the Edit Pet screen.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Skip',
          onPress: () => {
            // Navigate to Main tab navigator and then to Profile tab
            navigate('Main');
            setTimeout(() => {
              navigate('Profile');
            }, 100);
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F9FB' }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
        animated={true}
      />
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={serviceStyles.stickyHeader}>
          <TouchableOpacity onPress={goBack} style={{ marginRight: 16 }}>
            <Image
              source={Icons.LeftArrow}
              style={{ tintColor: '#000000', width: 20, height: 20 }}
            />
          </TouchableOpacity>
          <View style={serviceStyles.headerTitleContainer}>
            <Text style={serviceStyles.stickyHeaderTitle}>
              Vaccination Certificates
            </Text>
            <Text style={serviceStyles.stickyHeaderSubtitle}>
              Upload certificates for {petName}
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

          {/* Instructions */}
          <View
            style={{
              backgroundColor: '#E3F2FD',
              borderRadius: 12,
              padding: 16,
              marginBottom: 20,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <MaterialIcons name="info" size={20} color="#1976D2" />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#1976D2',
                  marginLeft: 8,
                }}
              >
                How it works
              </Text>
            </View>
            <Text style={{ fontSize: 14, color: '#555', lineHeight: 20 }}>
              1. Upload vaccination certificate images{'\n'}
              2. We'll automatically extract the data{'\n'}
              3. Review and edit if needed{'\n'}
              4. Save all certificates
            </Text>
          </View>

          {/* Certificates List */}
          {certificates.map((cert, index) => (
            <View
              key={cert.uri}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: '#E5E7EB',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#1F2937' }}>
                  Certificate {index + 1}
                </Text>
                <TouchableOpacity
                  onPress={() => removeCertificate(cert.uri)}
                  style={{
                    backgroundColor: '#FEE2E2',
                    borderRadius: 20,
                    padding: 6,
                  }}
                >
                  <MaterialIcons name="delete" size={18} color="#EF4444" />
                </TouchableOpacity>
              </View>

              {/* Certificate Image */}
              <View
                style={{
                  width: '100%',
                  height: 150,
                  borderRadius: 8,
                  overflow: 'hidden',
                  marginBottom: 12,
                  backgroundColor: '#F3F4F6',
                }}
              >
                <Image
                  source={{ uri: cert.uri }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
                {(cert.uploading || cert.extracting) && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <ActivityIndicator size="large" color="#FFFFFF" />
                    <Text style={{ fontSize: 12, color: '#FFFFFF', marginTop: 8 }}>
                      {cert.uploading
                        ? 'Uploading...'
                        : cert.extracting
                        ? 'Extracting data...'
                        : ''}
                    </Text>
                  </View>
                )}
              </View>

              {/* Form Fields */}
              <View style={{ gap: 12 }}>
                <TextInput
                  mode="outlined"
                  label="Vaccine Name *"
                  placeholder="e.g., Rabies, DHPP"
                  value={cert.vaccineName}
                  onChangeText={value =>
                    updateCertificateField(cert.uri, 'vaccineName', value)
                  }
                  theme={{
                    roundness: 12,
                    colors: { primary: '#58B9D0', outline: '#E2E2E2' },
                  }}
                  left={
                    <TextInput.Icon
                      icon={() => <MaterialIcons name="medical-services" size={20} color="#58B9D0" />}
                    />
                  }
                />

                <TouchableOpacity
                  onPress={() => setShowDatePicker(index)}
                  style={{
                    height: 56,
                    borderColor: '#E2E2E2',
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
                    <MaterialIcons name="event" size={20} color="#58B9D0" />
                    <Text style={{ fontSize: 16, color: cert.date ? '#333' : '#666' }}>
                      {cert.date || 'Vaccination Date *'}
                    </Text>
                  </View>
                  <MaterialIcons name="calendar-today" size={20} color="#58B9D0" />
                </TouchableOpacity>

                {showDatePicker === index && (
                  <DateTimePicker
                    value={cert.date ? new Date(cert.date) : new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, date) => handleDateChange(cert.uri, date)}
                    maximumDate={new Date()}
                  />
                )}

                <TouchableOpacity
                  onPress={() => setShowExpiryPicker(index)}
                  style={{
                    height: 56,
                    borderColor: '#E2E2E2',
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
                    <MaterialIcons name="event-available" size={20} color="#58B9D0" />
                    <Text style={{ fontSize: 16, color: cert.expiry ? '#333' : '#666' }}>
                      {cert.expiry || 'Expiry Date (Optional)'}
                    </Text>
                  </View>
                  <MaterialIcons name="calendar-today" size={20} color="#58B9D0" />
                </TouchableOpacity>

                {showExpiryPicker === index && (
                  <DateTimePicker
                    value={cert.expiry ? new Date(cert.expiry) : new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, date) => handleExpiryChange(cert.uri, date)}
                    minimumDate={new Date()}
                  />
                )}
              </View>
            </View>
          ))}

          {/* Add Certificate Button */}
          <TouchableOpacity
            onPress={pickCertificateImage}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              borderWidth: 2,
              borderColor: '#58B9D0',
              borderStyle: 'dashed',
              padding: 20,
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <MaterialIcons name="add-photo-alternate" size={40} color="#58B9D0" />
            <Text
              style={{
                fontSize: 16,
                color: '#58B9D0',
                fontWeight: '600',
                marginTop: 8,
              }}
            >
              Upload Certificate
            </Text>
            <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>
              JPG or PNG, max 5MB
            </Text>
          </TouchableOpacity>

          {/* Action Buttons */}
          <View style={{ gap: 12 }}>
            <TouchableOpacity
              onPress={handleSaveAll}
              style={[
                boardingQuestionStyles.bookButton,
                (loading || certificates.length === 0) && boardingQuestionStyles.disabledButton,
              ]}
              disabled={loading || certificates.length === 0}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={boardingQuestionStyles.bookButtonText}>
                  Save All Certificates ({certificates.length})
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSkip}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#E2E2E2',
                paddingVertical: 16,
                alignItems: 'center',
              }}
              disabled={loading}
            >
              <Text style={{ fontSize: 16, color: '#6B7280', fontWeight: '600' }}>
                Skip for Now
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default VaccinationUpload;
