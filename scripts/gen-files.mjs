// Generates the downloadable support files (templates + base spreadsheets) used by the praktikum decks.
// Run: node scripts/gen-files.mjs   → slides/public/files/*  and  src/files-manifest.ts
// Formats are .docx / .xlsx so they open in Google Docs/Sheets (upload → open) and in Microsoft Word/Excel alike.
import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  AlignmentType, Document, Footer, Header, HeadingLevel, Packer, PageNumber, Paragraph, Table, TableCell, TableRow,
  TextRun, WidthType, BorderStyle,
} from 'docx';
import ExcelJS from 'exceljs';

const root = resolve(import.meta.dirname, '..');
const outDir = resolve(root, 'slides/public/files');
mkdirSync(outDir, { recursive: true });
const manifest = [];
const cm = (v) => Math.round(v * 567); // cm → twips

const register = (file, label, kind, desc) => {
  const bytes = statSync(resolve(outDir, file)).size;
  manifest.push({ file, label, kind, desc, bytes });
  console.log(`${file}  ${(bytes / 1024).toFixed(1)} KB`);
};

// ------------------------------------------------------------------ Word templates
const FONT = 'Arial';
const baseStyles = {
  default: { document: { run: { font: FONT, size: 22 }, paragraph: { spacing: { after: 120, line: 300 } } } },
  paragraphStyles: [
    { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 32, bold: true, color: '9E1B3A' }, paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 0 } },
    { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 26, bold: true, color: '222222' }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 1 } },
    { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { font: FONT, size: 23, bold: true, color: '444444' }, paragraph: { spacing: { before: 160, after: 80 }, outlineLevel: 2 } },
    { id: 'Hint', name: 'Petunjuk', basedOn: 'Normal', run: { font: FONT, size: 20, italics: true, color: '6A6A6A' } },
  ],
};
const hint = (t) => new Paragraph({ style: 'Hint', children: [new TextRun(t)] });
const p = (t) => new Paragraph({ children: [new TextRun(t)] });
const h = (t, level = HeadingLevel.HEADING_1) => new Paragraph({ text: t, heading: level });
const a4 = (m) => ({ page: { size: { width: 11906, height: 16838 }, margin: m } });

// P9 — blank-but-prepared starter for "Dokumen Digital Pertama": ITERA-style margins (atas 3, bawah 3, kiri 4, kanan 3 cm)
{
  const doc = new Document({
    creator: 'Dasar Teknologi Digital — ITERA', title: 'Templat Dokumen — Pertemuan 9', styles: baseStyles,
    sections: [{
      properties: a4({ top: cm(3), bottom: cm(3), left: cm(4), right: cm(3) }),
      children: [
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [new TextRun({ text: 'DASAR TEKNOLOGI DIGITAL', bold: true, size: 20, color: '6A6A6A' })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 240 }, children: [new TextRun({ text: 'Dokumen Digital Pertama', bold: true, size: 40 })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Nama: [NAMA]   ·   NIM: [NIM]   ·   Tanggal: [TANGGAL]', size: 22 })] }),
        h('Manfaat Teknologi Digital dalam Perkuliahan'),
        hint('Petunjuk: tulis 3–5 kalimat di bawah judul ini. Judul bagian memakai Heading 1; paragraf memakai Normal text 11–12 pt. Hapus semua petunjuk berhuruf miring sebelum dikumpulkan.'),
        p('[Tulis paragraf Anda di sini.]'),
        h('Daftar Mata Kuliah', HeadingLevel.HEADING_2),
        hint('Sisipkan tabel minimal 3 kolom × 2 baris (judul + data) di bawah ini: Insert → Table.'),
        p(''),
        h('Gambar Pendukung', HeadingLevel.HEADING_2),
        hint('Sisipkan 1 gambar dengan perataan Wrap text, lalu tebalkan kata kunci dan beri highlight pada istilah penting.'),
        p(''),
      ],
    }],
  });
  writeFileSync(resolve(outDir, 'dtd-p09-templat-dokumen.docx'), await Packer.toBuffer(doc));
  register('dtd-p09-templat-dokumen.docx', 'Templat Dokumen Digital Pertama', 'DOCX', 'Halaman A4, margin 3-3-4-3 cm, Heading 1–3 sudah diatur, kolom nama & NIM.');
}

// P10 — structured report skeleton (header/footer/page numbers, headings, citation placeholders)
{
  const doc = new Document({
    creator: 'Dasar Teknologi Digital — ITERA', title: 'Templat Laporan — Pertemuan 10', styles: baseStyles,
    sections: [{
      properties: a4({ top: cm(3), bottom: cm(3), left: cm(4), right: cm(3) }),
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: '[JUDUL LAPORAN] — Dasar Teknologi Digital', size: 18, color: '6A6A6A' })] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ['Halaman ', PageNumber.CURRENT, ' dari ', PageNumber.TOTAL_PAGES], size: 18, color: '6A6A6A' })] })] }) },
      children: [
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 1200, after: 120 }, children: [new TextRun({ text: '[JUDUL LAPORAN]', bold: true, size: 44 })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, children: [new TextRun({ text: 'Disusun oleh [NAMA] ([NIM]) · Program Studi [PRODI] · Institut Teknologi Sumatera', size: 22, color: '444444' })] }),
        h('Daftar Isi'),
        hint('Letakkan kursor di bawah baris ini, lalu: Insert → Table of contents (Google Docs) atau References → Table of Contents (Word). Daftar isi terisi otomatis dari Heading 1–3.'),
        p(''),
        h('Pendahuluan'),
        p('[Latar belakang dan tujuan laporan. Sisipkan sitasi dengan Tools → Citations (Google Docs) atau References → Insert Citation (Word), misalnya (Penulis, Tahun).]'),
        h('Pembahasan'),
        h('Subbab Pertama', HeadingLevel.HEADING_2),
        p('[Isi pembahasan. Gunakan Heading 2 untuk subbab.]'),
        h('Subbab Kedua', HeadingLevel.HEADING_2),
        p('[Isi pembahasan.]'),
        h('Penutup'),
        p('[Kesimpulan singkat.]'),
        h('Daftar Pustaka'),
        hint('Petunjuk: sisipkan daftar pustaka otomatis (Insert bibliography / References → Bibliography) di bawah ini.'),
        p(''),
      ],
    }],
  });
  writeFileSync(resolve(outDir, 'dtd-p10-templat-laporan.docx'), await Packer.toBuffer(doc));
  register('dtd-p10-templat-laporan.docx', 'Templat Laporan Terstruktur', 'DOCX', 'Header, nomor halaman “n dari N”, Heading 1–2, penanda daftar isi & daftar pustaka.');
}

// P10 — letter with placeholders (replaces mail merge: fill via Find & Replace, Ctrl+H)
{
  const cell = (t, bold = false) => new TableCell({ width: { size: 50, type: WidthType.PERCENTAGE }, children: [new Paragraph({ children: [new TextRun({ text: t, bold })] })] });
  const doc = new Document({
    creator: 'Dasar Teknologi Digital — ITERA', title: 'Templat Surat — Pertemuan 10', styles: baseStyles,
    sections: [{
      properties: a4({ top: cm(3), bottom: cm(3), left: cm(3), right: cm(3) }),
      children: [
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [new TextRun({ text: '[[NAMA_ORGANISASI]]', bold: true, size: 28 })] }),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 240 }, border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: '222222', space: 6 } }, children: [new TextRun({ text: 'Sekretariat: [[ALAMAT_SEKRETARIAT]]', size: 20, color: '444444' })] }),
        new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE } }, rows: [
          new TableRow({ children: [cell('Nomor : [[NOMOR_SURAT]]'), cell('[[KOTA]], [[TANGGAL_SURAT]]')] }),
          new TableRow({ children: [cell('Perihal : Undangan [[NAMA_KEGIATAN]]'), cell('')] }),
        ] }),
        p(''),
        p('Yth. [[NAMA_PENERIMA]]'),
        p('di [[TEMPAT_PENERIMA]]'),
        p(''),
        p('Dengan hormat,'),
        p('Sehubungan dengan akan dilaksanakannya [[NAMA_KEGIATAN]], kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada:'),
        new Paragraph({ indent: { left: cm(1) }, children: [new TextRun('Hari/Tanggal : [[HARI_TANGGAL_KEGIATAN]]')] }),
        new Paragraph({ indent: { left: cm(1) }, children: [new TextRun('Waktu : [[WAKTU]] WIB')] }),
        new Paragraph({ indent: { left: cm(1) }, children: [new TextRun('Tempat : [[TEMPAT_KEGIATAN]]')] }),
        p(''),
        p('Demikian undangan ini kami sampaikan. Atas perhatian dan kehadirannya, kami ucapkan terima kasih.'),
        p(''),
        p('Hormat kami,'),
        p(''),
        p(''),
        p('[[NAMA_PENANDATANGAN]]'),
        p('[[JABATAN_PENANDATANGAN]]'),
        new Paragraph({ spacing: { before: 400 }, children: [new TextRun({ text: 'Cara memakai: salin berkas ini untuk setiap penerima, lalu tekan Ctrl+H (Find & Replace) dan ganti setiap penanda [[…]] dengan data sebenarnya. Hapus paragraf petunjuk ini sebelum mengirim.', italics: true, size: 18, color: '6A6A6A' })] }),
      ],
    }],
  });
  writeFileSync(resolve(outDir, 'dtd-p10-templat-surat.docx'), await Packer.toBuffer(doc));
  register('dtd-p10-templat-surat.docx', 'Templat Surat Undangan', 'DOCX', 'Surat dengan penanda [[…]] untuk latihan Find & Replace dan dokumen berulang.');
}

// ------------------------------------------------------------------ Spreadsheets
const header = (ws, widths) => {
  const row = ws.getRow(1);
  row.font = { bold: true, color: { argb: 'FF222222' } };
  row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFD9D9' } };
  row.alignment = { vertical: 'middle' };
  widths.forEach((w, i) => { ws.getColumn(i + 1).width = w; });
};
const notes = (wb, lines) => {
  const ws = wb.addWorksheet('Petunjuk');
  ws.getColumn(1).width = 110;
  lines.forEach((t, i) => { const c = ws.getCell(i + 1, 1); c.value = t; if (i === 0) c.font = { bold: true, size: 14 }; c.alignment = { wrapText: true, vertical: 'top' }; });
  return ws;
};
const save = async (wb, file) => { await wb.xlsx.writeFile(resolve(outDir, file)); };
const D = (y, m, d) => new Date(Date.UTC(y, m - 1, d));

// P11 — Anggaran kegiatan: raw numbers on purpose (students format, calculate, sort, filter, validate, chart)
{
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Dasar Teknologi Digital — ITERA';
  const ws = wb.addWorksheet('Anggaran');
  ws.columns = ['No', 'Tanggal Beli', 'Item', 'Kategori', 'Jumlah', 'Harga Satuan', 'Status'].map((header_) => ({ header: header_ }));
  header(ws, [6, 14, 30, 16, 9, 14, 11]);
  const rows = [
    [D(2026, 9, 1), 'Spanduk kegiatan', 'Perlengkapan', 2, 175000, 'Lunas'],
    [D(2026, 9, 1), 'Nasi kotak', 'Konsumsi', 60, 25000, 'Lunas'],
    [D(2026, 9, 2), 'Air mineral gelas (dus)', 'Konsumsi', 5, 38000, 'Lunas'],
    [D(2026, 9, 2), 'Sewa sound system', 'Perlengkapan', 1, 750000, 'Belum'],
    [D(2026, 9, 3), 'Bensin kendaraan panitia', 'Transport', 4, 100000, 'Lunas'],
    [D(2026, 9, 3), 'Cetak sertifikat', 'Dokumentasi', 50, 3500, 'Belum'],
    [D(2026, 9, 4), 'Kamera sewa (hari)', 'Dokumentasi', 2, 300000, 'Lunas'],
    [D(2026, 9, 4), 'Snack peserta', 'Konsumsi', 60, 8000, 'Lunas'],
    [D(2026, 9, 5), 'Kertas HVS A4 (rim)', 'Perlengkapan', 3, 55000, 'Lunas'],
    [D(2026, 9, 5), 'Tiket parkir narasumber', 'Transport', 2, 15000, 'Lunas'],
    [D(2026, 9, 6), 'Honor narasumber', 'Lainnya', 2, 500000, 'Belum'],
    [D(2026, 9, 6), 'Dekorasi panggung', 'Perlengkapan', 1, 400000, 'Belum'],
    [D(2026, 9, 7), 'Cetak banner kecil', 'Dokumentasi', 6, 45000, 'Lunas'],
    [D(2026, 9, 7), 'Kopi & teh (paket)', 'Konsumsi', 3, 120000, 'Lunas'],
    [D(2026, 9, 8), 'Transport panitia lapangan', 'Transport', 5, 50000, 'Lunas'],
  ];
  rows.forEach((r, i) => ws.addRow([i + 1, ...r]));
  ws.getColumn(2).numFmt = 'yyyy-mm-dd';
  const par = wb.addWorksheet('Parameter');
  par.getColumn(1).width = 28; par.getColumn(2).width = 12;
  par.addRow(['Parameter', 'Nilai']); par.getRow(1).font = { bold: true };
  par.addRow(['PPN', 0.11]); par.getCell('B2').numFmt = '0%';
  par.addRow(['Anggaran maksimum', 10000000]);
  notes(wb, [
    'Anggaran Kegiatan Himpunan — data dasar Pertemuan 11',
    'Kolom Jumlah dan Harga Satuan sengaja belum diformat. Data bersifat fiktif untuk latihan.',
    '1) Format: Harga Satuan → Rupiah, Tanggal Beli → tanggal.   2) Tambah kolom Total = Jumlah × Harga Satuan, lalu kolom Total + PPN memakai referensi absolut ke Parameter!B2 ($).',
    '3) Hitung dengan SUM, AVERAGE, MAX, MIN pada kolom Total.   4) Urutkan (sort) berdasarkan Total terbesar, lalu filter Kategori = Konsumsi.',
    '5) Validasi data: kolom Kategori dan Status menjadi daftar pilihan (dropdown).   6) Buat grafik batang dari Item dan Total.   7) Lindungi (protect) lembar Parameter.',
    'Dibuka di Google Sheets: unggah berkas ke Google Drive → Buka dengan → Google Sheets. Cadangan: Microsoft Excel (offline).',
  ]);
  await save(wb, 'dtd-p11-data-anggaran.xlsx');
  register('dtd-p11-data-anggaran.xlsx', 'Data Dasar Anggaran Kegiatan', 'XLSX', '15 baris pengeluaran + parameter PPN untuk latihan format, rumus, sort/filter, validasi, dan grafik.');
}

// P12 — Data penjualan (same 5 rows as the case-study slide) + Master for lookups
{
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Dasar Teknologi Digital — ITERA';
  const ws = wb.addWorksheet('Penjualan');
  ws.columns = ['No', 'Tanggal', 'Produk', 'Kategori', 'Jumlah', 'Harga Satuan', 'Total'].map((header_) => ({ header: header_ }));
  header(ws, [6, 13, 20, 13, 9, 15, 15]);
  const sales = [
    [D(2026, 7, 1), 'Laptop ASUS', 'Komputer', 2, 8500000],
    [D(2026, 7, 1), 'Mouse Logitech', 'Aksesoris', 10, 150000],
    [D(2026, 7, 2), 'Keyboard Rexus', 'Aksesoris', 5, 350000],
    [D(2026, 7, 2), 'Monitor LG 24"', 'Komputer', 3, 2400000],
    [D(2026, 7, 3), 'Laptop ASUS', 'Komputer', 1, 8500000],
  ];
  sales.forEach((r, i) => {
    const row = ws.addRow([i + 1, ...r, null]);
    row.getCell(7).value = { formula: `E${i + 2}*F${i + 2}`, result: r[3] * r[4] };
  });
  ws.getColumn(2).numFmt = 'dd/mm/yyyy'; ws.getColumn(6).numFmt = '#,##0'; ws.getColumn(7).numFmt = '#,##0';
  const m = wb.addWorksheet('Master');
  m.columns = ['Produk', 'Kategori', 'Harga Satuan'].map((header_) => ({ header: header_ }));
  header(m, [20, 13, 15]);
  [['Laptop ASUS', 'Komputer', 8500000], ['Mouse Logitech', 'Aksesoris', 150000], ['Keyboard Rexus', 'Aksesoris', 350000], ['Monitor LG 24"', 'Komputer', 2400000]].forEach((r) => m.addRow(r));
  m.getColumn(3).numFmt = '#,##0';
  notes(wb, [
    'Data Penjualan — data dasar Pertemuan 12',
    'Lembar Penjualan memuat 5 transaksi (Total = Jumlah × Harga Satuan). Lembar Master memuat daftar produk untuk VLOOKUP / INDEX-MATCH.',
    'Latihan: (1) IF — tandai Total ≥ 5.000.000 sebagai "Besar".  (2) COUNTIF — jumlah transaksi kategori "Komputer".  (3) SUMIF — total pendapatan "Laptop ASUS".',
    '(4) VLOOKUP / INDEX-MATCH — ambil Harga Satuan dari lembar Master.  Pemisah argumen rumus bisa ; atau , tergantung pengaturan regional.',
    'Tambahkan 5 baris transaksi baru sendiri untuk menguji bahwa rumus Anda tetap benar.',
  ]);
  await save(wb, 'dtd-p12-data-penjualan.xlsx');
  register('dtd-p12-data-penjualan.xlsx', 'Data Dasar Penjualan', 'XLSX', 'Lembar Penjualan (5 transaksi) dan Master produk untuk IF, COUNTIF, SUMIF, dan lookup.');
}

// P13 — Messy transaction log: cleaning, text/date functions, pivot, conditional formatting, IFERROR
{
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Dasar Teknologi Digital — ITERA';
  const ws = wb.addWorksheet('Data Mentah');
  ws.columns = ['ID', 'Kasir', 'Kode - Menu', 'Tanggal', 'Jumlah', 'Harga', 'Metode Bayar', 'Status'].map((header_) => ({ header: header_ }));
  header(ws, [8, 16, 22, 13, 9, 11, 14, 11]);
  const raw = [
    ['T001', '  sari wulandari', 'M01 - Kopi Susu', D(2026, 10, 1), 2, 18000, 'QRIS', 'Selesai'],
    ['T002', 'BUDI santoso ', 'M02 - Teh Tarik', D(2026, 10, 1), 1, 15000, 'tunai', 'Selesai'],
    ['T003', 'sari wulandari', 'M03 - Roti Bakar', D(2026, 10, 1), 3, 20000, 'QRIS', 'Selesai'],
    ['T004', ' Dewi  Lestari', 'M01 - Kopi Susu', D(2026, 10, 2), 4, 18000, 'Tunai ', 'Selesai'],
    ['T005', 'BUDI santoso', 'M04 - Es Cokelat', D(2026, 10, 2), 2, 22000, 'qris', 'Batal'],
    ['T006', 'dewi lestari', 'M02 - Teh Tarik', D(2026, 10, 2), 2, 15000, 'TUNAI', 'Selesai'],
    ['T007', 'Sari Wulandari ', 'M05 - Nasi Goreng', D(2026, 10, 3), 1, 30000, 'QRIS', 'Selesai'],
    ['T008', 'budi santoso', 'M03 - Roti Bakar', D(2026, 10, 3), 5, 20000, 'Tunai', 'Selesai'],
    ['T009', 'Dewi Lestari', 'M05 - Nasi Goreng', D(2026, 10, 3), 2, 30000, 'QRIS ', ''],
    ['T010', ' sari wulandari', 'M06 - Mie Goreng', D(2026, 10, 4), 2, 28000, 'qris', 'Selesai'],
    ['T011', 'BUDI SANTOSO', 'M01 - Kopi Susu', D(2026, 10, 4), 6, 18000, 'Tunai', 'Selesai'],
    ['T012', 'dewi lestari', 'M04 - Es Cokelat', D(2026, 10, 4), 1, 22000, 'QRIS', 'Batal'],
    ['T013', 'Sari Wulandari', 'M02 - Teh Tarik', D(2026, 10, 5), 3, 15000, 'Tunai', 'Selesai'],
    ['T014', 'budi santoso', 'M07 - Kentang Goreng', D(2026, 10, 5), 2, 17000, 'qris', 'Selesai'],
    ['T015', ' Dewi Lestari ', 'M03 - Roti Bakar', D(2026, 10, 5), 4, 20000, 'TUNAI', 'Selesai'],
    ['T016', 'sari wulandari', 'M05 - Nasi Goreng', D(2026, 10, 6), 3, 30000, 'QRIS', 'Selesai'],
    ['T017', 'BUDI santoso', 'M01 - Kopi Susu', D(2026, 10, 6), 2, 18000, 'Tunai ', 'Selesai'],
    ['T018', 'dewi lestari', 'M06 - Mie Goreng', D(2026, 10, 6), 1, 28000, 'qris', 'Selesai'],
    ['T019', 'Sari Wulandari', 'M04 - Es Cokelat', D(2026, 10, 7), 2, 22000, 'QRIS', 'Selesai'],
    ['T020', 'budi santoso', 'M02 - Teh Tarik', D(2026, 10, 7), 4, 15000, 'Tunai', 'Selesai'],
    ['T021', 'Dewi Lestari', 'M05 - Nasi Goreng', D(2026, 10, 7), 2, 30000, 'QRIS', 'Selesai'],
    ['T022', 'sari wulandari', 'M03 - Roti Bakar', D(2026, 10, 8), 2, 20000, 'tunai', 'Selesai'],
    ['T023', 'BUDI santoso', 'M06 - Mie Goreng', D(2026, 10, 8), 3, 28000, 'QRIS', 'Selesai'],
    ['T024', 'dewi lestari', 'M01 - Kopi Susu', D(2026, 10, 8), 5, 18000, 'Tunai', 'Selesai'],
  ];
  raw.forEach((r) => ws.addRow(r));
  // exact duplicates of T003 and T011 (to practise Remove duplicates)
  ws.addRow(raw[2]); ws.addRow(raw[10]);
  ws.getColumn(4).numFmt = 'dd/mm/yyyy';
  const ref = wb.addWorksheet('Referensi');
  ref.columns = ['Kode', 'Kategori'].map((header_) => ({ header: header_ }));
  header(ref, [10, 14]);
  [['M01', 'Minuman'], ['M02', 'Minuman'], ['M03', 'Makanan'], ['M04', 'Minuman'], ['M05', 'Makanan'], ['M06', 'Makanan']].forEach((r) => ref.addRow(r)); // M07 intentionally missing → #N/A
  notes(wb, [
    'Log Transaksi Kafe — data mentah Pertemuan 13 (fiktif)',
    'Data sengaja berantakan: spasi berlebih, huruf besar/kecil tidak konsisten, metode bayar ditulis berbeda-beda, 2 baris ganda, 1 status kosong, dan kode M07 tidak ada di lembar Referensi.',
    '1) Rapikan Kasir (TRIM, PROPER) dan Metode Bayar (TRIM, UPPER).   2) Hapus baris ganda (Remove duplicates).   3) Pisahkan "Kode - Menu" menjadi dua kolom (Split text to columns / LEFT-MID).',
    '4) Tambah kolom Total (Jumlah × Harga) dan Bulan (MONTH).   5) Pivot table: total per Metode Bayar dan per Menu.',
    '6) Pemformatan bersyarat: sorot Status "Batal" dan Total ≥ 100.000.   7) Ambil Kategori dari lembar Referensi dengan VLOOKUP dibungkus IFERROR (hasil "Tidak ada" untuk kode yang tidak ditemukan).',
  ]);
  await save(wb, 'dtd-p13-data-mentah.xlsx');
  register('dtd-p13-data-mentah.xlsx', 'Data Mentah Transaksi Kafe', 'XLSX', '26 baris data berantakan + lembar Referensi untuk latihan pembersihan, pivot, dan IFERROR.');
}

// ------------------------------------------------------------------ manifest for the slide components
const ts = `// GENERATED by scripts/gen-files.mjs — do not edit by hand.
export interface SupportFile { file: string; label: string; kind: 'DOCX' | 'XLSX'; desc: string; bytes: number }
export const FILES: Record<string, SupportFile> = ${JSON.stringify(Object.fromEntries(manifest.map((m) => [m.file, m])), null, 2)};
`;
writeFileSync(resolve(root, 'src/files-manifest.ts'), ts);
