import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    excerpt: z.string().optional(),
    categories: z.array(z.string()).optional(),
    permalink: z.string().optional(),
  }),
});

export const collections = {
  posts,
};
