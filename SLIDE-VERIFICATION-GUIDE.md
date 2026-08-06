# Slide Verification Guide — Dasar Teknologi Digital

Panduan lengkap untuk memverifikasi dan memperbaiki slide HTML agar konsisten di semua pertemuan.

---

## 1. Design System Reference

### CSS Variables (wajib ada di `:root` setiap file)

```css
/* Colors */
--canvas: #ffffff;
--surface-soft: #f7f7f7;
--surface-strong: #f2f2f2;
--hairline: #dddddd;
--ink: #222222;
--body: #3f3f3f;
--muted: #6a6a6a;
--primary: #ff385c;
--primary-disabled: #ffd1da;

/* Font Scale (responsive via clamp) */
--font-display-xl:  clamp(56px, 7.5vw, 120px);  /* Title slide h1 */
--font-display-lg:  clamp(44px, 5.8vw,  92px);   /* Closing h1 */
--font-display-sm:  clamp(32px, 4.2vw,  68px);   /* Section h2 */
--font-title:       clamp(26px, 3.2vw,  52px);   /* Card h3 */
--font-body:        clamp(20px, 2.2vw,  36px);   /* Body text */
--font-body-sm:     clamp(18px, 1.8vw,  28px);   /* Quiz text */
--font-caption:     clamp(16px, 1.5vw,  24px);   /* Meta, tags */
--font-caption-sm:  clamp(14px, 1.3vw,  20px);   /* Footer */
--font-micro:       clamp(11px, 1vw,    16px);   /* Badges */

/* Spacing */
--sp-xs:   clamp(6px,  0.5vw,  10px);
--sp-sm:   clamp(8px,  0.8vw,  14px);
--sp-md:   clamp(14px, 1.2vw,  20px);
--sp-lg:   clamp(26px, 2.4vw,  40px);
--sp-xl:   clamp(36px, 3.2vw,  52px);
--sp-page: clamp(40px, 6vw,    96px);
```

### ⚠️ Variabel yang TIDAK BOLEH dipakai (tidak didefininikan)
- `--font-heading` → gunakan `--font-display-sm`
- `--font-display` (tanpa suffix) → gunakan `--font-display-lg`
- `--font-small` → gunakan `--font-body-sm`
- `--surface` (tanpa suffix) → gunakan `--canvas` atau `--surface-soft`

---

## 2. Slide Types & Expected Structure

Setiap file HTML harus memiliki slide-slide berikut dalam urutan ini:

### 2.1 Title Slide (`slide-title`)
**Slide 1** — Pembuka pertemuan

```html
<div class="slide slide-title active" data-slide="1">
    <div class="title-header">
        <div class="header-logos">
            <img src="assets/dikti-saintek-1.png" alt="DIKTI Saintek Berdampak">
            <img src="assets/itera-1.png" alt="ITERA">
        </div>
    </div>
    <h1>Judul Pertemuan</h1>
    <p class="subtitle">Deskripsi singkat materi pertemuan</p>
    <div class="meta">
        <div class="meta-item"><span>Dasar Teknologi Digital</span></div>
        <div class="meta-item"><span>&middot;</span></div>
        <div class="meta-item"><span>Pertemuan N</span></div>
    </div>
    <div class="slide-footer">
        <span>Pertemuan N — Dasar Teknologi Digital</span>
        <span>1 / TOTAL</span>
    </div>
</div>
```

**Checklist:**
- [ ] Class: `slide slide-title active` (TANPA duplikat seperti `slide active slide-title active slide-title active`)
- [ ] Ada `title-header` dengan 2 logo
- [ ] Ada `<h1>` dengan judul
- [ ] Ada `<p class="subtitle">` dengan deskripsi
- [ ] Ada `<div class="meta">` dengan 3 item
- [ ] Ada `<div class="slide-footer">` dengan nomor slide
- [ ] Ada closing `</div>`

---

### 2.2 Agenda Slide (`slide-full`)
**Slide 2** — Daftar agenda pertemuan

```html
<div class="slide slide-full" data-slide="2">
    <h2>Agenda Pertemuan</h2>
    <div class="list-items">
        <div class="list-item">
            <div class="list-number">1</div>
            <div><h4>Topik 1</h4><p>Deskripsi singkat</p></div>
        </div>
        <!-- ... more items ... -->
    </div>
    <div class="slide-footer">
        <span>Pertemuan N — Dasar Teknologi Digital</span>
        <span>2 / TOTAL</span>
    </div>
</div>
```

**Checklist:**
- [ ] Class: `slide slide-full`
- [ ] Ada `<h2>` dengan judul
- [ ] Ada `<div class="list-items">` dengan item-item (minimal 4 item)
- [ ] Setiap item punya `list-number` dan deskripsi
- [ ] Ada `<div class="slide-footer">`
- [ ] Ada closing `</div>`

---

### 2.3 Content Slide — Two Column (`slide-content`)
**Slide konten utama** — Layout 2 kolom (kiri: teks, kanan: visual)

```html
<div class="slide slide-content" data-slide="N">
    <div class="content-left">
        <h2>Judul Section</h2>
        <p class="body-text">Paragraf penjelasan...</p>
        <!-- opsional: highlight-box, tags, quote-block, dll -->
    </div>
    <div class="content-right">
        <div class="visual-block">
            <div class="visual-icon-large">🖼️</div>
            <div class="visual-label">Label visual</div>
        </div>
    </div>
    <div class="slide-footer">
        <span>Pertemuan N — Dasar Teknologi Digital</span>
        <span>X / TOTAL</span>
    </div>
</div>
```

**Checklist:**
- [ ] Class: `slide slide-content`
- [ ] Ada `<div class="content-left">` dengan konten
- [ ] **WAJIB** ada `<div class="content-right">` dengan visual — tanpa ini layout patah (kolom kanan kosong)
- [ ] `content-left` punya `<h2>` dan minimal 1 paragraf/blok
- [ ] `content-right` punya `visual-block` atau `diagram-container`
- [ ] Ada `<div class="slide-footer">`
- [ ] Ada closing `</div>`

**⚠️ Pelajaran dari audit:** Slide yang hanya punya `content-left` tanpa `content-right` menyebabkan kolom kanan kosong dan layout tidak rapi. Selalu isi `content-right`.

---

### 2.4 Full-width Content Slide (`slide-full`)
**Slide konten penuh** — Layout full-width untuk kartu, diagram, timeline, dll

```html
<div class="slide slide-full" data-slide="N">
    <h2>Judul Section</h2>
    <div class="cards-grid">  <!-- atau diagram-container, timeline, two-col, dll -->
        <!-- konten -->
    </div>
    <div class="slide-footer">
        <span>Pertemuan N — Dasar Teknologi Digital</span>
        <span>X / TOTAL</span>
    </div>
</div>
```

**Checklist:**
- [ ] Class: `slide slide-full`
- [ ] Ada `<h2>` dengan judul
- [ ] Konten menggunakan komponen yang valid (cards-grid, diagram-container, timeline, two-col)
- [ ] Ada `<div class="slide-footer">`
- [ ] Ada closing `</div>`

---

### 2.5 Quiz Slide (`slide-quiz`)
**Slide post-test** — Soal dan jawaban

```html
<div class="slide slide-quiz" data-slide="N">
    <h2>Post-Test: Uji Pemahaman</h2>
    <div class="quiz-grid">
        <div class="quiz-q">
            <div class="q-text">1. Pertanyaan?</div>
            <div class="q-options">
                <div class="q-opt">A. Pilihan</div>
                <div class="q-opt">B. Pilihan</div>
                <div class="q-opt correct">C. Jawaban ✓</div>  <!-- hanya di slide jawaban -->
                <div class="q-opt">D. Pilihan</div>
            </div>
        </div>
        <!-- ... more questions ... -->
    </div>
    <div class="slide-footer">
        <span>Pertemuan N — Dasar Teknologi Digital</span>
        <span>X / TOTAL</span>
    </div>
</div>
```

**Checklist:**
- [ ] Class: `slide slide-quiz`
- [ ] Ada `<h2>` dengan judul
- [ ] Ada `<div class="quiz-grid">` dengan soal-soal (minimal 3 soal)
- [ ] Setiap soal punya `q-text` dan `q-options`
- [ ] Slide jawaban: opsi benar punya class `correct`
- [ ] Ada `<div class="slide-footer">`
- [ ] Ada closing `</div>`

---

### 2.6 Summary Slide (`slide-rangkuman`)
**Slide rangkuman** — Poin-poin penting

```html
<div class="slide slide-rangkuman" data-slide="N">
    <h2>Rangkuman Pertemuan N</h2>
    <div class="rangkuman-list">
        <div class="rangkuman-item">
            <div class="rnum">1</div>
            <span><strong>Poin penting</strong> — penjelasan singkat.</span>
        </div>
        <!-- ... more items ... -->
    </div>
    <div class="slide-footer">
        <span>Pertemuan N — Dasar Teknologi Digital</span>
        <span>X / TOTAL</span>
    </div>
</div>
```

**Checklist:**
- [ ] Class: `slide slide-rangkuman`
- [ ] **TIDAK** ada `<div class="overline">` — langsung mulai dari `<h2>`
- [ ] `<h2>` menggunakan format `Rangkuman Pertemuan N` (bukan "Poin-Poin Penting")
- [ ] Ada `<div class="rangkuman-list">` dengan item-item
- [ ] Setiap item punya `rnum` dan span
- [ ] Ada `<div class="slide-footer">`
- [ ] Ada closing `</div>`

**⚠️ Catatan:** CSS `.slide-rangkuman` harus punya `overflow: visible` agar footer absolut tidak ter-clip.

---

### 2.7 Closing Slide (`slide-closing`)
**Slide terakhir** — Penutup pertemuan

```html
<div class="slide slide-closing" data-slide="N">
    <h1>Terima Kasih</h1>
    <p class="closing-subtitle">Quote atau motivasi singkat...</p>
    <p class="closing-meta">Pertemuan N+1: Topik Berikutnya</p>
    <div class="slide-footer">
        <span>Pertemuan N — Dasar Teknologi Digital</span>
        <span>TOTAL / TOTAL</span>
    </div>
</div>
```

**Checklist:**
- [ ] Class: `slide slide-closing`
- [ ] Ada `<h1>` dengan judul penutup
- [ ] Ada `<p class="closing-subtitle">` dengan quote/motivasi
- [ ] Ada `<p class="closing-meta">` dengan preview pertemuan berikutnya
- [ ] Ada `<div class="slide-footer">`
- [ ] Ada closing `</div>`

**⚠️ Catatan:** CSS `.slide-closing` harus punya `overflow: visible` agar footer absolut tidak ter-clip.

---

## 3. Font Size Hierarchy

| Element | CSS Variable | Contoh |
|---|---|---|
| Title slide h1 | `var(--font-display-xl)` | ~56-120px |
| Closing h1 | `var(--font-display-lg)` | ~44-92px |
| Section h2 | `var(--font-display-sm)` | ~32-68px |
| Card h3 | `var(--font-title)` | ~26-52px |
| Body text | `var(--font-body)` | ~20-36px |
| Quiz text | `var(--font-body-sm)` | ~18-28px |
| Meta/caption | `var(--font-caption)` | ~16-24px |
| Footer | `var(--font-caption-sm)` | ~14-20px |

**Prinsip:** Ukuran font harus proporsional — heading lebih besar dari body, body lebih besar dari caption. Jangan gunakan ukuran yang sama untuk elemen yang berbeda level.

---

## 4. Visual Consistency Rules

### 4.1 Warna
- **Teks utama:** `var(--ink)` (#222222)
- **Teks body:** `var(--body)` (#3f3f3f)
- **Teks muted:** `var(--muted)` (#6a6a6a)
- **Background:** `var(--canvas)` (#ffffff)
- **Background soft:** `var(--surface-soft)` (#f7f7f7)
- **Aksen:** `var(--primary)` (#ff385c)
- **Hijau (quiz correct):** `#0d9f6e` atau `#16a34a`

### 4.2 Spacing
- **Page padding:** `var(--sp-page)` untuk konten utama
- **Gap antar elemen:** `var(--sp-md)` atau `var(--sp-lg)`
- **Margin bawah heading:** `var(--sp-lg)` untuk h2, `var(--sp-md)` untuk h3

### 4.3 Border & Radius
- **Card border:** `1px solid var(--hairline)`
- **Card radius:** `var(--radius-md)`
- **Badge radius:** `999px` (pill)

### 4.4 Quote Block
```css
.quote-block {
    background: var(--surface-soft);
    border-left: clamp(3px, 0.31vw, 5px) solid var(--primary);
    border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
    padding: var(--sp-lg) var(--sp-xl);
    margin: var(--sp-md) 0;
}
.quote-block p {
    font-family: Georgia, 'Times New Roman', serif;
    font-size: var(--font-body);        /* selevel body text, BUKAN font-title */
    font-style: italic;
    font-weight: 400;
    line-height: 1.4;                   /* lebih rapat dari body (1.5) */
    color: var(--ink);
}
.quote-block cite {
    font-family: 'Inter', -apple-system, system-ui, sans-serif;
    font-size: var(--font-caption-sm);
    font-style: normal;
}
```

**Prinsip:** Quote block harus terlihat berbeda dari body text — italic + serif untuk kesan elegan, line-height lebih rapat (1.4), font size selevel body (bukan lebih besar).

### 4.5 Slide Layout Centering
```css
.slide-full {
    flex-direction: column;
    padding: var(--sp-page) var(--sp-page) var(--sp-2xl);
}
.slide-full > * {
    width: 100%;
}
.slide-full > .timeline,
.slide-full > .diagram-container,
.slide-full > .two-col,
.slide-full > .cards-grid,
.slide-full > .stats-row {
    margin: auto 0;             /* pusatkan konten utama di sisa ruang */
}
/* .list-items TIDAK dipusatkan — tetap dekat dengan h2 */
```

**Prinsip:** 
- **h2 selalu di atas** dengan margin konsisten dari `--sp-page`
- **Konten visual dipusatkan** di sisa ruang setelah h2 (timeline, diagram, cards, two-col, stats)
- **List items (agenda) TIDAK dipusatkan** — tetap dekat di bawah h2
- Footer tetap di bawah dengan `position: absolute; bottom`

---

## 5. CSS Requirements Per Slide Type

| Slide Type | `overflow` | Notes |
|---|---|---|
| `.slide` (base) | **`visible`** | **WAJIB** — agar footer absolut tidak ter-clip di semua slide |
| `.slide-title` | (inherit: visible) | Tidak perlu override |
| `.slide-full` | (inherit: visible) | Tidak perlu override |
| `.slide-content` | (inherit: visible) | Tidak perlu override |
| `.slide-quiz` | (inherit: visible) | Quiz grid punya `overflow: hidden` internal |
| `.slide-rangkuman` | (inherit: visible) | Tidak perlu override |
| `.slide-closing` | (inherit: visible) | Tidak perlu override |

**⚠️ Solusi:** Base `.slide` menggunakan `overflow: visible` sehingga semua footer absolut terlihat. Tidak perlu override per-slide type.

---

## 6. JavaScript Requirements

Setiap file HTML **wajib** memiliki fungsi-fungsi berikut:

```javascript
let currentSlide = 1;
const totalSlides = N;  // sesuai jumlah slide

function changeSlide(direction) { ... }
function goToSlide(slideNumber) { ... }

// WAJIB ADA — tombol print memanggil fungsi ini
function printSlides() {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(s => { s.style.display = 'flex'; });
    window.print();
    setTimeout(() => {
        slides.forEach(s => { s.style.display = ''; });
        goToSlide(currentSlide);
    }, 500);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) { ... });

// Touch navigation
document.addEventListener('touchstart', ...);
document.addEventListener('touchend', ...);

// Initialize
goToSlide(1);
```

**Checklist:**
- [ ] `changeSlide()` ada
- [ ] `goToSlide()` ada
- [ ] **`printSlides()` ada** — tombol 🖨️ memanggil fungsi ini
- [ ] Keyboard navigation (Arrow keys, Home, End)
- [ ] Touch navigation (swipe)
- [ ] `goToSlide(1)` dipanggil di akhir

---

## 7. Verification Checklist Per File

Untuk setiap file `pertemuan-N.html`, verifikasi:

### 7.1 Struktur Dasar
- [ ] `<!DOCTYPE html>` dan `<html lang="id">`
- [ ] `<meta charset="UTF-8">` dan viewport
- [ ] `<title>` sesuai pertemuan
- [ ] CSS `:root` lengkap dengan semua variabel
- [ ] Google Fonts import (`Inter`)
- [ ] `<div class="presentation">` sebagai container
- [ ] `<div class="progress-bar">`
- [ ] Navigation controls (prev, next, counter, print)
- [ ] JavaScript navigasi (keyboard, touch, click, print)

### 7.2 Slide-per-Slide
Untuk setiap slide, verifikasi:
- [ ] Class sesuai tipenya (slide-title, slide-full, slide-content, dll)
- [ ] `data-slide="N"` berurutan dari 1
- [ ] Ada `<h1>` atau `<h2>` sesuai tipe
- [ ] Konten lengkap (tidak ada tag yang terpotong)
- [ ] Ada `<div class="slide-footer">` dengan nomor slide
- [ ] Ada closing `</div>` untuk slide
- [ ] Tidak ada class duplikat

### 7.3 CSS Variables
- [ ] Tidak ada referensi ke variabel yang tidak didefinisikan
- [ ] Font size menggunakan variabel, bukan hardcoded (kecuali clamp)
- [ ] Warna menggunakan variabel, bukan hardcoded (kecuali yang memang spesifik)

### 7.4 Konten
- [ ] Gambar (`<img>`) punya `alt` text
- [ ] Emoji konsisten (tidak ada yang hilang atau salah)
- [ ] Tidak ada placeholder atau TODO
- [ ] Link dan referensi valid

---

## 8. Common Issues & Fixes

### Issue 1: Slide missing closing `</div>`
**Symptom:** Slide berikutnya "masuk" ke slide sebelumnya
**Fix:** Tambahkan `</div>` setelah konten terakhir slide, sebelum komentar slide berikutnya

### Issue 2: Missing `slide-footer`
**Symptom:** Tidak ada nomor slide di bagian bawah
**Fix:** Tambahkan `<div class="slide-footer"><span>Pertemuan N — Dasar Teknologi Digital</span><span>X / TOTAL</span></div>`

### Issue 3: `slide-content` without `content-right`
**Symptom:** Layout patah, kolom kanan kosong
**Fix:** Tambahkan `<div class="content-right">` dengan visual block

### Issue 4: Duplicate classes
**Symptom:** `class="slide active slide-title active slide-title active"`
**Fix:** Bersihkan menjadi `class="slide slide-title active"`

### Issue 5: Undefined CSS variables
**Symptom:** Font size atau warna tidak sesuai (fallback ke browser default)
**Fix:** Ganti dengan variabel yang ada (lihat Section 1)

### Issue 6: Footer ter-clip di semua slide
**Symptom:** Nomor slide tidak muncul di beberapa halaman
**Fix:** 
1. Base `.slide` harus `overflow: visible` (bukan `hidden`)
2. Print media query `.slide` juga harus `overflow: visible`
3. Footer harus punya `z-index: 10` agar tidak tertimpa konten

### Issue 7: `printSlides()` tidak didefinisikan
**Symptom:** Tombol print (🖨️) tidak berfungsi, error di console
**Fix:** Tambahkan fungsi `printSlides()` di JavaScript (lihat Section 6)

### Issue 8: Rangkuman menggunakan "Poin-Poin Penting"
**Symptom:** Judul di slide rangkuman berbeda-beda
**Fix:** Gunakan format `Rangkuman Pertemuan N` (konsisten di semua file)

### Issue 9: Rangkuman punya overline
**Symptom:** Ada `<div class="overline">Rangkuman</div>` sebelum h2
**Fix:** Hapus overline, langsung mulai dari `<h2>`

---

## 9. Quick Verification Script

Jalankan script ini untuk cek cepat:

```bash
# Cek semua file punya slide-footer di setiap slide
for f in pertemuan-*.html; do
    slides=$(grep -c 'data-slide=' "$f")
    footers=$(grep -c 'slide-footer' "$f")
    if [ "$slides" != "$footers" ]; then
        echo "❌ $f: $slides slides tapi $footers footers"
    else
        echo "✅ $f: $slides slides, $footers footers"
    fi
done

# Cek variabel CSS yang tidak didefinisikan
for f in pertemuan-*.html; do
    issues=$(grep -oP 'var\(--(font-heading|font-display|font-small|surface)\)' "$f" | wc -l)
    if [ "$issues" -gt 0 ]; then
        echo "❌ $f: $issues undefined variable references"
    fi
done

# Cek class duplikat
for f in pertemuan-*.html; do
    dupes=$(grep -c 'slide-title active slide-title active' "$f")
    if [ "$dupes" -gt 0 ]; then
        echo "❌ $f: duplicate classes found"
    fi
done

# Cek printSlides function
for f in pertemuan-*.html; do
    if ! grep -q 'function printSlides' "$f"; then
        echo "❌ $f: missing printSlides() function"
    fi
done

# Cek base slide overflow
for f in pertemuan-*.html; do
    if grep -q '\.slide {' "$f"; then
        overflow=$(grep -A 8 '\.slide {' "$f" | grep 'overflow' | head -1)
        if echo "$overflow" | grep -q 'hidden'; then
            echo "❌ $f: base .slide masih overflow: hidden"
        fi
    fi
done

# Cek footer z-index
for f in pertemuan-*.html; do
    if grep -q '\.slide-footer' "$f"; then
        zindex=$(grep -A 10 '\.slide-footer {' "$f" | grep 'z-index')
        if [ -z "$zindex" ]; then
            echo "⚠️ $f: .slide-footer tidak punya z-index"
        fi
    fi
done

# Cek print media query overflow
for f in pertemuan-*.html; do
    if grep -q '@media print' "$f"; then
        print_overflow=$(grep -A 10 '@media print' "$f" | grep 'overflow: hidden')
        if [ -n "$print_overflow" ]; then
            echo "❌ $f: print media query masih overflow: hidden"
        fi
    fi
done

# Cek overline di rangkuman
for f in pertemuan-*.html; do
    if grep -q 'overline.*Rangkuman' "$f"; then
        echo "⚠️ $f: rangkuman masih punya overline"
    fi
done

# Cek h2 rangkuman
for f in pertemuan-*.html; do
    if grep -q 'Poin-Poin Penting' "$f"; then
        echo "⚠️ $f: rangkuman masih pakai 'Poin-Poin Penting'"
    fi
done
```

---

## 10. Audit Log

| Tanggal | File | Issue | Fix |
|---|---|---|---|
| 2026-08-06 | All (9 files) | Undefined CSS vars | `--font-heading` → `--font-display-sm`, dll |
| 2026-08-06 | pertemuan-1 | Title slide truncated | Tambah h1, subtitle, meta, footer |
| 2026-08-06 | pertemuan-1 | Slides 2-14 missing footer & closing div | Tambah footer dan closing div |
| 2026-08-06 | pertemuan-1 | Slides 3,8,9 missing content-right | Tambah visual block |
| 2026-08-06 | pertemuan-1 | Slide 12-13 only 1 quiz question | Tambah 4 soal lengkap |
| 2026-08-06 | pertemuan-1 | Rangkuman: "Poin-Poin Penting" | Ubah ke "Rangkuman Pertemuan 1" |
| 2026-08-06 | pertemuan-1 | Footer ter-clip di rangkuman/closing | Tambah `overflow: visible` |
| 2026-08-06 | pertemuan-1 | `printSlides()` tidak didefinisikan | Tambah fungsi |
| 2026-08-06 | pertemuan-1 | Rangkuman punya overline | Hapus overline |
| 2026-08-06 | pertemuan-1 | Quote-block: font terlalu besar, line-height renggang | Serif (Georgia), italic, font-body, line-height 1.4 |
| 2026-08-06 | pertemuan-1 | Timeline tidak terpusat | `.slide-full > .timeline` pakai `margin: auto 0` (h2 tetap di atas) |
| 2026-08-06 | pertemuan-1 | Footer ter-clip di semua slide | Base `.slide` ubah `overflow: hidden` → `visible`, print query fix, footer `z-index: 10` |

---

*Guide ini dibuat berdasarkan audit pertemuan-1.html dan berlaku untuk semua 14 file slide HTML.*
