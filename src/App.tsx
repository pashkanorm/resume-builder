import React, { useState } from "react";
import ResumeForm from "./components/ResumeForm";
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
    languages: [],
  });

  const handlePreview = () => {
    // 1️⃣ Create hidden offscreen container
    const container = document.createElement("div");
    container.style.position = "fixed";
    container.style.top = "-9999px";
    container.style.left = "-9999px";
    container.style.width = "210mm";
    container.style.backgroundColor = "white";
    container.style.padding = "0px";
    document.body.appendChild(container);

    // 2️⃣ Render ResumePreview into it
    import("react-dom/client").then(({ createRoot }) => {
      const root = createRoot(container);
      root.render(<ResumePreview data={data} />);

      // 3️⃣ Wait for next animation frame (DOM fully painted)
      requestAnimationFrame(() => {
        html2canvas(container, {
          scale: 2,
          useCORS: true,
          scrollY: -window.scrollY,
        })
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
            window.open(pdfUrl, "_blank"); // opens PDF viewer

            root.unmount(); // clean up
            container.remove();
          })
          .catch(console.error);
      });
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
        <div className="left-column">
          <ResumeForm
            data={data}
            setData={setData}
            sections={["summary", "experience", "education", "projects"]}
          />
        </div>

        <div className="vertical-line"></div>

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
