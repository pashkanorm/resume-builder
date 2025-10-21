import React from "react";
import EditableTitle from "./EditableTitle";

interface SectionProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, onTitleChange, children }) => {
  return (
    <div>
      <EditableTitle title={title} onChange={onTitleChange} />
      {children}
    </div>
  );
};

export default Section;
