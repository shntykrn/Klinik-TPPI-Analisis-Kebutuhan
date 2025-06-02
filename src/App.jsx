import { Suspense, lazy } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoadingSpinner from "./components/LoadingSpinner"
import Navbar from './components/NavBar';
import Layout from "./components/Layout";

// Lazy load pages
const LoginPage = lazy(() => import("./routes/login"))
const RegisterPage = lazy(() => import("./routes/LandingRegister"))
const RekamMedisPage = lazy(() => import("./routes/RekamMedisPage"))
const SuratSakitPage = lazy(() => import("./routes/SuratSakitPage"))
const StokObatPage = lazy(() => import("./routes/StokObatPage"))

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/landing" element={<RegisterPage />} />

          {/* Protected routes with Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/rekam-medis" replace />} />
            <Route path="rekam-medis" element={<RekamMedisPage />} />
            <Route path="surat-sakit" element={<SuratSakitPage />} />
            <Route path="stok-obat" element={<StokObatPage />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App