# Instructions for AI Assistants

Read this before working in this repo. It holds the owner's preferences and where the work currently stands.

Keep it up to date: when a preference changes, or a video's notes are finished, update this file in the same session.

## About This Repo
- Personal portfolio site on GitHub Pages, built with Jekyll. The repo is also an Obsidian vault.
- Course notes live in `courses/<folder>/`.
- `courses/courses.json` lists each course. Its `notesFile` field names the course's main note.
- `courses/course.js` fetches the raw `.md`, converts Obsidian links, and renders it with `marked.js`.
- The sidebar on a note page is built from `##` headings only.

## Making Notes From Transcripts
The owner pastes one video transcript at a time, and you turn it into notes.

- Write **general concept notes**, short and crisp. Explain what each thing is and why it matters.
- **Never write a step-by-step of what the instructor clicks**, such as "Choose Time Domain". Turn each step into the concept behind it.
- Add background beyond the transcript when a concept needs it.
- Make the notes **pictorial**: add a diagram wherever it explains a concept better than text.
- Use Obsidian callouts for key ideas, so the notes look good as well as read well.
- **Emphasise the most important points** with bold.
- Keep **one note per course section**, named `1. Title.md`, `2. Title.md` and so on. Add each video to that section's note in lecture order. The main note is only an index that links to them.
- Add any new keyboard shortcut to `Shortcuts.md`, not to the section notes.
- Leave out filler and anything the notes already cover.
- If a video covers a topic already in the notes, merge it into that section and keep the existing facts. Otherwise leave existing notes alone.
- If the instructor says something inaccurate, write the correct version and mention it in your reply.
- Transcripts are auto-captions, so fix garbled terms, such as "CCie" for CST or "S111" for S11.
- List those fixes in your reply so the owner can check them.

## Getting Transcripts
- The owner may paste a transcript, or ask you to read it from Udemy.
- Udemy blocks plain web fetches, so reading it needs a browser tool connected to the owner's logged-in Chrome.
- Open the lecture's Transcript panel and read the page text. Don't try to reuse the owner's login any other way.
- Check the video frames too. A screenshot of the player shows the slides, the CST model and the result plots. Use it to read exact marker values and to compare the model with the slide, because a transcript misses both.

## Formatting
- Use `###` and `####` subheadings with plain bullets.
- Use American spelling, matching the owner's notes.
- Obsidian's Number Headings plugin numbers headings in each note (`## 0.1`, `### 0.1.1`), restarting in every file. Continue that numbering.
- Don't use `-` or `_` in note file names, because the site turns them into spaces in the title.
- Write menu paths as `Home -> Setup Solver -> Specials`.
- Put diagrams **inline as `<svg>` in the `.md` file**, one per section. Never use separate `.svg` files or `![[x.svg]]` embeds.
- Give each SVG its own dark background panel, because Obsidian uses a light theme and the site is dark. The CST notes use Catppuccin Frappé colours, such as `#232634` for the panel.
- Keep blank lines out of an `<svg>` block, because a blank line ends the HTML block in Markdown.
- Give every SVG `id` a unique name, because all the diagrams on a page share one set of ids.
- `![[image.png]]` resolves inside the course folder, so images must be stored there to show on the site.

## Obsidian Features
Notes must look right in both Obsidian and the site, so only use features that work in both.

- **Callouts:** `> [!abstract] Title`, plus `info`, `tip`, `warning`, `example` and `note`. `renderCallouts()` in `courses/course.js` draws them on the site.
- **Foldable callouts:** `> [!note]- Title` starts closed, and `> [!note]+ Title` starts open.
- **Card grids:** `> [!grid]` with nested callouts, from the `vault-polish` snippet. The CST main note uses one.
- **Avoid:** Mermaid, LaTeX `$...$`, Dataview queries and YAML frontmatter. The site doesn't process them, so they appear as raw text.
- **Links in tables:** don't put `[[note|alias]]` links in a table. Obsidian needs the `|` escaped there, and the escaped form breaks on the site, so put the link in a line above the table.
- Match a note's existing line endings. Obsidian saves with LF, so don't assume CRLF.

## Current Progress
**CST Antenna Design FSS & RFID Simulation Masterclass** (Udemy), in `courses/cst-studio-masterclass/`

- Index: `CST Antenna Design FSS & RFID Simulation Masterclass.md`
- Section notes: `1. Getting Started and Antenna Fundamentals.md`, `2. Antenna Shape Design.md`, `3. Patch Antenna Design.md`, `4. Equation Based Antenna Design.md`, `5. Bandstop FSS Design.md`, `6. Bandpass FSS Design.md`, `7. Wideband FSS Design.md`, `8. Chipless RFID Fundamentals.md`, `9. Chipless RFID Unit Cell Design.md`, `10. Dual Polarized RFID Tag.md`, `11. Patch Antenna Fundamentals.md`, `12. Patch Antenna Without Insets.md`, `13. Coaxial Fed Patch Antenna.md`, `14. Circular Patch Antenna.md`, `15. Monopole Antenna.md`, `16. Wideband Monopole Antenna.md`, `17. UWB Monopole Antenna.md`, `18. Rectangular Wideband Monopole Antenna.md`, `19. Dipole Antenna.md`, `20. Microstrip Fed Folded Dipole Antenna.md`, `21. Dual Band Dipole Antenna.md`, `22. Semi Elliptical Wideband Folded Dipole.md`, `23. Yagi Uda Antenna.md`, `24. Printed Quasi Yagi Antenna.md`, `25. Printed Yagi Antenna.md`, `26. Wideband Quasi Yagi Antenna.md`, `27. Rectangular Loop Antenna.md`, `28. Circular Loop Antenna.md`, `29. Multiple Ring Loop Antenna.md`, `30. Rectangular Wire Loop Antenna.md`, `31. Compact Planar Loop Dipole Antenna.md`, `32. Dual Fed Circularly Polarized Loop Antenna.md`, `33. Printed Loop Antenna with LCD Frame.md`, `34. Dual Band Dipole Antenna for WLAN.md`, `35. Semi Elliptical Wideband Antenna.md`
- Shortcuts: `Shortcuts.md`
- Done: all 35 course sections, which is videos 1 to 138. Sections 13, 34 and 35 repeat Sections 12, 21 and 22, so their notes are short.
- Next: nothing is pending. Video frames were checked from Section 20 onward. Sections 4 to 19 were checked from transcripts only, so frame checks there are an offered follow-up.
- Workflow the owner asked for: read every transcript in a section, write that section's note, then move to the next section. Quality comes first, so recalculate the instructor's numbers and check the conclusions.
- If a later video looks like a repeat, compare exact video lengths and the result plots before writing notes.

**Basic Embedded Systems Design** (Altium Education and Renesas, training.altium.com), in `courses/Embedded Systems Design by Altium-Renesas/`

- Index: `Basic Embedded Systems Design.md`
- Module notes: `1. Introduction to Embedded Systems.md`, `2. Microprocessors and Microcontrollers Part 1.md`, `3. Microprocessors and Microcontrollers Part 2.md`, `4. Introduction to Communication Protocols.md`
- The course has 6 modules. Each lesson is an Articulate Storyline SCORM package, not a video. Read its slide text and caption files through the owner's logged-in Chrome; the method is in Claude's memory. Skip the quizzes, surveys and Module Review Checklists, which are feedback forms the owner fills in.
- `Microprocessors and Microcontrllers.md` and `Case Study.md` are the owner's earlier pasted screenshots. Their images sit in the repo root, so they don't show on the site.
- A lesson can span several pages (`?page=N`), each its own package. Lesson 2.1 has 3 pages, lesson 2.2 has 4, lesson 3.1 has 4 and the Module 4 lesson has 5.
- Modules unlock one at a time for the owner. A locked lesson page stays on "validating your access". The Module 5 lesson is at `introduction-to-development-tools-hardware-and-software/introduction-to-development-tools-hardware-and-software`.
- Done: Modules 1 to 4. Next: Modules 5 (Development Tools) and 6 (Product Design to PCB Layout), both still locked on 2026-11-08.
- Image-only slides that weren't captured: the Module 2 RA family, the power distribution module reference design and the barcode scanner block diagram; the Module 3 SAR example image, the BMS case study and the "Timers in Concert" thermostat.
