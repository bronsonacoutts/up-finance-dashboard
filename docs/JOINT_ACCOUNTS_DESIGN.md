# 🤝 Joint & Shared Account Features

## Overview

Enhanced features specifically designed for managing joint accounts (2Up) and tracking shared expenses with partners, roommates, or family members.

## Core Joint Account Features

### 1. Account Ownership Dashboard

**Joint Account Detection**
- Automatically detect accounts with `ownershipType: "JOINT"`
- Visual indicators (icons, badges) for joint accounts vs individual accounts
- Separate navigation section for "Joint Accounts" vs "Personal Accounts"

**Account Ownership Filtering**
```
GET /accounts?filter[ownershipType]=JOINT
GET /accounts?filter[ownershipType]=INDIVIDUAL
```

**UI Components**
```
Joint Accounts Section
├─ Joint Spending Account Card
│  ├─ Both account holders' names
│  ├─ Current balance
│  ├─ Shared spending this month
│  └─ Quick actions (split calculator, filter by person)
└─ Joint Saver Card
   ├─ Joint savings goal tracker
   ├─ Contribution breakdown by person
   └─ Target progress visualization
```

### 2. Per-Person Transaction Attribution

**Performing Customer Tracking**
- Display `performingCustomer.displayName` on each transaction
- Visual avatar/initial for quick identification
- Color-coding by person for easy scanning

**Transaction List Enhancement**
```
Transaction Item:
├─ [Avatar: B] Bobby made this purchase
├─ Description: Woolworths Groceries
├─ Amount: -$87.45
├─ Category: Groceries
├─ Tags: [Shared], [Weekly Shop]
└─ Split Status: Needs Settlement
```

**Person-Based Filtering**
- Filter transactions by who performed them
- Quick toggle: "Show only Bobby's transactions"
- Multi-person selection for comparison views

### 3. Smart Expense Splitting

**Split Configuration**
```javascript
Split Types:
├─ Equal Split (50/50)
├─ Custom Percentage (e.g., 60/40)
├─ Fixed Amount per Person
├─ Pay-in-full (one person covers)
└─ Custom (manual entry)
```

**Transaction-Level Split Tracking**
```
For each transaction:
{
  transactionId: "abc-123",
  performingCustomer: "Bobby",
  amount: -87.45,
  splitConfig: {
    type: "EQUAL",
    participants: ["Bobby", "Partner"],
    owedAmounts: {
      "Bobby": 0,      // Bobby paid, owes nothing
      "Partner": 43.73  // Partner owes half
    }
  },
  settlementStatus: "PENDING"
}
```

**Bulk Split Operations**
- Select multiple transactions
- Apply split rules in bulk
- Tag-based auto-splitting (e.g., all "Shared" tagged items = 50/50)

### 4. Settlement Tracker

**Running Balance Calculator**
```
Settlement Dashboard:
├─ Who Owes Whom
│  ├─ Bobby owes Partner: $127.50
│  └─ Partner owes Bobby: $0.00
├─ Net Balance: Partner needs to pay Bobby $127.50
├─ Recent Unsettled Transactions (10)
├─ Settlement History
└─ Mark as Settled Button
```

**Settlement Actions**
- Mark transaction as "settled outside app"
- Create settlement transaction marker
- Settlement reminders/notifications
- Monthly settlement report

**Settlement Period Views**
- This Week
- This Month
- This Quarter
- Custom Date Range
- All Time

### 5. Contribution Analytics

**Per-Person Spending Breakdown**
```
Monthly Contribution Report:
┌─────────────────────────────────────┐
│ January 2026 - Joint Spending       │
├─────────────────────────────────────┤
│ Bobby:   $1,247.50 (52%)            │
│ Partner: $1,152.50 (48%)            │
├─────────────────────────────────────┤
│ Total:   $2,400.00                  │
└─────────────────────────────────────┘
```

**Category-wise Contributions**
```
Groceries:
├─ Bobby:   $320.00 (45%)
└─ Partner: $390.00 (55%)

Dining Out:
├─ Bobby:   $180.00 (60%)
└─ Partner: $120.00 (40%)

Bills & Utilities:
├─ Bobby:   $450.00 (50%)
└─ Partner: $450.00 (50%)
```

**Visual Charts**
- Stacked bar charts by month
- Pie charts for category distribution
- Timeline showing spending patterns per person
- Contribution trend lines

### 6. Shared Budget Management

**Joint Budget Categories**
```
Shared Budget Setup:
├─ Groceries: $800/month
├─ Dining Out: $400/month
├─ Household Bills: $900/month
├─ Entertainment: $200/month
└─ Miscellaneous: $300/month
```

**Budget Tracking**
- Real-time progress bars
- Per-person contribution to budget
- Overspend alerts (configurable per person or joint)
- Budget vs actual comparison

**Budget Fairness Indicator**
```
Budget Fairness Score:
├─ Target: 50/50 split
├─ Actual: 52/48 split
├─ Status: ✓ Balanced
└─ Variance: Within 5% threshold
```

### 7. Shared Savings Goals

**Joint Saver Account Goals**
```
Savings Goal: European Holiday
├─ Target: $8,000
├─ Current: $3,245
├─ Progress: 40.6%
├─ Contributions:
│  ├─ Bobby:   $1,822 (56%)
│  └─ Partner: $1,423 (44%)
├─ Target Date: June 2026
└─ Monthly Required: $950
```

**Goal Tracking Features**
- Multiple goals per joint saver
- Contribution tracking per person
- Milestone celebrations
- Projected completion date
- Contribution fairness metrics

### 8. Communication Features

**Shared Notes**
- Add notes to transactions visible to both parties
- Comment thread on transactions
- Flag transactions for discussion

**Transaction Alerts**
```
Smart Notifications:
├─ Large purchase alert (configurable threshold)
├─ Daily/weekly spending summary
├─ Settlement reminders
├─ Budget overspend warnings
└─ Unusual spending pattern alerts
```

**Shared Tags**
- Collaborative tagging system
- Pre-defined shared tags: [Shared], [Personal], [Reimbursable]
- Custom tags for projects/events

### 9. Fairness & Transparency Tools

**Equity Dashboard**
```
Fairness Metrics:
├─ Overall Contribution Ratio: 52/48
├─ Category Fairness:
│  ├─ Groceries: ✓ Balanced
│  ├─ Dining: ⚠️ Bobby paying more
│  └─ Bills: ✓ Equal
├─ Settlement Frequency: 2.3 weeks average
└─ Outstanding Balance: $127.50
```

**Historical Trends**
- Monthly contribution comparison
- Trend analysis: "Bobby has paid 60% of groceries for last 3 months"
- Rebalancing suggestions

**Export & Reports**
- Monthly joint statement (PDF)
- Tax-time reports (if applicable)
- Shared expense summary for reimbursement
- CSV export for external tools

### 10. Privacy & Permissions

**Transaction Visibility**
```
Privacy Settings:
├─ All transactions visible (default for joint accounts)
├─ Hide personal transactions on individual accounts
└─ Anonymize specific transaction details
```

**Feature Access Control**
- Both parties can view all joint account transactions
- Both can categorize and tag
- Settlement status can be updated by either party
- Budget modifications (optional: require both approvals)

## Implementation Priority

### Phase 1: Foundation
1. ✅ Detect and display joint accounts separately
2. ✅ Show performing customer on transactions
3. ✅ Person-based filtering
4. ✅ Basic contribution calculations

### Phase 2: Splitting
1. ✅ Transaction split configuration
2. ✅ Settlement tracker
3. ✅ Manual settlement marking
4. ✅ Basic settlement reminders

### Phase 3: Analytics
1. ✅ Per-person spending breakdown
2. ✅ Category-wise contribution charts
3. ✅ Fairness metrics
4. ✅ Monthly reports

### Phase 4: Advanced
1. ✅ Shared budget management
2. ✅ Joint savings goal tracking
3. ✅ Automated split rules
4. ✅ Rebalancing suggestions

## API Endpoints Used

### Accounts
```
GET /accounts?filter[ownershipType]=JOINT
GET /accounts/{id}
```

### Transactions
```
GET /transactions
GET /transactions?filter[since]={date}&filter[until]={date}
GET /accounts/{accountId}/transactions
```

### Categories & Tags
```
GET /categories
PATCH /transactions/{transactionId}/relationships/category
POST /transactions/{transactionId}/relationships/tags
DELETE /transactions/{transactionId}/relationships/tags
```

### Webhooks (Real-time Updates)
```
POST /webhooks
GET /webhooks/{id}/logs
POST /webhooks/{webhookId}/ping
```

## Data Model Extensions

### Split Configuration (Local Storage)
```json
{
  "splitRules": {
    "default": {
      "type": "EQUAL",
      "participants": ["Bobby", "Alex"]
    },
    "byTag": {
      "Shared": { "type": "EQUAL" },
      "Bobby Personal": { "type": "PAY_IN_FULL", "payer": "Bobby" },
      "Groceries": { "type": "PERCENTAGE", "Bobby": 45, "Alex": 55 }
    },
    "byCategory": {
      "groceries": { "type": "EQUAL" },
      "restaurants-and-cafes": { "type": "PERCENTAGE", "Bobby": 60, "Alex": 40 }
    }
  }
}
```

### Settlement Records (Local Storage)
```json
{
  "settlements": [
    {
      "id": "settlement-001",
      "date": "2026-01-15",
      "amount": 250.00,
      "from": "Alex",
      "to": "Bobby",
      "transactionsSettled": ["txn-1", "txn-2", "txn-3"],
      "method": "Bank Transfer",
      "notes": "January settlement"
    }
  ]
}
```

### Budget Configuration (Local Storage)
```json
{
  "jointBudgets": {
    "monthly": {
      "groceries": {
        "limit": 800,
        "split": "EQUAL",
        "alerts": {
          "at80Percent": true,
          "at100Percent": true
        }
      }
    }
  }
}
```

## UI/UX Mockup References

### Joint Account Card
```
╔══════════════════════════════════════╗
║ 🤝 Joint Spending                    ║
║ Bobby & Alex                         ║
╟──────────────────────────────────────╢
║ Balance: $1,234.56                   ║
║                                      ║
║ This Month:                          ║
║ • Bobby:   $547.30 (52%) ────█████   ║
║ • Alex:    $502.20 (48%) ────████    ║
║                                      ║
║ [ View Transactions ] [ Settle Up ]  ║
╚══════════════════════════════════════╝
```

### Transaction with Split Info
```
╔══════════════════════════════════════╗
║ 🛒 Woolworths Groceries              ║
║ [B] Bobby • Jan 20, 2026             ║
╟──────────────────────────────────────╢
║ Amount: -$87.45                      ║
║ Category: Groceries                  ║
║ Tags: [Shared] [Weekly Shop]         ║
║                                      ║
║ Split (50/50):                       ║
║ • Bobby paid:  $87.45                ║
║ • Alex owes:   $43.73 ⚠️ Pending    ║
║                                      ║
║ [ Edit Split ] [ Mark Settled ]      ║
╚══════════════════════════════════════╝
```

### Settlement Dashboard
```
╔══════════════════════════════════════╗
║ 💰 Settlement Summary                ║
╟──────────────────────────────────────╢
║ Net Balance:                         ║
║ Alex owes Bobby: $127.50             ║
║                                      ║
║ Breakdown:                           ║
║ • 8 shared transactions              ║
║ • Total shared spending: $687.40     ║
║ • Bobby paid: $471.95                ║
║ • Alex paid:  $215.45                ║
║                                      ║
║ Last settled: Jan 1, 2026            ║
║                                      ║
║ [ View Details ] [ Settle Now ]      ║
╚══════════════════════════════════════╝
```

## Technical Implementation Notes

### Local Storage Strategy
- Store split configurations locally (API doesn't support custom fields)
- Sync across devices via optional cloud backup
- Match transactions by ID for split tracking

### Real-time Sync
- Use webhooks for instant transaction notifications
- Update settlement balances in real-time
- Push notifications for large joint purchases

### Performance Optimization
- Cache performing customer data
- Index transactions by person locally
- Pre-calculate monthly contribution stats

### Data Privacy
- All split/settlement data stored locally
- Optional encrypted cloud backup
- No third-party sharing of joint account data

## Future Enhancements

1. **AI-Powered Split Suggestions**: Learn spending patterns and suggest fair splits
2. **Receipt Scanning**: Automatically split itemized receipts
3. **Shared Bill Scheduler**: Predict upcoming joint expenses
4. **Integration with Splitwise/Venmo**: Export settlement data
5. **Multi-Party Support**: Support for >2 people (roommates, group trips)
6. **Currency Conversion**: For international joint accounts
7. **Tax Deduction Tracking**: Mark business/tax-deductible joint expenses

## Success Metrics

- Settlement frequency (target: monthly or better)
- Contribution balance (target: within 10% of agreed split)
- Time to settle disputes (target: <5 minutes with clear data)
- User satisfaction with fairness visibility (target: 90%+)
- Adoption rate of auto-split rules (target: 70%+)

---

**Last Updated**: January 21, 2026
**Version**: 1.0
**Status**: Ready for Implementation
