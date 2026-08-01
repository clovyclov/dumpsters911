// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // Client ID and Read-Only Token from app.tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "c5bb6ad6-5c8b-4da9-bd28-90df02a933c8",
  token: process.env.TINA_TOKEN || "4c06d92e568e1012046c613d31f408b94a9f6454",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "assets/images",
      publicFolder: "public"
    }
  },
  // Schema for blog content
  schema: {
    collections: [
      {
        name: "post",
        label: "Blog Posts",
        path: "content/posts",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Meta Description",
            required: true
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Publish Date",
            required: true
          },
          {
            type: "string",
            name: "author",
            label: "Author",
            defaultValue: "Dumpsters 911 Team"
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image"
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [
              "Home Improvement",
              "Commercial Waste",
              "Landscaping",
              "Dumpster Sizing",
              "Metro Detroit News"
            ]
          },
          {
            type: "string",
            name: "excerpt",
            label: "Post Excerpt",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
