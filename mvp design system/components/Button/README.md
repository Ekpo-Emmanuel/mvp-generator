# Button

The three actions on the page: lime for the main action, near-black for a neutral primary, outline for secondary. Same size and shape for all three, so they can sit side by side.

## Variants
- **accent**: lime fill, `on-accent` text. The one action you want taken (Build your starter).
- **action**: `action` fill, `on-action` text. Neutral primary; inverts to a light button in dark mode. On a lime band it stays black.
- **line**: `panel` fill, `line-2` border. Secondary (Take a look inside).

## Specs
- Height 42px (36px small, 48px on the closing band), padding 0 18px, `radius-md`, `ui` text.
- Depth: a vertical gradient, a 1px inner top highlight and a darker rim. No outer shadow.
- Hover: rises 1px; one soft sheen sweeps across once. Press: drops 1px with an inner shadow.
- Trailing icon: right arrow moves 3px on hover; down arrow moves 2px.
- On phones the hero buttons stack and go full width.
