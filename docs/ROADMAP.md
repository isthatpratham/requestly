# Requestly Development Roadmap

**Version:** 1.0
**Status:** Approved
**Target:** Fully Polished MVP
**Timeline:** 3 Days

---

## 1. Roadmap Objective

Build and deploy a fully polished MVP of Requestly within three days.

The MVP must provide:

* Public API discovery
* API catalog
* API search and filtering
* API detail pages
* Live API health checks
* Interactive API Playground
* Arbitrary API URL testing
* Request configuration
* Authentication support
* Response inspection
* Code generation
* Browser-local collections
* Browser-local request history
* MongoDB-backed API catalog
* Responsive Apple-inspired UI
* Vercel deployment

---

# 2. Development Principles

Throughout development:

* Complete the current phase before moving to the next.
* Keep the implementation aligned with `PRD.md`.
* Follow `DESIGN_SYSTEM.md` for all UI work.
* Follow `ARCHITECTURE.md` for structural decisions.
* Follow `DATABASE.md` for MongoDB decisions.
* Follow `API.md` for internal API contracts.
* Do not introduce features outside the approved MVP without a deliberate decision.
* Prefer simple implementations over unnecessary abstractions.
* Test important functionality as it is built.
* Do not sacrifice security for speed.

---

# 3. Phase Overview

```text
Phase 0   Foundation
Phase 1   API Catalog
Phase 2   Explore Experience
Phase 3   API Details & Health
Phase 4   Playground
Phase 5   Code Generation
Phase 6   Local Collections & History
Phase 7   Security & Reliability
Phase 8   UI Polish & Responsive Design
Phase 9   Testing & Performance
Phase 10  Deployment & Release
```

---

# DAY 1

## Phase 0 — Foundation

**Goal:** Establish the Requestly application foundation.

### Tasks

* [ ] Initialize Next.js project.
* [ ] Configure TypeScript.
* [ ] Configure Tailwind CSS.
* [ ] Configure linting.
* [ ] Configure project scripts.
* [ ] Establish the agreed folder structure.
* [ ] Configure base layout.
* [ ] Implement design tokens.
* [ ] Establish typography system.
* [ ] Establish base UI components.
* [ ] Configure environment variables.
* [ ] Create `.env.example`.
* [ ] Connect MongoDB Atlas.
* [ ] Verify production-compatible MongoDB connection.
* [ ] Initialize Git repository if not already initialized.

### Completion Criteria

* Application starts successfully.
* TypeScript passes.
* Linting passes.
* MongoDB connection works.
* Base design system is implemented.
* No unnecessary dependencies are introduced.

---

# Phase 1 — API Catalog

**Goal:** Import and expose the complete `public-apis` dataset.

### Tasks

* [ ] Obtain the current `public-apis` dataset.
* [ ] Implement catalog parser.
* [ ] Normalize API records.
* [ ] Validate API URLs.
* [ ] Normalize categories.
* [ ] Normalize authentication metadata.
* [ ] Normalize HTTPS metadata.
* [ ] Normalize CORS metadata.
* [ ] Implement deduplication.
* [ ] Implement MongoDB import script.
* [ ] Add API indexes.
* [ ] Run initial import.
* [ ] Verify imported records.
* [ ] Implement `/api/apis`.
* [ ] Implement `/api/apis/[id]`.

### Completion Criteria

* Complete usable dataset is available in MongoDB.
* Duplicate records are avoided.
* Catalog API returns valid data.
* API search works.
* API filtering works.
* Pagination works.

---

# Phase 2 — Explore Experience

**Goal:** Build the primary API discovery experience.

### Tasks

* [ ] Build landing page.
* [ ] Implement navigation.
* [ ] Build API search interface.
* [ ] Build category filtering.
* [ ] Build API cards/list.
* [ ] Build loading states.
* [ ] Build empty states.
* [ ] Build error states.
* [ ] Add API metadata display.
* [ ] Add responsive behavior.
* [ ] Connect Explore UI to catalog API.

### Completion Criteria

A user can:

1. Open Requestly.
2. Understand the product.
3. Navigate to Explore.
4. Search APIs.
5. Filter APIs.
6. Browse results.
7. Open an API.

---

# Phase 3 — API Details & Health

**Goal:** Make API information useful and trustworthy.

### Tasks

* [ ] Build API detail page.
* [ ] Display API metadata.
* [ ] Display authentication information.
* [ ] Display HTTPS information.
* [ ] Display CORS information.
* [ ] Implement `/api/health`.
* [ ] Implement live endpoint checking.
* [ ] Measure response time.
* [ ] Capture HTTP status.
* [ ] Handle timeout.
* [ ] Handle DNS/network failures.
* [ ] Distinguish unreachable APIs from HTTP error responses.
* [ ] Display real operational status.
* [ ] Persist appropriate health-check information in MongoDB.

### Completion Criteria

The API detail page shows real information.

Examples:

```text
● Operational
200 OK
183 ms
```

or:

```text
○ Unavailable
Connection failed
```

The interface must never display a fake operational state.

---

# DAY 2

## Phase 4 — Playground

**Goal:** Build the core Requestly interaction.

### Tasks

* [ ] Build Playground layout.
* [ ] Implement HTTP method selector.
* [ ] Implement URL input.
* [ ] Implement query parameter editor.
* [ ] Implement headers editor.
* [ ] Implement JSON body editor.
* [ ] Implement API Key authentication.
* [ ] Implement Bearer authentication.
* [ ] Implement Basic Authentication.
* [ ] Implement Send Request action.
* [ ] Implement `/api/request`.
* [ ] Implement request validation.
* [ ] Implement outbound request engine.
* [ ] Implement timeout handling.
* [ ] Implement response normalization.
* [ ] Build response viewer.
* [ ] Display HTTP status.
* [ ] Display response time.
* [ ] Display response headers.
* [ ] Display formatted JSON.
* [ ] Display raw responses where appropriate.
* [ ] Build request error states.

### Completion Criteria

A user can enter an arbitrary URL and execute a real request.

Example:

```text
GET https://api.github.com/users/octocat
```

The Playground must display the actual response.

---

# Phase 5 — Code Generation

**Goal:** Turn configured requests into usable integration code.

### Tasks

* [ ] Build request configuration representation.
* [ ] Implement cURL generator.
* [ ] Implement JavaScript generator.
* [ ] Implement Python generator.
* [ ] Build code viewer.
* [ ] Add language selection.
* [ ] Add copy action.
* [ ] Ensure generated code reflects request configuration.
* [ ] Ensure credentials are handled carefully.

### Completion Criteria

A configured request can be converted into accurate, readable:

* cURL
* JavaScript
* Python

examples.

---

# Phase 6 — Local Collections & History

**Goal:** Allow users to organize and revisit useful work without creating accounts.

### Tasks

* [ ] Implement browser-local storage strategy.
* [ ] Build collection creation.
* [ ] Build collection deletion.
* [ ] Save APIs to collections.
* [ ] Remove APIs from collections.
* [ ] Build Collections page.
* [ ] Implement request history.
* [ ] Store recent request metadata locally.
* [ ] Build History page.
* [ ] Allow previous requests to be reopened.
* [ ] Ensure credentials are not persisted.
* [ ] Add appropriate local storage limits.

### Completion Criteria

A user can:

* Create a collection.
* Save an API.
* Reopen the collection.
* View request history.
* Reopen a previous request.
* Use all of this without an account.

No user-local data should be sent to MongoDB.

---

# DAY 3

## Phase 7 — Security & Reliability

**Goal:** Make arbitrary API execution safe enough for production deployment.

### Tasks

* [ ] Implement SSRF protection.
* [ ] Block localhost destinations.
* [ ] Block private network destinations.
* [ ] Block internal hostnames where appropriate.
* [ ] Block cloud metadata endpoints.
* [ ] Validate redirects.
* [ ] Validate request URLs.
* [ ] Validate HTTP methods.
* [ ] Validate headers.
* [ ] Validate request bodies.
* [ ] Implement request timeout.
* [ ] Implement request size limits.
* [ ] Implement response size limits.
* [ ] Protect authentication credentials.
* [ ] Prevent secrets from entering logs.
* [ ] Add rate limiting or abuse protection.
* [ ] Review error responses.
* [ ] Review environment variables.
* [ ] Review exposed server information.

### Completion Criteria

The request engine rejects unsafe destinations and malformed requests.

Sensitive credentials are never persisted remotely or exposed through logs.

---

# Phase 8 — UI Polish & Responsive Design

**Goal:** Make Requestly feel like a finished product.

### Tasks

* [ ] Review entire visual hierarchy.
* [ ] Apply final typography.
* [ ] Refine spacing.
* [ ] Refine borders.
* [ ] Remove unnecessary visual elements.
* [ ] Remove accidental shadows.
* [ ] Remove unintended gradients.
* [ ] Verify corner-radius consistency.
* [ ] Refine buttons.
* [ ] Refine inputs.
* [ ] Refine API cards.
* [ ] Refine Playground controls.
* [ ] Refine response viewer.
* [ ] Refine navigation.
* [ ] Implement landing-page hero.
* [ ] Implement approved hero motion.
* [ ] Add subtle interaction animations.
* [ ] Add loading states.
* [ ] Add empty states.
* [ ] Add error states.
* [ ] Test responsive layouts.
* [ ] Test mobile navigation.
* [ ] Test Playground on smaller screens.
* [ ] Verify accessibility.

### Completion Criteria

The application feels visually consistent from landing page through Playground.

The interface should meet the standards defined in `DESIGN_SYSTEM.md`.

---

# Phase 9 — Testing & Performance

**Goal:** Verify that the MVP is reliable before deployment.

### Tasks

* [ ] Add unit tests for important utilities.
* [ ] Test API validation.
* [ ] Test URL validation.
* [ ] Test SSRF protection.
* [ ] Test request construction.
* [ ] Test response normalization.
* [ ] Test code generation.
* [ ] Test catalog parsing.
* [ ] Test database operations.
* [ ] Test important UI interactions.
* [ ] Test API failure states.
* [ ] Test timeout behavior.
* [ ] Test malformed responses.
* [ ] Test large responses.
* [ ] Run TypeScript checks.
* [ ] Run linting.
* [ ] Run production build.
* [ ] Review browser console.
* [ ] Review server logs.
* [ ] Review network requests.
* [ ] Check page performance.
* [ ] Remove unused dependencies.
* [ ] Remove unused code.

### Completion Criteria

The production build succeeds.

No known critical errors remain.

Important request, catalog, security and UI flows have been tested.

---

# Phase 10 — Deployment & Release

**Goal:** Deploy Requestly as a production-ready portfolio project.

### Tasks

* [ ] Create production MongoDB Atlas configuration.
* [ ] Configure Vercel project.
* [ ] Configure environment variables.
* [ ] Deploy production build.
* [ ] Run catalog import against production database.
* [ ] Verify production database access.
* [ ] Test Explore.
* [ ] Test API details.
* [ ] Test health checks.
* [ ] Test Playground.
* [ ] Test code generation.
* [ ] Test collections.
* [ ] Test request history.
* [ ] Test responsive layouts.
* [ ] Test error handling.
* [ ] Verify no secrets are exposed.
* [ ] Verify production logs.
* [ ] Configure custom domain if available.
* [ ] Update README.
* [ ] Add screenshots.
* [ ] Document architecture.
* [ ] Document setup instructions.
* [ ] Perform final Git cleanup.
* [ ] Create production release.

### Completion Criteria

Requestly is publicly accessible through Vercel and the complete MVP workflow works in production.

---

# 4. MVP Feature Checklist

Before calling the project complete:

## Discovery

* [ ] Landing page
* [ ] Explore page
* [ ] API search
* [ ] API filtering
* [ ] API categories
* [ ] API cards/list
* [ ] API details

## Playground

* [ ] Arbitrary URL
* [ ] GET
* [ ] POST
* [ ] PUT
* [ ] PATCH
* [ ] DELETE
* [ ] Query parameters
* [ ] Headers
* [ ] JSON body
* [ ] API Key
* [ ] Bearer Token
* [ ] Basic Auth
* [ ] Send request
* [ ] Response status
* [ ] Response time
* [ ] Response headers
* [ ] Response body
* [ ] Error handling

## Developer Tools

* [ ] cURL generation
* [ ] JavaScript generation
* [ ] Python generation
* [ ] Copy code

## Local Features

* [ ] Collections
* [ ] Save API
* [ ] Remove API
* [ ] Request history
* [ ] Reopen request
* [ ] No account required

## Backend

* [ ] MongoDB Atlas
* [ ] API catalog
* [ ] Health-check data
* [ ] Catalog API routes
* [ ] Request API route
* [ ] Health API route

## Security

* [ ] URL validation
* [ ] SSRF protection
* [ ] Timeout
* [ ] Request limits
* [ ] Response limits
* [ ] Credential protection
* [ ] No secret logging
* [ ] Abuse protection

## Quality

* [ ] Responsive
* [ ] Accessible
* [ ] Tested
* [ ] Linted
* [ ] Type-safe
* [ ] Production build succeeds
* [ ] Vercel deployment works

---

# 5. Definition of Done

Requestly is considered MVP-complete only when all of the following are true:

* [ ] Core functionality works locally.
* [ ] Core functionality works in production.
* [ ] API catalog is populated.
* [ ] MongoDB integration works.
* [ ] Arbitrary API requests work.
* [ ] Unsafe requests are blocked.
* [ ] Live API status is based on real checks.
* [ ] Collections work locally.
* [ ] Request history works locally.
* [ ] Code generation works.
* [ ] Important failure states are handled.
* [ ] Responsive layouts work.
* [ ] Accessibility basics are covered.
* [ ] TypeScript passes.
* [ ] Linting passes.
* [ ] Production build passes.
* [ ] No known critical security issue remains.
* [ ] No unnecessary feature has been added outside the approved MVP.
* [ ] Documentation reflects the final implementation.

---

# 6. Post-MVP Backlog

These features are intentionally deferred:

```text
Scheduled API monitoring
Uptime history
API change detection
OpenAPI / Swagger import
Additional authentication methods
Shareable requests
Exportable collections
Public API submissions
API comparison
Team workspaces
Cloud-synchronized collections
Advanced API testing
```

Nothing in this backlog should be implemented during the MVP unless the scope is explicitly changed.

---

# 7. Project Status

Use the following status values:

```text
⬜ Not Started
🟡 In Progress
🟢 Complete
🔴 Blocked
```

The roadmap should be updated as development progresses.

Do not mark a phase complete until its completion criteria have been verified.

---

# 8. Final Target

The final MVP should feel like a complete developer product rather than a collection of implemented features.

The target experience is:

```text
                    REQUESTLY

              Discover APIs
                    ↓
              Explore APIs
                    ↓
              Inspect Details
                    ↓
              Send Requests
                    ↓
              Understand Responses
                    ↓
              Generate Code
                    ↓
              Save & Reuse
```

The finished application should demonstrate strong:

* Full-stack engineering
* System design
* API integration
* Frontend engineering
* Security awareness
* Product design

The project should remain intentionally focused throughout development.

**Build less. Polish more.**
