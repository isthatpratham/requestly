# Requestly Design System

**Version:** 1.0
**Status:** Approved
**Theme:** Light only
**Design Direction:** Apple × Vercel × Developer Tool

---

## 1. Design Philosophy

Requestly should feel like a product that was designed rather than assembled.

The visual identity combines:

* Apple's typography, spacing and restraint
* Vercel's monochrome visual language
* A focused developer-tool interface
* Subtle, high-quality motion
* Strong information hierarchy

The interface should feel:

**Minimal. Precise. Calm. Expensive. Technical.**

Every element must have a purpose.

Avoid visual decoration that does not improve comprehension or interaction.

---

## 2. Core Design Rules

### Always

* Use generous whitespace.
* Maintain strong alignment.
* Use typography to establish hierarchy.
* Prefer borders over shadows.
* Use near-white surfaces.
* Use near-black primary text.
* Keep corner radii small.
* Use animation sparingly.
* Keep developer interfaces information-dense where necessary.
* Preserve a clean visual rhythm.
* Prefer simple components over decorative components.

### Never

* No gradients.
* No glassmorphism.
* No large drop shadows.
* No oversized rounded cards.
* No excessive pill-shaped UI.
* No colorful dashboard widgets.
* No rainbow status systems.
* No generic AI-dashboard aesthetic.
* No excessive decorative icons.
* No giant text blocks inside cards.
* No unnecessary floating elements.
* No excessive borders.
* No visual clutter.

---

## 3. Visual References

The Requestly landing-page hero takes inspiration from the supplied 21st.dev WebGL shader reference:

https://21st.dev/?preview=%2F%40designali-in%2Fcomponents%2Fweb-gl-shader

The overall color and interface direction takes inspiration from the supplied Vercel theme reference:

https://21st.dev/?preview=%2F%40serafimcloud%2Fthemes%2Fvercel

These references establish the visual direction but should not be copied literally.

Requestly must maintain its own visual identity.

---

## 4. Color System

Requestly uses a restrained monochrome palette.

### Background

```text
Primary Background
#FAFAFA

Secondary Background
#F5F5F5

Elevated Surface
#FFFFFF
```

### Text

```text
Primary
#171717

Secondary
#525252

Muted
#737373

Disabled
#A3A3A3
```

### Borders

```text
Default Border
#E5E5E5

Subtle Border
#F0F0F0

Strong Border
#D4D4D4
```

### Black

```text
Primary Black
#000000
```

Black may be used for high-emphasis actions, navigation elements and selected states.

### White

```text
Pure White
#FFFFFF
```

Use primarily for surfaces and contrast against the near-white page background.

---

## 5. Semantic Colors

Semantic colors should be used sparingly.

They exist primarily for states and developer-tool feedback rather than decoration.

### Success

```text
Foreground
#15803D

Background
#F0FDF4
```

### Error

```text
Foreground
#B91C1C

Background
#FEF2F2
```

### Warning

```text
Foreground
#A16207

Background
#FEFCE8
```

### Information

```text
Foreground
#2563EB

Background
#EFF6FF
```

Semantic colors must never become the primary visual language of the application.

---

## 6. Typography

Requestly uses Apple's system typography wherever available.

### Font Stack

```css
font-family:
  -apple-system,
  BlinkMacSystemFont,
  "SF Pro Display",
  "SF Pro Text",
  "Segoe UI",
  Helvetica,
  Arial,
  sans-serif;
```

The implementation should prefer system fonts rather than downloading unnecessary font files.

---

## 7. Typography Hierarchy

### Display

Used for major landing-page statements.

```text
Weight: 600
Tracking: Tight
Line Height: 0.95–1.05
```

Display text should be large but never oversized purely for visual impact.

---

### Heading 1

```text
Weight: 600
Tracking: Tight
Line Height: 1.1
```

Used for primary page titles.

---

### Heading 2

```text
Weight: 600
Tracking: Tight
Line Height: 1.2
```

Used for major sections.

---

### Heading 3

```text
Weight: 500–600
Line Height: 1.25
```

Used for component and subsection titles.

---

### Body

```text
Weight: 400
Line Height: 1.5–1.6
```

Body text should remain highly readable.

---

### Small Text

```text
Weight: 400–500
Line Height: 1.4
```

Used for metadata, supporting information and secondary labels.

---

### Code

Developer-facing code must use a monospace font.

```css
font-family:
  ui-monospace,
  SFMono-Regular,
  Menlo,
  Monaco,
  Consolas,
  "Liberation Mono",
  "Courier New",
  monospace;
```

---

## 8. Spacing

Use a consistent spacing scale.

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
64px
80px
96px
128px
```

Small spacing should be used for related elements.

Large spacing should separate conceptual sections.

Whitespace is a major part of the Requestly visual identity.

---

## 9. Layout

### Page Width

Primary application content should use a centered maximum-width container.

Suggested maximum width:

```text
1200–1280px
```

The exact width may vary by page.

---

### Landing Page

The landing page should use wider compositions and generous horizontal spacing.

The hero should feel immersive rather than boxed into a traditional SaaS card.

---

### Developer Tool Pages

Explore and Playground pages may use denser layouts.

The interface should prioritize:

1. Request controls
2. Response information
3. API metadata
4. Secondary actions

---

## 10. Border Radius

Requestly intentionally uses small corner radii.

Preferred values:

```text
0px
2px
4px
6px
```

Use square corners where appropriate.

Avoid large rounded containers.

Do not use 12px, 16px, 20px or 24px radius as a default design pattern.

---

## 11. Shadows

Requestly does not use decorative shadows.

Default:

```text
box-shadow: none;
```

Hierarchy should be created through:

* spacing
* borders
* contrast
* typography
* surface color

If a shadow is genuinely required for a specific interaction, it must be extremely subtle and documented before introduction.

---

## 12. Cards

Cards should be used only when they provide meaningful grouping.

Cards should:

* Have a subtle border.
* Use a near-white or white surface.
* Use minimal radius.
* Avoid shadows.
* Have appropriate internal spacing.

Cards must not become the default container for every piece of information.

A page should not look like a collection of floating boxes.

---

## 13. Buttons

Buttons should be compact, precise and functional.

### Primary Button

Use for the most important action.

Example:

```text
Send Request
```

Characteristics:

* Near-black background
* White text
* Small radius
* Strong typography
* Subtle hover transition

---

### Secondary Button

Use for supporting actions.

Characteristics:

* Transparent or white background
* Subtle border
* Near-black text
* Small radius

---

### Ghost Button

Use for low-emphasis actions.

Characteristics:

* No visible border by default
* Transparent background
* Subtle hover background

---

### Destructive Button

Use only for destructive actions.

Do not make destructive buttons visually dominant unless necessary.

---

## 14. Inputs

Inputs should feel like professional developer tooling.

Characteristics:

* White or near-white background
* Subtle border
* Small radius
* Clear focus state
* Comfortable vertical padding
* Strong readability

Avoid:

* Large rounded inputs
* Excessive shadows
* Decorative input backgrounds

---

## 15. Selects and Dropdowns

Dropdowns should match the input system.

They should be:

* Compact
* Precise
* Clearly labeled
* Keyboard accessible

Avoid excessive animation.

---

## 16. API Status

API availability is an important part of Requestly.

Use simple status indicators.

### Operational

```text
● Operational
```

### Unavailable

```text
○ Unavailable
```

### Checking

```text
◌ Checking
```

The status indicator should remain visually restrained.

Do not use oversized status badges.

The status text and indicator should be enough.

---

## 17. API Cards

API cards should prioritize information rather than decoration.

A typical card may contain:

```text
API Name

Short description

Category
Authentication
HTTPS
CORS

Status
Response time

Explore →
```

Cards should not contain unnecessary icons, gradients or visual effects.

The API name should have the strongest hierarchy.

---

## 18. API Detail Pages

The API detail page should clearly separate:

### Identity

* API name
* Description
* Category

### Metadata

* Endpoint
* Authentication
* HTTPS
* CORS

### Live Status

* Operational state
* Status code
* Response time
* Last checked state where applicable

### Actions

* Open in Playground
* Save to Collection

The page should feel like an API reference surface rather than a marketing page.

---

## 19. Playground

The Playground is the densest part of Requestly.

Density is acceptable here because it serves a functional developer workflow.

The interface should prioritize:

```text
Method
URL
Request configuration
Send
Response
```

Secondary controls should remain accessible without dominating the interface.

---

## 20. Code Blocks

Code blocks should use a restrained developer-tool style.

Characteristics:

* Dark or high-contrast code surface may be used where it improves readability.
* Monospace typography.
* Clear syntax hierarchy.
* Copy action.
* Language indicator.
* Minimal decoration.

Code blocks should not become oversized visual panels.

---

## 21. Response Viewer

The response viewer should clearly communicate:

```text
Status
Response time
Response size where available
Headers
Body
```

JSON responses should be formatted and readable.

Large responses should remain usable without causing the entire page to become unwieldy.

Where appropriate, use scrollable containers.

---

## 22. Navigation

Navigation should be minimal.

The primary navigation should expose only important destinations.

Suggested structure:

```text
Requestly

Explore
Playground
Collections
History
```

The logo/wordmark should return to the landing page.

Navigation should not contain unnecessary nested menus.

---

## 23. Landing Page

The landing page should be visually distinctive.

### Hero

The hero should:

* Use the supplied WebGL shader visual direction.
* Have strong typography.
* Use generous whitespace.
* Maintain a restrained monochrome palette.
* Avoid traditional gradient blobs.
* Avoid generic SaaS illustrations.
* Avoid excessive UI mockups.

The hero should communicate the product within seconds.

Suggested hierarchy:

```text
Small product identifier

Large headline

Short supporting statement

Primary action
Secondary action
```

The visual experience should carry much of the personality.

---

## 24. Animation

Animation is important to the premium feel of Requestly.

Use motion for:

* Page transitions
* Hover states
* Button feedback
* Navigation changes
* Search/filter transitions
* API status changes
* Response loading
* Hero effects

Animation should generally be:

* Short
* Smooth
* Physically believable
* Subtle

Avoid:

* Bouncy UI
* Excessive parallax
* Large scale changes
* Constant movement
* Distracting loading animations

The user should notice that Requestly feels polished without being able to point at every animation.

---

## 25. Loading States

Loading states should preserve layout stability.

Prefer:

* Minimal skeletons
* Subtle progress indicators
* Clear loading text where necessary

Avoid giant skeleton cards or overly animated placeholders.

For live API checks, communicate the state clearly:

```text
Checking API...
```

---

## 26. Empty States

Empty states should be simple and useful.

Example:

```text
No saved APIs

Save an API to a collection
and it will appear here.

[ Explore APIs ]
```

Avoid large illustrations or decorative empty-state graphics.

---

## 27. Error States

Errors should explain what happened without exposing unnecessary implementation details.

Example:

```text
Request failed

The API could not be reached.

Status: 503
Response time: 2.4s

[ Try Again ]
```

Developer-facing errors may expose technical details when useful.

---

## 28. Responsive Design

Requestly should work across:

* Desktop
* Laptop
* Tablet
* Mobile

The desktop experience is the primary target because Requestly is a developer tool.

On smaller screens:

* Navigation should simplify.
* Playground controls may stack vertically.
* Response and request panels should remain readable.
* Horizontal overflow should be intentional and controlled.
* Touch targets must remain usable.

Do not simply shrink the desktop interface.

---

## 29. Accessibility

Requestly should follow accessible interface practices.

Requirements include:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Sufficient text contrast
* Proper form labels
* Accessible buttons
* Accessible dialogs
* Appropriate ARIA attributes where required
* No interaction that depends exclusively on hover
* Reduced-motion consideration

Accessibility should be considered during implementation rather than added at the end.

---

## 30. Icons

Icons should be used sparingly.

Icons should:

* Communicate a clear action or concept.
* Have consistent sizing.
* Align correctly with text.
* Never replace important text unnecessarily.

Avoid decorative icon collections.

A consistent icon library should be selected during implementation and used throughout the application.

---

## 31. Content Style

Requestly's interface copy should be:

* Short
* Clear
* Direct
* Technical where appropriate
* Human
* Confident

Avoid:

* Marketing jargon
* Excessive exclamation marks
* Artificially enthusiastic copy
* Long explanations inside UI
* Generic AI-style phrases

Examples:

Prefer:

```text
Send Request
```

over:

```text
Start Your API Journey

```

Prefer:

```text
API unavailable
```

over:

```text
Oops! Something went wrong with your API adventure.
```

---

## 32. Developer Tool Density

The application has two distinct visual densities.

### Discovery Density

Explore pages should be:

* Spacious
* Easy to scan
* Visually calm
* Content-focused

### Tool Density

Playground pages should be:

* Compact
* Information-rich
* Highly structured
* Efficient

The two experiences should still feel like the same product.

---

## 33. Design Consistency Rules

New components must reuse existing design tokens and patterns.

Do not introduce:

* A new radius without a reason
* A new color without a reason
* A new shadow without approval
* A new typography scale without a reason
* A new button style when an existing one is appropriate
* A new card style for a minor visual difference

If an existing component can be reused, reuse it.

If a new component is genuinely required, it should follow this design system.

---

## 34. Implementation Principle

The design system is a source of truth.

Before implementing or modifying UI, developers and AI coding agents must consult this document.

The implementation must not invent a separate visual language for individual pages.

Requestly should feel like one carefully designed product from the landing page through the API Playground.

---

## 35. Final Visual Standard

The final product should pass this simple test:

> If all branding were removed, Requestly should still look like a carefully designed Apple-inspired developer tool rather than a generic Tailwind dashboard.

When choosing between a visually complex solution and a simpler one, prefer the simpler solution unless the complexity materially improves usability.
