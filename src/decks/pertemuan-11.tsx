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
  Callout,
  Card,
  Cards,
  ContentSlide,
  DataTable,
  Download,
  EquivTable,
  MockPop,
  Para,
  SheetGrid,
  SheetGroup,
  SplitSlide,
  Step,
  StepHead,
  Steps,
  TaskHead,
} from '../layouts/blocks';
import { I } from '../ui';

const quiz: QuizItem[] = [
  { q: <>Rumus untuk menjumlahkan sel <code>A1</code> sampai <code>A10</code> adalah?</>, options: [<><code>=TOTAL(A1:A10)</code></>, <><code>=SUM(A1:A10)</code></>, <><code>=ADD(A1:A10)</code></>, <><code>=PLUS(A1:A10)</code></>], answer: 1 },
  { q: <>Referensi absolut ditulis dengan simbol?</>, options: [<><code>#A#1</code></>, <><code>@A@1</code></>, <><code>$A$1</code></>, <><code>&A&1</code></>], answer: 2 },
  { q: <>Fitur yang membatasi input di sel adalah?</>, options: [<>Protect Sheet</>, <>Conditional Format</>, <>Data Validation</>, <>Sort & Filter</>], answer: 2 },
  { q: <>Grafik yang cocok untuk menampilkan tren waktu adalah?</>, options: [<>Pie Chart</>, <>Bar Chart</>, <>Line Chart</>, <>Radar Chart</>], answer: 2 },
];

export default function Pertemuan11() {
  return (
    <>
      <TitleSlide meeting={11} title="Pengolah Angka Bagian 1" lede="Mengenal spreadsheet, memformat sel, mengurutkan data, menggunakan rumus dasar, dan membuat grafik dengan Google Sheets (utama) dan Microsoft Excel (cadangan). Keterampilan minimal literasi digital mahasiswa dan lulusan ITERA" />

      <HookSlide title="Ubah Satu Harga, Hitung Ulang Semuanya"
        lede="Anggaran kegiatan dengan tiga pos:"
        notes="Minta satu mahasiswa menghitung total di papan, lalu ubah harga konsumsi. Bandingkan dengan sel yang menghitung sendiri. Ini alasan spreadsheet ada."
      >
        <DataTable><thead><tr><th>Pos</th><th>Jumlah</th><th>Harga satuan</th><th>Total</th></tr></thead><tbody>
          <tr><td>Konsumsi</td><td><code>40</code></td><td><code>Rp 15.000</code></td><td><code>Rp 600.000</code></td></tr>
          <tr><td>Spanduk</td><td><code>2</code></td><td><code>Rp 120.000</code></td><td><code>Rp 240.000</code></td></tr>
          <tr><td>Sertifikat</td><td><code>40</code></td><td><code>Rp 5.000</code></td><td><code>Rp 200.000</code></td></tr>
        </tbody></DataTable>
        <Callout title={<>Jika harga konsumsi naik jadi Rp 18.000</>}>Hitung ulang manual untuk puluhan baris, atau biarkan sel yang menghitung sendiri?</Callout>
      </HookSlide>

      <AgendaSlide title="Agenda Pertemuan" items={[
        { title: "Pengenalan Spreadsheet", desc: "Konsep spreadsheet; Google Sheets sebagai utama, Excel sebagai cadangan" },
        { title: "Format Sel & Proteksi", desc: "Format angka, mata uang, tanggal, persen, validasi data, protect sheet" },
        { title: "Rumus Dasar", desc: "SUM, AVERAGE, MAX, MIN, COUNT serta referensi relatif & absolut" },
        { title: "Sortir & Filter", desc: "Mengurutkan dan menyaring data secara efisien" },
        { title: "Chart & Grafik", desc: "Memvisualisasikan data dengan grafik batang, garis, dan pai" },
        { title: "Padanan Menu & Tugas Praktikum", desc: "Google Sheets ↔ Excel dan latihan dengan data anggaran kegiatan" },
      ]} />

      <SectionSlide part={1} of={3} title="Dasar Spreadsheet" desc={<>Sel, baris, kolom, dan format sel</>} />

      <ContentSlide title="Apa Itu Spreadsheet?">
        <Cards cols={4} tight>
          <Card icon="bar_chart" title={<>Spreadsheet</>}><p>Aplikasi pengolah data berupa tabel baris & kolom untuk perhitungan, analisis, dan visualisasi</p></Card>
          <Card icon="cloud" tone="secondary" title={<>Google Sheets (utama)</>}><p>Aplikasi utama perkuliahan: berbasis cloud, gratis, kolaborasi real-time. Perlu internet.</p></Card>
          <Card icon="desktop_windows" tone="tertiary" title={<>Microsoft Excel (cadangan)</>}><p>Dipakai bila internet bermasalah: bekerja offline, berkas <code>.xlsx</code>. Padanan menu ada di slide praktikum.</p></Card>
          <Card icon="edit_note" title={<>Komponen Dasar</>}><p><strong>Cell</strong> (sel), <strong>Baris</strong> (1, 2, 3…), <strong>Kolom</strong> (A, B, C…), <strong>Sheet</strong> (tab), <strong>Workbook</strong> (file)</p></Card>
        </Cards>
        <Callout title={<>Sel Referensi</>}>Setiap sel punya alamat unik: <code>kolom + baris</code>. Contoh: <code>A1</code> = kolom A, baris 1. <code>D15</code> = kolom D, baris 15.</Callout>
      </ContentSlide>

      <ContentSlide title="Format Sel: Number, Currency, Date, %">
        <Cards cols={4} tight>
          <Card icon="pin" title={<>Number (Angka)</>}><p>Mengatur jumlah desimal, pemisah ribuan. Contoh: <code>1.234,56</code></p></Card>
          <Card icon="payments" title={<>Currency (Mata Uang)</>}><p>Simbol Rp / $ + format angka. Contoh: <code>Rp 1.500.000</code></p></Card>
          <Card icon="calendar_month" title={<>Date (Tanggal)</>}><p>Berbagai format: DD/MM/YYYY, 5 Agustus 2026, dll.</p></Card>
          <Card glyph="%" title={<>Percentage (%)</>}><p>Angka dikali 100 + tanda %. Contoh: <code>0,85 → 85%</code></p></Card>
        </Cards>
        <Callout title={<>Cara Memformat</>}>Pilih sel → <strong>Format → Number</strong> (Sheets) atau <strong>Home → Number Format</strong> (Excel). Pintasan <strong>khusus Excel</strong>: <code>Ctrl+1</code> membuka dialog Format Cells.</Callout>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Nilai <code>0,85</code> ingin ditampilkan sebagai <code>85%</code>. Format sel yang dipilih adalah…</>}
        options={[<>Number</>, <>Currency</>, <>Date</>, <>Percentage</>]} answer={3}
        why={<>Format <strong>Percentage</strong> mengalikan nilai dengan 100 dan menambahkan tanda %.</>}
        notes="Coba di Sheets: ubah format tanpa mengubah isi sel." />

      <SectionSlide part={2} of={3} title="Mengelola Data" desc={<>Sortir, filter, validasi, dan proteksi</>} />

      <SplitSlide title="Sortir & Filter Data"
        left={<>
          <h3>Sort (Urutkan)</h3>
          <Callout title={<>Sort Ascending (A→Z)</>}>Mengurutkan data dari kecil ke besar / A ke Z. Berguna untuk melihat urutan abjad atau angka terkecil dulu.</Callout>
          <Callout title={<>Sort Descending (Z→A)</>}>Mengurutkan dari besar ke kecil / Z ke A. Cocok untuk melihat nilai tertinggi atau penjualan terbanyak.</Callout>
          <h3>Filter (Saring)</h3>
          <Callout title={<>AutoFilter</>}>Menyaring data berdasarkan kriteria tertentu tanpa menghapus baris lain. Aktifkan: Sheets <strong>Data → Create a filter</strong>; Excel <strong>Data → Filter</strong> atau <code>Ctrl+Shift+L</code> (khusus Excel).</Callout>
        </>}
        right={<>
          <SheetGrid cols={['A', 'B', 'C']} rowNums={[1, 3, 5]}
            rows={[['Nama', 'Nilai', 'Status'], ['Rina', { v: '92', c: 'num found' }, 'Lulus'], ['Budi', { v: '85', c: 'num found' }, 'Lulus']]}
            caption={<>Filter <strong>Nilai ≥ 80</strong>: baris 2 dan 4 hanya <strong>disembunyikan</strong> (nomor baris melompat), tidak dihapus.</>} />
        </>} />

      <ContentSlide title="Sortir dan Filter Mengubah Tampilan, Bukan Datanya" notes="Tunjukkan di Sheets: urutkan lalu lakukan Undo; filter lalu hapus filter. Tekankan bahwa nomor baris yang melompat menandakan baris disembunyikan, bukan hilang.">
        <SheetGroup>
          <div><h3>Data asli</h3><SheetGrid cols={['A', 'B', 'C']} rows={[['Nama', 'Nilai', 'Status'], ['Andi', { v: '64', c: 'num' }, 'Remedial'], ['Rina', { v: '92', c: 'num' }, 'Lulus'], ['Dewi', { v: '78', c: 'num' }, 'Lulus'], ['Budi', { v: '85', c: 'num' }, 'Lulus']]} /></div>
          <div><h3>Sort Nilai Z→A</h3><SheetGrid cols={['A', 'B', 'C']} rows={[['Nama', { v: 'Nilai ▼', c: 'key' }, 'Status'], ['Rina', { v: '92', c: 'num found' }, 'Lulus'], ['Budi', { v: '85', c: 'num found' }, 'Lulus'], ['Dewi', { v: '78', c: 'num found' }, 'Lulus'], ['Andi', { v: '64', c: 'num found' }, 'Remedial']]} /></div>
          <div><h3>Filter Nilai ≥ 80</h3><SheetGrid cols={['A', 'B', 'C']} rowNums={[1, 3, 5]} rows={[['Nama', { v: 'Nilai ⏷', c: 'key' }, 'Status'], ['Rina', { v: '92', c: 'num found' }, 'Lulus'], ['Budi', { v: '85', c: 'num found' }, 'Lulus']]} /></div>
        </SheetGroup>
        <Callout title={<>Bedanya</>}><strong>Sort</strong> menyusun ulang baris. <strong>Filter</strong> menyembunyikan baris yang tidak memenuhi syarat — nomor baris melompat (1, 3, 5) dan data aslinya tetap ada.</Callout>
      </ContentSlide>

      <SplitSlide title="Validasi Data"
        left={<>
          <Para>Data Validation membatasi apa yang boleh dimasukkan ke dalam sel — mencegah kesalahan input.</Para>
          <Callout title={<>Contoh Aturan</>}>• Hanya angka antara <code>1</code> – <code>100</code><br /> • Tanggal dalam rentang tertentu<br /> • Pilihan dari dropdown list<br /> • Teks dengan panjang maksimal</Callout>
          <Callout title={<>Pesan Error Kustom</>}>Tampilkan pesan saat input tidak valid, misalnya: “Nilai harus antara 1–100!”</Callout>
        </>}
        right={<>
          <SheetGrid cols={['A', 'B', 'C']}
            rows={[['Item', 'Nilai (1–100)', 'Status'], ['Tugas 1', { v: '85', c: 'num' }, { v: 'Lunas ▾', c: 'key' }], ['Tugas 2', { v: '150', c: 'num err' }, 'Belum']]} />
          <MockPop><span className="opt sel">Lunas</span><span className="opt">Belum</span><span className="opt">Batal</span></MockPop>
          <MockPop tone="err"><I n="error" /> Nilai harus antara 1–100!</MockPop>
        </>} />

      <SplitSlide title="Proteksi Sheet"
        left={<>
          <Para>Melindungi sheet agar rumus & data penting tidak terhapus atau berubah secara tidak sengaja.</Para>
          <Callout title={<>Lock Cell</>}>Secara default semua sel terkunci. Buka kunci sel tertentu yang boleh diedit orang lain sebelum mengaktifkan proteksi.</Callout>
          <Callout title={<>Protect Sheet</>}><strong>Excel:</strong> Review → Protect Sheet → set password.<br /><strong>Sheets:</strong> Data → Protect sheets and ranges → pilih range.</Callout>
          <Callout title={<>Kapan Digunakan?</>}>Template formulir, laporan keuangan, nilai mahasiswa — data yang tidak boleh dimodifikasi sembarang orang.</Callout>
        </>}
        right={<>
          <SheetGrid cols={['A', 'B', 'C']}
            rows={[['Item', 'Jumlah', 'Total'], ['Pensil', { v: '10', c: 'edit num' }, { v: <><I n="lock" /> 25.000</>, c: 'lock num' }], ['Buku', { v: '4', c: 'edit num' }, { v: <><I n="lock" /> 60.000</>, c: 'lock num' }]]}
            caption={<>Hijau = boleh diisi. Abu-abu + gembok = <strong>terkunci</strong>: rumus aman dari perubahan tak sengaja.</>} />
        </>} />

      <SectionSlide part={3} of={3} title="Rumus dan Grafik" desc={<>Rumus dasar, referensi relatif dan absolut, serta grafik</>} />

      <ContentSlide title="Rumus Dasar Spreadsheet">
        <Cards cols={3} tight>
          <Card glyph="Σ" title={<>SUM</>} mono><p>Menjumlahkan seluruh nilai dalam range</p><p className="mono">=SUM(A1:A10)</p></Card>
          <Card glyph="x̄" title={<>AVERAGE</>} mono><p>Menghitung rata-rata dari range</p><p className="mono">=AVERAGE(A1:A10)</p></Card>
          <Card glyph="↑" title={<>MAX</>} mono><p>Mencari nilai terbesar dalam range</p><p className="mono">=MAX(A1:A10)</p></Card>
          <Card glyph="↓" title={<>MIN</>} mono><p>Mencari nilai terkecil dalam range</p><p className="mono">=MIN(A1:A10)</p></Card>
          <Card glyph="#" title={<>COUNT</>} mono><p>Menghitung jumlah sel yang berisi angka</p><p className="mono">=COUNT(A1:A10)</p></Card>
          <Card glyph="Aa" title={<>COUNTA</>} mono><p>Menghitung sel yang tidak kosong (termasuk teks)</p><p className="mono">=COUNTA(A1:A10)</p></Card>
        </Cards>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Pada rentang <code>A1:A10</code> ada 7 sel berisi angka dan 3 sel berisi teks. Hasil <code>=COUNTA(A1:A10)</code> adalah…</>}
        options={[<>7</>, <>3</>, <>10</>, <>0</>]} answer={2}
        why={<><strong>COUNTA</strong> menghitung semua sel yang tidak kosong (10). <strong>COUNT</strong> hanya menghitung angka (7).</>}
        notes="Tanyakan: apa hasil <code>=COUNT(A1:A10)</code>?" />

      <SplitSlide title="Relatif vs Absolut"
        left={<>
          <Callout title={<>Referensi Relatif</>}><code>A1</code> — berubah saat rumus disalin. Contoh: rumus di <code>B1</code> <code>=SUM(A1:A5)</code>, saat disalin ke <code>B2</code> otomatis menjadi <code>=SUM(A2:A6)</code>.</Callout>
          <Callout title={<>Referensi Absolut</>}><code>$A$1</code> — tetap / tidak berubah saat disalin. Tanda <code>$</code> mengunci kolom dan baris.</Callout>
          <Callout title={<>Referensi Campuran</>}><code>$A1</code> — kolom terkunci, baris berubah.<br /><code>A$1</code> — baris terkunci, kolom berubah.</Callout>
        </>}
        right={<>
          <SheetGrid cols={['A', 'B', 'C']}
            rows={[['Harga', 'Total (rumus)', 'PPN'], [{ v: '100.000', c: 'num' }, { v: '=A2*(1+$C$2)', c: 'fx' }, { v: '11%', c: 'key num' }], [{ v: '250.000', c: 'num' }, { v: '=A3*(1+$C$2)', c: 'fx' }, ''], [{ v: '80.000', c: 'num' }, { v: '=A4*(1+$C$2)', c: 'fx' }, '']]}
            caption={<><code>A2 → A3 → A4</code> bergeser (relatif); <code>$C$2</code> tetap (absolut).</>} />
        </>} />

      <QuickCheckSlide
        q={<>Rumus di <code>B1</code> adalah <code>=A1*2</code>. Jika disalin ke <code>B2</code>, rumusnya menjadi…</>}
        options={[<><code>=A1*2</code></>, <><code>=A2*2</code></>, <><code>=B2*2</code></>, <><code>=$A$1*2</code></>]} answer={1}
        why={<>Referensi <strong>relatif</strong> ikut bergeser satu baris. Agar tetap, pakai referensi absolut <code>$A$1</code>.</>}
        notes="Tunjukkan dengan fill handle." />

      <ContentSlide title="Charts & Grafik">
        <Cards cols={3} tight>
          <Card icon="bar_chart" title={<>Bar Chart</>}><p>Membandingkan nilai antar kategori. Cocok untuk data penjualan per bulan, nilai per mata kuliah.</p></Card>
          <Card icon="trending_up" title={<>Line Chart</>}><p>Menampilkan tren perubahan data dari waktu ke waktu. Cocok untuk grafik pertumbuhan, suhu, saham.</p></Card>
          <Card icon="pie_chart" title={<>Pie Chart</>}><p>Menampilkan proporsi bagian dari keseluruhan. Cocok untuk distribusi persentase.</p></Card>
        </Cards>
        <Callout title={<>Cara Membuat Grafik</>}>Pilih data → <strong>Insert → Chart</strong> (Excel) atau <strong>Insert → Chart</strong> (Sheets) → pilih tipe grafik → sesuaikan warna, label, dan judul.</Callout>
      </ContentSlide>

      <ContentSlide title="Padanan Menu: Google Sheets ↔ Microsoft Excel">
        <EquivTable main="Google Sheets" backup="Microsoft Excel" rows={[
          ["Format angka", "Format → Number", "Home → Number Format"],
          ["Urutkan data", "Data → Sort range", "Data → Sort"],
          ["Filter", "Data → Create a filter", "Data → Filter"],
          ["Validasi data", "Data → Data validation", "Data → Data Validation"],
          ["Proteksi lembar", "Data → Protect sheets and ranges", "Review → Protect Sheet"],
          ["Bekukan baris/kolom", "View → Freeze", "View → Freeze Panes"],
          ["Grafik", "Insert → Chart", "Insert → Chart"],
          ["Referensi absolut", "F4 saat mengedit rumus (atau ketik $)", "F4 saat mengedit rumus (atau ketik $)"],
        ]} />
        <Callout title={<>Berpindah aplikasi</>}>Google Sheets membuka <code>.xlsx</code> (unggah ke Drive → Buka dengan Google Sheets). Dari Google Sheets, simpan untuk Excel lewat <strong>File → Download → Microsoft Excel (.xlsx)</strong>.</Callout>
      </ContentSlide>

      <ContentSlide title="Tugas Praktikum: Anggaran Kegiatan">
        <TaskHead>
          <Callout title={<>Tugas (±30 menit)</>}>Olah data anggaran sebuah kegiatan himpunan menjadi laporan yang rapi: format, rumus, urut/saring, validasi, proteksi, dan grafik.</Callout>
          <Download file="dtd-p11-data-anggaran.xlsx" />
        </TaskHead>
        <StepHead>Langkah 1–4</StepHead>
        <Steps cols={2}>
          <Step n={1} title={<>Buka & beri nama</>}><>Unggah berkas ke Google Drive → <strong>Buka dengan Google Sheets</strong> (cadangan: buka di Excel). Ubah nama menjadi <code>DTD_P11_NIM_NAMA</code>.</></Step>
          <Step n={2} title={<>Format sel</>}><>Kolom <strong>Harga Satuan</strong> → mata uang Rupiah; <strong>Tanggal Beli</strong> → format tanggal.</></Step>
          <Step n={3} title={<>Hitung Total</>}><>Kolom H: <code>=E2*F2</code>, lalu salin ke semua baris.</></Step>
          <Step n={4} title={<>PPN dengan referensi absolut</>}><>Kolom I: <code>{"=H2*(1+Parameter!$B$2)"}</code> — kunci sel PPN dengan <strong><code>F4</code></strong>.</></Step>
        </Steps>
      </ContentSlide>

      <ContentSlide title="Tugas Praktikum: Anggaran Kegiatan (lanjutan)">
        <StepHead>Langkah 5–8</StepHead>
        <Steps cols={2}>
          <Step n={5} title={<>Ringkas</>}><>Di bawah tabel, hitung <strong>SUM, AVERAGE, MAX, MIN</strong> pada kolom Total.</></Step>
          <Step n={6} title={<>Urutkan & saring</>}><>Urutkan Total dari terbesar, lalu filter <strong>Kategori = Konsumsi</strong>.</></Step>
          <Step n={7} title={<>Validasi & proteksi</>}><>Dropdown untuk kolom <strong>Kategori</strong> dan <strong>Status</strong>; lindungi lembar <strong>Parameter</strong>.</></Step>
          <Step n={8} title={<>Grafik & kumpulkan</>}><>Buat grafik batang <strong>Item</strong> vs <strong>Total</strong> berjudul jelas, lalu bagikan tautan ke dosen.</></Step>
        </Steps>
        <Callout title={<>Kriteria Pengumpulan</>}>Nama berkas sesuai format, kolom Total dan Total + PPN benar (PPN memakai referensi absolut), empat ringkasan, filter terterapkan, dropdown Kategori/Status, grafik berjudul, dan tautan share berfungsi.</Callout>
      </ContentSlide>

      <QuizSlide title="Post-Test: Uji Pemahaman" items={quiz} />

      <SummarySlide title="Rangkuman Pertemuan 11" points={[
        <><strong>Spreadsheet</strong> (Excel / Google Sheets) adalah aplikasi pengolah data berbasis tabel yang dipakai di hampir semua bidang kerja.</>,
        <><strong>Format sel</strong> seperti number, currency, date, dan percentage membuat data lebih mudah dibaca dan profesional.</>,
        <><strong>Sort & filter</strong> membantu mengurutkan dan menyaring data, sementara <strong>data validation</strong> & <strong>protect sheet</strong> menjaga integritas data.</>,
        <>Rumus dasar — <strong>SUM, AVERAGE, MAX, MIN, COUNT</strong> — adalah fondasi analisis data; pahami juga perbedaan <strong>referensi relatif (<code>A1</code>) vs absolut (<code>$A$1</code>)</strong>.</>,
        <><strong>Charts & grafik</strong> mengubah data angka menjadi visual yang mudah dipahami — bar, line, dan pie chart masing-masing punya kegunaan berbeda.</>,
        <>Konsep spreadsheet berlaku lintas aplikasi: <strong>Google Sheets</strong> sebagai aplikasi utama dan <strong>Microsoft Excel</strong> sebagai cadangan offline, dengan padanan menu yang jelas.</>,
      ]} />

      <ReferencesSlide refs={[
        <>Google. (2025). "SUM." <em>support.google.com/docs/answer/3093669</em></>,
        <>Google. (2025). "Add & edit a chart or graph." <em>support.google.com/docs/answer/63824</em></>,
        <>Google. (2025). "Sort & filter your data." <em>support.google.com/docs/answer/3540681</em></>,
        <>Google. (2025). "Create an in-cell dropdown list." <em>support.google.com/docs/answer/186103</em></>,
        <>Google. (2025). "Protect, hide & edit sheets." <em>support.google.com/docs/answer/1218656</em></>,
        <>Microsoft. (2025). "Overview of formulas in Excel." <em>support.microsoft.com</em></>,
      ]} />

      <ClosingSlide lede={<>Spreadsheet adalah alat kerja yang sangat powerful — menguasai rumus dan format dasarnya akan sangat membantu di dunia kerja maupun akademik.</>} quote={<>"Not everything that can be counted counts, and not everything that counts can be counted."</>} cite={<>— William Bruce Cameron</>} next="Pertemuan 12: Pengolah Angka Bagian 2 — IF, COUNTIF, VLOOKUP & INDEX-MATCH"
        notes={"Topik pertemuan berikutnya: Fungsi Logika — IF, COUNTIF, dan SUMIF; VLOOKUP & HLOOKUP — Pencarian data otomatis; INDEX & MATCH — Pencarian lanjutan."} />

    </>
  );
}
