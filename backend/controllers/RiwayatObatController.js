// controllers/riwayatObatController.js
const db = require('../config/db');

exports.getAllRiwayatObat = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT ro.*, o.nama_obat FROM riwayat_obat ro
       LEFT JOIN obat o ON ro.id_obat = o.id`
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data riwayat obat', detail: error.message });
  }
};

exports.createRiwayatObat = async (req, res) => {
  const { id_obat, jenis, jumlah, keterangan } = req.body;

  if (!id_obat || !jenis || jumlah === undefined) {
    return res.status(400).json({ error: 'Semua field wajib diisi' });
  }

  try {
    await db.execute(
      `INSERT INTO riwayat_obat (id_obat, jenis, jumlah, keterangan)
       VALUES (?, ?, ?, ?)`,
      [id_obat, jenis, jumlah, keterangan]
    );

    // Update stok obat secara otomatis
    const stokChange = jenis === 'masuk' ? jumlah : -jumlah;
    await db.execute(
      'UPDATE obat SET stok = stok + ? WHERE id = ?',
      [stokChange, id_obat]
    );

    res.status(201).json({ message: 'Riwayat obat berhasil ditambahkan dan stok diperbarui' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menambahkan riwayat obat', detail: error.message });
  }
};
