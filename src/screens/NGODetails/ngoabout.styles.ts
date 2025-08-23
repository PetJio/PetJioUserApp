import { StyleSheet } from 'react-native';
import { responsiveWidth, responsiveHeight} from 'react-native-responsive-dimensions';
const ngoaboutstyles = StyleSheet.create({
    container: {
        gap: responsiveHeight(2),
        top: responsiveHeight(12),
      
    },
    bioText: { 
       paddingHorizontal:responsiveWidth(5)
    },
    paragraphText: { 
        paddingHorizontal:responsiveWidth(5) 
    },
    readMoreText:{
        fontSize:12,
        fontWeight:'400',
        lineHeight:18,
        letterSpacing:0,
        color:'#58B9D0'
    },
    countparentView:{
        flexDirection:'row', 
        justifyContent:'center',
        alignItems:'center',
        gap:responsiveWidth(10),
        paddingHorizontal:responsiveWidth(6),
        // top:responsiveHeight(1.5)
        },
        centerCountDigit:{
            justifyContent:'center',
            alignItems:'center'
        },
        digitNumber:{
            fontSize:22,
            fontWeight:'600',
            lineHeight:22,
        },
        digitText:{
            fontSize:12,
            fontWeight:'600',
            lineHeight:14,
            color:'#FF851B'
        },
        animalText:{
            fontSize:12,
            fontWeight:'600',
            lineHeight:14,
            color:'#58B9D0'
        },
        volunteersText:{
            fontSize:12,
            fontWeight:'600',
            lineHeight:14,
            color:'#DF09A7'
        },
        paddingText:{
            paddingHorizontal:responsiveWidth(5)
        },
        serviceText:{
            fontSize:14,
            fontWeight:'500',
            lineHeight:12,
            letterSpacing:0,
            color:'#343434'
        },
        imageTextShoeHorizontal:{
            flexDirection:'row',
            gap:responsiveWidth(4)
        },
        viewTop:{
            top:responsiveHeight(1.4)
        },
        imageSize:{
            width:responsiveWidth(28),
            height:responsiveHeight(11),
            borderRadius:responsiveWidth(2)
        },
});

export default ngoaboutstyles;
