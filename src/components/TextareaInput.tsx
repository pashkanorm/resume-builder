import React, { useRef } from "react";
import InputField from "./InputField";

interface TextareaInputProps {
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  isTextarea?: boolean;
}

export default function TextareaInput({
  value,
  onChange,
  placeholder = "",
  isTextarea = true,
}: TextareaInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const toggleMarkdownAroundSelection = (symbol: string) => {
    if (!textareaRef.current) return;
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.slice(start, end);

    let newText: string;
    let newStart = start;
    let newEnd = end;

    if (selectedText.startsWith(symbol) && selectedText.endsWith(symbol)) {
      // Remove symbol if already applied
      newText =
        value.slice(0, start) +
        selectedText.slice(symbol.length, selectedText.length - symbol.length) +
        value.slice(end);
      newEnd = start + selectedText.length - 2 * symbol.length;
    } else {
      // Add symbol
      newText =
        value.slice(0, start) +
        symbol +
        selectedText +
        symbol +
        value.slice(end);
      newStart = start;
      newEnd = end + 2 * symbol.length;
    }

    onChange(newText);

    // Restore selection to include symbols
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newStart, newEnd);
    }, 0);
  };

  return (
    <div>
      {isTextarea && (
        <>
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
            ref={textareaRef}
          />

          {/* Formatting buttons */}
          <div style={{ marginTop: "6px", display: "flex", gap: "6px" }}>
            <button
              type="button"
              onClick={() => toggleMarkdownAroundSelection("**")}
            >
              <b>B</b>
            </button>
            <button
              type="button"
              onClick={() => toggleMarkdownAroundSelection("_")}
            >
              <i>I</i>
            </button>
            <button
              type="button"
              onClick={() => toggleMarkdownAroundSelection("++")}
            >
              <u>U</u>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
