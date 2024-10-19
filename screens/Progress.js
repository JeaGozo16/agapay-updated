import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Animated, Easing, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import * as Linking from 'expo-linking'; // Import Linking for call functionality

const { width, height } = Dimensions.get('window');
const isSmallDevice = width < 375;

const ResponseProgress = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start();
  }, [progress]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : prev));
      if (progress === 100) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [progress]);

  const strokeDasharray = 283;
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [strokeDasharray, 0],
  });

  const makeCall = () => {
    const phoneNumber = '09369452215'; // The number you want to prefill in the dial pad
    const url = `tel:${phoneNumber}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Error', 'This device does not support phone calls');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => Alert.alert('Error', err.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>RESPONSE PROGRESS</Text>
      </View>

      <View style={styles.progressContainer}>
        <Svg width={isSmallDevice ? 120 : 150} height={isSmallDevice ? 250 : 180} viewBox="0 0 100 100">
          <Circle cx="50" cy="50" r="45" stroke="#E0E0E0" strokeWidth="10" fill="none" />
          <AnimatedCircle
            cx="50"
            cy="50"
            r="45"
            stroke="#FF4500"
            strokeWidth="10"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
          />
        </Svg>
        <Animated.Text style={styles.percentageText}>
          {animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['0', '100'],
          }).__getValue()}%
        </Animated.Text>
      </View>

      <View style={styles.messageContainer}>
        <View style={styles.dot} />
        <Text style={styles.messageText}>SOS alert has been received by the Security Department.</Text>
      </View>

      <View style={styles.floatingButtonContainer}>
        {/* Button to open the message screen */}
        <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('Message')}>
          <FontAwesome name="comment" size={isSmallDevice ? 24 : 30} color="#FFF" />
        </TouchableOpacity>

        {/* Button to trigger the call */}
        <TouchableOpacity style={styles.floatingButton} onPress={makeCall}>
          <FontAwesome name="phone" size={isSmallDevice ? 24 : 30} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    backgroundColor: '#8B0000',
    width: '120%',
    height: '10%',
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 100,
    marginTop: -350,
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: isSmallDevice ? 18 : 22,
    fontWeight: 'bold',
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  percentageText: {
    position: 'absolute',
    fontSize: isSmallDevice ? 24 : 30,
    fontWeight: 'bold',
    color: '#FF4500',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 20,
    maxWidth: '100%',
    alignContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#8B0000',
    marginRight: 10,
  },
  messageText: {
    fontSize: isSmallDevice ? 14 : 16,
    color: '#333',
    textAlign: 'center',
  },
  floatingButtonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    alignItems: 'center',
  },
  floatingButton: {
    backgroundColor: '#8B0000',
    borderRadius: 50,
    padding: 16,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default ResponseProgress;
