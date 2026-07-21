# Plan: Make Crisistance code available on a public GitHub repository

## Current state
- The app is published publicly at `https://crisis-preparedness-hub.lovable.app`.
- The project's git remote currently points to Lovable's internal storage, not GitHub.
- No GitHub repository is connected yet, so the codebase is not available for public cloning or viewing.

## Goal
Create a public GitHub repository containing the full Crisistance source code and keep it in sync with Lovable.

## Steps

1. **Connect GitHub inside Lovable**
   - In the Lovable editor, open the **Plus (+)** menu in the chat input.
   - Select **GitHub → Connect project**.
   - Authorize the Lovable GitHub App.
   - Choose the GitHub account/organization where the repo should live.
   - Click **Create Repository**.
   - Lovable will push the current codebase and enable two-way sync.

2. **Make the repository public on GitHub**
   - After the repo is created, go to the repository on GitHub.
   - Open **Settings → General → Danger Zone → Change repository visibility**.
   - Select **Public** and confirm.

3. **Review repository contents for public safety**
   - Verify no secrets, API keys, passwords, or personal data are in the pushed files.
   - Check `.env` files and any hardcoded credentials are excluded (Lovable normally excludes these, but worth confirming).
   - Ensure `README`, license, and any branding assets are appropriate for public viewing.

4. **Verify sync is working**
   - Make a small change in Lovable and confirm it appears in the GitHub repo.
   - Optionally make a small edit on GitHub and confirm it syncs back to Lovable.

## What I will do vs. what you need to do
- **You need to do steps 1 and 2** in the Lovable editor and GitHub UI, because GitHub authorization and repository visibility changes require your account.
- **I can help with step 3** by scanning the codebase for obvious secrets or sensitive files before you make it public.
- **I can guide you through step 4** once the repo is connected.

## Notes
- Lovable's Git sync is bidirectional: changes in Lovable push to GitHub, and changes pushed to GitHub sync back to Lovable.
- Public remixing in Lovable is separate from GitHub public visibility. This plan focuses on GitHub only.
- If you later want Claude or another AI assistant to call tools in the app (not just view code), that requires setting up an MCP server, which is a different integration.

Would you like me to proceed by scanning the codebase for sensitive content before you connect GitHub?