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

const locationStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FB',
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: '#F8F9FB',
    },
    
    // Header Styles
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
        marginBottom: spacing.sm,
        gap: responsiveHeight(1.5),
    },
    inputContainer: {
        marginBottom: responsiveHeight(1.2),
    },
    textInput: {
        backgroundColor: '#FFFFFF',
        fontSize: 16,
        marginBottom: 0,
        borderWidth: 0,
        height: 60,
    },
    inputContent: {
        paddingHorizontal: 12,
        paddingVertical: 16,
        fontSize: 16,
        color: '#1A1D29',
        backgroundColor: '#FFFFFF',
    },
    inputOutline: {
        borderWidth: 1.5,
        borderColor: '#E8EBF0',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
    },
    inputFocused: {
        borderColor: '#58B9D0',
        borderWidth: 2,
    },
    inputError: {
        borderColor: '#FF6B6B',
        borderWidth: 2,
    },
    errorText: {
        color: '#FF6B6B',
        fontSize: FONT_SIZES.sm,
        marginTop: 4,
        marginBottom: responsiveHeight(0.5),
        marginLeft: 4,
        fontWeight: typography.fontWeight.medium,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1D29',
        marginBottom: 8,
    },
    inputIcon: {
        marginRight: 8,
    },
    
    // Location Button (styled like Google button)
    locationButton: {
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
        borderColor: '#D1D5DB',
        backgroundColor: '#F9FAFB',
        marginBottom: spacing.lg,
        marginTop: spacing.md,
    },
    locationButtonGradient: {
        // Not needed for new style - remove gradient
    },
    locationButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationButtonText: {
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.5,
        color: '#6B7280',
        marginLeft: 8,
    },
    
    // Signup Button (styled like SignIn page buttons)
    signupButton: {
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
        borderColor: '#58B9D0',
        backgroundColor: '#E6F3F7',
        marginTop: spacing.md,
        marginBottom: spacing.sm,
    },
    signupButtonGradient: {
        // Not needed for new style - remove gradient
    },
    signupButtonText: {
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.5,
        color: '#58B9D0',
        marginLeft: 8,
    },
    
    loadingButton: {
        opacity: 0.7,
    },
    messageContainer: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: BORDER_RADIUS.lg,
        marginBottom: spacing.md,
        alignItems: 'center',
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
});

export default locationStyles;