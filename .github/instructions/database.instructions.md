---
description: Use when creating or modifying Drizzle database schemas, seeders, or database queries.
applyTo:
  -"db/**/*.ts"
---

# Database Conventions

## Drizzle ORM Patterns

- The project runs on **Drizzle ORM (beta.22)** with **PostgreSQL**.
- All table definitions belong in individual files within `db/schemas/` (e.g. `db/schemas/users.ts`).
- **Crucial**: You must export any newly created schema inside `db/schemas/index.ts` so Drizzle resolves relations and tables properly.

## Shared Module Architecture

- Leverage the sub-directories under `db/schemas/_shared/` (like `id.ts` and `timestamp.ts`) when referencing common columns across tables to maintain a standardized DB schema.

## Schema Migrations Workflow

- If you edit, add, or drop schemas, remind the user or execute the following workspace commands:
  1. `bun run db:generate` (creates the migration in `./drizzle/migrations`)
  2. `bun run db:migrate` (applies the migration to the database)
- Ensure generated schemas and seed data stay in sync. Seed files are housed in `db/seeds/` and act on standard Drizzle client methods.
