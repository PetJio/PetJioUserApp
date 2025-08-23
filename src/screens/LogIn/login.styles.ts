import { StyleSheet, Platform } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';

const loginstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollContainer: {
        flexGrow: 1,
        minHeight: responsiveHeight(100),
    },
    headerContainer: {
        position: 'relative',
        height: responsiveHeight(40),
        overflow: 'hidden',
    },
    backgroundImage: {
        width: responsiveWidth(100),
        height: responsiveHeight(40),
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
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    backIcon: {
        width: responsiveWidth(6),
        height: responsiveHeight(1.5),
        tintColor: '#333',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: responsiveWidth(6),
        paddingTop: responsiveHeight(2),
    },
    welcomeSection: {
        marginBottom: responsiveHeight(3),
    },
    welcomeText: {
        fontSize: responsiveWidth(7),
        fontWeight: 'bold',
        color: '#1a1a1a',
        marginBottom: responsiveHeight(0.5),
        textAlign: 'center',
    },
    subtitle: {
        fontSize: responsiveWidth(4),
        color: '#666666',
        textAlign: 'center',
        lineHeight: responsiveHeight(2.5),
    },
    formSection: {
        flex: 1,
        paddingTop: responsiveHeight(1),
    },
    inputGroup: {
        marginBottom: responsiveHeight(2),
        gap: responsiveHeight(2),
    },
    textInput: {
        backgroundColor: '#ffffff',
        fontSize: responsiveWidth(4),
    },
    inputContent: {
        paddingHorizontal: responsiveWidth(4),
        fontSize: responsiveWidth(4),
        color: '#333',
    },
    inputOutline: {
        borderWidth: 1.5,
        borderColor: '#E8E8E8',
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginBottom: responsiveHeight(3),
    },
    forgotPasswordText: {
        color: '#58B9D0',
        fontSize: responsiveWidth(3.5),
        fontWeight: '600',
    },
    loginButton: {
        width: '100%',
        height: responsiveHeight(6.5),
        borderRadius: responsiveWidth(4),
        marginBottom: responsiveHeight(3),
        ...Platform.select({
            ios: {
                shadowColor: '#58B9D0',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    loginButtonGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: responsiveWidth(4),
    },
    loginButtonText: {
        color: '#ffffff',
        fontSize: responsiveWidth(4.2),
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: responsiveHeight(3),
        paddingHorizontal: responsiveWidth(2),
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#E8E8E8',
    },
    dividerText: {
        marginHorizontal: responsiveWidth(4),
        color: '#999999',
        fontSize: responsiveWidth(3.5),
        fontWeight: '500',
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: responsiveWidth(3),
        marginBottom: responsiveHeight(4),
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: responsiveHeight(1.8),
        paddingHorizontal: responsiveWidth(4),
        borderRadius: responsiveWidth(3),
        borderWidth: 1.5,
        borderColor: '#E8E8E8',
        backgroundColor: '#ffffff',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    socialButtonText: {
        marginLeft: responsiveWidth(2),
        color: '#333333',
        fontSize: responsiveWidth(3.8),
        fontWeight: '600',
    },
    socialIcon: {
        width: responsiveWidth(5),
        height: responsiveWidth(5),
        resizeMode: 'contain',
    },
    signupPrompt: {
        marginTop: responsiveHeight(2),
        alignItems: 'center',
        paddingBottom: responsiveHeight(2),
    },
    signupText: {
        textAlign: 'center',
        color: '#666666',
        fontSize: responsiveWidth(3.8),
        lineHeight: responsiveHeight(3),
    },
    signupLink: {
        color: '#58B9D0',
        fontWeight: 'bold',
        fontSize: responsiveWidth(3.8),
        textDecorationLine: 'underline',
    },

});

export default loginstyles;
