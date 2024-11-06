import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  base: "/notes-astro/",
  integrations: [
    starlight({
      title: "My Docs",
      social: {
        github: "https://github.com/harsh-m-patil",
      },
      sidebar: [
        {
          label: "Notes",
          autogenerate: { directory: "notes" },
        },
        {
          label: "MERN Stack",
          autogenerate: { directory: "MERN Stack" },
        },
        //{
        //  label: "Guides",
        //  items: [
        //    // Each item here is one entry in the navigation menu.
        //    { label: "Example Guide", slug: "guides" },
        //  ],
        //},
        {
          label: "References",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
