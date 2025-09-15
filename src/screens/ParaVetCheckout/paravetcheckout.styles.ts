import { StyleSheet, Platform } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';

const paravetcheckoutstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FB',
    },

    // Header Styles
    header: {
        backgroundColor: '#F8F9FB',
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 16,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E8EBF0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },

    backButtonContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E6F3F7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#D1E7DD',
    },

    headerTitleContainer: {
        flex: 1,
    },

    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1A1D29',
        marginBottom: 2,
    },

    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },

    headerPlaceholder: {
        width: 44,
    },

    // Scroll Container
    scrollContainer: {
        flex: 1,
        backgroundColor: '#F8F9FB',
    },

    scrollContentContainer: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 140,
    },

    // Section Styles
    sectionContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E8EBF0',
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1D29',
        marginLeft: 8,
    },

    // Form Input Styles
    inputContainer: {
        marginBottom: 16,
    },

    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1A1D29',
        marginBottom: 8,
    },

    textInput: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#E8EBF0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: '#1A1D29',
        fontWeight: '400',
        minHeight: 54,
    },

    // Appointment Card Styles
    appointmentCard: {
        backgroundColor: '#E6F3F7',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#58B9D0',
        marginBottom: 16,
    },

    appointmentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    appointmentTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1D29',
        marginLeft: 8,
    },

    appointmentDetails: {
        gap: 8,
    },

    appointmentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    appointmentLabel: {
        fontSize: 14,
        color: '#666',
    },

    appointmentValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1A1D29',
    },

    // Time Picker Styles
    timePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },

    timePickerButton: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#E8EBF0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        alignItems: 'center',
    },

    timePickerText: {
        fontSize: 16,
        color: '#1A1D29',
        fontWeight: '400',
    },

    // Bottom Button Styles
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
        borderTopWidth: 1,
        borderTopColor: '#E8EBF0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 10,
    },

    confirmButton: {
        backgroundColor: '#58B9D0',
        borderRadius: 12,
        paddingHorizontal: 24,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#58B9D0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
    },

    confirmButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        marginRight: 8,
    },

    // Legacy styles for compatibility
    containerchild: {
        width: responsiveWidth(100),
        padding: responsiveWidth(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: responsiveHeight(4),
        paddingHorizontal: responsiveHeight(2.5),
    },
    containerfirstsubchild: {
        flexDirection: 'row',
        gap: responsiveWidth(2.1),
    },
    downArrowIcon: {
        tintColor: '#000000',
        top: responsiveHeight(0.25),
    },
    leftarrowicon: {
        tintColor: '#000000',
        top: responsiveHeight(0.5),
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: responsiveWidth(45),
        paddingHorizontal: responsiveWidth(0.4),
        backgroundColor: '#fff',
    },
    checkoutText: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 17,
        color: '#000000',
        top: responsiveHeight(1),
    },

    // Additional legacy styles for compatibility
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    setTextAmountflex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    chargeText: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 17,
        letterSpacing: 0,
        color: '#303030'
    },
    amountText: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 17,
        letterSpacing: 0,
        color: '#303030'
    }
});

export default paravetcheckoutstyles;
