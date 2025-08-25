import { required, onlyDigits, percentageInput, percentageFinal } from "../utils/validators";

export const productFormFields = {
  nome: {
    label: "Nome do produto",
    placeholder: "Ex: Empréstimo Consignado INSS",
    finalValidator: required(),
  },
  taxa: {
    label: "Taxa de juros anual",
    placeholder: "Ex: 12.5",
    info: "(%)",
    keyboardType: "numeric",
    inputValidator: percentageInput(),
    finalValidator: required(),
  },
  prazo: {
    label: "Prazo máximo",
    placeholder: "Ex: 60",
    info: "(em meses)",
    keyboardType: "numeric",
    inputValidator: onlyDigits(),
    finalValidator: required(),
  },
};