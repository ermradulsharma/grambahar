# 🍃 GramBahar - AI Agent Guidelines & Project Rules

Refer to [AGENTS.md](file:///d:/github/NEXT%20Project/grambahar/AGENTS.md) for full active project guidelines and Next.js framework instructions.

---

## 🎯 Core Engineering Review Criteria

All code contributions, reviews, and refactors MUST strictly adhere to:

| Principle | Enforcement & Mandate |
| :--- | :--- |
| **DRY** | Reject duplicate queries, validation schemas, or utility code. Mandate central placement in `src/core/Helpers/`. |
| **SOLID** | Verify Single Responsibility (SRP) for Controllers vs. Services. Reject bloated monolithic files or mixed concerns. |
| **ACID** | Verify Mongoose `session.withTransaction()` on all payment, booking, wallet, and inventory mutations. |
| **KISS** | Reject over-complicated, unreadable, or "clever" code. Require simple, self-explanatory implementations. |
| **YAGNI** | Reject dead code, speculative future flags, or unused helper methods. |
| **BASE** | Verify eventual consistency design for QStash background jobs and Redis cache invalidation. |

---

## 🛠️ Framework & Stack Constraints
1. **Next.js 16+ (App Router)** & **React 19**: Server Components by default; use `'use client'` strictly when state/browser APIs are required.
2. **Strict TypeScript**: Never use `any`; maintain strict contracts and interfaces.
3. **Styling & Icons**: Vanilla CSS / CSS Modules with `globals.css` design tokens, plus `lucide-react`.
4. **Verification**: Always run `npm run build` or `npm run lint` before committing or finalizing major changes.
5. **Language**: Hinglish / Hindi / English (direct, action-oriented, with clickable file links).
