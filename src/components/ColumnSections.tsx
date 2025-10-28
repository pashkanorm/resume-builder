import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import type { ExtraSection, RangeBar } from "../types/types";
import TextareaSection from "./TextareaSection";
import RangeBarSection from "./RangeBarSection";

interface ColumnSectionsProps {
  columnId: string; // unique id for each column ("left" / "right")
  sections: ExtraSection[];
  updateSection: (
    id: number,
    updated: { title?: string; value?: string; languages?: RangeBar[] }
  ) => void;
  removeSection: (id: number) => void;
  bgColor: string;
}

const ColumnSections: React.FC<ColumnSectionsProps> = ({
  columnId,
  sections,
  updateSection,
  removeSection,
  bgColor,
}) => {
  return (
    <Droppable droppableId={columnId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            backgroundColor: snapshot.isDraggingOver ? "#f8fafc" : "transparent",
            transition: "background-color 0.15s ease",
            padding: "6px",
            borderRadius: "6px",
            minHeight: "6px",
          }}
        >
          {sections.map((section, index) => (
            <Draggable key={section.id} draggableId={`${columnId}-${section.id}`} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                    userSelect: "none",
                    marginBottom: "8px",
                    background: snapshot.isDragging ? "#eef2f7" : "transparent",
                    borderRadius: "6px",
                    ...provided.draggableProps.style,
                  }}
                >
                  {section.type === "text" ? (
                    <TextareaSection
                      title={section.title}
                      value={section.value}
                      onChange={(val) => updateSection(section.id, { value: val })}
                      onTitleChange={(newTitle) => updateSection(section.id, { title: newTitle })}
                      placeholder="Enter your text..."
                      onRemove={() => removeSection(section.id)}
                    />
                  ) : (
                    <RangeBarSection
                      title={section.title}
                      entries={section.languages}
                      onTitleChange={(newTitle) => updateSection(section.id, { title: newTitle })}
                      onEntriesChange={(langs) => updateSection(section.id, { languages: langs })}
                      columnBgColor={bgColor}
                      onRemove={() => removeSection(section.id)}
                    />
                  )}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default ColumnSections;
