# Projects — how this section works

Like `courses/` and `community/`, this page is data-driven. `index.html`
reads `projects.json` and renders the card grid — you never need to touch
the HTML to add, edit, remove, or reorder a project on the listing page.

Note this only covers the **listing page** (`/projects/`). Each project's
own write-up page (`/projects/<folder>/index.html`) is a separate, full
article template — see the comments in `assets/css/project-detail.css` for
that side of things.

## Adding a new project to the listing

1. Make sure the project's own page already exists at
   `projects/<folder>/index.html` (this file doesn't create that page,
   just the card that links to it).
2. Add one object to `projects.json` (see schema below).

That's it — the card appears on `/projects/` automatically, in the order
it appears in the JSON array, numbered `P-01`, `P-02`, ... by position.

## `projects.json` schema

Each project is one object in the top-level array:

```json
{
  "folder": "ble-mioty",
  "title": "Joint Bluetooth and MIOTY Localisation Module",
  "kicker": "BLE + MIOTY · 2.4 GHZ · COIN-CELL POWERED",
  "description": "Low-power localization tag combining BLE short-range tracking and mioty long-range fallback in a single 2.4 GHz transceiver. Custom circular PCB, 9-axis IMU, coin-cell powered.",
  "cover": "PCB_3D_Blue.png",
  "tags": ["BLE", "MIOTY", "Ki-CAD"],
  "status": "current",
  "category": "ONGOING",
  "cta": "View project →",
  "visible": true
}
```

| Field         | Type              | Required | Notes |
|---------------|-------------------|----------|-------|
| `folder`      | string            | yes      | The real folder name under `projects/` (e.g. `ble-mioty`, `JESD204C_Clock_Tree_Thesis`) — used to build both the card's link (`/projects/<folder>/`) and the cover image path. Must match the actual folder exactly, including case/underscores. |
| `title`       | string            | yes      | The card's heading. |
| `kicker`      | string            | yes      | Small uppercase caption above the title (e.g. `PLL · LMX1205 · HMC7043 · FAU`). |
| `description` | string            | yes      | The one-paragraph summary shown on the card. |
| `cover`       | string or `null`  | yes      | Filename of an image **inside `folder`** to use as the card's photo. Resolved as `/projects/<folder>/<cover>`. Use `null` to show the "BOARD PHOTO / RENDER" placeholder instead (for projects without a good listing-page photo yet). |
| `tags`        | array of string   | yes      | Pills shown at the bottom of the card body. |
| `status`      | string            | yes      | One of `current`, `ieee`, `published` — see table below. Controls the small badge's icon, color, and text. |
| `category`    | string            | yes      | One of `ONGOING`, `ACADEMIC`, `PUBLISHED` (or add your own) — drives the filter chips at the top of the page **and** the small label under the status badge. Independent from `status` — e.g. the thesis is `status: current` (still in progress) but `category: ACADEMIC` (it's academic work, not a personal build). |
| `cta`         | string            | yes      | The button text at the bottom-right of the card, e.g. `"View project →"` or `"View thesis →"`. |
| `visible`     | boolean           | yes      | Set to `false` to keep a project in the JSON as a draft without it appearing on `/projects/` yet. |

## `status` values

| Value         | Badge shown   | Color              |
|---------------|---------------|---------------------|
| `"current"`   | `● ONGOING`   | accent green |
| `"ieee"`      | `✓ IEEE`      | gold |
| `"published"` | `✓ PUBLISHED` | gold |

Any other string still renders (as plain text, faint color) but isn't a
recognized status — stick to the three above unless you also update the
`STATUS` lookup in `projects.js`.

## Files involved (for reference, don't normally need to edit)

- `projects/projects.json` — the data source, edit this to add/change listing cards.
- `projects/projects.js` — renders the cards from `projects.json` and wires up the filter chips.
- `projects/index.html` — just the page shell + `<div id="proj-cards">` the script fills in.
- `assets/css/projects.css` — the `.proj-card` styling (shared design system, see `assets/css/base.css`).
