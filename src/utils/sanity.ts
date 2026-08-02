import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'u0hd089u',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});
