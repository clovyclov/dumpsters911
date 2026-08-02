import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'u0hd089u',
  dataset: 'production',
  token: 'skxj4wV4U2bstV1EyF6SpOOc8yyZhNHgddSbquEO4Rfyd6xf3xyEebxby43NFx8btfrvHOpYBIDipsXmOGYcuFtHWcKJQB4cKbsShWEYVe02P3tKtCFAGD1ADzKf7OW2X0oesuTdEUrR2UPA5SwTojUGrcPUHEeX4mF1sFaYigkPUHKg3RDo',
  useCdn: false,
  apiVersion: '2024-01-01',
});

const articles = [
  {
    _type: 'post',
    _id: 'post-how-to-choose-dumpster-size-metro-detroit',
    title: 'How to Choose the Right Dumpster Size for Your Home Remodel in Metro Detroit',
    slug: { _type: 'slug', current: 'how-to-choose-dumpster-size-metro-detroit' },
    description: 'Avoid overpaying or underestimating your waste volume. Learn how to pick between 10, 15, and 20-yard dumpsters for residential projects in Wayne, Oakland, and Macomb counties.',
    pubDate: '2026-07-29T12:00:00Z',
    author: 'Dumpsters 911 Team',
    category: 'Dumpster Sizing',
    excerpt: 'Avoid overpaying or underestimating your waste volume. Learn how to pick between 10, 15, and 20-yard dumpsters for residential projects in Wayne, Oakland, and Macomb counties.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Renting a dumpster in Metro Detroit doesn\'t have to be complicated. Whether you are tackling a kitchen remodel in Royal Oak, clearing out a basement in Livonia, or tearing off an old shingle roof in Sterling Heights, selecting the correct container size is the single most important decision for keeping your project on budget.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '10-Yard Dumpsters: Compact & Driveway Friendly' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Great for small bathroom remodels, garage cleanouts, heavy masonry, or asphalt shingle tear-offs. Fits easily on standard residential driveways in Dearborn and Warren without blocking sidewalk access.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '15-Yard Dumpsters: The Homeowner Favorite' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Ideal for medium kitchen remodels, multi-room flooring removal, deck teardowns, and whole-house decluttering in Oakland County homes.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '20-Yard Dumpsters: Maximum Residential Capacity' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Best for full home renovations, commercial cleanouts, major disaster restoration, and estate cleanouts across Wayne, Oakland, and Macomb counties.' }]
      }
    ]
  },
  {
    _type: 'post',
    _id: 'post-commercial-vs-residential-dumpster-rentals',
    title: 'Commercial vs. Residential Roll-Off Dumpster Rentals: What You Need to Know in Michigan',
    slug: { _type: 'slug', current: 'commercial-vs-residential-dumpster-rentals' },
    description: 'Comparing commercial and residential dumpster rentals in Michigan. Learn key differences in sizing, permit rules, weight limits, and rental periods.',
    pubDate: '2026-07-28T10:00:00Z',
    author: 'Dumpsters 911 Team',
    category: 'Commercial Waste',
    excerpt: 'Comparing commercial and residential dumpster rentals in Michigan. Learn key differences in sizing, permit rules, weight limits, and rental periods.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Whether managing a commercial construction jobsite in Southfield or doing a residential cleanout in Canton, understanding the operational differences between commercial and residential dumpster rentals ensures seamless compliance and zero unexpected overage charges.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Key Permit Differences in Metro Detroit Municipalities' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Residential dumpsters placed on private driveways rarely require municipal permits. However, commercial drop-offs placed on public streets or right-of-way zones in Detroit or Ann Arbor require municipal right-of-way street placement permits.' }]
      }
    ]
  },
  {
    _type: 'post',
    _id: 'post-yard-debris-landscaping-disposal-tips-michigan',
    title: 'Top 5 Yard Debris & Landscaping Disposal Tips for Michigan Homeowners',
    slug: { _type: 'slug', current: 'yard-debris-landscaping-disposal-tips-michigan' },
    description: 'Essential yard waste and landscaping disposal rules for Michigan. How to handle soil, tree branches, sod, concrete, and organic debris cleanly.',
    pubDate: '2026-07-27T09:00:00Z',
    author: 'Dumpsters 911 Team',
    category: 'Landscaping',
    excerpt: 'Essential yard waste and landscaping disposal rules for Michigan. How to handle soil, tree branches, sod, concrete, and organic debris cleanly.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Spring landscaping overhauls and autumn yard cleanups in Michigan generate substantial organic debris. Under Michigan Department of Environment, Great Lakes, and Energy (EGLE) guidelines, yard waste requires specific disposal protocols to protect local landfills.' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '1. Separate Heavy Soil & Sod from Lightweight Brush' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '2. Check Weight Capacities for Heavy Concrete Pavers' }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: '3. Utilize Roll-Off Dumpsters for Large Tree Removal Projects' }]
      }
    ]
  }
];

async function migrate() {
  console.log('Migrating articles to Sanity dataset production...');
  for (const doc of articles) {
    const res = await client.createOrReplace(doc);
    console.log(`Successfully migrated: ${res.title} (ID: ${res._id})`);
  }
  console.log('Migration completed successfully!');
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
