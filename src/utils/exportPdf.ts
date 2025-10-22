import html2pdf from "html2pdf.js";

// Define the type manually (to avoid namespace error)
interface Html2PdfOptions {
  margin?: number | [number, number] | [number, number, number, number];
  filename?: string;
  image?: { type?: "jpeg" | "png" | "webp"; quality?: number };
  html2canvas?: {
    scale?: number;
    useCORS?: boolean;
    scrollY?: number;
    backgroundColor?: string;
    windowWidth?: number;
    windowHeight?: number;
  };
  jsPDF?: {
    unit?: string;
    format?: string | [number, number];
    orientation?: "portrait" | "landscape";
  };
}

export const exportPdf = (element: HTMLElement | null) => {
  if (!element) return;

  const originalBackground = element.style.backgroundColor;
  element.style.backgroundColor = "#ffffff";
  element.style.margin = "0";
  element.style.padding = "0";

  const opt: Html2PdfOptions = {
    margin: [0, 0, 0, 0],
    filename: "resume.pdf",
    image: { type: "jpeg", quality: 1.0 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      scrollY: 0,
      backgroundColor: "#ffffff",
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    },
    jsPDF: {
      unit: "px",
      format: [element.scrollWidth, element.scrollHeight],
      orientation: "portrait",
    },
  };

  html2pdf()
    .from(element)
    .set(opt)
    .save()
    .finally(() => {
      element.style.backgroundColor = originalBackground;
    });
};
