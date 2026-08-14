# Requestly

## Product Requirements Document

**Version:** 1.0
**Status:** Approved
**Target:** Polished MVP
**Deployment:** Vercel
**Database:** MongoDB Atlas

---

## 1. Product Overview

Requestly is a web-based API discovery and playground platform for students, developers, and builders.

It allows users to discover public APIs, inspect their metadata, test them through an interactive request builder, view live responses, generate code snippets, and organize useful APIs locally in the browser.

The initial API catalog will be populated using the complete dataset from the `public-apis` GitHub repository.

Requestly itself is API-agnostic. Users can test arbitrary API URLs through the Playground, whether or not those APIs exist in the Requestly catalog.

Requestly does not require user accounts and does not store personal user data.

---

## 2. Problem

Developers often discover APIs through scattered directories, documentation pages, GitHub repositories, search engines, and blog posts.

Finding an API is only the first step. Developers then need to understand:

* What the API does
* Whether it is currently reachable
* Whether authentication is required
* Which HTTP methods it supports
* What parameters it accepts
* What a real response looks like
* How to make a request
* How to integrate it into their own project

Requestly combines API discovery and experimentation into one focused developer tool.

---

## 3. Goals

### Primary Goals

* Provide a searchable catalog of public APIs.
* Allow developers to inspect API metadata.
* Allow users to test arbitrary API URLs.
* Provide a powerful but simple API request builder.
* Show real API responses and request performance.
* Generate ready-to-use code snippets.
* Allow users to save APIs into browser-local collections.
* Maintain browser-local request history.
* Provide live API availability information.
* Maintain a polished Apple-inspired developer-tool interface.
* Demonstrate strong full-stack, API integration, frontend, and system-design skills.

### Secondary Goals

* Normalize and maintain the public API catalog in MongoDB.
* Provide useful API filtering and categorization.
* Make API experimentation fast enough that users do not need Postman for simple public API exploration.

---

## 4. Non-Goals

The following are explicitly outside the MVP:

* User registration
* User accounts
* Login
* User profiles
* Cloud-synchronized collections
* Cloud-synchronized request history
* AI features
* API marketplace functionality
* API submission by users
* Team collaboration
* Billing
* Background API monitoring
* Scheduled monitoring
* Notifications
* OAuth 2.0 authentication
* Mobile application
* Separate backend server
* Microservices

These may be considered in future versions but should not be introduced into the MVP without a deliberate product decision.

---

## 5. Target Users

### Primary Users

**Developers**

Developers who need to quickly discover, inspect, test, and experiment with APIs.

**Students**

Students learning REST APIs, HTTP methods, backend development, or integrating APIs into academic projects.

**Builders**

Developers and makers who need a quick way to evaluate an API before using it in a project.

Requestly is designed for all three groups without creating separate experiences for each.

---

## 6. Core Product Experience

The primary Requestly workflow is:

```text
Discover
   ↓
Inspect
   ↓
Test
   ↓
Understand
   ↓
Save
   ↓
Reuse
```

A user should be able to discover an API, inspect its metadata, send a real request, understand the response, generate integration code, and save the API or request for later use without creating an account.

---

## 7. API Catalog

Requestly will initially import the complete API dataset from the `public-apis` GitHub repository.

The catalog will retain relevant metadata including:

* API name
* Description
* URL
* Category
* Authentication requirement
* HTTPS support
* CORS information

The catalog will be stored in MongoDB Atlas.

Requestly will independently perform live checks when appropriate rather than treating the imported dataset as proof that an API is currently operational.

### Catalog Requirements

Users must be able to:

* Search APIs.
* Browse APIs by category.
* Filter APIs.
* Open an API detail page.
* View API metadata.
* See live availability information where a check is possible.
* Open an API directly in the Playground.

The catalog is curated from the public dataset.

Users may not add APIs to the public Requestly catalog in the MVP.

---

## 8. Playground

The Playground is the core interactive feature of Requestly.

Users must be able to enter and execute arbitrary API URLs.

The Playground must support:

### HTTP Methods

* GET
* POST
* PUT
* PATCH
* DELETE

### Request Configuration

* URL
* Query parameters
* Request headers
* JSON request body
* API Key authentication
* Bearer Token authentication
* Basic Authentication

### Response Information

* HTTP status code
* Response time
* Response headers
* Response body
* Formatted JSON
* Raw response when applicable

### Code Generation

Requestly must be able to generate:

* cURL
* JavaScript
* Python

Generated code should represent the configured request as accurately as reasonably possible.

---

## 9. Authentication and Security

Requestly itself does not require authentication.

However, APIs tested through the Playground may require authentication.

The MVP should support:

* API Key
* Bearer Token
* Basic Authentication

OAuth 2.0 is excluded from the MVP.

### Credential Handling

Credentials entered into the Playground must not be stored in MongoDB.

Sensitive request information must not be written into remotely stored request history or application logs.

Browser-local history should avoid persisting sensitive authentication values wherever possible.

Server-side request handling must validate and sanitize user-controlled input before making outbound requests.

---

## 10. Collections

Requestly will support browser-local collections in V1.

Users can organize useful APIs into named collections.

Example:

```text
Weather APIs
├── Open-Meteo
├── WeatherAPI
└── OpenWeather
```

Collections do not require an account.

Collections are stored locally in the user's browser and are not synchronized with MongoDB.

---

## 11. Request History

Requestly will provide browser-local request history.

History may contain:

* HTTP method
* Endpoint
* Status
* Response time
* Timestamp
* Non-sensitive request configuration

Authentication credentials must not be persisted as part of request history.

The initial implementation should maintain a practical local history limit rather than storing an unlimited number of requests.

---

## 12. Live API Health

Requestly should provide real availability information when an API is checked.

A successful live check should communicate that the API is operational.

Example:

```text
● Operational
200 OK
184 ms
```

An unsuccessful check should clearly communicate that the API is unavailable or could not be reached.

Requestly must not display a positive operational state merely because an API exists in the imported catalog.

### MVP Scope

Health checks are performed on demand or as part of relevant product interactions.

Background monitoring and scheduled health checks are not part of the MVP.

---

## 13. MongoDB Usage

MongoDB Atlas is used exclusively for Requestly's application data.

The MVP does not store user accounts or personal user information.

Initial MongoDB responsibilities include:

* Public API catalog
* API categories or normalized catalog metadata
* Live health-check data where persistence is required

Browser-local user state such as collections and request history should remain outside MongoDB.

---

## 14. Landing Page

Requestly will have a dedicated landing page before the main application experience.

The landing page should communicate the core product immediately:

* API discovery
* API experimentation
* Fast request testing
* Developer-focused workflow

The hero section will take visual inspiration from the supplied 21st.dev WebGL shader reference.

The visual direction should feel experimental and premium while remaining restrained and usable.

---

## 15. Design Direction

Requestly uses a light-only, Apple-inspired visual identity.

### Typography

* Apple system typography
* SF Pro where available
* Appropriate system fallbacks on non-Apple platforms
* Strong typographic hierarchy

### Visual Language

* Near-white backgrounds
* Near-black text
* Vercel-inspired monochrome palette
* Large amounts of whitespace
* Very subtle borders
* No shadows
* Very small corner radii
* No gradients
* No glassmorphism
* No rounded cards
* No oversized dashboard widgets
* No excessive colorful badges
* Dense layouts only where developer tooling requires them

### Motion

Animations should feel:

* Smooth
* Subtle
* Precise
* Premium
* Purposeful

Motion must never interfere with usability or readability.

The complete visual specification is maintained separately in `DESIGN_SYSTEM.md`.

---

## 16. Technical Direction

Requestly will use a Next.js full-stack architecture.

### Core Stack

* Next.js
* TypeScript
* React
* Tailwind CSS
* MongoDB Atlas
* MongoDB Node.js driver or appropriate official integration
* Vercel

Next.js server-side functionality will act as the application's backend layer.

A separate Express, Node.js, or other standalone backend server is not required for the MVP.

---

## 17. Deployment

The application will be deployed using:

```text
GitHub
   ↓
Vercel
   ↓
Next.js
   ↓
MongoDB Atlas
   ↓
External APIs
```

The application should be deployable without requiring a dedicated server.

Environment variables must be used for MongoDB credentials and other sensitive configuration.

---

## 18. MVP Success Criteria

The MVP is considered complete when a new user can:

1. Open Requestly.
2. Understand what the product does immediately.
3. Browse the public API catalog.
4. Search and filter APIs.
5. Open an API's details.
6. See relevant API metadata.
7. See whether a live API check succeeds or fails.
8. Open an API in the Playground.
9. Enter an arbitrary API URL.
10. Configure query parameters.
11. Configure headers.
12. Configure a JSON request body.
13. Select supported authentication where required.
14. Send the request.
15. View the real response.
16. View status and response time.
17. Generate cURL, JavaScript, and Python examples.
18. Save useful APIs into browser-local collections.
19. Review browser-local request history.
20. Use the application comfortably on desktop and mobile-sized screens.
21. Use the deployed application through Vercel without development tooling.

---

## 19. Project Priorities

Requestly should prioritize the following engineering qualities:

### 1. Full-stack Engineering

Demonstrate clean integration between the frontend, server-side application logic, MongoDB, and external APIs.

### 2. System Design

Maintain clear boundaries between:

* API catalog
* Request execution
* Database
* Browser-local state
* External services
* UI components

### 3. API Integration

Demonstrate practical understanding of:

* HTTP
* REST APIs
* Methods
* Headers
* Authentication
* Status codes
* JSON
* CORS
* Response handling
* Error handling

### 4. Frontend Engineering

Deliver a highly polished, responsive and accessible developer-tool interface with strong interaction design.

---

## 20. Development Timeline

The target is a fully polished MVP within three days.

### Day 1

* Project foundation
* Design system foundation
* MongoDB setup
* Public API catalog ingestion
* Catalog search and filtering
* Explore experience
* API detail pages

### Day 2

* Playground
* Request execution
* Parameters
* Headers
* Request body
* Authentication
* Response viewer
* Code generation
* Browser-local collections
* Browser-local history

### Day 3

* Live health checks
* Error handling
* Security review
* Responsive design
* Accessibility
* Animation and interaction polish
* Performance optimization
* Testing
* Vercel deployment
* Documentation
* Final cleanup

The timeline is a target, not a reason to sacrifice correctness or security.

---

## 21. Product Principles

Requestly should follow these principles throughout development:

### Simple by default

A user should be able to make a basic API request without understanding a complex interface.

### Powerful when needed

Advanced request configuration should be available without overwhelming the default experience.

### Real data over simulated data

API status, responses and response times should reflect actual behavior whenever a live check is performed.

### Privacy by default

No accounts. No unnecessary personal data. No remote storage of user collections or request history.

### Developer first

The interface should optimize for clarity, speed and practical API experimentation.

### Premium restraint

Every visual element should have a purpose. Avoid visual noise, decorative UI and unnecessary complexity.

### No feature inflation

New features should only be added when they materially improve the core Requestly experience.

---

## 22. Future Possibilities

The following ideas may be considered after the MVP:

* Scheduled API monitoring
* Uptime history
* API change detection
* OpenAPI/Swagger import
* API documentation generation
* More authentication methods
* Saved shareable requests
* API collections that can be exported
* Team workspaces
* Additional code-generation languages
* API comparison
* Public API submissions
* Advanced API testing

These are deliberately not part of the current MVP.
