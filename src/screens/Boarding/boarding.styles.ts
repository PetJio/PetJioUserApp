import { StyleSheet, Platform } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const boardingstyles = StyleSheet.create({
  parentContainer: {
      flex: 1,
      backgroundColor: "#F5F7FA",
  },
  relative: {
      position: 'relative',
  },
  positionDateTimeIcon: {
      width: responsiveWidth(100),
      padding: responsiveWidth(4),
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      top: responsiveHeight(5),
  },
  flexGap: {
      flexDirection: 'row',
      gap: responsiveWidth(1),
  },
  iconColor: {
      tintColor: "#000000",
      top: responsiveHeight(0.50),
  },
  textDateTime: {
      color: "#000000",
      fontSize: 20,
      fontWeight: '500',
  },
  trackingPositionIcon: {
      flexDirection: 'row',
      gap: responsiveWidth(1),
      top: responsiveHeight(0.50),
  },
  trackTextColor: {
      color: "#000000",
  },
  trackIcon: {
      tintColor: "#000000",
      top: responsiveHeight(0.25),
  },
  selectDateText: {
      padding: responsiveWidth(5),
      top: responsiveHeight(11),
      color: "#000000",
      fontSize: 16,
      fontWeight: '600',
  },
  calendarPosition: {
      top: responsiveHeight(11),
      paddingHorizontal: responsiveWidth(3),
  },
  container: {
      gap: responsiveWidth(4),
      padding: responsiveWidth(4),
      top: responsiveHeight(12),
  },
  label: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
  },
  row: {
      flexDirection: "row",
      justifyContent: "space-between",
  },
  inputBox: {
      flexDirection: "row",
      alignItems: "center",
      width: responsiveWidth(45),
      paddingHorizontal: responsiveWidth(0.40),
      backgroundColor: "#fff",
  },
  textInput: {
      flex: 1,
      fontSize: 16,
      color: "#333",
      height: responsiveHeight(5),
      marginLeft: responsiveWidth(1),
  },
  filterIcon: {
      width: responsiveWidth(5),
      height: responsiveHeight(2),
  },

    // Header Styles - Enhanced Modern Design
  chatHeaderContainer: {
      width: responsiveWidth(100),
      paddingHorizontal: responsiveWidth(5),
      height: responsiveHeight(14),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'absolute',
      top: 0,
      backgroundColor: '#FFFFFF',
      elevation: 8,
      shadowColor: '#58B9D0',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      zIndex: 10,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(88, 185, 208, 0.1)',
  },

  // Enhanced Header Component Styles
  headerLeft: {
      flexDirection: 'row',
      gap: responsiveWidth(3),
      alignItems: 'center',
  },
  
  backIcon: {
      tintColor: '#58B9D0',
      width: responsiveWidth(6),
      height: responsiveWidth(6),
  },
  
  headerTitle: {
      color: '#1A1D29',
      fontSize: 22,
      fontWeight: '700',
      letterSpacing: -0.5,
  },
  
  headerRight: {
      flexDirection: 'row',
      gap: responsiveWidth(2),
      alignItems: 'center',
      backgroundColor: 'rgba(88, 185, 208, 0.08)',
      paddingHorizontal: responsiveWidth(3),
      paddingVertical: responsiveHeight(0.8),
      borderRadius: responsiveWidth(6),
  },
  
  locationText: {
      color: '#58B9D0',
      fontSize: 14,
      fontWeight: '600',
  },
  
  locationIcon: {
      tintColor: '#58B9D0',
      width: responsiveWidth(4),
      height: responsiveWidth(4),
  },
  
  servicesHeaderLeft: {
      flexDirection: 'row',
      gap: responsiveWidth(1),
      alignItems: 'center',
  },
  
  servicesBackIcon: {
      tintColor: '#000000',
      top: responsiveHeight(0.5),
  },
  
  servicesHeaderTitle: {
      color: '#000000',
      fontSize: 20,
      fontWeight: '500',
  },
  
  // Additional styles for layout
  safeArea: {
      flex: 1,
  },
  
  scrollView: {
      flex: 1,
  },
  
  scrollContent: {
      paddingTop: responsiveHeight(16), // Increased for enhanced header
    //   paddingBottom: 140,
      gap: responsiveHeight(1.5),
  },
  
  // Enhanced Content Section
  contentSection: {
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 12,
  },
  
  sectionTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#1A1D29',
      marginBottom: 16,
      letterSpacing: -0.3,
  },
  
  // Enhanced Button Styles
  bottomButtonContainer: {
      paddingHorizontal: 20,
      paddingVertical: 20,
      backgroundColor: 'transparent',
      borderTopWidth: 0,
  },
  
  modernButton: {
      width: '100%',
      height: responsiveHeight(7),
      borderRadius: 16,
      backgroundColor: '#58B9D0',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 0,
      elevation: 8,
      shadowColor: 'rgba(88, 185, 208, 0.4)',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
  },
  
  modernButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
  },
  
  // Enhanced Section Card Styles
  sectionCard: {
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      padding: 20,
      marginHorizontal: 20,
      marginBottom: 12,
      borderWidth: 0,
      elevation: 6,
      shadowColor: 'rgba(88, 185, 208, 0.3)',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
  },
  
  sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(88, 185, 208, 0.1)',
  },
  
  sectionHeaderIcon: {
      marginRight: 12,
      backgroundColor: 'rgba(88, 185, 208, 0.1)',
      padding: 8,
      borderRadius: 12,
  },
  
  sectionHeaderTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: '#1A1D29',
      flex: 1,
      letterSpacing: -0.3,
  },
  
  // Enhanced Calendar Styles
  calendarContainer: {
      backgroundColor: 'rgba(88, 185, 208, 0.03)',
      borderRadius: 16,
      padding: 12,
      borderWidth: 1,
      borderColor: 'rgba(88, 185, 208, 0.1)',
      marginTop: 8,
  },
  
  calendar: {
      borderRadius: 12,
      paddingHorizontal: 8,
      backgroundColor: 'transparent',
  },
  
  dateButton: {
      height: responsiveWidth(11),
      width: responsiveWidth(11),
      borderRadius: responsiveWidth(5.5),
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'rgba(88, 185, 208, 0.1)',
      margin: responsiveWidth(0.5),
      elevation: 2,
      shadowColor: 'rgba(88, 185, 208, 0.2)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
  },
  
  dateButtonSelected: {
      backgroundColor: '#58B9D0',
      borderColor: '#4A9FB8',
      elevation: 4,
      shadowColor: 'rgba(88, 185, 208, 0.4)',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      transform: [{ scale: 1.05 }],
  },
  
  dateText: {
      fontSize: 13,
      color: '#1A1D29',
      fontWeight: '600',
  },
  
  dateTextSelected: {
      color: '#FFFFFF',
      fontWeight: '700',
  },
  
  dateTextDisabled: {
      color: 'rgba(26, 29, 41, 0.3)',
  },
  
  // Native Picker Styles
  nativePickerContainer: {
      backgroundColor: '#F8F9FB',
      borderWidth: 1,
      borderColor: '#E8EBF0',
      borderRadius: 8,
      overflow: 'hidden',
      marginTop: 8,
  },
  
  nativePicker: {
      height: responsiveHeight(20),
      width: '100%',
      backgroundColor: '#F8F9FB',
  },
  
  nativePickerItem: {
      fontSize: 16,
      color: '#1A1D29',
      fontWeight: '500',
      height: responsiveHeight(20),
  },
  
  pickerItemStyle: {
      fontSize: 16,
      color: '#1A1D29',
  },
  
  // Fixed Button (legacy - keeping for backup)
  fixedButtonContainer: {
      position: 'absolute',
      bottom: responsiveHeight(3),
      width: '100%',
      alignItems: 'center',
  },
  nextBtnContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: responsiveWidth(92),
      height: responsiveHeight(5),
      borderRadius: responsiveHeight(0.80),
      backgroundColor: '#58B9D0',
  },
  nextBtnText: {
      fontSize: 16,
      fontWeight: '400',
      color: '#FFFFFF',
  },
  // Enhanced Button Style to work with profileStyles common button
  enhancedButton: {
    marginTop: responsiveHeight(1),
    elevation: 8,
    shadowColor: 'rgba(88, 185, 208, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    borderRadius: 16,
  },
  
  // Location Detection Styles
  locationDetectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1),
    borderRadius: 8,
    marginBottom: responsiveHeight(1.5),
  },
  
  locationDetectedText: {
    marginLeft: responsiveWidth(2),
    fontSize: 14,
    color: '#2E7D32',
    fontWeight: '500',
  },

  // Enhanced Modern Input Styles
  modernInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'rgba(88, 185, 208, 0.15)',
    borderRadius: 14,
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(2.2),
    marginTop: 12,
    elevation: 2,
    shadowColor: 'rgba(88, 185, 208, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  placeholderText: {
    fontSize: 16,
    color: 'rgba(26, 29, 41, 0.4)',
    fontWeight: '500',
  },

  selectedValueText: {
    fontSize: 16,
    color: '#1A1D29',
    fontWeight: '600',
  },

  // Enhanced Bottom Sheet Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },

  bottomSheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: responsiveWidth(8),
    borderTopRightRadius: responsiveWidth(8),
    paddingHorizontal: responsiveWidth(5),
    paddingBottom: responsiveHeight(6),
    maxHeight: responsiveHeight(65),
    elevation: 20,
    shadowColor: 'rgba(88, 185, 208, 0.4)',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },

  bottomSheetHandle: {
    width: responsiveWidth(12),
    height: responsiveHeight(0.6),
    backgroundColor: 'rgba(88, 185, 208, 0.3)',
    borderRadius: responsiveHeight(0.3),
    alignSelf: 'center',
    marginTop: responsiveHeight(1.5),
    marginBottom: responsiveHeight(0.5),
  },

  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveHeight(3),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(88, 185, 208, 0.1)',
    marginBottom: responsiveHeight(2),
  },

  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1D29',
    letterSpacing: -0.5,
  },

  bottomSheetItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: responsiveHeight(2.5),
    paddingHorizontal: responsiveWidth(4),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(240, 242, 245, 0.5)',
    borderRadius: 12,
    marginBottom: 4,
    backgroundColor: '#FAFBFC',
  },

  bottomSheetItemText: {
    fontSize: 16,
    color: '#1A1D29',
    fontWeight: '500',
  },

  // Services-style Header (matching Services page)
  servicesStyleHeader: {
    backgroundColor: '#F8F9FB',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E8EBF0',
  },

  backButtonContainer: {
    marginRight: 12,
  },

  newServicesBackIcon: {
    tintColor: '#58B9D0',
    width: responsiveWidth(6),
    height: responsiveWidth(6),
  },

  servicesHeaderTitleContainer: {
    flex: 1,
  },

  newServicesHeaderTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1D29',
    marginBottom: 2,
  },

  servicesHeaderSubtitle: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },

  // Reduced scroll content padding after city selection
  scrollContentReduced: {
    paddingTop: responsiveHeight(2),
    // paddingBottom: 140,
    gap: responsiveHeight(1.5),
  },

  // Date gaps in calendar
  calendarWithGaps: {
    borderRadius: 12,
    paddingHorizontal: 8,
    backgroundColor: 'transparent',
  },

  dateButtonWithGaps: {
    height: responsiveWidth(8.5),
    width: responsiveWidth(8.5),
    borderRadius: responsiveWidth(5.5),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(88, 185, 208, 0.1)',
    margin: responsiveWidth(1), // Increased margin for gaps
    elevation: 2,
    shadowColor: 'rgba(88, 185, 208, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  
});

export default boardingstyles;


