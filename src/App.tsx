import React, { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import type { ResumeData } from "./types/types";
import ColorSquare from "./components/ColorSquare";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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
    headerBgColor: "#2c8b30ff",
    headerTextColor: "#ffffff",
    leftColumnBgColor: "#ffffff",
    leftColumnTextColor: "#000000",
    rightColumnBgColor: "#ffffff",
    rightColumnTextColor: "#000000",
  });

  const [titles, setTitles] = useState<Record<string, string>>({
    summary: "Summary",
    experience: "Experience",
    education: "Education",
    projects: "Projects",
    contact: "Contact",
    skills: "Skills",
    languages: "Languages",
  });

  const handlePreview = () => {
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-9999px";
    container.style.left = "-9999px";
    container.style.width = "210mm";
    container.style.backgroundColor = "white";
    document.body.appendChild(container);

    import("react-dom/client").then(({ createRoot }) => {
      const root = createRoot(container);
      root.render(<ResumePreview data={data} titles={titles} />);
      requestAnimationFrame(() => {
        html2canvas(container, { scale: 2, useCORS: true })
          .then((canvas) => {
            const imgData = canvas.toDataURL("image/jpeg", 1.0);
            const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
            const pageWidth = pdf.internal.pageSize.getWidth();
            const imgHeight = (canvas.height * pageWidth) / canvas.width;
            pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, imgHeight);
            const blob = pdf.output("blob");
            const pdfUrl = URL.createObjectURL(blob);
            window.open(pdfUrl, "_blank");
            root.unmount();
            container.remove();
          })
          .catch(console.error);
      });
    });
  };

  return (
    <div className="app-container">
      {/* HEADER SECTION */}
      <div className="header" style={{ backgroundColor: data.headerBgColor, color: data.headerTextColor, padding: "10px" }}>
        <input
          type="text"
          placeholder="Full Name"
          value={data.contact.fullName}
          onChange={(e) => setData(prev => ({ ...prev, contact: { ...prev.contact, fullName: e.target.value } }))}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Position / Job Title"
          value={data.contact.title}
          onChange={(e) => setData(prev => ({ ...prev, contact: { ...prev.contact, title: e.target.value } }))}
          className="input-field"
        />

        {/* Header color pickers */}
        <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
          <ColorSquare
            color={data.headerBgColor || "#2c8b30ff"}
            onChange={(val) => setData(prev => ({ ...prev, headerBgColor: val }))}
            label="Edit background color"
          />
          <ColorSquare
            color={data.headerTextColor || "#000000ff"} 
            onChange={(val) => setData(prev => ({ ...prev, headerTextColor: val }))}
            label="Edit text color"
          />
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="main-layout" style={{ display: "flex", gap: "10px" }}>
        {/* LEFT COLUMN */}
        <div className="left-column" style={{ flex: 1, backgroundColor: data.leftColumnBgColor, color: data.leftColumnTextColor, padding: "10px" }}>
          <ResumeForm
            data={data}
            setData={setData}
            titles={titles}
            setTitles={setTitles}
            sections={["summary", "experience", "education", "projects"]}
          />

          {/* Left color pickers */}
          <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
            <ColorSquare
              color={data.leftColumnBgColor || "#ffffffff"}
              onChange={(val) => setData(prev => ({ ...prev, leftColumnBgColor: val }))}
              label="Edit background color"
            />
            <ColorSquare
              color={data.leftColumnTextColor || "#000000ff"}
              onChange={(val) => setData(prev => ({ ...prev, leftColumnTextColor: val }))}
              label="Edit text color"
            />
          </div>
        </div>

        <div className="vertical-line"></div>

        {/* RIGHT COLUMN */}
        <div className="right-column" style={{ flex: 1, backgroundColor: data.rightColumnBgColor, color: data.rightColumnTextColor, padding: "10px" }}>
          <ResumeForm
            data={data}
            setData={setData}
            titles={titles}
            setTitles={setTitles}
            sections={["contact", "skills", "languages"]}
          />

          {/* Right color pickers */}
          <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
            <ColorSquare
              color={data.rightColumnBgColor || "#ffffffff"}
              onChange={(val) => setData(prev => ({ ...prev, rightColumnBgColor: val }))}
              label="Edit background color"
            />
            <ColorSquare
              color={data.rightColumnTextColor || "#000000ff"}
              onChange={(val) => setData(prev => ({ ...prev, rightColumnTextColor: val }))}
              label="Edit text color"
            />
          </div>
        </div>
      </div>

      {/* PREVIEW BUTTON */}
      <div className="preview-button-container">
        <button onClick={handlePreview}>Preview Resume</button>
      </div>
    </div>
  );
}
