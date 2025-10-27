import React from "react";
import type { ResumeData, Experience, Education, Project, Language } from "../types/types";
import { invertHexColor } from "../utils/invertHexColor";

// New types for dynamic sections
type ExtraSection =
  | { id: number; type: "text"; title: string; value: string; isLeft: boolean }
  | { id: number; type: "range"; title: string; languages: Language[]; isLeft: boolean };

interface ExtendedResumeData extends ResumeData {
  extraSections?: ExtraSection[];
}

interface Props {
  data: ExtendedResumeData;
  titles: Record<string, string>;
  leftColumnBgColor?: string;
  rightColumnBgColor?: string;
}

const SectionPreview: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <section style={{ marginBottom: "16px" }}>
    <h2
      style={{
        fontSize: "16pt",
        borderBottom: "1px solid #000",
        width: "100%",
        marginBottom: "4px",
      }}
    >
      {title}
    </h2>
    <div>{children}</div>
  </section>
);

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

  const textStyle: React.CSSProperties = { whiteSpace: "pre-wrap", margin: 0 };

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
        backgroundColor: "#ffffff",
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
        {/* Left column */}
        <div
          style={{
            width: "66%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            backgroundColor: leftColumnBgColor,
            color: leftColumnTextColor,
          }}
        >
          {data.summary && (
            <SectionPreview title={titles.summary || "Summary"}>
              <p style={textStyle}>{data.summary}</p>
            </SectionPreview>
          )}

          {(data.experienceText || data.experience.length > 0) && (
            <SectionPreview title={titles.experience || "Experience"}>
              {data.experienceText && <p style={textStyle}>{data.experienceText}</p>}
              {data.experience.map((exp: Experience) => (
                <div key={exp.id} style={{ marginBottom: "8px" }}>
                  <p style={{ fontWeight: 600, margin: 0 }}>{exp.role}</p>
                  <p style={{ fontSize: "10pt", color: "#555", margin: 0 }}>
                    {exp.company}{" "}
                    {exp.startDate || exp.endDate
                      ? `(${exp.startDate || "?"} - ${exp.endDate || "Present"})`
                      : ""}
                  </p>
                  {exp.summary && <p style={textStyle}>{exp.summary}</p>}
                </div>
              ))}
            </SectionPreview>
          )}

          {(data.educationText || data.education.length > 0) && (
            <SectionPreview title={titles.education || "Education"}>
              {data.educationText && <p style={textStyle}>{data.educationText}</p>}
              {data.education.map((edu: Education) => (
                <div key={edu.id} style={{ marginBottom: "8px" }}>
                  <p style={{ fontWeight: 600, margin: 0 }}>{edu.school}</p>
                  <p style={{ fontSize: "10pt", color: "#555", margin: 0 }}>
                    {edu.degree}{" "}
                    {edu.startDate || edu.endDate
                      ? `(${edu.startDate || "?"} - ${edu.endDate || "?"})`
                      : ""}
                  </p>
                  {edu.summary && <p style={textStyle}>{edu.summary}</p>}
                </div>
              ))}
            </SectionPreview>
          )}

          {(data.projectsText || data.projects.length > 0) && (
            <SectionPreview title={titles.projects || "Projects"}>
              {data.projectsText && <p style={textStyle}>{data.projectsText}</p>}
              {data.projects.map((proj: Project) => (
                <div key={proj.id} style={{ marginBottom: "8px" }}>
                  <p style={{ fontWeight: 600, margin: 0 }}>{proj.title}</p>
                  <p style={{ ...textStyle, color: "#555", marginTop: "4px" }}>{proj.description}</p>
                </div>
              ))}
            </SectionPreview>
          )}

          {/* Extra left sections */}
          {leftExtras.map((sec: ExtraSection) =>
            sec.type === "text" ? (
              <SectionPreview key={sec.id} title={sec.title}>
                <p style={textStyle}>{sec.value}</p>
              </SectionPreview>
            ) : (
              <SectionPreview key={sec.id} title={sec.title}>
                {sec.languages.map((lang: Language, i: number) => (
                  <div key={i} style={{ marginBottom: "10px" }}>
                    <p style={{ margin: 0, fontWeight: 500 }}>{lang.name}</p>
                    <div
                      style={{
                        width: "100%",
                        height: "6px",
                        backgroundColor: "#ddd",
                        borderRadius: "3px",
                        marginTop: "4px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${(lang.level / 5) * 100}%`,
                          height: "100%",
                          backgroundColor: invertHexColor(leftColumnBgColor),
                          borderRadius: "3px",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </SectionPreview>
            )
          )}
        </div>

        {/* Divider */}
        <div style={{ width: "1px", backgroundColor: "#ccc" }} />

        {/* Right column */}
        <div
          style={{
            width: "33%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            backgroundColor: rightColumnBgColor,
            color: rightColumnTextColor,
          }}
        >
          {data.contactText && (
            <SectionPreview title={titles.contact || "Contact"}>
              <p style={textStyle}>{data.contactText}</p>
            </SectionPreview>
          )}

          {data.skillsText && (
            <SectionPreview title={titles.skills || "Skills"}>
              <p style={textStyle}>{data.skillsText}</p>
            </SectionPreview>
          )}

          {(data.languagesList ?? []).filter((l) => l.name.trim() !== "").length > 0 && (
            <SectionPreview title={titles.languages || "Languages"}>
              {(data.languagesList ?? [])
                .filter((l) => l.name.trim() !== "")
                .map((lang: Language, i: number) => (
                  <div key={i} style={{ marginBottom: "10px" }}>
                    <p style={{ margin: 0, fontWeight: 500 }}>{lang.name}</p>
                    <div
                      style={{
                        width: "100%",
                        height: "6px",
                        backgroundColor: "#ddd",
                        borderRadius: "3px",
                        marginTop: "4px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${(lang.level / 5) * 100}%`,
                          height: "100%",
                          backgroundColor: invertHexColor(rightColumnBgColor),
                          borderRadius: "3px",
                        }}
                      />
                    </div>
                  </div>
                ))}
            </SectionPreview>
          )}

          {/* Extra right sections */}
          {rightExtras.map((sec: ExtraSection) =>
            sec.type === "text" ? (
              <SectionPreview key={sec.id} title={sec.title}>
                <p style={textStyle}>{sec.value}</p>
              </SectionPreview>
            ) : (
              <SectionPreview key={sec.id} title={sec.title}>
                {sec.languages.map((lang: Language, i: number) => (
                  <div key={i} style={{ marginBottom: "10px" }}>
                    <p style={{ margin: 0, fontWeight: 500 }}>{lang.name}</p>
                    <div
                      style={{
                        width: "100%",
                        height: "6px",
                        backgroundColor: "#ddd",
                        borderRadius: "3px",
                        marginTop: "4px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${(lang.level / 5) * 100}%`,
                          height: "100%",
                          backgroundColor: invertHexColor(rightColumnBgColor),
                          borderRadius: "3px",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </SectionPreview>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
