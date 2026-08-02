import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'u0hd089u',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
});

async function run() {
  const posts = await client.fetch('*[_type == "post"]{title, _id, _updatedAt, "slug": slug.current}');
  console.log('Sanity Live Posts count:', posts.length);
  console.log(JSON.stringify(posts, null, 2));
}

run();
