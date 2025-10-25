export function invertHexColor(hex: string): string {
  // Remove # if present
  hex = hex.replace("#", "");
  if (hex.length === 8) hex = hex.slice(0, 6); // ignore alpha

  const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16).padStart(2, "0");
  const g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16).padStart(2, "0");
  const b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16).padStart(2, "0");

  return `#${r}${g}${b}`;
}
