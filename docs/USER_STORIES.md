# User Stories - Up Smart Finance Dashboard

## Epic 1: Account Management

### Story 1.1: View All Accounts
**As a** Up Banking customer  
**I want to** see all my accounts in one dashboard  
**So that** I can quickly check my balances

**Acceptance Criteria:**
- [ ] Dashboard displays all accounts (Transactional, Saver, Home Loan)
- [ ] Each account card shows name, type, and current balance
- [ ] Balances are formatted correctly with currency symbol
- [ ] Account creation date is visible
- [ ] Clicking account navigates to detailed view

**Priority**: P0 (Must Have)  
**Effort**: 3 points

---

### Story 1.2: Distinguish Joint vs Personal Accounts
**As a** user with both joint and personal accounts  
**I want to** easily see which accounts are joint  
**So that** I can quickly identify shared vs personal finances

**Acceptance Criteria:**
- [ ] Joint accounts have a visual indicator (icon/badge)
- [ ] Account cards show ownership type (Individual/Joint)
- [ ] Can filter to show only joint or only personal accounts
- [ ] Joint accounts display "Joint" or "2Up" label
- [ ] Color coding or styling differentiates account types

**Priority**: P0 (Must Have)  
**Effort**: 2 points

---

### Story 1.3: Filter Accounts by Type
**As a** user with multiple accounts  
**I want to** filter accounts by type  
**So that** I can focus on specific account categories

**Acceptance Criteria:**
- [ ] Filter dropdown with options: All, Transactional, Saver, Home Loan
- [ ] Filter dropdown with options: All, Individual, Joint
- [ ] Filters can be combined
- [ ] Filter state persists during session
- [ ] Clear all filters button available

**Priority**: P1 (Should Have)  
**Effort**: 2 points

---

## Epic 2: Transaction Tracking

### Story 2.1: View Transaction History
**As a** user  
**I want to** view all my transactions  
**So that** I can see where my money is going

**Acceptance Criteria:**
- [ ] Transactions displayed in reverse chronological order
- [ ] Each transaction shows: date, description, amount, status
- [ ] Pagination or infinite scroll for large lists
- [ ] Loading states displayed during fetch
- [ ] Empty state when no transactions exist

**Priority**: P0 (Must Have)  
**Effort**: 5 points

---

### Story 2.2: Filter Transactions
**As a** user  
**I want to** filter transactions by various criteria  
**So that** I can find specific transactions quickly

**Acceptance Criteria:**
- [ ] Filter by date range (since/until)
- [ ] Filter by status (HELD/SETTLED)
- [ ] Filter by category
- [ ] Filter by tag
- [ ] Filter by specific account
- [ ] Multiple filters can be applied simultaneously
- [ ] Clear filters button

**Priority**: P0 (Must Have)  
**Effort**: 5 points

---

### Story 2.3: See Who Made Joint Account Transactions
**As a** user with a joint account  
**I want to** see who performed each transaction  
**So that** I understand the spending patterns

**Acceptance Criteria:**
- [ ] Joint account transactions display performing customer name
- [ ] Visual indicator (avatar/initial) for quick identification
- [ ] Color coding by person (optional)
- [ ] Name displayed prominently (e.g., "Bobby made this purchase")
- [ ] Works across all transaction views

**Priority**: P0 (Must Have)  
**Effort**: 3 points

---

### Story 2.4: Filter Joint Transactions by Person
**As a** user with a joint account  
**I want to** filter transactions by who performed them  
**So that** I can see my spending vs my partner's

**Acceptance Criteria:**
- [ ] Filter dropdown shows all performing customers
- [ ] Selecting a person filters to their transactions only
- [ ] Filter combines with other filters (date, category, etc.)
- [ ] Shows transaction count per person
- [ ] Can select multiple people

**Priority**: P0 (Must Have)  
**Effort**: 3 points

---

### Story 2.5: Categorize Transactions
**As a** user  
**I want to** assign categories to my transactions  
**So that** I can organize my spending

**Acceptance Criteria:**
- [ ] Can view transaction's current category
- [ ] Can change category from dropdown
- [ ] Category hierarchy displayed (parent > child)
- [ ] Only categorizable transactions can be edited
- [ ] Category change reflected immediately
- [ ] Can remove category (de-categorize)

**Priority**: P1 (Should Have)  
**Effort**: 4 points

---

### Story 2.6: Tag Transactions
**As a** user  
**I want to** add custom tags to transactions  
**So that** I can track spending for specific purposes

**Acceptance Criteria:**
- [ ] Can view existing tags on transaction
- [ ] Can add new tags (max 6 per transaction)
- [ ] Can remove existing tags
- [ ] Tag autocomplete from existing tags
- [ ] Tags are searchable/filterable
- [ ] Create new tags on the fly

**Priority**: P1 (Should Have)  
**Effort**: 4 points

---

### Story 2.7: View Transaction Attachments
**As a** user  
**I want to** see receipts attached to transactions  
**So that** I can verify purchase details

**Acceptance Criteria:**
- [ ] Transactions with attachments show indicator
- [ ] Clicking opens attachment in viewer/new tab
- [ ] Attachment thumbnail visible on transaction
- [ ] File type and size information shown
- [ ] Works with all image formats supported by API

**Priority**: P2 (Nice to Have)  
**Effort**: 3 points

---

## Epic 3: Joint Account Analytics

### Story 3.1: View Spending by Person
**As a** user with a joint account  
**I want to** see spending breakdown by person  
**So that** I understand contribution patterns

**Acceptance Criteria:**
- [ ] Monthly spending total per person displayed
- [ ] Percentage breakdown shown
- [ ] Visual chart (pie/bar) showing distribution
- [ ] Can select different time periods
- [ ] Excludes transfers between accounts

**Priority**: P0 (Must Have)  
**Effort**: 5 points

---

### Story 3.2: Category Breakdown by Person
**As a** user with a joint account  
**I want to** see category spending by person  
**So that** I understand who spends on what

**Acceptance Criteria:**
- [ ] Shows spending by category for each person
- [ ] Sortable by amount or category
- [ ] Visual representation (stacked bars)
- [ ] Can drill down into specific categories
- [ ] Excludes uncategorized transactions (or shows separately)

**Priority**: P1 (Should Have)  
**Effort**: 5 points

---

### Story 3.3: Monthly Contribution Trends
**As a** user with a joint account  
**I want to** see contribution trends over time  
**So that** I can understand spending patterns

**Acceptance Criteria:**
- [ ] Line/bar chart showing monthly contributions per person
- [ ] Can view last 3, 6, 12 months
- [ ] Shows total spending per month
- [ ] Percentage split visible for each month
- [ ] Can export data

**Priority**: P1 (Should Have)  
**Effort**: 5 points

---

## Epic 4: Subscription Tracking

### Story 4.1: Detect Subscriptions Automatically
**As a** user  
**I want** subscriptions detected automatically from my transactions  
**So that** I don't have to manually track them

**Acceptance Criteria:**
- [ ] Recurring transactions (same merchant, similar amount) detected
- [ ] Monthly, quarterly, annual frequencies recognized
- [ ] Confidence score shown for each detection
- [ ] Can confirm or reject detected subscriptions
- [ ] Minimum 2 occurrences required for detection

**Priority**: P0 (Must Have)  
**Effort**: 8 points

---

### Story 4.2: View Subscription Dashboard
**As a** user  
**I want to** see all my subscriptions in one place  
**So that** I can manage recurring expenses

**Acceptance Criteria:**
- [ ] List of all active subscriptions
- [ ] Total monthly/annual cost displayed
- [ ] Next billing date for each subscription
- [ ] Visual cards with merchant logos
- [ ] Sort by cost, name, or next billing date

**Priority**: P0 (Must Have)  
**Effort**: 5 points

---

### Story 4.3: Add Subscription Manually
**As a** user  
**I want to** manually add subscriptions  
**So that** I can track ones not auto-detected

**Acceptance Criteria:**
- [ ] Form to add subscription details
- [ ] Fields: name, amount, frequency, start date, category
- [ ] Can link to specific transactions
- [ ] Validation on required fields
- [ ] Successfully added subscriptions appear in dashboard

**Priority**: P1 (Should Have)  
**Effort**: 3 points

---

### Story 4.4: Get Renewal Reminders
**As a** user  
**I want to** receive reminders before subscriptions renew  
**So that** I can cancel if not needed

**Acceptance Criteria:**
- [ ] Configurable reminder timing (7, 3, 1 days before)
- [ ] Browser notifications (if enabled)
- [ ] Email notifications (optional)
- [ ] In-app notification center
- [ ] Can snooze or dismiss reminders

**Priority**: P1 (Should Have)  
**Effort**: 5 points

---

### Story 4.5: Track Price Changes
**As a** user  
**I want to** be notified of subscription price changes  
**So that** I can decide if I want to continue

**Acceptance Criteria:**
- [ ] Each billing cycle compared to previous
- [ ] Price increases highlighted
- [ ] Annual impact calculated
- [ ] Price history visible
- [ ] Notification sent on first detection

**Priority**: P1 (Should Have)  
**Effort**: 5 points

---

### Story 4.6: View Billing Calendar
**As a** user  
**I want to** see upcoming subscription charges on a calendar  
**So that** I can plan my cash flow

**Acceptance Criteria:**
- [ ] Calendar view showing next 30 days
- [ ] Each subscription marked on billing date
- [ ] Total per day displayed
- [ ] Click date to see details
- [ ] Can toggle calendar vs list view

**Priority**: P2 (Nice to Have)  
**Effort**: 5 points

---

### Story 4.7: Identify Unused Subscriptions
**As a** user  
**I want to** be alerted about potentially unused subscriptions  
**So that** I can save money

**Acceptance Criteria:**
- [ ] Manual usage tracking (last used date)
- [ ] Alert if not used in 30+ days
- [ ] Shows potential savings
- [ ] Can mark as "still needed"
- [ ] Provides cancellation guidance

**Priority**: P2 (Nice to Have)  
**Effort**: 4 points

---

## Epic 5: Analytics & Insights

### Story 5.1: View Spending Trends
**As a** user  
**I want to** see spending trends over time  
**So that** I can understand my financial patterns

**Acceptance Criteria:**
- [ ] Line chart showing spending over time
- [ ] Can select time period (week, month, quarter, year)
- [ ] Shows income vs expenses
- [ ] Category breakdown available
- [ ] Comparison to previous period

**Priority**: P1 (Should Have)  
**Effort**: 5 points

---

### Story 5.2: Category Spending Breakdown
**As a** user  
**I want to** see spending by category  
**So that** I know where my money goes

**Acceptance Criteria:**
- [ ] Pie or donut chart with categories
- [ ] Percentage and amount for each category
- [ ] Can click category to see transactions
- [ ] Parent categories aggregated
- [ ] Can exclude certain categories

**Priority**: P1 (Should Have)  
**Effort**: 4 points

---

### Story 5.3: Monthly Comparison
**As a** user  
**I want to** compare spending across months  
**So that** I can track financial progress

**Acceptance Criteria:**
- [ ] Bar chart comparing monthly totals
- [ ] Shows last 6-12 months
- [ ] Percentage change indicated
- [ ] Can drill down by category
- [ ] Highlights unusual months

**Priority**: P2 (Nice to Have)  
**Effort**: 4 points

---

### Story 5.4: Export Financial Data
**As a** user  
**I want to** export my transaction data  
**So that** I can use it in other tools

**Acceptance Criteria:**
- [ ] Export to CSV format
- [ ] Export to JSON format
- [ ] Can select date range for export
- [ ] Includes all transaction details
- [ ] Can export subscriptions separately

**Priority**: P2 (Nice to Have)  
**Effort**: 3 points

---

## Epic 6: Real-Time Updates

### Story 6.1: Receive Transaction Notifications
**As a** user  
**I want to** be notified of new transactions  
**So that** I can monitor account activity in real-time

**Acceptance Criteria:**
- [ ] Webhook configured for transaction events
- [ ] Browser notification on new transaction
- [ ] Shows transaction details in notification
- [ ] Can disable notifications
- [ ] Works even when app not actively open

**Priority**: P1 (Should Have)  
**Effort**: 6 points

---

### Story 6.2: Auto-Update on New Transactions
**As a** user  
**I want** the app to update automatically  
**So that** I always see the latest data

**Acceptance Criteria:**
- [ ] Webhooks trigger data refresh
- [ ] UI updates without page reload
- [ ] Shows "new transaction" indicator
- [ ] Balances update in real-time
- [ ] Subscription detection runs on new transactions

**Priority**: P1 (Should Have)  
**Effort**: 5 points

---

### Story 6.3: Manage Webhooks
**As a** user  
**I want to** manage my webhook configuration  
**So that** I can control notifications

**Acceptance Criteria:**
- [ ] View active webhooks
- [ ] Create new webhook
- [ ] Delete webhook
- [ ] Test webhook (PING)
- [ ] View webhook delivery logs

**Priority**: P2 (Nice to Have)  
**Effort**: 4 points

---

## Epic 7: Settings & Configuration

### Story 7.1: Secure API Token Storage
**As a** user  
**I want** my API token stored securely  
**So that** my account is protected

**Acceptance Criteria:**
- [ ] Token encrypted at rest
- [ ] Token never displayed in UI
- [ ] Can update/rotate token
- [ ] Clear instructions on obtaining token
- [ ] Token validated on first use

**Priority**: P0 (Must Have)  
**Effort**: 3 points

---

### Story 7.2: Configure Notification Preferences
**As a** user  
**I want to** control what notifications I receive  
**So that** I'm not overwhelmed

**Acceptance Criteria:**
- [ ] Toggle for transaction notifications
- [ ] Toggle for subscription reminders
- [ ] Toggle for price change alerts
- [ ] Configure reminder timing
- [ ] Email vs browser notification preference

**Priority**: P1 (Should Have)  
**Effort**: 3 points

---

### Story 7.3: Set Budget Limits (Optional)
**As a** user  
**I want to** set spending budgets  
**So that** I can control expenses

**Acceptance Criteria:**
- [ ] Set monthly budget per category
- [ ] View progress towards budget
- [ ] Alert when approaching limit (80%, 100%)
- [ ] Can adjust budgets easily
- [ ] Shows historical budget performance

**Priority**: P3 (Could Have)  
**Effort**: 5 points

---

## Story Prioritization

### Must Have (P0) - 15 stories - 54 points
Critical for MVP functionality

### Should Have (P1) - 16 stories - 66 points
Important for user value, include if time permits

### Nice to Have (P2) - 7 stories - 27 points
Enhancement features for future iterations

### Could Have (P3) - 1 story - 5 points
Optional features based on user feedback

---

## Story Point Reference

- **1 point**: < 2 hours (trivial)
- **2 points**: 2-4 hours (simple)
- **3 points**: 4-8 hours (straightforward)
- **4 points**: 1 day (moderate)
- **5 points**: 1-2 days (complex)
- **8 points**: 2-3 days (very complex)
- **13 points**: 3-5 days (needs breakdown)

---

**Total Stories**: 39  
**Total Effort**: 152 points (~19 weeks solo, ~8 weeks with focus on P0/P1)

**Last Updated**: January 21, 2026  
**Version**: 1.0
