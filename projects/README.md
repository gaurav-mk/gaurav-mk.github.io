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
2. Add one key to `projects.json` (see schema below), keyed by the
   project's folder name.

That's it — the card appears on `/projects/` automatically, in the order
its key appears in the JSON object.

## `projects.json` schema

`projects.json` is a single object keyed by `folder` — the folder name
itself is the unique key, so it's never repeated inside the value:

```json
{
  "ble-mioty": {
    "title": "Joint Bluetooth and MIOTY Localisation Module",
    "description": "Low-power localization tag combining BLE short-range tracking and mioty long-range fallback in a single 2.4 GHz transceiver. Custom circular PCB, 9-axis IMU, coin-cell powered.",
    "cover": "PCB_3D_Blue.png",
    "tags": ["BLE", "MIOTY", "Ki-CAD"],
    "category": "ONGOING",
    "catColor": "green",
    "visible": true
  }
}
```

| Field         | Type              | Required | Notes |
|---------------|-------------------|----------|-------|
| *(key)*       | string            | yes      | The real folder name under `projects/` (e.g. `ble-mioty`, `JESD204C_Clock_Tree_Thesis`) — used as the object key, and to build both the card's link (`/projects/<folder>/`) and the cover image path. Must match the actual folder exactly, including case/underscores. |
| `title`       | string            | yes      | The card's heading. |
| `description` | string            | yes      | The one-paragraph summary shown on the card. |
| `cover`       | string or `null`  | yes      | Filename of an image **inside `folder`** to use as the card's photo. Resolved as `/projects/<folder>/<cover>`. Use `null` to show the "BOARD PHOTO / RENDER" placeholder instead (for projects without a good listing-page photo yet). |
| `tags`        | array of string   | yes      | Pills shown at the bottom of the card body. |
| `category`    | string            | yes      | e.g. `ONGOING`, `ACADEMIC`, `PUBLISHED` — drives both the filter chips at the top of the page and the badge text shown on the card. Add a new value here any time (also add a matching filter chip button in `index.html` if you want it filterable). |
| `catColor`    | string            | yes      | One of `green`, `yellow`, `orange` — the color of the category badge (`● CATEGORY`) on the card. See table below. |
| `visible`     | boolean           | yes      | Set to `false` to keep a project in the JSON as a draft without it appearing on `/projects/` yet. |

Every card's button always reads **"View project →"** and links to `/projects/<folder>/`.

## `catColor` values

| Value      | Badge color |
|------------|--------------|
| `"green"`  | accent green (matches the site accent) |
| `"yellow"` | yellow |
| `"orange"` | gold/amber |

Any other value falls back to a faint gray — stick to the three above
unless you also update the `CAT_COLOR` lookup in `projects.js`.

## Files involved (for reference, don't normally need to edit)

- `projects/projects.json` — the data source, edit this to add/change listing cards.
- `projects/projects.js` — renders the cards from `projects.json` and wires up the filter chips.
- `projects/index.html` — just the page shell + `<div id="proj-cards">` the script fills in.
- `assets/css/projects.css` — the `.proj-card` styling (shared design system, see `assets/css/base.css`).
