# Agent Instructions - Up Smart Finance Dashboard

## Project Overview

This is a **personal finance management application** for Up Banking (Australian neobank) customers. It provides comprehensive account management, transaction tracking, joint account features, and subscription monitoring.

**Key Context**: This is for personal use by couples with joint accounts. There is **NO expense splitting or settlement tracking** - joint accounts are truly joint, we just want visibility into who spent what.

## Core Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui (Radix UI primitives)
- **State Management**: Zustand + React Query (@tanstack/react-query)
- **Routing**: React Router v6
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Backend**: Node.js + Express + TypeScript (for webhooks)
- **Database**: SQLite (local) with Prisma ORM
- **API**: Up Banking API v1 (https://api.up.com.au/api/v1)

## Architecture Principles

1. **API-First**: Leverage Up Banking API without reinventing features
2. **Local-First**: Store data locally, API as source of truth
3. **Privacy-Focused**: No third-party data sharing, encrypted token storage
4. **Type-Safe**: Full TypeScript coverage, strict mode enabled
5. **Component-Driven**: shadcn/ui components in `src/components/ui/`
6. **Feature-Based**: Code organized by feature in `src/features/`

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (auto-generated)
│   └── ...              # Custom shared components
├── features/            # Feature modules
│   ├── accounts/        # Account management
│   ├── transactions/    # Transaction tracking & filtering
│   ├── subscriptions/   # Subscription detection & monitoring
│   ├── analytics/       # Charts, trends, insights
│   └── settings/        # Configuration, API token
├── lib/                 # Utilities, helpers
│   ├── utils.ts         # cn() and other utilities
│   └── ...
├── services/            # API clients
│   ├── upApi.ts         # Up Banking API client
│   └── ...
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
│   ├── up-api.ts        # Up API types from OpenAPI spec
│   └── ...
└── App.tsx              # Main application

server/
├── webhooks/            # Webhook handlers
├── db/                  # Database schema (Prisma)
└── api/                 # Server API routes
```

## Up Banking API Integration

### Authentication
- Uses Personal Access Token (bearer authentication)
- Token stored in environment variable: `VITE_UP_API_TOKEN`
- **Never log or expose the token**

### Base URL
```
https://api.up.com.au/api/v1
```

### Key Endpoints

**Accounts**
- `GET /accounts` - List all accounts
- `GET /accounts?filter[ownershipType]=JOINT` - Filter joint accounts
- `GET /accounts/{id}` - Get specific account

**Transactions**
- `GET /transactions` - List all transactions
- `GET /transactions?filter[since]={date}&filter[until]={date}` - Date range
- `GET /accounts/{accountId}/transactions` - Account-specific transactions
- `GET /transactions/{id}` - Get transaction details

**Categories**
- `GET /categories` - List all categories (hierarchical)
- `PATCH /transactions/{transactionId}/relationships/category` - Categorize transaction

**Tags**
- `GET /tags` - List all tags
- `POST /transactions/{transactionId}/relationships/tags` - Add tags
- `DELETE /transactions/{transactionId}/relationships/tags` - Remove tags

**Webhooks**
- `POST /webhooks` - Create webhook
- `GET /webhooks/{id}` - Get webhook details
- `DELETE /webhooks/{id}` - Delete webhook
- `POST /webhooks/{webhookId}/ping` - Test webhook

### Important API Concepts

**Account Types**
- `TRANSACTIONAL` - Main spending account
- `SAVER` - Savings account (can have multiple)
- `HOME_LOAN` - Home loan account

**Ownership Types**
- `INDIVIDUAL` - Personal account
- `JOINT` - Shared 2Up account ⚠️ **Key Feature**

**Transaction Status**
- `HELD` - Pending/pre-authorization
- `SETTLED` - Completed transaction

**Performing Customer** (Joint Accounts)
- `performingCustomer.displayName` - Who made the transaction
- **Critical for joint account attribution**

## Joint Account Features

### Key Requirement
**NO SPLITTING OR SETTLEMENT TRACKING** - This is not an expense splitting app. Joint accounts are fully shared. We only want:
1. Visual distinction between joint/personal accounts
2. See who performed each transaction (`performingCustomer`)
3. Filter transactions by person
4. Analytics showing contribution breakdown

### Implementation Guidelines
- Display `performingCustomer.displayName` prominently on joint account transactions
- Add person-based filtering on joint account views
- Show contribution percentages in analytics (informational only)
- Use badges/avatars to visually distinguish who spent
- Never implement "owes" or "settlement" features

## Subscription Tracking

### Detection Algorithm
1. Scan transactions for recurring patterns
2. Group by normalized merchant name
3. Calculate time intervals (monthly = 28-31 days, quarterly = 90-92 days, annual = 365-366 days)
4. Check amount consistency (within 5% variance)
5. Require minimum 2 occurrences
6. Generate confidence score

### Merchant Normalization
```typescript
// Examples:
"Spotify 0123456789" → "Spotify"
"NETFLIX.COM" → "Netflix"
"APL*APPLE.COM/BILL" → "Apple"
```

### Storage
- Subscription metadata stored locally (API doesn't support custom fields)
- Link to transaction IDs
- Track price changes by comparing billing cycles
- Calculate next billing date based on frequency

## Code Style & Conventions

### TypeScript
- Use strict mode (already configured)
- Prefer `interface` over `type` for object shapes
- Use `type` for unions, primitives, utilities
- Explicit return types on functions
- Avoid `any` - use `unknown` if type truly unknown

### React
- Functional components only
- Custom hooks for reusable logic (prefix with `use`)
- Use React Query for server state
- Use Zustand for client state
- Props interfaces named `{ComponentName}Props`

### File Naming
- Components: PascalCase (`AccountCard.tsx`)
- Hooks: camelCase with `use` prefix (`useTransactions.ts`)
- Utilities: camelCase (`formatCurrency.ts`)
- Types: PascalCase (`Transaction.ts`)
- Constants: UPPER_SNAKE_CASE (`API_BASE_URL.ts`)

### Component Structure
```typescript
// Imports
import { useState } from 'react'
import { cn } from '@/lib/utils'

// Types/Interfaces
interface MyComponentProps {
  title: string
  onAction?: () => void
}

// Component
export function MyComponent({ title, onAction }: MyComponentProps) {
  // Hooks
  const [state, setState] = useState()

  // Event handlers
  const handleClick = () => {
    // ...
  }

  // Render
  return (
    <div className={cn("...")}>
      {/* ... */}
    </div>
  )
}
```

### Styling
- Use Tailwind utility classes
- Use `cn()` from `@/lib/utils` to merge classes conditionally
- Follow shadcn/ui patterns for component variants
- Responsive: mobile-first approach
- Dark mode: support via Tailwind's `dark:` prefix

### Data Fetching
```typescript
// React Query for API calls
const { data, isLoading, error } = useQuery({
  queryKey: ['transactions', accountId],
  queryFn: () => fetchTransactions(accountId),
})

// Zustand for UI state
const { filter, setFilter } = useTransactionStore()
```

## Key Features Implementation Guide

### Accounts Dashboard
- Fetch from `GET /accounts`
- Display cards using shadcn `Card` component
- Badge for joint accounts using shadcn `Badge`
- Filter dropdown using shadcn `Select`
- Show balance, account type, ownership type

### Transaction List
- Use shadcn `Table` or virtualized list for performance
- Filter by: date range, status, category, tag, account, person (for joint)
- Sort by date (newest first)
- Infinite scroll or pagination
- Click transaction → Dialog with details

### Person Attribution (Joint Accounts)
```typescript
// Check if transaction has performing customer
if (transaction.attributes.performingCustomer) {
  const name = transaction.attributes.performingCustomer.displayName
  // Display avatar/badge with name
}
```

### Subscription Detection
- Run on initial load for last 6 months of transactions
- Run on new transactions via webhook
- Store in local database
- UI in `src/features/subscriptions/`

### Real-Time Updates
- Webhook server receives POST to `/webhooks/up`
- Verify signature using `X-Up-Authenticity-Signature` header
- Event types: `TRANSACTION_CREATED`, `TRANSACTION_SETTLED`, `TRANSACTION_DELETED`
- Trigger React Query invalidation

## Environment Variables

```env
VITE_UP_API_TOKEN=              # Required: Up Banking API token
PORT=3001                        # Server port
NODE_ENV=development             # Environment
DATABASE_URL=file:./dev.db       # SQLite database
WEBHOOK_URL=                     # Optional: Your webhook URL
```

## Testing Approach

- Unit tests: Vitest
- Component tests: React Testing Library
- E2E tests: Playwright (future)
- API mocking: MSW (Mock Service Worker)

## Error Handling

- Use React Query's error states
- Show user-friendly messages
- Log errors (but never log sensitive data)
- Graceful degradation for API failures
- Retry logic for transient failures

## Security Considerations

1. **Never commit API tokens** (use .env, add to .gitignore)
2. **Validate webhook signatures** before processing
3. **Sanitize user inputs** before database queries
4. **Encrypt API token** in browser storage (if storing locally)
5. **HTTPS only** for production webhooks

## Documentation References

- [Project Plan](docs/PROJECT_PLAN.md) - Roadmap and phases
- [User Stories](docs/USER_STORIES.md) - Detailed requirements (39 stories)
- [Joint Accounts Design](docs/JOINT_ACCOUNTS_DESIGN.md) - Joint account features spec
- [Subscription Tracking Design](docs/SUBSCRIPTION_TRACKING_DESIGN.md) - Subscription features spec
- [Up API Documentation](https://developer.up.com.au) - Official API docs
- [shadcn/ui Documentation](https://ui.shadcn.com) - UI component docs

## Development Workflow

1. **Feature branches**: `feature/account-dashboard`, `feature/subscription-tracking`
2. **Commit messages**: Conventional commits (`feat:`, `fix:`, `docs:`, etc.)
3. **Before commit**: Run `npm run lint` and `npm run type-check`
4. **Component development**: Add shadcn components as needed via CLI

## Common Patterns

### Currency Formatting
```typescript
const formatCurrency = (amount: string, currency: string = 'AUD') => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency,
  }).format(parseFloat(amount))
}
```

### Date Formatting
```typescript
import { format, formatDistanceToNow } from 'date-fns'

format(new Date(date), 'MMM d, yyyy')
formatDistanceToNow(new Date(date), { addSuffix: true })
```

### API Client Pattern
```typescript
const upApi = {
  accounts: {
    list: (params?) => fetch(...),
    get: (id) => fetch(...),
  },
  transactions: {
    list: (params?) => fetch(...),
    get: (id) => fetch(...),
  },
}
```

## When Generating Code

1. **Check documentation first** - Refer to USER_STORIES.md for requirements
2. **Use existing patterns** - Follow the structure above
3. **Type everything** - No implicit `any`
4. **Responsive by default** - Mobile-first Tailwind classes
5. **Accessible** - Use shadcn components (built on Radix UI)
6. **Error handling** - Always handle loading/error states
7. **Real data** - Use actual Up API structure, not mock data
8. **Comments** - Only for complex logic, code should be self-documenting

## Priority Order (for implementation)

**Phase 1 (P0 - Must Have):**
1. API client and authentication
2. Account dashboard
3. Transaction list with filtering
4. Joint account person attribution
5. Basic categorization/tagging

**Phase 2 (P1 - Should Have):**
1. Subscription detection
2. Person-based analytics for joint accounts
3. Price change monitoring
4. Webhook setup

**Phase 3 (P2 - Nice to Have):**
1. Advanced analytics
2. Export functionality
3. Billing calendar
4. Budget tracking

---

**Last Updated**: January 21, 2026
**Version**: 1.0
**Status**: Active Development
