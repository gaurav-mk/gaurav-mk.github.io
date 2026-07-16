# gaurav-mk.github.io

This is a website which tells about me.

The site has three data-driven sections — `courses/`, `community/`, and
`projects/` — each with an `index.html` that reads a JSON file and renders
itself. You never need to touch the HTML to add, edit, remove, or reorder
an entry in any of them; just edit the matching `.json` file.

---

## Courses — `/courses/`

`index.html` and `course.html` both read `courses.json` and render
themselves.

### Adding a new course

1. Create a folder for it under `courses/`, using a URL-safe, kebab-case
   name, e.g. `courses/my-new-course/` — this name doubles as the course's
   slug, so keep it lowercase with hyphens instead of spaces.
2. Put your write-up in there as a `.md` file, e.g.
   `courses/my-new-course/my-new-course.md`.
3. Put any images used by that note in the same folder.
4. Add one object to `courses.json` (see schema below).

That's it — the course card appears on `/courses/` automatically, and
`/courses/course.html?slug=<folder>` renders the note.

### `courses.json` schema

Each course is one object in the top-level array:

```json
{
  "title": "CST Studio Masterclass",
  "cover": "8b10bencoding.webp",
  "tags": ["CST Studio", "EM Simulation", "Antenna", "RF"],
  "status": "current",
  "folder": "cst-studio-masterclass",
  "notesFile": "cst-studio-masterclass.md",
  "visible": true
}
```

| Field       | Type              | Required | Notes |
|-------------|-------------------|----------|-------|
| `title`     | string            | yes      | Shown on the card and as the note's `<h1>`. |
| `cover`     | string or `null`  | yes      | Filename of an image **inside `folder`** to use as the card's cover photo (e.g. a diagram or screenshot from the course). Resolved as `folder/cover`, same rule as Obsidian image embeds below. Use `null` if you don't have one yet — shows a "NO COVER" placeholder instead. |
| `tags`      | array of string   | yes      | Rendered as small pill labels. Empty array `[]` is fine if you don't have any yet. |
| `status`    | string            | yes      | One of `current`, `done`, `planned` — see table below. Controls the badge color/label. |
| `folder`    | string            | yes      | Folder name under `courses/` where the note + its images live — **and** the course's URL slug (used in `course.html?slug=...`), so it does double duty. Must match the real folder exactly, and must be unique across courses. Keep it kebab-case (lowercase, hyphens, no spaces) since it ends up in a URL. |
| `notesFile` | string or `null`  | yes      | Filename of the `.md` note inside `folder`. Use `null` if you haven't written the note yet — the course still shows on the grid, just with "Notes coming soon" instead of a link. |
| `visible`   | boolean           | yes      | Whether the course card shows up on `/courses/` at all. Set to `false` to keep a course in `courses.json` as a draft/placeholder without it appearing on the site yet — flip to `true` when it's ready. Doesn't block direct access to `course.html?slug=...` if someone already has the link. |

### `status` values

| Value      | Badge shown        | Meaning |
|------------|---------------------|---------|
| `"current"`| `● In Progress`     | Actively working through it right now. |
| `"done"`   | `✓ Completed`       | Finished. |
| `"planned"`| `○ Planned`         | On the list, not started yet. |

Any other string will still render (badge just shows the raw text
uncolored) but isn't styled — stick to the three above.

### Writing the note (`.md` file)

Notes are plain Markdown, rendered client-side with `marked.js`. Standard
Markdown all works: `#`/`##` headings, `**bold**`, `` `code` ``, fenced
code blocks, `> blockquotes`, `-`/`1.` lists, `---` rules, `[links](url)`.

Two bits of **Obsidian-style syntax are also supported**, so you can
paste notes straight out of Obsidian without rewriting them:

- **Image embed:** `![[image.png]]` → looks for `image.png` in the same
  `folder` as the note and embeds it. Alias form also works:
  `![[image.png|caption text]]`.
- **Wikilink:** `[[Some Concept]]` → rendered as a styled span (dashed
  underline) so it doesn't show up as raw `[[...]]` text. It does **not**
  currently link to another note automatically — there's no cross-note
  routing yet, it's just cosmetic. If you want real note-to-note linking
  later, that'd need a small addition matching `[[Title]]` against
  `courses.json` titles/slugs.

Do **not** use `![[image.png]]` for images stored anywhere other than
the course's own `folder` — the path is resolved relative to `folder`,
not the repo root.

### Example: a fully filled-out course

```json
{
  "title": "Digital IC Design Fundamentals",
  "cover": "some-diagram.png",
  "tags": ["VLSI", "RTL", "Verilog"],
  "status": "done",
  "folder": "digital-ic-design",
  "notesFile": "digital-ic-design.md",
  "visible": true
}
```

with the file at:

```
courses/digital-ic-design/digital-ic-design.md
courses/digital-ic-design/some-diagram.png
```

and inside the `.md`:

```markdown
# Digital IC Design Fundamentals

Notes on RTL design and standard-cell flows.

![[some-diagram.png]]

See also [[Static Timing Analysis]].
```

### Files involved (for reference, don't normally need to edit)

- `courses/courses.json` — the data source, edit this to add/change courses.
- `courses/index.html` — renders the grid from `courses.json`.
- `courses/course.html` — renders a single note from `courses.json` + its `.md` file.
- `assets/vendor/marked.min.js` — vendored Markdown renderer used by `course.html`.

---

## Community — `/community/`

`index.html` reads `community.json` and renders itself.

### Adding a new entry

1. Add the image(s) for it into the `community/` folder.
2. Add one object to `community.json` (see schema below).

That's it — it appears on `/community/` automatically, in the order it
appears in the JSON array.

### `community.json` schema

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
| `cover`        | string or array of string| yes      | Image filename(s) in the `community/` folder. A single string renders one photo; an array of 2+ filenames renders a 3-column photo grid (see "Robotics Club, Secretary" for an example). Filenames with spaces are fine — they get URL-encoded automatically. |
| `tags`         | array of string          | yes      | Rendered as the "kicker" line above the title, joined with ` · ` (e.g. `["BEST Erlangen e.V.", "Full Member", "2025 to 2026"]` → `BEST Erlangen e.V. · Full Member · 2025 to 2026`). A single tag renders with no separator. |
| `mediaPosition`| `"left"` or `"right"`   | yes      | Which side of the row the photo sits on (text always on the other side). Alternate or repeat as you like — the original 9 entries don't follow a strict left/right pattern, it's a per-entry visual choice. |
| `visible`      | boolean                  | yes      | Set to `false` to keep an entry in the JSON as a draft without showing it on the site yet. |

### Files involved (for reference, don't normally need to edit)

- `community/community.json` — the data source, edit this to add/change entries.
- `community/community.js` — renders the list from `community.json`.
- `community/index.html` — just the page shell + `<div id="vol-list">` the script fills in.
- `assets/css/community.css` — the `.vol-*` styling (shared design system, see `assets/css/base.css`).

---

## Projects — `/projects/`

`index.html` reads `projects.json` and renders the card grid.

Note this only covers the **listing page** (`/projects/`). Each project's
own write-up page (`/projects/<folder>/index.html`) is a separate, full
article template — see the comments in `assets/css/project-detail.css` for
that side of things.

### Adding a new project to the listing

1. Make sure the project's own page already exists at
   `projects/<folder>/index.html` (this file doesn't create that page,
   just the card that links to it).
2. Add one key to `projects.json` (see schema below), keyed by the
   project's folder name.

That's it — the card appears on `/projects/` automatically, in the order
its key appears in the JSON object.

### `projects.json` schema

`projects.json` is a single object keyed by `folder` — the folder name
itself is the unique key, so it's never repeated inside the value:

```json
{
  "ble-mioty": {
    "title": "Joint Bluetooth and MIOTY Localisation Module",
    "description": "Low-power localization tag combining BLE short-range tracking and mioty long-range fallback in a single 2.4 GHz transceiver. Custom circular PCB, 9-axis IMU, coin-cell powered.",
    "cover": "PCB_3D_Blue.webp",
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

### `catColor` values

| Value      | Badge color |
|------------|--------------|
| `"green"`  | accent green (matches the site accent) |
| `"yellow"` | yellow |
| `"orange"` | gold/amber |

Any other value falls back to a faint gray — stick to the three above
unless you also update the `CAT_COLOR` lookup in `projects.js`.

### Files involved (for reference, don't normally need to edit)

- `projects/projects.json` — the data source, edit this to add/change listing cards.
- `projects/projects.js` — renders the cards from `projects.json` and wires up the filter chips.
- `projects/index.html` — just the page shell + `<div id="proj-cards">` the script fills in.
- `assets/css/projects.css` — the `.proj-card` styling (shared design system, see `assets/css/base.css`).
