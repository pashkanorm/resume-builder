import React from "react";
import type { Language } from "../types/types";
import { invertHexColor } from "../utils/invertHexColor";

interface LanguageInputProps {
  lang: Language;
  index: number;
  onChange: (index: number, updatedLang: Language) => void;
  onRemove: () => void;
  bgColor: string; // background color of the column
}

const LanguageInput: React.FC<LanguageInputProps> = ({
  lang,
  index,
  onChange,
  onRemove,
  bgColor,
}) => {
  const sliderColor = invertHexColor(bgColor);

  return (
    <div style={{ marginBottom: "10px" }}>
      {/* Row with text input + trashcan */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <input
          type="text"
          value={lang.name}
          placeholder="New Entry"
          onChange={(e) => onChange(index, { ...lang, name: e.target.value })}
          style={{ flexGrow: 1 }}
        />
        <button
          type="button"
          onClick={onRemove}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: 0,
          }}
          title="Remove language"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c52f2fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>

      {/* Slider below */}
      <input
        type="range"
        min={0}
        max={5}
        value={lang.level}
        onChange={(e) =>
          onChange(index, { ...lang, level: parseInt(e.target.value) })
        }
        style={{
          width: "100%",
          accentColor: sliderColor,
          marginTop: "4px",
        }}
      />
    </div>
  );
};

export default LanguageInput;
