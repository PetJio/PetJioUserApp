// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone validation
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

// Password validation
export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

// Name validation
export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name);
};

// Required field validation
export const isRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

// Age validation for pets
export const isValidAge = (age: number): boolean => {
  return age >= 0 && age <= 30;
};

// Weight validation for pets
export const isValidWeight = (weight: number): boolean => {
  return weight > 0 && weight <= 200; // in kg
};

// Form validation helpers
export const validateForm = <T extends Record<string, any>>(
  values: T,
  rules: Record<keyof T, ((value: any) => string | null)[]>
): Record<keyof T, string> => {
  const errors = {} as Record<keyof T, string>;
  
  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field as keyof T];
    const value = values[field as keyof T];
    
    for (const rule of fieldRules) {
      const error = rule(value);
      if (error) {
        errors[field as keyof T] = error;
        break;
      }
    }
  });
  
  return errors;
};

// Common validation rules
export const validationRules = {
  required: (message = 'This field is required') => (value: any) =>
    !value || value.toString().trim() === '' ? message : null,
    
  email: (message = 'Please enter a valid email') => (value: string) =>
    value && !isValidEmail(value) ? message : null,
    
  phone: (message = 'Please enter a valid phone number') => (value: string) =>
    value && !isValidPhone(value) ? message : null,
    
  password: (message = 'Password must be at least 8 characters with uppercase, lowercase and number') => (value: string) =>
    value && !isValidPassword(value) ? message : null,
    
  minLength: (min: number, message?: string) => (value: string) =>
    value && value.length < min ? message || `Minimum ${min} characters required` : null,
    
  maxLength: (max: number, message?: string) => (value: string) =>
    value && value.length > max ? message || `Maximum ${max} characters allowed` : null,
};
