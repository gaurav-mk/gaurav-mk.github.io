# Community — how this section works

Like `courses/`, this page is data-driven. `index.html` reads `community.json`
and renders itself — you never need to touch the HTML to add, edit, remove,
or reorder an entry.

## Adding a new entry

1. Add the image(s) for it into this `community/` folder.
2. Add one object to `community.json` (see schema below).

That's it — it appears on `/community/` automatically, in the order it
appears in the JSON array.

## `community.json` schema

Each entry is one object in the top-level array:

```json
{
  "title": "Funds Responsible (Core Team), Spring Regional Meeting (sRM) 2026",
  "description": "First paragraph.</br>Second paragraph.",
  "cover": "best.webp",
  "tags": ["BEST Erlangen e.V.", "Full Member", "2025 to 2026"],
  "mediaPosition": "left",
  "visible": true
}
```

| Field          | Type                     | Required | Notes |
|----------------|--------------------------|----------|-------|
| `title`        | string                   | yes      | The entry's heading. |
| `description`  | string                   | yes      | The write-up. Split into paragraphs on the literal marker `</br>` — put that between paragraphs, not HTML tags around them. |
| `cover`        | string or array of string| yes      | Image filename(s) in this folder. A single string renders one photo; an array of 2+ filenames renders a 3-column photo grid (see "Robotics Club, Secretary" for an example). Filenames with spaces are fine — they get URL-encoded automatically. |
| `tags`         | array of string          | yes      | Rendered as the "kicker" line above the title, joined with ` · ` (e.g. `["BEST Erlangen e.V.", "Full Member", "2025 to 2026"]` → `BEST Erlangen e.V. · Full Member · 2025 to 2026`). A single tag renders with no separator. |
| `mediaPosition`| `"left"` or `"right"`   | yes      | Which side of the row the photo sits on (text always on the other side). Alternate or repeat as you like — the original 9 entries don't follow a strict left/right pattern, it's a per-entry visual choice. |
| `visible`      | boolean                  | yes      | Set to `false` to keep an entry in the JSON as a draft without showing it on the site yet. |

## Files involved (for reference, don't normally need to edit)

- `community/community.json` — the data source, edit this to add/change entries.
- `community/community.js` — renders the list from `community.json`.
- `community/index.html` — just the page shell + `<div id="vol-list">` the script fills in.
- `assets/css/community.css` — the `.vol-*` styling (shared design system, see `assets/css/base.css`).
