// controllers/obatController.js
const db = require('../config/db');

exports.getAllObat = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM obat');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data obat', detail: error.message });
  }
};

exports.createObat = async (req, res) => {
  const { nama_obat, stok } = req.body;

  if (!nama_obat || stok === undefined) {
    return res.status(400).json({ error: 'Nama obat dan stok wajib diisi' });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO obat (nama_obat, stok) VALUES (?, ?)',
      [nama_obat, stok]
    );

    res.status(201).json({ message: 'Obat berhasil ditambahkan', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menambahkan obat', detail: error.message });
  }
};

exports.updateObat = async (req, res) => {
  const { id } = req.params;
  const { nama_obat, stok } = req.body;

  try {
    const [result] = await db.execute(
      'UPDATE obat SET nama_obat = ?, stok = ? WHERE id = ?',
      [nama_obat, stok, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Obat tidak ditemukan' });
    }

    res.status(200).json({ message: 'Obat berhasil diperbarui' });
  } catch (error) {
    res.status(500).json({ error: 'Gagal memperbarui obat', detail: error.message });
  }
};
