# AGENTS.md

## Stack

- **Runtime**: Bun (not npm/yarn/pnpm)
- **Project**: meetsy (directory is `ai-learning-match`)
- **Framework**: Next.js 16.2.6 (App Router)
- **Database**: PostgreSQL (Supabase) + Drizzle ORM (beta.22)
- **State/Fetching**: @tanstack/react-query v5
- **Auth**: Clerk (`@clerk/nextjs` v7)
- **UI**: Tailwind CSS 4 + shadcn/ui (radix-vega) + Radix primitives

## Commands

```bash
bun dev               # http://localhost:3000
bun run build         # Production build + typecheck (no separate typecheck script)
bun run lint          # ESLint
bun run start         # Start production server
bun run db:generate   # Drizzle migration generation
bun run db:migrate    # Apply migrations
bun run db:push       # Push schema (dev only)
bun run db:studio     # Drizzle Studio
bun run db:seed       # Seed test data (bun run ./db/seeds/index.ts)
bun run db:clean      # Clean database
bun run db:drop       # Drop all tables
```

## Architecture

- `app/` — Next.js App Router with route groups:
  - `(auth-layout)/` — wraps sign-in/sign-up (centered layout)
  - `(main)/` — wraps dashboard (container layout)
- `db/schemas/` — Drizzle table definitions, one file per table
  - `_shared/` — reusable column helpers: `id.ts` (UUID defaultRandom), `timestamp.ts`, `type.ts` (enums)
  - `index.ts` — barrel export; **must re-export every new schema**
  - `_tables.ts` — grouped table imports for `drizzle()`
  - `_relations.ts` — centralized `defineRelations()` definition
- `db/index.ts` — DB client: `drizzle({ client, schema: tables, relations })` via `pg` Pool
- `proxy.ts` — Clerk middleware (Next.js 16 naming; was `middleware.ts` in v15)
- `components/` — `layout/`, `page/`, `providers/`, `ui/` (shadcn)
- `@/` path alias maps to project root

## Code Style

- Tabs, semicolons, double quotes, trailing commas (`.prettierrc`)
- `cn()` from `@/lib/utils` for class merging
- Prettier ignores: public, node_modules, build, dist, .vscode, .next

## Prettier

```bash
bunx prettier --check .
bunx prettier --write .
```

## Middleware

- `proxy.ts`: all routes private by default; no `publicRoutes` set yet
- Webhook endpoints must be explicitly public (HMAC auth, not Clerk sessions)

## Auth

- Sign-in/sign-up pages: `app/(auth-layout)/sign-in/[[...sign-in]]/` and `sign-up/[[...sign-up]]/`
- Use `<SignIn />` / `<SignUp />` from `@clerk/nextjs`
- `useUser()` for client-side current user
- `<Show when="signed-in">` / `<Show when="signed-out">` (not legacy `<SignedIn>`/`<SignedOut>`)

## Database

- **Relations defined centrally** in `db/schemas/_relations.ts` via `defineRelations()` (not per-file `defineRelationsPart`)
- After editing schemas: `bun run db:generate` → `bun run db:migrate` (or `db:push` for dev)
- DB client uses `pg` (node-postgres) Pool — `prepare` option not used with `pg`
- Seeds: `bun run db:seed`

## React Query

- Provider in `components/providers/query-provider.tsx` (`'use client'`)
- Defaults: `refetchOnWindowFocus: true`, `staleTime: 0`

## Environment (`.env`)

- `DATABASE_URL` — pooled Supabase (port 6543)
- `DIRECT_DATABASE_URL` — direct Supabase (port 5432)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `.env.exemple` is the template (typo preserved)

## Stale files

- `app/meetsy-globals.css` is **not imported** anywhere — legacy file, do not use
