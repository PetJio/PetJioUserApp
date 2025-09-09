import { StyleSheet, Platform } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
} from 'react-native-responsive-dimensions';

const boardinguserstyles = StyleSheet.create({
    // Modern parent container
    parentContainer: {
        flex: 1,
        backgroundColor: "#F5F7FA",
    },
    
    container: {
        flex: 1,
    },
    
    safeArea: {
        flex: 1,
    },
    
    // Modern Header Design - Without shadows
    modernHeader: {
        width: responsiveWidth(100),
        paddingHorizontal: responsiveWidth(5),
        height: responsiveHeight(14),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        top: 0,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E8EBF0',
        zIndex: 10,
    },

    headerLeft: {
        flexDirection: 'row',
        gap: responsiveWidth(3),
        alignItems: 'center',
    },
    
    backIcon: {
        tintColor: '#58B9D0',
        width: responsiveWidth(6),
        height: responsiveWidth(6),
    },
    
    headerTitle: {
        color: '#1A1D29',
        fontSize: 22,
        fontWeight: '700',
        letterSpacing: -0.5,
    },

    // Enhanced Date/Time Info Card - Modern design without shadows
    dateTimeInfoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: responsiveWidth(3),
        marginHorizontal: responsiveWidth(5),
        marginTop: responsiveHeight(1),
        marginBottom: responsiveHeight(1),
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#E8EBF0',
    },

    infoItem: {
        alignItems: 'center',
        flex: 1,
    },

    infoLabel: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
        marginBottom: 4,
    },

    infoValue: {
        fontSize: 14,
        color: '#1A1D29',
        fontWeight: '700',
    },

    // ScrollView Styles
    scrollView: {
        flex: 1,
    },

    scrollContent: {
        paddingBottom: responsiveHeight(10),
        paddingHorizontal: responsiveWidth(5),
    },

    dateTimeValue: {
        fontSize: 14,
        color: '#1A1D29',
        fontWeight: '700',
    },
    
    // Header Styles - Matching Services Page
    servicesHeader: {
        width: responsiveWidth(100),
        padding: responsiveWidth(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: responsiveHeight(5),
        paddingHorizontal: responsiveHeight(2.5),
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E8EBF0',
    },
    
    servicesHeaderLeft: {
        flexDirection: 'row',
        gap: responsiveWidth(1),
        alignItems: 'center',
    },
    
    servicesBackIcon: {
        tintColor: '#000000',
        top: responsiveHeight(0.5),
    },
    
    servicesHeaderTitle: {
        color: '#000000',
        fontSize: 20,
        fontWeight: '500',
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
        gap: responsiveWidth(1) 
    },

    containersecondsubchild: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    containerthirdsubchild: { 
        paddingHorizontal: responsiveWidth(5) 
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

    locationtextColor: { 
        color: '#000000' 
    },

    onsitetext: {
        paddingHorizontal: responsiveWidth(5),
        paddingTop: responsiveHeight(5),
        paddingBottom: responsiveHeight(1),
        color: '#AAAAAA',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 20,
        width: responsiveWidth(46),
    },

    homeservicetext: {
        paddingHorizontal: responsiveWidth(5),
        paddingTop: responsiveHeight(5),
        paddingBottom: responsiveHeight(1),
        color: '#58B9D0',
        fontSize: 16,
        fontWeight: '600',
        lineHeight: 20,
        width: responsiveWidth(46),
        borderBottomWidth: responsiveWidth(0.5),
        borderColor: '#58B9D0',
    },

    gap: { 
        gap: responsiveHeight(1) 
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
        flexDirection: "row", 
        alignItems: "center", 
        gap: responsiveWidth(2),
        paddingHorizontal: responsiveHeight(2)
    },

    textSize: { 
        fontSize: 16, 
        fontWeight: '800' 
    },

    borderRadius: {
        width: responsiveWidth(20.6),
        height: responsiveHeight(2.8),
        borderRadius: responsiveWidth(4),
        borderWidth: 1,
        borderColor: '#58B9D0',
        alignItems: 'center',
    },

    searchchild: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        borderRadius: 10,
        backgroundColor: "#F6F6F6",
        paddingHorizontal: responsiveHeight(2)
    },

    filterbtn: {
        width: responsiveWidth(11),
        height: responsiveHeight(5),
        backgroundColor: "#4494A8",
        borderRadius: responsiveHeight(1),
        justifyContent: 'center',
        alignItems: 'center'
    },

    textInput: {
        flex: 1,
        fontSize: 16,
        color: "#333",
        height: responsiveHeight(5),
        marginTop: responsiveHeight(0.40),
    },

    filterIcon: { 
        width: responsiveWidth(5), 
        height: responsiveHeight(2) 
    },

    iconMargin: { 
        marginRight: responsiveHeight(2)
    },

    // New styles for the updated boarding user component - Modern card without shadows
    boardingCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: responsiveWidth(5),
        marginVertical: responsiveHeight(0.8),
        borderRadius: responsiveWidth(4),
        padding: responsiveWidth(5),
        borderWidth: 1,
        borderColor: '#E8EBF0',
    },

    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: responsiveHeight(2),
    },

    providerInfo: {
        flex: 1,
        marginRight: responsiveWidth(3),
    },

    providerName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1A1D29',
        marginBottom: responsiveHeight(0.5),
        letterSpacing: -0.3,
    },

    providerLocation: {
        fontSize: 14,
        color: '#58B9D0',
        marginBottom: responsiveHeight(0.5),
        fontWeight: '500',
    },

    providerDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: responsiveHeight(1),
    },

    cardActions: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        minHeight: responsiveHeight(8),
    },

    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF8E1',
        paddingHorizontal: responsiveWidth(3),
        paddingVertical: responsiveHeight(0.8),
        borderRadius: responsiveWidth(4),
        marginBottom: responsiveHeight(1),
    },

    ratingText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#F57C00',
        marginLeft: responsiveWidth(1),
    },

    priceText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#58B9D0',
    },

    // Book Now Button - Matching Boarding Page Next Button Style
    bookNowButton: {
        width: '100%',
        height: responsiveHeight(6.5),
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#58B9D0',
        backgroundColor: '#E6F3F7',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: responsiveHeight(1),
    },

    bookNowText: {
        fontSize: 17,
        fontWeight: '700',
        color: '#58B9D0',
        letterSpacing: 0.5,
        marginLeft: responsiveWidth(2),
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    loadingText: {
        marginTop: responsiveHeight(2),
        fontSize: 16,
        color: '#666',
    },

    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(5),
        backgroundColor: '#FFFFFF',
    },

    errorText: {
        fontSize: 16,
        color: '#FF5252',
        textAlign: 'center',
        marginBottom: responsiveHeight(2),
    },

    retryButton: {
        backgroundColor: '#58B9D0',
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: responsiveHeight(1.5),
        borderRadius: responsiveWidth(2),
    },

    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(5),
        backgroundColor: '#FFFFFF',
    },

    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(1),
    },

    debugText: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        marginTop: responsiveHeight(0.5),
        fontStyle: 'italic',
    },

    dateTimeInfo: {
        backgroundColor: '#F8F9FA',
        marginHorizontal: responsiveWidth(5),
        marginVertical: responsiveHeight(1),
        padding: responsiveWidth(4),
        borderRadius: responsiveWidth(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    dateTimeLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: responsiveWidth(5),
        marginVertical: responsiveHeight(1),
        gap: responsiveWidth(2),
    },

    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#F6F6F6',
        borderRadius: responsiveWidth(3),
        paddingHorizontal: responsiveWidth(4),
        height: responsiveHeight(6),
    },

    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        marginLeft: responsiveWidth(2),
    },

    filterButton: {
        width: responsiveWidth(12),
        height: responsiveHeight(6),
        backgroundColor: '#58B9D0',
        borderRadius: responsiveWidth(3),
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Additional styles for API response fields
    availabilityText: {
        fontSize: 12,
        color: '#10B981',
        fontWeight: '500',
        marginTop: responsiveHeight(0.5),
    },

    contactText: {
        fontSize: 12,
        color: '#6366F1',
        marginTop: responsiveHeight(0.3),
    },

    emailText: {
        fontSize: 12,
        color: '#6366F1',
        marginTop: responsiveHeight(0.3),
    },

    serviceTypeText: {
        fontSize: 12,
        color: '#8B5CF6',
        fontWeight: '500',
        marginTop: responsiveHeight(0.5),
        textAlign: 'right',
    },

    capacityText: {
        fontSize: 12,
        color: '#F59E0B',
        fontWeight: '500',
        marginTop: responsiveHeight(0.5),
        textAlign: 'right',
    },

    // Debug styles (remove in production)
    debugContainer: {
        backgroundColor: '#F3F4F6',
        padding: responsiveWidth(2),
        marginTop: responsiveHeight(1),
        borderRadius: responsiveWidth(1),
        borderLeftWidth: 3,
        borderLeftColor: '#EF4444',
    },
    
    // Schedule and location styles - Enhanced
    scheduleInfo: {
        marginTop: responsiveHeight(1),
        gap: responsiveHeight(0.5),
        backgroundColor: '#F8F9FB',
        padding: responsiveWidth(3),
        borderRadius: responsiveWidth(2),
        borderLeftWidth: 3,
        borderLeftColor: '#58B9D0',
    },
    
    scheduleText: {
        fontSize: 13,
        color: '#1A1D29',
        fontWeight: '500',
    },
    
    locationText: {
        fontSize: 12,
        color: '#58B9D0',
        fontWeight: '500',
        marginTop: responsiveHeight(0.3),
    },

    // Services-style Header (matching Services page)
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

});

export default boardinguserstyles;