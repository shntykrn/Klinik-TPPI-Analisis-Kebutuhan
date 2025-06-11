// controllers/penggunaController.js
const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { nama, nik, kata_sandi } = req.body;

  if (!nama || !nik || !kata_sandi) {
    return res.status(400).json({ error: 'Semua field wajib diisi' });
  }

  try {
    const [existingUser] = await db.execute('SELECT * FROM pengguna WHERE nik = ?', [nik]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'NIK sudah terdaftar' });
    }

    const hashedPassword = await bcrypt.hash(kata_sandi, 10);
    await db.execute(
      'INSERT INTO pengguna (nama, nik, kata_sandi) VALUES (?, ?, ?)',
      [nama, nik, hashedPassword]
    );

    res.status(201).json({ message: 'Registrasi berhasil' });
  } catch (err) {
    res.status(500).json({ error: 'Registrasi gagal', detail: err.message });
  }
};

exports.login = async (req, res) => {
  const { nik, kata_sandi } = req.body;

  if (!nik || !kata_sandi) {
    return res.status(400).json({ error: 'NIK dan kata sandi wajib diisi' });
  }

  try {
    const [users] = await db.execute('SELECT * FROM pengguna WHERE nik = ?', [nik]);
    if (users.length === 0) {
      return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(kata_sandi, user.kata_sandi);
    if (!validPassword) {
      return res.status(401).json({ error: 'Kata sandi salah' });
    }

    res.status(200).json({ message: 'Login berhasil', user: { id: user.id, nama: user.nama, nik: user.nik } });
  } catch (err) {
    res.status(500).json({ error: 'Login gagal', detail: err.message });
  }
};
