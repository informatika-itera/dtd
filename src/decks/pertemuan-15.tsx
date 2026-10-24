import {
  AgendaSlide, ClosingSlide, TitleSlide,
} from '../layouts';
import {
  Callout, Card, Cards, ContentSlide, Para, RecapGrid, RecapPanel, Timer, TimelineBlock, TimelineItem,
} from '../layouts/blocks';

const agendaItems = [
  { title: "Rangkuman Pertemuan 9 & 10", desc: "Format dokumen, struktur, sitasi, dan kolaborasi di pengolah kata" },
  { title: "Rangkuman Pertemuan 11 & 12", desc: "Format sel, rumus dasar, grafik, fungsi kondisi, dan pencarian data" },
  { title: "Rangkuman Pertemuan 13 & 14", desc: "Pivot, perapihan data, prompt engineering, dan integritas akademik" },
  { title: "Refleksi & Kuis 2", desc: "Pertanyaan pemantik dan kuis terjadwal (maks. 50 menit)" },
];

export default function Pertemuan15() {
  return (
    <>
      <TitleSlide meeting={15} title="Review, Refleksi, Evaluasi & Kuis 2" lede="Mengingat dan menguji pemahaman materi praktikum Pengolah Kata, Pengolah Angka, dan AI dari pertemuan 9 hingga 14" />

      <ContentSlide title="Saatnya Merefleksikan Perjalanan" notes="Minta mahasiswa menyebut satu keterampilan dari tiap pertemuan yang sudah mereka pakai di luar kelas.">
        <TimelineBlock>
          <TimelineItem era={<>Pertemuan 9</>} icon="description"><p><strong>Dasar pengolah kata</strong><small>Format · layout</small></p></TimelineItem>
          <TimelineItem era={<>Pertemuan 10</>} icon="edit_document"><p><strong>Dokumen terstruktur</strong><small>Daftar isi · sitasi</small></p></TimelineItem>
          <TimelineItem era={<>Pertemuan 11</>} icon="table_chart"><p><strong>Dasar spreadsheet</strong><small>Rumus · grafik</small></p></TimelineItem>
          <TimelineItem era={<>Pertemuan 12</>} icon="functions"><p><strong>Kondisi dan pencarian</strong><small><code>IF</code> · <code>VLOOKUP</code></small></p></TimelineItem>
          <TimelineItem era={<>Pertemuan 13</>} icon="pivot_table_chart"><p><strong>Pivot dan perapihan data</strong><small>Pivot · <code>TRIM</code></small></p></TimelineItem>
          <TimelineItem era={<>Pertemuan 14</>} icon="smart_toy" active><p><strong>AI dan integritas</strong><small>Prompt · etika</small></p></TimelineItem>
        </TimelineBlock>
        <Callout title={<>Kuis 2</>}>Uji pemahaman Pertemuan 9–14 (maks. 50 menit).</Callout>
        <Para tone="caption">Semua materi Pertemuan 9–14 akan kita ingat kembali — lalu kita uji lewat kuis.</Para>
      </ContentSlide>

      <AgendaSlide title="Agenda Pertemuan" items={agendaItems} />

      <ContentSlide title="Rangkuman: Pertemuan 9 & 10">
        <RecapGrid>
          <RecapPanel n={9} title={<>Pengolah Kata Bagian 1</>} items={[
            <><strong>Satu konsep, banyak aplikasi</strong> — Google Docs (utama), Word (cadangan), berkas <code>.docx</code></>,
            <><strong>Format & layout</strong> — font, perataan, margin, orientasi, kertas A4</>,
            <><strong>Objek & pemisah</strong> — gambar, tabel, page break, section break</>,
            <><strong>Styles & Heading</strong> — struktur dokumen, Find & Replace, pintasan</>,
          ]} />
          <RecapPanel n={10} tone="secondary" title={<>Pengolah Kata Bagian 2</>} items={[
            <><strong>Header, footer, nomor halaman</strong> — <em>Different first page</em>, section break</>,
            <><strong>Daftar isi & sitasi</strong> — Heading 1–3 lalu Refresh; APA, MLA, Chicago</>,
            <><strong>Kolaborasi</strong> — komentar, Suggesting, templat, ekspor PDF</>,
            <><strong>Aksesibilitas</strong> — teks alternatif dan tautan bermakna</>,
          ]} />
        </RecapGrid>
      </ContentSlide>

      <ContentSlide title="Rangkuman: Pertemuan 11 & 12">
        <RecapGrid>
          <RecapPanel n={11} title={<>Pengolah Angka Bagian 1</>} items={[
            <><strong>Sel, baris, kolom, sheet</strong> — alamat sel seperti <code>A1</code></>,
            <><strong>Format sel, sortir & filter</strong> — filter menyembunyikan baris</>,
            <><strong>Validasi data & proteksi</strong> — cegah input salah dan perubahan tak sengaja</>,
            <><strong>Rumus dasar</strong> — <code>SUM</code>, <code>AVERAGE</code>; referensi relatif vs absolut (<code>$</code>); grafik</>,
          ]} />
          <RecapPanel n={12} tone="secondary" title={<>Pengolah Angka Bagian 2</>} items={[
            <><strong>IF dan Nested IF</strong> — keputusan otomatis</>,
            <><strong>COUNTIF & SUMIF</strong> — menghitung dan menjumlah baris yang cocok</>,
            <><strong>VLOOKUP & HLOOKUP</strong> — mencari ke bawah atau ke samping</>,
            <><strong>INDEX + MATCH</strong> — mencari tanpa batas kolom pertama</>,
          ]} />
        </RecapGrid>
      </ContentSlide>

      <ContentSlide title="Rangkuman: Pertemuan 13 & 14">
        <RecapGrid>
          <RecapPanel n={13} title={<>Pengolah Angka Bagian 3</>} items={[
            <><strong>Fungsi teks & tanggal</strong> — <code>LEFT</code>, <code>MID</code>, <code>TODAY</code>, <code>YEAR</code></>,
            <><strong>Pivot table</strong> — Rows, Columns, Values, Filters</>,
            <><strong>Merapikan data</strong> — <code>TRIM</code>, <code>PROPER</code>, hapus duplikat, pisahkan teks</>,
            <><strong>Pemformatan bersyarat & <code>IFERROR</code></strong> — pahami galat dulu</>,
          ]} />
          <RecapPanel n={14} tone="secondary" title={<>Aplikasi Kecerdasan Buatan</>} items={[
            <><strong>Prompt engineering</strong> — spesifik, konteks, format, iterasi</>,
            <><strong>Alat AI</strong> — Gemini, Scispace, gambar, menulis, coding sebagai copilot</>,
            <><strong>Etika & limitasi</strong> — halusinasi, bias, privasi, hak cipta</>,
            <><strong>Integritas akademik</strong> — ungkapkan, kutip, verifikasi, simpan bukti proses</>,
          ]} />
        </RecapGrid>
      </ContentSlide>

      <ContentSlide title="Refleksi: Pertanyaan Pemantik">
        <Cards cols={4}>
          <Card icon="description" title={<>Tentang Dokumen</>}><p>Dokumen apa yang kamu buat bulan ini yang akan lebih rapi jika memakai heading, daftar isi, atau templat?</p></Card>
          <Card icon="table_chart" tone="secondary" title={<>Tentang Data</>}><p>Data apa dari kegiatanmu (anggaran, nilai, jadwal) yang bisa diolah dengan rumus atau pivot? Bagaimana kamu memastikan hasilnya benar?</p></Card>
          <Card icon="smart_toy" tone="tertiary" title={<>Tentang AI</>}><p>Bagian mana dari tugasmu yang boleh dibantu AI, dan bagian mana yang harus tetap hasil pemikiranmu sendiri?</p></Card>
          <Card icon="task_alt" title={<>Tentang Kebiasaan</>}><p>Satu kebiasaan apa (menyimpan bukti proses, memeriksa sumber, memberi nama berkas) yang akan kamu terapkan mulai sekarang?</p></Card>
        </Cards>
      </ContentSlide>

      <ContentSlide title="Kuis 2: Uji Pemahaman">
        <Timer note={<>Kuis dikerjakan maksimal <strong>50 menit</strong> — soal diberikan oleh dosen pengampu.</>} />
      </ContentSlide>

      <ClosingSlide title="Semangat UAS!" lede={<>Setelah UAS, perkuliahan Dasar Teknologi Digital selesai. Pastikan Anda memahami konsepnya dan bisa mempraktikkannya di aplikasi apa pun.</>} quote={<>"The future belongs to those who learn more skills and combine them in creative ways."</>} cite={<>— Robert Greene</>} next="Pertemuan 16: UAS"
        notes={"Topik pertemuan berikutnya: Ujian Akhir Semester — Cakupan seluruh materi perkuliahan; Persiapan — Review konsep dan latihan praktik."} />

    </>
  );
}
