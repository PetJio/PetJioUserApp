import { StyleSheet } from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
} from 'react-native-responsive-dimensions';

const loginstyles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height:responsiveHeight(100)
      },
      topImage: {
        width:responsiveWidth(100),
        height:responsiveHeight(50),
       
     
      },
      formContainer: {
        paddingHorizontal: 20,
      },
      heading: {
        fontSize: 24,
        fontWeight: 'bold',
        bottom:responsiveWidth(5),
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
    button: {
        alignSelf: 'center',
        width: '50%',
    },
    SingTextcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
    },
    Leftline: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
        marginLeft: '10%'
    },
    Rightline: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
        marginRight: '10%'
    },
    
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button1: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 8,
    },
    text: {
        fontSize: 16,
        color: '#000000',
    },
    checkboxcontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },


    containersection: {
        alignItems: 'center',
        marginTop:'40%',
       

    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },
    logo: {
        width: 60,
        height: 40,
        resizeMode: 'contain',
    },
    accountText: {
        fontSize: 14,
        marginBottom: 5,
    },
    
    termsText: {
        fontSize: 12,
        color: 'gray',
        textAlign: 'center',
        marginTop: 5,
    },
    termsLink: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
   
    
    eyeicon: {
        position: 'absolute',
        right: 15,
        top: 22,
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

export default loginstyles;