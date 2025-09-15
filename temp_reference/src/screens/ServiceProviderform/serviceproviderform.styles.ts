import { StyleSheet } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';

const serviceproviderformstyles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#f5f5f5',
    },

    headerContainer: {
        paddingTop: responsiveHeight(5), // give space from top
        paddingBottom: responsiveHeight(2),
        backgroundColor: '#f5f5f5',
        zIndex: 10,
      },

      positionDateTimeIcon: {
        width: responsiveWidth(100),
        padding: responsiveWidth(4),
        justifyContent: 'space-between',
        position: 'absolute',
        top: responsiveHeight(5),
    },

    iconColor: {
        tintColor: "#000000",
        top: responsiveHeight(0.50),
    },

    imagecontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    flexGap: {
        justifyContent:'center',
        alignItems:'center',
       bottom:responsiveWidth(5)
    },
    text: {
        color: "#000000",
        fontSize: 24,
        fontWeight: '600',
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
        width: responsiveWidth(30),
        height: responsiveHeight(18),
        borderWidth:2,
        borderRadius: responsiveWidth(3),
        borderColor: '#E2E2E2',
    },
    setGapOfParent:{
        gap:responsiveHeight(2),
        top:responsiveHeight(8)
    },
    setPadding:{
        flexDirection:'row',
        gap:responsiveWidth(2),
        paddingHorizontal:responsiveWidth(3)
    },
    textsize:{
        fontSize:18,
        fontWeight:'600',
        lineHeight:20,
        letterSpacing:0,
        color:'#000'
    },
    serviceImage:{
        width:responsiveWidth(28),
        height:responsiveHeight(17.5),
        borderRadius:responsiveWidth(3),
         
    }
});

export default serviceproviderformstyles;
