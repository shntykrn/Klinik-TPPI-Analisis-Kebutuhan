const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Inisialisasi express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (jika ada upload)
app.use("/public/uploads", express.static(path.join(__dirname, "public/uploads")));

// Import routes
const imageRoutes = require('./routes/imageRoutes');
const penggunaRoutes = require('./routes/PenggunaRoutes');
const rekamMedisRoutes = require('./routes/RekamMedisRoutes');
const pasienRoutes = require('./routes/PasienRoutes');
const obatRoutes = require('./routes/ObatRoutes');
const suratSakitRoutes = require('./routes/SuratSakitRoutes'); // ⬅️ pastikan namanya sesuai dengan nama file routes/SuratSakit.js

// Gunakan routes
app.use('/api', imageRoutes);
app.use('/api/pengguna', penggunaRoutes);
app.use('/api/rekam-medis', rekamMedisRoutes);
app.use('/api/pasien', pasienRoutes);
app.use('/api/obat', obatRoutes);
app.use('/api/surat-sakit', suratSakitRoutes);

// Tes koneksi database
const db = require('./config/db');
db.getConnection()
  .then(() => console.log('✅ Database connected!'))
  .catch((err) => console.error('❌ DB connection failed:', err));

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
