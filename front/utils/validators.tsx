export const required = (message = "Campo obrigatório") => (value) => {
  if (!value || !value.trim()) return { error: message };
  return { value };
};

export const isNumber = (message = "Deve ser um número") => (value) => {
  if (isNaN(value)) return { error: message };
  return { value };
};

export const onlyDigits = (message = "Apenas números são permitidos") => (value) => {
  const cleaned = value.replace(/\D/g, "");
  if (!cleaned) return { error: message };
  return { value: cleaned };
};

export const percentage = (message = "Taxa inválida") => (value) => {
  if (!value) return { value: "" }; // permite limpar o campo

  const cleaned = value.replace(/[^0-9]/g, "");
  if (!cleaned) return { error: message, value };

  const num = parseFloat(cleaned) / 100;
  return { value: `${num.toFixed(2)}%` };
};

// Para digitação: só números, sem forçar "%"
export const percentageInput = () => (value) => {
    if (!value) return { value: "" }; // permite limpar

  // mantém apenas números
  const cleaned = value.replace(/[^0-9]/g, "");

  if (!cleaned) return { value: "" };

  // transforma em número e ajusta vírgula
  let number = parseInt(cleaned, 10);

  // move a vírgula para a esquerda (último dígito = casas decimais)
  let formatted = (number / 100).toFixed(2);

  return { value: formatted };
};

// Para validação final (no submit ou blur)
export const percentageFinal = (message = "Taxa inválida") => (value) => {
  if (!value) return { error: message, value: "" };
  const num = parseFloat(value) / 100;
  return { value: `${num.toFixed(2)}%` };
};