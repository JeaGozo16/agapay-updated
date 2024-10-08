import React, { useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView, Animated, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const { width, height } = Dimensions.get('window');

export default function About({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  const scaleAnim = useRef(new Animated.Value(0.9)).current;  

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, 
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, 
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
    >
      <View style={styles.bgContainer}>
        <ImageBackground source={require('../assets/agapaybg.jpg')} style={styles.background}>
          {/* Back Icon */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={35} color="#8B0000" />
          </TouchableOpacity>
          
          {/* Animated Logo */}
          <Animated.Image
            source={require('../assets/logo.png')}
            style={[styles.logo, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
          />

          <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Text style={styles.text}>
              AGAPAY is a comprehensive emergency and disaster response system designed for both web and mobile platforms. It provides real-time alerts, crucial information, and resources during emergencies, ensuring swift and efficient response efforts. With features like GPS tracking, communication tools, and access to emergency services, AGAPAY empowers individuals and communities to stay safe and connected during crises. Developed with user-friendly interfaces and robust backend infrastructure, AGAPAY aims to enhance disaster preparedness and resilience at every university. Let’s create a safer and more resilient future with us, KA-AGAPAY.
            </Text>
          </Animated.View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: height, 
    paddingVertical: 50,
  },
  backButton: {
    position: 'absolute',
    top: height * 0.04, 
    left: width * 0.04, 
    zIndex: 1,
    padding: 5,
  },
  logo: {
    width: width * 0.8, 
    height: width * 0.8, 
    resizeMode: 'contain',
    marginBottom: 30,
  },
  container: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#ffffffcc',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    marginHorizontal: 20,
    alignItems: 'center',
    width: '90%',
  },
  text: {
    fontSize: width * 0.045, 
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 26,
    color: '#333',
    paddingVertical: 15,
    paddingHorizontal: 15,
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
