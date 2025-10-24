import React from "react";

interface ColorSquareProps {
  color: string;
  onChange: (color: string) => void;
  label?: string;
}

const ColorSquare: React.FC<ColorSquareProps> = ({ color, onChange, label }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "40px", height: "40px", cursor: "pointer" }}
      />
      {label && <div>{label}</div>}
    </div>
  );
};

export default ColorSquare;
