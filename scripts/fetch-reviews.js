#!/usr/bin/env node
/**
 * Fetch Google Places reviews for Real Dough Pizza Co. restaurants
 * Usage: GOOGLE_PLACES_API_KEY=xxx node scripts/fetch-reviews.js
 */

const fs = require('fs');
const path = require('path');

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!API_KEY) {
  console.error('Error: GOOGLE_PLACES_API_KEY not set');
  process.exit(1);
}

// Real Dough and MSHG restaurant Place IDs
// These need to be looked up once via Places API text search
const RESTAURANTS = [
  // Real Dough is a CPG brand, not a physical location — no Google Places listing
  // { name: 'Real Dough Pizza Co', slug: 'real-dough', query: 'Real Dough Pizza Co Wisconsin' },
  { name: 'Merriment Social', slug: 'merriment-social', query: 'Merriment Social Milwaukee' },
  { name: 'Third Coast Provisions', slug: 'third-coast', query: 'Third Coast Provisions Milwaukee' },
  { name: 'Flourchild Pizza', slug: 'flourchild', query: 'Flourchild Pizza Milwaukee' },
  { name: 'The Loon Room', slug: 'loon-room', query: 'The Loon Room Milwaukee' },
];

async function searchPlace(query) {
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.results && data.results.length > 0) {
    return data.results[0];
  }
  return null;
}

async function getPlaceDetails(placeId) {
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.result || null;
}

async function main() {
  const results = {};
  const now = new Date().toISOString();

  for (const restaurant of RESTAURANTS) {
    console.log(`Searching for: ${restaurant.name}...`);
    const place = await searchPlace(restaurant.query);
    
    if (!place) {
      console.log(`  Not found: ${restaurant.name}`);
      results[restaurant.slug] = { error: 'Place not found', query: restaurant.query };
      continue;
    }

    console.log(`  Found: ${place.name} (${place.place_id})`);
    const details = await getPlaceDetails(place.place_id);
    
    if (!details) {
      console.log(`  No details for: ${restaurant.name}`);
      results[restaurant.slug] = { error: 'No details', placeId: place.place_id };
      continue;
    }

    results[restaurant.slug] = {
      name: details.name,
      placeId: place.place_id,
      rating: details.rating || null,
      totalRatings: details.user_ratings_total || 0,
      reviews: (details.reviews || []).map(r => ({
        author: r.author_name,
        rating: r.rating,
        text: r.text,
        time: r.time,
        relativeTime: r.relative_time_description,
        language: r.language,
      })),
      fetchedAt: now,
    };

    console.log(`  Rating: ${details.rating} (${details.user_ratings_total} reviews), got ${(details.reviews || []).length} review excerpts`);
    
    // Rate limit - 100ms between requests
    await new Promise(r => setTimeout(r, 100));
  }

  const outPath = path.join(__dirname, '..', 'data', 'reviews.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\nWritten to ${outPath}`);
}

main().catch(console.error);
