// components/TambahObatModal.jsx
import React, { useState } from "react"
import { X } from "lucide-react"

export default function TambahObatModal({ onClose }) {
  const [formData, setFormData] = useState({
    nama_obat: "",
    kategori: "",
    stok: 0,
    satuan: "",
    exp_date: "",
    deskripsi: "",
  })
  const [gambar, setGambar] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e) => {
    setGambar(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = new FormData()
    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key])
    })
    if (gambar) payload.append("gambar", gambar)

    try {
      const res = await fetch("http://localhost:5000/api/obat/upload", {
        method: "POST",
        body: payload,
      })
      const data = await res.json()
      if (res.ok) {
        alert("Obat berhasil ditambahkan")
        onClose()
      } else {
        alert(data.error || "Gagal menambahkan obat")
      }
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-md w-11/12 max-w-md p-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4">Tambah Obat Baru</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input name="nama_obat" placeholder="Nama Obat" value={formData.nama_obat} onChange={handleChange} className="border rounded p-2" required />
          <select name="kategori" value={formData.kategori} onChange={handleChange} className="border rounded p-2" required>
            <option value="">Pilih Kategori</option>
            <option>Antibiotik</option>
            <option>Analgesik/Antipiretik</option>
            <option>Anti Virus</option>
            <option>Obat Pencernaan</option>
            <option>Obat Topikal</option>
            <option>Obat Saraf</option>
            <option>Obat Tetes</option>
            <option>Anti Inflamasi/Alergi</option>
            <option>Obat Pernafasan/Flu</option>
            <option>Obat Diuretik</option>
            <option>Obat Injeksi</option>
            <option>Anti Hipertensi/Jantung</option>
            <option>Obat Persendian</option>
          </select>
          <input name="stok" type="number" placeholder="Stok" value={formData.stok} onChange={handleChange} className="border rounded p-2" required />
          <input name="satuan" placeholder="Satuan (tablet, kapsul, dll)" value={formData.satuan} onChange={handleChange} className="border rounded p-2" required />
          <input name="exp_date" type="month" value={formData.exp_date} onChange={handleChange} className="border rounded p-2" required />
          <textarea name="deskripsi" placeholder="Deskripsi" value={formData.deskripsi} onChange={handleChange} className="border rounded p-2" />
          <input type="file" accept="image/*" onChange={handleFileChange} className="border rounded p-2" />
          <button type="submit" className="bg-[#9747ff] text-white rounded p-2 mt-2">Simpan</button>
        </form>
      </div>
    </div>
  )
}
