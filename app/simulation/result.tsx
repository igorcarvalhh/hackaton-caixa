import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { api } from "../../services/api";

// ===== Tipagens =====
type MemoriaCalculoItem = {
  mes: number;
  juros: number;
  amortizacao: number;
  saldo: number;
};

type SimulacaoResult = {
  memoria_de_calculo: MemoriaCalculoItem[];
  parcela_mensal: number;
  prazo: number;
  produto: {
    id: number;
    nome: string;
    prazo: string;
    taxa: string;
  };
  taxa_efetiva_mensal: number;
  valor_solicitado: number;
  valor_total_com_juros: number;
};

// ===== Utils =====
const LANG = "pt-BR";
const CURRENCY = "BRL";

const formatCurrency = (value: number) =>
  value.toLocaleString(LANG, { style: "currency", currency: CURRENCY });

const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

// ===== Components =====
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.section}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const Feedback = ({ message }: { message: string }) => (
  <SafeAreaView style={styles.centered}>
    <Text>{message}</Text>
  </SafeAreaView>
);

const Table = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | number)[][];
}) => (
  <View style={styles.table}>
    <View style={[styles.tableRow, styles.tableHeader]}>
      {headers.map((header, i) => (
        <Text key={i} style={[styles.tableCell, styles.tableHeaderText, { flex: i === 0 ? 1 : 2 }]}>
          {header}
        </Text>
      ))}
    </View>
    {rows.map((row, i) => (
      <View key={i} style={styles.tableRow}>
        {row.map((cell, j) => (
          <Text
            key={j}
            style={[styles.tableCell, { flex: j === 0 ? 1 : 2 }]}
          >
            {cell}
          </Text>
        ))}
      </View>
    ))}
  </View>
);

// ===== Main Screen =====
export default function SimulationResultScreen() {
  const { id, valor, prazo } =
    useLocalSearchParams<{ id?: string; valor?: string; prazo?: string }>();
  const produtoId = Number(id);
  const valorSolicitado = Number(valor);
  const prazoMeses = Number(prazo);

  const [result, setResult] = useState<SimulacaoResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimulation = async () => {
      try {
        const response = await api.post<SimulacaoResult>("/simulacao", {
          produto_id: produtoId,
          valor: valorSolicitado,
          meses: prazoMeses,
        });
        setResult(response.data);
      } catch (error) {
        console.warn("Falha na API, cálculo local não implementado ainda.", error);
        Alert.alert("Erro", "Não foi possível obter o resultado da simulação.");
      } finally {
        setLoading(false);
      }
    };

    fetchSimulation();
  }, [produtoId, valorSolicitado, prazoMeses]);

  if (loading) return <Feedback message="Carregando simulação..." />;
  if (!result) return <Feedback message="Não foi possível exibir o resultado." />;

  const {
    produto,
    valor_total_com_juros,
    parcela_mensal,
    taxa_efetiva_mensal,
    memoria_de_calculo,
  } = result;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.accountInfo}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.accountImage}
        />
        <View style={styles.accountText}>
          <Text style={styles.accountType}>Conta Corrente PF</Text>
          <Text style={styles.accountDetails}>Ag. 1234  CC. 123456789-0</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Resultado da Simulação</Text>
        <Text style={styles.subtitle}>Confira o resultado</Text>

        {[
          { label: "Produto", value: produto.nome },
          { label: "Valor solicitado", value: formatCurrency(valorSolicitado) },
          { label: "Prazo", value: `${prazoMeses} meses` },
          { label: "Taxa efetiva mensal", value: formatPercentage(taxa_efetiva_mensal) },
          { label: "Parcela mensal", value: formatCurrency(parcela_mensal) },
          { label: "Valor total com juros", value: formatCurrency(valor_total_com_juros) },
        ].map((item, i) => (
          <InfoRow key={i} label={item.label} value={item.value} />
        ))}

        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>
          Memória de Cálculo
        </Text>

        <Table
          headers={["Mês", "Juros", "Amortização", "Saldo"]}
          rows={memoria_de_calculo.map(({ mes, juros, amortizacao, saldo }) => [
            mes,
            formatCurrency(juros),
            formatCurrency(amortizacao),
            formatCurrency(saldo),
          ])}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

// ===== Styles =====
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 24, paddingBottom: 32 },
  title: { fontSize: 20, fontFamily: "CAIXAStd-SemiBold", color: "#22292E" },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "CAIXAStd-Regular",
    fontWeight: "600",
    color: "#22292E",
  },
  subtitle: { fontSize: 14, marginBottom: 24, fontFamily: "CAIXAStd-Regular" },
  section: { marginBottom: 12 },
  label: { fontSize: 14, color: "#64747A", fontFamily: "CAIXAStd-Regular" },
  value: { fontSize: 16, fontFamily: "CAIXAStd-SemiBold", color: "#22292E" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  accountInfo: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#005aa6",
    flexDirection: "row",
    alignItems: "center",
  },
  accountImage: { width: 32, height: 32, marginRight: 12, resizeMode: "contain" },
  accountText: { flex: 1 },
  accountType: { color: "#fff", fontSize: 14, fontFamily: "CAIXAStd-Regular" },
  accountDetails: { color: "#fff", fontSize: 13, fontFamily: "CAIXAStd-Regular" },
  table: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    overflow: "hidden",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tableHeader: { backgroundColor: "#f3f4f6" },
  tableCell: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    fontSize: 13,
    fontFamily: "CAIXAStd-Regular",
    color: "#404B52",
  },
  tableHeaderText: {
    fontFamily: "CAIXAStd-SemiBold",
    color: "#22292E",
  },
});