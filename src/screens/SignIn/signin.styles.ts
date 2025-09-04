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

const signinstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContainer: {
        flexGrow: 1,
        minHeight: responsiveHeight(100),
    },
    headerContainer: {
        position: 'relative',
        height: responsiveHeight(50),
        overflow: 'hidden',
    },
    backgroundImage: {
        width: responsiveWidth(100),
        height: responsiveHeight(50),
        resizeMode: 'cover',
    },
    gradientOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: responsiveHeight(20),
    },
    contentContainer: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: responsiveWidth(6),
        paddingTop: responsiveHeight(4),
        alignItems: 'center',
    },
    welcomeSection: {
        marginBottom: responsiveHeight(4),
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: rfs(3.6),
        fontWeight: typography.fontWeight.bold,
        color: colors.textPrimary,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: FONT_SIZES.xl,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: responsiveHeight(3),
    },
    buttonContainer: {
        width: '100%',
        marginTop: responsiveHeight(5),
    },
    loginButton: {
        width: '100%',
        height: responsiveHeight(7),
        borderRadius: BORDER_RADIUS.xl,
        marginBottom: spacing.xs,
        ...shadows.lg,
    },
    loginButtonGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDER_RADIUS.xl,
    },
    loginButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.md,
    },
    loginButtonText: {
        color: colors.white,
        fontSize: FONT_SIZES.xl,
        fontWeight: typography.fontWeight.bold,
        marginLeft: spacing.sm,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing.sm,
        paddingHorizontal: spacing.sm,
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
    registerButton: {
        width: '100%',
        height: responsiveHeight(7),
        borderRadius: BORDER_RADIUS.xl,
        backgroundColor: 'rgba(88, 185, 208, 0.1)',
        borderWidth: 2,
        borderColor: '#58B9D0',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: spacing.xs,
        ...shadows.md,
        shadowColor: '#58B9D0',
    },
    registerButtonGradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: BORDER_RADIUS.xl,
    },
    registerButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.md,
    },
    registerButtonText: {
        color: '#58B9D0',
        fontSize: FONT_SIZES.xl,
        fontWeight: typography.fontWeight.bold,
        marginLeft: spacing.sm,
        textAlign: 'center',
    },
});

export default signinstyles;