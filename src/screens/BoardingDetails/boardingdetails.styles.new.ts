import { StyleSheet, Platform } from 'react-native';
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

const boardingdetailstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },

    // Modern Header - Matching Services Page Style
    servicesStyleHeader: {
        backgroundColor: '#F8F9FB',
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 16,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E8EBF0',
    },

    backButtonContainer: {
        marginRight: 12,
    },

    newServicesBackIcon: {
        tintColor: '#58B9D0',
        width: responsiveWidth(6),
        height: responsiveWidth(6),
    },

    servicesHeaderTitleContainer: {
        flex: 1,
    },

    newServicesHeaderTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1A1D29',
        marginBottom: 2,
    },

    servicesHeaderSubtitle: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },

    headerActionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: responsiveWidth(4),
    },

    // Provider Card - Modern design without shadows
    providerCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: responsiveWidth(5),
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(1),
        borderRadius: 20,
        padding: responsiveWidth(5),
        borderWidth: 1,
        borderColor: '#E8EBF0',
    },

    // Provider Info Styles
    gap: {
        gap: responsiveHeight(1.5),
    },
    
    userTextWidth: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    
    userTextgap: {
        flexDirection: 'row',
        gap: responsiveWidth(2),
        alignItems: 'center',
    },
    
    textSize: { 
        fontSize: 18,
        fontWeight: '700',
        color: '#1A1D29',
    },
    
    ratingGap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: responsiveWidth(1),
    },
    
    verifyText: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: '600',
    },
    
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    
    setIconTextGap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: responsiveWidth(1),
    },
    
    setTextSize: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    
    ratePointSize: {
        fontSize: 14,
        color: '#FFB800',
        fontWeight: '700',
    },
    
    widthSpace: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    
    iconAndTextGap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: responsiveWidth(1),
    },
    
    price: {
        fontSize: 16,
        color: '#58B9D0',
        fontWeight: '700',
    },
    
    userimage: {
        width: responsiveWidth(20),
        height: responsiveWidth(20),
        borderRadius: responsiveWidth(10),
        marginBottom: responsiveHeight(1),
        alignSelf: 'center',
    },

    // Tab Navigation Styles
    menuTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFFFFF',
        marginHorizontal: responsiveWidth(5),
        marginTop: responsiveHeight(1),
        borderRadius: 16,
        padding: responsiveWidth(2),
        borderWidth: 1,
        borderColor: '#E8EBF0',
    },
    
    menuTitleAlignment: {
        alignItems: 'center',
        paddingVertical: responsiveHeight(1.5),
        paddingHorizontal: responsiveWidth(4),
    },
    
    serviceText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    
    reviewsText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    
    commonTextColor: {
        color: '#58B9D0',
        fontWeight: '700',
    },
    
    menuBottomBoarder: {
        height: 3,
        backgroundColor: '#58B9D0',
        borderRadius: 2,
        marginTop: responsiveHeight(0.5),
        width: responsiveWidth(8),
    },

    // Book Now Button - Modern style matching other pages
    center: {
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(5),
        paddingVertical: responsiveHeight(2),
        marginTop: responsiveHeight(2),
    },
    
    button: {
        width: '100%',
        height: responsiveHeight(6.5),
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#58B9D0',
        backgroundColor: '#E6F3F7',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    
    ContinueText: {
        fontSize: 17,
        fontWeight: '700',
        color: '#58B9D0',
        letterSpacing: 0.5,
        marginLeft: responsiveWidth(2),
    },
});

export default boardingdetailstyles;
