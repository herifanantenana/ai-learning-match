# AGENTS.md

## Stack

- **Runtime**: Bun (pas npm/yarn/pnpm)
- **Framework**: Next.js 16.2.6 (App Router)
- **Database**: PostgreSQL + Drizzle ORM (beta.22)
- **Auth**: Clerk (`@clerk/nextjs` v7)
- **UI**: Tailwind CSS 4 + shadcn/ui (radix-vega style) + Radix primitives

## Commands

```bash
bun dev          # Start dev server (http://localhost:3000)
bun run build    # Production build
bun run lint     # ESLint
bun run db:generate   # Generate Drizzle migrations
bun run db:migrate    # Apply migrations
bun run db:push       # Push schema to DB (dev)
bun run db:seed:users # Seed test users
```

## Architecture

- `app/` - Next.js App Router (route groups use parentheses: `(auth-layout)`)
- `db/schemas/` - Drizzle table definitions
- `db/index.ts` - DB client export (`drizzle-orm/postgres-js`)
- `proxy.ts` - Clerk middleware (Next.js 16 terminology)
- `lib/utils.ts` - Contains `cn()` utility (shadcn standard)

## Environment

Required in `.env`:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Client-side key
- `CLERK_SECRET_KEY` - Server-side key

## Code Style

- Prettier with Tailwind CSS plugin (configured in `.prettierrc`)
- Tabs, semi-colons, single quotes off, trailing commas
- Use `@/` path aliases (defined in `tsconfig.json`)

## Middleware (Clerk)

```typescript
// proxy.ts - Next.js 16 uses this filename instead of middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/__clerk/(.*)',
  ],
}
```

## Auth Components

Use Clerk Core 3 components:
- `<ClerkProvider>` dans `app/layout.tsx` (inside `<body>`, not wrapping `<html>`)
- `<Show when="signed-in">` / `<Show when="signed-out">` (pas `<SignedIn>`/`<SignedOut>` méditisés)
- `<SignInButton>` / `<SignUpButton>` / `<UserButton>` depuis `@clerk/nextjs`

## Database Pattern

```typescript
// db/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL!, { prepare: false });
export const db = drizzle({ client });
```

## Shadcn Components

Components are in `components/ui/`. Add new ones with:
```bash
npx shadcn@latest add <component-name>
```

## Notes

- All routes are private by default via `clerkMiddleware()`
- Public routes need explicit configuration in middleware
- Webhook endpoints must be public (they use HMAC, not Clerk sessions)