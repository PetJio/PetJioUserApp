import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const addvaccinationstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FB',
    },
    
    // Standardized Boarding Header
    boardingStandardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(4),
        paddingTop: responsiveHeight(2),
        paddingBottom: responsiveHeight(1.5),
        backgroundColor: '#F8F9FB',
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
    },
    boardingBackButton: {
        width: responsiveWidth(10),
        height: responsiveHeight(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: responsiveWidth(2),
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    boardingHeaderTitleContainer: {
        flex: 1,
        marginLeft: responsiveWidth(3),
    },
    boardingHeaderTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1A1A1A',
        lineHeight: 24,
    },
    boardingHeaderSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: responsiveHeight(0.3),
        lineHeight: 18,
    },
    boardingHeaderActions: {
        width: responsiveWidth(10),
    },
    
    // Scroll View
    scrollView: {
        flex: 1,
        backgroundColor: '#F8F9FB',
    },
    scrollContent: {
        paddingBottom: responsiveHeight(12),
    },
    
    // Hero Section
    heroSection: {
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(4),
        paddingVertical: responsiveHeight(3),
        backgroundColor: '#FFFFFF',
        marginBottom: responsiveHeight(2),
    },
    heroImageContainer: {
        width: responsiveWidth(25),
        height: responsiveWidth(25),
        borderRadius: responsiveWidth(12.5),
        backgroundColor: '#E8F4FD',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: responsiveHeight(2),
    },
    heroImage: {
        width: responsiveWidth(20),
        height: responsiveWidth(20),
        borderRadius: responsiveWidth(10),
    },
    heroTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: responsiveHeight(0.5),
    },
    heroSubtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 22,
    },
    
    // Form Section
    formSection: {
        paddingHorizontal: responsiveWidth(4),
    },
    sectionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: responsiveWidth(4),
        padding: responsiveWidth(5),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: responsiveHeight(3),
        paddingBottom: responsiveHeight(1.5),
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    sectionHeaderTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
        marginLeft: responsiveWidth(2),
    },
    
    // Input Groups
    inputGroup: {
        marginBottom: responsiveHeight(2.5),
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#374151',
        marginBottom: responsiveHeight(0.8),
    },
    textInput: {
        backgroundColor: '#FFFFFF',
    },
    inputContent: {
        backgroundColor: '#F8F9FB',
        paddingVertical: responsiveHeight(1.5),
    },
    inputOutline: {
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
    
    // Bottom Sheet Trigger
    bottomSheetTrigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F8F9FB',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: responsiveWidth(4),
        paddingHorizontal: responsiveWidth(4),
        paddingVertical: responsiveHeight(1.8),
        minHeight: responsiveHeight(6),
    },
    bottomSheetTriggerText: {
        fontSize: 16,
        color: '#1A1A1A',
        flex: 1,
    },
    bottomSheetPlaceholder: {
        color: '#9CA3AF',
    },
    
    // Date Row
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: responsiveWidth(3),
    },
    dateColumn: {
        flex: 1,
    },
    dateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FB',
        borderWidth: 1,
        borderColor: '#E8E8E8',
        borderRadius: responsiveWidth(4),
        paddingHorizontal: responsiveWidth(4),
        paddingVertical: responsiveHeight(1.8),
        minHeight: responsiveHeight(6),
        gap: responsiveWidth(2),
    },
    dateText: {
        fontSize: 16,
        color: '#1A1A1A',
        flex: 1,
    },
    
    // Checkbox
    checkboxContainer: {
        marginTop: responsiveHeight(1),
    },
    checkboxText: {
        fontSize: 16,
        color: '#374151',
        fontWeight: '500',
        textDecorationLine: 'none',
    },
    
    // Bottom Sheet Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    bottomSheetContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: responsiveWidth(6),
        borderTopRightRadius: responsiveWidth(6),
        paddingBottom: responsiveHeight(4),
        maxHeight: responsiveHeight(70),
    },
    bottomSheetHandle: {
        width: responsiveWidth(12),
        height: responsiveHeight(0.6),
        backgroundColor: '#E5E7EB',
        borderRadius: responsiveWidth(1),
        alignSelf: 'center',
        marginTop: responsiveHeight(1.5),
        marginBottom: responsiveHeight(2),
    },
    bottomSheetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(5),
        paddingBottom: responsiveHeight(2),
        borderBottomWidth: 1,
        borderBottomColor: '#E8E8E8',
    },
    bottomSheetTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    bottomSheetList: {
        paddingTop: responsiveHeight(1),
    },
    bottomSheetItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(5),
        paddingVertical: responsiveHeight(2),
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    bottomSheetItemText: {
        fontSize: 16,
        color: '#1A1A1A',
        flex: 1,
        lineHeight: 22,
    },
    
    // Bottom Button Container
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: responsiveWidth(4),
        paddingTop: responsiveHeight(2),
        paddingBottom: responsiveHeight(3),
        borderTopWidth: 1,
        borderTopColor: '#E8E8E8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
    },



});

export default addvaccinationstyles;