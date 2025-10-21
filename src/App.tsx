import React, { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import type { ResumeData } from "./types/types";
import html2pdf from "html2pdf.js";
import "./App.css";

export default function App() {
  const [data, setData] = useState<ResumeData>({
    contact: { fullName: "", title: "", email: "", phone: "", location: "" },
    summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    languages: [],
  });

  const handlePreview = () => {
    setTimeout(() => {
      const element = document.getElementById("resume-preview");
      if (!element) return;

      html2pdf()
        .set({
          margin: [10, 10, 10, 10] as [number, number, number, number],
          filename: "resume.pdf",
          image: { type: "jpeg" as const, quality: 1 },
          html2canvas: { scale: 2, scrollY: 0 },
          jsPDF: {
            unit: "mm" as const,
            format: "a4" as const,
            orientation: "portrait" as const,
          },
        })
        .from(element)
        .toPdf()
        .outputPdf("bloburl")
        .then((pdfUrl: string) => {
          window.open(pdfUrl, "_blank");
        });
    }, 50);
  };

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header">
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
        />
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
        />
      </div>

      {/* Main layout */}
      <div className="main-layout">
        {/* Left column 66% */}
        <div className="left-column">
          <ResumeForm
            data={data}
            setData={setData}
            sections={["summary", "experience", "education", "projects"]}
          />
        </div>

        {/* Vertical line */}
        <div className="vertical-line"></div>

        {/* Right column 33% */}
        <div className="right-column">
          <ResumeForm
            data={data}
            setData={setData}
            sections={["contact", "skills", "languages"]}
          />
        </div>
      </div>

      {/* Preview / Open PDF button */}
      <div className="preview-button-container">
        <button onClick={handlePreview}>Preview Resume</button>
      </div>

      {/* Hidden off-screen div for PDF generation */}
      <div
        id="resume-preview"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "210mm",
          opacity: 0,
          pointerEvents: "none",
          backgroundColor: "white",
          padding: "20px",
        }}
      >
        <ResumePreview data={data} />
      </div>
    </div>
  );
}
