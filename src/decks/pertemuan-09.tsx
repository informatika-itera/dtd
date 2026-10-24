import {
  AgendaSlide,
  ClosingSlide,
  HookSlide,
  QuickCheckSlide,
  type QuizItem,
  QuizSlide,
  ReferencesSlide,
  SectionSlide,
  SummarySlide,
  TitleSlide,
} from '../layouts';
import {
  Arrow,
  Box,
  Callout,
  Card,
  Cards,
  ContentSlide,
  DataTable,
  DocLines,
  DocPage,
  DocRow,
  Download,
  EquivTable,
  Flow,
  MockPop,
  PaperSizes,
  Para,
  SheetGroup,
  SplitSlide,
  Step,
  StepHead,
  Steps,
  Tag,
  Tags,
  TaskHead,
} from '../layouts/blocks';
import { I } from '../ui';

const quiz: QuizItem[] = [
  { q: <>Shortcut untuk menyimpan dokumen?</>, options: [<><code>Ctrl + P</code></>, <><code>Ctrl + S</code></>, <><code>Ctrl + D</code></>, <><code>Ctrl + N</code></>], answer: 1 },
  { q: <>Ukuran kertas standar di Indonesia?</>, options: [<>Letter</>, <>Legal</>, <>A4</>, <>F4</>], answer: 2 },
  { q: <>Untuk memaksa teks ke halaman baru, gunakan?</>, options: [<>Enter berulang</>, <>Page Break (<code>Ctrl + Enter</code>)</>, <>Tab</>, <>Spasi berulang</>], answer: 1 },
  { q: <>Fitur yang membagi dokumen menjadi section independen?</>, options: [<>Page Break</>, <>Section Break</>, <>Column Break</>, <>Line Break</>], answer: 1 },
];

export default function Pertemuan09() {
  return (
    <>
      <TitleSlide meeting={9} title="Pengolah Kata Bagian 1" lede="Mengenal dasar-dasar pengolah kata (word processor) untuk membuat, memformat, dan mengelola dokumen profesional. Keterampilan minimal literasi digital mahasiswa dan lulusan ITERA" />

      <HookSlide title="Malam Sebelum Tenggat Laporan"
        lede="Skenario yang akrab bagi hampir semua mahasiswa:"
        notes="Ceritakan skenario ini, lalu minta mahasiswa mengangkat tangan untuk tiap masalah yang pernah dialami. Pertemuan ini menjawab keempatnya."
      >
        <Steps cols={2}>
          <Step n={1} title={<>Versi bertumpuk</>}><code>laporan_final_REVISI2_beneran.docx</code></Step>
          <Step n={2} title={<>Format tak seragam</>}>Margin dan huruf tiap anggota berbeda</Step>
          <Step n={3} title={<>Daftar isi manual</>}>Nomor halaman bergeser setelah satu paragraf ditambah</Step>
          <Step n={4} title={<>Berkas hilang</>}>Laptop mati sebelum sempat menyimpan</Step>
        </Steps>
      </HookSlide>

      <AgendaSlide title="Agenda Pertemuan" items={[
        { title: "Apa Itu Pengolah Kata?", desc: "Pengenalan Google Docs" },
        { title: "Satu Konsep, Banyak Aplikasi", desc: "Google Docs sebagai utama, Microsoft Word sebagai cadangan, dan padanan menunya" },
        { title: "Format Teks Dasar", desc: "Jenis huruf, ukuran, perataan, dan warna" },
        { title: "Layout Halaman", desc: "Margin, orientasi, dan ukuran kertas" },
        { title: "Menyisipkan Objek", desc: "Gambar, tabel, bentuk, dan grafik" },
        { title: "Fitur Lanjutan", desc: "Page break, styles, find & replace, dan shortcut" },
        { title: "Tugas Praktikum", desc: "Membuat dokumen Google Docs secara mandiri" },
      ]} />

      <ContentSlide title="Apa Itu Pengolah Kata?">
        <Callout title={<>Definisi</>}>Pengolah kata (word processor) adalah aplikasi untuk membuat, mengedit, memformat, dan mencetak dokumen berbasis teks.</Callout>
        <Para>Contoh populer:</Para>
        <Tags><Tag>Google Docs</Tag><Tag>Microsoft Word</Tag><Tag>LibreOffice Writer</Tag><Tag>WPS Writer</Tag><Tag>Pages (macOS)</Tag></Tags>
        <Flow>
          <Box icon="edit" title={<>Tulis</>} primary><p>Ketik & edit teks</p></Box>
          <Arrow glyph="→" />
          <Box icon="palette" title={<>Format</>} primary><p>Atur tampilan</p></Box>
          <Arrow glyph="→" />
          <Box icon="print" title={<>Cetak</>} primary><p>Simpan / Print</p></Box>
        </Flow>
      </ContentSlide>

      <ContentSlide title="Satu Konsep, Banyak Aplikasi">
        <Para tone="caption">Keterampilan mengolah dokumen berlaku di aplikasi apa pun — yang berbeda hanya letak menunya.</Para>
        <Cards cols={3}>
          <Card icon="cloud" title={<>Google Docs</>}><p>Aplikasi utama perkuliahan: gratis, tersimpan otomatis, dan mudah dikerjakan bersama. Perlu koneksi internet.</p></Card>
          <Card icon="desktop_windows" tone="secondary" title={<>Microsoft Word</>}><p>Cadangan bila internet bermasalah: bekerja offline dan menyimpan berkas <code>.docx</code>. Setiap langkah praktikum punya padanan menu di Word.</p></Card>
          <Card icon="description" tone="tertiary" title={<>Aplikasi lain</>}><p>LibreOffice Writer, WPS Writer, atau Pages. Konsepnya sama: struktur dokumen, gaya, dan tata letak.</p></Card>
        </Cards>
        <Callout title={<>Yang dipelajari adalah konsep, bukan produk</>}>Heading & style, margin & orientasi, tabel & gambar, page/section break, find & replace. Berkas <code>.docx</code> dapat dibuka di Google Docs maupun Word, sehingga pekerjaan bisa berpindah aplikasi kapan saja.</Callout>
      </ContentSlide>

      <SectionSlide part={1} of={4} title="Format Teks" desc={<>Font, ukuran, warna, dan format yang konsisten</>} />

      <ContentSlide title="Format Teks Dasar">
        <Cards cols={3} tight>
          <Card icon="text_fields" title={<>Jenis Huruf (Font)</>}><p>Pilih font untuk mengatur karakter teks. Serif (Times New Roman) untuk dokumen formal, Sans-serif (Arial, Roboto) untuk modern.</p></Card>
          <Card icon="square_foot" title={<>Ukuran & Gaya</>}><p>Atur ukuran (pt), <strong>tebal</strong> (bold), <em>miring</em> (italic), garis bawah (underline), dan highlight.</p></Card>
          <Card icon="swap_horiz" title={<>Perataan (Alignment)</>}><p>Rata kiri, rata kanan, rata tengah, atau rata kiri-kanan (justify) untuk tampilan rapi.</p></Card>
        </Cards>
        <Callout title={<>Tips</>}>Gunakan ukuran 11–12 pt untuk isi dokumen, 14–16 pt untuk sub-judul, dan 18–24 pt untuk judul utama.</Callout>
      </ContentSlide>

      <ContentSlide title="Format Konsisten Membuat Dokumen Mudah Dipindai" notes="Minta mahasiswa menunjuk apa yang membuat halaman kiri melelahkan dibaca: warna, ukuran, dan perataan berganti-ganti tanpa aturan.">
        <DocRow>
          <DocPage w={215} caption={<><I n="cancel" /> Tidak konsisten</>}>
            <b className="dp-bad1">Laporan Praktikum</b><span className="dp-bad2">Pendahuluan</span><DocLines pattern={[100, 65, 90]} /><span className="dp-bad3">Metode</span><DocLines pattern={[80, 100, 55]} />
          </DocPage>
          <DocPage w={215} caption={<><I n="check_circle" /> Konsisten</>}>
            <b className="dp-h1">Laporan Praktikum</b><b className="dp-h2">Pendahuluan</b><DocLines pattern={[100, 100, 100, 60]} /><b className="dp-h2">Metode</b><DocLines pattern={[100, 100, 100, 70]} />
          </DocPage>
        </DocRow>
        <Callout title={<>Aturan praktis</>}>Satu font untuk isi, ukuran bertingkat (judul &gt; subjudul &gt; isi), satu warna aksen, dan perataan yang sama di seluruh dokumen.</Callout>
      </ContentSlide>

      <SplitSlide title="Warna Teks & Highlight"
        left={<>
          <Para>Mengatur warna teks dan latar belakang membantu menonjolkan informasi penting dalam dokumen.</Para>
          <DataTable><thead><tr><th>Fitur</th><th>Fungsi</th></tr></thead><tbody><tr><td>Warna Teks</td><td>Mengubah warna huruf (ikon "A" di toolbar)</td></tr><tr><td>Highlight</td><td>Warna latar belakang teks (ikon stabilo di toolbar)</td></tr><tr><td>Borders & Shading</td><td>Warna latar paragraf via <strong>Format → Paragraph styles → Borders and shading</strong></td></tr></tbody></DataTable>
          <Callout title={<>Praktik Terbaik</>}>Gunakan warna secara konsisten. Maksimal 2–3 warna dalam satu dokumen agar tetap profesional.</Callout>
        </>}
        right={<>
          <figure className="docdemo good">
            <figcaption><I n="check_circle" /> Konsisten: 2 warna</figcaption>
            <p>Batas pengumpulan: <mark className="hl-y">Jumat, 17.00 WIB</mark>. Berkas setelah itu <span className="tc-r">tidak diterima</span>.</p>
          </figure>
          <figure className="docdemo bad">
            <figcaption><I n="cancel" /> Terlalu ramai: 5 warna</figcaption>
            <p><span className="tc-b">Batas</span> <mark className="hl-g">pengumpulan</mark>: <span className="tc-r">Jumat</span>, <mark className="hl-y">17.00</mark> <span className="tc-p">WIB</span>. <mark className="hl-b">Berkas</mark> <span className="tc-g">setelah</span> <span className="tc-r">itu</span> <mark className="hl-y">tidak</mark> diterima.</p>
          </figure>
          <Para tone="caption">Mata langsung menemukan batas waktu di contoh pertama; di contoh kedua tidak ada yang menonjol.</Para>
        </>} />

      <QuickCheckSlide
        q={<>Ukuran huruf yang lazim untuk isi dokumen resmi adalah…</>}
        options={[<>11–12 pt</>, <>24 pt</>, <>6 pt</>, <>40 pt</>]} answer={0}
        why={<>Isi dokumen: <strong>11–12 pt</strong>. Sub-judul 14–16 pt, judul utama 18–24 pt.</>}
        notes="Tunjukkan dua dokumen dengan ukuran berbeda." />

      <SectionSlide part={2} of={4} title="Layout dan Objek" desc={<>Margin, orientasi, kertas, gambar, dan tabel</>} />

      <ContentSlide title="Layout Halaman">
        <Cards cols={3} tight>
          <Card icon="straighten" title={<>Margin</>}><p>Jarak tepi teks ke pinggir kertas. Default Google Docs: <strong>1 inci (2,54 cm)</strong> untuk semua sisi. Ubah via <strong>File → Page setup</strong>.</p></Card>
          <Card icon="sync" title={<>Orientasi</>}><p><strong>Portrait</strong> (vertikal) untuk dokumen biasa. <strong>Landscape</strong> (horizontal) untuk tabel lebar atau poster.</p></Card>
          <Card icon="description" title={<>Ukuran Kertas</>}><p><strong>A4</strong> (21 × 29,7 cm) standar Indonesia. <strong>Letter</strong> (21,6 × 27,9 cm) standar Amerika. <strong>F4</strong> (21,5 × 33 cm) memerlukan ukuran kustom atau add-on (tidak tersedia bawaan).</p></Card>
        </Cards>
        <Callout title={<>Akses Layout</>}><strong>File → Page setup</strong> → atur margin, orientasi, dan ukuran kertas.</Callout>
      </ContentSlide>

      <ContentSlide title="Margin, Orientasi, dan Ukuran Kertas Terlihat Seperti Ini" notes="Tunjukkan File → Page setup di Docs. Margin bawaan 1 inci (2,54 cm); A4 adalah standar Indonesia.">
        <SheetGroup>
          <div><h3>Margin</h3>
            <DocPage w={250} caption="Bawaan Docs: 1 inci (2,54 cm)"><span className="dp-guide" /><span className="dp-glabel">2,54 cm</span><DocLines pattern={[100, 100, 100, 70, 100, 100, 60]} /></DocPage></div>
          <div><h3>Orientasi</h3>
            <DocRow>
              <DocPage w={140} caption="Portrait"><DocLines pattern={[100, 100, 70, 100]} /></DocPage>
              <DocPage w={200} orient="landscape" caption="Landscape"><DocLines pattern={[100, 100, 70]} /></DocPage>
            </DocRow></div>
          <div><h3>Ukuran kertas</h3><PaperSizes /></div>
        </SheetGroup>
      </ContentSlide>

      <ContentSlide title="Menyisipkan Objek">
        <Cards cols={4}>
          <Card icon="image" title={<>Gambar</>}><p>Sisipkan foto atau ilustrasi dari file atau online. Atur perataan teks: <strong>In line</strong>, <strong>Wrap text</strong>, atau <strong>Break text</strong>.</p></Card>
          <Card icon="bar_chart" title={<>Tabel</>}><p>Organisasi data dalam baris & kolom. Pilih jumlah baris × kolom, lalu format warna & border.</p></Card>
          <Card icon="hexagon" title={<>Bentuk (Shapes)</>}><p>Buat via <strong>Insert → Drawing → New</strong> (bentuk, panah, callout), lalu <strong>Save and close</strong>.</p></Card>
          <Card icon="trending_up" title={<>Grafik (Chart)</>}><p>Bar, column, line, pie. Dibuat di Google Sheets, lalu disisipkan via <strong>Insert → Chart → From Sheets</strong>.</p></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Pengaturan Gambar Mengubah Aliran Teks" notes="Tunjukkan satu gambar yang sama dengan tiga pengaturan. In line memperlakukan gambar seperti huruf; Wrap text membiarkan teks mengalir di sekelilingnya; Break text memindahkan teks di atas dan di bawah gambar.">
        <DocRow>
          <DocPage w={310} orient="landscape" caption="In line"><div className="dp-row"><i /><div className="dp-img sm"><I n="image" /></div><i /></div><DocLines pattern={[100, 100, 70]} /></DocPage>
          <DocPage w={310} orient="landscape" caption="Wrap text"><div className="dp-wrap"><div className="dp-img"><I n="image" /></div><div className="lines"><i /><i /><i /></div></div><DocLines pattern={[100, 70]} /></DocPage>
          <DocPage w={310} orient="landscape" caption="Break text"><DocLines pattern={[100, 100]} /><div className="dp-img"><I n="image" /></div><DocLines pattern={[100, 70]} /></DocPage>
        </DocRow>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Grafik batang untuk laporan di Google Docs dibuat di aplikasi mana lalu disisipkan?</>}
        options={[<>Google Sheets</>, <>Google Forms</>, <>Google Drive</>, <>Google Meet</>]} answer={0}
        why={<>Grafik dibuat di <strong>Google Sheets</strong>, lalu disisipkan lewat <strong>Insert → Chart → From Sheets</strong>.</>}
        notes="Padanan di Word: Insert → Chart." />

      <SectionSlide part={3} of={4} title="Struktur Dokumen" desc={<>Page break, section break, styles, dan heading</>} />

      <SplitSlide title="Page Break & Section Break"
        left={<>
          <Callout title={<>Page Break</>}>Memaksa teks lanjut ke halaman baru. Shortcut: <code>Ctrl + Enter</code>. Berguna sebelum bab baru atau daftar pustaka.</Callout>
          <Callout title={<>Section Break</>}>Membagi dokumen menjadi bagian independen. Disisipkan via <strong>Insert → Break</strong>. Setiap section bisa punya orientasi dan header/footer berbeda.</Callout>
          <DataTable><thead><tr><th>Tipe</th><th>Fungsi</th></tr></thead><tbody><tr><td>Section break (next page)</td><td>Section baru dimulai di halaman baru</td></tr><tr><td>Section break (continuous)</td><td>Section baru di halaman yang sama</td></tr></tbody></DataTable>
        </>}
        right={<>
          <div className="pgflow" role="img" aria-label="Section 1 berorientasi portrait, lalu section break, lalu section 2 berorientasi landscape dengan header berbeda">
            <div className="pgcol">
              <div className="pg portrait"><span className="pg-head">Bab 1</span><i /><i /><i /><i className="short" /><i /><i /></div>
              <span className="pg-cap">Section 1<br />Portrait</span>
            </div>
            <div className="pgsep"><span>Section break</span><b>⇢</b></div>
            <div className="pgcol">
              <div className="pg landscape"><span className="pg-head">Lampiran</span><div className="pg-table"><i /><i /><i /><i /><i /><i /></div></div>
              <span className="pg-cap">Section 2<br />Landscape</span>
            </div>
          </div>
          <Para tone="caption">Setiap section boleh punya orientasi, header, dan footer sendiri. Page break hanya pindah halaman.</Para>
        </>} />

      <ContentSlide title="Styles & Headings">
        <Cards cols={2}>
          <Card icon="sell" title={<>Styles</>}><p>Format teks yang sudah didefinisikan sebelumnya (Title, Subtitle, Heading 1–6, Normal text). Memastikan konsistensi format di seluruh dokumen.</p><Tags><Tag>Title</Tag><Tag>Subtitle</Tag><Tag>Heading 1</Tag><Tag>Heading 2</Tag><Tag>Heading 3</Tag><Tag>Normal text</Tag></Tags></Card>
          <Card icon="bookmarks" title={<>Table of Contents</>}><p>Dengan menerapkan Styles judul (Heading 1, 2, 3), Google Docs bisa otomatis membuat Daftar Isi (Table of Contents) yang bisa di-update.</p>          <Callout title={<>Cara</>}><strong>Insert → Page elements → Table of contents</strong> → pilih dengan nomor halaman atau tautan biru.</Callout></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Heading Membentuk Struktur yang Bisa Dibaca Komputer" notes="Judul yang hanya ditebalkan terlihat sama bagi mata, tetapi komputer tidak mengenalinya sebagai judul; daftar isi dan navigasi hanya memakai Heading style.">
        <SheetGroup>
          <div><h3><I n="cancel" /> Judul manual (hanya ditebalkan)</h3>
            <DocPage w={380} orient="landscape"><b className="dp-plain">Pendahuluan</b><DocLines pattern={[100, 70]} /><b className="dp-plain">Metode</b><DocLines pattern={[100, 60]} /></DocPage>
            <MockPop>Daftar isi dan navigasi: <strong>kosong</strong></MockPop></div>
          <div><h3><I n="check_circle" /> Heading style</h3>
            <DocPage w={380} orient="landscape"><b className="dp-h1">Pendahuluan</b><DocLines pattern={[100, 70]} /><b className="dp-h2">Metode</b><DocLines pattern={[100, 60]} /></DocPage>
            <MockPop>Daftar isi dan navigasi: <strong>Pendahuluan · Metode</strong></MockPop></div>
        </SheetGroup>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Daftar isi otomatis hanya bisa dibuat bila judul bab memakai…</>}
        options={[<>Huruf tebal dan besar secara manual</>, <>Heading style (Heading 1–3)</>, <>Tabel dua kolom</>, <>Page break</>]} answer={1}
        why={<>Daftar isi mendeteksi judul dari <strong>Heading style</strong>, bukan dari tampilan huruf.</>}
        notes="Tunjukkan perbedaan judul manual dan Heading." />

      <SectionSlide part={4} of={4} title="Alat Bantu" desc={<>Find & Replace dan pintasan keyboard</>} />

      <SplitSlide title="Find & Replace"
        left={<>
        <Para>Mencari dan mengganti teks secara massal di seluruh dokumen.</Para>
        <DataTable><thead><tr><th>Aksi</th><th>Shortcut</th><th>Keterangan</th></tr></thead><tbody><tr><td>Find</td><td><code>Ctrl + F</code></td><td>Mencari teks</td></tr><tr><td>Replace</td><td><code>Ctrl + H</code></td><td>Cari & ganti teks</td></tr><tr><td>Find Next</td><td><code>Ctrl + G</code></td><td>Kecocokan berikutnya</td></tr></tbody></DataTable>
        <Callout title={<>Fitur Lanjutan</>}>Gunakan <strong>Match case</strong> untuk pencarian case-sensitive dan <strong>Match using regular expressions</strong> untuk pola fleksibel.</Callout>
        </>}
        right={<>
          <MockPop><div className="dp-dialog">
            <div className="dp-field"><b>Find</b><span className="in">2025</span></div>
            <div className="dp-field"><b>Replace with</b><span className="in">2026</span></div>
            <span>☑ Match case · ☐ Match using regular expressions</span>
            <div className="dp-btns"><span className="dp-btn">Replace</span><span className="dp-btn pri">Replace all</span></div>
          </div></MockPop>
          <Para tone="caption">Satu langkah mengganti semua kemunculan, misalnya tahun pada laporan berulang.</Para>
        </>} />

      <ContentSlide title="Shortcut Penting">
        <Cards cols={4} tight>
          <Card icon="format_bold" title={<>Ctrl + B</>} mono><p>Bold (tebal)</p></Card>
          <Card icon="ink_pen" title={<>Ctrl + I</>} mono><p>Italic (miring)</p></Card>
          <Card icon="format_underlined" title={<>Ctrl + U</>} mono><p>Underline (garis bawah)</p></Card>
          <Card icon="undo" title={<>Ctrl + Z</>} mono><p>Undo (batalkan)</p></Card>
          <Card icon="redo" title={<>Ctrl + Shift + Z</>} mono><p>Redo (ulangi)</p></Card>
          <Card icon="check_circle" title={<>Ctrl + A</>} mono><p>Select all (pilih semua)</p></Card>
          <Card icon="content_paste" title={<>Ctrl + C / X / V</>} mono><p>Copy / Cut / Paste</p></Card>
          <Card icon="keyboard" title={<>Ctrl + /</>} mono><p>Daftar semua shortcut</p></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Padanan Menu: Google Docs ↔ Microsoft Word">
        <EquivTable main="Google Docs" backup="Microsoft Word" rows={[
          ["Ukuran kertas & margin", "File → Page setup", "Layout → Margins / Size"],
          ["Orientasi halaman", "File → Page setup → Orientation", "Layout → Orientation"],
          ["Gaya judul (Heading)", "Format → Paragraph styles", "Home → Styles"],
          ["Sisipkan tabel / gambar", "Insert → Table / Image", "Insert → Table / Pictures"],
          ["Page break / section break", "Insert → Break", "Insert → Page Break; Layout → Breaks"],
          ["Find & Replace", <code>Ctrl + H</code>, <code>Ctrl + H</code>],
          ["Ekspor PDF", "File → Download → PDF document (.pdf)", "File → Save As → PDF"],
        ]} />
        <Callout title={<>Berpindah aplikasi</>}>Google Docs membuka <code>.docx</code> (unggah ke Drive → Buka dengan Google Docs). Dari Google Docs, simpan untuk Word lewat <strong>File → Download → Microsoft Word (.docx)</strong>.</Callout>
      </ContentSlide>

      <ContentSlide title="Tugas Praktikum: Dokumen Digital Pertama">
        <TaskHead>
          <Callout title={<>Tugas (±30 menit)</>}>Buat dokumen Google Docs rapi yang menerapkan format teks, layout halaman, dan penyisipan objek — dikerjakan mandiri selama kelas.</Callout>
          <Download file="dtd-p09-templat-dokumen.docx" />
        </TaskHead>
        <StepHead>Langkah 1–4</StepHead>
        <Steps cols={2}>
          <Step n={1} title={<>Buat dokumen baru</>}><>Buka <strong>docs.google.com</strong> → pilih <strong>Blank document</strong>. Ganti nama dokumen menjadi <code>DTD_P09_NIM_NAMA</code> (contoh: <code>DTD_P09_12212345_Budi</code>).</></Step>
          <Step n={2} title={<>Ketik konten</>}><>Tulis <strong>3–5 kalimat</strong> dengan topik <strong>"Manfaat Teknologi Digital dalam Perkuliahan"</strong>.</></Step>
          <Step n={3} title={<>Terapkan Styles</>}><>Baris judul pakai <strong>Heading 1</strong>; paragraf isi pakai <strong>Normal text</strong> ukuran 11–12 pt.</></Step>
          <Step n={4} title={<>Atur layout</>}><>Buka <strong>File → Page setup</strong>: kertas <strong>A4</strong>, orientasi <strong>Portrait</strong>, margin <strong>atas 3 cm, bawah 3 cm, kiri 4 cm, kanan 3 cm</strong>.</></Step>
        </Steps>
      </ContentSlide>

      <ContentSlide title="Tugas Praktikum: Dokumen Digital Pertama (lanjutan)">
        <StepHead>Langkah 5–8</StepHead>
        <Steps cols={2}>
          <Step n={5} title={<>Sisipkan tabel</>}><>Masukkan tabel minimal <strong>3 kolom × 2 baris</strong> (1 baris judul + 1 baris data) berisi data sederhana, mis. daftar mata kuliah.</></Step>
          <Step n={6} title={<>Sisipkan gambar & penekanan</>}><>Tambahkan 1 gambar dengan perataan <strong>Wrap text</strong>. <strong>Tebalkan</strong> kata kunci dan beri <strong>highlight</strong> pada istilah penting.</></Step>
          <Step n={7} title={<>Atur akses berbagi</>}><>Klik tombol <strong>Share</strong> (kanan atas) → pada <strong>General access</strong> pilih <strong>Anyone with the link</strong> → biarkan role <strong>Viewer</strong> → klik <strong>Done</strong>.</></Step>
          <Step n={8} title={<>Salin & kumpulkan tautan</>}><>Klik <strong>Share</strong> lagi → <strong>Copy link</strong> → tempel tautan tersebut ke form/LMS pengumpulan dosen.</></Step>
        </Steps>
        <Callout title={<>Kriteria Pengumpulan</>}>Nama dokumen sesuai format <code>DTD_P09_NIM_NAMA</code>, margin 3-3-4-3 cm, tabel minimal 3×2, minimal 1 gambar, dan tautan share berfungsi.</Callout>
      </ContentSlide>

      <QuizSlide title="Post-Test: Uji Pemahaman" items={quiz} />

      <SummarySlide title="Rangkuman Pertemuan 9" points={[
        <>Pengolah kata (word processor) adalah aplikasi untuk membuat, mengedit, dan memformat dokumen — contoh: <strong>Google Docs</strong> dan <strong>Microsoft Word</strong>.</>,
        <>Format teks dasar meliputi <strong>jenis huruf, ukuran, gaya (bold/italic), perataan, dan warna</strong>.</>,
        <><strong>Layout halaman</strong> mencakup margin, orientasi (portrait/landscape), dan ukuran kertas (A4, Letter).</>,
        <>Objek seperti <strong>gambar, tabel, bentuk, dan grafik</strong> dapat disisipkan untuk memperkaya dokumen.</>,
        <>Fitur lanjutan seperti <strong>Page/Section Break, Styles, Find & Replace, dan shortcut</strong> meningkatkan produktivitas secara signifikan.</>,
        <>Yang dipelajari adalah <strong>konsep, bukan produk</strong>: Google Docs sebagai aplikasi utama dan Microsoft Word sebagai cadangan memakai konsep yang sama.</>,
      ]} />

      <ReferencesSlide refs={[
        <>Google. (2024). "Google Docs Editors Help." <em>support.google.com/docs</em></>,
        <>Google. (2024). "Keyboard shortcuts for Google Docs." <em>support.google.com/docs/answer/179738</em></>,
        <>Google. (2024). "Add different headers and footers or page numbers in Google Docs." <em>support.google.com/docs/answer/86629</em></>,
        <>Google. (2024). "Add a title, heading, or table of contents in a document." <em>support.google.com/docs/answer/116338</em></>,
        <>Google. (2024). "Add borders and shading to a paragraph." <em>support.google.com/docs/answer/1663349</em></>,
        <>Google. (2024). "Insert and arrange text, shapes, diagrams, and lines." <em>support.google.com/docs/answer/179740</em></>,
      ]} />

      <ClosingSlide lede={<>Pengolah kata adalah keterampilan dasar yang akan digunakan di setiap aspek akademik dan profesional. Terus berlatih!</>} quote={<>"The pen is mightier than the sword."</>} cite={<>— Edward Bulwer-Lytton</>} next="Pertemuan 10: Pengolah Kata Bagian 2 — Sitasi, Review & Kolaborasi"
        notes={"Topik pertemuan berikutnya: Sitasi & Daftar Pustaka — Tools → Citations, APA/MLA/Chicago; Daftar Isi Otomatis — Navigasi dokumen profesional; Kolaborasi & Template — Bekerja bersama dalam dokumen."} />

    </>
  );
}
