import React from "react";
import Section from "./Section";

interface ArraySectionProps<T extends { id: string }> {
  title: string;
  onTitleChange: (newTitle: string) => void;
  items: T[];
  onChange: (newItems: T[]) => void;
  addNewItem: () => T;
  renderItem: (item: T, index: number, updateItem: (newItem: T) => void) => React.ReactNode;
}

export default function ArraySection<T extends { id: string }>({
  title,
  onTitleChange,
  items,
  onChange,
  addNewItem,
  renderItem,
}: ArraySectionProps<T>) {
  const handleUpdateItem = (index: number, newItem: T) => {
    const updated = [...items];
    updated[index] = newItem;
    onChange(updated);
  };

  return (
    <Section title={title} onTitleChange={onTitleChange}>
      {items.map((item, i) =>
        renderItem(item, i, (newItem) => handleUpdateItem(i, newItem))
      )}
      <button
        onClick={() => onChange([...items, addNewItem()])}
        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-all"
      >
        + Add
      </button>
    </Section>
  );
}
