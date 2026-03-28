# Real Dough Pizza Co. — Brand Guidelines

---

## Brand Personality

**Playful but premium.** Real Dough is a frozen pizza company that takes fermentation seriously and themselves "just seriously enough." The brand balances:

- **Midwest authenticity** — Warm, approachable, genuine
- **Craft quality** — Premium ingredients, artisan process
- **Playful wit** — Puns, personality, never stuffy

---

## Brand Voice

**Tone**: Friendly, witty, confident but not arrogant

**Do**:
- Use puns and wordplay (pizza-related when possible)
- Keep copy concise and punchy
- Speak directly to the reader ("you", "your")
- Reference Midwest culture authentically

**Don't**:
- Be overly corporate or stiff
- Use excessive exclamation points
- Make health claims
- Be self-deprecating about frozen pizza

**Example copy**:
- "We take fermentation seriously and ourselves just seriously enough."
- "Five pizzas. Zero shortcuts."
- "The freezer aisle upgrade you didn't know you needed."

---

## Color System

### Core Brand Colors

| Name        | Hex       | Usage                                          |
|-------------|-----------|------------------------------------------------|
| Navy        | `#26225d` | Primary text, dark sections, button fills, logo |
| Cream       | `#ebe5d3` | Backgrounds, light text, light section fills    |
| Cream Light | `#faf7ee` | Hover states, subtle background variations (digital only) |

### SKU Colors

Each pizza has a signature color plus a 60% tint for softer backgrounds.

| Pizza                  | Primary   | Tint      | Notes                                  |
|------------------------|-----------|-----------|----------------------------------------|
| Okie Dokie Artichokie  | `#b4bd35` | `#dee787` | Earthy green, spinach/artichoke        |
| Peppin' Ain't Easy     | `#ef473d` | `#f6927a` | Bold coral red, use cream text on solid |
| The Wisco Kid          | `#40c3d6` | `#97d8e4` | Wisconsin teal, fresh feeling          |
| Lost in the Sausage    | `#c14f9d` | `#d492c0` | Rich magenta, use cream text on solid  |
| Curd Your Enthusiasm   | `#f4a81d` | `#f9c77a` | Golden yellow, highlight/focus states  |

### Color Pairing Rules

| Background         | Text Color | Muted Text                       |
|--------------------|------------|----------------------------------|
| Cream              | Navy       | `rgba(38, 34, 93, 0.75)`        |
| Navy               | Cream      | `rgba(235, 229, 211, 0.85)`     |
| Wisco / Okie / Curd | Navy     | Semi-transparent navy            |
| Peppin / Sausage   | Cream      | Semi-transparent cream           |

### Shadows & Effects

| Effect       | Value                                    | Usage                          |
|--------------|------------------------------------------|--------------------------------|
| Hard shadow  | `8px 8px 0 rgba(38, 34, 93, 0.4)`       | Cards, buttons on hover        |
| Soft shadow  | `0 8px 32px rgba(38, 34, 93, 0.15)`     | Product images, organic shapes |

**Flour texture**: A subtle grain overlay applied to dark-background sections.

---

## Typography

### Font Stack

| Font              | Role        | Weight      | Character                     |
|-------------------|-------------|-------------|-------------------------------|
| Roboto Condensed  | Headlines   | 700 (Bold)  | Bold, condensed, industrial   |
| Montserrat        | Subheadings | 600 (Semi)  | Clean, modern, geometric      |
| Barlow Condensed  | Labels      | 600 (Semi)  | Friendly, readable condensed  |
| Barlow            | Body        | 400 (Reg)   | Approachable, highly readable |
| Gochi Hand        | Accent      | 400         | Handwritten, casual, fun      |

### Headline Hierarchy

| Level      | Font             | Size (Desktop)                  | Tracking  |
|------------|------------------|---------------------------------|-----------|
| Headline 1 | Roboto Condensed | `clamp(2.2rem, 6vw, 3.6rem)`   | `0.08em`  |
| Headline 2 | Roboto Condensed | `clamp(1.6rem, 4vw, 2.4rem)`   | `0.06em`  |
| Headline 3 | Montserrat       | `1.1rem`                        | `0.08em`  |
| Headline 4 | Barlow Condensed | `1rem`                          | `0.05em`  |
| Accent     | Gochi Hand       | `1.3rem` (varies)               | —         |

All headlines use **uppercase** and letter-spacing.

### Body Text

- **Font**: Barlow, 1rem, line-height 1.6
- **Muted text on light bg**: `rgba(38, 34, 93, 0.75)`
- **Muted text on dark bg**: `rgba(235, 229, 211, 0.85)`

### Special Elements

**Pill / Tag**: Barlow Condensed 600, 0.85rem, uppercase, 0.1em tracking, navy bg with cream text, rounded capsule shape (`border-radius: 40px`, `padding: 8px 20px`).

**Navigation links**: Barlow Condensed 600, 0.95rem, uppercase, 0.08em tracking.

### Responsive Sizing

| Breakpoint     | H1                              | H2                              | H3     | H4     |
|----------------|----------------------------------|---------------------------------|--------|--------|
| Desktop        | `clamp(2.2rem, 6vw, 3.6rem)`   | `clamp(1.6rem, 4vw, 2.4rem)`  | 1.1rem | 1rem   |
| Mobile (<768)  | `clamp(1.6rem, 8vw, 2.2rem)`   | `clamp(1.3rem, 6vw, 1.7rem)`  | 1rem   | 0.9rem |
| XS (<480)      | `clamp(1.5rem, 7vw, 2rem)`     | —                              | —      | —      |

---

## Buttons

### Variants

| Variant       | Background  | Text  | Use On                |
|---------------|-------------|-------|-----------------------|
| Dark          | Navy        | Cream | Light sections        |
| Light         | Cream       | Navy  | Dark sections         |
| Primary       | Curd gold   | Navy  | Primary CTAs          |
| Outline       | Transparent | Navy  | Secondary actions     |
| Outline Light | Transparent | Cream | Dark section secondaries |

### Shape & Behavior

Buttons use organic blob-shaped border-radius that morphs on hover:

- **Default**: `border-radius: 58% 42% 55% 45% / 45% 55% 42% 58%`
- **Hover**: `border-radius: 45% 55% 48% 52% / 52% 48% 55% 45%`, scale 1.05, hard shadow

---

## UI Components

### Cards

- Light background: White/cream card with navy text, `.muted` for secondary text
- Dark background: Semi-transparent cream card (`rgba(235, 229, 211, 0.1)`) with cream border (`rgba(235, 229, 211, 0.3)`)

### Forms

- Labels: Barlow Condensed, uppercase
- Inputs: Standard with placeholder personality (e.g., `you@pizza.com`)
- Submit buttons use `.btn-dough-dark`

### Image Treatments

| Treatment       | Border Radius                                     | Usage              |
|-----------------|---------------------------------------------------|--------------------|
| Image Frame     | Standard rectangle with hard shadow               | Editorial photos   |
| Organic Blob    | `60% 40% 55% 45% / 45% 55% 40% 60%`             | Lifestyle imagery  |
| Squircle        | `20% 18% 22% 16% / 18% 20% 16% 22%`             | Product images     |

---

## Layout & Sections

### Container

Max-width 1180px, centered with horizontal padding.

### Grid

- 2-column and 3-column grid options
- Responsive collapse on mobile

### Section Types

| Type              | Background        | Text   | Notes                         |
|-------------------|-------------------|--------|-------------------------------|
| Light (default)   | Cream             | Navy   | Standard content sections     |
| Navy              | Navy + flour texture | Cream | Use `.muted` for body text  |
| SKU-colored       | Any SKU color     | Varies | See color pairing rules above |
| SKU tint          | Any SKU tint      | Navy   | Softer alternative            |

### Page Heroes

Centered layout with:
- Pill tagline
- Headline 1 title
- Headline 4 subtitle
- Hero color variants: Navy, Wisco, Peppin, Okie, Curd, Sausage
- Optional decorative crust corner

---

## Decorative Elements

- **Flour texture overlay** — Subtle grain on dark sections
- **Crust corner** — Decorative pizza crust image in hero corners
- **Dough icon** — Custom SVG brand mark, available in navy and cream
- **Doodle arrows** — Hand-drawn arrow decorations with optional captions

---

## Animation

- **Reveal** — Elements fade/slide in on scroll
- **Reveal left** — Slides in from the left
- **Headline reveal** — Letter-spacing animates from wide to normal on scroll (e.g., `0.18em` to `0.08em`)

---

## Social Presence

Icon variants available in both cream (for dark backgrounds) and navy (for light backgrounds):
- Instagram
- TikTok
- Facebook
- YouTube
- Pinterest (inline SVG)
