import React from "react";

interface AddSectionMenuProps {
  addSection: (type: "text" | "range") => void;
  onCancel: () => void;
}

const AddSectionMenu: React.FC<AddSectionMenuProps> = ({ addSection, onCancel }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "10px" }}>
    <button
      onClick={() => addSection("text")}
      style={{ padding: "6px", backgroundColor: "#f0f0f0", border: "1px solid #ccc", borderRadius: "6px", cursor: "pointer" }}
    >
      📝 Text Field
    </button>
    <button
      onClick={() => addSection("range")}
      style={{ padding: "6px", backgroundColor: "#f0f0f0", border: "1px solid #ccc", borderRadius: "6px", cursor: "pointer" }}
    >
      🎚️ Range Bar Field
    </button>
    <button
      onClick={onCancel}
      style={{ padding: "6px", backgroundColor: "#ddd", border: "none", borderRadius: "6px", cursor: "pointer" }}
    >
      Cancel
    </button>
  </div>
);

export default AddSectionMenu;
