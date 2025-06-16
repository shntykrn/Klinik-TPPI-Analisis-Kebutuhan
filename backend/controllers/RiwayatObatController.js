const db = require('../config/db');

exports.getRiwayatObat = async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT 
        ro.id,
        o.nama_obat AS name,
        ro.jumlah,
        o.satuan AS unit,
        ro.keterangan AS keterangan,
        ro.jenis,
        DATE_FORMAT(ro.tanggal, '%Y-%m-%d') AS tanggal
      FROM riwayat_obat ro
      JOIN obat o ON ro.id_obat = o.id
      ORDER BY ro.tanggal DESC
    `);
    res.json(results);
  } catch (err) {
    console.error("❌ Gagal ambil riwayat obat:", err);
    res.status(500).json({ error: "Gagal ambil riwayat obat" });
  }
};
