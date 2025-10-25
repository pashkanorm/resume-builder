import React from "react";
import type { ResumeData, Experience, Education, Project, Language } from "../types/types";
import { invertHexColor } from "../utils/invertHexColor";


interface Props {
  data: ResumeData;
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
  } = data;

  const textStyle: React.CSSProperties = { whiteSpace: "pre-wrap", margin: 0 };

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
        <p style={{ fontSize: "14pt", margin: "4px 0 0 0" }}>
          {data.contact.title}
        </p>
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
              {data.experienceText && (
                <p style={textStyle}>{data.experienceText}</p>
              )}
              {data.experience.map((exp: Experience) => (
                <div key={exp.id} style={{ marginBottom: "8px" }}>
                  <p style={{ fontWeight: 600, margin: 0 }}>{exp.role}</p>
                  <p style={{ fontSize: "10pt", color: "#555", margin: 0 }}>
                    {exp.company}{" "}
                    {exp.startDate || exp.endDate
                      ? `(${exp.startDate || "?"} - ${
                          exp.endDate || "Present"
                        })`
                      : ""}
                  </p>
                  {exp.summary && <p style={textStyle}>{exp.summary}</p>}
                </div>
              ))}
            </SectionPreview>
          )}

          {(data.educationText || data.education.length > 0) && (
            <SectionPreview title={titles.education || "Education"}>
              {data.educationText && (
                <p style={textStyle}>{data.educationText}</p>
              )}
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
              {data.projectsText && (
                <p style={textStyle}>{data.projectsText}</p>
              )}
              {data.projects.map((proj: Project) => (
                <div key={proj.id} style={{ marginBottom: "8px" }}>
                  <p style={{ fontWeight: 600, margin: 0 }}>{proj.title}</p>
                  <p style={{ ...textStyle, color: "#555", marginTop: "4px" }}>
                    {proj.description}
                  </p>
                </div>
              ))}
            </SectionPreview>
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

          {/* Languages Section */}
          {(data.languagesList ?? []).filter((lang) => lang.name.trim() !== "")
            .length > 0 && (
            <SectionPreview title={titles.languages || "Languages"}>
              {(data.languagesList ?? [])
                .filter((lang) => lang.name.trim() !== "")
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
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
