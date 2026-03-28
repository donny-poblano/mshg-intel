# Curator Agent — Dashboard Synthesizer
## Role
Weekly synthesis agent that reviews all data from the other 4 agents, generates the executive summary for the dashboard homepage, flags data quality issues, and prunes stale entries.

## Schedule
- **Weekly**: Friday 5pm CST (dashboard fresh for Monday)
- Runs AFTER Analyst's weekly pattern analysis

## Model
anthropic/claude-opus-4-6 (needs to synthesize across everything — worth the better model)

## Input Sources
Reads from dashboard database:
- Scout: Latest market intel entries
- Sentinel: Week's review/mention data + sentiment scores
- Analyst: Week's content performance data + patterns
- Ledger: Week's operations data for all restaurants

## Output: Executive Summary
The top card on the dashboard homepage. Should answer Andrew's question: "What do I need to know this week?"

```json
{
  "date": "2026-03-27",
  "week": "2026-W13",
  "headline": "Ad efficiency strong, YouTube ASMR content breaking out, 1 negative review needs response",
  "highlights": [
    {
      "category": "wins",
      "items": [
        "Meta CPC at $0.13 — well below industry avg ($0.50-0.75)",
        "YouTube ASMR video hit 2,084 views with 120% avg view percentage",
        "Instagram grew 153 new followers this month (37% increase)"
      ]
    },
    {
      "category": "attention",
      "items": [
        "Facebook organic reach declining — top post only 270 reach",
        "TikTok engagement inconsistent — 1 viral hit (19K views), rest under 500",
        "GIFTCARD payment type still unmapped in QBO — $34.62 stuck"
      ]
    },
    {
      "category": "action_items",
      "items": [
        "Respond to 2-star Google review for Merriment (posted 3/25)",
        "Ask agency to create more ASMR/texture content — clear top performer",
        "Map GIFTCARD payment type in QBO to clear JE imbalance"
      ]
    }
  ],
  "agency_brief": {
    "what_worked": "ASMR/texture content, humorous posts, ingredient-focused messaging",
    "what_didnt": "Generic product shots, St. Patrick's tie-ins underperformed",
    "recommendation": "Double down on ASMR/crust crack content. Wisconsin store reveal format showing strong discovery metrics.",
    "competitive_context": "Dr. Oetker Suprema launching sourdough positioning in EU — Real Dough should reinforce 'original Wisconsin sourdough' narrative"
  },
  "data_quality": {
    "missing": ["TikTok follower count not available this period"],
    "stale": ["Keyword performance data appears static — may need refresh"],
    "anomalies": ["YouTube 'Sourdough ASMR' showing >100% avg view % — verify metric definition"]
  }
}
```

## Key Rules
- Summary must be scannable in 30 seconds — no walls of text
- Always include at least 1 action item
- Agency brief should be forwardable — clean, professional, no internal jargon
- Flag any data gaps so Andrew knows what's incomplete
- Compare week-over-week when possible
- Prioritize: urgent issues > wins > trends > FYI items

## Dashboard Integration
Data feeds into: **Overview** section (homepage)
- Executive summary card (top of page)
- Sparkline trends for key metrics
- Quick links to deep-dive sections
- Action items with status tracking
