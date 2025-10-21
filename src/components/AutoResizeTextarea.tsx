import React, { useRef, useEffect } from "react";

interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (val: string) => void;
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

  return (
    <textarea
      {...props}
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ overflow: "hidden", resize: "none" }}
    />
  );
};

export default AutoResizeTextarea;
