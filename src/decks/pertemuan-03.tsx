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
  Flow,
  Para,
  Stat,
  Stats,
  TimelineBlock,
  TimelineItem,
} from '../layouts/blocks';
import { I } from '../ui';

const quiz: QuizItem[] = [
  { q: <>Protokol utama untuk mengirim halaman web?</>, options: [<>FTP</>, <>SMTP</>, <>HTTP/HTTPS</>, <>SSH</>], answer: 2 },
  { q: <>Fungsi utama DNS?</>, options: [<>Mengenkripsi data</>, <>Mengubah domain ke IP address</>, <>Mempercepat koneksi</>, <>Mengelola password</>], answer: 1 },
  { q: <>Data di internet dikirim dalam bentuk?</>, options: [<>File besar tunggal</>, <>Gelombang analog</>, <>Paket-paket kecil</>, <>Sinyal radio</>], answer: 2 },
  { q: <>Contoh layanan SaaS?</>, options: [<>AWS EC2</>, <>Gmail</>, <>Linux Server</>, <>MySQL</>], answer: 1 },
];

const agendaItems = [
        { title: "Internet sebagai Jaringan Global", desc: "TCP/IP, DNS, dan fondasi konektivitas dunia" },
        { title: "Cloud & Komunikasi Real-time", desc: "Layanan yang mengalir tanpa henti di balik layar" },
        { title: "Website & Basis Data", desc: "HTML/CSS/JS, SQL vs NoSQL — apa yang terjadi di balik layar" },
        { title: "Media Sosial & Dampaknya", desc: "Evolusi platform, dampak positif & negatif" },
        { title: "Literasi Digital & Keamanan", desc: "Berpikir kritis, keamanan, dan etika bermedia sosial" },
      ];

export default function Pertemuan03() {
  return (
    <>
      <TitleSlide meeting={3} title="Internet, Website, Basis Data & Media Sosial" lede="Memahami infrastruktur internet, cara kerja website dan basis data, serta peran media sosial dalam masyarakat digital" />

      <HookSlide title="Satu Klik, Perjalanan Panjang"
        lede="Ketik alamat situs lalu tekan Enter — apa yang terjadi sebelum halaman muncul?"
        notes="Minta mahasiswa menebak urutan langkahnya sebelum agenda dibuka. Setiap kotak akan dibahas di pertemuan ini."
      >
        <Flow>
          <Box icon="keyboard" title={<>Ketik alamat</>}><p><code>itera.ac.id</code></p></Box>
          <Arrow glyph="→" />
          <Box icon="menu_book" title={<>DNS</>}><p>Nama → alamat IP</p></Box>
          <Arrow glyph="→" />
          <Box icon="dns" title={<>Server</>}><p>Menyiapkan halaman</p></Box>
          <Arrow glyph="→" />
          <Box icon="web" title={<>Halaman tampil</>} primary><p>Di layar Anda</p></Box>
        </Flow>
      </HookSlide>

      <AgendaSlide title="Agenda Pertemuan" items={agendaItems} />

      <SectionSlide part={1} of={4} title="Internet sebagai Jaringan Global" desc={<>TCP/IP, DNS, router, dan paket data</>} />

      <ContentSlide title="Internet: Jaringan dari Jaringan">
        <Callout title={<>Definisi</>}>Internet adalah <strong>jaringan global</strong> yang menghubungkan miliaran perangkat di seluruh dunia melalui protokol standar <strong>TCP/IP</strong>.</Callout>
        <Cols>
          <Col title={<>TCP/IP</>}><DataTable><tbody><tr><td><strong>TCP</strong></td><td>Membagi & menyusun data</td></tr><tr><td><strong>IP</strong></td><td>Alamat pengirim & tujuan</td></tr><tr><td><strong>Port</strong></td><td>Jalur layanan (80, 443)</td></tr></tbody></DataTable></Col>
          <Col title={<>DNS</>}><DataTable><tbody><tr><td><strong>Fungsi</strong></td><td>Domain → IP address</td></tr><tr><td><strong>Analogi</strong></td><td>Buku telepon internet</td></tr><tr><td><strong>Contoh</strong></td><td><code>google.com → 142.250.x.x</code></td></tr></tbody></DataTable></Col>
        </Cols>
      </ContentSlide>

      <ContentSlide title="Bagaimana Internet Bekerja?">
        <Flow>
          <Box icon="desktop_windows" title={<>Client</>}><p>Kirim request HTTP</p></Box>
          <Arrow glyph="→" />
          <Box icon="cell_tower" title={<>ISP</>}><p>Penyedia akses</p></Box>
          <Arrow glyph="→" />
          <Box icon="shuffle" title={<>Router</>}><p>Cari jalur terbaik</p></Box>
          <Arrow glyph="→" />
          <Box icon="desktop_windows" title={<>Server</>} primary><p>Proses & kirim balasan</p></Box>
        </Flow>
        <Cols>
          <Col title={<>Paket Data</>}><ul><li>Data dipecah menjadi <strong>paket-paket kecil</strong></li><li>Setiap paket punya header (alamat tujuan)</li><li>Paket bisa lewat jalur berbeda</li><li>Disusun ulang di tujuan oleh TCP</li></ul></Col>
          <Col title={<>Routing</>}><ul><li>Router membaca <strong>alamat IP tujuan</strong></li><li>Memilih jalur tercepat/terdekat</li><li>BGP mengatur routing antar ISP</li><li>Setiap hop = satu router</li></ul></Col>
        </Cols>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Router memilih jalur untuk paket data dengan membaca…</>}
        options={[<>Alamat IP tujuan</>, <>Isi pesan</>, <>Nama pengguna</>, <>Warna situs</>]} answer={0}
        why={<>Router membaca <strong>alamat IP tujuan</strong> pada header paket, lalu memilih jalur tercepat atau terdekat.</>}
        notes="Ingatkan: setiap hop adalah satu router." />

      <SectionSlide part={2} of={4} title="Cloud dan Komunikasi Real-time" desc={<>Layanan yang berjalan di server</>}
        notes="Pertemuan lalu kita belajar bagaimana komputer menyimpan data dalam 0 dan 1. Sekarang: bagaimana 0 dan 1 itu mengalir dari satu komputer ke komputer lain di seluruh dunia? [Internet → Cloud → Aplikasi] Internet adalah jalannya. Tapi apa yang lewat di jalur itu? Layanan yang kita gunakan setiap hari." />

      <ContentSlide title="Cloud & Komunikasi Real-time">
        <Cards cols={3} tight>
          <Card icon="cloud" title={<>Cloud Storage</>}><p>Simpan file online — akses dari mana saja<br /><strong>Contoh:</strong> Google Drive, iCloud, Dropbox</p></Card>
          <Card icon="settings" title={<>Cloud Computing</>}><p>Proses data online — tanpa install di komputer<br /><strong>Contoh:</strong> Google Docs, Zoom, Canva</p></Card>
          <Card icon="chat" title={<>Real-time</>}><p>Data mengalir terus-menerus — tanpa jeda<br /><strong>Contoh:</strong> WhatsApp, notifikasi, live streaming</p></Card>
        </Cards>
        <Callout title={<>Mengapa Penting?</>}>Semua layanan ini berjalan di <strong>server</strong> yang bisa diakses dari mana saja, kapan saja. Kamu tidak perlu tahu server-nya di mana — cukup buka aplikasi, langsung jalan.</Callout>
      </ContentSlide>

      <SectionSlide part={3} of={4} title="Website dan Basis Data" desc={<>HTML, CSS, JavaScript, SQL, dan NoSQL</>}
        notes="Kamu buka Tokopedia, lihat produk, beli. Itu semua terjadi di layar. Tapi apa yang terjadi di balik layar? [User → Website → Database] " />

      <ContentSlide title="Anatomi Website">
        <Cards cols={3} tight>
          <Card icon="construction" title={<>HTML</>}><p><strong>Struktur</strong> — Tag seperti <code>{"<h1>"}</code>, <code>{"<p>"}</code>, <code>{"<div>"}</code> membangun kerangka halaman</p></Card>
          <Card icon="palette" title={<>CSS</>}><p><strong>Presentasi</strong> — Warna, font, layout, animasi. Membuat website menarik</p></Card>
          <Card icon="bolt" title={<>JavaScript</>}><p><strong>Interaktivitas</strong> — Validasi form, animasi, update tanpa reload halaman</p></Card>
        </Cards>
        <Flow>
          <Box title={<>Browser</>}><p>Klien (Chrome, Firefox)</p></Box>
          <Arrow glyph="⟺" />
          <Box title={<>Web Server</>} primary><p>Apache, Nginx</p></Box>
          <Arrow glyph="⟺" />
          <Box title={<>Database</>}><p>MySQL, MongoDB</p></Box>
        </Flow>
      </ContentSlide>

      <ContentSlide title="Basis Data: SQL vs NoSQL">
        <Callout title={<>Apa itu Basis Data?</>}>Sistem untuk <strong>menyimpan, mengelola, dan mengambil data</strong> secara terstruktur dan efisien.</Callout>
        <Cols>
          <Col title={<>SQL (Relasional)</>}><ul><li>Tabel dengan baris & kolom</li><li>Skema tetap (rigid)</li><li>Query bahasa SQL</li><li><strong>Contoh:</strong> data mahasiswa ITERA</li></ul><p>MySQL, PostgreSQL, Oracle</p></Col>
          <Col title={<>NoSQL (Non-Relasional)</>}><ul><li>Dokumen, key-value, graf</li><li>Skema fleksibel</li><li>Skalabilitas horizontal</li><li><strong>Contoh:</strong> data postingan Instagram</li></ul><p>MongoDB, Redis, Cassandra</p></Col>
        </Cols>
        <Callout title={<>Kapan Memilih?</>}>Butuh <strong>konsistensi ketat</strong> → SQL. Butuh <strong>fleksibilitas & skala besar</strong> → NoSQL. Banyak sistem modern menggunakan <strong>keduanya</strong> (polyglot persistence).</Callout>
      </ContentSlide>

      <ContentSlide title="Coba Pikirkan...">
        <Flow>
          <Box icon="shopping_cart"><p><strong>Produk</strong><br />Nama, harga, stok, foto</p></Box>
          <Box icon="person"><p><strong>User</strong><br />Nama, alamat, HP, email</p></Box>
          <Box icon="inventory_2"><p><strong>Transaksi</strong><br />Tanggal, jumlah, status</p></Box>
          <Box icon="star"><p><strong>Review</strong><br />Rating, komentar, foto</p></Box>
        </Flow>
        <Callout title={<>Pertanyaan</>}>Kamu beli barang di Tokopedia. <strong>Data apa saja yang tersimpan di database?</strong> Bagaimana data itu sampai ke layar HP-mu?</Callout>
        <Para tone="caption"><I n="chat" /> Diskusikan dengan teman di sebelahmu — 3 menit!</Para>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Kamu ingin mengubah warna dan font seluruh halaman sebuah website. Bagian mana yang diubah?</>}
        options={[<>HTML</>, <>CSS</>, <>JavaScript</>, <>Database</>]} answer={1}
        why={<><strong>CSS</strong> mengatur presentasi (warna, font, tata letak). HTML adalah struktur, JavaScript adalah interaktivitas.</>}
        notes="Tunjukkan Inspect Element di browser jika memungkinkan." />

      <SectionSlide part={4} of={4} title="Media Sosial dan Keamanannya" desc={<>Dampak, literasi digital, dan keamanan akun</>} />

      <ContentSlide title="Semua Terhubung">
        <Para tone="highlight">Internet jalannya. Website & database mesinnya. <strong>Siapa yang menggunakannya? Kita semua — melalui media sosial.</strong></Para>
        <Flow>
          <Box icon="language" title={<>Internet</>}><p>Jalur konektivitas</p></Box>
          <Arrow glyph="→" />
          <Box icon="desktop_windows" title={<>Website + DB</>}><p>Mesin & data</p></Box>
          <Arrow glyph="→" />
          <Box icon="smartphone" title={<>Media Sosial</>} primary><p>Platform yang<br />kita pakai</p></Box>
          <Arrow glyph="→" />
          <Box icon="group" title={<>Kita</>}><p>4,9 miliar<br />pengguna global</p></Box>
        </Flow>
      </ContentSlide>

      <ContentSlide title="Evolusi Media Sosial">
        <TimelineBlock>
          <TimelineItem era={<>2004</>} icon="edit_note"><p>Facebook<br />Era jejaring sosial</p></TimelineItem>
          <TimelineItem era={<>2006</>} icon="flutter_dash"><p>Twitter<br />Mikroblogging</p></TimelineItem>
          <TimelineItem era={<>2010</>} icon="photo_camera"><p>Instagram<br />Konten visual</p></TimelineItem>
          <TimelineItem era={<>2011</>} icon="chat"><p>WhatsApp<br />Messaging instan</p></TimelineItem>
          <TimelineItem era={<>2016</>} icon="music_note" active><p>TikTok<br />Video pendek & AI feed</p></TimelineItem>
        </TimelineBlock>
        <Stats>
          <Stat n={<>4,9M</>} l={<>Pengguna media sosial<br />dunia (2024)</>} />
          <Stat n={<>2,5jam</>} l={<>Rata-rata waktu<br />per hari</>} />
          <Stat n={<>6+</>} l={<>Platform aktif<br />per pengguna</>} />
        </Stats>
      </ContentSlide>

      <ContentSlide title="Dampak Positif & Negatif">
        <Cols>
          <Col title={<><I n="check_circle" /> Dampak Positif</>}><ul><li><I n="public" /> <strong>Koneksi global</strong> — komunikasi tanpa batas geografis</li><li><I n="shopping_cart" /> <strong>UMKM naik kelas</strong> — GoFood, Tokopedia, Shopee</li><li><I n="menu_book" /> <strong>Edukasi online</strong> — akses materi dari mana saja</li><li><I n="campaign" /> <strong>Gerakan sosial</strong> — #MeToo, fundraising, awareness</li></ul></Col>
          <Col title={<><I n="warning" /> Tantangan</>}><ul><li><I n="newspaper" /> <strong>Misinformasi</strong> — hoaks menyebar 6x lebih cepat</li><li><I n="sentiment_dissatisfied" /> <strong>Cyberbullying</strong> — dampak psikologis nyata</li><li><I n="schedule" /> <strong>Kecanduan</strong> — scroll tanpa henti, FOMO</li><li><I n="lock" /> <strong>Privasi data</strong> — data pribadi disalahgunakan</li></ul></Col>
        </Cols>
        <Callout title={<>Fakta Indonesia</>}>UMKM di Indonesia naik kelas lewat platform digital (GoFood, Tokopedia). Tapi hoaks juga menyebar cepat lewat WhatsApp — <strong>UU ITE</strong> hadir untuk mengatur etika digital.</Callout>
      </ContentSlide>

      <ContentSlide title="Literasi Digital">
        <Cards cols={2} tight>
          <Card icon="search" title={<>Cari & Verifikasi</>}><p>Cek fakta sebelum membagikan. Gunakan sumber terpercaya</p></Card>
          <Card icon="shield" title={<>Keamanan Digital</>}><p>Password kuat, 2FA, waspada phishing & social engineering</p></Card>
          <Card icon="balance" title={<>Etika Digital</>}><p>Hormati privasi, hindari cyberbullying, hormati hak cipta</p></Card>
          <Card icon="psychology" title={<>Berpikir Kritis</>}><p>Kenali bias algoritma, filter bubble, dan echo chamber</p></Card>
        </Cards>
        <Para tone="caption">Literasi digital bukan hanya kemampuan teknis — ini tentang <strong>berpikir kritis</strong>, <strong>melindungi diri</strong>, dan <strong>berpartisipasi secara bertanggung jawab</strong> dalam masyarakat digital.</Para>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Sebelum membagikan berita mengejutkan di grup WhatsApp, langkah pertama yang tepat adalah…</>}
        options={[<>Langsung bagikan agar yang lain waspada</>, <>Periksa sumbernya dan cari di situs cek fakta</>, <>Hapus komentar yang tidak setuju</>, <>Tambahkan tanda seru agar dipercaya</>]} answer={1}
        why={<>Cek fakta dulu. Menyebar hoaks bisa merugikan orang lain dan berisiko hukum (UU ITE).</>}
        notes="Kaitkan dengan slide Literasi Digital." />

      <ContentSlide title="Keamanan Bermedia Sosial">
        <Flow>
          <Box icon="enhanced_encryption"><p><strong>Password Kuat + 2FA</strong><br />Minimal 12 karakter, gabungan huruf+angka+simbol. Aktifkan autentikasi dua faktor</p></Box>
          <Box icon="check_circle"><p><strong>Cek Fakta Sebelum Share</strong><br />Periksa sumber, cari di situs fact-check. Jangan sebar hoaks</p></Box>
          <Box icon="phishing"><p><strong>Waspadai Phishing</strong><br />Jangan klik link mencurigakan. "Paket gagal dikirim" via WhatsApp = modus penipuan</p></Box>
          <Box icon="visibility"><p><strong>Atur Privasi Akun</strong><br />Siapa yang bisa lihat postinganmu? Review izin aplikasi secara berkala</p></Box>
        </Flow>
        <Callout title={<>Ingat</>}>Keamanan digital dimulai dari <strong>kebiasaan kecil</strong> sehari-hari. Satu klik ceroboh bisa berdampak besar.</Callout>
      </ContentSlide>

      <QuizSlide title="Post-Test: Uji Pemahaman" items={quiz} />

      <SummarySlide title="Rangkuman Pertemuan 3" points={[
        <><strong>Internet</strong> adalah jaringan global yang menghubungkan miliaran perangkat melalui protokol <strong>TCP/IP</strong> dan <strong>DNS</strong>.</>,
        <>Data di internet dikirim dalam <strong>paket-paket kecil</strong> yang dirutekan melalui berbagai jalur oleh router.</>,
        <><strong>Cloud computing</strong> memungkinkan akses sumber daya komputasi (storage, computing, real-time) tanpa infrastruktur lokal.</>,
        <>Website dibangun dari <strong>HTML</strong> (struktur), <strong>CSS</strong> (tampilan), dan <strong>JavaScript</strong> (interaksi). Basis data: <strong>SQL</strong> untuk relasional, <strong>NoSQL</strong> untuk fleksibel.</>,
        <>Media sosial punya <strong>dampak positif</strong> (koneksi, UMKM, edukasi) dan <strong>negatif</strong> (hoaks, cyberbullying, kecanduan).</>,
        <><strong>Literasi digital</strong> & <strong>keamanan bermedia sosial</strong> — berpikir kritis, cek fakta, password kuat, atur privasi.</>,
      ]} />

      <ReferencesSlide refs={[
        <>Tanenbaum, A.S. & Wetherall, D.J. (2011). <em>Computer Networks</em>. 5th ed. Pearson.</>,
        <>Forouzan, B.A. (2013). <em>Data Communications and Networking</em>. 5th ed. McGraw-Hill.</>,
        <>Connolly, T. & Begg, C. (2015). <em>Database Systems: A Practical Approach to Design, Implementation, and Management</em>. 6th ed. Pearson.</>,
        <>Boyd, D.M. & Ellison, N.B. (2007). "Social Network Sites: Definition, History, and Scholarship." <em>Journal of Computer-Mediated Communication</em>, 13(1).</>,
        <>DataReportal (2026). "Digital 2026: Indonesia." <a href="https://datareportal.com">datareportal.com</a></>,
      ]} />

      <ClosingSlide lede={<>Internet menghubungkan, website menampilkan, database menyimpan, dan media sosial menghubungkan kita semua. Memahami ekosistem ini berarti memahami dunia digital tempat kita hidup.</>} quote={<>"The Internet is becoming the town square for the global village of tomorrow."</>} cite={<>— Bill Gates</>} next="Pertemuan 4: Aplikasi & Etika Teknologi Digital di Berbagai Bidang"
        notes={"Topik pertemuan berikutnya: Aplikasi di Berbagai Bidang — Kesehatan, pendidikan, bisnis, pemerintahan; Etika & Tanggung Jawab — Penggunaan teknologi yang bertanggung jawab; e-Government — Digitalisasi layanan publik."} />

    </>
  );
}
