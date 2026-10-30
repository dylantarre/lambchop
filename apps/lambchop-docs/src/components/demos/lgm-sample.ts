/** Realistic sample data in the shape LGM dashboards and Ask Lambert answers use. */
export const sites = [
  { label: "Lambgoat", value: 3541.36 },
  { label: "The Needle Drop", value: 1239.9 },
  { label: "The Mosh Network", value: 312.4 },
  { label: "Metal Insider", value: 140.2 },
  { label: "Ghost Cult", value: 98.5 },
  { label: "Nu Metal Agenda", value: 52.1 },
  { label: "Melodic Mag", value: 16.3 },
  { label: "Breaking Scene Media", value: 1.4 },
];

export const days = Array.from({ length: 29 }, (_, i) => `2026-10-${String(i + 1).padStart(2, "0")}`);
export const dailyRevenue = [172, 78, 121, 99, 186, 262, 331, 298, 301, 212, 190, 281, 279, 214, 240, 262, 140, 108, 186, 172, 156, 226, 165, 103, 150, 188, 172, 170, 74];

export const articleRows: (string | number)[][] = [
  ["Homepage", "Staff", "Lambgoat", 911.3, 210207],
  ["Lamb Of God's Randy Blythe thinks the band's logo looked like it could be from a restaurant menu", "David Truax", "Lambgoat", 164.35, 15241],
  ["Furnace Fest merch seemingly designed by AI, sticker placed over another festival's mug sold for $50", "David Truax", "Lambgoat", 160.82, 15159],
  ["News", "Staff", "Lambgoat", 154.77, 32278],
  ["I Ranked Every Nine Inch Nails Album", "Anthony Fantano", "The Needle Drop", 81.68, 4265],
  ["Dissecting EKA's Top 200 Emo Albums of All Time", "Brandon Cortez", "The Needle Drop", 68.81, 5428],
  ["Video - Metallica Make History With Opening Night Of Sphere Residency", "Staff", "Metal Insider", 62.84, 4103],
];
