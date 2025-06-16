import React from "react";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import Layout from "./components/Layout";
import Login from "./routes/login";
import LandingRegister from "./routes/LandingRegister";
import RekamMedisPage from "./routes/RekamMedisPage";
import SuratSakitPage from "./routes/SuratSakitPage";
import BuatSurat from "./routes/BuatSuratSakit";
import LihatSurat from "./routes/LihatSurat";
import CetakSurat from "./routes/CetakSurat";
import UnduhSurat from "./routes/UnduhSurat"; 
import StokObatPage from "./routes/StokObatPage";

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Redirect "/" ke /login */}
          <Route index element={<Navigate to="/login" replace />} />

          {/* Login page tanpa Navbar */}
          <Route path="/login" element={<Login />} />

          {/* Halaman setelah login — dengan Navbar di dalam Layout */}
          <Route path="/" element={<Layout />}>
            <Route path="registrasi" element={<LandingRegister />} />
            <Route path="rekam-medis" element={<RekamMedisPage />} />
            <Route path="surat-sakit" element={<SuratSakitPage />} />
            <Route path="stok-obat" element={<StokObatPage />} />

            {/* Route untuk surat izin */}
            <Route path="buat-surat" element={<BuatSurat />} />
            <Route path="lihat-surat/:id" element={<LihatSurat />} />
            <Route path="cetak-surat/:id" element={<CetakSurat />} />
            <Route path="unduh-surat/:id" element={<UnduhSurat />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;