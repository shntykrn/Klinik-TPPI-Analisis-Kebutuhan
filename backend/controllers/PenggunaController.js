const db = require('../config/db');
const bcrypt = require('bcrypt');

// ========================================
// REGISTRASI PASIEN
// ========================================
exports.LandingRegister = async (req, res) => {
  const {
    nik = '',
    nama = '',
    departemen = '',
    tanggalLahir = '',
    jenisKelamin = '',
    statusPerkawinan = '',
    alamat = '',
    statusPekerja = '',
    noTelepon = '',
    alergiObat = '',
    alergiDetail = '',
    namaPenanggungJawab = '',
    emergencyContact = ''
  } = req.body || {};

  // Logging untuk debug
  console.log('📦 DATA MASUK:', req.body);

  console.log("✅ nik:", nik, "| nama:", nama);
  console.log("📦 typeof nik:", typeof nik, "| typeof nama:", typeof nama);

  if (!nik || !nama || nik.trim() === '' || nama.trim() === '') {
    return res.status(400).json({ error: 'NIK dan Nama wajib diisi' });
  }

  try {
    const [existing] = await db.execute('SELECT * FROM pasien WHERE nik = ?', [nik]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'NIK sudah terdaftar sebagai pasien' });
    }

    await db.execute(`
      INSERT INTO pasien 
        (nik, nama, pt_mitra, tanggal_lahir, jenis_kelamin, alamat, status_pekerja,
         no_telepon, alergi_obat, nama_penanggung_jawab, kontak_darurat)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      nik,
      nama,
      departemen,
      tanggalLahir,
      jenisKelamin,
      alamat,
      statusPekerja,
      noTelepon,
      alergiObat === 'iya' ? alergiDetail : '',
      namaPenanggungJawab,
      emergencyContact
    ]);

    res.status(201).json({ message: 'Registrasi berhasil!' });
  } catch (err) {
    console.error('❌ Registrasi gagal:', err.message);
    res.status(500).json({ error: 'Registrasi gagal', detail: err.message });
  }
};

// ========================================
// LOGIN ADMIN (HARDCODED)
// ========================================
exports.login = async (req, res) => {
  const { nik, kata_sandi } = req.body;

  if (!nik || !kata_sandi) {
    return res.status(400).json({ error: 'NIK dan kata sandi wajib diisi' });
  }

  // Hardcoded akun admin
  const validNik = '123456789';
  const validPassword = '111111';

  if (nik !== validNik) {
    return res.status(404).json({ error: 'NIK tidak ditemukan' });
  }

  if (kata_sandi !== validPassword) {
    return res.status(401).json({ error: 'Kata sandi salah' });
  }

  res.status(200).json({
    message: 'Login berhasil',
    user: { id: 1, nama: 'Admin TPPI', nik: validNik }
  });
};
