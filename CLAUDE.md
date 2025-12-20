# Calndrbrnd

Open-source scheduling infrastructure and Calendly alternative with full control over data, workflows, and appearance.

## Project Structure

```
/
├── apps/
│   ├── web/              # Main Next.js web application
│   └── api/              # Public REST API (v1, v2)
├── packages/
│   ├── features/         # 70+ modular feature packages (bookings, workflows, organizations)
│   ├── lib/              # Core utilities (auth, bookings, payments, sync)
│   ├── ui/               # Shared component library
│   ├── platform/         # Public SDK (atoms, types, constants)
│   ├── app-store/        # 110+ integrations (Zoom, Google Calendar, Stripe)
│   ├── prisma/           # Database schema and migrations
│   ├── emails/           # Email templates
│   └── embeds/           # Embeddable widgets
├── companion/            # Browser extension and mobile app
├── tests/                # E2E and integration tests
└── scripts/              # Build and utility scripts
```

## Organization Rules

**Keep code organized and modularized:**
- Features → `/packages/features`, one feature per package
- API routes → `/apps/api` or `/apps/web/app/api`
- Components → `/packages/ui` for shared, `/apps/web/components` for app-specific
- Utilities → `/packages/lib`, grouped by functionality
- Types → `/packages/types` or co-located with usage
- Tests → Next to code or in `/tests` for E2E

**Modularity principles:**
- Single responsibility per file
- Clear, descriptive file names
- Group related functionality in feature packages
- Avoid monolithic files

## Code Quality - Zero Tolerance

After editing ANY file, run:

```bash
yarn lint
yarn type-check
```

Fix ALL errors/warnings before continuing.

**If changes affect the web app:**
1. Restart server: `yarn dev`
2. Check server output for errors
3. Fix ALL warnings/errors before continuing

**Before committing:**
```bash
yarn test
```
