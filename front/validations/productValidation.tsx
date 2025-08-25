export const validateProduct = (values) => {
  const errors = {};
  if (!values.nome.trim()) errors.nome = "Nome é obrigatório";
  if (!values.taxa.trim() || isNaN(values.taxa)) errors.taxa = "Taxa inválida";
  if (!values.prazo.trim() || isNaN(values.prazo)) errors.prazo = "Prazo inválido";
  return errors;
};