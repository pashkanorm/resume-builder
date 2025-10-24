import React from "react";
import type { ResumeData } from "../types/types";
import TextareaSection from "./TextareaSection";

interface ResumeFormProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  titles: Record<string, string>;
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
}

export default function ResumeForm({
  data,
  setData,
  titles,
  setTitles,
  sections = [],
}: ResumeFormProps) {
  const handleTitleChange = (section: keyof ResumeData, newTitle: string) => {
    setTitles((prev) => ({ ...prev, [section]: newTitle }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {sections.includes("summary") && (
        <TextareaSection
          title={titles.summary}
          onTitleChange={(newTitle) => handleTitleChange("summary", newTitle)}
          value={data.summary || ""}
          onChange={(val) => setData((prev) => ({ ...prev, summary: val }))}
          placeholder="Write a short professional summary..."
        />
      )}

      {sections.includes("experience") && (
        <TextareaSection
          title={titles.experience}
          onTitleChange={(newTitle) => handleTitleChange("experience", newTitle)}
          value={data.experienceText || ""}
          onChange={(val) => setData((prev) => ({ ...prev, experienceText: val }))}
          placeholder="Describe your experience..."
        />
      )}

      {sections.includes("education") && (
        <TextareaSection
          title={titles.education}
          onTitleChange={(newTitle) => handleTitleChange("education", newTitle)}
          value={data.educationText || ""}
          onChange={(val) => setData((prev) => ({ ...prev, educationText: val }))}
          placeholder="Write your education details..."
        />
      )}

      {sections.includes("projects") && (
        <TextareaSection
          title={titles.projects}
          onTitleChange={(newTitle) => handleTitleChange("projects", newTitle)}
          value={data.projectsText || ""}
          onChange={(val) => setData((prev) => ({ ...prev, projectsText: val }))}
          placeholder="Describe your projects..."
        />
      )}

      {sections.includes("contact") && (
        <TextareaSection
          title={titles.contact}
          onTitleChange={(newTitle) => handleTitleChange("contact", newTitle)}
          value={data.contactText || ""}
          onChange={(val) => setData((prev) => ({ ...prev, contactText: val }))}
        />
      )}

      {sections.includes("skills") && (
        <TextareaSection
          title={titles.skills}
          onTitleChange={(newTitle) => handleTitleChange("skills", newTitle)}
          value={data.skillsText || ""}
          onChange={(val) => setData((prev) => ({ ...prev, skillsText: val }))}
        />
      )}

      {sections.includes("languages") && (
        <TextareaSection
          title={titles.languages}
          onTitleChange={(newTitle) => handleTitleChange("languages", newTitle)}
          value={data.languagesText || ""}
          onChange={(val) => setData((prev) => ({ ...prev, languagesText: val }))}
        />
      )}
    </div>
  );
}
