# Design Tokens

The roadmap UI is themed via CSS variables defined in `src/styles/theme.css` and surfaced through Tailwind utilities. Use these semantic classes instead of raw color values.

## Core palette

| Token            | CSS variable      | Tailwind utility                     | Notes |
| ---------------- | ----------------- | ------------------------------------ | ----- |
| Background       | `--bg`            | `bg-bg`                              | Root surface color. |
| Elevated surface | `--bg-elev`       | `bg-bg-elev`                         | Light cards and rails. |
| Text (primary)   | `--fg`            | `text-fg`                            | Default foreground. |
| Text (muted)     | `--fg-muted`      | `text-fg-muted`                      | Supporting copy. |
| Primary          | `--primary`       | `bg-primary`, `text-primary`         | Telcoin blue for emphasis. |
| Primary hover    | `--primary-600`   | `hover:bg-primary-600`               | Darker hover/focus tone. |
| Accent           | `--accent`        | `text-accent`, `bg-accent`           | Violet accent for highlights. |
| Success          | `--success`       | `text-success`, `bg-success`         | Positive status. |
| Warning          | `--warning`       | `text-warning`, `bg-warning`         | Watch items. |
| Danger           | `--danger`        | `text-danger`, `bg-danger`           | Critical/blocked states. |
| Border           | `--border`        | `border-border`                      | Divider/border color. |
| Card             | `--card`          | `bg-card`                            | Card backgrounds. |

## Shadows & rings

- `shadow-glow` pulls from `--shadow` for soft elevation.
- Focus states should use `focus-visible:ring-2` (ring color resolves to `--ring`).

## Usage tips

- Prefer semantic text classes (`text-fg`, `text-fg-muted`) over slate/gray utilities.
- Combine `bg-card` with `border-border` and `shadow-glow` for elevated panels.
- When introducing new status badges, reuse the semantic palette (e.g. `bg-primary/15 text-primary`).
- The dark theme is handled by the same variables; avoid hard-coded dark overrides.
