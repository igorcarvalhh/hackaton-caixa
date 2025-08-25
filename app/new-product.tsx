import React from "react";
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FormInput from "../components/FormInput";
import { productFormFields } from "../config/productFormConfig";
import useForm from "../hooks/useForm";
import { api } from '../services/api';

export default function App() {
  const initialValues = Object.keys(productFormFields).reduce((acc, key) => ({ ...acc, [key]: "" }), {});
  const { formData, errors, handleChange, validateAll, reset } = useForm(initialValues, productFormFields);

  const handleSubmit = async () => {
    if (!validateAll()) return;

    try {
      const response = await api.post("/produtos", formData);
      Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
      console.log(response.data);
      reset();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar o produto.");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.accountInfo}>
        <Image
          source={require('../assets/images/logo.png')} // caminho da sua imagem PNG
          style={styles.accountImage}
        />
        <View style={styles.accountText}>
          <Text style={styles.accountType}>Conta Corrente PF</Text>
          <Text style={styles.accountDetails}>Ag. 1234  CC. 123456789-0</Text>
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.head}>Produto de Empréstimo</Text>
          <Text style={styles.subtitle}>Cadastrar novo</Text>

          <View style={styles.form}>
            {Object.keys(productFormFields).map((field) => {
              const config = productFormFields[field];
              return (
                <FormInput
                  key={field}
                  label={config.label}
                  placeholder={config.placeholder}
                  value={formData[field]}
                  onChangeText={(text) => handleChange(field, text)}
                  error={errors[field]}
                  info={config.info}
                  keyboardType={config.keyboardType}
                />
              );
            })}
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, justifyContent: "space-between", paddingHorizontal: 24, paddingVertical: 16 },
  content: { paddingBottom: 16 },
  head: { fontSize: 20, fontWeight: "600", fontFamily: "CAIXAStd-SemiBold", color: "#22292E" },
  subtitle: { fontSize: 14, marginBottom: 24, fontFamily: "CAIXAStd-Regular" },
  form: { gap: 16, marginBottom: 24 },
  button: { backgroundColor: "#D87B00", borderRadius: 4, paddingVertical: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16, fontFamily: "CAIXAStd-SemiBold" },

  accountInfo: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#005aa6",
    flexDirection: 'row',
    alignItems: 'center' // alinha verticalmente a imagem e o texto
  },
  accountImage: {
    width: 32,
    height: 32,
    marginRight: 12, // espaço entre a imagem e o texto
    resizeMode: 'contain',
  },
  accountText: {
    flex: 1, // ocupa o restante do espaço disponível
  },
  accountType: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "CAIXAStd-Regular"
  },
  accountDetails: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "CAIXAStd-Regular"
  },
});