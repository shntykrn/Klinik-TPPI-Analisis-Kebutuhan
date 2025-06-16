// controllers/rekamMedisController.js
const db = require('../config/db');

exports.getAllRekamMedis = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT rm.*, p.nama as nama_pasien FROM rekam_medis rm
       LEFT JOIN pasien p ON rm.id_pasien = p.id`
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data rekam medis', detail: error.message });
  }
};

exports.createRekamMedis = async (req, res) => {
  const { id_pasien, tanggal_pemeriksaan, keluhan, tensi, suhu, nadi, respirasi } = req.body;

  if (!id_pasien || !tanggal_pemeriksaan) {
    return res.status(400).json({ error: 'id_pasien dan tanggal pemeriksaan wajib diisi' });
  }

  try {
    const [result] = await db.execute(
      `INSERT INTO rekam_medis (id_pasien, tanggal_pemeriksaan, keluhan, tensi, suhu, nadi, respirasi)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id_pasien, tanggal_pemeriksaan, keluhan, tensi, suhu, nadi, respirasi]
    );

    res.status(201).json({ message: 'Rekam medis berhasil ditambahkan', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menambahkan rekam medis', detail: error.message });
  }
};

exports.deleteRekamMedis = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute('DELETE FROM rekam_medis WHERE id = ?', [id]);
    res.status(200).json({ message: 'Rekam medis berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus rekam medis', detail: error.message });
  }
};