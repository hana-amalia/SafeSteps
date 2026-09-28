# SafeSteps

Forward- and backward-chaining knowledge-based system for explainable first-aid decision support.
Static site: one `index.html`, no build step, no backend, no data leaves the browser.

**Not a medical device. In an emergency, call your local emergency number.**

## Run locally
    npm start        # serves at http://localhost:3000
    npm test         # runs the rule-engine scenarios

## Deploy to Vercel
**Option A: from GitHub (gives you automatic redeploys)**
1. Push this folder to a GitHub repo.
2. On vercel.com choose Add New, then Project, and import the repo.
3. Framework Preset: **Other**. Leave Build Command and Output Directory empty. Click Deploy.

**Option B: CLI**
    npm i -g vercel
    vercel --prod

## Files
- `index.html`: knowledge base (facts and rules), inference engine and UI
- `vercel.json`: clean URLs and security headers (strict CSP, no external requests)
- `tests/run.js`: scenario tests for the engine

## Editing rules
Rules live in the `RULES` array in `index.html`, in priority order. Each has conditions,
actions, an optional `strength: "consider"` and a source citation.
