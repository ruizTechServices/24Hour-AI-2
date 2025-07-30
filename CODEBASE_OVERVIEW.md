# Codebase Overview

## Architecture

- **Framework**: Next.js (App Router). Front‑end pages live in `app/`. API routes are under `app/api/` for serverless functions.
- **UI**: Tailwind CSS with ShadCN component library (`components/ui`).
- **State & Auth**: Supabase is used for authentication and database (PostgreSQL). Client helpers are in `lib/supabase/`.
- **AI Service Layer**: `lib/ai/` wraps OpenAI, Anthropic, Google, Mistral and DeepSeek. `aiService` handles provider selection, rate limit and circuit breaker logic.
- **Embeddings**: `lib/embeddings/service.ts` uses OpenAI to generate embeddings and store them in Supabase `pgvector` table. Search API is exposed via `app/api/embeddings/`.
- **Payments**: `lib/square/` integrates Square checkout, refunds and webhooks. Related API routes are under `app/api/payments/`.
- **Dashboard & Auth Pages**: `/app/dashboard`, `/app/login`, `/app/signup`. Global layout is defined in `app/layout.tsx`.

## Database & RLS

- Supabase provides authentication and all tables. `supabase/seed.sql` seeds demo data.
- RLS policies are mentioned in README as implemented but policy files are not included here.
- `lib/supabase/middleware.ts` refreshes sessions for server components.

## Outstanding TODOs (from README)

- Harden RLS and rate limiting on auth routes.
- CI automation: lint, test, type-check, preview deployments.
- Playwright e2e tests and observability (Sentry, healthchecks).
- Documentation: typedoc API reference, expanded README and public changelog.
- Front‑end: pricing section on landing page, finalize dashboard with live data.

## Recommended Next Steps

- [ ] Add comprehensive RLS policies to repository.
- [ ] Complete Square webhook flows and subscription updates.
- [ ] Implement CI pipeline and type‑safe API client.
- [ ] Write integration tests for API routes and payment logic.
- [ ] Polish dashboard UI and integrate real Supabase queries.

