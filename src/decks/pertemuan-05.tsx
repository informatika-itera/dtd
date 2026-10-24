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
  Bullets,
  Callout,
  Card,
  Cards,
  ContentSlide,
  DataTable,
  Figure,
  Flow,
  Para,
  QuoteBlock,
  SplitSlide,
  Stat,
  Stats,
  Step,
  Steps,
  Tag,
  Tags,
} from '../layouts/blocks';

const quiz: QuizItem[] = [
  { q: <>Data yang sudah diolah dan diberi konteks sehingga bermakna disebut?</>, options: [<>Data mentah</>, <>Informasi</>, <>Big Data</>, <>Malware</>], answer: 1 },
  { q: <>Karakteristik utama Big Data yang mengacu pada beragamnya jenis data disebut?</>, options: [<>Volume</>, <>Velocity</>, <>Variety</>, <>Veracity</>], answer: 2 },
  { q: <>Malware yang mengenkripsi file korban dan meminta tebusan adalah?</>, options: [<>Virus</>, <>Worm</>, <>Spyware</>, <>Ransomware</>], answer: 3 },
  { q: <>Teknik manipulasi psikologis untuk mengeksploitasi manusia disebut?</>, options: [<>Phishing</>, <>Social Engineering</>, <>Cyberbullying</>, <>Ransomware</>], answer: 1 },
];

const agendaItems = [
        { title: "Data, Informasi & Pengetahuan", desc: "Definisi, perbedaan, dan hierarki DIKW" },
        { title: "Format & Ukuran Data Digital", desc: "Teks, gambar, audio, video beserta satuan penyimpanan" },
        { title: "Big Data & Analytics", desc: "Volume, Velocity, Variety — mengapa data besar penting" },
        { title: "Keamanan Siber", desc: "Malware, phishing, social engineering, 2FA, dan backup" },
        { title: "Post-Test & Rangkuman", desc: "Uji pemahaman dan poin-poin penting" },
      ];

export default function Pertemuan05() {
  return (
    <>
      <TitleSlide meeting={5} title="Data & Informasi di Era Digital" lede="Memahami perbedaan data, informasi, dan pengetahuan — serta mengamankan diri di dunia digital yang saling terhubung" />

      <HookSlide title="Satu Angka yang Sulit Dibayangkan"
        notes="Biarkan angka tampil dulu, lalu tanyakan: siapa yang memiliki data ini dan siapa yang melindunginya? Angka berasal dari rujukan deck lama; verifikasi ulang sebelum dikutip di luar kelas."
        source="IBM (2024), Cisco (2023)"
      >
        <Stats><Stat n={<>2,5 kuintiliun</>} l={<>byte data dibuat setiap hari di dunia</>} /></Stats>
        <Callout title={<>Pertanyaan pemantik</>}>Dari mana data itu datang, siapa yang menyimpannya, dan bagaimana kita melindunginya?</Callout>
      </HookSlide>

      <AgendaSlide title="Agenda Pertemuan" items={agendaItems} />

      <SectionSlide part={1} of={3} title="Data, Informasi, dan Big Data" desc={<>Hierarki data, satuan, dan 3V</>} />

      <ContentSlide title="Data → Informasi → Pengetahuan">
        <Callout title={<>Data</>}>Fakta mentah, belum memiliki konteks atau makna. Contoh: angka "36.5", teks "Bandung".</Callout>
        <Callout title={<>Informasi</>}>Data yang sudah diolah dan diberi <strong>konteks</strong> sehingga bermakna. Contoh: "Suhu tubuh pasien A adalah 36.5°C".</Callout>
        <Callout title={<>Pengetahuan (Knowledge)</>}>Informasi yang dipahami, dikombinasikan dengan <strong>pengalaman</strong>, dan bisa digunakan untuk pengambilan keputusan.</Callout>
        <Flow>
          <Box title={<>Data</>}><p>Fakta mentah & angka</p></Box>
          <Arrow glyph="→" />
          <Box title={<>Informasi</>}><p>Data + konteks = makna</p></Box>
          <Arrow glyph="→" />
          <Box title={<>Pengetahuan</>} primary><p>Informasi + pengalaman = keputusan</p></Box>
        </Flow>
      </ContentSlide>

      <ContentSlide title="Format & Ukuran Data Digital">
        <DataTable><thead><tr><th>Jenis</th><th>Format Umum</th><th>Contoh Ukuran</th><th>Satuan</th></tr></thead><tbody><tr><td>Teks</td><td><code>.txt, .pdf, .docx</code></td><td>1 halaman ≈ 2 KB</td><td>Byte (B)</td></tr><tr><td>Gambar</td><td><code>.jpg, .png, .webp</code></td><td>1 foto HP ≈ 3–5 MB</td><td>Megabyte (MB)</td></tr><tr><td>Audio</td><td><code>.mp3, .wav, .flac</code></td><td>1 lagu MP3 ≈ 4 MB</td><td>Megabyte (MB)</td></tr><tr><td>Video</td><td><code>.mp4, .mkv, .webm</code></td><td>1 film HD ≈ 4 GB</td><td>Gigabyte (GB)</td></tr></tbody></DataTable>
        <Callout title={<>Hierarki Penyimpanan</>}>1 Byte → 1 KB (1.024 B) → 1 MB (1.024 KB) → 1 GB (1.024 MB) → 1 TB (1.024 GB) → 1 PB (1.024 TB)</Callout>
      </ContentSlide>

      <SplitSlide title="Big Data & Analytics"
        left={<>
          <Para>Big Data adalah kumpulan data yang <strong>terlalu besar</strong> untuk diolah oleh aplikasi database tradisional. Karakteristik utamanya dikenal sebagai <strong>3V</strong>:</Para>
          <Callout title={<>Volume</>}>Skala data sangat besar — petabyte hingga exabyte. Contoh: 500+ juta tweet per hari.</Callout>
          <Callout title={<>Velocity</>}>Kecepatan data masuk dan harus diproses secara <strong>real-time</strong> atau near real-time.</Callout>
          <Callout title={<>Variety</>}>Beragam jenis data: terstruktur (tabel), semi-terstruktur (JSON/XML), dan tidak terstruktur (teks, gambar, video).</Callout>
          <Para tone="caption">Data analytics membantu organisasi mengambil keputusan berbasis bukti — <strong>Machine Learning</strong>, <strong>Data Mining</strong>, <strong>Predictive Analytics</strong>, dan <strong>Business Intelligence</strong>.</Para>
        </>}
        right={<>
          <Figure src="images/big-data.jpg" alt="Big Data dan Analytics" />
        </>} />

      <QuickCheckSlide
        q={<>Sensor lalu lintas mengirim data setiap detik dan harus langsung diproses. Karakter Big Data yang dimaksud adalah…</>}
        options={[<>Volume</>, <>Velocity</>, <>Variety</>, <>Validity</>]} answer={1}
        why={<><strong>Velocity</strong> menekankan kecepatan data masuk yang perlu diproses secara real-time.</>}
        notes="Minta contoh untuk Volume dan Variety." />

      <SectionSlide part={2} of={3} title="Keamanan Siber" desc={<>Mengapa penting, malware, phishing, dan hoax</>}
        notes="Kita sudah melihat betapa berharganya data — dan betapa banyak yang beredar. Pertanyaannya: bagaimana melindunginya dari orang yang ingin menyalahgunakan? [Data → Bernilai → Keamanan] Data yang berharga menarik perhatian penyerang — karena itu keamanan siber jadi penting." />

      <ContentSlide title="Mengapa Keamanan Siber Penting?">
        <Cards cols={3} tight>
          <Card icon="payments" title={<>Kerugian Finansial</>}><p>Serangan siber global merugikan <strong>$8 triliun</strong> pada 2023 — setara dengan PDB ketiga terbesar dunia.</p></Card>
          <Card icon="enhanced_encryption" title={<>Privasi & Data Pribadi</>}><p>Kebocoran data pribadi dapat disalahgunakan untuk <strong>identitas palsu</strong>, penipuan, dan pemerasan.</p></Card>
          <Card icon="apartment" title={<>Bisnis & Infrastruktur</>}><p>Serangan ke rumah sakit, bank, atau PLN dapat <strong>mengancam nyawa</strong> dan melumpuhkan layanan publik.</p></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Jenis-Jenis Malware">
        <Cards cols={5} tight>
          <Card icon="coronavirus" title={<>Virus</>}><p>Menempel pada file, menyebar saat file dieksekusi. Dapat merusak data dan menggandakan diri.</p></Card>
          <Card icon="pest_control" title={<>Worm</>}><p>Menyebar <strong>otomatis</strong> melalui jaringan tanpa perlu file inang atau interaksi pengguna.</p></Card>
          <Card icon="bug_report" title={<>Trojan</>}><p>Menyamar sebagai software sah. Setelah diinstal, membuka <strong>backdoor</strong> untuk penyerang.</p></Card>
          <Card icon="lock" title={<>Ransomware</>}><p><strong>Mengenkripsi</strong> file korban dan meminta tebusan (biasanya dalam Bitcoin) untuk mendekripsinya.</p></Card>
          <Card icon="visibility" title={<>Spyware</>}><p>Mengintai aktivitas pengguna secara <strong>diam-diam</strong>: keystroke, browsing, hingga kredensial login.</p></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Phishing, Hoax & Cyberbullying">
        <Cards cols={3} tight>
          <Card icon="phishing" title={<>Phishing</>}><p>Penipuan via email/chat yang menyamar sebagai pihak sah untuk mencuri <strong>kata sandi</strong> atau data kartu kredit.</p><Tags><Tag>Cek URL</Tag><Tag>Jangan klik sembarangan</Tag></Tags></Card>
          <Card icon="newspaper" title={<>Hoax & Disinformasi</>}><p>Berita palsu yang sengaja disebarluaskan untuk <strong>menyesatkan</strong>, memicu kepanikan, atau keuntungan politik.</p><Tags><Tag>Verifikasi sumber</Tag><Tag>Fact-check</Tag></Tags></Card>
          <Card icon="sentiment_dissatisfied" title={<>Cyberbullying</>}><p>Perundungan digital melalui media sosial, chat, atau game. Dampaknya serius terhadap <strong>kesehatan mental</strong> korban.</p><Tags><Tag>Blokir & Laporkan</Tag><Tag>Dokumentasikan bukti</Tag></Tags></Card>
        </Cards>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Berkas gratis yang ternyata membuka <em>backdoor</em> bagi penyerang setelah diinstal disebut…</>}
        options={[<>Worm</>, <>Spyware</>, <>Trojan</>, <>Virus</>]} answer={2}
        why={<><strong>Trojan</strong> menyamar sebagai software sah, lalu membuka backdoor bagi penyerang.</>}
        notes="Bedakan dengan worm yang menyebar sendiri." />

      <SectionSlide part={3} of={3} title="Social Engineering dan Perlindungan" desc={<>Mengenali manipulasi, 2FA, dan backup 3-2-1</>} />

      <SplitSlide title="Social Engineering"
        left={<>
          <Para>Social engineering adalah teknik manipulasi <strong>psikologis</strong> yang mengeksploitasi kepercayaan, ketakutan, atau kelalaian manusia — bukan kelemahan teknis.</Para>
          <Steps>
            <Step n={1} title={<>Pretexting</>}><>Penyerang membuat skenario palsu (misalnya: "dari bank") untuk mendapatkan informasi rahasia.</></Step>
            <Step n={2} title={<>Baiting</>}><>Menarik korban dengan "umpan" — USB gratis berisi malware, atau link download film bajakan.</></Step>
            <Step n={3} title={<>Tailgating</>}><>Menyusup masuk gedung di belakang karyawan sah yang baru membuka pintu (serangan fisik).</></Step>
          </Steps>
          <QuoteBlock cite={<>— Kevin Mitnick</>}>"Manusia adalah rantai keamanan yang paling lemah."</QuoteBlock>
        </>}
        right={<>
          <Figure src="images/cybersecurity.jpg" alt="Social Engineering" />
        </>} />

      <ContentSlide title="Menghindari Social Engineering">
        <Callout title={<>Contoh Nyata</>}>Kamu ditelepon "IT kampus" yang meminta <strong>password SIAKAD</strong> untuk "verifikasi data mahasiswa". Padahal IT kampus <strong>tidak pernah</strong> meminta password lewat telepon — itu pretexting.</Callout>
        <Bullets><li><strong>Verifikasi identitas</strong> — telepon balik nomor resmi atau hubungi pihak terkait.</li><li><strong>Jangan berikan OTP, PIN, atau password</strong> — institusi resmi tidak pernah memintanya.</li><li><strong>Waspadai rasa urgensi</strong> — "segera, atau akun diblokir" adalah trik tekanan.</li><li><strong>Jangan klik link mencurigakan</strong> — ketik sendiri alamat situs di browser.</li><li><strong>Tolak USB / attachment tak dikenal</strong> — itu "umpan" (baiting).</li></Bullets>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Seseorang mengaku dari bank dan meminta kode OTP-mu agar “akun tidak diblokir”. Tindakan yang tepat?</>}
        options={[<>Berikan kodenya agar akun aman</>, <>Tutup telepon, jangan beri OTP, hubungi nomor resmi bank</>, <>Minta dia mengirim email dulu</>, <>Berikan sebagian kode saja</>]} answer={1}
        why={<>Institusi resmi <strong>tidak pernah</strong> meminta OTP, PIN, atau password. Verifikasi lewat saluran resmi.</>}
        notes="Contoh nyata social engineering (pretexting)." />

      <ContentSlide title="Two-Factor Authentication (2FA)">
        <Flow>
          <Box icon="key" title={<>Something You Know</>}><p>Password, PIN, atau pertanyaan keamanan</p></Box>
          <Arrow glyph="＋" />
          <Box icon="smartphone" title={<>Something You Have</>}><p>HP (SMS/Authenticator App), token hardware, atau kartu</p></Box>
          <Arrow glyph="＝" />
          <Box icon="shield" title={<>2FA Aktif</>} primary><p>Dua faktor = jauh lebih aman. Password bocor pun akun tetap terlindungi.</p></Box>
        </Flow>
        <Callout title={<>Rekomendasi</>}>Gunakan <strong>aplikasi authenticator</strong> (Google Authenticator, Authy) lebih aman dari SMS karena tidak bisa dicegat via SIM-swap. Aktifkan 2FA di akun email, media sosial, dan perbankan.</Callout>
      </ContentSlide>

      <ContentSlide title="Aturan Backup 3-2-1">
        <Flow>
          <Box title={<>3 Salinan</>} primary><p>Simpan minimal <strong>3 salinan</strong> data Anda (1 utama + 2 cadangan)</p></Box>
          <Arrow glyph="→" />
          <Box title={<>2 Media Berbeda</>}><p>Gunakan <strong>2 jenis media</strong> penyimpanan berbeda (misalnya HDD + cloud)</p></Box>
          <Arrow glyph="→" />
          <Box title={<>1 Offsite</>}><p>Simpan <strong>1 salinan di luar lokasi</strong> utama (cloud storage atau server remote)</p></Box>
        </Flow>
        <Cards cols={3} tight>
          <Card icon="save" title={<>External HDD/SSD</>}><p>Backup lokal yang cepat. Cocok untuk file besar. Simpan di tempat aman.</p></Card>
          <Card icon="cloud" title={<>Cloud Storage</>}><p>Google Drive, OneDrive, Dropbox — otomatis, akses dari mana saja, terenkripsi.</p></Card>
          <Card icon="sync" title={<>Jadwal Rutin</>}><p>Atur backup otomatis harian/mingguan. <strong>Test restore</strong> sesekali untuk memastikan backup berfungsi.</p></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Tips Mahasiswa: Lindungi Datamu">
        <Cards cols={2}>
          <Card icon="lock" title={<>Data Pribadi</>}><p>Gunakan <strong>password kuat & unik</strong> untuk setiap akun.</p><p>Aktifkan <strong>2FA</strong> pada email & media sosial.</p><p>Batasi info pribadi (alamat, tanggal lahir) di media sosial.</p></Card>
          <Card icon="school" title={<>Data Akademik</>}><p>Jangan bagikan <strong>password SIAKAD / e-learning</strong> ke siapa pun.</p><p><strong>Backup</strong> tugas & skripsi dengan aturan 3-2-1.</p><p>Hati-hati <strong>WiFi publik</strong>; selalu <strong>log out</strong> di komputer bersama.</p></Card>
        </Cards>
      </ContentSlide>

      <QuizSlide title="Post-Test: Uji Pemahaman" items={quiz} />

      <SummarySlide title="Rangkuman Pertemuan 5" points={[
        <><strong>Data</strong> adalah fakta mentah, <strong>informasi</strong> adalah data berkonteks, dan <strong>pengetahuan</strong> adalah informasi yang dipahami untuk pengambilan keputusan.</>,
        <>Data digital hadir dalam berbagai format (teks, gambar, audio, video) dengan satuan penyimpanan dari <strong>Byte hingga Petabyte</strong>.</>,
        <><strong>Big Data</strong> (3V: Volume, Velocity, Variety) memungkinkan analitik canggih untuk pengambilan keputusan berbasis bukti.</>,
        <>Ancaman siber mencakup <strong>malware</strong> (virus, worm, trojan, ransomware, spyware), <strong>phishing</strong>, <strong>hoax</strong>, <strong>cyberbullying</strong>, dan <strong>social engineering</strong>.</>,
        <>Lindungi diri dengan <strong>2FA</strong>, aturan backup <strong>3-2-1</strong>, dan kebiasaan keamanan digital yang baik.</>,
      ]} />

      <ReferencesSlide refs={[
        <>Rowley, J. (2007). "The wisdom hierarchy: representations of the DIKW hierarchy." <em>Journal of Information Science</em>, 33(2), 163–180.</>,
        <>Zikopoulos, P. & Eaton, C. (2011). <em>Understanding Big Data: Analytics for Enterprise Class Hadoop and Streaming Data</em>. McGraw-Hill.</>,
        <>Stallings, W. (2020). <em>Cryptography and Network Security: Principles and Practice</em>. 8th ed. Pearson.</>,
        <>Mitnick, K. & Simon, W. (2002). <em>The Art of Deception: Controlling the Human Element of Security</em>. Wiley.</>,
        <>Cisco (2023). "Cybersecurity Threat Trends: Phishing, Ransomware, and Social Engineering." <em>cisco.com</em></>,
        <>DataReportal (2026). "Digital 2026: Indonesia." <em>datareportal.com/reports/digital-2026-indonesia</em></>,
        <>IBM (2024). "Cost of a Data Breach Report 2024." <em>ibm.com</em></>,
      ]} />

      <ClosingSlide lede={<>Data adalah aset paling berharga di era digital — pahami, kelola, dan lindungi dengan bijak.</>} quote={<>"Data is the new oil."</>} cite={<>— Clive Humby</>} next="Pertemuan 6: Inovasi, AI & Sustainability"
        notes={"Topik pertemuan berikutnya: Inovasi & Startup Digital — Ekonomi digital dan kewirausahaan; AI & Machine Learning — Cara kerja dan aplikasi AI sehari-hari; Industry 4.0 & Sustainability — Teknologi cerdas dan e-waste."} />

    </>
  );
}
