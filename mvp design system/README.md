# mvp

mvp builds a starter project with the framework, auth, database and styling you chose already connected, and hands it to you as a zip. It is open source (MIT), built by Ekpo-Emmanuel.

## Content fundamentals

- Plain and direct. Short sentences. The page talks to one person: "your framework", "your folder".
- Headlines are two beats: "Less setting up. More getting somewhere." Full stops, no exclamation marks.
- Say what happens, not what it is: "Unzip, add your keys, run locally."
- No jargon the visitor has to look up. Product names (Next.js, Clerk, Supabase) are used as they are written.
- Never claim more than the product does. No "AI-powered", no "seamless".

## Visual foundations

- **One page, one accent.** White page, green-black ink, and one lime, `accent`. Lime is a fill with dark text on it, used for what you act on or what is ready. It is never text on the page.
- **Dark means something you run.** Terminal and code panels use `term`. The page and cards never use it.
- **Three voices.** Fraunces (`display`) is the human voice: headlines and card titles. Geist (`sans`) explains: body, buttons, the wordmark. Geist Mono (`mono`) is reserved for literal things you would type or see in a terminal.
- **Depth from lightness.** Surfaces step from `bg` to `panel` to `sunk`. Hairlines come from `line` and `line-2`. Buttons use a gradient and an inner highlight and carry no outer shadow. Only the hero card floats (`shadow-float`).
- **Dark theme.** Same hue family, lightness inverted. Lime stays as is. Text that sits on lime stays `on-accent` in both themes. Tool logos sit on white tiles so black marks stay visible.
- **Motion runs on its own and never stops.** Demos loop automatically, with no pause button. Visitors who prefer reduced motion get the finished frame. The headline highlight sweeps in once.

## Iconography

One outline set: 24px viewBox, 2px round-capped strokes, `currentColor`. They replace text glyphs everywhere (arrows, check, copy, download, sun, moon). Tool logos are the real brand marks from Simple Icons in their own brand colours, never redrawn or recoloured.

## Rules that name tokens

- Primary action on a lime band or hero: `accent` fill with `on-accent` text.
- Primary neutral action: `action` fill with `on-action` text.
- Secondary action: `panel` fill with a `line-2` border.
- Page text is `ink`; supporting text `ink-2`; fine print `mute`.
- Corners: buttons `radius-md`, cards `radius-lg`, pills `radius-pill`.
- Section padding `space-24` on desktop and `space-16` on phones. The page gutter is `space-7`.

## Components

Button, IconButton, Tag, Highlight, Card, FaqRow, TerminalPanel. Each has a preview and guidelines in its folder.
