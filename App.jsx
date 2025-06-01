import { Suspense, lazy } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoadingSpinner from "./src/components/LoadingSpinner"
import Layout from "./src/components/Layout"

// Lazy load pages
const LoginPage = lazy(() => import("./src/pages/LoginPage"))
const RegisterPage = lazy(() => import("./src/pages/RegisterPage"))
const RekamMedisPage = lazy(() => import("./src/pages/RekamMedisPage"))
const SuratSakitPage = lazy(() => import("./src/pages/SuratSakitPage"))
const StokObatPage = lazy(() => import("./src/pages/StokObatPage"))

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

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
