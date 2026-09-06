# Dasar Teknologi Digital (DTD)

Materi kuliah **Dasar Teknologi Digital** — Institut Teknologi Sumatera (ITERA),
Semester Gasal 2026/2027. Repositori ini berisi slide presentasi berbasis
[reveal.js](https://revealjs.com/) yang siap dibuka di browser maupun dicetak ke PDF.

---

## Daftar Isi

- [Ikhtisar](#ikhtisar)
- [Struktur Repositori](#struktur-repositori)
- [Daftar Pertemuan](#daftar-pertemuan)
- [Menjalankan Secara Lokal](#menjalankan-secara-lokal)
- [Menghasilkan Ulang Slide (Build)](#menghasilkan-ulang-slide-build)
- [Mengekspor ke PDF](#mengekspor-ke-pdf)
- [Konvensi Desain Slide](#konvensi-desain-slide)
- [Berkontribusi](#berkontribusi)
- [Lisensi](#lisensi)

---

## Ikhtisar

- **14 deck slide** (`pertemuan-N.html`) untuk 15 pertemuan (Pertemuan 8 = UTS,
  tanpa deck).
- Slide dirender oleh **reveal.js** yang di-*vendor* lokal (offline-safe, tanpa CDN).
- Kanvas slide dikunci pada **1280×720** dengan `minScale: 0.2`, `maxScale: 2.0`,
  sehingga tampil proporsional di proyektor, laptop, maupun layar kecil.
- Setiap deck punya tombol **ekspor PDF** (print) dan mode `?print-pdf` untuk
  menghasilkan handout per halaman.

---

## Struktur Repositori

```
.
├── index.html                  # Halaman utama: daftar 15 pertemuan (kartu)
├── pertemuan-N.html            # Deck reveal.js (hasil build, ter-commit)
├── archive/
│   └── pertemuan-N.html        # Sumber legacy format "fullscreen" (pristine)
├── assets/
│   ├── fonts/                  # Inter variable font (self-hosted)
│   ├── images/                 # Foto & ilustrasi slide
│   ├── styles/
│   │   ├── slides.css          # Stylesheet legacy (acuan desain)
│   │   ├── slides-reveal.css   # Turunan: unit viewport → px (generated)
│   │   └── reveal-deck.css     # Override reveal + komponen tambahan
│   └── vendor/
│       └── reveal/             # reveal.js + plugin (notes/zoom/search)
├── tools/
│   └── build-reveal.py         # Konversi archive/* → pertemuan-N.html
├── .claude/skills/dtd-slide-design/SKILL.md  # Aturan desain slide (proyek)
├── DESIGN.md                   # Dokumen sistem desain visual
├── RPS_MK_WI25-00002.pdf       # RPS mata kuliah
└── topik-materi.xls            # Daftar topik materi
```

### Pola build (penting)

- **`archive/pertemuan-N.html`** = sumber asli dalam format *fullscreen* lama.
  **Jangan pernah diedit langsung.**
- **`pertemuan-N.html` (root)** = hasil build reveal.js. **Di-regenerate** oleh
  `tools/build-reveal.py`; jangan diedit manual.
- Semua perbaikan desain/konten dilakukan di **`tools/build-reveal.py`** atau
  **`assets/styles/reveal-deck.css`** — bukan di file sumber.

---

## Daftar Pertemuan

| # | Topik | File | Slide | Jenis |
|---|-------|------|-------|-------|
| 1 | Pengenalan Dasar Teknologi Digital | `pertemuan-1.html` | 23 | Teori |
| 2 | Sistem Bilangan Digital & Logika Digital | `pertemuan-2.html` | 21 | Teori |
| 3 | Internet, Website, Basis Data & Media Sosial | `pertemuan-3.html` | 22 | Teori |
| 4 | Aplikasi & Etika Teknologi Digital | `pertemuan-4.html` | 23 | Teori |
| 5 | Data & Informasi di Era Digital | `pertemuan-5.html` | 21 | Teori |
| 6 | Inovasi, AI & Sustainability | `pertemuan-6.html` | 23 | Teori |
| 7 | Review, Refleksi, Evaluasi & Kuis 1 | `pertemuan-7.html` | 10 | Review |
| 8 | **UTS** | — | — | Ujian |
| 9 | Pengolah Kata Bagian 1 | `pertemuan-9.html` | 17 | Praktikum |
| 10 | Pengolah Kata Bagian 2 | `pertemuan-10.html` | 15 | Praktikum |
| 11 | Pengolah Angka Bagian 1 | `pertemuan-11.html` | 15 | Praktikum |
| 12 | Pengolah Angka Bagian 2 | `pertemuan-12.html` | 15 | Praktikum |
| 13 | Pengolah Angka Bagian 3 | `pertemuan-13.html` | 15 | Praktikum |
| 14 | Aplikasi Kecerdasan Buatan | `pertemuan-14.html` | 15 | Praktikum |
| 15 | Review, Kuis 2 & Persiapan UAS | `pertemuan-15.html` | 9 | Review |
| 16 | **UAS** | — | — | Ujian |

---

## Menjalankan Secara Lokal

Cukup sajikan folder sebagai static server:

```bash
cd /path/ke/dtd
python3 -m http.server 8931
```

Lalu buka **http://127.0.0.1:8931/** — halaman index menampilkan semua pertemuan.

Atau buka deck langsung, misal: **http://127.0.0.1:8931/pertemuan-1.html**.

### Navigasi slide

- **Panah kiri/kanan** atau **Spasi** — pindah slide.
- **F** — layar penuh; **O** — overview; **Esc** — keluar.
- **?** — daftar lengkap shortcut.

---

## Menghasilkan Ulang Slide (Build)

```bash
python3 tools/build-reveal.py
```

Script ini:

1. Membaca `archive/pertemuan-N.html` (sumber legacy).
2. Menerapkan transformasi desain & konten (hook, ending kanonik, post-test 2×2,
   bridge alur, dll).
3. Menulis deck reveal.js ke root `pertemuan-N.html`.
4. Men-generate ulang `assets/styles/slides-reveal.css` (unit `vw`/`vh` → `px`).

> Watch output slide count: perubahan yang *scoped* ke satu deck tidak boleh
> mengubah jumlah slide deck lain. Jika berubah, ada transformasi yang *leak*.

---

## Mengekspor ke PDF

1. Buka deck, mis. `pertemuan-1.html`.
2. Klik tombol **🖨️** di kartu (dari `index.html`) atau tambahkan `?print-pdf`
   di URL: `pertemuan-1.html?print-pdf`.
3. Dialog print terbuka otomatis — pilih *Save as PDF*.

Setiap slide menjadi satu halaman PDF (1280×720), aman untuk handout.

---

## Konvensi Desain Slide

Aturan lengkap tersimpan di `.claude/skills/dtd-slide-design/SKILL.md`. Ringkasnya:

- **Alur kanonik tiap deck:**
  `Judul → Hook → Agenda → Materi → Post-Test (2×2) → Rangkuman → Referensi →
  Selanjutnya → Penutup`.
- **Hook** membuka setelah judul; deck *review* (7 & 15) memakai poin saja tanpa
  statistik.
- **Post-test** tepat 4 soal, grid 2×2, tiap soal memetakan satu topik inti.
- **Referensi** wajib ada dan harus sumber nyata yang relevan.
- **Penutup** selalu diakhiri kutipan ber-atribusi.
- **Foto konten** tidak memakai sudut membulat (flat).
- **Deck review** (7 & 15): tanpa slide Rangkuman; kuis diganti **timer 50 menit**
  (soal diberikan dosen pengampu per sesi).

---

## Berkontribusi

1. Jangan edit `archive/*` — ubah transformasi di `tools/build-reveal.py` atau
   `assets/styles/reveal-deck.css`.
2. Jangan edit hasil build `pertemuan-N.html` secara manual.
3. Setelah mengubah, jalankan `python3 tools/build-reveal.py` dan verifikasi
   slide count + render.
4. Pastikan perubahan *scoped* per deck (guard `if deck == "pertemuan-N.html"`).

---

## Lisensi

Materi kuliah internal ITERA. Hak cipta mengikuti kebijakan institusi.
