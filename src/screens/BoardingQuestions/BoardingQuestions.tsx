import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import boardingQuestionStyles from './boardingquestions.styles';
import Icons from '../../../assets/icons';

type RootStackParamList = {
    BoardingSuccess: undefined;
    BoardingModal: undefined;
};

type BoardingQuestionsNavigationProp = StackNavigationProp<RootStackParamList>;

interface Question {
    id: number;
    question: string;
    answer: boolean | null;
}

const BoardingQuestions: React.FC = () => {
    const navigation = useNavigation<BoardingQuestionsNavigationProp>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [questions, setQuestions] = useState<Question[]>([
        {
            id: 1,
            question: "If we run out of dog's meals, may we switch to our Chicken Based kennel diet? If you prefer to not switch, we will shop for your dog's own diet, for which there will be extra charges",
            answer: null
        },
        {
            id: 2,
            question: "Keep you possessions",
            answer: null
        },
        {
            id: 3,
            question: "Our focus is on your dog's well-being. If we feel it is in your dog's best interest may we shave or trim matted areas? (Charges may apply)",
            answer: null
        },
        {
            id: 4,
            question: "If time allows would you like us to bathe or groom your pet before pick up?",
            answer: null
        }
    ]);

    const handleAnswerChange = (questionId: number, answer: boolean) => {
        setQuestions(prevQuestions =>
            prevQuestions.map(q =>
                q.id === questionId ? { ...q, answer } : q
            )
        );
    };

    const isAllQuestionsAnswered = () => {
        return questions.every(q => q.answer !== null);
    };

    const handleBookNow = async () => {
        if (!isAllQuestionsAnswered()) {
            Alert.alert('Incomplete', 'Please answer all questions before proceeding.');
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call
            const bookingData = {
                questions: questions,
                timestamp: new Date().toISOString(),
                userId: 'user123', // This would come from user context
                serviceType: 'boarding'
            };

            // Replace this URL with your actual API endpoint
            const response = await fetch('https://api.petjio.com/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer your-auth-token', // Add actual token
                },
                body: JSON.stringify(bookingData),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Success - navigate to success screen
                navigation.navigate('BoardingSuccess');
            } else {
                // API returned error
                setErrorMessage(result.message || 'Booking failed. Please try again.');
                setShowErrorModal(true);
            }
        } catch (error) {
            // Network or other error
            setErrorMessage('Network error. Please check your connection and try again.');
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
            {/* Header Section */}
            <View style={boardingQuestionStyles.containerchild}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={boardingQuestionStyles.containerfirstsubchild}>
                        <Image source={Icons.LeftArrow} style={boardingQuestionStyles.leftarrowicon} />
                        <Text style={boardingQuestionStyles.groomingText}>Boarding Questions</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={boardingQuestionStyles.scrollContainer}>
                <View style={boardingQuestionStyles.header}>
                    <Text style={boardingQuestionStyles.subtitle}>
                        Please answer the following questions to complete your booking
                    </Text>
                </View>

                <View style={boardingQuestionStyles.questionsContainer}>
                    {questions.map((question, index) => (
                        <View key={question.id} style={boardingQuestionStyles.questionCard}>
                            <Text style={boardingQuestionStyles.questionNumber}>
                                Question {index + 1}
                            </Text>
                            <Text style={boardingQuestionStyles.questionText}>
                                {question.question}
                            </Text>

                            <View style={boardingQuestionStyles.answerButtons}>
                                <TouchableOpacity
                                    style={[
                                        boardingQuestionStyles.answerButton,
                                        question.answer === true && boardingQuestionStyles.selectedYes
                                    ]}
                                    onPress={() => handleAnswerChange(question.id, true)}
                                >
                                    <Text style={[
                                        boardingQuestionStyles.answerText,
                                        question.answer === true && boardingQuestionStyles.selectedYesText
                                    ]}>
                                        Yes
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        boardingQuestionStyles.answerButton,
                                        question.answer === false && boardingQuestionStyles.selectedNo
                                    ]}
                                    onPress={() => handleAnswerChange(question.id, false)}
                                >
                                    <Text style={[
                                        boardingQuestionStyles.answerText,
                                        question.answer === false && boardingQuestionStyles.selectedNoText
                                    ]}>
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
                        (!isAllQuestionsAnswered() || isLoading) && boardingQuestionStyles.disabledButton
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
                        <Text style={boardingQuestionStyles.errorTitle}>Booking Failed</Text>
                        <Text style={boardingQuestionStyles.errorMessage}>{errorMessage}</Text>
                        <TouchableOpacity
                            style={boardingQuestionStyles.errorButton}
                            onPress={closeErrorModal}
                        >
                            <Text style={boardingQuestionStyles.errorButtonText}>Try Again</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default BoardingQuestions;