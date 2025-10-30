import React from "react";
import type { ExtraSection, RangeBar } from "../types/types";
import SectionPreview from "./SectionPreview";
import RangeBarPreview from "./RangeBarPreview";
import { invertHexColor } from "../utils/invertHexColor";

interface SectionItem {
  text?: string;
  items?: any[];
  type?: "experience" | "education" | "projects" | "languages";
  title?: string;
}

interface Props {
  titleMap: Record<string, string>;
  sections: SectionItem[];
  extraSections: ExtraSection[];
  isLeft: boolean;
  bgColor: string;
  textColor: string;
}

const ColumnPreview: React.FC<Props> = ({
  sections,
  extraSections,
  isLeft,
  bgColor,
  textColor,
}) => {
  const langBarColor = invertHexColor(bgColor);

  const hasContent = (sec: SectionItem) =>
    (sec.text && sec.text.trim() !== "") || (sec.items && sec.items.length > 0);

  const formatItemsToMarkdown = (sec: SectionItem) => {
    if (!sec.items) return "";
    return sec.items
      .map((item: any) => {
        switch (sec.type) {
          case "experience":
            return `**${item.role}**\n${item.company} ${
              item.startDate || item.endDate
                ? `(${item.startDate || "?"} - ${item.endDate || "Present"})`
                : ""
            }\n${item.summary || ""}`;
          case "education":
            return `**${item.school}**\n${item.degree} ${
              item.startDate || item.endDate
                ? `(${item.startDate || "?"} - ${item.endDate || "?"})`
                : ""
            }\n${item.summary || ""}`;
          case "projects":
            return `**${item.title}**\n${item.description || ""}`;
          default:
            return "";
        }
      })
      .join("\n\n");
  };

  return (
    <div
      style={{
        width: isLeft ? "66%" : "33%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      {/* Main Sections */}
      {sections
        .filter(hasContent)
        .map((sec, idx) => {
          if (sec.text) {
            return <SectionPreview key={idx} title={sec.title || ""} text={sec.text} />;
          } else if (sec.items && sec.items.length > 0 && sec.type !== "languages") {
            const markdownText = formatItemsToMarkdown(sec);
            return <SectionPreview key={idx} title={sec.title || ""} text={markdownText} />;
          } else if (sec.items && sec.type === "languages") {
            return (
              <div key={idx}>
                <h2
                  style={{
                    fontSize: "16pt",
                    borderBottom: "1px solid #000",
                    display: "inline-block",
                    marginBottom: "4px",
                  }}
                >
                  {sec.title}
                </h2>
                <div style={{ paddingTop: "8px" }}>
                  {sec.items.map((item: any) => (
                    <RangeBarPreview
                      key={item.name}
                      name={item.name}
                      level={item.level}
                      bgColor={langBarColor}
                    />
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}

      {/* Extra Sections */}
      {extraSections
        .filter((sec) =>
          sec.type === "text"
            ? sec.value?.trim() !== ""
            : sec.languages && sec.languages.length > 0
        )
        .map((sec) => {
          if (sec.type === "text") {
            return <SectionPreview key={sec.id} title={sec.title} text={sec.value || ""} />;
          } else {
            return (
              <div key={sec.id}>
                <h2
                  style={{
                    fontSize: "16pt",
                    borderBottom: "1px solid #000",
                    display: "inline-block",
                    marginBottom: "4px",
                  }}
                >
                  {sec.title}
                </h2>
                <div style={{ paddingTop: "8px" }}>
                  {sec.languages.map((lang: RangeBar, i: number) => (
                    <RangeBarPreview key={i} name={lang.name} level={lang.level} bgColor={langBarColor} />
                  ))}
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default ColumnPreview;
