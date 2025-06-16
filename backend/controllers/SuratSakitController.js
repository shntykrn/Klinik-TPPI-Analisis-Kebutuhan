const db = require('../config/db');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
const path = require('path');

exports.createSuratSakit = async (req, res) => {
  try {
    const {
      id_pasien,
      departemen,
      jenis_izin,
      tanggal_mulai,
      tanggal_selesai,
      alasan,
    } = req.body;

    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'File surat (gambar/pdf) wajib diunggah' });
    }

    // Upload ke Cloudinary
    const uploadResult = await cloudinary.uploader.upload(file.path, {
      folder: 'surat_sakit',
      resource_type: 'auto',
    });

    // Hapus file lokal setelah upload
    fs.unlinkSync(file.path);

    const imageUrl = uploadResult.secure_url;

    // Simpan ke database
    const [insertResult] = await db.execute(
      `INSERT INTO surat_sakit 
        (id_pasien, departemen, jenis_izin, tanggal_mulai, tanggal_selesai, alasan, gambar_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id_pasien, departemen, jenis_izin, tanggal_mulai, tanggal_selesai, alasan, imageUrl]
    );

    res.status(201).json({
      message: 'Surat sakit berhasil ditambahkan',
      id: insertResult.insertId, // ← Ini penting untuk navigasi frontend
      imageUrl,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Gagal menyimpan surat sakit',
      detail: error.message,
    });
  }
};

exports.getAllSuratSakit = async (req, res) => {
  try {
    const [result] = await db.execute(`
      SELECT * FROM surat_sakit ORDER BY dibuat_pada DESC
    `);
    res.json(result);
  } catch (error) {
    console.error('Gagal mengambil surat sakit:', error);
    res.status(500).json({ error: 'Gagal mengambil data surat sakit' });
  }
};

exports.getSuratSakitById = async (req, res) => {
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

exports.deleteSuratSakit = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM surat_sakit WHERE id = ?', [id]);
    res.json({ message: 'Surat sakit berhasil dihapus' });
  } catch (error) {
    console.error('Gagal menghapus surat sakit:', error);
    res.status(500).json({ error: 'Gagal menghapus surat sakit' });
  }
};