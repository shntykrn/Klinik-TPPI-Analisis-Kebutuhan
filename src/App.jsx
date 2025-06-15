import React from "react";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import Layout from "./components/Layout";
import Login from "./routes/Login";
import LandingRegister from "./routes/LandingRegister";
import RekamMedisPage from "./routes/RekamMedisPage";
import SuratSakitPage from "./routes/SuratSakitPage";
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
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;