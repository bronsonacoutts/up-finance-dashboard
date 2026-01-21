# GitHub Repository Setup Instructions

Since I cannot directly create a GitHub repository for you, here are the steps to set it up:

## 1. Create GitHub Repository

1. Go to https://github.com/new
2. Fill in the repository details:
   - **Repository name**: `up-finance-dashboard`
   - **Description**: "A comprehensive personal finance management application for Up Banking customers"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)

## 2. Link Local Repository to GitHub

After creating the repository on GitHub, run these commands:

```bash
cd c:\Users\BronsonCoutts\source\up-finance-dashboard

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/up-finance-dashboard.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 3. Create GitHub Issues from User Stories

You can either:

### Option A: Manually create issues from USER_STORIES.md

Go to your repository's Issues tab and create issues for each Epic/Story.

### Option B: Use GitHub CLI (if installed)

```bash
# Install GitHub CLI if you haven't: https://cli.github.com/

# Login to GitHub
gh auth login

# Create issues for Phase 1 (Priority P0)
gh issue create --title "View All Accounts" --body "See docs/USER_STORIES.md - Story 1.1" --label "P0,epic:accounts"
gh issue create --title "Distinguish Joint vs Personal Accounts" --body "See docs/USER_STORIES.md - Story 1.2" --label "P0,epic:accounts"
gh issue create --title "View Transaction History" --body "See docs/USER_STORIES.md - Story 2.1" --label "P0,epic:transactions"
gh issue create --title "Filter Transactions" --body "See docs/USER_STORIES.md - Story 2.2" --label "P0,epic:transactions"
gh issue create --title "See Who Made Joint Account Transactions" --body "See docs/USER_STORIES.md - Story 2.3" --label "P0,epic:joint-accounts"
gh issue create --title "Filter Joint Transactions by Person" --body "See docs/USER_STORIES.md - Story 2.4" --label "P0,epic:joint-accounts"
gh issue create --title "View Spending by Person" --body "See docs/USER_STORIES.md - Story 3.1" --label "P0,epic:analytics"
gh issue create --title "Detect Subscriptions Automatically" --body "See docs/USER_STORIES.md - Story 4.1" --label "P0,epic:subscriptions"
gh issue create --title "View Subscription Dashboard" --body "See docs/USER_STORIES.md - Story 4.2" --label "P0,epic:subscriptions"
gh issue create --title "Secure API Token Storage" --body "See docs/USER_STORIES.md - Story 7.1" --label "P0,epic:settings"
```

## 4. Set Up Project Board (Optional)

1. Go to your repository's Projects tab
2. Click "New project"
3. Choose "Board" template
4. Name it "Up Finance Dashboard"
5. Add columns: Backlog, To Do, In Progress, In Review, Done
6. Link issues to the board

## 5. Configure Repository Settings

### Branch Protection
1. Go to Settings → Branches
2. Add branch protection rule for `main`:
   - Require pull request reviews
   - Require status checks to pass

### Topics (for discoverability)
Add these topics to your repository:
- `up-banking`
- `finance`
- `personal-finance`
- `react`
- `typescript`
- `dashboard`
- `banking-api`

### About Section
Fill in the About section with:
- Description: "A comprehensive personal finance management application for Up Banking customers"
- Website: (your deployment URL when ready)
- Topics: (as above)

## 6. Next Steps

After GitHub setup:

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env and add your Up Banking API token
# Get it from: https://api.up.com.au

# Start development
npm run dev
```

Your local repository is already set up and committed. Just need to push to GitHub!
