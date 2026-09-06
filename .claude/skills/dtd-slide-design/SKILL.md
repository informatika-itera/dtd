---
name: dtd-slide-design
description: Design and audit rules for the Dasar Teknologi Digital (DTD) reveal.js slide decks in /home/informatika/Teaching/2026/dtd. Use this skill whenever tidying, auditing, fixing, or generating any pertemuan-N deck — especially when checking slide flow/logic, adding or editing post-test questions, adding a referensi slide, handling images, or deciding where a change belongs (build-reveal.py vs source). Recalls the project's non-negotiable conventions so they are never forgotten between sessions.
---

# DTD Slide Design Rules

Applies to the DTD course decks (`pertemuan-1.html` … `pertemuan-15.html`, skipping 8)
served as reveal.js decks (`pertemuan-N.html`) at `http://127.0.0.1:8931/`.

## Hard invariants (never break)

1. **Legacy source in `archive/` MUST stay untouched.** Every design, content,
   and normalization change goes through `tools/build-reveal.py` or
   `assets/styles/reveal-deck.css`. The build reads `archive/pertemuan-N.html`
   (legacy fullscreen format) and regenerates the reveal.js deck at
   root-level `pertemuan-N.html`. If a transform belongs only to one deck, guard
   it with `if deck == "pertemuan-N.html":` — anchors like `SLIDE 2: Agenda`,
   `.visual-block`, and `SLIDE 14: Penutup` repeat verbatim across decks, and an
   unguarded `body.replace` will leak content into every deck that shares them.
2. **Never `git commit`** unless the user explicitly asks. This is stated
   repeatedly by the user; do not commit on your own judgment.
3. **reveal.js is vendored locally** (`assets/vendor/reveal`, offline-safe).
   Canvas is pinned to 1280×720; `minScale:0.2, maxScale:2.0, center:false,
   transition:'none', margin:0`, slideNumber `false` (footer already numbers).
4. **This skill lives ONLY at the project level** — `.claude/skills/dtd-slide-design/SKILL.md`
   (relative to the repo root). Do NOT install it to `~/.claude/skills/` or any
   other global directory; the user wants it local to the project only.

## Where a change belongs

- **Structure/style normalization that is global** (all decks): `reveal-deck.css`
  or the generic part of `build-reveal.py`.
- **Content fixes scoped to one deck** (missing arrow, wrong grid, removed quiz
  question, injected hook/referensi): `build-reveal.py`, guarded by
  `if deck == "pertemuan-N.html":`.
- **A change that is a genuine data error in the source** (e.g. a missing arrow
  in the original material) still gets fixed in `build-reveal.py`, NOT by editing
  the source — the source stays pristine even when it is "wrong".

## Slide flow (mandatory narrative sequence)

A well-formed deck follows this arc, verified deck-by-deck:

1. **Title** (slide 1)
2. **Hook / pemicu** (slide 2) — a compelling opener BETWEEN title and agenda.
   Pattern: `.stats-row` (3 `.stat-box` with big numbers + labels) then a
   `.bullet-list` of 3 concrete everyday examples, then a
   `p.body-text.text-source` credit line. Decks 1–3 have this; deck 4 was missing
   it and needed one injected. **Check every deck for the Hook; it is the most
   common omission.**
3. **Agenda** (`.list-items` with `.list-number` 1..N)
4. **Body** — logical, runut (sequential) for a student audience: introduce a
   concept, give an example, then the next concept. Use "bridge" slides between
   topic clusters where natural (deck 3 does this with explicit bridge slides).
5. **Diskusi / studi kasus** (optional, near the end)
6. **Post-test** — two slides: soal (questions) then jawaban (answers).
7. **Rangkuman** — `.rangkuman-list` with `.rnum` 1..N. Heading MUST be
   `<h2>Rangkuman Pertemuan N</h2>` — do NOT use the `.overline` ("Rangkuman")
   eyebrow + "Poin-Poin Penting Pertemuan N" pattern. Deck 1–3 are canonical;
   decks 4–15 diverge and must be normalized to match.
8. **Referensi** — a dedicated slide. MUST be present and MUST cite real,
   valid sources that actually appear in / support the deck's content. No
   invented references.
9. **Selanjutnya: Pertemuan N+1** — a preview slide for the NEXT meeting, placed
   BETWEEN Referensi and Penutup. Heading `<h2>Selanjutnya: Pertemuan N+1</h2>`,
   with 2–3 `.diagram-box` previews of the next deck's main topics. Decks 1–3
   all have this; decks 4–15 are missing it and need it injected.
10. **Penutup** — `Terima Kasih` + `.closing-subtitle` + a `.quote-block.text-left`
    (an attributed quote `<p>` + `<cite>`) + `.closing-meta` (preview of the
    next meeting). The quote-block is MANDATORY: every closing slide in deck 1–3
    ends with an attributed quote; decks 4–15 omit it and must be normalized.

When auditing flow, read the whole deck and check this arc explicitly, not just
visual overflow.

## Flow of discussion (runut narrative — every deck)

The material must **flow** for a student audience: each slide leads to the next,
with no sudden jumps between unrelated topic clusters. When auditing or tidying a
deck, read the full slide order and ask "can a student follow this from one slide
to the next?" Two failure modes are common and MUST be fixed:

1. **A sudden jump between topic clusters.** Example: deck 5 goes DIKW → Format →
   Big Data (the "data" cluster), then instantly "Mengapa Keamanan Siber Penting?"
   (the "security" cluster) with no transition. Deck 4 had the same gap between
   "Aplikasi Sehari-hari" (benefits) and "Etika" (responsibility). Fix: inject a
   **bridge slide** between the clusters — a `.slide-full` with a
   `.diagram-container` of 3 `.diagram-box`es (concept A → connection → concept B),
   e.g. `Data → Bernilai → Keamanan` or `Manfaat → Tanggung Jawab → Warga Digital`.
   Deck 3's explicit bridge slides ("Dari Jaringan ke Layanan",
   "Dari Layanan ke Dapur") are the canonical example.

2. **Out-of-order teaching (foundation after application).** Foundational /
   framing slides must come BEFORE the specifics that depend on them. Example:
   deck 4 taught "Hak & Kewajiban Digital" (normative foundation) AFTER five
   applied-ethics slides. Fix: reorder so foundation precedes application.

To fix either, the user permits **adding bridge slides** and **reordering slide
pages**. Do this in `build-reveal.py` (guarded `if deck == "pertemuan-N.html":`),
never in the legacy source:

- **Bridge injection** — insert a new `<section class="slide slide-full">` before
  the first slide of the second cluster, using that slide's `SLIDE n: …` comment
  as the literal anchor. Example:
  `body.replace('        <!-- ==================== SLIDE 6: Mengapa Cybersecurity ==================== -->', bridge5 + '        <!-- ==================== SLIDE 6: Mengapa Cybersecurity ==================== -->')`.
- **Reorder** — extract the slide to move with a `re.compile(..., re.S)` matching
  its whole `<section>…</section>` (comment included), `re.sub` it out of `body`,
  then re-insert the captured block at the new position using the target anchor's
  `SLIDE n: …` comment. `_renumber_slides()` runs late (step 8b) and rewrites all
  `data-slide` + footers in document order, so injected/moved slides need not have
  correct numbers.

Always re-check the full slide order after reordering and confirm the runut arc.

## Canonical ending structure (deck 1–3 are the reference)

Every deck must end with this exact 5-slide tail, in order:

```
… (post-test) …
Rangkuman   → <h2>Rangkuman Pertemuan N</h2>          (NO .overline)
Referensi   → <h2 class="text-left">Referensi</h2>
Selanjutnya → <h2>Selanjutnya: Pertemuan N+1</h2>     (preview topics)
Penutup     → Terima Kasih + subtitle + quote-block + meta
```

The three most common omissions (all present in decks 4–15, absent in 1–3):

1. **Missing "Selanjutnya" slide** — the preview of the next meeting between
   Referensi and Penutup. Check `grep -c "Selanjutnya: Pertemuan"`.
2. **Missing closing quote** — the `.quote-block.text-left` (attributed `<p>` +
   `<cite>`) on the Penutup slide. Check `grep -c "quote-block text-left"`.
3. **Inconsistent Rangkuman heading** — must be `Rangkuman Pertemuan N`, not
   `.overline` + "Poin-Poin Penting Pertemuan N".

When fixing a deck, normalize all three in `build-reveal.py` (scoped per deck),
mirroring deck 1–3 markup verbatim. The "Selanjutnya" preview content comes from
the NEXT deck's agenda/title; quote must be a real, attributable quote relevant
to the deck's theme.

## Recap decks (7 & 15) — special case

Decks 7 (review UTS) and 15 (review UAS) recap PRIOR meetings; they are NOT
lecture decks. They diverge from the canonical ending on purpose:

- **NO rangkuman slide.** A summary is redundant because the whole deck IS a
  recap. Do not add the `Rangkuman Pertemuan N` heading; drop the summary slide.
- **"Selanjutnya" points to an exam, not a lecture.** Deck 7 → `UTS (Pertemuan 8)`,
  deck 15 → `UAS (Pertemuan 16)`. Neither exam has its own slide deck — do NOT
  create `pertemuan-8.html` or `pertemuan-16.html`.
- **Closing keeps the quote-block** (all decks, including recap, end with an
  attributed quote).
- `closing-meta`: deck 7 → `Pertemuan 8: UTS`; deck 15 → `Pertemuan 16: UAS`
  (plus the existing UAS-coverage note).

### Recap-specific design rules (decks 7 & 15)

These are conventions the recap decks MUST follow, so deck 15 stays consistent
with deck 7:

1. **Hook has NO stats.** Lecture decks open their Hook with a `.stats-row`
   (3 big numbers). Recap decks do NOT — their Hook is bullet points only
   (`.bullet-list`), framing the review journey, no statistics.
2. **Rangkuman `h3` headings drop the meeting number.** The recap slides'
   `two-col` columns use `<h3>` for each prior meeting's title. Write the topic
   name only — `<h3>Pengenalan Teknologi Digital</h3>`, NOT
   `<h3>Pertemuan 1 — Pengenalan Teknologi Digital</h3>`. The meeting number
   already appears in the slide's own title and footer; repeating it inside
   every `h3` is noise.
3. **Kuis is a timer, not questions.** The recap deck's kuis slide MUST NOT list
   the actual quiz questions — the course lecturers / pengampu supply those
   themselves per session. Replace the question grid with an aesthetic
   countdown timer (max **50 menit**) using the `.quiz-timer` component (see
   `reveal-deck.css`): a circular SVG progress ring + `MM:SS` readout + a
   start/pause/reset control. Deck 7 uses element ids suffixed `7`; deck 15 uses
   `15` (unique ids per deck — they must never collide).

## closing-meta / "Selanjutnya" must track the ACTUAL next deck

The `closing-meta` and "Selanjutnya" slide must reference the deck that actually
follows in the current curriculum. When the curriculum changed, the source's
`closing-meta` text can be stale (e.g. deck 4 says "Keamanan Siber" but the real
next deck is "Data & Informasi di Era Digital"). When adding/updating these,
resync `closing-meta` to the real next deck's title — do not propagate the stale
topic. Actual next-deck chain: 4→5 Data & Informasi, 5→6 Inovasi/AI,
6→7 Review UTS, 7→8 UTS (exam), 9→10 Pengolah Kata 2, 10→11 Pengolah Angka 1,
11→12 Pengolah Angka 2, 12→13 Pengolah Angka 3, 13→14 Aplikasi AI,
14→15 Review UAS, 15→16 UAS (exam).

## Post-test rules

- **Exactly 4 questions**, each mapped 1:1 to the deck's core agenda items.
- **No question outside the material's context.** Remove or rework questions
  that test content not taught in that deck, and drop redundant questions that
  duplicate another question's theme.
- The 4 questions appear on the **soal** slide AND the **jawaban** slide
  (answers marked with `.q-opt.correct` + a ✓).
- When removing a question in `build-reveal.py`, do NOT use a fuzzy non-greedy
  regex to strip the `<div class="quiz-q">` block — it leaves an orphan `</div>`
  that unbalances the document and pushes subsequent slides out of `.slides`
  (they render at height 0 in print-pdf). Use an **exact literal string**
  replacement covering the whole `quiz-q` block including its closing `</div>`.

## Praktikum decks (9–14) — in-class exercise

Praktikum decks (9–14: word processor, spreadsheet, AI tools) teach hands-on
software skills. They add two rules on top of the canonical ending:

1. **Every praktikum deck MUST have a "Tugas Praktikum" slide** — a concrete
   in-class exercise the student completes during the session. Place it right
   BEFORE the Post-Test (after the last body slide), and add it to the Agenda
   as the final item. Structure (see pertemuan-9):
   - `<h2>Tugas Praktikum: <nama></h2>` with a `.highlight-box` header stating
     the duration (e.g. `Tugas (±30 menit)`).
   - A `.task-grid` (see `reveal-deck.css`) of numbered, step-by-step
     instructions: two `.task-col-head` headers ("Langkah 1–4" / "Langkah 5–8")
     followed by interleaved `.list-item` steps — left column holds steps
     1–4, right column steps 5–8, so each grid row pairs one left step with
     one right step on the same horizontal line. Each step is one concrete
     action with the exact menu path (`File → Page setup`, `Insert → Table of
     contents`) and any expected input/name.
   - A closing `.highlight-box` titled `Kriteria Pengumpulan` listing what the
     student must submit (e.g. shareable link, specific elements present).
     Keep `.task-grid + .highlight-box` spacing (already in `reveal-deck.css`);
     do NOT add `flex: 1; min-height: 0` to `.task-grid` — it must auto-size to
     content or steps overflow the box.
   - Instructions must be unambiguous enough that a student can complete the
     task without further explanation.
2. **Shortcuts must be valid for the tool actually taught.** Praktikum decks
   migrate between tools (e.g. pertemuan-9/10 teach **Google Docs**, not
   Microsoft Word). Never copy Word/Excel shortcut tables verbatim into a
   Google Docs/Sheets deck. Verify each shortcut against the current official
   docs (support.google.com/docs, support.microsoft.com). Known differences:
   - **Redo**: `Ctrl + Y` (Word/Excel) vs **`Ctrl + Shift + Z`** (Google Docs).
   - **Save**: `Ctrl + S` auto-saves in Google Docs (no manual save needed).
   - **Find & replace**: `Ctrl + H` both; **`Ctrl + G`** = Go To (Word) vs
     **Find Next** (Google Docs).
   - When a table column would be empty (e.g. "Shortcut" with no value), drop
     the column — never render a `—` placeholder row.

## Image rules

- **Images on slides must NOT be rounded-corner.** The wrapper `.visual-block`
  applies `border-radius` (rounded). The flat style is: `<img>` placed directly
  inside `.content-right` with no wrapper (matches deck 1 and 2). To fix a deck
  that uses `.visual-block`, unwrap it in `build-reveal.py` (guarded per deck).
- Header logos (`.header-logos img` on the title slide) are exempt — those are
  logos, not content images.

## Referensi rules

- Every deck needs a Referensi slide before Penutup, mirroring the deck 1/2/3
  format: `.slide.slide-full` with `<h2 class="text-left">Referensi</h2>` and a
  `.reference-list` of numbered `<p>` entries.
- Sources must be real and topically matched to the deck's content (e.g. for
  e-commerce/e-government/telemedicine material, cite Laudon & Traver, Heeks,
  WHO — not a generic textbook). Cite the actual figures/stats used in the Hook
  and body (e.g. DataReportal, APJII).

## Build + verify loop

1. `python3 tools/build-reveal.py` — regenerates `slides-reveal.css` and every
   root-level `pertemuan-N.html` (from `archive/pertemuan-N.html`). Watch the
   printed slide counts: a change scoped to one deck must not alter any other
   deck's count. If counts shifted elsewhere, a transform leaked and needs a
   `if deck == ...` guard.
2. Structural checks: `grep -c q-text` (expect 8 = 4 questions × 2 slides),
   `grep -c visual-block` (expect 0 for a fixed deck), slide count, and
   `grep -oP 'data-slide="\d+"'` (must be 1..N in document order).
3. Browser audit (cache disabled): navigate each `#/n`, assert zero vertical
   overflow (children's bottom ≤ section's inner bottom), images `border-radius
   == 0px`, quiz `quiz-q == 4`.
4. Print-pdf audit: load `?print-pdf`, assert `section.slide` count ==
   `.pdf-page` count, zero height-0 slides, max section height 720px. A height-0
   slide means the HTML is tag-unbalanced (usually an orphan `</div>`).
