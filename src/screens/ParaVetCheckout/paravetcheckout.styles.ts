import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';

const paravetcheckoutstyles = StyleSheet.create({
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
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: responsiveWidth(45),
        paddingHorizontal: responsiveWidth(0.4),
        backgroundColor: '#fff',
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        height: responsiveHeight(5),
        marginLeft: responsiveWidth(1),
    },
    checkoutText: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 17,
        color: '#000000',
        top: responsiveHeight(1),
    },
    imageposition: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top: responsiveHeight(3),
    },
    imagesize: {
        width: responsiveWidth(20),
        height: responsiveHeight(9),
        borderRadius: responsiveWidth(2.5),
    },
    dogtitle: {
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 17,
        color: '#FFFFFF',
        position: 'absolute',
        top: responsiveHeight(6.5),
    },
    gapandheightcontainer: {
        gap: responsiveWidth(4.5),
      
    },
    flexposition: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveHeight(2),
    },

    inputtext:{
        width:responsiveWidth(90),
        height:responsiveHeight(6.9),
        borderRadius:responsiveWidth(1.5),
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        alignItems:'center',
        marginLeft:responsiveWidth(4),
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 4, 
        elevation: 5,  
    },
    dropdown: {
        height: responsiveHeight(5),
        width: responsiveWidth(40),
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        paddingHorizontal: responsiveWidth(4),
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    imageStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    placeholderStyle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#686868',
    },
    selectedTextStyle: {
        fontSize: 16,
        marginLeft: 8,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    setTextAmountflex:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    chargeText:{
        fontSize:12,
        fontWeight:'500',
        lineHeight:17,
        letterSpacing:0,
        color:'#303030'
    },
    amountText:{
        fontSize:12,
        fontWeight:'500',
        lineHeight:17,
        letterSpacing:0,
        color:'#303030'
    }
});

export default paravetcheckoutstyles;
