import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "./assets/logo-tppi.png";
import bgImage from "./assets/bg-tppi.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");

  const togglePassword = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", { nik, password });
      alert("Login berhasil!");
      console.log("Respon login:", res.data);
      // Tambahkan redirect atau simpan token di sini jika diperlukan
    } catch (err) {
      alert("Login gagal.");
      console.error("Login error:", err);
    }
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
          <img src={logo || "/placeholder.svg"} alt="TPPI Logo" style={{ maxWidth: 150 }} />
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
              style={{
                backgroundColor: "#3a2a6d",
                border: "none",
                width: "100%",
                padding: "0.75rem",
                fontSize: "1.1rem",
                marginTop: "1rem",
              }}
            >
              LOGIN
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
