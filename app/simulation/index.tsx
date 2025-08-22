import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ProductCard } from '../../components/ProductCard';
import { api } from '../../services/api';

type Product = {
  id: string;
  nome: string;
  taxa: string;
  prazo: string;
};

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<Product[]>('/produtos');
        setProducts(response.data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível buscar os produtos.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#D87B00" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.conatiner}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>
            Escolha um dos produtos para simular os valores do empréstimo
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.list}>
          {products.map((p) => (
            <ProductCard
              key={p.id}
              title={p.nome}
              subtitle={`${p.taxa}% a.a em até ${p.prazo} meses`}
              onPress={() => router.push(`/simulation/${p.id}`)}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  conatiner: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  headerContainer: {
    marginBottom: 24,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'CAIXAStd-SemiBold',
    color: '#22292E',
  },
  list: {
    paddingBottom: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});