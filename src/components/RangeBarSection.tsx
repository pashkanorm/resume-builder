import React from "react";
import EditableTitle from "./EditableTitle";
import LanguageInput from "./LanguageInput";
import type { Language } from "../types/types";

interface EditableLanguagesProps {
  title: string;
  languages: Language[];
  onTitleChange: (newTitle: string) => void;
  onLanguagesChange: (updatedLanguages: Language[]) => void;
  columnBgColor: string;
  onRemove?: () => void; // <-- new prop
}

const EditableLanguages: React.FC<EditableLanguagesProps> = ({
  title,
  languages,
  onTitleChange,
  onLanguagesChange,
  columnBgColor,
  onRemove,
}) => {
  const handleLanguageChange = (index: number, updatedLang: Language) => {
    const updatedList = [...languages];
    updatedList[index] = updatedLang;
    onLanguagesChange(updatedList);
  };

  const addLanguage = () => {
    onLanguagesChange([...languages, { name: "", level: 0 }]);
  };

  const removeLanguage = (index: number) => {
    onLanguagesChange(languages.filter((_, i) => i !== index));
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <EditableTitle title={title} onChange={onTitleChange} />
        {onRemove && (
          <button
            onClick={onRemove}
            style={{ background: "transparent", border: "none", cursor: "pointer" }}
            title="Remove section"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#cc0000"
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
        )}
      </div>

      {languages.map((lang, i) => (
        <LanguageInput
          key={i}
          lang={lang}
          index={i}
          onChange={handleLanguageChange}
          onRemove={() => removeLanguage(i)}
          bgColor={columnBgColor}
        />
      ))}

      <button
        type="button"
        onClick={addLanguage}
        style={{
          marginTop: "0.5rem",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "6px 10px",
          cursor: "pointer",
        }}
      >
        Add Entry
      </button>
    </div>
  );
};

export default EditableLanguages;
