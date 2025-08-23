
import { StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
const pharmacyordernowstyles = StyleSheet.create({

      container:{
        flex:1,
        position: 'relative',
        width:responsiveWidth(100),
        height:responsiveHeight(100),
        backgroundColor:'#f5f5f5'
      },

       ratingGap: {
        flexDirection: 'row',
        gap: responsiveWidth(1),
    },

     ratingHeight: { 
        top: responsiveHeight(0.3) 
    },
     ratePointSize: {
        color: '#848484',
        fontSize: 16,
        fontWeight: '400',
    },

      view: {
        // flexDirection: 'row',
        // justifyContent:'center',
        // alignItems:'center',
        gap: responsiveWidth(2),
        maxWidth: responsiveWidth(90),
        minWidth: responsiveWidth(30),
        padding: responsiveWidth(3),
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: responsiveWidth(1),
    },
});

export default pharmacyordernowstyles;
