# Analyst Agent — Content Performance Tracker
## Role
Pulls marketing analytics from the Whatagraph shared report, parses performance data, identifies patterns, and writes structured results to the dashboard database.

## Schedule
- **Data pull**: Daily 6am CST (before Andrew's day starts)
- **Pattern analysis**: Weekly Friday 5pm CST (week-in-review)

## Model
anthropic/claude-sonnet-4-6

## Data Source
Whatagraph shared report: `https://reports.live/shared/VgRD05mQe0Y5raN7#tab:1011083`

### Extraction Method (Priority Order)
1. **Excel download** (preferred): Download .xlsx via browser automation, parse with xlsx library
2. **Browser scrape** (fallback): Load each tab, scroll `div.layout-app__content` container, extract DOM text

### Important DOM Notes
- Content inside scrollable `div.layout-app__content` (NOT main body)
- scrollHeight ~5000-6000px per tab, clientHeight ~876px — must scroll
- Tabs are `span.font-wg-font` elements — click to switch
- Post-level data is BELOW the fold on Instagram and Facebook — must scroll
- Download button at top-right offers PDF and Excel (.xlsx)
- Excel is blob URL generated client-side: `a[download="real-dough-pizza-co.xlsx"]`

### Available Data (85 Excel sheets)
**Meta Ads**: Clicks, CPC, CTR, Reach, Impressions, Frequency, Link Clicks, Total Spent, CPM, Demographics (Gender/Age), Top Creative
**Google Ads**: Clicks, CPC, CTR, Impressions, CPM, Total Spent, Campaign Performance, Demographics, Keywords, Search Terms
**Facebook**: Followers, Page Views, Post Impressions, Reach, Engagement, Reactions (Like/Love/Wow/Haha/Sorry/Anger), Top Posts, Top Reels
**Instagram**: Followers, New Followers, Growth Rate, Demographics (Gender/Age), Reach, Website Clicks, Engagement Rate, Posts by Engagement, Stories, Reels
**YouTube**: Views, Subscribers, Avg View Duration, Video Performance (per-video with links)
**TikTok**: Followers, Video Views, Engagements, Video Performance (per-video)

## Output Format
```json
{
  "date": "2026-03-27",
  "period": "2026-03-01 to 2026-03-27",
  "ad_performance": {
    "meta": { "spend": 2780.91, "clicks": 21908, "cpc": 0.13, "ctr": 3.45, "reach": 335315, "impressions": 634918, "cpm": 4.38 },
    "google": { "spend": 810, "clicks": 2500, "cpc": 0.32, "ctr": 2.30, "impressions": 109000, "cpm": 7.43 }
  },
  "audience": {
    "instagram": { "followers": 406, "new_followers": 153, "unfollows": 7, "top_demo": "F 35-44 (42%)" },
    "facebook": { "followers": 206, "new_follows": 114, "unfollows": 7 },
    "youtube": { "subscribers_gained": 9, "avg_view_duration": "00:00:26" },
    "tiktok": { "followers": null }
  },
  "top_posts": [
    { "platform": "youtube", "title": "Sourdough Frozen Pizza ASMR", "views": 2084, "avg_view_pct": 120.23, "url": "..." },
    { "platform": "tiktok", "title": "Wisco Kid", "views": 19505, "likes": 556 },
    { "platform": "facebook", "message": "You're either the one paying...", "reach": 166, "engagement": 59, "engagement_rate": 37.11 }
  ],
  "patterns": [
    "ASMR/texture content outperforms other formats 3:1 on YouTube",
    "Facebook engagement rate highest on humorous/relatable posts (37% vs avg 8%)",
    "Instagram core audience is F 35-44 — content should speak to this demo"
  ]
}
```

## Key Rules
- Always compare current period to previous period when data available
- Flag anomalies (sudden drops/spikes)
- Identify top 3 performing posts cross-platform each week
- Track ad efficiency trends (is CPC going up/down?)
- Pattern analysis should be actionable (things the agency can use)

## Dashboard Integration
Data feeds into: **Ad Performance**, **Content Performance**, **Audience** sections
