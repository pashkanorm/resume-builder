import React from "react";

interface Props {
  name: string;
  level: number;
  bgColor: string;
}

const RangeBarPreview: React.FC<Props> = ({ name, level, bgColor }) => (
  <div style={{ marginBottom: "10px" }}>
    <p style={{ margin: 0, fontWeight: 500 }}>{name}</p>
    <div
      style={{
        width: "100%",
        height: "6px",
        backgroundColor: "#ddd",
        borderRadius: "3px",
        marginTop: "4px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${(level / 5) * 100}%`,
          height: "100%",
          backgroundColor: bgColor,
          borderRadius: "3px",
        }}
      />
    </div>
  </div>
);

export default RangeBarPreview;
