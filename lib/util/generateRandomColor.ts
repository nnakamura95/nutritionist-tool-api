export const hexColors: string[] = [
  "#84c215",
  "#ecdae1",
  "#9236aa",
  "#8f9156",
  "#d7799f",
  "#734704",
  "#969149",
  "#9aead3",
  "#8dd5d8",
  "#adf87b",
  "#7cb29d",
  "#4197ee",
  "#865e80",
  "#690d5d",
  "#d113df",
  "#9d14e3",
  "#129092",
  "#12febb",
  "#d7e9f3",
  "#c4e840",
  "#1fe688",
];

export function generateRandomColor() {
  const randomColorIndex = Math.floor(Math.random() * hexColors.length);
  return hexColors[randomColorIndex];
}

export function isSystemHexColor(value: string) {
  return hexColors.includes(value);
}