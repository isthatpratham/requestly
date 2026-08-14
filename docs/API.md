# Requestly API Specification

**Version:** 1.0
**Status:** Approved
**Architecture:** Next.js Route Handlers
**Base URL:** `/api`

---

## 1. Overview

Requestly uses Next.js Route Handlers as its internal backend API.

The API layer sits between the frontend and:

* MongoDB Atlas
* External public APIs
* The live health-check system

The API layer is responsible for:

* Request validation
* Database access
* External API communication
* Response normalization
* Error handling
* Security controls

The frontend must not directly access MongoDB.

---

## 2. API Design Principles

Requestly's internal API should follow these principles:

* Keep endpoints small and focused.
* Validate all client input.
* Return predictable JSON structures.
* Use appropriate HTTP status codes.
* Never expose database implementation details.
* Never expose secrets.
* Never store user credentials.
* Keep business logic outside route handlers where practical.
* Treat arbitrary external URLs as untrusted input.

---

# 3. Endpoint Overview

The MVP exposes the following internal endpoints:

| Method | Endpoint           | Purpose                                                                  |
| ------ | ------------------ | ------------------------------------------------------------------------ |
| `GET`  | `/api/apis`        | Search and retrieve APIs                                                 |
| `GET`  | `/api/apis/[id]`   | Retrieve a single API                                                    |
| `POST` | `/api/request`     | Execute an arbitrary API request                                         |
| `GET`  | `/api/history`     | Reserved for request-history integration if server data is ever required |
| `POST` | `/api/collections` | Reserved for collection integration if server storage is ever required   |
| `GET`  | `/api/health`      | Perform or retrieve API health information                               |

> Collections and request history are browser-local in the MVP. Their server endpoints should not be implemented merely for architectural symmetry. If local-only storage remains the final design, `/api/history` and `/api/collections` should remain unused or be omitted from the production implementation.

---

# 4. Standard Response Format

Successful responses should generally follow:

```typescript
{
  success: true,
  data: ...
}
```

Errors should generally follow:

```typescript
{
  success: false,
  error: {
    code: string,
    message: string
  }
}
```

The API should avoid returning inconsistent response structures between endpoints.

---

# 5. Error Status Codes

Use HTTP status codes meaningfully.

### `400 Bad Request`

Invalid request data.

Examples:

* Missing URL
* Invalid HTTP method
* Invalid query parameter format

---

### `401 Unauthorized`

Not generally used by Requestly because Requestly has no user authentication.

It may be returned by the **external API** being tested and should be represented as part of the request result rather than interpreted as a Requestly authentication failure.

---

### `403 Forbidden`

Used when a request is rejected by Requestly security controls.

Example:

```text
Blocked destination
```

---

### `404 Not Found`

Resource does not exist.

Example:

```text
API not found
```

---

### `408 Request Timeout`

Requestly's outbound request timed out.

---

### `429 Too Many Requests`

Requestly rate limit exceeded.

The external API may also return `429`, which should be represented as the target API's response status.

---

### `500 Internal Server Error`

Unexpected Requestly server error.

The response must not expose stack traces or internal infrastructure information.

---

### `502 Bad Gateway`

Requestly could not successfully communicate with the external API.

Use only where it accurately represents an upstream communication failure.

---

### `504 Gateway Timeout`

The external API did not respond within Requestly's configured timeout.

---

# 6. GET `/api/apis`

Retrieves APIs from the Requestly catalog.

---

## Query Parameters

```text
q
category
auth
https
cors
page
limit
```

Example:

```text
GET /api/apis?q=weather&category=Weather
```

---

## Parameters

### `q`

Search query.

Searches relevant API catalog fields such as:

* Name
* Description

Optional.

---

### `category`

Filters APIs by category.

Optional.

---

### `auth`

Filters by authentication requirement.

Optional.

---

### `https`

Filters by HTTPS support.

Expected values:

```text
true
false
```

Optional.

---

### `cors`

Filters by CORS metadata.

Optional.

---

### `page`

Pagination page number.

Default:

```text
1
```

---

### `limit`

Number of results.

Default:

```text
20
```

Maximum should be enforced server-side.

---

## Response

```typescript
{
  success: true,
  data: {
    items: Api[],
    pagination: {
      page: number,
      limit: number,
      total: number,
      totalPages: number
    }
  }
}
```

---

## Example

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "66abc123",
        "name": "Open-Meteo",
        "description": "Weather forecast API",
        "url": "https://api.open-meteo.com",
        "category": "Weather",
        "auth": null,
        "https": true,
        "cors": "yes"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

---

# 7. GET `/api/apis/[id]`

Retrieves a single API from the catalog.

---

## Path Parameter

```text
id
```

Example:

```text
GET /api/apis/66abc123
```

---

## Response

```typescript
{
  success: true,
  data: {
    api: Api,
    latestHealthCheck: HealthCheck | null
  }
}
```

The latest health-check result may be included when available.

---

## Example

```json
{
  "success": true,
  "data": {
    "api": {
      "id": "66abc123",
      "name": "Open-Meteo",
      "description": "Weather forecast API",
      "url": "https://api.open-meteo.com",
      "category": "Weather",
      "auth": null,
      "https": true,
      "cors": "yes"
    },
    "latestHealthCheck": {
      "status": "operational",
      "statusCode": 200,
      "responseTime": 183,
      "checkedAt": "2026-08-14T18:30:00.000Z"
    }
  }
}
```

---

# 8. POST `/api/request`

Executes an arbitrary HTTP request through Requestly's server-side request engine.

This is the most security-sensitive endpoint in Requestly.

---

## Request Body

```typescript
{
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",

  url: string,

  query?: Record<string, string>,

  headers?: Record<string, string>,

  body?: unknown,

  auth?: {
    type: "none" | "apiKey" | "bearer" | "basic",

    apiKey?: {
      key: string,
      value: string,
      location: "header" | "query"
    },

    bearer?: {
      token: string
    },

    basic?: {
      username: string,
      password: string
    }
  }
}
```

---

## Example Request

```json
{
  "method": "GET",
  "url": "https://api.github.com/users/octocat",
  "headers": {
    "Accept": "application/json"
  }
}
```

---

## POST Example

```json
{
  "method": "POST",
  "url": "https://jsonplaceholder.typicode.com/posts",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": {
    "title": "Requestly",
    "body": "Testing an API",
    "userId": 1
  }
}
```

---

# 9. Request Validation

Before executing an outbound request, Requestly must validate:

### URL

* Must be syntactically valid.
* Must use an allowed protocol.
* Must not target blocked internal destinations.
* Must not target local network resources.
* Must not target cloud metadata endpoints.

Allowed protocol:

```text
https:
```

HTTP may be considered only if explicitly supported by the final security implementation.

HTTPS should be the default and preferred protocol.

---

### HTTP Method

Only the supported methods are accepted:

```text
GET
POST
PUT
PATCH
DELETE
```

---

### Headers

Headers must be validated to prevent:

* Header injection
* Invalid header names
* Unsafe control characters
* Request smuggling-related behavior

Sensitive headers should be handled carefully.

---

### Body

Request body size should be limited.

The MVP primarily supports JSON request bodies.

---

### Timeout

Every outbound request must have a finite timeout.

Requestly must never wait indefinitely for an external API.

---

# 10. SSRF Protection

Because `/api/request` accepts arbitrary URLs, Requestly must protect the server against Server-Side Request Forgery.

The request engine must reject destinations such as:

```text
localhost
127.0.0.1
0.0.0.0
::1
private IPv4 ranges
private IPv6 ranges
link-local addresses
cloud metadata endpoints
internal hostnames
```

DNS resolution and redirects must also be considered.

A request that initially targets a public address but redirects to an internal address must not bypass the SSRF protection.

The exact implementation should be tested before production deployment.

---

# 11. Authentication Handling

Requestly itself does not authenticate users.

Authentication configuration belongs to the outbound API request.

Supported types:

```text
none
apiKey
bearer
basic
```

---

## API Key

API keys may be sent through:

### Header

```text
X-API-Key: <value>
```

or another user-configured header.

### Query Parameter

Where supported by the target API.

---

## Bearer

The request engine should generate:

```text
Authorization: Bearer <token>
```

---

## Basic Authentication

The request engine should generate the appropriate HTTP Basic Authentication header.

Credentials must exist only for the lifetime of the request and must not be persisted.

---

# 12. Request Response

A successful Requestly request should return a normalized structure:

```typescript
{
  success: true,
  data: {
    status: number,
    statusText: string,
    responseTime: number,
    headers: Record<string, string>,
    body: unknown,
    rawBody?: string,
    contentType: string | null
  }
}
```

---

## Example

```json
{
  "success": true,
  "data": {
    "status": 200,
    "statusText": "OK",
    "responseTime": 183,
    "headers": {
      "content-type": "application/json"
    },
    "body": {
      "name": "octocat",
      "public_repos": 8
    },
    "contentType": "application/json"
  }
}
```

---

# 13. HTTP Error Responses From External APIs

An external HTTP error does not automatically mean Requestly failed.

For example:

```text
GET /users/unknown
        ↓
External API
        ↓
404 Not Found
```

Requestly should return the external status and response to the Playground.

Example:

```json
{
  "success": true,
  "data": {
    "status": 404,
    "statusText": "Not Found",
    "responseTime": 201,
    "headers": {},
    "body": {
      "error": "User not found"
    }
  }
}
```

This allows the user to inspect real API behavior.

---

# 14. Requestly Errors

If Requestly itself cannot execute the request, return:

```json
{
  "success": false,
  "error": {
    "code": "UPSTREAM_TIMEOUT",
    "message": "The API did not respond within the allowed time."
  }
}
```

Possible error codes include:

```text
INVALID_URL
BLOCKED_DESTINATION
UNSUPPORTED_METHOD
INVALID_HEADERS
INVALID_BODY
REQUEST_TIMEOUT
DNS_ERROR
CONNECTION_ERROR
UPSTREAM_TIMEOUT
RESPONSE_TOO_LARGE
INTERNAL_ERROR
```

The implementation may add additional codes when genuinely required.

---

# 15. GET `/api/health`

Performs a live health check against an API.

This endpoint is intended for:

* API detail pages
* API catalog status checks
* Explicit health-check actions

---

## Query Parameters

```text
url
apiId
```

At least one valid identifier should be provided.

If both are supplied, `apiId` may be used to associate the result with a catalog entry while `url` represents the actual endpoint being checked.

---

## Example

```text
GET /api/health?apiId=66abc123
```

or:

```text
GET /api/health?url=https%3A%2F%2Fapi.example.com
```

---

# 16. Health Response

Example:

```json
{
  "success": true,
  "data": {
    "status": "operational",
    "statusCode": 200,
    "responseTime": 183,
    "checkedAt": "2026-08-14T18:30:00.000Z"
  }
}
```

---

## Unavailable API

```json
{
  "success": true,
  "data": {
    "status": "unavailable",
    "statusCode": null,
    "responseTime": null,
    "checkedAt": "2026-08-14T18:30:00.000Z"
  }
}
```

The exact classification depends on the failure.

---

# 17. Health Check Semantics

A live health check should distinguish:

### Operational

The server responded successfully enough to establish reachability.

### Unavailable

The server could not be reached.

### Timeout

The server did not respond within the configured timeout.

### Error

An unexpected failure occurred while performing the check.

A `401`, `403`, `404`, `429`, or `500` response proves that a server was reachable.

The UI should therefore avoid treating every non-2xx response as equivalent to an unreachable API.

---

# 18. GET `/api/history`

Request history is browser-local in the MVP.

Therefore, this endpoint is **not required for the production MVP**.

If a future implementation introduces server-side request history, this endpoint can be implemented with a documented contract.

Until then:

```text
No production implementation required.
```

---

# 19. POST `/api/collections`

Collections are browser-local in the MVP.

Therefore, this endpoint is **not required for the production MVP**.

Collections should be implemented using browser storage.

Until a future product decision introduces synchronized collections:

```text
No production implementation required.
```

---

# 20. Browser-Local Data

The following data does not use the internal API:

```text
Collections
Request history
Saved request configurations
Temporary Playground state
```

The browser manages this data directly.

The internal API should not receive or persist this information unnecessarily.

---

# 21. API Security Rules

All API routes must:

* Validate input.
* Reject malformed requests.
* Limit request size.
* Apply timeouts.
* Avoid logging secrets.
* Avoid exposing stack traces.
* Avoid exposing database credentials.
* Protect against SSRF.
* Sanitize outbound headers.
* Handle redirects safely.
* Limit external response size where appropriate.
* Return controlled errors.

---

# 22. Rate Limiting

The `/api/request` and `/api/health` routes can generate outbound traffic.

The MVP should include reasonable server-side protection against abuse.

Possible controls include:

* Per-IP request limits
* Short-term request quotas
* Concurrent request limits
* Response size limits
* Request timeouts

The exact limits should be tuned during implementation.

Rate limiting should protect the Vercel deployment and external APIs without making normal development usage frustrating.

---

# 23. Logging

Server logs may record operational information such as:

```text
Request method
Request duration
Response status
Route
Error category
```

Logs must not contain:

* API keys
* Bearer tokens
* Passwords
* Authorization headers
* Cookies
* Complete sensitive request bodies

External API responses should not be logged by default.

---

# 24. API Versioning

The MVP does not require versioned routes.

Use:

```text
/api/...
```

rather than:

```text
/api/v1/...
```

Versioning should only be introduced when there is a genuine need for backward compatibility.

---

# 25. Internal Type Contracts

Shared request and response structures should be represented as TypeScript types.

Suggested locations:

```text
types/api.ts
types/request.ts
types/common.ts
```

The frontend and server-side implementation should use these contracts wherever practical.

---

# 26. API Implementation Structure

Route handlers should remain thin.

Example:

```text
app/api/request/route.ts
        │
        ▼
lib/api/requester.ts
        │
        ├── URL validation
        ├── SSRF protection
        ├── Request construction
        ├── Timeout
        ├── External request
        └── Response normalization
```

The route handler should primarily:

1. Parse the request.
2. Validate the input.
3. Call the appropriate application logic.
4. Return the normalized response.

---

# 27. API Documentation Rules

Whenever an internal endpoint is added, removed or materially changed:

1. Update this document.
2. Update the associated TypeScript types.
3. Update tests.
4. Update the implementation.
5. Verify the frontend contract.

The API specification must remain synchronized with the application.

---

# 28. MVP API Surface

The final MVP should keep its production API surface intentionally small:

```text
GET    /api/apis
GET    /api/apis/[id]
POST   /api/request
GET    /api/health
```

These four routes are the actual core backend requirements.

Collections and request history remain entirely browser-local.

---

# 29. Final API Architecture

```text
                         Requestly Frontend
                                │
                ┌───────────────┼────────────────┐
                │               │                │
                ▼               ▼                ▼
          /api/apis       /api/request      /api/health
                │               │                │
                ▼               ▼                ▼
          MongoDB Atlas    Request Engine    Health Engine
                                │                │
                                └───────┬────────┘
                                        │
                                        ▼
                                  External APIs
```

The API layer should remain small, predictable and security-focused.

The purpose of Requestly's backend is not to become a general-purpose backend platform. It exists to provide a controlled bridge between the Requestly interface, its application data, and external APIs.
