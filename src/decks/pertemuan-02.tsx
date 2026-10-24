import {
  AgendaSlide,
  ClosingSlide,
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
  Figure,
  Flow,
  Para,
  SplitSlide,
  Stat,
  Stats,
} from '../layouts/blocks';
import { I, M } from '../ui';

const quiz: QuizItem[] = [
  { q: <>Mengapa komputer menggunakan sistem biner?</>, options: [<>Karena lebih cepat</>, <>Karena transistor hanya punya dua kondisi</>, <>Karena lebih murah</>, <>Karena lebih mudah diprogram</>], answer: 1 },
  { q: <>Biner dari desimal 13 adalah...</>, options: [<><code>1011</code></>, <><code>1101</code></>, <><code>1110</code></>, <><code>1001</code></>], answer: 1 },
  { q: <>Berapa byte dalam 1 KB?</>, options: [<>100 byte</>, <>512 byte</>, <>1.024 byte</>, <>10.000 byte</>], answer: 2 },
  { q: <>Gerbang OR menghasilkan 1 jika...</>, options: [<>Semua input 1</>, <>Semua input 0</>, <>Salah satu input 1</>, <>Tidak ada yang benar</>], answer: 2 },
];

const agendaItems = [
        { title: "Mengapa Biner?", desc: "Transistor ON/OFF — bahasa dasar komputer" },
        { title: "Bilangan Biner", desc: "Konsep, konversi, dan aplikasi dalam komputasi" },
        { title: "Semuanya Adalah Biner", desc: "Teks, warna, gambar, suara — semuanya deretan bit" },
        { title: "Logika Digital", desc: "Konsep benar/salah dan gerbang logika" },
        { title: "Aplikasi Logika", desc: "Bagaimana logika membantu komputer mengambil keputusan" },
      ];

export default function Pertemuan02() {
  return (
    <>
      <TitleSlide meeting={2} title="Sistem Bilangan Digital & Logika Digital" lede="Memahami bagaimana komputer merepresentasikan data dan mengambil keputusan menggunakan bilangan biner dan gerbang logika" />

      <ContentSlide title="Dunia dalam 0 dan 1">
        <Stats>
          <Stat n={<>1 karakter</>} l={<>= 8 bit = 1 byte</>} />
          <Stat n={<>3–5 MB</>} l={<>ukuran 1 foto HP</>} />
          <Stat n={<>32 miliar</>} l={<>bit dalam 1 film HD</>} />
        </Stats>
        <Para tone="highlight">Seluruh data yang kamu lihat di layar ini — teks, gambar, warna, video — pada akhirnya adalah deretan angka 0 dan 1. Bagaimana mungkin?</Para>
      </ContentSlide>

      <AgendaSlide title="Agenda Pertemuan" items={agendaItems} />

      <SectionSlide part={1} of={4} title="Sistem Bilangan Biner" desc={<>Mengapa komputer memakai 0 dan 1, dan cara mengonversinya</>} />

      <SplitSlide title="Mengapa Komputer Menggunakan Biner?"
        left={<>
          <Para>Transistor — komponen dasar chip — hanya punya <strong>dua kondisi</strong>: ON (1) dan OFF (0). Inilah mengapa komputer berbicara dalam bahasa biner.</Para>
          <Para>Transistor adalah saklar elektronik super kecil. Satu chip modern bisa berisi <strong>miliaran</strong> transistor yang bekerja bersama.</Para>
          <Para>Mengapa hanya dua kondisi? Karena sinyal dua kondisi lebih <strong>stabil</strong> dan <strong>tahan terhadap noise</strong> dibanding sinyal multi-level.</Para>
          <Cols>
            <Col><div className="big">2</div><div className="lab">Kondisi Transistor</div></Col>
            <Col><div className="big">Miliaran</div><div className="lab">Transistor per Chip</div></Col>
          </Cols>
        </>}
        right={<>
          <Figure src="images/binary-data.png" alt="Representasi data biner dalam komputer" />
        </>} />

      <ContentSlide title="Biner dalam Kehidupan Sehari-hari">
        <Cols>
          <Col title={<>Dua Kondisi</>}><ul><li><strong>0</strong> = OFF = FALSE = Low voltage</li><li><strong>1</strong> = ON = TRUE = High voltage</li></ul><p>Representasi sederhana dalam kehidupan:</p><ul><li><I n="lightbulb" /> Lampu: <strong>menyala</strong> (1) atau <strong>mati</strong> (0)</li><li><I n="radio_button_checked" /> Saklar: <strong>on</strong> (1) atau <strong>off</strong> (0)</li><li><I n="check_circle" /> Pernyataan: <strong>benar</strong> (1) atau <strong>salah</strong> (0)</li></ul></Col>
          <Col title={<>Dari 2 Angka ke Dunia Digital</>}><p>Dengan hanya 0 dan 1, komputer bisa merepresentasikan:</p><ul><li><I n="text_fields" /> <strong>Teks</strong> — huruf "A" = <code>01000001</code></li><li><I n="palette" /> <strong>Warna</strong> — merah = <code>FF0000</code><sub>16</sub></li><li><I n="image" /> <strong>Gambar</strong> — matriks nilai warna per pixel</li><li><I n="volume_up" /> <strong>Suara</strong> — gelombang → 44.100 sampel/detik</li></ul></Col>
        </Cols>
      </ContentSlide>

      <ContentSlide title="Konsep Bilangan Biner">
        <Para tone="caption">Biner menggunakan basis 2 — setiap posisi memiliki bobot yang merupakan pangkat dari 2.</Para>
        <DataTable><thead><tr><th>Posisi</th><th><M tex="2^3" /></th><th><M tex="2^2" /></th><th><M tex="2^1" /></th><th><M tex="2^0" /></th></tr></thead><tbody><tr><td>Bobot</td><td><code>8</code></td><td><code>4</code></td><td><code>2</code></td><td><code>1</code></td></tr><tr><td>Contoh</td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td></tr></tbody></DataTable>
        <Callout title={<>Cara Baca</>}>1×8 + 1×4 + 0×2 + 1×1 = <strong>13</strong> — Jadi bilangan biner <code>1101</code> = desimal <strong>13</strong></Callout>
      </ContentSlide>

      <ContentSlide title="Konversi Biner ↔ Desimal">
        <Cols>
          <Col title={<>Desimal → Biner</>}><p>Bagi 2 secara berulang, baca sisa dari bawah ke atas.</p><DataTable><thead><tr><th>Bagi</th><th>Hasil</th><th>Sisa</th></tr></thead><tbody><tr><td><code>13 ÷ 2</code></td><td><code>6</code></td><td><code>1</code></td></tr><tr><td><code>6 ÷ 2</code></td><td><code>3</code></td><td><code>0</code></td></tr><tr><td><code>3 ÷ 2</code></td><td><code>1</code></td><td><code>1</code></td></tr><tr><td><code>1 ÷ 2</code></td><td><code>0</code></td><td><code>1</code></td></tr></tbody></DataTable><Callout title={<>Hasil</>}><M tex="13_{10} = 1101_2" /></Callout></Col>
          <Col title={<>Biner → Desimal</>}><p>Kalikan setiap digit dengan bobot posisinya, lalu jumlahkan.</p><DataTable><thead><tr><th>Posisi</th><th><M tex="2^3" /></th><th><M tex="2^2" /></th><th><M tex="2^1" /></th><th><M tex="2^0" /></th></tr></thead><tbody><tr><td>Bobot</td><td><code>8</code></td><td><code>4</code></td><td><code>2</code></td><td><code>1</code></td></tr><tr><td>Biner</td><td><code>1</code></td><td><code>1</code></td><td><code>0</code></td><td><code>1</code></td></tr></tbody></DataTable><Callout title={<>Hitung</>}><M tex="8 + 4 + 0 + 1 = \mathbf{13}" /></Callout></Col>
        </Cols>
      </ContentSlide>

      <ContentSlide title="Coba Konversi Sendiri!">
        <Para tone="caption"><I n="chat" /> Diskusikan dengan teman di sebelahmu — 5 menit!</Para>
        <Flow>
          <Box icon="edit_note" title={<>Soal 1</>}><p>Konversikan desimal <strong>42</strong> ke biner!<br /><em>(Petunjuk: bagi 2 berulang, baca sisa dari bawah)</em></p></Box>
          <Box icon="edit_note" title={<>Soal 2</>}><p>Konversikan biner <code>10110</code> ke desimal!<br /><em>(Petunjuk: kalikan bobot posisi, lalu jumlahkan)</em></p></Box>
          <Box icon="edit_note" title={<>Soal 3</>}><p>Konversikan desimal <strong>100</strong> ke biner!<br /><em>(Tantangan: butuh lebih dari 4 digit)</em></p></Box>
        </Flow>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Berapa nilai desimal dari bilangan biner <code>1001</code>?</>}
        options={[<>7</>, <>8</>, <>9</>, <>10</>]} answer={2}
        why={<><code>1×8 + 0×4 + 0×2 + 1×1 = 9</code>. Kalikan tiap digit dengan bobot posisinya, lalu jumlahkan.</>}
        notes="Beri waktu 30 detik; minta satu mahasiswa menjelaskan langkahnya." />

      <SectionSlide part={2} of={4} title="Data Digital" desc={<>Teks, warna, gambar, suara, dan satuan data</>} />

      <ContentSlide title="Semuanya Adalah Biner">
        <Para tone="caption">Setelah memahami konsep biner, mari lihat bagaimana data nyata direpresentasikan.</Para>
        <Cards cols={4}>
          <Card icon="text_fields" title={<>ASCII / Unicode</>}><p>Huruf "A" = <code>01000001</code></p></Card>
          <Card icon="palette" title={<>Warna RGB</>}><p>Merah = <code>FF0000</code><sub>16</sub></p></Card>
          <Card icon="image" title={<>Pixel</>}><p>Gambar = matriks nilai warna</p></Card>
          <Card icon="volume_up" title={<>Audio</>}><p>Gelombang → sampel digital (44.100x/detik)</p></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Satuan Data Digital">
        <Para tone="caption">Semua data tersusun dari bit. Untuk mengukur ukurannya, kita gunakan satuan berikut:</Para>
        <Flow>
          <Box title={<>0/1</>}><p><strong>Bit</strong><br />1 digit biner</p></Box>
          <Arrow glyph="→" />
          <Box title={<>8b</>}><p><strong>Byte</strong><br />8 bit = 1 karakter</p></Box>
          <Arrow glyph="→" />
          <Box title={<>KB</>}><p><strong>Kilobyte</strong><br />1.024 Byte</p></Box>
          <Arrow glyph="→" />
          <Box title={<>MB</>}><p><strong>Megabyte</strong><br />1.024 KB</p></Box>
          <Arrow glyph="→" />
          <Box title={<>GB</>}><p><strong>Gigabyte</strong><br />1.024 MB</p></Box>
        </Flow>
        <Callout title={<>Fakta</>}>1 karakter ASCII = 1 byte. Satu halaman teks ≈ 2.000 karakter = 2 KB. Satu foto HP ≈ 3–5 MB. Satu film HD ≈ 4 GB.</Callout>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Sebuah berkas teks berisi 4.096 karakter ASCII. Berapa ukurannya?</>}
        options={[<>4.096 bit</>, <>4 KB</>, <>4 MB</>, <>512 byte</>]} answer={1}
        why={<>1 karakter = 1 byte, jadi 4.096 byte. Karena 1 KB = 1.024 byte, ukurannya <strong>4 KB</strong>.</>}
        notes="Jebakan umum: tertukar bit dan byte." />

      <SectionSlide part={3} of={4} title="Logika Digital" desc={<>Benar dan salah, gerbang logika, dan tabel kebenaran</>}
        notes="Kita sudah tahu bagaimana komputer menyimpan data dalam 0 dan 1. Tapi bagaimana komputer mengambil keputusan? [Sistem Bilangan → Logika Digital] " />

      <ContentSlide title="Konsep Logika: Benar dan Salah">
        <Cols>
          <Col title={<>Logika dalam Kehidupan</>}><p>Setiap hari kita menggunakan logika tanpa sadar:</p><Callout><strong>JIKA</strong> hujan <strong>DAN</strong> tidak ada payung → basah</Callout><Callout><strong>JIKA</strong> lapar <strong>ATAU</strong> haus → beli makanan/minuman</Callout><Callout><strong>JIKA</strong> <strong>BUKAN</strong> hari Minggu → hari kerja</Callout><p>Komputer menggunakan prinsip yang sama, hanya dalam bentuk <strong>0</strong> (salah) dan <strong>1</strong> (benar).</p></Col>
          <Col title={<>Gerbang Logika Dasar</>}><p>Komputer punya "saklar keputusan" yang disebut <strong>gerbang logika</strong>:</p><Callout title={<>AND (∧)</>}>Benar jika <strong>SEMUA</strong> benar</Callout><Callout title={<>OR (∨)</>}>Benar jika <strong>SALAH SATU</strong> benar</Callout><Callout title={<>NOT (¬)</>}><strong>Membalik</strong> benar jadi salah</Callout></Col>
        </Cols>
      </ContentSlide>

      <ContentSlide title="Tabel Kebenaran">
        <Cards cols={3}>
          <Card glyph="∧" title={<>Gerbang AND</>}><p>Keluaran 1 jika <strong>semua input 1</strong></p>          <DataTable><thead><tr><th>A</th><th>B</th><th>Out</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td></tr><tr><td>1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td><strong>1</strong></td></tr></tbody></DataTable></Card>
          <Card glyph="∨" title={<>Gerbang OR</>}><p>Keluaran 1 jika <strong>salah satu input 1</strong></p>          <DataTable><thead><tr><th>A</th><th>B</th><th>Out</th></tr></thead><tbody><tr><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td><strong>1</strong></td></tr><tr><td>1</td><td>0</td><td><strong>1</strong></td></tr><tr><td>1</td><td>1</td><td><strong>1</strong></td></tr></tbody></DataTable></Card>
          <Card glyph="¬" title={<>Gerbang NOT</>}><p><strong>Membalik</strong> input</p>          <DataTable><thead><tr><th>A</th><th>Out</th></tr></thead><tbody><tr><td>0</td><td><strong>1</strong></td></tr><tr><td>1</td><td><strong>0</strong></td></tr></tbody></DataTable></Card>
        </Cards>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Sistem hanya menyala jika tombol A <strong>dan</strong> tombol B ditekan. Jika A = 1 dan B = 0, keluaran gerbang AND adalah…</>}
        options={[<>0</>, <>1</>, <>10</>, <>Tidak dapat ditentukan</>]} answer={0}
        why={<>Gerbang <strong>AND</strong> hanya menghasilkan 1 jika <strong>semua</strong> inputnya 1.</>}
        notes="Bandingkan dengan OR menggunakan input yang sama." />

      <SectionSlide part={4} of={4} title="Aplikasi Logika" desc={<>Dari alarm hingga pengambilan keputusan</>} />

      <ContentSlide title="Aplikasi Logika dalam Kehidupan">
        <Cards cols={3}>
          <Card icon="lock" title={<>Alarm Keamanan</>}><p>Pintu <strong>ATAU</strong> jendela terbuka → alarm bunyi<br /><strong>(OR gate)</strong> — contoh: sensor pintu rumah, alarm kampus</p></Card>
          <Card icon="lightbulb" title={<>Lampu 2 Saklar</>}><p>Dua saklar, satu lampu — beda posisi = nyala<br /><strong>(XOR gate)</strong> — contoh: lampu tangga rumah, lorong gedung</p></Card>
          <Card icon="calculate" title={<>Kalkulator & CPU</>}><p>Semua operasi aritmatika (+, −, ×, ÷) dibangun dari gerbang logika<br /><strong>(AND + OR + NOT)</strong></p></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Logika dalam Pengambilan Keputusan">
        <Cols>
          <Col title={<>Contoh Nyata</>}><Callout title={<>Sistem Absensi Digital</>}><strong>JIKA</strong> wajah cocok <strong>DAN</strong> waktu tepat → "Hadir"<br /><strong>JIKA</strong> wajah cocok <strong>DAN</strong> waktu terlambat → "Terlambat"<br /><strong>JIKA</strong> wajah tidak cocok → "Tidak dikenali"</Callout><Callout title={<>Filter Email Spam</>}><strong>JIKA</strong> mengandung kata "menang" <strong>DAN</strong> pengirim tidak dikenal → Spam</Callout></Col>
          <Col title={<>Dari Logika ke Program</>}><p>Setiap kali kamu menggunakan aplikasi, di balik layar ada <strong>jutaan keputusan logika</strong> yang diambil komputer dalam hitungan detik:</p><ul><li><I n="smartphone" /> <strong>Scroll Instagram</strong> → logika menentukan post mana yang ditampilkan</li><li><I n="map" /> <strong>Google Maps</strong> → logika menentukan rute tercepat</li><li><I n="two_wheeler" /> <strong>Gojek</strong> → logika mencocokkan driver dengan penumpang</li></ul></Col>
        </Cols>
      </ContentSlide>

      <QuizSlide title="Post-Test: Uji Pemahaman" items={quiz} />

      <SummarySlide title="Rangkuman Pertemuan 2" points={[
        <>Komputer menggunakan <strong>sistem biner</strong> (0 dan 1) karena transistor hanya punya dua kondisi: ON dan OFF.</>,
        <>Biner menggunakan <strong>basis 2</strong> — setiap posisi memiliki bobot pangkat 2. Konversi desimal↔biner adalah keterampilan dasar.</>,
        <>Semua data digital — teks (ASCII), warna (RGB), gambar (pixel), suara (sampel) — pada akhirnya adalah <strong>deretan bit</strong>.</>,
        <><strong>Logika digital</strong> beroperasi pada konsep benar (1) dan salah (0), sama seperti cara kita berpikir sehari-hari.</>,
        <><strong>Gerbang logika</strong> (AND, OR, NOT) adalah blok pembangun semua rangkaian digital — dari kalkulator hingga smartphone.</>,
        <>Setiap aplikasi yang kamu gunakan mengambil <strong>jutaan keputusan logika</strong> per detik di balik layar.</>,
      ]} />

      <ReferencesSlide refs={[
        <>Stallings, W. (2021). <em>Computer Organization and Architecture: Designing for Performance</em>. 11th ed. Pearson.</>,
        <>Tanenbaum, A.S. & Austin, T. (2012). <em>Structured Computer Organization</em>. 6th ed. Pearson.</>,
        <>Null, L. & Lobur, J. (2014). <em>The Essentials of Computer Organization and Architecture</em>. 4th ed. Jones & Bartlett.</>,
        <>Von Neumann, J. (1945). "First Draft of a Report on the EDVAC." <em>IEEE Annals of the History of Computing</em>, 15(4), 27–75.</>,
        <>Hennessy, J.L. & Patterson, D.A. (2017). <em>Computer Architecture: A Quantitative Approach</em>. 6th ed. Morgan Kaufmann.</>,
      ]} />

      <ClosingSlide lede={<>Komputer hanya mengenal 0 dan 1 — namun dari dua digit sederhana ini, seluruh dunia digital dibangun.</>} quote={<>"The computer was born to solve problems that did not exist before."</>} cite={<>— Bill Gates</>} next="Pertemuan 3: Internet, Website, Basis Data & Media Sosial"
        notes={"Topik pertemuan berikutnya: Internet — Bagaimana komputer di seluruh dunia saling terhubung melalui jaringan; Website — Dari HTML hingga framework — bagaimana halaman web dibangun; Basis Data — Bagaimana data disimpan, diolah, dan menjadi platform yang menghubungkan jutaan orang."} />

    </>
  );
}
