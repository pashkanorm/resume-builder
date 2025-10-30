import React, { useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult }  from "@hello-pangea/dnd";
import ResumeHeader from "./components/ResumeHeader";
import ResumeColumn from "./components/ResumeColumn";
import type { ExtendedResumeData }  from "./components/ResumeColumn";
import ResumePreview from "./components/ResumePreview";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./App.css";

export default function App() {
  const [data, setData] = useState<ExtendedResumeData>({
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
    extraSections: [],
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

  // Handle drag-and-drop reordering
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = source.droppableId === "left";

    const filteredSections = data.extraSections?.filter(
      (s) => s.isLeft === sourceColumn
    );
    if (!filteredSections) return;

    const [moved] = filteredSections.splice(source.index, 1);
    filteredSections.splice(destination.index, 0, moved);

    // Merge back with other column
    setData((prev) => ({
      ...prev,
      extraSections: [
        ...(prev.extraSections?.filter((s) => s.isLeft !== sourceColumn) || []),
        ...filteredSections,
      ],
    }));
  };

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
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="app-container" style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "900px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ width: "100%" }}>
            <ResumeHeader data={data} setData={setData} />
          </div>

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
              droppableId="left"
            />

            <div className="vertical-line" style={{ width: "1px", backgroundColor: "#ccc" }} />

            <ResumeColumn
              data={data}
              setData={setData}
              titles={titles}
              setTitles={setTitles}
              sections={["contact", "skills", "languages"]}
              flex={1}
              bgColor={data.rightColumnBgColor}
              textColor={data.rightColumnTextColor}
              droppableId="right"
            />
          </div>

          <div className="preview-button-container">
            <button onClick={handlePreview}>Preview Resume</button>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
