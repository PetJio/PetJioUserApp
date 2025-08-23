
import { StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';
const ngoservicestyles = StyleSheet.create({
    container: {
        flex:1,
        gap: responsiveHeight(2),
        top: responsiveHeight(12),
      
    },
    serviceText: { 
          paddingHorizontal:responsiveWidth(5),
          fontSize:16,
          fontWeight:'600',
          lineHeight:18,
          letterSpacing:0,
          color:'#000000'
    },
    tereatmentText:{
        fontSize:12,
        lineHeight:17,
        fontWeight:'600',
        letterSpacing:0
    },
    margin:{
          gap:responsiveHeight(1)
    },
    padding:{ 
          gap:responsiveHeight(0.80),
        //  paddingHorizontal:responsiveWidth(4)

    },

    centerView:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        gap:responsiveWidth(4)
    },

    Gap:{
        gap:responsiveHeight(2)
    },

     imageTextShoeHorizontal:{
            flexDirection:'row',
            gap:responsiveWidth(4)
        },
        viewTop:{
            top:responsiveHeight(1.4)
        },
        imageSize:{
            width:responsiveWidth(43),
            height:responsiveHeight(16),
            borderRadius:responsiveWidth(2.5)
        },
});

export default ngoservicestyles;

