import { StyleSheet } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';

const signinstyles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    },
    
    imagesize: {
        width: responsiveWidth(100),
        height: responsiveHeight(100)
    },

    // Overlay with buttons at bottom
    fixpositionButton: {
        position: 'absolute',
        bottom: responsiveHeight(5),
        width: '100%',
        alignItems: 'center',
    },
    
    loginbuttonSize: {
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(90),
        height: responsiveHeight(5.8),
        borderRadius: responsiveHeight(1),
        backgroundColor: '#58B9D0',
        marginBottom: responsiveHeight(2)
    },

    registrationbuttonSize: {
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(90),
        height: responsiveHeight(5.8),
        borderRadius: responsiveHeight(1),
        borderColor: '#58B9D0',
        borderWidth: responsiveWidth(0.65)
    },

    text: {
        fontSize: 16,
        fontWeight: '500',
        color: '#FFFFFF',
        letterSpacing: 1
    }
});

export default signinstyles;