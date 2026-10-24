# Verifikasi perintah dan menu (Pertemuan 9–13)

Terakhir diperiksa: **24 Oktober 2026**. Ulangi tiap semester — Google sering memindahkan menu (contoh: header, nomor halaman,
daftar isi, dan watermark kini berada di bawah **Insert → Page elements**).

## Cara memeriksa, dan batasnya

| Yang diperiksa | Cara | Yang **tidak** dibuktikan |
|---|---|---|
| Rumus dan fungsi | `bun run check:formulas` — 39 kasus dihitung mesin spreadsheet nyata (LibreOffice headless) dan dibandingkan dengan hasil yang diklaim slide | Perilaku persis Google Sheets/Excel (mesin berbeda; semantik fungsi standar sama) |
| Menu, tombol, dan pintasan | Dicocokkan dengan halaman bantuan resmi Google Docs Editors Help dan Microsoft Support (tautan di bawah) | Tidak dijalankan di aplikasi sungguhan — tidak ada akses ke akun/aplikasi tersebut |
| Berkas templat dan data | `bun run check:dist` (saat build) dan `bun run check:published <url>` (situs terbit) | — |

## Koreksi yang dihasilkan pemeriksaan ini

1. **Menu Google Docs:** `Insert → Headers & footers`, `Insert → Page numbers`, `Insert → Table of contents`, `Insert → Watermark`
   → kini `Insert → Page elements → Header / Page number / Table of contents / Watermark` (Pertemuan 9 dan 10, termasuk tabel padanan).
2. **Pintasan Sheets vs Excel:** `Ctrl + Shift + L` di Sheets berarti *rata kiri*, dan `Ctrl + 1` tidak ada di Sheets. Keduanya kini ditandai **khusus Excel**;
   filter di Sheets adalah `Data → Create a filter`.
3. **HLOOKUP (Pertemuan 12):** contoh memakai indeks baris `1` sehingga mengembalikan teks "Matematika", bukan `85`. Diperbaiki menjadi indeks `2`.
4. **Statistik studi kasus (Pertemuan 12):** "3 kategori produk" padahal data hanya memuat 2 (Komputer, Aksesoris). Diperbaiki.
5. **Dialog cetak Docs (Pertemuan 10):** istilah "Print Range/Orientation" diganti Pages, Copies, Layout, Paper size; margin dan orientasi dokumen lewat `File → Page setup`.
6. **IFS:** "Excel 365" → "Excel 2019 ke atas" (fungsi tersedia sejak Excel 2019).
7. **TEXT:** pemisah ribuan mengikuti *locale* lembar kerja (hasil `1,234` berlaku untuk locale AS).
8. Kapitalisasi: `Protect sheets and ranges` (bukan "Protect Sheets and Ranges").

## Sumber

**Google Docs Editors Help (support.google.com/docs/answer/…)**
- Pintasan Docs: `179738` — `Ctrl + Enter` (page break), `Ctrl + Shift + Z` (redo), `Ctrl + F`, `Ctrl + H`, `Ctrl + G` (find again), `Ctrl + Alt + M` (komentar), `Ctrl + /`, `Ctrl + Alt + Y` (alt text)
- Pintasan Sheets: `181110` — `F4` (referensi absolut), `Ctrl + H`; `Ctrl + 1` dan `Ctrl + Shift + L` **tidak** untuk format/filter
- Header, footer, nomor halaman, *Different first page*, *Link to previous*: `86629` (`Insert → Page elements → …`; margin header `Format → Headers & footers → More options`)
- Heading dan daftar isi: `116338` (`Format → Paragraph styles`, `Insert → Page elements → Table of contents`, tombol Refresh)
- Watermark: `11560109` (`Insert → Page elements → Watermark`, teks atau gambar)
- Page setup: `10296604` (`File → Page setup`); break: `11526892` (`Insert → Break`)
- Sitasi: `10090962` (`Tools → Citations`; **MLA 8th, APA 7th, Chicago Author-Date 17th**; tombol *Insert bibliography*)
- Drawing `179740` (`Insert → Drawing → New`); grafik dari Sheets `7009814` (`Insert → Chart → From Sheets`)
- Cetak `143346` (`File → Print`); ekspor `49114` (`File → Download`); komentar dan *Suggesting* `6033474`, `65129`
- Find & replace: `62754` (*Match case*, *Match using regular expressions*); templat: `148833` (File → New → From a template)
- Sheets: filter dan sortir `3540681` (`Data → Create a filter`, `Data → Sort range`); validasi `186103` (`Data → Data validation`);
  proteksi `1218656` (`Data → Protect sheets and ranges`); `6325535` (`Data → Data cleanup → Remove duplicates / Trim whitespace`);
  format angka `56470` (`Format → Number`); locale `58515` (`File → Settings`); bekukan baris `9060449` (`View → Freeze`);
  pivot `1272900` (`Insert → Pivot table`); grafik `63824`; `IFS` `7014145`; `TEXT` `3094139`
- Fungsi: IF `3093364`, COUNTIF `3093480`, SUMIF `3093583`, VLOOKUP `3093318`, INDEX `3098242`, MATCH `3093378`, IFERROR `3093304`, TRIM `3094140`, SUM `3093669`

**Microsoft Support**
- Word: *Layout → Margins/Orientation/Size*, *Layout → Breaks* dan `Insert → Page Break`, `Ctrl + Enter`; *Different First Page* dan *Link to Previous*;
  *References → Table of Contents / Insert Citation / Bibliography*; *Design → Watermark*; *Review → New Comment / Track Changes*;
  *File → Save As* (PDF) dan *Export*; `Ctrl + H` (Find and Replace)
- Excel: `Ctrl + 1` (Format Cells), `Ctrl + Shift + L` (AutoFilter), `F4`, `Ctrl + H`; *Data → Remove Duplicates / Text to Columns / Data Validation*;
  *Home → Conditional Formatting / Number Format*; *Insert → PivotTable* (area Filters/Columns/Rows/Values); *Review → Protect Sheet*; *View → Freeze Panes*; `IFS` (Excel 2019+)

## Yang masih perlu diuji manusia

- Label menu Docs untuk galeri templat: dokumentasi menulis `File → New → From a template` (antarmuka bisa menampilkan "From template gallery"); slide memakai "From a template".
- Tampilan sebenarnya di Google Docs/Sheets dan Word/Excel versi terbaru (ikon, urutan tombol). Buka satu kali tiap semester sebelum kuliah.

## Pertemuan 14: fakta etika dan integritas akademik (diperiksa 25 Oktober 2026)

| Klaim di slide | Sumber yang dicek |
|---|---|
| Pedoman APA: `OpenAI. (2025). ChatGPT [Large language model]. https://chatgpt.com`, dalam teks `(OpenAI, 2025)`, sertakan prompt | apastyle.apa.org/blog/cite-generative-ai-references (pedoman berubah beberapa kali sejak 2023) |
| Detektor AI: rata-rata 61,3% esai TOEFL penulis non-native keliru ditandai AI (7 detektor) | Liang dkk. (2023), *Patterns*; arXiv:2304.02819 |
| *Gender Shades*: galat hingga 34,7% (perempuan berkulit gelap) vs 0,8% (laki-laki berkulit terang) | Buolamwini & Gebru (2018), PMLR 81:77–91 |
| *Mata v. Avianca* (2023): denda US$5.000 untuk pengacara; hakim: memakai AI tidak dilarang, pengguna bertanggung jawab atas akurasi | Putusan sanksi S.D.N.Y., Juni 2023 (dilaporkan CNBC, NBC, LawNext) |
| Panduan GenAI Kemendikbudristek (Okt 2024) memuat integritas akademik sebagai ranah etika | Pemberitaan detik.com dan Medcom — **sumber sekunder**; tautan resmi belum dikonfirmasi, jadi referensi tidak memuat URL |
| UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi | jdih.komdigi.go.id |
| Riwayat versi Google Docs (`File → Version history`) | support.google.com/docs/answer/190843 (kontrol riwayat versi di kanan atas) |
