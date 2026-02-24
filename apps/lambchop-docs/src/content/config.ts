import { defineCollection, z } from "astro:content";

const components = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    description: z.string(),
    category: z.enum(["Primitives", "Data Display", "Charts", "Data Management", "Layout", "Marketing", "Animation"]),
    sourceFile: z.string(),
    storyId: z.string(),
  }),
});

export const collections = { components };
