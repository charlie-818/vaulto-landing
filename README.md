# vaulto-landing

Public marketing site for Vaulto Protocol. Deployed to **vaulto.fi**.

Separate from the trading platform (`Vaulto-Protocol` repo) at **app.vaulto.fi**.

## Routes

- `/` — landing page
- `/waitlist-success` — post-signup screen
- `/compliance` — SEC research knowledge base (built from `content/sec-research/`)
- `/compliance/[slug]` — individual compliance docs

## Dev

```bash
pnpm install
pnpm dev
```

Set `NEXT_PUBLIC_PLATFORM_API_URL` to the platform origin so waitlist signups POST to the right place.

## Stack

- Next.js 15 App Router
- Tailwind CSS
- react-markdown for compliance pages
- No Prisma, no Web3, no Privy/NextAuth — that all lives in the platform repo
