
import { StyleSheet, Platform } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';

const checkoutstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FB',
    },

    // Header Styles
    header: {
        backgroundColor: '#F8F9FB',
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 16,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E8EBF0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },

    backButtonContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E6F3F7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#D1E7DD',
    },

    headerTitleContainer: {
        flex: 1,
    },

    headerTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1A1D29',
        marginBottom: 2,
    },

    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },

    headerPlaceholder: {
        width: 44,
    },

    // Scroll Container
    scrollContainer: {
        flex: 1,
        backgroundColor: '#F8F9FB',
    },

    scrollContentContainer: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 140, // Space for fixed button
    },

    // Section Styles
    sectionContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E8EBF0',
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1A1D29',
        marginLeft: 8,
    },

    // Address Styles
    addressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    addressInfo: {
        flex: 1,
        marginRight: 12,
    },

    addressLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1A1D29',
        marginBottom: 4,
    },

    addressText: {
        fontSize: 13,
        color: '#666',
        lineHeight: 18,
    },

    changeButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#58B9D0',
        borderRadius: 6,
        backgroundColor: '#E6F3F7',
    },

    changeButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#58B9D0',
    },

    // Order Item Styles
    orderItem: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F2F5',
    },

    itemImageContainer: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: '#F0F2F5',
        marginRight: 12,
        overflow: 'hidden',
    },

    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    itemDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },

    itemName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1A1D29',
        marginBottom: 4,
    },

    itemCategory: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },

    itemPriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    itemPrice: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1D29',
    },

    itemQuantity: {
        fontSize: 12,
        color: '#666',
    },

    // Price Breakdown Styles
    priceBreakdown: {
        gap: 12,
    },

    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    priceLabel: {
        fontSize: 14,
        color: '#666',
    },

    priceValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#1A1D29',
    },

    divider: {
        height: 1,
        backgroundColor: '#E8EBF0',
        marginVertical: 8,
    },

    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
    },

    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1D29',
    },

    totalValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#58B9D0',
    },

    // Payment Method Styles
    paymentMethodContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F8F9FB',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E8EBF0',
    },

    paymentMethodInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    paymentIcon: {
        width: 32,
        height: 32,
        marginRight: 12,
    },

    paymentMethodLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1A1D29',
        marginBottom: 2,
    },

    paymentMethodSubtext: {
        fontSize: 12,
        color: '#666',
    },

    // Bottom Button Styles
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 24,
        borderTopWidth: 1,
        borderTopColor: '#E8EBF0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 10,
    },

    totalSummary: {
        flex: 1,
        marginRight: 16,
    },

    totalSummaryLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1D29',
        marginBottom: 2,
    },

    totalSummarySubtext: {
        fontSize: 12,
        color: '#666',
    },

    paymentButton: {
        backgroundColor: '#58B9D0',
        borderRadius: 12,
        paddingHorizontal: 24,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: responsiveWidth(40),
        shadowColor: '#58B9D0',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 6,
    },

    paymentButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        marginRight: 8,
    },

    // Legacy styles (keeping for compatibility)
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
    },
    fixedButtonContainer: {
        position: 'absolute',
        bottom: responsiveHeight(0),
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        flexDirection:'row', 
        justifyContent:'space-between', 
        gap:responsiveWidth(2),
        paddingHorizontal:responsiveWidth(4),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 8,
        zIndex: 10,
    },
    nextBtnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(62),
        height: responsiveHeight(5),
        backgroundColor: '#58B9D0',
        marginLeft: responsiveWidth(1),
        borderRadius:responsiveWidth(1.5)
    },
    nextBtnText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#FFFFFF'
    },
});

export default checkoutstyles;