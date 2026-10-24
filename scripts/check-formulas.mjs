// Uji rumus contoh di slide dengan mesin spreadsheet nyata (LibreOffice headless) — bukan sekadar membaca teks.
// Tiap kasus: rumus (sintaks en-US, pemisah ",") + hasil yang diklaim di slide. Gagal bila hasil hitung ≠ klaim.
// Pakai: bun run check:formulas   (perlu `soffice` di PATH). Catatan: ini membuktikan SEMANTIK fungsi, bukan menu Google/Microsoft.
import ExcelJS from 'exceljs';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const work = mkdtempSync(join(tmpdir(), 'dtd-formulas-'));
const wb = new ExcelJS.Workbook();
const d = wb.addWorksheet('Data');
d.addRows([['Kode', 'Produk', 'Harga'], ['P001', 'Laptop', 8500000], ['P002', 'Mouse', 150000], ['P003', 'Keyboard', 350000]]);          // A1:C4 (Pertemuan 12, VLOOKUP)
[['', 'Matematika', 'Fisika', 'Kimia'], ['UTS', 85, 78, 90], ['UAS', 92, 80, 88]].forEach((r, i) => r.forEach((v, j) => (d.getCell(i + 1, 5 + j).value = v))); // E1:H3 (HLOOKUP)
[['Nama', 'ID'], ['Budi', 101], ['Ani', 102], ['Citra', 103]].forEach((r, i) => r.forEach((v, j) => (d.getCell(i + 1, 11 + j).value = v)));       // K1:L4 (INDEX/MATCH)
[70, 85, 60, 90, 75].forEach((v, i) => (d.getCell(i + 2, 14).value = v));                                                                          // N2:N6 (COUNTIF)
[['Produk', 'Kategori', 'Total'], ['Laptop', 'Komputer', 100], ['Laptop', 'Komputer', 50], ['Mouse', 'Aksesoris', 10], ['Laptop', 'Komputer', 25], ['Mouse', 'Komputer', 5]]
  .forEach((r, i) => r.forEach((v, j) => (d.getCell(i + 1, 16 + j).value = v)));                                                                    // P1:R6 (SUMIF)
d.getCell('T1').value = 'a'; d.getCell('U1').value = 'b'; d.getCell('T2').value = ' sari  wulandari '; d.getCell('T3').value = 'sari WULANDARI';

const nested = (n) => `IF(${n}>=85,"A",IF(${n}>=70,"B",IF(${n}>=55,"C","D")))`;
const cases = [
  ['LEFT (P13)', 'LEFT("Jakarta",3)', 'Jak'], ['RIGHT (P13)', 'RIGHT("Jakarta",3)', 'rta'], ['MID (P13)', 'MID("Jakarta",2,3)', 'aka'],
  ['LEN (P13)', 'LEN("Excel")', '5'], ['TEXT (P13, locale en-US)', 'TEXT(1234,"#,##0")', '1,234'], ['& (P13)', 'Data!T1&" "&Data!U1', 'a b'],
  ['Cek Cepat LEFT&RIGHT', 'LEFT("Sumatera",3)&"-"&RIGHT("Sumatera",3)', 'Sum-era'],
  ['YEAR', 'YEAR(DATE(2026,8,5))', '2026'], ['MONTH', 'MONTH(DATE(2026,8,5))', '8'], ['DAY', 'DAY(DATE(2026,8,5))', '5'], ['WEEKDAY (Rabu=4)', 'WEEKDAY(DATE(2026,8,5))', '4'],
  ['TRIM', 'TRIM(" sari  wulandari ")', 'sari wulandari'], ['PROPER', 'PROPER("sari WULANDARI")', 'Sari Wulandari'],
  ['PROPER(TRIM)', 'PROPER(TRIM(Data!T2))', 'Sari Wulandari'], ['UPPER', 'UPPER("qris")', 'QRIS'], ['SUBSTITUTE', 'SUBSTITUTE("0812-34","-","")', '081234'],
  ['IF (P12)', 'IF(70>=70,"Lulus","Tidak Lulus")', 'Lulus'], ['Nested IF 90', nested(90), 'A'], ['Nested IF 75', nested(75), 'B'],
  ['Cek Cepat nested 60', nested(60), 'C'], ['Nested IF 40', nested(40), 'D'],
  ['COUNTIF >=70', 'COUNTIF(Data!N2:N6,">=70")', '4'], ['SUMIF Laptop', 'SUMIF(Data!P2:P6,"Laptop",Data!R2:R6)', '175'],
  ['COUNTIF Komputer', 'COUNTIF(Data!Q2:Q6,"Komputer")', '4'], ['VLOOKUP P002 kolom 3', 'VLOOKUP("P002",Data!A2:C4,3,FALSE)', '150000'],
  ['HLOOKUP Matematika baris 2 (UTS)', 'HLOOKUP("Matematika",Data!E1:H3,2,FALSE)', '85'],
  ['INDEX+MATCH', 'INDEX(Data!K2:K4,MATCH(102,Data!L2:L4,0))', 'Ani'],
  ['IFERROR(VLOOKUP) kode tak ada', 'IFERROR(VLOOKUP("M07",Data!A2:C4,2,FALSE),"Tidak ada")', 'Tidak ada'],
  ['Dirapikan: PROPER(TRIM) Budi', 'PROPER(TRIM("budi SANTOSO"))', 'Budi Santoso'], ['Dirapikan: PROPER(TRIM) Dewi', 'PROPER(TRIM("Dewi Lestari "))', 'Dewi Lestari'],
  ['Dirapikan: UPPER(TRIM) qris', 'UPPER(TRIM("qris "))', 'QRIS'], ['Relatif/absolut: A2*(1+$C$2)', '100000*(1+0.11)', '111000'],
  ['Pivot Marketing (200+250)', 'SUMIF(Data!P2:P6,"Laptop",Data!R2:R6)-175+200+250', '450'], ['Pivot Sales (300+320)', '300+320', '620'], ['Pivot IT (80+100)', '80+100', '180'],
  ['Filter >=80 menampilkan 2 baris', 'COUNTIF(Data!N2:N6,">=80")', '2'],
  ['IFS', '_xlfn.IFS(5>3,"x",TRUE,"y")', 'x'], ['COUNT', 'COUNT(Data!N2:N6)', '5'], ['COUNTA', 'COUNTA(Data!T1:T3,Data!U1)', '4'],
];
const t = wb.addWorksheet('Tests');
t.addRow(['id', 'formula', 'expected', 'actual']);
cases.forEach(([id, f, e], i) => { t.getCell(i + 2, 1).value = id; t.getCell(i + 2, 2).value = f; t.getCell(i + 2, 3).value = e; t.getCell(i + 2, 4).value = { formula: f }; });
await wb.xlsx.writeFile(join(work, 't.xlsx'));
execFileSync('soffice', ['--headless', '--convert-to', 'csv:Text - txt - csv (StarCalc):44,34,76,1,,0,false,true,false,false,false,2', '--outdir', work, join(work, 't.xlsx')], { stdio: 'ignore', timeout: 90000 });
const csv = readFileSync(join(work, readdirSync(work).find((f) => /Tests.*\.csv$/.test(f))), 'utf8');
const rows = csv.trim().split('\n').slice(1).map((l) => l.match(/("([^"]|"")*"|[^,]*)(,|$)/g).map((c) => c.replace(/,$/, '').replace(/^"|"$/g, '').replace(/""/g, '"')));
let bad = 0;
for (const r of rows) { const ok = r[2] === r[3]; if (!ok) bad++; console.log(`${ok ? '✓' : '✗'} ${r[0]}${ok ? '' : `  (klaim ${r[2]} ≠ hasil ${r[3]})`}`); }
rmSync(work, { recursive: true, force: true });
console.log(bad ? `\n${bad} kasus gagal.` : `\nOK: ${rows.length} rumus menghasilkan nilai yang diklaim slide.`);
process.exit(bad ? 1 : 0);
