import { StyleSheet } from 'react-native';

const paravetcheckoutstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingBottom: 100,
    },
    
    // Header Section
    header: {
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#2c3e50',
        textAlign: 'center',
    },

    // Content Sections
    content: {
        padding: 16,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
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

    // Service Item
    serviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    serviceIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#e3f2fd',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    serviceDetails: {
        flex: 1,
    },
    serviceName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: 4,
    },
    serviceDescription: {
        fontSize: 14,
        color: '#6c757d',
    },
    servicePrice: {
        fontSize: 16,
        fontWeight: '700',
        color: '#27ae60',
    },

    // Dropdown Styles
    dropdown: {
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#999',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#333',
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

    // Order Summary
    orderSummary: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        marginTop: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    summaryLabel: {
        fontSize: 15,
        color: '#495057',
    },
    summaryValue: {
        fontSize: 15,
        fontWeight: '600',
        color: '#343a40',
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

    // Payment Button
    paymentContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#e9ecef',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    paymentButton: {
        backgroundColor: '#007bff',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#007bff',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    paymentButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },

    // Additional styles for existing components
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f3f4',
    },
    textItem: {
        fontSize: 16,
        color: '#333',
        marginLeft: 8,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    setTextAmountflex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    chargeText: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 17,
        letterSpacing: 0,
        color: '#303030'
    },
    amountText: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 17,
        letterSpacing: 0,
        color: '#303030'
    }
});

export default paravetcheckoutstyles;
