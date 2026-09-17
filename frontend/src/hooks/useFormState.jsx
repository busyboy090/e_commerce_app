import { useState, useEffect, useCallback } from 'react';

export function useFormState(initialValues, validateFn) {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState(() => {
    const initial = {};
    Object.keys(initialValues).forEach(key => { initial[key] = false; });
    return initial;
  });
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = validateFn(formData);
    setErrors(newErrors);
    return Object.values(newErrors).every(value => value === true);
  }, [formData, validateFn]);

  return { formData, errors, loading, setLoading, handleChange, validateForm };
}
