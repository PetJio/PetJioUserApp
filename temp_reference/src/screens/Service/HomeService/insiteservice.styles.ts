import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const insiteservicestyles = StyleSheet.create({
    container: {
        gap: responsiveHeight(1.5),
        height: responsiveHeight(100),
        backgroundColor: '#FFFFFF',
    },
    containerchild: {
        width: responsiveWidth(100),
        padding: responsiveWidth(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: responsiveHeight(5),
        paddingHorizontal: responsiveHeight(2.5),
    },
    containerfirstsubchild: {
        flexDirection: 'row',
        gap: responsiveWidth(1),
    },
    containersecondsubchild: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    containerthirdsubchild: { 
        paddingHorizontal: responsiveWidth(5) ,
    },
    shadow: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        // paddingHorizontal: responsiveHeight(2),
        // paddingVertical: responsiveHeight(2),
        gap: responsiveWidth(2),
        width: responsiveWidth(90),
        height: responsiveHeight(14),
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: responsiveWidth(1),
    },
    userimage: {
        width: responsiveWidth(20),
        height: responsiveWidth(20),
        borderRadius: responsiveWidth(20),
    },
    leftarrowicon: {
        tintColor: '#000000',
        top: responsiveHeight(0.5),
    },
    downArrowIcon: {
        tintColor: '#000000',
        top: responsiveHeight(0.25),
    },
    groomingText: {
        color: '#000000',
        fontSize: 20,
        fontWeight: '500',
        fontFamily: '',
    },
    locationtext: {
        flexDirection: 'row',
        gap: responsiveWidth(1),
        top: responsiveHeight(0.5),
    },
    locationtextColor: { color: '#000000' },
    onsitetext: {
        paddingHorizontal: responsiveWidth(5),
        paddingTop: responsiveHeight(5),
        paddingBottom: responsiveHeight(1),
        color: '#AAAAAA',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 20,
    },
    homeservicetext: {
        paddingHorizontal: responsiveWidth(12),
        paddingTop: responsiveHeight(5),
        paddingBottom: responsiveHeight(1),
        color: '#58B9D0',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 20,
        width: responsiveWidth(50),
        borderBottomWidth: responsiveWidth(0.5),
        borderColor: '#58B9D0',
    },
    gap: { 
        gap: responsiveHeight(1)
      },
    Gap:{
         gap: responsiveHeight(1),
         top:responsiveHeight(0.90)
    },
    paddingBottom:{
             paddingBottom:responsiveHeight(90)
    },
    userTextWidth: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: responsiveWidth(60),
    },
    userTextgap: {
        flexDirection: 'row',
        gap: responsiveWidth(2.5),
    },

    searchparent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: responsiveWidth(2),
        paddingHorizontal: responsiveHeight(2),
    },
    textSize: { 
        fontSize: 18, 
        fontWeight: '600',
        lineHeight:20,
        letterSpacing:0,
        color:'#000000'
    },
    borderRadius: {
        width: responsiveWidth(19.5),
        height: responsiveHeight(2.8),
        borderRadius: responsiveWidth(4),
        borderWidth: 1,
        borderColor: '#58B9D0',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#EFFCFF'
    },
    celebrityText: {
        fontSize:10,
        fontWeight:'500',
        lineHeight:12,
        letterSpacing:0,
        color: '#58B9D0',
        marginTop: responsiveHeight(0.1),
    },

    ratingGap: {
        flexDirection: 'row',
        gap: responsiveWidth(1),
    },
    ratingHeight: { top: responsiveHeight(0.3) },
    ratePointSize: {
        color: '#848484',
        fontSize: 16,
        fontWeight: '400',
    },
    setIconTextGap: {
        flexDirection: 'row',
        gap: responsiveWidth(2),
    },
    setImageIconPosition: {
         top: responsiveHeight(0.3),
        //  right:responsiveWidth(0.6)
         },
    setTextSize: {
        fontSize:12,
        fontWeight:'500',
        lineHeight:12,
        letterSpacing:0,
        color:'#383838'
    },
    setDigitSize: {
        fontSize:12,
        fontWeight:'500',
        lineHeight:12,
        letterSpacing:0,
        color:'#383838'
    },
    widthSpace: {
        flexDirection: 'row',
        gap: responsiveWidth(2.5),
        width: responsiveWidth(60),
        justifyContent: 'space-between',
    },
    iconAndTextGap: {
        flexDirection: 'row',
        gap: responsiveWidth(2),
    },
    iconTextSpace: {
        // flexDirection: 'row',
        gap: responsiveWidth(1),
    },
    bold: {
        color: '#DF09A7',
        fontSize: 16,
        fontWeight: '600',
    },
    iconMargin: { marginRight: responsiveHeight(2) },
    searchchild: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        borderRadius: 10,
        backgroundColor: '#F6F6F6',
        paddingHorizontal: responsiveHeight(2),
    },
    filterbtn: {
        width: responsiveWidth(11),
        height: responsiveHeight(5),
        backgroundColor: '#4494A8',
        borderRadius: responsiveHeight(1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        height: responsiveHeight(5),
    },
    filterIcon: {
        width: responsiveWidth(5),
        height: responsiveHeight(2),
    },
});

export default insiteservicestyles;
