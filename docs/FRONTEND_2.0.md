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

Instead, vary composition.

Possible section structures:

editorial statement
large technical visual
asymmetric split
API explorer preview
request/response visualization
typography-led section
full-width transition
compact CTA

Each section should feel like part of the same visual story.

18. Motion System

Motion is a major part of Requestly 2.0.

The interface should feel alive.

But:

every animation must have a reason.

18.1 Motion Principles

Motion should communicate:

hierarchy
continuity
cause and effect
spatial relationships
state changes

Motion should NOT exist merely to impress.

18.2 Preferred Motion Characteristics

Animations should feel:

smooth
physical
intentional
slightly cinematic
responsive
precise

Avoid generic:

opacity: 0 → 1
transform: translateY(20px)

for every single component.

Variation is important.

19. Advanced Motion

The project may use:

GSAP
Anime.js
Framer Motion
CSS animation
WebGL
Three.js

depending on what is already installed and what is technically appropriate.

Do NOT install multiple animation libraries simply because they are available.

Choose the smallest appropriate toolset.

20. WebGL / Three.js

WebGL should be treated as a visual environment.

It must not become decorative noise.

Good uses:

subtle spatial background
interactive data environment
abstract API/network visualization
depth
responsive field
environmental movement

Bad uses:

spinning cubes
giant 3D logos
random spheres
glowing blobs
cryptocurrency-style particle networks 21. WebGL Performance

WebGL must:

degrade gracefully
respect reduced motion
avoid blocking interaction
avoid excessive GPU usage
work on mobile
have a fallback

If WebGL is not performant on a device:

fall back to CSS/static visuals.

The application must remain usable without WebGL.

22. Parallax

Parallax can be used where it creates genuine depth.

Use subtle differences in movement speed between layers.

Never allow:

text to become unreadable
layout shift
horizontal overflow
interaction problems

Respect:

prefers-reduced-motion.

23. API Explorer

The Explorer should feel like:

a GitHub repository browser for APIs.

This is a major design direction.

Do NOT use a generic card marketplace.

23.1 Information Architecture

The interface should prioritize:

categories
API names
descriptions
metadata
endpoint
authentication
HTTPS
CORS
health state
23.2 Explorer Visual Language

Prefer:

rows
separators
hierarchy
compact metadata
monospace technical details
subtle hover states

Cards may be used only when they genuinely improve the interface.

Do not create a wall of rounded cards.

23.3 Explorer Interaction

Rows should respond naturally to:

hover
selection
keyboard navigation where appropriate

Transitions should preserve spatial continuity.

Opening an API should feel like moving deeper into the same environment.

24. API Details

API Details should feel like a technical reference page inside the same developer application.

The page should clearly communicate:

API identity
description
category
endpoint
authentication
HTTPS
CORS
source
live health
response latency
available actions
24.1 API Details Layout

Use:

strong page title
technical metadata
endpoint block
health section
action area

Avoid:

giant dashboard statistics
colorful status cards
excessive cards 25. Playground

The Playground should feel like the most technically dense part of Requestly.

It should resemble a native developer workspace.

25.1 Playground Philosophy

The user should feel:

I am operating a real developer instrument.

Not:

I am filling out a SaaS form.

25.2 Playground Structure

The Playground should clearly separate:

Request
method
URL
query
headers
authentication
body
Response
status
latency
body
headers
raw output
25.3 Playground Density

The Playground may be denser than the landing page.

This is intentional.

Use:

monospace
compact controls
technical tabs
separators
structured editors

But maintain visual hierarchy.

25.4 Request/Response Motion

When a request is sent:

the interface should communicate:

configured
↓
sending
↓
waiting
↓
response

The transition should feel physical and intentional.

Avoid excessive loading animations.

26. Collections

Collections should feel like a developer workspace.

The interface should prioritize:

collection names
saved requests/APIs
hierarchy
organization
quick access

Avoid:

giant cards
dashboard metrics
decorative graphics 27. History

History should feel like a developer activity log.

Prioritize:

method
URL
status
latency
timestamp

Use dense rows where appropriate.

History should be fast to scan.

28. Empty States

Empty states should feel intentional.

Use:

typography
whitespace
small technical hints
subtle motion where appropriate

Avoid:

giant illustrations
colorful illustrations
cartoon graphics
generic SaaS empty-state artwork 29. Error States

Errors should feel like part of a developer tool.

Examples:

REQUEST BLOCKED

The destination resolves to a private network.

or:

REQUEST TIMEOUT

The external API did not respond within 5 seconds.

Clear.

Technical.

Calm.

No dramatic red dashboard.

30. Status System

Status should not rely exclusively on colorful badges.

Prefer:

typography
symbols
subtle indicators
status labels

Examples:

Operational
Unavailable
Timeout
HTTP 401
Checking

Color is supplementary.

31. Icons

Use a consistent icon library already present in the project if appropriate.

Icons should be:

simple
technical
minimal

Avoid decorative icon overload.

Do not put an icon beside every sentence.

32. Buttons

Buttons should feel like native application controls.

Prefer:

compact
precise
high contrast where necessary
subtle borders
clear hover states

Avoid giant pill buttons.

Primary actions may have stronger contrast.

33. Forms

Forms should feel like developer tooling.

Inputs should have:

clear labels
subtle borders
visible focus
strong typography
useful placeholder text

Avoid oversized rounded inputs.

34. Code / JSON Interfaces

Technical content should feel first-class.

Use:

monospace
subtle code surfaces
syntax-aware presentation where appropriate
restrained borders
independent scrolling

Never allow code/response content to cause page-level horizontal overflow.

35. Responsive Design

Requestly must work across:

desktop
laptop
tablet
mobile

The visual identity must remain intact.

Do not simply stack everything vertically.

On smaller screens:

simplify navigation
reduce visual effects
preserve hierarchy
maintain developer usability 36. Mobile WebGL

WebGL effects should be:

reduced
simplified
or disabled

on low-powered/mobile devices where appropriate.

The fallback must still look intentional.

Never leave an empty visual hole.

37. Accessibility

Support:

semantic HTML
keyboard navigation
visible focus
accessible labels
screen-reader context
appropriate ARIA
color contrast
reduced motion

Accessibility is part of the design, not a final patch.

38. Reduced Motion

Respect:

@media (prefers-reduced-motion: reduce)

Reduce or disable:

parallax
WebGL movement
cursor interaction
large transitions
decorative animation

The static design must still look complete.

39. Performance

The frontend must remain fast.

Avoid:

unnecessary JavaScript
huge animation bundles
excessive WebGL
unnecessary rerenders
giant client components
unnecessary dependencies

Prefer:

server components where appropriate
client components only when interaction requires them
lazy loading for expensive visuals
GPU-friendly animation
CSS transforms
requestAnimationFrame where appropriate 40. Backend Preservation

This redesign MUST NOT break the backend.

Preserve:

MongoDB integration
API catalog
API ingestion
health checks
request execution
SSRF protection
request history behavior
collections behavior
API contracts

Do not redesign backend architecture.

Do not modify database schemas unless absolutely required by an existing frontend/backend contract issue.

41. API Contract Preservation

The frontend must continue using the documented API contracts in:

docs/API.md

Do not invent new endpoint shapes simply to make the redesign easier.

If a frontend component requires new information:

first determine whether the existing API already provides it.

Do not modify backend endpoints unnecessarily.

42. Existing Functionality Preservation

The redesign must preserve all currently working functionality.

At minimum:

Landing page
Explore
API search
API filters
API details
live health checks
Playground
GET
POST
PUT
PATCH
DELETE
query parameters
headers
authentication
JSON body
real request execution
response viewer
history
collections
theme adaptation 43. Component Architecture

The redesign should establish reusable primitives.

Potential structure:

components/
ui/
navigation/
landing/
explorer/
api/
playground/
collections/
history/
motion/
webgl/

Do not create components solely for the sake of abstraction.

Prefer meaningful reusable components.

44. Design Tokens

Centralize:

colors
spacing
typography
radius
borders
motion timing
easing

Avoid random values throughout the application.

The design should feel mathematically coherent.

45. Animation Tokens

Define a small motion system.

For example:

micro interaction
interface transition
page transition
editorial reveal
environmental motion

Do not create dozens of unrelated durations.

46. Page Transitions

Where technically appropriate, page transitions should preserve continuity.

For example:

Explorer row
→ API Details

API Details
→ Playground

The user should feel like they moved deeper into the same application rather than loaded an entirely unrelated page.

Do not make page transitions slow.

47. Cursor Interaction

Cursor interaction may be used for:

subtle magnetic controls
WebGL response
environmental movement
hover relationships

Do not create:

giant cursor replacements
trailing blobs
excessive cursor effects

The cursor should remain usable.

48. Scroll Behavior

Scrolling should feel smooth and intentional.

Do not hijack normal browser scrolling.

Avoid scroll-jacking.

Parallax should complement native scrolling.

49. Dark Mode Motion

Dark mode should use the same motion language as light mode.

Do not introduce special neon animations for dark mode.

50. Visual Continuity

Every page must look like the same application.

A user moving:

Landing
→ Explorer
→ API Details
→ Playground
→ History
→ Collections

should immediately recognize:

This is Requestly.

Typography, spacing, motion, navigation, borders, controls, and color must establish continuity.

51. No Generic SaaS Patterns

Avoid patterns such as:

Huge headline
Subheadline
Three feature cards
Testimonials
Pricing
CTA

unless they genuinely serve Requestly.

This is a developer product, not a marketing template.

52. No Dashboardification

Do not turn every page into:

┌────────┐ ┌────────┐ ┌────────┐
│ 123 │ │ 456 │ │ 789 │
└────────┘ └────────┘ └────────┘

Requestly does not need giant metrics everywhere.

Technical information should be represented naturally.

53. No Excessive Cards

Cards are not the default layout primitive.

Prefer:

rows
sections
separators
open layouts
structured panels
typography

Use cards only when the content genuinely benefits from containment.

54. No Visual Noise

If a visual element does not improve:

understanding
navigation
hierarchy
interaction
atmosphere

remove it.

55. Design Quality Standard

The final frontend should look like someone cared about:

every 4px
every baseline
every transition
every hover state
every empty state
every loading state
every breakpoint

The interface should feel deliberate.

56. Implementation Order

Do NOT redesign pages randomly.

Implement in this order:

Step 1

Establish the new design tokens.

Step 2

Establish typography.

Step 3

Establish light/dark themes.

Step 4

Establish navigation.

Step 5

Establish core UI primitives.

Step 6

Establish motion system.

Step 7

Establish WebGL/environment layer.

Step 8

Redesign landing page.

Step 9

Redesign Explorer.

Step 10

Redesign API Details.

Step 11

Redesign Playground.

Step 12

Redesign Collections.

Step 13

Redesign History.

Step 14

Responsive pass.

Step 15

Accessibility pass.

Step 16

Performance pass.

Step 17

Functional regression.

57. Do Not Rewrite Everything Blindly

Before replacing an existing component:

understand:

what data it receives
what API it calls
what state it owns
what other components depend on it
what functionality must remain

The redesign is visual and interaction-focused.

Do not destroy working application logic simply because the component looks different.

58. Backend Freeze

During the frontend redesign:

DO NOT modify:

MongoDB schema
ingestion system
health engine
request engine
SSRF security
API endpoint contracts

unless a genuine frontend integration defect makes a change unavoidable.

If such a problem is discovered:

document it before changing it.

59. Testing During Redesign

After each major page:

run:

npm run type-check
npm run lint

Do not wait until the end to discover TypeScript problems.

After the full redesign:

run:

npm run type-check
npm run lint
npm run build 60. Functional Regression

After the redesign verify:

/
/explore
/explore/[id]
/playground
/collections
/history

Verify:

GET /api/apis
GET /api/apis/[id]
GET /api/health
GET /api/health?apiId=[id]
POST /api/request

And all documented collection/history functionality.

61. Final Acceptance Criteria

The redesign is complete only when:

Visual
Native macOS developer-tool feeling
GitHub repository-browser-inspired Explorer
Bold Garamond display typography
Restrained cursive accent typography
System sans for interface
Monospace for technical data
Light mode
Dark mode
No gradients
No AI glow
No glassmorphism
No giant rounded cards
No generic SaaS dashboard
No excessive shadows
No visual clutter
Navigation
Floating navigation
No permanent giant navigation ribbon
Contextual application navigation
Smooth navigation transitions
Motion
Smooth page transitions
Intentional micro-interactions
Subtle parallax
Environmental motion
WebGL where genuinely useful
Reduced-motion support
No excessive animation
Landing
Completely redesigned
Strong editorial composition
New typography hierarchy
Integrated environmental background
Strong CTA
Responsive
Explorer
Repository-browser-inspired layout
Real catalog data
Search works
Filters work
Health state works
API navigation works
API Details
Completely redesigned
Real API data
Real health data
Endpoint interaction
Playground integration
Playground
Native developer workspace feeling
Real backend execution
Request editor works
Response viewer works
Authentication works
Body editor works
Error states work
Collections
Redesigned
Existing persistence preserved
Save/remove works
Empty states work
History
Redesigned
Existing persistence preserved
History works
Replay works if documented
Empty states work
Technical
Backend untouched
API contracts preserved
MongoDB untouched
SSRF protections untouched
No secrets exposed
No production mock data
TypeScript passes
ESLint passes
Production build passes
Responsive
Desktop
Laptop
Tablet
Mobile
No horizontal overflow
Accessibility
Keyboard navigation
Focus states
Semantic HTML
Accessible labels
Contrast
Reduced motion 62. Final Design Test

Before declaring the redesign complete, answer this question honestly:

If the Requestly logo and product name were removed, would the interface still feel like a deliberately designed developer application rather than a generic AI-generated SaaS website?

If the answer is no:

continue refining.

If the answer is yes:

stop.

63. Final Principle

Requestly should not try to impress the user with visual effects.

It should impress them with:

composition
typography
interaction
precision
motion
restraint
technical clarity

The interface should feel:

crafted, not generated.

native, not templated.

experimental, not chaotic.

technical, not sterile.

beautiful, without trying too hard.

64. Final Instruction

This document is the visual source of truth for Requestly Frontend 2.0.

When this document conflicts with the old frontend implementation:

the new frontend direction wins.

When this document conflicts with backend/API architecture:

the backend/API architecture wins.

Do not modify backend contracts merely to satisfy visual preferences.

The final result should be a complete visual replacement of the existing Requestly frontend while preserving the entire working application underneath it.
