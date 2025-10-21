// App.tsx
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
    // 1️⃣ Create a temporary off-screen div
    const tempDiv = document.createElement("div");
    tempDiv.style.position = "absolute";
    tempDiv.style.left = "-9999px";
    tempDiv.style.top = "-9999px";
    tempDiv.style.width = "210mm"; // A4 width
    tempDiv.style.backgroundColor = "white";
    tempDiv.style.padding = "20px";
    document.body.appendChild(tempDiv);

    // 2️⃣ Dynamically render ResumePreview into this div
    import("react-dom/client").then(({ createRoot }) => {
      createRoot(tempDiv).render(<ResumePreview data={data} />);

      // 3️⃣ Wait a short moment to ensure React finishes rendering
      setTimeout(() => {
        html2pdf()
          .set({
            margin: [10, 10, 10, 10] as [number, number, number, number],
            filename: "resume.pdf",
            image: { type: "jpeg" as const, quality: 1 },
            html2canvas: { scale: 2, scrollY: 0 },
            jsPDF: { unit: "mm" as const, format: "a4" as const, orientation: "portrait" as const },
          })
          .from(tempDiv)
          .toPdf()
          .outputPdf("bloburl")
          .then((pdfUrl: string) => {
            window.open(pdfUrl, "_blank"); // Opens in PDF viewer
            tempDiv.remove(); // Clean up
          });
      }, 50); // 50ms is usually sufficient
    });
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

      {/* Preview button */}
      <div className="preview-button-container">
        <button onClick={handlePreview}>Preview Resume</button>
      </div>
    </div>
  );
}
