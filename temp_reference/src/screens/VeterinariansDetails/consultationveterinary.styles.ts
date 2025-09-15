
import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const consultationveterinarystyles = StyleSheet.create({
    container: {
        gap: responsiveHeight(1.5),
        height: responsiveHeight(100),
        backgroundColor: '#FFFFFF',
    },
    centerView:{
        justifyContent:'center',
        alignItems:'center'
    },
    flexGap:{
        flexDirection:'row',gap:responsiveWidth(2.5)
    },
  
    selectOnline:{
        justifyContent:'center',
        alignItems:'center', 
        width:responsiveWidth(25),
        height:responsiveHeight(4.5),
        borderRadius:responsiveWidth(1.5),
        borderWidth:1, 
        borderColor:'#58B9D0'
    },

    unselectOnline:{
        justifyContent:'center',
        alignItems:'center', 
        width:responsiveWidth(25),
        height:responsiveHeight(4.5),
        borderRadius:responsiveWidth(1.5),
        borderWidth:1, 
        borderColor:'#D8D8D8' 
    },
    selectOnlineText:{
        fontSize:12,
        fontWeight:'500',
        lineHeight:12,
        letterSpacing:0,
        color:'#58B9D0'
    },

    unselectOnlineText:{
        fontSize:12,
        fontWeight:'500',
        lineHeight:12,
        letterSpacing:0,
        color:'#A3A3A3'
    },

     selectHomeVisite:{
        justifyContent:'center',
        alignItems:'center', 
        width:responsiveWidth(25),
        height:responsiveHeight(4.5),
        borderRadius:responsiveWidth(1.5),
        borderWidth:1, 
        borderColor:'#58B9D0'
    },

    unselectHomeVisite:{
        justifyContent:'center',
        alignItems:'center', 
        width:responsiveWidth(25),
        height:responsiveHeight(4.5),
        borderRadius:responsiveWidth(1.5),
        borderWidth:1, 
        borderColor:'#D8D8D8'
    },
    selectHomeVisiteText:{
        fontSize:12,
        fontWeight:'500',
        lineHeight:12,
        letterSpacing:0,
        color:'#58B9D0'
    },

    unselectHomeVisiteText:{
        fontSize:12,
        fontWeight:'500',
        lineHeight:12,
        letterSpacing:0,
        color:'#A3A3A3'
    },

     paddingBottom:{
             paddingBottom:responsiveHeight(45)
    },
   
});

export default consultationveterinarystyles;
