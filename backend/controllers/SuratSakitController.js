const db = require('../config/db');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const moment = require('moment');

const createSuratSakit = async (req, res) => {
  try {
    const {
      id_pasien,
      nama,
      nik,
      departemen,
      jenis_izin,
      tanggal_mulai,
      tanggal_selesai,
      alasan,
    } = req.body;

    // Validasi input
    if (
      !id_pasien ||
      !nama ||
      !nik ||
      !departemen ||
      !jenis_izin ||
      !tanggal_mulai ||
      !tanggal_selesai ||
      !alasan
    ) {
      return res.status(400).json({ error: 'Semua field wajib diisi' });
    }

    // Query INSERT tanpa alias
    const [insertResult] = await db.execute(
      `INSERT INTO surat_sakit 
        (id_pasien, nama, nik, departemen, jenis_izin, tanggal_mulai, tanggal_selesai, alasan)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id_pasien, nama, nik, departemen, jenis_izin, tanggal_mulai, tanggal_selesai, alasan]
    );

    res.status(201).json({
      message: 'Surat sakit berhasil ditambahkan',
      id: insertResult.insertId,
    });
  } catch (error) {
    console.error('Error saat menyimpan surat sakit:', error);
    res.status(500).json({
      error: 'Gagal menyimpan surat sakit',
      detail: error.message,
    });
  }
};

module.exports = {
  createSuratSakit,
  // tambahkan handler lainnya jika ada, seperti getAllSuratSakit, getSuratSakitById, dll
};


// Fungsi: Ambil semua surat
const getAllSuratSakit = async (req, res) => {
  try {
    const [result] = await db.execute(`
      SELECT 
        id,
        id_pasien,
        nama,
        nik,
        departemen,
        jenis_izin,
        alasan,
        tanggal_mulai,
        tanggal_selesai,
        dibuat_pada
      FROM surat_sakit
      ORDER BY dibuat_pada DESC
    `);
    res.json(result);
  } catch (error) {
    console.error('Gagal mengambil surat sakit:', error);
    res.status(500).json({ error: 'Gagal mengambil data surat sakit' });
  }
};


// Fungsi: Ambil surat berdasarkan ID
const getSuratSakitById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute('SELECT * FROM surat_sakit WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Surat sakit tidak ditemukan' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Gagal mengambil surat sakit:', error);
    res.status(500).json({ error: 'Gagal mengambil surat sakit' });
  }
};

// Fungsi: Hapus surat
const deleteSuratSakit = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM surat_sakit WHERE id = ?', [id]);
    res.json({ message: 'Surat sakit berhasil dihapus' });
  } catch (error) {
    console.error('Gagal menghapus surat sakit:', error);
    res.status(500).json({ error: 'Gagal menghapus surat sakit' });
  }
};

// Fungsi: Unduh surat berdasarkan ID
const unduhSuratSakit = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.execute(
      'SELECT * FROM surat_sakit WHERE id = ?',
      [id]
    );

    if (result.length === 0) {
      return res.status(404).json({ error: 'Surat tidak ditemukan' });
    }

    const surat = result[0];
    const doc = new PDFDocument();

    res.setHeader('Content-Disposition', `attachment; filename="surat-${id}.pdf"`);
    res.setHeader('Content-Type', 'application/pdf');

    doc.pipe(res);

    // Isi PDF
    doc.fontSize(16).text('PT. Contoh Sejahtera', { align: 'center' });
    doc.fontSize(12).text('Jl. Mawar No. 123, Surabaya', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text('SURAT KETERANGAN SAKIT', { align: 'center', underline: true });
    doc.moveDown();
    doc.text(`Nomor: .../SKS/2025`, { align: 'center' });
    doc.moveDown();

    doc.fontSize(12).text('Yang bertanda tangan di bawah ini menerangkan bahwa:');
    doc.moveDown();
    doc.text(`Nama       : ${surat.nama}`);
    doc.text(`NIK        : ${surat.nik}`);
    doc.text(`Departemen : ${surat.departemen}`);
    doc.text(`Jenis Izin  : ${surat.jenis_izin}`);
    doc.moveDown();
    doc.text(`Telah diberikan izin sakit dari tanggal ${moment(surat.tanggal_mulai).format('DD-MM-YYYY')} sampai ${moment(surat.tanggal_selesai).format('DD-MM-YYYY')}.`);
    doc.moveDown();
    doc.text('Demikian surat ini dibuat untuk digunakan sebagaimana mestinya.');
    doc.moveDown();

    doc.text(`Surabaya, ${moment().format('DD-MM-YYYY')}`, { align: 'right' });
    doc.moveDown();
    doc.moveDown();
    doc.text('_________________________', { align: 'right' });
    doc.text('Petugas HRD / Dokter', { align: 'right' });

    doc.end();
  } catch (error) {
    console.error('Gagal mengunduh surat:', error);
    res.status(500).json({ error: 'Gagal mengunduh surat' });
  }
};

const cetakSuratSakit = (req, res) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename=surat.pdf');
  doc.pipe(res);

  doc.fontSize(20).text('Surat Keterangan Sakit', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Nama: Budi`, { align: 'left' });
  // Tambah data lainnya...

  doc.end();
};

// ✅ Export semua fungsi di sini
module.exports = {
  createSuratSakit,
  getAllSuratSakit,
  getSuratSakitById,
  deleteSuratSakit,
  unduhSuratSakit,
  cetakSuratSakit
};
