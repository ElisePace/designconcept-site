# Design Concept Site — Blue Insights

Interactive prototype: **Blue Insights — FY26 Revenue**, an analyst insight platform concept with an explainable "Research sidekick" AI panel.

Built with the Blue Insights design system (tokens + component bundle) exported from Claude Design.

## Run locally

```
npx serve site
```

## Structure

- `site/` — the deployable static site (`index.html` entry point)
- `site/_ds/` — design system tokens and component bundle

## Deploy

Deployed via Vercel with **Root Directory** set to `site` (no build step — static).
