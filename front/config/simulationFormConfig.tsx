import { onlyDigits, percentageInput, required } from "../utils/validators";

export const simulationFormFields = {
  produto: {
    label: "Produto",
    placeholder: "Nome do produto",
  },
  valor: {
    label: "Valor",
    placeholder: "Informar valor do empréstimo",
    info: "(R$)",
    keyboardType: "numeric",
    inputValidator: percentageInput(),
    finalValidator: required(),
  },
  prazo: {
    label: "Prazo",
    placeholder: "Informar número de meses",
    info: "(em meses)",
    keyboardType: "numeric",
    inputValidator: onlyDigits(),
    finalValidator: required(),
  },
};