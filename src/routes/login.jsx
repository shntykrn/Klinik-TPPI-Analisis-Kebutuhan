import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "./assets/logo-tppi.png";
import bgImage from "./assets/bg-tppi.png";
import { createLazyFileRoute } from "@tanstack/react-router"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [nik, setNik] = useState('');
  const [kataSandi, setKataSandi] = useState('');
  const [loading, setLoading] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/pengguna/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nik, kata_sandi: kataSandi }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Login berhasil! Selamat datang, ${data.user.nama}`);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/registrasi'; // arahkan ke halaman dashboard
      } else {
        alert(data.error || 'Login gagal');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat menghubungi server');
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="d-flex flex-column align-items-center">
        <div className="text-center mb-4">
          <img src={logo} alt="TPPI Logo" style={{ maxWidth: 150 }} />
        </div>
        
        <div className="bg-white p-5" style={{ width: 600 }}>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-4">
              <Form.Label style={{ color: "#6c757d", fontSize: "1.1rem" }}>NIK</Form.Label>
              <Form.Control
                type="text"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                style={{
                  border: "none",
                  borderBottom: "2px solid #dee2e6",
                  borderRadius: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                  fontSize: "1.1rem",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-5">
              <Form.Label style={{ color: "#6c757d", fontSize: "1.1rem" }}>PASSWORD</Form.Label>
              <div
                className="d-flex"
                style={{ borderBottom: "2px solid #dee2e6" }}
              >
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                style={{
                  borderBottom: "2px solid #dee2e6",
                }}
              >
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={kataSandi}
                  onChange={(e) => setKataSandi(e.target.value)}
                  style={{
                    border: "none",
                    borderRadius: 0,
                    paddingLeft: 0,
                    paddingRight: 0,
                    fontSize: "1.1rem",
                    boxShadow: "none",
                  }}
                />
                <Button variant="link" onClick={togglePassword} style={{ border: "none", boxShadow: "none" }}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </Form.Group>

            <Button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#3a2a6d",
                border: "none",
                width: "100%",
                padding: "0.75rem",
                fontSize: "1.1rem",
                marginTop: "1rem",
              }}
            >
              {loading ? "Logging in..." : "LOGIN"}
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
