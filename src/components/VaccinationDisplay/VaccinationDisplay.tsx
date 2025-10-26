import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import {
  getVaccinationsByPetId,
  Vaccination,
} from '../../services/vaccinationService';
import { navigate } from '../../utils/navigationService';

interface VaccinationDisplayProps {
  petId: number;
  petName: string;
}

const VaccinationDisplay: React.FC<VaccinationDisplayProps> = ({
  petId,
  petName,
}) => {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    loadVaccinations();
  }, [petId]);

  const loadVaccinations = async () => {
    try {
      setLoading(true);
      const data = await getVaccinationsByPetId(petId);
      setVaccinations(data);
    } catch (error) {
      console.error('Error loading vaccinations:', error);
      Alert.alert('Error', 'Failed to load vaccination records');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const isExpired = (expiryDate: string | null) => {
    if (!expiryDate) return false;
    try {
      const expiry = new Date(expiryDate);
      return expiry < new Date();
    } catch {
      return false;
    }
  };

  const handleAddNew = () => {
    navigate('VaccinationUpload', { petId, petName });
  };

  if (loading) {
    return (
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: '#E5E7EB',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 100,
        }}
      >
        <ActivityIndicator size="large" color="#58B9D0" />
        <Text style={{ fontSize: 14, color: '#6B7280', marginTop: 8 }}>
          Loading vaccination records...
        </Text>
      </View>
    );
  }

  return (
    <View>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <MaterialIcons name="medical-services" size={24} color="#58B9D0" />
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#1F2937',
            }}
          >
            Vaccination Records
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleAddNew}
          style={{
            backgroundColor: '#58B9D0',
            borderRadius: 20,
            paddingHorizontal: 12,
            paddingVertical: 6,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <MaterialIcons name="add" size={16} color="#FFFFFF" />
          <Text style={{ fontSize: 12, color: '#FFFFFF', fontWeight: '600' }}>
            Add New
          </Text>
        </TouchableOpacity>
      </View>

      {/* Vaccinations List */}
      {vaccinations.length === 0 ? (
        <View
          style={{
            backgroundColor: '#F9FAFB',
            borderRadius: 12,
            padding: 24,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#E5E7EB',
          }}
        >
          <MaterialIcons name="medical-services" size={48} color="#D1D5DB" />
          <Text
            style={{
              fontSize: 16,
              color: '#6B7280',
              marginTop: 12,
              textAlign: 'center',
            }}
          >
            No vaccination records yet
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#9CA3AF',
              marginTop: 4,
              textAlign: 'center',
            }}
          >
            Upload certificates to keep track of vaccinations
          </Text>
        </View>
      ) : (
        <View style={{ gap: 12 }}>
          {vaccinations.map((vaccination, index) => (
            <View
              key={vaccination.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                flexDirection: 'row',
                gap: 12,
              }}
            >
              {/* Certificate Thumbnail */}
              <TouchableOpacity
                onPress={() => setSelectedImage(vaccination.uploadUrl)}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  overflow: 'hidden',
                  backgroundColor: '#F3F4F6',
                }}
              >
                <Image
                  source={{ uri: vaccination.uploadUrl }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    paddingVertical: 2,
                    alignItems: 'center',
                  }}
                >
                  <MaterialIcons name="zoom-in" size={16} color="#FFFFFF" />
                </View>
              </TouchableOpacity>

              {/* Vaccination Details */}
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#1F2937',
                    marginBottom: 4,
                  }}
                >
                  {vaccination.vaccineName}
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <MaterialIcons name="event" size={14} color="#6B7280" />
                  <Text style={{ fontSize: 13, color: '#6B7280', marginLeft: 4 }}>
                    Vaccinated: {formatDate(vaccination.date)}
                  </Text>
                </View>

                {vaccination.expiry && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MaterialIcons
                      name="event-available"
                      size={14}
                      color={isExpired(vaccination.expiry) ? '#EF4444' : '#10B981'}
                    />
                    <Text
                      style={{
                        fontSize: 13,
                        color: isExpired(vaccination.expiry) ? '#EF4444' : '#10B981',
                        marginLeft: 4,
                      }}
                    >
                      {isExpired(vaccination.expiry) ? 'Expired: ' : 'Expires: '}
                      {formatDate(vaccination.expiry)}
                    </Text>
                  </View>
                )}

                {isExpired(vaccination.expiry) && (
                  <View
                    style={{
                      backgroundColor: '#FEE2E2',
                      borderRadius: 6,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      marginTop: 6,
                      alignSelf: 'flex-start',
                    }}
                  >
                    <Text style={{ fontSize: 11, color: '#DC2626', fontWeight: '600' }}>
                      Renewal Required
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Image Preview Modal */}
      <Modal
        visible={selectedImage !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => setSelectedImage(null)}
            style={{
              position: 'absolute',
              top: 40,
              right: 20,
              zIndex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: 20,
              padding: 8,
            }}
          >
            <MaterialIcons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{
                width: responsiveWidth(90),
                height: responsiveHeight(70),
              }}
              resizeMode="contain"
            />
          )}

          <TouchableOpacity
            onPress={() => setSelectedImage(null)}
            style={{
              marginTop: 20,
              backgroundColor: '#58B9D0',
              borderRadius: 8,
              paddingHorizontal: 24,
              paddingVertical: 12,
            }}
          >
            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '600' }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default VaccinationDisplay;
