import React from "react";
import type { ResumeData } from "../types/types";

interface Props {
  data: ResumeData;
}

const ResumePreview: React.FC<Props> = ({ data }) => {
  return (
    <div
      id="resume-preview"
      style={{
        width: "210mm",
        height: "297mm",
        margin: 0,
        padding: 0,
        fontFamily: "Arial, sans-serif",
        fontSize: "12pt",
        color: "#333",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        backgroundColor: "#2e7d32", // Green header background
        overflow: "hidden",
        border: "none",
        outline: "none",
      }}
    >
      {/* Header */}
      <div
        style={{
          color: "#fff",
          padding: "40px 20px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: 0,
        }}
      >
        <h1 style={{ fontSize: "24pt", margin: 0 }}>{data.contact.fullName}</h1>
        <p style={{ fontSize: "14pt", margin: "4px 0 0 0" }}>{data.contact.title}</p>
      </div>

      {/* Main content */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          flexBasis: 0,
          backgroundColor: "#ffffff",
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
        }}
      >
        {/* Left column */}
        <div
          style={{
            width: "66%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {data.summary && (
            <section>
              <h2 style={{ fontSize: "16pt", borderBottom: "1px solid #000", width: "100%" }}>
                Summary
              </h2>
              <p style={{ whiteSpace: "pre-wrap", marginTop: "4px" }}>{data.summary}</p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section>
              <h2 style={{ fontSize: "16pt", borderBottom: "1px solid #000", width: "100%" }}>
                Experience
              </h2>
              {data.experience.map((exp, i) => (
                <div key={exp.id || i} style={{ marginBottom: "8px" }}>
                  <p style={{ fontWeight: 600, margin: 0 }}>{exp.role}</p>
                  <p style={{ fontSize: "10pt", color: "#555", margin: 0 }}>
                    {exp.company}{" "}
                    {exp.startDate || exp.endDate
                      ? `(${exp.startDate || "?"} - ${exp.endDate || "Present"})`
                      : ""}
                  </p>
                  {exp.summary && (
                    <p style={{ whiteSpace: "pre-wrap", margin: "4px 0 0 0" }}>{exp.summary}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {data.education.length > 0 && (
            <section>
              <h2 style={{ fontSize: "16pt", borderBottom: "1px solid #000", width: "100%" }}>
                Education
              </h2>
              {data.education.map((edu, i) => (
                <div key={edu.id || i} style={{ marginBottom: "8px" }}>
                  <p style={{ fontWeight: 600, margin: 0 }}>{edu.school}</p>
                  <p style={{ fontSize: "10pt", color: "#555", margin: 0 }}>
                    {edu.degree}{" "}
                    {edu.startDate || edu.endDate
                      ? `(${edu.startDate || "?"} - ${edu.endDate || "?"})`
                      : ""}
                  </p>
                  {edu.summary && (
                    <p style={{ whiteSpace: "pre-wrap", margin: "4px 0 0 0" }}>{edu.summary}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {data.projects.length > 0 && (
            <section>
              <h2 style={{ fontSize: "16pt", borderBottom: "1px solid #000", width: "100%" }}>
                Projects
              </h2>
              {data.projects.map((proj, i) => (
                <div key={proj.id || i} style={{ marginBottom: "8px" }}>
                  <p style={{ fontWeight: 600, margin: 0 }}>{proj.title}</p>
                  <p style={{ margin: "4px 0 0 0", color: "#555" }}>{proj.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Divider */}
        <div
          style={{
            width: "1px",
            backgroundColor: "#ccc",
            margin: 0,
            padding: 0,
          }}
        />

        {/* Right column */}
        <div
          style={{
            width: "33%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          <section>
            <h2 style={{ fontSize: "16pt", borderBottom: "1px solid #000", width: "100%" }}>
              Contact
            </h2>
            {data.contact.email && <p>Email: {data.contact.email}</p>}
            {data.contact.phone && <p>Phone: {data.contact.phone}</p>}
            {data.contact.location && <p>Location: {data.contact.location}</p>}
            {data.contact.website && <p>Website: {data.contact.website}</p>}
            {data.contact.linkedin && <p>LinkedIn: {data.contact.linkedin}</p>}
            {data.contact.github && <p>GitHub: {data.contact.github}</p>}
          </section>

          {data.skills.length > 0 && (
            <section>
              <h2 style={{ fontSize: "16pt", borderBottom: "1px solid #000", width: "100%" }}>
                Skills
              </h2>
              <p>{data.skills.join(", ")}</p>
            </section>
          )}

          {data.languages.length > 0 && (
            <section>
              <h2 style={{ fontSize: "16pt", borderBottom: "1px solid #000", width: "100%" }}>
                Languages
              </h2>
              <p>{data.languages.join(", ")}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
