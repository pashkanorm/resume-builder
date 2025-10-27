import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

const SectionPreview: React.FC<Props> = ({ title, children }) => (
  <section style={{ marginBottom: "16px" }}>
    <h2
      style={{
        fontSize: "16pt",
        borderBottom: "1px solid #000",
        width: "100%",
        marginBottom: "4px",
      }}
    >
      {title}
    </h2>
    <div>{children}</div>
  </section>
);

export default SectionPreview;
