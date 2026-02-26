/** Per-site brand colors for LGM network sites. */
export interface SiteBrand {
  bg: string;
  text: string;
}

export const siteBrandColors: Record<string, SiteBrand> = {
  lambgoat:                { bg: "#1a1a1a", text: "#f5c518" },
  "the needle drop":       { bg: "#fcd34d", text: "#1a1a1a" },
  "nu metal agenda":       { bg: "#6b21a8", text: "#ffffff" },
  "melodic mag":           { bg: "#0ea5e9", text: "#ffffff" },
  "no echo":               { bg: "#dc2626", text: "#ffffff" },
  "ghost cult":            { bg: "#15803d", text: "#ffffff" },
  "metal insider":         { bg: "#374151", text: "#e5e7eb" },
  "the mosh network":      { bg: "#ea580c", text: "#ffffff" },
  "breaking scene media":  { bg: "#2563eb", text: "#ffffff" },
};

/** Look up brand colors by site name (case-insensitive). */
export function getSiteBrand(siteName: string): SiteBrand | undefined {
  return siteBrandColors[siteName.toLowerCase()];
}
