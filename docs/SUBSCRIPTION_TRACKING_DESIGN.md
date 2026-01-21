# 📅 Subscription Tracking & Monitoring Features

## Overview

Intelligent subscription detection, tracking, and management system that helps users understand and optimize their recurring expenses using transaction data from the Up Banking API.

## Core Subscription Features

### 1. Automatic Subscription Detection

**Pattern Recognition Algorithm**
```javascript
Subscription Detection Criteria:
├─ Recurring Transactions (same merchant, similar amount)
├─ Frequency Patterns:
│  ├─ Monthly (every 28-31 days)
│  ├─ Quarterly (every 90-92 days)
│  ├─ Semi-Annual (every 180-185 days)
│  ├─ Annual (every 365-366 days)
│  ├─ Weekly (every 7 days)
│  └─ Bi-Weekly (every 14 days)
├─ Amount Consistency (within 5% variance)
└─ Minimum Occurrences: 2+ transactions
```

**Detection Process**
1. Analyze transaction history via `/transactions` endpoint
2. Group by merchant description using fuzzy matching
3. Calculate time intervals between transactions
4. Identify consistent patterns
5. Calculate confidence score (0-100%)

**Merchant Matching**
```javascript
Merchant Normalization:
├─ "Spotify 0123456789" → "Spotify"
├─ "NETFLIX.COM" → "Netflix"
├─ "APL*APPLE.COM/BILL" → "Apple"
├─ "Adobe Creative Cloud" → "Adobe"
└─ Custom merchant rules database
```

### 2. Subscription Registry

**Subscription Data Model**
```json
{
  "id": "sub-001",
  "name": "Spotify Premium",
  "merchant": {
    "rawText": "Spotify 0123456789",
    "normalized": "Spotify",
    "logo": "https://logo.clearbit.com/spotify.com"
  },
  "status": "ACTIVE",
  "detectionMethod": "AUTO",
  "confidence": 95,
  "amount": {
    "current": 11.99,
    "currency": "AUD"
  },
  "billing": {
    "frequency": "MONTHLY",
    "cycle": 30,
    "nextBillingDate": "2026-02-15",
    "lastBillingDate": "2026-01-15"
  },
  "history": [
    {
      "transactionId": "abc-123",
      "date": "2026-01-15",
      "amount": 11.99,
      "status": "SETTLED"
    },
    {
      "transactionId": "xyz-789",
      "date": "2025-12-15",
      "amount": 11.99,
      "status": "SETTLED"
    }
  ],
  "category": "tv-and-music",
  "tags": ["Subscription", "Entertainment"],
  "metadata": {
    "startDate": "2024-06-15",
    "notes": "Family plan shared with partner",
    "renewalReminder": true,
    "priceAlerts": true
  }
}
```

**Subscription Categories**
```
Subscription Types:
├─ Streaming Services (Netflix, Spotify, Disney+)
├─ Software & Tools (Adobe, Microsoft 365, Dropbox)
├─ News & Publications (NYT, Medium, Substack)
├─ Fitness & Wellness (Gym, Yoga apps, Headspace)
├─ Food & Beverage (Meal kits, Coffee subscriptions)
├─ Gaming (Xbox Game Pass, PlayStation Plus, Steam)
├─ Cloud Storage (iCloud, Google One, Dropbox)
├─ Utilities (Mobile, Internet, Electricity)
├─ Insurance (Health, Car, Home)
└─ Other Recurring Expenses
```

### 3. Subscription Dashboard

**Overview Panel**
```
╔════════════════════════════════════════════╗
║ 📊 Subscription Overview                   ║
╟────────────────────────────────────────────╢
║ Active Subscriptions: 12                   ║
║ Total Monthly Cost: $247.85                ║
║ Annual Projection: $2,974.20               ║
║                                            ║
║ Next 7 Days:                               ║
║ • Jan 23: Netflix ($16.99)                 ║
║ • Jan 25: Spotify ($11.99)                 ║
║ • Jan 27: Adobe ($54.99)                   ║
║                                            ║
║ ⚠️ 2 Price Increases Detected              ║
║ 💡 Potential Savings: $38/month            ║
╚════════════════════════════════════════════╝
```

**Subscription List View**
```
Active Subscriptions (12)
├─ [Logo] Netflix                    $16.99/mo
│  Next: Jan 23 • Streaming
│  [ Details ] [ Cancel Guide ]
│
├─ [Logo] Spotify Premium            $11.99/mo
│  Next: Jan 25 • Music • Shared
│  [ Details ] [ Manage ]
│
├─ [Logo] Adobe Creative Cloud       $54.99/mo
│  Next: Jan 27 • Software
│  ⚠️ Price increased from $49.99
│  [ Details ] [ Find Alternative ]
│
└─ [Logo] ChatGPT Plus               $24.00/mo
   Next: Feb 1 • AI Tools
   [ Details ] [ Manage ]

Paused/Cancelled (3)
├─ [Logo] Disney+ (Paused)           Was $11.99/mo
└─ [Logo] Audible (Cancelled)        Was $16.45/mo
```

### 4. Billing Calendar

**Calendar View**
```
January 2026
┌────┬────┬────┬────┬────┬────┬────┐
│ Su │ Mo │ Tu │ We │ Th │ Fr │ Sa │
├────┼────┼────┼────┼────┼────┼────┤
│    │    │    │  1 │  2 │  3 │  4 │
├────┼────┼────┼────┼────┼────┼────┤
│  5 │  6 │  7 │  8 │  9 │ 10 │ 11 │
├────┼────┼────┼────┼────┼────┼────┤
│ 12 │ 13 │ 14 │ 15 │ 16 │ 17 │ 18 │
│    │    │    │ 🎵 │    │    │    │
│    │    │    │$12 │    │    │    │
├────┼────┼────┼────┼────┼────┼────┤
│ 19 │ 20 │ 21 │ 22 │ 23 │ 24 │ 25 │
│    │    │ ⚡ │    │ 📺 │    │ 🎵 │
│    │    │    │    │$17 │    │$12 │
├────┼────┼────┼────┼────┼────┼────┤
│ 26 │ 27 │ 28 │ 29 │ 30 │ 31 │    │
│    │ 🎨 │    │    │    │    │    │
│    │$55 │    │    │    │    │    │
└────┴────┴────┴────┴────┴────┴────┘

Total This Month: $247.85
```

**Timeline View**
```
Next 30 Days Billing Schedule
├─ Jan 23 - Netflix                  $16.99
├─ Jan 25 - Spotify                  $11.99
├─ Jan 27 - Adobe Creative Cloud     $54.99
├─ Feb 1  - ChatGPT Plus             $24.00
├─ Feb 5  - GitHub Pro               $4.00
├─ Feb 8  - iCloud Storage           $1.49
├─ Feb 12 - Xbox Game Pass           $16.95
└─ Feb 15 - Microsoft 365            $11.00
```

### 5. Price Change Detection

**Price Monitoring**
```javascript
Price Change Alert System:
├─ Track amount for each billing cycle
├─ Detect increases/decreases (>$0.50 or >2%)
├─ Historical price tracking
├─ Notification on first detection
└─ Annual cost impact calculation
```

**Price History**
```
Spotify Premium - Price History
┌────────────────────────────────────┐
│ Jan 2026  $11.99  ←── Current      │
│ Dec 2025  $11.99                   │
│ Nov 2025  $11.99                   │
│ Oct 2025  $11.99                   │
│ ...                                │
│ May 2024  $10.99  ⬆️ +$1.00 (+9%)  │
│ Apr 2024  $10.99                   │
└────────────────────────────────────┘

Impact: +$12/year since May 2024
```

**Price Change Notifications**
```
⚠️ Price Increase Detected
Adobe Creative Cloud
Old: $49.99/month
New: $54.99/month
Increase: +$5.00/month (+10%)
Annual Impact: +$60/year

First charged: Jan 27, 2026
[ View Details ] [ Find Alternatives ] [ Dismiss ]
```

### 6. Subscription Analytics

**Spending Breakdown**
```
Monthly Subscription Spending: $247.85
┌─────────────────────────────────────┐
│ Entertainment    $56.96  (23%) ████ │
│ Software         $95.98  (39%) █████│
│ Utilities        $62.91  (25%) ████ │
│ Cloud Storage    $14.00  (6%)  █    │
│ Other            $18.00  (7%)  ██   │
└─────────────────────────────────────┘

Annual Projection: $2,974.20
```

**Trend Analysis**
```
Subscription Spending Over Time
$300 │                              ╱─╮
$250 │                      ╱──╮   ╱   ╲
$200 │              ╱──╮   ╱    ╲─╯     ╲
$150 │      ╱──╮   ╱    ╲─╯              
$100 │─────╯    ╲─╯                      
     └─────────────────────────────────
     J F M A M J J A S O N D J

📈 Trends:
• +15% increase over last 6 months
• 3 new subscriptions added
• 1 subscription cancelled
• Average increase per month: $12
```

**Subscription Metrics**
```
Key Metrics:
├─ Total Active: 12 subscriptions
├─ Average Cost: $20.65/subscription
├─ Most Expensive: Adobe ($54.99)
├─ Least Expensive: iCloud ($1.49)
├─ Longest Running: Netflix (38 months)
├─ Most Recent: ChatGPT Plus (2 months)
├─ % of Total Spending: 18%
└─ Subscription Density: 0.4 new/month
```

### 7. Smart Alerts & Notifications

**Alert Types**
```javascript
Notification System:
├─ Upcoming Renewals
│  ├─ 7 days before
│  ├─ 3 days before
│  └─ 1 day before
├─ Price Changes
│  ├─ Immediate alert on detection
│  └─ Monthly summary of all changes
├─ Unusual Activity
│  ├─ Duplicate charges
│  ├─ Unexpected billing dates
│  └─ Failed payments
├─ Budget Alerts
│  ├─ Subscription budget exceeded
│  └─ Approaching budget limit
└─ Optimization Opportunities
   ├─ Unused subscriptions detected
   └─ Better pricing available
```

**Webhook Integration**
```javascript
Real-time Subscription Detection:
1. TRANSACTION_CREATED webhook received
2. Check if matches existing subscription pattern
3. If match: update last billing, calculate next
4. If new subscription: trigger detection algorithm
5. Send notification if new subscription detected
```

**Notification Examples**
```
🔔 Renewal Reminder
Netflix renews in 3 days
Amount: $16.99
Next billing: Jan 23, 2026
[ Review ] [ Snooze ] [ Cancel Guide ]

───────────────────────────────────

💰 Optimization Tip
You haven't used Disney+ in 45 days
Save $11.99/month by pausing
Annual savings: $143.88
[ Pause ] [ Keep Active ] [ Remind Later ]

───────────────────────────────────

🎯 Duplicate Detected
Spotify charged twice this month
Jan 15: $11.99 ✓
Jan 16: $11.99 ⚠️
[ Investigate ] [ Mark as Valid ]
```

### 8. Subscription Health Score

**Health Metrics**
```
Subscription Health Score: 72/100
┌────────────────────────────────────┐
│ ✓ No duplicate charges      +20   │
│ ✓ All under budget          +15   │
│ ⚠️ 2 price increases        -10   │
│ ⚠️ 3 unused (>30 days)      -15   │
│ ✓ Good category spread      +12   │
│ ~ Average cost per sub      +0    │
└────────────────────────────────────┘

Recommendations:
• Review unused subscriptions
• Consider alternatives for price-increased services
• Set spending limit alerts
```

**Usage Tracking (Manual Input)**
```
Subscription Usage Tracker
├─ Netflix
│  Last used: 2 days ago ✓
│  Usage: 4 times this month
│  Status: Active & Used
│
├─ Disney+
│  Last used: 45 days ago ⚠️
│  Usage: 0 times this month
│  Status: Potentially Unused
│  Suggestion: Pause for 3 months?
│
└─ Adobe Creative Cloud
   Last used: Today ✓
   Usage: Daily
   Status: Essential
```

### 9. Cancellation Management

**Cancellation Tracker**
```
Cancellation Process:
├─ Subscription Selection
├─ Cancellation Information Lookup
│  ├─ Direct cancellation link
│  ├─ Customer service phone
│  ├─ Email instructions
│  └─ App/website navigation guide
├─ Cancellation Difficulty Rating
│  (Easy / Medium / Hard)
├─ Set reminder for last day of service
└─ Track cancellation status
```

**Cancellation Guides**
```
How to Cancel: Netflix
┌────────────────────────────────────┐
│ Difficulty: 🟢 Easy                │
│                                    │
│ Steps:                             │
│ 1. Go to netflix.com               │
│ 2. Sign in to your account         │
│ 3. Click Account > Cancel          │
│ 4. Confirm cancellation            │
│                                    │
│ 📅 Service ends: Feb 23, 2026      │
│ 💰 Will save: $16.99/month         │
│                                    │
│ [ Open Netflix ] [ Mark Cancelled ]│
└────────────────────────────────────┘
```

**Paused Subscriptions**
```
Paused Subscriptions (2)
├─ Disney+
│  Paused: Dec 15, 2025
│  Reason: Not watching
│  Saved so far: $35.97
│  [ Resume ] [ Cancel Permanently ]
│
└─ Audible
   Paused: Jan 1, 2026
   Reason: Too many unread books
   Saved so far: $16.45
   [ Resume ] [ Cancel Permanently ]
```

### 10. Subscription Comparison & Recommendations

**Alternative Services**
```
Adobe Creative Cloud - $54.99/month
┌────────────────────────────────────┐
│ Alternatives to Consider:          │
│                                    │
│ ✓ Affinity Suite (One-time)        │
│   $169.99 (Pay once, own forever)  │
│   Savings: $490/year after year 1  │
│                                    │
│ ✓ Canva Pro                        │
│   $17.99/month                     │
│   Savings: $37/month               │
│                                    │
│ ✓ Annual Plan                      │
│   $39.99/month (save $180/year)    │
│   Savings: $15/month               │
└────────────────────────────────────┘
```

**Bundle Opportunities**
```
💡 Bundle Opportunity Detected
You have:
├─ Apple Music ($11.99)
├─ iCloud+ 200GB ($4.49)
└─ Apple TV+ ($9.99)

Consider: Apple One Family Plan
├─ Cost: $22.95/month
├─ Includes all above + more
├─ Savings: $3.52/month ($42.24/year)
└─ [ Learn More ] [ Switch ]
```

### 11. Free Trial Tracker

**Trial Management**
```
Free Trials & Introductory Offers
┌────────────────────────────────────┐
│ ⏰ Active Trials (2)                │
│                                    │
│ ChatGPT Plus                       │
│ Trial ends: Jan 28, 2026 (7 days) │
│ Then: $24/month                    │
│ [ Cancel Before Trial Ends ]       │
│                                    │
│ Paramount+                         │
│ Trial ends: Feb 5, 2026 (15 days) │
│ Then: $8.99/month                  │
│ [ Set Cancellation Reminder ]      │
└────────────────────────────────────┘

📅 Trial Reminder: 2 days before end
💳 First charge prevented: $32.99
```

**Trial History**
```
Trial History
├─ ✓ Cancelled before charge (5)
│  Saved: $147.50
├─ ⚠️ Converted to paid (3)
│  Current cost: $42.97/month
└─ 📊 Conversion rate: 37.5%
```

### 12. Shared Subscription Tracking

**Shared Services**
```
Shared Subscriptions (4)
├─ Spotify Family Plan              $17.99/mo
│  Sharing with: 3 people
│  Your share: $4.50/month
│  [ Manage Members ] [ Request Payment ]
│
├─ Netflix Premium                  $22.99/mo
│  Sharing with: Partner
│  Your share: $11.50/month
│  Status: ✓ Settled this month
│
└─ YouTube Premium Family           $22.99/mo
   Sharing with: 4 people
   Your share: $4.60/month
   [ Collect Payments ]
```

**Cost Splitting**
```
Spotify Family Plan Split
┌────────────────────────────────────┐
│ Total: $17.99/month                │
│                                    │
│ Split: Equal (4 people)            │
│ • You:     $4.50 (admin)           │
│ • Alex:    $4.50 ✓ Paid           │
│ • Jordan:  $4.50 ⚠️ Pending        │
│ • Sam:     $4.50 ✓ Paid           │
│                                    │
│ Your net cost: $4.50               │
│ Amount to collect: $4.50           │
│                                    │
│ [ Send Reminders ] [ View History ]│
└────────────────────────────────────┘
```

## API Integration

### Endpoints Used

**Transaction Retrieval**
```javascript
// Get all transactions for pattern detection
GET /transactions?filter[since]={6_months_ago}

// Get specific account transactions
GET /accounts/{accountId}/transactions

// Get transaction details
GET /transactions/{id}
```

**Categorization**
```javascript
// Auto-tag subscriptions
POST /transactions/{id}/relationships/tags
Body: { data: [{ type: "tags", id: "Subscription" }] }

// Categorize by service type
PATCH /transactions/{id}/relationships/category
Body: { data: { type: "categories", id: "tv-and-music" } }
```

**Real-time Detection**
```javascript
// Webhook for new transactions
POST /webhooks
Body: {
  data: {
    attributes: {
      url: "https://yourapp.com/webhook/subscriptions",
      description: "Subscription detector"
    }
  }
}

// Handle TRANSACTION_CREATED events
// Immediately check if transaction matches subscription pattern
```

### Data Processing Flow

```
Transaction Flow:
├─ 1. Webhook receives TRANSACTION_CREATED
├─ 2. Extract merchant, amount, date
├─ 3. Check against known subscriptions
│     └─ If match: Update billing info
├─ 4. Check against detection patterns
│     ├─ If new pattern: Create subscription
│     └─ If no pattern: Queue for analysis
├─ 5. Auto-tag transaction as "Subscription"
├─ 6. Update subscription registry
└─ 7. Send notifications if configured
```

## Local Data Schema

### Subscriptions Database
```json
{
  "subscriptions": {
    "sub-001": { /* subscription object */ },
    "sub-002": { /* subscription object */ }
  },
  "detectionRules": {
    "merchantPatterns": [
      { "pattern": "SPOTIFY", "name": "Spotify", "category": "music" },
      { "pattern": "NETFLIX", "name": "Netflix", "category": "streaming" }
    ],
    "customRules": [
      {
        "merchantName": "Gym Membership",
        "frequency": "MONTHLY",
        "amount": 49.99,
        "variance": 0.05
      }
    ]
  },
  "settings": {
    "autoDetection": true,
    "confidenceThreshold": 70,
    "notificationDaysBefore": 7,
    "unusedThresholdDays": 30,
    "priceChangeAlerts": true
  }
}
```

### Notification Preferences
```json
{
  "notifications": {
    "renewalReminders": {
      "enabled": true,
      "timing": [7, 3, 1] // days before
    },
    "priceChanges": {
      "enabled": true,
      "minimumChange": 0.50,
      "percentageChange": 2
    },
    "unusedServices": {
      "enabled": true,
      "checkIntervalDays": 30
    },
    "budgetAlerts": {
      "enabled": true,
      "monthlyBudget": 300,
      "threshold": 90 // percent
    }
  }
}
```

## UI Components

### Subscription Card
```
╔════════════════════════════════════╗
║ [Logo] Netflix Premium             ║
║ ────────────────────────────────── ║
║ $16.99/month • Streaming           ║
║                                    ║
║ Next billing: Jan 23, 2026 (2d)    ║
║ Active since: Mar 2023 (34 months) ║
║                                    ║
║ Recent charges:                    ║
║ • Jan 2026  $16.99 ✓               ║
║ • Dec 2025  $16.99 ✓               ║
║ • Nov 2025  $16.99 ✓               ║
║                                    ║
║ Tags: [Subscription] [Shared]      ║
║                                    ║
║ [ Edit ] [ Pause ] [ Cancel ]      ║
╚════════════════════════════════════╝
```

### Quick Actions Widget
```
┌────────────────────────────────────┐
│ 🎯 Subscription Quick Actions      │
├────────────────────────────────────┤
│ • Scan for new subscriptions       │
│ • Review unused services           │
│ • Check for price increases        │
│ • Export subscription list         │
│ • Set budget limit                 │
│ • View annual summary              │
└────────────────────────────────────┘
```

## Implementation Phases

### Phase 1: Detection & Tracking (Week 1-2)
- ✅ Pattern detection algorithm
- ✅ Subscription registry
- ✅ Basic dashboard
- ✅ Manual add/edit subscriptions

### Phase 2: Analytics & Monitoring (Week 3-4)
- ✅ Price change detection
- ✅ Spending analytics
- ✅ Billing calendar
- ✅ Basic notifications

### Phase 3: Intelligence & Optimization (Week 5-6)
- ✅ Health score system
- ✅ Usage tracking
- ✅ Optimization recommendations
- ✅ Cancellation guides

### Phase 4: Advanced Features (Week 7-8)
- ✅ Free trial tracking
- ✅ Shared subscription management
- ✅ Alternative service suggestions
- ✅ Export and reporting

## Success Metrics

- **Detection Accuracy**: >90% of recurring transactions identified
- **False Positive Rate**: <5% incorrect subscription detection
- **User Value**: Average savings identified: $50/month
- **Engagement**: Users review subscriptions monthly
- **Cancellation Success**: 30% of flagged unused services cancelled

## Future Enhancements

1. **ML-Powered Detection**: Improve pattern recognition with machine learning
2. **Category-Specific Insights**: Custom analytics per subscription type
3. **Competitive Analysis**: Alert when competitor offers better pricing
4. **Auto-Negotiation**: Templates for requesting price reductions
5. **Family/Team Plans**: Optimize individual vs shared plan costs
6. **Tax Deduction Tracking**: Mark business subscriptions for tax purposes
7. **Subscription Trading**: Swap unused subscriptions with other users
8. **Carbon Footprint**: Track environmental impact of digital subscriptions

---

**Last Updated**: January 21, 2026
**Version**: 1.0
**Status**: Ready for Implementation
