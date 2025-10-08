import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import boardingQuestionStyles from './boardingquestions.styles';
import Icons from '../../../assets/icons';
import { storageService } from '../../utils';
import { API_CONFIG } from '../../config/api';

type RootStackParamList = {
  BoardingSuccess: undefined;
  BoardingModal: undefined;
  BoardingQuestions: {
    startTime?: string;
    endTime?: string;
    mode?: number;
    selectedPetIds?: number[];
    petOwnerId?: number | null;
    boardingId?: number;
    serviceIds?: number[];
    serviceBookings?: number[];
  };
};

interface Question {
  id: number;
  title: string;
  question: string;
  answer: boolean | null;
}

const BoardingQuestions: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // New state for additional fields
  const [pets, setPets] = useState<any[]>([]);
  const [foodType, setFoodType] = useState<number>(2); // Default to 2
  const [showFoodTypeDropdown, setShowFoodTypeDropdown] = useState<boolean>(false);
  const [onSiteDoc, setOnSiteDoc] = useState<boolean>(false);
  const [swimmingPool, setSwimmingPool] = useState<boolean>(false);
  const [walksPerDay, setWalksPerDay] = useState<number>(2);
  const [gromTrim, setGromTrim] = useState<boolean>(false);

  // Food type options - matching AddPet page
  const foodTypeOptions = [
    { id: 1, label: 'Raw meat', value: 'Raw meat' },
    { id: 2, label: 'Cooked chicken rice', value: 'Cooked chicken rice' },
    { id: 3, label: 'Kibbles', value: 'Kibbles' },
    { id: 4, label: 'Curd rice', value: 'Curd rice' },
  ];


  // Get the dates, mode, and dynamic IDs from navigation params
  const { startTime, endTime, mode, selectedPetIds, petOwnerId, boardingId, serviceIds, serviceBookings } = route.params || {};

  // Fetch pets data on mount to get food type and other preferences
  React.useEffect(() => {
    // Log the received merged dates and dynamic IDs for debugging
    console.log('BoardingQuestions received params:', {
      startTime,
      endTime,
      mode,
      selectedPetIds,
      petOwnerId,
      boardingId,
      serviceIds,
      serviceBookings,
      startTimeFormatted: startTime ? new Date(startTime).toLocaleString() : 'Not set',
      endTimeFormatted: endTime ? new Date(endTime).toLocaleString() : 'Not set',
      serviceType: mode === 9 ? 'Home Service' : mode === 10 ? 'Commercial Service' : 'Unknown'
    });

    // Validate that serviceIds and serviceBookings have the same count
    if (selectedPetIds && serviceBookings) {
      console.log('🔍 Array count validation:');
      console.log('selectedPetIds count:', selectedPetIds.length);
      console.log('serviceBookings count:', serviceBookings.length);
      console.log('Arrays match:', selectedPetIds.length === serviceBookings.length);
      
      // Log the mapping
      selectedPetIds.forEach((petId: number, index: number) => {
        console.log(`Pet ID ${petId} → Service Booking ${serviceBookings[index]}`);
      });
    }
  }, [startTime, endTime, mode, selectedPetIds, petOwnerId, boardingId, serviceIds, serviceBookings]);

  // Fetch pets data on mount to get food type and other preferences
  React.useEffect(() => {
    const fetchPetsData = async () => {
      if (!selectedPetIds || selectedPetIds.length === 0) return;
      
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
            setPets(allPets);
            
            // Filter selected pets
            const selectedPetsData = allPets.filter((p: any) => selectedPetIds.includes(p.id));
            
            // Auto-select food type from first selected pet (if available)
            if (selectedPetsData.length > 0 && selectedPetsData[0].foodType) {
              setFoodType(selectedPetsData[0].foodType.id || 2);
            }
            
            console.log('✅ Fetched pets data:', selectedPetsData);
          }
        }
      } catch (error) {
        console.error('Error fetching pets data:', error);
      }
    };

    fetchPetsData();
  }, [selectedPetIds]);

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      title: 'Backup Food Options',
      question:
        "If we run out of dog's meals, may we switch to our Chicken Based kennel diet? If you prefer to not switch, we will shop for your dog's own diet, for which there will be extra charges",
      answer: null,
    },
    {
      id: 3,
      title: 'Shave & Trim Permission',
      question:
        "Our focus is on your dog's well-being. If we feel it is in your dog's best interest may we shave or trim matted areas? (Charges may apply)",
      answer: null,
    },
    {
      id: 4,
      title: 'Grooming Before Discharge',
      question:
        'If time allows would you like us to bathe or groom your pet before pick up?',
      answer: null,
    },
  ]);

  const getQuestionIcon = (questionId: number) => {
    switch (questionId) {
      case 1:
        return 'restaurant'; // Food/meals icon
      case 3:
        return 'content-cut'; // Shaving/trimming icon
      case 4:
        return 'shower'; // Grooming/bathing icon
      default:
        return 'help-outline';
    }
  };


  const getFoodTypeLabel = (id: number) => {
    return foodTypeOptions.find(option => option.id === id)?.label || 'Select Food Type';
  };

  const handleAnswerChange = (questionId: number, answer: boolean) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(q => (q.id === questionId ? { ...q, answer } : q)),
    );
  };

  const isAllQuestionsAnswered = () => {
    return questions.every(q => q.answer !== null);
  };

  const handleBookNow = async () => {
    if (!isAllQuestionsAnswered()) {
      Alert.alert(
        'Incomplete',
        'Please answer all questions before proceeding.',
      );
      return;
    }

    setIsLoading(true);

    try {
      // Use the dates and mode passed from BoardingModal, or fallback to default values
      // Map question answers to API fields
      const questionAnswers = questions.reduce((acc, question) => {
        acc[question.id] = question.answer;
        return acc;
      }, {} as Record<number, boolean | null>);

      const bookingData = {
        startTime: startTime,
        endTime: endTime,
        mode: mode,
        petIds: selectedPetIds, // Changed from serviceBookings to petIds to match API spec
        petOwnerId: petOwnerId,
        boardingId: boardingId,
        serviceIds: serviceBookings,
        possessions: false, // Removed Question 2
        foodType: 1, // Use auto-selected food type from pet profile
        onSiteDoc: onSiteDoc,
        swimmingPool: swimmingPool,
        walksPerDay: walksPerDay,
        gromTrim: gromTrim,
        // Keep backward compatibility with existing question mappings
        backUpFood: questionAnswers[1] ?? false,
        shaveAndTrimming: questionAnswers[3] ?? true,
        groomingBeforeDischarge: questionAnswers[4] ?? true,
      };

      console.log('📦 Booking data being sent to API:', bookingData);
      const token = await storageService.getUserToken();

      // Generate CURL command for debugging
      const curlCommand = `curl -X POST '${API_CONFIG.BASE_URL}/api/boarding-service-bookings' \\
  -H 'Authorization: Bearer ${token}' \\
  -H 'Content-Type: application/json' \\
  -d '${JSON.stringify(bookingData, null, 2)}'`;

      console.log('🔧 CURL command for API call:');
      console.log(curlCommand);

      // Replace this URL with your actual API endpoint
      const response = await fetch(
        `${API_CONFIG.BASE_URL}/api/boarding-service-bookings`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingData),
        },
      );

      const result = await response.json();
      console.log('booking added success', result);

      if (result.statusCode === 201) {
        // Success - navigate to success screen
        navigation.navigate('BoardingSuccess');
      } else {
        // API returned error
        setErrorMessage(result.message || 'Booking failed. Please try again.');
        setShowErrorModal(true);
      }
    } catch (error) {
      // Network or other error
      console.log('error', error);
      setErrorMessage(
        'Network error. Please check your connection and try again.',
      );
      setShowErrorModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage('');
  };

  return (
    <View style={boardingQuestionStyles.container}>
      {/* Header Section - Matching BoardingDetails Style */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
      }}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ marginRight: 16 }}
        >
          <Image
            source={Icons.LeftArrow}
            style={{ tintColor: '#000000', width: 20, height: 20 }}
          />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#1A1D29',
          }}>
            Boarding Questions
          </Text>
          <Text style={{
            fontSize: 13,
            color: '#6B7280',
            marginTop: 2,
          }}>
            Complete your booking details
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={boardingQuestionStyles.scrollContainer}
      >
        {/* Additional Preferences Section */}
        <View style={boardingQuestionStyles.questionsContainer}>
          <Text style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#1A1D29',
            marginBottom: 16,
            paddingHorizontal: 4,
            paddingTop: 18,
          }}>Boarding Preferences</Text>

          {/* Food Type Dropdown */}
          <View style={boardingQuestionStyles.questionCard}>
            <View style={boardingQuestionStyles.questionHeader}>
              <View style={boardingQuestionStyles.iconContainer}>
                <MaterialIcons name="restaurant-menu" size={24} color="#58B9D0" />
              </View>
              <View style={boardingQuestionStyles.questionInfo}>
                <Text style={boardingQuestionStyles.questionText}>
                  Food Type
                </Text>
                <Text style={{
                  fontSize: 12,
                  color: '#6B7280',
                  marginTop: 4,
                }}>
                  Select the type of food for your pet
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={{
                marginTop: 8,
                paddingVertical: 12,
                paddingHorizontal: 16,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 8,
                backgroundColor: '#F9FAFB',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() => setShowFoodTypeDropdown(!showFoodTypeDropdown)}
            >
              <Text style={{
                fontSize: 15,
                color: '#1F2937',
                fontWeight: '500',
              }}>
                {getFoodTypeLabel(foodType)}
              </Text>
              <MaterialIcons 
                name={showFoodTypeDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                size={24} 
                color="#6B7280" 
              />
            </TouchableOpacity>
            {showFoodTypeDropdown && (
              <View style={{
                marginTop: 8,
                borderWidth: 1,
                borderColor: '#E5E7EB',
                borderRadius: 8,
                backgroundColor: '#FFFFFF',
                overflow: 'hidden',
              }}>
                {foodTypeOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={{
                      paddingVertical: 12,
                      paddingHorizontal: 16,
                      borderBottomWidth: option.id !== foodTypeOptions[foodTypeOptions.length - 1].id ? 1 : 0,
                      borderBottomColor: '#F3F4F6',
                      backgroundColor: foodType === option.id ? 'rgba(88, 185, 208, 0.1)' : '#FFFFFF',
                    }}
                    onPress={() => {
                      setFoodType(option.id);
                      setShowFoodTypeDropdown(false);
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{
                        fontSize: 15,
                        color: foodType === option.id ? '#58B9D0' : '#1F2937',
                        fontWeight: foodType === option.id ? '600' : '400',
                      }}>
                        {option.label}
                      </Text>
                      {foodType === option.id && (
                        <MaterialIcons name="check" size={20} color="#58B9D0" />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* On-Site Doctor */}
          {/* <View style={boardingQuestionStyles.questionCard}>
            <View style={boardingQuestionStyles.questionHeader}>
              <View style={boardingQuestionStyles.iconContainer}>
                <MaterialIcons name="local-hospital" size={24} color="#58B9D0" />
              </View>
              <View style={boardingQuestionStyles.questionInfo}>
                <Text style={boardingQuestionStyles.questionText}>
                  On-Site Doctor Available
                </Text>
                <Text style={{
                  fontSize: 12,
                  color: '#6B7280',
                  marginTop: 4,
                }}>
                  Is veterinary care available on-site?
                </Text>
              </View>
            </View>
            <View style={boardingQuestionStyles.answerButtons}>
              <TouchableOpacity
                style={[
                  boardingQuestionStyles.answerButton,
                  onSiteDoc && boardingQuestionStyles.selectedYes,
                ]}
                onPress={() => setOnSiteDoc(true)}
              >
                <MaterialIcons
                  name="check-circle"
                  size={18}
                  color={onSiteDoc ? "#10B981" : "#CCCCCC"}
                />
                <Text style={[
                  boardingQuestionStyles.answerText,
                  onSiteDoc && boardingQuestionStyles.selectedYesText,
                ]}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  boardingQuestionStyles.answerButton,
                  !onSiteDoc && boardingQuestionStyles.selectedNo,
                ]}
                onPress={() => setOnSiteDoc(false)}
              >
                <MaterialIcons
                  name="cancel"
                  size={18}
                  color={!onSiteDoc ? "#EF4444" : "#CCCCCC"}
                />
                <Text style={[
                  boardingQuestionStyles.answerText,
                  !onSiteDoc && boardingQuestionStyles.selectedNoText,
                ]}>No</Text>
              </TouchableOpacity>
            </View>
          </View> */}

          {/* Swimming Pool */}
          {/* <View style={boardingQuestionStyles.questionCard}>
            <View style={boardingQuestionStyles.questionHeader}>
              <View style={boardingQuestionStyles.iconContainer}>
                <MaterialIcons name="pool" size={24} color="#58B9D0" />
              </View>
              <View style={boardingQuestionStyles.questionInfo}>
                <Text style={boardingQuestionStyles.questionText}>
                  Swimming Pool Access
                </Text>
                <Text style={{
                  fontSize: 12,
                  color: '#6B7280',
                  marginTop: 4,
                }}>
                  Does your pet need swimming pool access?
                </Text>
              </View>
            </View>
            <View style={boardingQuestionStyles.answerButtons}>
              <TouchableOpacity
                style={[
                  boardingQuestionStyles.answerButton,
                  swimmingPool && boardingQuestionStyles.selectedYes,
                ]}
                onPress={() => setSwimmingPool(true)}
              >
                <MaterialIcons
                  name="check-circle"
                  size={18}
                  color={swimmingPool ? "#10B981" : "#CCCCCC"}
                />
                <Text style={[
                  boardingQuestionStyles.answerText,
                  swimmingPool && boardingQuestionStyles.selectedYesText,
                ]}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  boardingQuestionStyles.answerButton,
                  !swimmingPool && boardingQuestionStyles.selectedNo,
                ]}
                onPress={() => setSwimmingPool(false)}
              >
                <MaterialIcons
                  name="cancel"
                  size={18}
                  color={!swimmingPool ? "#EF4444" : "#CCCCCC"}
                />
                <Text style={[
                  boardingQuestionStyles.answerText,
                  !swimmingPool && boardingQuestionStyles.selectedNoText,
                ]}>No</Text>
              </TouchableOpacity>
            </View>
          </View> */}

          {/* Walks Per Day */}
          <View style={boardingQuestionStyles.questionCard}>
            <View style={boardingQuestionStyles.questionHeader}>
              <View style={boardingQuestionStyles.iconContainer}>
                <MaterialIcons name="directions-walk" size={24} color="#58B9D0" />
              </View>
              <View style={boardingQuestionStyles.questionInfo}>
                <Text style={boardingQuestionStyles.questionText}>
                  Walks Per Day
                </Text>
                <Text style={{
                  fontSize: 12,
                  color: '#6B7280',
                  marginTop: 4,
                }}>
                  How many walks per day does your pet need?
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
              {[1, 2, 3, 4].map(num => (
                <TouchableOpacity
                  key={num}
                  style={{
                    flex: 1,
                    paddingVertical: 12,
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: walksPerDay === num ? '#58B9D0' : '#E5E7EB',
                    backgroundColor: walksPerDay === num ? 'rgba(88, 185, 208, 0.1)' : '#FFFFFF',
                    alignItems: 'center',
                  }}
                  onPress={() => setWalksPerDay(num)}
                >
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: walksPerDay === num ? '#58B9D0' : '#6B7280',
                  }}>{num}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Grooming & Trim */}
          <View style={boardingQuestionStyles.questionCard}>
            <View style={boardingQuestionStyles.questionHeader}>
              <View style={boardingQuestionStyles.iconContainer}>
                <MaterialIcons name="content-cut" size={24} color="#58B9D0" />
              </View>
              <View style={boardingQuestionStyles.questionInfo}>
                <Text style={boardingQuestionStyles.questionText}>
                  Grooming & Trim Service
                </Text>
                <Text style={{
                  fontSize: 12,
                  color: '#6B7280',
                  marginTop: 4,
                }}>
                  Do you want grooming services during the stay?
                </Text>
              </View>
            </View>
            <View style={boardingQuestionStyles.answerButtons}>
              <TouchableOpacity
                style={[
                  boardingQuestionStyles.answerButton,
                  gromTrim && boardingQuestionStyles.selectedYes,
                ]}
                onPress={() => setGromTrim(true)}
              >
                <MaterialIcons
                  name="check-circle"
                  size={18}
                  color={gromTrim ? "#10B981" : "#CCCCCC"}
                />
                <Text style={[
                  boardingQuestionStyles.answerText,
                  gromTrim && boardingQuestionStyles.selectedYesText,
                ]}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  boardingQuestionStyles.answerButton,
                  !gromTrim && boardingQuestionStyles.selectedNo,
                ]}
                onPress={() => setGromTrim(false)}
              >
                <MaterialIcons
                  name="cancel"
                  size={18}
                  color={!gromTrim ? "#EF4444" : "#CCCCCC"}
                />
                <Text style={[
                  boardingQuestionStyles.answerText,
                  !gromTrim && boardingQuestionStyles.selectedNoText,
                ]}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Existing Questions Section */}
        <View style={boardingQuestionStyles.questionsContainer}>
          <Text style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#1A1D29',
            marginBottom: 16,
            marginTop: 8,
            paddingHorizontal: 4,
          }}>Additional Questions</Text>
          
          {questions.map((question, index) => (
            <View key={question.id} style={boardingQuestionStyles.questionCard}>
              <View style={boardingQuestionStyles.questionHeader}>
                <View style={boardingQuestionStyles.iconContainer}>
                  <MaterialIcons
                    name={getQuestionIcon(question.id)}
                    size={24}
                    color="#58B9D0"
                  />
                </View>
                <View style={boardingQuestionStyles.questionInfo}>
                  <Text style={boardingQuestionStyles.questionText}>
                    {question.title}
                  </Text>
                  <Text style={{
                    fontSize: 12,
                    color: '#6B7280',
                    marginTop: 4,
                    lineHeight: 18,
                  }}>
                    {question.question}
                  </Text>
                </View>
              </View>

              <View style={boardingQuestionStyles.answerButtons}>
                <TouchableOpacity
                  style={[
                    boardingQuestionStyles.answerButton,
                    question.answer === true &&
                      boardingQuestionStyles.selectedYes,
                  ]}
                  onPress={() => handleAnswerChange(question.id, true)}
                >
                  <MaterialIcons
                    name="check-circle"
                    size={18}
                    color={question.answer === true ? "#10B981" : "#CCCCCC"}
                  />
                  <Text
                    style={[
                      boardingQuestionStyles.answerText,
                      question.answer === true &&
                        boardingQuestionStyles.selectedYesText,
                    ]}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    boardingQuestionStyles.answerButton,
                    question.answer === false &&
                      boardingQuestionStyles.selectedNo,
                  ]}
                  onPress={() => handleAnswerChange(question.id, false)}
                >
                  <MaterialIcons
                    name="cancel"
                    size={18}
                    color={question.answer === false ? "#EF4444" : "#CCCCCC"}
                  />
                  <Text
                    style={[
                      boardingQuestionStyles.answerText,
                      question.answer === false &&
                        boardingQuestionStyles.selectedNoText,
                    ]}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[
            boardingQuestionStyles.bookButton,
            (!isAllQuestionsAnswered() || isLoading) &&
              boardingQuestionStyles.disabledButton,
          ]}
          onPress={handleBookNow}
          disabled={!isAllQuestionsAnswered() || isLoading}
        >
          <Text style={boardingQuestionStyles.bookButtonText}>
            {isLoading ? 'Booking...' : 'Book Now'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Error Modal */}
      {showErrorModal && (
        <View style={boardingQuestionStyles.errorModalOverlay}>
          <View style={boardingQuestionStyles.errorModalContainer}>
            <Text style={boardingQuestionStyles.errorTitle}>
              Booking Failed
            </Text>
            <Text style={boardingQuestionStyles.errorMessage}>
              {errorMessage}
            </Text>
            <TouchableOpacity
              style={boardingQuestionStyles.errorButton}
              onPress={closeErrorModal}
            >
              <Text style={boardingQuestionStyles.errorButtonText}>
                Try Again
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default BoardingQuestions;
