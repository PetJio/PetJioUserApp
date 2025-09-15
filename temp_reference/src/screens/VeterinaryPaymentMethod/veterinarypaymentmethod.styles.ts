import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const veterinarypaymentmethodstyles = StyleSheet.create({
    container: {
           gap: responsiveHeight(2),
           width: responsiveWidth(100),
           height: responsiveHeight(100),
           backgroundColor: '#FFFFFF',
       },
       containerchild: {
        width: responsiveWidth(100),
        padding: responsiveWidth(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: responsiveHeight(4),
        paddingHorizontal: responsiveHeight(2.5),
    },
    containerfirstsubchild: {
        flexDirection: 'row',
        gap: responsiveWidth(2.1),
    },
    downArrowIcon: {
        tintColor: '#000000',
        top: responsiveHeight(0.25),
    },
    leftarrowicon: {
        tintColor: '#000000',
        top: responsiveHeight(0.5),
    },
    checkoutText: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 17,
        color: '#000000',
        top: responsiveHeight(1),
    },
});

export default veterinarypaymentmethodstyles;
