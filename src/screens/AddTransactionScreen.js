import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSetRecoilState } from 'recoil';
import { transactionsState } from '../state/transactionState';
import { addTransaction } from '../database/db';

const AddTransactionScreen = ({ navigation }) => {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const setTransactions = useSetRecoilState(transactionsState);

  const handleTypeChange = (newType) => {
    setType(newType);
    setAmount('');
  };

  const handleAmountChange = (text) => {
    // Only allow numbers and one decimal point
    const numericValue = text.replace(/[^0-9.]/g, '');
    // Prevent multiple decimal points
    const parts = numericValue.split('.');
    if (parts.length > 2) return;
    setAmount(numericValue);
  };

  const handleSubmit = async () => {
    // Validate amount
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    // Validate description
    if (!description.trim()) {
      Alert.alert('Error', 'Description is required');
      return;
    }

    setIsLoading(true);
    try {
      const newTransaction = await addTransaction(
        type,
        parseFloat(amount),
        description.trim()
      );
      
      setTransactions((currentTransactions) => [
        newTransaction,
        ...currentTransactions,
      ]);

      // Reset form
      setAmount('');
      setDescription('');
      setType('expense');
      
      Alert.alert('Success', 'Transaction added successfully');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error adding transaction:', error);
      Alert.alert('Error', 'Failed to add transaction');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'expense' && styles.selectedTypeButton,
            ]}
            onPress={() => handleTypeChange('expense')}>
            <Text
              style={[
                styles.typeButtonText,
                type === 'expense' && styles.selectedTypeButtonText,
              ]}>
              Cash Out
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === 'income' && styles.selectedTypeButton,
            ]}
            onPress={() => handleTypeChange('income')}>
            <Text
              style={[
                styles.typeButtonText,
                type === 'income' && styles.selectedTypeButtonText,
              ]}>
              Cash In
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="decimal-pad"
            placeholderTextColor="#666"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
            multiline
            placeholderTextColor="#666"
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Add Transaction</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 20,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  typeButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedTypeButton: {
    backgroundColor: '#2196F3',
  },
  typeButtonText: {
    color: '#2196F3',
    fontWeight: '600',
  },
  selectedTypeButtonText: {
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddTransactionScreen;
