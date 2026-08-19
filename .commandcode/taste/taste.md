# Taste

## Workflow
- Delegates git operations to the assistant: expects changes to be committed and pushed to GitHub on request, pushing directly to `main`. Confidence: 0.6
- Deploys the domain-page site via Cloudflare Workers (`npx wrangler deploy`); pushing to GitHub does not auto-deploy — expects `link.mnah.dev` (routed to the `domain-page` worker) to be redeployed after changes. Confidence: 0.7
