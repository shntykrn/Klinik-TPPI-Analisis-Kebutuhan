// controllers/suratSakitController.js
const db = require('../config/db');
const cloudinary = require('../cloudinary/config');
const fs = require('fs');

exports.createSuratSakit = async (req, res) => {
  const { id_pasien, departemen, jenis_izin, tanggal_mulai, tanggal_selesai, alasan } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'File gambar surat sakit wajib diunggah' });
  }

  try {
    const result = await cloudinary.uploader.upload(file.path, { folder: 'surat_sakit' });
    fs.unlinkSync(file.path); // hapus file lokal setelah upload

    const imageUrl = result.secure_url;

    const [insertResult] = await db.execute(
      `INSERT INTO surat_sakit (id_pasien, departemen, jenis_izin, tanggal_mulai, tanggal_selesai, alasan, gambar_url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id_pasien, departemen, jenis_izin, tanggal_mulai, tanggal_selesai, alasan, imageUrl]
    );

    res.status(201).json({ message: 'Surat sakit berhasil ditambahkan', id: insertResult.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menyimpan surat sakit', detail: error.message });
  }
};