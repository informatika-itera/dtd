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
  Col,
  Cols,
  ContentSlide,
  DataTable,
  DocLines,
  DocPage,
  DocRow,
  Download,
  EquivTable,
  Flow,
  MockPop,
  Para,
  SheetGroup,
  SplitSlide,
  Step,
  StepHead,
  Steps,
  TaskHead,
} from '../layouts/blocks';
import { I } from '../ui';

const quiz: QuizItem[] = [
  { q: <>Menu Google Docs untuk menambahkan sitasi dan daftar pustaka otomatis?</>, options: [<>Insert → Page elements → Table of contents</>, <>Tools → Citations</>, <>Format → Styles</>, <>Extensions → Add-ons</>], answer: 1 },
  { q: <>Agar Daftar Isi otomatis mendeteksi judul, teks harus memakai?</>, options: [<>Bold manual</>, <>Heading style</>, <>Ukuran besar</>, <>Warna merah</>], answer: 1 },
  { q: <>Fitur untuk menandai status dokumen (mis. "DRAFT") di belakang teks?</>, options: [<>Watermark (Insert → Page elements → Watermark)</>, <>Page border</>, <>Highlight</>, <>Comment</>], answer: 0 },
  { q: <>Mode Google Docs untuk melihat, menerima, dan menolak perubahan reviewer?</>, options: [<>Mode Viewing</>, <>Mode Editing</>, <>Mode Suggesting</>, <>Mode Print</>], answer: 2 },
];

export default function Pertemuan10() {
  return (
    <>
      <TitleSlide meeting={10} title="Pengolah Kata Bagian 2" lede="Fitur lanjutan pengolah kata (Google Docs, cadangan Microsoft Word): header & footer, sitasi, watermark, cetak, kolaborasi, dan dokumen berulang" />

      <HookSlide title="Apakah Dokumen Anda Lolos?"
        lede="Periksa laporan terakhir yang Anda kumpulkan:"
        notes="Minta mahasiswa menghitung berapa kotak yang bisa mereka centang untuk laporan terakhir mereka. Pertemuan ini membuat keempatnya terpenuhi."
      >
        <Cards cols={4} tight>
          <Card icon="check_box_outline_blank" title={<>Nomor halaman</>}><p>Otomatis dan benar di setiap halaman?</p></Card>
          <Card icon="check_box_outline_blank" title={<>Struktur</>}><p>Judul bab memakai heading, bukan sekadar huruf besar?</p></Card>
          <Card icon="check_box_outline_blank" title={<>Dapat diakses</>}><p>Gambar punya teks alternatif dan tautan bermakna?</p></Card>
          <Card icon="check_box_outline_blank" title={<>Dokumen berulang</>}><p>Surat serupa dibuat dari templat, bukan disalin manual?</p></Card>
        </Cards>
      </HookSlide>

      <AgendaSlide title="Agenda Pertemuan" items={[
        { title: "Header, Footer & Page Numbering", desc: "Mengelola informasi di setiap halaman dokumen" },
        { title: "Daftar Isi Otomatis", desc: "Membuat TOC dari heading secara otomatis" },
        { title: "Sitasi & Daftar Pustaka", desc: "Tools → Citations (APA, MLA, Chicago)" },
        { title: "Watermark & Cetak", desc: "Pengamanan dan pengaturan cetak dokumen" },
        { title: "Fitur Kolaborasi & Template", desc: "Komentar, mode suggesting, dan template profesional" },
        { title: "Dokumen Berulang & Aksesibilitas", desc: "Templat, Find & Replace, dan dokumen yang mudah diakses" },
        { title: "Padanan Menu", desc: "Google Docs sebagai utama, Microsoft Word sebagai cadangan" },
        { title: "Tugas Praktikum", desc: "Sitasi & dokumen terstruktur di Google Docs" },
      ]} />

      <SectionSlide part={1} of={4} title="Header, Footer, dan Nomor Halaman" desc={<>Section break dan Different first page</>} />

      <SplitSlide title="Header, Footer & Page Numbering"
        left={<>
          <Callout title={<>Apa Itu Header & Footer?</>}>Area di <strong>atas</strong> (header) dan <strong>bawah</strong> (footer) setiap halaman yang otomatis muncul di semua halaman. Bisa berisi nomor halaman, judul dokumen, nama penulis, atau tanggal.</Callout>
          <Para>Cara menambahkan: <strong>Insert → Page elements → Header</strong> (atau Footer). Klik area header/footer untuk mulai mengedit.</Para>
          <Para>Gunakan <strong>Insert → Page elements → Page number</strong> untuk menambahkan nomor halaman otomatis di posisi yang diinginkan.</Para>
          <Callout title={<>Tips</>}>Centang <strong>"Different first page"</strong> pada area header/footer untuk menyembunyikannya di halaman pertama (cover).</Callout>
        </>}
        right={<>
          <DocRow>
            <DocPage w={165} caption={<>Halaman 1 (sampul): <strong>tanpa</strong> header</>}>
              <b className="dp-h1">Laporan</b><b className="dp-h2">Praktikum</b><DocLines pattern={[70, 50]} />
            </DocPage>
            <DocPage w={165} header={<span>Judul Laporan</span>} footer="2" caption={<>Halaman 2: header dan nomor otomatis</>}>
              <DocLines pattern={[100, 100, 100, 70, 100, 100, 60, 100]} />
            </DocPage>
          </DocRow>
        </>} />

      <ContentSlide title="Page Numbering & Section Break">
        <Cards cols={4}>
          <Card icon="pin" title={<>Page Number</>}><p>Insert → Page elements → Page number → pilih posisi (kiri/kanan header atau footer) atau <strong>More options</strong></p></Card>
          <Card icon="square_foot" title={<>Rentang Nomor</>}><p>Docs: <strong>More options → Apply to</strong> memilih halaman atau section yang bernomor. Angka Romawi ada di Word: <strong>Format Page Numbers</strong></p></Card>
          <Card icon="content_cut" title={<>Section Break</>}><p>Insert → Break → <strong>Section break (next page)</strong>. Membagi dokumen menjadi section berbeda</p></Card>
          <Card icon="link" title={<>Unlink Header</>}><p>Hapus centang <strong>"Link to previous"</strong> di header/footer tiap section agar berbeda</p></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Section Break Memungkinkan Header dan Footer yang Berbeda" notes="Tunjukkan di Docs: sisipkan section break, klik header section baru, hapus centang Link to previous, lalu ubah teks header. Padanan Word: Link to Previous pada tab Header & Footer.">
        <DocRow>
          <DocPage w={200} header={<span>Bab 1</span>} footer="1" caption="Halaman 1"><DocLines pattern={[100, 100, 70, 100, 100, 60]} /></DocPage>
          <DocPage w={200} header={<span>Bab 1</span>} footer="2" caption="Halaman 2"><DocLines pattern={[100, 100, 100, 70, 100]} /></DocPage>
          <div className="pgsep"><span>Section break</span><b>⇢</b></div>
          <DocPage w={200} header={<span>Lampiran</span>} footer="3" caption="Halaman 3 (section baru)"><DocLines pattern={[100, 100, 60, 100, 100]} /></DocPage>
        </DocRow>
        <Callout title={<>Caranya</>}>Sisipkan <strong>Insert → Break → Section break (next page)</strong>, klik header atau footer section baru, lalu <strong>hapus centang “Link to previous”</strong> sebelum mengubah isinya.</Callout>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Halaman sampul tidak boleh memuat nomor halaman. Pengaturan yang dipakai?</>}
        options={[<>Different first page</>, <>Hapus semua nomor halaman</>, <>Ubah ukuran kertas</>, <>Gunakan page border</>]} answer={0}
        why={<>Centang <strong>Different first page</strong> pada header atau footer agar halaman pertama tidak ikut bernomor.</>}
        notes="Padanan di Word: Different First Page." />

      <SectionSlide part={2} of={4} title="Daftar Isi dan Sitasi" desc={<>Heading otomatis, sitasi, dan daftar pustaka</>} />

      <SplitSlide title="Daftar Isi Otomatis (TOC)"
        left={<>
          <DataTable><thead><tr><th>Langkah</th><th>Aksi</th></tr></thead><tbody><tr><td><code>1</code></td><td>Beri format <strong>Heading 1, 2, 3</strong> pada judul</td></tr><tr><td><code>2</code></td><td>Letakkan kursor di halaman TOC</td></tr><tr><td><code>3</code></td><td>Insert → <strong>Page elements → Table of contents</strong></td></tr><tr><td><code>4</code></td><td>Pilih dengan nomor halaman atau tautan biru</td></tr><tr><td><code>5</code></td><td>Klik ikon <strong>Refresh (↻)</strong> pada TOC saat konten berubah</td></tr></tbody></DataTable>
          <Callout title={<>Penting</>}>Selalu gunakan <strong>Heading Style</strong> (bukan bold manual) agar TOC bisa mendeteksi judul secara otomatis.</Callout>
        </>}
        right={<>
          <DocPage w={340} orient="landscape" caption={<>Heading 1–3 menjadi daftar isi; klik entri untuk melompat, <strong>Refresh</strong> memperbarui nomor.</>}>
            <b className="dp-h1">Daftar Isi</b>
            <span className="dp-toc"><span>1 Pendahuluan</span><span>1</span></span>
            <span className="dp-toc in"><span>1.1 Latar Belakang</span><span>2</span></span>
            <span className="dp-toc"><span>2 Metode</span><span>4</span></span>
            <span className="dp-toc"><span>3 Hasil</span><span>6</span></span>
          </DocPage>
        </>} />

      <ContentSlide title="Sitasi & Daftar Pustaka">
        <Flow>
          <Box title={<>1. Sumber</>} primary><p>Buku, website,<br />jurnal, surat kabar</p></Box>
          <Arrow glyph="→" />
          <Box title={<>2. Citations</>}><p>Tools → Citations<br />pilih gaya APA/MLA/Chicago</p></Box>
          <Arrow glyph="→" />
          <Box title={<>3. Daftar Pustaka</>}><p>Insert bibliography<br />terisi otomatis</p></Box>
        </Flow>
        <Callout title={<>Cara Kerja</>}>Buka <strong>Tools → Citations</strong> → pilih gaya (APA 7, MLA 8, Chicago 17) → <strong>+ Add citation source</strong> (cari buku via ISBN atau website via URL) → klik <strong>Cite</strong> untuk sitasi di teks, lalu <strong>Insert bibliography</strong> untuk daftar pustaka.</Callout>
      </ContentSlide>

      <SplitSlide title="Contoh Sitasi & Daftar Pustaka"
        left={<>
          <h3>Jenis Sumber yang Didukung</h3>
          <DataTable><thead><tr><th>Tipe</th><th>Cari otomatis</th></tr></thead><tbody><tr><td>Book</td><td>ISBN</td></tr><tr><td>Website</td><td>URL</td></tr><tr><td>Journal article</td><td>manual</td></tr><tr><td>Newspaper article</td><td>manual</td></tr></tbody></DataTable>
          <h3>Sitasi In-Text</h3>
          <Callout>Hasil penelitian menunjukkan <strong>(Santoso, 2023)</strong>…<br /><br />Daftar pustaka muncul otomatis dengan klik <strong>Insert bibliography</strong>.</Callout>
        </>}
        right={<>
          <DocPage w={360} orient="landscape" caption={<>Sitasi in-text menunjuk ke entri di daftar pustaka.</>}>
            <p>Hasil penelitian menunjukkan peningkatan <mark>(Santoso, 2023)</mark>.</p>
            <b className="dp-h2">Daftar Pustaka</b>
            <p>Santoso, B. (2023). <em>Judul buku contoh.</em> Penerbit.</p>
          </DocPage>
        </>} />

      <SectionSlide part={3} of={4} title="Watermark dan Cetak" desc={<>Watermark, border, cetak, dan PDF</>} />

      <ContentSlide title="Watermark & Page Border">
        <Cols>
          <Col title={<><I n="water_drop" /> Watermark</>}><ul><li>Insert → Page elements → Watermark → pilih <strong>Teks</strong> atau <strong>Gambar</strong></li><li>Bisa <strong>teks</strong> ("DRAFT", "RAHASIA") atau <strong>gambar</strong> (logo)</li><li>Atur skala, transparansi, dan posisi di panel samping</li><li>Tampil di belakang teks pada semua halaman</li><li>Berguna untuk menandai status dokumen</li></ul></Col>
          <Col title={<><I n="image" /> Page Border</>}><ul><li>Tidak ada menu Page Borders di Docs — gunakan <strong>tabel 1×1</strong> atau <strong>Drawing</strong></li><li>Atur garis & warna via <strong>Table properties</strong> atau <strong>Drawing</strong></li><li>Atur style garis (solid, dashed, double)</li><li>Warna dan ketebalan bisa dikustomisasi</li><li>Atur posisinya ke <strong>Behind text</strong> agar jadi bingkai latar</li></ul></Col>
        </Cols>
      </ContentSlide>

      <ContentSlide title="Watermark dan Page Border: Hasilnya di Halaman" notes="Docs tidak punya menu Page Border; tabel 1×1 atau Drawing menjadi pengganti. Di Word: Design → Page Borders.">
        <DocRow>
          <DocPage w={230} wm="DRAFT" caption={<>Watermark: <strong>Insert → Page elements → Watermark</strong></>}>
            <b className="dp-h1">Proposal</b><DocLines pattern={[100, 100, 70, 100, 100, 60]} />
          </DocPage>
          <DocPage w={230} bordered caption={<>Page border: <strong>tabel 1×1</strong> atau <strong>Drawing</strong></>}>
            <b className="dp-h1">Sertifikat</b><DocLines pattern={[100, 80, 100, 50]} />
          </DocPage>
        </DocRow>
      </ContentSlide>

      <ContentSlide title="Pengaturan Cetak & Export PDF">
        <Cols>
          <Col title={<><I n="print" /> Pengaturan Print</>}><ul><li><strong>Pages</strong> — semua halaman atau halaman tertentu</li><li><strong>Copies</strong> — jumlah salinan yang dicetak</li><li><strong>Layout</strong> — portrait atau landscape</li><li><strong>Paper size</strong> — A4, Letter, Legal, dll.</li><li>Margin dan orientasi dokumen diatur di <strong>File → Page setup</strong></li><li>Tekan <strong><code>Ctrl + P</code></strong> untuk preview sebelum mencetak</li></ul></Col>
          <Col title={<><I n="description" /> Export ke PDF</>}><ul><li><strong>File → Download → PDF Document (.pdf)</strong> — format tetap, standar industri</li><li>Batasi akses buka dokumen via tombol <strong>Share</strong> (Viewer / Commenter / Editor)</li><li>Alternatif: <strong>File → Print</strong> → tujuan "Save as PDF"</li></ul></Col>
        </Cols>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Dokumen akan dikirim ke banyak orang dan tampilannya harus sama di semua perangkat. Format terbaik?</>}
        options={[<>PDF</>, <>Berkas teks .txt</>, <>Berkas yang masih bisa diedit</>, <>Tangkapan layar</>]} answer={0}
        why={<><strong>PDF</strong> menjaga tata letak tetap sama di semua perangkat. Ekspor lewat <strong>File → Download → PDF</strong>.</>}
        notes="Bahas kapan perlu format yang masih bisa diedit." />

      <SectionSlide part={4} of={4} title="Kolaborasi dan Aksesibilitas" desc={<>Komentar, Suggesting, templat, dan dokumen yang mudah diakses</>} />

      <SplitSlide title="Fitur Kolaborasi & Template"
        left={<>
          <Callout title={<><I n="chat" /> Comments</>}>Insert → Comment (atau <strong><code>Ctrl + Alt + M</code></strong>). Tambahkan catatan tanpa mengubah isi dokumen.</Callout>
          <Callout title={<><I n="edit_note" /> Mode Suggesting</>}>Mode <strong>Suggesting</strong> (dropdown Editing, kanan atas). Semua perubahan ditandai — bisa diterima atau ditolak satu per satu.</Callout>
          <Callout title={<><I n="content_paste" /> Template</>}>Buka <strong>docs.google.com → Template gallery</strong> → pilih template (surat, laporan, CV). Template sudah punya format dan layout siap pakai.</Callout>
        </>}
        right={<>
          <DocPage w={360} orient="landscape" caption={<>Suggesting menandai perubahan; Comment memberi catatan tanpa mengubah isi.</>}>
            <p>Laporan <del>dikumpul</del> <ins>dikumpulkan</ins> hari Jumat.</p>
            <DocLines pattern={[100, 80]} />
            <MockPop><I n="chat" /> Tolong tambahkan sumber.</MockPop>
          </DocPage>
        </>} />

      <ContentSlide title="Dokumen Berulang: Templat & Find–Replace">
        <Flow>
          <Box icon="description" title={<>1. Templat induk</>} primary><p>Dokumen berpenanda <code>[[NAMA]]</code></p></Box>
          <Arrow glyph="→" />
          <Box icon="content_copy" title={<>2. Salin</>}><p>Make a copy (Docs) / Save As (Word)</p></Box>
          <Arrow glyph="→" />
          <Box icon="find_replace" title={<>3. Ganti penanda</>}><p><code>Ctrl + H</code>, isi data sebenarnya</p></Box>
          <Arrow glyph="→" />
          <Box icon="picture_as_pdf" title={<>4. Periksa & ekspor</>}><p>Baca ulang, ekspor PDF</p></Box>
        </Flow>
        <Callout title={<>Untuk apa? Surat undangan, surat tugas, laporan mingguan</>}>Susunannya sama, hanya isinya berganti. Beri nama berkas konsisten (mis. <code>Undangan_NamaPenerima_2026-10</code>), jangan menimpa templat induk, dan cari sisa penanda <code>[[</code> sebelum mengirim.</Callout>
        <Download file="dtd-p10-templat-surat.docx" />
      </ContentSlide>

      <QuickCheckSlide
        q={<>Setelah menyalin templat induk surat, langkah berikutnya untuk membuat surat baru adalah…</>}
        options={[<>Mengetik ulang seluruh surat</>, <>Mengganti penanda dengan data sebenarnya memakai <code>Ctrl + H</code></>, <>Menghapus semua format</>, <>Mengubah ukuran kertas</>]} answer={1}
        why={<>Templat berpenanda dibuat sekali, lalu penandanya diganti lewat <strong>Find &amp; Replace</strong> untuk tiap penerima.</>}
        notes="Unduh templat surat dari slide sebelumnya." />

      <ContentSlide title="Dokumen yang Rapi & Mudah Diakses">
        <Cards cols={3} tight>
          <Card icon="format_list_numbered" title={<>Struktur dengan Heading</>}><p>Pakai Heading 1–3, bukan sekadar huruf tebal, agar daftar isi dan pembaca layar memahami struktur.</p></Card>
          <Card icon="image" tone="secondary" title={<>Teks alternatif gambar</>}><p>Beri deskripsi singkat pada gambar penting: klik kanan gambar → Alt text.</p></Card>
          <Card icon="text_fields" tone="tertiary" title={<>Huruf & kontras</>}><p>Ukuran isi minimal 11 pt, teks gelap di latar terang, jangan hanya mengandalkan warna.</p></Card>
          <Card icon="table_chart" title={<>Tabel yang jelas</>}><p>Tandai baris judul dan hindari sel gabungan yang berlebihan.</p></Card>
          <Card icon="link" tone="secondary" title={<>Tautan bermakna</>}><p>Tulis “Panduan sitasi APA”, bukan “klik di sini”.</p></Card>
          <Card icon="picture_as_pdf" tone="tertiary" title={<>Berkas siap kirim</>}><p>Nama berkas jelas, judul dokumen terisi, ekspor PDF, dan periksa tampilan di perangkat lain.</p></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Teks Alternatif dan Tautan Bermakna Membantu Semua Pembaca" notes="Teks alternatif dibaca pembaca layar dan tampil saat gambar gagal dimuat. Tautan “klik di sini” tidak bermakna bila dibaca di luar konteks.">
        <SheetGroup>
          <div><h3><I n="cancel" /> Sebelum</h3>
            <DocPage w={380} orient="landscape">
              <div className="dp-row"><div className="dp-img sm"><I n="image" /></div><span>alt: <code>foto1.png</code></span></div>
              <p>Panduan ada <span className="dp-link">klik di sini</span>.</p>
              <DocLines pattern={[100, 70]} />
            </DocPage></div>
          <div><h3><I n="check_circle" /> Sesudah</h3>
            <DocPage w={380} orient="landscape">
              <div className="dp-row"><div className="dp-img sm"><I n="bar_chart" /></div><span>alt: penjualan naik 20% pada Mei</span></div>
              <p>Baca <span className="dp-link">Panduan sitasi APA</span>.</p>
              <DocLines pattern={[100, 70]} />
            </DocPage></div>
        </SheetGroup>
        <Callout title={<>Mengapa penting?</>}>Pembaca layar membacakan teks alternatif gambar dan daftar tautan. “klik di sini” tidak menjelaskan tujuan; <strong>deskripsi singkat</strong> menjelaskannya.</Callout>
      </ContentSlide>

      <ContentSlide title="Padanan Menu: Google Docs ↔ Microsoft Word">
        <EquivTable main="Google Docs" backup="Microsoft Word" rows={[
          ["Header & footer", "Insert → Page elements → Header / Footer", "Insert → Header / Footer"],
          ["Nomor halaman", "Insert → Page elements → Page number", "Insert → Page Number"],
          ["Daftar isi otomatis", "Insert → Page elements → Table of contents", "References → Table of Contents"],
          ["Sitasi & daftar pustaka", "Tools → Citations", "References → Insert Citation / Bibliography"],
          ["Watermark", "Insert → Page elements → Watermark", "Design → Watermark"],
          ["Komentar", "Insert → Comment (Ctrl + Alt + M)", "Review → New Comment"],
          ["Revisi (terima/tolak)", "Mode Suggesting (kanan atas)", "Review → Track Changes"],
          ["Templat", "File → New → From a template", "File → New"],
          ["Ekspor PDF", "File → Download → PDF document (.pdf)", "File → Save As → PDF"],
        ]} />
      </ContentSlide>

      <ContentSlide title="Tugas Praktikum: Sitasi & Dokumen Terstruktur">
        <TaskHead>
          <Callout title={<>Tugas (±30 menit)</>}>Buat dokumen akademik singkat dengan sitasi & daftar pustaka, lengkapi dengan header/footer, daftar isi, dan watermark — dikerjakan mandiri selama kelas.</Callout>
          <Download file="dtd-p10-templat-laporan.docx" />
        </TaskHead>
        <StepHead>Langkah 1–4</StepHead>
        <Steps cols={2}>
          <Step n={1} title={<>Buat dokumen</>}><>Buka <strong>docs.google.com → Blank document</strong>, beri nama <code>DTD_P10_NIM_NAMA</code>.</></Step>
          <Step n={2} title={<>Struktur konten</>}><>Tulis 2 paragraf bertopik <strong>"Manfaat Teknologi Digital"</strong> dengan judul bagian memakai <strong>Heading 1</strong>.</></Step>
          <Step n={3} title={<>Tambah sitasi</>}><><strong>Tools → Citations</strong> → pilih gaya <strong>APA</strong> → <strong>+ Add citation source</strong> (minimal 1 buku via ISBN dan 1 website via URL).</></Step>
          <Step n={4} title={<>Watermark</>}><><strong>Insert → Page elements → Watermark</strong> → pilih <strong>Teks</strong>, ketik "DRAFT", atur transparansi.</></Step>
        </Steps>
      </ContentSlide>

      <ContentSlide title="Tugas Praktikum: Sitasi & Dokumen Terstruktur (lanjutan)">
        <StepHead>Langkah 5–8</StepHead>
        <Steps cols={2}>
          <Step n={5} title={<>Header & footer</>}><><strong>Insert → Page elements → Header</strong> berisi judul; footer: <strong>Insert → Page elements → Page number</strong>.</></Step>
          <Step n={6} title={<>Daftar isi</>}><>Letakkan kursor di atas dokumen, lalu <strong>Insert → Page elements → Table of contents</strong>.</></Step>
          <Step n={7} title={<>Sisipkan daftar pustaka</>}><>Klik <strong>Cite</strong> pada sumber di paragraf, lalu <strong>Insert bibliography</strong> di akhir dokumen.</></Step>
          <Step n={8} title={<>Export & kumpulkan</>}><><strong>File → Download → PDF Document (.pdf)</strong>, lalu share link dokumen ke dosen.</></Step>
        </Steps>
        <Callout title={<>Kriteria Pengumpulan</>}>Nama dokumen sesuai format, minimal 2 sitasi (buku & website), daftar pustaka otomatis, header/footer + nomor halaman, TOC dari heading, watermark DRAFT, dan tautan share berfungsi.</Callout>
      </ContentSlide>

      <QuizSlide title="Post-Test: Uji Pemahaman" items={quiz} />

      <SummarySlide title="Rangkuman Pertemuan 10" points={[
        <><strong>Header & footer</strong> menampilkan informasi konsisten di setiap halaman; page numbering bisa dikustomisasi format dan posisinya.</>,
        <><strong>Daftar isi otomatis (TOC)</strong> dibuat dari heading style dan bisa di-update sekali klik saat konten berubah.</>,
        <><strong>Sitasi & daftar pustaka</strong> (Tools → Citations) menghasilkan sitasi in-text dan daftar pustaka otomatis dalam gaya APA, MLA, atau Chicago.</>,
        <><strong>Watermark & page border</strong> digunakan untuk menandai status dokumen dan mempercantik tampilan halaman.</>,
        <><strong>Fitur kolaborasi</strong> (komentar, mode suggesting) memudahkan review dan revisi bersama; download PDF menjaga format tetap konsisten.</>,
        <><strong>Dokumen berulang</strong> dikerjakan dengan templat + Find & Replace, dan dokumen yang baik harus <strong>rapi serta mudah diakses</strong>; konsepnya sama di Google Docs maupun Word.</>,
      ]} />

      <ReferencesSlide refs={[
        <>Google. (2024). "Google Docs Editors Help." <em>support.google.com/docs</em></>,
        <>Google. (2024). "Use headers, footers, page numbers, & footnotes." <em>support.google.com/docs/answer/86629</em></>,
        <>Google. (2024). "Add a title, heading, or table of contents in a document." <em>support.google.com/docs/answer/116338</em></>,
        <>Google. (2024). "Add citations and a bibliography." <em>support.google.com/docs/answer/10090962</em></>,
        <>Google. (2024). "Add watermarks." <em>support.google.com/docs/answer/11560109</em></>,
        <>Google. (2024). "Suggest edits in Google Docs." <em>support.google.com/docs/answer/6033474</em></>,
      ]} />

      <ClosingSlide lede={<>Fitur lanjutan pengolah kata membantu Anda membuat dokumen profesional, efisien, dan siap kolaborasi.</>} quote={<>"Well done is better than well said."</>} cite={<>— Benjamin Franklin</>} next="Pertemuan 11: Spreadsheet — Pengenalan & Dasar-Dasar"
        notes={"Topik pertemuan berikutnya: Pengenalan Spreadsheet — Sel, baris, kolom, dan format; Rumus Dasar — Formula dan fungsi perhitungan; Chart & Grafik — Visualisasi data."} />

    </>
  );
}
