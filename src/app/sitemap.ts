import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://cube.run/",
      lastModified: new Date("2026-10-07T00:00:00Z"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
