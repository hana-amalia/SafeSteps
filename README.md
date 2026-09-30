# SafeSteps

Forward- and backward-chaining knowledge-based system for explainable first-aid decision support.
Static site: one `index.html`, no build step, no backend, no data leaves the browser.

**Not a medical device. In an emergency, call your local emergency number.**

## Files
- `index.html`: knowledge base (facts and rules), inference engine and UI
- `vercel.json`: clean URLs and security headers (strict CSP, no external requests)
- `tests/run.js`: scenario tests for the engine

## Editing rules
Rules live in the `RULES` array in `index.html`, in priority order. Each has conditions,
actions, an optional `strength: "consider"` and a source citation.
