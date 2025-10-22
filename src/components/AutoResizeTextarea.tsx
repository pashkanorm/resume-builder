import React, { useRef, useEffect } from "react";
import type { TextareaHTMLAttributes, ChangeEvent } from "react";

interface AutoResizeTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {
  value: string;
  onChange: (val: string) => void; // keep the simpler signature
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({ value, onChange, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    resize();
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      {...props}
      ref={textareaRef}
      value={value}
      onChange={handleChange}
      style={{ overflow: "hidden", resize: "none" }}
    />
  );
};

export default AutoResizeTextarea;
