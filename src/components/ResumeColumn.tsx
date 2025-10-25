import React from "react";
import type { ResumeData } from "../types/types";
import ResumeForm from "./ResumeForm";
import ColorSquare from "./ColorSquare";

interface ResumeColumnProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  titles: Record<string, string>;
  setTitles: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  sections: ("summary" | "experience" | "education" | "projects" | "contact" | "skills" | "languages")[];
  flex: number;
  bgColor: string;
  textColor: string;
  isLeft?: boolean;
  
}

const ResumeColumn: React.FC<ResumeColumnProps> = ({
  data,
  setData,
  titles,
  setTitles,
  sections,
  flex,
  bgColor,
  textColor,
  isLeft = false,
}) => {
  const handleBgColorChange = (val: string) => {
    if (isLeft) setData(prev => ({ ...prev, leftColumnBgColor: val }));
    else setData(prev => ({ ...prev, rightColumnBgColor: val }));
  };

  const handleTextColorChange = (val: string) => {
    if (isLeft) setData(prev => ({ ...prev, leftColumnTextColor: val }));
    else setData(prev => ({ ...prev, rightColumnTextColor: val }));
  };

  return (
    <div style={{ flex, backgroundColor: bgColor, color: textColor, padding: "10px" }}>
      <ResumeForm
        data={data}
        setData={setData}
        titles={titles}
        setTitles={setTitles}
        sections={sections}
        columnBgColor={isLeft ? data.leftColumnBgColor : data.rightColumnBgColor}
      />

      <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
        <ColorSquare color={bgColor} onChange={handleBgColorChange} label="Edit background color" />
        <ColorSquare color={textColor} onChange={handleTextColorChange} label="Edit text color" />
      </div>
    </div>
  );
};

export default ResumeColumn;
