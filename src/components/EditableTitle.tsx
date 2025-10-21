import React, { useState } from "react";

interface EditableTitleProps {
  title: string;
  onChange: (newTitle: string) => void;
}

const EditableTitle: React.FC<EditableTitleProps> = ({ title: defaultTitle, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(defaultTitle);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "8px" }}>
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => {
            setIsEditing(false);
            onChange(title);
          }}
          autoFocus
          style={{
            fontSize: "16px",
            fontWeight: 600,
            borderBottom: "1px solid #888",
            outline: "none",
            padding: "2px 4px",
          }}
        />
      ) : (
        <>
          <span style={{ fontSize: "16px", fontWeight: 600 }}>{title}</span>
          <span
            onClick={() => setIsEditing(true)}
            style={{ cursor: "pointer", color: "#4B9CE2" }}
            title="Edit title"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 17.25V21h3.75l11-11.03-3.75-3.75L3 17.25zM20.71 7.04a1.004 1.004 0 0 0 0-1.42l-2.34-2.34a1.004 1.004 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z"/>
            </svg>
          </span>
        </>
      )}
    </div>
  );
};

export default EditableTitle;
