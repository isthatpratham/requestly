# Requestly Architecture

**Version:** 1.0
**Status:** Approved
**Architecture:** Next.js Full-Stack
**Deployment:** Vercel
**Database:** MongoDB Atlas

---

## 1. Architecture Overview

Requestly is a full-stack Next.js application deployed on Vercel.

It does not use a separate backend server.

Next.js provides:

* Frontend rendering
* Server Components
* Client Components
* Server-side application logic
* API route handlers
* External API request execution

MongoDB Atlas provides the persistent application data layer.

The browser stores user-specific temporary data such as collections and request history locally.

---

## 2. High-Level Architecture

```text
                           User
                            │
                            ▼
                     ┌──────────────┐
                     │   Requestly  │
                     │   Next.js    │
                     └──────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
          UI Layer     API Routes    Local Browser
              │             │          Storage
              │             │
              │             ├──────────────┐
              │             │              │
              │             ▼              ▼
              │        MongoDB Atlas   External APIs
              │
              └─────────────────────────────
```

---

## 3. Main Architectural Boundaries

Requestly is divided into five major areas:

```text
1. Presentation
2. Application / API layer
3. Domain logic
4. Persistent data
5. Browser-local data
```

### Presentation

Responsible for:

* Pages
* Layouts
* Components
* User interactions
* Rendering API information
* Rendering request and response interfaces

Location:

```text
app/
components/
```

---

### Application / API Layer

Responsible for:

* Handling requests from the frontend
* Validating input
* Executing external API requests
* Reading and writing MongoDB data
* Returning structured responses

Location:

```text
app/api/
```

---

### Domain Logic

Responsible for:

* API catalog operations
* Request construction
* Response parsing
* Validation
* Security-related request handling
* Code generation

Location:

```text
lib/
```

---

### Persistent Data

MongoDB Atlas stores Requestly's application-owned public data.

Examples:

* API catalog
* API metadata
* Health-check information

Location:

```text
models/
lib/mongodb.ts
```

---

### Browser-Local Data

User-specific data is intentionally kept local.

Examples:

* Collections
* Request history
* Temporary Playground state
* Saved request configurations

This data is not synchronized with MongoDB.

---

## 4. Request Flow

### Standard API Request

When a user sends a request through the Playground:

```text
User
 │
 │ Configure request
 ▼
Playground UI
 │
 │ POST /api/request
 ▼
Next.js API Route
 │
 │ Validate request
 ▼
Request Engine
 │
 │ Make external request
 ▼
Target API
 │
 │ Response
 ▼
Request Engine
 │
 │ Normalize response
 ▼
Next.js API Route
 │
 ▼
Playground UI
 │
 ├── Status
 ├── Response time
 ├── Headers
 └── Body
```

The browser should not be responsible for executing arbitrary external API requests when server-side execution is required for reliability, CORS handling, or security controls.

---

## 5. API Catalog Flow

The public API catalog follows this architecture:

```text
public-apis Dataset
        │
        ▼
Import Script
        │
        ▼
Normalization
        │
        ▼
MongoDB Atlas
        │
        ▼
Requestly API Layer
        │
        ▼
Explore UI
```

The imported dataset is the initial source of catalog metadata.

Requestly does not assume that imported metadata represents the current operational state of an API.

---

## 6. Live Health Check Flow

When Requestly checks an API:

```text
User
 │
 ▼
Requestly UI
 │
 ▼
Health API Route
 │
 ▼
Validation
 │
 ▼
External API
 │
 ├── Success
 ├── HTTP error
 ├── Timeout
 └── Network failure
 │
 ▼
Health Result
 │
 ├── Status
 ├── Response time
 └── Error information
 │
 ▼
Requestly UI
```

A health check must represent the actual result of the live request.

Requestly must not fabricate or infer operational status from catalog metadata alone.

---

## 7. MongoDB Architecture

MongoDB Atlas is the persistent data layer.

Initial logical collections:

```text
apis
healthChecks
```

Additional collections should only be introduced when a clear product requirement exists.

MongoDB does not store:

* User accounts
* User profiles
* Collections created by users
* Request history
* Authentication credentials
* API keys
* Bearer tokens
* Basic authentication passwords

---

## 8. Browser Storage Architecture

User-specific state is stored locally.

Recommended storage strategy:

### LocalStorage

Suitable for:

* Small preferences
* Collection metadata
* Lightweight saved API references

### IndexedDB

May be used if request history or saved request configurations become too large for comfortable LocalStorage usage.

The implementation should choose the simplest storage mechanism that meets the requirements.

---

## 9. Data Ownership

Requestly maintains a strict distinction between public application data and user-local data.

### MongoDB

```text
Requestly-owned
├── API catalog
├── API metadata
└── Health information
```

### Browser

```text
User-owned
├── Collections
├── Request history
└── Temporary request state
```

This separation is intentional.

---

## 10. Authentication Architecture

Requestly has no user authentication system.

There is:

* No signup
* No login
* No sessions
* No user identity
* No user database records

However, the Playground may send authentication information to external APIs when explicitly configured by the user.

Supported authentication mechanisms in the MVP:

```text
None
API Key
Bearer Token
Basic Authentication
```

These credentials are request-level data and must not be persisted remotely.

---

## 11. External API Request Architecture

External requests should be handled through controlled server-side logic.

The request engine is responsible for:

* Validating URLs
* Validating HTTP methods
* Sanitizing request configuration
* Constructing headers
* Constructing query parameters
* Handling request bodies
* Applying request timeouts
* Measuring response time
* Parsing responses
* Handling errors
* Returning a safe normalized response

The request engine should not contain UI logic.

---

## 12. Server-Side Request Security

Because users can provide arbitrary URLs, the request engine must treat every target URL as untrusted input.

Security controls should include:

* URL validation
* Protocol validation
* Request timeout
* Controlled request size
* Controlled response size where appropriate
* Safe header handling
* Authentication credential protection
* Protection against server-side request forgery where applicable
* Avoiding access to internal/private network resources

The server must not blindly fetch arbitrary internal addresses simply because a user supplied them.

Examples of destinations requiring protection include:

```text
localhost
127.0.0.1
0.0.0.0
private network ranges
cloud metadata endpoints
internal hostnames
```

The exact implementation should be documented and tested during development.

---

## 13. CORS Strategy

Requestly may execute external API requests server-side to avoid browser CORS restrictions.

Therefore:

```text
Browser
   │
   ▼
Requestly Server
   │
   ▼
External API
```

rather than relying exclusively on:

```text
Browser
   │
   ▼
External API
```

The catalog's CORS metadata may still be displayed because it is useful information for developers.

---

## 14. API Route Responsibilities

The initial internal API surface is:

```text
GET    /api/apis
GET    /api/apis/[id]

POST   /api/request

GET    /api/history

POST   /api/collections

GET    /api/health
```

These routes are responsible for transport-level concerns.

Business logic should remain in `lib/` rather than being embedded directly inside route handlers.

Detailed contracts are defined in:

```text
docs/API.md
```

---

## 15. Frontend Architecture

Requestly uses the Next.js App Router.

The application is divided into:

```text
app/
├── Landing
├── Explore
├── API Details
├── Playground
├── Collections
└── History
```

Components are organized by feature:

```text
components/
├── layout/
├── api/
├── playground/
├── collections/
├── history/
└── ui/
```

Feature-specific components should remain close to their feature boundaries.

Reusable generic components belong in:

```text
components/ui/
```

---

## 16. Server Components and Client Components

Use Server Components by default.

Client Components should only be introduced where client-side interaction or browser APIs require them.

Client Components are expected for areas such as:

* Playground controls
* Interactive search
* Collections
* Request history
* Local browser storage
* Animated interactions

Avoid making entire pages client-rendered without a clear reason.

---

## 17. State Management

Requestly does not require a large global state-management framework for the MVP.

Use:

* React state for local interactive state
* URL parameters for shareable/filterable navigation state
* Browser storage for persistent local user state
* Server-side data fetching for catalog data
* MongoDB for persistent application data

A global state library should only be introduced if the application demonstrates a concrete need for one.

---

## 18. Search Architecture

API discovery search should operate against the Requestly catalog.

The initial implementation should support:

* API name search
* Description search where practical
* Category filtering
* Authentication filtering
* HTTPS filtering
* CORS filtering

Search should be designed so that it can remain performant as the catalog grows.

MongoDB indexes should be introduced where they materially improve query performance.

---

## 19. Code Generation Architecture

Code generation is handled independently from the Playground UI.

The request configuration is treated as the source representation:

```text
Request Configuration
        │
        ├── cURL Generator
        ├── JavaScript Generator
        └── Python Generator
```

Generators should produce readable code rather than simply serializing the internal request object.

Code generation logic belongs in:

```text
lib/codegen/
```

---

## 20. Error Handling Architecture

Errors should be handled at the appropriate layer.

### Validation Errors

Handled before executing a request.

Example:

```text
Invalid URL
```

### Network Errors

Produced when the target API cannot be reached.

Example:

```text
Connection failed
Timeout
DNS failure
```

### HTTP Errors

Returned by the external API.

Example:

```text
404 Not Found
429 Too Many Requests
500 Internal Server Error
```

These are not necessarily Requestly failures.

The UI should distinguish between:

* Requestly failure
* Network failure
* External API HTTP failure

---

## 21. Response Normalization

The Requestly request engine should return a predictable internal response structure.

Conceptually:

```text
RequestResult
├── success
├── status
├── statusText
├── responseTime
├── headers
├── body
├── contentType
└── error
```

The frontend should consume this normalized structure rather than depending directly on the raw server implementation.

---

## 22. Performance Principles

Requestly should prioritize:

* Fast initial page loading
* Minimal JavaScript where possible
* Server Components where appropriate
* Efficient API catalog queries
* Lazy loading for expensive Playground functionality
* Controlled response rendering
* Avoiding unnecessary client-side state
* Stable layouts during loading

Large API responses should not unnecessarily freeze the browser.

---

## 23. Deployment Architecture

Production deployment:

```text
                         GitHub
                           │
                           ▼
                         Vercel
                           │
              ┌────────────┴────────────┐
              │                         │
          Next.js                 Environment
              │                    Variables
              │
       ┌──────┴──────┐
       │             │
       ▼             ▼
  MongoDB Atlas   External APIs
```

Vercel handles:

* Application hosting
* Next.js rendering
* Serverless route execution
* Deployment
* Environment configuration
* Production builds

MongoDB Atlas handles persistent Requestly data.

External APIs remain external dependencies.

---

## 24. Environment Variables

Sensitive configuration must never be committed to Git.

Expected configuration includes:

```text
MONGODB_URI
MONGODB_DATABASE
```

Additional environment variables may be introduced when required.

A sanitized example configuration must be maintained in:

```text
.env.example
```

---

## 25. Caching

Caching should be introduced selectively.

Potential candidates:

* API catalog data
* Category lists
* Stable API metadata

Live health checks and Playground requests should not be treated as permanently cacheable responses.

The application should avoid caching user-provided authentication credentials.

---

## 26. Architecture Principles

### Separation of concerns

UI, API transport, domain logic and persistence should remain separated.

### Server-side control

Arbitrary external API requests should pass through controlled server-side logic where required.

### Minimal infrastructure

Do not introduce infrastructure that does not solve a real problem.

### Privacy by default

No unnecessary user data should leave the browser.

### Security by default

All externally supplied request configuration must be treated as untrusted.

### Progressive complexity

Start with the simplest architecture that satisfies the MVP.

Do not introduce abstractions solely for theoretical future requirements.

---

## 27. Directory Responsibilities

```text
app/
    Pages, layouts and Next.js API routes

components/
    React UI components organized by feature

lib/
    Application logic, integrations and utilities

models/
    MongoDB data models

hooks/
    Reusable client-side hooks

types/
    Shared TypeScript definitions

scripts/
    Data import and development scripts

data/
    Local development data when required

tests/
    Automated tests

public/
    Static assets

docs/
    Project source-of-truth documentation
```

---

## 28. Architectural Source of Truth

This document defines the architectural boundaries of Requestly.

Changes to the architecture should be reflected here when they materially affect:

* Application structure
* Data flow
* Persistence
* External API handling
* Security
* Deployment
* Major technology choices

Implementation details that do not affect the architecture do not need to be documented here.

---

## 29. Final Architecture

The intended MVP architecture is:

```text
                         REQUESTLY
                             │
                ┌────────────┴────────────┐
                │                         │
           Next.js App              Browser Storage
                │                    (User Data)
        ┌───────┴────────┐
        │                │
     UI Layer        API Routes
        │                │
        │         ┌──────┴──────────┐
        │         │                 │
        │      MongoDB          Request Engine
        │                           │
        │                           ▼
        │                     External APIs
        │
        └──────────────────────────────────
```

The architecture should remain intentionally small.

Requestly is a focused developer tool, not a distributed system. The implementation should reflect that.
