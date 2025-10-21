// App.tsx
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

  const handlePreview = async () => {
    // 1️⃣ Create an offscreen container dynamically
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.width = "210mm"; // A4 width
    container.style.backgroundColor = "white";
    container.style.padding = "20px";
    document.body.appendChild(container);

    try {
      // 2️⃣ Render ResumePreview into container
      const tempDiv = document.createElement("div");
      container.appendChild(tempDiv);
      tempDiv.innerHTML = ""; // ensure empty

      // React 18 approach
      import("react-dom/client").then(({ createRoot }) => {
        const root = createRoot(tempDiv);
        root.render(<ResumePreview data={data} />);

        // 3️⃣ Wait a tiny bit to ensure React renders fully
        setTimeout(async () => {
          // 4️⃣ Capture container as canvas
          const canvas = await html2canvas(container, {
            scale: 2,
            useCORS: true,
            scrollY: -window.scrollY,
          });

          // 5️⃣ Generate PDF from canvas
          const imgData = canvas.toDataURL("image/jpeg", 1.0);
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
          });

          const pageWidth = pdf.internal.pageSize.getWidth();
          const imgHeight = (canvas.height * pageWidth) / canvas.width;
          pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, imgHeight);

          // 6️⃣ Open PDF in default viewer tab
          const blob = pdf.output("blob");
          const pdfUrl = URL.createObjectURL(blob);
          window.open(pdfUrl, "_blank");

          // 7️⃣ Cleanup: remove offscreen container
          root.unmount();
          container.remove();
        }, 50); // short delay to ensure render
      });
    } catch (err) {
      console.error("Error generating PDF:", err);
      container.remove();
    }
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
