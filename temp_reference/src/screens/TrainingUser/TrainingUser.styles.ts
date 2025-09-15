import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const traininguserstyles = StyleSheet.create({
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
         paddingHorizontal: 
         responsiveWidth(5) 
        },
    viewGap: { 
        top: responsiveHeight(3), 
        gap: responsiveHeight(1)
     },
    shadow: {
        flexDirection: 'row',
        paddingHorizontal: responsiveHeight(2),
        paddingVertical: responsiveHeight(2),
        gap: responsiveWidth(2),
        width: responsiveWidth(90),
        height: responsiveHeight(12.5),
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        borderRadius: responsiveWidth(1.5),
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
        width:responsiveWidth(50),
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
    gap: { gap: responsiveHeight(1) },
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
        top: responsiveHeight(3),
        flexDirection: 'row',
        alignItems: 'center',
        gap: responsiveWidth(2),
        paddingHorizontal: responsiveHeight(2),
    },
    textSize: { fontSize: 16, fontWeight: '900' },
    ratingGap: {
        flexDirection: 'row',
        gap: responsiveWidth(1),
    },
    ratingHeight: {
        top: responsiveHeight(0.2),
        width: responsiveWidth(3),
        height: responsiveHeight(1.5),
    },

    ratePointSize: {
        color: '#848484',
        fontSize: 12,
        fontWeight: '400',
    },
    setIconTextGap: {
        flexDirection: 'row',
        gap: responsiveWidth(2),
    },
    setImageIconPosition: { top: responsiveHeight(0.3) },
    setTextSize: {
        fontSize: 12,
        lineHeight: responsiveHeight(2),
        letterSpacing: responsiveWidth(0),
        color: '#383838',
        fontWeight: '500',
    },
    setDigitSize: {
        fontSize: responsiveHeight(1.5),
        lineHeight: responsiveHeight(2),
        letterSpacing: responsiveWidth(0),
        color: '#383838',
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
        gap: responsiveWidth(1),
    },
    bold: {
        color: '#DF09A7',
        fontSize: 12,
        fontWeight: '600',
    },
    iconMargin: { 
       
        marginRight: responsiveHeight(2) 
    },
    verifyText: {
        fontSize: 8,
        fontWeight: '500',
        lineHeight: 10,
        color: '#FF851B',
    },
    weekText:{
        color:'#8E8E8E',
        fontSize:10,
        fontWeight:'500'
    },
    viewFlex: { 
        flexDirection: 'row', 
        justifyContent: 'space-between'
     },
  
     contentContainerStyle:{ 
        paddingBottom: responsiveHeight(20) 
    },

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
        marginTop:responsiveHeight(1)
    },
    filterIcon: {
        width: responsiveWidth(5),
        height: responsiveHeight(2),
    },
});

export default traininguserstyles;
