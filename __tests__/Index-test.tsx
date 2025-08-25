import { fireEvent, render, screen } from "@testing-library/react-native";
import React from "react";
import Index from "../app/home";

// Mock do expo-router
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("Index screen", () => {
  it("renderiza informações da conta", () => {
    render(<Index />);
    expect(screen.getByText("Conta Corrente PF")).toBeTruthy();
    expect(screen.getByText("Ag. 1234  CC. 123456789-0")).toBeTruthy();
  });

  it("renderiza cartão azul com saldo", () => {
    render(<Index />);
    expect(screen.getByText("Olá, Lucas")).toBeTruthy();
    expect(screen.getByText("Cliente CAIXA")).toBeTruthy();
    expect(screen.getByText("Saldo disponível")).toBeTruthy();
    expect(screen.getByText("R$••••")).toBeTruthy();
  });

  it("renderiza os botões de ação", () => {
    render(<Index />);
    expect(screen.getByText("Cadastrar Produto")).toBeTruthy();
    expect(screen.getByText("Simular Empréstimo")).toBeTruthy();
  });

  it("aciona navegação ao clicar nos botões", () => {
    const pushMock = jest.fn();
    jest.spyOn(require("expo-router"), "useRouter").mockReturnValue({ push: pushMock });

    render(<Index />);

    fireEvent.press(screen.getByText("Cadastrar Produto"));
    expect(pushMock).toHaveBeenCalledWith("/new-product");

    fireEvent.press(screen.getByText("Simular Empréstimo"));
    expect(pushMock).toHaveBeenCalledWith("/simulation");
  });
});