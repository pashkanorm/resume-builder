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

  // Remove ALL occurrences of the target symbol inside selection
  const escaped = symbol.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const regex = new RegExp(escaped, "g");
  const cleaned = selectedText.replace(regex, "");

  // Determine if the symbol existed anywhere
  const hadSymbol = regex.test(selectedText);

  const newText = hadSymbol
    ? value.slice(0, start) + cleaned + value.slice(end) // remove symbol
    : value.slice(0, start) + symbol + cleaned + symbol + value.slice(end); // add symbol

  onChange(newText);

  // Restore selection
  setTimeout(() => {
    textarea.focus();
    textarea.setSelectionRange(start, start + cleaned.length + (hadSymbol ? 0 : 2 * symbol.length));
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
