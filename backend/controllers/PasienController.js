// controllers/pasienController.js
const db = require('../config/db');

exports.getAllPasien = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM pasien');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data pasien', detail: error.message });
  }
};

exports.createPasien = async (req, res) => {
  const {
    nik,
    nama,
    pt_mitra,
    tanggal_lahir,
    jenis_kelamin,
    alamat,
    status_pekerja,
    no_telepon,
    alergi_obat,
    nama_penanggung_jawab,
    kontak_darurat
  } = req.body;

  if (!nik || !nama) {
    return res.status(400).json({ error: 'NIK dan nama wajib diisi' });
  }

  try {
    const [existing] = await db.execute('SELECT * FROM pasien WHERE nik = ?', [nik]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Pasien dengan NIK ini sudah ada' });
    }

    const [result] = await db.execute(
      `INSERT INTO pasien (nik, nama, pt_mitra, tanggal_lahir, jenis_kelamin, alamat, status_pekerja, no_telepon, alergi_obat, nama_penanggung_jawab, kontak_darurat)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nik, nama, pt_mitra, tanggal_lahir, jenis_kelamin, alamat, status_pekerja, no_telepon, alergi_obat, nama_penanggung_jawab, kontak_darurat]
    );

    res.status(201).json({ message: 'Pasien berhasil ditambahkan', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menambahkan pasien', detail: error.message });
  }
};

exports.deletePasien = async (req, res) => {
  const { id } = req.params

  try {
    const [result] = await db.execute('DELETE FROM pasien WHERE id = ?', [id])
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Pasien tidak ditemukan' })
    }
    res.status(200).json({ message: 'Pasien berhasil dihapus' })
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus pasien', detail: error.message })
  }
}
