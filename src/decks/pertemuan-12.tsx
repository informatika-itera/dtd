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
  Download,
  Flow,
  Formula,
  MockPop,
  Para,
  SheetGrid,
  SheetGroup,
  SplitSlide,
  Stat,
  Stats,
  Step,
  StepHead,
  Steps,
  TaskHead,
} from '../layouts/blocks';
import { I } from '../ui';

const quiz: QuizItem[] = [
  { q: <>Fungsi IF di spreadsheet digunakan untuk?</>, options: [<>Menjumlah angka</>, <>Mengambil keputusan berdasarkan kondisi</>, <>Mencari data di tabel</>, <>Mengurutkan data</>], answer: 1 },
  { q: <>Rumus <code>=COUNTIF(A1:A10;"Merah")</code> akan?</>, options: [<>Menjumlah semua data</>, <>Menghitung sel berisi "Merah"</>, <>Mencari kata "Merah"</>, <>Mengganti sel dengan "Merah"</>], answer: 1 },
  { q: <>VLOOKUP mencari data secara?</>, options: [<>Horizontal (baris)</>, <>Vertikal (kolom)</>, <>Diagonal</>, <>Acak</>], answer: 1 },
  { q: <>Kelebihan INDEX+MATCH dibanding VLOOKUP?</>, options: [<>Lebih cepat</>, <>Bisa mencari ke kiri</>, <>Tidak butuh argumen</>, <>Hanya untuk angka</>], answer: 1 },
];

export default function Pertemuan12() {
  return (
    <>
      <TitleSlide meeting={12} title="Pengolah Angka Bagian 2" lede="Menguasai fungsi logika (IF), pencarian data (VLOOKUP, HLOOKUP), dan analisis bersyarat (COUNTIF, SUMIF) dalam spreadsheet" />

      <HookSlide title="Bagaimana Sel Bisa Memutuskan Sendiri?"
        lede="Tiga nilai ujian, satu aturan: nilai 75 ke atas lulus."
        notes="Minta mahasiswa menuliskan keputusan sendiri, lalu tanyakan bagaimana meminta sel melakukannya untuk 500 mahasiswa. Jawabannya fungsi IF."
      >
        <DataTable><thead><tr><th>Nama</th><th>Nilai</th><th>Keputusan</th></tr></thead><tbody>
          <tr><td>Rina</td><td><code>82</code></td><td>?</td></tr>
          <tr><td>Dodi</td><td><code>64</code></td><td>?</td></tr>
          <tr><td>Sari</td><td><code>75</code></td><td>?</td></tr>
        </tbody></DataTable>
        <Para tone="highlight">Kolom “Keputusan” bisa terisi sendiri — untuk 3 baris maupun 3.000 baris.</Para>
      </HookSlide>

      <AgendaSlide title="Agenda Pertemuan" items={[
        { title: "Fungsi IF & Nested IF", desc: "Pengambilan keputusan otomatis berdasarkan kondisi" },
        { title: "COUNTIF & SUMIF", desc: "Menghitung dan menjumlah data berdasarkan kriteria" },
        { title: "VLOOKUP & HLOOKUP", desc: "Mencari data dari tabel referensi secara vertikal dan horizontal" },
        { title: "INDEX & MATCH", desc: "Pencarian data fleksibel sebagai alternatif VLOOKUP" },
        { title: "Studi Kasus Penjualan", desc: "Menerapkan semua fungsi pada data penjualan nyata" },
        { title: "Tugas Praktikum", desc: "Analisis data penjualan di Google Sheets (cadangan: Excel)" },
      ]} />

      <SectionSlide part={1} of={4} title="Fungsi Kondisi" desc={<><code>IF</code> dan <code>IF</code> bersarang</>} />

      <SplitSlide title="Fungsi IF"
        left={<>
          <Para>Fungsi <strong>IF</strong> menguji suatu kondisi dan mengembalikan nilai berdasarkan hasil uji tersebut — <strong>TRUE</strong> atau <strong>FALSE</strong>.</Para>
          <Formula label="Sintaks">=IF(kondisi; nilai_jika_TRUE; nilai_jika_FALSE)</Formula>
          <Callout title={<>Contoh</>}>Jika nilai ≥ 70 maka "Lulus", jika tidak "Tidak Lulus":<br /><code>{"=IF(A1>=70; \"Lulus\"; \"Tidak Lulus\")"}</code></Callout>
          <Para>Parameter <strong>kondisi</strong> bisa menggunakan operator perbandingan: <code>=</code>, <code>{">"}</code>, <code>{"<"}</code>, <code>{">="}</code>, <code>{"<="}</code>, <code>{"<>"}</code> (tidak sama dengan).</Para>
        </>}
        right={<>
          <MockPop tone="fx"><code>{'=IF(B2>=70; "Lulus"; "Tidak Lulus")'}</code></MockPop>
          <SheetGrid cols={['A', 'B', 'C']}
            rows={[['Nama', 'Nilai', 'Keputusan'], ['Rina', { v: '82', c: 'num' }, { v: 'Lulus', c: 'res' }], ['Dodi', { v: '64', c: 'num' }, { v: 'Tidak Lulus', c: 'err' }], ['Sari', { v: '75', c: 'num' }, { v: 'Lulus', c: 'res' }]]}
            caption={<>Rumus yang sama disalin ke bawah; hasilnya mengikuti nilai tiap baris.</>} />
        </>} />

      <SplitSlide title="Nested IF (IF Bersarang)"
        left={<>
          <Para>Menyusun <strong>beberapa IF</strong> di dalam satu formula untuk menguasi <strong>banyak kondisi sekaligus</strong> — seperti membuat grading otomatis.</Para>
          <Formula label="Sintaks Nested IF">=IF(kondisi1; nilai1; IF(kondisi2; nilai2; IF(kondisi3; nilai3; nilai_default)))</Formula>
          <Callout title={<>Contoh: Grading Nilai</>}><code>{"=IF(A1>=85;\"A\";IF(A1>=70;\"B\";IF(A1>=55;\"C\";\"D\")))"}</code><br /><br /> <code>A1</code>=90 → <strong>A</strong> | <code>A1</code>=75 → <strong>B</strong> | <code>A1</code>=60 → <strong>C</strong> | <code>A1</code>=40 → <strong>D</strong></Callout>
          <Para>Tip: Bisa juga menggunakan <strong><code>IFS()</code></strong> di Google Sheets dan Excel 2019 ke atas sebagai alternatif yang lebih rapi.</Para>
        </>}
        right={<>
          <Flow>
            <Box title={<>≥ 85?</>} primary><p>Ya → A</p></Box>
            <Arrow glyph="↓ Tidak" />
            <Box title={<>≥ 70?</>} primary><p>Ya → B</p></Box>
            <Arrow glyph="↓ Tidak" />
            <Box title={<>≥ 55?</>} primary><p>Ya → C</p></Box>
            <Arrow glyph="↓ Tidak" />
            <Box title={<>Sisa</>}><p>D</p></Box>
          </Flow>
        </>} />

      <QuickCheckSlide
        q={<>Pada <code>=IF(A1&gt;=85;&quot;A&quot;;IF(A1&gt;=70;&quot;B&quot;;IF(A1&gt;=55;&quot;C&quot;;&quot;D&quot;)))</code>, nilai <code>A1 = 60</code> menghasilkan…</>}
        options={[<>A</>, <>B</>, <>C</>, <>D</>]} answer={2}
        why={<>60 tidak ≥ 85 dan tidak ≥ 70, tetapi ≥ 55, jadi hasilnya <strong>C</strong>. Urutan kondisi menentukan hasil.</>}
        notes="Ubah nilai menjadi 54 dan 90 untuk menguji." />

      <SectionSlide part={2} of={4} title="Menghitung Berdasarkan Kriteria" desc={<><code>COUNTIF</code> dan <code>SUMIF</code></>} />

      <ContentSlide title="COUNTIF & SUMIF">
        <Cards cols={2}>
          <Card icon="pin" title={<>COUNTIF</>} mono><p><strong>Menghitung</strong> jumlah sel yang memenuhi kriteria tertentu.</p>          <Formula label="Sintaks">=COUNTIF(range; kriteria)</Formula><p><strong>Contoh:</strong> Hitung jumlah siswa yang lulus (nilai ≥ 70):</p><p><code>{"=COUNTIF(B2:B50; \">=70\")"}</code></p></Card>
          <Card icon="add" title={<>SUMIF</>} mono><p><strong>Menjumlah</strong> nilai-nilai yang memenuhi kriteria tertentu.</p>          <Formula label="Sintaks">=SUMIF(range_kriteria; kriteria; range_jumlah)</Formula><p><strong>Contoh:</strong> Jumlah penjualan produk "Laptop":</p><p><code>=SUMIF(A2:A100; "Laptop"; C2:C100)</code></p></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="COUNTIF & SUMIF Hanya Memproses Baris Cocok" notes="Minta mahasiswa menebak hasil sebelum angkanya dibuka. Bandingkan: COUNTIF menghitung banyaknya baris, SUMIF menjumlahkan nilai di kolom lain pada baris yang cocok.">
        <SheetGroup>
          <div><h3>COUNTIF — berapa baris?</h3>
            <SheetGrid cols={['A', 'B', 'C']} rows={[['Produk', 'Kategori', 'Total'], ['Laptop', { v: 'Komputer', c: 'key' }, { v: '100', c: 'num' }], ['Laptop', { v: 'Komputer', c: 'key' }, { v: '50', c: 'num' }], ['Mouse', 'Aksesoris', { v: '10', c: 'num' }], ['Laptop', { v: 'Komputer', c: 'key' }, { v: '25', c: 'num' }], ['Mouse', { v: 'Komputer', c: 'key' }, { v: '5', c: 'num' }]]} />
            <MockPop tone="fx"><code>{'=COUNTIF(B2:B6; "Komputer")'}</code> → <strong>4</strong></MockPop></div>
          <div><h3>SUMIF — berapa totalnya?</h3>
            <SheetGrid cols={['A', 'B', 'C']} rows={[['Produk', 'Kategori', 'Total'], [{ v: 'Laptop', c: 'key' }, 'Komputer', { v: '100', c: 'num found' }], [{ v: 'Laptop', c: 'key' }, 'Komputer', { v: '50', c: 'num found' }], ['Mouse', 'Aksesoris', { v: '10', c: 'num' }], [{ v: 'Laptop', c: 'key' }, 'Komputer', { v: '25', c: 'num found' }], ['Mouse', 'Komputer', { v: '5', c: 'num' }]]} />
            <MockPop tone="fx"><code>{'=SUMIF(A2:A6; "Laptop"; C2:C6)'}</code> → <strong>175</strong></MockPop></div>
        </SheetGroup>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Untuk menjumlahkan pendapatan hanya dari produk “Laptop ASUS”, fungsi yang tepat adalah…</>}
        options={[<>COUNTIF</>, <>SUMIF</>, <>SUM</>, <>VLOOKUP</>]} answer={1}
        why={<><strong>SUMIF</strong> menjumlahkan nilai yang memenuhi kriteria. <strong>COUNTIF</strong> hanya menghitung banyaknya.</>}
        notes="Bandingkan dengan jawaban COUNTIF." />

      <SectionSlide part={3} of={4} title="Pencarian Data" desc={<><code>VLOOKUP</code>, <code>HLOOKUP</code>, dan <code>INDEX</code> + <code>MATCH</code></>} />

      <SplitSlide title="VLOOKUP"
        left={<>
          <Para><strong>Vertical Lookup</strong> — mencari nilai di kolom pertama tabel, lalu mengambil nilai dari kolom lain pada baris yang sama.</Para>
          <Formula label="Sintaks">=VLOOKUP(kolom_cari; tabel; kolom_index; [pencocokan])</Formula>
          <Callout title={<>Parameter</>}><strong>kolom_cari</strong> — nilai yang ingin dicari<br /> <strong>tabel</strong> — range tabel referensi<br /> <strong>kolom_index</strong> — nomor kolom yang ingin diambil (mulai dari 1)<br /> <strong>pencocokan</strong> — FALSE (exact match) atau TRUE (approximate)</Callout>
        </>}
        right={<>
          <SheetGrid cols={['A', 'B', 'C']}
            rows={[['Kode', 'Produk', 'Harga'], ['P001', 'Laptop', { v: '8.500.000', c: 'num' }], [{ v: 'P002', c: 'key' }, { v: 'Mouse', c: 'found' }, { v: '150.000', c: 'num res' }], ['P003', 'Keyboard', { v: '350.000', c: 'num' }]]}
            caption={<>① cari <strong>P002</strong> di kolom pertama · ② baris yang cocok · ③ ambil kolom ke-<strong>3</strong></>} />
          <MockPop tone="fx"><code>{'=VLOOKUP("P002"; A2:C4; 3; FALSE)'}</code> → <strong>150.000</strong></MockPop>
        </>} />

      <SplitSlide title="HLOOKUP"
        left={<>
          <Para><strong>Horizontal Lookup</strong> — mencari nilai di baris pertama tabel, lalu mengambil nilai dari baris lain pada kolom yang sama.</Para>
          <Formula label="Sintaks">=HLOOKUP(baris_cari; tabel; baris_index; [pencocokan])</Formula>
          <Callout title={<>Kapan Pakai?</>}>Gunakan <strong>HLOOKUP</strong> ketika data tersusun secara <strong>horizontal</strong> — header (label) berada di <strong>baris pertama</strong>, bukan kolom pertama.<br /><br /> Jika data vertikal → pakai <strong>VLOOKUP</strong>.<br /> Jika data horizontal → pakai <strong>HLOOKUP</strong>.</Callout>
        </>}
        right={<>
          <SheetGrid cols={['A', 'B', 'C', 'D']}
            rows={[['', { v: 'Matematika', c: 'key' }, 'Fisika', 'Kimia'], [{ v: 'UTS', c: 'found' }, { v: '85', c: 'num res' }, { v: '78', c: 'num' }, { v: '90', c: 'num' }], [{ v: 'UAS', c: 'found' }, { v: '92', c: 'num' }, { v: '80', c: 'num' }, { v: '88', c: 'num' }]]}
            caption={<>① cari <strong>Matematika</strong> di baris pertama · ② kolom yang cocok · ③ ambil baris ke-<strong>2</strong> (UTS)</>} />
          <MockPop tone="fx"><code>{'=HLOOKUP("Matematika"; A1:D3; 2; FALSE)'}</code> → <strong>85</strong></MockPop>
        </>} />

      <SplitSlide title="INDEX & MATCH"
        left={<>
          <Para>Kombinasi <strong>INDEX</strong> dan <strong>MATCH</strong> adalah alternatif fleksibel untuk VLOOKUP — bisa mencari ke kiri, tidak terbatas kolom pertama.</Para>
          <Formula label="MATCH — mencari posisi">=MATCH(nilai_cari; range; 0)</Formula>
          <Formula label="INDEX — mengambil nilai">=INDEX(range; baris; kolom)</Formula>
          <Formula label="Kombinasi INDEX + MATCH">=INDEX(kolom_diambil; MATCH(nilai_cari; kolom_cari; 0))</Formula>
        </>}
        right={<>
          <SheetGrid cols={['A', 'B']}
            rows={[['Nama', 'ID'], ['Budi', { v: '101', c: 'num' }], [{ v: 'Ani', c: 'res' }, { v: '102', c: 'num key' }], ['Citra', { v: '103', c: 'num' }]]}
            caption={<>ID ada di kolom <strong>kanan</strong> dari Nama — VLOOKUP tidak bisa mencari ke kiri.</>} />
          <MockPop tone="fx"><code>MATCH(102; B2:B4; 0)</code> → <strong>2</strong> (posisi)</MockPop>
          <MockPop tone="fx"><code>INDEX(A2:A4; 2)</code> → <strong>Ani</strong></MockPop>
        </>} />

      <QuickCheckSlide
        q={<>Pada <code>=VLOOKUP(&quot;P002&quot;;A2:C10;3;FALSE)</code>, angka <code>3</code> berarti…</>}
        options={[<>Kolom ke-3 dari tabel</>, <>Baris ke-3 dari tabel</>, <>Cari 3 hasil</>, <>Toleransi 3</>]} answer={0}
        why={<>Argumen <code>kolom_index</code> = <strong>3</strong>: ambil nilai dari kolom ketiga tabel. <code>FALSE</code> berarti cocok persis.</>}
        notes="Tanyakan apa yang terjadi jika kode tidak ada." />

      <SectionSlide part={4} of={4} title="Studi Kasus Penjualan" desc={<>Menerapkan semua fungsi pada data nyata</>} />

      <ContentSlide title="Studi Kasus: Data Penjualan">
        <DataTable><thead><tr><th>No</th><th>Tanggal</th><th>Produk</th><th>Kategori</th><th>Jumlah</th><th>Harga Satuan</th><th>Total</th></tr></thead><tbody><tr><td>1</td><td>01/07/2026</td><td>Laptop ASUS</td><td>Komputer</td><td><code>2</code></td><td><code>8.500.000</code></td><td><code>17.000.000</code></td></tr><tr><td>2</td><td>01/07/2026</td><td>Mouse Logitech</td><td>Aksesoris</td><td><code>10</code></td><td><code>150.000</code></td><td><code>1.500.000</code></td></tr><tr><td>3</td><td>02/07/2026</td><td>Keyboard Rexus</td><td>Aksesoris</td><td><code>5</code></td><td><code>350.000</code></td><td><code>1.750.000</code></td></tr><tr><td>4</td><td>02/07/2026</td><td>Monitor LG 24"</td><td>Komputer</td><td><code>3</code></td><td><code>2.400.000</code></td><td><code>7.200.000</code></td></tr><tr><td>5</td><td>03/07/2026</td><td>Laptop ASUS</td><td>Komputer</td><td><code>1</code></td><td><code>8.500.000</code></td><td><code>8.500.000</code></td></tr></tbody></DataTable>
        <Stats>
          <Stat n={<>21</>} l={<>Total Qty Terjual</>} />
          <Stat n={<>Rp 35,95 Jt</>} l={<>Total Pendapatan</>} />
          <Stat n={<>2</>} l={<>Kategori Produk</>} />
        </Stats>
        <Download file="dtd-p12-data-penjualan.xlsx" />
      </ContentSlide>

      <ContentSlide title="Praktik: Menerapkan Rumus pada Data Penjualan">
        <Cards cols={2} tight>
          <Card title={<><I n="target" /> IF — Status Penjualan Besar</>}><p>Tandai transaksi ≥ Rp 5 juta sebagai "Besar":</p>          <Formula label="">{"=IF(G2>=5000000;\"Besar\";\"Biasa\")"}</Formula></Card>
          <Card title={<><I n="bar_chart" /> COUNTIF — Jumlah per Kategori</>}><p>Hitung berapa kali muncul kategori "Komputer":</p>          <Formula label="">=COUNTIF(D2:D100;"Komputer")</Formula></Card>
          <Card title={<><I n="add" /> SUMIF — Total per Produk</>}><p>Jumlahkan pendapatan dari "Laptop ASUS":</p>          <Formula label="">=SUMIF(C2:C100;"Laptop ASUS";G2:G100)</Formula></Card>
          <Card title={<><I n="search" /> VLOOKUP — Cari Harga Produk</>}><p>Ambil harga satuan dari tabel master:</p>          <Formula label="">=VLOOKUP("Mouse Logitech";Master!A:C;3;FALSE)</Formula></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Tugas Praktikum: Analisis Data Penjualan">
        <TaskHead>
          <Callout title={<>Tugas (±30 menit)</>}>Analisis data penjualan toko komputer dengan fungsi logika, hitung bersyarat, dan pencarian data.</Callout>
          <Download file="dtd-p12-data-penjualan.xlsx" />
        </TaskHead>
        <StepHead>Langkah 1–4</StepHead>
        <Steps cols={2}>
          <Step n={1} title={<>Buka & beri nama</>}><>Unggah ke Google Drive → <strong>Buka dengan Google Sheets</strong> (cadangan: Excel). Nama: <code>DTD_P12_NIM_NAMA</code>.</></Step>
          <Step n={2} title={<>Tambah transaksi</>}><>Tambahkan 5 transaksi baru (produk dari lembar <strong>Master</strong>); salin rumus Total ke baris baru.</></Step>
          <Step n={3} title={<>IF — status</>}><>Kolom H: <code>{"=IF(G2>=5000000;\"Besar\";\"Biasa\")"}</code>.</></Step>
          <Step n={4} title={<>COUNTIF</>}><>Hitung jumlah transaksi kategori <strong>Komputer</strong> di sel ringkasan.</></Step>
        </Steps>
      </ContentSlide>

      <ContentSlide title="Tugas Praktikum: Analisis Data Penjualan (lanjutan)">
        <StepHead>Langkah 5–8</StepHead>
        <Steps cols={2}>
          <Step n={5} title={<>SUMIF</>}><>Total pendapatan per produk, mis. <code>{"=SUMIF(C2:C20;\"Laptop ASUS\";G2:G20)"}</code>.</></Step>
          <Step n={6} title={<>Pencarian</>}><>Ambil <strong>Harga Satuan</strong> dari lembar Master dengan <strong>VLOOKUP</strong> atau <strong>INDEX–MATCH</strong>.</></Step>
          <Step n={7} title={<>Uji ketahanan</>}><>Ubah satu angka Jumlah; pastikan Total, status, dan ringkasan ikut berubah.</></Step>
          <Step n={8} title={<>Ringkasan & kumpulkan</>}><>Buat tabel ringkasan per Kategori (SUMIF), lalu bagikan tautan ke dosen.</></Step>
        </Steps>
        <Callout title={<>Kriteria Pengumpulan</>}>Nama berkas sesuai format, 5 transaksi baru dengan Total benar, kolom status IF, COUNTIF dan SUMIF benar, satu pencarian (VLOOKUP atau INDEX–MATCH), tabel ringkasan per kategori, dan tautan share berfungsi. Pemisah argumen rumus <code>;</code> atau <code>,</code> mengikuti pengaturan regional.</Callout>
      </ContentSlide>

      <QuizSlide title="Post-Test: Uji Pemahaman" items={quiz} />

      <SummarySlide title="Rangkuman Pertemuan 12" points={[
        <><strong>IF</strong> menguji kondisi TRUE/FALSE untuk mengembalikan nilai tertentu. <strong>Nested IF</strong> memungkinkan pengujian banyak kondisi sekaligus.</>,
        <><strong>COUNTIF</strong> menghitung jumlah sel sesuai kriteria, sedangkan <strong>SUMIF</strong> menjumlahkan nilai berdasarkan kriteria tertentu.</>,
        <><strong>VLOOKUP</strong> mencari data secara vertikal (kolom pertama), sementara <strong>HLOOKUP</strong> mencari secara horizontal (baris pertama).</>,
        <>Kombinasi <strong>INDEX + MATCH</strong> lebih fleksibel daripada VLOOKUP karena bisa mencari ke arah mana pun, termasuk ke kiri.</>,
        <>Semua fungsi ini diterapkan secara nyata pada <strong>data penjualan</strong> untuk menghitung, mencari, dan menganalisis data secara otomatis.</>,
        <>Semua fungsi ini bekerja sama di <strong>Google Sheets maupun Excel</strong>; yang berbeda hanya letak menu dan pemisah argumen rumus (<code>;</code> atau <code>,</code>).</>,
      ]} />

      <ReferencesSlide refs={[
        <>Google. (2025). "IF function." <em>support.google.com/docs/answer/3093364</em></>,
        <>Google. (2025). "COUNTIF." <em>support.google.com/docs/answer/3093480</em></>,
        <>Google. (2025). "SUMIF." <em>support.google.com/docs/answer/3093583</em></>,
        <>Google. (2025). "VLOOKUP." <em>support.google.com/docs/answer/3093318</em></>,
        <>Google. (2025). "INDEX." <em>support.google.com/docs/answer/3098242</em></>,
        <>Google. (2025). "MATCH function." <em>support.google.com/docs/answer/3093378</em></>,
        <>Microsoft. (2025). "VLOOKUP function." <em>support.microsoft.com</em></>,
      ]} />

      <ClosingSlide lede={<>Dengan menguasai fungsi logika dan pencarian data, Anda kini bisa membuat spreadsheet yang cerdas dan otomatis — dari pengambilan keputusan hingga analisis penjualan.</>} quote={<>"In God we trust; all others must bring data."</>} cite={<>— W. Edwards Deming</>} next="Pertemuan 13: Pengolah Angka Bagian 3 — Fungsi Teks & Tanggal, Pivot Table, dan Merapikan Data"
        notes={"Topik pertemuan berikutnya: Fungsi Teks & Tanggal — Manipulasi string dan waktu; Pivot Table — Analisis data ringkas; Merapikan Data & Pemformatan Bersyarat — Data bersih, pola terlihat jelas."} />

    </>
  );
}
