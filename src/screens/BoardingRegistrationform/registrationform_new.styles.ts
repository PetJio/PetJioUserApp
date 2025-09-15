import { StyleSheet, Platform } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { BORDER_RADIUS, FONT_SIZES, rfs } from '../../constants/dimensions';
import { spacing } from '../../styles/spacing';
import { shadows } from '../../styles/shadows';
import colors from '../../styles/colors/index';
import { typography } from '../../styles/typography';

const registrationformstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FB',
    },

    // Header Styles - Matching BoardingDetails
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
        paddingBottom: 180, // Increased space for new button style + extra padding
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

    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A1D29',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F2F5',
    },

    sectionContent: {
        gap: 16,
    },

    subsectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1D29',
        marginBottom: 12,
        marginTop: 8,
    },

    // Input Styles - Matching Login Page
    inputContainer: {
        marginBottom: 4,
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

    textInputMultiline: {
        height: 80,
        textAlignVertical: 'top',
    },

    // Dropdown Styles
    dropdown: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#E8EBF0',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        minHeight: 54,
    },

    selectedTextStyle: {
        fontSize: 16,
        color: '#1A1D29',
        fontWeight: '400',
    },

    placeholderStyle: {
        fontSize: 16,
        color: '#A0A3BD',
        fontWeight: '400',
    },

    iconStyle: {
        width: 20,
        height: 20,
        tintColor: '#58B9D0',
    },

    // Two Column Layout
    twoColumnContainer: {
        flexDirection: 'row',
        gap: 12,
    },

    halfWidth: {
        flex: 1,
    },

    // Checkbox Styles
    checkboxSection: {
        backgroundColor: '#F8F9FB',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: '#E8EBF0',
    },

    checkboxTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1D29',
        marginBottom: 8,
    },

    noteText: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
        marginBottom: 12,
    },

    noteHighlight: {
        fontWeight: '700',
        color: '#58B9D0',
    },

    checkboxRow: {
        flexDirection: 'row',
        gap: 20,
    },

    checkbox: {
        flex: 1,
    },

    checkboxText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1A1D29',
        textDecorationLine: 'none',
    },

    // Vaccination Styles
    vaccinationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },

    addVaccinationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E6F3F7',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D1E7DD',
        gap: 6,
    },

    addVaccinationText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#58B9D0',
    },

    vaccinationCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E8EBF0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },

    vaccinationContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    vaccinationIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },

    vaccinationInfo: {
        flex: 1,
    },

    vaccinationName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1A1D29',
        marginBottom: 4,
    },

    vaccinationExpiry: {
        fontSize: 12,
        fontWeight: '400',
        color: '#4CAF50',
    },

    // Terms and Conditions
    termsContainer: {
        backgroundColor: '#FFFBF0',
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: '#FFE4B5',
    },

    termsTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#B8860B',
        marginBottom: 12,
    },

    termsText: {
        fontSize: 13,
        fontWeight: '400',
        color: '#666',
        lineHeight: 18,
        marginBottom: 8,
    },

    termsHighlight: {
        fontSize: 14,
        fontWeight: '700',
        color: '#B8860B',
        marginBottom: 8,
        marginTop: 8,
    },

    // Bottom Buttons - Matching Login Style
    bottomButtonsContainer: {
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
        gap: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 10,
    },

    downloadButton: {
        width: '100%',
        height: responsiveHeight(6.5),
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#58B9D0',
        backgroundColor: '#E6F3F7',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: spacing.sm,
        shadowColor: '#58B9D0',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
        gap: 8,
    },

    downloadButtonText: {
        color: '#58B9D0',
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.5,
    },

    continueButton: {
        width: '100%',
        height: responsiveHeight(6.5),
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#58B9D0',
        backgroundColor: '#58B9D0',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#58B9D0',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
        gap: 8,
    },

    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.5,
    },

    // Legacy styles for backward compatibility (can be removed later)
    positionDateTimeIcon: {
        display: 'none', // Hide old header
    },
    relative: {
        display: 'none',
    },
    selectDateText: {
        display: 'none',
    },
    flexGap: {
        display: 'none',
    },
    iconColor: {
        display: 'none',
    },
    textDateTime: {
        display: 'none',
    },
    dropdownMarginTop: {
        display: 'none',
    },
    petText: {
        display: 'none',
    },
    descriptionText: {
        display: 'none',
    },
    divideTextInputField: {
        display: 'none',
    },
    GapTextorlabel: {
        display: 'none',
    },
    addressTextView: {
        display: 'none',
    },
    DivideTextInputField: {
        display: 'none',
    },
    TextInputField: {
        display: 'none',
    },
    TreatsTextInputField: {
        display: 'none',
    },
    borderRadiousBtn: {
        display: 'none',
    },
    selectedborderRadiousBtn: {
        display: 'none',
    },
    ButtonText: {
        display: 'none',
    },
    selectedButtonText: {
        display: 'none',
    },
    vaccinationView: {
        display: 'none',
    },
    fixedButtonContainer: {
        display: 'none',
    },
    nextBtnContainer: {
        display: 'none',
    },
    nextBtnText: {
        display: 'none',
    },
    imageStyle: {
        display: 'none',
    },
    dividedropdown: {
        display: 'none',
    },

    // Bottom Sheet Styles
    bottomSheetOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },

    bottomSheetContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '70%',
        paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    },

    bottomSheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E8EBF0',
    },

    bottomSheetTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1D29',
    },

    bottomSheetCloseButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F0F2F5',
        justifyContent: 'center',
        alignItems: 'center',
    },

    bottomSheetContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },

    bottomSheetItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F2F5',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    bottomSheetItemText: {
        fontSize: 16,
        color: '#1A1D29',
        flex: 1,
    },

    bottomSheetSelectedItem: {
        backgroundColor: '#E6F3F7',
        marginHorizontal: -20,
        paddingHorizontal: 20,
        borderRadius: 0,
    },

    bottomSheetSelectedText: {
        color: '#58B9D0',
        fontWeight: '600',
    },
});

export default registrationformstyles;
