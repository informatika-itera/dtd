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
  Box,
  Callout,
  Card,
  Cards,
  CharStrip,
  ContentSlide,
  DataTable,
  Download,
  EquivTable,
  Formula,
  Para,
  PivotAreas,
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
  { q: <>Fungsi untuk mengambil 3 karakter dari kiri teks?</>, options: [<><code>RIGHT(teks, 3)</code></>, <><code>LEFT(teks, 3)</code></>, <><code>MID(teks, 1, 3)</code></>, <><code>LEN(teks, 3)</code></>], answer: 1 },
  { q: <>Fungsi untuk menghapus spasi berlebih di awal dan akhir teks?</>, options: [<>TRIM</>, <>LEN</>, <>LEFT</>, <>PROPER</>], answer: 0 },
  { q: <>Fungsi yang selalu menampilkan tanggal hari ini?</>, options: [<><code>DATE()</code></>, <><code>NOW()</code></>, <><code>TODAY()</code></>, <><code>DAY()</code></>], answer: 2 },
  { q: <>Pivot Table digunakan untuk?</>, options: [<>Membuat grafik</>, <>Meringkas & menganalisis data</>, <>Menghitung rumus</>, <>Menyimpan file</>], answer: 1 },
];

export default function Pertemuan13() {
  return (
    <>
      <TitleSlide meeting={13} title="Pengolah Angka Bagian 3" lede="Fungsi teks & tanggal, tabel pivot, merapikan data mentah, pemformatan bersyarat, dan penanganan galat — dengan Google Sheets (utama) dan Excel (cadangan)" />

      <HookSlide title="Temukan Masalah pada Data Ini"
        lede="Cuplikan log transaksi kafe dari berkas praktikum (data fiktif):"
        notes="Beri waktu satu menit untuk menemukan masalah: spasi berlebih, huruf tidak konsisten, baris ganda, kode dan menu menyatu. Hubungkan ke tujuan sesi: rapikan, ringkas, sorot, amankan dari galat."
      >
        <DataTable><thead><tr><th>Kasir</th><th>Kode - Menu</th><th>Metode</th></tr></thead><tbody>
          <tr><td><code>{'" sari  wulandari "'}</code></td><td><code>M03 - kopi susu</code></td><td><code>qris</code></td></tr>
          <tr><td><code>Sari Wulandari</code></td><td><code>M03 - kopi susu</code></td><td><code>QRIS</code></td></tr>
          <tr><td><code>budi SANTOSO</code></td><td><code>M07 - roti bakar</code></td><td><code>tunai</code></td></tr>
        </tbody></DataTable>
      </HookSlide>

      <AgendaSlide title="Agenda Pertemuan" items={[
        { title: "Fungsi Teks (String)", desc: "LEFT, RIGHT, MID, LEN — memanipulasi teks dalam sel" },
        { title: "Fungsi Teks Lanjutan", desc: "CONCATENATE & TEXT — menggabungkan dan memformat nilai" },
        { title: "Fungsi Tanggal", desc: "TODAY, YEAR, MONTH, DAY — mengelola data tanggal" },
        { title: "Tabel Pivot", desc: "Konsep dasar dan praktik membuat pivot table" },
        { title: "Merapikan Data Mentah", desc: "TRIM, PROPER, hapus duplikat, dan pisahkan teks" },
        { title: "Pemformatan Bersyarat & Galat", desc: "Menyorot data penting dan menangani galat dengan IFERROR" },
        { title: "Tugas Praktikum", desc: "Membersihkan dan meringkas data transaksi" },
      ]} />

      <SectionSlide part={1} of={3} title="Fungsi Teks" desc={<><code>LEFT</code>, <code>RIGHT</code>, <code>MID</code>, <code>LEN</code>, dan <code>TEXT</code></>} />

      <SplitSlide title="LEFT, RIGHT, MID Memotong Teks Berdasarkan Posisi"
        left={<>
          <Callout title={<><code>LEFT(teks, n)</code></>}>Mengambil <strong>n karakter dari kiri</strong>. Contoh: <code>LEFT("Jakarta", 3)</code> → <code>Jak</code></Callout>
          <Callout title={<><code>RIGHT(teks, n)</code></>}>Mengambil <strong>n karakter dari kanan</strong>. Contoh: <code>RIGHT("Jakarta", 3)</code> → <code>rta</code></Callout>
          <Callout title={<><code>MID(teks, mulai, n)</code></>}>Mengambil <strong>n karakter dari posisi tertentu</strong>. Contoh: <code>MID("Jakarta", 2, 3)</code> → <code>aka</code></Callout>
        </>}
        right={<>
          <SheetGrid cols={['A', 'B', 'C']}
            rows={[['Teks', 'Rumus', 'Hasil'], ['Jakarta', { v: '=LEFT(A2;3)', c: 'fx' }, { v: 'Jak', c: 'res' }], ['Jakarta', { v: '=RIGHT(A3;3)', c: 'fx' }, { v: 'rta', c: 'res' }], ['Jakarta', { v: '=MID(A4;2;3)', c: 'fx' }, { v: 'aka', c: 'res' }]]}
            caption={<>Tiga fungsi, satu teks sumber: yang berbeda hanya <strong>bagian mana</strong> yang diambil.</>} />
        </>} />

      <ContentSlide title="Posisi Karakter Menentukan Hasil Potongan" notes="Hitung posisi dari 1, bukan 0. MID butuh dua angka: posisi mulai dan banyaknya karakter.">
        <div className="strips">
          <div><Para tone="caption"><code>{'=LEFT("Jakarta"; 3)'}</code> → <strong>Jak</strong> (3 karakter dari kiri)</Para><CharStrip mark={[1, 3]} items={[["J", "1"], ["a", "2"], ["k", "3"], ["a", "4"], ["r", "5"], ["t", "6"], ["a", "7"]]} /></div>
          <div><Para tone="caption"><code>{'=MID("Jakarta"; 2; 3)'}</code> → <strong>aka</strong> (mulai posisi 2, ambil 3)</Para><CharStrip mark={[2, 4]} items={[["J", "1"], ["a", "2"], ["k", "3"], ["a", "4"], ["r", "5"], ["t", "6"], ["a", "7"]]} /></div>
          <div><Para tone="caption"><code>{'=RIGHT("Jakarta"; 3)'}</code> → <strong>rta</strong> (3 karakter dari kanan)</Para><CharStrip mark={[5, 7]} items={[["J", "1"], ["a", "2"], ["k", "3"], ["a", "4"], ["r", "5"], ["t", "6"], ["a", "7"]]} /></div>
        </div>
      </ContentSlide>

      <ContentSlide title="LEN, CONCATENATE, TEXT Menghitung dan Menyusun Teks">
        <Cards cols={4}>
          <Card icon="straighten" title={<><code>LEN(teks)</code></>}><p>Menghitung jumlah karakter. <code>LEN("Excel")</code> → <strong>5</strong></p></Card>
          <Card icon="link" title={<>CONCATENATE</>} mono><p>Menggabungkan teks dari beberapa sel. <code>=A1&" "&B1</code></p></Card>
          <Card glyph="T" title={<><code>TEXT(nilai, format)</code></>}><p>Format angka jadi teks. <code>TEXT(1234,"#,##0")</code> → <strong>"1,234"</strong> (pemisah ribuan mengikuti locale lembar kerja)</p></Card>
          <Card icon="lightbulb" title={<>Tips</>}><p>Operator <code>&</code> bisa gantikan CONCATENATE untuk penulisan lebih singkat</p></Card>
        </Cards>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Apa hasil rumus berikut?<br /><code>{'=LEFT("Sumatera";3)&"-"&RIGHT("Sumatera";3)'}</code></>}
        options={[<>Sum-era</>, <>Sum-tera</>, <>Sma-era</>, <>Sum-Sum</>]} answer={0}
        why={<><code>LEFT(…;3)</code> mengambil <strong>Sum</strong>, <code>RIGHT(…;3)</code> mengambil <strong>era</strong>, dan <code>&amp;</code> menyambungkannya dengan tanda “-”.</>}
        notes="Minta mahasiswa memilih dengan mengangkat tangan sebelum jawaban dibuka. Jika banyak yang salah, ulangi visualisasi posisi karakter." />

      <SectionSlide part={2} of={3} title="Tanggal dan Pivot Table" desc={<>Fungsi tanggal dan meringkas data besar</>} />

      <SplitSlide title="Fungsi Tanggal Memecah dan Membentuk Tanggal"
        left={<>
          <Callout title={<><code>TODAY()</code></>}>Menampilkan <strong>tanggal hari ini</strong> secara otomatis. Selalu update saat file dibuka.</Callout>
          <Callout title={<><code>YEAR(tanggal)</code></>}>Mengambil <strong>tahun</strong> dari nilai tanggal. <code>YEAR(A1)</code> → <code>2026</code></Callout>
          <Callout title={<><code>MONTH(tanggal)</code> & <code>DAY(tanggal)</code></>}>Mengambil <strong>bulan</strong> atau <strong>hari</strong> dari tanggal.</Callout>
          <Callout title={<><code>DATE(tahun, bulan, hari)</code></>}>Membuat tanggal dari komponen terpisah. <code>DATE(2026,12,25)</code> → <code>25/12/2026</code></Callout>
        </>}
        right={<>
          <Box title={<>Anatomi Tanggal di Spreadsheet</>}>            <DataTable><thead><tr><th>Fungsi</th><th>Hasil</th></tr></thead><tbody><tr><td><code>TODAY()</code></td><td><code>05/08/2026</code></td></tr><tr><td><code>YEAR(TODAY())</code></td><td><code>2026</code></td></tr><tr><td><code>MONTH(TODAY())</code></td><td><code>8</code></td></tr><tr><td><code>DAY(TODAY())</code></td><td><code>5</code></td></tr><tr><td><code>WEEKDAY(TODAY())</code></td><td><code>4 (Rabu)</code></td></tr></tbody></DataTable></Box>
        </>} />

      <ContentSlide title="Pivot Meringkas Data Besar Tanpa Rumus">
        <Para>Pivot Table adalah fitur spreadsheet (Sheets dan Excel) untuk <strong>meringkas, menganalisis, dan menjelajahi</strong> data besar secara interaktif — tanpa rumus manual.</Para>
        <Cards cols={4} tight>
          <Card icon="content_paste" title={<>Baris (Rows)</>}><p>Kategori data yang ditampilkan per baris, misal: nama departemen</p></Card>
          <Card icon="bar_chart" title={<>Nilai (Values)</>}><p>Data numerik yang dijumlahkan, dihitung rata-rata, dll.</p></Card>
          <Card icon="bookmarks" title={<>Kolom (Columns)</>}><p>Pemisah data berdasarkan kategori, misal: kuartal atau bulan</p></Card>
          <Card icon="filter_alt" title={<>Filter</>}><p>Menyaring data yang ditampilkan tanpa mengubah sumber</p></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Pivot Mengubah Baris Mentah Menjadi Ringkasan" notes="Tunjukkan bahwa tiga baris ringkasan berasal dari enam baris sumber. Ubah satu angka di sumber lalu refresh pivot (di Sheets pivot otomatis menyesuaikan).">
        <div className="pivotflow">
          <div><h3>Data sumber (6 baris)</h3><SheetGrid cols={['A', 'B', 'C']} rows={[['Departemen', 'Bulan', 'Penjualan'], ['Marketing', 'Jan', { v: '200 jt', c: 'num' }], ['Sales', 'Jan', { v: '300 jt', c: 'num' }], ['IT', 'Jan', { v: '80 jt', c: 'num' }], ['Marketing', 'Feb', { v: '250 jt', c: 'num' }], ['Sales', 'Feb', { v: '320 jt', c: 'num' }], ['IT', 'Feb', { v: '100 jt', c: 'num' }]]} /></div>
          <div className="pvarrow"><I n="arrow_forward" /><PivotAreas rows="Departemen" values="Sum Penjualan" /></div>
          <div><h3>Hasil pivot (3 baris)</h3><SheetGrid cols={['A', 'B']} rows={[['Departemen', 'Sum Penjualan'], ['Marketing', { v: '450 jt', c: 'num res' }], ['Sales', { v: '620 jt', c: 'num res' }], ['IT', { v: '180 jt', c: 'num res' }]]} /></div>
        </div>
      </ContentSlide>

      <SplitSlide title="Praktik: Membuat Pivot Table"
        left={<>
          <Callout title={<>Langkah 1 — Siapkan Data</>}>Pilih range data. Pastikan ada <strong>header kolom</strong> yang jelas dan tidak ada baris kosong.</Callout>
          <Callout title={<>Langkah 2 — Insert PivotTable</>}>Sheets: <strong>Insert → Pivot table</strong> · Excel: <strong>Insert → PivotTable</strong>. Pilih lokasi output (sheet baru atau yang sama).</Callout>
          <Callout title={<>Langkah 3 — Drag Fields</>}>Tambahkan field ke <strong>Rows, Columns, Values, Filters</strong> di panel kanan (Excel: seret).</Callout>
          <Callout title={<>Langkah 4 — Atur Ringkasan</>}>Ubah dari Sum ke <strong>Count, Average, Max, Min</strong> sesuai kebutuhan analisis.</Callout>
        </>}
        right={<>
          <PivotAreas rows="Departemen" values="Penjualan (Sum)" />
          <Para tone="caption">Satu field per area: <strong>Departemen</strong> dikelompokkan di Rows, <strong>Penjualan</strong> dijumlahkan di Values.</Para>
        </>} />

      <QuickCheckSlide
        q={<>Anda ingin total penjualan <strong>per departemen</strong>. Di mana field-nya diletakkan pada pivot?</>}
        options={[<>Departemen di Values, Total di Rows</>, <>Departemen di Rows, Total di Values</>, <>Keduanya di Filters</>, <>Keduanya di Values</>]} answer={1}
        why={<>Kategori yang ingin dikelompokkan masuk ke <strong>Rows</strong>; angka yang dijumlahkan masuk ke <strong>Values</strong>.</>}
        notes="Tanyakan juga: apa yang berubah jika Departemen dipindah ke Columns?" />

      <SectionSlide part={3} of={3} title="Merapikan Data dan Galat" desc={<><code>TRIM</code>, hapus duplikat, pemformatan bersyarat, dan <code>IFERROR</code></>} />

      <ContentSlide title="Sebelum dan Sesudah Dirapikan" notes="Perlihatkan tanda kutip untuk menunjukkan spasi tersembunyi. Dua kolom baru berisi rumus; kolom asli tetap dipertahankan sebagai arsip.">
        <SheetGroup>
          <div><h3>Mentah</h3><SheetGrid cols={['A', 'B']} rows={[['Kasir', 'Metode Bayar'], [{ v: '" sari  wulandari "', c: 'dim' }, { v: '"qris "', c: 'dim' }], [{ v: '"budi SANTOSO"', c: 'dim' }, { v: '"tunai"', c: 'dim' }], [{ v: '"Dewi Lestari "', c: 'dim' }, { v: '"TUNAI"', c: 'dim' }]]} /></div>
          <div><h3>Rapi</h3><SheetGrid cols={['C', 'D']} rows={[['Kasir (rapi)', 'Metode (rapi)'], [{ v: 'Sari Wulandari', c: 'res' }, { v: 'QRIS', c: 'res' }], [{ v: 'Budi Santoso', c: 'res' }, { v: 'TUNAI', c: 'res' }], [{ v: 'Dewi Lestari', c: 'res' }, { v: 'TUNAI', c: 'res' }]]} /></div>
        </SheetGroup>
        <Callout title={<>Rumus di kolom rapi</>}><code>{'=PROPER(TRIM(A2))'}</code> untuk nama · <code>{'=UPPER(TRIM(B2))'}</code> untuk metode bayar. <strong>TRIM</strong> membuang spasi berlebih; <strong>PROPER</strong> dan <strong>UPPER</strong> menyeragamkan huruf.</Callout>
      </ContentSlide>

      <SplitSlide title="Data Rapi Dulu, Analisis Kemudian"
        left={<>
          <Para>Data dari formulir atau sistem lain jarang bersih: spasi berlebih, huruf tidak konsisten, baris ganda. Rapikan sebelum dianalisis.</Para>
          <DataTable><thead><tr><th>Fungsi</th><th>Contoh</th><th>Hasil</th></tr></thead><tbody>
            <tr><td><code>TRIM</code></td><td><code>{'=TRIM(" sari  wulandari ")'}</code></td><td>sari wulandari</td></tr>
            <tr><td><code>PROPER</code></td><td><code>{'=PROPER("sari WULANDARI")'}</code></td><td>Sari Wulandari</td></tr>
            <tr><td><code>UPPER</code></td><td><code>{'=UPPER("qris")'}</code></td><td>QRIS</td></tr>
            <tr><td><code>SUBSTITUTE</code></td><td><code>{'=SUBSTITUTE("0812-34";"-";"")'}</code></td><td>081234</td></tr>
            <tr><td><code>CLEAN</code></td><td><code>=CLEAN(A2)</code></td><td>buang karakter tak tercetak</td></tr>
          </tbody></DataTable>
        </>}
        right={<>
          <Callout title={<>Hapus duplikat</>}>Sheets: <strong>Data → Data cleanup → Remove duplicates</strong><br />Excel: <strong>Data → Remove Duplicates</strong></Callout>
          <Callout title={<>Pisahkan teks</>}>Sheets: <strong>Data → Split text to columns</strong><br />Excel: <strong>Data → Text to Columns</strong></Callout>
          <Callout title={<>Rapikan spasi tanpa rumus</>}>Sheets: <strong>Data → Data cleanup → Trim whitespace</strong><br />Excel: gunakan fungsi <strong>TRIM</strong></Callout>
        </>} />

      <ContentSlide title="Warna Otomatis Menyorot Data Penting" notes="Warna otomatis menyorot data penting sehingga pola langsung terlihat — dan ikut berubah saat data berubah.">
        <Cards cols={4} tight>
          <Card icon="filter_alt" title={<>Nilai</>}><p>Sorot sel yang lebih besar dari, kurang dari, atau di antara angka tertentu. Contoh: Total ≥ 100.000.</p></Card>
          <Card icon="text_fields" tone="secondary" title={<>Teks</>}><p>Sorot sel yang berisi atau persis sama dengan teks tertentu. Contoh: status “Batal”.</p></Card>
          <Card icon="palette" tone="tertiary" title={<>Skala warna</>}><p>Gradien warna dari nilai rendah ke tinggi untuk melihat sebaran sekilas.</p></Card>
          <Card icon="function" title={<>Rumus kustom</>}><p>Sorot satu baris penuh dengan rumus, mis. <code>{'=$H2="Batal"'}</code>.</p></Card>
        </Cards>
        <Callout title={<>Letak menu</>}>Sheets: <strong>Format → Conditional formatting</strong> · Excel: <strong>Home → Conditional Formatting</strong>. Pilih rentang dulu, lalu tentukan aturan dan warna.</Callout>
      </ContentSlide>

      <SplitSlide title="Galat Perlu Dipahami Sebelum Disembunyikan"
        left={<>
          <DataTable><thead><tr><th>Galat</th><th>Penyebab umum</th><th>Perbaikan</th></tr></thead><tbody>
            <tr><td><code>#N/A</code></td><td>Nilai yang dicari tidak ada di tabel</td><td>Periksa ejaan/kode atau tabel referensi</td></tr>
            <tr><td><code>#DIV/0!</code></td><td>Dibagi nol atau sel kosong</td><td>Pastikan pembagi bukan nol</td></tr>
            <tr><td><code>#VALUE!</code></td><td>Tipe data salah (teks dijumlahkan)</td><td>Ubah ke angka, rapikan spasi</td></tr>
            <tr><td><code>#REF!</code></td><td>Rujukan sel terhapus</td><td>Perbaiki rujukan</td></tr>
            <tr><td><code>#NAME?</code></td><td>Nama fungsi salah ketik</td><td>Periksa ejaan fungsi</td></tr>
          </tbody></DataTable>
        </>}
        right={<>
          <Formula label="Sintaks">=IFERROR(nilai; nilai_jika_galat)</Formula>
          <Callout title={<>Contoh</>}><code>{'=IFERROR(VLOOKUP(A2;Referensi!A:B;2;FALSE);"Tidak ada")'}</code></Callout>
          <Callout title={<>Hati-hati</>}>IFERROR menyembunyikan galat. Pakai setelah tahu penyebabnya, bukan untuk menutupi rumus yang salah.</Callout>
        </>} />

      <QuickCheckSlide
        q={<>VLOOKUP menghasilkan <code>#N/A</code> karena kode <code>M07</code> tidak ada di tabel referensi. Langkah terbaik?</>}
        options={[<>Langsung bungkus dengan IFERROR tanpa memeriksa</>, <>Periksa kode dan tabel referensi dulu, baru pakai IFERROR bila memang diharapkan</>, <>Hapus baris yang bermasalah</>, <>Ganti rumusnya dengan SUM</>]} answer={1}
        why={<>IFERROR hanya <strong>menyembunyikan</strong> galat. Pahami penyebabnya lebih dulu, lalu tampilkan pesan yang bermakna seperti “Tidak ada”.</>}
        notes="Hubungkan dengan kode M07 di berkas praktikum." />

      <ContentSlide title="Padanan Menu: Google Sheets ↔ Microsoft Excel">
        <EquivTable main="Google Sheets" backup="Microsoft Excel" rows={[
          ["Tabel pivot", "Insert → Pivot table", "Insert → PivotTable"],
          ["Hapus duplikat", "Data → Data cleanup → Remove duplicates", "Data → Remove Duplicates"],
          ["Rapikan spasi", "Data → Data cleanup → Trim whitespace (atau TRIM)", "Fungsi TRIM"],
          ["Pisahkan teks", "Data → Split text to columns", "Data → Text to Columns"],
          ["Pemformatan bersyarat", "Format → Conditional formatting", "Home → Conditional Formatting"],
          ["Pemisah argumen rumus", "; atau , sesuai File → Settings → Locale", "; atau , sesuai pengaturan regional Windows"],
        ]} />
        <Callout title={<>Berpindah aplikasi</>}>Fungsi (TRIM, IFERROR, VLOOKUP, …) bernama sama di kedua aplikasi. Berkas <code>.xlsx</code> dapat dibuka di keduanya.</Callout>
      </ContentSlide>

      <ContentSlide title="Tugas Praktikum: Membersihkan & Meringkas Data">
        <TaskHead>
          <Callout title={<>Tugas (±30 menit)</>}>Rapikan log transaksi kafe yang berantakan, lalu ringkas dengan pivot, pemformatan bersyarat, dan IFERROR.</Callout>
          <Download file="dtd-p13-data-mentah.xlsx" />
        </TaskHead>
        <StepHead>Langkah 1–4</StepHead>
        <Steps cols={2}>
          <Step n={1} title={<>Buka & beri nama</>}><>Unggah ke Google Drive → <strong>Buka dengan Google Sheets</strong> (cadangan: Excel). Nama: <code>DTD_P13_NIM_NAMA</code>.</></Step>
          <Step n={2} title={<>Rapikan teks</>}><>Kolom baru: <code>=PROPER(TRIM(B2))</code> untuk Kasir dan <code>=UPPER(TRIM(G2))</code> untuk Metode Bayar.</></Step>
          <Step n={3} title={<>Hapus duplikat</>}><><strong>Remove duplicates</strong> pada seluruh kolom — dua baris ganda hilang (tersisa 24 transaksi).</></Step>
          <Step n={4} title={<>Pisahkan kode & menu</>}><><strong>Split text to columns</strong> dengan pemisah <code>-</code> pada kolom <strong>Kode - Menu</strong>, lalu rapikan spasinya.</></Step>
        </Steps>
      </ContentSlide>

      <ContentSlide title="Tugas Praktikum: Membersihkan & Meringkas Data (lanjutan)">
        <StepHead>Langkah 5–8</StepHead>
        <Steps cols={2}>
          <Step n={5} title={<>Total & bulan</>}><>Kolom Total: <code>=E2*F2</code>; kolom Bulan: <code>=MONTH(D2)</code>.</></Step>
          <Step n={6} title={<>Tabel pivot</>}><>Pivot: total per <strong>Metode Bayar</strong> dan total per <strong>Menu</strong>.</></Step>
          <Step n={7} title={<>Pemformatan bersyarat</>}><>Sorot status <strong>Batal</strong> (merah) dan Total ≥ 100.000 (hijau).</></Step>
          <Step n={8} title={<>IFERROR & kumpulkan</>}><>Kolom Kategori: <code>{'=IFERROR(VLOOKUP(kode;Referensi!A:B;2;FALSE);"Tidak ada")'}</code>, lalu bagikan tautan.</></Step>
        </Steps>
        <Callout title={<>Kriteria Pengumpulan</>}>Nama berkas sesuai format, teks sudah rapi, 24 baris tanpa duplikat, kolom Total dan Bulan, pivot per metode & menu, dua aturan pemformatan bersyarat, kolom Kategori dengan IFERROR (kode <code>M07</code> menjadi “Tidak ada”), dan tautan share berfungsi.</Callout>
      </ContentSlide>

      <QuizSlide title="Post-Test: Uji Pemahaman" items={quiz} />

      <SummarySlide title="Rangkuman Pertemuan 13" points={[
        <>Fungsi teks <strong>LEFT, RIGHT, MID</strong> memungkinkan ekstraksi karakter dari posisi tertentu dalam sel.</>,
        <><strong>CONCATENATE</strong> dan <strong>TEXT</strong> berguna untuk menggabungkan serta memformat nilai menjadi teks yang terbaca.</>,
        <>Fungsi tanggal <strong>TODAY, YEAR, MONTH, DAY</strong> memudahkan pengelolaan dan analisis data berbasis waktu.</>,
        <><strong>Tabel Pivot</strong> adalah alat analisis powerful untuk meringkas data besar tanpa rumus manual.</>,
        <><strong>Merapikan data</strong> (TRIM, PROPER, hapus duplikat, pisah teks), <strong>pemformatan bersyarat</strong>, dan <strong>IFERROR</strong> membuat data siap dianalisis — di Google Sheets maupun Excel.</>,
      ]} />

      <ReferencesSlide refs={[
        <>Google. (2025). "Create & use pivot tables." <em>support.google.com/docs/answer/1272900</em></>,
        <>Google. (2025). "Apply conditional formatting rules." <em>support.google.com/docs/answer/78413</em></>,
        <>Google. (2025). "IFERROR." <em>support.google.com/docs/answer/3093304</em></>,
        <>Google. (2025). "TRIM function." <em>support.google.com/docs/answer/3094140</em></>,
        <>Microsoft. (2025). "Create a PivotTable to analyze worksheet data." <em>support.microsoft.com</em></>,
      ]} />

      <ClosingSlide lede={<>Dengan fungsi teks, tanggal, pivot table, dan data yang rapi — Anda sudah memiliki bekal untuk mengolah data secara profesional di spreadsheet apa pun.</>} quote={<>"Without data, you're just another person with an opinion."</>} cite={<>— W. Edwards Deming</>} next="Pertemuan 14: Aplikasi Kecerdasan Buatan"
        notes={"Topik pertemuan berikutnya: Prompt Engineering — Berkomunikasi efektif dengan AI; Scispace untuk Riset — AI membantu riset akademik; Etika & Limitasi AI — Batas dan tanggung jawab."} />

    </>
  );
}
