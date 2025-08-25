import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const FormInput = ({ label, placeholder, info, value, onChangeText, error, keyboardType = 'default' }) => (
  <View style={styles.container}>
    <View style={styles.labelLine}>
      <Text style={styles.label}>{label}</Text>
      {info && <Text style={styles.info}>{info}</Text>}
    </View>

    <TextInput
      style={[styles.input, error && styles.inputError]}
      placeholder={placeholder}
      placeholderTextColor="#64747A"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />

    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  labelLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontWeight: '600',
    lineHeight: 21,
    fontFamily: 'CAIXAStd-SemiBold',
  },
  info: {
    fontWeight: '400',
    color: '#64747A',
    lineHeight: 21,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#9EB2B8',
    backgroundColor: '#fff',
    padding: 8,
    fontFamily: 'CAIXAStd-Regular',
  },
  inputError: {
    borderColor: '#D30000',
  },
  errorText: {
    color: '#D30000',
    fontSize: 12,
    fontFamily: 'CAIXAStd-Regular',
  },
});

export default FormInput;