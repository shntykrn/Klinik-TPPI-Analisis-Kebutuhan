// components/TambahObatModal.jsx
import React from "react"
import { X } from "lucide-react"
import { useState } from "react"

export default function TambahObatModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    stock: 0,
    unit: "",
    expDate: "",
    description: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Data obat baru:", formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-md w-11/12 max-w-md p-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4">Tambah Obat Baru</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            name="name"
            placeholder="Nama Obat"
            value={formData.name}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            name="stock"
            placeholder="Jumlah Stok"
            type="number"
            value={formData.stock}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            name="unit"
            placeholder="Unit (misal: tablet, kapsul)"
            value={formData.unit}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <input
            name="expDate"
            type="month"
            value={formData.expDate}
            onChange={handleChange}
            className="border rounded p-2"
            required
          />
          <textarea
            name="description"
            placeholder="Deskripsi"
            value={formData.description}
            onChange={handleChange}
            className="border rounded p-2"
          />
          <button type="submit" className="bg-[#9747ff] text-white rounded p-2 mt-2">Simpan</button>
        </form>
      </div>
    </div>
  )
}