import { useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router"
import logo from "./assets/logo-tppi.png";
import mascot from "./assets/mascot-tppi.png";
import "./App.css";

const LandingRegister = () => {
  const [step, setStep] = useState("landing");
  const [patientType, setPatientType] = useState("");
  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    departemen: "",
    tanggalLahir: "",
    jenisKelamin: "",
    statusPerkawinan: "",
    alamat: "",
    statusPekerja: "",
    noTelepon: "",
    alergiObat: "",
    alergiDetail: "",
    namaPenanggungJawab: "",
    emergencyContact: "",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNextStep = (next) => {
    setStep(next);
  };

  const handlePatientTypeSelect = (type) => {
    setPatientType(type);
    setFormData({ ...formData, statusPekerja: type });
    setStep("registrasi");
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Registrasi berhasil!");
  };

  if (step === "landing") {
    return (
      <div className="landing">
        <img src={logo} alt="Logo" className="logo" />
        <div className="content">
          <h1>KLINIK PT TPPI Trans-Pacific Petrochemical Indotama</h1>
          <button onClick={() => handleNextStep("pilih")}>REGISTRASI</button>
        </div>
        <img src={mascot} alt="Mascot" className="mascot" />
      </div>
    );
  }

  if (step === "pilih") {
    return (
      <div className="pilih-pasien">
        <img src={logo} alt="Logo" className="logo" />
        <h2>PILIH TIPE PASIEN</h2>
        <div className="button-group">
          <button onClick={() => handlePatientTypeSelect("ORGANIK")}>ORGANIK</button>
          <button onClick={() => handlePatientTypeSelect("OUTSOURCING")}>OUTSOURCING</button>
        </div>
        <img src={mascot} alt="Mascot" className="mascot" />
      </div>
    );
  }

  if (step === "registrasi") {
    return (
      <div className="registrasi-pasien">
        <img src={logo} alt="Logo" className="logo" />
        <h2>REGISTRASI PASIEN</h2>

        <div className="form-group">
          <label>NIK</label>
          <input value={formData.nik} onChange={(e) => handleInputChange("nik", e.target.value)} />
        </div>

        <div className="form-group">
          <label>Nama</label>
          <input value={formData.nama} onChange={(e) => handleInputChange("nama", e.target.value)} />
        </div>

        <div className="form-group">
          <label>Departemen</label>
          <select onChange={(e) => handleInputChange("departemen", e.target.value)}>
            <option>-- Pilih --</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </div>

        <div className="form-group">
          <label>Tanggal Lahir</label>
          <input type="date" value={formData.tanggalLahir} onChange={(e) => handleInputChange("tanggalLahir", e.target.value)} />
        </div>

        <div className="form-group">
          <label>Jenis Kelamin</label>
          <div>
            <label><input type="radio" name="gender" value="laki-laki" onChange={(e) => handleInputChange("jenisKelamin", e.target.value)} /> Laki-laki</label>
            <label><input type="radio" name="gender" value="perempuan" onChange={(e) => handleInputChange("jenisKelamin", e.target.value)} /> Perempuan</label>
          </div>
        </div>

        <div className="form-group">
          <label>Status Perkawinan</label>
          <div>
            <label><input type="radio" name="status" value="nikah" onChange={(e) => handleInputChange("statusPerkawinan", e.target.value)} /> Nikah</label>
            <label><input type="radio" name="status" value="belum" onChange={(e) => handleInputChange("statusPerkawinan", e.target.value)} /> Belum</label>
          </div>
        </div>

        <div className="form-group">
          <label>Alamat</label>
          <textarea value={formData.alamat} onChange={(e) => handleInputChange("alamat", e.target.value)} />
        </div>

        <div className="form-group">
          <label>Status Pekerja</label>
          <input value={formData.statusPekerja} disabled />
        </div>

        <div className="form-group">
          <label>No Telepon</label>
          <input value={formData.noTelepon} onChange={(e) => handleInputChange("noTelepon", e.target.value)} />
        </div>

        <div className="form-group">
          <label>Alergi Obat</label>
          <div>
            <label><input type="radio" name="alergi" value="iya" onChange={(e) => handleInputChange("alergiObat", e.target.value)} /> Iya</label>
            <label><input type="radio" name="alergi" value="tidak" onChange={(e) => handleInputChange("alergiObat", e.target.value)} /> Tidak</label>
          </div>
          {formData.alergiObat === "iya" && (
            <input placeholder="Detail alergi" value={formData.alergiDetail} onChange={(e) => handleInputChange("alergiDetail", e.target.value)} />
          )}
        </div>

        <div className="form-group">
          <label>Nama Penanggung Jawab</label>
          <input value={formData.namaPenanggungJawab} onChange={(e) => handleInputChange("namaPenanggungJawab", e.target.value)} />
        </div>

        <div className="form-group">
          <label>Emergency Contact</label>
          <input value={formData.emergencyContact} onChange={(e) => handleInputChange("emergencyContact", e.target.value)} />
        </div>

        <div className="submit-button">
          <button onClick={handleSubmit}>SUBMIT</button>
        </div>

        <img src={mascot} alt="Mascot" className="mascot" />
      </div>
    );
  }

  return null;
};

export default LandingRegister;
