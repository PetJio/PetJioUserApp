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

const signinStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FB',
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#F8F9FB',
    },
    
    // Sticky Header Styles (matching Profile page)
    stickyHeader: {
        backgroundColor: '#F8F9FB',
        borderBottomWidth: 1,
        borderBottomColor: '#E8EBF0',
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingHorizontal: 20,
        paddingBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E6F3F7',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1E7DD',
    },
    headerTitleContainer: {
        flex: 1,
        marginLeft: 12,
    },
    headerTitle: {
        fontSize: rfs(3.5),
        fontWeight: 'bold',
        color: '#1A1D29',
        marginBottom: 2,
    },
    headerSubtitle: {
        fontSize: rfs(1.8),
        color: '#666',
        fontWeight: '500',
    },
    headerPlaceholder: {
        width: 44,
    },
    
    contentContainer: {
        flex: 1,
        backgroundColor: '#F8F9FB',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 20,
    },
    
    welcomeSection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E8EBF0',
    },
    welcomeText: {
        fontSize: rfs(3.5),
        fontWeight: 'bold',
        color: '#1A1D29',
        marginBottom: 2,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: rfs(1.8),
        color: '#666',
        textAlign: 'center',
        fontWeight: '500',
    },
    formSection: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E8EBF0',
    },
    cardHeader: {
        borderBottomWidth: 1,
        borderBottomColor: '#F0F2F5',
        paddingBottom: 16,
        marginBottom: 20,
    },
    cardHeaderTitle: {
        fontSize: rfs(2.5),
        fontWeight: 'bold',
        color: '#1A1D29',
        marginBottom: 4,
        textAlign: 'center',
    },
    cardHeaderSubtitle: {
        fontSize: rfs(1.6),
        color: '#666',
        textAlign: 'center',
        fontWeight: '400',
        lineHeight: 20,
    },
    inputGroup: {
        marginBottom: spacing['2xl'],
        gap: responsiveHeight(2),
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        fontSize: 16,
        marginBottom: 4,
        borderWidth: 0,
        height: 60,
    },
    inputContent: {
        paddingHorizontal: 12,
        paddingVertical: 16,
        fontSize: 16,
        color: '#1A1D29',
    },
    inputOutline: {
        borderWidth: 1.5,
        borderColor: '#E8EBF0',
        backgroundColor: '#FFFFFF',
    },
    // Additional input styles for better spacing
    nameInputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacing.md,
    },
    halfWidthInput: {
        flex: 1,
    },
    loginButton: {
        width: '100%',
        height: responsiveHeight(6.5),
        borderRadius: BORDER_RADIUS.xl,
        marginBottom: spacing.lg,
        marginTop: spacing.md, // Added top margin
        ...shadows.md,
        shadowColor: colors.primary,
    },
    loginButtonGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDER_RADIUS.xl,
    },
    loginButtonText: {
        color: colors.white,
        fontSize: FONT_SIZES.xl,
        fontWeight: typography.fontWeight.bold,
        letterSpacing: 0.5,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing.lg,
        paddingHorizontal: spacing.sm,
        marginTop: spacing.md,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border,
    },
    dividerText: {
        marginHorizontal: spacing.md,
        color: colors.textSecondary,
        fontSize: FONT_SIZES.md,
        fontWeight: typography.fontWeight.medium,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: spacing.md,
        marginBottom: spacing.xl,
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        borderRadius: BORDER_RADIUS.xl,
        borderWidth: 1.5,
        borderColor: colors.border,
        backgroundColor: colors.background,
        ...shadows.sm,
    },
    socialButtonText: {
        marginLeft: spacing.sm,
        color: colors.textPrimary,
        fontSize: FONT_SIZES.lg,
        fontWeight: typography.fontWeight.semibold,
    },
    socialIcon: {
        width: responsiveWidth(5),
        height: responsiveWidth(5),
        resizeMode: 'contain',
    },
    signupPrompt: {
        marginTop: spacing.sm,
        alignItems: 'center',
        paddingBottom: spacing.sm, // Added bottom padding
    },
    signupText: {
        textAlign: 'center',
        color: colors.textSecondary,
        fontSize: FONT_SIZES.lg,
        lineHeight: responsiveHeight(3),
    },
    signupLink: {
        color: colors.primary,
        fontWeight: typography.fontWeight.bold,
        fontSize: FONT_SIZES.lg,
        textDecorationLine: 'underline',
    },
    // Form validation styles
    errorText: {
        color: colors.error || '#FF6B6B',
        fontSize: FONT_SIZES.sm,
        marginTop: -spacing.xs,
        marginBottom: responsiveHeight(0.5),
        marginLeft: spacing.sm,
    },
    inputError: {
        borderColor: colors.error || '#FF6B6B',
    },
    // Enhanced input styles for better UX
    focusedInput: {
        borderColor: colors.primary,
        borderWidth: 2,
    },
    // Password strength indicator styles
    passwordStrengthContainer: {
        marginTop: spacing.xs,
        paddingHorizontal: spacing.sm,
    },
    passwordStrengthText: {
        fontSize: FONT_SIZES.xs,
        color: colors.textSecondary,
    },
    // Loading state styles
    loadingButton: {
        opacity: 0.7,
    },
    // Success/Error message styles
    messageContainer: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: BORDER_RADIUS.md,
        marginBottom: spacing.md,
    },
    successMessage: {
        backgroundColor: colors.success || '#4CAF50',
    },
    errorMessage: {
        backgroundColor: colors.error || '#FF6B6B',
    },
    messageText: {
        color: colors.white,
        fontSize: FONT_SIZES.md,
        textAlign: 'center',
        fontWeight: typography.fontWeight.medium,
    },
});

export default signinStyles;