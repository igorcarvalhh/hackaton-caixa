import { render, screen } from "@testing-library/react-native";
import React from "react";
import SimulationResultScreen from "../app/simulation/result";

jest.mock("expo-router", () => ({
  useLocalSearchParams: () => ({ id: "1", valor: "1000", prazo: "12" }),
}));

jest.mock("../services/api", () => ({
  api: { post: jest.fn().mockResolvedValue({ data: mockResult }) },
}));

const mockResult = {
  memoria_de_calculo: [
    { mes: 1, juros: 50, amortizacao: 80, saldo: 920 },
  ],
  parcela_mensal: 130,
  prazo: 12,
  produto: { id: 1, nome: "Empréstimo Pessoal", prazo: "12", taxa: "1%" },
  taxa_efetiva_mensal: 1.5,
  valor_solicitado: 1000,
  valor_total_com_juros: 1560,
};

describe("SimulationResultScreen", () => {
  it("renderiza título", async () => {
    render(<SimulationResultScreen />);
    expect(await screen.findByText("Resultado da Simulação")).toBeTruthy();
  });

  it("exibe informações principais", async () => {
    render(<SimulationResultScreen />);
    expect(await screen.findByText("Empréstimo Pessoal")).toBeTruthy();
    expect(await screen.findByText("R$ 1.000,00")).toBeTruthy();
  });

  it("renderiza tabela de memória de cálculo", async () => {
    render(<SimulationResultScreen />);
    expect(await screen.findByText("Mês")).toBeTruthy();
    expect(await screen.findByText("R$ 50,00")).toBeTruthy();
  });
});