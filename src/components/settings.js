import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Modal, Text, Button, Linking, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';

const { width, height } = Dimensions.get('window');
const boxWidth = width;
const boxHeight = height / 2.6;

const isValidIP = (ip) => {
  const ipAddressPattern = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  return ipAddressPattern.test(ip);
};

export const Settings = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [hipCode, setHipCode] = useState('192.168.1.100');
  const [editedHipCode, setEditedHipCode] = useState(hipCode);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveHipCode = () => {
    if (!isValidIP(editedHipCode)) {
      console.log('Invalid IP address');
      return;
    }

    // Add your implementation to save the HIP code to storage here
    console.log('Saving HIP code:', editedHipCode);
    setHipCode(editedHipCode); // Update the actual HIP code with the edited value
    setIsEditing(false);
    setModalVisible(false);
  };

  const handleCloseModal = () => {
    setEditedHipCode(hipCode); // Reset the edited value to the original HIP code
    setIsEditing(false);
    setModalVisible(false);
  };

  const handleReboot = async () => {
    // Perform the fetch command to reboot the Kokast Box
    console.log('Rebooting Kokast Box...');
    // Replace the URL with your API endpoint for rebooting the Kokast Box
    // Example: await fetch('https://api.example.com/reboot', { method: 'POST' });
  };

  const handleLogout = () => {
    // Perform the logout action to turn off the app
    console.log('Logging out...');
    // Add your logout logic here
  };

  const handleOpenTermsAndConditions = () => {
    // Open the Terms & Conditions website in the device's default browser
    Linking.openURL('https://www.example.com/terms-and-conditions');
  };

  const handleBlur = () => {
    // Save the edited HIP code when the input field loses focus
    if (isEditing) {
      handleSaveHipCode();
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.settingsContainer}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={require('./Assets/settings.png')}
          style={styles.settingsImage}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
              <Text style={styles.closeButtonLabel}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.settingsTitle}>Settings</Text>
            <View style={styles.hipCodeContainer}>
              <Text style={styles.hipCodeTitle}>HIP Code:</Text>
              {!isEditing ? (
                <Text style={[styles.hipCodeText, { color: '#fff' }]}>{hipCode}</Text>
              ) : (
                <TextInput
                  style={[styles.hipCodeInput, { color: '#fff' }]}
                  value={editedHipCode}
                  onChangeText={setEditedHipCode}
                  autoFocus
                  onBlur={handleBlur} // Save the edited HIP code when the input field loses focus
                />
              )}
            </View>
            {!isEditing ? (
              <Button title="Edit HIP Code" onPress={() => setIsEditing(true)} />
            ) : (
              <Button title="Cancel" onPress={() => setIsEditing(false)} />
            )}
            <Button title="Reboot Kokast Box" onPress={handleReboot} />
            <Button title="Terms & Conditions" onPress={handleOpenTermsAndConditions} />
            <Button title="Logout" onPress={handleLogout} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    position: 'absolute',
    top: 8, // Adjust this value to set the gap from the top edge
    left: 10, // Adjust this value to set the gap from the left edge
  },
  settingsImage: {
    width: boxWidth / 7.5,
    height: boxHeight / 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Set text color to white
  },
  hipCodeContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  hipCodeTitle: {
    fontSize: 16,
    marginRight: 10,
    color: '#fff', // Set text color to white
  },
  hipCodeText: {
    fontSize: 16,
    color: '#fff', // Set text color to white
  },
  hipCodeInput: {
    fontSize: 16,
    flex: 1,
    color: '#fff', // Set text color to white
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
  },
  closeButtonLabel: {
    fontSize: 16,
    color: '#000',
  },
});

export default Settings;
