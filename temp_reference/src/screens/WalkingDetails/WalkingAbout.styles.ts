import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const walkingaboutstyles = StyleSheet.create({
    container: {
        gap: responsiveHeight(2),
        top: responsiveHeight(2),
    },

    bioText: { marginLeft: responsiveWidth(3.8) },
    paragraphText: { marginHorizontal: responsiveWidth(3.5) },
    languageJobText: {
        flexDirection: 'row',
        marginLeft: responsiveWidth(3),
        gap: responsiveHeight(8),
    },
    expertiseText: { marginLeft: responsiveWidth(4) },
    setGap: {
        flexDirection: 'row',
        gap: responsiveWidth(2),
        top: responsiveHeight(0.5),
    },
    DigitBorder: {
        width: responsiveWidth(11.3),
        height: responsiveHeight(7.5),
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: responsiveHeight(0.9),
        justifyContent: 'center',
        alignItems: 'center',
        gap: responsiveWidth(1),
    },
    selectedDate: {
        backgroundColor: '#58B9D0',
        width: responsiveWidth(11.3),
        height: responsiveHeight(7.5),
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: responsiveHeight(0.9),
        justifyContent: 'center',
        alignItems: 'center',
        gap: responsiveWidth(1),
    },
    dotPosition: { position: 'relative', alignItems: 'center' },
    dots_Indicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: responsiveHeight(1.8), // Adjust as needed
    },
    green_dot_Indicator: {
        backgroundColor: '#58B9D0',
        height: 8,
        width: 26,
        borderRadius: 8,
        marginHorizontal: 6,
    },
    white_dot_Indicator: {
        backgroundColor: '#FFFFFF',
        height: 8,
        width: 8,
        borderRadius: 8,
        marginHorizontal: 6,
    },
    bottomparentview: {
        position: 'absolute',
        top: responsiveHeight(26), // Adjust as needed
        width: responsiveWidth(100),
        alignItems: 'center',
    },
});

export default walkingaboutstyles;
