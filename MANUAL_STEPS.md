# Manual Setup Steps for "Non-AI Agent" (You)

This document outlines the manual steps required to fully activate the features built so far, specifically regarding Authentication and Environment setup.

## 1. Supabase Configuration (Authentication)
The application currently uses Supabase for the login system and user session management. The code is ready, but it needs a backend project to talk to.

1.  **Create Project**: Go to [Supabase](https://supabase.com) and create a new project.
2.  **Enable Auth**:
    *   Go to **Authentication > Providers**.
    *   Ensure **Email** is enabled.
    *   (Optional) Configure "Site URL" in Authentication > URL Configuration to `http://localhost:3000` (or your dev port) for Magic Links to redirect correctly.
3.  **Get Keys**:
    *   Go to **Settings > API**.
    *   Copy the **Project URL**.
    *   Copy the **anon public key**.
4.  **Configure Local Env**:
    *   Create a file named `.env` in the root of the project (you can copy `.env.example`).
    *   Fill in the variables:
        ```env
        VITE_SUPABASE_URL=your_project_url
        VITE_SUPABASE_ANON_KEY=your_anon_key
        ```

## 2. Dependencies
I have added several new packages (`recharts`, `@supabase/supabase-js`, `lucide-react`, etc.).
*   Run `npm install` to ensure your local `node_modules` is up to date with the `package.json` changes.

## 3. Up Banking API (Future Prep)
Currently, the app is running in **Mock Mode**, so you do **not** need an Up Banking API token yet. The data you see (Netflix, Spotify, etc.) is simulated.
*   **Action**: None required right now.
*   **Future**: When we implement the "Real Data" switch, you will need to generate a Personal Access Token at [developer.up.com.au](https://developer.up.com.au).

## 4. Verifying the Setup
1.  Run `npm run dev`.
2.  You should be redirected to the **Login** screen.
3.  Enter your email.
4.  If Supabase is set up correctly, you will receive a Magic Link email.
5.  Clicking it should log you in and take you to the **Subscription Dashboard**.
