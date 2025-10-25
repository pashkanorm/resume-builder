import React from "react";
import type { ResumeData } from "../types/types";
import EditableSection from "./EditableSection";
import EditableLanguages from "./EditableLanguages";

interface ResumeFormProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  titles: Record<string, string>;
  columnBgColor?: string;
  setTitles: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  sections?: (
    | "summary"
    | "experience"
    | "education"
    | "projects"
    | "contact"
    | "skills"
    | "languages"
  )[];
    isLeft?: boolean; // <-- add this

}

export default function ResumeForm({
  data,
  setData,
  titles,
  setTitles,
  sections = [],
  isLeft = false, 
}: ResumeFormProps) {
  const handleTitleChange = (section: keyof typeof titles, newTitle: string) => {
    setTitles((prev) => ({ ...prev, [section]: newTitle }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* LEFT COLUMN SECTIONS */}
      {sections.includes("summary") && (
        <EditableSection
          title={titles.summary}
          onTitleChange={(newTitle) => handleTitleChange("summary", newTitle)}
          value={data.summary || ""}
          onChange={(val) => setData((prev) => ({ ...prev, summary: val }))}
          placeholder="Write a short professional summary..."
        />
      )}

      {sections.includes("experience") && (
        <EditableSection
          title={titles.experience}
          onTitleChange={(newTitle) => handleTitleChange("experience", newTitle)}
          value={data.experienceText || ""}
          onChange={(val) => setData((prev) => ({ ...prev, experienceText: val }))}
          placeholder="Describe your experience..."
        />
      )}

      {sections.includes("education") && (
        <EditableSection
          title={titles.education}
          onTitleChange={(newTitle) => handleTitleChange("education", newTitle)}
          value={data.educationText || ""}
          onChange={(val) => setData((prev) => ({ ...prev, educationText: val }))}
          placeholder="Write your education details..."
        />
      )}

      {sections.includes("projects") && (
        <EditableSection
          title={titles.projects}
          onTitleChange={(newTitle) => handleTitleChange("projects", newTitle)}
          value={data.projectsText || ""}
          onChange={(val) => setData((prev) => ({ ...prev, projectsText: val }))}
          placeholder="Describe your projects..."
        />
      )}

      {/* RIGHT COLUMN SECTIONS */}
      {sections.includes("contact") && (
        <EditableSection
          title={titles.contact}
          onTitleChange={(newTitle) => handleTitleChange("contact", newTitle)}
          value={data.contactText || ""}
          onChange={(val) => setData((prev) => ({ ...prev, contactText: val }))}
          placeholder="Contact details..."
        />
      )}

      {sections.includes("skills") && (
        <EditableSection
          title={titles.skills}
          onTitleChange={(newTitle) => handleTitleChange("skills", newTitle)}
          value={data.skillsText || ""}
          onChange={(val) => setData((prev) => ({ ...prev, skillsText: val }))}
          placeholder="List your skills..."
        />
      )}

      {/* LANGUAGES SECTION */}
      {sections.includes("languages") && (
        <EditableLanguages
          title={titles.languages}
          languages={data.languagesList || []}
          onTitleChange={(newTitle) => handleTitleChange("languages", newTitle)}
          onLanguagesChange={(updated) => setData((prev) => ({ ...prev, languagesList: updated }))}
          columnBgColor={isLeft ? data.leftColumnBgColor : data.rightColumnBgColor}

        />
      )}
    </div>
  );
}
