import React from 'react';
import {View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ImageBackground,Dimensions, ScrollView, KeyboardAvoidingView,Platform,} from 'react-native';

const { width, height } = Dimensions.get('window'); 

const LoginScreen = ({ navigation }) => {
  return (
    <ImageBackground source={require('../assets/agapaybg.jpg')} style={styles.background}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // Ensures the keyboard avoids the view correctly
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}></Text>
          </TouchableOpacity>

          <Text style={styles.welcomeText}>Welcome ka-AGAPAY!</Text>
          <Text style={styles.subText}>Log in as User</Text>
          <Image source={require('../assets/logo.png')} style={styles.logo} />

          <TextInput
            placeholder="Institutional Account"
            placeholderTextColor="#999"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry 
            style={styles.input}
          />
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Homepage')}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, 
    justifyContent: 'center',
    paddingHorizontal: width * 0.05, 
  },
  background: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute', 
    top: height * 0.05, 
    left: width * 0.05,
    zIndex: 10, 
  },
  backButtonText: {
    fontSize: width * 0.08, 
    color: '#7E0000',
  },
  welcomeText: {
    fontSize: width * 0.08, 
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'left', 
    marginBottom: height * 0.01,
  },
  subText: {
    fontSize: width * 0.05, 
    color: '#555',
    textAlign: 'left', 
    marginBottom: height * 0.03,
    fontWeight: '700',
  },
  logo: {
    width: width * 0.7, 
    height: height * 0.3, 
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: height * 0.05, 
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: height * 0.015, 
    paddingHorizontal: width * 0.05, 
    marginBottom: height * 0.02, 
    fontSize: width * 0.045, 
    color: '#000',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
  loginButton: {
    alignSelf: 'center', 
    backgroundColor: '#800000', 
    paddingVertical: height * 0.015, 
    paddingHorizontal: width * 0.2, 
    borderRadius: 25,
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    marginTop: height * 0.03, 
  },
  loginButtonText: {
    color: '#fff',
    fontSize: width * 0.05, 
    fontWeight: 'bold',
    textAlign: 'center', 
    marginBottom: height * 0.01, 
  },
});
export default LoginScreen;