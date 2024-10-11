
import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window'); //para maging responsive
const SLIDE_INTERVAL = 3000; 

const Welcome = ({ navigation }) => {
    const scrollViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = [
        {
            key: '1',
            image: require('../assets/w1.png'),
            text: 'Your UNIVERSITY 911, One call away and we are ready to help in any way we can',
        },
        {
            key: '2',
            image: require('../assets/w2.png'),
            text: 'We ensure the safety and security of everyone on campus during emergencies and natural disasters',
        },
        {
            key: '3',
            image: require('../assets/w3.png'),
            text: 'We facilitate quick and efficient communication during crises',
        },
        {
            key: '4',
            image: require('../assets/w4.png'),
            text: 'We got you covered in any emergency inside the university',
        },
        {
            key: '5',
            image: require('../assets/w5.png'),
            text: 'We protect the lives and well-being of the students, faculty, and staff, as well as maintain the integrity and functionality of the institution during crises.',
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1; //pag iincrement sa slides para mag loop
                if (nextIndex >= slides.length) {
                    return 0;
                }
                return nextIndex;
            });
        }, SLIDE_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: currentIndex * width, animated: true });
        }
    }, [currentIndex]);

    return (
        <ImageBackground
            source={require('../assets/agapaybg.jpg')}
            style={styles.background}
        >
            <View style={styles.container}>
                
                <Image
                    source={require('../assets/logo.png')}
                    style={styles.logo}
                />

                <ScrollView
                    horizontal
                    pagingEnabled //para di malipat yung page unless na tapos na ang 3sec interval
                    showsHorizontalScrollIndicator={false}
                    ref={scrollViewRef}
                    style={styles.scrollView}
                >
                    {slides.map((slide) => ( //para makuha yung sa slides gamit yung unique key
                        <View key={slide.key} style={styles.slide}>
                            <Image source={slide.image} style={styles.image} />
                            <Text style={styles.text}>{slide.text}</Text>
                        </View>
                    ))}
                </ScrollView>

             
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('LoginScreen')} 
                    >
                        <Text style={styles.buttonText}>Log in as User</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 250, 
        height: 150,  
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 60, 
        marginBottom: 1, 
    },
    scrollView: {
        flex: 1,
    },
    slide: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 270, 
        height: 270,
        marginBottom: 10,
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 220,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 140, 
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#7E0000', 
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 25,
        elevation: 5, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3.84, 
    },
    buttonText: {
        color: '#fff', 
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
    },
});
export default Welcome;