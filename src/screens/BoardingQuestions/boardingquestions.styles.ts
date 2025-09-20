import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';

const boardingQuestionStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    // Header styles matching other pages
    containerchild: {
        width: responsiveWidth(100),
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(4),
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(1),
        backgroundColor: '#FFFFFF',
    },
    containerfirstsubchild: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: responsiveWidth(2)
    },
    leftarrowicon: {
        tintColor: '#000000',
        width: 20,
        height: 20,
    },
    groomingText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '600',
        fontFamily: '',
    },
    scrollContainer: {
        flex: 1,
        paddingHorizontal: responsiveWidth(5),
    },
    header: {
        marginBottom: responsiveHeight(3),
        alignItems: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        lineHeight: 22,
    },
    questionsContainer: {
        gap: responsiveHeight(2.5),
        marginBottom: responsiveHeight(4),
        paddingHorizontal: responsiveWidth(1),
    },
    questionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: responsiveWidth(4),
        borderWidth: 1,
        borderColor: '#E9ECEF',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        marginBottom: responsiveHeight(1),
    },
    questionNumber: {
        fontSize: 14,
        fontWeight: '600',
        color: '#58B9D0',
        marginBottom: responsiveHeight(1),
    },
    questionText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
        lineHeight: 24,
        marginBottom: responsiveHeight(2),
    },
    answerButtons: {
        flexDirection: 'row',
        gap: responsiveWidth(3),
    },
    answerButton: {
        flex: 1,
        paddingVertical: responsiveHeight(1.5),
        paddingHorizontal: responsiveWidth(4),
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
    },
    selectedYes: {
        backgroundColor: '#E8F5E8',
        borderColor: '#4CAF50',
    },
    selectedNo: {
        backgroundColor: '#FFF3F3',
        borderColor: '#F44336',
    },
    answerText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666666',
    },
    selectedYesText: {
        color: '#4CAF50',
    },
    selectedNoText: {
        color: '#F44336',
    },
    bookButton: {
        backgroundColor: '#58B9D0',
        paddingVertical: responsiveHeight(1.8),
        paddingHorizontal: responsiveWidth(4),
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: responsiveHeight(1.5),
        marginBottom: responsiveHeight(3),
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        width: responsiveWidth(85),
    },
    disabledButton: {
        backgroundColor: '#CCCCCC',
    },
    bookButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    // Error Modal Styles
    errorModalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorModalContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: responsiveWidth(6),
        width: responsiveWidth(85),
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    errorTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#F44336',
        marginBottom: responsiveHeight(2),
    },
    errorMessage: {
        fontSize: 16,
        color: '#333333',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: responsiveHeight(3),
    },
    errorButton: {
        backgroundColor: '#58B9D0',
        paddingVertical: responsiveHeight(1.5),
        paddingHorizontal: responsiveWidth(8),
        borderRadius: 8,
    },
    errorButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});

export default boardingQuestionStyles;