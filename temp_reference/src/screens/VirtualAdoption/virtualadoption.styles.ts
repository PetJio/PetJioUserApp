import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const virtualadoptionstyles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    },
    positionDateTimeIcon: {
         width: responsiveWidth(100),
         padding: responsiveWidth(4),
       
         position: 'absolute',
         top: responsiveHeight(5),
     },

       flexGap: {
           flexDirection: 'row',
           gap: responsiveWidth(1),
       },
       iconColor: {
           tintColor: "#000000",
           top: responsiveHeight(0.50),
       },
       textDateTime: {
           color: "#000000",
           fontSize: 20,
           fontWeight: '500',
       },
       selectDateText: {
           padding: responsiveWidth(5),
           top: responsiveHeight(11),
           color: "#000000",
           fontSize: 16,
           fontWeight: '600',
       },
});

export default virtualadoptionstyles;