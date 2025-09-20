import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const boardingmodalstyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    subcontainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    setmodalRadious: {
        backgroundColor: 'white',
        bottom:-15,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: responsiveHeight(32),
    },

    paddingOfNormalWalkingGroupWalking: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveWidth(2),
    },

    selectText: {
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 24,
        letterSpacing: 0,
        color: '#58B9D0',
        paddingHorizontal: responsiveWidth(4),
    },
    unselectText: {
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 24,
        letterSpacing: 0,
        color: '#AAAAAA',
        paddingHorizontal: responsiveWidth(4),
    },
    menuBottomBoarder: {
        borderBottomWidth: 2,
        borderColor: '#58B9D0',
        width: responsiveWidth(40),
        alignItems: 'center',
        paddingBottom: responsiveHeight(0.9),
    },
    // Fixed Button
    fixedButtonContainer: {
        position: 'absolute',
        bottom: responsiveHeight(0.3),
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // backgroundColor: '#fff',
        padding: 10,
        marginLeft: responsiveWidth(5),
    },
    nextBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(92),
        height: responsiveHeight(5),
        borderRadius: responsiveHeight(0.8),
        backgroundColor: '#58B9D0',
    },
    nextBtnText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#FFFFFF',
    },

    dogimage: {
        width: responsiveWidth(20),
        height: responsiveWidth(20),
        borderRadius: responsiveWidth(20),
    },
    setFlexRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveWidth(4),
    },
    setFlexWithGap: {
        top: responsiveHeight(2),
        flexDirection: 'row',
        gap: responsiveWidth(2.5),
    },
    imageSize: {
        width: responsiveWidth(12),
        height: responsiveHeight(5.2),
        borderRadius: responsiveWidth(30),
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexORGap: {
        flexDirection: 'row',
        gap: responsiveWidth(1),
    },
    daisyText: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 18,
        letterSpacing: -0.5,
        color: '#000000',
    },

    yearText: {
        fontSize: 10,
        fontWeight: '500',
        lineHeight: 12,
        letterSpacing: 0.5,
        color: '#979797',
        right: responsiveHeight(1),
    },
    topforImage: {
        top: responsiveHeight(4),
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveWidth(4),
    },
    // Date Modal Styles
    dateModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateModalContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        width: responsiveWidth(90),
        padding: responsiveWidth(5),
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    dateModalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: responsiveHeight(2),
    },
    dateModalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000000',
    },
    dateModalClose: {
        fontSize: 20,
        color: '#666666',
        fontWeight: 'bold',
    },
    datePickerContainer: {
        alignItems: 'center',
        marginVertical: responsiveHeight(2),
        height: responsiveHeight(25),
        justifyContent: 'center',
    },
    datePickerStyle: {
        width: responsiveWidth(80),
        height: responsiveHeight(20),
    },
    dateModalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: responsiveHeight(2),
        gap: responsiveWidth(3),
    },
    dateCancelBtn: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        paddingVertical: responsiveHeight(1.5),
        borderRadius: 8,
        alignItems: 'center',
    },
    dateConfirmBtn: {
        flex: 1,
        backgroundColor: '#58B9D0',
        paddingVertical: responsiveHeight(1.5),
        borderRadius: 8,
        alignItems: 'center',
    },
    dateCancelText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#666666',
    },
    dateConfirmText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFFFFF',
    },
    dateRangeInfo: {
        backgroundColor: '#F8F8F8',
        padding: responsiveWidth(3),
        borderRadius: 8,
        marginTop: responsiveHeight(1),
    },
    dateRangeText: {
        fontSize: 14,
        color: '#333333',
        textAlign: 'center',
    },
    // New date input styles
    dateInputsContainer: {
        paddingVertical: responsiveHeight(2),
        gap: responsiveHeight(2),
    },
    dateInputGroup: {
        gap: responsiveHeight(0.5),
    },
    dateLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333333',
        marginBottom: responsiveHeight(0.5),
    },
    dateInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#E9ECEF',
        borderRadius: 8,
        paddingHorizontal: responsiveWidth(4),
        paddingVertical: responsiveHeight(1.5),
    },
    dateInputText: {
        fontSize: 16,
        color: '#333333',
        fontWeight: '500',
    },
    dateInputIcon: {
        width: 12,
        height: 12,
        tintColor: '#666666',
    },
    durationContainer: {
        backgroundColor: '#E8F5E8',
        padding: responsiveWidth(3),
        borderRadius: 8,
        alignItems: 'center',
        marginTop: responsiveHeight(1),
    },
    durationText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4CAF50',
    },
    // Pet loading and error states
    loadingContainer: {
        alignItems: 'center',
        paddingVertical: responsiveHeight(4),
        gap: responsiveHeight(1),
    },
    loadingText: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
    },
    errorContainer: {
        alignItems: 'center',
        paddingVertical: responsiveHeight(3),
        gap: responsiveHeight(1.5),
    },
    errorText: {
        fontSize: 14,
        color: '#F44336',
        textAlign: 'center',
        lineHeight: 20,
    },
    retryButton: {
        backgroundColor: '#58B9D0',
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(1),
        borderRadius: 6,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    noPetsContainer: {
        alignItems: 'center',
        paddingVertical: responsiveHeight(4),
    },
    noPetsText: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        lineHeight: 22,
    },
    selectionIcon: {
        width: 24,
        height: 24,
    },
    selectedIcon: {
        tintColor: '#58B9D0',
    },
});

export default boardingmodalstyles;