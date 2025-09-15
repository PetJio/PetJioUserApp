import { StyleSheet } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';

const signupstyles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#f5f5f5',
    },

    imagecontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    imagesize: {
        width: responsiveWidth(100),
    },
    registerText: {
        fontSize: 24,
        fontWeight: '600',
        lineHeight: 24,
        letterSpacing: 0,
        color: '#000000',
    },
    petparent: {
        justifyContent:'center',
        alignItems:'center',
        width: responsiveWidth(40),
        height: responsiveHeight(20),
        borderWidth:2,
        borderRadius: responsiveWidth(3),
        borderColor: '#E2E2E2',
    },
    setGapOfParent:{
        gap:responsiveHeight(4),
        top:responsiveHeight(4)
    },
    setPadding:{
        flexDirection:'row',
        gap:responsiveWidth(8),
        paddingHorizontal:responsiveWidth(6)
    },
    textsize:{
        fontSize:18,
        fontWeight:'600',
        lineHeight:20,
        letterSpacing:0,
        color:'#000'
    },
    serviceImage:{
        width:responsiveWidth(39),
        height:responsiveHeight(19.5),
        borderRadius:responsiveWidth(3),
         
    },

    setLeftIconposition:{
        position:'relative'
    },
    arrowIconPosition:{
    position:'absolute',
    top:responsiveHeight(6),
    left:responsiveWidth(8)
},
leftArrowIconSize:{
      width:responsiveWidth(8),
      height:responsiveHeight(2)
}
});

export default signupstyles;
