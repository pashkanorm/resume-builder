import React from "react";
import type { Language } from "../types/types";
import { invertHexColor } from "../utils/invertHexColor";

interface LanguageInputProps {
  lang: Language;
  index: number;
  onChange: (index: number, updatedLang: Language) => void;
  bgColor: string; // background color of the column
}

const LanguageInput: React.FC<LanguageInputProps> = ({ lang, index, onChange, bgColor }) => {
  const sliderColor = invertHexColor(bgColor);

  return (
    <div style={{ marginBottom: "10px" }}>
      {/* Language name input */}
      <input
        type="text"
        value={lang.name}
        placeholder="Language"
        onChange={(e) => onChange(index, { ...lang, name: e.target.value })}
        style={{ width: "100%", marginBottom: "4px" }}
      />

      {/* Language level slider */}
      <input
        type="range"
        min={0}
        max={5}
        value={lang.level}
        onChange={(e) => onChange(index, { ...lang, level: parseInt(e.target.value) })}
        style={{
          width: "100%",
          accentColor: sliderColor, // contrast color
        }}
      />
    </div>
  );
};

export default LanguageInput;
