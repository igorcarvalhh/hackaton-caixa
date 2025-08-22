import axios from 'axios';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FormInput from '../components/FormInput';

export default function App() {
  const [formData, setFormData] = useState({
    nome: '',
    taxa: '',
    prazo: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' }); // limpa erro ao digitar
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.taxa.trim() || isNaN(formData.taxa)) newErrors.taxa = 'Taxa inválida';
    if (!formData.prazo.trim() || isNaN(formData.prazo)) newErrors.prazo = 'Prazo inválido';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    // const uniqueId = uuidv4();
    // setFormData({ ...formData, ["id"]: uniqueId });

    try {
      const response = await axios.post('https://68a857bebb882f2aa6de443c.mockapi.io/produtos', formData);
      Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
      console.log(response.data);

      // resetar formulário
      setFormData({ nome: '', taxa: '', prazo: '' });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o produto.');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.head}>Produto de Empréstimo</Text>
          <Text style={styles.subtitle}>Cadastrar novo</Text>

          <View style={styles.form}>
            <FormInput
              label="Nome do produto"
              placeholder="Ex: Empréstimo Consignado INSS"
              value={formData.nome}
              onChangeText={(text) => handleChange('nome', text)}
              error={errors.nome}
            />
            <FormInput
              label="Taxa de juros anual"
              placeholder="Ex: 12.5"
              value={formData.taxa}
              onChangeText={(text) => handleChange('taxa', text)}
              error={errors.taxa}
              info="(%)"
              keyboardType="numeric"
            />
            <FormInput
              label="Prazo máximo"
              placeholder="Ex: 60"
              value={formData.prazo}
              onChangeText={(text) => handleChange('prazo', text)}
              error={errors.prazo}
              info="(em meses)"
              keyboardType="numeric"
            />
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
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  content: {
    paddingBottom: 16,
  },
  head: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'CAIXAStd-SemiBold',
    color: '#22292E',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 24,
    fontFamily: 'CAIXAStd-Regular',
  },
  form: {
    gap: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#D87B00',
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'CAIXAStd-SemiBold',
  },
});