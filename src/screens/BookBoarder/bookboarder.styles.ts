
import { StyleSheet } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';

const bookboarderstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingBottom: 100,
    },
    
    // Content Sections
    scrollContainer: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f1f3f4',
    },
    sectionHeader: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f3f4',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2c3e50',
    },
    sectionContent: {
        padding: 16,
    },

    // Service Details
    serviceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f3f4',
    },
    serviceRowLast: {
        borderBottomWidth: 0,
    },
    serviceLabel: {
        fontSize: 15,
        color: '#495057',
        fontWeight: '500',
    },
    serviceValue: {
        fontSize: 15,
        color: '#2c3e50',
        fontWeight: '600',
    },

    // Pet Information
    petCard: {
        backgroundColor: '#e3f2fd',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#58B9D0',
    },
    petHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    petIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#58B9D0',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    petName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2c3e50',
    },
    petDetails: {
        gap: 8,
    },
    petDetailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    petDetailLabel: {
        fontSize: 14,
        color: '#6c757d',
    },
    petDetailValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2c3e50',
    },

    // Price Breakdown
    priceSection: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    priceLabel: {
        fontSize: 15,
        color: '#495057',
    },
    priceValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#343a40',
    },
    priceDescription: {
        fontSize: 12,
        color: '#6c757d',
        marginLeft: 4,
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#dee2e6',
        marginTop: 8,
        paddingTop: 12,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2c3e50',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#27ae60',
    },

    // Payment Section
    paymentContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#e9ecef',
    },
    paymentSectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 16,
    },
    paymentOptionsContainer: {
        marginBottom: 16,
    },
    paymentMethodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e9ecef',
        marginBottom: 12,
    },
    selectedPaymentMethod: {
        backgroundColor: '#e3f2fd',
        borderColor: '#58B9D0',
        borderWidth: 2,
    },
    paymentMethodIcon: {
        width: 40,
        height: 40,
        marginRight: 12,
        borderRadius: 8,
    },
    paymentMethodText: {
        flex: 1,
    },
    paymentMethodLabel: {
        fontSize: 12,
        color: '#6c757d',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    paymentMethodName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#2c3e50',
    },
    changePaymentButton: {
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#e9ecef',
    },
    upiOptionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    upiOption: {
        width: '23%',
        aspectRatio: 1,
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    selectedUpiOption: {
        backgroundColor: '#e3f2fd',
        borderColor: '#58B9D0',
        borderWidth: 2,
    },
    upiOptionIcon: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },
    upiOptionText: {
        fontSize: 10,
        color: '#495057',
        textAlign: 'center',
        marginTop: 4,
        fontWeight: '500',
    },
    paymentButton: {
        backgroundColor: '#58B9D0',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paymentButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },

    // Legacy styles for compatibility
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
    
    upiIcon: {
        width: responsiveWidth(8),
        height: responsiveWidth(8),
        resizeMode: 'contain',
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
