#!/usr/bin/env python3
"""
Convert DTD archive/pertemuan-*.html decks from the legacy fullscreen
slide format to reveal.js.

For every archive/pertemuan-N.html a root-level pertemuan-N.html is
generated (the reveal.js build). The archive originals are left untouched.

The legacy page body holds:
    <div class="progress-bar">      -> dropped (reveal owns progress)
    <div class="presentation">      -> .reveal > .slides container
        <div class="slide ...">     -> <section class="slide ..."> (classes kept)
        ...
    <div class="nav-hover-zone">    -> dropped (reveal owns controls)
    <div class="nav-controls"> ...  -> dropped
    <script> legacy nav logic      -> dropped (reveal drives nav)
"""
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC_DIR = os.path.join(ROOT, "archive")
DECKS = ["pertemuan-%d.html" % n for n in range(1, 16) if n != 8]

# .html files that need no conversion (the index stays as-is)
ASSET_LINKS = {
    "reset": "assets/vendor/reveal/reset.css",
    "reveal": "assets/vendor/reveal/reveal.css",
    "slides": "assets/styles/slides-reveal.css",
    "deck": "assets/styles/reveal-deck.css",
    "fonts": "assets/styles/fonts.css",
    "font": "assets/fonts/inter-latin-var.woff2",
    "reveal_js": "assets/vendor/reveal/reveal.js",
    "notes": "assets/vendor/reveal/plugin/notes/notes.js",
    "zoom": "assets/vendor/reveal/plugin/zoom/zoom.js",
    "search": "assets/vendor/reveal/plugin/search/search.js",
}

HEAD = """<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <link rel="preload" href="{font}" as="font" type="font/woff2" crossorigin>
    <link rel="stylesheet" href="{fonts}">
    <link rel="stylesheet" href="{reset}">
    <link rel="stylesheet" href="{reveal}">
    <link rel="stylesheet" href="{slides}">
    <link rel="stylesheet" href="{deck}">
</head>
<body>
    <div class="reveal">
        <div class="slides">
"""

FOOT = """
        </div>
    </div>

    <script src="{reveal_js}"></script>
    <script src="{notes}"></script>
    <script src="{zoom}"></script>
    <script src="{search}"></script>
    <script>
        Reveal.initialize({{
            width: 1280,
            height: 720,
            margin: 0,
            minScale: 0.2,
            maxScale: 2.0,
            center: false,
            hash: true,
            controls: true,
            progress: true,
            slideNumber: false,
            transition: 'none',
            transitionSpeed: 'default',
            backgroundTransition: 'fade',
            overview: true,
            keyboard: true,
            touch: true,
            fragments: false,
            pdfSeparateFragments: false,
            plugins: [ RevealNotes, RevealZoom, RevealSearch ]
        }});

        // One-click PDF export parity with the legacy `?print=1` flow:
        // reveal renders paginated pages on `?print-pdf`; fire the print
        // dialog once layout settles.
        if ( /print-pdf/gi.test( window.location.search ) ) {{
            window.addEventListener( 'load', function () {{
                setTimeout( function () {{ window.print(); }}, 800 );
            }} );
        }}
    </script>
</body>
</html>
"""


def extract_title(html: str) -> str:
    m = re.search(r"<title>(.*?)</title>", html, re.S)
    return m.group(1).strip() if m else "Dasar Teknologi Digital"


# --- CSS transform: pin viewport units to the 1280x720 design canvas ----
# reveal.js already scales the fixed 1280x720 canvas to fit any window, so
# window-relative `vw`/`vh` (and any clamp() referencing them) would
# double-scale: shrink twice on small windows, grow twice on large ones.
# We evaluate every `vw`/`vh` against the design dimensions once, producing
# fixed px, so reveal becomes the sole scaling authority and proportions
# hold at every resolution. `px`/`em`/`rem` are left untouched — they scale
# correctly under reveal's uniform canvas transform.
DESIGN_W = 1280.0
DESIGN_H = 720.0


def _eval_len(s: str) -> str:
    """Convert vw/vh to px against the design canvas; pass through else."""
    s = s.strip()
    m = re.fullmatch(r"([+-]?\d*\.?\d+)(vw|vh)", s)
    if not m:
        return s  # px/em/rem/var()/keywords stay as-is
    num = float(m.group(1))
    if m.group(2) == "vw":
        return f"{num * DESIGN_W / 100:.2f}px"
    return f"{num * DESIGN_H / 100:.2f}px"


def _clamp_repl(m):
    inner = m.group(1).strip()
    if not inner or inner == "":
        return m.group(0)  # bare "clamp()" in a comment — leave untouched
    parts = [p.strip() for p in inner.split(",")]
    assert len(parts) == 3, f"bad clamp: {m.group(0)}"
    return "clamp(%s)" % ", ".join(_eval_len(p) for p in parts)


def generate_reveal_css() -> None:
    """Derive assets/styles/slides-reveal.css from slides.css.

    - Evaluate every vw/vh (standalone + inside clamp()) to fixed px.
    - Drop legacy @page / @media print / aspect-ratio media queries:
      reveal handles scaling and print pagination itself.
    """
    src = os.path.join(ROOT, "assets", "styles", "slides.css")
    with open(src, encoding="utf-8") as fh:
        css = fh.read()

    # 1) Fold viewport units inside clamp() first (they'd otherwise be
    #    double-processed by the standalone pass below).
    css = re.sub(r"clamp\(([^()]*)\)", _clamp_repl, css)

    # 2) Fold any remaining standalone vw/vh tokens.
    css = re.sub(r"[+-]?\d*\.?\d+(?:vw|vh)", lambda m: _eval_len(m.group(0)), css)

    # 3) Strip blocks that reveal-deck.css / reveal.js now own.
    #    @page + @media print are replaced by reveal's ?print-pdf flow.
    css = re.sub(r"@page\s*\{[^}]*\}", "", css)
    css = re.sub(r"@media\s+print\s*\{.*?\n\}", "", css, flags=re.S)
    #    aspect-ratio media queries target the *window*, not the fixed canvas;
    #    reveal's 16:9 canvas is invariant, so they'd misfire.
    css = re.sub(r"@media\s*\(max-aspect-ratio:[^)]*\)\s*\{.*?\n\}", "",
                 css, flags=re.S)
    #    The Google Fonts @import is replaced by self-hosted fonts.css
    #    (loaded via <link> in the deck, preloaded) — no FOUT, offline-safe.
    css = re.sub(r"@import\s+url\([^)]*\)\s*;", "", css)

    out = os.path.join(ROOT, "assets", "styles", "slides-reveal.css")
    with open(out, "w", encoding="utf-8") as fh:
        fh.write(css)
    print(f"generated {os.path.relpath(out, ROOT)} "
          f"({css.count('vw') + css.count('vh')} residual vw/vh)")



def _renumber_slides(body: str) -> str:
    """Renumber `data-slide` + slide-footer page counts in document order.

    After div->section conversion every slide is a flat sibling `<section>`,
    so splitting on the open tag yields one chunk per slide. This keeps the
    visible "N / M" footer and the data-slide attributes correct whenever a
    deck gains or loses slides (e.g. pertemuan-4's injected Hook + Referensi).
    Idempotent: decks whose footers are already 1..N come out unchanged.
    """
    parts = body.split("<section")
    total = len(parts) - 1
    out = [parts[0]]
    for i, chunk in enumerate(parts[1:], start=1):
        chunk = re.sub(r'data-slide="\d+"', f'data-slide="{i}"', chunk, count=1)
        chunk = re.sub(
            r'(<div class="slide-footer">.*?<span>)\d+\s*/\s*\d+(</span>)',
            rf'\g<1>{i} / {total}\g<2>',
            chunk, count=1, flags=re.S,
        )
        out.append("<section" + chunk)
    return "".join(out)


def build(deck: str) -> None:
    path = os.path.join(SRC_DIR, deck)
    with open(path, encoding="utf-8") as fh:
        html = fh.read()

    title = extract_title(html)

    # 1) Isolate the presentation wrapper: everything between the
    #    <div class="presentation"...> open tag and its matching close.
    open_m = re.search(r'<div\s+class="presentation"[^>]*>', html)
    if not open_m:
        raise SystemExit(f"{deck}: <div class='presentation'> not found")
    start = open_m.end()

    # Match the presentation's closing tag by balancing div depth from start.
    depth = 1
    i = start
    close_at = None
    for m in re.finditer(r'<div\b|</div\s*>', html[start:]):
        tag = m.group(0)
        if tag.startswith("</"):
            depth -= 1
            if depth == 0:
                close_at = start + m.start()
                break
        else:
            depth += 1
    if close_at is None:
        raise SystemExit(f"{deck}: could not balance presentation div")

    body = html[start:close_at]

    # Convert each <div class="slide ..."> to <section> and its matching
    # </div> to </section>, using a balanced tag walk (immune to whitespace
    # and to inner <div>s like .slide-footer, .content-left, etc.).
    VOID = {'br', 'img', 'input', 'hr', 'meta', 'link', 'source', 'area',
            'base', 'col', 'embed', 'param', 'track', 'wbr'}
    out = []
    stack = []  # list of (tag_name, is_slide)
    pos = 0
    for m in re.finditer(r'<[^>]+>', body):
        out.append(body[pos:m.start()])
        tag = m.group(0)
        if tag.startswith('</'):
            name = re.match(r'</\s*([a-zA-Z0-9-]+)', tag).group(1).lower()
            if stack and stack[-1][0] == name:
                _, is_slide = stack.pop()
                out.append('</section>' if is_slide else tag)
            else:
                out.append(tag)
        elif tag.startswith('<!') or tag.startswith('<?'):
            out.append(tag)
        else:
            name = re.match(r'<\s*([a-zA-Z0-9-]+)', tag).group(1).lower()
            if name in VOID or tag.rstrip().endswith('/>'):
                out.append(tag)
                pos = m.end()
                continue
            is_slide = (name == 'div'
                        and re.search(r'class="slide(?:\s|")', tag) is not None)
            if is_slide:
                new_tag = re.sub(r'^<\s*div', '<section', tag)
                new_tag = re.sub(r'\s+active(?=")', '', new_tag)
                out.append(new_tag)
                stack.append((name, True))
            else:
                out.append(tag)
                stack.append((name, False))
        pos = m.end()
    out.append(body[pos:])
    body = ''.join(out)

    # 6) Fold viewport units in *inline* style="" attributes. The CSS
    #    transform above only covers the stylesheet; a few decks carry
    #    `style="… vw …"` / `style="… clamp(…vw…) …"` inline, which would
    #    double-scale under reveal's uniform canvas transform. Reuse the
    #    same evaluators so inline + stylesheet stay in lockstep.
    #    Scope strictly to the style attribute value: slide text may
    #    legitimately contain "vw"/"vh" (e.g. code or abbreviations).
    def _fold_inline_styles(html: str) -> str:
        def repl(m):
            value = re.sub(r"clamp\(([^()]*)\)", _clamp_repl, m.group(1))
            value = re.sub(r"[+-]?\d*\.?\d+(?:vw|vh)",
                           lambda mm: _eval_len(mm.group(0)), value)
            return f'style="{value}"'
        return re.sub(r'style="([^"]*)"', repl, html)

    body = _fold_inline_styles(body)

    # 6b) Normalize the redundant inline 4-column grid override to the
    #     .cards-grid-4 component (correct gap for 4 columns, no inline
    #     style). Legacy source is left untouched.
    body = body.replace(
        'class="cards-grid" style="grid-template-columns: repeat(4, 1fr);"',
        'class="cards-grid-4"',
    )

    # 6c) Pertemuan-3 content fixes (legacy source untouched):
    #     - slide 12 "Semua Terhubung": restore the missing arrow between
    #       "Internet" and "Website + DB" (flow had 4 boxes / 2 arrows).
    #     - slide 15 "Literasi Digital": 4 cards on a 3-column .cards-grid
    #       leaves an orphan card; use the 2x2 .cards-grid-2 component.
    body = body.replace(
        '<h4>🌐 Internet</h4>\n'
        '                        <p>Jalur konektivitas</p>\n'
        '                    </div>\n'
        '                    <div class="diagram-box">\n'
        '                        <h4>🖥️ Website + DB</h4>',
        '<h4>🌐 Internet</h4>\n'
        '                        <p>Jalur konektivitas</p>\n'
        '                    </div>\n'
        '                    <div class="diagram-arrow">→</div>\n'
        '                    <div class="diagram-box">\n'
        '                        <h4>🖥️ Website + DB</h4>',
    )
    body = body.replace(
        '<h2>Literasi Digital</h2>\n            <div class="cards-grid">',
        '<h2>Literasi Digital</h2>\n            <div class="cards-grid-2">',
    )

    # 6d) Pertemuan-4 content fixes (legacy source untouched):
    #     - Drop `.visual-block` wrappers so the 3 photos render flat against
    #       `.content-right` (no rounded corner), matching pertemuan-1/2.
    #     - Post-test 5 -> 4: remove the redundant Q5 (UU ITE / hoax) which
    #       duplicates Q4's "etika digital" theme. Remaining 4 questions map
    #       1:1 to the 4 agenda items (Pendidikan, E-Government, Kesehatan,
    #       Etika) — no out-of-scope material.
    #     - Inject a Hook slide between title and agenda (deck 1-3 all have
    #       one; deck 4 was missing it) and a Referensi slide before closing.
    #     SCOPED to pertemuan-4: the anchors (`SLIDE 2: Agenda`, `.visual-block`,
    #     `SLIDE 14: Penutup`) also exist verbatim in other decks, so running
    #     this globally would inject deck-4 content everywhere.
    if deck == "pertemuan-4.html":
        _visual_unwrap = re.compile(
            r'<div class="visual-block">\s*'
            r'(<img src="[^"]+" alt="[^"]*" loading="lazy">)\s*'
            r'</div>',
            flags=re.S,
        )
        body = _visual_unwrap.sub(r"\1", body)

        # Remove Q5 by literal match (regex div-pairing left an orphan </div>).
        _quiz5_soal = (
            '                <div class="quiz-q" style="grid-column: 1 / -1; max-width: 50%;">\n'
            '                    <div class="q-text">5. UU ITE digunakan untuk menjerat pelaku penyebaran?</div>\n'
            '                    <div class="q-options">\n'
            '                        <div class="q-opt">A. Software open-source</div>\n'
            '                        <div class="q-opt">B. Konten edukasi</div>\n'
            '                        <div class="q-opt">C. Hoax dan ujaran kebencian</div>\n'
            '                        <div class="q-opt">D. Jurnal ilmiah</div>\n'
            '                    </div>\n'
            '                </div>\n'
        )
        _quiz5_jawab = (
            '                <div class="quiz-q" style="grid-column: 1 / -1; max-width: 50%;">\n'
            '                    <div class="q-text">5. UU ITE digunakan untuk menjerat pelaku penyebaran?</div>\n'
            '                    <div class="q-options">\n'
            '                        <div class="q-opt">A. Software open-source</div>\n'
            '                        <div class="q-opt">B. Konten edukasi</div>\n'
            '                        <div class="q-opt correct">C. Hoax dan ujaran kebencian ✓</div>\n'
            '                        <div class="q-opt">D. Jurnal ilmiah</div>\n'
            '                    </div>\n'
            '                </div>\n'
        )
        body = body.replace(_quiz5_soal, "")
        body = body.replace(_quiz5_jawab, "")

        # Hook slide (mirrors deck 1-3: stats-row + bullet-list + source line).
        hook = (
            '        <!-- ==================== SLIDE 2: Hook ==================== -->\n'
            '        <section class="slide slide-full" data-slide="2">\n'
            '            <h2>Teknologi Ada di Mana-mana</h2>\n'
            '            <div class="stats-row mb-md">\n'
            '                <div class="stat-box"><div class="stat-number">221jt</div><div class="stat-label">Pengguna internet<br>Indonesia (2025)</div></div>\n'
            '                <div class="stat-box"><div class="stat-number">8jam</div><div class="stat-label">Rata-rata waktu<br>online per hari</div></div>\n'
            '                <div class="stat-box"><div class="stat-number">130jt</div><div class="stat-label">Pengguna e-commerce<br>aktif di Indonesia</div></div>\n'
            '            </div>\n'
            '            <ul class="bullet-list mt-xl">\n'
            '                <li><strong>Kuliah</strong> — Zoom, Google Classroom, dan MOOC membuka akses belajar tanpa batas</li>\n'
            '                <li><strong>Berkas Kependudukan</strong> — Dukcapil Online, e-Filing pajak, dan LAPOR! menggantikan antrean fisik</li>\n'
            '                <li><strong>Kesehatan</strong> — telemedicine memungkinkan konsultasi dokter dari rumah</li>\n'
            '            </ul>\n'
            '            <p class="body-text text-source">Sumber: DataReportal (2026), APJII (2025)</p>\n'
            '            <div class="slide-footer"><span>Pertemuan 4 — Dasar Teknologi Digital</span><span>2 / 16</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            '        <!-- ==================== SLIDE 2: Agenda ==================== -->',
            hook + '        <!-- ==================== SLIDE 2: Agenda ==================== -->',
        )

        # Referensi slide before the closing slide.
        refs = (
            '        <!-- ==================== SLIDE 15: Referensi ==================== -->\n'
            '        <section class="slide slide-full" data-slide="15">\n'
            '            <h2 class="text-left">Referensi</h2>\n'
            '            <div class="reference-list">\n'
            '                <p>1. Bates, A.W. (2019). <em>Teaching in a Digital Age</em>. 2nd ed. Tony Bates Associates.</p>\n'
            '                <p>2. Laudon, K.C. &amp; Traver, C.G. (2022). <em>E-commerce 2021-2022: Business, Technology, Society</em>. 17th ed. Pearson.</p>\n'
            '                <p>3. Heeks, R. (2006). <em>Implementing and Managing eGovernment: An International Text</em>. SAGE Publications.</p>\n'
            '                <p>4. World Health Organization (2010). <em>Telemedicine: Opportunities and Developments in Member States</em>. WHO Press.</p>\n'
            '                <p>5. Wolfert, S., Ge, L., Verdouw, C., &amp; Bogaardt, M.J. (2017). "Big Data in Smart Farming – A review." <em>Agricultural Systems</em>, 153, 69-80.</p>\n'
            '                <p>6. Turban, E., King, D., Lee, J.K., Liang, T.P., &amp; Turban, D.C. (2018). <em>Electronic Commerce 2018</em>. Springer.</p>\n'
            '                <p>7. Undang-Undang No. 19 Tahun 2016 tentang Perubahan atas UU No. 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik.</p>\n'
            '                <p>8. DataReportal (2026). "Digital 2026: Indonesia." <em>datareportal.com/reports/digital-2026-indonesia</em></p>\n'
            '                <p>9. APJII (2025). "Survei Penetrasi Internet dan Perilaku Penggunaan Internet 2025." Asosiasi Penyelenggara Jasa Internet Indonesia.</p>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 4 — Dasar Teknologi Digital</span><span>15 / 16</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            '        <!-- ==================== SLIDE 14: Penutup ==================== -->',
            refs + '        <!-- ==================== SLIDE 16: Penutup ==================== -->',
        )

        # Slide 5 ("Teknologi di Berbagai Bidang") is a dual-side content slide
        # whose 3 topic blurbs (left) and 3 stats (right) read better as one
        # full-width card grid. Replace the whole slide.
        _slide5_new = (
            '        <section class="slide slide-full" data-slide="5">\n'
            '            <h2>Teknologi di Berbagai Bidang</h2>\n'
            '            <div class="cards-grid-3">\n'
            '                <div class="card"><div class="card-header"><div class="card-icon">🏥</div></div><div class="card-body"><h3>Kesehatan</h3><p><strong>Telemedicine</strong> memungkinkan konsultasi dokter dari rumah. AI membantu diagnosis dan wearable device memantau kesehatan real-time.</p><p><strong>20+ juta konsultasi/tahun</strong> di Indonesia.</p></div></div>\n'
            '                <div class="card"><div class="card-header"><div class="card-icon">🌾</div></div><div class="card-body"><h3>Pertanian</h3><p><strong>Precision farming</strong> menggunakan drone, sensor IoT, dan GPS untuk memantau tanaman serta memprediksi cuaca.</p><p><strong>+30% hasil panen</strong> dengan optimalisasi irigasi.</p></div></div>\n'
            '                <div class="card"><div class="card-header"><div class="card-icon">🚗</div></div><div class="card-body"><h3>Transportasi</h3><p>Ride-hailing (Gojek, Grab), navigasi GPS real-time, dan sistem ITS mengatur lalu lintas kota. Kendaraan otonom dan EV menjadi masa depan mobilitas.</p><p><strong>2+ juta mitra pengemudi</strong> aktif.</p></div></div>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 4 — Dasar Teknologi Digital</span><span>5 / 20</span></div>\n'
            '        </section>'
        )
        body = re.sub(
            r'<section class="slide slide-content" data-slide="5">.*?</section>',
            _slide5_new,
            body, count=1, flags=re.S,
        )

        # Deepen the ethics section (course material, NOT a SKILL rule).
        # Pedagogical flow: overview → hak/kewajiban (foundation) → applied
        # (komunikasi, email, mahasiswa) → contoh → studi kasus → diskusi.

        # Bridge slide between the "manfaat aplikasi" block and the "etika" block.
        bridge = (
            '        <!-- ==================== SLIDE 8: Bridge — Dari Manfaat ke Tanggung Jawab ==================== -->\n'
            '        <section class="slide slide-full" data-slide="8">\n'
            '            <h2>Dari Manfaat ke Tanggung Jawab</h2>\n'
            '            <div class="slide-center">\n'
            '                <p class="body-text text-caption-highlight">Teknologi memberi <strong>banyak manfaat</strong> — pendidikan, bisnis, kesehatan. Namun setiap kemudahan membawa <strong>tanggung jawab</strong>. Pertanyaannya: <strong>bagaimana kita menggunakannya secara etis?</strong></p>\n'
            '                <div class="diagram-container mt-lg">\n'
            '                    <div class="diagram-box">\n'
            '                        <h4>⚡ Manfaat</h4>\n'
            '                        <p>Pendidikan, bisnis,<br>kesehatan, komunikasi</p>\n'
            '                    </div>\n'
            '                    <div class="diagram-arrow">→</div>\n'
            '                    <div class="diagram-box">\n'
            '                        <h4>⚖️ Tanggung Jawab</h4>\n'
            '                        <p>Etika, privasi,<br>hak &amp; kewajiban</p>\n'
            '                    </div>\n'
            '                    <div class="diagram-arrow">→</div>\n'
            '                    <div class="diagram-box primary">\n'
            '                        <h4>🌱 Warga Digital</h4>\n'
            '                        <p>Bijak &amp; beretika<br>dalam berdigital</p>\n'
            '                    </div>\n'
            '                </div>\n'
            '                <p class="body-text text-caption mt-md">Manfaat teknologi hanya bermakna bila kita <strong>menggunakannya dengan bertanggung jawab.</strong></p>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 4 — Dasar Teknologi Digital</span><span>8 / 23</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            '        <!-- ==================== SLIDE 7: Etika Digital ==================== -->',
            bridge + '        <!-- ==================== SLIDE 7: Etika Digital ==================== -->',
        )

        # Extract "Hak & Kewajiban Digital" (foundation) so it can be moved
        # before the applied-ethics slides.
        _hak_re = re.compile(
            r'        <!-- ==================== SLIDE 8: Hak & Kewajiban Digital ==================== -->\n'
            r'        <section class="slide slide-content" data-slide="8">.*?</section>\n\n',
            flags=re.S,
        )
        _hak_m = _hak_re.search(body)
        _hak_block = _hak_m.group(0) if _hak_m else ""
        if _hak_m:
            body = _hak_re.sub("", body, count=1)

        _ethics = (
            '        <!-- ==================== SLIDE 8: Etika Berkomunikasi Digital ==================== -->\n'
            '        <section class="slide slide-full" data-slide="8">\n'
            '            <h2>Etika Berkomunikasi Digital</h2>\n'
            '            <div class="two-col">\n'
            '                <div class="col">\n'
            '                    <h3>✅ Lakukan</h3>\n'
            '                    <ul>\n'
            '                        <li>Gunakan bahasa yang sopan dan hormat</li>\n'
            '                        <li>Cek kebenaran informasi sebelum membagikan</li>\n'
            '                        <li>Hargai privasi dan minta izin sebelum menandai orang lain</li>\n'
            '                        <li>Berikan umpan balik yang membangun</li>\n'
            '                    </ul>\n'
            '                </div>\n'
            '                <div class="col">\n'
            '                    <h3>🚫 Hindari</h3>\n'
            '                    <ul>\n'
            '                        <li>Ujaran kebencian dan cyberbullying</li>\n'
            '                        <li>Menyebarkan hoax atau fitnah</li>\n'
            '                        <li>Kata kasar dan nada menyinggung</li>\n'
            '                        <li>Membagikan informasi pribadi orang lain</li>\n'
            '                    </ul>\n'
            '                </div>\n'
            '            </div>\n'
            '            <p class="body-text text-caption">Ingat <strong>THINK</strong> sebelum memposting: <strong>T</strong>rue (benar), <strong>H</strong>elpful (bermanfaat), <strong>I</strong>nspiring (menginspirasi), <strong>N</strong>ecessary (perlu), <strong>K</strong>ind (baik).</p>\n'
            '            <div class="slide-footer"><span>Pertemuan 4 — Dasar Teknologi Digital</span><span>8 / 20</span></div>\n'
            '        </section>\n\n'
            '        <!-- ==================== SLIDE 9: Contoh Komunikasi Digital ==================== -->\n'
            '        <section class="slide slide-full" data-slide="9">\n'
            '            <h2>Contoh: Komunikasi Digital</h2>\n'
            '            <div class="two-col">\n'
            '                <div class="col">\n'
            '                    <h3>✅ Komunikasi Baik</h3>\n'
            '                    <div class="quote-block">\n'
            '                        <p>"Selamat pagi, Pak. Mohon maaf mengganggu. Saya ingin bertanya tentang jadwal bimbingan minggu ini. Terima kasih."</p>\n'
            '                    </div>\n'
            '                    <p class="body-text text-caption">Sopan, jelas, menghargai waktu, dan langsung ke maksud.</p>\n'
            '                </div>\n'
            '                <div class="col">\n'
            '                    <h3>❌ Komunikasi Tidak Baik</h3>\n'
            '                    <div class="quote-block">\n'
            '                        <p>"PAK!! KAPAN BIMBINGAN?? BALAS DONG SEKARANG JUGA"</p>\n'
            '                    </div>\n'
            '                    <p class="body-text text-caption">Nada menuntut, huruf kapital (berteriak), tanpa salam dan kesopanan.</p>\n'
            '                </div>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 4 — Dasar Teknologi Digital</span><span>9 / 20</span></div>\n'
            '        </section>\n\n'
            '        <!-- ==================== SLIDE 10: Etika Mengirim Email ==================== -->\n'
            '        <section class="slide slide-full" data-slide="10">\n'
            '            <h2>Etika Mengirim Email</h2>\n'
            '            <div class="list-items">\n'
            '                <div class="list-item"><div class="list-number">1</div><div><h4>Subjek yang jelas</h4><p>Tuliskan inti email di baris subjek — jangan kosong atau terlalu umum.</p></div></div>\n'
            '                <div class="list-item"><div class="list-number">2</div><div><h4>Salam pembuka &amp; perkenalan</h4><p>Mulai dengan salam yang sopan dan perkenalkan diri secara singkat sebelum menyampaikan maksud.</p></div></div>\n'
            '                <div class="list-item"><div class="list-number">3</div><div><h4>Isi ringkas &amp; bahasa formal</h4><p>Sampaikan maksud dengan jelas, ringkas, dan bahasa yang formal. Hindari bahasa gaul dan singkatan.</p></div></div>\n'
            '                <div class="list-item"><div class="list-number">4</div><div><h4>Penutup &amp; tanda tangan</h4><p>Akhiri dengan ucapan terima kasih, nama lengkap, NIM, dan informasi kontak yang relevan.</p></div></div>\n'
            '            </div>\n'
            '            <div class="quote-block">\n'
            '                <p>"Menulis email dengan HURUF KAPITAL SEMUA dianggap berteriak dalam komunikasi digital."</p>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 4 — Dasar Teknologi Digital</span><span>9 / 20</span></div>\n'
            '        </section>\n\n'
            '        <!-- ==================== SLIDE 11: Contoh Etika Email ==================== -->\n'
            '        <section class="slide slide-full" data-slide="11">\n'
            '            <h2>Contoh: Email ke Dosen</h2>\n'
            '            <div class="two-col">\n'
            '                <div class="col">\n'
            '                    <h3>✅ Email Baik</h3>\n'
            '                    <div class="quote-block">\n'
            '                        <p><strong>Subjek:</strong> Permohonan Bimbingan Tugas Akhir<br><br>Yth. Bapak/Ibu Dosen,<br>Selamat pagi. Saya Rina, NIM 122150001, mahasiswa bimbingan TA Anda. Saya ingin menanyakan jadwal bimbingan minggu ini. Terima kasih.<br><br>Hormat saya,<br>Rina</p>\n'
            '                    </div>\n'
            '                    <p class="body-text text-caption">Subjek jelas, salam sopan, perkenalan lengkap, penutup formal.</p>\n'
            '                </div>\n'
            '                <div class="col">\n'
            '                    <h3>❌ Email Tidak Baik</h3>\n'
            '                    <div class="quote-block">\n'
            '                        <p><strong>Subjek:</strong> (kosong)<br><br>pak, saya mau bimbingan hari ini bisa?? gk bisa nunggu lama, tolong bales cpt ya</p>\n'
            '                    </div>\n'
            '                    <p class="body-text text-caption">Subjek kosong, tanpa salam, bahasa tidak formal, nada menuntut.</p>\n'
            '                </div>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 4 — Dasar Teknologi Digital</span><span>11 / 20</span></div>\n'
            '        </section>\n\n'
            '        <!-- ==================== SLIDE 12: Etika Digital untuk Mahasiswa ==================== -->\n'
            '        <section class="slide slide-full" data-slide="12">\n'
            '            <h2>Etika Digital untuk Mahasiswa</h2>\n'
            '            <div class="cards-grid-3">\n'
            '                <div class="card"><div class="card-header"><div class="card-icon">📚</div></div><div class="card-body"><h3>Integritas Akademik</h3><p>Jangan plagiat. Kutip dan cantumkan sumber setiap ide yang bukan milik Anda.</p></div></div>\n'
            '                <div class="card"><div class="card-header"><div class="card-icon">🤖</div></div><div class="card-body"><h3>Penggunaan AI yang Etis</h3><p>Gunakan AI sebagai alat bantu belajar, bukan pengganti pemahaman. Selalu periksa dan pahami hasilnya.</p></div></div>\n'
            '                <div class="card"><div class="card-header"><div class="card-icon">🔐</div></div><div class="card-body"><h3>Keamanan &amp; Reputasi</h3><p>Jaga password dan data pribadi. Bangun jejak digital yang positif untuk masa depan karier.</p></div></div>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 4 — Dasar Teknologi Digital</span><span>12 / 20</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            '        <!-- ==================== SLIDE 9: Studi Kasus Etika ==================== -->',
            _hak_block + _ethics + '        <!-- ==================== SLIDE 9: Studi Kasus Etika ==================== -->',
        )

    # 6e) Canonical ending normalization (decks 4-15, legacy source untouched).
    #     Three fixes per lecture deck + two recap decks (7, 15):
    #       1. Rangkuman heading: drop the `.overline` eyebrow and change
    #          "Poin-Poin Penting Pertemuan N" -> "Rangkuman Pertemuan N",
    #          matching decks 1-3. Skipped for recap decks 7/15 (their whole
    #          deck is a recap; a per-meeting summary heading is redundant).
    #       2. "Selanjutnya" preview slide inserted before the closing slide,
    #          previewing the ACTUAL next deck — the source `closing-meta` is
    #          often stale (curriculum changed), so this is not propagated.
    #       3. Attributed `.quote-block.text-left` added to the closing slide.
    #       4. `closing-meta` resynced to the actual next deck / exam.
    _ENDING = {
        "pertemuan-4.html": dict(
            meeting=4,
            next_heading="Selanjutnya: Pertemuan 5",
            next_boxes=[
                ("📊", "Data & Informasi", "Dari data mentah menjadi pengetahuan yang bermakna"),
                ("💾", "Format & Ukuran Data", "Bit, byte, dan satuan penyimpanan digital"),
                ("📈", "Big Data & Analytics", "Mengolah data dalam skala besar"),
            ],
            quote="Technology is a useful servant but a dangerous master.",
            cite="Christian Lous Lange",
            meta_old="Pertemuan 5: Keamanan Siber &amp; Perlindungan Data Digital",
            meta_new="Pertemuan 5: Data &amp; Informasi di Era Digital",
            closing_anchor="        <!-- ==================== SLIDE 16: Penutup ==================== -->",
        ),
        "pertemuan-5.html": dict(
            meeting=5,
            next_heading="Selanjutnya: Pertemuan 6",
            next_boxes=[
                ("💡", "Inovasi & Startup Digital", "Ekonomi digital dan kewirausahaan"),
                ("🤖", "AI & Machine Learning", "Cara kerja dan aplikasi AI sehari-hari"),
                ("🌱", "Industry 4.0 & Sustainability", "Teknologi cerdas dan e-waste"),
            ],
            quote="Data is the new oil.",
            cite="Clive Humby",
            meta_old="Pertemuan 6: Jaringan Komputer — Protokol, Topologi &amp; Model OSI",
            meta_new="Pertemuan 6: Inovasi, AI &amp; Sustainability",
            closing_anchor="        <!-- ==================== SLIDE 14: Penutup ==================== -->",
        ),
        "pertemuan-6.html": dict(
            meeting=6,
            next_heading="Selanjutnya: Pertemuan 7",
            next_boxes=[
                ("🔢", "Sistem Bilangan & Logika", "Biner, konversi, dan gerbang logika"),
                ("🌐", "Internet & Web", "Jaringan, website, dan basis data"),
                ("🛡️", "Keamanan & Etika Digital", "Cybersecurity dan tanggung jawab digital"),
            ],
            quote="The best way to predict the future is to invent it.",
            cite="Alan Kay",
            meta_old="Pertemuan 7: Keamanan Digital &amp; Etika Siber",
            meta_new="Pertemuan 7: Review UTS",
            closing_anchor="        <!-- ==================== SLIDE 14: Penutup ==================== -->",
        ),
        "pertemuan-7.html": dict(
            meeting=7,
            rangkuman=False,
            next_heading="Selanjutnya: UTS (Pertemuan 8)",
            next_boxes=[
                ("📝", "Ujian Tengah Semester", "Cakupan materi Pertemuan 1–7"),
                ("🎯", "Persiapan", "Review konsep dan latihan soal"),
            ],
            quote="Success is the sum of small efforts, repeated day in and day out.",
            cite="Robert Collier",
            meta_old="Pertemuan 8: Algoritma, Flowchart &amp; Pseudocode",
            meta_new="Pertemuan 8: UTS",
            closing_anchor="        <!-- ==================== SLIDE 9: Penutup ==================== -->",
        ),
        "pertemuan-9.html": dict(
            meeting=9,
            next_heading="Selanjutnya: Pertemuan 10",
            next_boxes=[
                ("📄", "Mail Merge", "Membuat surat massal otomatis"),
                ("🔖", "Daftar Isi Otomatis", "Navigasi dokumen profesional"),
                ("🤝", "Kolaborasi & Template", "Bekerja bersama dalam dokumen"),
            ],
            quote="The pen is mightier than the sword.",
            cite="Edward Bulwer-Lytton",
            meta_old="Pertemuan 10: Pengolah Kata Bagian 2 — Mail Merge, Review &amp; Kolaborasi",
            meta_new="Pertemuan 10: Pengolah Kata Bagian 2 — Mail Merge, Review &amp; Kolaborasi",
            closing_anchor="        <!-- ==================== SLIDE 14: Penutup ==================== -->",
        ),
        "pertemuan-10.html": dict(
            meeting=10,
            next_heading="Selanjutnya: Pertemuan 11",
            next_boxes=[
                ("📊", "Pengenalan Spreadsheet", "Sel, baris, kolom, dan format"),
                ("🧮", "Rumus Dasar", "Formula dan fungsi perhitungan"),
                ("📈", "Chart & Grafik", "Visualisasi data"),
            ],
            quote="Well done is better than well said.",
            cite="Benjamin Franklin",
            meta_old="Pertemuan 11: Spreadsheet — Pengenalan &amp; Dasar-Dasar",
            meta_new="Pertemuan 11: Spreadsheet — Pengenalan &amp; Dasar-Dasar",
            closing_anchor="        <!-- ==================== SLIDE 14: Penutup ==================== -->",
        ),
        "pertemuan-11.html": dict(
            meeting=11,
            next_heading="Selanjutnya: Pertemuan 12",
            next_boxes=[
                ("⚖️", "Fungsi Logika", "IF, COUNTIF, dan SUMIF"),
                ("🔍", "VLOOKUP & HLOOKUP", "Pencarian data otomatis"),
                ("🧩", "INDEX & MATCH", "Pencarian lanjutan"),
            ],
            quote="Not everything that can be counted counts, and not everything that counts can be counted.",
            cite="William Bruce Cameron",
            meta_old="Pertemuan 12: Pengolah Angka Bagian 2 — IF, VLOOKUP, Pivot Table &amp; Macro",
            meta_new="Pertemuan 12: Pengolah Angka Bagian 2 — IF, VLOOKUP, Pivot Table &amp; Macro",
            closing_anchor="        <!-- ==================== SLIDE 14: Penutup ==================== -->",
        ),
        "pertemuan-12.html": dict(
            meeting=12,
            next_heading="Selanjutnya: Pertemuan 13",
            next_boxes=[
                ("✂️", "Fungsi Teks & Tanggal", "Manipulasi string dan waktu"),
                ("🔄", "Pivot Table", "Analisis data ringkas"),
                ("⚙️", "Macro & VBA", "Otomatisasi tugas"),
            ],
            quote="In God we trust; all others must bring data.",
            cite="W. Edwards Deming",
            meta_old="Pertemuan 13: Pengolah Angka Bagian 3 — Pivot Table, Grafik &amp; Analisis Data Lanjutan",
            meta_new="Pertemuan 13: Pengolah Angka Bagian 3 — Pivot Table, Grafik &amp; Analisis Data Lanjutan",
            closing_anchor="        <!-- ==================== SLIDE 14: Penutup ==================== -->",
        ),
        "pertemuan-13.html": dict(
            meeting=13,
            next_heading="Selanjutnya: Pertemuan 14",
            next_boxes=[
                ("🧠", "Prompt Engineering", "Berkomunikasi efektif dengan AI"),
                ("🔬", "Scispace untuk Riset", "AI membantu riset akademik"),
                ("⚖️", "Etika & Limitasi AI", "Batas dan tanggung jawab"),
            ],
            quote="Without data, you're just another person with an opinion.",
            cite="W. Edwards Deming",
            meta_old="Pertemuan 14: Presentasi Digital &amp; Kolaborasi Online",
            meta_new="Pertemuan 14: Aplikasi Kecerdasan Buatan",
            closing_anchor="        <!-- ==================== SLIDE 14: Closing ==================== -->",
        ),
        "pertemuan-14.html": dict(
            meeting=14,
            next_heading="Selanjutnya: Pertemuan 15",
            next_boxes=[
                ("📚", "Review Materi 9–14", "Word, Excel, dan analisis data"),
                ("🎯", "Refleksi & Kuis 2", "Uji pemahaman menyeluruh"),
                ("📝", "Persiapan UAS", "Cakupan dan strategi"),
            ],
            quote="By far the greatest danger of Artificial Intelligence is that people conclude too early that they understand it.",
            cite="Eliezer Yudkowsky",
            meta_old="Pertemuan 15: Tren Teknologi Masa Depan &amp; Persiapan Karier di Era Digital",
            meta_new="Pertemuan 15: Review UAS",
            closing_anchor="        <!-- ==================== SLIDE 14: Penutup ==================== -->",
        ),
        "pertemuan-15.html": dict(
            meeting=15,
            rangkuman=False,
            next_heading="Selanjutnya: UAS (Pertemuan 16)",
            next_boxes=[
                ("📝", "Ujian Akhir Semester", "Cakupan materi Pertemuan 1–14"),
                ("🏁", "Akhir Perkuliahan", "Seluruh konsep dasar teknologi digital"),
            ],
            quote="The future belongs to those who learn more skills and combine them in creative ways.",
            cite="Robert Greene",
            meta_old="UAS mencakup: Sistem Bilangan &amp; Logika Digital &bull; Internet &amp; Web &bull; Cybersecurity &bull; AI &amp; Etika &bull; Microsoft Word &bull; Microsoft Excel &bull; Analisis Data &bull; Produktivitas AI",
            meta_new="UAS mencakup: Sistem Bilangan &amp; Logika Digital &bull; Internet &amp; Web &bull; Cybersecurity &bull; AI &amp; Etika &bull; Microsoft Word &bull; Microsoft Excel &bull; Analisis Data &bull; Produktivitas AI",
            closing_anchor="        <!-- ==================== SLIDE 9: Penutup ==================== -->",
        ),
    }
    cfg = _ENDING.get(deck)
    if cfg:
        # 1) Rangkuman heading (skip recap decks).
        if cfg.get("rangkuman", True):
            body = body.replace(
                '<div class="overline">Rangkuman</div>\n'
                f'            <h2>Poin-Poin Penting Pertemuan {cfg["meeting"]}</h2>',
                f'<h2>Rangkuman Pertemuan {cfg["meeting"]}</h2>',
            )
        else:
            # Recap decks (7 & 15): the whole deck IS a recap, so the trailing
            # summary slide is redundant — remove it entirely (heading + body).
            body = re.sub(
                r'<!-- ==================== SLIDE \d+: Rangkuman ==================== -->\s*'
                r'<section class="slide slide-rangkuman"[^>]*>.*?</section>\s*',
                '', body, count=1, flags=re.S,
            )

        # 2) Quote + closing-meta resync in one replace (quote inserted
        #    between closing-subtitle and closing-meta).
        quote_block = (
            '            <div class="quote-block text-left">\n'
            f'                <p>"{cfg["quote"]}"</p>\n'
            f'                <cite>— {cfg["cite"]}</cite>\n'
            '            </div>\n'
        )
        body = body.replace(
            f'<p class="closing-meta">{cfg["meta_old"]}</p>',
            quote_block + f'<p class="closing-meta">{cfg["meta_new"]}</p>',
        )

        # 3) "Selanjutnya" preview slide before the closing slide.
        boxes = ""
        for icon, box_title, desc in cfg["next_boxes"]:
            boxes += (
                '                    <div class="diagram-box diagram-box-top">\n'
                f'                        <h3>{icon}</h3>\n'
                f'                        <p><strong>{box_title}</strong><br>{desc}</p>\n'
                '                    </div>\n'
            )
        selanjutnya = (
            f'        <!-- ==================== {cfg["next_heading"]} ==================== -->\n'
            f'        <section class="slide slide-full" data-slide="{cfg["meeting"]}">\n'
            f'            <h2>{cfg["next_heading"]}</h2>\n'
            '            <div class="slide-center">\n'
            '                <div class="diagram-container">\n'
            + boxes +
            '                </div>\n'
            '            </div>\n'
            f'            <div class="slide-footer"><span>Pertemuan {cfg["meeting"]} — Dasar Teknologi Digital</span><span>{cfg["meeting"]} / {cfg["meeting"]}</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            cfg["closing_anchor"],
            selanjutnya + cfg["closing_anchor"],
        )

    # 6f) Pertemuan-5 content fixes (legacy source untouched):
    #     - Inject a Hook slide between title and agenda (deck 1-4 all have one).
    #     - Unround the 2 photos (`.visual-block` wrapper -> flat `<img>` in
    #       `.content-right`), moving their caption/label/tags into content-left.
    #     - Post-test 5 -> 4 (drop the backup 3-2-1 question) AND add a
    #       "Post-Test: Jawaban" slide (deck 5 only had the soal slide).
    #     - Inject a Referensi slide before the "Selanjutnya" slide.
    if deck == "pertemuan-5.html":
        # Hook slide (data/statistics themed, mirrors deck 1-4).
        hook5 = (
            '        <!-- ==================== SLIDE 2: Hook ==================== -->\n'
            '        <section class="slide slide-full" data-slide="2">\n'
            '            <h2>Dunia yang Digerakkan Data</h2>\n'
            '            <div class="stats-row mb-md">\n'
            '                <div class="stat-box"><div class="stat-number">2,5 kuintiliun</div><div class="stat-label">byte data dibuat<br>setiap hari</div></div>\n'
            '                <div class="stat-box"><div class="stat-number">90%</div><div class="stat-label">data dunia tercipta<br>dalam 2 tahun terakhir</div></div>\n'
            '                <div class="stat-box"><div class="stat-number">5,5 miliar</div><div class="stat-label">pengguna internet<br>di dunia (2025)</div></div>\n'
            '            </div>\n'
            '            <ul class="bullet-list mt-xl">\n'
            '                <li><strong>Media sosial</strong> — jutaan postingan dan interaksi setiap menit, menghasilkan data tak terbayangkan</li>\n'
            '                <li><strong>E-commerce</strong> — setiap transaksi digital adalah data yang berharga</li>\n'
            '                <li><strong>Keamanan siber</strong> — semakin banyak data, semakin besar pula ancaman yang mengintai</li>\n'
            '            </ul>\n'
            '            <p class="body-text text-source">Sumber: DataReportal (2026), IBM (2024), Cisco (2023)</p>\n'
            '            <div class="slide-footer"><span>Pertemuan 5 — Dasar Teknologi Digital</span><span>2 / 19</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            '        <!-- ==================== SLIDE 2: Agenda ==================== -->',
            hook5 + '        <!-- ==================== SLIDE 2: Agenda ==================== -->',
        )

        # Bridge slide between the "data" cluster (DIKW, format, Big Data) and
        # the "security" cluster (why, threats, defense). The two clusters are
        # unrelated without a transition: data is valuable, therefore it must be
        # protected. Mirrors the deck-3/4 bridge pattern.
        bridge5 = (
            '        <!-- ==================== SLIDE 6: Bridge — Dari Data ke Keamanan ==================== -->\n'
            '        <section class="slide slide-full" data-slide="6">\n'
            '            <h2>Dari Data ke Keamanan</h2>\n'
            '            <div class="slide-center">\n'
            '                <p class="body-text text-caption-highlight">Kita sudah melihat betapa <strong>berharganya data</strong> — dan betapa banyak yang beredar. Pertanyaannya: <strong>bagaimana melindunginya dari orang yang ingin menyalahgunakan?</strong></p>\n'
            '                <div class="diagram-container mt-lg">\n'
            '                    <div class="diagram-box">\n'
            '                        <h4>💾 Data</h4>\n'
            '                        <p>Diciptakan &amp; dikumpulkan<br>setiap saat, di mana-mana</p>\n'
            '                    </div>\n'
            '                    <div class="diagram-arrow">→</div>\n'
            '                    <div class="diagram-box">\n'
            '                        <h4>💰 Bernilai</h4>\n'
            '                        <p>Rahasia, uang, identitas,<br>privasi orang banyak</p>\n'
            '                    </div>\n'
            '                    <div class="diagram-arrow">→</div>\n'
            '                    <div class="diagram-box primary">\n'
            '                        <h4>🛡️ Keamanan</h4>\n'
            '                        <p>Melindungi data dari<br>ancaman &amp; penyalahgunaan</p>\n'
            '                    </div>\n'
            '                </div>\n'
            '                <p class="body-text text-caption mt-md">Data yang berharga menarik perhatian penyerang — <strong>karena itu keamanan siber jadi penting.</strong></p>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 5 — Dasar Teknologi Digital</span><span>6 / 19</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            '        <!-- ==================== SLIDE 6: Mengapa Cybersecurity ==================== -->',
            bridge5 + '        <!-- ==================== SLIDE 6: Mengapa Cybersecurity ==================== -->',
        )

        # --- DIKW slide: dual-side layout is awkward for a three-step concept
        #     flow. Re-layout as slide-full with a horizontal
        #     Data → Informasi → Pengetahuan diagram (the three highlight-boxes
        #     already explain each step; the old vertical diagram sat squeezed
        #     in a half-width .content-right).
        _dikw_re = re.compile(
            r'<!-- ==================== SLIDE 3: Data vs Informasi ==================== -->\s*'
            r'<section class="slide slide-content" data-slide="3">.*?</section>\s*',
            flags=re.S,
        )
        _dikw_new = (
            '        <!-- ==================== SLIDE 3: Data vs Informasi ==================== -->\n'
            '        <section class="slide slide-full" data-slide="3">\n'
            '            <h2>Data → Informasi → Pengetahuan</h2>\n'
            '            <div class="highlight-box">\n'
            '                <div class="highlight-title">Data</div>\n'
            '                <div class="highlight-content">Fakta mentah, belum memiliki konteks atau makna. Contoh: angka "36.5", teks "Bandung".</div>\n'
            '            </div>\n'
            '            <div class="highlight-box">\n'
            '                <div class="highlight-title">Informasi</div>\n'
            '                <div class="highlight-content">Data yang sudah diolah dan diberi <strong>konteks</strong> sehingga bermakna. Contoh: "Suhu tubuh pasien A adalah 36.5°C".</div>\n'
            '            </div>\n'
            '            <div class="highlight-box">\n'
            '                <div class="highlight-title">Pengetahuan (Knowledge)</div>\n'
            '                <div class="highlight-content">Informasi yang dipahami, dikombinasikan dengan <strong>pengalaman</strong>, dan bisa digunakan untuk pengambilan keputusan.</div>\n'
            '            </div>\n'
            '            <div class="diagram-container mt-md">\n'
            '                <div class="diagram-box"><h4>Data</h4><p>Fakta mentah &amp; angka</p></div>\n'
            '                <div class="diagram-arrow">→</div>\n'
            '                <div class="diagram-box"><h4>Informasi</h4><p>Data + konteks = makna</p></div>\n'
            '                <div class="diagram-arrow">→</div>\n'
            '                <div class="diagram-box primary"><h4>Pengetahuan</h4><p>Informasi + pengalaman = keputusan</p></div>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 5 — Dasar Teknologi Digital</span><span>3 / 21</span></div>\n'
            '        </section>\n\n'
        )
        body = _dikw_re.sub(_dikw_new, body, count=1)

        # --- "Menghindari Social Engineering": concrete example + how to avoid,
        #     right after the Social Engineering techniques slide (before 2FA).
        _avoid_se = (
            '        <!-- ==================== SLIDE 10: Menghindari Social Engineering ==================== -->\n'
            '        <section class="slide slide-full" data-slide="10">\n'
            '            <h2>Menghindari Social Engineering</h2>\n'
            '            <div class="highlight-box">\n'
            '                <div class="highlight-title">Contoh Nyata</div>\n'
            '                <div class="highlight-content">Kamu ditelepon "IT kampus" yang meminta <strong>password SIAKAD</strong> untuk "verifikasi data mahasiswa". Padahal IT kampus <strong>tidak pernah</strong> meminta password lewat telepon — itu pretexting.</div>\n'
            '            </div>\n'
            '            <ul class="bullet-list mt-md">\n'
            '                <li><strong>Verifikasi identitas</strong> — telepon balik nomor resmi atau hubungi pihak terkait.</li>\n'
            '                <li><strong>Jangan berikan OTP, PIN, atau password</strong> — institusi resmi tidak pernah memintanya.</li>\n'
            '                <li><strong>Waspadai rasa urgensi</strong> — "segera, atau akun diblokir" adalah trik tekanan.</li>\n'
            '                <li><strong>Jangan klik link mencurigakan</strong> — ketik sendiri alamat situs di browser.</li>\n'
            '                <li><strong>Tolak USB / attachment tak dikenal</strong> — itu "umpan" (baiting).</li>\n'
            '            </ul>\n'
            '            <div class="slide-footer"><span>Pertemuan 5 — Dasar Teknologi Digital</span><span>10 / 21</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            '        <!-- ==================== SLIDE 10: 2FA ==================== -->',
            _avoid_se + '        <!-- ==================== SLIDE 10: 2FA ==================== -->',
        )

        # --- "Tips Mahasiswa: Lindungi Datamu": protecting personal + academic
        #     data, placed after the last defense slide (Backup 3-2-1).
        _tips_mahasiswa = (
            '        <!-- ==================== SLIDE 12: Tips Mahasiswa ==================== -->\n'
            '        <section class="slide slide-full" data-slide="12">\n'
            '            <h2>Tips Mahasiswa: Lindungi Datamu</h2>\n'
            '            <div class="cards-grid-2">\n'
            '                <div class="card"><div class="card-header"><div class="card-icon">🔒</div></div><div class="card-body"><h3>Data Pribadi</h3><p>Gunakan <strong>password kuat &amp; unik</strong> untuk setiap akun.</p><p>Aktifkan <strong>2FA</strong> pada email &amp; media sosial.</p><p>Batasi info pribadi (alamat, tanggal lahir) di media sosial.</p></div></div>\n'
            '                <div class="card"><div class="card-header"><div class="card-icon">🎓</div></div><div class="card-body"><h3>Data Akademik</h3><p>Jangan bagikan <strong>password SIAKAD / e-learning</strong> ke siapa pun.</p><p><strong>Backup</strong> tugas &amp; skripsi dengan aturan 3-2-1.</p><p>Hati-hati <strong>WiFi publik</strong>; selalu <strong>log out</strong> di komputer bersama.</p></div></div>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 5 — Dasar Teknologi Digital</span><span>12 / 21</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            '        <!-- ==================== SLIDE 12: Post-Test Soal ==================== -->',
            _tips_mahasiswa + '        <!-- ==================== SLIDE 12: Post-Test Soal ==================== -->',
        )

        # Unround slide 5 (Big Data) photo: drop `.visual-block`, move caption
        # + tags into content-left, leave flat `<img>` in content-right.
        body = body.replace(
            '                <div class="visual-block">\n'
            '                    <img src="assets/images/big-data.jpg" alt="Big Data dan Analytics" loading="lazy">\n'
            '                    <div class="visual-label">Data analytics membantu organisasi<br>mengambil keputusan berbasis bukti</div>\n'
            '                    <div class="tags">\n'
            '                        <span class="tag">Machine Learning</span>\n'
            '                        <span class="tag">Data Mining</span>\n'
            '                        <span class="tag">Predictive Analytics</span>\n'
            '                        <span class="tag">Business Intelligence</span>\n'
            '                    </div>\n'
            '                </div>\n',
            '                <img src="assets/images/big-data.jpg" alt="Big Data dan Analytics" loading="lazy">\n',
        )
        body = body.replace(
            '                <div class="highlight-box">\n'
            '                    <div class="highlight-title">Variety</div>\n'
            '                    <div class="highlight-content">Beragam jenis data: terstruktur (tabel), semi-terstruktur (JSON/XML), dan tidak terstruktur (teks, gambar, video).</div>\n'
            '                </div>\n'
            '            </div>\n'
            '            <div class="content-right">',
            '                <div class="highlight-box">\n'
            '                    <div class="highlight-title">Variety</div>\n'
            '                    <div class="highlight-content">Beragam jenis data: terstruktur (tabel), semi-terstruktur (JSON/XML), dan tidak terstruktur (teks, gambar, video).</div>\n'
            '                </div>\n'
            '                <p class="body-text text-caption">Data analytics membantu organisasi mengambil keputusan berbasis bukti — <strong>Machine Learning</strong>, <strong>Data Mining</strong>, <strong>Predictive Analytics</strong>, dan <strong>Business Intelligence</strong>.</p>\n'
            '            </div>\n'
            '            <div class="content-right">',
        )

        # Unround slide 9 (Social Engineering) photo: same treatment.
        body = body.replace(
            '                <div class="visual-block">\n'
            '                    <img src="assets/images/cybersecurity.jpg" alt="Social Engineering" loading="lazy">\n'
            '                    <div class="visual-label"><strong>"Manusia adalah rantai keamanan<br>yang paling lemah"</strong><br>— Kevin Mitnick</div>\n'
            '                    <div class="quote-block" style="margin-top: var(--sp-md); max-width: 80%;">\n'
            '                        <p style="font-size: var(--font-body-sm) !important;">Selalu verifikasi identitas sebelum memberikan informasi sensitif — baik melalui telepon, email, atau langsung.</p>\n'
            '                    </div>\n'
            '                </div>\n',
            '                <img src="assets/images/cybersecurity.jpg" alt="Social Engineering" loading="lazy">\n',
        )
        body = body.replace(
            '                    <div class="list-item"><div class="list-number">3</div><div><h4>Tailgating</h4><p>Menyusup masuk gedung di belakang karyawan sah yang baru membuka pintu (serangan fisik).</p></div></div>\n'
            '                </div>\n'
            '            </div>\n'
            '            <div class="content-right">',
            '                    <div class="list-item"><div class="list-number">3</div><div><h4>Tailgating</h4><p>Menyusup masuk gedung di belakang karyawan sah yang baru membuka pintu (serangan fisik).</p></div></div>\n'
            '                </div>\n'
            '                <div class="quote-block" style="margin-top: var(--sp-md);">\n'
            '                    <p>"Manusia adalah rantai keamanan yang paling lemah."</p>\n'
            '                    <cite>— Kevin Mitnick</cite>\n'
            '                </div>\n'
            '            </div>\n'
            '            <div class="content-right">',
        )

        # Drop quiz Q5 (backup 3-2-1) — literal replacement (no fuzzy regex).
        body = body.replace(
            '                <div class="quiz-q" style="grid-column: 1 / -1; max-width: 50%;">\n'
            '                    <div class="q-text">5. Dalam aturan backup 3-2-1, angka "1" mengacu pada?</div>\n'
            '                    <div class="q-options">\n'
            '                        <div class="q-opt">A. 1 salinan data</div>\n'
            '                        <div class="q-opt">B. 1 jenis media</div>\n'
            '                        <div class="q-opt">C. 1 salinan disimpan offsite</div>\n'
            '                        <div class="q-opt">D. 1 kali backup per bulan</div>\n'
            '                    </div>\n'
            '                </div>\n',
            '',
        )

        # Add the missing "Post-Test: Jawaban" slide before the Rangkuman slide.
        jawaban5 = (
            '        <!-- ==================== SLIDE 13: Post-Test Jawaban ==================== -->\n'
            '        <section class="slide slide-quiz" data-slide="13">\n'
            '            <h2>Post-Test: Jawaban</h2>\n'
            '            <div class="quiz-grid">\n'
            '                <div class="quiz-q"><div class="q-text">1. Data yang sudah diolah dan diberi konteks sehingga bermakna disebut?</div><div class="q-options"><div class="q-opt">A. Data mentah</div><div class="q-opt correct">B. Informasi ✓</div><div class="q-opt">C. Big Data</div><div class="q-opt">D. Malware</div></div></div>\n'
            '                <div class="quiz-q"><div class="q-text">2. Karakteristik utama Big Data yang mengacu pada beragamnya jenis data disebut?</div><div class="q-options"><div class="q-opt">A. Volume</div><div class="q-opt">B. Velocity</div><div class="q-opt correct">C. Variety ✓</div><div class="q-opt">D. Veracity</div></div></div>\n'
            '                <div class="quiz-q"><div class="q-text">3. Malware yang mengenkripsi file korban dan meminta tebusan adalah?</div><div class="q-options"><div class="q-opt">A. Virus</div><div class="q-opt">B. Worm</div><div class="q-opt">C. Spyware</div><div class="q-opt correct">D. Ransomware ✓</div></div></div>\n'
            '                <div class="quiz-q"><div class="q-text">4. Teknik manipulasi psikologis untuk mengeksploitasi manusia disebut?</div><div class="q-options"><div class="q-opt">A. Phishing</div><div class="q-opt correct">B. Social Engineering ✓</div><div class="q-opt">C. Cyberbullying</div><div class="q-opt">D. Ransomware</div></div></div>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 5 — Dasar Teknologi Digital</span><span>13 / 19</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            '        <!-- ==================== SLIDE 13: Rangkuman ==================== -->',
            jawaban5 + '        <!-- ==================== SLIDE 13: Rangkuman ==================== -->',
        )

        # Referensi slide before the "Selanjutnya" slide (injected in 6e).
        refs5 = (
            '        <!-- ==================== SLIDE 17: Referensi ==================== -->\n'
            '        <section class="slide slide-full" data-slide="17">\n'
            '            <h2 class="text-left">Referensi</h2>\n'
            '            <div class="reference-list">\n'
            '                <p>1. Rowley, J. (2007). "The wisdom hierarchy: representations of the DIKW hierarchy." <em>Journal of Information Science</em>, 33(2), 163–180.</p>\n'
            '                <p>2. Zikopoulos, P. &amp; Eaton, C. (2011). <em>Understanding Big Data: Analytics for Enterprise Class Hadoop and Streaming Data</em>. McGraw-Hill.</p>\n'
            '                <p>3. Stallings, W. (2020). <em>Cryptography and Network Security: Principles and Practice</em>. 8th ed. Pearson.</p>\n'
            '                <p>4. Mitnick, K. &amp; Simon, W. (2002). <em>The Art of Deception: Controlling the Human Element of Security</em>. Wiley.</p>\n'
            '                <p>5. Cisco (2023). "Cybersecurity Threat Trends: Phishing, Ransomware, and Social Engineering." <em>cisco.com</em></p>\n'
            '                <p>6. DataReportal (2026). "Digital 2026: Indonesia." <em>datareportal.com/reports/digital-2026-indonesia</em></p>\n'
            '                <p>7. IBM (2024). "Cost of a Data Breach Report 2024." <em>ibm.com</em></p>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 5 — Dasar Teknologi Digital</span><span>17 / 19</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            '        <!-- ==================== Selanjutnya: Pertemuan 6 ==================== -->',
            refs5 + '        <!-- ==================== Selanjutnya: Pertemuan 6 ==================== -->',
        )

    # 6g) Pertemuan-6 content fixes (legacy source untouched):
    #     - Inject a Hook slide (deck 1-5 all have one).
    #     - Inject two bridge slides: Startup->AI (before SLIDE 5) and
    #       Automasi->Sustainability (before SLIDE 10) — both are cluster jumps
    #       a student can't follow without a transition.
    #     - Unround the 2 photos (`.visual-block` -> flat `<img>`).
    #     - Post-test 5 -> 4: drop Q1 (unicorn GoTo name recall, redundant with
    #       the startup cluster already covered by Q4/MVP), renumber 2..5 -> 1..4.
    #     - Inject a Referensi slide before the "Selanjutnya" slide (from 6e).
    if deck == "pertemuan-6.html":
        # Hook slide (innovation/AI themed, mirrors deck 1-5).
        hook6 = (
            '        <!-- ==================== SLIDE 2: Hook ==================== -->\n'
            '        <section class="slide slide-full" data-slide="2">\n'
            '            <h2>Inovasi yang Mengubah Dunia</h2>\n'
            '            <div class="stats-row mb-md">\n'
            '                <div class="stat-box"><div class="stat-number">8</div><div class="stat-label">unicorn &amp; decacorn<br>teknologi Indonesia</div></div>\n'
            '                <div class="stat-box"><div class="stat-number">100 juta</div><div class="stat-label">pengguna ChatGPT<br>hanya dalam 2 bulan</div></div>\n'
            '                <div class="stat-box"><div class="stat-number">62 juta ton</div><div class="stat-label">e-waste global<br>setiap tahun</div></div>\n'
            '            </div>\n'
            '            <ul class="bullet-list mt-xl">\n'
            '                <li><strong>Kecerdasan buatan</strong> — menjawab, menulis, dan membuat gambar dalam hitungan detik</li>\n'
            '                <li><strong>Startup digital</strong> — mengubah cara kita bepergian, berbelanja, dan bertransaksi</li>\n'
            '                <li><strong>Keberlanjutan</strong> — setiap inovasi membawa tanggung jawab terhadap lingkungan</li>\n'
            '            </ul>\n'
            '            <p class="body-text text-source">Sumber: e-Conomy SEA (2024), Reuters (2023), Global E-waste Monitor (2024)</p>\n'
            '            <div class="slide-footer"><span>Pertemuan 6 — Dasar Teknologi Digital</span><span>2 / 19</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            '        <!-- ==================== SLIDE 2: Agenda ==================== -->',
            hook6 + '        <!-- ==================== SLIDE 2: Agenda ==================== -->',
        )

        # Bridge 1: startup -> AI.
        bridge6a = (
            '        <!-- ==================== SLIDE 5: Bridge — Dari Startup ke AI ==================== -->\n'
            '        <section class="slide slide-full" data-slide="5">\n'
            '            <h2>Dari Startup ke Kecerdasan Buatan</h2>\n'
            '            <div class="slide-center">\n'
            '                <p class="body-text text-caption-highlight">Startup Indonesia tumbuh pesat. Tapi apa mesin penggerak di baliknya? <strong>Kecerdasan buatan</strong> — yang membuat aplikasi lebih pintar dan layanan lebih personal.</p>\n'
            '                <div class="diagram-container mt-lg">\n'
            '                    <div class="diagram-box"><h4>💡 Startup</h4><p>Ide, pasar,<br>dan modal</p></div>\n'
            '                    <div class="diagram-arrow">→</div>\n'
            '                    <div class="diagram-box"><h4>🤖 AI</h4><p>Mesin belajar<br>dari data</p></div>\n'
            '                    <div class="diagram-arrow">→</div>\n'
            '                    <div class="diagram-box primary"><h4>🚀 Inovasi</h4><p>Produk cerdas<br>berskala besar</p></div>\n'
            '                </div>\n'
            '                <p class="body-text text-caption mt-md">Mari kita kenali lebih dalam: <strong>apa itu AI dan bagaimana cara kerjanya?</strong></p>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 6 — Dasar Teknologi Digital</span><span>5 / 19</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            '        <!-- ==================== SLIDE 5: Intro AI & ML ==================== -->',
            bridge6a + '        <!-- ==================== SLIDE 5: Intro AI & ML ==================== -->',
        )

        # --- "Cabang Utama AI" is too dense: 6 cards crammed in one slide.
        #     Split into two 3-card slides.
        _cabang_re = re.compile(
            r'<!-- ==================== SLIDE 7: Main AI Branches ==================== -->\s*'
            r'<section class="slide slide-full" data-slide="7">.*?</section>\s*',
            flags=re.S,
        )
        _cabang_new = (
            '        <!-- ==================== SLIDE 7: Main AI Branches (1) ==================== -->\n'
            '        <section class="slide slide-full" data-slide="7">\n'
            '            <h2>Cabang Utama AI (1/2)</h2>\n'
            '            <div class="cards-grid-3">\n'
            '                <div class="card">\n'
            '                    <div class="card-icon">🧠</div>\n'
            '                    <h3>Expert Systems</h3>\n'
            '                    <p>Sistem pakar meniru keputusan ahli manusia — digunakan di diagnosa medis dan perencanaan keuangan</p>\n'
            '                </div>\n'
            '                <div class="card">\n'
            '                    <div class="card-icon">🗣️</div>\n'
            '                    <h3>NLP</h3>\n'
            '                    <p>Natural Language Processing — memahami dan menghasilkan bahasa manusia: chatbot, terjemahan, ringkasan otomatis</p>\n'
            '                </div>\n'
            '                <div class="card">\n'
            '                    <div class="card-icon">👁️</div>\n'
            '                    <h3>Computer Vision</h3>\n'
            '                    <p>Menganalisis gambar dan video — deteksi wajah, pengenalan objek, autonomous driving</p>\n'
            '                </div>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 6 — Dasar Teknologi Digital</span><span>9 / 23</span></div>\n'
            '        </section>\n\n'
            '        <!-- ==================== SLIDE 7b: Main AI Branches (2) ==================== -->\n'
            '        <section class="slide slide-full" data-slide="7">\n'
            '            <h2>Cabang Utama AI (2/2)</h2>\n'
            '            <div class="cards-grid-3">\n'
            '                <div class="card">\n'
            '                    <div class="card-icon">🤖</div>\n'
            '                    <h3>Robotika</h3>\n'
            '                    <p>Robot fisik yang berinteraksi dengan lingkungan — manufaktur, eksplorasi, pelayanan</p>\n'
            '                </div>\n'
            '                <div class="card">\n'
            '                    <div class="card-icon">🎲</div>\n'
            '                    <h3>Fuzzy Logic</h3>\n'
            '                    <p>Logika kabur untuk keputusan dalam ketidakpastian — AC otomatis, kontrol kamera</p>\n'
            '                </div>\n'
            '                <div class="card">\n'
            '                    <div class="card-icon">🧬</div>\n'
            '                    <h3>Genetic Algorithms</h3>\n'
            '                    <p>Inspirasi evolusi untuk optimasi — penjadwalan, routing jaringan, desain produk</p>\n'
            '                </div>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 6 — Dasar Teknologi Digital</span><span>10 / 23</span></div>\n'
            '        </section>\n\n'
        )
        body = _cabang_re.sub(_cabang_new, body, count=1)

        # Bridge: cabang-cabang AI -> penerapannya di industri (Industry 4.0/5.0).
        bridge6c = (
            '        <!-- ==================== SLIDE 8: Bridge — Dari Cabang AI ke Industri ==================== -->\n'
            '        <section class="slide slide-full" data-slide="8">\n'
            '            <h2>Dari Cabang AI ke Industri</h2>\n'
            '            <div class="slide-center">\n'
            '                <p class="body-text text-caption-highlight">Cabang-cabang AI ini — NLP, computer vision, robotika — <strong>tidak berjalan sendiri</strong>. Ketika digabungkan, mereka mengubah cara <strong>pabrik dan industri</strong> bekerja.</p>\n'
            '                <div class="diagram-container mt-lg">\n'
            '                    <div class="diagram-box"><h4>🧩 Cabang AI</h4><p>NLP, vision,<br>robotika, logika</p></div>\n'
            '                    <div class="diagram-arrow">→</div>\n'
            '                    <div class="diagram-box"><h4>🏭 Industri</h4><p>Pabrik, mesin,<br>dan produksi</p></div>\n'
            '                    <div class="diagram-arrow">→</div>\n'
            '                    <div class="diagram-box primary"><h4>⚙️ Industry 4.0 &amp; 5.0</h4><p>Otomatisasi &amp;<br>kolaborasi manusia-mesin</p></div>\n'
            '                </div>\n'
            '                <p class="body-text text-caption mt-md">Mari kita lihat <strong>dua babak revolusi industri</strong> yang digerakkan AI.</p>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 6 — Dasar Teknologi Digital</span><span>8 / 23</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            '<!-- ==================== SLIDE 8: Industry 4.0 & 5.0 ==================== -->',
            bridge6c + '<!-- ==================== SLIDE 8: Industry 4.0 & 5.0 ==================== -->',
        )

        # --- AI for students: two slides after "Chatbot & Automasi", before the
        #     automasi->sustainability bridge (so they land as the practical
        #     application of the AI cluster, then bridge into sustainability).
        _ai_mhs = (
            '        <!-- ==================== SLIDE 10: AI untuk Mahasiswa ==================== -->\n'
            '        <section class="slide slide-full" data-slide="10">\n'
            '            <h2>AI untuk Mahasiswa: Gunakan dengan Baik</h2>\n'
            '            <div class="highlight-box">\n'
            '                <div class="highlight-title">Prinsip Dasar</div>\n'
            '                <div class="highlight-content">AI adalah <strong>alat bantu belajar</strong>, bukan pengganti proses berpikirmu. Gunakan untuk memahami, bukan untuk menyalin.</div>\n'
            '            </div>\n'
            '            <ul class="bullet-list mt-md">\n'
            '                <li><strong>Pahami, jangan menyalin</strong> — baca dan pahami jawaban AI, jangan copy-paste mentah.</li>\n'
            '                <li><strong>Verifikasi fakta</strong> — AI bisa "halusinasi"; selalu cek ke sumber tepercaya.</li>\n'
            '                <li><strong>Jaga integritas akademik</strong> — kutip &amp; parafrase dengan benar, hindari plagiarisme.</li>\n'
            '                <li><strong>Lindungi data pribadi</strong> — jangan masukkan data sensitif ke AI publik.</li>\n'
            '                <li><strong>Ikuti aturan kampus</strong> — perhatikan kebijakan penggunaan AI dalam tugas.</li>\n'
            '            </ul>\n'
            '            <div class="slide-footer"><span>Pertemuan 6 — Dasar Teknologi Digital</span><span>10 / 23</span></div>\n'
            '        </section>\n\n'
            '        <!-- ==================== SLIDE 10b: Memaksimalkan AI ==================== -->\n'
            '        <section class="slide slide-full" data-slide="10">\n'
            '            <h2>Memaksimalkan AI: Akademik &amp; Non-Akademik</h2>\n'
            '            <div class="cards-grid-2">\n'
            '                <div class="card">\n'
            '                    <div class="card-icon">🎓</div>\n'
            '                    <h3>Akademik</h3>\n'
            '                    <p>Riset &amp; literatur: mencari referensi, meringkas jurnal</p>\n'
            '                    <p>Memahami materi sulit: meminta penjelasan bertahap</p>\n'
            '                    <p>Latihan soal &amp; pembahasan untuk persiapan ujian</p>\n'
            '                </div>\n'
            '                <div class="card">\n'
            '                    <div class="card-icon">🚀</div>\n'
            '                    <h3>Non-Akademik</h3>\n'
            '                    <p>Organisasi: menyusun proposal, laporan, poster</p>\n'
            '                    <p>Lomba &amp; kompetisi: ide, pitch deck, prototipe</p>\n'
            '                    <p>Portofolio &amp; konten: desain, tulisan, video</p>\n'
            '                </div>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 6 — Dasar Teknologi Digital</span><span>11 / 23</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            '        <!-- ==================== SLIDE 10: Sustainability & E-Waste ==================== -->',
            _ai_mhs + '        <!-- ==================== SLIDE 10: Sustainability & E-Waste ==================== -->',
        )

        # Bridge 2: automasi -> sustainability.
        bridge6b = (
            '        <!-- ==================== SLIDE 10: Bridge — Dari Automasi ke Keberlanjutan ==================== -->\n'
            '        <section class="slide slide-full" data-slide="10">\n'
            '            <h2>Dari Automasi ke Keberlanjutan</h2>\n'
            '            <div class="slide-center">\n'
            '                <p class="body-text text-caption-highlight">AI dan automasi membuat segalanya lebih cepat dan efisien. Namun <strong>semakin banyak perangkat, semakin besar limbah elektroniknya</strong>.</p>\n'
            '                <div class="diagram-container mt-lg">\n'
            '                    <div class="diagram-box"><h4>⚙️ Automasi</h4><p>AI, chatbot,<br>dan IoT</p></div>\n'
            '                    <div class="diagram-arrow">→</div>\n'
            '                    <div class="diagram-box"><h4>📱 Perangkat</h4><p>Smartphone,<br>gadget, server</p></div>\n'
            '                    <div class="diagram-arrow">→</div>\n'
            '                    <div class="diagram-box primary"><h4>♻️ E-Waste</h4><p>Limbah &amp;<br>tanggung jawab</p></div>\n'
            '                </div>\n'
            '                <p class="body-text text-caption mt-md">Inovasi harus berjalan beriringan dengan <strong>keberlanjutan</strong>.</p>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 6 — Dasar Teknologi Digital</span><span>10 / 19</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            '        <!-- ==================== SLIDE 10: Sustainability & E-Waste ==================== -->',
            bridge6b + '        <!-- ==================== SLIDE 10: Sustainability & E-Waste ==================== -->',
        )

        # Unround the two photos (`.visual-block` -> flat `<img>`).
        body = body.replace(
            '            <div class="content-right">\n'
            '                <div class="visual-block">\n'
            '                    <img src="assets/images/ai-machine-learning.jpg" alt="Kecerdasan Buatan dan Machine Learning" loading="lazy">\n'
            '                </div>\n'
            '            </div>',
            '            <div class="content-right">\n'
            '                <img src="assets/images/ai-machine-learning.jpg" alt="Kecerdasan Buatan dan Machine Learning" loading="lazy">\n'
            '            </div>',
        )
        body = body.replace(
            '            <div class="content-right">\n'
            '                <div class="visual-block">\n'
            '                    <img src="assets/images/industry-4.jpg" alt="Industry 4.0 dan 5.0" loading="lazy">\n'
            '                </div>\n'
            '            </div>',
            '            <div class="content-right">\n'
            '                <img src="assets/images/industry-4.jpg" alt="Industry 4.0 dan 5.0" loading="lazy">\n'
            '            </div>',
        )

        # Drop quiz Q1 (unicorn GoTo trivia) — soal then jawaban, then renumber.
        body = body.replace(
            '                <div class="quiz-q">\n'
            '                    <div class="q-text">1. Contoh unicorn Indonesia yang merupakan gabungan Gojek dan Tokopedia adalah?</div>\n'
            '                    <div class="q-options">\n'
            '                        <div class="q-opt">A. Bukalapak</div>\n'
            '                        <div class="q-opt">B. Traveloka</div>\n'
            '                        <div class="q-opt">C. GoTo</div>\n'
            '                        <div class="q-opt">D. Blibli</div>\n'
            '                    </div>\n'
            '                </div>\n',
            '',
        )
        body = body.replace(
            '                <div class="quiz-q">\n'
            '                    <div class="q-text">1. Contoh unicorn Indonesia yang merupakan gabungan Gojek dan Tokopedia adalah?</div>\n'
            '                    <div class="q-options">\n'
            '                        <div class="q-opt">A. Bukalapak</div>\n'
            '                        <div class="q-opt">B. Traveloka</div>\n'
            '                        <div class="q-opt correct">C. GoTo ✓</div>\n'
            '                        <div class="q-opt">D. Blibli</div>\n'
            '                    </div>\n'
            '                </div>\n',
            '',
        )
        # Renumber 2..5 -> 1..4 (str.replace rewrites both soal + jawaban).
        body = body.replace(
            '2. Teknologi yang memungkinkan mesin memahami bahasa manusia disebut?',
            '1. Teknologi yang memungkinkan mesin memahami bahasa manusia disebut?',
        )
        body = body.replace(
            '3. Perbedaan utama Industry 4.0 dan 5.0 adalah?',
            '2. Perbedaan utama Industry 4.0 dan 5.0 adalah?',
        )
        body = body.replace(
            '4. Singkatan dari Minimum Viable Product adalah?',
            '3. Singkatan dari Minimum Viable Product adalah?',
        )
        body = body.replace(
            '5. Prinsip 3R dalam pengelolaan e-waste adalah?',
            '4. Prinsip 3R dalam pengelolaan e-waste adalah?',
        )

        # The old Q5 (now Q4) still carries an inline
        # `grid-column: 1 / -1; max-width: 50%` that forces a full-width third
        # row. Strip it (both soal + jawaban) so 4 questions render as a clean
        # 2x2 grid.
        body = body.replace(
            '<div class="quiz-q" style="grid-column: 1 / -1; max-width: 50%;">',
            '<div class="quiz-q">',
        )

        # Referensi slide before the "Selanjutnya" slide (injected in 6e).
        refs6 = (
            '        <!-- ==================== SLIDE 17: Referensi ==================== -->\n'
            '        <section class="slide slide-full" data-slide="17">\n'
            '            <h2 class="text-left">Referensi</h2>\n'
            '            <div class="reference-list">\n'
            '                <p>1. Russell, S. &amp; Norvig, P. (2021). <em>Artificial Intelligence: A Modern Approach</em>. 4th ed. Pearson.</p>\n'
            '                <p>2. McCarthy, J. (1956). "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence."</p>\n'
            '                <p>3. European Commission (2021). <em>Industry 5.0: Towards a Sustainable, Human-centric and Resilient European Industry</em>.</p>\n'
            '                <p>4. Google, Temasek, &amp; Bain &amp; Company (2024). <em>e-Conomy SEA 2024: Indonesia</em>.</p>\n'
            '                <p>5. Baldé, C.P., et al. (2024). <em>The Global E-waste Monitor 2024</em>. UNITAR / ITU.</p>\n'
            '                <p>6. Startup Ranking (2024). <em>Startup Ecosystem Indonesia</em>.</p>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 6 — Dasar Teknologi Digital</span><span>17 / 19</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            '        <!-- ==================== Selanjutnya: Pertemuan 7 ==================== -->',
            refs6 + '        <!-- ==================== Selanjutnya: Pertemuan 7 ==================== -->',
        )

    # 6h) Pertemuan-7 content fixes (recap deck — legacy source untouched):
    #     - Inject a Hook slide (decks 1-6 all have one).
    #     - Kuis 5 -> 4: drop Q2 (XOR gate) — redundant with Q1 (bit/byte), both
    #       test the Pertemuan-2 foundation. Remaining 4 map 1:1 to the four
    #       recap clusters (foundation, internet, data, application).
    #     - Strip the inline `grid-column: 1 / -1` on the old Q5 so the 4
    #       questions render as a clean 2x2 grid (same fix as deck 6).
    #     - Update the agenda's stale "kuis 5 soal" -> "kuis 4 soal".
    #     - Resync the closing subtitle: after UTS the real next topic is
    #       "Pengolah Kata", not the stale "Algoritma & Pemrograman".
    if deck == "pertemuan-7.html":
        # Recap hook: bullets only, NO stats (recap decks 7 & 15 share this rule).
        hook7 = (
            '        <!-- ==================== SLIDE 2: Hook ==================== -->\n'
            '        <section class="slide slide-full" data-slide="2">\n'
            '            <h2>Saatnya Merefleksikan Perjalanan</h2>\n'
            '            <div class="slide-center">\n'
            '                <ul class="bullet-list">\n'
            '                    <li><strong>Fondasi digital</strong> — data, biner, sistem bilangan, dan gerbang logika</li>\n'
            '                    <li><strong>Internet &amp; aplikasi</strong> — web, cloud, media sosial, AI, dan industri 4.0</li>\n'
            '                    <li><strong>Keamanan &amp; etika digital</strong> — cybersecurity, privasi, dan tanggung jawab warga digital</li>\n'
            '                    <li><strong>Kuis 1</strong> — uji pemahaman menyeluruh sebagai persiapan UTS</li>\n'
            '                </ul>\n'
            '                <p class="body-text text-caption mt-lg">Semua materi Pertemuan 1–6 akan kita ingat kembali — lalu kita uji lewat kuis.</p>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 7 — Dasar Teknologi Digital</span><span>2 / 10</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            '        <!-- ==================== SLIDE 2: Agenda ==================== -->',
            hook7 + '        <!-- ==================== SLIDE 2: Agenda ==================== -->',
        )

        # Rangkuman h3 headings: drop the "Pertemuan N — " prefix (topic only).
        for old, new in [
            ('<h3>Pertemuan 1 — Pengenalan Teknologi Digital</h3>', '<h3>Pengenalan Teknologi Digital</h3>'),
            ('<h3>Pertemuan 2 — Bilangan &amp; Logika Digital</h3>', '<h3>Bilangan &amp; Logika Digital</h3>'),
            ('<h3>Pertemuan 3 — Internet &amp; Web</h3>', '<h3>Internet &amp; Web</h3>'),
            ('<h3>Pertemuan 4 — Transformasi Digital</h3>', '<h3>Transformasi Digital</h3>'),
            ('<h3>Pertemuan 5 — Data &amp; Keamanan</h3>', '<h3>Data &amp; Keamanan</h3>'),
            ('<h3>Pertemuan 6 — Aplikasi &amp; Etika Digital</h3>', '<h3>Aplikasi &amp; Etika Digital</h3>'),
        ]:
            body = body.replace(old, new)

        # Kuis slide: replace the question grid with a 50-minute countdown
        # timer. The actual quiz questions are supplied by the lecturer
        # (pengampu) per session — recap decks do NOT hardcode questions.
        _kuis7_re = re.compile(
            r'<!-- ==================== SLIDE 7: Kuis 1 ==================== -->\s*'
            r'<section class="slide slide-quiz" data-slide="7">.*?</section>\s*',
            flags=re.S,
        )
        _kuis7_new = (
            '        <!-- ==================== SLIDE 7: Kuis 1 ==================== -->\n'
            '        <section class="slide slide-full" data-slide="7">\n'
            '            <h2>Kuis 1: Uji Pemahaman</h2>\n'
            '            <div class="quiz-timer">\n'
            '                <div class="timer-circle">\n'
            '                    <svg viewBox="0 0 220 220">\n'
            '                        <circle class="bg" cx="110" cy="110" r="100"></circle>\n'
            '                        <circle class="progress" id="timer-progress-7" cx="110" cy="110" r="100"></circle>\n'
            '                    </svg>\n'
            '                    <div class="timer-content">\n'
            '                        <div class="timer-time" id="timer-display-7">50:00</div>\n'
            '                        <div class="timer-label">menit</div>\n'
            '                    </div>\n'
            '                </div>\n'
            '                <div class="timer-controls">\n'
            '                    <button class="timer-btn primary" id="timer-start-7">Mulai</button>\n'
            '                    <button class="timer-btn" id="timer-pause-7">Jeda</button>\n'
            '                    <button class="timer-btn" id="timer-reset-7">Reset</button>\n'
            '                </div>\n'
            '                <p class="body-text text-caption mt-md">Kuis dikerjakan maksimal <strong>50 menit</strong> — soal diberikan oleh dosen pengampu.</p>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 7 — Dasar Teknologi Digital</span><span>7 / 10</span></div>\n'
            '        </section>\n'
            '        <script>\n'
            '(function () {\n'
            '    var TOTAL = 50 * 60;\n'
            '    var CIRC = 628.32;\n'
            '    var remaining = TOTAL;\n'
            '    var interval = null;\n'
            '    var display = document.getElementById("timer-display-7");\n'
            '    var ring = document.getElementById("timer-progress-7");\n'
            '    function fmt(s) {\n'
            '        var m = Math.floor(s / 60);\n'
            '        var ss = s % 60;\n'
            '        return (m < 10 ? "0" : "") + m + ":" + (ss < 10 ? "0" : "") + ss;\n'
            '    }\n'
            '    function paint() {\n'
            '        display.textContent = fmt(remaining);\n'
            '        ring.style.strokeDashoffset = (CIRC * (1 - remaining / TOTAL)).toFixed(2);\n'
            '    }\n'
            '    function stop() { if (interval !== null) { clearInterval(interval); interval = null; } }\n'
            '    function tick() {\n'
            '        if (remaining > 0) { remaining--; paint(); }\n'
            '        if (remaining <= 0) stop();\n'
            '    }\n'
            '    function start() { if (interval === null && remaining > 0) interval = setInterval(tick, 1000); }\n'
            '    function reset() { stop(); remaining = TOTAL; paint(); }\n'
            '    document.getElementById("timer-start-7").addEventListener("click", start);\n'
            '    document.getElementById("timer-pause-7").addEventListener("click", stop);\n'
            '    document.getElementById("timer-reset-7").addEventListener("click", reset);\n'
            '    paint();\n'
            '})();\n'
            '        </script>\n\n'
        )
        body = _kuis7_re.sub(_kuis7_new, body, count=1)

        # Agenda: kuis is now a 50-minute timed session, not N questions.
        body = body.replace(
            '<h4>Refleksi &amp; Kuis 1</h4><p>Pertanyaan pemantik dan kuis 5 soal dari seluruh materi</p>',
            '<h4>Refleksi &amp; Kuis 1</h4><p>Pertanyaan pemantik dan kuis terjadwal (maks. 50 menit)</p>',
        )

        # Resync closing subtitle (real post-UTS topic is Pengolah Kata).
        body = body.replace(
            '<p class="closing-subtitle">Setelah UTS, kita akan masuk ke materi baru: <strong>Algoritma &amp; Pemrograman Dasar</strong> — dari konsep ke kode.</p>',
            '<p class="closing-subtitle">Setelah UTS, kita akan masuk ke materi baru: <strong>Microsoft Word — Pengolah Kata</strong> untuk dokumen akademik dan profesional.</p>',
        )

    # 6i) Pertemuan-9 content fixes (legacy source untouched):
    #     - Inject a Hook slide (decks 1-7 all have one).
    #     - Post-test 5 -> 4: drop Q1 (WYSIWYG) — the term is NOT taught
    #       anywhere in the deck body, so it violates "no question outside the
    #       material". Remaining 4 map 1:1 to core topics (save shortcut, paper
    #       size, page break, section break).
    #     - Strip the inline `grid-column: 1 / -1` on the old Q5 so the 4
    #       questions render as a clean 2x2 grid.
    #     - Inject a Referensi slide before the "Selanjutnya" slide (from 6e).
    if deck == "pertemuan-9.html":
        hook9 = (
            '        <!-- ==================== SLIDE 2: Hook ==================== -->\n'
            '        <section class="slide slide-full" data-slide="2">\n'
            '            <h2>Dokumen Ada di Mana-Mana</h2>\n'
            '            <div class="stats-row mb-md">\n'
            '                <div class="stat-box"><div class="stat-number">1,4 miliar</div><div class="stat-label">pengguna Microsoft<br>Word di dunia</div></div>\n'
            '                <div class="stat-box"><div class="stat-number">80%</div><div class="stat-label">dokumen akademik<br>&amp; kantor dibuat digital</div></div>\n'
            '                <div class="stat-box"><div class="stat-number">24/7</div><div class="stat-label">dokumen bisa diakses<br>dari mana saja</div></div>\n'
            '            </div>\n'
            '            <ul class="bullet-list mt-xl">\n'
            '                <li><strong>Laporan praktikum</strong> — tugas kuliah yang wajib rapi dan terstruktur</li>\n'
            '                <li><strong>Surat resmi &amp; proposal</strong> — organisasi, beasiswa, dan magang</li>\n'
            '                <li><strong>Skripsi &amp; publikasi</strong> — dokumen panjang dengan format ketat</li>\n'
            '            </ul>\n'
            '            <p class="body-text text-source">Sumber: Microsoft (2024), Statista (2023)</p>\n'
            '            <div class="slide-footer"><span>Pertemuan 9 — Dasar Teknologi Digital</span><span>2 / 17</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            '        <!-- ==================== SLIDE 2: Agenda ==================== -->',
            hook9 + '        <!-- ==================== SLIDE 2: Agenda ==================== -->',
        )

        # Drop quiz Q1 (WYSIWYG — not taught) + renumber + strip inline style.
        body = body.replace(
            '                <div class="quiz-q"><div class="q-text">1. Apa kepanjangan dari WYSIWYG?</div><div class="q-options"><div class="q-opt">A. What You See Is What You Get</div><div class="q-opt">B. What You Save Is What You Get</div><div class="q-opt">C. Write Your Script In Web Graphics</div><div class="q-opt">D. When You Start It Will Go</div></div></div>\n',
            '',
        )
        body = body.replace(
            '                <div class="quiz-q"><div class="q-text">1. Apa kepanjangan dari WYSIWYG?</div><div class="q-options"><div class="q-opt correct">A. What You See Is What You Get ✓</div><div class="q-opt">B. What You Save Is What You Get</div><div class="q-opt">C. Write Your Script In Web Graphics</div><div class="q-opt">D. When You Start It Will Go</div></div></div>\n',
            '',
        )
        body = body.replace(
            '<div class="q-text">2. Shortcut untuk menyimpan dokumen?</div>',
            '<div class="q-text">1. Shortcut untuk menyimpan dokumen?</div>',
        )
        body = body.replace(
            '<div class="q-text">3. Ukuran kertas standar di Indonesia?</div>',
            '<div class="q-text">2. Ukuran kertas standar di Indonesia?</div>',
        )
        body = body.replace(
            '<div class="q-text">4. Untuk memaksa teks ke halaman baru, gunakan?</div>',
            '<div class="q-text">3. Untuk memaksa teks ke halaman baru, gunakan?</div>',
        )
        body = body.replace(
            '<div class="q-text">5. Fitur yang membagi dokumen menjadi section independen?</div>',
            '<div class="q-text">4. Fitur yang membagi dokumen menjadi section independen?</div>',
        )
        body = body.replace(
            '<div class="quiz-q" style="grid-column: 1 / -1; max-width: 50%;">',
            '<div class="quiz-q">',
        )

        # Referensi slide before the "Selanjutnya" slide (injected in 6e).
        refs9 = (
            '        <!-- ==================== SLIDE 15: Referensi ==================== -->\n'
            '        <section class="slide slide-full" data-slide="15">\n'
            '            <h2 class="text-left">Referensi</h2>\n'
            '            <div class="reference-list">\n'
            '                <p>1. Microsoft. (2024). "Word Help &amp; Learning." <em>support.microsoft.com/word</em></p>\n'
            '                <p>2. Lambert, J., &amp; Frye, C. (2022). <em>Microsoft Word Step by Step (Office 2021 and Microsoft 365)</em>. Microsoft Press.</p>\n'
            '                <p>3. Gookin, D. (2021). <em>Word For Dummies (Office 2021 Edition)</em>. John Wiley &amp; Sons.</p>\n'
            '                <p>4. Google. (2024). "Docs Editors Help." <em>support.google.com/docs</em></p>\n'
            '                <p>5. Statista. (2023). "Most used office productivity software worldwide." <em>statista.com</em></p>\n'
            '            </div>\n'
            '            <div class="slide-footer"><span>Pertemuan 9 — Dasar Teknologi Digital</span><span>15 / 17</span></div>\n'
            '        </section>\n\n'
        )
        body = body.replace(
            '        <!-- ==================== Selanjutnya: Pertemuan 10 ==================== -->',
            refs9 + '        <!-- ==================== Selanjutnya: Pertemuan 10 ==================== -->',
        )

    # 7) Editorial masthead: replace the legacy `.meta` pill row
    #    (course · meeting) with a journal-style signature line.
    #    Course goes left (small-caps), meeting number right.
    body = re.sub(
        r'<div\s+class="meta">\s*'
        r'<div\s+class="meta-item"><span>(.*?)</span></div>\s*'
        r'<div\s+class="meta-item"><span>.*?</span></div>\s*'
        r'<div\s+class="meta-item"><span>(.*?)</span></div>\s*'
        r'</div>',
        lambda m: (
            '<div class="masthead">'
            f'<span class="masthead-course">{m.group(1).strip()}</span>'
            f'<span class="masthead-part">{m.group(2).strip()}</span>'
            '</div>'
        ),
        body,
        flags=re.S,
    )

    # 8) Normalize pertemuan-13's title header: it used a `.pertemuan-badge`
    #    pill instead of the DIKTI + ITERA logos every other deck shows.
    body = re.sub(
        r'<span\s+class="pertemuan-badge">.*?</span>',
        '<img src="assets/dikti-saintek-1.png" alt="DIKTI Saintek Berdampak">\n'
        '                    <img src="assets/itera-1.png" alt="ITERA">',
        body,
        flags=re.S,
    )

    # 8b) Renumber data-slide + footer page counts in document order.
    #      Idempotent; corrects decks whose slide count changed (injected
    #      Hook + Referensi) and passes through already-sequential decks.
    body = _renumber_slides(body)

    # 9) Assemble the new document.
    doc = (
        HEAD.format(
            title=title,
            reset=ASSET_LINKS["reset"],
            reveal=ASSET_LINKS["reveal"],
            slides=ASSET_LINKS["slides"],
            deck=ASSET_LINKS["deck"],
            fonts=ASSET_LINKS["fonts"],
            font=ASSET_LINKS["font"],
        )
        + body
        + FOOT.format(
            reveal_js=ASSET_LINKS["reveal_js"],
            notes=ASSET_LINKS["notes"],
            zoom=ASSET_LINKS["zoom"],
            search=ASSET_LINKS["search"],
        )
    )

    out_name = deck
    out_path = os.path.join(ROOT, out_name)
    with open(out_path, "w", encoding="utf-8") as fh:
        fh.write(doc)

    n_sections = doc.count("<section")
    n_src = html.count('<div class="slide')
    print(f"{out_name}: {n_sections} slides  (archive/{deck}: {n_src} slide-divs)")


def main() -> None:
    generate_reveal_css()
    for deck in DECKS:
        if not os.path.exists(os.path.join(SRC_DIR, deck)):
            print(f"skip {deck}: missing", file=sys.stderr)
            continue
        build(deck)
    print("done")


if __name__ == "__main__":
    main()
