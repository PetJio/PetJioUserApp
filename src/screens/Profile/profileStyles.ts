import { StyleSheet, Platform } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';
import colors from '../../styles/colors/index';
import { spacing } from '../../styles/spacing';
import { BORDER_RADIUS, FONT_SIZES, rfs } from '../../constants/dimensions';
import { shadows } from '../../styles/shadows';
import { typography } from '../../styles/typography';

const profileStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FB',
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#F8F9FB',
        paddingTop: spacing.sm,
    },
    headerContainer: {
        position: 'relative',
        height: responsiveHeight(35),
        overflow: 'hidden',
    },
    backgroundImage: {
        width: responsiveWidth(100),
        height: responsiveHeight(35),
        resizeMode: 'cover',
    },
    gradientOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: responsiveHeight(15),
    },
    backButton: {
        position: 'absolute',
        top: responsiveHeight(6),
        left: responsiveWidth(5),
        width: responsiveWidth(12),
        height: responsiveWidth(12),
        borderRadius: responsiveWidth(6),
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.sm,
    },
    backIcon: {
        width: responsiveWidth(6),
        height: responsiveHeight(1.5),
        tintColor: colors.textPrimary,
    },
    profileImageContainer: {
        position: 'absolute',
        bottom: -responsiveHeight(8),
        alignSelf: 'center',
        width: responsiveWidth(32),
        height: responsiveWidth(32),
        borderRadius: responsiveWidth(16),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        ...shadows.lg,
        zIndex: 1000,
    },
    profileImage: {
        width: responsiveWidth(28),
        height: responsiveWidth(28),
        borderRadius: responsiveWidth(14),
        backgroundColor: colors.background,
    },
    profileImagePlaceholder: {
        width: responsiveWidth(28),
        height: responsiveWidth(28),
        borderRadius: responsiveWidth(14),
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.border,
        borderStyle: 'dashed',
    },
    profileImageIcon: {
        marginBottom: spacing.xs,
    },
    profileImageText: {
        fontSize: FONT_SIZES.sm,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#F8F9FB',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.sm,
        borderRadius: BORDER_RADIUS.xl,
        marginTop: -spacing.sm,
    },
    welcomeSection: {
        marginBottom: spacing.lg,
        alignItems: 'center',
    },
    profileName: {
        fontSize: rfs(3.8),
        fontWeight: typography.fontWeight.bold,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
        textAlign: 'center',
        letterSpacing: 0.5,
        textShadowColor: 'rgba(0,0,0,0.1)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 2,
    },
    profileSubtitle: {
        fontSize: FONT_SIZES.lg,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: responsiveHeight(2.5),
    },
    singleEditButton: {
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        borderRadius: BORDER_RADIUS.xl,
        backgroundColor: 'rgba(88, 185, 208, 0.1)',
        borderWidth: 2,
        borderColor: '#58B9D0',
        ...shadows.sm,
        gap: spacing.xs,
        minWidth: responsiveWidth(50),
    },
    editButtonText: {
        color: '#58B9D0',
        fontSize: FONT_SIZES.md,
        fontWeight: typography.fontWeight.semibold,
    },
    formSection: {
        flex: 1,
        paddingTop: spacing.sm,
    },
    inputGroup: {
        marginBottom: spacing.lg,
        gap: responsiveHeight(1.8),
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        fontSize: FONT_SIZES.lg,
        marginBottom: spacing.xs,
        borderWidth: 0,
    },
    inputContent: {
        paddingHorizontal: spacing.md,
        fontSize: FONT_SIZES.lg,
        color: colors.textPrimary,
    },
    inputOutline: {
        borderWidth: 1.5,
        borderColor: '#E8EBF0',
        backgroundColor: '#FFFFFF',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacing.md,
        marginTop: spacing.lg,
        marginBottom: spacing.xl,
    },
    saveButton: {
        flex: 1,
        height: responsiveHeight(7),
        borderRadius: BORDER_RADIUS.xl,
        marginRight: spacing.xs,
        ...shadows.lg,
        shadowColor: '#58B9D0',
        elevation: 8,
    },
    cancelButton: {
        flex: 1,
        height: responsiveHeight(7),
        borderRadius: BORDER_RADIUS.xl,
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderWidth: 2,
        borderColor: '#FF6B6B',
        borderStyle: 'solid',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: spacing.xs,
        ...shadows.md,
        elevation: 4,
    },
    buttonGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDER_RADIUS.xl,
    },
    saveButtonText: {
        color: colors.white,
        fontSize: FONT_SIZES.lg,
        fontWeight: typography.fontWeight.bold,
        letterSpacing: 0.5,
    },
    cancelButtonText: {
        color: '#FF6B6B',
        fontSize: FONT_SIZES.lg,
        fontWeight: typography.fontWeight.bold,
        letterSpacing: 0.5,
    },
    messageContainer: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.lg,
        borderRadius: BORDER_RADIUS.xl,
        marginBottom: spacing.md,
        alignItems: 'center',
        ...shadows.md,
        elevation: 4,
    },
    successMessage: {
        backgroundColor: '#4CAF50',
    },
    errorMessage: {
        backgroundColor: '#FF6B6B',
    },
    messageText: {
        color: colors.white,
        fontSize: FONT_SIZES.md,
        textAlign: 'center',
        fontWeight: typography.fontWeight.semibold,
    },
    inputError: {
        borderColor: '#FF6B6B',
    },
    errorText: {
        color: '#FF6B6B',
        fontSize: FONT_SIZES.sm,
        marginTop: -spacing.xs,
        marginBottom: responsiveHeight(0.5),
        marginLeft: spacing.sm,
        fontWeight: typography.fontWeight.medium,
    },
    loadingButton: {
        opacity: 0.7,
    },
    readOnlyInput: {
        backgroundColor: '#F8F9FA',
    },
    readOnlyText: {
        color: colors.textSecondary,
    },
    sectionTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: typography.fontWeight.bold,
        color: colors.textPrimary,
        marginBottom: spacing.md,
        marginTop: spacing.lg,
    },
    infoContainer: {
        backgroundColor: 'rgba(88, 185, 208, 0.05)',
        padding: spacing.md,
        borderRadius: BORDER_RADIUS.lg,
        borderLeftWidth: 4,
        borderLeftColor: '#58B9D0',
        marginBottom: spacing.lg,
    },
    infoText: {
        color: colors.textSecondary,
        fontSize: FONT_SIZES.md,
        lineHeight: responsiveHeight(2.5),
    },
    // Modern Clean Profile Styles
    cleanHeader: {
        backgroundColor: '#FAFBFC',
        paddingTop: responsiveHeight(8),
        paddingBottom: responsiveHeight(4),
        paddingHorizontal: spacing.xl,
        borderBottomLeftRadius: BORDER_RADIUS.xl,
        borderBottomRightRadius: BORDER_RADIUS.xl,
        borderWidth: 1,
        borderColor: '#E8EBF0',
        borderTopWidth: 0,
    },
    profileSection: {
        alignItems: 'center',
    },
    modernProfileContainer: {
        alignItems: 'center',
        marginBottom: spacing.xl,
        position: 'relative',
    },
    profilePictureButton: {
        marginBottom: spacing.sm,
    },
    profilePictureWrapper: {
        position: 'relative',
        width: responsiveWidth(35),
        height: responsiveWidth(35),
        borderRadius: responsiveWidth(17.5),
        backgroundColor: colors.background,
        borderWidth: 2,
        borderColor: '#E8EBF0',
    },
    modernProfileImage: {
        width: responsiveWidth(35),
        height: responsiveWidth(35),
        borderRadius: responsiveWidth(17.5),
        backgroundColor: '#f0f0f0',
        borderWidth: 4,
        borderColor: '#FFFFFF',
    },
    editIconOverlay: {
        position: 'absolute',
        bottom: 6,
        right: 6,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#58B9D0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    modernUploadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: responsiveWidth(17.5),
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tapToChangeText: {
        fontSize: FONT_SIZES.sm,
        color: colors.textSecondary,
        fontWeight: typography.fontWeight.medium,
    },
    userInfoSection: {
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    modernProfileName: {
        fontSize: rfs(4.8),
        fontWeight: typography.fontWeight.bold,
        color: '#1A1D29',
        marginBottom: spacing.xs,
        textAlign: 'center',
        letterSpacing: 0.5,
        textShadowColor: 'rgba(0,0,0,0.1)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 2,
    },
    modernProfileEmail: {
        fontSize: FONT_SIZES.md,
        color: '#58B9D0',
        marginBottom: spacing.xs,
        fontWeight: typography.fontWeight.medium,
    },
    modernBusinessName: {
        fontSize: FONT_SIZES.md,
        color: colors.textSecondary,
        fontStyle: 'italic',
    },
    businessName: {
        fontSize: FONT_SIZES.lg,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: spacing.xs,
        fontStyle: 'italic',
    },
    profileEmail: {
        fontSize: FONT_SIZES.md,
        color: '#58B9D0',
        textAlign: 'center',
        marginBottom: spacing.md,
        fontWeight: typography.fontWeight.medium,
    },
    topControls: {
        marginBottom: spacing.lg,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacing.md,
    },
    logoutButton: {
        flex: 1,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        borderRadius: BORDER_RADIUS.xl,
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderWidth: 2,
        borderColor: '#FF6B6B',
        ...shadows.sm,
    },
    logoutButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
    },
    logoutButtonText: {
        color: '#FF6B6B',
        fontSize: FONT_SIZES.md,
        fontWeight: typography.fontWeight.semibold,
    },
    saveButtonGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDER_RADIUS.xl,
    },
    saveButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
    },
    loadingText: {
        color: colors.white,
        fontSize: FONT_SIZES.md,
        fontWeight: typography.fontWeight.medium,
    },
    // Bottom Section Styles
    bottomSection: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        paddingBottom: responsiveHeight(3),
        backgroundColor: '#F8F9FB',
        alignItems: 'center',
        gap: spacing.md,
    },
    bottomSaveButton: {
        width: '100%',
        height: responsiveHeight(7),
        borderRadius: BORDER_RADIUS.xl,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: '#4A9FB8',
    },
    bottomSaveButtonText: {
        color: colors.white,
        fontSize: FONT_SIZES.xl,
        fontWeight: typography.fontWeight.bold,
        letterSpacing: 0.5,
    },
    bottomLogoutButton: {
        width: '100%',
        height: responsiveHeight(7),
        borderRadius: BORDER_RADIUS.xl,
        borderWidth: 1,
        borderColor: '#FF5252',
    },
    logoutButtonGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDER_RADIUS.xl,
    },
    bottomLogoutButtonText: {
        color: colors.white,
        fontSize: FONT_SIZES.lg,
        fontWeight: typography.fontWeight.bold,
        letterSpacing: 0.5,
    },
    versionText: {
        fontSize: FONT_SIZES.sm,
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: spacing.md,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        paddingHorizontal: spacing.xl,
    },
    // Tab Navigation Styles
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: spacing.lg,
        marginTop: spacing.xs,
        marginBottom: spacing.md,
        borderRadius: BORDER_RADIUS.xl,
        padding: spacing.xs,
        borderWidth: 1,
        borderColor: '#E8EBF0',
    },
    tabButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.sm,
        borderRadius: BORDER_RADIUS.lg,
        gap: spacing.xs,
    },
    activeTab: {
        backgroundColor: '#58B9D0',
        borderWidth: 1,
        borderColor: '#4A9FB8',
    },
    tabText: {
        fontSize: FONT_SIZES.md,
        fontWeight: typography.fontWeight.medium,
        color: '#999',
    },
    activeTabText: {
        color: '#FFFFFF',
        fontWeight: typography.fontWeight.bold,
    },
    // Pets Section Styles
    petsSection: {
        flex: 1,
        paddingTop: spacing.md,
    },
    emptyPetsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: responsiveHeight(10),
    },
    emptyPetsText: {
        fontSize: FONT_SIZES.xl,
        fontWeight: typography.fontWeight.semibold,
        color: colors.textSecondary,
        marginTop: spacing.md,
    },
    emptyPetsSubtext: {
        fontSize: FONT_SIZES.md,
        color: colors.textSecondary,
        marginTop: spacing.xs,
    },
    // Pet Card Styles
    petCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: BORDER_RADIUS.xl,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: '#E8EBF0',
    },
    petCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    petImageContainer: {
        marginRight: spacing.md,
    },
    petImage: {
        width: responsiveWidth(16),
        height: responsiveWidth(16),
        borderRadius: responsiveWidth(8),
        backgroundColor: '#f0f0f0',
        borderWidth: 2,
        borderColor: '#E8E8E8',
    },
    petBasicInfo: {
        flex: 1,
    },
    petName: {
        fontSize: FONT_SIZES.lg,
        fontWeight: typography.fontWeight.bold,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    petCategory: {
        fontSize: FONT_SIZES.md,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
    petSize: {
        fontSize: FONT_SIZES.sm,
        color: colors.textSecondary,
    },
    editPetButton: {
        padding: spacing.sm,
        borderRadius: BORDER_RADIUS.lg,
        backgroundColor: 'rgba(88, 185, 208, 0.1)',
    },
    petEditForm: {
        borderTopWidth: 1,
        borderTopColor: colors.border,
        paddingTop: spacing.md,
    },
    petInputRow: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },
    petInputHalf: {
        flex: 1,
    },
    petInput: {
        backgroundColor: colors.background,
        fontSize: FONT_SIZES.md,
    },
    petInputFull: {
        backgroundColor: colors.background,
        fontSize: FONT_SIZES.md,
        marginBottom: spacing.sm,
    },
    petActionButtons: {
        flexDirection: 'row',
        gap: spacing.md,
        marginTop: spacing.md,
    },
    petCancelButton: {
        flex: 1,
        paddingVertical: spacing.md,
        borderRadius: BORDER_RADIUS.xl,
        backgroundColor: 'rgba(255, 107, 107, 0.1)',
        borderWidth: 1,
        borderColor: '#FF6B6B',
        alignItems: 'center',
    },
    petCancelButtonText: {
        color: '#FF6B6B',
        fontSize: FONT_SIZES.md,
        fontWeight: typography.fontWeight.semibold,
    },
    petSaveButton: {
        flex: 1,
        height: responsiveHeight(6),
        borderRadius: BORDER_RADIUS.xl,
        borderWidth: 1,
        borderColor: '#4A9FB8',
    },
    petSaveGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDER_RADIUS.xl,
    },
    petSaveButtonText: {
        color: colors.white,
        fontSize: FONT_SIZES.md,
        fontWeight: typography.fontWeight.bold,
    },
    
    // New Enhanced UI Styles
    profileWelcomeCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: BORDER_RADIUS.xl,
        padding: spacing.xl,
        marginHorizontal: spacing.lg,
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: '#E8EBF0',
    },
    
    profileStatsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        borderRadius: BORDER_RADIUS.xl,
        padding: spacing.lg,
        marginHorizontal: spacing.lg,
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: '#E8EBF0',
    },
    
    profileStat: {
        alignItems: 'center',
    },
    
    profileStatNumber: {
        fontSize: rfs(3.5),
        fontWeight: typography.fontWeight.bold,
        color: '#58B9D0',
        marginBottom: spacing.xs,
    },
    
    profileStatLabel: {
        fontSize: FONT_SIZES.sm,
        color: colors.textSecondary,
        fontWeight: typography.fontWeight.medium,
    },
    
    sectionCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: BORDER_RADIUS.xl,
        padding: spacing.md,
        marginBottom: spacing.md,
        borderWidth: 1,
        borderColor: '#E8EBF0',
    },
    
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
        paddingBottom: spacing.xs,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F2F5',
    },
    
    sectionHeaderIcon: {
        marginRight: spacing.sm,
    },
    
    sectionHeaderTitle: {
        fontSize: FONT_SIZES.xl,
        fontWeight: typography.fontWeight.bold,
        color: '#1A1D29',
        flex: 1,
    },
    
    inputFocused: {
        borderColor: '#58B9D0',
        borderWidth: 2,
    },
    
    floatingActionButton: {
        position: 'absolute',
        bottom: responsiveHeight(3),
        right: spacing.lg,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#58B9D0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#4A9FB8',
    },
    
    profileBadge: {
        backgroundColor: '#E8F5E8',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: BORDER_RADIUS.md,
        alignSelf: 'center',
        marginBottom: spacing.md,
    },
    
    profileBadgeText: {
        color: '#4CAF50',
        fontSize: FONT_SIZES.sm,
        fontWeight: typography.fontWeight.semibold,
    },
    
    addPetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: BORDER_RADIUS.lg,
        backgroundColor: 'rgba(88, 185, 208, 0.1)',
        borderWidth: 1,
        borderColor: '#58B9D0',
        gap: spacing.xs,
    },
    
    addPetButtonText: {
        color: '#58B9D0',
        fontSize: FONT_SIZES.md,
        fontWeight: typography.fontWeight.semibold,
    },
    
    // Sticky Header Styles
    stickyHeader: {
        backgroundColor: '#F8F9FB',
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 16,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E8EBF0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    
    headerTitleContainer: {
        flex: 1,
    },
    
    headerTitle: {
        fontSize: FONT_SIZES.xxl,
        fontWeight: typography.fontWeight.bold,
        color: '#1A1D29',
        marginBottom: 2,
    },
    
    headerSubtitle: {
        fontSize: FONT_SIZES.sm,
        color: '#666',
        fontWeight: typography.fontWeight.medium,
    },
    
    profilePhotoSection: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.md,
        paddingBottom: spacing.sm,
    },
    
    profilePhotoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: spacing.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E8EBF0',
    },
    
    profilePhotoButton: {
        marginBottom: spacing.md,
    },
    
    profilePhotoWrapper: {
        position: 'relative',
        width: responsiveWidth(30),
        height: responsiveWidth(30),
        borderRadius: responsiveWidth(15),
        backgroundColor: colors.background,
        borderWidth: 4,
        borderColor: '#FFFFFF',
    },
    
    profilePhotoImage: {
        width: responsiveWidth(30),
        height: responsiveWidth(30),
        borderRadius: responsiveWidth(15),
        backgroundColor: '#f0f0f0',
    },
    
    uploadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: responsiveWidth(15),
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        gap: spacing.sm,
    },
    
    uploadingText: {
        fontSize: FONT_SIZES.sm,
        color: '#58B9D0',
        fontWeight: typography.fontWeight.semibold,
    },
    
    cameraIconOverlay: {
        position: 'absolute',
        bottom: 6,
        right: 6,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#58B9D0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#FFFFFF',
    },
    
    userInfoContainer: {
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    
    userName: {
        fontSize: rfs(3.6),
        fontWeight: typography.fontWeight.bold,
        color: '#1A1D29',
        textAlign: 'center',
        marginBottom: spacing.xs,
    },
    
    userEmail: {
        fontSize: FONT_SIZES.lg,
        color: '#58B9D0',
        fontWeight: typography.fontWeight.medium,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: BORDER_RADIUS.lg,
        gap: spacing.xs,
    },
    
    verifiedText: {
        fontSize: FONT_SIZES.sm,
        color: '#4CAF50',
        fontWeight: typography.fontWeight.semibold,
    },
    
    photoUploadText: {
        fontSize: FONT_SIZES.sm,
        color: '#666',
        fontWeight: typography.fontWeight.medium,
        textAlign: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    // Common Button Styles for consistent UI across app
    commonButton: {
        width: '100%',
        height: responsiveHeight(6.5),
        borderRadius: 20,
        borderWidth: 2,
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
    },
    
    commonButtonPrimary: {
        borderColor: '#58B9D0',
        backgroundColor: '#E6F3F7',
    },
    
    commonButtonDanger: {
        borderColor: '#FF6B6B',
        backgroundColor: '#FFF5F5',
    },
    
    commonButtonGray: {
        borderColor: '#D1D5DB',
        backgroundColor: '#F9FAFB',
    },
    
    commonButtonText: {
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    
    commonButtonTextPrimary: {
        color: '#58B9D0',
    },
    
    commonButtonTextDanger: {
        color: '#FF6B6B',
    },
    
    commonButtonTextGray: {
        color: '#6B7280',
    },
    
    commonButtonIcon: {
        marginRight: 8,
    },
    
    commonButtonIconSmall: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
});

export default profileStyles;