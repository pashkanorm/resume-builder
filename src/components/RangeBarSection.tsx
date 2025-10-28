import React from "react";
import EditableTitle from "./EditableTitle";
import RangeBarInput from "./RangeBarInput";
import type { RangeBar } from "../types/types";

interface RangeBarSectionProps {
  title: string;
  entries: RangeBar[];
  onTitleChange: (newTitle: string) => void;
  onEntriesChange: (updatedEntries: RangeBar[]) => void;
  columnBgColor: string;
  onRemove?: () => void;
}

const RangeBarSection: React.FC<RangeBarSectionProps> = ({
  title,
  entries: entries,
  onTitleChange,
  onEntriesChange: onEntriesChange,
  columnBgColor,
  onRemove,
}) => {
  const handleEntryChange = (index: number, updatedEntry: RangeBar) => {
    const updatedList = [...entries];
    updatedList[index] = updatedEntry;
    onEntriesChange(updatedList);
  };

  const addEntry = () => {
    onEntriesChange([...entries, { name: "", level: 0 }]);
  };

  const removeEntry = (index: number) => {
    onEntriesChange(entries.filter((_, i) => i !== index));
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
              stroke="#2c2c2cff"
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

      {entries.map((lang, i) => (
        <RangeBarInput
          key={i}
          entry={lang}
          index={i}
          onChange={handleEntryChange}
          onRemove={() => removeEntry(i)}
          bgColor={columnBgColor}
        />
      ))}

      <button
        type="button"
        onClick={addEntry}
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

export default RangeBarSection;
