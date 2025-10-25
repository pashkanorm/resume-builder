import React from "react";
import TextareaSection from "./TextareaSection";
import EditableTitle from "./EditableTitle";

interface EditableSectionProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  children?: React.ReactNode;
  isTextarea?: boolean;
}

const EditableSection: React.FC<EditableSectionProps> = ({
  title,
  onTitleChange,
  value = "",
  onChange = () => {},
  placeholder = "",
  children,
  isTextarea = true,
}) => {
  return (
    <div>
      <EditableTitle title={title} onChange={onTitleChange} />      
      <TextareaSection
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isTextarea={isTextarea}
      >
        {children}
      </TextareaSection>
    </div>
  );
};

export default EditableSection;
