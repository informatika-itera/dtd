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
  Col,
  Cols,
  ContentSlide,
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
  TimelineBlock,
  TimelineItem,
} from '../layouts/blocks';
import { I } from '../ui';

const quiz: QuizItem[] = [
  { q: <>Teknologi yang memungkinkan mesin memahami bahasa manusia disebut?</>, options: [<>Computer Vision</>, <>NLP</>, <>Fuzzy Logic</>, <>Blockchain</>], answer: 1 },
  { q: <>Perbedaan utama Industry 4.0 dan 5.0 adalah?</>, options: [<>4.0 pakai internet, 5.0 tidak</>, <>5.0 mengembalikan manusia ke pusat industri</>, <>4.0 lebih canggih dari 5.0</>, <>Tidak ada perbedaan</>], answer: 1 },
  { q: <>Singkatan dari Minimum Viable Product adalah?</>, options: [<>Produk jadi sempurna</>, <>Produk minimal yang bisa diuji pasar</>, <>Prototipe tanpa fungsi</>, <>Rencana bisnis tertulis</>], answer: 1 },
  { q: <>Prinsip 3R dalam pengelolaan e-waste adalah?</>, options: [<>Read, Repair, Replace</>, <>Reduce, Reuse, Recycle</>, <>Return, Reject, Release</>, <>Reboot, Restart, Reset</>], answer: 1 },
];

const agendaItems = [
        { title: "Inovasi Digital di Indonesia", desc: "Ekosistem startup dan transformasi digital bangsa" },
        { title: "Startup & Digital Entrepreneurship", desc: "Dari ride-hailing ke fintek — perjalanan startup Indonesia" },
        { title: "Pengenalan AI & Machine Learning", desc: "Apa itu kecerdasan buatan dan bagaimana cara kerjanya" },
        { title: "AI dalam Kehidupan Sehari-hari", desc: "NLP, computer vision, dan sistem rekomendasi" },
        { title: "Industry 4.0 & 5.0", desc: "Otomatisasi, chatbot, dan masa depan manusia-mesin" },
        { title: "Sustainability & E-Waste", desc: "Tanggung jawab lingkungan di era digital" },
      ];

export default function Pertemuan06() {
  return (
    <>
      <TitleSlide meeting={6} title="Inovasi, AI & Sustainability" lede="Menjelajahi inovasi digital, kecerdasan buatan, dan keberlanjutan teknologi di Indonesia dan dunia" />

      <HookSlide title="Inovasi Selalu Punya Dua Sisi"
        notes="Pancing debat singkat: apakah AI dan startup sepadan dengan beban lingkungannya? Setiap sisi akan dibahas di agenda."
      >
        <Cols>
          <Col title={<><I n="rocket_launch" /> Yang kita dapat</>}><ul>
            <li><strong>AI</strong> menjawab, menulis, dan membuat gambar dalam hitungan detik</li>
            <li><strong>Startup</strong> mengubah cara bepergian, berbelanja, dan bertransaksi</li>
          </ul></Col>
          <Col title={<><I n="recycling" /> Yang harus dipikul</>}><ul>
            <li><strong>Sampah elektronik</strong> dari perangkat yang cepat usang</li>
            <li><strong>Energi</strong> untuk pusat data dan pelatihan model</li>
          </ul></Col>
        </Cols>
      </HookSlide>

      <AgendaSlide title="Agenda Pertemuan" items={agendaItems} />

      <SectionSlide part={1} of={4} title="Inovasi dan Startup" desc={<>Ekosistem digital Indonesia dan tahap startup</>} />

      <ContentSlide title="Inovasi Digital di Indonesia">
        <Stats>
          <Stat n={<>2.126</>} l={<>Startup Terdaftar<br />(2024)</>} />
          <Stat n={<>8</>} l={<>Unicorn & Decacorn<br />Indonesia</>} />
          <Stat n={<>77%</>} l={<>Populasi Internet<br />Aktif</>} />
          <Stat n={<>$8B+</>} l={<>Pendanaan Startup<br />2023</>} />
        </Stats>
        <Cards cols={4} tight>
          <Card icon="smartphone" title={<>GoTo</>}><p>Gojek + Tokopedia — super-app terbesar Indonesia</p></Card>
          <Card icon="shopping_bag" title={<>Bukalapak</>}><p>Marketplace yang memberdayakan UMKM lokal</p></Card>
          <Card icon="credit_card" title={<>OVO / DANA</>}><p>Fintek pembayaran digital yang mengubah transaksi harian</p></Card>
          <Card icon="account_balance" title={<>BCA Digital</>}><p>Transformasi perbankan konvensional ke digital</p></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Startup & Digital Entrepreneurship">
        <TimelineBlock>
          <TimelineItem era={<>Ideation</>} icon="lightbulb"><p>Identifikasi masalah nyata di masyarakat</p></TimelineItem>
          <TimelineItem era={<>MVP</>} icon="construction"><p>Minimum Viable Product — uji pasar cepat</p></TimelineItem>
          <TimelineItem era={<>Product-Market Fit</>} icon="trending_up" active><p>Menemukan pasar yang cocok & skala</p></TimelineItem>
          <TimelineItem era={<>Funding</>} icon="payments"><p>Angel → Series A → B → C → IPO</p></TimelineItem>
          <TimelineItem era={<>Scale-up</>} icon="public"><p>Ekspansi regional & diversifikasi produk</p></TimelineItem>
        </TimelineBlock>
        <Cols>
          <Col title={<>Peluang di Indonesia</>}><ul><li>Populasi 270 juta — pasar digital terbesar di ASEAN</li><li>Adopsi smartphone tinggi di semua kalangan</li><li>Kebutuhan solusi untuk UMKM dan pertanian</li></ul></Col>
          <Col title={<>Tantangan</>}><ul><li>Kesenjangan infrastruktur internet daerah</li><li>Regulasi yang terus berkembang</li><li>Ketersediaan talenta digital yang terbatas</li></ul></Col>
        </Cols>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Tahap ketika startup menemukan pasar yang cocok dan siap berkembang disebut…</>}
        options={[<>Ideation</>, <>Product-Market Fit</>, <>Series A</>, <>IPO</>]} answer={1}
        why={<><strong>Product-Market Fit</strong>: produk benar-benar dibutuhkan pasar sehingga bisa diskalakan.</>}
        notes="Minta contoh startup yang sudah mencapai tahap ini." />

      <SectionSlide part={2} of={4} title="Kecerdasan Buatan" desc={<>AI, machine learning, dan cabang utamanya</>}
        notes="Startup Indonesia tumbuh pesat. Tapi apa mesin penggerak di baliknya? Kecerdasan buatan — yang membuat aplikasi lebih pintar dan layanan lebih personal. [Startup → AI → Inovasi] Mari kita kenali lebih dalam: apa itu AI dan bagaimana cara kerjanya?" />

      <SplitSlide title="Pengenalan AI & Machine Learning"
        left={<>
          <Para><strong>Artificial Intelligence (AI)</strong> adalah bidang ilmu komputer yang membuat mesin dapat meniru kecerdasan manusia — belajar, bernalar, dan mengambil keputusan.</Para>
          <Para><strong>Machine Learning (ML)</strong> adalah subset di mana sistem belajar dari data tanpa diprogram secara eksplisit.</Para>
          <QuoteBlock cite={<>— John McCarthy, Bapak AI (1956)</>}>"AI adalah ilmu dan teknik membuat mesin cerdas."</QuoteBlock>
          <Tags><Tag>Supervised Learning</Tag><Tag>Unsupervised Learning</Tag><Tag>Reinforcement Learning</Tag><Tag>Deep Learning</Tag></Tags>
        </>}
        right={<>
          <Figure src="images/ai-machine-learning.jpg" alt="Kecerdasan Buatan dan Machine Learning" />
        </>} />

      <ContentSlide title="AI dalam Kehidupan Sehari-hari">
        <Cards cols={3} tight>
          <Card icon="record_voice_over" title={<>Natural Language Processing</>}><p>Asisten virtual (Siri, Google Assistant), terjemahan bahasa (Google Translate), analisis sentimen media sosial</p></Card>
          <Card icon="visibility" title={<>Computer Vision</>}><p>Pengenalan wajah (Face ID), deteksi objek pada mobil otonom, diagnosis medis dari citra X-ray</p></Card>
          <Card icon="target" title={<>Sistem Rekomendasi</>}><p>Netflix & YouTube menonton, Spotify mendengarkan, Tokopedia & Shopee belanja — semua dipersonalisasi AI</p></Card>
        </Cards>
        <Flow>
          <Box title={<>Input Data</>}><p>Teks, gambar, suara, klik</p></Box>
          <Arrow glyph="→" />
          <Box title={<>Model AI</>} primary><p>Training & prediksi</p></Box>
          <Arrow glyph="→" />
          <Box title={<>Output</>}><p>Terjemahan, label, rekomendasi</p></Box>
        </Flow>
      </ContentSlide>

      <ContentSlide title="Cabang Utama AI (1/2)">
        <Cards cols={3} tight>
          <Card icon="psychology" title={<>Expert Systems</>}><p>Sistem pakar meniru keputusan ahli manusia — digunakan di diagnosa medis dan perencanaan keuangan</p></Card>
          <Card icon="record_voice_over" title={<>NLP</>}><p>Natural Language Processing — memahami dan menghasilkan bahasa manusia: chatbot, terjemahan, ringkasan otomatis</p></Card>
          <Card icon="visibility" title={<>Computer Vision</>}><p>Menganalisis gambar dan video — deteksi wajah, pengenalan objek, autonomous driving</p></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Cabang Utama AI (2/2)">
        <Cards cols={3}>
          <Card icon="smart_toy" title={<>Robotika</>}><p>Robot fisik yang berinteraksi dengan lingkungan — manufaktur, eksplorasi, pelayanan</p></Card>
          <Card icon="casino" title={<>Fuzzy Logic</>}><p>Logika kabur untuk keputusan dalam ketidakpastian — AC otomatis, kontrol kamera</p></Card>
          <Card icon="genetics" title={<>Genetic Algorithms</>}><p>Inspirasi evolusi untuk optimasi — penjadwalan, routing jaringan, desain produk</p></Card>
        </Cards>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Ponsel dibuka dengan mengenali wajah pemiliknya. Cabang AI yang dipakai adalah…</>}
        options={[<>NLP</>, <>Computer Vision</>, <>Robotika</>, <>Fuzzy Logic</>]} answer={1}
        why={<><strong>Computer Vision</strong> menganalisis gambar dan video, termasuk pengenalan wajah.</>}
        notes="Cabang lain: NLP untuk bahasa, robotika untuk aksi fisik." />

      <SectionSlide part={3} of={4} title="Industri dan Automasi" desc={<>Industry 4.0 dan 5.0, chatbot, dan AI untuk mahasiswa</>}
        notes="Cabang-cabang AI ini — NLP, computer vision, robotika — tidak berjalan sendiri. Ketika digabungkan, mereka mengubah cara pabrik dan industri bekerja. [Cabang AI → Industri → Industry 4.0 & 5.0] Mari kita lihat dua babak revolusi industri yang digerakkan AI." />

      <SplitSlide title="Industry 4.0 & 5.0"
        left={<>
          <Steps>
            <Step n={4} title={<>Industry 4.0</>}><>Otomatisasi & IoT — mesin terhubung, data real-time, smart factory. Fokus: <strong>efisiensi dan produktivitas</strong>.</></Step>
            <Step n={5} title={<>Industry 5.0</>}><>Kolaborasi manusia-mesin — robot cobot, personalisasi massal. Fokus: <strong>keberlanjutan dan human-centric</strong>.</></Step>
          </Steps>
          <QuoteBlock cite={<>— Komisi Eropa, 2021</>}>"Industry 5.0 mengembalikan manusia ke pusat revolusi industri."</QuoteBlock>
        </>}
        right={<>
          <Figure src="images/industry-4.jpg" alt="Industry 4.0 dan 5.0" />
        </>} />

      <ContentSlide title="Chatbot & Automasi">
        <Cols>
          <Col title={<>Jenis Chatbot</>}><Steps>
  <Step n="A" title={<>Rule-Based</>}><>Mengikuti aturan if-then — terbatas tapi mudah dibangun</></Step>
  <Step n="B" title={<>AI-Powered (LLM)</>}><>Memahami konteks dan bahasa alami — seperti ChatGPT, Gemini</></Step>
  <Step n="C" title={<>Hybrid</>}><>Kombinasi aturan + AI — paling umum di industri</></Step>
</Steps></Col>
          <Col title={<>Contoh Automasi AI</>}><Cards cols={2}>
  <Card title={<><I n="mail" /> Email Otomatis</>}><p>Klasifikasi & balasan pintar — Gmail Smart Reply</p></Card>
  <Card title={<><I n="bar_chart" /> Analisis Data</>}><p>Dashboard real-time & deteksi anomali otomatis</p></Card>
  <Card title={<><I n="build" /> Customer Service</>}><p>Chatbot 24/7 menangani 80% pertanyaan rutin</p></Card>
</Cards></Col>
        </Cols>
      </ContentSlide>

      <ContentSlide title="AI untuk Mahasiswa: Gunakan dengan Baik">
        <Callout title={<>Prinsip Dasar</>}>AI adalah <strong>alat bantu belajar</strong>, bukan pengganti proses berpikirmu. Gunakan untuk memahami, bukan untuk menyalin.</Callout>
        <Bullets><li><strong>Pahami, jangan menyalin</strong> — baca dan pahami jawaban AI, jangan copy-paste mentah.</li><li><strong>Verifikasi fakta</strong> — AI bisa "halusinasi"; selalu cek ke sumber tepercaya.</li><li><strong>Jaga integritas akademik</strong> — kutip & parafrase dengan benar, hindari plagiarisme.</li><li><strong>Lindungi data pribadi</strong> — jangan masukkan data sensitif ke AI publik.</li><li><strong>Ikuti aturan kampus</strong> — perhatikan kebijakan penggunaan AI dalam tugas.</li></Bullets>
      </ContentSlide>

      <ContentSlide title="Memaksimalkan AI: Akademik & Non-Akademik">
        <Cards cols={2}>
          <Card icon="school" title={<>Akademik</>}><p>Riset & literatur: mencari referensi, meringkas jurnal</p><p>Memahami materi sulit: meminta penjelasan bertahap</p><p>Latihan soal & pembahasan untuk persiapan ujian</p></Card>
          <Card icon="rocket_launch" title={<>Non-Akademik</>}><p>Organisasi: menyusun proposal, laporan, poster</p><p>Lomba & kompetisi: ide, pitch deck, prototipe</p><p>Portofolio & konten: desain, tulisan, video</p></Card>
        </Cards>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Chatbot yang hanya menjawab berdasarkan aturan <em>if-then</em> tetap termasuk jenis…</>}
        options={[<>Rule-Based</>, <>AI-Powered (LLM)</>, <>Hybrid</>, <>Autonomous</>]} answer={0}
        why={<><strong>Rule-based</strong> mengikuti aturan tetap: mudah dibangun tetapi terbatas. LLM memahami bahasa alami.</>}
        notes="Minta contoh chatbot yang pernah mereka pakai." />

      <SectionSlide part={4} of={4} title="Sustainability dan E-Waste" desc={<>Inovasi yang bertanggung jawab pada lingkungan</>}
        notes="AI dan automasi membuat segalanya lebih cepat dan efisien. Namun semakin banyak perangkat, semakin besar limbah elektroniknya. [Automasi → Perangkat → E-Waste] Inovasi harus berjalan beriringan dengan keberlanjutan." />

      <ContentSlide title="Sustainability & E-Waste">
        <Stats>
          <Stat n={<>62M</>} l={<>Ton e-waste global<br />per tahun (2024)</>} />
          <Stat n={<>22%</>} l={<>E-waste yang<br />didaur ulang</>} />
          <Stat n={<>3-5 th</>} l={<>Rata-rata siklus<br />ganti smartphone</>} />
        </Stats>
        <Cards cols={3} tight>
          <Card icon="recycling" title={<>Reduce</>}><p>Kurangi konsumsi gadget — gunakan perangkat lebih lama, pilih perangkat yang bisa diperbaiki</p></Card>
          <Card icon="sync" title={<>Reuse</>}><p>Donasikan atau refurbish perangkat lama — program hand-me-down untuk sekolah</p></Card>
          <Card icon="build" title={<>Recycle</>}><p>Daur ulang komponen elektronik — logam berharga seperti emas, tembaga, lithium</p></Card>
        </Cards>
      </ContentSlide>

      <QuizSlide title="Post-Test: Uji Pemahaman" items={quiz} />

      <SummarySlide title="Rangkuman Pertemuan 6" points={[
        <>Indonesia memiliki ekosistem startup yang kuat dengan <strong>8 unicorn/decacorn</strong> dan lebih dari 2.000 startup terdaftar.</>,
        <><strong>AI & ML</strong> adalah teknologi yang membuat mesin belajar dari data — diterapkan di NLP, computer vision, dan sistem rekomendasi.</>,
        <><strong>Industry 5.0</strong> menggeser fokus dari otomatisasi penuh ke kolaborasi manusia-mesin yang human-centric.</>,
        <><strong>Chatbot & automasi</strong> berbasis AI meningkatkan efisiensi layanan pelanggan dan operasional bisnis.</>,
        <>Kita bertanggung jawab atas <strong>sustainability</strong> — terapkan prinsip 3R (Reduce, Reuse, Recycle) untuk e-waste.</>,
      ]} />

      <ReferencesSlide refs={[
        <>Russell, S. & Norvig, P. (2021). <em>Artificial Intelligence: A Modern Approach</em>. 4th ed. Pearson.</>,
        <>McCarthy, J. (1956). "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence."</>,
        <>European Commission (2021). <em>Industry 5.0: Towards a Sustainable, Human-centric and Resilient European Industry</em>.</>,
        <>Google, Temasek, & Bain & Company (2024). <em>e-Conomy SEA 2024: Indonesia</em>.</>,
        <>Baldé, C.P., et al. (2024). <em>The Global E-waste Monitor 2024</em>. UNITAR / ITU.</>,
        <>Startup Ranking (2024). <em>Startup Ecosystem Indonesia</em>.</>,
      ]} />

      <ClosingSlide lede={<>Teknologi tanpa keberlanjutan hanya menunda masalah. Inovasi sejati membangun masa depan yang cerdas sekaligus bertanggung jawab.</>} quote={<>"The best way to predict the future is to invent it."</>} cite={<>— Alan Kay</>} next="Pertemuan 7: Review UTS"
        notes={"Topik pertemuan berikutnya: Sistem Bilangan & Logika — Biner, konversi, dan gerbang logika; Internet & Web — Jaringan, website, dan basis data; Keamanan & Etika Digital — Cybersecurity dan tanggung jawab digital."} />

    </>
  );
}
