const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM obat');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Gagal ambil data obat', detail: err.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute('SELECT * FROM obat WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Obat tidak ditemukan' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Gagal ambil data obat', detail: err.message });
  }
};

exports.create = async (req, res) => {
  const { nama_obat, stok } = req.body;

  if (!nama_obat) return res.status(400).json({ error: 'Nama obat wajib diisi' });

  try {
    await db.execute(
      'INSERT INTO obat (nama_obat, stok) VALUES (?, ?)',
      [nama_obat, stok || 0]
    );
    res.status(201).json({ message: 'Obat ditambahkan' });
  } catch (err) {
    res.status(500).json({ error: 'Gagal tambah obat', detail: err.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('DELETE FROM obat WHERE id = ?', [id]);
    res.json({ message: 'Obat dihapus' });
  } catch (err) {
    res.status(500).json({ error: 'Gagal hapus obat', detail: err.message });
  }
};

exports.uploadImage = async (req, res) => {
  const { nama_obat, kategori, stok, satuan, tanggal_kadaluarsa, deskripsi } = req.body;
  const gambar = req.file ? req.file.filename : null;

  console.log("📥 DATA YANG DITERIMA:");
  console.log("Body:", req.body);
  console.log("File:", req.file);

  if (!nama_obat || !stok || !satuan || !tanggal_kadaluarsa) {
    return res.status(400).json({ error: 'Field wajib belum lengkap' });
  }

  try {
    await db.execute(
      `INSERT INTO obat (nama_obat, kategori, stok, satuan, tanggal_kadaluarsa, deskripsi, gambar)
VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nama_obat, kategori, stok, satuan, tanggal_kadaluarsa, deskripsi, gambar]
    );
    res.status(201).json({ message: 'Obat berhasil ditambahkan' });
  } catch (err) {
    res.status(500).json({ error: 'Gagal tambah obat', detail: err.message });
  }
};

exports.tambahObatMasuk = async (req, res) => {
  const id = req.params.id;
  const { jumlah, keterangan } = req.body;

  if (!jumlah || jumlah <= 0) {
    return res.status(400).json({ error: "Jumlah harus lebih dari 0" });
  }

  try {
    // Update stok
    await db.query("UPDATE obat SET stok = stok + ? WHERE id = ?", [jumlah, id]);

    // Catat ke riwayat
    await db.query(
      "INSERT INTO riwayat_obat (id_obat, jumlah, keterangan, jenis, tanggal) VALUES (?, ?, ?, 'masuk', NOW())",
      [id, jumlah, keterangan]
    );

    res.json({ message: "Stok berhasil ditambahkan" });
  } catch (err) {
    console.error("❌ Gagal tambah obat:", err);
    res.status(500).json({ error: "Gagal tambah stok obat" });
  }
};

// Ambil stok obat (keluar) - Jika belum dibuat
exports.ambilObatKeluar = async (req, res) => {
  const id = req.params.id;
  const { jumlah, keterangan } = req.body;

  if (!jumlah || jumlah <= 0) {
    return res.status(400).json({ error: "Jumlah tidak valid" });
  }

  try {
    // Cek stok
    const [obat] = await db.query("SELECT stok FROM obat WHERE id = ?", [id]);
    if (obat.length === 0 || obat[0].stok < jumlah) {
      return res.status(400).json({ error: "Stok tidak mencukupi" });
    }

    // Kurangi stok
    await db.query("UPDATE obat SET stok = stok - ? WHERE id = ?", [jumlah, id]);

    // Catat ke riwayat
    await db.query(
      "INSERT INTO riwayat_obat (id_obat, jumlah, keterangan, jenis, tanggal) VALUES (?, ?, ?, 'keluar', NOW())",
      [id, jumlah, keterangan]
    );

    res.json({ message: "Obat berhasil diambil" });
  } catch (err) {
    console.error("❌ Gagal ambil obat:", err);
    // Decrement the stock
    res.status(500).json({ error: "Gagal ambil stok obat" });
  }
};    // Record the transaction in the history
