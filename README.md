# Up Smart Finance Dashboard

> A comprehensive personal finance management application for Up Banking customers

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)

## 🌟 Features

### Account Management
- **Multi-Account Overview**: View all your Up Banking accounts in one dashboard
- **Joint Account Support**: Clear visibility into shared 2Up accounts
- **Real-Time Balances**: Live updates of your account balances

### Smart Transaction Tracking
- **Comprehensive History**: Access all your transactions with powerful filtering
- **Joint Account Attribution**: See who performed each transaction on shared accounts
- **Advanced Filtering**: Filter by date, status, category, tags, and more
- **Categorization**: Organize transactions with Up's category system
- **Custom Tagging**: Add personal tags for better organization

### Joint Account Features
- **Person-Based Filtering**: Quickly see your spending vs your partner's
- **Contribution Analytics**: Understand spending patterns on shared accounts
- **Visual Distinction**: Clear indicators for joint vs personal accounts
- **Shared Tags**: Collaborate on transaction organization

### Subscription Tracking
- **Auto-Detection**: Automatically identifies recurring subscriptions
- **Price Monitoring**: Get alerted when subscription prices change
- **Billing Calendar**: See upcoming charges at a glance
- **Renewal Reminders**: Never miss a subscription renewal
- **Cancellation Guides**: Easy steps to cancel unwanted services

### Analytics & Insights
- **Spending Trends**: Visualize your financial patterns over time
- **Category Breakdown**: Understand where your money goes
- **Monthly Comparisons**: Track financial progress month-over-month
- **Export Data**: Download your data for external analysis

### Real-Time Updates
- **Webhook Integration**: Instant notifications for new transactions
- **Live Updates**: Dashboard refreshes automatically
- **Browser Notifications**: Stay informed of account activity

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- An [Up Banking](https://up.com.au) account
- Personal Access Token from https://api.up.com.au

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/up-finance-dashboard.git
cd up-finance-dashboard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Up Banking API token to .env

# Start development server
npm run dev
```

### Configuration

Create a `.env` file with your Up Banking API token:

```env
VITE_UP_API_TOKEN=your_token_here
```

## 📖 Documentation

- [Project Plan](docs/PROJECT_PLAN.md) - Overall project roadmap and phases
- [User Stories](docs/USER_STORIES.md) - Detailed feature requirements
- [Joint Accounts Design](docs/JOINT_ACCOUNTS_DESIGN.md) - Joint account features specification
- [Subscription Tracking Design](docs/SUBSCRIPTION_TRACKING_DESIGN.md) - Subscription features specification

## 🛠️ Technology Stack

- **Frontend**: React + TypeScript + Vite
- **UI**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand / React Query
- **Charts**: Recharts
- **Backend**: Node.js + Express + TypeScript
- **Database**: SQLite (local) / PostgreSQL (cloud)
- **ORM**: Prisma

## 🏗️ Project Structure

```
up-finance-dashboard/
├── src/
│   ├── components/       # React components
│   ├── features/         # Feature-specific code
│   │   ├── accounts/
│   │   ├── transactions/
│   │   ├── subscriptions/
│   │   └── analytics/
│   ├── lib/             # Utilities and helpers
│   ├── services/        # API clients
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript types
│   └── App.tsx          # Main application
├── server/              # Backend server
│   ├── webhooks/        # Webhook handlers
│   ├── db/             # Database schema
│   └── api/            # API routes
├── docs/               # Documentation
└── public/             # Static assets
```

## 🤝 Contributing

This is a personal project, but suggestions and bug reports are welcome! Please open an issue to discuss any changes.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔒 Security

- API tokens are encrypted at rest
- No third-party data sharing
- Webhook signature validation
- Local-first data storage

## ⚠️ Disclaimer

This is an unofficial application and is not affiliated with, endorsed by, or in any way officially connected with Up Banking or its parent company, Bendigo and Adelaide Bank Limited.

Use at your own risk. Always verify transaction data with the official Up Banking app.

## 🙏 Acknowledgments

- [Up Banking](https://up.com.au) for providing an excellent API
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- The open source community

## 📞 Support

For issues related to:
- **This app**: Open a GitHub issue
- **Up Banking API**: Visit https://github.com/up-banking/api
- **Your Up account**: Contact Up Banking support

---

**Built with ❤️ for better personal finance management**
