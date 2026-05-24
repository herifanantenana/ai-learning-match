---
description: Use when building React components, Next.js pages, or working with frontend styles.
applyTo:
  -"app/**/*.tsx"
  -"components/**/*.tsx"
  -"lib/**/*.ts"
---

# Frontend Component Conventions

## Next.js App Router

- Default to **React Server Components (RSC)**. Do not add `'use client'` unless strictly necessary.
- Add `'use client'` only at the top of files that rely on React hooks (`useState`, `useEffect`), DOM event listeners (`onClick`), or client-side libraries like `@tanstack/react-query`.

## Styling & UI Components

- Use **Tailwind CSS v4** for all styling.
- Always use the `cn()` utility from `@/lib/utils` to merge Tailwind class names logically instead of raw template literals or basic string concatenation.
- Maximize the use of the **shadcn/ui** design system component folder (`@/components/ui/`). Never build raw accessible components (like custom dropdowns or dialogs) if a shadcn equivalent exists or can be added.

## State Management & Auth

- For client-side data queries and mutations, rely on `@tanstack/react-query` (v5).
- For Auth logic using Clerk, use the generic `<Show when="signed-in">` and `<Show when="signed-out">` components rather than legacy `<SignedIn>` wrappers.
