import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import boardingQuestionStyles from './boardingquestions.styles';
import Icons from '../../../assets/icons';
import { storageService } from '../../utils';
import { API_CONFIG } from '../../config/api';
import { responsiveWidth } from 'react-native-responsive-dimensions';

interface PetFormData {
  petId: number;
  petName: string;
  foodType: number;
  walksPerDay: number;
  nailClipping: boolean;
  medicatedBath: boolean;
  swimmingPool: boolean;
  isDocReqd: boolean;
  possessions: boolean;
}

const BoardingQuestions: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { startDate, endDate, selectedPets, petOwnerId, bookingId, boardingDetails } = route.params || {};

  const [currentPetIndex, setCurrentPetIndex] = useState(0);
  const [pets, setPets] = useState<any[]>([]);
  const [petFormsData, setPetFormsData] = useState<PetFormData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showFoodTypeDropdown, setShowFoodTypeDropdown] = useState(false);

  // Food type options
  const foodTypeOptions = [
    { id: 1, label: 'Raw meat' },
    { id: 2, label: 'Cooked chicken rice' },
    { id: 3, label: 'Kibbles' },
    { id: 4, label: 'Curd rice' },
  ];

  // Get boarder's available services from boardingDetails
  const boarding = boardingDetails || {};
  const hasNailClipping = boarding.nailClipping && boarding.nailClipping > 0;
  const hasMedicatedBath = boarding.medicatedBath && boarding.medicatedBath > 0;
  const hasSwimmingPool = boarding.swimming && boarding.swimming > 0;
  const hasWalksPerDay = boarding.walksPerDay && boarding.walksPerDay > 0;
  const hasDocService = boarding.docAvailibility === true;

  // Service prices
  const nailClippingPrice = boarding.nailClipping || 0;
  const medicatedBathPrice = boarding.medicatedBath || 0;
  const swimmingPoolPrice = boarding.swimming || 0;
  const walksPerDayPrice = boarding.walksPerDay || 0;

  console.log('🏠 Boarder Services:', {
    hasNailClipping,
    hasMedicatedBath,
    hasSwimmingPool,
    hasWalksPerDay,
    hasDocService,
    nailClippingPrice,
    medicatedBathPrice,
    swimmingPoolPrice,
    walksPerDayPrice,
  });

  useEffect(() => {
    fetchPetsData();
  }, []);

  const fetchPetsData = async () => {
    try {
      const token = await storageService.getUserToken();
      if (!token) return;

      // Fetch pet owner ID
      const ownerResponse = await fetch(`${API_CONFIG.BASE_URL}/api/pet-owner/findByUserId`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!ownerResponse.ok) return;
      const ownerResult = await ownerResponse.json();
      const ownerId = ownerResult.statusCode === 200 ? ownerResult.body.id : null;

      if (!ownerId) return;

      // Fetch all pets for this owner
      const petsResponse = await fetch(
        `${API_CONFIG.BASE_URL}/api/pet-profile/owner/${ownerId}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      if (petsResponse.ok) {
        const petsResult = await petsResponse.json();
        if (petsResult.statusCode === 200) {
          const allPets = petsResult.body || [];

          // Filter only selected pets
          const selectedPetsData = allPets.filter((pet: any) =>
            selectedPets?.includes(pet.id)
          );

          console.log('🐕 Selected Pets:', selectedPetsData.map((p: any) => ({ id: p.id, name: p.name })));

          setPets(selectedPetsData);

          // Initialize form data for each pet
          const initialForms = selectedPetsData.map((pet: any) => ({
            petId: pet.id,
            petName: pet.name,
            foodType: 2, // Default
            walksPerDay: hasWalksPerDay ? 2 : 0,
            nailClipping: false,
            medicatedBath: false,
            swimmingPool: false,
            isDocReqd: false,
            possessions: false,
          }));

          setPetFormsData(initialForms);
        }
      }
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  const updateCurrentPetForm = (field: keyof PetFormData, value: any) => {
    const updatedForms = [...petFormsData];
    updatedForms[currentPetIndex] = {
      ...updatedForms[currentPetIndex],
      [field]: value,
    };
    setPetFormsData(updatedForms);
  };

  const currentPet = pets[currentPetIndex];
  const currentForm = petFormsData[currentPetIndex] || {};
  const isLastPet = currentPetIndex === pets.length - 1;

  const handleNext = () => {
    if (isLastPet) {
      setShowCheckout(true);
    } else {
      setCurrentPetIndex(currentPetIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPetIndex > 0) {
      setCurrentPetIndex(currentPetIndex - 1);
    }
  };

  const calculatePetTotal = (form: PetFormData) => {
    let total = 0;
    if (form.nailClipping && hasNailClipping) total += nailClippingPrice;
    if (form.medicatedBath && hasMedicatedBath) total += medicatedBathPrice;
    if (form.swimmingPool && hasSwimmingPool) total += swimmingPoolPrice;
    if (form.walksPerDay > 0 && hasWalksPerDay) total += walksPerDayPrice * form.walksPerDay;
    return total;
  };

  const calculateGrandTotal = () => {
    return petFormsData.reduce((sum, form) => sum + calculatePetTotal(form), 0);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const token = await storageService.getUserToken();
      if (!token) {
        Alert.alert('Error', 'Please login to continue');
        setIsLoading(false);
        return;
      }

      console.log('📦 Starting to update booking with all pets data');
      console.log('Booking ID:', bookingId);
      console.log('Pet Forms Data:', petFormsData);

      // Prepare data array for all pets
      const dataArray = petFormsData.map((form) => ({
        id: form.petId,
        possessions: form.possessions,
        foodType: form.foodType,
        nailClipping: form.nailClipping,
        isDocReqd: form.isDocReqd,
        swimmingPool: form.swimmingPool,
        medicatedBath: form.medicatedBath,
        walksPerDay: form.walksPerDay,
      }));

      const updatePayload = {
        data: dataArray,
      };

      console.log('📤 UPDATE BOOKING CURL:', `curl --location --request PATCH '${API_CONFIG.BASE_URL}/api/boarding-service-bookings/update-booking-booking-01' \\
--header 'Content-Type: application/json' \\
--header 'Authorization: Bearer ${token}' \\
--data '${JSON.stringify(updatePayload)}'`);

      console.log('📤 Update payload:', JSON.stringify(updatePayload, null, 2));

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/api/boarding-service-bookings/update-booking-booking-01`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatePayload),
        }
      );

      const result = await response.json();
      console.log('📥 Booking update response:', result);

      if (response.ok) {
        Alert.alert(
          'Success!',
          'All booking details have been updated successfully.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Main', { screen: 'Home' });
              },
            },
          ]
        );
      } else {
        Alert.alert(
          'Update Failed',
          result.message || 'Failed to update booking details. Please try again.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('🔥 Booking update error:', error);
      Alert.alert(
        'Booking Failed',
        'Network error. Please check your connection and try again.',
        [{ text: 'Try Again', style: 'default' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentPet && pets.length === 0) {
    return (
      <View style={[boardingQuestionStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#58B9D0" />
        <Text style={{ marginTop: 10 }}>Loading pets...</Text>
      </View>
    );
  }

  // Checkout Summary View
  if (showCheckout) {
    return (
      <View style={boardingQuestionStyles.container}>
        {/* Header */}
        <View style={boardingQuestionStyles.header}>
          <TouchableOpacity onPress={() => setShowCheckout(false)} style={{ marginRight: 16 }}>
            <Image source={Icons.LeftArrow} style={{ tintColor: '#000000', width: 20, height: 20 }} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={boardingQuestionStyles.headerTitle}>Checkout Summary</Text>
            <Text style={boardingQuestionStyles.headerSubtitle}>Review your selections</Text>
          </View>
        </View>

        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
          {petFormsData.map((form, index) => {
            const petTotal = calculatePetTotal(form);
            return (
              <View key={form.petId} style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                borderWidth: 1,
                borderColor: '#E5E7EB',
              }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 12 }}>
                  {form.petName}
                </Text>

                <View style={{ marginBottom: 8 }}>
                  <Text style={{ color: '#6B7280', fontSize: 14 }}>
                    Food: {foodTypeOptions.find(f => f.id === form.foodType)?.label}
                  </Text>
                </View>

                {form.nailClipping && hasNailClipping && (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ color: '#6B7280' }}>Nail Clipping</Text>
                    <Text style={{ fontWeight: '600' }}>₹ {nailClippingPrice}</Text>
                  </View>
                )}

                {form.medicatedBath && hasMedicatedBath && (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ color: '#6B7280' }}>Medicated Bath</Text>
                    <Text style={{ fontWeight: '600' }}>₹ {medicatedBathPrice}</Text>
                  </View>
                )}

                {form.swimmingPool && hasSwimmingPool && (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ color: '#6B7280' }}>Swimming Pool</Text>
                    <Text style={{ fontWeight: '600' }}>₹ {swimmingPoolPrice}</Text>
                  </View>
                )}

                {form.walksPerDay > 0 && hasWalksPerDay && (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text style={{ color: '#6B7280' }}>Walks ({form.walksPerDay}/day)</Text>
                    <Text style={{ fontWeight: '600' }}>₹ {walksPerDayPrice * form.walksPerDay}</Text>
                  </View>
                )}

                {form.isDocReqd && hasDocService && (
                  <View style={{ marginBottom: 8 }}>
                    <Text style={{ color: '#10B981', fontSize: 14 }}>✓ On-site Doctor Requested</Text>
                  </View>
                )}

                {petTotal > 0 && (
                  <>
                    <View style={{ height: 1, backgroundColor: '#E5E7EB', marginVertical: 12 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 16, fontWeight: '700', color: '#111827' }}>Pet Total</Text>
                      <Text style={{ fontSize: 16, fontWeight: '700', color: '#58B9D0' }}>₹ {petTotal}</Text>
                    </View>
                  </>
                )}
              </View>
            );
          })}

          {calculateGrandTotal() > 0 && (
            <View style={{
              backgroundColor: '#58B9D0',
              borderRadius: 12,
              padding: 20,
              marginTop: 8,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: '#FFFFFF' }}>Grand Total</Text>
                <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFFFFF' }}>₹ {calculateGrandTotal()}</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={{
          backgroundColor: '#FFFFFF',
          paddingHorizontal: responsiveWidth(4),
          paddingTop: 16,
          paddingBottom: 20,
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        }}>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={isLoading}
            style={{
              backgroundColor: isLoading ? '#A0D8E8' : '#58B9D0',
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
            }}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>
                Confirm Booking
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Pet Form View
  return (
    <View style={boardingQuestionStyles.container}>
      {/* Header */}
      <View style={boardingQuestionStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
          <Image source={Icons.LeftArrow} style={{ tintColor: '#000000', width: 20, height: 20 }} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={boardingQuestionStyles.headerTitle}>
            {currentPet?.name || 'Boarding Questions'}
          </Text>
          <Text style={boardingQuestionStyles.headerSubtitle}>
            Pet {currentPetIndex + 1} of {pets.length}
          </Text>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 20, color: '#111827' }}>
          Boarding Preferences
        </Text>

        {/* Food Type */}
        <View style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 12,
          padding: 16,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: '#E5E7EB',
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <MaterialIcons name="restaurant" size={24} color="#58B9D0" style={{ marginRight: 12 }} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>Food Type</Text>
              <Text style={{ fontSize: 12, color: '#6B7280' }}>Select the type of food for your pet</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setShowFoodTypeDropdown(!showFoodTypeDropdown)}
            style={{
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 8,
              padding: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text>{foodTypeOptions.find(f => f.id === currentForm.foodType)?.label}</Text>
            <MaterialIcons name={showFoodTypeDropdown ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} />
          </TouchableOpacity>

          {showFoodTypeDropdown && (
            <View style={{ marginTop: 8 }}>
              {foodTypeOptions.map(option => (
                <TouchableOpacity
                  key={option.id}
                  onPress={() => {
                    updateCurrentPetForm('foodType', option.id);
                    setShowFoodTypeDropdown(false);
                  }}
                  style={{
                    padding: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E7EB',
                  }}
                >
                  <Text>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Walks Per Day */}
        {hasWalksPerDay && (
          <View style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: '#E5E7EB',
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <MaterialIcons name="directions-walk" size={24} color="#58B9D0" style={{ marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>Walks Per Day</Text>
                <Text style={{ fontSize: 12, color: '#6B7280' }}>₹{walksPerDayPrice} per walk</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              {[1, 2, 3, 4].map(num => (
                <TouchableOpacity
                  key={num}
                  onPress={() => updateCurrentPetForm('walksPerDay', num)}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    backgroundColor: currentForm.walksPerDay === num ? '#58B9D0' : '#F3F4F6',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{
                    fontSize: 18,
                    fontWeight: '600',
                    color: currentForm.walksPerDay === num ? '#FFFFFF' : '#6B7280',
                  }}>
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Additional Services */}
        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 16, marginTop: 8, color: '#111827' }}>
          Additional Services
        </Text>

        {/* Nail Clipping */}
        {hasNailClipping && (
          <TouchableOpacity
            onPress={() => updateCurrentPetForm('nailClipping', !currentForm.nailClipping)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: currentForm.nailClipping ? '#58B9D0' : '#E5E7EB',
            }}
          >
            <View style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: currentForm.nailClipping ? '#58B9D0' : '#D1D5DB',
              backgroundColor: currentForm.nailClipping ? '#58B9D0' : '#FFFFFF',
              marginRight: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {currentForm.nailClipping && <MaterialIcons name="check" size={16} color="#FFFFFF" />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>Nail Clipping</Text>
              <Text style={{ fontSize: 12, color: '#6B7280' }}>₹{nailClippingPrice}</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Medicated Bath */}
        {hasMedicatedBath && (
          <TouchableOpacity
            onPress={() => updateCurrentPetForm('medicatedBath', !currentForm.medicatedBath)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: currentForm.medicatedBath ? '#58B9D0' : '#E5E7EB',
            }}
          >
            <View style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: currentForm.medicatedBath ? '#58B9D0' : '#D1D5DB',
              backgroundColor: currentForm.medicatedBath ? '#58B9D0' : '#FFFFFF',
              marginRight: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {currentForm.medicatedBath && <MaterialIcons name="check" size={16} color="#FFFFFF" />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>Medicated Bath</Text>
              <Text style={{ fontSize: 12, color: '#6B7280' }}>₹{medicatedBathPrice}</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* Swimming Pool */}
        {hasSwimmingPool && (
          <TouchableOpacity
            onPress={() => updateCurrentPetForm('swimmingPool', !currentForm.swimmingPool)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: currentForm.swimmingPool ? '#58B9D0' : '#E5E7EB',
            }}
          >
            <View style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: currentForm.swimmingPool ? '#58B9D0' : '#D1D5DB',
              backgroundColor: currentForm.swimmingPool ? '#58B9D0' : '#FFFFFF',
              marginRight: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {currentForm.swimmingPool && <MaterialIcons name="check" size={16} color="#FFFFFF" />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>Swimming Pool Access</Text>
              <Text style={{ fontSize: 12, color: '#6B7280' }}>₹{swimmingPoolPrice}</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* On-site Doctor */}
        {hasDocService && (
          <TouchableOpacity
            onPress={() => updateCurrentPetForm('isDocReqd', !currentForm.isDocReqd)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: currentForm.isDocReqd ? '#58B9D0' : '#E5E7EB',
            }}
          >
            <View style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: currentForm.isDocReqd ? '#58B9D0' : '#D1D5DB',
              backgroundColor: currentForm.isDocReqd ? '#58B9D0' : '#FFFFFF',
              marginRight: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {currentForm.isDocReqd && <MaterialIcons name="check" size={16} color="#FFFFFF" />}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#111827' }}>On-site Doctor</Text>
              <Text style={{ fontSize: 12, color: '#6B7280' }}>Available on request</Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: responsiveWidth(4),
        paddingTop: 16,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
      }}>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {currentPetIndex > 0 && (
            <TouchableOpacity
              onPress={handlePrevious}
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                paddingVertical: 16,
                borderRadius: 12,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#58B9D0',
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '700', color: '#58B9D0' }}>Previous</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={handleNext}
            style={{
              flex: currentPetIndex > 0 ? 1 : 2,
              backgroundColor: '#58B9D0',
              paddingVertical: 16,
              borderRadius: 12,
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>
              {isLastPet ? 'Review & Checkout' : 'Next Pet'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BoardingQuestions;
