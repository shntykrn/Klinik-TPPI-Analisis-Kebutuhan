import { Suspense, lazy } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoadingSpinner from "./src/components/LoadingSpinner"
import Navbar from './src/components/NavBar';
import Layout from "./src/components/Layout";
import LandingRegister from "./src/routes/LandingRegister";
import Login from "./src/routes/Login";

// Lazy load pages
const LoginPage = lazy(() => import("./src/routes/Login"))
const RegisterPage = lazy(() => import("./src/routes/LandingRegister"))
const RekamMedisPage = lazy(() => import("./src/routes/RekamMedisPage"))
const SuratSakitPage = lazy(() => import("./src/routes/SuratSakitPage"))
const StokObatPage = lazy(() => import("./src/routes/StokObatPage"))

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/landing" element={<RegisterPage />} /> */}

          {/* Protected routes with Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/rekam-medis" replace />} />
            <Route path="login" element={<Login />} />
            <Route path="registrasi" element={<LandingRegister />} />
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