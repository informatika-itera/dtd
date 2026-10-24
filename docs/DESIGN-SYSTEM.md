# Sistem Desain Slide DTD

Palet **Airbnb** × bahasa visual **Material Design 3 Expressive**. Kanvas slide 1280×720 (16:9) atau
1280×960 (4:3, dipilih otomatis dari rasio layar atau lewat kontrol tampilan).

## Warna

Token `--md-sys-color-*` di `src/theme/color.css` **dihasilkan** oleh `bun run gen:palette`
(`scripts/gen-palette.ts`, HCT lewat `@material/material-color-utilities`). Jangan diedit manual.

| Peran | Seed | Catatan |
|---|---|---|
| primary | Rausch `#ff385c` | teks/tombol memakai tone 40 (`#be0038`); Rausch asli hanya `--md-sys-color-brand-rausch` untuk bentuk besar dan angka display |
| secondary | Plus `#92174d` | |
| tertiary | Luxe `#460479` | |
| error | `#c13515` | |
| success, warning | hijau/oranye berkroma rendah | diselaraskan ke primary |
| netral | `#ffffff`, `#f7f7f7`, `#f2f2f2`, `#dddddd`, ink `#222222` | tema gelap: permukaan `#222222` |

Rausch `#ff385c` di atas putih hanya 3,52:1 (gagal AA untuk teks), karena itu tidak dipakai untuk teks.
Skrip gagal bila ada pasangan teks/latar < 4,5:1, di tema terang maupun gelap (54 pasangan).

## Tipografi

Google Sans Flex (variabel), Google Sans Code untuk kode, di-host sendiri lewat `@fontsource-variable/*`.

| Token | Ukuran | Pemakaian |
|---|---|---|
| `--t-display-hero` | 96 | angka statistik besar |
| `--t-display` | 64 | judul cover (menyusut otomatis agar satu baris, min 40) |
| `--t-headline` | 44 | judul slide |
| `--t-title` | 30 | judul kartu |
| `--t-body-lg` / `--t-body` | 28 / 24 | isi |
| `--t-label` | 20 | label, sumber — **minimum mutlak 20px** |
| `--t-code` | 22 | kode |

Rumus: KaTeX (`<M tex="…" />`, `<MathBlock tex="…" />`), dirender dengan MathML agar terbaca pembaca layar.
Ikon: Material Symbols Rounded (`<Icon name="…" />`, `<I n="…" />` di dalam teks). Tidak memakai emoji.

## Bentuk, gerak, tata letak

- Skala sudut M3 (`--shape-xs … --shape-4xl`, `--shape-full`); gambar konten memakai sudut asimetris `4xl / md`.
- Gerak: `--motion-spatial` (pegas, `linear()`), `--motion-effects`; dimatikan untuk `prefers-reduced-motion` dan cetak.
- Margin aman 64px × 40–48px. Judul slide berupa kalimat/klaim, tanpa eyebrow di halaman isi.
- Cover: nomor besar + label, judul satu baris, latar goresan kuas yang dihasilkan dari nomor pertemuan
  (`src/ui/BrushBackground.tsx`) — setiap pertemuan berbeda tetapi stabil. Goresan tidak menyentuh area logo (kanan atas); logo tanpa latar di tema terang, berlatar putih di tema gelap. Di hero dashboard goresan juga menjauhi blok teks (jarak ±44px) dan dihitung dari ukuran hero.
- 4:3: isi diskalakan 1,1× dan dipusatkan; slide cetak selalu 16:9.

## Komponen

Layout (`src/layouts/index.tsx`): `TitleSlide`, `HookSlide`, `AgendaSlide`, `DiscussSlide`, `TwoColumnSlide`,
`FlowSlide`, `CardsSlide`, `TimelineSlide`, `ComparisonSlide`, `QuizSlide`, `SummarySlide`, `ReferencesSlide`,
`SectionSlide`, `ClosingSlide`.
Blok generik (`src/layouts/blocks.tsx`): `ContentSlide`, `SplitSlide`, `Para`, `Bullets`, `Stats`, `Cards`/`Card`,
`Flow`/`Box`/`Arrow`, `Callout`, `Cols`/`Col`, `DataTable`, `Formula`, `Steps`/`Step`, `TimelineBlock`, `Timer`,
`CharStrip`, `Tags`, `QuoteBlock`, `Figure`, `EquivTable` (padanan menu Google ↔ Microsoft), `Download` (kartu unduh berkas pendukung), `TaskHead` (callout tugas + unduhan).

## Verifikasi

`scripts/shot.mjs` (screenshot + overflow + teks < 20px), `scripts/check-parity.mjs`, `scripts/check-icons.mjs`,
`scripts/print-check.mjs`. Lihat README untuk perintahnya.


## Pemicu (HookSlide)
`HookSlide` menerima `stats`, `examples`, atau `children` bebas. Setiap pertemuan memakai bentuk berbeda (diagram, tabel, skenario, daftar periksa, dua kolom). Gaya khusus ada di bagian akhir `src/layouts/layouts.css` (`.page.hook`).

## Ilustrasi lembar kerja
`SheetGrid`, `SheetGroup`, `MockPop`, `PivotAreas`, dan `CharStrip mark` (di `src/layouts/blocks.tsx`) membuat tiruan Google Sheets/Excel tanpa gambar:
kartu putih seperti dokumen (terbaca di tema gelap), sel dapat disorot (`key`, `found`, `res`, `err`, `lock`, `edit`, `fx`, `num`, `dim`), dan `rowNums`
memperlihatkan baris yang disembunyikan filter. Dipakai di Pertemuan 11–13; selalu sertakan keterangan (caption) yang menjelaskan sorotannya.

## Section divider, penutup, dan panel rangkuman
- `SectionSlide` (`src/layouts/index.tsx`): pembatas bagian yang sederhana dan seragam — `part`, `of`, `title`, `desc`; nomor besar, judul, satu baris deskripsi, bilah posisi.
- `ClosingSlide`: penutup ringkas (terima kasih, satu kalimat, kutipan, satu baris pertemuan berikutnya); topik berikutnya di `notes`.
- `RecapPanel` + `RecapGrid` (`blocks.tsx`): panel per pertemuan (lencana nomor, judul, poin berikon centang) untuk deck review 7 dan 15. Jangan memakai elemen `<section>` untuk panel — CSS reveal.js memperlakukannya sebagai slide.
