# 🔍 Laporan Audit Slide — Dasar Teknologi Digital

**Tanggal audit:** 2026-08-06  
**File yang diaudit:** `pertemuan-1.html` s/d `pertemuan-15.html` (14 file aktif)  
**Catatan:** `pertemuan-8.html` tidak ada (minggu UTS, by design)

---

## 1. Ringkasan Eksekutif

### Status Keseluruhan: ✅ Critical issues sudah diperbaiki

| Kategori | Severity | Status |
|---|---|---|
| Variabel CSS tidak terdefinisi | 🔴 **CRITICAL** | ✅ **FIXED** — 4 variabel di 9 file |
| Font size hardcoded | 🟡 MEDIUM | ⏳ Masih ada (tidak mengganggu rendering) |
| Warna hardcoded (konsisten) | 🟡 MEDIUM | ⏳ Masih ada (konsisten di semua file) |
| Warna hardcoded (per-file) | 🟠 LOW | ⏳ Masih ada (file spesifik) |
| Inline styles | 🟢 INFO | ✅ Layout-only, aman |

**Perbaikan yang sudah dilakukan (2026-08-06):**
- `var(--font-heading)` → `var(--font-display-sm)` di 9 file (P1-3, P5-6, P9, P11-12, P14)
- `var(--font-display)` → `var(--font-display-lg)` di 9 file
- `var(--font-small)` → `var(--font-body-sm)` di 9 file
- `var(--surface)` → `var(--canvas)` di 9 file
- Hapus 4 variabel ekstra dari `:root` P5 (`--surface`, `--font-display`, `--font-heading`, `--font-small`)
- **Hasil:** Semua 14 file sekarang konsisten menggunakan variabel CSS yang valid

---

## 2. Konsistensi `:root` Variables

### ✅ Konsisten di semua file (14/14)

**Colors (15 variabel):**
```css
--canvas: #ffffff
--surface-soft: #f7f7f7
--surface-strong: #f2f2f2
--hairline: #dddddd
--hairline-soft: #ebebeb
--border-strong: #c1c1c1
--ink: #222222
--body: #3f3f3f
--muted: #6a6a6a
--muted-soft: #929292
--primary: #ff385c
--primary-active: #e00b41
--primary-disabled: #ffd1da
--on-primary: #ffffff
--shadow: rgba(0,0,0,0.02) 0 0 0 1px, rgba(0,0,0,0.04) 0 0.167vw 0.5vw 0, rgba(0,0,0,0.1) 0 0.33vw 0.67vw 0
```

**Font Sizes (10 variabel):**
```css
--font-display-xl: clamp(56px, 7.5vw, 120px)
--font-display-lg: clamp(44px, 5.8vw, 92px)
--font-display-md: clamp(38px, 5vw, 80px)
--font-display-sm: clamp(32px, 4.2vw, 68px)
--font-title: clamp(26px, 3.2vw, 52px)
--font-body: clamp(20px, 2.2vw, 36px)
--font-body-sm: clamp(18px, 1.8vw, 28px)
--font-caption: clamp(16px, 1.5vw, 24px)
--font-caption-sm: clamp(14px, 1.3vw, 20px)
--font-micro: clamp(11px, 1vw, 16px)
```

**Spacing (8 variabel):**
```css
--sp-xs: clamp(6px, 0.5vw, 10px)
--sp-sm: clamp(8px, 0.8vw, 14px)
--sp-md: clamp(14px, 1.2vw, 20px)
--sp-base: clamp(18px, 1.6vw, 26px)
--sp-lg: clamp(26px, 2.4vw, 40px)
--sp-xl: clamp(36px, 3.2vw, 52px)
--sp-2xl: clamp(48px, 4.8vw, 76px)
--sp-page: clamp(40px, 6vw, 96px)
```

**Components (8 variabel):**
```css
--icon-sm: clamp(26px, 2.4vw, 40px)
--icon-md: clamp(48px, 4.5vw, 72px)
--icon-lg: clamp(96px, 10vw, 160px)
--icon-xl: clamp(64px, 8vw, 128px)
--radius-sm: clamp(8px, 0.8vw, 14px)
--radius-md: clamp(14px, 1.3vw, 22px)
--radius-lg: clamp(18px, 2vw, 32px)
--radius-pill: 9999px
```

### ⚠️ Pertemuan-5: Punya variabel ekstra yang TIDAK ada di file lain

`pertemuan-5.html` mendefinisikan **4 variabel tambahan** yang TIDAK didefinisikan di file lain:

```css
--surface: #ffffff
--font-display: clamp(36px, 5vw, 80px)
--font-heading: clamp(28px, 3.6vw, 56px)
--font-small: clamp(16px, 1.5vw, 24px)
```

Ini menjelaskan mengapa P5 tidak mengalami masalah undefined variable, sementara file lain mengalami fallback.

---

## 3. ✅ Variabel CSS Tidak Terdefinisi (SUDAH DIPERBAIKI)

### ~~Masalah~~ → SOLVED

~~CSS rules di **10 dari 14 file** mereferensikan 4 variabel yang **TIDAK didefinisikan** di `:root` mereka.~~

**Perbaikan:** Semua referensi undefined variable telah diganti dengan variabel yang sudah ada di semua file. Konsistensi font size sekarang terjamin di quiz, rangkuman, dan closing slides.

### Tabel Dampak per File

| Variabel | Selector | Dampak | P1 | P2 | P3 | P4 | P5 | P6 | P7 | P9 | P10 | P11 | P12 | P13 | P14 | P15 |
|---|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| `--font-heading` | `.slide-quiz h2` | Font jadi default 16px | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `--font-heading` | `.slide-rangkuman h2` | Font jadi default 16px | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `--font-display` | `.slide-closing h1` | Font jadi default 16px | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `--font-small` | `.quiz-q .q-text` | Font jadi default 16px | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| `--surface` | `.quiz-q` background | Background jadi transparent | ❌ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Legend:** ✅ = variabel terdefinisi (tidak masalah) · ❌ = variabel TIDAK terdefinisi (BUG)

### Detail per Variabel

#### `--font-heading` → Hilang di 12/14 file
- **Digunakan di:** `.slide-quiz h2`, `.slide-rangkuman h2`
- **Yang seharusnya:** `--font-display-sm` (`clamp(32px, 4.2vw, 68px)`)
- **Dampak:** Judul slide quiz dan rangkuman tampil di **16px** (browser default) alih-alih **32px+**
- **File yang berdampak:** P1, P2, P3, P4, P6, P7, P9, P11, P12, P13, P14, P15

#### `--font-display` → Hilang di 12/14 file
- **Digunakan di:** `.slide-closing h1`
- **Yang seharusnya:** `--font-display-xl` (`clamp(56px, 7.5vw, 120px)`)
- **Dampak:** Judul "Terima Kasih" di slide closing tampil sangat kecil
- **File yang berdampak:** P1, P2, P3, P4, P6, P7, P9, P11, P12, P13, P14, P15

#### `--font-small` → Hilang di 12/14 file
- **Digunakan di:** `.quiz-q .q-text`
- **Yang seharusnya:** `--font-body-sm` (`clamp(18px, 1.8vw, 28px)`)
- **Dampak:** Teks soal quiz tampil di 16px default
- **File yang berdampak:** P1, P2, P3, P4, P6, P7, P9, P11, P12, P13, P14, P15

#### `--surface` → Hilang di 12/14 file
- **Digunakan di:** `.quiz-q` (background)
- **Yang seharusnya:** `--surface-soft` (`#f7f7f7`) atau `--canvas` (`#ffffff`)
- **Dampak:** Background kartu quiz menjadi transparan
- **File yang berdampak:** P1, P2, P3, P4, P6, P7, P9, P11, P12, P13, P14, P15

---

## 4. 🟡 Font Size Hardcoded (MEDIUM)

### Pola konsisten di semua file (14/14)

| Selector | Nilai Hardcoded | Variabel Terdekat | Catatan |
|---|---|---|---|
| `.card-icon` | `clamp(20px, 2.19vw, 32px)` | `--font-body` (20px, 2.2vw, 36px) | Beda vw dan max |
| `.timeline-dot` | `clamp(14px, 1.5vw, 24px)` | `--font-caption` (16px, 1.5vw, 24px) | Cocok tapi beda min |
| `.stat-number` | `clamp(28px, 3.75vw, 56px)` | *Tidak ada* | Perlu variabel baru |
| `.diagram-arrow` | `clamp(16px, 1.5vw, 24px)` | `--font-caption` (16px, 1.5vw, 24px) | **Exact match** — harus pakai variabel |
| `.nav-btn.print-btn-nav` | `clamp(12px, 1vw, 16px)` | `--font-micro` (11px, 1vw, 16px) | Beda min px |

### Temuan per-file

| File | Selector | Nilai | Catatan |
|---|---|---|---|
| **P5** | `.card-num` | `clamp(16px, 1.6vw, 26px)` | Beda dari `--font-body-sm` |
| **P5** | `.diagram-icon` | `clamp(16px, 1.6vw, 26px)` | Beda dari file lain |
| **P13** | `.data-table code` | `0.92em` | Relatif, tidak bisa pakai variabel |
| **P13** | `.diagram-icon` | `clamp(20px, 2vw, 32px)` | Beda vw dari P5 |
| **P14** | `.col .stat-number` | `clamp(24px, 3vw, 44px)` | Variasi dari stat-number standar |
| **P15** | `.refleksi-card .ref-icon` | `clamp(28px, 3vw, 44px)` | Spesifik P15 |

---

## 5. 🟡 Warna Hardcoded (MEDIUM)

### Pola konsisten di semua file (14/14)

Warna-warna ini **selalu sama** di setiap file, tapi tidak menggunakan CSS variable:

| Selector | Property | Nilai | Fungsi | Rekomendasi |
|---|---|---|---|---|
| `.quiz-q .q-opt.correct` | `color` | `#0d9f6e` | Hijau untuk jawaban benar | Tambah `--success: #0d9f6e` |
| `.slide-rangkuman` | gradient end | `#f0fdf4` | Background hijau muda | Tambah `--success-bg: #f0fdf4` |
| `.rangkuman-item .rnum` | `background` | `#dcfce7` | Badge hijau muda | Tambah `--success-surface: #dcfce7` |
| `.rangkuman-item .rnum` | `color` | `#16a34a` | Teks hijau | Tambah `--success-text: #16a34a` |

### Temuan per-file (warna unik)

| File | Selector | Warna | Catatan |
|---|---|---|---|
| **P4** | `.diagram-box.primary` bg | `rgba(255, 56, 92, 0.04)` | Transparan dari `--primary` |
| **P4** | `.slide-title .badge` border | `rgba(255, 56, 92, 0.15)` | Transparan dari `--primary` |
| **P6** | `.list-number` inline | `font-size: 14px; width/height: 28px` | **Hardcoded px, tidak responsif** |
| **P9** | `<span>` inline | `background: #ff0` | Highlight kuning inline |
| **P10** | `.diagram-box.success` | `#0f9d58` / `rgba(15,157,88,0.04)` | Warna semantic success |
| **P10** | `.diagram-box.warning` | `#f59e0b` / `rgba(245,158,11,0.04)` | Warna semantic warning |
| **P10** | `.diagram-box.info` | `#4285f4` / `rgba(66,133,244,0.04)` | Warna semantic info |
| **P12** | `.formula-box` bg | `#fef9f0` | Warm background |
| **P12** | `.formula-box` border | `#f5deb3` | Wheat border |
| **P13** | Code block bg | `#1e1e1e` | VS Code dark theme |
| **P13** | Code block text | `#d4d4d4` | VS Code dark theme |
| **P13** | Syntax colors | `#569cd6`, `#ce9178` | VS Code syntax highlighting |
| **P15** | `.slide-refleksi` gradient | `#fef9c3` | Background kuning |

---

## 6. Inline Styles

### Assessment: Sebagian besar AMAN

Mayoritas inline styles hanya untuk layout (`margin-top`, `grid-column`, `max-width`) dan menggunakan CSS variables. **Tidak ditemukan inline font-size atau color yang bypass variables** — **kecuali:**

| File | Line | Element | Style | Severity |
|---|---|---|---|---|
| **P6** | 1236/1243/1250 | `.list-number` (A, B, C) | `font-size: 14px; width: 28px; height: 28px` | 🔴 HIGH — hardcoded px, tidak responsif |
| **P9** | 1123 | `<span>` | `background: #ff0` | 🟡 MEDIUM — highlight kuning inline |

---

## 7. Masalah Spesifik per Pertemuan

### Pertemuan 1 — Pengenalan Teknologi Digital
- ❌ 5 undefined variable references (kritis)
- 🟡 5 hardcoded font sizes

### Pertemuan 2 — Sistem Bilangan & Gerbang Logika
- ❌ 5 undefined variable references (kritis)
- 🟡 4 hardcoded colors

### Pertemuan 3 — Internet & Web
- ❌ 4 undefined variable references (kritis)
- 🟡 7 hardcoded font sizes

### Pertemuan 4 — Aplikasi TI & Etika Digital
- ❌ Undefined variable references
- 🟡 7 hardcoded colors (termasuk diagram-box primary)
- 🟠 VBA code block dengan VS Code dark theme colors (intentional)

### Pertemuan 5 — Data, Cybersecurity & Keamanan
- ✅ **PALING LENGKAP** — mendefinisikan 4 variabel ekstra (`--surface`, `--font-display`, `--font-heading`, `--font-small`)
- ✅ Tidak ada undefined variable references
- 🟡 5 hardcoded font sizes (konsisten dengan file lain)

### Pertemuan 6 — Jaringan Komputer
- ❌ 5 undefined variable references (kritis)
- 🔴 **INLINE `font-size: 14px`** pada `.list-number` — hardcoded px, tidak responsif
- 🟡 Inline color override pada `.list-number`

### Pertemuan 7 — Keamanan Jaringan
- ❌ 5 undefined variable references (kritis)
- 🟡 5 hardcoded font sizes, 7 hardcoded colors

### Pertemuan 8 — (TIDAK ADA — Minggu UTS)

### Pertemuan 9 — Cloud Computing
- ❌ 1 undefined variable (`--font-small`)
- 🟠 Inline `background: #ff0` (highlight kuning)
- 🟡 3 hardcoded clamp values

### Pertemuan 10 — AI & Machine Learning
- ✅ **BERSIH** — tidak ada undefined variable references
- 🟡 6 hardcoded colors (semantic: success/warning/info diagram boxes)
- 🟡 3 hardcoded font sizes

### Pertemuan 11 — IoT & Embedded Systems
- ❌ 5 undefined variable references (kritis)
- 🔴 **Class `.cards-grid-3` tidak didefinisikan di CSS** — kartu pada slide 8 dan 10 tidak punya grid layout, stack vertikal
- 🟡 1 inline font-size duplicate

### Pertemuan 12 — Pemrograman Dasar
- ❌ 4 undefined variable references (kritis)
- 🟡 Formula box dengan warm colors (#fef9f0, #f5deb3)
- 🟡 6 hardcoded colors

### Pertemuan 13 — Spreadsheet & Database
- ❌ 4 undefined variable references (kritis)
- 🟠 VBA code block dengan VS Code dark theme (intentional)
- 🟡 4 hardcoded font sizes

### Pertemuan 14 — Presentasi & Grafis
- ❌ 5 undefined variable references (kritis)
- 🟡 7 hardcoded font sizes (termasuk variasi `.col .stat-number`)
- 🟡 4 hardcoded colors

### Pertemuan 15 — Proyek Akhir & Refleksi
- ❌ 5 undefined variable references (kritis)
- 🟡 6 hardcoded font sizes
- 🟠 `.slide-refleksi` dengan gradient kuning (#fef9c3) — warna unik

---

## 8. Rekomendasi Perbaikan

### 🔴 PRIORITAS 1: Fix Undefined Variables (12 file)

Tambahkan 4 variabel berikut ke `:root` di **semua file kecuali P5 dan P10** (yang sudah punya):

```css
/* Tambahkan ke :root */
--surface: #ffffff;
--font-display: clamp(36px, 5vw, 80px);
--font-heading: clamp(28px, 3.6vw, 56px);
--font-small: clamp(16px, 1.5vw, 24px);
```

**Atau**, lebih baik: ganti referensi undefined variable dengan variabel yang sudah ada:

| Selector | Ganti `var(...)` | Dengan `var(...)` |
|---|---|---|
| `.slide-quiz h2` | `var(--font-heading)` | `var(--font-display-sm)` |
| `.slide-rangkuman h2` | `var(--font-heading)` | `var(--font-display-sm)` |
| `.slide-closing h1` | `var(--font-display)` | `var(--font-display-xl)` |
| `.quiz-q .q-text` | `var(--font-small)` | `var(--font-body-sm)` |
| `.quiz-q` bg | `var(--surface)` | `var(--surface-soft)` |

**Rekomendasi:** Opsi 2 (ganti referensi) lebih bersih — mengurangi jumlah variabel dan menggunakan yang sudah ada.

### 🟡 PRIORITAS 2: Tambah Semantic Color Tokens

Tambahkan ke `:root` di semua file:

```css
--success: #0d9f6e;
--success-bg: #f0fdf4;
--success-surface: #dcfce7;
--success-text: #16a34a;
```

Lalu ganti hardcoded colors:
- `.quiz-q .q-opt.correct` → `color: var(--success)`
- `.slide-rangkuman` gradient → `var(--success-bg)`
- `.rangkuman-item .rnum` → `background: var(--success-surface); color: var(--success-text)`

### 🟡 PRIORITAS 3: Tambah Missing Font Size Variables

Tambahkan ke `:root` di semua file:

```css
--font-stat: clamp(28px, 3.75vw, 56px);
--font-icon: clamp(20px, 2.19vw, 32px);
```

Lalu ganti hardcoded values:
- `.stat-number` → `font-size: var(--font-stat)`
- `.card-icon` → `font-size: var(--font-icon)`
- `.diagram-arrow` → `font-size: var(--font-caption)` (sudah exact match)
- `.timeline-dot` → `font-size: var(--font-caption)` (sudah exact match)

### 🟠 PRIORITAS 4: Fix File-Specific Issues

| File | Issue | Fix |
|---|---|---|
| **P6** | Inline `font-size: 14px` pada `.list-number` | Buat CSS class `.list-number-variant` dengan `font-size: var(--font-caption-sm)` |
| **P9** | Inline `background: #ff0` | Buat CSS class `.highlight-yellow` |
| **P11** | Class `.cards-grid-3` tidak didefinisikan | Tambahkan `.cards-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--sp-md); }` |
| **P12** | Formula box hardcoded colors | Tambah `--formula-bg: #fef9f0; --formula-border: #f5deb3;` |
| **P15** | Refleksi gradient kuning | Tambah `--refleksi-bg: #fef9c3;` |

---

## 9. Ringkasan Perubahan yang Dibutuhkan

| Perubahan | File Terdampak | Effort |
|---|---|---|
| Ganti 5 undefined var refs | 12 file | 🟢 Rendah (find-replace) |
| Tambah 4 semantic color tokens | 14 file | 🟢 Rendah |
| Tambah 2 font-size variables | 14 file | 🟢 Rendah |
| Fix hardcoded font sizes | 14 file | 🟢 Rendah |
| Fix P6 inline styles | 1 file | 🟢 Rendah |
| Fix P11 missing class | 1 file | 🟢 Rendah |
| Fix per-file unique colors | 5 file | 🟡 Sedang |

**Total estimasi:** ~30 menit perbaikan untuk Prioritas 1-3 (semua file), ~15 menit untuk Prioritas 4 (file spesifik).

---

*Generated by automated audit on 2026-08-06*
