import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Dimensions, Modal, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');
const boxWidth = width;
const boxHeight = height / 2.6;

export const Audio = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMain, setSelectedMain] = useState();
  const [selectedHeadphoneOne, setSelectedHeadphoneOne] = useState();
  const [selectedHeadphoneTwo, setSelectedHeadphoneTwo] = useState();
  const [selectedHeadphoneThree, setSelectedHeadphoneThree] = useState();
  const [isActivated, setIsActivated] = useState(false);

  const sendCommand = (command) => {
    console.log(command);
    if (command === 'ACTIVATE') {
      setIsActivated(true);
    } else if (command === 'DEACTIVATE') {
      setIsActivated(false);
    }
  };

  const handleDropdownChange = (commandPrefix, itemValue) => {
    if (itemValue) {
      console.log(`${commandPrefix}${itemValue}`);
    }
  };

  const dropdowns = [
    { label: 'Main', value: selectedMain, setter: setSelectedMain, commandPrefix: 'MAIN_' },
    { label: 'Headphone One', value: selectedHeadphoneOne, setter: setSelectedHeadphoneOne, commandPrefix: 'HP1_' },
    { label: 'Headphone Two', value: selectedHeadphoneTwo, setter: setSelectedHeadphoneTwo, commandPrefix: 'HP2_' },
    { label: 'Headphone Three', value: selectedHeadphoneThree, setter: setSelectedHeadphoneThree, commandPrefix: 'HP3_' },
  ];

  return (
    <View style={styles.audioContainer}>
      <TouchableOpacity
        style={styles.audioButton}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={require('./Assets/audio.png')}
          style={styles.audioImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
        supportedOrientations={['landscape']}
      >
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <Text style={styles.modalText}>Headphones</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.commandButton, isActivated ? styles.activeButton : styles.inactiveButton]}
              onPress={() => sendCommand('ACTIVATE')}
            >
              <Text style={styles.commandButtonText}>Activate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.commandButton, !isActivated ? styles.activeButton : styles.inactiveButton]}
              onPress={() => sendCommand('DEACTIVATE')}
            >
              <Text style={styles.commandButtonText}>Deactivate</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dropdownContainer}>
            {dropdowns.map((dropdown, index) => (
              <View key={index} style={styles.dropdown}>
                <Text style={styles.dropdownLabel}>{dropdown.label}</Text>
                <Picker
                  selectedValue={dropdown.value}
                  onValueChange={(itemValue) => {
                    dropdown.setter(itemValue);
                    handleDropdownChange(dropdown.commandPrefix, itemValue);
                  }}
                  style={styles.pickerStyle}
                  itemStyle={styles.pickerItemStyle}
                >
                  <Picker.Item label="None" value={null} />
                  {[...Array(8)].map((_, i) => (
                    <Picker.Item key={i} label={`Input ${i + 1}`} value={`Input ${i + 1}`} />
                  ))}
                </Picker>
              </View>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

// ... (The beginning of the code remains unchanged)

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 35,
    alignItems: "center",
  },
  modalText: {
    color: 'white',
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',  // Reduced width to bring buttons closer
    marginBottom: 20,
  },
  commandButton: {
    flex: 0.45,  // Reduced the flex size to make the buttons smaller
    padding: 6,  // Adjusted padding
    margin: 3,   // Reduced margin to bring buttons closer
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: 'green',
  },
  inactiveButton: {
    backgroundColor: 'darkblue',
  },
  commandButtonText: {
    color: 'white',
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20
  },
  dropdown: {
    alignItems: 'center'
  },
  dropdownLabel: {
    color: 'white',
    marginBottom: 5,
    fontSize: 18  // Reduced font size for the headings
  },
  pickerStyle: {
    height: 40,
    width: 130,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  pickerItemStyle: {
    height: 40,
    color: 'white',
  },
  audioContainer: {
    position: 'absolute',
    top: 8,
    right: 10,
  },
  audioButton: {
    width: boxWidth / 7.5,
    height: boxHeight / 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 5,
  },
  audioImage: {
    width: '200%',
    height: '200%',
  },
});

export default Audio;

