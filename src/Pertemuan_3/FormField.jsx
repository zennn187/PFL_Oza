import React from 'react';

const FormField = ({ 
  label, 
  type = "text", 
  name,
  value, 
  onChange, 
  error, 
  placeholder,
  options 
}) => {
  
  if (type === "select") {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label} <span className="required">*</span></label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={error ? "error-input" : ""}
        >
          <option value="">-- Pilih {label} --</option>
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <div className="error-alert">{error}</div>}
      </div>
    );
  }

  return (
    <div className="form-group">
      <label htmlFor={name}>{label} <span className="required">*</span></label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={error ? "error-input" : ""}
      />
      {error && <div className="error-alert">{error}</div>}
    </div>
  );
};

export default FormField;