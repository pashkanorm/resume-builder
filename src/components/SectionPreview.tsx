import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

const SectionPreview: React.FC<Props> = ({ title, children }) => (
  <section style={{ marginBottom: "20px" }}>
    <h2
      style={{
        fontSize: "16pt",
        borderBottom: "1px solid #000",
        display: "inline-block",
        marginBottom: "4px",
      }}
    >
       {title}
    
    </h2>
    <div style={{ paddingTop: "8px" }}>{children}</div>
  </section>
);

export default SectionPreview;
