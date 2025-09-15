import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const donationstyles = StyleSheet.create({
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
        // top: responsiveHeight(4),
    },

    flexGap: {
        flexDirection: 'row',
        gap: responsiveWidth(1),
        top: responsiveHeight(1),
    },
    iconColor: {
        tintColor: '#000000',
        top: responsiveHeight(2.5),
        
    },
    textDateTime: {
        color: '#000000',
        fontSize: 20,
        fontWeight: '500',
        top:responsiveHeight(2)
    },
    selectDateText: {
        padding: responsiveWidth(5),
        top: responsiveHeight(11),
        color: '#000000',
        fontSize: 16,
        fontWeight: '600',
    },

    makemView: {
        width: responsiveWidth(90),
        backgroundColor: '#fff',
        borderRadius: responsiveWidth(2),
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
        alignSelf: 'center',
        top: responsiveHeight(12),
    },
    imageSize: {
        width: responsiveWidth(90),
        height: responsiveHeight(18),
        borderRadius: responsiveWidth(2),
    },
    paddingProgressBar: {
        padding: responsiveHeight(0.9),
    },
    text: {
        fontSize: 11,
        lineHeight: 14,
        fontWeight: '600',
        letterSpacing: 0,
        marginTop: responsiveHeight(0.6),
    },

    whiteProgressBar: {
        height: responsiveHeight(0.45),
        backgroundColor: '#eee',
        borderRadius: responsiveWidth(12),
        overflow: 'hidden',
        marginTop: responsiveHeight(0.9),
    },
    BlueProgressBar: {
        width: responsiveWidth(35),
        height: responsiveHeight(100),
        backgroundColor: '#4CC9F0',
        borderRadius: responsiveWidth(0.3),
    },

    fundRaisedText: {
        fontSize: 11,
        color: '#7E7E7E',
        lineHeight: 14,
        fontWeight: '500',
        letterSpacing: 0,
        marginTop: responsiveHeight(0.6),
    },
    contentContainerStyle: {
        paddingBottom: responsiveHeight(20),
    },
    parentGap: {
        gap: responsiveHeight(1.5),
    },
    amountColor: {
        color: '#58B9D0',
        fontWeight: '600',
    },
});

export default donationstyles;
