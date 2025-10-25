import React, { useState } from "react";
import ResumeHeader from "./components/ResumeHeader";
import ResumeColumn from "./components/ResumeColumn";
import ResumePreview from "./components/ResumePreview";
import type { ResumeData } from "./types/types";
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
    languagesList: [{ name: "", level: 0 }],
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
      root.render(
        <ResumePreview
          data={data}
          titles={titles}
          leftColumnBgColor={data.leftColumnBgColor}
          rightColumnBgColor={data.rightColumnBgColor}
        />
      );
      requestAnimationFrame(() => {
        html2canvas(container, { scale: 2, useCORS: true })
          .then((canvas) => {
            const imgData = canvas.toDataURL("image/jpeg", 1.0);
            const pdf = new jsPDF({
              orientation: "portrait",
              unit: "mm",
              format: "a4",
            });
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
    <div
      className="app-container"
      style={{ display: "flex", justifyContent: "center" }}
    >
      {/* CENTERED CONTAINER */}
      <div
        style={{
          width: "900px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* HEADER */}
        <div style={{ width: "100%" }}>
          <ResumeHeader data={data} setData={setData} />
        </div>

        {/* COLUMNS WRAPPER */}
        <div style={{ display: "flex", width: "100%", gap: "10px" }}>
          <ResumeColumn
            data={data}
            setData={setData}
            titles={titles}
            setTitles={setTitles}
            sections={["summary", "experience", "education", "projects"]}
            flex={2}
            bgColor={data.leftColumnBgColor}
            textColor={data.leftColumnTextColor}
            isLeft
          />

          <div
            className="vertical-line"
            style={{ width: "1px", backgroundColor: "#ccc" }}
          />

          <ResumeColumn
            data={data}
            setData={setData}
            titles={titles}
            setTitles={setTitles}
            sections={["contact", "skills", "languages"]}
            flex={1}
            bgColor={data.rightColumnBgColor}
            textColor={data.rightColumnTextColor}
          />
        </div>

        {/* PREVIEW BUTTON */}
        <div className="preview-button-container">
          <button onClick={handlePreview}>Preview Resume</button>
        </div>
      </div>
    </div>
  );
}
