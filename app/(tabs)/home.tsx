import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index () {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
        {/* Conta */}
        <View style={styles.accountInfo}>
          <Text style={styles.accountType}>Conta Corrente PF</Text>
          <Text style={styles.accountDetails}>Ag. XXXX  CC. XXXXXXXXX-X</Text>
        </View>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Header */}
        


        {/* Card Azul */}
        <View style={styles.card}>
          <Text style={styles.welcome}>Olá, Igor</Text>
          <Text style={styles.clientTag}>Cliente CAIXA</Text>

          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Saldo disponível</Text>
            <Text style={styles.balanceValue}>R$••••</Text>
          </View>
        </View>

        {/* Ações principais */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/new-product")}>
            <MaterialCommunityIcons name="plus-box-outline" size={28} color="#004aad" />
            <Text style={styles.actionText}>Cadastrar{"\n"}Produto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/simulation")}>
            <MaterialCommunityIcons size={28} name="hand-coin-outline" color="#004aad" />
            <Text style={styles.actionText}>Simular{"\n"}Empréstimo</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/(tabs)/simulation")}>
            <MaterialCommunityIcons size={28} name="calculator" color="#004aad" />
            <Text style={styles.actionText}>Fazer{"\n"}simulação</Text>
          </TouchableOpacity> */}
        </View>

        {/* Serviços */}
        {/* <View style={styles.servicesHeader}>
          <Text style={styles.servicesTitle}>Serviços</Text>
          <Text style={styles.servicesLink}>Mostrar todos &gt;</Text>
        </View>

        <View style={styles.servicesRow}>
          <TouchableOpacity style={styles.serviceCard}>
            <Ionicons name="wallet-outline" size={28} color="#004aad" />
            <Text style={styles.serviceText}>Minha conta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.serviceCard}>
            <Ionicons name="stats-chart-outline" size={28} color="#004aad" />
            <Text style={styles.serviceText}>Investimentos</Text>
          </TouchableOpacity>
        </View> */}

      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fbff" },
  scroll: { paddingBottom: 100 },

  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#005aa6",
  },
  time: { color: "#fff", fontSize: 16, marginRight: 5 },

  accountInfo: { padding: 16, backgroundColor: "#005aa6" },
  accountType: { color: "#fff", fontSize: 14, fontWeight: "600" },
  accountDetails: { color: "#fff", fontSize: 13 },

  card: {
    backgroundColor: "#0077cc",
    margin: 16,
    borderRadius: 12,
    padding: 20,
  },
  welcome: { color: "#fff", fontSize: 20, fontWeight: "700" },
  clientTag: { backgroundColor: "#fff", color: "#005aa6", padding: 4, borderRadius: 6, marginTop: 6, alignSelf: "flex-start" },
  balanceContainer: { marginTop: 20 },
  balanceLabel: { color: "#fff", fontSize: 14 },
  balanceValue: { color: "#fff", fontSize: 22, fontWeight: "bold" },

  actionsRow: { flexDirection: "row", justifyContent: "space-around", marginVertical: 20, gap: 8, marginHorizontal: 16},
  actionButton: { alignItems: "center", backgroundColor: "#fff", borderRadius: 10, paddingVertical: 12, flex: 1},
  actionText: { textAlign: "center", marginTop: 6, color: "#005aa6", fontWeight: "500" },

  servicesHeader: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: 16, marginBottom: 10 },
  servicesTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  servicesLink: { color: "#005aa6", fontWeight: "600" },

  servicesRow: { flexDirection: "row", justifyContent: "space-around", marginHorizontal: 16 },
  serviceCard: {
    backgroundColor: "#fff",
    flex: 1,
    margin: 6,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  serviceText: { marginTop: 6, fontSize: 14, color: "#005aa6", fontWeight: "500" },

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#005aa6",
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    width: 100,
  },
  navItem: { alignItems: "center" },
  navText: { color: "#fff", fontSize: 12, marginTop: 2 },
});