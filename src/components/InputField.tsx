import React, { forwardRef } from "react";
import type { CSSProperties } from "react";

interface InputFieldProps {
  type?: "text" | "textarea";
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  className?: string;
  style?: CSSProperties; 
}

const InputField = forwardRef<HTMLTextAreaElement | HTMLInputElement, InputFieldProps>(
  ({ type = "text", placeholder, value, onChange, className, style }, ref) => {
    if (type === "textarea") {
      return (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
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
        ref={ref as React.Ref<HTMLInputElement>}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
        style={style}
      />
    );
  }
);

export default InputField;
