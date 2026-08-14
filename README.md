# Requestly

### Discover APIs. Send requests. Build faster.

Requestly is a developer-focused API discovery and playground platform designed to make working with public APIs faster and simpler.

Discover APIs from a curated public catalog, inspect their metadata, test real endpoints with an interactive request builder, inspect live responses, generate integration-ready code, and organize useful APIs directly in your browser.

No account required. No user data stored remotely.

---

## Overview

Working with an API usually means jumping between an API directory, documentation, Postman, browser tools, and your code editor.

Requestly brings the most useful parts of that workflow into one focused interface.

```text
Discover
   ↓
Inspect
   ↓
Test
   ↓
Understand
   ↓
Generate
   ↓
Reuse
```

The initial API catalog is based on the [`public-apis`](https://github.com/public-apis/public-apis) dataset.

Requestly itself is **API-agnostic**. APIs do not need to exist in the catalog to be tested. Any compatible public API URL can be entered directly into the Playground.

---

## Features

### API Discovery

* Search a large catalog of public APIs
* Browse APIs by category
* Filter by authentication, HTTPS and CORS metadata
* Inspect API descriptions and endpoints
* View live API availability where supported

### API Playground

Test arbitrary API endpoints without leaving Requestly.

Supported methods:

```text
GET
POST
PUT
PATCH
DELETE
```

Configure:

* Query parameters
* Request headers
* JSON request bodies
* API Key authentication
* Bearer Token authentication
* Basic Authentication

Inspect:

* HTTP status
* Response time
* Response headers
* Formatted JSON
* Raw responses
* Request errors

### Code Generation

Generate ready-to-use request examples in:

* cURL
* JavaScript
* Python

### Collections

Save useful APIs into browser-local collections without creating an account.

### Request History

Review and reopen recent requests directly from the browser.

### Live API Health

Requestly performs real API checks when health information is requested.

An API that responds successfully is shown as operational.

An API that cannot be reached is shown as unavailable.

Requestly does not simulate API health or rely solely on catalog metadata.

---

## Privacy by Design

Requestly does not require user accounts.

There is no:

* Signup
* Login
* User profile
* User database
* Cloud-synchronized collection
* Cloud-synchronized request history

User-specific data such as collections and request history remains in the browser.

API credentials entered into the Playground are request-level data and are not stored in MongoDB.

---

## Architecture

Requestly is built as a Next.js full-stack application.

```text
                         Requestly
                            │
                    ┌───────┴───────┐
                    │               │
                 Next.js         Browser
                    │             Storage
             ┌──────┴──────┐         │
             │             │         │
          API Routes     MongoDB   Collections
             │             │       & History
             │             │
             ▼             │
       Request Engine      │
             │             │
             └──────┬──────┘
                    │
                    ▼
              External APIs
```

### Stack

| Layer      | Technology    |
| ---------- | ------------- |
| Framework  | Next.js       |
| Language   | TypeScript    |
| UI         | React         |
| Styling    | Tailwind CSS  |
| Database   | MongoDB Atlas |
| Deployment | Vercel        |
| API Source | public-apis   |

There is no separate Express or Node.js backend server.

Next.js Route Handlers provide the server-side API layer.

---

## Project Structure

```text
requestly/
│
├── app/
│   ├── api/
│   ├── explore/
│   ├── playground/
│   ├── collections/
│   └── history/
│
├── components/
│   ├── api/
│   ├── playground/
│   ├── collections/
│   ├── history/
│   ├── layout/
│   └── ui/
│
├── lib/
│   ├── api/
│   ├── codegen/
│   └── security/
│
├── models/
├── hooks/
├── types/
├── scripts/
├── tests/
├── public/
│
└── docs/
    ├── PRD.md
    ├── ARCHITECTURE.md
    ├── DATABASE.md
    ├── API.md
    ├── ROADMAP.md
    └── DESIGN_SYSTEM.md
```

---

## Documentation

The `docs/` directory contains the project's engineering source of truth.

| Document                                    | Purpose                                |
| ------------------------------------------- | -------------------------------------- |
| [`PRD.md`](docs/PRD.md)                     | Product requirements, scope and goals  |
| [`ARCHITECTURE.md`](docs/ARCHITECTURE.md)   | Application architecture and data flow |
| [`DATABASE.md`](docs/DATABASE.md)           | MongoDB collections and data model     |
| [`API.md`](docs/API.md)                     | Internal API contracts                 |
| [`ROADMAP.md`](docs/ROADMAP.md)             | Development phases and progress        |
| [`DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) | Visual language and UI rules           |

---

## Design

Requestly follows a deliberately restrained visual language inspired by Apple's product design and Vercel's monochrome aesthetic.

The interface emphasizes:

* Apple system typography
* Generous whitespace
* Near-white surfaces
* Near-black typography
* Subtle borders
* Minimal corner radius
* No decorative shadows
* No gradients
* No glassmorphism
* No oversized rounded cards
* Purposeful motion
* Strong information hierarchy

The API Playground becomes intentionally denser where developer workflows require it.

The landing-page hero uses an interactive visual direction inspired by modern WebGL shader experiences.

---

## Security

Because Requestly allows users to send requests to arbitrary URLs, security is a core architectural concern.

The server-side request engine is designed to include:

* URL validation
* SSRF protection
* Internal network protection
* Request timeouts
* Request size limits
* Response size limits
* Header validation
* Credential protection
* Redirect validation
* Abuse protection
* Controlled error responses

Sensitive authentication values must never be stored in MongoDB or exposed through application logs.

---

## Getting Started

### Prerequisites

Make sure you have:

* Node.js 20+
* npm
* A MongoDB Atlas account
* A MongoDB database for Requestly

### Clone the repository

```bash
git clone https://github.com/isthatpratham/requestly.git
cd requestly
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
MONGODB_DATABASE=requestly
```

Never commit `.env.local` or real credentials to Git.

### Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## API Catalog

Requestly uses the [`public-apis`](https://github.com/public-apis/public-apis) repository as its initial API catalog source.

The import process:

```text
public-apis
     ↓
Parse
     ↓
Normalize
     ↓
Validate
     ↓
Deduplicate
     ↓
MongoDB Atlas
     ↓
Requestly
```

The catalog provides metadata such as:

* API name
* Description
* Category
* Endpoint
* Authentication
* HTTPS
* CORS

Requestly independently checks API availability rather than assuming that catalog metadata represents current availability.

---

## Local Development

The project is designed around a small full-stack architecture.

There is no need to run:

```text
Express
Docker
Nginx
Redis
Kubernetes
```

The application can be developed with:

```text
Next.js
+
MongoDB Atlas
```

and deployed through Vercel.

---

## Deployment

Requestly is designed for deployment on Vercel.

Production architecture:

```text
GitHub
   ↓
Vercel
   ↓
Next.js
   ├── Frontend
   ├── Server Components
   └── API Routes
          │
          ├── MongoDB Atlas
          │
          └── External APIs
```

Configure the required environment variables in the Vercel project settings before deployment.

---

## Project Status

Requestly is currently under active development.

The target is a fully polished MVP covering:

* API discovery
* API catalog
* API details
* Live health checks
* Interactive API Playground
* Authentication handling
* Response inspection
* Code generation
* Browser-local collections
* Browser-local request history
* Security controls
* Responsive UI
* Vercel deployment

The implementation roadmap is available in [`docs/ROADMAP.md`](docs/ROADMAP.md).

---

## Roadmap

### MVP

* [ ] Project foundation
* [ ] MongoDB integration
* [ ] Public API catalog import
* [ ] API search and filtering
* [ ] Explore experience
* [ ] API detail pages
* [ ] Live health checks
* [ ] API Playground
* [ ] Request configuration
* [ ] Authentication support
* [ ] Response viewer
* [ ] Code generation
* [ ] Local collections
* [ ] Local request history
* [ ] SSRF protection
* [ ] Security hardening
* [ ] Responsive design
* [ ] Accessibility
* [ ] Testing
* [ ] Vercel deployment

### Future

Potential post-MVP directions include:

* Scheduled API monitoring
* Uptime history
* API change detection
* OpenAPI / Swagger import
* Shareable requests
* Exportable collections
* API comparison
* Public API submissions
* Additional authentication methods
* Team workspaces

---

## Contributing

Requestly is currently being developed as a focused portfolio project.

The architecture and product direction are documented in `docs/`.

Before making significant changes, review:

1. `docs/PRD.md`
2. `docs/ARCHITECTURE.md`
3. `docs/DESIGN_SYSTEM.md`
4. `docs/API.md`
5. `docs/DATABASE.md`
6. `docs/ROADMAP.md`

Changes should remain consistent with the documented product and architectural boundaries.

---

## License

This project is licensed under the MIT License.

See [`LICENSE`](LICENSE) for details.

---

## Acknowledgements

Requestly's initial API catalog is based on the excellent [`public-apis`](https://github.com/public-apis/public-apis) project.

The project also draws visual inspiration from modern Apple and Vercel product design, as well as contemporary WebGL-based web experiences.

---

<p align="center">
  Built with Next.js, TypeScript, MongoDB and a lot of curiosity.
</p>
