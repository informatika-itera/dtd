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
  Col,
  Cols,
  ContentSlide,
  DataTable,
  Figure,
  Para,
  QuoteBlock,
  SplitSlide,
  Step,
  Steps,
  Tag,
  Tags,
} from '../layouts/blocks';
import { I } from '../ui';

const quiz: QuizItem[] = [
  { q: <>Platform yang digunakan untuk mengelola perkuliahan secara daring disebut?</>, options: [<>E-Commerce</>, <>LMS (Learning Management System)</>, <>CMS</>, <>ERP</>], answer: 1 },
  { q: <>Contoh layanan e-government di Indonesia adalah?</>, options: [<>Tokopedia</>, <>Gojek</>, <>e-Filing DJP Online</>, <>Netflix</>], answer: 2 },
  { q: <>Teknologi yang memungkinkan konsultasi dokter dari rumah disebut?</>, options: [<>Blockchain</>, <>IoT</>, <>Telemedicine</>, <>Cloud Computing</>], answer: 2 },
  { q: <>Tindakan yang TIDAK sesuai dengan etika digital adalah?</>, options: [<>Mengecek kebenaran berita sebelum membagikan</>, <>Mencantumkan sumber saat mengutip</>, <>Menyebarkan foto orang lain tanpa izin</>, <>Menggunakan password yang kuat</>], answer: 2 },
];

const agendaItems = [
        { title: "Teknologi dalam Pendidikan", desc: "E-learning, LMS, dan transformasi digital kampus" },
        { title: "E-Government & E-Commerce", desc: "Layanan digital pemerintah dan bisnis online" },
        { title: "Teknologi di Berbagai Bidang", desc: "Kesehatan, pertanian, dan transportasi" },
        { title: "Etika & Tanggung Jawab Digital", desc: "Hak, kewajiban, dan studi kasus etika" },
      ];

export default function Pertemuan04() {
  return (
    <>
      <TitleSlide meeting={4} title="Aplikasi & Etika Teknologi Digital" lede="Menjelajahi berbagai aplikasi teknologi digital dalam kehidupan sehari-hari dan memahami etika serta tanggung jawab penggunaannya" />

      <HookSlide title="Urusan yang Dulu Antre, Kini Daring"
        notes="Tanyakan layanan apa yang terakhir kali mereka urus tanpa datang langsung. Arahkan ke agenda: pendidikan, pemerintahan, kesehatan, lalu etikanya."
      >
        <DataTable><thead><tr><th>Urusan</th><th>Dulu</th><th>Kini</th></tr></thead><tbody>
          <tr><td><strong>Kuliah</strong></td><td>Hadir di ruang kelas</td><td>Zoom, LMS, dan kelas daring</td></tr>
          <tr><td><strong>Pajak</strong></td><td>Antre di kantor pajak</td><td>e-Filing dari rumah</td></tr>
          <tr><td><strong>Berkas kependudukan</strong></td><td>Datang ke kantor dukcapil</td><td>Dukcapil Online</td></tr>
          <tr><td><strong>Konsultasi dokter</strong></td><td>Datang ke klinik</td><td>Telemedicine</td></tr>
        </tbody></DataTable>
        <Para tone="highlight">Apa yang kita dapat — dan apa yang perlu kita jaga?</Para>
      </HookSlide>

      <AgendaSlide title="Agenda Pertemuan" items={agendaItems} />

      <SectionSlide part={1} of={4} title="Aplikasi Teknologi Digital" desc={<>Pendidikan, pemerintahan, perdagangan, dan berbagai bidang</>} />

      <SplitSlide title="Teknologi dalam Pendidikan"
        left={<>
          <Callout title={<>Transformasi Pembelajaran</>}>Teknologi digital mengubah cara kita belajar — dari ruang kelas fisik ke lingkungan <strong>hybrid</strong> yang fleksibel dan aksesibel bagi semua.</Callout>
          <Cols>
            <Col title={<>Platform & Tools</>}><ul><li>LMS (Moodle, Google Classroom)</li><li>Video conference (Zoom, Meet)</li><li>MOOC (Coursera, edX)</li><li>Adaptive learning & AI tutor</li></ul></Col>
            <Col title={<>Manfaat Utama</>}><ul><li>Akses tanpa batas geografis</li><li>Personalisasi kecepatan belajar</li><li>Kolaborasi global real-time</li><li>Materi multimedia interaktif</li></ul></Col>
          </Cols>
        </>}
        right={<>
          <Figure src="images/education-technology.jpg" alt="Teknologi dalam Pendidikan" />
        </>} />

      <ContentSlide title="E-Government & E-Commerce">
        <Cards cols={2}>
          <Card icon="account_balance" title={<>E-Government</>}><p>Pelayanan publik berbasis digital untuk efisiensi dan transparansi.</p>          <DataTable><thead><tr><th>Layanan</th><th>Contoh</th></tr></thead><tbody><tr><td>Administrasi</td><td>Dukcapil Online, SSO</td></tr><tr><td>Perpajakan</td><td>e-Filing DJP Online</td></tr><tr><td>Pengadaan</td><td>LPSE / e-Procurement</td></tr><tr><td>Pelayanan</td><td>LAPOR!, SP4N</td></tr></tbody></DataTable></Card>
          <Card icon="shopping_cart" title={<>E-Commerce</>}><p>Perdagangan elektronik yang menghubungkan penjual dan pembeli secara daring.</p>          <DataTable><thead><tr><th>Model</th><th>Contoh</th></tr></thead><tbody><tr><td>Marketplace</td><td>Tokopedia, Shopee</td></tr><tr><td>B2B</td><td>Indonetwork, Ralali</td></tr><tr><td>Financial Tech</td><td>GoPay, OVO, DANA</td></tr><tr><td>Logistik</td><td>JNE, SiCepat, Grab</td></tr></tbody></DataTable></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Teknologi di Berbagai Bidang">
        <Cards cols={3} tight>
          <Card icon="local_hospital" title={<>Kesehatan</>}><p><strong>Telemedicine</strong> memungkinkan konsultasi dokter dari rumah. AI membantu diagnosis dan wearable device memantau kesehatan real-time.</p><p><strong>20+ juta konsultasi/tahun</strong> di Indonesia.</p></Card>
          <Card icon="agriculture" title={<>Pertanian</>}><p><strong>Precision farming</strong> menggunakan drone, sensor IoT, dan GPS untuk memantau tanaman serta memprediksi cuaca.</p><p><strong>+30% hasil panen</strong> dengan optimalisasi irigasi.</p></Card>
          <Card icon="directions_car" title={<>Transportasi</>}><p>Ride-hailing (Gojek, Grab), navigasi GPS real-time, dan sistem ITS mengatur lalu lintas kota. Kendaraan otonom dan EV menjadi masa depan mobilitas.</p><p><strong>2+ juta mitra pengemudi</strong> aktif.</p></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Aplikasi Digital di Kehidupan Sehari-hari">
        <Cards cols={4}>
          <Card icon="smartphone" title={<>Komunikasi</>}><p>WhatsApp, Telegram, email — menghubungkan miliaran orang setiap hari</p></Card>
          <Card icon="movie" title={<>Hiburan</>}><p>Netflix, Spotify, YouTube — streaming mengubah industri hiburan</p></Card>
          <Card icon="payments" title={<>Keuangan</>}><p>Mobile banking, e-wallet, investasi online — cashless society</p></Card>
          <Card icon="apartment" title={<>Pekerjaan</>}><p>Remote work, cloud computing, AI assistant — masa depan kerja</p></Card>
        </Cards>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Petani memakai drone dan sensor IoT untuk memantau tanaman dan memprediksi cuaca. Pendekatan ini disebut…</>}
        options={[<>Telemedicine</>, <>Precision farming</>, <>E-government</>, <>Ride-hailing</>]} answer={1}
        why={<><strong>Precision farming</strong> memakai drone, sensor IoT, dan GPS untuk mengelola lahan secara presisi.</>}
        notes="Hubungkan ke bidang lain di slide sebelumnya." />

      <SectionSlide part={2} of={4} title="Etika dan Tanggung Jawab Digital" desc={<>Privasi, hak kekayaan intelektual, hak dan kewajiban</>}
        notes="Teknologi memberi banyak manfaat — pendidikan, bisnis, kesehatan. Namun setiap kemudahan membawa tanggung jawab. Pertanyaannya: bagaimana kita menggunakannya secara etis? [Manfaat → Tanggung Jawab → Warga Digital] Manfaat teknologi hanya bermakna bila kita menggunakannya dengan bertanggung jawab." />

      <ContentSlide title="Etika Penggunaan Teknologi Digital">
        <Cards cols={3} tight>
          <Card icon="lock" title={<>Privasi & Keamanan</>}><p>Jaga data pribadi. Gunakan password kuat, waspada phishing, dan pahami pengaturan privasi di setiap platform.</p></Card>
          <Card icon="edit" title={<>Hak Kekayaan Intelektual</>}><p>Hormati hak cipta. Jangan plagiat, gunakan konten dengan lisensi yang tepat, dan cantumkan sumber.</p></Card>
          <Card icon="chat" title={<>Netiket & Ujaran Kebencian</>}><p>Berkomunikasi dengan sopan di dunia digital. Hindari cyberbullying, hoax, dan ujaran yang merugikan orang lain.</p></Card>
        </Cards>
        <QuoteBlock>"Dengan kebebasan digital datanglah tanggung jawab digital — etika bukan pilihan, melainkan kebutuhan."</QuoteBlock>
      </ContentSlide>

      <SplitSlide title="Hak & Kewajiban Digital"
        left={<>
          <Cols>
            <Col title={<><I n="circle" /> Hak Digital</>}><ul><li>Akses internet yang setara</li><li>Kebebasan berekspresi online</li><li>Privasi dan perlindungan data</li><li>Keamanan dari ancaman siber</li></ul></Col>
            <Col title={<><I n="circle" /> Kewajiban Digital</>}><ul><li>Menyaring informasi sebelum berbagi</li><li>Menghargai kekayaan intelektual</li><li>Menjaga keamanan akun sendiri</li><li>Melaporkan konten ilegal</li></ul></Col>
          </Cols>
        </>}
        right={<>
          <Figure src="images/digital-rights.jpg" alt="Hak dan Kewajiban Digital" />
        </>} />

      <QuickCheckSlide
        q={<>Mahasiswa menyalin paragraf dari jurnal ke tugasnya tanpa mencantumkan sumber. Prinsip etika yang dilanggar adalah…</>}
        options={[<>Privasi dan keamanan</>, <>Hak kekayaan intelektual</>, <>Netiket</>, <>Hak akses internet</>]} answer={1}
        why={<>Menyalin tanpa sumber adalah <strong>plagiarisme</strong>, pelanggaran hak kekayaan intelektual.</>}
        notes="Tanyakan cara mengutip yang benar." />

      <SectionSlide part={3} of={4} title="Etika Berkomunikasi" desc={<>Komunikasi digital dan etika email</>} />

      <ContentSlide title="Etika Berkomunikasi Digital">
        <Cols>
          <Col title={<><I n="check_circle" /> Lakukan</>}><ul><li>Gunakan bahasa yang sopan dan hormat</li><li>Cek kebenaran informasi sebelum membagikan</li><li>Hargai privasi dan minta izin sebelum menandai orang lain</li><li>Berikan umpan balik yang membangun</li></ul></Col>
          <Col title={<><I n="block" /> Hindari</>}><ul><li>Ujaran kebencian dan cyberbullying</li><li>Menyebarkan hoax atau fitnah</li><li>Kata kasar dan nada menyinggung</li><li>Membagikan informasi pribadi orang lain</li></ul></Col>
        </Cols>
        <Para tone="caption">Ingat <strong>THINK</strong> sebelum memposting: <strong>T</strong>rue (benar), <strong>H</strong>elpful (bermanfaat), <strong>I</strong>nspiring (menginspirasi), <strong>N</strong>ecessary (perlu), <strong>K</strong>ind (baik).</Para>
      </ContentSlide>

      <ContentSlide title="Contoh: Komunikasi Digital">
        <Cols>
          <Col title={<><I n="check_circle" /> Komunikasi Baik</>}><QuoteBlock>"Selamat pagi, Pak. Mohon maaf mengganggu. Saya ingin bertanya tentang jadwal bimbingan minggu ini. Terima kasih."</QuoteBlock><p>Sopan, jelas, menghargai waktu, dan langsung ke maksud.</p></Col>
          <Col title={<><I n="cancel" /> Komunikasi Tidak Baik</>}><QuoteBlock>"PAK!! KAPAN BIMBINGAN?? BALAS DONG SEKARANG JUGA"</QuoteBlock><p>Nada menuntut, huruf kapital (berteriak), tanpa salam dan kesopanan.</p></Col>
        </Cols>
      </ContentSlide>

      <ContentSlide title="Etika Mengirim Email">
        <Steps>
          <Step n={1} title={<>Subjek yang jelas</>}><>Tuliskan inti email di baris subjek — jangan kosong atau terlalu umum.</></Step>
          <Step n={2} title={<>Salam pembuka & perkenalan</>}><>Mulai dengan salam yang sopan dan perkenalkan diri secara singkat sebelum menyampaikan maksud.</></Step>
          <Step n={3} title={<>Isi ringkas & bahasa formal</>}><>Sampaikan maksud dengan jelas, ringkas, dan bahasa yang formal. Hindari bahasa gaul dan singkatan.</></Step>
          <Step n={4} title={<>Penutup & tanda tangan</>}><>Akhiri dengan ucapan terima kasih, nama lengkap, NIM, dan informasi kontak yang relevan.</></Step>
        </Steps>
        <QuoteBlock>"Menulis email dengan HURUF KAPITAL SEMUA dianggap berteriak dalam komunikasi digital."</QuoteBlock>
      </ContentSlide>

      <ContentSlide title="Contoh: Email ke Dosen">
        <Cols>
          <Col title={<><I n="check_circle" /> Email Baik</>}><QuoteBlock><strong>Subjek:</strong> Permohonan Bimbingan Tugas Akhir<br /><br />Yth. Bapak/Ibu Dosen,<br />Selamat pagi. Saya Rina, NIM 122150001, mahasiswa bimbingan TA Anda. Saya ingin menanyakan jadwal bimbingan minggu ini. Terima kasih.<br /><br />Hormat saya,<br />Rina</QuoteBlock><p>Subjek jelas, salam sopan, perkenalan lengkap, penutup formal.</p></Col>
          <Col title={<><I n="cancel" /> Email Tidak Baik</>}><QuoteBlock><strong>Subjek:</strong> (kosong)<br /><br />pak, saya mau bimbingan hari ini bisa?? gk bisa nunggu lama, tolong bales cpt ya</QuoteBlock><p>Subjek kosong, tanpa salam, bahasa tidak formal, nada menuntut.</p></Col>
        </Cols>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Manakah subjek email yang tepat untuk menghubungi dosen?</>}
        options={[<>(dikosongkan)</>, <>Pak, tolong cepat!!</>, <>Permohonan Bimbingan Tugas Akhir</>, <>BIMBINGAN</>]} answer={2}
        why={<>Subjek yang baik <strong>menyatakan inti email</strong> secara jelas dan sopan. Huruf kapital semua dianggap berteriak.</>}
        notes="Minta mahasiswa menulis ulang subjek yang buruk." />

      <SectionSlide part={4} of={4} title="Etika untuk Mahasiswa" desc={<>Integritas akademik, studi kasus, dan diskusi</>} />

      <ContentSlide title="Etika Digital untuk Mahasiswa">
        <Cards cols={3} tight>
          <Card icon="menu_book" title={<>Integritas Akademik</>}><p>Jangan plagiat. Kutip dan cantumkan sumber setiap ide yang bukan milik Anda.</p></Card>
          <Card icon="smart_toy" title={<>Penggunaan AI yang Etis</>}><p>Gunakan AI sebagai alat bantu belajar, bukan pengganti pemahaman. Selalu periksa dan pahami hasilnya.</p></Card>
          <Card icon="enhanced_encryption" title={<>Keamanan & Reputasi</>}><p>Jaga password dan data pribadi. Bangun jejak digital yang positif untuk masa depan karier.</p></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Studi Kasus: Etika Digital dalam Praktik">
        <Cards cols={3} tight>
          <Card num={1} title={<>Penyebaran Hoax</>}><p>Seorang mahasiswa membagikan berita palsu di media sosial tanpa verifikasi. Akibatnya, opini publik dirugikan dan ia terancam UU ITE.</p><Tags><Tag>UU ITE</Tag><Tag>Literasi Digital</Tag></Tags></Card>
          <Card num={2} title={<>Plagiarisme Akademik</>}><p>Mahasiswa men-copy-paste jurnal tanpa sitasi untuk tugas akhir. Terdeteksi oleh Turnitin — sanksi akademik diberlakukan.</p><Tags><Tag>Hak Cipta</Tag><Tag>Akademik</Tag></Tags></Card>
          <Card num={3} title={<>Data Breach</>}><p>Startup e-commerce kebobolan — data 5 juta pengguna bocor. Penyebab: tidak enkripsi database dan password admin lemah.</p><Tags><Tag>Keamanan Data</Tag><Tag>GDPR</Tag></Tags></Card>
        </Cards>
      </ContentSlide>

      <SplitSlide title="Diskusi Kelompok"
        left={<>
          <Callout title={<>Topik Diskusi</>}>Dalam kelompok (4-5 orang), diskusikan studi kasus berikut dan presentasikan solusi Anda di depan kelas.</Callout>
          <Steps>
            <Step n="A" title={<>Skenario Media Sosial</>}><>Anda menemukan akun anonim yang menyebarkan fitnah tentang teman Anda. Apa yang Anda lakukan? Jelaskan pertimbangan etika dan hukumnya.</></Step>
            <Step n="B" title={<>Skenario Data Pribadi</>}><>Aplikasi favorit Anda terbukti menjual data lokasi pengguna ke pihak ketiga. Apakah Anda tetap menggunakan aplikasi tersebut? Mengapa?</></Step>
          </Steps>
        </>}
        right={<>
          <Figure src="images/group-discussion.jpg" alt="Diskusi Kelompok" />
        </>} />

      <QuizSlide title="Post-Test: Uji Pemahaman" items={quiz} />

      <SummarySlide title="Rangkuman Pertemuan 4" points={[
        <>Teknologi digital <strong>mentransformasi pendidikan</strong> melalui e-learning, LMS, dan MOOC — membuat pembelajaran lebih fleksibel dan aksesibel.</>,
        <><strong>E-government</strong> mempercepat layanan publik, sedangkan <strong>e-commerce</strong> menghubungkan jutaan penjual dan pembeli secara daring.</>,
        <>Di bidang <strong>kesehatan, pertanian, dan transportasi</strong>, teknologi meningkatkan efisiensi, akurasi, dan jangkauan layanan secara signifikan.</>,
        <><strong>Etika digital</strong> mencakup privasi, hak cipta, netiket, dan tanggung jawab atas informasi yang kita sebarkan.</>,
        <>Hak dan kewajiban digital harus seimbang — sebagai pengguna teknologi, kita <strong>bertanggung jawab</strong> atas setiap tindakan di dunia digital.</>,
      ]} />

      <ReferencesSlide refs={[
        <>Bates, A.W. (2019). <em>Teaching in a Digital Age</em>. 2nd ed. Tony Bates Associates.</>,
        <>Laudon, K.C. & Traver, C.G. (2022). <em>E-commerce 2021-2022: Business, Technology, Society</em>. 17th ed. Pearson.</>,
        <>Heeks, R. (2006). <em>Implementing and Managing eGovernment: An International Text</em>. SAGE Publications.</>,
        <>World Health Organization (2010). <em>Telemedicine: Opportunities and Developments in Member States</em>. WHO Press.</>,
        <>Wolfert, S., Ge, L., Verdouw, C., & Bogaardt, M.J. (2017). "Big Data in Smart Farming – A review." <em>Agricultural Systems</em>, 153, 69-80.</>,
        <>Turban, E., King, D., Lee, J.K., Liang, T.P., & Turban, D.C. (2018). <em>Electronic Commerce 2018</em>. Springer.</>,
        <>Undang-Undang No. 19 Tahun 2016 tentang Perubahan atas UU No. 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik.</>,
        <>DataReportal (2026). "Digital 2026: Indonesia." <em>datareportal.com/reports/digital-2026-indonesia</em></>,
        <>APJII (2025). "Survei Penetrasi Internet dan Perilaku Penggunaan Internet 2025." Asosiasi Penyelenggara Jasa Internet Indonesia.</>,
      ]} />

      <ClosingSlide lede={<>Teknologi adalah alat yang powerful — tapi bagaimana kita menggunakannya menentukan apakah ia menjadi berkah atau bencana.</>} quote={<>"Technology is a useful servant but a dangerous master."</>} cite={<>— Christian Lous Lange</>} next="Pertemuan 5: Data & Informasi di Era Digital"
        notes={"Topik pertemuan berikutnya: Data & Informasi — Dari data mentah menjadi pengetahuan yang bermakna; Format & Ukuran Data — Bit, byte, dan satuan penyimpanan digital; Big Data & Analytics — Mengolah data dalam skala besar."} />

    </>
  );
}
