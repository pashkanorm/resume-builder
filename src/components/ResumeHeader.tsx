import React from "react";
import ColorSquare from "./ColorSquare";
import type { ResumeData } from "../types/types";

interface ResumeHeaderProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const ResumeHeader: React.FC<ResumeHeaderProps> = ({ data, setData }) => {
  return (
    <div
      className="header"
      style={{
        backgroundColor: data.headerBgColor,
        color: data.headerTextColor,
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
    
      <div
        style={{
          maxWidth: "900px",
          margin: "0",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "flex-start",
        }}
      >
        {/* Full Name input */}
        <input
          type="text"
          placeholder="Full Name"
          value={data.contact.fullName}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              contact: { ...prev.contact, fullName: e.target.value },
            }))
          }
          className="input-field"
          style={{ width: "100%", textAlign: "left" }}
        />

        {/* Position / Job Title input */}
        <input
          type="text"
          placeholder="Position / Job Title"
          value={data.contact.title}
          onChange={(e) =>
            setData((prev) => ({
              ...prev,
              contact: { ...prev.contact, title: e.target.value },
            }))
          }
          className="input-field"
          style={{ width: "100%", textAlign: "left" }}
        />

        {/* Color pickers */}
        <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
          <ColorSquare
            color={data.headerBgColor || "#2c8b30ff"}
            onChange={(val) => setData((prev) => ({ ...prev, headerBgColor: val }))}
            label="Edit background color"
          />
          <ColorSquare
            color={data.headerTextColor || "#000000ff"}
            onChange={(val) => setData((prev) => ({ ...prev, headerTextColor: val }))}
            label="Edit text color"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeHeader;
