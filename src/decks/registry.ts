export type MeetingKind = 'teori' | 'review' | 'praktikum' | 'ujian';

export interface Meeting {
  number: number;
  title: string;
  desc: string;
  kind: MeetingKind;
  /** has a slide deck (UTS/UAS do not) */
  deck: boolean;
  /** published link on the dashboard; flip to true after audit */
  published: boolean;
}

export interface MeetingSection {
  title: string;
  desc: string;
  meetings: Meeting[];
}

export const SECTIONS: MeetingSection[] = [
  {
    title: "Bagian 1: Teori",
    desc: "Konsep dasar teknologi digital — dari transformasi digital hingga kecerdasan buatan.",
    meetings: [
      { number: 1, title: "Pengenalan Dasar Teknologi Digital", desc: "Konsep transformasi digital, sejarah evolusi, hardware & software, arsitektur Von Neumann, dampak di berbagai bidang.", kind: 'teori', deck: true, published: true },
      { number: 2, title: "Sistem Bilangan Digital & Logika Digital", desc: "Biner, oktal, heksadesimal, konversi antar sistem bilangan, gerbang logika dasar, aplikasi biner.", kind: 'teori', deck: true, published: true },
      { number: 3, title: "Internet, Website, Basis Data & Media Sosial", desc: "Cara kerja internet, cloud computing, anatomi website, database, evolusi media sosial, literasi digital.", kind: 'teori', deck: true, published: true },
      { number: 4, title: "Aplikasi & Etika Teknologi Digital", desc: "Teknologi di pendidikan, e-government, bisnis digital, etika penggunaan, hak & tanggung jawab digital.", kind: 'teori', deck: true, published: true },
      { number: 5, title: "Data & Informasi di Era Digital", desc: "Data vs informasi, big data, cybersecurity, malware, social engineering, 2FA, backup data.", kind: 'teori', deck: true, published: true },
      { number: 6, title: "Inovasi, AI & Sustainability", desc: "Kewirausahaan digital Indonesia, pengantar AI & machine learning, e-waste, green AI.", kind: 'teori', deck: true, published: true },
    ],
  },
  {
    title: "Bagian 2: Review & Ujian Tengah Semester",
    desc: "Rangkuman materi, evaluasi pemahaman, dan ujian tengah semester.",
    meetings: [
      { number: 7, title: "Review, Refleksi, Evaluasi & Kuis 1", desc: "Rangkuman materi pertemuan 1–6, refleksi pembelajaran, dan kuis pemahaman.", kind: 'review', deck: true, published: true },
      { number: 8, title: "Ujian Tengah Semester (UTS)", desc: "Ujian tertulis mencakup materi pertemuan 1–7. Tidak ada slide — persiapkan diri Anda!", kind: 'ujian', deck: false, published: false },
    ],
  },
  {
    title: "Bagian 3: Praktikum",
    desc: "Keterampilan pengolah kata, pengolah angka, dan AI tools hingga tingkat menengah — standar literasi digital mahasiswa dan lulusan ITERA.",
    meetings: [
      { number: 9, title: "Pengolah Kata Bagian 1", desc: "Google Docs (cadangan: Word) — format teks, layout halaman, objek, page/section break, shortcut, templat unduhan.", kind: 'praktikum', deck: true, published: true },
      { number: 10, title: "Pengolah Kata Bagian 2", desc: "Header & footer, daftar isi otomatis, sitasi & daftar pustaka, watermark, kolaborasi, dokumen berulang dengan templat, aksesibilitas.", kind: 'praktikum', deck: true, published: true },
      { number: 11, title: "Pengolah Angka Bagian 1", desc: "Google Sheets (cadangan: Excel) — format, sort & filter, validasi data, proteksi, rumus dasar, grafik, data unduhan.", kind: 'praktikum', deck: true, published: true },
      { number: 12, title: "Pengolah Angka Bagian 2", desc: "Fungsi kondisi: IF, COUNTIF, SUMIF. Pencarian: VLOOKUP, HLOOKUP, INDEX & MATCH, dengan data penjualan unduhan.", kind: 'praktikum', deck: true, published: true },
      { number: 13, title: "Pengolah Angka Bagian 3", desc: "Fungsi teks & tanggal, pivot table, merapikan data mentah, pemformatan bersyarat, dan IFERROR.", kind: 'praktikum', deck: true, published: true },
      { number: 14, title: "Aplikasi Kecerdasan Buatan", desc: "Prompt engineering, Google Gemini, Scispace untuk riset, image generative, etika & batasan AI, serta integritas akademik.", kind: 'praktikum', deck: true, published: true },
    ],
  },
  {
    title: "Bagian 4: Review & Ujian Akhir Semester",
    desc: "Rangkuman materi praktikum, kuis 2, dan ujian akhir semester.",
    meetings: [
      { number: 15, title: "Review, Refleksi, Evaluasi & Kuis 2", desc: "Rangkuman materi pertemuan 9–14, refleksi pembelajaran, dan kuis pemahaman.", kind: 'review', deck: true, published: true },
      { number: 16, title: "Ujian Akhir Semester (UAS)", desc: "Ujian tertulis & praktik mencakup seluruh materi perkuliahan. Semoga sukses!", kind: 'ujian', deck: false, published: false },
    ],
  },
];
