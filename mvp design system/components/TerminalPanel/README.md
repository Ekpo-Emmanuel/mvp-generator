# TerminalPanel

The dark panel used for anything you run: the generated file list, the install steps, the zip contents. It always uses `term` so "dark = a thing you run" holds across the page.

## Specs
- `term` background, Geist Mono at the `code` size, `radius-lg` corners. Text `#E8EBDA`, dim text `#9EA38F`, lines `#292C20`.
- Folder names and "ready" use `accent`.
- Tool logos in file rows sit on 16px white tiles with 4px corners, next to the tool name.
- Header row 38px, status row 40px. The status line cycles: Generating, wired together, a typed `npm run dev`, then ready on localhost.
- Stays dark in both themes (a little deeper in dark mode).
