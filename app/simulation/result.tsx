import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { api } from '../../services/api'; // axios configurado

type Props = {
  route?: {
    params: {
      nome: string;
      valor: number;
      prazo: number;
      taxa: number;
    };
  };
};


const calculateSimulation = (valor: number, prazo: number, taxaAnual: number) => {
  taxaAnual = taxaAnual / 100;
  const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;
  const pmt = valor * (taxaMensal / (1 - Math.pow(1 + taxaMensal, -prazo)));
  const total = pmt * prazo;

  let saldo = valor;
  const memoria: {
    mes: number;
    juros: number;
    amortizacao: number;
    saldo: number;
  }[] = [];

  for (let mes = 1; mes <= prazo; mes++) {
    const juros = saldo * taxaMensal;
    const amortizacao = pmt - juros;
    saldo -= amortizacao;
    memoria.push({
      mes,
      juros,
      amortizacao,
      saldo: saldo > 0 ? saldo : 0,
    });
  }

  return {
    taxaMensal: taxaMensal * 100,
    pmt,
    total,
    memoria,
  };
};

export default function SimulationResultScreen({ route }: Props) {
  const nome = route?.params?.nome || 'Empréstimo Pessoal';
  const valor = route?.params?.valor || 10000;
  const prazo = route?.params?.prazo || 12;
  const taxa = route?.params?.taxa || 11.78;

  const [result, setResult] = useState<{
    taxaMensal: number;
    pmt: number;
    total: number;
    memoria: { mes: number; juros: number; amortizacao: number; saldo: number }[];
  } | null>(null);

  useEffect(() => {
    const fetchSimulation = async () => {
      try {
        // 🔹 Tenta chamar a API primeiro
        const response = await api.post('/simulacao', {
          valor,
          prazo,
          taxaAnual: taxa,
        });

        // 🔹 Espera que a API retorne no mesmo formato do cálculo local
        setResult(response.data);
      } catch (error) {
        console.warn('API falhou, calculando localmente...', error);
        Alert.alert('Aviso', 'Não foi possível conectar à API, cálculo realizado localmente.');
        setResult(calculateSimulation(valor, prazo, taxa));
      }
    };

    fetchSimulation();
  }, [valor, prazo, taxa]);

  if (!result) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ textAlign: 'center', marginTop: 40 }}>Carregando simulação...</Text>
      </SafeAreaView>
    );
  }

  const { taxaMensal, pmt, total, memoria } = result;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Resultado da Simulação</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Produto:</Text>
          <Text style={styles.value}>{nome}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Valor solicitado:</Text>
          <Text style={styles.value}>R$ {valor.toFixed(2)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Prazo:</Text>
          <Text style={styles.value}>{prazo} meses</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Taxa efetiva mensal:</Text>
          <Text style={styles.value}>{taxaMensal.toFixed(2)}%</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Parcela mensal:</Text>
          <Text style={styles.value}>R$ {pmt.toFixed(2)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Valor total com juros:</Text>
          <Text style={styles.value}>R$ {total.toFixed(2)}</Text>
        </View>

        <Text style={[styles.title, { marginTop: 24 }]}>Memória de Cálculo</Text>
        {memoria.map((item) => (
          <View key={item.mes} style={styles.memoryRow}>
            <Text style={styles.memoryText}>
              Mês {item.mes}: Juros R$ {item.juros.toFixed(2)} | Amortização R$ {item.amortizacao.toFixed(2)} | Saldo: R$ {item.saldo.toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'CAIXAStd-SemiBold',
    color: '#22292E',
    marginBottom: 16,
  },
  section: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#64747A',
    fontFamily: 'CAIXAStd-Regular',
  },
  value: {
    fontSize: 16,
    fontFamily: 'CAIXAStd-SemiBold',
    color: '#22292E',
  },
  memoryRow: {
    marginBottom: 8,
  },
  memoryText: {
    fontSize: 14,
    fontFamily: 'CAIXAStd-Regular',
    color: '#404B52',
  },
}); 