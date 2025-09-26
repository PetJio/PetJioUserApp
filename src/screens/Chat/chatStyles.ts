import { StyleSheet, Platform } from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8EBF0',
  },
  // Service page style header
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

  // Header user info styles
  headerUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: responsiveWidth(3),
  },
  headerTextInfo: {
    marginLeft: 12,
    flex: 1,
  },
  headerUserStatus: {
    fontSize: 12,
    color: '#58B9D0',
    fontWeight: '400',
    marginTop: 2,
  },
  headerAction: {
    padding: 8,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E8EBF0',
  },
  userDetails: {
    flex: 1,
  },
  headerUserName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1D29',
  },
  onlineStatus: {
    fontSize: 14,
    color: '#10B981',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E8EBF0',
    backgroundColor: '#F8F9FB',
  },
  messagesList: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  messagesContent: {
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(4),
  },
  messageContainer: {
    marginVertical: responsiveHeight(0.5),
  },
  myMessage: {
    alignItems: 'flex-end',
  },
  theirMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1.2),
    borderRadius: 20,
  },
  myMessageBubble: {
    backgroundColor: '#58B9D0',
    borderBottomRightRadius: 6,
  },
  theirMessageBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: '#E8EBF0',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  myMessageText: {
    color: '#FFFFFF',
  },
  theirMessageText: {
    color: '#1A1D29',
  },
  messageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  myMessageInfo: {
    justifyContent: 'flex-end',
  },
  theirMessageInfo: {
    justifyContent: 'flex-start',
  },
  timestamp: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '400',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8EBF0',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F3F4F6',
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 45,
    borderWidth: 1,
    borderColor: '#E8EBF0',
  },
  attachButton: {
    padding: 4,
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#1A1D29',
    maxHeight: 100,
    paddingVertical: 0,
    textAlignVertical: 'center',
  },
  sendButton: {
    padding: 8,
    marginLeft: 8,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  sendButtonActive: {
    backgroundColor: '#58B9D0',
    borderColor: '#4A9FBF',
  },
});

export default chatStyles;
