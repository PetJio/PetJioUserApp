import { StyleSheet } from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

const historyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },

  // Header styles matching Service page
  serviceStyleHeader: {
    backgroundColor: '#FFFFFF',
    paddingTop: responsiveHeight(5),
  },
  serviceHeaderContainer: {
    width: responsiveWidth(100),
    padding: responsiveWidth(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveHeight(2.5),
  },
  serviceHeaderLeft: {
    flexDirection: 'row',
    gap: responsiveWidth(1),
    alignItems: 'center',
  },
  serviceHeaderTitle: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '500',
  },
  serviceHeaderRight: {
    flexDirection: 'row',
    gap: responsiveWidth(1),
    alignItems: 'center',
  },
  serviceHeaderSubtitle: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
  },

  // Content area
  content: {
    flex: 1,
    paddingHorizontal: responsiveWidth(4),
  },

  // Loading states
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(10),
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: responsiveHeight(10),
    paddingHorizontal: 20,
  },
  errorText: {
    marginTop: 16,
    marginBottom: 20,
    fontSize: 16,
    color: '#E74C3C',
    textAlign: 'center',
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: '#58B9D0',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
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
    paddingVertical: responsiveHeight(15),
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  emptyList: {
    flexGrow: 1,
  },

  // List container
  listContainer: {
    paddingTop: responsiveHeight(2),
    paddingBottom: responsiveHeight(4),
  },

  // Booking card styles
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  // Card header
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(88, 185, 208, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  providerName: {
    fontSize: 14,
    color: '#6B7280',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  bookingId: {
    fontSize: 12,
    fontWeight: '600',
    color: '#58B9D0',
    marginBottom: 2,
  },
  duration: {
    fontSize: 12,
    color: '#6B7280',
  },

  // Date section
  dateSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateTexts: {
    marginLeft: 8,
  },
  dateLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  dateDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 16,
  },

  // Features section
  featuresSection: {
    marginBottom: 16,
  },
  featuresTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featureText: {
    fontSize: 12,
    color: '#0369A1',
    marginLeft: 4,
    fontWeight: '500',
  },

  // Pets section
  petsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  petsText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },

  // Status section
  statusSection: {
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
    flex: 1,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 40,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  // Card footer
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingTop: 12,
  },
  bookingDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButtonText: {
    fontSize: 14,
    color: '#58B9D0',
    fontWeight: '500',
    marginRight: 4,
  },
});

export default historyStyles;