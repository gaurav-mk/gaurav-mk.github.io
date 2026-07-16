# Courses — how this section works

The Courses page is data-driven. `index.html` and `course.html` both
read `courses.json` and render themselves — you never need to touch
either HTML file to add, edit, or remove a course.

## Adding a new course

1. Create a folder for it under `courses/`, using a URL-safe, kebab-case
   name, e.g. `courses/my-new-course/` — this name doubles as the course's
   slug, so keep it lowercase with hyphens instead of spaces.
2. Put your write-up in there as a `.md` file, e.g.
   `courses/my-new-course/my-new-course.md`.
3. Put any images used by that note in the same folder.
4. Add one object to `courses.json` (see schema below).

That's it — the course card appears on `/courses/` automatically, and
`/courses/course.html?slug=<folder>` renders the note.

## `courses.json` schema

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

## `status` values

| Value      | Badge shown        | Meaning |
|------------|---------------------|---------|
| `"current"`| `● In Progress`     | Actively working through it right now. |
| `"done"`   | `✓ Completed`       | Finished. |
| `"planned"`| `○ Planned`         | On the list, not started yet. |

Any other string will still render (badge just shows the raw text
uncolored) but isn't styled — stick to the three above.

## Writing the note (`.md` file)

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

## Example: a fully filled-out course

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

## Files involved (for reference, don't normally need to edit)

- `courses/courses.json` — the data source, edit this to add/change courses.
- `courses/index.html` — renders the grid from `courses.json`.
- `courses/course.html` — renders a single note from `courses.json` + its `.md` file.
- `assets/vendor/marked.min.js` — vendored Markdown renderer used by `course.html`.
