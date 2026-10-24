---
name: dtd-slide-design
description: Design and content rules for the Dasar Teknologi Digital (DTD) slide decks (Reveal.js + React, Airbnb palette, Material 3 Expressive) in this repo. Use whenever creating, editing, auditing, or checking any pertemuan-N deck — slide flow, post-test questions, referensi, praktikum tasks, images, math, theme, 4:3/dark support, or deciding where a change belongs. Recalls the project's non-negotiable conventions so they are not forgotten between sessions.
---

# DTD Slide Design Rules

Decks: `src/decks/pertemuan-NN.tsx` (NN = 01…15, no 08/16), published as `/pertemuan-N.html`.
Stack: Vite (root `slides/`) + React 19 + `@revealjs/react` + reveal.js 6. Docs: `README.md`, `docs/DESIGN-SYSTEM.md`.

## Hard invariants (never break)

1. **Never `git commit`** (or push) unless the user explicitly asks. Stated repeatedly by the user.
2. **`legacy/` and `archive/` are LOCAL-ONLY (git-ignored, deliberately not in the public repo) and stay untouched.** `legacy/pertemuan-N.html` is the reference the new decks are checked
   against (`bun run check:parity`); `archive/` is the original source. Never edit either.
3. **Edit decks by hand in `src/decks/pertemuan-NN.tsx`.** `scripts/port-legacy.py` was a one-shot porter — running it
   again overwrites manual edits (deck 2 KaTeX, deck 13 `CharStrip`, deck 9/10 split task slides, …). Do not re-run it.
4. **Palette comes from tokens only.** Colors are `--md-sys-color-*` from `src/theme/color.css`, which is *generated*
   (`bun run gen:palette`; change seeds in `scripts/gen-palette.ts`, never hand-edit). No raw hex in components.
5. **Type:** Google Sans Flex for text, Google Sans Code for code (`--font-sans`, `--font-mono`). **Minimum 20px**
   anywhere on the 1280-wide canvas (including `code`, `sub`, `sup`). No emoji — use Material Symbols (`<Icon name>`,
   `<I n>` inline). Math is KaTeX: `<M tex="…" />`, `<MathBlock tex="…" />` (keeps MathML for screen readers).
6. **Both themes and both ratios must work.** Light/dark via tokens; canvas 1280×720 (16:9) and 1280×960 (4:3).
   Print/PDF is always 16:9, one slide per page.
7. **This skill lives only at project level** (`.claude/skills/dtd-slide-design/`). Do not install it globally.

## Where a change belongs

- Slide content → `src/decks/pertemuan-NN.tsx` using layouts (`src/layouts/index.tsx`) and blocks (`src/layouts/blocks.tsx`).
- A new reusable pattern → add a component + CSS in `src/layouts/`, then document it in `docs/DESIGN-SYSTEM.md`.
- Global look (type scale, shape, motion) → `src/theme/*.css`. Color seeds → `scripts/gen-palette.ts`.
- Dashboard cards/links → `src/decks/registry.ts` (`published` controls whether a card links).
- Cover backdrop is generated per meeting number by `BrushBackground` — do not hand-draw per deck.

## Slide flow (mandatory narrative sequence)

1. **Title** — `TitleSlide` (one-line title, auto-fit).
2. **Hook / pemicu** — between title and agenda: `HookSlide`. **Bentuk dan isi harus berbeda di setiap pertemuan**: jangan
   mengulang pola 3 statistik + 3 contoh, dan jangan mengulang angka/contoh yang sama antar deck. Pakai `children` untuk
   diagram alur, tabel dulu/kini, skenario bernomor, daftar periksa, dua kolom, atau tabel teka-teki. Statistik luar hanya bila
   sumbernya terverifikasi (Pertemuan 1 dan 5 masih membawa angka lama); angka dari berkas praktikum sendiri boleh.
   Pertemuan 2 memakai slide "Dunia dalam 0 dan 1" sebagai pemicunya. Recap decks (7, 15): bullets only, no stats.
3. **Agenda** — `AgendaSlide`, numbered items.
4. **Body** — runut: concept → example → next concept, dikelompokkan dalam 3–4 **bagian** (klaster materi). Setiap bagian dibuka
   **`SectionSlide`** yang sama sederhananya di semua deck: nomor besar ("01 dari 04"), judul bagian, satu baris deskripsi, dan bilah
   posisi. Tidak ada alur konsep, daftar agenda, atau paragraf di divider; penjelasan penghubung (mis. bekas slide bridge) masuk ke
   `notes`. Deck review (7, 15) dan bagian pembuka sebelum bagian 1 tidak memakai divider. Di akhir tiap bagian sisipkan satu
   **`QuickCheckSlide`** (judul "Cek Cepat"): satu soal transfer — bukan soal post-test — dengan jawaban lalu penjelasan sebagai fragment.
5. **Diskusi / studi kasus** (optional), near the end.
6. **Post-test** — satu slide `QuizSlide`: soal tampil, jawaban benar muncul satu per satu sebagai fragment (tekan →, satu
   fragment per soal). Tidak ada slide jawaban terpisah. PDF: satu halaman per langkah fragment (soal, lalu jawaban bertambah satu per satu) — `check:print` menghitung slide + langkah fragment; jangan set `pdfSeparateFragments:false`. Uji dengan `FRAGS=1 node scripts/shot.mjs …`.
7. **Rangkuman** — `<SummarySlide title="Rangkuman Pertemuan N">`.
8. **Referensi** — `ReferencesSlide`; real, valid sources that match the deck's content and figures.
9. **Penutup** — satu slide `ClosingSlide`, sengaja ringkas karena slide terakhir: "Terima Kasih" + satu kalimat + kutipan bersumber + satu baris
   "Berikutnya — Pertemuan N: judul". Daftar topik pertemuan berikutnya ditaruh di `notes`, bukan di slide. Tidak ada `NextMeetingSlide`.

Always check this arc by reading the whole deck, not only for overflow.

`closing-meta` / "Selanjutnya" must track the **actual** next deck: 1→2 … 6→7 Review UTS, 7→8 UTS (exam), 9→10,
10→11 Pengolah Angka 1, 11→12, 12→13, 13→14 Aplikasi AI, 14→15 Review UAS, 15→16 UAS (exam). Do not create decks for 8/16.

### Judul
Judul kartu dasbor (`registry.ts`) **harus sama persis** dengan judul `TitleSlide` deck-nya (`bun run check:titles`, otomatis di `build`).
Judul deck review mengikuti pola "Review, Refleksi, Evaluasi & Kuis N".

### Recap decks (7 & 15)
Pertemuan 15 meniru kerangka Pertemuan 7 persis: sampul → slide pembuka "Saatnya Merefleksikan Perjalanan" (`Bullets` + keterangan) →
Agenda 4 butir → 3 slide "Rangkuman: Pertemuan X & Y" (`Cols`, dua kolom bertema) → "Refleksi: Pertanyaan Pemantik" (`AgendaSlide`, 4 pertanyaan) →
"Kuis N" (`Timer`) → Selanjutnya (UTS/UAS) → penutup "Semangat UTS/UAS!". Ringkasan harus mencerminkan isi deck sebenarnya (netral produk).
No Rangkuman slide (whole deck is a recap); "Selanjutnya" points to the exam; Hook has no stats; recap `Col` headings
drop the meeting number; the kuis slide is a **`<Timer minutes={50}>`**, never the questions (lecturers supply them).

## Post-test rules
- Exactly **4 questions**, each mapped 1:1 to a core agenda item, nothing outside the deck's material, no duplicates.
- Semua deck memakai satu konstanta `quiz` (4 soal). `QuizSlide` beralih ke 3 kolom bila lebih dari 4 (jangan dipakai).

## Praktikum decks (9–14)
0. **Scope: keterampilan minimal hingga tingkat menengah (intermediate)** yang wajib dimiliki di era digital — standar
   literasi digital mahasiswa dan lulusan ITERA. Pengolah kata: tanpa **mail merge**. Pengolah angka: tanpa **macro,
   VBA, atau Apps Script/scripting**. Jangan menambahkan materi tingkat lanjut di luar itu. Pengecualian terhadap deck
   lama dicatat di `scripts/parity-exceptions.json`.
0b. **Tidak terikat produk.** Ajarkan konsep; perkuliahan memakai **Google Docs/Sheets** (utama) dengan **Microsoft
   Word/Excel** sebagai cadangan offline. Tiap deck praktikum punya slide **Padanan Menu** (`EquivTable`) dan, di deck
   pembuka seri (9, 11), slide/kartu "Satu Konsep, Banyak Aplikasi". Tulis langkah praktikum dengan menu Google, tambahkan
   padanan Microsoft di slide padanan — jangan mengajarkan fitur yang hanya ada di satu produk tanpa alternatifnya.
0c. **Berkas pendukung** (templat, spreadsheet dasar) dibuat oleh `scripts/gen-files.mjs` (`bun run gen:files`) ke
   `slides/public/files/` + `src/files-manifest.ts`, lalu ditautkan dengan `<Download file="…" />` (dibungkus
   `<TaskHead>` di slide tugas). Formatnya `.docx`/`.xlsx` agar terbuka di Google maupun Microsoft. Jangan mengedit berkas
   biner langsung; ubah skripnya dan jalankan ulang.
1. A **Tugas Praktikum** slide (two slides, see below) right before Post-Test (and as the last agenda item): header `Callout` with duration
   (e.g. "Tugas (±30 menit)"), 8 numbered steps with exact menu paths (`File → Page setup`) and expected names, and a
   closing `Callout` "Kriteria Pengumpulan". Because 8 dense steps do not fit one slide, the task is **two slides**:
   steps 1–4, then "(lanjutan)" with steps 5–8 + Kriteria.
2. **Shortcuts must be valid for the tool taught.** Decks 9–10 teach Google Docs, not Word (Redo = `Ctrl+Shift+Z`;
   Save is automatic; `Ctrl+G` = Find next). Verify against official docs; drop empty columns instead of showing `—`.

## Sisi kanan (`aside`) harus informatif
Jangan memakai foto stok atau teks pengisi di `right` pada `SplitSlide`. Isi dengan ilustrasi yang menjelaskan: tiruan lembar kerja
`SheetGrid` (sel `key`/`found`/`res`/`err`/`lock`/`edit`, `rowNums` untuk baris tersembunyi), `MockPop` (dropdown, galat, bilah rumus),
`PivotAreas`, `CharStrip mark={[dari, sampai]}`, atau diagram dokumen. Bila ilustrasi terlalu sempit untuk kolom samping, buat **slide baru**
berisi `SheetGroup` (beberapa lembar berdampingan). Contoh: Pertemuan 11–13. Data contoh harus konsisten dengan `scripts/check-formulas.mjs`.

## Verifikasi perintah (wajib sebelum menulis menu/rumus/pintasan)
Jangan menulis jalur menu, pintasan, atau rumus dari ingatan. Cocokkan dengan dokumentasi resmi versi sekarang (Google Docs Editors
Help, Microsoft Support), uji rumus dengan `bun run check:formulas` (tambahkan kasus baru di `scripts/check-formulas.mjs`), dan catat
sumbernya di `docs/VERIFIKASI-PERINTAH.md`. Pintasan yang hanya ada di satu produk harus diberi label produknya (mis. `Ctrl + Shift + L` = Excel;
di Sheets berarti rata kiri). Menu Google berubah sering — jalur `Insert → Page elements → …` adalah bentuk saat ini.

## Tipografi kode dan tata letak kartu
- **Semua teks kode/perintah wajib monospace** (`<code>…</code>`; font Google Sans Code lewat `.page code`) supaya tidak rancu
  dengan teks biasa: sintaks dan nama fungsi (`=SUM(A1:A10)`, `LEFT(teks, 3)`), rujukan sel dan rentang (`B2`, `$B$2`),
  pintasan keyboard (`Ctrl + S`), nama berkas, domain dan alamat IP, string biner/heksadesimal, dan opsi kuis yang
  berisi hal-hal tersebut. Blok `Formula`, `<p className="mono">`, dan `<Card mono>` sudah monospace — jangan dibungkus ulang
  (hindari `<code>` bersarang). Nama menu (`Insert → Pivot table`) bukan kode: tetap teks tebal. Judul slide (`h2`) tidak
  perlu monospace. Rujukan (URL) di slide Referensi tetap miring (gaya APA).
- **Empat kartu selalu grid 2×2**, bukan satu baris empat kolom: `Cards` dan `CardsSlide` otomatis memakai 2 kolom bila
  isinya tepat empat, apa pun nilai `cols`.

## Images and layout
- Content images use `Figure` / `TwoColumnSlide image=…`; shapes follow the M3 scale (asymmetric corners) — the old
  "no rounded images" rule is retired. Logos on the cover keep a light plate (dark theme).
- Titles are claims, ≤ 2 lines. Content pages have **no eyebrow chips**. Aim for ≤ ~40 words of body outside
  diagrams/tables; put explanation in speaker notes (`notes` prop on a slide) rather than on the slide.
- Alt text is required for every image.

## Proposals not yet adopted (Phase B — need the user's approval per deck)
A quick-check at the end of each topic cluster; section
dividers instead of bridges; merge "Selanjutnya" + "Terima Kasih"; replace decorative stock photos with diagrams;
verify hook statistics against the latest sources; fill speaker notes. Do not apply these without being asked.

## Verify loop (before saying a deck is done)
1. `bunx tsc --noEmit` and `bun run build`.
2. `bun run dev`, then `node scripts/shot.mjs http://127.0.0.1:8931/pertemuan-N.html <outDir> all` at
   `VIEWPORT=1280x720` **and** `VIEWPORT=1024x768` — must report no `overflow-*` and no `text<20px`; look at the
   contact sheets (`scripts/sheet.py`). Also try `?theme=dark`.
3. `bun run check:parity` (legacy text still present), `bun run check:icons`.
4. `bun run build && bun run preview`, then `bun run check:print` (PDF pages = slides, 16:9).
Dev server and `preview` must be stopped afterwards.
