# Dasar Teknologi Digital (DTD)

Materi kuliah **Dasar Teknologi Digital (WI25-00002)** — Institut Teknologi Sumatera (ITERA),
Semester Gasal 2026/2027. Slide dibangun dengan **Reveal.js 6 + React 19** (`@revealjs/react`),
bahasa visual **Material Design 3 Expressive** dengan palet **Airbnb**, font **Google Sans Flex**
(teks) dan **Google Sans Code** (kode), serta **KaTeX** untuk rumus.

## Menjalankan

```bash
bun install
bun run dev        # http://127.0.0.1:8931/  (dashboard) — /pertemuan-N.html (deck)
bun run build      # tsc + vite build → dist/
bun run preview    # sajikan dist/ di http://127.0.0.1:4173/
```

Kontrol tampilan (kiri bawah, transparan sampai disorot): **rasio** Otomatis / 16:9 / 4:3
dan **tema** Otomatis / Terang / Gelap. Bisa dipaksa lewat URL: `?ratio=4x3&theme=dark`.
Navigasi: `←` `→` pindah slide, `S` tampilan pembicara, `O` ikhtisar, `F` layar penuh.
Ekspor PDF: tambahkan `?print-pdf` di URL lalu cetak (satu slide = satu halaman 16:9; slide beranimasi menghasilkan satu halaman per langkah, mis. post-test: soal lalu jawaban bertambah satu per satu).
Post-test: satu slide, jawaban muncul per soal saat menekan `→`.

## Struktur

```
slides/                 halaman (root Vite): index.html = dashboard, pertemuan-N.html = deck
src/
  theme/                token warna (generated), tipografi, bentuk, gerak, tema reveal
  ui/                   Icon, KaTeX (M, MathBlock), BrushBackground, useFitText
  layouts/              layout slide (index.tsx) + blok generik (blocks.tsx)
  deck-shell/           DeckShell (@revealjs/react), kanvas 16:9/4:3, kontrol tampilan
  decks/                pertemuan-NN.tsx (isi slide) + registry.ts (metadata dashboard)
  main/                 entry: dashboard.tsx, deck.tsx, gallery.tsx
scripts/                gen-palette, port-legacy, check-parity/icons, print-check, shot, sheet
legacy/  archive/       LOKAL SAJA (di-.gitignore, tidak ada di repositori): deck lama untuk `check:parity` dan sumber awal. Tanpa folder ini `check:parity` tidak bisa dijalankan.
assets/                 gambar dan logo (images/, logo ITERA & DIKTI)
docs/DESIGN-SYSTEM.md   sistem desain
DESIGN.md               referensi palet Airbnb
```

## Pertemuan

| # | Topik | Slide | Jenis |
|---|-------|-------|-------|
| 1 | Pengenalan Dasar Teknologi Digital | 27 | Teori |
| 2 | Sistem Bilangan Digital & Logika Digital | 25 | Teori |
| 3 | Internet, Website, Basis Data & Media Sosial | 25 | Teori |
| 4 | Aplikasi & Etika Teknologi Digital | 27 | Teori |
| 5 | Data, Informasi & Keamanan Digital | 24 | Teori |
| 6 | Inovasi, AI & Sustainability | 25 | Teori |
| 7 | Review, Refleksi, Evaluasi & Kuis 1 | 9 | Review |
| 8 | **UTS** | — | Ujian |
| 9 | Pengolah Kata Bagian 1 | 31 | Praktikum |
| 10 | Pengolah Kata Bagian 2 | 30 | Praktikum |
| 11 | Pengolah Angka Bagian 1 | 25 | Praktikum |
| 12 | Pengolah Angka Bagian 2 | 25 | Praktikum |
| 13 | Pengolah Angka Bagian 3 | 27 | Praktikum |
| 14 | Aplikasi Kecerdasan Buatan | 28 | Praktikum |
| 15 | Review, Kuis 2 & Persiapan UAS | 9 | Review |
| 16 | **UAS** | — | Ujian |

Pertemuan yang ditautkan di dashboard diatur lewat `published` di `src/decks/registry.ts`
(semua deck sudah `true`; UTS dan UAS tidak punya slide).

## Berkas pendukung (templat & data dasar)

Deck praktikum menautkan tombol **Unduh** ke berkas di `slides/public/files/` (terbit sebagai `/files/…`):

| Berkas | Dipakai di |
|---|---|
| `dtd-p09-templat-dokumen.docx` | Pertemuan 9 — Dokumen Digital Pertama |
| `dtd-p10-templat-laporan.docx`, `dtd-p10-templat-surat.docx` | Pertemuan 10 — laporan terstruktur; dokumen berulang (Find & Replace) |
| `dtd-p11-data-anggaran.xlsx` | Pertemuan 11 — anggaran kegiatan |
| `dtd-p12-data-penjualan.xlsx` | Pertemuan 12 — data penjualan + Master |
| `dtd-p13-data-mentah.xlsx` | Pertemuan 13 — data mentah transaksi kafe |

Formatnya `.docx` / `.xlsx`, jadi terbuka di Google Docs/Sheets (unggah ke Drive → Buka dengan) dan di Microsoft Word/Excel.
Berkas dihasilkan oleh `bun run gen:files` (`scripts/gen-files.mjs`, juga menulis `src/files-manifest.ts`); ubah isinya di skrip itu,
bukan lewat editor. Data di dalamnya fiktif.

## Aplikasi: tidak terikat produk

Materi pengolah kata dan pengolah angka mengajarkan **konsep** (hingga tingkat menengah — standar literasi digital mahasiswa dan
lulusan ITERA). Perkuliahan memakai **Google Docs / Google Sheets**; **Microsoft Word / Excel** adalah cadangan bila internet
bermasalah. Tiap deck punya slide *Padanan Menu* (Google ↔ Microsoft). Di luar lingkup: mail merge, macro, VBA, Apps Script.

## Menulis atau mengubah slide

Isi tiap pertemuan ada di `src/decks/pertemuan-NN.tsx`, disusun dari layout dan blok di
`src/layouts/` (lihat `docs/DESIGN-SYSTEM.md` dan galeri `/gallery.html`, hanya di dev server — tidak ikut build). Rumus memakai `<M tex="…" />`.
Jangan menjalankan ulang `scripts/port-legacy.py` — itu alat sekali pakai yang akan menimpa edit manual.

Pengecekan sebelum selesai (dev server aktif untuk tiga yang pertama, `bun run preview` untuk print):

```bash
bun run check:parity   # teks deck lama masih ada di deck baru
bun run check:icons    # semua ikon Material Symbols ter-render
node scripts/shot.mjs http://127.0.0.1:8931/pertemuan-N.html /tmp/out all   # overflow, teks < 20px
bun run check:print    # jumlah halaman PDF = slide + langkah fragment
bun run check:formulas # rumus contoh di slide dihitung mesin spreadsheet (LibreOffice) = hasil yang diklaim
bun run check:titles   # judul kartu dasbor = judul slide sampul (otomatis di `build`)
bun run check:dist     # hasil build memuat semua berkas unduhan (otomatis di `build`)
bun run check:published https://<user>.github.io/<repo>/  # situs terbit: berkas unduhan benar-benar dapat diambil
bun run gen:palette    # jika seed warna berubah (validasi kontras ≥ 4,5:1)
```

Perintah/menu/pintasan di slide diverifikasi terhadap dokumentasi resmi — catatan, sumber, dan batasnya di `docs/VERIFIKASI-PERINTAH.md`.
Aturan isi dan alur slide: `.claude/skills/dtd-slide-design/SKILL.md`.
Perubahan isi yang disengaja terhadap deck lama (mis. materi yang dibuang; `rewritten` untuk deck yang ditulis ulang total) dicatat di `scripts/parity-exceptions.json`
agar `check:parity` tetap bermakna.

## Deploy

GitHub Actions (`.github/workflows/pages.yml`) membangun `dist/` dan menerbitkannya ke GitHub Pages.
Di *Settings → Pages*, **Source** harus diubah ke **GitHub Actions** (sebelumnya: branch `main`, folder root).

## Lisensi

Materi kuliah internal ITERA. Hak cipta mengikuti kebijakan institusi.
