import React from "react";
import ColorSquare from "./ColorSquare";
import type { ExtendedResumeData } from "./ResumeColumn";

interface ColumnColorPickersProps {
  isLeft: boolean;
  bgColor: string;
  textColor: string;
  setData: React.Dispatch<React.SetStateAction<ExtendedResumeData>>;
}

const ColumnColorPickers: React.FC<ColumnColorPickersProps> = ({ isLeft, bgColor, textColor, setData }) => {
  const handleBgChange = (val: string) => {
    setData(prev => isLeft ? { ...prev, leftColumnBgColor: val } : { ...prev, rightColumnBgColor: val });
  };

  const handleTextChange = (val: string) => {
    setData(prev => isLeft ? { ...prev, leftColumnTextColor: val } : { ...prev, rightColumnTextColor: val });
  };

  return (
    <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
      <ColorSquare color={bgColor} onChange={handleBgChange} label="Edit background color" />
      <ColorSquare color={textColor} onChange={handleTextChange} label="Edit text color" />
    </div>
  );
};

export default ColumnColorPickers;
