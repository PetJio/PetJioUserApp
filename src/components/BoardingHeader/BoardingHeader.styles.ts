import { StyleSheet, Platform } from 'react-native';

const boardingHeaderStyles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? 60 : 20,
        paddingBottom: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        height: 80,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2c3e50',
        textAlign: 'center',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#6c757d',
        textAlign: 'center',
        marginTop: 2,
        fontWeight: '500',
    },
    placeholder: {
        width: 40,
    },
});

export default boardingHeaderStyles;
