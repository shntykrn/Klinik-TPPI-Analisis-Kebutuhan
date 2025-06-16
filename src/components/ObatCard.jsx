import React from "react"

export default function ObatCard({ obat, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <img
        src={
          obat.gambar
            ? `http://localhost:5000/public/uploads/${obat.gambar}`
            : "/images/default.jpg"
        }
        alt={obat.nama_obat}
        className="w-full h-32 object-contain mb-2"
      />
      <h2 className="text-lg font-semibold">{obat.nama_obat}</h2>
      <p className="text-sm text-gray-500">
        Stok: {obat.stok} {obat.satuan}
      </p>
      <p className="text-xs text-gray-400">
        Exp: {obat.tanggal_kadaluarsa ? obat.tanggal_kadaluarsa.slice(0, 7) : "-"}
      </p>
    </div>
  )
}
