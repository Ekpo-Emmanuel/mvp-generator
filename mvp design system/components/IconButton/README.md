# IconButton

A 40px square button that holds one icon: GitHub, the theme switch. Used where a labelled button would be too loud, such as the header and the footer.

## Specs
- 40x40px (the tap target), `radius-md`, no border, no fill at rest. Icon 18px in `ink-2`.
- Hover: lime (`accent`) fill and `on-accent` icon.
- The theme switch shows a moon in light mode and a sun in dark mode, turning as it swaps. It lives in the footer.
- Always has an `aria-label`. Never use two in a row for the same action.
