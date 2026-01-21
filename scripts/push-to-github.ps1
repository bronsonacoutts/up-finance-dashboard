# GitHub Repository Quick Setup Script
# Run this after creating your repository on GitHub

# Configuration - UPDATE THESE VALUES
$GITHUB_USERNAME = "YOUR_USERNAME"  # Replace with your GitHub username
$REPO_NAME = "up-finance-dashboard"

# Derived values
$REMOTE_URL = "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "GitHub Repository Setup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (!(Test-Path ".git")) {
    Write-Host "ERROR: Not in a git repository!" -ForegroundColor Red
    exit 1
}

Write-Host "Current repository status:" -ForegroundColor Yellow
git status
Write-Host ""

# Rename branch to main if needed
$currentBranch = git branch --show-current
if ($currentBranch -eq "master") {
    Write-Host "Renaming branch from master to main..." -ForegroundColor Yellow
    git branch -M main
}

# Add remote if not exists
$remotes = git remote
if ($remotes -notcontains "origin") {
    Write-Host "Adding remote origin: $REMOTE_URL" -ForegroundColor Yellow
    git remote add origin $REMOTE_URL
}
else {
    Write-Host "Remote 'origin' already exists:" -ForegroundColor Yellow
    git remote get-url origin
}

Write-Host ""
Write-Host "Ready to push? This will:" -ForegroundColor Cyan
Write-Host "  1. Push to branch 'main'" -ForegroundColor White
Write-Host "  2. Set upstream tracking" -ForegroundColor White
Write-Host ""

$confirm = Read-Host "Continue? (y/n)"
if ($confirm -eq 'y' -or $confirm -eq 'Y') {
    Write-Host ""
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    git push -u origin main
    
    Write-Host ""
    Write-Host "====================================" -ForegroundColor Green
    Write-Host "SUCCESS! Repository pushed to GitHub" -ForegroundColor Green
    Write-Host "====================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. View your repo: https://github.com/$GITHUB_USERNAME/$REPO_NAME" -ForegroundColor White
    Write-Host "  2. Run: .\setup-github-workspace.ps1" -ForegroundColor White
    Write-Host ""
}
else {
    Write-Host "Cancelled." -ForegroundColor Yellow
}
