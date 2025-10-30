import jsPDF from "jspdf";

interface ExportButtonProps {
  elementId: string;
  buttonText: string;
  openInNewTab?: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({ elementId, buttonText, openInNewTab = false }) => {
  const handleClick = () => {
    const doc = new jsPDF("p", "pt", "a4");

    const element = document.getElementById(elementId);
    if (!element) return;

    doc.html(element, {
      callback: (pdf) => {
        if (openInNewTab) {
          // Generate blob and open in new tab
          const blob = pdf.output("bloburl");
          window.open(blob, "_blank");
        } else {
          pdf.save("resume.pdf");
        }
      },
      x: 20,
      y: 20,
      html2canvas: { scale: 0.57 },
    });
  };

  return <button onClick={handleClick}>{buttonText}</button>;
};

export default ExportButton;
