# Ledger Agent — Operations Data (Refactored)
## Role
Pulls daily Toast POS data for MSHG restaurants and writes structured results to the dashboard database. Replaces the old Ledger Discord cron.

## Schedule
- **Daily**: 11am CST (same as current Ledger cron `eacfaefb`)
- Runs after morning service data is finalized in Toast

## Model
anthropic/claude-sonnet-4-6

## Data Source
Toast API: `ws-api.toasttab.com/authentication/v1/authentication/login`
- Credentials stored in `merriment-social/.env`
- Current flow: Toast API pull → transform → journal entry format

## Restaurants
- Merriment Social (primary — pilot)
- Third Coast Provisions (pending creds)
- Flourchild (pending creds)

## Output Format
```json
{
  "date": "2026-03-27",
  "restaurant": "merriment-social",
  "revenue": {
    "food": 676.75,
    "liquor": 246.27,
    "soft_drinks": 35.04,
    "beer": 29.03,
    "wine": 12.01,
    "gross_sales": 1083.07,
    "net_sales": 999.10,
    "sales_tax": 83.97
  },
  "labor": {
    "credit_tips": 206.88,
    "discounts": 72.00
  },
  "exceptions": [
    {
      "type": "void",
      "severity": "warning",
      "detail": "Voided order 56cf0a77",
      "action_needed": "review"
    },
    {
      "type": "high_tip",
      "severity": "info",
      "detail": "68% tip on $8.92 check",
      "action_needed": "none"
    },
    {
      "type": "unknown_payment",
      "severity": "warning",
      "detail": "GIFTCARD payment ($34.62) not mapped in GL",
      "action_needed": "map_payment_type"
    }
  ],
  "journal_entry": {
    "balanced": false,
    "debits": 1262.04,
    "credits": 1289.95,
    "difference": -27.91,
    "likely_cause": "Unrecognized GIFTCARD payment type"
  },
  "comparisons": {
    "vs_yesterday": { "gross_sales_change": "+12.3%" },
    "vs_same_day_last_week": { "gross_sales_change": "-5.1%" },
    "mtd": { "gross_sales": 28450.00, "vs_last_month_mtd": "+8.7%" }
  }
}
```

## Key Rules
- Always check JE balance — flag if debits ≠ credits
- Track and flag unknown payment types (like GIFTCARD)
- Include day-over-day and week-over-week comparisons
- Flag any void > $50 as high-severity
- Flag tip percentages > 50% as unusual
- MTD running totals always included

## Migration Notes
- Currently posts to Discord via Ledger cron (`eacfaefb`)
- Phase 1: Dual-write (Discord + dashboard DB) during transition
- Phase 2: Kill Discord output, dashboard only
- Keep the existing cron ID and schedule, just change the output target

## Dashboard Integration
Data feeds into: **Operations Snapshot** section (future Phase 3+)
- Daily sales cards per restaurant
- Week-over-week trend charts
- Exception flags with severity badges
- JE balance status indicator
