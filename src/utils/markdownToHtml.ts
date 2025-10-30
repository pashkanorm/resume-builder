export function markdownToHtml(text: string) {
  if (!text) return "";

  let html = text;

  // Bold + Italic combined first
  html = html.replace(/\*\*_(.*?)_\*\*/g, "<b><i>$1</i></b>");
  html = html.replace(/\*\*\+\+(.*?)\+\+\*\*/g, "<b><u>$1</u></b>");
  html = html.replace(/_\+\+(.*?)\+\+_/g, "<i><u>$1</u></i>");
  html = html.replace(/\*\*_\+\+(.*?)\+\+_\*\*/g, "<b><i><u>$1</u></i></b>");

  // Bold: **text**
  html = html.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  // Italic: _text_
  html = html.replace(/_(.*?)_/g, "<i>$1</i>");

  // Underline: ++text++
  html = html.replace(/\+\+(.*?)\+\+/g, "<u>$1</u>");

  // Convert line breaks
  html = html.replace(/\n/g, "<br/>");

  return html;
}
