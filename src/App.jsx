import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import Layout from "./components/Layout";

// Lazy load routes
const LoginPage = lazy(() => import("./routes/login"));
const RegisterPage = lazy(() => import("./routes/LandingRegister"));
const RekamMedisPage = lazy(() => import("./routes/RekamMedisPage"));
const SuratSakitPage = lazy(() => import("./routes/SuratSakitPage"));
const BuatSuratSakitPage = lazy(() => import("./routes/BuatSuratSakitPage"));
const StokObatPage = lazy(() => import("./routes/StokObatPage"));

// Tambahan surat izin
const BuatSurat = lazy(() => import("./routes/BuatSuratSakit"));
const LihatSurat = lazy(() => import("./routes/LihatSurat"));
const CetakSurat = lazy(() => import("./routes/CetakSurat"));
const UnduhSurat = lazy(() => import("./routes/UnduhSurat"));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/landing" element={<RegisterPage />} />

          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/rekam-medis" replace />} />
            <Route path="rekam-medis" element={<RekamMedisPage />} />
            <Route path="surat-sakit" element={<SuratSakitPage />} />
            <Route path="surat-sakit/baru" element={<BuatSuratSakitPage />} />
            <Route path="stok-obat" element={<StokObatPage />} />

            {/* Route untuk surat izin */}
            <Route path="buat-surat" element={<BuatSurat />} />
            <Route path="lihat-surat" element={<LihatSurat />} />
            <Route path="cetak-surat/:id" element={<CetakSurat />} />
            <Route path="unduh-surat/:id" element={<UnduhSurat />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
