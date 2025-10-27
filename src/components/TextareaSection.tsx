import React from "react";
import TextareaSection from "./TextareaInput";
import EditableTitle from "./EditableTitle";

interface EditableSectionProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  children?: React.ReactNode;
  isTextarea?: boolean;
  onRemove?: () => void;
}

const EditableSection: React.FC<EditableSectionProps> = ({
  title,
  onTitleChange,
  value = "",
  onChange = () => {},
  placeholder = "",
  children,
  isTextarea = true,
  onRemove,
}) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      {/* Flex row for title + trashcan */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <EditableTitle title={title} onChange={onTitleChange} />
        {onRemove && (
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

      {/* Textarea below the title */}
      <TextareaSection
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isTextarea={isTextarea}
      >
        {children}
      </TextareaSection>
    </div>
  );
};

export default EditableSection;
