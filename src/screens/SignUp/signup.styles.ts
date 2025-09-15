import { StyleSheet } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';

const signupstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      topImage: {
        width:responsiveWidth(100),
        height:responsiveHeight(50),
      },
      scrollContainer: {
        flex: 1,
      },
      scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
      },
      formContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
      },
      heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#000',
      },
      subheading: {
        fontSize: 16,
        color: '#666',
        marginBottom: responsiveHeight(3),
      },
    
      inputContainer: {
        gap:responsiveHeight(1),
        marginBottom: 10,
      },
      passwordInput: {
        flex: 1,
        height: 45,
      },
      eyeIcon: {
        width: 20,
        height: 20,
      },
      forgotText: {
        alignSelf: 'flex-end',
        marginBottom: 20,
        color: '#12215E',
      },
      loginButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: responsiveWidth(90),
        height: responsiveHeight(5.8),
        borderRadius: responsiveHeight(1),
        backgroundColor: '#58B9D0',
        marginBottom: responsiveHeight(2)
      },
      loginText: {
        color: '#fff',
        fontSize: 16,
        fontWeight:'600',
        lineHeight:16,
        letterSpacing:1
      },
      orText: {
        textAlign: 'center',
        marginVertical: 10,
        color: '#666',
      },
      socialButtons: {
        flexDirection: 'row',
        justifyContent:'center',
        gap:responsiveWidth(3),
        marginBottom: 20,
      },
      socialButton: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 8,
      },
      socialIcon: {
        width: 20,
        height: 20,
      },
      registerText: {
        textAlign: 'center',
        color: '#666',
      },
      registerLink: {
        top:responsiveHeight(0.35),
        color: '#4494A8',
        fontWeight: '500',
      },

    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
        gap:responsiveWidth(1)
      },
      line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
      },
      ortext: {
        marginHorizontal: 10,
        color: '#666',
      },

      setLeftIconposition:{
        position:'relative'
    },
    arrowIconPosition:{
    position:'absolute',
    top:responsiveHeight(6),
    left:responsiveWidth(8)
},
leftArrowIconSize:{
      width:responsiveWidth(8),
      height:responsiveHeight(2)
},

// Message styles
messageContainer: {
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 8,
  marginBottom: 16,
  alignItems: 'center',
},
successMessage: {
  backgroundColor: '#4CAF50',
},
errorMessage: {
  backgroundColor: '#FF6B6B',
},
messageText: {
  color: '#FFFFFF',
  fontSize: 14,
  textAlign: 'center',
  fontWeight: '600',
},
errorText: {
  color: '#FF6B6B',
  fontSize: 12,
  marginTop: 4,
  marginBottom: 8,
  marginLeft: 4,
  fontWeight: '500',
}

});

export default signupstyles;