
import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';
const bookboarderstyles = StyleSheet.create({
    container: {
        gap: responsiveHeight(2),
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        backgroundColor: '#FFFFFF',
        position: 'relative',
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
    bottomBorder: {
        width: responsiveWidth(100),
        borderBottomWidth: responsiveWidth(0.3),
        borderColor: '#EDEDED',
        top: responsiveHeight(4),
    },
    firstText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveWidth(4),
        top: responsiveHeight(4.3),
    },
    textgap: {
        flexDirection: 'row',
        gap: responsiveWidth(1.5),
    },
    normalText: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 14,
        letterSpacing: 0,
        color: '#4494A8',
    },
    countdogText: {
        fontSize: 10,
        fontWeight: '500',
        lineHeight: 12,
        letterSpacing: 0,
        color: '#989898',
    },
    dogText: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 12,
        color: '#727272',
    },
    secondText: {
        width: responsiveWidth(100),
        borderBottomWidth: responsiveWidth(0.3),
        borderColor: '#EDEDED',
        top: responsiveHeight(4),
    },
    flexView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveWidth(4),
        top: responsiveHeight(4),
    },
    gapIcon: {
        flexDirection: 'row',
        gap: responsiveWidth(1.4),
    },
    thirdText: {
        width: responsiveWidth(100),
        borderBottomWidth: responsiveWidth(0.3),
        borderColor: '#EDEDED',
        top: responsiveHeight(3.5),
    },
    thirdflexView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveWidth(4),
        top: responsiveHeight(4),
    },
    gapTextIcon: {
        flexDirection: 'row',
        gap: responsiveWidth(1.4),
    },
    fourthflexView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: responsiveWidth(4),
        top: responsiveHeight(4),
    },
    fivethViewHeight: {
        justifyContent: 'center',
        alignItems: 'center',
        top: responsiveHeight(4.2),
    },
    fivethflexView: {
        width: responsiveWidth(90),
        height: responsiveHeight(7),
        borderRadius: responsiveWidth(1.5),
        backgroundColor: '#58B9D0',
    },
    textAlign: {
        width: responsiveWidth(90),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(3),
        top: responsiveHeight(1.5),
    },
    PeterFernandezText: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 17,
        letterSpacing: -0.5,
        color: '#FFFFFF',
    },
    addressText: {
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 17,
        letterSpacing: -0.5,
        color: '#FFFFFF',
    },
    borderRadiusText: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        width: responsiveWidth(15.9),
        height: responsiveHeight(2.8),
        borderRadius: responsiveWidth(0.4),
        borderColor: '#E5E5E5',
    },
    changeText: {
        fontSize: 9,
        fontWeight: '500',
        lineHeight: 12,
        color: '#FFFFFF',
    },
    viewTop: {
        gap: responsiveHeight(1.5),
        top: responsiveHeight(4),
    },
    priceDetailsText: {
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 14,
        letterSpacing: 0,
        color: '#313131',
        paddingHorizontal: responsiveWidth(6),
    },
    setflexforview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: responsiveWidth(100),
        paddingHorizontal: responsiveWidth(6),
    },
    textGap: {
        flexDirection: 'row',
        gap: responsiveWidth(3),
    },
    DogText: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 12,
        letterSpacing: 0,
        color: '#565656',
    },
    walkPerMeterText: {
        width:responsiveWidth(12),
        fontSize: 8,
        fontWeight: '500',
        lineHeight: 10,
        letterSpacing: 0,
        color: '#989898',
    },
    priceText: {
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 17,
        letterSpacing: 0,
        color: '#B70B8B',
    },
    bottomparentView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveWidth(4),
        backgroundColor: '#fff', // optional for clarity
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    gapHeight: {
        gap: responsiveHeight(1),
    },
    googlePayIconGap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: responsiveWidth(2),
    },
    payUsingText: {
        color: '#414141',
        fontSize: 11,
        fontWeight: '300',
    },
    IoIosArrowUp:{ 
        top: responsiveHeight(0.5) 
    },
    GooglePayUPIText:{
                      color: '#303030',
                      fontSize: 14,
                      fontWeight: '400',
                      lineHeight: 18,
                    },
    bookWalkerButton:{
                       width: responsiveWidth(63),
                       height: responsiveHeight(5.5),
                       borderRadius: responsiveWidth(1.5),
                       backgroundColor: '#58B9D0',
                       justifyContent: 'center',
                       alignItems: 'center',
                    },
    BookWalkerText:{ 
                 color: '#FFFFFF',
                 fontSize: 12,
                 fontWeight: '600',
                 lineHeight: 18,
              },
    setgapandheight:{
        gap:responsiveHeight(0.90),
        top:responsiveHeight(1.2)
    },
    setTextCenter:{
        justifyContent:'center',
        alignItems:'center'
    },
    nameText:{
        fontSize:14,
        fontWeight:'500',
        lineHeight:12,
        letterSpacing:0,
        color:'#4A4A4A'
    },
    kilometerText:{
        fontSize:10,
        fontWeight:'500',
        lineHeight:12,
        color:'#747272'
    },
    positionMapIcon:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }

});

export default bookboarderstyles;
