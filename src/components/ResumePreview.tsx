import React from "react";
import type { ResumeData } from "../types/types";

interface Props {
  data: ResumeData;
}

const ResumePreview: React.FC<Props> = ({ data }) => {
  return (
    <div className="font-sans text-gray-800 p-6" style={{ width: "100%", boxSizing: "border-box" }}>
      {/* Header */}
      <div className="border-b pb-2 mb-4">
        <h1 className="text-3xl font-bold">{data.contact.fullName}</h1>
        <p className="text-lg text-gray-600">{data.contact.title}</p>
      </div>

      {/* Main content: two columns */}
      <div className="flex gap-6">
        {/* Left column (66%) */}
        <div style={{ flex: "2" }}>
          {/* Summary */}
          {data.summary && (
            <section className="mb-4">
              <h2 className="text-xl font-semibold border-b mb-2">Summary</h2>
              <p>{data.summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <section className="mb-4">
              <h2 className="text-xl font-semibold border-b mb-2">Experience</h2>
              {data.experience.map((exp, i) => (
                <div key={exp.id || i} className="mb-3">
                  <p className="font-semibold">{exp.role}</p>
                  <p className="text-sm text-gray-700">
                    {exp.company}
                    {exp.startDate || exp.endDate
                      ? ` (${exp.startDate || "?"} - ${exp.endDate || "Present"})`
                      : ""}
                  </p>
                  {exp.summary && <p className="text-sm mt-1">{exp.summary}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section className="mb-4">
              <h2 className="text-xl font-semibold border-b mb-2">Education</h2>
              {data.education.map((edu, i) => (
                <div key={edu.id || i} className="mb-2">
                  <p className="font-semibold">{edu.school}</p>
                  <p className="text-sm text-gray-700">
                    {edu.degree}
                    {edu.startDate || edu.endDate
                      ? ` (${edu.startDate || "?"} - ${edu.endDate || "?"})`
                      : ""}
                  </p>
                  {edu.summary && <p className="text-sm mt-1">{edu.summary}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <section className="mb-4">
              <h2 className="text-xl font-semibold border-b mb-2">Projects</h2>
              {data.projects.map((proj, i) => (
                <div key={proj.id || i} className="mb-2">
                  <p className="font-semibold">{proj.title}</p>
                  <p className="text-sm text-gray-700">{proj.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Vertical line */}
        <div style={{ width: "1px", backgroundColor: "#ccc" }} />

        {/* Right column (33%) */}
        <div style={{ flex: "1", display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Contact info */}
          <section>
            <h2 className="text-xl font-semibold border-b mb-2">Contact</h2>
            {data.contact.email && <p>Email: {data.contact.email}</p>}
            {data.contact.phone && <p>Phone: {data.contact.phone}</p>}
            {data.contact.location && <p>Location: {data.contact.location}</p>}
            {data.contact.website && <p>Website: {data.contact.website}</p>}
            {data.contact.linkedin && <p>LinkedIn: {data.contact.linkedin}</p>}
            {data.contact.github && <p>GitHub: {data.contact.github}</p>}
          </section>

          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold border-b mb-2">Skills</h2>
              <p>{data.skills.join(", ")}</p>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold border-b mb-2">Languages</h2>
              <p>{data.languages.join(", ")}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
