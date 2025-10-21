import html2pdf from "html2pdf.js";

type Options = {
  filename?: string;
  margin?: number;
  imageType?: 'jpeg' | 'png';
  jsPDFUnit?: 'pt'|'mm'|'cm'|'in';
  jsPDFFormat?: string;
};

export function exportElementToPdf(element: HTMLElement, options: Options = {}) {
  const opt: any = {
    margin: options.margin ?? 10,
    filename: options.filename ?? "document.pdf",
    image: { type: options.imageType ?? 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
    jsPDF: { unit: options.jsPDFUnit ?? 'mm', format: options.jsPDFFormat ?? 'a4', orientation: 'portrait' }
  };
  return html2pdf().set(opt).from(element).save();
}
