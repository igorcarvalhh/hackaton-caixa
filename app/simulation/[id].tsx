import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FormInput from '../../components/FormInput';
import { api } from '../../services/api';

export default function SimulationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [productName, setProductName] = useState('');
  const [loanValue, setLoanValue] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [maxValue, setMaxValue] = useState<number | null>(null);
  const [maxTerm, setMaxTerm] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/produtos/${id}`);
        const produto = response.data;

        setProductName(produto.nome);
        setMaxTerm(produto.prazo);  // precisa vir do backend
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar o produto.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleSimulate = () => {
    const value = parseFloat(loanValue);
    const term = parseInt(loanTerm, 10);

    if (isNaN(value) || isNaN(term)) {
      Alert.alert('Atenção', 'Informe valor e prazo válidos.');
      return;
    }

    if (maxTerm !== null && term > maxTerm) {
      Alert.alert('Atenção', `O prazo máximo permitido é ${maxTerm} meses.`);
      return;
    }

    router.push({
      pathname: '/simulation/result',
      params: { id, valor: value.toString(), prazo: term.toString() },
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#D87B00" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.head}>Simulador de Empréstimo</Text>
          <Text style={styles.subtitle}>Dados iniciais</Text>

          <View style={styles.form}>
            <FormInput
              label="Produto"
              value={productName}
              editable={false}
            />
            <FormInput
              label="Valor"
              placeholder="Informar valor do empréstimo"
              value={loanValue}
              onChangeText={setLoanValue}
              info={"(R$)"}
              keyboardType="numeric"
            />
            <FormInput
              label="Prazo"
              placeholder="Informar número de meses"
              value={loanTerm}
              onChangeText={setLoanTerm}
              info={`Máximo: ${maxTerm ?? '-'} meses`}
              keyboardType="numeric"
            />
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={handleSimulate}>
          <Text style={styles.buttonText}>Simular</Text>
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});