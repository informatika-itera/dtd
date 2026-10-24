import {
  AgendaSlide, ClosingSlide, TitleSlide,
} from '../layouts';
import {
  Callout, Card, Cards, ContentSlide, Para, RecapGrid, RecapPanel, Timer, TimelineBlock, TimelineItem,
} from '../layouts/blocks';

const agendaItems = [
  { title: "Rangkuman Pertemuan 1 & 2", desc: "Transformasi digital, hardware dan software, biner, serta gerbang logika" },
  { title: "Rangkuman Pertemuan 3 & 4", desc: "Internet, website, basis data, media sosial, aplikasi digital, dan etika" },
  { title: "Rangkuman Pertemuan 5 & 6", desc: "Data, keamanan siber, startup, AI, Industry 4.0, dan sustainability" },
  { title: "Refleksi & Kuis 1", desc: "Pertanyaan pemantik dan kuis terjadwal (maks. 50 menit)" },
];

export default function Pertemuan07() {
  return (
    <>
      <TitleSlide meeting={7} title="Review, Refleksi, Evaluasi & Kuis 1" lede="Mengingat dan menguji pemahaman materi Dasar Teknologi Digital dari pertemuan 1 hingga 6" />

      <ContentSlide title="Saatnya Merefleksikan Perjalanan" notes="Minta mahasiswa menyebut satu hal yang paling berkesan dari tiap pertemuan sebelum rangkuman dibuka.">
        <TimelineBlock>
          <TimelineItem era={<>Pertemuan 1</>} icon="devices"><p><strong>Dasar teknologi digital</strong><small>Digitalisasi · Von Neumann</small></p></TimelineItem>
          <TimelineItem era={<>Pertemuan 2</>} icon="memory"><p><strong>Bilangan dan logika</strong><small>Biner · gerbang logika</small></p></TimelineItem>
          <TimelineItem era={<>Pertemuan 3</>} icon="language"><p><strong>Internet dan web</strong><small>DNS · HTML · SQL</small></p></TimelineItem>
          <TimelineItem era={<>Pertemuan 4</>} icon="balance"><p><strong>Aplikasi dan etika</strong><small>e-Government · netiket</small></p></TimelineItem>
          <TimelineItem era={<>Pertemuan 5</>} icon="shield"><p><strong>Data dan keamanan</strong><small>Big data · 2FA</small></p></TimelineItem>
          <TimelineItem era={<>Pertemuan 6</>} icon="smart_toy" active><p><strong>Inovasi dan AI</strong><small>Startup · Industry 4.0</small></p></TimelineItem>
        </TimelineBlock>
        <Callout title={<>Kuis 1</>}>Uji pemahaman menyeluruh sebagai persiapan UTS.</Callout>
        <Para tone="caption">Semua materi Pertemuan 1–6 akan kita ingat kembali — lalu kita uji lewat kuis.</Para>
      </ContentSlide>

      <AgendaSlide title="Agenda Pertemuan" items={agendaItems} />

      <ContentSlide title="Rangkuman: Pertemuan 1 & 2">
        <RecapGrid>
          <RecapPanel n={1} title={<>Pengenalan Dasar Teknologi Digital</>} items={[
            <><strong>Digitisasi → digitalisasi → transformasi digital</strong> — dari bentuk analog hingga model bisnis baru</>,
            <><strong>Hardware & software</strong> — input, proses, penyimpanan, output; sistem operasi sebagai pengatur</>,
            <><strong>Arsitektur Von Neumann</strong> — CPU, memori, input/output, dan bus</>,
            <><strong>Arduino & sensor</strong> — jembatan dunia digital dan fisik</>,
          ]} />
          <RecapPanel n={2} tone="secondary" title={<>Sistem Bilangan Digital & Logika Digital</>} items={[
            <><strong>Biner</strong> — transistor hanya punya dua kondisi, ON (1) dan OFF (0)</>,
            <><strong>Konversi</strong> — desimal ↔ biner dengan bagi 2 dan bobot posisi</>,
            <><strong>Satuan data</strong> — bit, byte, KB, MB, GB (1 KB = 1.024 byte)</>,
            <><strong>Gerbang logika</strong> — AND, OR, NOT, XOR untuk mengambil keputusan</>,
          ]} />
        </RecapGrid>
      </ContentSlide>

      <ContentSlide title="Rangkuman: Pertemuan 3 & 4">
        <RecapGrid>
          <RecapPanel n={3} title={<>Internet, Website, Basis Data & Media Sosial</>} items={[
            <><strong>Internet</strong> — TCP/IP, DNS, router, dan paket data</>,
            <><strong>Cloud</strong> — penyimpanan dan komputasi online</>,
            <><strong>Website & basis data</strong> — HTML, CSS, JavaScript; SQL vs NoSQL</>,
            <><strong>Media sosial</strong> — dampaknya, literasi digital, dan keamanan akun</>,
          ]} />
          <RecapPanel n={4} tone="secondary" title={<>Aplikasi & Etika Teknologi Digital</>} items={[
            <><strong>Pendidikan digital</strong> — LMS, video conference, MOOC</>,
            <><strong>e-Government & e-Commerce</strong> — layanan publik dan perdagangan daring</>,
            <><strong>Bidang lain</strong> — telemedicine, precision farming, transportasi</>,
            <><strong>Etika digital</strong> — privasi, hak kekayaan intelektual, netiket, dan etika email</>,
          ]} />
        </RecapGrid>
      </ContentSlide>

      <ContentSlide title="Rangkuman: Pertemuan 5 & 6">
        <RecapGrid>
          <RecapPanel n={5} title={<>Data & Informasi di Era Digital</>} items={[
            <><strong>Data → informasi → pengetahuan</strong> — hierarki dan satuan data</>,
            <><strong>Big data 3V</strong> — Volume, Velocity, Variety</>,
            <><strong>Ancaman siber</strong> — malware, phishing, social engineering</>,
            <><strong>Perlindungan</strong> — 2FA dan backup 3-2-1</>,
          ]} />
          <RecapPanel n={6} tone="secondary" title={<>Inovasi, AI & Sustainability</>} items={[
            <><strong>Startup</strong> — dari ide, MVP, product-market fit, hingga pendanaan</>,
            <><strong>AI & machine learning</strong> — NLP, computer vision, robotika, sistem rekomendasi</>,
            <><strong>Industry 4.0 & 5.0</strong> — efisiensi, lalu kolaborasi manusia-mesin</>,
            <><strong>Sustainability</strong> — e-waste dan prinsip 3R</>,
          ]} />
        </RecapGrid>
      </ContentSlide>

      <ContentSlide title="Refleksi: Pertanyaan Pemantik">
        <Cards cols={4}>
          <Card icon="memory" title={<>Tentang Fondasi Digital</>}><p>Mengapa komputer hanya menggunakan bilangan biner, dan bagaimana hal ini mempengaruhi semua data yang kita gunakan sehari-hari?</p></Card>
          <Card icon="language" tone="secondary" title={<>Tentang Internet & Data</>}><p>Ketika kamu menggunakan media sosial, jenis data apa saja yang kamu hasilkan? Siapa yang mengelola data tersebut?</p></Card>
          <Card icon="shield" tone="tertiary" title={<>Tentang Keamanan</>}><p>Apa langkah konkrit yang sudah kamu lakukan untuk melindungi data pribadimu di dunia digital?</p></Card>
          <Card icon="balance" title={<>Tentang Etika & Masa Depan</>}><p>Bagaimana peran kita sebagai pengguna teknologi digital dalam menciptakan ekosistem digital yang aman dan bertanggung jawab?</p></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Kuis 1: Uji Pemahaman">
        <Timer note={<>Kuis dikerjakan maksimal <strong>50 menit</strong> — soal diberikan oleh dosen pengampu.</>} />
      </ContentSlide>

      <ClosingSlide title="Semangat UTS!" lede={<>Setelah UTS, kita akan masuk ke materi baru: <strong>pengolah kata dan pengolah angka</strong> untuk dokumen akademik dan profesional.</>} quote={<>"Success is the sum of small efforts, repeated day in and day out."</>} cite={<>— Robert Collier</>} next="Pertemuan 8: UTS"
        notes={"Topik pertemuan berikutnya: Ujian Tengah Semester — Cakupan materi Pertemuan 1–7; Persiapan — Review konsep dan latihan soal."} />

    </>
  );
}
