import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OptionsScreen = () => {
  const navigation = useNavigation();

  const handleCreditFeeding = () => {
    // Handle credit feeding action
     navigation.navigate('Credit');
  };

  const handleDebitFeeding = () => {
    // Navigate to ScanScreen
    navigation.navigate('Scan');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, styles.creditButton]} onPress={handleCreditFeeding}>
        <Text style={styles.buttonText}>Credit Feeding</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.debitButton]} onPress={handleDebitFeeding}>
        <Text style={styles.buttonText}>Debit Feeding</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Arrange buttons side by side
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    width: 150,
    height: 150,
    margin: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  creditButton: {
    backgroundColor: '#4CAF50', // Green color for credit feeding
  },
  debitButton: {
    backgroundColor: '#F44336', // Red color for debit feeding
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default OptionsScreen;
