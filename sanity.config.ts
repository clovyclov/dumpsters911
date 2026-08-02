import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

export default defineConfig({
  name: 'dumpsters911',
  title: 'Dumpsters 911 Content Studio',
  projectId: 'u0hd089u',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [
      {
        name: 'post',
        title: 'Blog Post',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (Rule: any) => Rule.required(),
          },
          {
            name: 'description',
            title: 'Meta Description',
            type: 'text',
            rows: 2,
          },
          {
            name: 'pubDate',
            title: 'Publish Date',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
          },
          {
            name: 'author',
            title: 'Author',
            type: 'string',
            initialValue: 'Dumpsters 911 Team',
          },
          {
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: { hotspot: true },
          },
          {
            name: 'heroImageUrl',
            title: 'Hero Image URL',
            type: 'string',
          },
          {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
              list: [
                'Home Improvement',
                'Commercial Waste',
                'Landscaping',
                'Dumpster Sizing',
                'Metro Detroit News',
              ],
            },
          },
          {
            name: 'excerpt',
            title: 'Post Excerpt',
            type: 'text',
            rows: 3,
          },
          {
            name: 'bodyHtml',
            title: 'Full Article Content (HTML & Tables)',
            type: 'text',
            rows: 15,
          },
          {
            name: 'body',
            title: 'Body Content (PortableText Block)',
            type: 'array',
            of: [
              { type: 'block' },
              {
                type: 'image',
                options: { hotspot: true },
              },
            ],
          },
        ],
      },
    ],
  },
});
