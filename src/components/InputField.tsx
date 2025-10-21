import React from "react";
import type { CSSProperties } from "react";

interface InputFieldProps {
  type?: "text" | "textarea";
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
  style?: CSSProperties; 
}

const InputField: React.FC<InputFieldProps> = ({ type = "text", placeholder, value, onChange, className, style }) => {
  if (type === "textarea") {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
        style={style}
      />
    );
  }

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      style={style}
    />
  );
};

export default InputField;
