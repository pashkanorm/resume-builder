import React from "react";
import { markdownToHtml } from "../utils/markdownToHtml";

interface Props {
  title: string;
  text: string;
}

const SectionPreview: React.FC<Props> = ({ title, text }) => (
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
    <div
      style={{ 
        paddingTop: "8px",
        lineHeight: 1.5,
        wordSpacing: "0.2em"
      }}
      dangerouslySetInnerHTML={{ __html: markdownToHtml(text) }}
    />
  </section>
);

export default SectionPreview;
