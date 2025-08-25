import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
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

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* Card Azul */}
        <View style={styles.card}>
          <Text style={styles.welcome}>Olá, Lucas</Text>
          <Text style={styles.clientTag}>Cliente CAIXA</Text>

          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Saldo disponível</Text>
            <Text style={styles.balanceValue}>R$••••</Text>
          </View>
        </View>

        {/* Ações principais */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/new-product")}>
            <MaterialCommunityIcons name={"plus-box-outline"} size={28} color="#004aad" />
            <Text style={styles.actionText}>{"Cadastrar Produto"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push("/simulation")}>
            <MaterialCommunityIcons name={"hand-coin-outline"} size={28} color="#004aad" />
            <Text style={styles.actionText}>{"Simular Empréstimo"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fbff" },
  scroll: { paddingBottom: 100 },

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

  card: {
    backgroundColor: "#0077cc",
    margin: 16,
    borderRadius: 12,
    padding: 20,
  },
  welcome: { color: "#fff", fontSize: 20, fontFamily: "CAIXAStd-Regular" },
  clientTag: { backgroundColor: "#fff", color: "#005aa6", padding: 4, borderRadius: 6, marginTop: 6, alignSelf: "flex-start", fontFamily: "CAIXAStd-Regular" },
  balanceContainer: { marginTop: 20 },
  balanceLabel: { color: "#fff", fontSize: 14, fontFamily: "CAIXAStd-Regular" },
  balanceValue: { color: "#fff", fontSize: 22, fontFamily: "CAIXAStd-Regular" },

  actionsRow: { flexDirection: "row", justifyContent: "space-around", marginVertical: 20, gap: 8, marginHorizontal: 16 },
  actionButton: { alignItems: "center", backgroundColor: "#fff", borderRadius: 10, paddingVertical: 20, flex: 1 },
  actionText: { textAlign: "center", marginTop: 6, color: "#005aa6", fontFamily: "CAIXAStd-Regular" },
});