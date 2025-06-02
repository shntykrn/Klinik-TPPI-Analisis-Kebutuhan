import { useState } from "react";
import logo from "../assets/logo-tppi.png";
import mascot from "../assets/mascot.png";
import bg from "../assets/bg-tppi.png";

const LandingRegister = () => {
  const [step, setStep] = useState("landing");
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

  const handleSubmit = () => {
    alert("Registrasi berhasil!");
    console.log(formData);
  };

  if (step === "landing") {
    return (
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-start px-8 py-20"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="max-w-md text-white">
          <img src={logo} alt="Logo" className="h-20 mb-4" />
          <h1 className="text-3xl md:text-4xl font-light leading-snug mb-6">
            KLINIK <br /> PT TPPI Trans-Pacific Petrochemical Indotama
          </h1>
          <button
            onClick={() => setStep("pilih")}
            className="bg-orange-500 text-white font-bold py-2 px-6 rounded hover:bg-orange-600"
          >
            REGISTRASI
          </button>
        </div>
      </div>
    );
  }

  if (step === "pilih") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">PILIH TIPE PASIEN</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <img src={mascot} alt="Mascot" className="h-[400px] md:h-[500px]" />
          <div className="flex flex-col gap-6 w-72">
            <button
              onClick={() => {
                setFormData({ ...formData, statusPekerja: "ORGANIK" });
                setStep("registrasi");
              }}
              className="bg-gray-300 text-black font-semibold py-4 rounded hover:bg-gray-400 text-xl"
            >
              ORGANIK
            </button>
            <button
              onClick={() => {
                setFormData({ ...formData, statusPekerja: "OUTSOURCING" });
                setStep("registrasi");
              }}
              className="bg-gray-300 text-black font-semibold py-4 rounded hover:bg-gray-400 text-xl"
            >
              OUTSOURCING
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "registrasi") {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="text-center mb-8">
          <img src={logo} alt="Logo" className="h-20 mx-auto mb-2" />
          <h2 className="text-2xl font-bold uppercase">REGISTRASI PASIEN</h2>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">NIK</label>
            <input
              type="text"
              value={formData.nik}
              onChange={(e) => handleInputChange("nik", e.target.value)}
              className="w-full border-2 border-purple-700 bg-gray-100 p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Nama</label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => handleInputChange("nama", e.target.value)}
              className="w-full border-2 border-purple-700 bg-gray-100 p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Departemen</label>
            <select
              value={formData.departemen}
              onChange={(e) => handleInputChange("departemen", e.target.value)}
              className="w-full border-2 border-purple-700 bg-gray-100 p-2 rounded"
            >
              <option>-- Pilih --</option>
              <option>OPTION 1</option>
              <option>OPTION 2</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Tanggal Lahir</label>
            <input
              type="date"
              value={formData.tanggalLahir}
              onChange={(e) => handleInputChange("tanggalLahir", e.target.value)}
              className="w-full border-2 border-purple-700 bg-gray-100 p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Jenis Kelamin</label>
            <div className="flex gap-6 mt-2">
              <label><input type="radio" name="gender" value="laki-laki" onChange={(e) => handleInputChange("jenisKelamin", e.target.value)} className="mr-2" />LAKI-LAKI</label>
              <label><input type="radio" name="gender" value="perempuan" onChange={(e) => handleInputChange("jenisKelamin", e.target.value)} className="mr-2" />PEREMPUAN</label>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Status Perkawinan</label>
            <div className="flex gap-6 mt-2">
              <label><input type="radio" name="status" value="nikah" onChange={(e) => handleInputChange("statusPerkawinan", e.target.value)} className="mr-2" />NIKAH</label>
              <label><input type="radio" name="status" value="belum" onChange={(e) => handleInputChange("statusPerkawinan", e.target.value)} className="mr-2" />BELUM</label>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Alamat</label>
            <textarea
              value={formData.alamat}
              onChange={(e) => handleInputChange("alamat", e.target.value)}
              className="w-full border-2 border-purple-700 bg-gray-100 p-2 rounded"
            ></textarea>
          </div>

          <div>
            <label className="block font-semibold mb-1">Status Pekerja</label>
            <input
              type="text"
              value={formData.statusPekerja}
              readOnly
              className="w-full border-2 border-purple-700 bg-gray-100 p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">No Telepon</label>
            <input
              type="text"
              value={formData.noTelepon}
              onChange={(e) => handleInputChange("noTelepon", e.target.value)}
              className="w-full border-2 border-purple-700 bg-gray-100 p-2 rounded"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Alergi Obat</label>
            <div className="flex gap-6 mt-2">
              <label><input type="radio" name="alergi" value="iya" onChange={(e) => handleInputChange("alergiObat", e.target.value)} className="mr-2" />IYA</label>
              <label><input type="radio" name="alergi" value="tidak" onChange={(e) => handleInputChange("alergiObat", e.target.value)} className="mr-2" />TIDAK</label>
            </div>
            {formData.alergiObat === "iya" && (
              <input
                type="text"
                placeholder="Detail Alergi"
                value={formData.alergiDetail}
                onChange={(e) => handleInputChange("alergiDetail", e.target.value)}
                className="w-full border-2 border-purple-700 bg-gray-100 p-2 mt-2 rounded"
              />
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Nama Penanggung Jawab</label>
            <input
              type="text"
              value={formData.namaPenanggungJawab}
              onChange={(e) => handleInputChange("namaPenanggungJawab", e.target.value)}
              className="w-full border-2 border-purple-700 bg-gray-100 p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Emergency Contact</label>
            <input
              type="text"
              value={formData.emergencyContact}
              onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
              className="w-full border-2 border-purple-700 bg-gray-100 p-2 rounded"
            />
          </div>

          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-purple-800 text-white font-bold py-2 px-10 rounded hover:bg-purple-900"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    );
  }

  return null;
};

export default LandingRegister;
