import React, { useState, useEffect } from 'react';

interface FormInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  autoComplete?: string;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  rows?: number;
  errorMessage?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  type,
  label,
  value,
  onChange,
  required = false,
  autoComplete,
  pattern,
  minLength,
  maxLength,
  rows,
  errorMessage = 'This field is required',
}) => {
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  // Validate input on value change or when focused changes
  useEffect(() => {
    if (!touched) return;

    if (required && !value) {
      setError('This field is required');
    } else if (pattern && new RegExp(pattern).test(value) === false) {
      setError(errorMessage);
    } else if (minLength && value.length < minLength) {
      setError(`Must be at least ${minLength} characters`);
    } else if (maxLength && value.length > maxLength) {
      setError(`Must be less than ${maxLength} characters`);
    } else {
      setError('');
    }
  }, [value, focused, required, pattern, minLength, maxLength, errorMessage, touched]);

  const handleFocus = () => {
    setFocused(true);
    setTouched(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const inputClasses = `w-full px-0 py-4 bg-transparent dark:bg-transparent border-b-2 
    ${error && touched ? 'border-red-500 dark:border-red-400' : 'border-stone-300 dark:border-dark-border'} 
    focus:border-stone-900 dark:focus:border-dark-accent focus:outline-none transition-colors`;

  return (
    <div className="relative">
      <label htmlFor={id} className="block text-xl font-medium mb-2 dark:text-dark-text">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          rows={rows || 5}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputClasses}
          aria-invalid={error ? true : false}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete || (type === 'email' ? 'email' : type === 'tel' ? 'tel' : type === 'text' ? 'off' : 'off')}
          pattern={pattern}
          minLength={minLength}
          maxLength={maxLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={inputClasses}
          aria-invalid={error ? true : false}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      
      {error && touched && (
        <p 
          id={`${id}-error`} 
          className="text-red-500 dark:text-red-400 text-sm mt-1 absolute -bottom-6"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
