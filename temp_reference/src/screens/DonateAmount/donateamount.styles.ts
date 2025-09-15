import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const donateamountstyles = StyleSheet.create({
    container: {
        width: responsiveWidth(100),
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    positionDateTimeIcon: {
        width: responsiveWidth(100),
        padding: responsiveWidth(4),
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        zIndex: 100,
        top: responsiveHeight(4),
    },

    flexGap: {
        flexDirection: 'row',
        gap: responsiveWidth(1),
    },
    iconColor: {
        tintColor: '#000000',
        top: responsiveHeight(0.5),
    },
    textDateTime: {
        color: '#000000',
        fontSize: 20,
        fontWeight: '500',
    },

    makemView: {
        top: responsiveHeight(11),
        paddingHorizontal: responsiveWidth(6),
        gap: responsiveHeight(1),
    },

    contentContainerStyle: {
        paddingBottom: responsiveHeight(20),
    },
    parentGap: {
        gap: responsiveHeight(4),
    },

    enteramountText: {
        fontSize: 15,
        lineHeight:20,
        fontWeight: '600',
        letterSpacing: 0,
        marginTop: responsiveHeight(0.6),
    },

    howmatchPayText: {
        fontSize: 10,
        lineHeight: 14,
        fontWeight: '500',
        letterSpacing: 0,
        color: '#9E9E9E',
    },

    amount: {
        fontSize: 20,
        fontWeight: '600',
        letterSpacing: 0,
        lineHeight: 24,
        color: '#000000',
    },
    amountView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(90),
        height: responsiveHeight(14),
        borderRadius: responsiveHeight(1),
        backgroundColor: '#F4F4F4',
    },

    incrementampount: {
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 13,
        letterSpacing: 0,
        color: '#000000',
    },

    incrementampountView: {
        width: responsiveWidth(20),
        height: responsiveHeight(3.8),
        borderRadius: responsiveWidth(1.2),
        backgroundColor: '#fff',
        padding: responsiveHeight(1.2),
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Shadow for Android
        elevation: 8,
    },

    flexRowGap: {
        flexDirection: 'row',
        gap: responsiveHeight(1.5),
    },

    Gap: {
        gap: responsiveHeight(1.5),
    },

    // Fixed Button
    bottomparentView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(4),
        backgroundColor: '#fff', // optional for clarity
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Shadow for Android
        elevation: 8, // Slight elevation to cast shadow (will show below on Android, so use background trick if needed)
    },
    gapHeight: {
        gap: responsiveHeight(1),
    },
    googlePayIconGap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: responsiveWidth(2),
    },
    payUsingText: {
        color: '#414141',
        fontSize: 11,
        fontWeight: '300',
    },
    IoIosArrowUp: {
        top: responsiveHeight(0.5),
    },
    GooglePayUPIText: {
        color: '#303030',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18,
    },
    bookWalkerButton: {
        width: responsiveWidth(63),
        height: responsiveHeight(5.5),
        borderRadius: responsiveWidth(1.5),
        backgroundColor: '#58B9D0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    BookWalkerText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 18,
    },
});

export default donateamountstyles;
