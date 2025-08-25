import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import React from "react";
import { Alert } from "react-native";
import App from "../app/new-product"; // ajuste o caminho conforme sua estrutura
import { api } from "../services/api";

// mock do Alert
jest.spyOn(Alert, "alert");

// mock do api
jest.mock("../services/api", () => ({
  api: {
    post: jest.fn(),
  },
}));

// mock do config para gerar campos fake
jest.mock("../config/productFormConfig", () => ({
  productFormFields: {
    nome: { label: "Nome", placeholder: "Digite o nome", keyboardType: "default" },
    taxa: { label: "Taxa", placeholder: "Digite a taxa", keyboardType: "numeric" },
  },
}));

describe("Tela de cadastro de produto", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza título e campos do formulário", () => {
    render(<App />);
    expect(screen.getByText("Produto de Empréstimo")).toBeTruthy();
    expect(screen.getByText("Cadastrar novo")).toBeTruthy();
    expect(screen.getByPlaceholderText("Digite o nome")).toBeTruthy();
    expect(screen.getByPlaceholderText("Digite a taxa")).toBeTruthy();
  });

  it("não envia se os campos forem inválidos", async () => {
    render(<App />);
    fireEvent.press(screen.getByText("Cadastrar"));
    await waitFor(() => {
      expect(api.post).not.toHaveBeenCalled();
    });
  });

  it("envia com sucesso e mostra alerta", async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({ data: { id: 1 } });

    render(<App />);
    fireEvent.changeText(screen.getByPlaceholderText("Digite o nome"), "Empréstimo Pessoal");
    fireEvent.changeText(screen.getByPlaceholderText("Digite a taxa"), "2.5");

    fireEvent.press(screen.getByText("Cadastrar"));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/produtos", {
        nome: "Empréstimo Pessoal",
        taxa: "2.5",
      });
      expect(Alert.alert).toHaveBeenCalledWith("Sucesso", "Produto cadastrado com sucesso!");
    });
  });

  it("mostra alerta de erro quando a API falha", async () => {
    (api.post as jest.Mock).mockRejectedValueOnce(new Error("Erro API"));

    render(<App />);
    fireEvent.changeText(screen.getByPlaceholderText("Digite o nome"), "Empréstimo Consignado");
    fireEvent.changeText(screen.getByPlaceholderText("Digite a taxa"), "3.1");

    fireEvent.press(screen.getByText("Cadastrar"));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith("Erro", "Não foi possível cadastrar o produto.");
    });
  });
});