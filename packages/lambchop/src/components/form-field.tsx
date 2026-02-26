import * as React from "react";
import { cn } from "../lib/cn";

export type ValidationRule = {
  validate: (value: string) => boolean;
  message: string;
};

export const validationRules = {
  required: (message = "This field is required"): ValidationRule => ({
    validate: (value) => value.trim().length > 0,
    message,
  }),
  email: (message = "Please enter a valid email address"): ValidationRule => ({
    validate: (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message,
  }),
  url: (message = "Please enter a valid URL"): ValidationRule => ({
    validate: (value) => {
      if (!value) return true;
      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    },
    message,
  }),
  minLength: (min: number, message?: string): ValidationRule => ({
    validate: (value) => !value || value.length >= min,
    message: message || `Must be at least ${min} characters`,
  }),
  maxLength: (max: number, message?: string): ValidationRule => ({
    validate: (value) => !value || value.length <= max,
    message: message || `Must be no more than ${max} characters`,
  }),
  pattern: (regex: RegExp, message: string): ValidationRule => ({
    validate: (value) => !value || regex.test(value),
    message,
  }),
};

interface SharedFieldProps {
  label: string;
  hint?: string;
  error?: string;
  rules?: ValidationRule[];
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

interface FormInputComponentProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    SharedFieldProps {}

function useValidation({
  defaultValue,
  required,
  rules = [],
  validateOnBlur = true,
  validateOnChange = false,
  onValidationChange,
}: {
  defaultValue: string;
  required?: boolean;
  rules?: ValidationRule[];
  validateOnBlur?: boolean;
  validateOnChange?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}) {
  const [internalError, setInternalError] = React.useState<string | null>(null);
  const [touched, setTouched] = React.useState(false);
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const validate = React.useCallback(
    (val: string): string | null => {
      const allRules = required ? [validationRules.required(), ...rules] : rules;
      for (const rule of allRules) {
        if (!rule.validate(val)) {
          return rule.message;
        }
      }
      return null;
    },
    [rules, required],
  );

  const handleBlur = (val: string, runValidation: boolean) => {
    setTouched(true);
    if (runValidation) {
      setInternalError(validate(val));
    }
  };

  const handleChange = (val: string, runValidation: boolean) => {
    setValue(val);
    if (runValidation || touched) {
      setInternalError(validate(val));
    }
  };

  React.useEffect(() => {
    if (touched && onValidationChange) {
      onValidationChange(!validate(value));
    }
  }, [touched, value, validate, onValidationChange]);

  return {
    value,
    touched,
    internalError,
    handleBlur,
    handleChange,
  };
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputComponentProps>(
  (
    {
      label,
      hint,
      error: externalError,
      rules = [],
      validateOnBlur = true,
      validateOnChange = false,
      onValidationChange,
      className,
      required,
      id,
      ...props
    },
    ref,
  ) => {
    const initialValue = (props.value ?? props.defaultValue ?? "") as string;
    const { value, internalError, touched, handleBlur, handleChange } = useValidation({
      defaultValue: initialValue,
      required,
      rules,
      validateOnBlur,
      validateOnChange,
      onValidationChange,
    });

    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const displayError = externalError || (touched ? internalError : null);

    return (
      <div className="space-y-1">
        <label htmlFor={inputId} className="block text-sm font-medium text-text">
          {label}
          {required && <span className="text-accent ml-1">*</span>}
        </label>
        <input
          {...props}
          ref={ref}
          id={inputId}
          value={props.value ?? value}
          onChange={(e) => {
            handleChange(e.target.value, validateOnChange);
            props.onChange?.(e);
          }}
          onBlur={(e) => {
            handleBlur(e.target.value, validateOnBlur);
            props.onBlur?.(e);
          }}
          className={cn(
            "w-full rounded-button border px-3 py-2 text-base",
            "border-surface-border bg-surface text-text placeholder:text-text-muted",
            "focus:outline-none focus:ring-1 focus:ring-accent",
            displayError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "",
            className,
          )}
          aria-invalid={!!displayError}
          aria-describedby={displayError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        />
        {displayError && (
          <p id={`${inputId}-error`} className="text-sm text-red-500 flex items-center gap-1">
            {displayError}
          </p>
        )}
        {!displayError && hint && (
          <p id={`${inputId}-hint`} className="text-xs text-text-secondary">
            {hint}
          </p>
        )}
      </div>
    );
  },
);
FormInput.displayName = "FormInput";

interface FormTextareaComponentProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    SharedFieldProps {}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaComponentProps>(
  (
    {
      label,
      hint,
      error: externalError,
      rules = [],
      validateOnBlur = true,
      validateOnChange = false,
      onValidationChange,
      className,
      required,
      id,
      ...props
    },
    ref,
  ) => {
    const initialValue = (props.value ?? props.defaultValue ?? "") as string;
    const { value, internalError, touched, handleBlur, handleChange } = useValidation({
      defaultValue: initialValue,
      required,
      rules,
      validateOnBlur,
      validateOnChange,
      onValidationChange,
    });

    const inputId = id || `textarea-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const displayError = externalError || (touched ? internalError : null);

    return (
      <div className="space-y-1">
        <label htmlFor={inputId} className="block text-sm font-medium text-text">
          {label}
          {required && <span className="text-accent ml-1">*</span>}
        </label>
        <textarea
          {...props}
          ref={ref}
          id={inputId}
          value={props.value ?? value}
          onChange={(e) => {
            handleChange(e.target.value, validateOnChange);
            props.onChange?.(e);
          }}
          onBlur={(e) => {
            handleBlur(e.target.value, validateOnBlur);
            props.onBlur?.(e);
          }}
          className={cn(
            "w-full rounded-button border px-3 py-2 text-base",
            "border-surface-border bg-surface text-text placeholder:text-text-muted",
            "focus:outline-none focus:ring-1 focus:ring-accent",
            displayError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "",
            className,
          )}
          aria-invalid={!!displayError}
          aria-describedby={displayError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        />
        {displayError && (
          <p id={`${inputId}-error`} className="text-sm text-red-500 flex items-center gap-1">
            {displayError}
          </p>
        )}
        {!displayError && hint && (
          <p id={`${inputId}-hint`} className="text-xs text-text-secondary">
            {hint}
          </p>
        )}
      </div>
    );
  },
);
FormTextarea.displayName = "FormTextarea";

interface FormSelectComponentProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    SharedFieldProps {
  options: { value: string; label: string }[];
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectComponentProps>(
  (
    {
      label,
      hint,
      error,
      options,
      className,
      required,
      id,
      ...props
    },
    ref,
  ) => {
    const inputId = id || `select-${label.toLowerCase().replace(/\s+/g, "-")}`;
    return (
      <div className="space-y-1">
        <label htmlFor={inputId} className="block text-sm font-medium text-text">
          {label}
          {required && <span className="text-accent ml-1">*</span>}
        </label>
        <select
          {...props}
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-button border px-3 py-2 text-base",
            "border-surface-border bg-surface text-text placeholder:text-text-muted",
            "focus:outline-none focus:ring-1 focus:ring-accent",
            error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "",
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-red-500 flex items-center gap-1">
            {error}
          </p>
        )}
        {!error && hint && (
          <p id={`${inputId}-hint`} className="text-xs text-text-secondary">
            {hint}
          </p>
        )}
      </div>
    );
  },
);
FormSelect.displayName = "FormSelect";

export type FormInputProps = React.ComponentProps<typeof FormInput>;
export type FormTextareaProps = React.ComponentProps<typeof FormTextarea>;
export type FormSelectProps = React.ComponentProps<typeof FormSelect>;
