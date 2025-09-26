import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';

const boardingQuestionStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FB',
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
        gap: responsiveHeight(1.5),
        marginBottom: responsiveHeight(4),
        paddingHorizontal: responsiveWidth(1),
    },
    questionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: responsiveWidth(4),
        borderWidth: 1,
        borderColor: '#E5E7EB',
        marginBottom: responsiveHeight(1),
    },
    questionHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: responsiveHeight(1.5),
        gap: responsiveWidth(3),
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(88, 185, 208, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2,
    },
    questionInfo: {
        flex: 1,
    },
    questionNumber: {
        fontSize: 12,
        fontWeight: '600',
        color: '#58B9D0',
        marginBottom: responsiveHeight(0.5),
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    questionText: {
        fontSize: 14,
        fontWeight: '400',
        color: '#4B5563',
        lineHeight: 20,
    },
    answerButtons: {
        flexDirection: 'row',
        gap: responsiveWidth(2),
        marginTop: responsiveHeight(1.5),
    },
    answerButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: responsiveHeight(1.2),
        paddingHorizontal: responsiveWidth(3),
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        backgroundColor: '#F9FAFB',
        gap: responsiveWidth(1.5),
    },
    selectedYes: {
        backgroundColor: '#F0FDF4',
        borderColor: '#10B981',
    },
    selectedNo: {
        backgroundColor: '#FEF2F2',
        borderColor: '#EF4444',
    },
    answerText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#6B7280',
    },
    selectedYesText: {
        color: '#10B981',
        fontWeight: '600',
    },
    selectedNoText: {
        color: '#EF4444',
        fontWeight: '600',
    },
    bookButton: {
        backgroundColor: '#58B9D0',
        paddingVertical: responsiveHeight(1.8),
        paddingHorizontal: responsiveWidth(4),
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(3),
        width: responsiveWidth(90),
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
        borderRadius: 16,
        padding: responsiveWidth(6),
        width: responsiveWidth(85),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E7EB',
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