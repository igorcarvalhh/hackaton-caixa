import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FormInput from '../../components/FormInput';
import { simulationFormFields } from "../../config/simulationFormConfig";
import useForm from "../../hooks/useForm";
import { api } from '../../services/api';

// ===== Hook personalizado para buscar produto =====
const useProduct = (id: string | undefined) => {
  const [product, setProduct] = useState<{ nome: string; prazo: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await api.get(`/produtos/${id}`);
        setProduct(response.data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar o produto.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading };
};

// ===== Componente principal =====
export default function SimulationScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const initialValues = Object.keys(simulationFormFields).reduce((acc, key) => ({ ...acc, [key]: "" }), {});
  const { formData, errors, handleChange, validateAll } = useForm(initialValues, simulationFormFields);

  const { product, loading } = useProduct(id);
  // handleChange("name", product)

  const handleSimulate = () => {
    if (!validateAll()) return;

    const valor = Number(formData.valor);
    const prazo = Number(formData.prazo);

    if (product && formData.prazo > product.prazo) {
      Alert.alert('Atenção', `O prazo máximo permitido é ${product.prazo} meses.`);
      return;
    }

    router.push({
      pathname: '/simulation/result',
      params: { id, valor: valor.toString(), prazo: prazo.toString() },
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#D87B00" />
      </SafeAreaView>
    );
  }

  // Campos a serem renderizados dinamicamente
  const fields = [
    {
      key: 'produto',
      label: simulationFormFields.produto.label,
      placeholder: simulationFormFields.produto.placeholder,
      value: product?.nome ?? '',
      editable: false,
      info: simulationFormFields.produto.info,
      keyboardType: simulationFormFields.produto.keyboardType,
    },
    {
      key: 'valor',
      label: simulationFormFields.valor.label,
      placeholder: simulationFormFields.valor.placeholder,
      value: formData.valor,
      error: errors.valor,
      onChangeText: (text: string) => handleChange('valor', text),
      info: simulationFormFields.valor.info,
      keyboardType: simulationFormFields.valor.keyboardType,
    },
    {
      key: 'prazo',
      label: simulationFormFields.prazo.label,
      placeholder: simulationFormFields.prazo.placeholder,
      value: formData.prazo,
      error: errors.prazo,
      onChangeText: (text: string) => handleChange('prazo', text),
      info: `Máximo: ${product?.prazo ?? '-'} meses`,
      keyboardType: simulationFormFields.prazo.keyboardType,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.accountInfo}>
        <Image
          source={require('../../assets/images/logo.png')} // caminho da sua imagem PNG
          style={styles.accountImage}
        />
        <View style={styles.accountText}>
          <Text style={styles.accountType}>Conta Corrente PF</Text>
          <Text style={styles.accountDetails}>Ag. 1234  CC. 123456789-0</Text>
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.head}>Simulador de Empréstimo</Text>
          <Text style={styles.subtitle}>Dados iniciais</Text>

          <View style={styles.form}>
            {fields.map(field => (
              <FormInput
                key={field.key}
                label={field.label}
                placeholder={field.placeholder}
                value={field.value}
                onChangeText={field.onChangeText}
                error={field.error}
                info={field.info}
                keyboardType={field.keyboardType}
                editable={field.editable}
              />
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={handleSimulate}>
          <Text style={styles.buttonText}>Simular</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ===== Styles =====
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, justifyContent: 'space-between', paddingHorizontal: 24, paddingVertical: 16 },
  content: { paddingBottom: 16 },
  head: { fontSize: 20, fontWeight: '600', fontFamily: 'CAIXAStd-SemiBold', color: '#22292E' },
  subtitle: { fontSize: 14, marginBottom: 24, fontFamily: 'CAIXAStd-Regular' },
  form: { gap: 16, marginBottom: 24 },
  button: { backgroundColor: '#D87B00', borderRadius: 4, paddingVertical: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16, fontFamily: 'CAIXAStd-SemiBold' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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