# Requestly Frontend 2.0

> Visual and interaction source of truth for the complete Requestly frontend redesign.

---

## 1. Purpose

Requestly Frontend 2.0 is a complete visual and interaction redesign of the existing Requestly application.

The current backend, database architecture, API contracts, request execution engine, health-check system, catalog ingestion, collections, and history functionality already exist and must be preserved.

This document governs the presentation layer.

The frontend should no longer feel like a conventional SaaS dashboard or generic AI-generated developer website.

Requestly should feel like:

> A native macOS developer tool, brought to the web.

The visual language combines:

- Native macOS application design
- GitHub repository browser information architecture
- Editorial typography
- Developer-tool density where useful
- Experimental motion
- Carefully controlled WebGL / Three.js / Anime.js-style interaction
- Light and dark adaptive interfaces
- Strong spatial hierarchy

The result should feel designed by a highly experienced frontend engineer, not assembled from a component library.

---

# 2. Core Design Philosophy

Requestly is a developer product.

Its interface must communicate:

- precision
- confidence
- technical depth
- restraint
- curiosity
- craftsmanship

The design should feel expensive without looking luxurious.

It should feel experimental without looking chaotic.

It should feel animated without feeling like a demo reel.

It should feel technical without becoming visually cold.

The interface should have personality.

---

# 3. The Core Visual Identity

The Requestly identity is built from four visual layers.

## 3.1 Editorial layer

Use typography, whitespace, composition, and large statements to create personality.

This is most visible on:

- landing page
- major section transitions
- page introductions
- empty states
- important calls to action

---

## 3.2 Developer layer

Technical information should feel dense, structured, and precise.

This is most visible on:

- API Explorer
- API Details
- Playground
- History
- Collections

Use:

- monospace typography
- structured rows
- technical metadata
- separators
- compact controls
- precise spacing

---

## 3.3 Native application layer

The application should feel like a desktop developer tool rather than a website pretending to be an application.

Use:

- floating navigation
- compact controls
- strong hierarchy
- restrained chrome
- spatial transitions
- contextual controls

Avoid giant permanent navigation bars.

---

## 3.4 Experimental layer

Motion and WebGL can provide atmosphere and identity.

However:

> Motion must support the interface, not compete with it.

No animation exists merely because it looks impressive.

---

# 4. Absolute Visual Rules

These rules are non-negotiable.

## NEVER USE

- AI-style glowing gradients
- purple/blue gradient blobs
- aurora backgrounds
- glassmorphism
- excessive blur
- floating neon orbs
- giant glowing spheres
- generic SaaS gradients
- excessive shadows
- colorful dashboard cards
- giant rounded cards
- excessive pill-shaped UI
- rainbow status systems
- generic template illustrations
- stock illustrations
- random 3D objects
- unnecessary particle fields
- excessive border radius
- giant dashboard statistics
- cookie-cutter landing page sections
- generic AI-generated hero compositions

---

## ALWAYS PRIORITIZE

- typography
- whitespace
- composition
- hierarchy
- subtle borders
- spatial relationships
- precise alignment
- restrained color
- intentional motion
- technical density where appropriate
- visual continuity between pages

---

# 5. Typography System

Typography is one of the primary differentiators of Requestly.

Requestly should NOT use one font for everything.

The interface should deliberately combine multiple typographic voices.

---

## 5.1 Display Typeface

Use a bold Garamond-style serif for major editorial typography.

Use it for:

- landing hero
- major section headlines
- major application page titles
- large statements
- important numbers
- editorial moments

The display face should feel:

- literary
- confident
- elegant
- slightly unconventional

It must not feel like a traditional newspaper.

---

## 5.2 Cursive Accent Typeface

Use a restrained cursive/script typeface as an occasional visual accent.

Use it for:

- selected words
- annotations
- small editorial phrases
- occasional section accents
- subtle handwritten-style moments

The cursive font must be used sparingly.

It should feel like a human signature or annotation.

It must NOT dominate the interface.

Do not use cursive for:

- buttons
- navigation
- technical data
- forms
- body paragraphs
- API information

---

## 5.3 Interface Typeface

Use a clean system sans-serif for functional UI.

Preferred direction:

- Apple system typography
- native macOS feel
- high legibility

Use for:

- navigation
- buttons
- labels
- descriptions
- controls
- metadata
- body copy

Avoid making the interface look like a typography showcase.

Usability comes first.

---

## 5.4 Monospace Typeface

Use monospace typography for technical information.

Use for:

- URLs
- HTTP methods
- endpoints
- request headers
- response headers
- JSON
- code
- status codes
- technical identifiers
- latency
- API metadata where appropriate

The monospace typeface should feel like a developer tool.

---

# 6. Typography Hierarchy

The hierarchy should generally be:

### Level 1

Bold Garamond

Large editorial statements.

### Level 2

System Sans

Functional headings and navigation.

### Level 3

System Sans

Descriptions and supporting information.

### Level 4

Monospace

Technical data.

### Accent

Cursive

Occasional editorial emphasis.

Do not use font size alone to create hierarchy.

Use:

- size
- weight
- spacing
- font family
- position
- whitespace
- motion

---

# 7. Color System

Requestly supports both light and dark mode.

The interface should follow the user's system preference by default.

Users should be able to switch between:

- Light
- Dark
- System

if the existing product architecture supports theme selection.

---

# 8. Light Theme

The light theme should feel like:

> a beautifully designed macOS developer application in daylight.

Use:

- warm near-white backgrounds
- near-black typography
- graphite secondary text
- extremely subtle borders
- restrained blue accents

Avoid pure white everywhere.

Use subtle tonal differences between:

- page background
- application surfaces
- elevated technical areas
- code areas

Do not create visible card stacking everywhere.

---

# 9. Dark Theme

The dark theme should feel like:

> a professional developer tool running late at night.

Use:

- near-black background
- soft white typography
- graphite surfaces
- subtle borders
- restrained blue accents

Dark mode must NOT become:

- neon
- cyberpunk
- purple
- glowing
- gradient-heavy

Dark mode should feel quiet and sophisticated.

---

# 10. Accent Color

Blue is the primary accent direction.

Use blue for:

- important actions
- selected states
- links
- focus states
- subtle visual cues
- interactive highlights

Blue must remain restrained.

Do not turn every interactive element blue.

Do not create colorful badge systems.

---

# 11. Borders

Borders should be subtle and structural.

Preferred:

- hairline borders
- 1px borders
- low-contrast separators

Borders should define relationships rather than create boxes around everything.

---

# 12. Border Radius

Keep radius small.

Preferred direction:

- 2px
- 3px
- 4px

Avoid:

- 12px
- 16px
- 24px
- pill-shaped containers

A large radius should require a very specific design reason.

---

# 13. Shadows

Shadows should be extremely rare.

Default:

> No shadows.

Depth should primarily come from:

- spacing
- contrast
- borders
- typography
- movement

If a shadow is genuinely necessary, it must be extremely subtle.

---

# 14. Navigation

Requestly should NOT use a large permanent SaaS navigation ribbon.

The navigation should be:

> floating, contextual, compact, and spatially independent from the page.

---

## 14.1 Landing Navigation

The landing page should have a floating navigation element.

It should:

- float above content
- have a compact footprint
- remain visually independent from the page
- adapt subtly to scroll
- contain the essential navigation only

It should not consume a large horizontal strip.

---

## 14.2 Application Navigation

The application should feel closer to a native macOS application.

Use a floating or compact application navigation system.

Potential structure:

- Requestly
- Explore
- Playground
- Collections
- History
- contextual actions

Do not create a giant sidebar unless required by usability.

---

## 14.3 Navigation Motion

Navigation may:

- compress on scroll
- expand on interaction
- transition between contexts
- subtly respond to pointer movement

Motion must remain fast and controlled.

---

# 15. Layout System

The layout should feel intentionally composed.

Use:

- large whitespace on editorial pages
- dense layouts on developer pages
- consistent content widths
- strong alignment
- deliberate asymmetry

Avoid:

- identical centered containers everywhere
- repetitive three-card layouts
- giant dashboard grids

---

# 16. Landing Page

The landing page should feel like an editorial introduction to a serious developer tool.

It must NOT resemble:

- a SaaS pricing page
- a startup template
- a generic AI product
- a dashboard

---

## 16.1 Hero

The hero should communicate Requestly immediately.

The composition should use:

- large Garamond typography
- restrained cursive accent
- large whitespace
- subtle motion
- strong spatial composition

The hero should feel cinematic without becoming visually noisy.

---

## 16.2 Hero Background

The existing matrix concept may remain as a subtle environmental background where appropriate.

However:

- it must never reduce text readability
- it must remain subtle
- it must work in light and dark themes
- it must not become a distracting animated wallpaper

The matrix should feel integrated into the environment.

It should NOT look like a standalone animation placed behind text.

---

## 16.3 Hero Motion

Possible techniques:

- subtle cursor interaction
- depth movement
- typography displacement
- WebGL environmental movement
- controlled parallax

Avoid:

- aggressive particle movement
- glowing particles
- excessive cursor trails

---

# 17. Landing Page Sections

The landing page should use strong visual transitions between sections.

Avoid repetitive:

```text
headline
three cards
headline
three cards
headline
CTA
```
