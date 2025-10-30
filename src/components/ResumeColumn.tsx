import React, { useState, useEffect } from "react";
import type { ResumeData, RangeBar } from "../types/types";
import ColumnSections from "./ColumnSections";
import ColumnColorPickers from "./ColumnColorPickers";
import AddSectionMenu from "./AddSectionMenu";
import { Droppable } from "@hello-pangea/dnd";

export interface ExtendedResumeData extends ResumeData {
  extraSections?: ExtraSection[];
}

export type ExtraSection =
  | { id: number; type: "text"; title: string; value: string; isLeft: boolean }
  | {
      id: number;
      type: "range";
      title: string;
      languages: RangeBar[];
      isLeft: boolean;
    };

interface ResumeColumnProps {
  data: ExtendedResumeData;
  setData: React.Dispatch<React.SetStateAction<ExtendedResumeData>>;
  titles: Record<string, string>;
  setTitles: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  sections: (
    | "summary"
    | "experience"
    | "education"
    | "projects"
    | "contact"
    | "skills"
    | "languages"
  )[];
  flex: number;
  bgColor: string;
  textColor: string;
  isLeft?: boolean;
  droppableId: string;
}

const ResumeColumn: React.FC<ResumeColumnProps> = ({
  data,
  setData,
  titles,
  sections,
  flex,
  bgColor,
  textColor,
  isLeft = false,
  droppableId,
}) => {
  const [showAddMenu, setShowAddMenu] = useState(false);

  // Initialize default sections
  useEffect(() => {
    const initialSections: ExtraSection[] = [];

    sections.forEach((sec) => {
      const exists = data.extraSections?.some(
        (s) =>
          s.isLeft === isLeft &&
          s.title ===
            (titles[sec] || sec.charAt(0).toUpperCase() + sec.slice(1))
      );

      if (!exists) {
        if (sec === "languages") {
          initialSections.push({
            id: Date.now() + Math.random(),
            type: "range",
            title: titles.languages || "Languages",
            languages: data.languagesList || [],
            isLeft,
          });
        } else {
          const val =
            typeof (data as any)[sec] === "string" ? (data as any)[sec] : "";
          initialSections.push({
            id: Date.now() + Math.random(),
            type: "text",
            title: titles[sec] || sec.charAt(0).toUpperCase() + sec.slice(1),
            value: val,
            isLeft,
          });
        }
      }
    });

    if (initialSections.length) {
      setData((prev) => ({
        ...prev,
        extraSections: [
          ...(prev.extraSections || []),
          ...initialSections.filter(
            (newSec) =>
              !(prev.extraSections || []).some(
                (s) => s.isLeft === newSec.isLeft && s.title === newSec.title
              )
          ),
        ],
      }));
    }
  }, []);

  const addSection = (type: "text" | "range") => {
    const newSection: ExtraSection =
      type === "text"
        ? {
            id: Date.now(),
            type,
            title: "Custom Text Field",
            value: "",
            isLeft,
          }
        : {
            id: Date.now(),
            type,
            title: "Custom Range Field",
            languages: [],
            isLeft,
          };
    setData((prev) => ({
      ...prev,
      extraSections: [...(prev.extraSections || []), newSection],
    }));
    setShowAddMenu(false);
  };

  const updateSection = (
    id: number,
    updated: { title?: string; value?: string; languages?: RangeBar[] }
  ) => {
    setData((prev) => ({
      ...prev,
      extraSections: prev.extraSections?.map((s) =>
        s.id === id ? { ...s, ...updated } : s
      ),
    }));
  };

  const removeSection = (id: number) => {
    setData((prev) => ({
      ...prev,
      extraSections: prev.extraSections?.filter((s) => s.id !== id),
    }));
  };

  const extraSections =
    data.extraSections?.filter((s) => s.isLeft === isLeft) || [];

  return (
    <div
      style={{
        flex,
        backgroundColor: bgColor,
        color: textColor,
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {/* DROPPABLE COLUMN */}
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ColumnSections
              columnId={isLeft ? "left" : "right"}
              sections={extraSections}
              updateSection={updateSection}
              removeSection={removeSection}
              bgColor={bgColor}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Add Section menu */}
      {showAddMenu ? (
        <AddSectionMenu
          addSection={addSection}
          onCancel={() => setShowAddMenu(false)}
        />
      ) : (
        <button
          onClick={() => setShowAddMenu(true)}
          style={{
            marginTop: "10px",
            padding: "8px",
            backgroundColor: "#0077cc",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          + Add Section
        </button>
      )}

      {/* Color pickers */}
      <ColumnColorPickers
        isLeft={isLeft}
        bgColor={bgColor}
        textColor={textColor}
        setData={setData}
      />
    </div>
  );
};

export default ResumeColumn;
