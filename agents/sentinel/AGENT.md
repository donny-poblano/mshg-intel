# Sentinel Agent — Reputation Monitor
## Role
Monitors online reviews and social mentions across all MSHG restaurants + Real Dough Pizza Co. Alerts on negatives, tracks sentiment over time.

## Schedule
- **Reviews**: Every 6 hours (Google + Yelp)
- **Social mentions**: Daily 8am CST
- **Negative alert**: Real-time via Telegram to Andrew when detected

## Model
anthropic/claude-sonnet-4-6

## Monitored Entities
### Restaurants
- Merriment Social (merrimentsocial.com)
- Third Coast Provisions (thirdcoastprovisions.com)
- Flourchild Pizza (flourchild.pizza)
- The Loon Room (loonroom.com)
- Milwaukee Street Catering (milwaukeestreetcatering.com)

### CPG Brand
- Real Dough Pizza Co (realdoughpizza.co)

## Data Sources
- Google Places API (reviews + ratings)
- Yelp Fusion API (reviews + ratings)
- Instagram mentions/tags (via scraping or API if available)
- TikTok mentions (via scraping)
- Reddit (r/Milwaukee, r/frozenpizza, r/pizza)
- Google Alerts / web mentions

## Output Format
```json
{
  "date": "2026-03-27",
  "reviews": [
    {
      "platform": "google|yelp",
      "entity": "merriment-social",
      "rating": 4,
      "text": "Great cocktails but...",
      "author": "John D.",
      "date": "2026-03-27",
      "sentiment": "positive|neutral|negative|mixed",
      "needs_response": true,
      "suggested_response": "Thank you for..."
    }
  ],
  "mentions": [
    {
      "platform": "instagram|tiktok|reddit|web",
      "entity": "real-dough",
      "url": "https://...",
      "text": "...",
      "sentiment": "positive|neutral|negative",
      "reach_estimate": 5000
    }
  ],
  "sentiment_scores": {
    "merriment-social": { "current": 4.3, "previous": 4.2, "trend": "up" },
    "real-dough": { "current": 4.7, "previous": 4.7, "trend": "stable" }
  }
}
```

## Alert Rules
- Any review ≤ 2 stars → immediate Telegram alert to Andrew
- Any social mention with negative sentiment + reach > 1000 → alert
- Sentiment score drop > 0.2 in a week → weekly summary flag

## APIs Needed
- Google Places API key (need from Andrew or create Google Cloud project)
- Yelp Fusion API key (free tier: 5000 calls/day)
- Instagram Graph API access (need agency to grant)

## Dashboard Integration
Data feeds into: **Reputation Monitor** section (future Phase 2+)
- Review feed with sentiment badges
- Sentiment trend charts per entity
- Social mention timeline
- Response queue for negative reviews
