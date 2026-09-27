# Cybernaut Design System

The shared design language for **Cybernaut EdTech** — an Indian ed-tech company whose
tagline is *"We Create Leaders not Employees"* (brand signature: **Endeavour to Explore**).
This system captures two real products and gives design agents the tokens, components,
assets and full-screen recreations needed to build on-brand work.

> **Sources** — this system was reverse-engineered from the company's own codebases.
> Explore them for deeper fidelity:
> - **Marketing website** — `cybernaut-gith/cn-website` (Next.js 15, Tailwind v4, Radix UI, GSAP, Framer Motion)
> - **LMS client** — `cybernaut-gith/CybernautLmsClient` (React 19 + Vite, multi-app SPA: login / student / admin / superadmin)
>
> If you have access, read the originals for exact section copy, animation timing and the
> admin/superadmin surfaces not yet recreated here.

---

## The products

| Product | What it is | Surfaces recreated |
|---|---|---|
| **Marketing website** | Public site that sells the courses and community. Long-scroll, animated hero with rotating headlines, course grid, stats, events (AARVAM), about, blogs. | `ui_kits/website/` — Home (hero, programs, trust band, footer) |
| **CybernautLMS Portal** | The learning portal students log into. Dashboard, course/batch view, quizzes, coding compiler (Monaco), practical labs, leaderboard, batch forum chat. Class-based **dark mode** throughout. | `ui_kits/portal/` — Login → Dashboard, My Course, Batch Forum |

The website's **"Student Login"** is the doorway into the LMS Portal — the two products are one journey.

The course catalogue spans **Full Stack Development, Data Analytics, Tech Trio (C/C++/DSA), UI/UX Design and MetaZEN**. Headline stats used across the brand: **1,00,000+ (1L+) learners trusted**, **75,000+ students trained**.

---

## Content fundamentals

How Cybernaut writes. Match this voice in any copy you produce.

- **Aspirational and motivational, never corporate-dry.** Copy sells transformation: *"Boost Up and Build Your Tech Career"*, *"shape the digital future"*, *"your adventure begins now!"*. The masthead promise is *"We Create Leaders not Employees."*
- **Second person, direct address.** Speaks to *"you"* / *"your"* ("Your learning journey is progressing beautifully", "Step into the world of tech"). The portal greets by first name and time of day ("Good Morning, Aarav!").
- **Energetic, slightly grand.** Community framed as *"The Hidden Order of Tech Clans"*; sections invite you to *"Reboot Campus Innovation"*. Exclamation marks are welcome but not constant.
- **Sentence case for body and most headings**; the marketing display headline and the logo wordmark use **UPPERCASE** for impact (e.g. `ENDEAVOUR TO EXPLORE`).
- **Action-first CTAs**, short and verb-led: *Contact us*, *Explore Solutions*, *Sign in*, *Enroll now*, *Take Quiz*, *Join Meet*, *Continue*.
- **Numbers carry pride** and use the Indian grouping/short forms — *1L+*, *75K+*, *Day 12* — but only where they mean something. Don't manufacture stats.
- **Emoji**: used *sparingly* in the product (a celebratory ⚡/🎉 in chat or a footer), essentially never in marketing headlines. Icons do the heavy lifting, not emoji.
- **Tone in the portal is warm and encouraging** — empty/loading states say things like *"Keep Going!"* and surface motivational quotes. Errors stay plain and human ("Login failed.", "Failed to load profile").

---

## Visual foundations

The whole brand runs on one idea: **a sky-blue → cyan gradient, near-black ink, generous white space, and soft rounded surfaces.**

- **Color.** The hero is `#00a2ff` (primary sky blue). It pairs with cyan `#13d8fb` on the marketing site (`#00a3ff → #13d8fb` gradient pills) and with `cyan-500 #06b6d4 → blue-500 #3b82f6` across the LMS portal. Ink is `#121212`; muted text `#878787`; hairlines `#e4e4e7`; subtle surface `#f4f4f5`. Category accents appear in the portal: **violet** for coding, **amber/yellow** for quizzes, **blue** for assignments, **emerald** for "take quiz" success. The portal also ships a **full dark theme** (`bg #121212`, card `#1e1e1e`, sidebar `#111827`). See `tokens/colors.css`.
- **Type.** **Quicksand** carries all body & UI (rounded, friendly, 400–700). **Inter** (with **Poppins** as fallback) handles "professional" headings, 600–800. **Loubag** — a custom display face shipped as a TTF — is reserved for the oversized marketing hero line. **JetBrains Mono** stands in for the code editor. The website intentionally trims heading sizes by ~3px from Tailwind defaults. See `tokens/typography.css`.
- **Backgrounds.** Mostly **clean white**. Accents come from: soft **gradient washes** (`from-slate-50 via-blue-50 to-cyan-50` behind the dashboard), big **blurred color blobs** (`blur-3xl` cyan/blue circles drifting behind hero content), and **full-bleed gradient banners** (the portal welcome banner, the website trust band). No noise/grain textures; no hand-drawn illustration. Photography is the real imagery — warm, candid shots of students/events, often inside rounded cards with a subtle dark gradient scrim at the bottom.
- **Gradients** are a signature, always the **sky→cyan→indigo** family, diagonal (`135deg`) or horizontal. Used on: primary CTAs, the logo mark, active sidebar items, avatar fills, icon tiles, progress-ring strokes, and hero banners. Never purple-dominant; cyan/blue only.
- **Corner radii are soft and large.** Buttons/badges `6px` (or full pills for CTAs), cards `12–16px`, hero banners & login card `24–28px`, avatars & CTAs fully round. Almost nothing is sharp-cornered.
- **Cards** = white surface + `1px #e4e4e7` border + soft shadow (`shadow` → `shadow-xl`), rounded `12–16px`. A frequent flourish: a **4px gradient accent bar** down the left edge of dashboard panels, or a thin gradient strip across a card top. Glassy cards (`white/15 + backdrop-blur`) sit on gradient banners.
- **Shadows** are tailwind's soft elevation set. The portal adds a **cyan "glow"** (`0 0 30px rgba(6,182,212,.6)`) on brand surfaces and an animated logo shine on load.
- **Animation.** Calm and purposeful: `fadeIn` / `slideUp` entrances (0.6s ease-out), staggered `SlideUp` delays on dashboard panels, gentle 6s `float` loops on decorative blobs, and a **spring ease** `cubic-bezier(0.34,1.56,0.64,1)` for hover lifts. Progress rings animate their stroke over ~1s. Marketing hero headlines cross-fade on a timer.
- **Hover states.** Buttons **lift** (`translateY(-3px)`) with a deeper shadow (gradient CTA) or **darken** (solid primary → `#38a7f4`/`#0370af`); cards lift `-4px` + shadow + a blue border tint; nav/links shift to primary blue; the dark "Explore" button nudges right. Icons in links slide `+4px`.
- **Press states.** Solid buttons settle back down (`translateY(1px)`) and deepen color; gradient CTAs ease from `-3px` to `-1px`.
- **Borders & dividers.** Hairline `#e4e4e7` (light) / `#3a3a3a` (dark). Inputs are `1px` with a `2–3px` focus ring in primary blue (and a soft glow). The sign-out button is a notable `2px` red outline that fills red on hover.
- **Transparency & blur.** Used for sticky bars (`white/80 + backdrop-blur`), glass stat cards on gradient banners, and protection scrims on photos. Not overused — surfaces are mostly solid.
- **Layout.** Centered max-width (~1200px) marketing content; the portal is a fixed **260px sidebar** + sticky **64px topbar** + scrolling content. 4px spacing grid; section rhythm ~64px. Mobile collapses the sidebar behind a hamburger and stacks hero columns.

---

## Iconography

- **The marketing website uses [Lucide](https://lucide.dev)** (`lucide-react`) — thin, rounded-stroke line icons (`ArrowRight`, etc.). **The LMS portal uses [React Icons / Font Awesome](https://react-icons.github.io/react-icons/)** (`react-icons/fa` + a few `react-icons/md`) — solid, filled glyphs (`FaHome`, `FaChalkboardTeacher`, `FaChartBar`, `FaFlask`, `FaComments`, `FaCog`, `FaTrophy`, `FaFire`, `FaCode`, `FaRocket`…).
- **Guidance for recreations:** the portal kit ships a small **inline solid SVG icon set** (`ui_kits/portal/ui.jsx`, `Icon` component) that mirrors the Font-Awesome look; the website kit ships a **stroke/line set** mirroring Lucide (`ui_kits/website/ui.jsx`, `WIcon`). Reuse those, or pull the real packages from CDN — **Lucide for website work, Font Awesome solid for portal work**. Match stroke (line) vs fill (solid) to the surface you're building.
- Icons almost always sit in a **gradient rounded tile** (stat cards, panel headers, empty states) or inline within pills/links. Color is white-on-gradient, primary-blue, or the category accent.
- **Emoji as icons:** rare. A stray ⚡/🎉 appears in chat/footer copy; otherwise iconography is vector. **Do not** substitute emoji for real icons.
- **No custom icon font** is bundled; both products rely on the icon libraries above.
- Brand assets live in `assets/` (see index). The logomark is a **hexagonal "C"** built from chevrons in the sky→cyan gradient; the full lockup adds the `CYBERNAUT` wordmark with `ENDEAVOUR TO EXPLORE` beneath.

### ⚠️ Substitutions to confirm
- **Loubag** (hero display) ships as the real TTF from the website repo — authentic. ✅
- **JetBrains Mono** stands in for the code editor's font (the original uses Monaco's default). Swap if you have the exact face.
- Icon sets are **mirrored as inline SVG** in the kits rather than importing the heavy packages, so the look is *close* but not pixel-identical to every Lucide / FA glyph. For production, import the real `lucide-react` / `react-icons`.

---

## Index / manifest

**Root**
- `styles.css` — global entry point (the only file consumers link). `@import`s the four token files.
- `tokens/` — `fonts.css` (webfonts + `@font-face`), `colors.css`, `typography.css`, `spacing.css` (spacing, radii, shadows, motion).
- `assets/` — `logos/` (full lockup light/dark, hex mark, icon-512), `courses/` (Full Stack, Data Analytics, Tech Trio cards), `imagery/` (login-side photo, certificates), `fonts/Loubag-Regular.ttf`, `icons/profile.svg`.
- `SKILL.md` — Agent-Skills entry point for downloading this system into Claude Code.

**Components** (`components/<group>/`) — React primitives, bundled into `window.CybernautDesignSystem_*`.
- `actions/` — **Button** (primary · gradient · secondary · outline · ghost · link · danger), **Badge** (status & category tones).
- `forms/` — **Input** (label / icon / hint / error), **Checkbox** (gradient fill).
- `display/` — **Card** (+ Header/Title/Description/Body/Footer), **Avatar** (gradient + status), **StatCard** (dashboard metric).
- `portal/` — **ProgressRing** (gradient dial), **SidebarLink** (gradient active nav row).

**UI kits** (`ui_kits/<product>/`)
- `website/` — marketing **Home** (Navbar, rotating Hero, Courses, Why band, Footer).
- `portal/` — LMS **Student Portal**: Login → Dashboard, My Course, Batch Forum (interactive).

**Foundation cards** (`foundations/`) — specimen tiles shown in the Design System tab (Colors, Type, Spacing, Brand).

### Using the components
```jsx
// In an @dsCard HTML: link styles.css, load _ds_bundle.js, then:
const { Button, Card, StatCard, ProgressRing } = window.CybernautDesignSystem_59c3d8;
```
Each component has a `.prompt.md` next to it with a usage snippet and the full variant list.
