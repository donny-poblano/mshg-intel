#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports -- Standalone CommonJS Node CLI. */
/**
 * Fetch Google Places reviews for Merriment hospitality-group locations.
 * Usage: GOOGLE_PLACES_API_KEY=xxx node scripts/fetch-reviews.js [--output /path/reviews.json]
 * Default output remains data/reviews.json. Failures never replace the last snapshot.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
if (!API_KEY || !API_KEY.trim()) {
  console.error('Error: GOOGLE_PLACES_API_KEY not set');
  process.exit(1);
}
const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== '--output' || !args[1])) {
  console.error('Usage: node scripts/fetch-reviews.js [--output /path/reviews.json]');
  process.exit(1);
}
const outPath = args.length ? path.resolve(args[1]) : path.join(__dirname, '..', 'data', 'reviews.json');

// Real Dough is a CPG brand, not a physical location — no Google Places listing.
const RESTAURANTS = [
  { name: 'Merriment Social', slug: 'merriment-social', query: 'Merriment Social Milwaukee' },
  { name: 'Third Coast Provisions', slug: 'third-coast', query: 'Third Coast Provisions Milwaukee' },
  { name: 'Flourchild Pizza', slug: 'flourchild', query: 'Flourchild Pizza Milwaukee' },
  { name: 'The Loon Room', slug: 'loon-room', query: 'The Loon Room Milwaukee' },
];

async function placesRequest(url) {
  // Covers response headers AND body; no unbounded retry or credential-bearing logs.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`Google Places HTTP ${res.status}`);
    const data = await res.json();
    if (!data || data.status !== 'OK') throw new Error('Google Places returned non-OK status');
    return data;
  } catch {
    // Never print a fetch error URL (the Google API key is a query parameter).
    if (controller.signal.aborted) throw new Error('Google Places request timed out');
    throw new Error('Google Places request failed (HTTP/API/network/JSON error)');
  } finally {
    clearTimeout(timer);
  }
}

async function searchPlace(query) {
  const data = await placesRequest(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${encodeURIComponent(API_KEY)}`);
  if (!Array.isArray(data.results) || !data.results.length ||
      typeof data.results[0].place_id !== 'string' || !data.results[0].place_id) {
    throw new Error('Google Places search returned no valid place');
  }
  return data.results[0];
}

async function getPlaceDetails(placeId) {
  const data = await placesRequest(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(placeId)}&fields=name,rating,user_ratings_total,reviews&key=${encodeURIComponent(API_KEY)}`);
  const d = data.result;
  if (!d || typeof d.name !== 'string' || !d.name ||
      (d.rating != null && (!Number.isFinite(d.rating) || d.rating < 0 || d.rating > 5)) ||
      (d.user_ratings_total != null && (!Number.isInteger(d.user_ratings_total) || d.user_ratings_total < 0)) ||
      (d.reviews != null && !Array.isArray(d.reviews))) {
    throw new Error('Google Places returned invalid details');
  }
  for (const r of d.reviews || []) {
    if (!r || !Number.isInteger(r.rating) || r.rating < 1 || r.rating > 5 ||
        !Number.isFinite(r.time) || typeof r.author_name !== 'string' ||
        (r.text != null && typeof r.text !== 'string')) {
      throw new Error('Google Places returned invalid review');
    }
  }
  return d;
}

async function main() {
  const results = {};
  const now = new Date().toISOString();
  for (const restaurant of RESTAURANTS) {
    console.log(`Searching for: ${restaurant.name}...`);
    const place = await searchPlace(restaurant.query);
    const details = await getPlaceDetails(place.place_id);
    results[restaurant.slug] = {
      name: details.name,
      placeId: place.place_id,
      rating: details.rating ?? null,
      totalRatings: details.user_ratings_total ?? 0,
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
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  // Same-directory rename is atomic; partial API success is never published.
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const temporary = `${outPath}.${process.pid}.${crypto.randomUUID()}.tmp`;
  try {
    fs.writeFileSync(temporary, JSON.stringify(results, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
    fs.renameSync(temporary, outPath);
  } finally {
    if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
  }
  console.log(`Written to ${outPath}`);
}

const runTimer = setTimeout(() => {
  console.error('Error: review fetch exceeded 90-second run limit');
  process.exit(1);
}, 90000);
main().catch(err => {
  console.error(`Error: ${err.message}`);
  process.exitCode = 1;
}).finally(() => clearTimeout(runTimer));
