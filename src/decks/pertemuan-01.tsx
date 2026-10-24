import {
  AgendaSlide,
  CardsSlide,
  ClosingSlide,
  ComparisonSlide,
  DiscussSlide,
  FlowSlide,
  HookSlide,
  QuickCheckSlide,
  type QuizItem,
  QuizSlide,
  Quote,
  ReferencesSlide,
  SectionSlide,
  SummarySlide,
  TimelineSlide,
  TitleSlide,
  TwoColumnSlide,
} from '../layouts';

const quiz: QuizItem[] = [
  { q: 'Apa tahapan akhir dari digitalisasi?', options: ['Digitisasi', 'Digitalisasi', 'Transformasi Digital', 'Automatisasi'], answer: 2 },
  { q: 'Komponen mana yang bukan bagian dari CPU?', options: ['ALU', 'Control Unit', 'RAM', 'Register'], answer: 2 },
  { q: 'Contoh perangkat input adalah...', options: ['Monitor', 'Printer', 'Keyboard', 'Speaker'], answer: 2 },
  { q: 'Fungsi utama sistem operasi adalah...', options: ['Mengedit foto', 'Mengelola sumber daya komputer', 'Menampilkan video', 'Menghubungkan ke internet'], answer: 1 },
];

export default function Pertemuan01() {
  return (
    <>
      <TitleSlide meeting={1} title="Pengenalan Dasar Teknologi Digital"
        lede="Memahami konsep dasar transformasi digital, sejarah evolusi teknologi, dan fondasi perangkat keras serta lunak komputer" />

      <HookSlide title="Dunia yang Berubah"
        lede="Di abad ke-21, teknologi digital bukan lagi pilihan — ia adalah lingkungan tempat kita hidup."
        stats={[
          { num: '230 juta', label: 'pengguna internet di Indonesia (2025)' },
          { num: '80,5%', label: 'penetrasi internet dari total populasi' },
          { num: '180 juta', label: 'pengguna media sosial aktif' },
        ]}
        examples={[
          <><strong>Gojek</strong> — startup pertama decacorn Asia Tenggara ($10 miliar valuasi), lahir dari kebutuhan sederhana: mencari ojek</>,
          <><strong>QRIS</strong> — standar pembayaran digital nasional yang mengubah cara ratusan juta orang bertransaksi, dari warung kaki lima hingga mal</>,
          <><strong>Tokopedia</strong> — menghubungkan 12 juta+ penjual UMKM dengan pembeli di 99% kota di seluruh Indonesia</>,
        ]}
        source="DataReportal (2026), CB Insights (2019), Tokopedia (2025), Bank Indonesia" />

      <AgendaSlide title="Agenda Pertemuan 1" items={[
        { title: 'Apa itu Transformasi Digital?', desc: 'Konsep dan pengertian dasar' },
        { title: 'Konsep Digitalisasi', desc: 'Digitisasi, digitalisasi, dan transformasi digital' },
        { title: 'Sejarah Teknologi Digital', desc: 'Evolusi dari komputer pertama hingga era AI' },
        { title: 'Hardware & Software', desc: 'Perangkat keras dan lunak komputer' },
        { title: 'Arsitektur & Sistem Operasi', desc: 'Von Neumann, OS, dan Arduino' },
        { title: 'Dampak & Peran Teknologi', desc: 'Transformasi digital di berbagai bidang' },
      ]} />

      <DiscussSlide title="Coba Pikirkan..." footer="Diskusikan dengan teman di sebelahmu — 3 menit!" prompts={[
        { heading: 'Pertanyaan 1', icon: 'psychology_alt', body: 'Sebutkan SATU aktivitas yang hari ini kamu lakukan tanpa teknologi digital. Apakah aktivitas itu benar-benar bebas dari teknologi?' },
        { heading: 'Pertanyaan 2', icon: 'history', body: 'Bayangkan kamu hidup 30 tahun lalu (1996). Bagaimana cara kamu: mengirim pesan ke teman? Mencari informasi untuk tugas? Memesan makanan?' },
      ]} />

      <SectionSlide part={1} of={3} title="Apa Itu Transformasi Digital?" desc={<>Dari digitisasi hingga perubahan menyeluruh</>} />

      <TwoColumnSlide title="Apa itu Transformasi Digital?" image="images/digital-transformation.jpg" imageAlt="Transformasi Digital">
        <p>Kita baru saja melihat betapa dalamnya teknologi digital sudah merasuk ke kehidupan kita. Istilah resmi untuk fenomena ini adalah <strong>transformasi digital</strong>.</p>
        <p><strong>Transformasi digital</strong> adalah proses integrasi teknologi digital ke dalam semua aspek kehidupan, mengubah cara kita bekerja, belajar, berkomunikasi, dan menjalani kehidupan sehari-hari.</p>
        <p>Tidak hanya tentang <strong>teknologi</strong>, tetapi juga tentang perubahan <strong>mindset</strong>, <strong>proses</strong>, dan <strong>budaya</strong>.</p>
        <Quote cite={<>Westerman, G., Bonnet, D., & McAfee, A. (2014). <em>Leading Digital</em>. Harvard Business Review Press.</>}>
          "Digital transformation is not about technology — it's about strategy and new ways of thinking."
        </Quote>
      </TwoColumnSlide>

      <FlowSlide title="Konsep Digitalisasi"
        nodes={[
          { icon: 'document_scanner', title: 'Digitisasi', body: 'Mengubah bentuk analog menjadi digital', example: '(contoh: foto kertas → scan JPG)' },
          { icon: 'settings', title: 'Digitalisasi', body: 'Mengubah proses manual menjadi proses digital', example: '(contoh: surat → email)' },
          { icon: 'rocket_launch', title: 'Transformasi Digital', body: 'Perubahan menyeluruh dalam model bisnis & budaya', example: '(contoh: ojek pangkalan → Gojek super app)', hi: true },
        ]}
        caption="Setiap tahap membangun di atas tahap sebelumnya — bukan sekadar perubahan teknologi, melainkan evolusi cara kerja." />

      <CardsSlide title="Transformasi di Sekitar Kita" cards={[
        { icon: 'two_wheeler', title: 'Transportasi', sub: 'Dari: Ojek pangkalan, taksi argo', body: <>Ke: Gojek, Grab — super app yang melayani transportasi, pengiriman, pembayaran, dan 20+ layanan lainnya. Didirikan Nadiem Makarim (2010), menjadi decacorn pertama Indonesia (2019).</> },
        { icon: 'shopping_cart', title: 'Perdagangan', sub: 'Dari: Warung, pasar tradisional', body: <>Ke: Tokopedia, Shopee — marketplace menghubungkan 12 juta+ UMKM dengan pembeli di 99% kota Indonesia. 86,5% penjual Tokopedia adalah pebisnis baru.</>, tone: 'secondary' },
        { icon: 'payments', title: 'Pembayaran', sub: 'Dari: Uang tunai, kartu kredit', body: <>Ke: QRIS, GoPay, OVO, Dana — satu standar QR untuk semua pembayaran digital. QRIS diluncurkan Bank Indonesia (2019), diterima jutaan merchant.</>, tone: 'tertiary' },
      ]} />

      <QuickCheckSlide
        q={<>Foto ijazah kertas dipindai menjadi berkas JPG. Tahap manakah ini?</>}
        options={[<>Digitisasi</>, <>Digitalisasi</>, <>Transformasi digital</>, <>Otomasi</>]} answer={0}
        why={<><strong>Digitisasi</strong> hanya mengubah bentuk analog menjadi digital. Digitalisasi mengubah <em>proses</em>, dan transformasi mengubah model bisnis serta budaya.</>}
        notes="Minta mahasiswa mencari contoh lain dari tiap tahap." />

      <SectionSlide part={2} of={3} title="Perangkat dan Sistem Komputer" desc={<>Sejarah, hardware, software, arsitektur, dan sistem operasi</>} />

      <TimelineSlide title="Sejarah & Evolusi Teknologi Digital"
        lede="Semua ini tidak terjadi dalam semalam. Mari kita mundur dan melihat perjalanan panjang evolusi teknologi digital."
        steps={[
          { icon: 'lightbulb', era: '1940-an', title: 'Era Komputer Pertama', body: 'ENIAC, Colossus — mesin seukuran ruangan untuk perang dan perhitungan ilmiah' },
          { icon: 'computer', era: '1970–80an', title: 'Era Personal Computer', body: 'Apple II, IBM PC, ARPANET — komputer bisa dimiliki individu' },
          { icon: 'smartphone', era: '2000-an', title: 'Era Internet & Media Sosial', body: 'Web 2.0, Facebook, YouTube — setiap orang jadi kreator konten' },
          { icon: 'smart_toy', era: '2020-an', title: 'Era AI, IoT & Cloud', body: 'ChatGPT, smart city — komputer mulai "berpikir" dan membuat keputusan' },
        ]} />

      <ComparisonSlide title="Perangkat Digital"
        left={{ heading: 'Perangkat Keras (Hardware)', icon: 'memory', tone: 'neutral', items: [
          <><strong>Input:</strong> keyboard, mouse, kamera, mikrofon</>, <><strong>Processing:</strong> CPU, GPU, RAM</>,
          <><strong>Storage:</strong> HDD, SSD, flash drive</>, <><strong>Output:</strong> monitor, printer, speaker</>,
          <><strong>Network:</strong> modem, router, switch</>] }}
        right={{ heading: 'Perangkat Lunak (Software)', icon: 'apps', tone: 'neutral', items: [
          <><strong>Sistem Operasi:</strong> Windows, macOS, Linux, Android</>, <><strong>Aplikasi:</strong> browser, office, editing</>,
          <><strong>Utility:</strong> antivirus, backup, compression</>, <><strong>Driver:</strong> penghubung hardware & OS</>,
          <><strong>Cloud/SaaS:</strong> Google Docs, Canva, Zoom</>] }} />

      <FlowSlide title="Bagaimana Hardware & Software Bekerja Sama"
        nodes={[
          { icon: 'keyboard', title: 'Kamu mengetik pesan', body: 'Keyboard = input hardware' },
          { icon: 'settings', title: 'Sistem Operasi membaca', body: 'Android/iOS memproses perintah dari keyboard' },
          { icon: 'chat', title: 'Aplikasi memproses', body: 'Software mengenkripsi & mengirim data' },
          { icon: 'wifi', title: 'Modem/WiFi mengirim', body: 'Hardware network = output' },
        ]}
        caption={'Setiap tindakan sederhana di smartphone melibatkan kerja sama hardware dan software. Sistem operasi menjadi "pengatur" yang memastikan keduanya bekerja bersama.'} />

      <FlowSlide title="Organisasi & Arsitektur Komputer"
        lede={'Tahun 1945, matematikawan John von Neumann merancang arsitektur komputer yang memungkinkan program disimpan di memori bersama data — konsep "stored program" ini masih menjadi fondasi semua komputer modern hingga hari ini.'}
        nodes={[
          { icon: 'input', title: 'Input', body: 'Menerima data dari perangkat masukan' },
          { icon: 'psychology', title: 'CPU', body: 'ALU + Control Unit. Memproses instruksi', hi: true },
          { icon: 'sd_card', title: 'Memory', body: 'RAM (sementara), Storage (permanen)' },
          { icon: 'output', title: 'Output', body: 'Menampilkan hasil ke perangkat keluaran' },
        ]} />

      <QuickCheckSlide
        q={<>Dokumen yang belum disimpan hilang saat listrik padam mendadak. Data itu berada di…</>}
        options={[<>Storage (SSD)</>, <>RAM</>, <>Monitor</>, <>Router</>]} answer={1}
        why={<><strong>RAM</strong> menyimpan data sementara selama komputer menyala. <strong>Storage</strong> menyimpan permanen.</>}
        notes="Hubungkan dengan arsitektur Von Neumann: memory dan storage." />

      <TwoColumnSlide title="Sistem Operasi" image="images/operating-system.jpg" imageAlt="Sistem Operasi"
        tags={['Windows', 'macOS', 'Linux', 'Android', 'iOS', 'ChromeOS']}>
        <p>Dari arsitektur Von Neumann, kita tahu bahwa CPU memproses instruksi dan memory menyimpan data. Tapi siapa yang mengatur semuanya agar berjalan teratur?</p>
        <p><strong>Sistem operasi</strong> adalah perangkat lunak utama yang mengelola seluruh sumber daya komputer dan menjadi perantara antara pengguna dengan hardware.</p>
        <p>Tanpa sistem operasi, kamu harus mengetik perintah mesin secara langsung setiap kali ingin menjalankan program.</p>
      </TwoColumnSlide>

      <CardsSlide title="Lapisan Komputer" cols={2} cards={[
        { icon: 'memory', title: 'Layer 1: Hardware', body: 'CPU, RAM, Storage, Input/Output — komponen fisik' },
        { icon: 'settings', title: 'Layer 2: Sistem Operasi', body: 'Windows, macOS, Linux, Android — mengatur semua sumber daya', tone: 'secondary' },
        { icon: 'chat', title: 'Layer 3: Aplikasi', body: 'WhatsApp, Chrome, Google Docs, VS Code', tone: 'tertiary' },
        { icon: 'person', title: 'Layer 4: Pengguna', body: 'Kamu — yang memberikan perintah' },
      ]} callout="Setiap layer bergantung pada layer di bawahnya. Arsitektur Von Neumann adalah fondasi dari Layer 1." />

      <SectionSlide part={3} of={3} title="Arduino, Dampak, dan Tantangan" desc={<>Dunia fisik bertemu dunia digital, dan peran kita</>} />

      <TwoColumnSlide title="Arduino & Sensor" image="images/arduino-sensor.jpg" imageAlt="Arduino dan Sensor"
        tags={['Suhu (DHT11)', 'Cahaya (LDR)', 'Ultrasonik', 'Gerakan (PIR)', 'Kelembaban']}>
        <p>Kita sudah memahami bagaimana komputer memproses data di dalam dirinya sendiri. Tapi bagaimana komputer berinteraksi dengan dunia fisik di sekitarnya?</p>
        <p><strong>Arduino</strong> adalah platform mikrokontroler open-source yang memungkinkan kita membuat proyek elektronik interaktif — jembatan antara dunia digital dan fisik.</p>
        <p><strong>Sensor</strong> adalah perangkat input yang mendeteksi perubahan di lingkungan fisik (suhu, cahaya, gerakan) dan mengubahnya menjadi sinyal digital.</p>
      </TwoColumnSlide>

      <QuickCheckSlide
        q={<>Sensor cahaya (LDR) pada Arduino bekerja dengan mengubah perubahan cahaya menjadi…</>}
        options={[<>Sinyal digital</>, <>Suara</>, <>Daya listrik</>, <>Teks</>]} answer={0}
        why={<>Sensor adalah perangkat <strong>input</strong> yang mengubah perubahan fisik (cahaya, suhu, gerakan) menjadi <strong>sinyal digital</strong>.</>}
        notes="Tanyakan: sensor lain apa yang ada di ponsel mereka?" />

      <CardsSlide title="Dampak Transformasi Digital" cols={3} dense cards={[
        { icon: 'local_hospital', title: 'Kesehatan', sub: 'Telemedicine, rekam medis elektronik, diagnosis berbasis AI', body: 'Contoh: PeduliLindungi saat pandemi COVID-19, Halodoc' },
        { icon: 'school', title: 'Pendidikan', sub: 'E-learning, LMS, video conference, akses materi global', body: 'Contoh: Zoom & Google Classroom, Coursera & YouTube', tone: 'secondary' },
        { icon: 'account_balance_wallet', title: 'Keuangan', sub: 'Mobile banking, e-wallet, QRIS, investasi digital', body: 'Contoh: GoPay, OVO, Dana — adopsi e-wallet tercepat di dunia', tone: 'tertiary' },
        { icon: 'account_balance', title: 'Pemerintahan', sub: 'e-Government, layanan publik online, NIK digital', body: 'Contoh: LAPOR!, perpanjangan SIM online, SPT elektronik' },
        { icon: 'shopping_cart', title: 'Perdagangan', sub: 'E-commerce, marketplace, pengiriman same-day', body: 'Contoh: Tokopedia & Shopee — UMKM di pelosok jual ke seluruh Indonesia', tone: 'secondary' },
        { icon: 'agriculture', title: 'Pertanian', sub: 'Precision farming, drone monitoring, IoT sensor tanah', body: 'Contoh: Irigasi otomatis berbasis sensor di sawah Jawa Barat', tone: 'tertiary' },
      ]} />

      <ComparisonSlide title="Peran Teknologi Digital dalam Perubahan Masyarakat"
        left={{ heading: 'Dampak Positif', icon: 'check_circle', items: [
          'Akses informasi dan pendidikan lebih mudah', 'Komunikasi lintas batas geografis', 'Efisiensi dan produktivitas meningkat',
          'Peluang kerja dan bisnis baru', 'Layanan publik lebih cepat dan transparan'] }}
        right={{ heading: 'Tantangan', icon: 'warning', items: [
          'Kesenjangan digital (digital divide)', 'Keamanan data dan privasi', 'Hoax dan misinformasi',
          'Kecanduan teknologi', 'Dampak lingkungan (e-waste)'] }}
        footer="Di Indonesia, masih ada 55,8 juta orang yang belum terhubung internet (19,5% populasi). Kesenjangan digital antara Jawa dan luar Jawa masih signifikan. (DataReportal, 2026)" />

      <CardsSlide title="Tantangan untuk Kita" cols={2} cards={[
        { icon: 'person', title: 'Sebagai Pengguna', body: 'Apakah kamu sudah melindungi data pribadimu? Bisakah membedakan informasi valid dari hoax? Seberapa sadar terhadap screen time?' },
        { icon: 'build', title: 'Sebagai Calon Pembuat Teknologi', body: 'Kalian bukan hanya pengguna — kalian akan menjadi insinyur, peneliti, dan developer. Apa tanggung jawab kalian?', tone: 'secondary' },
      ]} callout={'"Dengan kekuatan teknologi yang begitu besar, datang pula tanggung jawab yang sama besarnya. Memahami fondasi teknologi digital adalah langkah pertama untuk menggunakan kekuatan itu secara bijak."'} />

      <QuizSlide title="Post-Test: Uji Pemahaman" items={quiz} />
      <SummarySlide title="Rangkuman Pertemuan 1" points={[
        <><strong>Transformasi Digital</strong> terdiri dari 3 tahap: digitisasi (analog→digital), digitalisasi (proses→digital), dan transformasi digital (perubahan total).</>,
        <><strong>Arsitektur Von Neumann</strong> menjadi fondasi komputer modern: CPU, memori, input/output, dan system bus.</>,
        <>Perangkat keras & lunak bekerja bersama — hardware adalah tubuh, software adalah otaknya.</>,
        <><strong>Arduino & sensor</strong> memungkinkan interaksi dunia fisik dengan dunia digital secara real-time.</>,
        <>Teknologi digital berdampak di <strong>semua bidang</strong>: pendidikan, kesehatan, bisnis, pemerintahan, dan sosial.</>,
        <>Kita bukan hanya pengguna. Sebagai calon profesional sains dan teknologi, memahami fondasi digital adalah langkah pertama untuk membentuk masa depan.</>,
      ]} />

      <ReferencesSlide refs={[
        <>Westerman, G., Bonnet, D., & McAfee, A. (2014). <em>Leading Digital: Turning Technology into Business Transformation</em>. Harvard Business Review Press.</>,
        <>Brennen, J.S. & Kreiss, D. (2016). "Digitalization." <em>The International Encyclopedia of Communication Theory and Philosophy</em>. Wiley.</>,
        <>Ceruzzi, P.E. (2003). <em>A History of Modern Computing</em>. 2nd ed. MIT Press.</>,
        <>Von Neumann, J. (1945). "First Draft of a Report on the EDVAC." <em>IEEE Annals of the History of Computing</em>, 15(4), 27–75.</>,
        <>Stallings, W. (2021). <em>Computer Organization and Architecture: Designing for Performance</em>. 11th ed. Pearson.</>,
        <>Banzi, M. & Shiloh, M. (2022). <em>Getting Started with Arduino</em>. 3rd ed. Make Community.</>,
        <>DataReportal (2026). "Digital 2026: Indonesia." datareportal.com/reports/digital-2026-indonesia</>,
        <>APJII (2025). "Survei Penetrasi Internet dan Perilaku Penggunaan Internet 2025." Asosiasi Penyelenggara Jasa Internet Indonesia.</>,
        <>CB Insights (2019). "The Global Unicorn Club." cbinsights.com</>,
        <>Tokopedia (2025). "Tentang Kami." tokopedia.com/about</>,
        <>Bank Indonesia. "Statistik Sistem Pembayaran: QRIS." bi.go.id</>,
      ]} />

      <ClosingSlide
        lede="Teknologi digital bukan sekadar alat — ia membentuk cara kita hidup, bekerja, dan berinteraksi. Memahami fondasinya adalah langkah pertama menjadi warga digital yang bijak."
        quote={'"The best way to predict the future is to create it."'} cite="— Peter Drucker"
        next="Pertemuan 2: Sistem Bilangan Digital & Logika Digital"
        notes={"Topik pertemuan berikutnya: Sistem Bilangan Digital — Biner, Oktal, Heksadesimal, bagaimana komputer \"berpikir\" dalam angka 0 dan 1; Logika Digital — Gerbang logika AND, OR, NOT, blok bangunan dasar dari semua keputusan komputer. Teaser: Komputer yang kita bahas hari ini menjalankan miliaran keputusan setiap detik. Di pertemuan berikutnya, kita akan mempelajari bahasa dasar di balik semua keputusan itu: angka biner dan logika Boolean."} />

    </>
  );
}
