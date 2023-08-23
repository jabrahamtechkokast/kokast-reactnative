import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Modal, Text, Button, Linking, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import GenericDataStorage from '../store/GenericDataStorage';
import sendTelnetCommand from './telnet';

const { width, height } = Dimensions.get('window');
const boxWidth = width;
const boxHeight = height / 2.6;


export const Settings = () => {
  const { data, updateData } = GenericDataStorage({
    dataKey: "HipKey",
    initialData: {
      hipCode: ""
    }
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [editedHipCode, setEditedHipCode] = useState(data.hipCode);
  const [isEditing, setIsEditing] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // New state variable

  useEffect(() => {
    if (data.hipCode && !isDataLoaded) {
      setEditedHipCode(data.hipCode);
      setIsDataLoaded(true);
    }
  }, [data.hipCode]);

  const isValidIP = (ip:string) => /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(ip);

  const handleSaveHipCode = () => {
    if (!isValidIP(editedHipCode)) {
      console.log('Invalid IP address');
      return;
    }
    console.log('Saving HIP code:', editedHipCode);
    updateData({ hipCode: editedHipCode });
    setIsEditing(false);
    setModalVisible(false);
  };

  const handleCloseModal = () => {
    setEditedHipCode(data.hipCode);
    setIsEditing(false);
    setModalVisible(false);
  };

  return (
    <View>
      <View style={styles.settingsContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={require('./Assets/settings.png')}
            style={styles.settingsImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        supportedOrientations={['landscape']}
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
                <Text style={styles.hipCodeText}>{data.hipCode}</Text>
              ) : (
                <TextInput
                  style={styles.hipCodeInput}
                  value={editedHipCode}
                  onChangeText={setEditedHipCode}
                  autoFocus
                  onBlur={handleSaveHipCode}
                />
              )}
            </View>
            {!isEditing ? (
              <Button title="Edit HIP Code" onPress={() => setIsEditing(true)} />
            ) : (
              <Button title="Cancel" onPress={() => setIsEditing(false)} />
            )}
            <Button title="Reboot Matrix Box" onPress={() => sendTelnetCommand("SET RBT \r\n")} />
            <Button title="Terms & Conditions" onPress={() => Linking.openURL('https://www.ko-kast.com/terms-of-service')} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsContainer: {
    position: 'absolute',
    top: 8,
    left: 10,
  },
  settingsImage: {
    width: boxWidth / 7.5,
    height: boxHeight / 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  settingsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
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
    color: '#fff',
  },
  hipCodeText: {
    fontSize: 16,
    color: '#fff',
  },
  hipCodeInput: {
    fontSize: 16,
    flex: 1,
    color: '#fff',
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
