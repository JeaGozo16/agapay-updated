import React, { useState, useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Homepage({ navigation }) {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false); 
  const sidebarAnim = useRef(new Animated.Value(-250)).current; 

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dx < -20 && menuVisible,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < 0) {
          Animated.timing(sidebarAnim, {
            toValue: Math.max(gestureState.dx, -250),
            duration: 0,
            useNativeDriver: true,
          }).start();
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -100) {
          toggleMenu();
        } else {
          Animated.timing(sidebarAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(sidebarAnim, {
      toValue: menuVisible ? -250 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const openModal = (alertType) => setSelectedAlert(alertType);
  const closeModal = () => setSelectedAlert(null);

  const handleConfirm = () => {
    closeModal();
    switch (selectedAlert) {
      case 'Fire Emergency':
        navigation.navigate('FireEmergency');
        break;
      case 'Medical Assistance':
        navigation.navigate('MedicalAssistance');
        break;
      case 'Facility Failure':
        navigation.navigate('FacilityFailure');
        break;
      case 'Crime / Violence':
        navigation.navigate('CrimeandViolence');
        break;
      case 'Natural Hazard':
        navigation.navigate('NaturalHazard');
        break;
      case 'Biological Hazard':
        navigation.navigate('BiologicalHazard');
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container} {...panResponder.panHandlers}>
      <Animated.View style={[styles.sidebar, { transform: [{ translateX: sidebarAnim }] }]}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>AGAPAY</Text>
        </View>
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('About')}>
            <Icon name="info-circle" size={22} color="#fff" />
            <Text style={styles.menuTextText}>About the application</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Notification')}>
            <Icon name="bell" size={22} color="#fff" />
            <Text style={styles.menuTextText}>Notification Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Announcement')}>
            <Icon name="bullhorn" size={22} color="#fff" />
            <Text style={styles.menuTextText}>Announcement</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Transaction')}>
            <Icon name="history" size={22} color="#fff" />
            <Text style={styles.menuTextText}>Transaction History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('UpdateInfo')}>
            <Icon name="refresh" size={22} color="#fff" />
            <Text style={styles.menuTextText}>Update Information</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Feedback')}>
            <Icon name="star" size={22} color="#fff" />
            <Text style={styles.menuTextText}>Feedback</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {menuVisible && <TouchableOpacity style={styles.overlay} onPress={toggleMenu} activeOpacity={1} />}

      <View style={styles.mainContent}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
              <Text style={styles.menuText}>☰</Text>
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.greeting}>Hi Anna!</Text>
              <Text style={styles.subGreeting}>I am your ka-AGAPAY, I am ready to help you on your needs</Text>
            </View>
            <Image source={require('../assets/anna.png')} style={styles.profileImage} />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.upperScrollView}
            contentContainerStyle={styles.upperScrollContent}
          >
            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>STAY INFORMED</Text>
              <Image source={require('../assets/stayinformed.png')} style={styles.cardImage} />
              <Text style={styles.cardDescription}>
                Keep yourself updated on potential hazards or emergencies that could affect your area.
              </Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>PRACTICE EVACUATION DRILLS</Text>
              <Image source={require('../assets/evacuation.png')} style={styles.cardImage} />
              <Text style={styles.cardDescription}>
                Familiarize yourself with evacuation routes and practice using them.
              </Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>ALERT OTHERS</Text>
              <Image source={require('../assets/alertothers.png')} style={styles.cardImage} />
              <Text style={styles.cardDescription}>
                If you discover a fire, immediately sound the alarm by shouting or activating the nearest fire alarm.
              </Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>ASSIST OTHERS</Text>
              <Image source={require('../assets/assistothers.png')} style={styles.cardImage} />
              <Text style={styles.cardDescription}>
                Help others evacuate safely, especially those who may need assistance.
              </Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.sectionTitle}>HOW CAN I HELP YOU?</Text>
          <View style={styles.grid}>
            <TouchableOpacity style={styles.gridItem} onPress={() => openModal('Fire Emergency')}>
              <Image source={require('../assets/maroonfire.png')} style={styles.gridIcon} />
              <Text style={styles.gridText}>FIRE EMERGENCY</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem} onPress={() => openModal('Medical Assistance')}>
              <Image source={require('../assets/maroonmedical.png')} style={styles.gridIcon} />
              <Text style={styles.gridText}>MEDICAL ASSISTANCE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem} onPress={() => openModal('Facility Failure')}>
              <Image source={require('../assets/maroonfacility.png')} style={styles.gridIcon} />
              <Text style={styles.gridText}>FACILITY FAILURE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem} onPress={() => openModal('Crime / Violence')}>
              <Image source={require('../assets/maroonviolence.png')} style={styles.gridIcon} />
              <Text style={styles.gridText}>CRIME / VIOLENCE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem} onPress={() => openModal('Natural Hazard')}>
              <Image source={require('../assets/maroonnatural.png')} style={styles.gridIcon} />
              <Text style={styles.gridText}>NATURAL HAZARD</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.gridItem} onPress={() => openModal('Biological Hazard')}>
              <Image source={require('../assets/maroonbiological.png')} style={styles.gridIcon} />
              <Text style={styles.gridText}>BIOLOGICAL HAZARD</Text>
            </TouchableOpacity>
          </View>
        </View>

        {selectedAlert && (
          <Modal
            animationType="fade"
            transparent={true}
            visible={selectedAlert !== null}
            onRequestClose={closeModal}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>
                  Do you really want to send an SOS alert under {selectedAlert}?
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                    <Text style={styles.buttonText}>YES</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={closeModal}>
                    <Text style={styles.buttonText}>NO</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: 250,
    backgroundColor: '#800000',
    paddingVertical: 20,
    paddingHorizontal: 10,
    zIndex: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
  },
  toggleBtn: {
    backgroundColor: 'transparent',
    padding: 10,
  },
  logo: {
    marginVertical: 50,
    alignItems: 'center',
  },
  logoText: {
    marginTop: 30,
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
  },
  menu: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingLeft: 5,
  },
  menuTextText: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingLeft: width * 0.03,
  },
  headerContainer: {
    backgroundColor: '#8B0000',
    borderBottomLeftRadius: 60,
    paddingBottom: height * 0.04,
    paddingTop: height * 0.06,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    marginLeft: height * -0.02,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.03,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontSize: width * 0.06,
    color: '#FFF',
  },
  headerContent: {
    flex: 1,
    marginLeft: width * 0.02,
  },
  profileImage: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
  },
  greeting: {
    color: '#FFF',
    fontSize: width * 0.055,
    fontWeight: 'bold',
  },
  subGreeting: {
    color: '#FFF',
    fontSize: width * 0.035,
  },
  upperScrollContent: {
    paddingTop: height * 0.03,
    paddingLeft: width * 0.09,
    paddingRight: width * 0.1,
  },
  infoCard: {
    width: width * 0.43,
    height: height * 0.25,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: width * 0.01,
    marginRight: width * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FFB200',
    borderWidth: 3,
  },
  cardImage: {
    width: width * 0.2,
    height: width * 0.2,
    marginBottom: height * 0.009,
  },
  cardTitle: {
    paddingTop: height * 0.02,
    fontSize: width * 0.04,
    fontWeight: 'bold',
    marginBottom: height * 0.01,
    textAlign: 'center',
    color: '#212121',
  },
  cardDescription: {
    fontSize: width * 0.035,
    color: '#757575',
    textAlign: 'center',
    marginBottom: height * 0.01,
  },
  bottomSection: {
    padding: height * 0.04,
    backgroundColor: '#FFF',
  },
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    color: '#000000',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '45%',
    backgroundColor: '#FFF',
    padding: height * 0.007,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: height * 0.02,
    borderColor: '#8B0000',
    borderWidth: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
  },
  gridIcon: {
    width: width * 0.15,
    height: width * 0.15,
    marginBottom: height * 0.01,
  },
  gridText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: width * 0.8,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: height * 0.03,
    alignItems: 'center',
  },
  modalText: {
    fontSize: width * 0.045,
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#7E0000',
    padding: height * 0.01,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
});
