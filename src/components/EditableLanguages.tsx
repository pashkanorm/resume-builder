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
}

const EditableLanguages: React.FC<EditableLanguagesProps> = ({
  title,
  languages,
  onTitleChange,
  onLanguagesChange,
  columnBgColor,
}) => {
  const handleLanguageChange = (index: number, updatedLang: Language) => {
    const updatedList = [...languages];
    updatedList[index] = updatedLang;
    onLanguagesChange(updatedList);
  };

  const addLanguage = () => {
    onLanguagesChange([...languages, { name: "", level: 0 }]);
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <EditableTitle title={title} onChange={onTitleChange} />

      {languages.map((lang, i) => (
        <LanguageInput
          key={i}
          lang={lang}
          index={i}
          onChange={handleLanguageChange}
          bgColor={columnBgColor} // pass the column background
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
        Add Language
      </button>
    </div>
  );
};

export default EditableLanguages;
