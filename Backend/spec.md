# Personal Finance Tracker — Spec Overview

A single-user web application for tracking personal expenses with manual entry, custom categories, per-category monthly budgets, and recurring transaction auto-generation. The goal is clarity: know where your money goes, and whether you’re staying within the limits you set for yourself.

## Users & Auth

*   **Single user**; no multi-tenancy required
*   Simple **email + password auth** (e.g. via bcrypt + sessions, or Passport.js / Lucia)
*   **No sign-up flow** needed — seed the one user via a setup script or env vars
*   Session persists across browser restarts (long-lived cookie)

## Data Models

### Category

| Field       | Type      | Notes                     |
| :---------- | :-------- | :------------------------ |
| id          | uuid      | PK                        |
| name        | text      | Unique, user-defined      |
| color       | text      | Hex color for UI charts   |
| icon        | text      | Optional emoji or icon name|
| archived_at | timestamp | Soft delete               |
| created_at  | timestamp |                           |

### Transaction

| Field          | Type      | Notes                               |
| :------------- | :-------- | :---------------------------------- |
| id             | uuid      | PK                                  |
| amount         | numeric   | Always positive                     |
| type           | enum      | `expense` or `income`               |
| category_id    | uuid      | FK → Category (nullable for income) |
| description    | text      | Free text note                      |
| date           | date      | User-specified                      |
| recurring_id   | uuid      | FK → RecurringRule (nullable)       |
| auto_generated | boolean   | True if created by recurring job    |
| created_at     | timestamp |                                     |

### RecurringRule

| Field        | Type      | Notes                                  |
| :----------- | :-------- | :------------------------------------- |
| id           | uuid      | PK                                     |
| name         | text      | e.g. “Monthly Rent”                    |
| amount       | numeric   |                                        |
| type         | enum      | `expense` or `income`                  |
| category_id  | uuid      | FK → Category                          |
| frequency    | enum      | `daily`, `weekly`, `monthly`, `yearly` |
| start_date   | date      | First occurrence                       |
| end_date     | date      | Nullable — open-ended if null          |
| day_of_month | integer   | Used when frequency = `monthly` (1–28) |
| active       | boolean   | Pause without deleting                 |
| created_at   | timestamp |                                        |

### Budget

| Field       | Type    | Notes                     |
| :---------- | :------ | :------------------------ |
| id          | uuid    | PK                        |
| category_id | uuid    | FK → Category             |
| month       | date    | Always first of the month |
| amount      | numeric | Spending limit            |
| created_at  | timestamp |                         |

**Constraint**: `(category_id, month)` is unique.

## Database Schema Notes

*   `amount` stored as `numeric(12, 2)` — no floating point
*   All timestamps in UTC; dates as `date` type
*   Soft-delete categories via `archived_at`
*   Unique constraint on transactions: `(recurring_id, date)` to prevent duplicate auto-generation
*   **Indexes**: `transactions(date)`, `transactions(category_id)`, `budgets(category_id, month)`

## Recurring Transaction Auto-generation

*   A **daily cron job** checks each active `RecurringRule`
*   If the next occurrence date has passed and no transaction exists for that `(recurring_id, date)`, it inserts one with `auto_generated = true`
*   If the app is offline for days, the job **catches up** on next run
*   Auto-generated transactions can be manually edited or deleted; deletion does not regenerate
*   Pausing a rule stops future generation; past transactions are untouched
*   `day_of_month` capped at 28 to avoid February edge cases

## Routes & URL Structure

```
GET  /                        → Redirect to /dashboard
GET  /dashboard               → Current month overview
GET  /transactions            → Full transaction list (filterable)
GET  /transactions/new        → New transaction form
POST /transactions            → Create
GET  /transactions/:id/edit   → Edit form
PUT  /transactions/:id        → Update
DELETE /transactions/:id      → Delete

GET  /categories              → List all
POST /categories              → Create
PUT  /categories/:id          → Update
DELETE /categories/:id        → Soft-archive

GET  /budgets                 → Budget list for current month
POST /budgets                 → Create / upsert
PUT  /budgets/:id             → Update amount
DELETE /budgets/:id           → Remove

GET  /recurring               → List rules
POST /recurring               → Create
PUT  /recurring/:id           → Edit
DELETE /recurring/:id         → Delete (leaves generated transactions)

GET  /reports                 → Monthly spending by category + budget vs actual
```

## Business Logic & Validations

*   `amount` must be > 0
*   `date` can be past or present; not more than 1 year in the future
*   `category_id` required for expenses, optional for income
*   Archiving a category with an active recurring rule warns and offers to pause the rule
*   Deleting a category is disallowed if it has transactions — archive instead
*   Months with no budget set still show actual spending in reports (budget column shows “—”)

## Error Handling

*   Form validation errors shown inline
*   Optimistic UI for quick actions; rollback on API failure
*   404 page for unknown routes
*   If recurring job fails, log the error; surface in a `/status` route

## Security

*   All routes behind auth middleware; redirect to `/login` if unauthenticated
*   CSRF protection on mutating routes
*   Server-side validation on all numeric fields
*   Parameterized queries everywhere

## Performance

*   Reports use a single `GROUP BY` SQL query, not N+1
*   Index `transactions(date, category_id)` for report filters
*   Budgets loaded per-month only

## Tech Stack (Suggested)

*   **Frontend**: React (Vite) or Next.js; Recharts or Chart.js for reports
*   **Backend**: Spring Boot (Express or Next.js API routes)
*   **DB**: PostgreSQL with Prisma or raw `pg`
*   **Auth**: Lucia or `iron-session`
*   **Cron**: `node-cron` in-process or `pg_cron`

