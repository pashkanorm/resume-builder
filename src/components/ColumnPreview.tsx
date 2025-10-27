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

const ColumnPreview: React.FC<Props> = ({ titleMap, sections, extraSections, isLeft, bgColor, textColor }) => {
  const textStyle: React.CSSProperties = { whiteSpace: "pre-wrap", margin: 0 };
  const langBarColor = invertHexColor(bgColor);

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
{sections.map((sec, idx) =>
  sec.text ? (
    <SectionPreview key={idx} title={sec.title || ""}>
      <p style={textStyle}>{sec.text}</p>
    </SectionPreview>
  ) : sec.items ? (
    <SectionPreview key={idx} title={sec.title || ""}>
      {sec.items.map((item: any) =>
        sec.type === "experience" ? (
          <div key={item.id} style={{ marginBottom: "8px" }}>
            <p style={{ fontWeight: 600, margin: 0 }}>{item.role}</p>
            <p style={{ fontSize: "10pt", color: "#555", margin: 0 }}>
              {item.company}{" "}
              {item.startDate || item.endDate
                ? `(${item.startDate || "?"} - ${item.endDate || "Present"})`
                : ""}
            </p>
            {item.summary && <p style={textStyle}>{item.summary}</p>}
          </div>
        ) : sec.type === "education" ? (
          <div key={item.id} style={{ marginBottom: "8px" }}>
            <p style={{ fontWeight: 600, margin: 0 }}>{item.school}</p>
            <p style={{ fontSize: "10pt", color: "#555", margin: 0 }}>
              {item.degree}{" "}
              {item.startDate || item.endDate
                ? `(${item.startDate || "?"} - ${item.endDate || "?"})`
                : ""}
            </p>
            {item.summary && <p style={textStyle}>{item.summary}</p>}
          </div>
        ) : sec.type === "projects" ? (
          <div key={item.id} style={{ marginBottom: "8px" }}>
            <p style={{ fontWeight: 600, margin: 0 }}>{item.title}</p>
            <p style={{ ...textStyle, color: "#555", marginTop: "4px" }}>{item.description}</p>
          </div>
        ) : sec.type === "languages" ? (
          <RangeBarPreview key={item.name} name={item.name} level={item.level} bgColor={langBarColor} />
        ) : null
      )}
    </SectionPreview>
  ) : null
)}


      {extraSections.map((sec) =>
        sec.type === "text" ? (
          <SectionPreview key={sec.id} title={sec.title}>
            <p style={textStyle}>{sec.value}</p>
          </SectionPreview>
        ) : (
          <SectionPreview key={sec.id} title={sec.title}>
            {sec.languages.map((lang: RangeBar, i: number) => (
              <RangeBarPreview key={i} name={lang.name} level={lang.level} bgColor={langBarColor} />
            ))}
          </SectionPreview>
        )
      )}
    </div>
  );
};

export default ColumnPreview;
