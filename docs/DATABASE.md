# Requestly Database Specification

**Version:** 1.0
**Status:** Approved
**Database:** MongoDB Atlas
**Database Type:** MongoDB Document Database

---

## 1. Database Purpose

MongoDB Atlas is the persistent data layer for Requestly.

MongoDB is used exclusively for **Requestly-owned application data**.

It is not used for user accounts, user profiles, collections, request history, or authentication credentials.

The initial database is intentionally small.

---

## 2. Data Ownership Model

Requestly maintains a strict separation between application data and user-local data.

### MongoDB

Stores:

```text id="nj3v3b"
API catalog
API metadata
API categories
Health-check information
```

### Browser

Stores:

```text id="l6hr9x"
Collections
Request history
Saved request configurations
Temporary Playground state
```

This separation means Requestly does not need a user database.

---

## 3. Initial Collections

The MVP uses two primary MongoDB collections:

```text id="xj8c4q"
apis
healthChecks
```

Additional collections should not be introduced unless a concrete product requirement requires them.

---

# 4. `apis` Collection

The `apis` collection contains the normalized public API catalog.

The initial records are imported from the `public-apis` GitHub repository.

Requestly may normalize the imported data to better support search, filtering and application behavior.

---

## 4.1 API Document

Conceptual structure:

```typescript id="7q9c7w"
{
  _id: ObjectId,

  name: string,

  description: string,

  url: string,

  category: string,

  auth: string | null,

  https: boolean,

  cors: string | null,

  source: {
    provider: string,
    sourceUrl: string
  },

  createdAt: Date,

  updatedAt: Date
}
```

---

## 4.2 Field Definitions

### `_id`

MongoDB-generated unique identifier.

Type:

```text id="ef53z6"
ObjectId
```

---

### `name`

The display name of the API.

Example:

```text id="f7n24c"
Open-Meteo
```

Required.

---

### `description`

Short description of what the API provides.

Required.

---

### `url`

Primary API endpoint or documented base URL from the imported catalog.

Required.

This value must be treated as untrusted external data when used for live requests.

---

### `category`

Primary catalog category.

Example:

```text id="k88e0d"
Weather
```

Required.

---

### `auth`

Authentication requirement from the imported dataset.

Possible values may include:

```text id="39y8e3"
null
apiKey
OAuth
X-Mashape-Key
User-Agent
```

The exact values should preserve useful source information rather than forcing every authentication mechanism into an artificial enum.

---

### `https`

Whether the imported API metadata indicates HTTPS support.

Type:

```text id="jzq2n1"
boolean
```

---

### `cors`

CORS information from the imported dataset.

Possible values include:

```text id="o8q8wy"
yes
no
unknown
```

The exact normalized representation should be decided during implementation.

---

### `source`

Identifies where the catalog record originated.

Example:

```text id="i1w4gc"
{
  provider: "public-apis",
  sourceUrl: "https://github.com/public-apis/public-apis"
}
```

This allows Requestly to retain source attribution.

---

### `createdAt`

Time the Requestly database record was created.

---

### `updatedAt`

Time the Requestly database record was last updated.

---

# 5. API Catalog Normalization

The `public-apis` dataset should not be copied blindly into MongoDB.

The import process should:

1. Read the source dataset.
2. Parse individual API entries.
3. Normalize field names.
4. Normalize authentication values where appropriate.
5. Normalize HTTPS values.
6. Normalize CORS values.
7. Normalize categories.
8. Validate URLs.
9. Remove malformed or unusable records when necessary.
10. Store the normalized result in MongoDB.

The original source information should remain identifiable.

---

# 6. API Identity and Deduplication

The import process must avoid creating duplicate API records when the source contains duplicate or effectively identical entries.

The preferred identity strategy is based on the normalized API URL combined with relevant source information.

Before inserting a record, the importer should check whether the API already exists.

Repeated imports should update existing records rather than continually creating duplicates.

---

# 7. API Indexes

Indexes should support the actual access patterns of Requestly.

Initial indexes should include:

```text id="n2n2gt"
category
url
name
```

A unique or compound index may be used for API identity where appropriate.

Text search indexes may be introduced if MongoDB's basic indexed search does not provide sufficient performance or relevance.

Indexes should be based on measured application requirements rather than added indiscriminately.

---

# 8. `healthChecks` Collection

The `healthChecks` collection stores live API health information when persistence is required.

A health check represents an actual attempt to communicate with an API.

It must not be generated merely from catalog metadata.

---

## 8.1 Health Check Document

Conceptual structure:

```typescript id="3zuhxv"
{
  _id: ObjectId,

  apiId: ObjectId,

  url: string,

  status: "operational" | "unavailable" | "error" | "timeout",

  statusCode: number | null,

  responseTime: number | null,

  checkedAt: Date,

  error: {
    type: string,
    message: string
  } | null
}
```

---

## 8.2 Field Definitions

### `apiId`

Reference to the API in the `apis` collection.

Type:

```text id="0d7n1d"
ObjectId
```

---

### `url`

The URL that was actually checked.

This is retained because an API's configured endpoint may change independently of the catalog.

---

### `status`

Normalized Requestly health classification.

Allowed values:

```text id="jjy8gs"
operational
unavailable
error
timeout
```

---

### `statusCode`

HTTP response status when one was received.

Examples:

```text id="9gcq8s"
200
404
429
500
503
```

If the request failed before an HTTP response was received:

```text id="j2j7wm"
null
```

---

### `responseTime`

Time taken to receive the response.

Unit:

```text id="2omqv8"
milliseconds
```

If no response was received:

```text id="o9w3pd"
null
```

---

### `checkedAt`

Timestamp of the health check.

---

### `error`

Structured information about a failed check.

Error information should be useful for debugging but must not expose:

* Secrets
* Authentication credentials
* Internal infrastructure details
* Sensitive server configuration

---

# 9. Health Status Semantics

### `operational`

The target API successfully responded.

This does not necessarily mean that the API returned HTTP 2xx.

For example, an API returning a valid `401 Unauthorized` response may technically be reachable but requires authentication.

The implementation should distinguish **reachability** from **application-level success** where useful.

---

### `unavailable`

The API could not be reached or did not provide a usable response.

---

### `error`

The request encountered an unexpected error that does not fit the normal operational or timeout classification.

---

### `timeout`

The target API failed to respond within the configured Requestly timeout.

---

# 10. Health Check Retention

Requestly is not a background monitoring platform in the MVP.

Health checks are performed on demand or during relevant interactions.

The database should therefore avoid accumulating unlimited historical records.

A retention strategy should be implemented if health checks are persisted.

The initial implementation may retain a limited number of recent checks per API.

Example:

```text id="ql9n7w"
Latest 20 checks per API
```

The exact limit may be adjusted after observing actual database usage.

---

# 11. No User Collection

There must be no MongoDB collection such as:

```text id="f6k9yl"
users
accounts
profiles
sessions
```

Requestly does not require authentication.

---

# 12. No Remote Collections

User-created collections are browser-local.

Example:

```text id="j40kcg"
{
  name: "Weather APIs",
  apiIds: [...]
}
```

This data must not be written to MongoDB in the MVP.

---

# 13. No Remote Request History

Request history is browser-local.

MongoDB must not store general user request history.

This is particularly important because request configurations may contain sensitive information.

---

# 14. Credential Protection

The following must never be stored in MongoDB:

* API keys
* Bearer tokens
* Basic authentication passwords
* Authorization headers
* Cookie values
* User-provided secrets

They should also not be written to server logs.

---

# 15. Database Connection

MongoDB should be accessed through a centralized database connection utility.

Expected location:

```text id="5s9ywx"
lib/mongodb.ts
```

The application should reuse the MongoDB client between requests where the runtime permits this.

The implementation should avoid creating unnecessary database connections for every request.

---

# 16. Environment Configuration

MongoDB credentials must be provided through environment variables.

Expected configuration:

```text id="k0zux8"
MONGODB_URI
MONGODB_DATABASE
```

Example:

```env id="6p0xjz"
MONGODB_URI=mongodb+srv://...
MONGODB_DATABASE=requestly
```

Real credentials must never be committed to Git.

---

# 17. Development and Seeding

The project should provide scripts for:

### Importing the API catalog

```text id="bkv7v1"
npm run import:apis
```

The script should:

1. Load the source dataset.
2. Normalize records.
3. Validate records.
4. Deduplicate records.
5. Insert or update MongoDB documents.
6. Report import statistics.

Example output:

```text id="6h0hjp"
Requestly API Import

Found:       1,200
Valid:       1,164
Updated:     1,130
Inserted:       34
Skipped:        36

Import complete.
```

The exact numbers will depend on the source dataset at the time of import.

---

# 18. Database Development Rules

Database code should follow these rules:

* Validate data before insertion.
* Avoid storing unnecessary fields.
* Avoid storing user secrets.
* Use indexes based on real query patterns.
* Keep MongoDB schemas understandable.
* Keep database access outside UI components.
* Use typed interfaces for database documents.
* Handle database failures explicitly.
* Avoid exposing raw database errors to users.

---

# 19. Data Validation

Data entering MongoDB should be validated.

API records should at minimum validate:

* Name
* Description
* URL
* Category
* HTTPS value
* Authentication information

Health-check records should validate:

* API identifier
* URL
* Status
* Status code
* Response time
* Timestamp

Malformed records should not silently enter the database.

---

# 20. Database Error Handling

If MongoDB is unavailable:

The application should fail gracefully.

For example:

```text id="u8yd1k"
Unable to load API catalog.

Please try again.
```

Raw MongoDB connection strings, stack traces and internal database details must not be exposed to users.

---

# 21. Future Database Possibilities

The database architecture intentionally leaves room for future features such as:

* Scheduled monitoring
* Uptime history
* API change detection
* Public API submissions
* Shared collections
* Team workspaces
* Saved shareable requests

These are not part of the MVP.

No future collection should be introduced until its product requirement is approved.

---

# 22. Database Principles

### Minimal

Store only data Requestly genuinely needs.

### Public by default

MongoDB stores Requestly-owned public application data, not personal user information.

### Secure

Never persist credentials or secrets.

### Query-oriented

Create indexes around actual Requestly access patterns.

### Maintainable

Keep documents understandable and avoid unnecessary schema complexity.

### Privacy-conscious

User-specific information remains in the user's browser.

---

# 23. Final Database Model

The intended MVP database is:

```text id="d1h7nq"
MongoDB Atlas
│
├── apis
│   ├── Public API catalog
│   └── API metadata
│
└── healthChecks
    └── Recent live API checks
```

Everything else that belongs to the user remains local:

```text id="n9c1o5"
Browser
│
├── Collections
├── Request History
├── Saved Requests
└── Temporary Playground State
```

This intentionally small database model keeps Requestly easy to understand, inexpensive to operate, and appropriate for the MVP.
