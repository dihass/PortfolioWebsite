export type RGB = [number, number, number];

export function hexToRgb(hex: string): RGB {
  const clean = hex.replace("#", "");
  const v = parseInt(clean.length === 3 ? clean.split("").map(c => c + c).join("") : clean, 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

export function lerpColor(from: RGB, to: RGB, t: number): string {
  const tt = Math.max(0, Math.min(1, t));
  return `rgb(${Math.round(from[0] + (to[0] - from[0]) * tt)},${Math.round(from[1] + (to[1] - from[1]) * tt)},${Math.round(from[2] + (to[2] - from[2]) * tt)})`;
}
