# MSHG Intel Dashboard — Build Spec

## What This Is
A Next.js dashboard for Milwaukee Street Hospitality Group + Real Dough Pizza Co. that aggregates marketing analytics, competitive intel, and restaurant operations data into one clean interface. Replaces Discord-based content pipeline.

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** SQLite via better-sqlite3 (local file, simple, no external service needed for prototype)
- **Auth:** Simple password-based (like MSHG admin dashboard — password: `mkestreet2026`)
- **Hosting:** Vercel
- **Data ingestion:** Scheduled scrape of Whatagraph shared report

## Data Source
Whatagraph shared report: `https://reports.live/shared/VgRD05mQe0Y5raN7#tab:1011083`

This report contains 6 tabs of Real Dough Pizza Co. marketing data:
- **Meta Ads** — Campaign metrics: Clicks, CPC, CTR, Reach, Impressions, Spend, CPM, demographics
- **Google Ads** — Campaign breakdown: Clicks, CPC, CTR, Impressions, Spend by campaign name
- **Facebook** — Followers, engagement, reactions (Like/Love/Wow/Haha/Anger), post-level data (Reach, Reactions, Engagement, Engagement Rate, Link Clicks, Comments, Shares), Reels (Reach, Avg View Time)
- **Instagram** — Followers, demographics, post-level (Reach, Engagement, Engagement Rate), Stories (Impressions, Reach, Profile Visits, Replies, Forwards), Reels (Reach, Avg Watch Time)
- **YouTube** — Per-video: Views, Avg View Duration, Avg View %, Watch Minutes, Likes, Comments, Shares, Subscriber Gains/Losses
- **TikTok** — Per-video: Views, Avg Time Watched, Likes

### Important DOM Notes
- The report is a Whatagraph SPA at reports.live
- Content is inside a scrollable `div.layout-app__content` container (NOT the main page body)
- scrollHeight ~5000-6000px per tab, clientHeight ~876px — must scroll the container
- Tabs are `span.font-wg-font` elements — click to switch
- Post-level data is BELOW the fold on Instagram and Facebook tabs — must scroll down
- Download button offers PDF and Excel (.xlsx) export

## Pages / Sections

### 1. Overview (landing page after login)
- Executive summary cards: Total ad spend, total reach, follower growth, top performing post
- Sparkline trends for key metrics (last 30 days)
- Quick links to each section

### 2. Ad Performance
- Meta Ads + Google Ads combined view
- Spend, CPC, CTR, CPM, Reach, Impressions
- Campaign breakdown table (Google Ads campaigns: NB, Branded, Competitors)
- Demographics breakdown (gender, age from Meta)
- Trend charts over time

### 3. Content Performance
- Cross-platform post grid: shows all posts from FB, IG, YouTube, TikTok
- Each post card: thumbnail (if available), caption snippet, platform icon, reach, engagement, engagement rate
- Sortable by: engagement rate, reach, recency
- Filterable by: platform, date range
- "Top Performers" highlight section
- Reels/Stories breakdown for IG and FB

### 4. Audience
- Follower counts across all platforms with growth trends
- Instagram demographics (gender, age breakdown)
- YouTube subscriber gains/losses

### 5. Market Intel (replaces Scout Discord posts)
- This section will be populated by the refactored Scout agent later
- For now, just show a placeholder page with "Coming soon — competitive intelligence"

## Design
- Clean, modern dashboard aesthetic
- Dark sidebar navigation, light content area
- Brand colors: Navy (#1a1a2e), Gold (#f4a81d), Cream/White content area
- Mobile responsive
- Font: Inter or system font stack
- Cards with subtle shadows, rounded corners
- Sparklines/mini charts using a lightweight chart library (recharts or chart.js)

## Auth
- Single password gate on login page (same pattern as MSHG admin)
- Password: `mkestreet2026` (env var override via `DASHBOARD_PASSWORD`)
- No user accounts needed for prototype
- Cookie-based session after login

## Data Architecture
For the prototype, use a simple JSON file or SQLite database that stores scraped data.
Schema should support:
- `snapshots` table: date, tab/platform, raw JSON blob of all metrics for that tab
- `posts` table: platform, post_url, caption, thumbnail_url, reach, engagement, engagement_rate, views, likes, comments, shares, date_posted, date_scraped
- `ad_metrics` table: platform (meta/google), date, spend, clicks, cpc, ctr, impressions, reach, cpm
- `audience` table: platform, date, followers, new_followers, unfollows, demographics_json

## Prototype Scope (Phase 1)
1. ✅ Next.js app with Tailwind, deployed to Vercel
2. ✅ Login page with password auth
3. ✅ Dashboard layout (sidebar nav + content area)
4. ✅ All 5 pages/sections with proper UI
5. ✅ Seed with REAL data from the Whatagraph report (hardcoded/JSON for prototype — scraper comes in Phase 2)
6. ✅ Mobile responsive
7. ❌ NOT building the scraper agent yet
8. ❌ NOT building the Scout/market intel section yet
9. ❌ NOT building the Toast/operations section yet

## Vercel Deployment
- Repo: `donny-poblano/mshg-intel` on GitHub (create if needed)
- Auto-deploy from main branch
- Domain: TBD (default Vercel URL fine for prototype)
