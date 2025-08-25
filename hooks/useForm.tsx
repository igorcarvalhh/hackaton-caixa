import { useState } from "react";

export default function useForm(initialValues, fieldsConfig) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    const inputValidator = fieldsConfig[field]?.inputValidator;
    let finalValue = value;
    let error = "";

    if (inputValidator) {
      const result = inputValidator(value);
      if (result.error) error = result.error;
      if (result.value !== undefined) finalValue = result.value;
    }

    setFormData({ ...formData, [field]: finalValue });
    setErrors({ ...errors, [field]: error });
  };

  const validateAll = () => {
    const newErrors = {};
    const newValues = { ...formData };

    Object.keys(fieldsConfig).forEach((field) => {
      const finalValidator = fieldsConfig[field]?.finalValidator;
      let value = formData[field];

      if (finalValidator) {
        const result = finalValidator(value);
        if (result.error) {
          newErrors[field] = result.error;
        }
        if (result.value !== undefined) {
          newValues[field] = result.value;
        }
      }
    });

    setFormData(newValues);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => setFormData(initialValues);

  return { formData, errors, handleChange, validateAll, reset };
}