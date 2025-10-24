import React from "react";
import Section from "./Section";
import InputField from "./InputField";

interface TextareaSectionProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
}

export default function TextareaSection({
  title,
  onTitleChange,
  value,
  onChange,
  placeholder = "",
}: TextareaSectionProps) {
  return (
    <Section title={title} onTitleChange={onTitleChange}>
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
    </Section>
  );
}
