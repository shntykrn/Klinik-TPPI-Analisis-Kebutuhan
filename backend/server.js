const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const imageRoutes = require('./routes/imageRoutes');
const penggunaRoutes = require('./routes/PenggunaRoutes');
const rekamMedisRoutes = require('./routes/RekamMedisRoutes');
const pasienRoutes = require('./routes/PasienRoutes');
const obatRoutes = require('./routes/ObatRoutes');
const path = require('path');

const db = require('./config/db'); 

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/public/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use('/api', imageRoutes);
app.use('/api/pengguna', penggunaRoutes);
app.use('/api/rekam-medis', rekamMedisRoutes);
app.use('/api/pasien', pasienRoutes);
app.use('/api/obat', obatRoutes);

// Test DB connection
db.getConnection()
  .then(() => console.log('✅ Database connected!'))
  .catch((err) => console.error('❌ DB connection failed:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
