import React, { useState } from 'react'; 
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window'); 

const TransactionHistory = ({ }) => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: 'March 3, 2024',
      type: 'Medical Assistance',
      recipient: 'Reported to School Clinic',
      time: '3:00 PM',
    },
    {
      id: 2,
      date: 'April 26, 2024',
      type: 'Utility Failures',
      recipient: 'Reported to GSD',
      time: '10:52 AM',
    },
    {
      id: 3,
      date: 'April 30, 2024',
      type: 'Medical Assistance',
      recipient: 'Reported to School Clinic',
      time: '1:45 PM',
    },
  ]);

  const [details, setDetails] = useState([
    {
      id: 1, 
      responseStart: '3:03 PM',
      sosCallReceived: '3:04 PM',
      dispatch: '3:10 PM',
      responder: 'Erwin Matibag',
      position: 'University Nurse',
    },
    {
      id: 2, 
      responseStart: '3:03 PM',
      sosCallReceived: '3:04 PM',
      dispatch: '3:10 PM',
      responder: 'Erwin Matibag',
      position: 'University Nurse',
    },
    {
      id: 3,
      responseStart: '3:03 PM',
      sosCallReceived: '3:04 PM',
      dispatch: '3:10 PM',
      responder: 'Erwin Matibag',
      position: 'University Nurse',
    }
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.transactionButton} onPress={() => handlePress(item)}>
      <View style={styles.flag} />
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionDate}>{item.date}</Text>
        <Text style={styles.transactionType}>{item.type}</Text>
        <Text style={styles.transactionRecipient}>{item.recipient}</Text>
      </View>
      <Text style={styles.transactionTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  const handlePress = (item) => {
    setSelectedTransaction(item);
    const detail = details.find(detail => detail.id === item.id);
    setSelectedDetail(detail);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={width * 0.08} color="#8B0000" />
      </TouchableOpacity>
      </View>

      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.transactionsContainer}
      />
      
  
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Transaction Details</Text>
            <Text style={styles.modalText}>Date: {selectedTransaction && selectedTransaction.date}</Text>
            <Text style={styles.modalText}>Emergency Type: {selectedTransaction && selectedTransaction.type}</Text>
            <Text style={styles.modalText}>Recipient: {selectedTransaction && selectedTransaction.recipient}</Text>
            <Text style={styles.modalText}>Time Reported: {selectedTransaction && selectedTransaction.time}</Text>
            <Text style={styles.modalText}>Response Started: {selectedDetail && selectedDetail.responseStart}</Text>
            <Text style={styles.modalText}>SOS Call Received: {selectedDetail && selectedDetail.sosCallReceived}</Text>
            <Text style={styles.modalText}>Dispatch Time: {selectedDetail && selectedDetail.dispatch}</Text>
            <Text style={styles.modalText}>Responder 1: {selectedDetail && selectedDetail.responder}</Text>
            <Text style={styles.modalText}>Position: {selectedDetail && selectedDetail.position}</Text>
            
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: width * 0.01, 
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
     position: 'absolute',
    top: height * 0.04, 
    left: width * 0.04,
    zIndex: 1,
    padding: 5,
  },
  transactionsContainer: {
    paddingHorizontal: width * 0.05, 
    paddingVertical: height * 0.01,
    marginTop: height * 0.09,
  },
  transactionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    marginVertical: height * 0.005,
    padding: width * 0.04, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,

  },
  transactionDetails: {
    flex: 1,
  },
  transactionDate: {
    fontSize: width * 0.035, 
    color: '#888',
  },
  transactionType: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#000',
  },
  transactionRecipient: {
    color: '#444',
    fontSize: width * 0.04,
  },
  transactionTime: {
    fontSize: width * 0.035, 
    color: '#888',
  },
  flag: {
    width: width * 0.03, 
    height: height * 0.07, 
    backgroundColor: '#800000',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginRight: width * 0.04, 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: width * 0.05, 
    borderRadius: 10,
    width: '80%',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: width * 0.06, 
    fontWeight: 'bold',
    marginBottom: height * 0.02, 
    borderBottomWidth: 3,
    borderBottomColor: '#ddd',
  },
  modalText: {
    fontSize: width * 0.045, 
    color: '#444',
    marginBottom: height * 0.01, 
  },
  modalButton: {
    paddingVertical: height * 0.02,
    marginVertical: height * 0.02, 
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#800000',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  modalButtonText: {
    fontSize: width * 0.045, 
    color: '#fff',
    fontWeight: 'regular',
  },
});

export default TransactionHistory;
