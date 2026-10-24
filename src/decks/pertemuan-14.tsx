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
  { q: <>Teknik prompt "Berikan jawaban langkah demi langkah" disebut?</>, options: [<>Role Prompting</>, <>Zero-shot Learning</>, <>Chain of Thought</>, <>Few-shot Prompting</>], answer: 2 },
  { q: <>Tindakan yang sesuai dengan integritas akademik saat memakai AI untuk tugas adalah?</>, options: [<>Mengumpulkan keluaran AI tanpa menyebutnya</>, <>Memeriksa isinya, menulis dengan pemahaman sendiri, dan mengungkapkan bantuan AI</>, <>Meminta AI membuat rujukan agar terlihat ilmiah</>, <>Memasukkan data pribadi teman ke AI</>], answer: 1 },
  { q: <>Kejadian saat AI "mengarang" fakta yang terdengar meyakinkan disebut?</>, options: [<>Overfitting</>, <>Hallucination</>, <>Bias</>, <>Training</>], answer: 1 },
  { q: <>Tools yang digunakan untuk membaca paper ilmiah dengan bantuan AI adalah?</>, options: [<>DALL-E</>, <>GitHub Copilot</>, <>Scispace</>, <>Midjourney</>], answer: 2 },
];

export default function Pertemuan14() {
  return (
    <>
      <TitleSlide meeting={14} title="Aplikasi Kecerdasan Buatan" lede="Mengenal teknik prompt engineering, AI untuk produktivitas, riset, gambar, penulisan, coding, serta etika, limitasi, dan integritas akademiknya" />

      <HookSlide title="Pertanyaan yang Sama, Jawaban Berbeda"
        lede="Dua cara meminta bantuan kepada AI:"
        notes="Tampilkan dua prompt, minta mahasiswa menebak mana yang memberi jawaban lebih berguna dan mengapa. Dari sini masuk ke teknik prompt engineering."
      >
        <Cols>
          <Col title={<><I n="sentiment_dissatisfied" /> Prompt samar</>}><p>“Buatkan ringkasan.”</p></Col>
          <Col title={<><I n="sentiment_satisfied" /> Prompt jelas</>}><p>“Ringkas artikel berikut dalam 3 poin untuk mahasiswa semester 1, dengan bahasa santai, lalu beri satu contoh.”</p></Col>
        </Cols>
        <Para tone="highlight">Apa yang membuat prompt kedua lebih baik?</Para>
      </HookSlide>

      <AgendaSlide title="Agenda Pertemuan" items={[
        { title: "Prompt Engineering", desc: "Teknik menyusun prompt yang efektif untuk AI" },
        { title: "Google Gemini untuk Produktivitas", desc: "Memanfaatkan Gemini dalam belajar dan bekerja" },
        { title: "Scispace untuk Riset", desc: "Membaca dan memahami paper ilmiah dengan AI" },
        { title: "AI Image Generation", desc: "DALL-E, Midjourney, dan pembuatan gambar berbasis prompt" },
        { title: "AI untuk Menulis & Coding", desc: "ChatGPT, GitHub Copilot, dan AI dalam pengembangan perangkat lunak" },
        { title: "Etika & Limitasi AI", desc: "Hallucination, bias, privasi, hak cipta, dan dampak lingkungan" },
        { title: "Integritas Akademik", desc: "Batas boleh dan tidak, pengungkapan, kutipan, dan bukti proses" },
      ]} />

      <SectionSlide part={1} of={3} title="Prompt dan Alat AI" desc={<>Prompt engineering, Gemini, Scispace, gambar, menulis, dan coding</>} />

      <ContentSlide title="Prompt Engineering: Seni Berbicara dengan AI">
        <Cards cols={3} tight>
          <Card icon="target" title={<>Specific (Spesifik)</>}><p>Jangan tanya "Buatkan essay". Tanya: "Buatkan essay 500 kata tentang dampak AI di pendidikan tinggi Indonesia."</p></Card>
          <Card icon="content_paste" title={<>Context (Konteks)</>}><p>Berikan latar belakang: "Saya mahasiswa semester 4 teknik informatika yang sedang belajar machine learning."</p></Card>
          <Card icon="square_foot" title={<>Format (Format)</>}><p>Tentukan output: "Jelaskan dalam bentuk tabel perbandingan" atau "Gunakan bullet points singkat."</p></Card>
          <Card icon="sync" title={<>Iterasi (Perbaikan)</>}><p>Jawaban pertama jarang sempurna. Beri feedback: "Lebih pendek", "Tambahkan contoh", "Gunakan bahasa sederhana."</p></Card>
          <Card icon="theater_comedy" title={<>Role (Peran)</>}><p>Minta AI berperan: "Jelaskan sebagai dosen yang sedang mengajar mahasiswa baru."</p></Card>
          <Card icon="link" title={<>Chain of Thought</>}><p>Minta penalaran bertahap: "Jelaskan langkah demi langkah bagaimana cara kerja neural network."</p></Card>
        </Cards>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Prompt “Buatkan essay” diperbaiki dengan menambahkan topik, jumlah kata, dan target pembaca. Unsur prompt apa yang ditambahkan?</>}
        options={[<>Specific</>, <>Role</>, <>Iterasi</>, <>Chain of Thought</>]} answer={0}
        why={<><strong>Specific</strong>: semakin jelas permintaan, semakin relevan jawaban AI.</>}
        notes="Minta mahasiswa menulis ulang satu prompt sendiri." />

      <SplitSlide title="Google Gemini untuk Produktivitas"
        left={<>
          <Callout title={<>Apa itu Google Gemini?</>}>AI chatbot multimodal dari Google yang terintegrasi langsung dengan ekosistem Google (Gmail, Docs, Drive, Sheets).</Callout>
          <Steps>
            <Step n={1} title={<>Ringkasan Otomatis</>}><>Ringkas email panjang, dokumen, atau PDF dalam hitungan detik</></Step>
            <Step n={2} title={<>Brainstorming Ide</>}><>Hasilkan ide proyek, topik skripsi, atau rencana presentasi</></Step>
            <Step n={3} title={<>Analisis Data</>}><>Upload spreadsheet, minta Gemini membuat grafik atau insight</></Step>
          </Steps>
        </>}
        right={<>
          <Figure src="images/google-ai.jpg" alt="Google Gemini" />
        </>} />

      <SplitSlide title="Scispace: Membaca Paper Ilmiah dengan AI"
        left={<>
          <Para>Scispace membantu mahasiswa memahami jurnal dan paper ilmiah yang kompleks tanpa harus membaca dari awal hingga akhir.</Para>
          <Steps>
            <Step n={1} title={<>Highlight & Tanya</>}><>Blok teks yang sulit, Scispace langsung menjelaskan dengan bahasa sederhana</></Step>
            <Step n={2} title={<>Explain Equation</>}><>Rumus matematika dalam paper dijelaskan secara tekstual</></Step>
            <Step n={3} title={<>Table & Figure Extract</>}><>Otomatis mengekstrak dan merangkum tabel serta grafik penting</></Step>
          </Steps>
        </>}
        right={<>
          <Figure src="images/scientific-research.jpg" alt="Scispace untuk Penelitian" />
        </>} />

      <ContentSlide title="AI Image Generation: DALL-E & Midjourney">
        <Cards cols={2} tight>
          <Card icon="palette" title={<>DALL-E (OpenAI)</>}><p>Terintegrasi di ChatGPT. Cukup deskripsikan gambar dalam bahasa natural. Mendukung edit, inpainting, dan variasi gaya.</p><Tags><Tag>Terintegrasi ChatGPT</Tag><Tag>Mudah digunakan</Tag><Tag>Multilingual</Tag></Tags></Card>
          <Card icon="image" title={<>Midjourney</>}><p>Dikenal menghasilkan gambar artistik berkualitas tinggi. Digunakan melalui web dan Discord. Prompt sangat detail menghasilkan karya yang menakjubkan.</p><Tags><Tag>Kualitas artistik</Tag><Tag>Web & Discord</Tag><Tag>Komunitas aktif</Tag></Tags></Card>
        </Cards>
        <Callout title={<>Tips Prompt Gambar</>}>Gunakan formula: <strong>[Subjek] + [Gaya] + [Detail visual] + [Pencahayaan] + [Komposisi]</strong><br />Contoh: "Wisuda di kampus ITERA, gaya cat air, sore hari, kamera dari bawah, nuansa hangat"</Callout>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Pada prompt gambar “Wisuda di kampus ITERA, gaya cat air, sore hari”, bagian “gaya cat air” adalah unsur…</>}
        options={[<>Subjek</>, <>Gaya</>, <>Pencahayaan</>, <>Komposisi</>]} answer={1}
        why={<>Formula prompt gambar: <strong>subjek + gaya + detail visual + pencahayaan + komposisi</strong>.</>}
        notes="Minta mahasiswa menambahkan unsur pencahayaan." />

      <ContentSlide title="AI untuk Menulis & Komunikasi">
        <Cards cols={4}>
          <Card icon="mail" title={<>Email Profesional</>}><p>ChatGPT membantu menyusun email formal ke dosen, atasan, atau rekan kerja</p></Card>
          <Card icon="edit_note" title={<>Penulisan Akademik</>}><p>Membantu outline skripsi, perbaikan tata bahasa, dan parafrase referensi</p></Card>
          <Card icon="bar_chart" title={<>Presentasi</>}><p>Buat slide deck, catatan pembicara, dan narasi presentasi yang menarik</p></Card>
          <Card icon="language" title={<>Terjemahan</>}><p>Terjemahan kontekstual yang lebih baik dari translate biasa untuk dokumen teknis</p></Card>
        </Cards>
      </ContentSlide>

      <SplitSlide title="AI untuk Coding & Pengembangan Software"
        left={<>
          <Steps>
            <Step n={1} title={<>GitHub Copilot</>}><>Autocomplete kode real-time di VS Code. Menulis fungsi, test, dan boilerplate otomatis berdasarkan komentar.</></Step>
            <Step n={2} title={<>ChatGPT / Claude</>}><>Debugging: tempel error, dapatkan penjelasan dan solusi. Cocok untuk belajar konsep baru.</></Step>
            <Step n={3} title={<>Cursor / Windsurf</>}><>AI-native code editor yang mengerti seluruh codebase. Bisa refactor lintas file.</></Step>
          </Steps>
        </>}
        right={<>
          <Figure src="images/ai-coding.jpg" alt="AI untuk Coding" />
        </>} />

      <SectionSlide part={2} of={3} title="Etika dan Limitasi AI" desc={<>Halusinasi, bias, privasi, dan hak cipta</>} />

      <ContentSlide title="Etika & Limitasi AI">
        <Cards cols={3} tight>
          <Card icon="balance" title={<>Bias (Prasangka)</>}><p>AI dilatih dari data internet yang mengandung bias gender, ras, dan budaya. Output bisa tidak adil atau tidak representatif.</p></Card>
          <Card icon="cyclone" title={<>Hallucination</>}><p>AI bisa "mengarang" fakta, referensi, dan statistik yang terdengar meyakinkan tapi sepenuhnya salah. Selalu verifikasi!</p></Card>
          <Card icon="copyright" title={<>Hak Cipta</>}><p>Gambar dan teks dari AI berlatih dari karya orang lain. Status hukumnya belum jelas di banyak negara.</p></Card>
          <Card icon="lock" title={<>Privasi Data</>}><p>Jangan masukkan data pribadi, rahasia perusahaan, atau ujian ke AI publik. Data bisa digunakan untuk pelatihan model.</p></Card>
          <Card icon="school" title={<>Integritas Akademik</>}><p>Menyalin output AI tanpa pemahaman = plagiat. Gunakan AI sebagai alat bantu, bukan pengganti proses berpikir.</p></Card>
          <Card icon="public" title={<>Dampak Lingkungan</>}><p>Training model AI besar mengonsumsi energi sangat tinggi. Penggunaan yang bijak = lebih sedikit query, lebih banyak hasil.</p></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="AI Bisa Mengarang Sumber, dan Anda yang Menanggung Akibatnya" notes="Tunjukkan satu contoh nyata: minta AI menyebut 3 jurnal tentang topik apa pun, lalu cari satu per satu di Google Scholar bersama kelas. Kasus Mata v. Avianca menunjukkan bahwa tanggung jawab tetap pada pengguna.">
        <Cols>
          <Col title={<><I n="warning" /> Tanda-tanda waspada</>}><ul>
            <li>Judul jurnal atau DOI <strong>tidak ditemukan</strong> di Google Scholar</li>
            <li>Penulis, tahun, dan halaman tampak rapi tetapi <strong>tidak bisa dilacak</strong></li>
            <li>Angka dan persentase <strong>tanpa sumber</strong></li>
            <li>Nada sangat yakin untuk hal yang masih diperdebatkan</li>
          </ul></Col>
          <Col title={<><I n="fact_check" /> Cara memeriksa</>}><ul>
            <li><strong>1.</strong> Cari sumber aslinya (Google Scholar, perpustakaan)</li>
            <li><strong>2.</strong> Cocokkan judul, penulis, tahun, dan DOI</li>
            <li><strong>3.</strong> Baca bagian yang dikutip, bukan hanya abstraknya</li>
            <li><strong>4.</strong> Tulis ulang dengan kata-kata sendiri</li>
          </ul></Col>
        </Cols>
        <Callout title={<>Kasus nyata: <em>Mata v. Avianca</em> (2023)</>}>Pengacara di New York menyerahkan dokumen pengadilan berisi putusan fiktif buatan ChatGPT. Pengadilan menjatuhkan denda <strong>US$5.000</strong>; hakim menegaskan bahwa memakai AI tidak dilarang, tetapi pengguna tetap bertanggung jawab atas akurasinya.</Callout>
      </ContentSlide>

      <ContentSlide title="Bias dan Kebocoran Data: Dua Risiko yang Tak Terlihat" notes="Gender Shades menguji pengenalan wajah, bukan model bahasa; gunakan sebagai contoh bagaimana data latih yang tidak seimbang menghasilkan kesalahan yang tidak merata. Untuk privasi, minta mahasiswa menyebut contoh data yang tidak boleh ditempel ke AI publik.">
        <Cols>
          <Col title={<><I n="balance" /> Bias: AI mewarisi kelemahan datanya</>}><ul>
            <li>Data latih yang tidak seimbang menghasilkan kesalahan yang tidak merata. Studi <em>Gender Shades</em> (2018): kesalahan klasifikasi gender hingga <strong>34,7%</strong> pada perempuan berkulit gelap, <strong>0,8%</strong> pada laki-laki berkulit terang.</li>
            <li>Pada teks dan gambar, stereotip gender, ras, atau budaya bisa muncul</li>
            <li>Minta beberapa sudut pandang dan periksa asumsinya</li>
          </ul></Col>
          <Col title={<><I n="lock" /> Privasi: yang Anda ketik bisa tersimpan</>}><ul>
            <li><strong>Jangan masukkan:</strong> NIM atau nilai orang lain, data penelitian belum terbit, kata sandi, dokumen internal</li>
            <li>UU No. 27 Tahun 2022 mengatur Pelindungan Data Pribadi</li>
            <li><strong>Lebih aman:</strong> anonimkan (“Mahasiswa A”) dan periksa pengaturan privasi alat</li>
          </ul></Col>
        </Cols>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Mahasiswa menempelkan data nilai teman beserta NIM ke chatbot publik. Risikonya adalah…</>}
        options={[<>Tidak ada risiko</>, <>Data pribadi bisa bocor atau dipakai untuk pelatihan model</>, <>Chatbot menjadi lambat</>, <>Hasil jawaban pasti salah</>]} answer={1}
        why={<>Jangan memasukkan data pribadi atau rahasia ke AI publik; datanya bisa disimpan dan dipakai untuk pelatihan model.</>}
        notes="Kaitkan dengan slide Etika & Limitasi AI." />

      <SectionSlide part={3} of={3} title="Integritas Akademik" desc={<>Batas yang boleh, pengungkapan, dan bukti proses</>} />

      <ContentSlide title="Integritas Akademik: Garis antara Membantu dan Menggantikan" notes="Aturan sebenarnya ditetapkan dosen pengampu dan institusi. Sampaikan kebijakan mata kuliah ini secara eksplisit di kelas, lalu minta mahasiswa menempatkan tiga contoh tugas ke dalam tiga kolom.">
        <Cards cols={3} tight>
          <Card icon="check_circle" title={<>Umumnya boleh</>}><ul><li>Brainstorming ide</li><li>Menjelaskan konsep yang belum dipahami</li><li>Memeriksa tata bahasa dan kejelasan</li><li>Membuat soal latihan</li></ul></Card>
          <Card icon="rule" tone="secondary" title={<>Tergantung aturan, ungkapkan</>}><ul><li>Ringkasan atau parafrase dibantu AI</li><li>Bantuan menulis atau men-debug kode</li><li>Terjemahan</li><li>Draf awal yang Anda tulis ulang</li></ul></Card>
          <Card icon="block" tone="tertiary" title={<>Pelanggaran</>}><ul><li>Mengumpulkan keluaran AI sebagai karya sendiri</li><li>Memalsukan atau tidak memeriksa rujukan dan data</li><li>Mengerjakan kuis atau ujian dengan AI tanpa izin</li><li>Menyamarkan teks AI agar lolos pemeriksa</li></ul></Card>
        </Cards>
        <Callout title={<>Aturan akhir ada pada dosen dan institusi</>}>Tidak yakin? Tanyakan sebelum memakai AI. Panduan GenAI Kemendikbudristek (2024) menempatkan <strong>integritas akademik</strong> sebagai salah satu ranah etika utama.</Callout>
      </ContentSlide>

      <ContentSlide title="Ungkapkan, Kutip, dan Simpan Bukti Prosesmu" notes="Pedoman APA tentang kutipan AI berubah beberapa kali sejak 2023; pakai halaman resmi APA dan aturan dosen atau jurnal. Riwayat versi Google Docs berguna sebagai bukti bahwa karya ditulis bertahap.">
        <Cols>
          <Col title={<><I n="edit_document" /> Ungkapkan dan kutip</>}>
            <p><strong>Pernyataan pengungkapan</strong> (contoh):</p>
            <QuoteBlock>Saya menggunakan [nama alat] pada [tanggal] untuk [tujuan]. Saya memeriksa seluruh keluarannya dan bertanggung jawab atas isi karya ini.</QuoteBlock>
            <p><strong>Kutipan APA 7:</strong> <code>OpenAI. (2025). ChatGPT [Large language model]. https://chatgpt.com</code>; dalam teks <code>(OpenAI, 2025)</code>. Sertakan prompt yang dipakai.</p>
          </Col>
          <Col title={<><I n="history" /> Simpan bukti proses</>}>
            <div className="big">61,3%</div>
            <p>rata-rata esai TOEFL penulis non-native yang keliru ditandai “ditulis AI” oleh 7 detektor (Liang dkk., 2023). Detektor <strong>bukan bukti</strong>.</p>
            <ul><li>Simpan draf, catatan, dan prompt</li><li>Gunakan riwayat versi: <strong>File → Version history</strong></li></ul>
          </Col>
        </Cols>
      </ContentSlide>

      <ContentSlide title="Studi Kasus: Boleh atau Pelanggaran?" notes="Minta mahasiswa memutuskan lebih dulu (angkat tangan), lalu tekan panah untuk membuka putusan satu per satu.">
        <Cards cols={3} tight>
          <Card num={1} title={<>Rina</>}><p>Meminta AI menjelaskan konsep rekursi dua kali dengan contoh, lalu menulis laporan sendiri dan mencantumkan “dibantu AI untuk penjelasan konsep”.</p><span className="fragment fade-in verdict ok" data-fragment-index={1}><I n="check_circle" /> Boleh, karena diungkapkan</span></Card>
          <Card num={2} tone="secondary" title={<>Dodi</>}><p>Menempelkan soal tugas ke AI dan mengumpulkan jawabannya tanpa mengubah dan tanpa menyebut AI.</p><span className="fragment fade-in verdict bad" data-fragment-index={2}><I n="cancel" /> Pelanggaran: karya orang lain</span></Card>
          <Card num={3} tone="tertiary" title={<>Sari</>}><p>Meminta AI menyusun daftar pustaka. Dua dari lima rujukannya tidak ada, tetapi ia mengumpulkannya tanpa dicek.</p><span className="fragment fade-in verdict bad" data-fragment-index={3}><I n="cancel" /> Pelanggaran: sumber palsu</span></Card>
        </Cards>
      </ContentSlide>

      <QuickCheckSlide
        q={<>Esaimu ditulis sendiri, tetapi detektor AI menandainya “ditulis AI”. Langkah yang paling tepat?</>}
        options={[<>Mengaku memakai AI agar masalah selesai</>, <>Menunjukkan bukti proses: draf, riwayat versi, dan catatan</>, <>Menulis ulang agar lolos detektor</>, <>Menghapus riwayat dokumen</>]} answer={1}
        why={<>Detektor <strong>bisa salah</strong>, terutama pada penulis non-native (Liang dkk., 2023). Bukti proses menunjukkan bahwa karya itu bertahap dan milik Anda.</>}
        notes="Tanyakan apa yang akan mereka simpan mulai hari ini." />

      <ContentSlide title="Checklist Sebelum Mengumpulkan Tugas yang Dibantu AI" notes="Minta mahasiswa menyalin checklist ini ke catatan pribadi.">
        <Cards cols={3} tight>
          <Card icon="check_box_outline_blank" title={<>Sesuai aturan</>}><p>Dosen pengampu mengizinkan AI untuk tugas ini.</p></Card>
          <Card icon="check_box_outline_blank" tone="secondary" title={<>Dicek</>}><p>Fakta, angka, dan rujukan sudah saya periksa ke sumber asli.</p></Card>
          <Card icon="check_box_outline_blank" tone="tertiary" title={<>Dipahami</>}><p>Saya bisa menjelaskan karya ini tanpa membuka AI.</p></Card>
          <Card icon="check_box_outline_blank" title={<>Aman</>}><p>Tidak ada data pribadi atau rahasia yang saya masukkan.</p></Card>
          <Card icon="check_box_outline_blank" tone="secondary" title={<>Diungkap</>}><p>Penggunaan AI saya cantumkan dan kutip sesuai format.</p></Card>
          <Card icon="check_box_outline_blank" tone="tertiary" title={<>Terdokumentasi</>}><p>Draf, riwayat versi, dan prompt tersimpan.</p></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Latihan Praktik AI">
        <Cards cols={2} tight>
          <Card num={1} title={<>Prompt Engineering Challenge</>}><p>Buat 3 versi prompt untuk topik yang sama (umum → spesifik → sangat detail). Perhatikan bagaimana kualitas jawaban meningkat drastis.</p></Card>
          <Card num={2} title={<>Gemini: Ringkas Artikel</>}><p>Gunakan Google Gemini untuk meringkas artikel ilmiah 10 halaman menjadi 1 halaman dengan bullet points.</p></Card>
          <Card num={3} title={<>Scispace: Baca Paper</>}><p>Upload paper ke Scispace dan gunakan fitur highlight untuk memahami bagian Abstract, Method, dan Conclusion.</p></Card>
          <Card num={4} title={<>Detect AI Hallucination</>}><p>Minta ChatGPT membuat daftar "5 penelitian tentang AI di Indonesia". Cek fakta — mana yang nyata, mana yang dikarang?</p></Card>
        </Cards>
      </ContentSlide>

      <QuizSlide title="Post-Test: Uji Pemahaman" items={quiz} />

      <SummarySlide title="Rangkuman Pertemuan 14" points={[
        <><strong>Prompt engineering</strong> adalah kunci — gunakan teknik spesifik, konteks, format, dan iterasi untuk mendapatkan jawaban terbaik dari AI.</>,
        <><strong>Google Gemini</strong> terintegrasi ekosistem Google; <strong>Scispace</strong> mempercepat pemahaman paper ilmiah; keduanya meningkatkan produktivitas akademik.</>,
        <><strong>DALL-E & Midjourney</strong> menghasilkan gambar dari teks — perhatikan formula prompt (subjek + gaya + detail + pencahayaan).</>,
        <>AI untuk menulis dan coding (ChatGPT, Copilot) adalah <strong>copilot, bukan pengganti</strong> — tetap perlu pemahaman dan verifikasi.</>,
        <>Waspadai <strong>bias, hallucination, hak cipta, dan privasi</strong> — gunakan AI secara bertanggung jawab dan selalu verifikasi output.</>,
        <><strong>Integritas akademik</strong>: ungkapkan, kutip, dan verifikasi penggunaan AI, serta simpan bukti proses — detektor AI bukan bukti yang andal.</>,
      ]} />

      <ReferencesSlide refs={[
        <>Google. (2025). "Gemini Apps Help." <em>support.google.com/gemini</em></>,
        <>American Psychological Association. (2025). "Citing generative AI in APA Style." <em>apastyle.apa.org/blog/cite-generative-ai-references</em></>,
        <>Liang, W., dkk. (2023). "GPT detectors are biased against non-native English writers." <em>Patterns</em>. <em>arXiv:2304.02819</em></>,
        <>Buolamwini, J. & Gebru, T. (2018). "Gender Shades." <em>Proceedings of Machine Learning Research</em>, 81, 77–91.</>,
        <>Ji, Z., dkk. (2023). "Survey of hallucination in natural language generation." <em>ACM Computing Surveys</em>. <em>arXiv:2202.03629</em></>,
        <>Kemendikbudristek. (2024). <em>Panduan Penggunaan Generative AI pada Pembelajaran di Perguruan Tinggi.</em></>,
        <>Republik Indonesia. (2022). <em>Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi.</em></>,
        <><em>Mata v. Avianca, Inc.</em> (S.D.N.Y. 2023). Sanksi atas rujukan putusan fiktif buatan ChatGPT.</>,
        <>OpenAI. (2025). "Prompt engineering." <em>developers.openai.com/api/docs/guides/prompt-engineering</em></>,
        <>National Institute of Standards and Technology. (2023). <em>Artificial Intelligence Risk Management Framework (AI RMF 1.0)</em> (NIST AI 100-1). <em>nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf</em></>,
        <>Miao, F., & Holmes, W. (2023). <em>Guidance for generative AI in education and research.</em> UNESCO. <em>unesdoc.unesco.org/ark:/48223/pf0000386693</em></>,
      ]} />

      <ClosingSlide lede={<>AI adalah alat yang sangat powerful — tapi yang membedakan adalah bagaimana kita menggunakannya: bijak, kritis, bertanggung jawab, dan jujur. Ungkapkan, verifikasi, dan pahami karya Anda.</>} quote={<>"By far the greatest danger of Artificial Intelligence is that people conclude too early that they understand it."</>} cite={<>— Eliezer Yudkowsky</>} next="Pertemuan 15: Review UAS"
        notes={"Topik pertemuan berikutnya: Review Materi 9–14 — Pengolah kata, pengolah angka, dan AI; Refleksi & Kuis 2 — Uji pemahaman menyeluruh; Persiapan UAS — Cakupan dan strategi."} />

    </>
  );
}
