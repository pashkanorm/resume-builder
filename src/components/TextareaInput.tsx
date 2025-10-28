import React from "react";
import InputField from "./InputField";

interface TextareaInputProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  children?: React.ReactNode;
  isTextarea?: boolean;
}

export default function TextareaInput({
  value,
  onChange,
  placeholder = "",
  children,
  isTextarea = true,
}: TextareaInputProps) {
  return (
    <div>
      {isTextarea && (
        <InputField
          type="textarea"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 border rounded outline-none focus:border-blue-500"
          style={{
            resize: "both",
            width: "100%",
            minHeight: "100px",
            boxSizing: "border-box",
          }}
        />
      )}
      {children}
    </div>
  );
}
