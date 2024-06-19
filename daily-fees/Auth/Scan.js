import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, TextInput, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const ScanScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [name, setName] = useState('');
  const [studentClass, setStudentClass] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);

    // Example QR code format: ID: 20, Name: Frank Ampong, Class: Class 5
    const qrData = data.split(', ');
    const idData = qrData.find(item => item.startsWith('ID'));
    const nameData = qrData.find(item => item.startsWith('Name'));
    const classData = qrData.find(item => item.startsWith('Class'));

    if (idData && nameData && classData) {
      const nameValue = nameData.split(': ')[1];
      const classValue = classData.split(': ')[1];
      setName(nameValue);
      setStudentClass(classValue);
    } else {
      Alert.alert('Invalid QR Code', 'Could not parse QR code data.');
    }
  };

  const handleScanAgain = () => {
    setScanned(false);
    setScannedData('');
    setName('');
    setStudentClass('');
  };

  const handleSubmit = async () => {
    if (!name || !studentClass) {
      Alert.alert('Missing Information', 'Name and Class are required.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/add_fixed_debit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          class: studentClass,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add fee.');
      }

      const responseData = await response.json();
      console.log(responseData); // Log the response to debug
      Alert.alert('Success', responseData.message);
    } catch (error) {
      console.error(error); // Log any caught errors for debugging
      Alert.alert('Error', 'Failed to submit payment.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
            playSoundOnScan: true,
            playSoundOnAccept: false,
            torchMode: 'off',
          }}
        />
        <View style={styles.squareBorder} />
      </View>
      
      {scanned && (
        <View style={styles.scanResult}>
          <Text style={styles.scanText}>Scanned QR Code:</Text>
          <Text style={styles.scanData}>{scannedData}</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            editable={false} // Lock the input since it's from QR
          />
          <TextInput
            style={styles.input}
            placeholder="Class"
            value={studentClass}
            onChangeText={setStudentClass}
            editable={false} // Lock the input since it's from QR
          />
        </View>
      )}
      
      <View style={styles.buttonContainer}>
        <Button
          title="Scan Again"
          onPress={handleScanAgain}
          disabled={!scanned}
          style={styles.button}
        />
        <Button
          title="Submit"
          onPress={handleSubmit}
          disabled={!scanned || !name || !studentClass}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const { height } = Dimensions.get('window');
const squareSize = height / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scanResult: {
    alignItems: 'center',
    padding: 20,
  },
  cameraContainer: {
    width: squareSize,
    height: squareSize,
    overflow: 'hidden',
    borderRadius: 10,
    marginBottom: 20,
  },
  squareBorder: {
    flex: 1,
    borderColor: '#fff',
    borderWidth: 2,
  },
  scanText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  scanData: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 20,
  },
  button: {
    width: '40%',
  },
});

export default ScanScreen;
