import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window'); 

const UpdateInfo = () => {
  const initialState = {
    contactNumber: '09234564039',
    alternativeNumber: '09579712976',
    permanentAddress: 'Brgy. Balubal Sariaya Quezon',
    currentAddress: 'PNB Home Site Village, Lucena City',
    guardianName: 'Maria Dela Cruz',
    guardianRelation: 'Mother',
    guardianContactNumber: '09453548991',
    guardianAlternativeNumber: '09453548991',
    guardianPermanentAddress: 'Brgy. Balubal Sariaya Quezon',
    guardianCurrentAddress: 'Brgy. Balubal Sariaya Quezon',
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isModified, setIsModified] = useState(false);
  const navigation = useNavigation();

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setIsModified(JSON.stringify({ ...formData, [field]: value }) !== JSON.stringify(initialState));
  };

  const handleConfirm = () => {
    setModalVisible(false);
    navigation.navigate('Homepage');
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image source = {require('../assets/header.png')}style={styles.headerCurve}></Image>

      <View style={styles.profileSection}>
        <Image source={require('../assets/anna.png')} style={styles.avatar} />
        <Text style={styles.name}>Anna Marie Dela Cruz</Text>
        <Text style={styles.studentDetails}>Bachelor of Science in Information Technology</Text>
        <Text style={styles.studentDetails}>3rd - Year</Text>
        <Text style={styles.studentDetails}>A21-23940</Text>
      </View>

      <ScrollView style={styles.infos}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contact Number:</Text>
          <View style={styles.inputWithIcon}>
            <Icon name="phone" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="09234564039"
              keyboardType="phone-pad"
              value={formData.contactNumber}
              onChangeText={(value) => handleInputChange('contactNumber', value)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Alternative Number:</Text>
          <View style={styles.inputWithIcon}>
            <Icon name="phone" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="09579712976"
              keyboardType="phone-pad"
              value={formData.alternativeNumber}
              onChangeText={(value) => handleInputChange('alternativeNumber', value)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Permanent Address:</Text>
          <View style={styles.inputWithIcon}>
            <Icon name="map-marker" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Brgy. Balubal Sariaya Quezon"
              value={formData.permanentAddress}
              onChangeText={(value) => handleInputChange('permanentAddress', value)}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Current Address:</Text>
          <View style={styles.inputWithIcon}>
            <Icon name="map-marker" size={20} color="#ccc" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="PNB Home Site Village, Lucena City"
              value={formData.currentAddress}
              onChangeText={(value) => handleInputChange('currentAddress', value)}
            />
          </View>
        </View>

        <View style={styles.guardianSection}>
          <Text style={styles.guardianHeader}>GUARDIAN INFORMATION:</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name:</Text>
            <View style={styles.inputWithIcon}>
              <Icon name="user" size={20} color="#ccc" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Maria Dela Cruz"
                value={formData.guardianName}
                onChangeText={(value) => handleInputChange('guardianName', value)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Relation:</Text>
            <View style={styles.inputWithIcon}>
              <Icon name="heart" size={20} color="#ccc" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Mother"
                value={formData.guardianRelation}
                onChangeText={(value) => handleInputChange('guardianRelation', value)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contact Number:</Text>
            <View style={styles.inputWithIcon}>
              <Icon name="phone" size={20} color="#ccc" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="09453548991"
                value={formData.guardianContactNumber}
                onChangeText={(value) => handleInputChange('guardianContactNumber', value)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Alternative Number:</Text>
            <View style={styles.inputWithIcon}>
              <Icon name="phone" size={20} color="#ccc" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="09453548991"
                value={formData.guardianAlternativeNumber}
                onChangeText={(value) => handleInputChange('guardianAlternativeNumber', value)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Permanent Address:</Text>
            <View style={styles.inputWithIcon}>
              <Icon name="map-marker" size={20} color="#ccc" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Brgy. Balubal Sariaya Quezon"
                value={formData.guardianPermanentAddress}
                onChangeText={(value) => handleInputChange('guardianPermanentAddress', value)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Current Address:</Text>
            <View style={styles.inputWithIcon}>
              <Icon name="map-marker" size={20} color="#ccc" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Brgy. Balubal Sariaya Quezon"
                value={formData.guardianCurrentAddress}
                onChangeText={(value) => handleInputChange('guardianCurrentAddress', value)}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: isModified ? '#8B0000' : '#ccc' }]}
          disabled={!isModified}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >

          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Are you sure you want to save changes?</Text>
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={handleConfirm}
                >
                  <Text style={styles.modalButtonText}>YES</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={closeModal}
                >
                  <Text style={styles.modalButtonText}>NO</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerCurve: {
    height: height * 0.7, 
    width: '110%',
    position: 'absolute',
    top: -height * 0.1, 
  },
  profileSection: {
    alignItems: 'center',
    marginTop: height * 0.13, 
  },
  avatar: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2, 
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: height * 0.02,
  },
  name: {
    color: 'black',
    fontSize: width * 0.06, 
    fontWeight: 'bold',
    marginVertical: height * 0.001,
  },
  studentDetails: {
    color: 'black',
    fontSize: width * 0.045, 
    marginVertical: height * 0.002,
  },
  infos: {
    marginTop: height * 0.05, 
    paddingHorizontal: width * 0.05, 
  },
  inputContainer: {
    marginBottom: height * 0.02, 
  },
  label: {
    fontSize: width * 0.045, 
    color: 'black',
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#F1EFEF',
    backgroundColor: '#F1EFEF',
    borderWidth: 1,
    borderRadius: 10,
    padding: width * 0.03, 
  },
  icon: {
    marginRight: width * 0.03, 
    color: '#8B0000',
  },
  input: {
    flex: 1,
    fontSize: width * 0.045, 
  },
  saveButton: {
    backgroundColor: '#8B0000',
    paddingVertical: height * 0.01,
    width: height * 0.2,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: width * 0.1, 
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    marginLeft: height * 0.2,
    marginBottom: height * 0.05, 
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: width * 0.05,
    fontWeight: '700',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: width * 0.045,
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: height * 0.01,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  confirmButton: {
    backgroundColor: '#8B0000',
  },
  cancelButton: {
    backgroundColor: '#8B0000',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: width * 0.040,
    fontWeight: 'bold',
  },
});


export default UpdateInfo;