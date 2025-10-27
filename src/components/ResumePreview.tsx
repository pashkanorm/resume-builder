import React from "react";
import type { ExtendedResumeData } from "../types/types";
import ColumnPreview from "./ColumnPreview";

interface Props {
  data: ExtendedResumeData;
  titles: Record<string, string>;
  leftColumnBgColor?: string;
  rightColumnBgColor?: string;
}

const ResumePreview: React.FC<Props> = ({ data, titles }) => {
  const {
    headerBgColor = "#2e7d32",
    headerTextColor = "#ffffff",
    leftColumnBgColor = "#ffffff",
    leftColumnTextColor = "#000000",
    rightColumnBgColor = "#ffffff",
    rightColumnTextColor = "#000000",
    extraSections = [],
  } = data;

  const leftExtras = extraSections.filter((s) => s.isLeft);
  const rightExtras = extraSections.filter((s) => !s.isLeft);

  return (
    <div
      id="resume-preview"
      style={{
        width: "210mm",
        minHeight: "297mm",
        fontFamily: "Arial, sans-serif",
        fontSize: "12pt",
        color: "#333",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: headerBgColor,
          color: headerTextColor,
          padding: "40px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1 style={{ fontSize: "24pt", margin: 0 }}>{data.contact.fullName}</h1>
        <p style={{ fontSize: "14pt", margin: "4px 0 0 0" }}>{data.contact.title}</p>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", flexGrow: 1 }}>
        <ColumnPreview
          titleMap={titles}
          sections={[
            { text: data.summary, title: titles.summary },
            { items: data.experience, title: titles.experience, type: "experience" },
            { items: data.education, title: titles.education, type: "education" },
            { items: data.projects, title: titles.projects, type: "projects" },
          ]}
          extraSections={leftExtras}
          isLeft
          bgColor={leftColumnBgColor}
          textColor={leftColumnTextColor}
        />

        <div style={{ width: "1px", backgroundColor: "#ccc" }} />

        <ColumnPreview
          titleMap={titles}
          sections={[
            { text: data.contactText, title: titles.contact },
            { text: data.skillsText, title: titles.skills },
            {
              items: (data.languagesList ?? []).filter((l) => l.name.trim() !== ""),
              title: titles.languages,
              type: "languages",
            },
          ]}
          extraSections={rightExtras}
          isLeft={false}
          bgColor={rightColumnBgColor}
          textColor={rightColumnTextColor}
        />
      </div>
    </div>
  );
};

export default ResumePreview;
