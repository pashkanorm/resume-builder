import React from "react";
import type { ExtraSection, RangeBar } from "../types/types";
import TextareaSection from "./TextareaSection";
import RangeBarSection from "./RangeBarSection";

interface ColumnSectionsProps {
  sections: ExtraSection[];
  updateSection: (
    id: number,
    updated: { title?: string; value?: string; languages?: RangeBar[] }
  ) => void;
  removeSection: (id: number) => void;
  bgColor: string;
}

const ColumnSections: React.FC<ColumnSectionsProps> = ({
  sections,
  updateSection,
  removeSection,
  bgColor,
}) => {
  return (
    <>
      {sections.map((section) =>
        section.type === "text" ? (
          <TextareaSection
            key={section.id}
            title={section.title}
            value={section.value}
            onChange={(val) => updateSection(section.id, { value: val })}
            onTitleChange={(newTitle) => updateSection(section.id, { title: newTitle })}
            placeholder="Enter your text..."
            onRemove={() => removeSection(section.id)}
          />
        ) : (
          <RangeBarSection
            key={section.id}
            title={section.title}
            languages={section.languages}
            onTitleChange={(newTitle) => updateSection(section.id, { title: newTitle })}
            onLanguagesChange={(langs) => updateSection(section.id, { languages: langs })}
            columnBgColor={bgColor}
            onRemove={() => removeSection(section.id)}
          />
        )
      )}
    </>
  );
};

export default ColumnSections;
