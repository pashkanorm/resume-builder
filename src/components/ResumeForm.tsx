import React, { useState } from "react";
import type { ResumeData } from "../types/types";
import Section from "../components/Section";
import InputField from "../components/InputField";

interface ResumeFormProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
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

export default function ResumeForm({ data, setData, sections = [] }: ResumeFormProps) {
  const [titles, setTitles] = useState<Record<string, string>>({
    summary: "Summary",
    experience: "Experience",
    education: "Education",
    projects: "Projects",
    contact: "Contact",
    skills: "Skills",
    languages: "Languages",
  });

  const handleTitleChange = (section: keyof ResumeData, newTitle: string) => {
    setTitles((prev) => ({ ...prev, [section]: newTitle }));
  };

  const handleChange = (section: keyof ResumeData, key: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as object),
        [key]: value,
      },
    }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {/* Summary */}
      {sections.includes("summary") && (
        <Section title={titles.summary} onTitleChange={(newTitle) => handleTitleChange("summary", newTitle)}>
          <InputField
            type="textarea"
            placeholder="Write a short professional summary..."
            value={data.summary}
            onChange={(val) => setData((prev) => ({ ...prev, summary: val }))}
            className="w-full p-3 border rounded-lg outline-none focus:border-blue-500"
            style={{ resize: "both", width: "100%", minHeight: "100px", boxSizing: "border-box" }}
          />
        </Section>
      )}

      {/* Experience */}
      {sections.includes("experience") && (
        <Section title={titles.experience} onTitleChange={(newTitle) => handleTitleChange("experience", newTitle)}>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4 p-3 border rounded-lg bg-gray-50">
              <InputField
                placeholder="Company name"
                value={exp.company || ""}
                onChange={(val) => {
                  const updated = [...data.experience];
                  updated[i].company = val;
                  setData((prev) => ({ ...prev, experience: updated }));
                }}
                className="w-full mb-2 p-2 border rounded outline-none focus:border-blue-500"
              />
              <InputField
                placeholder="Role / Position"
                value={exp.role || ""}
                onChange={(val) => {
                  const updated = [...data.experience];
                  updated[i].role = val;
                  setData((prev) => ({ ...prev, experience: updated }));
                }}
                className="w-full mb-2 p-2 border rounded outline-none focus:border-blue-500"
              />
              <InputField
                type="textarea"
                placeholder="Responsibilities / Achievements"
                value={exp.summary || ""}
                onChange={(val) => {
                  const updated = [...data.experience];
                  updated[i].summary = val;
                  setData((prev) => ({ ...prev, experience: updated }));
                }}
                className="w-full p-2 border rounded outline-none focus:border-blue-500"
              />
            </div>
          ))}
          <button
            onClick={() =>
              setData((prev) => ({
                ...prev,
                experience: [...prev.experience, { company: "", role: "", summary: "", id: Date.now().toString() }],
              }))
            }
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-all"
          >
            + Add Experience
          </button>
        </Section>
      )}

      {/* Education */}
      {sections.includes("education") && (
        <Section title={titles.education} onTitleChange={(newTitle) => handleTitleChange("education", newTitle)}>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-4 p-3 border rounded-lg bg-gray-50">
              <InputField
                placeholder="School / University"
                value={edu.school || ""}
                onChange={(val) => {
                  const updated = [...data.education];
                  updated[i].school = val;
                  setData((prev) => ({ ...prev, education: updated }));
                }}
                className="w-full mb-2 p-2 border rounded outline-none focus:border-blue-500"
              />
              <InputField
                placeholder="Degree / Field of study"
                value={edu.degree || ""}
                onChange={(val) => {
                  const updated = [...data.education];
                  updated[i].degree = val;
                  setData((prev) => ({ ...prev, education: updated }));
                }}
                className="w-full p-2 border rounded outline-none focus:border-blue-500"
              />
            </div>
          ))}
          <button
            onClick={() =>
              setData((prev) => ({
                ...prev,
                education: [...prev.education, { school: "", degree: "", id: Date.now().toString() }],
              }))
            }
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-all"
          >
            + Add Education
          </button>
        </Section>
      )}

      {/* Projects */}
      {sections.includes("projects") && (
        <Section title={titles.projects} onTitleChange={(newTitle) => handleTitleChange("projects", newTitle)}>
          {data.projects?.map((proj, i) => (
            <div key={i} className="mb-4 p-3 border rounded-lg bg-gray-50">
              <InputField
                placeholder="Project title"
                value={proj.title || ""}
                onChange={(val) => {
                  const updated = [...(data.projects || [])];
                  updated[i].title = val;
                  setData((prev) => ({ ...prev, projects: updated }));
                }}
                className="w-full mb-2 p-2 border rounded outline-none focus:border-blue-500"
              />
              <InputField
                type="textarea"
                placeholder="Describe your project..."
                value={proj.description || ""}
                onChange={(val) => {
                  const updated = [...(data.projects || [])];
                  updated[i].description = val;
                  setData((prev) => ({ ...prev, projects: updated }));
                }}
                className="w-full p-2 border rounded outline-none focus:border-blue-500"
              />
            </div>
          ))}
          <button
            onClick={() =>
              setData((prev) => ({
                ...prev,
                projects: [...(prev.projects || []), { title: "", description: "", id: Date.now().toString() }],
              }))
            }
            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-all"
          >
            + Add Project
          </button>
        </Section>
      )}

      {/* Contact (exclude fullName & title) */}
      {sections.includes("contact") && (
        <Section title={titles.contact} onTitleChange={(newTitle) => handleTitleChange("contact", newTitle)}>
          {["email", "phone", "website", "linkedin", "github", "location"].map((key) => (
            <InputField
              key={key}
              placeholder={key[0].toUpperCase() + key.slice(1)}
              value={(data.contact as any)[key] || ""}
              onChange={(val) => handleChange("contact", key, val)}
              className="w-full mb-2 p-2 border rounded outline-none focus:border-blue-500"
            />
          ))}
        </Section>
      )}

      {/* Skills */}
      {sections.includes("skills") && (
        <Section title={titles.skills} onTitleChange={(newTitle) => handleTitleChange("skills", newTitle)}>
          <InputField
            type="textarea"
            placeholder="List your skills separated by commas..."
            value={data.skills.join(", ")}
            onChange={(val) =>
              setData((prev) => ({ ...prev, skills: val.split(",").map((s) => s.trim()) }))
            }
            className="w-full p-2 border rounded outline-none focus:border-blue-500"
          />
        </Section>
      )}

      {/* Languages */}
      {sections.includes("languages") && (
        <Section title={titles.languages} onTitleChange={(newTitle) => handleTitleChange("languages", newTitle)}>
          <InputField
            type="textarea"
            placeholder="List languages you know..."
            value={data.languages.join(", ")}
            onChange={(val) =>
              setData((prev) => ({ ...prev, languages: val.split(",").map((s) => s.trim()) }))
            }
            className="w-full p-2 border rounded outline-none focus:border-blue-500"
          />
        </Section>
      )}
    </div>
  );
}
